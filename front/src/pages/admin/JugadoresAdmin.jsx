import React, { useEffect, useState } from "react";

const AdminJugadores = () => {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jugadorEdit, setJugadorEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  // Carga jugadores y equipos
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
      } finally {
        setCargando(false);
      }
    };
    fetchDatos();
  }, []);

  // Abre modal para editar o crear
  const openModal = (jugador = null) => {
    setJugadorEdit(jugador);
    setFormData(jugador ?? {
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
      id_equipo: equipos.length > 0 ? equipos[0].id : 0, // Selección por defecto equipo 0 o primero
      nombre_equipo: equipos.length > 0 ? equipos[0].nombre : ""
    });
    setError(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setJugadorEdit(null);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = type === "number" ? Number(value) : value;
    // Al cambiar equipo, actualizar id_equipo y nombre_equipo
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

  const validateForm = () => {
    if (!formData.nombre?.trim()) return "El nombre es obligatorio";
    if (!formData.nombre_equipo?.trim()) return "El equipo es obligatorio";
    return null;
  };

  const handleSave = async () => {
    const err = validateForm();
    if (err) {
      setError(err);
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
        setError(data.error || "Error al guardar jugador");
        return;
      }

      if (jugadorEdit) {
        setJugadores((prev) =>
          prev.map((j) => (j.id === jugadorEdit.id ? { ...j, ...formData } : j))
        );
      } else {
        setJugadores((prev) => [...prev, data]);
      }
      closeModal();
    } catch {
      setError("Error de red al guardar jugador");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Borrar este jugador?")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/jugadores/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al borrar jugador");
        return;
      }
      setJugadores((prev) => prev.filter((j) => j.id !== id));
    } catch {
      alert("Error de red al borrar jugador");
    }
  };

  if (cargando) return <div>Cargando jugadores...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Jugadores</h2>

      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => openModal()}
      >
        Crear Jugador
      </button>

      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-[var(--dorado)] text-black">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Equipo</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map(({ id, nombre, nombre_equipo }) => (
            <tr key={id} className="hover:bg-[var(--vinotinto)]">
              <td className="border border-[var(--dorado)] px-4 py-2">{id}</td>
              <td className="border border-[var(--dorado)] px-4 py-2">{nombre}</td>
              <td className="border border-[var(--dorado)] px-4 py-2">{nombre_equipo}</td>
              <td className="border border-[var(--dorado)] space-x-4 py-2 text-center">
                <button
                  onClick={() => openModal(jugadores.find((j) => j.id === id))}
                  className="border-[var(--dorado)] border-1 px-3 py-1 rounded hover:bg-[var(--dorado)] hover:text-black"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="border-1 border-red-700 px-3 py-1 rounded text-white hover:bg-red-700 hover:text-white"
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
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            paddingTop: "3rem",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "var(--vinotinto)",
              borderRadius: "8px",
              padding: "20px",
              width: "90%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 0 10px black",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{ fontWeight: "bold", fontSize: "1.25rem", marginBottom: "12px" }}
            >
              {jugadorEdit ? "Editar Jugador" : "Crear Jugador"}
            </h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {Object.entries(formData).map(([key, val]) => {
                if (key === "id") return null;
                if (key === "id_equipo") return null; // omitimos id_equipo como input normal
                if (key === "nombre_equipo") {
                  return (
                    <label key={key} style={{ display: "block", marginBottom: "10px" }}>
                      Equipo:
                      <select
                        name="nombre_equipo"
                        value={val}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                          border: "1px solid gray",
                          padding: "6px 8px",
                          marginTop: "4px",
                        }}
                        required
                      >
                        {equipos.map((equipo) => (
                          <option key={equipo.id} value={equipo.nombre}>
                            {equipo.nombre}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }
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
                  val = val ? val.substring(0, 10) : "";
                }
                return (
                  <label key={key} style={{ display: "block", marginBottom: "10px" }}>
                    {key.replace(/_/g, " ")}:
                    <input
                      type={inputType}
                      name={key}
                      value={val}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        borderRadius: "4px",
                        border: "1px solid gray",
                        padding: "6px 8px",
                        marginTop: "4px",
                      }}
                      required={key === "nombre"}
                      step={inputType === "number" ? "any" : undefined}
                    />
                  </label>
                );
              })}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 14px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#2563EB",
                    color: "white",
                    cursor: "pointer",
                  }}
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
