import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", text: "Panel principal", end: true },
  { to: "/admin/usuarios", text: "Usuarios" },
  { to: "/admin/jugadores", text: "Jugadores" },
  { to: "/admin/equipos", text: "Equipos" },
  { to: "/admin/partidos", text: "Partidos" },
  { to: "/inicio", text: "Interfaz del cliente" }
];

const NavbarAdmin = ( ) => {

  

  return (
    <nav className="w-80 bg-[var(--vinotinto)] border-[var(--plateado)] text-white min-h-screen px-6 py-10 flex flex-col gap-4 justify-beetween">
      <h2 className="text-xl font-bold mb-6 border-b border-[var(--dorado)] pb-2 text-center">
        Rol Admin
      </h2>
      {links.map(({ to, text, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `block py-3 rounded-md hover:bg-[var(--dorado)] hover:scale-105 text-center px-10 border-1 border-[var(--dorado)]  hover:text-black transition duration-200 ${
              isActive ? "scale-105 bg-[var(--dorado)] border-1 font-semibold text-black" : ""
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
