import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API = 'http://localhost:8081/api/estadisticas/top-war';

const Top5war = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div role="status" aria-label="loading" className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
    <section className="bg-[#1a0805] min-h-screen py-4">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center pb-2 text-3xl font-bold text-yellow-400">🏆 Top 5 en WAR</h2>
        <div className="flex justify-center">
          <div className="w-full lg:w-4/5 bg-gray-800 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-gray-100 divide-y divide-gray-700">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-3 text-left border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">#</th>
                    <th className="px-4 py-3 text-left border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">Jugador</th>
                    <th className="px-4 py-3 text-left border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">Lugar de Nacimiento</th>
                    <th className="px-4 py-3 text-left border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">WAR</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.slice(0, 5).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-4 py-2 border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">
                        <span className="inline-block px-3 py-1 mx-auto text-white bg-red-600 rounded-4xl font-semibold ">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-semibold border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">{item.nombre}</td>
                      <td className="px-4 py-2 border-l-1 border-l-gray-900 border-b-1 border-b-gray-900">{item.lugar_nacimiento}</td>
                      <td className="px-4 py-2 border-l-1 border-l-gray-900 border-b-1 border-b-gray-900 border-b-1 border-b-gray-900">{item.war}</td>
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
            className="inline-block px-16 py-3 border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            Ver todos los rankings
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Top5war;
