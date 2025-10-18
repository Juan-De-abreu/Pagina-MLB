import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/usuarios", text: "Usuarios" },
  { to: "/admin/jugadores", text: "Jugadores" },
  { to: "/admin/equipos", text: "Equipos" },
  { to: "/admin/partidos", text: "Partidos" },
];

const NavbarAdmin = () => {
  return (
    <nav className="w-50 bg-[var(--vinotinto)] border-r-1 border-[var(--plateado)] text-white min-h-screen p-5 flex flex-col gap-4 justify-beetween">
      <h2 className="text-xl font-bold mb-6 border-b border-[var(--plateado)] pb-2 text-center">
        Admin
      </h2>
      {links.map(({ to, text }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `block px-4 py-3 rounded hover:bg-[var(--plateado)] hover:text-black transition duration-200 ${
              isActive ? "bg-[var(--dorado)] border-1 border-[var(--blanco-hielo)] font-semibold" : ""
            }`
          }
        >
          {text}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavbarAdmin;
