import { useEffect, useState } from "react";
import { Link } from "react-router";

const CardPartidos = ({ item }) => {
  const APILOCAL = `http://localhost:8081/api/equipos/${item.equipo_local_id}`;
  const APIVISITANTE = `http://localhost:8081/api/equipos/${item.equipo_visitante_id}`;

  const [equipolocal, setequipolocal] = useState(null);
  const [equipovisitante, setequipovisitante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(APILOCAL).then(res => {
        if (!res.ok) throw new Error(`Error fetching equipo local: ${res.status}`);
        return res.json();
      }),
      fetch(APIVISITANTE).then(res => {
        if (!res.ok) throw new Error(`Error fetching equipo visitante: ${res.status}`);
        return res.json();
      })
    ]).then(([localData, visitanteData]) => {
      setequipolocal(localData);
      setequipovisitante(visitanteData);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });

  }, [APILOCAL, APIVISITANTE]);

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

  // Validar que los datos existen antes de acceder para evitar crashes inesperados
  if (!equipolocal || !equipovisitante) {
    return <p>No se han cargado los datos de los equipos.</p>;
  }

  return (
    <div className="w-[90vw] mx-auto my-15 animate-slide-top px-4 sm:px-10">
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-2">
        <div className="overflow-hidden grid rounded-t border-[var(--vinotinto)] border-l-4 border-r-4 border-t-4 border-b-2 md:grid-cols-[45%_10%_45%]">
          <img
            src={equipolocal[0].logo_url}
            alt={equipolocal[0].nombre}
            className="w-full h-40 lg:h-75 object-center rounded border-3 border-[var(--dorado)]"
          />
          <p className="flex w-full text-center justify-center my-auto"><span className="scale-200 text-4xl border-1 border-[var(--dorado)] rounded-full px-3 py-2 bg-[var(--vinotinto)] opacity-0">vs</span></p>
          <img
            src={equipovisitante[0].logo_url}
            alt={equipovisitante[0].nombre}
            className="w-full h-40 lg:h-75 object-center rounded border-3 border-[var(--dorado)]"
          />
        </div>
        <div className="hidden flex-grow p-4 text-center grid-cols-3 md:grid">
          <div className="text-2xl text-center">
            <p>{equipolocal[0].nombre}</p>
          </div>

          <div className="my-3 text-center">
            <span className="scale-200 text-6xl rounded-full px-3 py-2">
              vs
            </span>
          </div>

          <div className="text-center">
            {equipovisitante[0].nombre}
          </div>

        </div>
        <div className="p-4 bg-[var(--vinotinto)] flex justify-center gap-3 rounded-b border-b-1 border-[#520f0f]">
          <Link
            to={`/detalleequipo/${equipolocal[0].id}`}
            className=" text-center border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Equipo Local
          </Link>
          <Link
            to={`/detalleequipo/${equipovisitante[0].id}`}
            className="border text-center text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Equipo Visitante
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPartidos;
