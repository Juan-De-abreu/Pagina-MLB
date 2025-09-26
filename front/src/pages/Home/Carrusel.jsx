import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { getMedalColorVar, getMedalColorVartext} from "../../util/funciones";

const Carrusel = (images) => {
  const [current, setCurrent] = useState(0);
  const API = "http://localhost:8081/api/estadisticas/top-war";
  const { images: imagesArray } = images;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  };
  const nextSlideAuto = () => {
    setCurrent((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlideAuto();
    }, 4000);
    return () => clearInterval(interval);
  }, [imagesArray.length, nextSlide, prevSlide]);

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
        <div
          role="status"
          aria-label="loading"
          className="inline-block w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p className="mt-2">Cargando Topwar...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-5 text-red-600">
        <h4 className="text-xl font-semibold mb-2">
          Error al cargar el carrusel topwar
        </h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-18/18">
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg shadow-[#180407]">
              <img
                src={imagesArray[current]}
                alt={`Slide ${current + 1}`}
                className="w-full h-110 sm:h-160 lg:h-105 2xl:h-185 mask-contain"
              />
              <div
                key={datos.id}
                className="w-100 h-60 xl:h-auto lg:w-auto z-50 text-center absolute -bottom-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-[#fff] bg-[#000000a2]  mx-auto py-3 rounded-lg"
              >
                {datos.slice(current, current + 1).map((item) => (
                  <div key={item.id} className="px-0 md:px-15 xl:px-40 2xl:px-50">
                    <p className={`text-[var(${getMedalColorVartext(current)})] text-4xl`}>
                      Top {current + 1} War
                    </p>
                    <p className={`text-3xl text-[var(${getMedalColorVartext(current)})] 2xl:text-4xl py-3`}>
                      {item.nombre}
                    </p>
                    <p>
                       con : <span className={`border-1 rounded-md text-[var(${getMedalColorVartext(current)})] px-1`}>{item.war}</span> y {item.años_en_mlb} años en la MLB
                    </p>
                              <Link
                                to={'/mapa'}
                                className="inline-block px-0 lg:px-2 py-1 my-2 2xl:px-4 2xl:py-2 2xl:my-4 border-1 rounded-2 text-[var(--dorado)] rounded hover:bg-[var(--dorado)] hover:text-white hover:border-[var(--plateado)] transition-colors duration-300"
                              >
                                Ver Mejores por ciudades
                            </Link>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-[#00000080] bg-opacity-100 pointer-events-none rounded-lg"></div>
            </div>
            <button
              className="hidden lg:block 2xl:h-185 absolute bg-[#0000003f] top-20/40 left-0 transform -translate-y-1/2 h-full hover:bg-[#29090d54] py-10 px-7 shadow-md text-[#6b1607] hover:text-[#fafafa86] text-5xl"
              onClick={prevSlide}
            >
              &#8592;
            </button>
            <button
              className="hidden lg:block 2xl:h-185 absolute bg-[#0000003f] top-20/40 right-0 transform -translate-y-1/2 h-full hover:bg-[#29090d54] py-10 px-7 shadow-md text-[#6b1607] hover:text-[#fafafa86] text-5xl"
              onClick={nextSlide}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrusel;
