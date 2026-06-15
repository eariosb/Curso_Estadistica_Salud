import Link from "next/link";
import { CourseModule } from "@/content/courses/bioestadistica-clinica/metadata";

interface Props {
  module: CourseModule;
  className?: string;
}

const tagColors: Record<string, { bg: string; color: string }> = {
  Fundamentos: { bg: "#EFF6FF", color: "#2563EB" },
  "Razonamiento Clínico": { bg: "#ECFDF5", color: "#059669" },
  "Lectura Crítica": { bg: "#FEF3C7", color: "#D97706" },
  Interpretación: { bg: "#F3E8FF", color: "#7C3AED" },
  Análisis: { bg: "#FFF1F2", color: "#E11D48" },
  "Análisis Avanzado": { bg: "#FEF9C3", color: "#CA8A04" },
  "Ética Científica": { bg: "#FDF4FF", color: "#A21CAF" },
  "Diseño de Estudios": { bg: "#F0FDF4", color: "#16A34A" },
  "Referencia Visual": { bg: "#EFF6FF", color: "#2563EB" },
};

export default function ModuleCard({ module, className = "" }: Props) {
  const tag = tagColors[module.tag] ?? { bg: "var(--primary-light)", color: "var(--primary)" };
  const href = `/cursos/bioestadistica-clinica/modulos/${module.slug}`;

  return (
    <Link
      href={href}
      className={`group block rounded-2xl border p-6 transition-all duration-200 no-underline relative overflow-hidden ${className}`}
      style={{
        background: module.isBonus ? "var(--primary)" : "var(--card)",
        borderColor: module.isBonus ? "var(--primary)" : "var(--border)",
        boxShadow: "var(--shadow-sm)",
        textDecoration: "none",
      }}
    >
      {/* Accent left border on hover */}
      <span
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: module.isBonus ? "rgba(255,255,255,0.4)" : "var(--primary)" }}
      />

      {/* Module number */}
      <p
        className="text-5xl font-extrabold leading-none mb-3 tabular-nums select-none"
        style={{
          color: module.isBonus ? "rgba(255,255,255,0.18)" : "var(--border)",
          letterSpacing: "-0.04em",
        }}
      >
        {module.num}
      </p>

      {/* Title */}
      <h3
        className="font-semibold text-[0.95rem] leading-snug mb-2"
        style={{ color: module.isBonus ? "#fff" : "var(--fg)" }}
      >
        {module.title}
      </h3>

      {/* Description */}
      <p
        className="text-[0.8rem] leading-relaxed mb-4"
        style={{ color: module.isBonus ? "rgba(255,255,255,0.72)" : "var(--fg-muted)" }}
      >
        {module.short}
      </p>

      {/* Tag */}
      <span
        className="inline-block text-[0.7rem] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full"
        style={
          module.isBonus
            ? { background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" }
            : { background: tag.bg, color: tag.color }
        }
      >
        {module.tag}
      </span>
    </Link>
  );
}
