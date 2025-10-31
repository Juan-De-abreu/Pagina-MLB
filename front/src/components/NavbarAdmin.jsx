import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const links = [
  { to: "/admin", text: "Panel principal", end: true },
  { to: "/admin/usuarios", text: "Usuarios" },
  { to: "/admin/jugadores", text: "Jugadores" },
  { to: "/admin/equipos", text: "Equipos" },
  { to: "/admin/partidos", text: "Partidos" },
  { to: "/inicio", text: "Interfaz del cliente" },
];

const NavbarAdmin = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef();

  // Cierra el menú si se hace click fuera de la barra (solo para móvil)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Cierra menú al seleccionar opción (solo móvil)
  const handleLinkClick = () => {
    if (open) setOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa visible solo en móvil */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-[var(--vinotinto)] text-white border border-[var(--dorado)]"
        aria-label="Abrir menú"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 bg-[#00000038] z-40 transition-opacity duration-300 ${
          open ? "block" : "hidden"
        } lg:hidden`}
        aria-hidden="true"
      ></div>

      {/* Menú lateral */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 h-full bg-[var(--vinotinto)] border-r border-[var(--plateado)] text-white px-6 py-10 flex flex-col gap-4
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:min-h-screen lg:w-80 lg:flex
          lg:sticky lg:top-0`}
      >
        <h2 className="text-xl font-bold mb-6 border-b border-[var(--dorado)] pb-2 text-center">
          Rol Admin
        </h2>
        <div>
          {links.map(({ to, text, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `block py-3 my-3 rounded-md hover:bg-[var(--dorado)] hover:scale-105 text-center px-10 border-l-1 border-b-1 border-[var(--dorado)] hover:text-black transition duration-200 ${
                  isActive
                    ? " bg-[var(--dorado)] border-b-2 border-black font-semibold text-black"
                    : ""
                }`
              }
            >
              {text}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
