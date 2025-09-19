import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const API_MAPA = 'http://localhost:8081/api/mapa/top-city';
const API_JUGADORES = 'http://localhost:8081/api/jugadores';

const Mapa = () => {

    const [showModal, setShowModal] = useState(false);

const handleOpenList = (lugarNacimiento) => {
  const lista = getJugadoresPorCiudad(lugarNacimiento);
  setJugadoresPorCiudad(lista);
  setCiudadSeleccionada(lugarNacimiento);
  setShowModal(true); // abrir modal
};

const handleCloseModal = () => {
  setShowModal(false);
};

    const [ciudades, setCiudades] = useState([]);
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Estado para el modal de lista
    const [jugadoresPorCiudad, setJugadoresPorCiudad] = useState([]);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);

    const getDatos = async () => {
        try {
            // Hacer ambas peticiones en paralelo
            const [resCiudades, resJugadores] = await Promise.all([
                // Petición 1: Ciudades
                fetch(API_MAPA),
                // Petición 2: Jugadores
                fetch(API_JUGADORES)
            ]);

            // Verificar si ambas respuestas son exitosas
            if (!resCiudades.ok) {
                throw new Error(`Error en ciudades: ${resCiudades.status} ${resCiudades.statusText}`);
            }
            if (!resJugadores.ok) {
                throw new Error(`Error en jugadores: ${resJugadores.status} ${resJugadores.statusText}`);
            }

            // Convertir a JSON
            const dataCiudades = await resCiudades.json();
            const dataJugadores = await resJugadores.json();

            // Guardar en el estado
            setCiudades(dataCiudades);
            setJugadores(dataJugadores);

            // Terminar carga
            setLoading(false);

        } catch (err) {
            console.error('Error en getDatos:', err);
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);

    // Obtener jugadores por ciudad
    const getJugadoresPorCiudad = (lugarNacimiento) => {
        return jugadores
            .filter(j => j.lugar_nacimiento === lugarNacimiento)
            .sort((a, b) => (b.war || 0) - (a.war || 0)); // Ordenar por WAR
    };



    // Obtener el objeto del jugador destacado para usar en el modal
    const getJugadorById = (id) => {
        return jugadores.find(j => j.id === id) || null;
    };


    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Personajes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }


    return (
        // Dentro del return del componente Mapa (solo JSX transformado)

<div className="container mx-auto my-20 px-4">

  <div className="text-center mb-20">
    <h3 className="font-bold text-3xl">🗺️ Mapa del Talento Venezolano</h3>
    <p className="text-gray-300 text-lg max-w-xl mx-auto mt-2">
      Descubre de dónde vienen los peloteros venezolanos que han llegado a las Grandes Ligas.
    </p>
  </div>

  {/* Tarjetas de ciudades */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
    {ciudades.map((ciudad) => {
      const jugador = getJugadorById(ciudad.id);
      return (
        <div className="bg-gray-900 shadow-sm rounded-lg flex flex-col h-full" key={`${ciudad.lugar_nacimiento}-${ciudad.id}`}>
          {/* Bandera o título */}
          <div className="bg-gray-800 shadow-sm shadow-black text-gray-200 text-center py-5 rounded-t-lg">
            <h3 className="text-lg font-semibold">{ciudad.lugar_nacimiento.split(',')[0]}</h3>
          </div>

          {/* Foto del jugador destacado */}
          <div className="mt-4 flex justify-center">
            {jugador ? (
              <img
                src={`https://api.arsistemamlb.com/uploads/jugadores/${jugador.id}.jpg`}
                alt={jugador.nombre}
                className="rounded-full w-24 h-24 object-cover border border-gray-300"
                onError={(e) => { e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png'; }}
              />
            ) : (
              <div className="rounded-full bg-gray-400 w-24 h-24"></div>
            )}
          </div>

          {/* Datos */}
          <div className="p-4 text-center flex-grow flex flex-col justify-between">
            <div>
              <h5 className="text-lg font-semibold">{ciudad.jugador_destacado}</h5>
              <p className="text-gray-200 text-sm">{ciudad.lugar_nacimiento}</p>
              <div className="mt-3">
                <p>
                  <strong>Jugadores:</strong>{' '}
                  <span className="inline-block bg-red-500 text-white rounded-full px-3 py-1 text-sm">
                    {ciudad.total_jugadores}
                  </span>
                </p>
                <p><strong>WAR:</strong> {parseFloat(ciudad.war_del_destacado).toFixed(1)}</p>
              </div>
            </div>

            <div className="mt-4">
              {jugador ? (
                <button
                  onClick={() => handleOpenList(ciudad.lugar_nacimiento)}
                  data-bs-toggle="modal"
                  data-bs-target="#modalListaCiudad"
                  className="border border-red-500 shadow-lg hover:shadow-black text-red-600 hover:bg-red-500 hover:text-white transition-all duration-400 rounded px-4 py-1 text-sm"
                >
                  Todos ({ciudad.total_jugadores})
                </button>
              ) : (
                <button
                  disabled
                  className="border border-gray-400 text-gray-400 rounded px-4 py-1 text-sm cursor-not-allowed"
                >
                  Sin datos
                </button>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>

  {/* Modal: Lista de jugadores por ciudad */}
{/* Modal: Lista de jugadores por ciudad */}
{showModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    aria-modal="true"
    role="dialog"
    aria-labelledby="modalListaCiudadLabel"
  >
    <div className="bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h5 className="text-lg font-semibold text-white" id="modalListaCiudadLabel">
          🏙️ Jugadores de {ciudadSeleccionada?.split(',')[0]}
        </h5>
        <button
          onClick={handleCloseModal}
          aria-label="Cerrar modal"
          className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="overflow-auto p-4 flex-grow text-white">
        {jugadoresPorCiudad.length === 0 ? (
          <p className="text-gray-400 text-center py-12">Cargando lista...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="w-16 p-3 border border-gray-700"></th>
                <th className="text-left p-3 border border-gray-700">Nombre</th>
                <th className="text-center p-3 border border-gray-700">Años en la MLB</th>
                <th className="text-center p-3 border border-gray-700">Pos</th>
                <th className="text-center p-3 border border-gray-700">WAR</th>
                <th className="text-center p-3 border border-gray-700">HR</th>
                <th className="text-center p-3 border border-gray-700">AVG</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresPorCiudad.map((j) => (
                <tr key={j.id} className="hover:bg-gray-800">
                  <td className="p-2 border border-gray-700">
                    <img
                      src={`https://api.arsistemamlb.com/uploads/jugadores/${j.id}.jpg`}
                      alt={j.nombre}
                      className="rounded-full w-10 h-10 object-cover"
                      onError={(e) => { e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png'; }}
                    />
                  </td>
                  <td className="p-2 border border-gray-700 font-semibold">{j.nombre}</td>
                  <td className="p-2 border border-gray-700 font-semibold text-center">{j.años_en_mlb}</td>
                  <td className="p-2 border border-gray-700 text-center">
                    <span className="bg-gray-600 text-white rounded-full px-2 text-xs">{j.pos || 'N/A'}</span>
                  </td>
                  <td className="p-2 border border-gray-700 text-center text-sm">{j.war ? parseFloat(j.war).toFixed(1) : 'N/A'}</td>
                  <td className="p-2 border border-gray-700 text-center text-sm">{j.home_runs || 0}</td>
                  <td className="p-2 border border-gray-700 text-center text-sm">{j.promedio_bateo ? `.${(j.promedio_bateo * 1000).toFixed(0)}` : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-right">
        <button
          onClick={handleCloseModal}
          className="bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2 font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}


  {/* Estadística destacada */}
  <div className="bg-white rounded-lg p-6 mt-20 text-center shadow">
    <h4 className="text-xl font-semibold mb-3">📊 Datos Clave</h4>
    <p className="text-gray-700 max-w-xl mx-auto">
      <strong>Caracas</strong> lidera con <strong>{ciudades[0]?.total_jugadores || 0}</strong> peloteros en MLB,
      seguida por <strong>Maracay</strong> con <strong>{ciudades[1]?.total_jugadores || 0}</strong>.
    </p>
  </div>
</div>

    )
}

export default Mapa