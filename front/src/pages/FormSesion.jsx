import React, { useState } from "react";

const Formsesion = ({ onSubmit }) => {
  // Estado del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // Estados de validación y flujo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Validaciones básicas
  const validate = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passOk = password.length >= 6;
    if (!emailOk) return "Ingresa un correo válido.";
    if (!passOk) return "La contraseña debe tener al menos 6 caracteres.";
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
      // Si tienes una función de login externa, úsala:
      // const result = await loginApi({ email, password });
      // Simulación de respuesta:
      await new Promise((r) => setTimeout(r, 800));
      // Aquí podrías comprobar result.ok o success
      if (onSubmit) {
        await onSubmit({ email, password });
      }
      setSuccess("Inicio de sesión exitoso.");
    } catch (err) {
      setError(err?.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto my-auto bg-[var(--vinotinto)] backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black animated-border"
      aria-label="Formulario de inicio de sesión"
    >
      <div className="flex items-center justify-center mb-4">
        <span className="text-2xl font-semibold text-white">Iniciar sesión</span>
      </div>

      {error && (
        <div role="alert" className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded p-2">
          {success}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
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
        <p id="email-help" className="text-xs text-gray-300 mt-1">
          No compartas tu correo.
        </p>
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type={showPwd ? "text" : "password"}
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
          className="absolute right-2 top-9 text-sm text-white/70 hover:text-white"
          aria-label="Mostrar u ocultar contraseña"
        >
          {showPwd ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <div className="flex items-center justify-center mb-4">
        <button
          type="submit"
          disabled={loading}
          className="hover:bg-[var(--dorado)] duration-150 border-1 border-[var(--dorado)] transition-all bg-[#0000] text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </div>

      <div className="text-center text-xs text-white/70">
        ¿No tienes cuenta? Registrate
      </div>
    </form>
  );
};

export default Formsesion;
