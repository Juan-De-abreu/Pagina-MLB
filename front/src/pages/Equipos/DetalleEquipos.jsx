import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardPartidos from "../../components/CardPartidos";

const API = `http://localhost:8081/api/equipos/`;
// Cambiar a la nueva ruta que filtra partidos por equipo
const API_PARTIDOS_EQUIPO = (idEquipo) => `http://localhost:8081/api/partidos/equipo/${idEquipo}`;

const DetalleEquipos = () => {
  const { id, nombre } = useParams();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [partidos, setPartidos] = useState([]);
  const [loadingPartidos, setLoadingPartidos] = useState(true);
  const [errorPartidos, setErrorPartidos] = useState(null);

  // Carga datos del equipo
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API + id, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (isMounted) {
          setDatos(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchDatos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  // Carga partidos filtrados desde endpoint backend
  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchPartidos = async () => {
      setLoadingPartidos(true);
      setErrorPartidos(null);
      try {
        const response = await fetch(API_PARTIDOS_EQUIPO(id), { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (isMounted) {
          setPartidos(data);
          setLoadingPartidos(false);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          setErrorPartidos(err.message);
          setLoadingPartidos(false);
        }
      }
    };

    fetchPartidos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col datoss-center py-10">
        <div
          role="status"
          aria-label="loading"
          className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        />
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
              <div className="w-100 h-auto xl:h-auto lg:w-auto z-50 text-center absolute -bottom-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-[#fff] bg-[#000000a2]  mx-auto pt-3 rounded-lg border-2 border-[var(--vinotinto)] lg:shadow-lg shadow-[#000 ] mb-5">
                <div className="px-0 md:px-10 xl:px-10 2xl:px-30 mb-0 lg:mb-8">
                  <p className="text-4xl text-[var(--dorado)]">{datos.nombre}</p>
                  <p className="text-3xl 2xl:text-4xl mt-3">{datos.estadio}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#00000080] bg-opacity-100 pointer-events-none rounded-lg" />
            </div>
          </div>
          <div className="border-t-2 border-[var(--vinotinto)]">
            <div className="bg-[var(--body)] p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-8 text-center text-[var(--dorado)] border-b-1">
                Información del Equipo
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-xl xl:px-30">
                <div className="xl:text-left">
                  <p className="mb-2 font-semibold">Ciudad: {datos.ciudad}</p>
                  <p className="mb-2 font-semibold">{datos.estadio}</p>
                  <p className="mb-2 font-semibold">Equipo: {datos.nombre}</p>
                  <p className="mb-2 font-semibold">Títulos nacionales: {datos.titulos_nacionales}</p>
                  <p className="mb-2 font-semibold">Títulos Serie Caribe: {datos.titulos_serie_caribe}</p>
                </div>
                <div className="xl:text-right">
                  <p className="mb-2 font-semibold">Capacidad del Estadio: {datos.capacidad}</p>
                  <p className="mb-2 font-semibold">Fundación del equipo: {datos.fundacion}</p>
                  <p className="mb-2 font-semibold">Entrenador del equipo: {datos.entrenador}</p>
                  <p className="mb-2 font-semibold">Presidente del equipo: {datos.presidente}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--body)] pt-6 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-[var(--dorado)] border-b-1 mb-6">Partidos del equipo</h2>
            {loadingPartidos && <div className="text-center text-gray-500">Cargando partidos ...</div>}
            {errorPartidos && <div className="text-center text-red-600">{errorPartidos}</div>}
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
