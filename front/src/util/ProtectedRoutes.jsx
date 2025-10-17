import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ nombre: payload.nombre, es_admin: payload.es_admin });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  if (user === null) return null; // Esperar estado cargado

const esAdmin = user.es_admin === 1;

  return esAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
