import Link from "next/link";
import { ArrowRight, Clock, Target, Users } from "lucide-react";
import ModuleCard from "@/components/navigation/ModuleCard";
import { courseModules, bioestadisticaCourse } from "@/content/courses/bioestadistica-clinica/metadata";

export const metadata = {
  title: "Bioestadística para Profesionales en ciencias de la Salud",
  description: bioestadisticaCourse.description,
};

const tagGroups = [
  { label: "Fundamentos", modules: courseModules.filter((m) => m.tag === "Fundamentos") },
  { label: "Razonamiento & Lectura Crítica", modules: courseModules.filter((m) => ["Razonamiento", "Lectura Crítica"].includes(m.tag)) },
  { label: "Interpretación & Análisis", modules: courseModules.filter((m) => ["Interpretación", "Análisis", "Análisis Avanzado"].includes(m.tag)) },
  { label: "Ética & Diseño", modules: courseModules.filter((m) => ["Ética Científica", "Diseño de Estudios"].includes(m.tag)) },
  { label: "Referencia", modules: courseModules.filter((m) => m.tag === "Referencia Visual") },
];

export default function CourseOverviewPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ── Course Hero ── */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)",
          padding: "4.5rem 0 3.5rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.85rem",
              textDecoration: "none",
              marginBottom: "1.75rem",
              padding: "0.5rem 1rem",
            }}
          >
            ← Inicio
          </Link>
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.3rem 0.85rem",
              borderRadius: 999,
              marginBottom: "1rem",
            }}
          >
            Curso completo
          </span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            {bioestadisticaCourse.title}
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "2.5rem",
              maxWidth: 600,
              lineHeight: 1.7,
            }}
          >
            {bioestadisticaCourse.description}
          </p>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { icon: Target, text: "Ejemplos prácticos" },
              { icon: Clock, text: "Aprende a tu ritmo" },
              { icon: Users, text: "Referencias y contenido actualizado" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.875rem",
                }}
              >
                <Icon size={15} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Sticky Bar ── */}
      <div
        style={{
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
          padding: "1rem 0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "var(--fg-muted)", fontSize: "0.875rem" }}>
            <strong style={{ color: "var(--fg)" }}>{courseModules.filter((m) => !m.isBonus).length} módulos</strong>
            {" "}· 1 módulo bonus · Acceso libre y gratuito
          </p>
          <Link
            href={`/cursos/bioestadistica-clinica/modulos/${courseModules[0].slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--primary)",
              color: "#fff",
              padding: "0.6rem 1.4rem",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Comenzar desde el principio <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Módulos por grupos ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {tagGroups
          .filter((g) => g.modules.length > 0)
          .map((group) => (
            <section key={group.label} style={{ marginBottom: "3.5rem" }}>
              <h2
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--fg)",
                  marginBottom: "1.25rem",
                  paddingBottom: "0.6rem",
                  borderBottom: "2px solid var(--border)",
                }}
              >
                {group.label}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                  gap: "1.1rem",
                }}
              >
                {group.modules.map((mod) => (
                  <ModuleCard key={mod.slug} module={mod} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
