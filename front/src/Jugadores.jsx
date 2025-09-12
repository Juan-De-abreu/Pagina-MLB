import { useEffect, useState } from "react";
import CardJugadores from "./components/CardJugadores";


const API = "http://localhost:8081/api/jugadores";

const Jugadores = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJugadores, setFilteredJugadores] = useState([]);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

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

    setFilteredJugadores(filtered);
  }, [datos, search, positionFilter]);

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
    <div className="bg-[#5e2129] py-4 min-h-screen">
      <div className="container mx-auto px-4">
        <h3 className="text-center py-2 text-2xl font-semibold">📋 Jugadores Venezolanos en el MLB</h3>
        <p className="text-center text-gray-200 mb-6">
          {datos.length} jugadores que han representado a la Vinotinto
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-red-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">Seleccione una posición</option>
            {posiciones.map((item, index) => (
              <option className="bg-[#2E2E2E]" key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            className="bg-transparent border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition w-full md:w-auto"
            onClick={() => {
              setSearch("");
              setPositionFilter("");
            }}
          >
            Limpiar
          </button>
        </div>

        {filteredJugadores.length === 0 ? (
          <div className="text-center py-6 bg-red-200 text-red-700 rounded">
            No se encontraron jugadores con esos filtros.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
            {filteredJugadores.map((item) => (
              <CardJugadores
                key={item.id}
                item={item}
                l1={"WAR"}
                v1={item.war}
                l2={"HR"}
                v2={item.home_runs}
                l3={"AVG"}
                v3={item.promedio_bateo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jugadores;
