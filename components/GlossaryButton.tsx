"use client";

import { useState } from "react";
import { BookMarked } from "lucide-react";
import Glossary from "@/components/Glossary";
import { colors } from "@/lib/theme";

/**
 * Botón flotante que abre el Glosario estadístico.
 * Autocontenido: añádelo al final del contenido de cualquier módulo
 * (justo antes de la sección de referencias) para dar acceso al
 * glosario sin recargar la página.
 */
export default function GlossaryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir glosario estadístico"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 900,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.65rem 1.1rem",
          borderRadius: "999px",
          border: "none",
          background: colors.primary,
          color: "#fff",
          fontSize: "0.85rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
        }}
      >
        <BookMarked size={16} />
        Glosario
      </button>
      <Glossary isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
