import { useEffect, useState } from "react";
import { getMedalColorVar } from "../../util/funciones";

const API = "http://localhost:8081/api/estadisticas/top-war";

const Top3WarCard = () => {
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
        <h4 className="text-xl font-semibold mb-2">
          Error al cargar los Jugadores
        </h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h4 className="text-center mb-6 text-4xl font-semibold text-[var(--dorado)]">
        🏆 Top 3 en War
      </h4>
      <div className="container mx-auto w-full mb-10 px-10 md:px-0 lg:px-30">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 space-x-10 space-y-16 md:space-y-0 border-t-1 border-[var(--dorado)] pt-8 opacity-80`}
        >
          {datos.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className={`mx-auto cascade-animation rounded-xl justify-center hover:scale-105 hover:shadow-xl hover:-translate-y-2 transition-all duration-150 shadow-lg shadow-black border-2 border-black 
                bg-[var(${getMedalColorVar(
                index
              )})]`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div>
                <img
                  src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
                  alt={item.nombre}
                  className={`w-full h-90 object-center rounded-t-xl border-b-1 border-black`}
                  onError={(e) => {
                    e.target.src =
                      "https://api.arsistemamlb.com/uploads/jugadores/default.png";
                  }}
                />
              </div>
              <div className="text-center p-4  rounded-b-xl text-black font-semibold">
                <h1 className={`text-xl border-b-1`}>{item.nombre}</h1>
                <p className={`${item.pos ? "" : (item.pos = 0)} my-1`}>
                  Posicion: {item.pos}
                </p>

                <p
                  className={`${
                    item.promedio_bateo * 1000 ? "" : (item.promedio_bateo = 0)
                  } my-1`}
                >
                  AVG: {item.promedio_bateo * 1000}
                </p>
                <p className={`${item.war ? "" : (item.war = 0)} my-1`}>
                  War: {item.war}
                </p>
                <p
                  className={`${
                    item.all_star_appearances
                      ? ""
                      : (item.all_star_appearances = 0)
                  } mt-1 border-t-1 border-black pt-1`}
                >
                  All-Star:{item.all_star_appearances}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top3WarCard;
