import React, { createContext, useState, useEffect } from 'react';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children, user }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesNuevasCount, setNotificacionesNuevasCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setNotificaciones([]);
      setNotificacionesNuevasCount(0);
      return;
    }
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/notificaciones?user_id=${user.id}`);
        if (!res.ok) throw new Error('Error cargando notificaciones');
        const data = await res.json();
        setNotificaciones(data);
        setNotificacionesNuevasCount(data.filter(n => !n.leida).length);
      } catch {
        setNotificaciones([]);
        setNotificacionesNuevasCount(0);
      }
    };
    fetchNotifications();
  }, [user]);

  // Función para marcar notificaciones leídas localmente y decrementar contador
  const marcarNotificacionLeida = (id) => {
    setNotificaciones(current => {
      const updated = current.map(n => n.id === id ? { ...n, leida: true } : n);
      setNotificacionesNuevasCount(updated.filter(n => !n.leida).length);
      return updated;
    });
  };

  return (
    <NotificationsContext.Provider value={{ notificaciones, notificacionesNuevasCount, marcarNotificacionLeida }}>
      {children}
    </NotificationsContext.Provider>
  );
};
