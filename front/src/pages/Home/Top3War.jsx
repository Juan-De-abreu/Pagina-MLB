import { useEffect, useState } from "react";
import CardJugadores from "../../components/CardJugadores";
import { Link } from "react-router";

const API = "http://localhost:8081/api/estadisticas/top-war";

const Top3War = () => {
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
        <p className="mt-4 text-red-600">Cargando TopWar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los Jugadores</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <h4 className="text-center mb-4 text-2xl font-semibold">🏆 Top 3 en War</h4>
      <div className="container mx-auto px-20">
        {datos.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center bg-[var(--vinotinto))] rounded shadow p-4"
          >
            {/* Foto a la izquierda */}
            <div className="flex justify-center">
              <img
                src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
                alt={item.nombre}
                className="rounded-md w-60 h-60 object-cover border-4 border-[var(--vinotinto)]"
                onError={(e) =>
                  (e.target.src = "https://api.arsistemamlb.com/uploads/jugadores/default.png")
                }
              />
            </div>

            {/* Información a la derecha */}
            <div className="text-white flex flex-col justify-center px-4">
              <h3 className="text-xl font-bold mb-2">{item.nombre}</h3>
              <p>
                <strong>Equipo:</strong> {item.nombre_equipo}
              </p>
              <p>
                <strong>Posición:</strong> {item.pos}
              </p>
              <p>
                <strong>Años en MLB:</strong> {item.años_en_mlb}
              </p>
              <p>
                <strong>Año Debut / Retiro:</strong> {item.año_debut} – {item.año_retiro}
              </p>
              <p>
                <strong>Partidos Jugados:</strong> {item.partidos_jugados.toLocaleString()}
              </p>
              <p>
                <strong>Hits:</strong> {item.hits.toLocaleString()}
              </p>
              <p>
                <strong>Promedio de Bateo:</strong> {item.promedio_bateo}
              </p>
              <p>
                <strong>WAR:</strong> {item.war}
              </p>
              <div className="mt-6">

                <Link to={`/detalle/${item.id}/${item.nombre}`} className="border-2 transition-all duration-200 border-[var(--dorado)] hover:bg-[var(--dorado)] hover:text-black font-semibold py-2 px-4 rounded">
                  Detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Top3War;
