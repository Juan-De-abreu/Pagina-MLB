import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Detectar clic fuera del menú de usuario para cerrarlo
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Leer token JWT y decodificar usuario al cargar el header
      const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ nombre: payload.nombre, es_admin: payload.es_admin });
      } catch (error) {
        setUser(null);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    setUserMenuOpen(false);
    navigate('/FormSesion');
  };

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
        <div href="">
          <img
            src="/public/logomlb-removebg-preview.png"
            alt="logomlb"
            className="scale-0 sm:hover:-translate-y-0.5 transform transition-all duration-200 xl:scale-120"
          />
        </div>
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
          { to: "/estadisticas", text: "Estadisticas", size: "lg:text-2xl md:text-xl" },
          { to: "/admin", text: "Opciones Admin", size: "lg:hidden block lg:text-2xl md:text-xl" },
          { to: "/FormSesion", text: "Iniciar sesión", size: "lg:hidden block lg:text-2xl md:text-xl" },
        ].map(({ to, text, size }) => {
  if (to === "/FormSesion") {
    return (
      <div key={to} className={`${size} block lg:hidden relative`}>
        {user ? (
          <>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-xl font-semibold px-4 py-2 border border-[var(--dorado)] rounded hover:bg-[var(--dorado)] hover:text-black transition w-full"
            >
              {user.nombre}
            </button>
            {userMenuOpen && (
              <div
                ref={userMenuRef}
                className="absolute top-full mt-2 left-0 w-full bg-[var(--vinotinto)] border border-[var(--dorado)] rounded-xl shadow-lg z-50"
              >
                {!user.es_admin && (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black"
                    onClick={() => setUserMenuOpen(false)}
                    aria-label="Opciones cliente"
                  >
                    Opciones cliente
                  </button>
                )}
                {user.es_admin && (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black"
                    onClick={() => setUserMenuOpen(false)}
                    aria-label="Opciones admin"
                  >
                    Opciones admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </>
        ) : (
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${linkClass} text-xl duration-200 transition-all hover:scale-105 lg:hover:-translate-y-0.5 transform ${isActive ? activeClassName : ''} text-center`
            }
            onClick={() => setMenuOpen(false)}
          >
            {text}
          </NavLink>
        )}
      </div>
    );
  } 
  if (to === "/admin") {
    if (user && user.es_admin) {
      return (
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
      );
    }
    return null; 
  }
  else {
    return (
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
    );
  }
})}
        <label htmlFor="menuopenid" className={`hover:scale-120 transition-all duration-200 text-center py-1 md:text-2xl text-1xl ${menuOpen ? 'visible' : 'hidden'}`}>
          Cerrar
        </label>
      </div>

      <div className="hidden xl:flex items-center relative">
        {user ? (
          <>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-xl font-semibold px-4 py-2 border border-[var(--dorado)] rounded hover:bg-[var(--dorado)] hover:text-black transition"
            >
              {user.nombre}
            </button>
            {userMenuOpen && (
              <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-[var(--vinotinto)] border border-[var(--dorado)] rounded shadow-lg z-50">
                {!user.es_admin && (
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black"
                    onClick={() => setUserMenuOpen(false)}
                    aria-label="Opciones cliente"
                  >
                    Opciones cliente
                  </button>
                )}
                {user.es_admin && (
                  <NavLink
                    to="/admin"
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black"
                    onClick={() => setUserMenuOpen(false)}
                    aria-label="Opciones admin"
                  >
                    Opciones admin
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </>
        ) : (
          <NavLink
            to={'/FormSesion'}
            className={({ isActive }) =>
              `${linkClass} text-xl duration-200 transition-all hover:scale-105 lg:hover:-translate-y-0.5 transform ${isActive ? activeClassName : ''} text-center`
            }
            onClick={() => setMenuOpen(false)}
          >
            Iniciar sesión
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
