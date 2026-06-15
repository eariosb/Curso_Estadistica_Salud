import Link from "next/link";

interface Props {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export default function LessonNav({ prev, next }: Props) {
  const base = "/cursos/bioestadistica-clinica/modulos";
  return (
    <div
      className="flex justify-between items-center mt-12 pt-6 border-t gap-4"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex-1">
        {prev ? (
          <Link
            href={`${base}/${prev.slug}`}
            className="group flex flex-col no-underline"
            style={{ textDecoration: "none" }}
          >
            <span className="text-xs font-medium mb-1" style={{ color: "var(--fg-muted)" }}>
              ← Anterior
            </span>
            <span
              className="text-sm font-semibold group-hover:underline"
              style={{ color: "var(--fg)" }}
            >
              {prev.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/cursos/bioestadistica-clinica"
            className="group flex flex-col no-underline"
            style={{ textDecoration: "none" }}
          >
            <span className="text-xs font-medium mb-1" style={{ color: "var(--fg-muted)" }}>
              ← Volver
            </span>
            <span
              className="text-sm font-semibold group-hover:underline"
              style={{ color: "var(--fg)" }}
            >
              Inicio del curso
            </span>
          </Link>
        )}
      </div>

      {next && (
        <Link
          href={`${base}/${next.slug}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline transition-all"
          style={{
            background: "var(--primary)",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(37,99,235,0.28)",
            textDecoration: "none",
          }}
        >
          {next.title} →
        </Link>
      )}
    </div>
  );
}
