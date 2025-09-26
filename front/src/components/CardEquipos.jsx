import { Link } from "react-router-dom";
import { getMedalColorVartext } from "../util/funciones";
import { useEffect, useState } from "react";

const CardEquipos = ({ item, contador = 4 }) => {
  const API = `http://localhost:8081/api/equipos/${item.id}`;
  const [error, setError] = useState(null);

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const borderClass =
    contador <= 2
      ? `text-[var(${getMedalColorVartext(contador)})]`
      : "border-[var(--vinotinto)]";

  useEffect(() => {
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
    getDatos();
  }, []);

  if (loading) {
    return <p>Cargando jugadores...</p>;
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
    <div className="w-[80vw] lg:w-80 xl:w-100 2xl:w-110 my-4 animate-slide-top px-2 mx-auto sm:mx-0">
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-1">
        <div className="overflow-hidden rounded-t border-[var(--vinotinto)] border-1">
          <img
            src={`${item.logo_url}`}
            alt={item.nombre}
            className="w-full h-65 object-center"
          />
        </div>
        <div
          className={`flex flex-col flex-grow p-4 text-center justify-between border-2 ${borderClass} `}
        >
          <p className="font-bold text-lg">{item.nombre}</p>
          <p className={`my-3 text-center`}>
            <span className="mb-3">
              Ciudad: {item.ciudad}
              <br />
              Campeonatos nacionales: {item.titulos_nacionales}
              <br />
              Campeonatos serie caribe: {item.titulos_serie_caribe}
              <br />
            </span>
          </p>
        </div>
        <div className="p-4 bg-[var(--vinotinto)] flex justify-center gap-3 rounded-b border-b-1 border-[#520f0f]">
          <Link
            to={`/jugadores?equipo=${encodeURIComponent(item.nombre)}`}
            className="border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Jugadores({datos.length})
          </Link>

          <Link
            to={`/detalleequipo/${item.id}`}
            className="border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardEquipos;
