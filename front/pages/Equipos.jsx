import { useEffect, useState } from "react";
import { Link } from "react-router";
import CardEquipos from "../components/CardEquipos";
import { API_BASE_URL } from '../config/api';


const API = `${API_BASE_URL}/equipos`;

const Equipos = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, []);




  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-4 text-red-600">Cargando Equipos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los equipos</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--body)] py-4 min-h-screen text-[var(--blanco-hielo)]">
      <div className="container mx-auto px-4">
        <h3 className="text-center py-2 text-2xl font-semibold">📋 Equipos de baseball Venezolanos</h3>
        <p className="text-center text-gray-200 mb-6">
          {datos.length} Equipos venezolanos
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">

        </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {datos.map((item,index) => (
              <CardEquipos
                key={item.id}
                item={item}
                contador={index+1}
              />
            ))}
          </div>
        
      </div>
    </div>
  );
};

export default Equipos;
