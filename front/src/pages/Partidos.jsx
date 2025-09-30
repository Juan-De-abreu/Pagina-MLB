import React, { useEffect, useState } from "react";
import CardPartidos from "../components/CardPartidos";

const Partidos = () => {
  const API = `http://localhost:8081/api/equipos/partidos`;
  const [error, setError] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState("");
  const [years, setYears] = useState([]);

  useEffect(() => {
    const getDatos = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        const data = await response.json();
        setDatos(data);
        // Extraer años únicos a partir del campo fecha (ej: "2025-09-30" -> "2025")
        const uniqueYears = [
          ...new Set(data.map((d) => d.fecha?.slice(0, 4))),
        ].sort();
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
        <h4 className="text-xl font-semibold mb-2">
          Error al cargar los partidos
        </h4>
        <p>{error}</p>
      </div>
    );
  }

  // Filtrar partidos por año si yearFilter está seleccionado
  const datosFiltrados = yearFilter
    ? datos.filter((d) => d.fecha?.startsWith(yearFilter))
    : datos;

  // Ordenar de fecha más actual a más vieja
  const datosOrdenados = datosFiltrados.sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div className="container mx-auto max-w-[100vw] px-4">
      <p className="text-center mt-5 text-2xl">
        Partidos ({datosFiltrados.length})
      </p>

      <div className="mt-4 text-center">
        <select
          className=" border border-[var(--dorado)] rounded px-2 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
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
      </div>

      <div className="mx-auto max-w-full container">
        {datosOrdenados.length > 0 ? (
          datosFiltrados.map((item) => (
            <CardPartidos key={item.id} item={item} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No hay partidos para este año.
          </p>
        )}
      </div>
    </div>
  );
};

export default Partidos;
