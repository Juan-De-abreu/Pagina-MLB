import React, { useState } from 'react'
import { useEffect } from 'react';

const Carrusel = (images) => {
    const [current, setCurrent] = useState(0);
    const API='http://localhost:8081/api/estadisticas/top-war';
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
    }, [imagesArray.length,nextSlide,prevSlide]);



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
        <p className="mt-2">Cargando Topwar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-600">
        <h4 className="text-xl font-semibold mb-2">Error al cargar los Topwar</h4>
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
                                className="w-full h-110 sm:h-160 lg:h-175 mask-contain"
                            />
                                {datos.slice(0,1).map((item) => (
                <div key={item.id} className='text-center relative bottom-28 text-2xl text-[#fff] bg-[#000000a2] w-100 mx-auto h-20 rounded-lg'>

                    <p>Top 5 War</p>
                    <p>{item.nombre} con: {item.war}</p>

                </div>
                                                                ))}


                            <div className="absolute inset-0 bg-[#00000080] bg-opacity-100 pointer-events-none rounded-lg"></div>
                        </div>
                        <button
                            className="hidden lg:block lg:h-175 absolute bg-[#0000003f] top-9/20 left-0 transform -translate-y-1/2 h-full hover:bg-[#29090d54] py-10 px-7 shadow-md text-[#6b1607] hover:text-[#fafafa86] text-5xl"
                            onClick={prevSlide}
                        >
                            &#8592;
                        </button>
                        <button
                            className="hidden lg:block lg:h-175 absolute bg-[#0000003f] top-9/20 right-0 transform -translate-y-1/2 h-full hover:bg-[#29090d54] py-10 px-7 shadow-md text-[#6b1607] hover:text-[#fafafa86] text-5xl text"
                            onClick={nextSlide}
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrusel