import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardPartidos = ({ item}) => {
    const APILOCAL = `http://localhost:8081/api/equipos/${item.equipo_local_id}`

    const APIVISITANTE=`http://localhost:8081/api/equipos/${item.equipo_visitante_id}`

const [equipo1, setEquipo1] = useState([]);
const [equipo2, setEquipo2] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEquipo1 = async () => {
    try {
      const response = await fetch(APILOCAL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEquipo1(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
const getEquipo2 = async () => {
    try {
      const response = await fetch(APIVISITANTE);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEquipo2(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getEquipo1();
    getEquipo2();

}, []);




  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-4 text-red-600">Cargando partidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los partidos</h4>
        <p>{error}</p>
      </div>
    );
  }


  return (
    <div className="w-[90vw] mx-auto my-15 animate-slide-top px-4 sm:px-10">
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-2">
        <div className="overflow-hidden grid rounded-t border-[var(--vinotinto)] border-1 grid-cols-3">
          <img
            src={`${equipo1.logo_url}`}
            alt={equipo1.nombre}
            className="w-45 h-65 object-center"
          />
          <p className="flex w-9">vs</p>
          <img
            src={`${equipo2.logo_url}`}
            alt={equipo2.nombre}
            className="w-45 h-65 object-center"
          />
        </div>
        <div
          className={`flex flex-col flex-grow p-4 text-center justify-between border-2  `}
        >
          <p className="font-bold text-lg"></p>
          <p className={`my-3 text-center`}>
            <span className="mb-3">
              Ciudad: 
              <br />
              Campeonatos nacionales: 
              <br />
              <br />
            </span>
          </p>
        </div>
        <div className="p-4 bg-[var(--vinotinto)] flex justify-center gap-3 rounded-b border-b-1 border-[#520f0f]">


          <Link
            to={`/detalleequipo/$`}
            className="border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPartidos;
