import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMedalColorVar} from "../../util/funciones";
import { getMedalColorVartext} from "../../util/funciones";
import { useInView } from "react-intersection-observer";
import { API_BASE_URL } from '../../config/api';

const API = `${API_BASE_URL}/estadisticas/top-war`;

const Top5war = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const { ref, inView } = useInView({
    triggerOnce: true, // solo disparar la primera vez
    threshold: [0,0.10,0.25, 0.5, 0.75, 1], // porcentaje visible para activar
  });
  
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

  if (loading) {
    return (
      <div className="text-center py-5">
        <div role="status" aria-label="loading" className="inline-block w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2">Cargando Jugadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los Jugadores</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section 
      className={`py-10`}>
      <div className="max-w-4xl xl:max-w-5xl mx-auto px-4">
        <h2 className="text-center pb-4 text-3xl font-bold text-[var(--dorado)]">🏆 Top 5 en WAR</h2>
        <div 
        ref={ref}
        className={`flex justify-center transition-all duration-400 ease-out ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}>
          <div className="w-full lg:w-[100vw] bg-[var(--gris-oscuro)] rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full divide-y divide-gray-900">
                <thead>
                  <tr className="bg-[var(--gris-claro)]">
                    <th className="px-4 py-3 text-left]">#</th>
                    <th className="px-4 py-3 text-left ">Jugador</th>
                    <th className="px-4 py-3 text-left ">Lugar de Nacimiento</th>
                    <th className="px-4 py-3 text-left ">WAR</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.slice(0, 5).map((item, index) => (

                    <tr key={index} className={`hover:bg-[var(--gris-claro)]  text-[var(${getMedalColorVartext(index)})]`}>
                      <td className={`px-4 py-2 border-l-1 border-[var(--plateado)]`}>
                        <span
                          className={`block px-1 py-1 text-center mx-auto text-white bg-[var(--bronce)] bg-[var(${getMedalColorVar(index)})] rounded-4xl font-semibold lg:text-2xl`}
                        >
                          {index + 1}
                      </span>
                      </td>
                      <td className="px-4 py-2 font-semibold border-l-1 border-[var(--plateado)] lg:text-xl">{item.nombre}</td>
                      <td className="px-4 py-2 border-l-1  border-[var(--plateado)] lg:text-xl">{item.lugar_nacimiento}</td>
                      <td className="px-4 py-2 border-l-1 border-r-1 border-[var(--plateado)] text-bold lg:text-xl">{item.war}</td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center my-6 mx-auto">

          <Link
            to={'/estadisticas'}
            className="inline-block px-16 py-3 border-1  text-[var(--dorado)] rounded hover:bg-[var(--dorado)] hover:text-white hover:border-[var(--plateado)] transition-colors duration-300"
          >
            Ver todos los rankings
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Top5war;
