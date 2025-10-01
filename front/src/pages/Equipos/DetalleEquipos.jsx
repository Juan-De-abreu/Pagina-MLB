import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

  const API = `http://localhost:8081/api/equipos/`;

const DetalleEquipos = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URI = API + id;
  

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

  useEffect(() => {
    getDatos();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center py-10">
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
        <h4 className="text-xl font-semibold mb-2">
          Error al cargar los detalles del equipo
        </h4>
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
    <div className="bg-[var(--body)] py-10 text-[var(--blanco-hielo)] min-w-[100vw] mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={datos.logo_url}
            alt={`Logo ${datos.nombre}`}
            className="w-40 h-40 object-contain rounded-lg shadow-lg border border-[var(--dorado)]"
          />
        </div>
        <div>
          <img src={datos.foto_estadio} alt={`Estadio ${datos.nombre}`} />
        </div>

        {/* Info equipo */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-4 text-[var(--dorado)]">{datos.nombre}</h1>

          <p className="mb-2 text-lg">
            <span className="font-semibold">Ciudad:</span> {datos.ciudad}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Estadio:</span> {datos.estadio}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Fundación:</span> {datos.fundacion || "No disponible"}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Títulos Nacionales:</span>{" "}
            {datos.titulos_nacionales ?? "0"}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Títulos Serie del Caribe:</span>{" "}
            {datos.titulos_serie_caribe ?? "0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetalleEquipos;
