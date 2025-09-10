import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar flex justify-between items-center h-auto py-auto lg:px-8 m-0">

      {/* Primer div: logo, oculto en pantallas menores a lg */}
      <div className="hidden lg:flex items-center">
        <a href="">
          <img
            src="/public/logomlb-removebg-preview.png"
            alt="logomlb"
            className="scale-0 sm:hover:-translate-y-0.5 transform transition-all duration-150 xl:scale-120"
          />
        </a>
      </div>

      {/* Botón hamburguesa solo en menores a lg */}
      <div className="flex justify-center items-center lg:hidden md:items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8 md:w-16 md:h-16 text-[#505149]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menú principal (segundo div), visible a partir de lg, centrado */}
      <div
        className={`
          flex-1
          ${menuOpen ? 'flex flex-col items-center gap-4 py-2 md:py-4' : 'hidden'}
          lg:flex lg:justify-center lg:items-center lg:gap-14
          mx-4
        `}
      >
        <a href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-2xl md:text-xl lg:hover:scale-120 transition-all duration-150 text-center">
          partidos
        </a>

        <a href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-3xl md:text-2xl lg:hover:scale-120 transition-all duration-150 text-center">
          jugadores
        </a>

        <a href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-5xl md:text-4xl lg:hover:scale-120 transition-all duration-150 text-center">
          Inicio
        </a>

        <a href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-3xl md:text-2xl lg:hover:scale-120 transition-all duration-150 text-center">
          Estadisticas
        </a>
        <a href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-2xl md:text-xl lg:hover:scale-120 transition-all duration-150 text-center">
          noticias
        </a>
      </div>

      {/* Tercer div: logo derecho oculto en lg y visible más grande en 2xl */}
      <div className={`hidden lg:flex justify-end items-center lg:col-span-1 2xl:flex`}>
        <div href="" className="justify-center flex py-auto">
          <img
            className="w-50 sm:justify-center lg:hover:scale-120 transition-all duration-200 lg:hover:-translate-y-0.5"
            src="/public/logovenezuela-removebg-preview.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
