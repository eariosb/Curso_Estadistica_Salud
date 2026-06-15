import { notFound } from "next/navigation";
import CourseSidebar from "@/components/navigation/CourseSidebar";
import LessonNav from "@/components/pedagogy/LessonNav";
import { courseModules } from "@/content/courses/bioestadistica-clinica/metadata";

// Generate static params for all modules
export function generateStaticParams() {
  return courseModules.map((mod) => ({ slug: mod.slug }));
}

// Dynamic metadata per module
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = courseModules.find((m) => m.slug === slug);
  if (!mod) return { title: "Módulo no encontrado" };
  return {
    title: `${mod.title} · Bioestadística`,
    description: mod.short,
  };
}

// Lazy-import module content
async function loadModule(slug: string) {
  try {
    const module = await import(
      `@/content/courses/bioestadistica-clinica/modules/${slug}`
    );
    return module;
  } catch {
    return null;
  }
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const currentIndex = courseModules.findIndex((m) => m.slug === slug);
  if (currentIndex === -1) notFound();

  const currentMod = courseModules[currentIndex];
  const prevMod = currentIndex > 0 ? courseModules[currentIndex - 1] : undefined;
  const nextMod =
    currentIndex < courseModules.length - 1 ? courseModules[currentIndex + 1] : undefined;

  const lessonModule = await loadModule(slug);
  if (!lessonModule) notFound();

  const LessonContent = lessonModule.default;
  const meta = lessonModule.meta;

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "2.5rem 1.5rem 5rem",
        display: "flex",
        gap: "2.5rem",
        alignItems: "flex-start",
      }}
    >
      {/* ── Sidebar ── */}
      <CourseSidebar modules={courseModules} />

      {/* ── Main content ── */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {/* Module header */}
        <div
          style={{
            marginBottom: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.85rem",
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--primary)",
              }}
            >
              {currentMod.isBonus ? "★ Módulo Bonus" : `Módulo ${currentMod.num}`}
            </span>
            <span
              style={{
                display: "inline-block",
                background: "rgba(37,99,235,0.08)",
                color: "var(--primary)",
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.2rem 0.65rem",
                borderRadius: 999,
              }}
            >
              {currentMod.tag}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--fg)",
              lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}
          >
            {meta?.title ?? currentMod.title}
          </h1>

          {meta?.subtitle && (
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--fg-muted)",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              {meta.subtitle}
            </p>
          )}

          {meta?.objective && (
            <div
              style={{
                background: "rgba(37,99,235,0.05)",
                border: "1px solid rgba(37,99,235,0.15)",
                borderRadius: "var(--radius)",
                padding: "0.9rem 1.1rem",
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1rem", marginTop: "0.05rem" }}>🎯</span>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--fg)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                <strong>Objetivo:</strong> {meta.objective}
              </p>
            </div>
          )}
        </div>

        {/* ── Lesson content ── */}
        <LessonContent />

        {/* ── Navigation ── */}
        <LessonNav
          prev={prevMod ? { slug: prevMod.slug, title: prevMod.title } : undefined}
          next={nextMod ? { slug: nextMod.slug, title: nextMod.title } : undefined}
        />
      </main>
    </div>
  );
}
