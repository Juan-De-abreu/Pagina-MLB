import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const Formsesion = () => {
  const { setToken } = useAuth();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (isRegister && nombre.trim() === '') return 'El nombre es obligatorio.';
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return 'Ingresa un correo válido.';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegister
        ? `${API_BASE_URL}/registro`
        : `${API_BASE_URL}/login`;

      const payload = isRegister
        ? { nombre, email, password }
        : { email, password };

      const response = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (isRegister) {
        setSuccess('Registro exitoso, ya puedes iniciar sesión.');
        setIsRegister(false);
        setNombre('');
        setEmail('');
        setPassword('');
      } else {
        const token = response.data.token;
        if (!token) throw new Error('Token inválido');

        setToken(token); // Actualiza token global en contexto y axios
        setSuccess('Inicio de sesión exitoso');
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error en la operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-center justify-center bg-form border-y-1 min-h-[100vh] xl:min-h-[80vh] border-[#000000]">
      <form
        onSubmit={handleSubmit}
        className={`transition-all duration-200 relative scale-animation w-full max-w-full md:max-w-md 2xl:max-w-lg ${
          isRegister ? 'h-120' : 'h-100'
        } mx-auto my-auto bg-[var(--vinotinto)] backdrop-blur-sm rounded-2xl px-10 pt-6 shadow-lg xl:shadow-xl shadow-black animated-border text-[var(--blanco-hielo)]`}
        aria-label={isRegister ? 'Formulario de registro' : 'Formulario de inicio de sesión'}
      >
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-semibold">{isRegister ? 'Regístrate' : 'Iniciar sesión'}</span>
        </div>

        {error && (
          <div role="alert" className="mb-4 text-lg text-red-600 bg-red-200 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
        {success && (
          <div role="status" className="mb-4 text-lg text-green-600 bg-green-50 border border-green-200 rounded p-2">
            {success}
          </div>
        )}

        {isRegister && (
          <div className="mb-4">
            <label htmlFor="nombre" className="flex text-xl justify-center xl:justify-start font-medium mb-1">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              required={isRegister}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
              aria-invalid={Boolean(error)}
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="flex text-xl justify-center xl:justify-start font-medium mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@ejemplo.com"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            aria-invalid={Boolean(error)}
            aria-describedby="email-help"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="flex text-xl justify-center xl:justify-start font-medium mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type={showPwd ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--dorado)]"
            aria-label="Contraseña"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-2 top-10 text-sm animate-pulse cursor-pointer"
            aria-label="Mostrar u ocultar contraseña"
          >
            {showPwd ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <button
            type="submit"
            disabled={loading}
            className="hover:bg-[var(--dorado)] duration-150 hover:text-black border border-[var(--dorado)] hover:scale-105 transition-all bg-transparent font-semibold px-6 py-4 mt-2 rounded-md disabled:opacity-50 text-lg shadow-md hover:shadow-black"
          >
            {loading ? (isRegister ? 'Registrando...' : 'Iniciando...') : isRegister ? 'Registrarte' : 'Iniciar sesión'}
          </button>
        </div>

        <div className="text-center text-s">
          {isRegister ? (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setError(null);
                  setSuccess(null);
                }}
                className="text-red-500 animate-pulse"
              >
                Iniciar sesión
              </button>
            </>
          ) : (
            <>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setError(null);
                  setSuccess(null);
                }}
                className="text-red-500 animate-bounce"
              >
                Regístrate
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Formsesion;
