import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-16 border-t"
      style={{ borderColor: "var(--border)", background: "var(--muted)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-[auto_1fr] items-start">
        {/* Logo + curso */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 48,
              height: 48,
              background: "var(--primary)",
              padding: 8,
            }}
          >
            <Image
              src="/logo-esneider.svg"
              alt="Logo Esneider Ríos"
              width={32}
              height={32}
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
              Bioestadística
            </p>
            <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>
              Curso para profesionales de ciencias de la salud
            </p>
          </div>
        </div>

        {/* Créditos / autor */}
        <div className="grid gap-1 sm:text-right text-sm" style={{ color: "var(--fg-muted)" }}>
          <p className="font-semibold" style={{ color: "var(--fg)" }}>
            Esneider Ríos
          </p>
          <p>Universidad Nacional de Colombia - Sede Medellín</p>
          <p>Facultad de Ciencias - Departamento de Estadística</p>
          <Link
            href="https://wa.me/573044575399"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:justify-end font-medium transition-colors"
            style={{ color: "var(--secondary)" }}
          >
            WhatsApp +57 304 457 5399
          </Link>
        </div>
      </div>

      <div
        className="border-t py-4 text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--fg-subtle)" }}
      >
        © {new Date().getFullYear()} Esneider Ríos · Universidad Nacional de Colombia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
