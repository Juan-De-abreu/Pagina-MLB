import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config/api';

// Componente CustomSelect como el que usas para equipos
const CustomSelect = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mt-1 bg-[var(--body)]" ref={ref}>
      <button
        type="button"
        className="w-full text-left bg-[var(--vinotinto)] text-white p-2 rounded border border-gray-200 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        {value || "Selecciona"}
        <span className="float-right">&#9662;</span>
      </button>
      {open && (
        <ul className="absolute left-0 w-full bg-[var(--vinotinto)] mt-1 rounded-lg shadow-xl z-10 max-h-auto overflow-auto border border-[var(--dorado)]">
          {options.map((opcion) => (
            <li
              key={opcion.nombre}
              className={`px-4 py-2 cursor-pointer transition-all ${
                value === opcion.nombre
                  ? "bg-[var(--body)] text-[var(--dorado)]"
                  : "text-white"
              } hover:bg-[var(--body)] hover:text-[var(--dorado)]`}
              onClick={() => {
                onChange(opcion.nombre);
                setOpen(false);
              }}
            >
              {opcion.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const opcionesAdmin = [
  { nombre: "Sí", valor: 1 },
  { nombre: "No", valor: 0 },
];

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      setCargando(true);
      try {
        const response = await fetch(`${API_BASE_URL}/usuarios`);
        if (!response.ok) throw new Error("Error al cargar usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(search.trim().toLowerCase())
  );

  const openModal = (usuario = null) => {
  setUsuarioEdit(usuario);
  setFormData(
    usuario ?? {
      email: "",
      password: "",
      nombre: "",
      es_admin: 0,
    }
  );
  setModalIsOpen(true);
};

  const closeModal = () => {
    setModalIsOpen(false);
    setUsuarioEdit(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCustomAdminChange = (nuevoNombre) => {
    const opcion = opcionesAdmin.find((o) => o.nombre === nuevoNombre);
    setFormData((f) => ({
      ...f,
      es_admin: opcion ? opcion.valor : 0,
    }));
  };

const validateForm = () => {
  if (!formData.email?.trim()) return "El email es obligatorio";
  if (!formData.nombre?.trim()) return "El nombre es obligatorio";
  if (!usuarioEdit && !formData.password?.trim())
    return "La contraseña es obligatoria para nuevo usuario";
  return null;
};

  const handleSave = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      const url = usuarioEdit
        ? `http://localhost:8081/api/usuarios/${usuarioEdit.id}`
        : "http://localhost:8081/api/usuarios";
      const method = usuarioEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al guardar usuario");
        return;
      }

      setUsuarios((prev) =>
        usuarioEdit
          ? prev.map((u) =>
              u.id === usuarioEdit.id ? { ...u, ...formData } : u
            )
          : [...prev, data]
      );
      closeModal();
    } catch {
      alert("Error de red al guardar usuario");
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Borrar este usuario? ${nombre}`)) return;

    try {
      const res = await fetch(`http://localhost:8081/api/usuarios/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al borrar usuario");
        return;
      }

      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Error de red al borrar usuario");
    }
  };

  if (cargando)
    return <div className="text-center mt-10">Cargando usuarios...</div>;

  return (
    <div className="lg:p-6 w-full max-w-full min-h-full bg-[var(--body)]">
      <h2 className="text-2xl lg:text-4xl font-semibold mt-20 lg:my-10 text-center text-[var(--dorado)]">
        Lista de usuarios
      </h2>

      <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-4 mb-6 px-2 mt-10">
        <button
          onClick={() => openModal()}
          className="max-w-full lg:max-w-xs shadow-lg shadow-black px-4 py-2 hover:bg-[var(--dorado)] text-[var(--dorado)] rounded border border-[var(--dorado)] hover:text-black transition-all duration-200"
        >
          Crear Usuario
        </button>
        <input
          type="text"
          placeholder="Buscar usuario por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-full lg:max-w-md p-2 rounded border-1 bg-[var(--gris-claro)] focus:bg-[var(--gris-oscuro)] text-white border-black focus:text-[var(--dorado)] ring-[var(--dorado)] ring-2 hover:ring-[var(--dorado)] transition-all duration-200"
        />
      </div>

      <table className="lg:min-w-full text-center rounded-md border-collapse mx-auto table-fixed">
        <thead className="bg-[var(--gris-oscuro)] text-[var(--dorado)]">
          <tr>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              ID
            </th>
            <th className="border-2 border-black px-4 py-2">Email</th>{" "}
            {/* Visible siempre */}
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Nombre
            </th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Admin
            </th>
            <th className="border-2 border-black px-4 py-2">Acciones</th>{" "}
            {/* Visible siempre */}
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map(({ id, email, nombre, es_admin }) => (
            <tr
              key={id}
              className="hover:bg-[var(--gris-oscuro)] hover:text-[var(--dorado)] bg-[var(--gris-claro)]"
            >
              <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                {id}
              </td>
              <td className="border-2 border-black px-4 py-2">{email}</td>{" "}
              {/* Visible siempre */}
              <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                {nombre}
              </td>
              <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                {es_admin === 1 ? "Sí" : "No"}
              </td>
              <td className="border-2 border-black lg:space-x-4 space-y-2 lg:space-y-0 py-2 text-center grid-cols-1 lg:grid-cols-2 px-2">
                <button
                  onClick={() => openModal(usuarios.find((u) => u.id === id))}
                  className="text-[var(--dorado)] border border-[var(--dorado)] px-2 py-1 rounded hover:bg-[var(--dorado)] hover:text-black"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(id, nombre)}
                  className="border border-red-700 px-2 py-1 rounded text-white hover:bg-red-700"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-[#0000008b] bg-opacity-70 flex justify-center items-start pt-12 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[var(--vinotinto)] rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white font-bold text-xl mb-4">
              {usuarioEdit ? "Editar Usuario" : "Crear Usuario"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <label
                htmlFor="email"
                className="block mb-4 text-[var(--dorado)]"
              >
                Email:
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 rounded border text-gray-200 p-2"
                  required
                />
              </label>
              <label className="block mb-4 text-[var(--dorado)]">
                Admin:
                <CustomSelect
                  options={opcionesAdmin}
                  value={formData.es_admin === 1 ? "Sí" : "No"}
                  onChange={handleCustomAdminChange}
                />
              </label>
              <label
                htmlFor="password_hash"
                className="block mb-4 text-[var(--dorado)]"
              >
                Contraseña:
                <input
  id="password"
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  className="w-full mt-1 rounded border text-gray-200 p-2"
  required={!usuarioEdit}
  placeholder={usuarioEdit ? "Dejar vacío para no cambiar" : ""}
/>

              </label>
              <label
                htmlFor="nombre"
                className="block mb-4 text-[var(--dorado)]"
              >
                Nombre:
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full mt-1 rounded border text-gray-200 p-2"
                  required
                />
              </label>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded text-red-900 hover:text-black hover:bg-red-900 transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 hover:bg-[var(--dorado)] text-[var(--dorado)] rounded border hover:text-black transition-all duration-200"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosAdmin;
