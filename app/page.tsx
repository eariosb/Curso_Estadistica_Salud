import Link from "next/link";
import { ArrowRight, BookOpen, Users, BarChart2, Award, CheckCircle } from "lucide-react";
import ModuleCard from "@/components/navigation/ModuleCard";
import { courseModules } from "@/content/courses/bioestadistica-clinica/metadata";

const stats = [
  { value: "Conceptos prácticos", label: "Ejemplos aplicados" },
  { value: "Módulos Temáticos", label: "Enfoque especializado" },
  { value: "Funcionalidad", label: "Entender desde la práctica" },
  { value: "Enfoque", label: "Utilidad" },
];

const features = [
  {
    icon: BookOpen,
    title: "Contenido diseñado para la práctica",
    desc: "Cada concepto se ilustra con casos reales de enfermería, farmacia, psicología, fisioterapia y nutrición.",
  },
  {
    icon: BarChart2,
    title: "Sin fórmulas sin contexto",
    desc: "Primero el por qué, luego el cómo. La estadística al servicio de la toma de decisiones.",
  },
  {
    icon: Users,
    title: "Multi-disciplinar por diseño",
    desc: "No es un curso de medicina ni de matemáticas. Es un curso para todos los profesionales de la salud.",
  },
  {
    icon: Award,
    title: "Herramientas gratuitas",
    desc: "Aprende con Jamovi y JASP: la alternativa moderna y accesible a SPSS, disponible para todos.",
  },
];

const audiences = [
  "Enfermería", "Farmacia", "Psicología", "Fisioterapia",
  "Nutrición", "Odontología", "Salud Pública", "Medicina",
];

export default function HomePage() {
  const featuredModules = courseModules.slice(0, 6);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "6rem 0 5rem",
          borderBottom: "1px solid var(--border)",
          background: "linear-gradient(135deg, var(--bg) 0%, #d7e4f7 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 680 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(37,99,235,0.1)",
                color: "var(--primary)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.35rem 0.9rem",
                borderRadius: 999,
                marginBottom: "1.75rem",
              }}
            >
              Bioestadística
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "var(--fg)",
                marginBottom: "1.25rem",
              }}
            >
              La estadística que siempre
              <br />
              <span style={{ color: "var(--primary)" }}>quisiste entender.</span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--fg-muted)",
                lineHeight: 1.75,
                marginBottom: "2.25rem",
                maxWidth: 520,
              }}
            >
              Un curso práctico para profesionales de ciencias de la salud. Sin matemáticas vacías,
              con casos reales de tu área y herramientas gratuitas.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/cursos/bioestadistica-clinica"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "0.8rem 1.6rem",
                  borderRadius: "var(--radius)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                Explorar el curso <ArrowRight size={15} />
              </Link>
              <Link
                href="/cursos/bioestadistica-clinica/modulos/01-ansiedad-al-empoderamiento"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--card)",
                  color: "var(--fg)",
                  padding: "0.8rem 1.6rem",
                  borderRadius: "var(--radius)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                }}
              >
                Empezar gratis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "3rem 0", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "1.2182rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.67rem", color: "var(--fg-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Para quién ── */}
      <section style={{ padding: "4.5rem 0", background: "var(--muted)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--primary)",
              marginBottom: "0.6rem",
            }}
          >
            Diseñado para
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
              fontWeight: 700,
              marginBottom: "1.75rem",
              color: "var(--fg)",
            }}
          >
            Todas las profesiones en ciencias de la salud que toman decisiones basadas en información.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            {audiences.map((a) => (
              <span
                key={a}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "0.4rem 1rem",
                  fontSize: "0.875rem",
                  color: "var(--fg)",
                  fontWeight: 500,
                }}
              >
                <CheckCircle size={13} color="var(--secondary)" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "5rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--primary)",
              marginBottom: "0.6rem",
            }}
          >
            ¿Por qué este curso?
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
              fontWeight: 700,
              marginBottom: "2.75rem",
              color: "var(--fg)",
            }}
          >
            Estadística con sentido por las ciencias de la salud
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    background: "rgba(37,99,235,0.08)",
                    borderRadius: "var(--radius)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <f.icon size={19} color="var(--primary)" />
                </div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "0.45rem",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Módulos destacados ── */}
      <section style={{ padding: "5rem 0", background: "var(--muted)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "2.25rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Contenido
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
                  fontWeight: 700,
                  color: "var(--fg)",
                }}
              >
                Primeros módulos
              </h2>
            </div>
            <Link
              href="/cursos/bioestadistica-clinica"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--primary)",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "1.1rem",
            }}
          >
            {featuredModules.map((mod) => (
              <ModuleCard key={mod.slug} module={mod} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section
        style={{
          padding: "5rem 0",
          background: "var(--primary)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "0 1.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Empieza hoy, sin requisitos previos
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "2rem",
              lineHeight: 1.75,
            }}
          >
            No necesitas saber matemáticas. Solo necesitas querer. Aprenderás desde otra perspectiva como interactuar con la información, gráficos, tablas, métodos e interpretar con una mirada crítica.
          </p>
          <Link
            href="/cursos/bioestadistica-clinica/modulos/01-ansiedad-al-empoderamiento"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#fff",
              color: "var(--primary)",
              padding: "0.9rem 2.25rem",
              borderRadius: "var(--radius)",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            Comenzar el módulo 1 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
