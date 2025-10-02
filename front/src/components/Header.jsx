import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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

  const activeClassName = "border-b border-[var(--dorado)]";

  // Clase personalizada para animar el borde en hover mediante ::after
  const linkClass = `
    relative inline-block pb-2
    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[var(--dorado)] after:transition-all after:duration-300
    hover:after:w-full
  `;

  return (
    <div className="navbar flex justify-between items-center h-20 lg:h-30 py-auto lg:px-8 m-0 py-0 border-b border-[#494a0c] bg-[var(--vinotinto)] text-[var(--blanco-hielo)]">
      {/* Imagen lateral izquierda, visible solo en xl */}
      <div className="hidden xl:flex items-center">
        <a href="">
          <img
            src="/public/logomlb-removebg-preview.png"
            alt="logomlb"
            className="scale-0 sm:hover:-translate-y-0.5 transform transition-all duration-200 xl:scale-120"
          />
        </a>
      </div>

      {/* Botón hamburguesa solo en menores a lg */}
      <div className="flex justify-center items-center lg:hidden md:items-center">
        <button
          id='menuopenid'
          onClick={() => setMenuOpen(!menuOpen)}
          className={`focus:outline-none p-2 ${menuOpen ? 'hidden' : 'visible'}`}
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

      {/* Menú principal y desplegable */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          lg:static
          flex-1
          ${menuOpen ? 
            'z-51 flex flex-col items-center gap-4 py-2 pt-16 md:py-4 bg-linear-to-t to-[#000000df] from-[#000000f3] md:to-[#000000b6] md:from-[#000000cf] rounded-lg' 
            : 'hidden'}
          lg:flex lg:justify-center lg:items-center lg:gap-14
          mx-4  lg:py-6
        `}
      >
        {[
          { to: "/partidos", text: "Partidos", size: "lg:text-2xl md:text-xl" },
          { to: "/jugadores", text: "Jugadores", size: "lg:text-3xl md:text-2xl" },
          { to: "/", text: "Inicio", size: "lg:text-5xl md:text-4xl" },
          { to: "/equipos", text: "Equipos", size: "lg:text-3xl md:text-2xl" },
          { to: "/estadisticas", text: "Estadisticas", size: "lg:text-2xl md:text-xl" }
        ].map(({ to, text, size }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${linkClass} block py-2 px-4 text-center hover:scale-120 transition-all duration-200 lg:hover:-translate-y-0.5 transform ${size} ${isActive ? activeClassName : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {text}
          </NavLink>
        ))}
        <label htmlFor="menuopenid" className={`hover:scale-120 transition-all duration-200 text-center py-1 md:text-2xl text-1xl ${menuOpen ? 'visible' : 'hidden'}`}>
          Cerrar
        </label>
      </div>

      {/* Imagen lateral derecha, visible solo en lg en adelante */}
      <div className="hidden lg:flex justify-end items-center lg:col-span-1 2xl:flex">
        <div className="justify-center flex py-auto">
          <img
            className="w-50 md:hidden xl:block lg:w-50 sm:justify-center lg:hover:scale-120 transition-all duration-200 lg:hover:-translate-y-0.5"
            src="/public/logovenezuela-removebg-preview.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
