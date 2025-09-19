import { Link } from 'react-router-dom';
import { formatNumberEs } from '../util/funciones';

const CardJugadores = ({ item, l1, v1, l2, v2, l3, v3 }) => {
  return (
    <div className="w-70 md:w-55 xl:w-60 2xl:w-70 my-4 animate-slide-top px-2 mx-auto sm:mx-0">
      <div className="bg-[#60090e] rounded shadow-lg h-full flex flex-col shadow-black border-[#9b1818] border-1">
        <div className="overflow-hidden rounded-t border-[#3b0808] border-1">
          <img
            src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
            alt={item.nombre}
            className="w-full h-48 object-center"
            onError={(e) => {
              e.target.src =
                "https://api.arsistemamlb.com/uploads/jugadores/default.png";
            }}
          />
        </div>
        <div className="flex flex-col flex-grow p-4 text-center justify-between border-[#3b0808] border-1">
          <p className="font-bold text-lg">{item.nombre}</p>
          <p className="my-3">
            <span className="inline-block bg-red-400 text-gray-900 px-3 py-1 rounded-full mb-3">
              {l1}: {formatNumberEs(v1)}
            </span>
            <br />
            <b>{l2}:</b> {v2}
            <br />
            <b>{l3}:</b> {v3}
          </p>
          <p>
            {item.all_star_appearances > 0 && (
              <span className="inline-block bg-red-600 text-white px-2 py-1 rounded">
                ⭐ All-Star: {item.all_star_appearances}
              </span>
            )}
          </p>
          <p>
            <span className="inline-block bg-[#230507] text-white px-2 py-1 rounded mt-3">
              <b>Años en MLB: </b>
              {item.años_en_mlb}
            </span>
          </p>
        </div>
        <div className="p-4 bg-[#360609] flex justify-center gap-3 rounded-b">
          <button
            className="border border-yellow-300 text-yellow-500 text-sm px-3 py-1 rounded hover:bg-yellow-500 hover:text-white transition"
            data-bs-toggle="modal"
            data-bs-target={`#jug${item.id}`}
          >
            Perfil
          </button>
          <Link
            to={`/detalle/${item.id}/${item.nombre}`}
            className="border border-red-600 text-red-600 text-sm px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
          >
            Detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardJugadores;
