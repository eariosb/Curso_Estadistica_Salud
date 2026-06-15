"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseModule } from "@/content/courses/bioestadistica-clinica/metadata";

interface Props {
  modules: CourseModule[];
}

export default function CourseSidebar({ modules }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 flex-shrink-0 hidden lg:block"
    >
      <div
        className="sticky top-20 rounded-2xl border p-4 overflow-y-auto"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 px-2"
          style={{ color: "var(--fg-muted)" }}
        >
          Contenido del curso
        </p>

        <nav className="flex flex-col gap-0.5">
          {modules.map((mod) => {
            const href = `/cursos/bioestadistica-clinica/modulos/${mod.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={mod.slug}
                href={href}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all group"
                style={{
                  background: isActive ? "var(--primary-light)" : "transparent",
                  textDecoration: "none",
                }}
              >
                {/* Status indicator */}
                <span
                  className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all"
                  style={{
                    borderColor: isActive ? "var(--primary)" : "var(--border)",
                    background: isActive ? "var(--primary-light)" : "transparent",
                  }}
                />
                <span
                  className="text-xs leading-snug font-medium transition-colors"
                  style={{
                    color: isActive ? "var(--primary)" : "var(--fg-muted)",
                  }}
                >
                  <span
                    className="block text-[10px] font-bold uppercase tracking-widest mb-0.5"
                    style={{ color: isActive ? "var(--primary)" : "var(--fg-subtle)" }}
                  >
                    {mod.isBonus ? "★ Bonus" : `Módulo ${mod.num}`}
                  </span>
                  {mod.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
