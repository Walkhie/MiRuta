import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

function ProtectedPage() {
    const navigate = useNavigate();

    // Estado para el formulario
  const [formData, setFormData] = useState({
    gustaCaminar: "",
    gustaCicla: "",
    ahorroComodidad: "",
    tiempoEspera: "",
    comuna: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Manejar cambio de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   // Manejar envío del formulario
  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No estás autenticado');
    navigate('/'); // o lo que quieras hacer si no hay token
    return;
  }
  const transformToSnakeCase = (data) => ({
  gusta_caminar: data.gustaCaminar,
  gusta_cicla: data.gustaCicla,
  ahorro_comodidad: data.ahorroComodidad,
  tiempo_espera: data.tiempoEspera,
  comuna: data.comuna,
});
  try {
    const response = await fetch('http://localhost:8000/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // importante para que el backend valide
      },
      body: JSON.stringify(transformToSnakeCase(formData)),

    });

    if (response.ok) {
      console.log('Encuesta enviada con éxito');
      setSubmitted(true);
    } else {
      const errorData = await response.json();
      alert('Error al enviar encuesta: ' + JSON.stringify(errorData.detail || errorData));
      console.error('Error:', errorData);
    }
  } catch (error) {
    alert('Error de conexión con el servidor');
    console.error('Error en fetch:', error);
  }
};




    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
                console.log(token)
            try{
                    const response = await fetch(`http://localhost:8000/verify-token/${token}`);

                    if (!response.ok) {
                        throw new Error('Token verification failed');
                    }
                }catch (error) {
                    localStorage.removeItem('token')
                    navigate('/');
            }
        };

        verifyToken();
    }, [navigate]);

    if (submitted) {
    return <h2>¡Gracias por responder la encuesta!</h2>;
      }

    return (
    <div style={{ padding: "2rem" }}>
      <h2>Encuesta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>¿Te gusta caminar?</label><br />
          <select name="gustaCaminar" value={formData.gustaCaminar} onChange={handleChange} required>
            <option value="">Selecciona una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
            <option value="tal vez">Tal vez</option>
          </select>
        </div>

        <div>
          <label>¿Te gusta manejar cicla?</label><br />
          <select name="gustaCicla" value={formData.gustaCicla} onChange={handleChange} required>
            <option value="">Selecciona una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
            <option value="tal vez">Tal vez</option>
          </select>
        </div>

        <div>
          <label>¿Prefieres ahorro o comodidad?</label><br />
          <select name="ahorroComodidad" value={formData.ahorroComodidad} onChange={handleChange} required>
            <option value="">Selecciona una opción</option>
            <option value="ahorro">Ahorro</option>
            <option value="comodidad">Comodidad</option>
          </select>
        </div>

        <div>
          <label>¿Cuánto tiempo estás dispuesta a esperar el bus?</label><br />
          <select name="tiempoEspera" value={formData.tiempoEspera} onChange={handleChange} required>
            <option value="">Selecciona una opción</option>
            <option value="5">5 minutos</option>
            <option value="10">10 minutos</option>
            <option value="15">15 minutos</option>
            <option value="20">20 minutos</option>
            <option value="25+">Más de 25 minutos</option>
          </select>
        </div>

        <div>
          <label>Digita la comuna donde vives:</label><br />
          <input
            type="text"
            name="comuna"
            value={formData.comuna}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">Enviar encuesta</button>
      </form>
    </div>
  );
}
export default ProtectedPage;