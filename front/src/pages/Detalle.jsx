import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:8081/api/jugadores/";
const IMAGE_BASE_URL = "https://api.arsistemamlb.com/uploads/jugadores/";

const Detalle = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URI = API + id;

  const getDatos = async () => {
    try {
      const response = await fetch(URI);
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
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-4 text-red-600">Cargando jugador...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-yellow-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar el jugador</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="text-center py-10">
        <p>No se encontró información del jugador.</p>
      </div>
    );
  }

  const imagenUrl = `${IMAGE_BASE_URL}${id}.jpg`;

  return (
    <div className="bg-[var(--body)] min-h-screen py-10 text-[var(--blanco-hielo)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen y datos básicos */}
          <div className="md:w-1/3 text-center">
            <img
              src={imagenUrl}
              alt={datos.nombre}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200x250?text=Sin+Imagen";
              }}
              className="mx-auto rounded-lg shadow-md object-center max-h-72 w-full"
              style={{maxHeight: "450px" }}
            />
            <h5 className="mt-4 text-xl font-semibold">{datos.nombre}</h5>
            <p className="text-gray-300">
              {datos.pos} | {datos.lugar_nacimiento} | {new Date(datos.fecha_nacimiento).getFullYear()}
            </p>
          </div>
          {/* Información detallada */}
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{datos.nombre}</h2>
            <p className="leading-relaxed text-gray-700 mb-10">{datos.biografia}</p>
            <h4 className="text-2xl font-semibold mb-4 text-center">Estadísticas de Carrera</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[var(--vinotinto)] rounded shadow overflow-hidden">
                <tbody>
                  {[
                    ["Equipo", datos.nombre_equipo],
                    ["Posición", datos.pos],
                    ["Años en MLB", datos.años_en_mlb],
                    ["Año de Debut / Retiro", `${datos.año_debut} – ${datos.año_retiro}`],
                    ["Partidos Jugados", datos.partidos_jugados.toLocaleString()],
                    ["Turnos al Bate", datos.turnos_bateo.toLocaleString()],
                    ["Hits", datos.hits.toLocaleString()],
                    ["Dobles / Triples", `${datos.dobles} / ${datos.triples}`],
                    ["Home Runs", datos.home_runs],
                    ["Carreras Impulsadas (RBI)", datos.carreras_impulsadas.toLocaleString()],
                    ["Base por Bola", datos.bases_por_bola.toLocaleString()],
                    ["Ponches", datos.ponches.toLocaleString()],
                    ["Promedio de Bateo", datos.promedio_bateo],
                    ["Porcentaje de Enbase (OBP)", datos.porcentaje_embase],
                    ["Porcentaje de Slugging (SLG)", datos.porcentaje_slugging],
                    ["OPS", datos.ops],
                    ["WAR (Wins Above Replacement)", datos.war],
                    ["All-Star Appearances", datos.all_star_appearances],
                    ["Robos de Base", `${datos.bases_robadas} (atrapado ${datos.atrapado_robando} veces)`]
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b last:border-none">
                      <th className="px-4 py-2 text-left font-medium bg-[var(--vinotinto)]">{label}</th>
                      <td className="px-4 py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {datos.anecdotas && (
              <div className="mt-6 p-4 bg-white rounded shadow">
                <h5 className="text-lg font-semibold mb-2">🔍 Anécdota interesante</h5>
                <blockquote className="italic text-gray-700">{datos.anecdotas}</blockquote>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
