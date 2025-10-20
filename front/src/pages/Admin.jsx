import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    to: "/admin/usuarios",
    title: "Usuarios",
    description: "Gestiona los usuarios de la plataforma.",
  },
  {
    to: "/admin/jugadores",
    title: "Jugadores",
    description: "Administra la información de los jugadores.",
  },
  {
    to: "/admin/equipos",
    title: "Equipos",
    description: "Controla los datos y estadísticas de equipos.",
  },
  {
    to: "/admin/partidos",
    title: "Partidos",
    description: "Visualiza y administra los partidos programados.",
  },
];

const Admin = () => {
  const [hovered, setHovered] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ nombre: payload.nombre });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false); // terminó la carga y verificación
  }, []);

  if (loading) {
    // Mostrar cargando mientras verifica token
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        Cargando...
      </div>
    );
  }

  if (!user) {
    // No hay usuario (token inválido o no existe), puedes redirigir o mostrar mensaje
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-xl">
        No autorizado. Por favor inicia sesión.
      </div>
    );
  }

  return (
    <div className="p-8 bg-[var(--body)] h-full w-full">
      <h1 className="text-4xl font-bold mb-6 text-[var(--dorado)] border-b animate-pulse text-center">
        Panel de Administración
      </h1>
      <h1 className="text-center mb-8 text-xl">
        Bienvenido {user.nombre} al panel de administración. Aquí puedes gestionar usuarios, jugadores, equipos y partidos.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ to, title, description }, index) => (
          <Link
            key={to}
            to={to}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`
              bg-[var(--vinotinto)] rounded-lg shadow p-6 transition cursor-pointer border-1 border-[var(--negro-profundo)] hover:border-b-[#5a0909] hover:border-r-[#5a0909]
              ${hovered !== null && hovered !== index ? "opacity-60" : "opacity-100"}
              hover:opacity-100 hover:shadow-lg hover:shadow-black
            `}
          >
            <h2 className="text-xl font-semibold mb-2 text-[var(--dorado)] text-center border-b">
              {title}
            </h2>
            <p className="text-white text-center">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Admin;
