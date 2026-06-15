# Estadística para Profesionales de la Salud

Aplicación web (Next.js) del curso **Estadística para profesionales de ciencias de la salud**. Presenta los módulos del curso con componentes interactivos, visualizaciones estadísticas y un diseño minimalista basado en un sistema modular.

## Stack técnico

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** para estilos
- **KaTeX** / **MathJax** para notación matemática
- **Lucide React** para iconografía

## Estructura del proyecto

```
app/
  cursos/bioestadistica-app/   # Rutas del curso (módulos dinámicos por slug)
  layout.tsx                       # Layout raíz (metadata, fuentes, navbar)
content/
  courses/bioestadistica-app/  # Contenido de cada módulo (00 a 14 + bonus)
components/
  graphics/    # Componentes de gráficos estadísticos
  navigation/  # Navbar y navegación del curso
  pedagogy/    # Componentes pedagógicos (glosario, ejemplos, etc.)
  ui/          # Componentes de interfaz base
lib/
  theme.ts     # Configuración de tema y estilos
```

## Requisitos previos

- Node.js 18.18 o superior
- pnpm (gestor de paquetes del proyecto)

## Instalación y ejecución local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

| Comando      | Descripción                       |
|--------------|------------------------------------|
| `pnpm dev`   | Inicia el servidor de desarrollo   |
| `pnpm build` | Genera la build de producción      |
| `pnpm start` | Ejecuta la build de producción     |

## Módulos del curso

01. De la ansiedad al empoderamiento
02. El lenguaje de los datos – Variables
03. Fundamentos estadísticos y muestreo
04. Probabilidad y el Teorema de Bayes
05. Sesgos en investigación y su impacto
06. Muestreo y diseño de estudios
07. Regresión lineal
08. Significancia estadística vs. relevancia
09. Pruebas estadísticas básicas
10. Análisis de supervivencia
11. Modelos multivariantes
12. Evaluación crítica de artículos
13. Ética estadística
14. Diseño y plan de análisis de un estudio piloto

Bonus: Guía para leer gráficos estadísticos

## Despliegue

Compatible con [Vercel](https://vercel.com/new) u otra plataforma que soporte Next.js. Ver la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).
