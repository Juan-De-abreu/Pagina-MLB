import React, { useEffect, useState } from "react";
import CardPartidos from "../components/CardPartidos";
import { API_BASE_URL } from '../config/api';
import PaginadorSimple from "../components/Paginador";

const Partidos = () => {
  const API = `${API_BASE_URL}/partidos`;
  const API_EQUIPOS = `${API_BASE_URL}/equipos`;

  const [error, setError] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [yearFilter, setYearFilter] = useState("");
  const [equipoFilter, setEquipoFilter] = useState("");

  const [years, setYears] = useState([]);
  const [equipos, setEquipos] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  // Mapa id -> nombre para equipos
  const equiposMap = equipos.reduce((acc, equipo) => {
    acc[equipo.id] = equipo.nombre;
    return acc;
  }, {});

  // Carga datos
  useEffect(() => {
    const getDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        const [resPartidos, resEquipos] = await Promise.all([
          fetch(API),
          fetch(API_EQUIPOS),
        ]);
        if (!resPartidos.ok) throw new Error(`HTTP status ${resPartidos.status} en partidos`);
        if (!resEquipos.ok) throw new Error(`HTTP status ${resEquipos.status} en equipos`);
        const dataPartidos = await resPartidos.json();
        const dataEquipos = await resEquipos.json();

        setDatos(dataPartidos);
        setEquipos(dataEquipos);

        // Extraer años únicos
        const uniqueYears = [...new Set(dataPartidos.map(d => d.fecha?.slice(0, 4)))].sort();
        setYears(uniqueYears);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getDatos();
  }, []);

  // Filtrar y ordenar partidos
  let datosFiltrados = yearFilter
    ? datos.filter(d => d.fecha?.startsWith(yearFilter))
    : datos;

  if (equipoFilter) {
    datosFiltrados = datosFiltrados.filter(d => {
      const localNombre = equiposMap[d.equipo_local_id];
      const visitanteNombre = equiposMap[d.equipo_visitante_id];
      return localNombre === equipoFilter || visitanteNombre === equipoFilter;
    });
  }

  const datosOrdenados = datosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Paginación
  const totalPaginas = Math.ceil(datosOrdenados.length / ITEMS_POR_PAGINA);
  const partidosPagina = datosOrdenados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  // Scroll arriba al cambiar página
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [paginaActual]);

  if (loading) {
    return <p>Cargando partidos...</p>;
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
    <div className=" px-4  bg-[var(--body)]">
      <p className="text-center text-4xl my-8">Partidos ({datosOrdenados.length})</p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
        <select
          className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
          value={yearFilter}
          onChange={e => {
            setYearFilter(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option className="bg-[var(--gris-claro)]" value="">Todos los partidos</option>
          {[...years].sort((a, b) => Number(b) - Number(a)).map(year => (
            <option key={year} className="bg-[var(--gris-oscuro)]" value={year}>{year}</option>
          ))}
        </select>

        <select
          className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
          value={equipoFilter}
          onChange={e => {
            setEquipoFilter(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option className="bg-[var(--gris-claro)]" value="">Todos los equipos</option>
          {equipos.map(e => (
            <option key={e.id} className="bg-[var(--gris-oscuro)]" value={e.nombre}>{e.nombre}</option>
          ))}
        </select>

        <button
          className="bg-transparent border border-[var(--dorado)] text-[var(--dorado)] px-4 py-2 rounded hover:bg-[var(--dorado)] hover:text-black transition w-full md:w-auto"
          onClick={() => {
            setEquipoFilter("");
            setYearFilter("");
            setPaginaActual(1);
          }}
        >
          Limpiar filtro de equipo
        </button>
      </div>

      <div className=" max-w-full container mt-6">
        {partidosPagina.length > 0 ? (
          partidosPagina.map((item, index) => (
            <CardPartidos key={item.id} item={item} contadorpartidos={(paginaActual - 1) * ITEMS_POR_PAGINA + index + 1} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No hay partidos para el filtro seleccionado.
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 mt-8 justify-center">
        <PaginadorSimple
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={setPaginaActual}
        />
      </div>
    </div>
  );
};

export default Partidos;
