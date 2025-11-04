import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesNuevasCount, setNotificacionesNuevasCount] = useState(0);

  // Detecta clic fuera del menú usuario
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  // Decodifica token
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          nombre: payload.nombre,
          es_admin: payload.es_admin,
          id: payload.sub,
        });
      } catch {
        setUser(null);
      }
    }
  }, [token]);

  // Cargar notificaciones y contar no leídas
  useEffect(() => {
    if (!user) {
      setNotificacionesNuevasCount(0);
      return;
    }
    const fetchNotificaciones = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/api/notificaciones?user_id=${user.id}`
        );
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(
            `Error HTTP ${res.status}: ${errorMsg || res.statusText}`
          );
        }
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Respuesta inválida");
        setNotificaciones(data);
        // Contar notificaciones no leidas
        setNotificacionesNuevasCount(data.filter((n) => !n.leida).length);
      } catch (error) {
        console.error("Error cargando notificaciones:", error);
        setNotificacionesNuevasCount(0);
      }
    };
    fetchNotificaciones();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/FormSesion");
  };

  const activeClassName = "border-b border-[var(--dorado)]";

  const linkClass = `
    relative inline-block pb-2
    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[var(--dorado)] after:transition-all after:duration-300
    hover:after:w-full
  `;

  return (
    <div className="navbar flex justify-between items-center h-20 lg:h-30 py-auto lg:px-8 m-0 py-0 border-b border-[#494a0c] bg-[var(--vinotinto)] text-[var(--blanco-hielo)]">
      {/* Logo */}
      <div className="hidden xl:flex items-center">
        <img
          src="/public/logomlb-removebg-preview.png"
          alt="logomlb"
          className="scale-0 sm:hover:-translate-y-0.5 transform transition-all duration-200 xl:scale-120"
        />
      </div>

      {/* Botón hamburguesa */}
      <div className="flex justify-center items-center lg:hidden md:items-center hover:scale-110 hover:text-[var(--dorado)] transition-all duration-300">
        <button
          id="menuopenid"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`focus:outline-none p-2 ${
            menuOpen ? "hidden" : "visible"
          }`}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8 md:w-16 md:h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú principal */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          lg:static
          flex-1
          ${
            menuOpen
              ? "z-51 flex flex-col items-center gap-4 py-2 pt-16 md:py-4 bg-linear-to-t to-[#000000df] from-[#000000f3] md:to-[#000000b6] md:from-[#000000cf] rounded-lg"
              : "hidden"
          }
          lg:flex lg:justify-center lg:items-center lg:gap-14
          mx-4 lg:py-6
        `}
      >
        {[
          { to: "/partidos", text: "Partidos", size: "lg:text-2xl md:text-xl" },
          {
            to: "/jugadores",
            text: "Jugadores",
            size: "lg:text-3xl md:text-2xl",
          },
          { to: "/", text: "Inicio", size: "lg:text-5xl md:text-4xl" },
          { to: "/equipos", text: "Equipos", size: "lg:text-3xl md:text-2xl" },
          {
            to: "/estadisticas",
            text: "Estadisticas",
            size: "lg:text-2xl md:text-xl",
          },
          {
            to: "/favoritos",
            text: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            ),
            size: "lg:text-2xl md:text-xl",
          },
        ].map(({ to, text, size }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${linkClass} block py-2 px-4 text-center hover:scale-120 transition-all duration-200 lg:hover:-translate-y-0.5 transform ${size} ${
                isActive ? activeClassName : ""
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            {text}
          </NavLink>
        ))}
      </div>

      {/* Menú usuario con rueda y notificaciones */}
      <div className="flex items-center relative">
        {user ? (
          <>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="hover:scale-115 text-lg font-semibold px-2 py-1 mx-4 rounded hover:text-[var(--dorado)] transition-all duration-300 hover:animate-pulse flex items-center justify-center"
              aria-label="Opciones de usuario"
            >
              {/* Icono rueda */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            {/* Contador de notificaciones nuevas */}
            {notificacionesNuevasCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex bg-red-900 px-2 p-1 text-xs rounded-full">
                {notificacionesNuevasCount}
              </span>
            )}
            {userMenuOpen && (
              <div
                ref={userMenuRef}
                className="absolute right-0 mt-2 w-48 bg-[var(--vinotinto)] border border-[var(--dorado)] rounded shadow-lg top-15 z-50"
              >
                <div className="px-4 py-2 text-white font-semibold">
                  {user.nombre}
                </div>
                {user.es_admin === 1 && (
                  <NavLink
                    to="/admin"
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black transition-all duration-300"
                    onClick={() => setUserMenuOpen(false)}
                    aria-label="Opciones de admin"
                  >
                    Opciones admin
                  </NavLink>
                )}
                <NavLink
                  to="/ajustes"
                  className="block w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black transition-all duration-300"
                  onClick={() => setUserMenuOpen(false)}
                  aria-label="Opciones de la cuenta"
                >
                  Opciones de la cuenta
                </NavLink>
                <NavLink
                  to="/notificaciones"
                  className="w-full text-left px-4 py-2 hover:bg-[var(--dorado)] hover:text-black flex justify-between items-center transition-all duration-300"
                  onClick={() => setUserMenuOpen(false)}
                  aria-label="Notificaciones"
                >
                  Notificaciones
                  {notificacionesNuevasCount == 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  )}
                  {notificacionesNuevasCount > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5 timbrando"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                      />
                    </svg>
                  )}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </>
        ) : (
          <NavLink
            to={"/FormSesion"}
            className={({ isActive }) =>
              `${linkClass} text-xl duration-200 transition-all hover:scale-105 lg:hover:-translate-y-0.5 transform ${
                isActive ? activeClassName : ""
              } text-center`
            }
          >
            Iniciar sesión
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
