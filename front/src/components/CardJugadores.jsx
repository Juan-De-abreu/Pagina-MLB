import { Link } from "react-router-dom";
import { formatNumberEs } from "../util/funciones";
import { useEffect, useState } from "react";
import { getMedalColorVar } from "../util/funciones";
import { useInView } from "react-intersection-observer";
import { API_BASE_URL } from '../config/api';

const CardJugadores = ({ item, l1, v1, l2, v2, l3, v3, contador = 4 }) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [favorito, setFavorito] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: [0.25, 0.5, 0.75, 1],
  });

  // Animación de visibilidad
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), (contador - 1) * 100);
    setLoading(false);
    return () => clearTimeout(timer);
  }, [contador]);

  // Chequear si es favorito
  useEffect(() => {
    const checkFavorito = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return;
        const resp = await fetch(`${API_BASE_URL}/favoritos/jugadores`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) return;
        const favs = await resp.json();
        const esta = favs.some(f => f.id === item.id);
        setFavorito(esta);
      } catch {
        // Opcional: manejo de error
      }
    };
    checkFavorito();
  }, [item.id]);

  // Función toggle favorito con manejo optimista y revertir en error
  const toggleFavorito = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("Necesitas iniciar sesión");
        return;
      }
      setFavorito(prev => !prev);

      if (favorito) {
        // Quitar favorito
        await fetch(`${API_BASE_URL}/favoritos?tipo=jugador&id=${item.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Agregar favorito
        await fetch(`${API_BASE_URL}/favoritos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tipo: "jugador", id: item.id }),
        });
      }
    } catch {
      setFavorito(prev => !prev); // Revertir cambio en caso de error
      alert("Error al actualizar favoritos");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  const borderClass =
    contador <= 3
      ? `border-[var(${getMedalColorVar(contador - 1)})] text-[var(${getMedalColorVar(contador - 1)})] text-[var(--bronce)]`
      : "border-[var(--gris-claro)]";

  const medalla =
    contador <= 3
      ? `block absolute px-3 py-3 text-center mx-auto bg-[var(${getMedalColorVar(contador - 1)})] rounded-full font-bold lg:text-md text-black border-1`
      : "hidden";

  return (
    <div
      className={`w-70 md:w-55 xl:w-60 2xl:w-70 my-4 animate-slide-top px-2 mx-auto sm:mx-0 transition-all duration-400 ease-out ${
        visible && inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ animationDelay: "0s" }}
      ref={ref}
    >
      <div className="bg-[var(--gris-oscuro)] rounded shadow-s transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col shadow-[#838a0d56] border-[var(--gris-claro)] border-1 relative">
        <div className="overflow-hidden rounded-t border-[var(--gris-claro)] border-1 relative">
          <span className={medalla}>{contador}</span>
          <img
            src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
            alt={item.nombre}
            className="w-full h-65 object-center"
            onError={e => (e.target.src = "https://api.arsistemamlb.com/uploads/jugadores/default.png")}
          />
          {/* Botón para favoritos */}
          <button
            onClick={toggleFavorito}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 ${
              favorito ? "text-yellow-400" : "text-black hover:text-yellow-400"
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
        <div className={`flex flex-col flex-grow p-4 text-center ${borderClass} justify-between border-1`}>
          <p className="font-bold text-lg">{item.nombre}</p>
          <p className="my-3">
            <span className="border-1 inline-block px-3 py-1 rounded-md mb-3">
              {l1}: {formatNumberEs(v1)}
            </span>
            <br />
            <b>{l2}:</b> {v2}
            <br />
            <b>{l3}:</b> {v3}
          </p>
          <p>
            {item.all_star_appearances > 0 && (
              <span className="inline-block border-1 bg-[var(--plateado)] text-black px-2 py-1 rounded">
                <span className="font-bold"> ⭐ All-Star:</span> {item.all_star_appearances}
              </span>
            )}
          </p>
          <p>
            <span className="inline-block bg-[var(--plateado)] text-black px-2 py-1 rounded mt-3">
              <b>Años en MLB: </b>
              {item.años_en_mlb}
            </span>
          </p>
        </div>
        <div className="p-4 bg-[var(--gris-claro)] flex justify-center gap-3 rounded-b border-b-1 border-[var(--dorado)]">
          <Link
            to={`/detalle/${item.id}/${item.nombre}`}
            className="border text-[var(--dorado)] text-md px-3 py-1 rounded hover:bg-[var(--dorado)] hover:text-black transition"
          >
            Detalles del jugador
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardJugadores;
