import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from '../../config/api';

// Componente CustomSelect
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

  const handleSelect = (id) => {
    onChange(id);
    open(false); // Cierra el dropdown al seleccionar
  };

  return (
    <div className="relative w-full mt-1" ref={ref}>
      <button
        type="button"
        className="w-full text-left bg-[var(--gris-claro)] text-white p-2 rounded border border-[var(--dorado)] focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {value || "Selecciona"}
        <span className="float-right">&#9662;</span>
      </button>
      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 w-full bg-[var(--vinotinto)] mt-1 rounded-lg shadow-xl z-10 max-h-auto overflow-auto border border-[var(--dorado)]"
        >
          {options.map((opcion) => (
            <li
              key={opcion.id}
              role="option"
              aria-selected={value === opcion.nombre}
              className={`px-4 py-2 cursor-pointer transition-all ${
                value === opcion.nombre
                  ? "bg-[var(--body)] text-[var(--dorado)]"
                  : "text-white"
              } hover:bg-[var(--body)] hover:text-[var(--dorado)]`}
              onClick={() => handleSelect(opcion.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(opcion.id);
                }
              }}
              tabIndex={0}
            >
              {opcion.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const PartidosAdmin = () => {
  
  const [cargando, setCargando] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [partidoEdit, setPartidoEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [estadiosDisponibles, setEstadiosDisponibles] = useState([]);
const fechaSeleccionada = new Date(formData.fecha);
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);
const esFechaFutura = fechaSeleccionada > hoy;
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/equipos`).then((res) => res.json()),
      fetch(`${API_BASE_URL}/partidos`).then((res) => res.json()),
    ])
      .then(([equiposData, partidosData]) => {
        setEquipos(equiposData);

        const partidosConLogos = partidosData.map((p) => ({
          ...p,
          logo_local: equiposData.find((e) => e.id === p.equipo_local_id)?.logo_url,
          logo_visitante: equiposData.find((e) => e.id === p.equipo_visitante_id)?.logo_url,
          equipo_local: equiposData.find((e) => e.id === p.equipo_local_id)?.nombre,
          equipo_visitante: equiposData.find((e) => e.id === p.equipo_visitante_id)?.nombre,
        }));
        setPartidos(partidosConLogos);
      })
      .catch(() => alert("Error al cargar datos"))
      .finally(() => setCargando(false));
  }, [partidos.length]);

  // Extraer año de fecha y actualizar temporada
  useEffect(() => {
    if (formData.fecha) {
      const year = new Date(formData.fecha).getFullYear();
      setFormData((f) => ({ ...f, temporada: year.toString() }));
    }
  }, [formData.fecha]);

  // Actualiza lista estadios solo si ambos equipos seleccionados
  useEffect(() => {
    if (!formData.equipo_local_id || !formData.equipo_visitante_id) {
      setEstadiosDisponibles([]);
      setFormData((f) => ({ ...f, estadio: "" }));
      return;
    }

    const local = equipos.find((e) => e.id === formData.equipo_local_id);
    const visitante = equipos.find((e) => e.id === formData.equipo_visitante_id);

    const estadiosLocal = local?.estadio
      ? [{ id: `${local.estadio}`, nombre: local.estadio }]
      : [];
    const estadiosVisitante = visitante?.estadio
      ? [{ id: `${visitante.estadio}`, nombre: visitante.estadio }]
      : [];

    const combinados = [...estadiosLocal, ...estadiosVisitante];
    const unicos = Array.from(
      new Map(combinados.map((item) => [item.nombre, item])).values()
    );

    setEstadiosDisponibles(unicos);
    if (!unicos.some((e) => e.id === formData.estadio)) {
      setFormData((f) => ({ ...f, estadio: "" }));
    }
  }, [formData.equipo_local_id, formData.equipo_visitante_id, equipos]);

  const partidosFiltrados = partidos.filter(
    (p) =>
      p.equipo_local?.toLowerCase().includes(search.trim().toLowerCase()) ||
      p.equipo_visitante?.toLowerCase().includes(search.trim().toLowerCase()) ||
      p.fecha.includes(search.trim())
  );

  const openModal = (partido = null) => {
    setPartidoEdit(partido);

    setFormData(
      partido ?? {
        fecha: "",
        estadio: "",
        resultados_local: "",
        resultados_visitante: "",
        equipo_local_id: "",
        equipo_visitante_id: "",
        temporada: "",
      }
    );
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setPartidoEdit(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((f) => ({ ...f, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.equipo_local_id) return "Equipo local es obligatorio";
    if (!formData.equipo_visitante_id) return "Equipo visitante es obligatorio";
    if (!formData.fecha) return "Fecha es obligatoria";
    if (formData.equipo_local_id === formData.equipo_visitante_id)
      return "El equipo local y visitante no pueden ser iguales";
    if (!formData.estadio) return "Debes seleccionar un estadio";
    return null;
  };

  const handleSave = async () => {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    const fechaSeleccionada = new Date(formData.fecha);
    fechaSeleccionada.setHours(0, 0, 0, 0);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const resultados_local = formData.resultados_local === "" || formData.resultados_local == null ? 0 : Number(formData.resultados_local);
    const resultados_visitante = formData.resultados_visitante === "" || formData.resultados_visitante == null ? 0 : Number(formData.resultados_visitante);

    if (fechaSeleccionada > hoy && (resultados_local !== 0 || resultados_visitante !== 0)) {
      try {
        // Enviar notificación
        const equipoLocal = equipos.find((e) => e.id === formData.equipo_local_id);
        const equipoVisitante = equipos.find((e) => e.id === formData.equipo_visitante_id);
        const usuarioId = 1; // Reemplaza con usuario autenticado real
        const mensaje = `El (${formData.fecha}) jugará el Equipo: ${equipoLocal?.nombre || ""} contra ${equipoVisitante?.nombre || ""}`;

        await fetch(`${API_BASE_URL}/notificaciones`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            equipo_id: equipoLocal?.id,
            usuario_id: usuarioId,
            mensaje,
            fecha_creacion: new Date().toISOString(),
          }),
        });
        alert("No se permite ingresar resultados para fechas futuras. Notificación enviada.");
      } catch {
        alert("Error de red al crear la notificación.");
      }
      closeModal();
      return;
    }

    // Si es fecha pasada o los resultados son cero, guarda el partido normalmente
    try {
      const url = partidoEdit ? `${API_BASE_URL}/partidos/${partidoEdit.id}` : `${API_BASE_URL}/partidos`;
      const method = partidoEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, resultados_local, resultados_visitante }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al guardar partido");
        return;
      }

      const equipoLocal = equipos.find((e) => e.id === data.equipo_local_id);
      const equipoVisitante = equipos.find((e) => e.id === data.equipo_visitante_id);

      const partidoEnriquecido = {
        ...data,
        equipo_local: equipoLocal?.nombre || "",
        equipo_visitante: equipoVisitante?.nombre || "",
        logo_local: equipoLocal?.logo_url || "",
        logo_visitante: equipoVisitante?.logo_url || "",
      };

      if (partidoEdit) {
        setPartidos((prev) => prev.map((p) => (p.id === partidoEdit.id ? partidoEnriquecido : p)));
      } else {
        setPartidos((prev) => [...prev, partidoEnriquecido]);
      }
      closeModal();
    } catch {
      alert("Error de red al guardar partido");
    }
  };



  const handleDelete = async (id) => {
    if (!window.confirm("¿Borrar este partido?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/partidos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error al borrar partido");
        return;
      }
      setPartidos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Error de red al borrar partido");
    }
  };

  return cargando ? (
    <div className="text-center mt-10 bg-[var(--body)] min-h-full">Cargando partidos...</div>
  ) : (
    <div className="lg:p-6 w-full max-w-full bg-[var(--body)]">
      <h2 className="text-2xl lg:text-4xl font-semibold mt-20 lg:my-10 text-center text-[var(--dorado)]">
        Lista de partidos
      </h2>

      <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-4 mb-6 px-2 mt-10">
        <button
          onClick={() => openModal()}
          className="max-w-full lg:max-w-xs shadow-lg shadow-black px-4 py-2 hover:bg-[var(--dorado)] text-[var(--dorado)] rounded border border-[var(--dorado)] hover:text-black transition-all duration-200"
        >
          Crear Partido
        </button>
        <input
          type="text"
          placeholder="Buscar partido por equipo o fecha..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-full lg:max-w-md p-2 rounded border-1 bg-[var(--gris-claro)] focus:bg-[var(--gris-oscuro)] text-white border-black focus:text-[var(--dorado)] ring-[var(--dorado)] ring-2 hover:ring-[var(--dorado)] transition-all duration-200"
        />
      </div>

      <table className="lg:min-w-full text-center rounded-md border-collapse mx-auto table-fixed">
        <thead className="bg-[var(--gris-oscuro)] text-[var(--dorado)]">
          <tr>
            <th className="border-2 border-black px-4 py-2">Fecha</th>
            <th className="border-2 border-black px-4 py-2">Logo Local</th>
            <th className="border-2 border-black px-4 py-2">Logo Visitante</th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">Estadio</th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Equipo Local
            </th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Equipo Visitante
            </th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Marcador Local
            </th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Marcador Visitante
            </th>
            <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">
              Temporada
            </th>
            <th className="border-2 border-black px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidosFiltrados.map(
            ({
              id,
              fecha,
              logo_local,
              logo_visitante,
              estadio,
              equipo_local,
              equipo_visitante,
              resultados_local,
              resultados_visitante,
              temporada,
            }) => (
              <tr
                key={id}
                className="hover:bg-[var(--gris-oscuro)] hover:text-[var(--dorado)] bg-[var(--gris-claro)]"
              >
                <td className="border-2 border-black px-4 py-2">{fecha}</td>
                <td className="border-2 border-black px-4 py-2">
                  {logo_local && (
                    <img
                      src={logo_local}
                      alt={equipo_local}
                      className="w-10 h-10 mx-auto"
                    />
                  )}
                </td>
                <td className="border-2 border-black px-4 py-2">
                  {logo_visitante && (
                    <img
                      src={logo_visitante}
                      alt={equipo_visitante}
                      className="w-10 h-10 mx-auto"
                    />
                  )}
                </td>
                <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                  {estadio}
                </td>
                <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                  {equipo_local}
                </td>
                <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                  {equipo_visitante}
                </td>
                <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                  {resultados_local}
                </td>
                <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                  {resultados_visitante}
                </td>
                <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">
                  {temporada}
                </td>
                <td className="border-2 border-black lg:space-x-0 space-y-2 py-2 text-center grid-cols-1 px-2">
                  <button
                    onClick={() => openModal(partidos.find((j) => j.id === id))}
                    className="text-[var(--dorado)] border border-[var(--dorado)] px-2 py-1 rounded hover:bg-[var(--dorado)] hover:text-black"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="border border-red-700 px-2 py-1 rounded text-white hover:bg-red-700"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-[#000000ca] bg-opacity-70 flex justify-center items-start pt-12 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[var(--vinotinto)] border-1  border-[var(--dorado)] rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[var(--dorado)] text-center font-bold text-3xl mb-4">
              {partidoEdit ? "Editar Partido" : "Crear Partido"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <label className="block">
                Fecha:
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-[var(--gris-claro)] border-[var(--dorado)]"
                  required
                />
              </label>

              <label className="block">
                Equipo Local:
                <CustomSelect
                  options={equipos.map((e) => ({ id: e.id, nombre: e.nombre }))}
                  value={
                    equipos.find((e) => e.id === formData.equipo_local_id)?.nombre ||
                    ""
                  }
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, equipo_local_id: v }))
                  }
                />
              </label>
              <label className="block">
                Equipo Visitante:
                <CustomSelect
                  options={equipos.map((e) => ({ id: e.id, nombre: e.nombre }))}
                  value={
                    equipos.find((e) => e.id === formData.equipo_visitante_id)
                      ?.nombre || ""
                  }
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, equipo_visitante_id: v }))
                  }
                />
              </label>
                            <label className="block">
                Estadio:
                <CustomSelect
                  options={estadiosDisponibles.map((e) => ({
                    id: e.id,
                    nombre: e.nombre,
                  }))}
                  value={
                    estadiosDisponibles.find((e) => e.id === formData.estadio)
                      ?.nombre || ""
                  }
                  onChange={(v) => setFormData((f) => ({ ...f, estadio: v }))}
                />
              </label>

              {!esFechaFutura && (
    <>
      <label className="block">
        Marcador Local:
        <input
          type="number"
          min="0"
          name="resultados_local"
          value={formData.resultados_local || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border bg-[var(--gris-claro)] text-[var(--dorado)]"
        />
      </label>
      <label className="block">
        Marcador Visitante:
        <input
          type="number"
          min="0"
          name="resultados_visitante"
          value={formData.resultados_visitante || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border bg-[var(--gris-claro)] text-[var(--dorado)]"
        />
      </label>
    </>
  )}
              <label className="block">
                Temporada:
                <input
                  type="text"
                  name="temporada"
                  value={formData.temporada || ""}
                  readOnly
                  className="w-full p-2 rounded border bg-[var(--gris-claro)] text-[var(--dorado)] border-[var(--dorado)]"
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

export default PartidosAdmin;
