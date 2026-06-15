import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: "Bioestadística · Profesionales de la Salud",
  description:
    "Curso bioestadística orientado a profesionales de ciencias de la salud. De la ansiedad estadística al criterio clínico.",
  openGraph: {
    title: "Bioestadística · Profesionales de la Salud",
    description: "Transforma los datos en decisiones informadas.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
