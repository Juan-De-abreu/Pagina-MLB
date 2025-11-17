import { useEffect, useState } from "react";
import CardJugadores from "../components/CardJugadores";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from '../config/api';
import Paginador from "../components/Paginador";

const API = `${API_BASE_URL}/jugadores`;

const Jugadores = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const equipoParam = queryParams.get("equipo") || "";

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJugadores, setFilteredJugadores] = useState([]);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [equipoFilter, setEquipoFilter] = useState(equipoParam);

  const ITEMS_POR_PAGINA = 20;
const [paginaActual, setPaginaActual] = useState(1);

const totalPaginas = Math.ceil(filteredJugadores.length / ITEMS_POR_PAGINA);

const jugadoresAPagina = filteredJugadores.slice(
  (paginaActual - 1) * ITEMS_POR_PAGINA,
  paginaActual * ITEMS_POR_PAGINA
);


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

  useEffect(() => {
    let filtered = datos;

    if (search) {
      const normalizedSearch = search
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      filtered = filtered.filter((j) => {
        const normalizedNombre = j.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedNombre.includes(normalizedSearch);
      });
      filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
    }

    if (positionFilter) {
      filtered = filtered.filter(
        (j) => j.pos && j.pos.includes(positionFilter)
      );
      filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
    }

    if (equipoFilter) {
      filtered = filtered.filter((j) => {
        if (!j.nombre_equipo) return false;
        return j.nombre_equipo.toLowerCase().includes(equipoFilter.toLowerCase());
      });
      filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
    }

    setFilteredJugadores(filtered);
  }, [datos, search, positionFilter, equipoFilter]);

  const posiciones = [
    { value: "SP", label: "Lanzador (SP)  Pitcher" },
    { value: "RP", label: "Relevista (RP)  Pitcher" },
    { value: "C", label: "Receptor (C)  Catcher" },
    { value: "1B", label: "Primera Base (1B)" },
    { value: "2B", label: "Segunda Base (2B)" },
    { value: "3B", label: "Tercera Base (3B)" },
    { value: "SS", label: "Campo Corto (SS)" },
    { value: "LF", label: "Jardinero Izquierdo (LF)" },
    { value: "CF", label: "Jardinero Central (CF)" },
    { value: "RF", label: "Jardinero Derecho (RF)" },
    { value: "DH", label: "Bateador Designado (DH) " },
    { value: "UTIL", label: "Utilitid (UTIL) " },
  ];

  const equipos = [
    "Leones del Caracas",
    "Tiburones de La Guaira",
    "Navegantes del Magallanes",
    "Águilas del Zulia",
    "Caribes de Anzoátegui",
    "Bravos de Margarita",
    "Cardenales de Lara",
    "Tigres de Aragua",
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-4 text-red-600">Cargando Jugadores...</p>
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
    <div className="bg-[var(--body)] py-4 min-h-screen text-[var(--blanco-hielo)]">
      <div className="container mx-auto px-4">
        <h3 className="text-center py-2 text-2xl font-semibold">📋 Jugadores Venezolanos en el MLB</h3>
        <p className="text-center text-gray-200 mb-6">
          {datos.length} jugadores que han representado a la Vinotinto
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
          <Link
            to={"/comparador"}
            className="text-center bg-transparent border border-[var(--dorado)] text-[var(--dorado)] px-4 py-2 rounded hover:bg-[var(--dorado)] hover:text-black transition w-full md:w-auto"
          >
            Comparar
          </Link>

          <input
            type="text"
            className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option className="bg-[var(--gris-claro)]" value="">
              Seleccione una posición
            </option>
            {posiciones.map((item, index) => (
              <option className="bg-[var(--gris-oscuro)]" key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            value={equipoFilter}
            onChange={(e) => setEquipoFilter(e.target.value)}
          >
            <option className="bg-[var(--gris-claro)]" value="">
              Seleccione un equipo
            </option>
            {equipos.map((item, index) => (
              <option className="bg-[var(--gris-oscuro)]" key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            className="bg-transparent border border-[var(--dorado)] text-[var(--dorado)] px-4 py-2 rounded hover:bg-[var(--dorado)] hover:text-black transition w-full md:w-auto"
            onClick={() => {
              setSearch("");
              setPositionFilter("");
              setEquipoFilter("");
            }}
          >
            Limpiar
          </button>
        </div>

        {jugadoresAPagina.length === 0 ? (
  <div className="text-center py-6 bg-red-800 text-white rounded-4xl">
    No se encontraron jugadores con esos filtros.
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
    {jugadoresAPagina.map((item) => (
      <CardJugadores
        key={item.id}
        item={item}
        l1={"WAR"}
        v1={item.war}
        l2={"HR"}
        v2={item.home_runs}
        l3={"AVG"}
        v3={item.promedio_bateo}
        contador={4}
      />
    ))}
  </div>
)}
<div className="flex items-center gap-4 mt-8">
  <Paginador
    paginaActual={paginaActual}
    totalPaginas={totalPaginas}
    onCambiarPagina={setPaginaActual}
  />
</div>

      </div>
    </div>
  );
};

export default Jugadores;
