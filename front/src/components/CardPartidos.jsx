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
    <div className="w-[80vw] mx-auto my-15 animate-slide-top px-4 2xl:px-50">
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-2">
        <div className="overflow-hidden grid rounded-t border-[var(--vinotinto)] border-l-4 border-r-4 border-t-4 border-b-2 md:grid-cols-[47%_6%_47%]">
          <img
            src={equipolocal[0].logo_url}
            alt={equipolocal[0].nombre}
            className="w-full h-50 lg:h-65 object-center rounded-4xl border-6 border-[var(--vinotinto)]"
          />
          <p></p>
          <img
            src={equipovisitante[0].logo_url}
            alt={equipovisitante[0].nombre}
            className="w-full h-50 lg:h-65 object-center rounded-4xl border-6 border-[var(--vinotinto)]"
          />
        </div>
        <div className=" flex-grow p-4 text-center md:grid-cols-[43%_14%_43%] md:grid">
          <div className="text-center text-xl lg:text-2xl">
            <p>{equipolocal[0].nombre}</p>
          </div>

          <div className="my-3 text-center">
            <span className="text-xl xl:text-3xl rounded-full px-0 xl:px-4 py-2">
              {item.resultados_local} vs {item.resultados_visitante}
            </span>
          </div>

          <div className="text-center text-xl lg:text-2xl">
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
