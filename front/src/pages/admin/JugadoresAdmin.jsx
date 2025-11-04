import React, { useEffect, useState, useRef } from "react";

const CustomSelect = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mt-1" ref={ref}>
      <button
        type="button"
        className="w-full text-left bg-[var(--vinotinto)] text-white p-2 rounded border border-gray-200 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        {value || "Selecciona un equipo"}
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

const AdminJugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jugadorEdit, setJugadorEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      setCargando(true);
      try {
        const resJugadores = await fetch("http://localhost:8081/api/jugadores");
        const dataJugadores = await resJugadores.json();
        setJugadores(dataJugadores);

        const resEquipos = await fetch("http://localhost:8081/api/equipos");
        const dataEquipos = await resEquipos.json();
        setEquipos(dataEquipos);
      } catch (e) {
        console.error("Error al cargar:", e);
        alert("Error al cargar datos de jugadores o equipos");
      } finally {
        setCargando(false);
      }
    };
    fetchDatos();
  }, [recargar,equipos.length,jugadores.length]);

  const jugadoresFiltrados = jugadores.filter((j) =>
    j.nombre.toLowerCase().includes(search.trim().toLowerCase())
  );

  const openModal = (jugador = null) => {
    setJugadorEdit(jugador);
    setFormData(
      jugador ?? {
        nombre: "",
        pos: "",
        años_en_mlb: 0,
        año_debut: 0,
        año_retiro: 0,
        all_star_appearances: 0,
        partidos_jugados: 0,
        turnos_bateo: 0,
        veces_al_bate: 0,
        carreras: 0,
        hits: 0,
        dobles: 0,
        triples: 0,
        home_runs: 0,
        carreras_impulsadas: 0,
        bases_robadas: 0,
        atrapado_robando: 0,
        bases_por_bola: 0,
        ponches: 0,
        promedio_bateo: "",
        porcentaje_embase: "",
        porcentaje_slugging: "",
        ops: "",
        war: "",
        fecha_nacimiento: "",
        fecha_debut: "",
        lugar_nacimiento: "",
        posiciones: "",
        id_equipo: equipos.length > 0 ? equipos[0].id : 0,
        nombre_equipo: equipos.length > 0 ? equipos[0].nombre : "",
      }
    );
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setJugadorEdit(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target || {};
    let val = type === "number" ? Number(value) : value;
    if (name === "nombre_equipo") {
      const equipoSeleccionado = equipos.find((eq) => eq.nombre === value);
      if (equipoSeleccionado) {
        setFormData((f) => ({
          ...f,
          id_equipo: equipoSeleccionado.id,
          nombre_equipo: equipoSeleccionado.nombre,
        }));
        return;
      }
    }
    setFormData((f) => ({ ...f, [name]: val }));
  };

  const handleCustomEquipoChange = (nuevoNombre) => {
    const equipoSeleccionado = equipos.find((eq) => eq.nombre === nuevoNombre);
    if (equipoSeleccionado) {
      setFormData((f) => ({
        ...f,
        id_equipo: equipoSeleccionado.id,
        nombre_equipo: equipoSeleccionado.nombre,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.nombre?.trim()) return "El nombre es obligatorio";
    if (!formData.nombre_equipo?.trim()) return "El equipo es obligatorio";
    return null;
  };

  const handleSave = async () => {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    try {
      const url = jugadorEdit
        ? `http://localhost:8081/api/jugadores/${jugadorEdit.id}`
        : "http://localhost:8081/api/jugadores";
      const method = jugadorEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al guardar el jugador");
        return;
      }

      // En lugar de actualizar estado local, recarga toda la lista
      setRecargar((prev) => !prev);

      closeModal();
    } catch {
      alert("Error de red al guardar jugador");
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Borrar este jugador? ${nombre}`)) return;

    try {
      const res = await fetch(`http://localhost:8081/api/jugadores/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al borrar jugador");
        return;
      }

      setRecargar((prev) => !prev);
    } catch {
      alert("Error de red al borrar jugador");
    }
  };

  if (cargando)
    return <div className="text-center mt-10">Cargando jugadores...</div>;

  return (
    <div className="lg:p-6 lg:w-full">
      <h2 className="text-2xl lg:text-4xl font-semibold mt-20 lg:my-10 text-center text-[var(--dorado)]">
        Lista de jugadores
      </h2>
      <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-4 mb-6 px-2 mt-10">
        <button
          onClick={() => openModal()}
          className="max-w-full lg:max-w-xs shadow-lg shadow-black px-4 py-2 hover:bg-[var(--dorado)] text-[var(--dorado)] rounded border border-[var(--dorado)] hover:text-black transition-all duration-200"
        >
          Crear Jugador
        </button>
        <input
          type="text"
          placeholder="Buscar jugador por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-full lg:max-w-md p-2 rounded border-1 bg-[var(--gris-claro)] focus:bg-[var(--gris-oscuro)] text-white border-black focus:text-[var(--dorado)] ring-[var(--dorado)] ring-2 hover:ring-[var(--dorado)] transition-all duration-200"
        />
      </div>

      <table className="lg:min-w-full text-center rounded-md border-collapse mx-auto">
        <thead className="bg-[var(--gris-oscuro)] text-[var(--dorado)]">
          <tr>
            <th className="border-2 border-black px-4 py-2">ID</th>
            <th className="border-2 border-black px-4 py-2">Nombre</th>
            <th className="border-2 border-black px-4 py-2">Equipo</th>
            <th className="border-2 border-black px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadoresFiltrados.map(({ id, nombre, nombre_equipo }) => (
            <tr
              key={id}
              className="hover:bg-[var(--gris-oscuro)] hover:text-[var(--dorado)] bg-[var(--gris-claro)]"
            >
              <td className="border-2 border-black px-4 py-2">{id}</td>
              <td className="border-2 border-black px-4 py-2">{nombre}</td>
              <td className="border-2 border-black px-4 py-2">
                {nombre_equipo}
              </td>
              <td className="border-2 border-black lg:space-x-4 space-y-2 lg:space-y-0 py-2 text-center grid-cols-1 lg:grid-cols-2 px-2">
                <button
                  onClick={() => openModal(jugadores.find((j) => j.id === id))}
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
              {jugadorEdit ? "Editar Jugador" : "Crear Jugador"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {/* Nombre */}
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

              <label
                htmlFor="nombre_equipo"
                className="block mb-4 text-[var(--dorado)]"
              >
                Equipo:
                <CustomSelect
                  options={equipos}
                  value={formData.nombre_equipo}
                  onChange={handleCustomEquipoChange}
                />
              </label>

              {/* El resto del formulario dinámico */}
              {Object.entries(formData).map(([key, val]) => {
                if (
                  key === "id" ||
                  key === "id_equipo" ||
                  key === "nombre" ||
                  key === "nombre_equipo"
                )
                  return null;
                let inputType = "text";
                if (
                  [
                    "años_en_mlb",
                    "año_debut",
                    "año_retiro",
                    "all_star_appearances",
                    "partidos_jugados",
                    "turnos_bateo",
                    "veces_al_bate",
                    "carreras",
                    "hits",
                    "dobles",
                    "triples",
                    "home_runs",
                    "carreras_impulsadas",
                    "bases_robadas",
                    "atrapado_robando",
                    "bases_por_bola",
                    "ponches",
                  ].includes(key)
                ) {
                  inputType = "number";
                }
                if (["fecha_nacimiento", "fecha_debut"].includes(key)) {
                  inputType = "date";
                }
                return (
                  <label
                    htmlFor={key}
                    key={key}
                    className="block mb-4 text-[var(--dorado)]"
                  >
                    {key.replace(/_/g, " ")}:
                    <input
                      id={key}
                      type={inputType}
                      name={key}
                      value={val}
                      onChange={handleChange}
                      className="w-full mt-1 rounded border text-gray-200 p-2"
                      required={key === "nombre"}
                      step={inputType === "number" ? "any" : undefined}
                    />
                  </label>
                );
              })}

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

export default AdminJugadores;
