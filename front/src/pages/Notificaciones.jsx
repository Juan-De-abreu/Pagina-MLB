import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!userId) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    const fetchAndMarkRead = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/notificaciones?user_id=${userId}`);
        if (!res.ok) throw new Error('Error cargando notificaciones');
        const data = await res.json();

        setNotificaciones(data);

        const idsNoLeidas = data.filter(n => !n.leida).map(n => n.id);
        if (idsNoLeidas.length > 0) {
          const markReadRes = await fetch(`http://localhost:8081/api/notificaciones/markread`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificaciones_ids: idsNoLeidas, usuario_id: userId }),
          });

          if (markReadRes.ok) {
            setNotificaciones(curr =>
              curr.map(n =>
                idsNoLeidas.includes(n.id) ? { ...n, leida: true } : n
              )
            );
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMarkRead();
  }, [userId]);

  const handleClick = (notificacion) => {
    if (notificacion.partido_id) {
      navigate(`/partidos/${notificacion.partido_id}`);
    }
  };

  if (loading) return <div className="p-4">Cargando notificaciones...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-[var(--dorado)] text-center my-10 border-b-1">Notificaciones</h1>

      {notificaciones.length === 0 ? (
        <div className="text-gray-300 text-center text-3xl animate-pulse">No tienes notificaciones</div>
      ) : (
        <ul className="space-y-3 px-10">
          {notificaciones.map(({ id, mensaje, fecha_creacion, leida }) => (
            <li
              key={id}
              className={`text-center lg:text-2xl px-4 max-h-auto min-h-40 py-6 border-[var(--dorado)] border rounded shadow-sm cursor-pointer ${
                leida ? 'bg-[var(--body)]' : 'bg-[var(--vinotinto)] font-semibold animate-pulse'
              } hover:border-[var(--dorado)] hover:scale-102 transition-all duration-300 hover:shadow-md shadow-black`}
              onClick={() => handleClick(notificaciones.find(n => n.id === id))}
              title={leida ? 'Leída' : 'Sin leer - hacer clic para ver'}
            >
              <p>{mensaje}</p>
              <small className="block mt-1 text-[var(--dorado)] font-semibold pt-3">{new Date(fecha_creacion).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notificaciones;
