import { useEffect, useState } from "react";
import CardJugadores from "../../components/CardJugadores";

const API = "http://localhost:8081/api/estadisticas/top-porcentajebb";

const TopBb = () => {
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
        <p className="mt-4 text-red-600">Cargando Top de porcentaje Base por bola...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los Top de porcentaje Base por bola</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <h4 className="text-center py-4 text-2xl font-semibold">🏆 Top en BB%</h4>
      <p className="text-center">Total de BB% en toda su carrera</p>
      <p className="text-center text-gray-500">
        
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {datos.map((item,index) => (
          <CardJugadores
            key={item.id}
            item={item}
            l1={"Hits"}
            v1={item.hits}
            l2={"AVG"}
            v2={item.promedio_bateo * 1000}
            l3={"WAR"}
            v3={item.war}
            contador={index + 1}
          />
        ))}
      </div>
    </>
  );
};

export default TopBb;
