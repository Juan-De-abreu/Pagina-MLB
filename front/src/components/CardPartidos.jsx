import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import { API_BASE_URL } from '../config/api';

const cacheEquipos = {};

const CardPartidos = ({ item, contadorpartidos }) => {
  const [equipolocal, setEquipolocal] = useState(null);
  const [equipovisitante, setEquipovisitante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  // useRef para evitar re-fetch si ya está cargando
  const didFetchLocal = useRef(false);
  const didFetchVisitante = useRef(false);

  useEffect(() => {
    const fetchEquipo = async (id, setEquipo, didFetchRef) => {
      if (didFetchRef.current) return;
      const url = `${API_BASE_URL}/equipos/${id}`;
      if (cacheEquipos[url]) {
        setEquipo(cacheEquipos[url]);
        didFetchRef.current = true;
        return;
      }
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error fetching equipo: ${res.status}`);
        const data = await res.json();
        cacheEquipos[url] = data;
        setEquipo(data);
        didFetchRef.current = true;
      } catch (err) {
        setError(err.message);
      }
    };

    setLoading(true);
    setError(null);

    Promise.all([
      fetchEquipo(item.equipo_local_id, setEquipolocal, didFetchLocal),
      fetchEquipo(item.equipo_visitante_id, setEquipovisitante, didFetchVisitante),
    ]).finally(() => setLoading(false));
  }, [item.equipo_local_id, item.equipo_visitante_id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        />
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

  if (!equipolocal || !equipovisitante) {
    return <p>No se han cargado los datos de los equipos.</p>;
  }

  return (
    <div
      className={`lg:w-[80vw] mx-auto my-8 animate-slide-top px-4 2xl:px-50 transition-all duration-400 ease-out   ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
      ref={ref}
      style={{ animationDelay: `${contadorpartidos * 0.3}s` }}
    >
      <div className="bg-[var(--gris-oscuro)] rounded transition-all duration-300 hover:scale-104 hover:shadow-md h-full flex flex-col shadow-[#838a0d56] border-[var(--gris-claro)] border-2">
        <div className="overflow-hidden grid rounded-t border-[var(--gris-claro)] border-l-4 border-r-4 border-t-4 border-b-2 md:grid-cols-[47%_6%_47%]">
          <img
            src={equipolocal.logo_url}
            alt={equipolocal.nombre}
            className="w-full h-50 lg:h-65 object-center rounded-4xl border-6 border-[var(--gris-claro)]"
          />
          <p></p>
          <img
            src={equipovisitante.logo_url}
            alt={equipovisitante.nombre}
            className="w-full h-50 lg:h-65 object-center rounded-4xl border-6 border-[var(--gris-claro)]"
          />
        </div>
        <div className="flex-grow p-4 text-center md:grid-cols-[43%_14%_43%] md:grid">
          <div className="text-center text-xl lg:text-2xl">
            <p>{equipolocal.nombre}</p>
          </div>

          <div className="my-3 text-center">
            <span className="text-xl xl:text-3xl rounded-full px-0 xl:px-4 py-2">
              {item.resultados_local} vs {item.resultados_visitante}
            </span>
          </div>

          <div className="text-center text-xl lg:text-2xl">{equipovisitante.nombre}</div>
        </div>
        <div className="p-4 bg-[var(--gris-claro)] flex justify-center gap-3">
          <Link
            to={`/equipo/${equipolocal.id}/${equipolocal.nombre}`}
            className="text-center border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Equipo Local
          </Link>
          <Link
            to={`/equipo/${equipovisitante.id}/${equipovisitante.nombre}`}
            className="border text-center text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Equipo Visitante
          </Link>
        </div>
        <div className="text-sm bg-[var(--gris-claro)] rounded-b border-t-1 border-b-1 border-[var(--dorado)]">
          <p className="flex justify-center pt-1 pb-1 pl-2">
            <span className="hidden lg:flex">fecha del partido:</span>
            <span className="text-[var(--dorado)]">{item.fecha}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardPartidos;
