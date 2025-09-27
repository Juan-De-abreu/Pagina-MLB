import React, { useEffect, useState } from 'react'
import CardPartidos from '../components/CardPartidos'

const Partidos = () => {

    const API = `http://localhost:8081/api/equipos/partidos`;
  const [error, setError] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const data = await response.json();
      setDatos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  getDatos();
}, []);

  if (loading) {
    return <p>Cargando partidos...</p>;
  }
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">
          Error al cargar los partidos
        </h4>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
        <p className='text-center mt-5 text-2xl'>Partidos ({datos.length})</p>
        <div className='container mx-auto max-w-[100vw]'>
            {datos.map((item) => (
              <CardPartidos
                key={item.id}
                item={item}
              />
            ))}
        </div>
    </div>
  )
}

export default Partidos