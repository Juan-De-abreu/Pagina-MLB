import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const fieldLabelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const AjustesCuenta = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [editNombre, setEditNombre] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

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

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError('No se encontró usuario autenticado');
      return;
    }
    fetch('http://localhost:8081/api/usuarios')
      .then(res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then(users => {
        const user = users.find(u => u.id === userId);
        if (user) {
          setNombre(user.nombre || '');
          setEmail(user.email || '');
        } else {
          setError('Usuario no encontrado');
        }
      })
      .catch(err => {
        setError(`Error cargando datos de usuario: ${err.message}`);
      });
  }, []);

  const validar = () => {
    if (editNombre && !nombre.trim()) {
      setError('El nombre es requerido.');
      return false;
    }
    if (editEmail && (!email.trim() || !email.includes('@'))) {
      setError('Correo válido es requerido.');
      return false;
    }
    if (editPassword && password !== confirmPassword) {
      setError('La contraseña y confirmación no coinciden.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validar()) return;

    if (!editNombre && !editEmail && !editPassword) {
      setMensaje('No estás implementando cambio');
      return;
    }

    setLoading(true);
    setMensaje('');
    setError('');

    const payload = {};
    if (editNombre) payload.nombre = nombre;
    if (editEmail) payload.email = email;
    if (editPassword) payload.password = password;

    try {
      const userId = getUserIdFromToken();
      if (!userId) throw new Error('Usuario no autenticado');
      const res = await fetch(`http://localhost:8081/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error actualizando');
      await res.json();

      setMensaje('Datos actualizados correctamente.');
      setLoading(false);
      setEditNombre(false);
      setEditEmail(false);
      setEditPassword(false);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Error al actualizar: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="px-7 lg:px-0 min-h-[75vh]">
      <div className="max-w-md mx-auto p-6 shadow-lg shadow-black rounded my-10 border-1 border-black px-10">
        <h1 className="text-2xl font-semibold mb-4 text-center text-[var(--dorado)]">Ajustes de Cuenta</h1>

        {mensaje && <p className="mb-4 text-green-600">{mensaje}</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-10">
          <LayoutGroup>
            {/* Nombre */}
            <div className="relative mt-6">
              <AnimatePresence>
                {!editNombre && (
                  <motion.button
                    type="button"
                    onClick={() => setEditNombre(true)}
                    className="p-2 border border-[var(--dorado)] rounded w-full flex justify-center items-center text-[var(--dorado)] text-xl font-bold cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>Cambiar nombre</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {editNombre && (
                  <>
                    <motion.label
                      className="block absolute top-[-24px] left-0 right-0 text-center text-[var(--dorado)] font-semibold"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fieldLabelVariants}
                      key="label-nombre"
                    >
                      Nombre
                    </motion.label>
                    <motion.input
                      type="text"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      className="w-full border border-[var(--dorado)] rounded px-3 py-2 mt-2"
                      autoFocus
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      key="input-nombre"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className="relative">
              <AnimatePresence>
                {!editEmail && (
                  <motion.button
                    type="button"
                    onClick={() => setEditEmail(true)}
                    className="p-2 border border-[var(--dorado)] rounded w-full flex justify-center items-center text-[var(--dorado)] text-xl font-bold cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>Cambiar Correo</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {editEmail && (
                  <>
                    <motion.label
                      className="block absolute top-[-24px] left-0 right-0 text-center text-[var(--dorado)] font-semibold"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fieldLabelVariants}
                      key="label-email"
                    >
                      Correo
                    </motion.label>
                    <motion.input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-[var(--dorado)] rounded px-3 py-2 mt-2"
                      autoFocus
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      key="input-email"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Contraseña */}
            <div className="relative">
              <AnimatePresence>
                {!editPassword && (
                  <motion.button
                    type="button"
                    onClick={() => setEditPassword(true)}
                    className="p-2 border border-[var(--dorado)] rounded w-full flex justify-center items-center text-[var(--dorado)] text-xl font-bold cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>Cambiar contraseña</span>
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {editPassword && (
                  <>
                    <motion.label
                      className="block absolute top-[-24px] left-0 right-0 text-center text-[var(--dorado)] font-semibold"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fieldLabelVariants}
                      key="label-password"
                    >
                      Nueva Contraseña
                    </motion.label>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      key="input-password"
                    >
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border border-[var(--dorado)] rounded px-3 py-2 mt-2 mb-2"
                        placeholder="Dejar vacío para no cambiar"
                        autoFocus
                      />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full border border-[var(--dorado)] rounded px-3 py-2 mb-2"
                        placeholder="Confirma la contraseña"
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </LayoutGroup>

          <button
            type="submit"
            disabled={loading}
            className={`w-full border-1 text-[var(--dorado)] hover:bg-[var(--dorado)] hover:text-black py-2 rounded transition flex justify-center items-center`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Actualizando...
              </>
            ) : (
              'Actualizar Cuenta'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AjustesCuenta;
