import { Link } from "react-router-dom";
import { formatNumberEs } from "../util/funciones";
import { useState } from "react";
import { getMedalColorVar} from "../util/funciones";

const CardJugadores = ({ item, l1, v1, l2, v2, l3, v3, contador=4}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const borderClass =
    contador <= 3
      ? `border-[var(${getMedalColorVar(contador-1)})] text-[var(${getMedalColorVar(contador-1)})] text-[var(--bronce)]`
      : "border-[var(--vinotinto)]";
  const medalla =
    contador <= 3
      ? `block absolute px-6 py-4 text-center mx-auto bg-[var(${getMedalColorVar(contador-1)})] rounded-4xl font-semibold lg:text-md text-black border-1`
      : "hidden";
  return (
    <div className="w-70 md:w-55 xl:w-60 2xl:w-70 my-4 animate-slide-top px-2 mx-auto sm:mx-0">
      <div className="bg-[var(--gris-oscuro)] rounded shadow-xl h-full flex flex-col shadow-black border-[var(--vinotinto)] border-1">
        <div className="overflow-hidden rounded-t border-[var(--vinotinto)] border-1">
          <span
            className={`${medalla}`}
          >
            top: {contador}
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
          <button
            onClick={() => openModal(item.id)}
            className="hover:bg-[var(--dorado)] hover:text-black text-[var(--dorado)] border-1 px-3 py-1 rounded font-semibold hover:cursor-pointer"
          >
            Perfil
          </button>
          <Link
            to={`/detalle/${item.id}/${item.nombre}`}
            className="border text-[var(--plateado)] text-md px-3 py-1 rounded hover:bg-[var(--plateado)] hover:text-black transition"
          >
            Detalle
          </Link>
        </div>
      </div>
      {modalOpen && (
        <div
          className={`fixed inset-0 bg-[#0000005f] bg-opacity-50 flex items-center justify-center z-50 `}
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="bg-[var(--body)] rounded-lg p-6 xl:max-w-[60vw] w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="text-[var(--blanco-hielo)] scale-200 text-2xl font-bold mb-4 hover:text-[var(--dorado)]"
              aria-label="Cerrar modal"
            >
              &times;
            </button>
            <div className="flex flex-wrap grid-cols-1 lg:grid-cols-2 justify-center text-[var(--blanco-hielo)]">
              <div className="w-[25vh] xl:w-[30vh]">
                <div className="2xl:w-50  mx-auto">
                  <div className="overflow-hidden rounded-full border-[var(--vinotinto)] border-1 justify-center">
                    <img
                      src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
                      alt={item.nombre}
                      className="w-full h-50 object-center"
                      onError={(e) => {
                        e.target.src =
                          "https://api.arsistemamlb.com/uploads/jugadores/default.png";
                      }}
                    />
                  </div>
                  <p className="text-center text-xl mt-2">{item.nombre}</p>
                </div>
              </div>

              <div className="w-[70vh]">
                <table className="min-w-full bg-[var(--gris-claro)] rounded-md overflow-hidden shadow-lg shadow-[#010000]">
                  <tbody>
                    {[
                      ["Equipo", item.nombre_equipo],
                      ["Posición", item.pos],
                      ["Años en MLB", item.años_en_mlb],
                      [
                        "Año de Debut / Retiro",
                        `${item.año_debut} – ${item.año_retiro}`,
                      ],
                      [
                        "Partidos Jugados",
                        item.partidos_jugados.toLocaleString(),
                      ],
                      ["Turnos al Bate", item.turnos_bateo.toLocaleString()],
                      ["Hits", item.hits.toLocaleString()],
                      ["Dobles / Triples", `${item.dobles} / ${item.triples}`],
                      ["Home Runs", item.home_runs],
                      [
                        "Carreras Impulsadas (RBI)",
                        item.carreras_impulsadas.toLocaleString(),
                      ],
                      ["Base por Bola", item.bases_por_bola.toLocaleString()],
                      ["Ponches", item.ponches.toLocaleString()],
                      ["Promedio de Bateo", item.promedio_bateo],
                      ["Porcentaje de Enbase (OBP)", item.porcentaje_embase],
                      [
                        "Porcentaje de Slugging (SLG)",
                        item.porcentaje_slugging,
                      ],
                      ["OPS", item.ops],
                      ["WAR (Wins Above Replacement)", item.war],
                      ["All-Star Appearances", item.all_star_appearances],
                      [
                        "Robos de Base",
                        `${item.bases_robadas} (atrapado ${item.atrapado_robando} veces)`,
                      ],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b last:border-none">
                        <th className="px-4 py-2 text-left font-medium bg-[var(--gris-oscuro)] hover:bg-[var(--gris-claro)]">
                          {label}
                        </th>
                        <td className="px-4 py-2 border-l border-[var(--plateado)]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardJugadores;
