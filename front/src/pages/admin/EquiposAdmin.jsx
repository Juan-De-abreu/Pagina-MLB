import React, { useEffect, useState } from "react";

const EquiposAdmin = () => {
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [equipoEdit, setEquipoEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDatos = async () => {
      setCargando(true);
      try {
        const resEquipos = await fetch("http://localhost:8081/api/equipos");
        const dataEquipos = await resEquipos.json();
        setEquipos(dataEquipos);
      } catch (e) {
        alert("Error al cargar datos de equipos");
      } finally {
        setCargando(false);
      }
    };
    fetchDatos();
  }, [equipos.length]);

  // Buscador en tiempo real
  const equiposFiltrados = equipos.filter((e) =>
    e.nombre.toLowerCase().includes(search.trim().toLowerCase())
  );

  const openModal = (equipo = null) => {
    setEquipoEdit(equipo);
    setFormData(
      equipo ?? {
        nombre: "",
        ciudad: "",
        estadio: "",
        fundacion: "",
        titulos_nacionales: "",
        titulos_serie_caribe: "",
        logo_url: "",
        foto_estadio: "",
        capacidad: "",
        entrenador: "",
        presidente: "",
      }
    );
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEquipoEdit(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.nombre?.trim()) return "El nombre es obligatorio";
    if (!formData.ciudad?.trim()) return "La ciudad es obligatoria";
    return null;
  };

  const handleSave = async () => {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }
    try {
      const url = equipoEdit
        ? `http://localhost:8081/api/equipos/${equipoEdit.id}`
        : "http://localhost:8081/api/equipos";
      const method = equipoEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al guardar el equipo");
        return;
      }

      if (equipoEdit) {
        setEquipos((prev) =>
          prev.map((e) => (e.id === equipoEdit.id ? { ...e, ...formData } : e))
        );
      } else {
        setEquipos((prev) => [...prev, data]);
      }
      closeModal();
    } catch {
      alert("Error de red al guardar equipo");
    }
  };

 const handleDelete = async (id, nombreborrar) => {
  if (!window.confirm(`¿Borrar este equipo? ${nombreborrar}`)) return;

  try {
    const res = await fetch(`http://localhost:8081/api/equipos/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al borrar equipo");
      return;
    }

    // Actualizar el estado correctamente para que el front refleje el cambio
    setEquipos((prev) => prev.filter((e) => e.id !== id));
  } catch (error) {
    alert("Error de red al borrar equipo");
    console.error("Eliminar equipo error:", error);
  }
};

  if (cargando)
    return <div className="text-center mt-10">Cargando equipos...</div>;

  return (
    <div className="lg:p-6 w-full max-w-full">
      <h2 className="text-2xl lg:text-4xl font-semibold mt-20 lg:my-10 text-center text-[var(--dorado)]">
        Lista de equipos
      </h2>

      {/* Botón y Buscador: responsivo */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-4 mb-6 px-2 mt-10">
        <button
          onClick={() => openModal()}
          className="max-w-full lg:max-w-xs shadow-lg shadow-black px-4 py-2 hover:bg-[var(--dorado)] text-[var(--dorado)] rounded border border-[var(--dorado)] hover:text-black transition-all duration-200"
        >
          Crear Equipo
        </button>
        <input
          type="text"
          placeholder="Buscar equipo por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-full lg:max-w-md p-2 rounded border-1 bg-[var(--gris-claro)] focus:bg-[var(--gris-oscuro)] text-white border-black focus:text-[var(--dorado)] ring-[var(--dorado)] ring-2 hover:ring-[var(--dorado)] transition-all duration-200"
        />
      </div>

      <table className="lg:min-w-full text-center rounded-md border-collapse mx-auto table-fixed">
        <thead className="bg-[var(--gris-oscuro)] text-[var(--dorado)]">
  <tr>
    <th className="border-2 border-black px-4 py-2">Logo</th>
    <th className="border-2 border-black px-4 py-2">Nombre</th>
    <th className="border-2 border-black px-4 py-2 hidden lg:table-cell">Ciudad</th>
    <th className="border-2 border-black px-4 py-2">Acciones</th>
  </tr>
</thead>
<tbody>
  {equiposFiltrados.map(({ id, nombre, ciudad, logo_url }) => (
    <tr
      key={id}
      className="hover:bg-[var(--gris-oscuro)] hover:text-[var(--dorado)] bg-[var(--gris-claro)]"
    >
      <td className="border-2 border-black px-2 py-2">
        {logo_url && (
          <img
            src={Array.isArray(logo_url) ? logo_url[0] : logo_url}
            alt={nombre}
            className="w-30 rounded-xl h-30 object-contain mx-auto"
          />
        )}
      </td>
      <td className="border-2 border-black px-4 py-2">{nombre}</td>
      <td className="border-2 border-black px-4 py-2 hidden lg:table-cell">{ciudad}</td>
      <td className="border-2 border-black lg:space-x-4 space-y-2 lg:space-y-0 py-2 text-center  grid-cols-1 lg:grid-cols-2 px-2">
                        <button
                  onClick={() => openModal(equipos.find((j) => j.id === id))}
                  className="text-[var(--dorado)] border border-[var(--dorado)] px-2 py-1 rounded hover:bg-[var(--dorado)] hover:text-black"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(id,nombre)}
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
              {equipoEdit ? "Editar Equipo" : "Crear Equipo"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {Object.entries(formData).map(([key, val]) => {
                if (key === "id") return null;
                // Mostrar img cargada si es logo_url o foto_estadio
                if (key === "logo_url" || key === "foto_estadio") {
                  return (
                    <label
                      htmlFor={key}
                      key={key}
                      className="block mb-4 text-[var(--dorado)]"
                    >
                      {key.replace(/_/g, " ")}:
                      <input
                        id={key}
                        type="url"
                        name={key}
                        value={val}
                        onChange={handleChange}
                        className="w-full mt-1 rounded border text-gray-200 p-2"
                        required={key === "logo_url"}
                      />
                      {val && (
                        <img
                          src={Array.isArray(val) ? val[0] : val}
                          alt={key}
                          className="w-25 rounded shadow-lg shadow-black mt-5 h-25 mx-auto object-cover"
                        />
                      )}
                    </label>
                  );
                }
                // Demás campos
                let inputType = "text";
                if (
                  [
                    "titulos_nacionales",
                    "titulos_serie_caribe",
                    "capacidad",
                  ].includes(key)
                ) {
                  inputType = "number";
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
                      required={["nombre", "ciudad", "estadio"].includes(key)}
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

export default EquiposAdmin;
