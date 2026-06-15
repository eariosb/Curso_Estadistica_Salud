"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isCourse = pathname?.includes("/cursos");

  return (
    <header
      className="sticky top-0 h-screen w-64 bg-white border-r z-40 sm:hidden"
      style={{
        background: "rgba(249,250,251,0.88)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
            style={{ background: "var(--primary)" }}
          />
          <span
            className="font-semibold text-sm tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Bioestadística
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hidden sm:block"
            style={{ color: pathname === "/" ? "var(--primary)" : "var(--fg-muted)" }}
          >
            Inicio
          </Link>
          <Link
            href="/cursos/bioestadistica-clinica"
            className="text-sm font-medium transition-colors hidden sm:block"
            style={{
              color: isCourse ? "var(--primary)" : "var(--fg-muted)",
            }}
          >
            Módulos
          </Link>
          <Link
            href="/cursos/bioestadistica-clinica/modulos/01-ansiedad-al-empoderamiento"
            className="text-sm font-semibold px-4 py-1.5 rounded-lg transition-all"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
            }}
          >
            Comenzar →
          </Link>
        </nav>
      </div>
    </header>
  );
}
