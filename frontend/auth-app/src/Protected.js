import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './App.css';

function ProtectedPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gustaCaminar: "",
    gustaCicla: "",
    ahorroComodidad: "",
    tiempoEspera: "",
    comuna: "",
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);
        if (!response.ok) throw new Error('Token inválido');
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const transformToSnakeCase = (data) => ({
    gusta_caminar: data.gustaCaminar,
    gusta_cicla: data.gustaCicla,
    ahorro_comodidad: data.ahorroComodidad,
    tiempo_espera: data.tiempoEspera,
    comuna: data.comuna,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(transformToSnakeCase(formData)),
      });

      if (response.ok) {
        navigate('/mapa', { state: { comuna: formData.comuna } });
      } else {
        const errorData = await response.json();
        alert('Error al enviar: ' + (errorData.detail || ''));
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/logo-miruta.jpeg" alt="Logo Mi Ruta" className="logo-img" />
        <h2>Encuesta</h2>

        <label>¿Te gusta caminar?</label>
        <select name="gustaCaminar" value={formData.gustaCaminar} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
          <option value="tal vez">Tal vez</option>
        </select>

        <label>¿Te gusta manejar cicla?</label>
        <select name="gustaCicla" value={formData.gustaCicla} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
          <option value="tal vez">Tal vez</option>
        </select>

        <label>¿Prefieres ahorro o comodidad?</label>
        <select name="ahorroComodidad" value={formData.ahorroComodidad} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          <option value="ahorro">Ahorro</option>
          <option value="comodidad">Comodidad</option>
        </select>

        <label>¿Cuánto tiempo estás dispuesta a esperar el bus?</label>
        <select name="tiempoEspera" value={formData.tiempoEspera} onChange={handleChange} required>
          <option value="">Selecciona una opción</option>
          <option value="5">5 minutos</option>
          <option value="10">10 minutos</option>
          <option value="15">15 minutos</option>
          <option value="20">20 minutos</option>
          <option value="25+">Más de 25 minutos</option>
        </select>

        <label>Digita la comuna donde vives (número):</label>
        <input
          type="text"
          name="comuna"
          value={formData.comuna}
          onChange={handleChange}
          required
        />

        <button type="submit">Enviar encuesta</button>
      </form>
    </div>
  );
}

export default ProtectedPage;
