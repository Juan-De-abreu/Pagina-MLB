import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
   const menuRef = useRef(null);

   useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);


  return (
    <div className="navbar flex justify-between items-center h-20 lg:h-30 py-auto lg:px-8 m-0 py-0 border-b-1 border-[#494a0c]">
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
        id='menuopenid'
          onClick={() => setMenuOpen(!menuOpen)}
          className={`focus:outline-none p-2 ${menuOpen? 'hidden':'visible'}`}
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

      {/* Menú principal y desplegable*/}
      <div
      ref={menuRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          lg:static
          flex-1
          ${menuOpen ? 
            'flex flex-col items-center gap-4 py-2 pt-16 md:py-4 bg-linear-to-t to-[#00000083] from-[#00000059] rounded-lg' 
            :
            'hidden'}
          lg:flex lg:justify-center lg:items-center lg:gap-14
          mx-4 divide-y-1 lg:py-6 divide-[#ddff0053]
        `}
      >
        <Link onClick={menuOpen} to={"/"} href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-2xl md:text-xl hover:scale-120 transition-all duration-150 text-center">
          Partidos
        </Link>

        <Link onClick={menuOpen} to={"/jugadores"} href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-3xl md:text-2xl hover:scale-120 transition-all duration-150 text-center">
          Jugadores
        </Link>

        <Link onClick={menuOpen} to={"/inicio"} href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-5xl md:text-4xl hover:scale-120 transition-all duration-150 text-center">
          Inicio
        </Link>

        <Link onClick={menuOpen} to={"/"} href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-3xl md:text-2xl hover:scale-120 transition-all duration-150 text-center">
          Equipos
        </Link>
        <Link onClick={menuOpen} to={'/estadisticas'} href="" className="block py-2 px-4 lg:hover:-translate-y-0.5 transform lg:text-2xl md:text-xl hover:scale-120 transition-all duration-150 text-center">
          Estadisticas
        </Link>
        <label htmlFor="menuopenid" className={`hover:scale-120 transition-all duration-150 text-center py-1 md:text-2xl text-1xl ${menuOpen? 'visible':'hidden'}`}>Cerrar</label>
      </div>

      {/* Tercer div: logo derecho oculto en <lg */}
      <div className={`hidden lg:flex justify-end items-center lg:col-span-1 2xl:flex`}>
        <div className="justify-center flex py-auto">
          <img
            className="w-50 md:hidden 2xl:block lg:w-50 sm:justify-center lg:hover:scale-120 transition-all duration-200 lg:hover:-translate-y-0.5"
            src="/public/logovenezuela-removebg-preview.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
