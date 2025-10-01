import React, { useEffect, useState } from "react";
import CardPartidos from "../components/CardPartidos";

const Partidos = () => {
  const API = `http://localhost:8081/api/equipos/partidos`;
  const [error, setError] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [yearFilter, setYearFilter] = useState("");
  const [equipoFilter, setEquipoFilter] = useState("");

  const [years, setYears] = useState([]);

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

  useEffect(() => {
    const getDatos = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        const data = await response.json();
        setDatos(data);
        // Extraer años únicos a partir del campo fecha (ej: "2025-09-30" -> "2025")
        const uniqueYears = [...new Set(data.map((d) => d.fecha?.slice(0, 4)))].sort();
        setYears(uniqueYears);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getDatos();
  }, []);

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

  // Filtrar partidos por año si hay filtro
  let datosFiltrados = yearFilter
    ? datos.filter((d) => d.fecha?.startsWith(yearFilter))
    : datos;

  // Si hay filtro por equipo, filtrar partidos que incluyan ese equipo (local o visitante)
  if (equipoFilter) {
    datosFiltrados = datosFiltrados.filter(
      (d) => d.equipo_local === equipoFilter || d.equipo_visitante === equipoFilter
    );
  }

  // Ordenar de fecha más actual a más vieja
  const datosOrdenados = datosFiltrados.sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div className="mx-auto px-4">
      <p className="text-center text-2xl my-8">Partidos ({datosFiltrados.length})</p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
            <select
            className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option className="bg-[var(--gris-claro)]" value="">
              Todos los partidos
            </option>
            {[...years]
              .sort((a, b) => Number(b) - Number(a))
              .map((year) => (
                <option
                  className="bg-[var(--gris-oscuro)]"
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
          </select>
          <select
            className="border border-[var(--dorado)] rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            value={equipoFilter}
            onChange={(e) => setEquipoFilter(e.target.value)}
          >
            <option className="bg-[var(--gris-claro)]" value="">
              Todos los equipos
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
              setEquipoFilter("");
            }}
          >
            Limpiar filtro de equipo
          </button>
      </div>

      <div className="mx-auto max-w-full container mt-6">
        {datosOrdenados.length > 0 ? (
          datosOrdenados.map((item) => <CardPartidos key={item.id} item={item} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No hay partidos para el filtro seleccionado.
          </p>
        )}
      </div>
    </div>
  );
};

export default Partidos;
