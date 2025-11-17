import React, { useEffect } from "react";

const PaginadorSimple = ({ paginaActual, totalPaginas, onCambiarPagina }) => {
  // Scroll arriba cada vez que cambie paginaActual
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [paginaActual]);

  return (
    <div className="inline-block text-white font-mono text-lg select-none mx-auto items-center gap-2 float-right scale-120 lg:scale-110 my-4">
      <button
        onClick={() => onCambiarPagina(Math.max(1, paginaActual - 1))}
        disabled={paginaActual === 1}
        className="disabled:opacity-50 px-2 hover:cursor-pointer text-[var(--dorado)] hover:scale-130 transition-all duration-350"
        aria-label="Página anterior"
      >
        &lt;
      </button>
      <span className="px-2">
        {paginaActual} / {totalPaginas}
      </span>
      <button
        onClick={() => onCambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
        disabled={paginaActual === totalPaginas}
        className="disabled:opacity-50 px-2 hover:cursor-pointer text-[var(--dorado)] hover:scale-130 transition-all duration-350"
        aria-label="Página siguiente"
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginadorSimple;
