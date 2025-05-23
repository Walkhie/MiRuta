import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

// Corrige el ícono de marcador por defecto
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Diccionario de comunas
const comunas = {
  "1": { nombre: "Popular", lat: 6.30387, lng: -75.546203 },
  "2": { nombre: "Santa Cruz", lat: 6.29348, lng: -75.56 },
  "3": { nombre: "Manrique", lat: 6.27223, lng: -75.54439 },
  "4": { nombre: "Aranjuez", lat: 6.28046, lng: -75.56072 },
  "5": { nombre: "Castilla", lat: 6.29133, lng: -75.57102 },
  "6": { nombre: "Doce de Octubre", lat: 6.30296, lng: -75.581 },
  "7": { nombre: "Robledo", lat: 6.27749, lng: -75.59652 },
  "8": { nombre: "Villa Hermosa", lat: 6.24848, lng: -75.55133 },
  "9": { nombre: "Buenos Aires", lat: 6.23738, lng: -75.55634 },
  "10": { nombre: "La Candelaria", lat: 6.24792, lng: -75.56975 },
  "11": { nombre: "Laureles‑Estadio", lat: 6.25279, lng: -75.59071 },
  "12": { nombre: "La América", lat: 6.25641, lng: -75.60244 },
  "13": { nombre: "San Javier", lat: 6.25516, lng: -75.62142 },
  "14": { nombre: "El Poblado", lat: 6.2016, lng: -75.56919 },
  "15": { nombre: "Guayabal", lat: 6.21911, lng: -75.5831 },
  "16": { nombre: "Belén", lat: 6.23313, lng: -75.59115 }
};

function Mapa() {
  const location = useLocation();
  const comunaId = location.state?.comuna;

  const comuna = comunas[comunaId];

  if (!comuna) {
    return <h2 style={{ textAlign: 'center' }}>No se encontró la comuna 😕</h2>;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[comuna.lat, comuna.lng]} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[comuna.lat, comuna.lng]}>
          <Popup>{`Comuna ${comunaId}: ${comuna.nombre}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Mapa;
