import { Link } from "react-router-dom";
import { API_BASE_URL } from '../config/api';
import { getMedalColorVartext } from "../util/funciones";
import { useEffect, useState } from "react";
import { getMedalColorVar } from "../util/funciones";
import { useInView } from "react-intersection-observer";

const CardEquipos = ({ item, contador = 4 }) => {
  const API = `${API_BASE_URL}/equipos/${item.id}`;
  const [error, setError] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false); // Estado para favorito
  const { ref, inView } = useInView({
    triggerOnce: true, // solo disparar la primera vez
    threshold: [0.25, 0.5, 0.75, 1], // porcentaje visible para activar
  });

  useEffect(() => {
    // Cargar datos del equipo
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
    getDatos();

    // Verificar si el equipo está en favoritos
    const checkFavorito = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return;
        const response = await fetch(`${API_BASE_URL}/favoritos/equipos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;
        const favoritos = await response.json();
        const estaFavorito = favoritos.some(fav => fav.id === item.id);
        setFavorito(estaFavorito);
      } catch {
        // No hacer nada en error
      }
    };
    checkFavorito();
  }, [contador, item.id, API]);

  const toggleFavorito = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("Debes iniciar sesión para gestionar favoritos.");
        return;
      }
      setFavorito(prev => !prev); // Optimista

      if (!favorito) {
        // Agregar favorito
        await fetch(`${API_BASE_URL}/favoritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tipo: "equipo", id: item.id }),
        });
      } else {
        // Quitar favorito
        await fetch(`${API_BASE_URL}/favoritos?tipo=equipo&id=${item.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      alert("Error al actualizar favoritos.");
      setFavorito(prev => !prev); // Revertir cambio optimista en error
    }
  };

  if (loading) return <p>Cargando jugadores...</p>;
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los Jugadores</h4>
        <p>{error}</p>
      </div>
    );

  const borderClass = contador <= 3 ? `text-[var(${getMedalColorVartext(contador - 1)})]` : "border-[var(--vinotinto)]";
  const medalla = contador <= 3 ? `block absolute px-3 py-3 text-center mx-auto bg-[var(${getMedalColorVar(contador - 1)})] rounded-4xl font-semibold lg:text-md text-black border-1` : "hidden";

  return (
    <div
      className={`w-[80vw] lg:w-80 xl:w-100 2xl:w-110 my-4 animate-slide-top px-2 mx-auto sm:mx-0 transition-all duration-400 ease-out
       ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
      ref={ref}
      style={{ animationDelay: `${contador * 0.3}s` }}
    >
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-2 relative">
        <div className="overflow-hidden rounded-t border-[var(--vinotinto)] border-1 relative">
          <span className={`${medalla}`}>{contador}</span>
          <img src={`${item.logo_url}`} alt={item.nombre} className="w-full h-65 object-center" />
          {/* Botón estrella */}
          <button
            onClick={toggleFavorito}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 ${
              favorito ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
            }`}
            aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={favorito ? "currentColor" : "none"}
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
          </button>
        </div>
        <div className={`flex flex-col flex-grow p-4 text-center justify-between border-2 ${borderClass} `}>
          <p className="font-bold text-lg">{item.nombre}</p>
          <p className="my-3 text-center">
            <span className="mb-3">
              Ciudad: {item.ciudad}
              <br />
              Campeonatos nacionales: {item.titulos_nacionales}
              <br />
              Campeonatos serie caribe: {item.titulos_serie_caribe}
              <br />
            </span>
          </p>
        </div>
        <div className="p-4 bg-[var(--vinotinto)] flex justify-center gap-3 rounded-b border-b-1 border-[#520f0f]">
          <Link to={`/jugadores?equipo=${encodeURIComponent(item.nombre)}`} className="border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition">
            Jugadores ({datos.length})
          </Link>

          <Link to={`/equipo/${item.id}/${item.nombre}`} className="border text-[var(--dorado)] text-md px-6 py-3 rounded hover:bg-[var(--dorado)] hover:text-black transition">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardEquipos;
