import { Link } from "react-router-dom";
import { formatNumberEs } from "../util/funciones";
import { useEffect, useState } from "react";
import { getMedalColorVar} from "../util/funciones";

const CardJugadores = ({ item, l1, v1, l2, v2, l3, v3, contador=4}) => {
  const [loading, setLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, contador * 550);
    return () => clearTimeout(timer),setLoading(false);
  }, [contador]);
  
  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  const borderClass =
    contador <= 3
      ? `border-[var(${getMedalColorVar(contador-1)})] text-[var(${getMedalColorVar(contador-1)})] text-[var(--bronce)]`
      : "border-[var(--vinotinto)]";
  const medalla =
    contador <= 3
      ? `block absolute px-3 py-3 text-center mx-auto bg-[var(${getMedalColorVar(contador-1)})] rounded-full font-bold lg:text-md text-black border-1`
      : "hidden";
  return (
    <div 
      className={`w-70 md:w-55 xl:w-60 2xl:w-70 my-4 animate-slide-top px-2 mx-auto sm:mx-0 
        animate-scale-in-steps 
        ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ animationDelay: `${contador * 0.1}s` }}
>
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-1">
        <div className="overflow-hidden rounded-t border-[var(--vinotinto)] border-1">
          <span
            className={`${medalla}`}
          >
            {contador}
          </span>
          <img
            src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
            alt={item.nombre}
            className="w-full h-65 object-center"
            onError={(e) => {
              e.target.src =
                "https://api.arsistemamlb.com/uploads/jugadores/default.png";
            }}
          />
        </div>
        <div className={`flex flex-col flex-grow p-4 text-center ${borderClass} justify-between  border-1`}>
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
        <div className="p-4 bg-[var(--vinotinto)] flex justify-center gap-3 rounded-b border-b-1 border-[#520f0f]">

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
