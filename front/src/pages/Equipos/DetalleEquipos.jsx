import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardPartidos from "../../components/CardPartidos";

const API = `http://localhost:8081/api/equipos/`;
const API_PARTIDOS = "http://localhost:8081/api/equipos/partidos"; // Endpoint de partidos generales

const DetalleEquipos = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Para los partidos filtrados
  const [partidos, setPartidos] = useState([]);
  const [loadingPartidos, setLoadingPartidos] = useState(true);
  const [errorPartidos, setErrorPartidos] = useState(null);

  const URI = API + id;

  // Cargar detalles del equipo
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

  // Cargar partidos y filtrar por el nombre del equipo cuando datos estén disponibles
  const getPartidos = async (nombreEquipo) => {
    try {
      setLoadingPartidos(true);
      setErrorPartidos(null);
      const response = await fetch(API_PARTIDOS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Filtrar partidos donde equipo local o visitante coincida con nombreEquipo
      const filtrados = data.filter(
        (p) => p.equipo_local === nombreEquipo || p.equipo_visitante === nombreEquipo
      );
      // Ordenar partidos de más reciente a más antiguo por la fecha
      filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setPartidos(filtrados);
      setLoadingPartidos(false);
    } catch (err) {
      setErrorPartidos(err.message);
      setLoadingPartidos(false);
    }
  };

  useEffect(() => {
    getDatos();
  }, [id]);

  // Cuando carguen los datos, lanza la carga de partidos filtrados
  useEffect(() => {
    if (datos?.nombre) {
      getPartidos(datos.nombre);
    }
  }, [datos]);

  if (loading) {
    return (
      <div className="flex flex-col datoss-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-4 text-red-600">Cargando Detalles del equipo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-yellow-600">
        <h4 className="text-xl font-bold mb-2">Error al cargar los detalles del equipo</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="text-center py-10">
        <p>No se encontró información del equipo.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-18/18">
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img
                src={datos.foto_estadio}
                alt={`Foto del estadio de ${datos.nombre}`}
                className="w-full h-110 sm:h-160 lg:h-105 2xl:h-185 mask-contain"
              />
              <div className="w-100 h-auto xl:h-auto lg:w-auto z-50 text-center absolute -bottom-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-[#fff] bg-[#000000a2]  mx-auto py-3 rounded-lg border-2 border-[var(--vinotinto)] lg:shadow-lg shadow-[#000 ]">
                <div className="px-0 md:px-15 xl:px-40 2xl:px-50 mb-0 lg:mb-8">
                  <p className={` text-4xl text-[var(--dorado)]`}>
                    {datos.nombre}
                  </p>
                  <p className={`text-3xl 2xl:text-4xl py-3`}>{datos.estadio}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#00000080] bg-opacity-100 pointer-events-none rounded-lg"></div>
            </div>
          </div>
          <div className="border-t-2 border-[var(--vinotinto)]">
            <div className="bg-[var(--body)] p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-8 text-center text-[var(--dorado)] border-b-1">
                Información del Equipo
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-xl px-30">
                <div className="xl:text-left">
                  <p className="mb-2 font-semibold">Ciudad: {datos.ciudad}</p>
                  <p className="mb-2 font-semibold">{datos.estadio}</p>
                  <p className="mb-2 font-semibold">Equipo: {datos.nombre}</p>
                  <p className="mb-2 font-semibold">
                    Titulos nacionales: {datos.titulos_nacionales}
                  </p>
                  <p className="mb-2 font-semibold">
                    Titulos Setie caribe: {datos.titulos_serie_caribe}
                  </p>
                </div>
                <div className="xl:text-right">
                  <p className="mb-2 font-semibold">
                    Capacidad del Estadio: {datos.capacidad}
                  </p>
                  <p className="mb-2 font-semibold">Fundacion del equipo: {datos.fundacion}</p>
                  <p className="mb-2 font-semibold">Entrenador del equipo: {datos.entrenador}</p>
                  <p className="mb-2 font-semibold">presidente del equipo: {datos.presidente}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--body)] mt-10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-[var(--dorado)] border-b-1 mb-6">
              Partidos del equipo
            </h2>
            {loadingPartidos && (
              <div className="text-center text-gray-500">Cargando partidos ...</div>
            )}
            {errorPartidos && (
              <div className="text-center text-red-600">{errorPartidos}</div>
            )}
            {!loadingPartidos && !errorPartidos && partidos.length === 0 && (
              <p className="text-center text-gray-500">No hay partidos para este equipo.</p>
            )}
            {!loadingPartidos && !errorPartidos && partidos.length > 0 && (
              <div className="space-y-6">
                {partidos.map((partido, index) => (
                  <CardPartidos key={partido.id} item={partido} contadorpartidos={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleEquipos;
