import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardJugadores from "../components/CardJugadores";
import CardEquipos from "../components/CardEquipos";
import CardPartidos from "../components/CardPartidos";

const API_BASE = "http://localhost:8081/api/favoritos";
const API_PARTIDOS = "http://localhost:8081/api/favoritos/partidos";

const Favoritos = () => {
  const location = useLocation();

  const [tipoFiltro, setTipoFiltro] = useState("jugadores");
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("No autorizado. Por favor inicia sesión.");
        setLoading(false);
        return;
      }

      let url = tipoFiltro === "partidos" ? API_PARTIDOS : `${API_BASE}/${tipoFiltro}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, [tipoFiltro]);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        />
        <p className="mt-4 text-red-600">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar datos</h4>
        <p>{error}</p>
      </div>
    );
  }

  const baseBtnClass = "px-4 py-2 rounded border cursor-pointer transition-colors duration-300 ease-in-out";

  // Mapear tipoFiltro a clases Tailwind para cantidad columnas grid
  const columnasGrid = {
    jugadores: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    equipos: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    partidos: "grid-cols-1 grid-cols-1",
  };

  return (
    <div className="bg-[var(--body)] py-4 min-h-screen text-[var(--blanco-hielo)]">
      <div className="container mx-auto px-4">
        <h3 className="text-center py-2 text-xl lg:text-6xl font-semibold flex items-center justify-center gap-2 my-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          Favoritos
        </h3>

        <div className="justify-center gap-4 mb-6 flex text-lg lg:text-4xl">
          <button
            className={`${baseBtnClass} ${
              tipoFiltro === "jugadores"
                ? "bg-[var(--dorado)] text-black border-transparent"
                : "border-[var(--dorado)] text-[var(--dorado)] hover:bg-[var(--dorado)] hover:text-black"
            }`}
            onClick={() => setTipoFiltro("jugadores")}
          >
            Jugadores
          </button>

          <button
            className={`${baseBtnClass} ${
              tipoFiltro === "equipos"
                ? "bg-[var(--dorado)] text-black border-transparent"
                : "border-[var(--dorado)] text-[var(--dorado)] hover:bg-[var(--dorado)] hover:text-black"
            }`}
            onClick={() => setTipoFiltro("equipos")}
          >
            Equipos
          </button>

          <button
            className={`${baseBtnClass} ${
              tipoFiltro === "partidos"
                ? "bg-[var(--dorado)] text-black border-transparent"
                : "border-[var(--dorado)] text-[var(--dorado)] hover:bg-[var(--dorado)] hover:text-black"
            }`}
            onClick={() => setTipoFiltro("partidos")}
          >
            Partidos
          </button>
        </div>

        {datos.length === 0 ? (
          <div className="text-center py-6 bg-red-800 text-white rounded-4xl">
            Aún no hay datos para mostrar.
          </div>
        ) : (
          <div className={`grid gap-4 ${columnasGrid[tipoFiltro]}`}>
            {tipoFiltro === "jugadores"
              ? datos.map((item, index) => (
                  <CardJugadores key={item.id}
                item={item}
                l1={"WAR"}
                v1={item.war}
                l2={"HR"}
                v2={item.home_runs}
                l3={"AVG"}
                v3={item.promedio_bateo}
                contador={index + 4} />
                ))
              : tipoFiltro === "equipos"
              ? datos.map((item, index) => (
                  <CardEquipos key={item.id} item={{ ...item, contador: index + 4 }} />
                ))
              : datos.map((item, index) => (
                  <CardPartidos key={item.id} item={{ ...item, contador: index + 4 }} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos;
