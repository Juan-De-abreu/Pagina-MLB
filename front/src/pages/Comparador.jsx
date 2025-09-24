
// src/components/Comparador2.jsx
import { useState, useEffect } from 'react';
const API = 'http://localhost:8081/api/jugadores';

const Comparador = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [jugador1, setJugador1] = useState(null);
    const [jugador2, setJugador2] = useState(null);

    // Estados para autocompletado
    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [filtered1, setFiltered1] = useState([]);
    const [filtered2, setFiltered2] = useState([]);
    const [showSuggestions1, setShowSuggestions1] = useState(false);
    const [showSuggestions2, setShowSuggestions2] = useState(false);



    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data);
            console.log(data)
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);

    /*
    // useEffect para filtrar sugerencias en base al texto ingresado en query1.
    // Si query1 está vacío, limpia las sugerencias (filtered1).
    // Filtra el arreglo 'datos' para incluir solo jugadores cuyo nombre contiene el texto de query1 (sin importar mayúsculas/minúsculas).
    // Limita el resultado a un máximo de 8 jugadores.
    // Actualiza el estado filtered1 con los resultados filtrados y muestra las sugerencias solo si hay resultados.
    */
    // Filtrar sugerencias para jugador 1
    useEffect(() => {
        if (!query1) {
            setFiltered1([]);
            return;
        }
        const results = datos
            .filter(j => j.nombre.toLowerCase().includes(query1.toLowerCase()))
            .slice(0, 8);
        setFiltered1(results);
        setShowSuggestions1(results.length > 0);
    }, [query1, datos]);

    // Filtrar sugerencias para jugador 2
    useEffect(() => {
        if (!query2) {
            setFiltered2([]);
            return;
        }
        const results = datos
            .filter(j => j.nombre.toLowerCase().includes(query2.toLowerCase()))
            .slice(0, 8);
        setFiltered2(results);
        setShowSuggestions2(results.length > 0);
    }, [query2, datos]);

    // Función para seleccionar jugador 1
    const handleSelect1 = (jugador) => {
        setJugador1(jugador);
        setQuery1(jugador.nombre);
        setShowSuggestions1(false);
    };
    // Función para seleccionar jugador 2
    const handleSelect2 = (jugador) => {
        setJugador2(jugador);
        setQuery2(jugador.nombre);
        setShowSuggestions2(false);
    };
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 fs-5">Cargando Peloteros...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <div className="alert alert-danger mx-auto" style={{ maxWidth: '500px' }}>
                    <h4>⚠️ Error al cargar los Peloteros</h4>
                    <p className="mb-0">{error}</p>
                </div>
            </div>
        );
    }

    // Formatear estadísticas
    const formatStat = (value, type) => {
        if (value == null) return '—';
        switch (type) {
            case 'avg':
                return (value * 1000).toFixed(0);
            case 'ops':
                return parseFloat(value).toFixed(3).replace(/^0\./, '.');
            case 'war':
            case 'hr':
                return parseFloat(value).toFixed(1);
            default:
                return value;
        }
    };
    // Determinar quién gana en cada estadística
    const getBetterPlayer = (stat, j1, j2) => {
        const val1 = parseFloat(j1[stat]);
        const val2 = parseFloat(j2[stat]);
        if (isNaN(val1) || isNaN(val2)) return null;
        if (val1 > val2) return 1;
        if (val2 > val1) return 2;
        return 0;
    };
  const calcularGanador = () => {
  if (!jugador1 || !jugador2) return null;

  const estadisticas = [
    'war',
    'promedio_bateo',
    'ops',
    'hits',
    'dobles',
    'triples',
    'carreras_impulsadas',
    'bases_robadas',
    'home_runs',
    'años_en_mlb'
  ];

  let puntos1 = 0;
  let puntos2 = 0;

  estadisticas.forEach(key => {
    const val1 = parseFloat(jugador1[key]);
    const val2 = parseFloat(jugador2[key]);

    // Validar que ambos tengan valor
    if (isNaN(val1) || isNaN(val2)) return;

    if (val1 > val2) puntos1++;
    if (val2 > val1) puntos2++;
  });

  // Calcular porcentaje
  const total = puntos1 + puntos2;
  const porcentaje1 = total > 0 ? (puntos1 / total) * 100 : 50;
  const porcentaje2 = 100 - porcentaje1;

  return {
    jugador1: { ...jugador1, puntos: puntos1 },
    jugador2: { ...jugador2, puntos: puntos2 },
    porcentaje1,
    porcentaje2,
    ganador: puntos1 > puntos2 ? 1 : puntos2 > puntos1 ? 2 : 0 // 0 = empate
  };
};

    return (
        // Dentro del return del componente Comparador (solo JSX relevante transformado)
  <div className='bg-[var(--body)] min-h-screen'>
    <div className="container mx-auto my-16 px-4">

      <div className="text-center mb-20">
        <h3 className="font-bold text-3xl">⚾ Comparador de Peloteros Venezolanos</h3>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mt-2">
          Escribe el nombre de un jugador para comparar sus estadísticas en las Grandes Ligas
        </p>
      </div>

      {/* Buscadores con autocompletado */}
      <div className="flex flex-wrap justify-center gap-6 mb-20">

        {/* Jugador 1 */}
        <div className="w-full md:w-5/12 hover:scale-102 hover:transition-all duration-200 bg-[ #320f09]">
          <div className="shadow-black border-1 shadow-sm hover:shadow-lg rounded-lg">
            <div className="p-6 text-center">
              <h5 className="text-xl mb-4 font-semibold">Jugador 1</h5>

              <div className="relative">
                <input
                  type="text"
                  className="w-full form-input form-input-lg rounded border border-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none p-3 text-lg"
                  placeholder="Buscar por nombre..."
                  value={query1}
                  onChange={(e) => setQuery1(e.target.value)}
                  onFocus={() => query1 && setShowSuggestions1(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions1(false), 200)}
                />
                {showSuggestions1 && (
                  <ul className="absolute w-full mt-1 bg-gray-700 shadow-lg rounded max-h-52 overflow-auto z-50">
                    {filtered1.map((j) => (
                      <li
                        key={j.id}
                        className="cursor-pointer hover:bg-gray-500 px-2 py-2 flex items-center gap-2"
                        onClick={() => handleSelect1(j)}
                      >
                        <img
                          src={`https://api.arsistemamlb.com/uploads/jugadores/${j.id}.jpg`}
                          alt={j.nombre}
                          className="rounded-full w-8 h-8 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png';
                          }}
                        />
                        <span>{j.nombre} {j.pos ? `(${j.pos})` : ''}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* VS */}
        <div className="w-14 h-14 flex items-center justify-center bg-red-500 rounded-full text-white text-2xl font-bold self-center">
          VS
        </div>

        {/* Jugador 2 */}
        <div className="w-full md:w-5/12 hover:scale-102 hover:transition-all duration-200">
          <div className="shadow-black border-1 shadow-sm hover:shadow-lg rounded-lg">
            <div className="p-6 text-center">
              <h5 className="text-xl mb-4 font-semibold">Jugador 2</h5>

              <div className="relative">
                <input
                  type="text"
                  className="w-full form-input form-input-lg rounded border border-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none p-3 text-lg"
                  placeholder="Buscar por nombre..."
                  value={query2}
                  onChange={(e) => setQuery2(e.target.value)}
                  onFocus={() => query2 && setShowSuggestions2(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions2(false), 200)}
                />
                {showSuggestions2 && (
                  <ul className="absolute w-full mt-1 bg-gray-700 shadow-lg rounded max-h-52 overflow-auto z-50">
                    {filtered2.map((j) => (
                      <li
                        key={j.id}
                        className="cursor-pointer hover:bg-gray-500 px-2 py-2 flex items-center gap-2"
                        onClick={() => handleSelect2(j)}
                      >
                        <img
                          src={`https://api.arsistemamlb.com/uploads/jugadores/${j.id}.jpg`}
                          alt={j.nombre}
                          className="rounded-full w-8 h-8 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png';
                          }}
                        />
                        <span>{j.nombre} {j.pos ? `(${j.pos})` : ''}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de comparación */}
      {jugador1 && jugador2 && (
        <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-800 shadow-lg shadow-black text-white text-center py-4 font-semibold text-xl">
            Comparación de Estadísticas
          </div>
          <div className="divide-y">

            <div className="grid grid-cols-12 text-center py-6 gap-4">
              <div className="col-span-2 flex items-center justify-center text-gray-500 font-semibold hidden sm:flex">ESTADÍSTICA</div>
              <div className="col-span-5">
                <img
                  src={`https://api.arsistemamlb.com/uploads/jugadores/${jugador1.id}.jpg`}
                  alt={jugador1.nombre}
                  className="mx-auto rounded-full w-30 h-30 object-cover mb-2 border border-gray-200"
                  onError={(e) => { e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png'; }}
                />
                <h5 className="text-lg font-semibold">{jugador1.nombre}</h5>
              </div>
              <div className="col-span-5">
                <img
                  src={`https://api.arsistemamlb.com/uploads/jugadores/${jugador2.id}.jpg`}
                  alt={jugador2.nombre}
                  className="mx-auto rounded-full w-30 h-30 object-cover mb-2 border border-gray-200"
                  onError={(e) => { e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png'; }}
                />
                <h5 className="text-lg font-semibold">{jugador2.nombre}</h5>
              </div>
            </div>

            {[
              { key: 'war', label: 'WAR', type: 'war' },
              { key: 'promedio_bateo', label: 'AVG', type: 'avg' },
              { key: 'ops', label: 'OPS', type: 'ops' },
              { key: 'hits', label: 'H', type: 'hits' },
              { key: 'dobles', label: '2B', type: 'dobles' },
              { key: 'triples', label: '3B', type: 'triples' },
              { key: 'carreras_impulsadas', label: 'CI', type: 'carreras_impulsadas' },
              { key: 'bases_robadas', label: 'BR', type: 'bases_robadas' },
              { key: 'home_runs', label: 'HR', type: 'hr' },
              { key: 'años_en_mlb', label: 'AÑOS EN MLB', type: 'number' }
            ].map((stat, index) => {
              const val1 = parseFloat(jugador1[stat.key]);
              const val2 = parseFloat(jugador2[stat.key]);
              const betterPlayer = getBetterPlayer(stat.key, jugador1, jugador2);

              let maxVal = Math.max(val1, val2);
              if (maxVal === 0) maxVal = 1;

              const percent1 = (val1 / maxVal) * 100;
              const percent2 = (val2 / maxVal) * 100;

              return (
                <div key={index} className="grid grid-cols-12 text-center py-2 items-center gap-4">
                  <div className="col-span-2 font-semibold flex items-center justify-center">{stat.label}</div>
                  <div className="col-span-5 px-2">
                    <div className="relative bg-gray-200 rounded h-7 overflow-hidden">
                      <div
                        className={`h-full font-bold text-white flex items-center justify-center ${betterPlayer === 1 ? 'bg-green-500' : 'bg-red-600'}`}
                        style={{ width: `${percent1}%`, fontSize: '1rem' }}
                        aria-valuenow={percent1}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {formatStat(val1, stat.type)}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5 px-2">
                    <div className="relative bg-gray-200 rounded h-7 overflow-hidden">
                      <div
                        className={`h-full font-bold text-white flex items-center justify-center ${betterPlayer === 2 ? 'bg-green-500' : 'bg-red-600'}`}
                        style={{ width: `${percent2}%`, fontSize: '1rem' }}
                        aria-valuenow={percent2}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {formatStat(val2, stat.type)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {jugador1 && jugador2 && (
        <div className="bg-gray-900 text-white shadow-lg rounded-lg mt-8">
          <div className="text-center py-4 font-semibold text-xl border-b border-gray-700">🏆 Resultado Final</div>
          <div className="p-6 text-center">

            {/* Barra de progreso */}
            <div className="flex h-10 rounded-full overflow-hidden mb-6 bg-gray-700">
              <div
                className={`${calcularGanador().ganador === 1 ? 'bg-green-500' : 'bg-red-600'} flex items-center justify-center font-bold`}
                style={{ width: `${calcularGanador().porcentaje1}%`, borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px' }}
              >
                {calcularGanador().jugador1.puntos} puntos
              </div>
              <div
                className={`${calcularGanador().ganador === 2 ? 'bg-green-500' : 'bg-red-600'} flex items-center justify-center font-bold`}
                style={{ width: `${calcularGanador().porcentaje2}%`, borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px' }}
              >
                {calcularGanador().jugador2.puntos} puntos
              </div>
            </div>

            {/* Mensaje del ganador */}
            {calcularGanador().ganador === 1 && (
              <div className="bg-green-600 rounded px-4 py-3 flex items-center justify-center gap-2 text-lg font-semibold">
                <i className="bi bi-trophy-fill text-2xl"></i>
                {jugador1.nombre} gana la comparación 🏅
              </div>
            )}
            {calcularGanador().ganador === 2 && (
              <div className="bg-green-600 rounded px-4 py-3 flex items-center justify-center gap-2 text-lg font-semibold">
                <i className="bi bi-trophy-fill text-2xl"></i>
                {jugador2.nombre} gana la comparación 🏅
              </div>
            )}
            {calcularGanador().ganador === 0 && (
              <div className="bg-yellow-400 rounded px-4 py-3 flex items-center justify-center gap-2 text-lg font-semibold text-gray-900">
                <i className="bi bi-emoji-neutral-fill text-2xl"></i>
                ¡Empate técnico! Ambos son legendas ⚖️
              </div>
            )}

            {/* Mini resumen */}
            <div className="grid grid-cols-3 mt-6 items-center text-center">
              <div>
                <img
                  src={`https://api.arsistemamlb.com/uploads/jugadores/${jugador1.id}.jpg`}
                  alt={jugador1.nombre}
                  className="rounded-full w-15 h-15 object-cover mx-auto"
                  onError={(e) => e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png'}
                />
                <p className="mt-2 font-semibold">{jugador1.nombre}</p>
              </div>
              <div>
                <span className="text-3xl font-bold">VS</span>
              </div>
              <div>
                <img
                  src={`https://api.arsistemamlb.com/uploads/jugadores/${jugador2.id}.jpg`}
                  alt={jugador2.nombre}
                  className="rounded-full w-15 h-15 object-cover mx-auto"
                  onError={(e) => e.target.src = 'https://api.arsistemamlb.com/uploads/jugadores/default.png'}
                />
                <p className="mt-2 font-semibold">{jugador2.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {(!jugador1 || !jugador2) && (
        <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
          <div className="bg-black rounded-lg p-8">
            <div className="text-center text-gray-400">
              <i className="bi bi-arrow-left-right text-6xl mb-6"></i>
              <h4 className="text-xl mb-2">Selecciona dos peloteros para comparar</h4>
              <p>Escribe el nombre de un jugador para ver sus estadísticas comparadas.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  </div>




       
    )
}

export default Comparador