import React, { useEffect, useState } from 'react';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extraer userId del token JWT almacenado en localStorage
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  // Función para cargar notificaciones del usuario
  const fetchNotificaciones = async () => {
    if (!userId) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8081/api/notificaciones?user_id=${userId}`);
      if (!res.ok) throw new Error('Error cargando notificaciones');
      const data = await res.json();
      setNotificaciones(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
  }, [userId]);

  // Función para marcar notificación como leída (ejemplo simple)
  const marcarLeida = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/api/notificaciones/${id}`, {
        method: 'PATCH', // suponiendo patch para actualizar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leida: true }),
      });
      if (!res.ok) throw new Error('Error marcando notificación');
      // Actualizar localmente sin recargar todo
      setNotificaciones((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-4">Cargando notificaciones...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (notificaciones.length === 0)
    return <div className="p-4 text-gray-400">No tienes notificaciones.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--dorado)]">Notificaciones</h1>
      <ul className="space-y-4">
        {notificaciones.map(({ id, mensaje, fecha_creacion, leida }) => (
          <li
            key={id}
            className={`p-4 border rounded shadow-sm cursor-pointer ${
              leida ? 'bg-gray-700' : 'bg-[var(--vinotinto)] font-semibold'
            } hover:bg-[var(--dorado)] hover:text-black transition-colors`}
            onClick={() => !leida && marcarLeida(id)}
            title={leida ? 'Leída' : 'Sin leer - hacer clic para marcar leída'}
          >
            <p>{mensaje}</p>
            <small className="block mt-1 text-gray-300">
              {new Date(fecha_creacion).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
