'use client';
import Callout from "@/components/pedagogy/Callout";
import DataTable from "@/components/pedagogy/DataTable";
import Flashcard from "@/components/pedagogy/Flashcard";
import GlossaryButton from "@/components/GlossaryButton";
import { Compass, Sparkles, Layers, BookOpenCheck } from "lucide-react";

export const meta = {
  title: "Orientación del Curso",
  subtitle: "Cómo está construido este curso y cómo recorrerlo según tu perfil profesional",
  objective:
    "Comprender la estructura general del curso (14 módulos + 1 bonus), familiarizarse con los componentes interactivos que se usarán a lo largo de las lecciones, y elegir una ruta de aprendizaje adecuada según tu especialidad en ciencias de la salud.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose">
      {/* ═══════════════════════════════════════════════════════════
          BIENVENIDA
      ═══════════════════════════════════════════════════════════ */}
      <h2>Bienvenido/a a Bioestadística para Profesionales de la Salud</h2>
      <p>
        Este curso está diseñado para que cualquier profesional de ciencias de la salud —
        sin formación previa en matemáticas avanzadas— desarrolle <strong>criterio
        estadístico</strong>: la capacidad de leer evidencia, interpretar resultados y
        tomar decisiones informadas en su práctica diaria. No se trata de convertirte en
        estadístico, sino de dejar de depender ciegamente de lo que otros calculan por ti.
      </p>
      <p>
        Antes de comenzar el Módulo 1, este módulo de orientación te explica{" "}
        <strong>cómo está organizado el curso</strong>, <strong>qué herramientas
        interactivas encontrarás</strong> y <strong>qué ruta seguir</strong> según tu
        especialidad. Tómate 10 minutos para leerlo: te ahorrará tiempo y frustración más
        adelante.
      </p>

      {/* ═══════════════════════════════════════════════════════════
          ESTRUCTURA DEL CURSO
      ═══════════════════════════════════════════════════════════ */}
      <h2>Estructura general: 14 módulos + 1 bonus</h2>
      <p>
        El curso sigue un <strong>orden lógico y acumulativo</strong>: cada módulo se
        apoya en los conceptos del anterior. Está organizado en cuatro grandes bloques
        temáticos:
      </p>

      <DataTable
        headers={["Bloque", "Módulos", "Qué construye"]}
        rows={[
          [
            "1 · Fundamentos",
            "01–03",
            "Supera la ansiedad estadística, comprende qué es una variable y domina las bases de la estadística descriptiva e inferencial y el muestreo.",
          ],
          [
            "2 · Razonamiento y diseño",
            "04–06",
            "Probabilidad, Bayes, sesgos de investigación, muestreo avanzado y diseño de estudios (ECA, cohortes, casos y controles).",
          ],
          [
            "3 · Análisis aplicado",
            "07–11",
            "Regresión lineal, significancia vs. relevancia, pruebas estadísticas básicas (t-test, chi-cuadrado), supervivencia y modelos multivariantes.",
          ],
          [
            "4 · Síntesis e integración",
            "12–14",
            "Evaluación crítica de artículos, ética estadística y diseño completo de un estudio piloto — el cierre práctico del curso.",
          ],
          [
            "★ Bonus",
            "Guía de gráficos",
            "Referencia visual permanente para interpretar cualquier gráfico estadístico que encuentres en la literatura.",
          ],
        ]}
      />

      <Callout type="info" title="¿Por qué este orden?">
        <p>
          El orden no es arbitrario: primero se desactiva la ansiedad y se construye
          vocabulario (1–3), luego se aprende a razonar bajo incertidumbre y a reconocer
          buenos y malos diseños (4–6), después se aplican las herramientas analíticas más
          comunes en salud (7–11), y finalmente se integra todo en la lectura crítica de
          literatura y el diseño de un estudio propio (12–14). El módulo bonus de gráficos
          puede consultarse en cualquier momento — está pensado como referencia, no como
          lectura secuencial.
        </p>
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          COMPONENTES INTERACTIVOS
      ═══════════════════════════════════════════════════════════ */}
      <h2>Cómo usar los componentes interactivos</h2>
      <p>
        A lo largo de las lecciones encontrarás varios elementos diseñados para hacer el
        aprendizaje más activo. Conocerlos de antemano te ayudará a aprovecharlos mejor:
      </p>

      <DataTable
        headers={["Componente", "Qué es", "Cómo usarlo"]}
        rows={[
          [
            "💡 Callout",
            "Recuadro de color que resalta información: definiciones, advertencias, casos clínicos, datos curiosos o ideas clave para recordar.",
            "Lee siempre los callouts de tipo ⚠️ (advertencia) y 🧠 (memoria) con especial atención — suelen señalar errores frecuentes.",
          ],
          [
            "🃏 Flashcard",
            "Tarjeta de pregunta-respuesta plegable.",
            "Intenta responder mentalmente antes de hacer clic para revelar la respuesta. Útil para repasar antes de un examen o reunión.",
          ],
          [
            "✅ Quiz",
            "Pregunta de opción múltiple con retroalimentación inmediata.",
            "Elige una opción y lee la explicación completa, incluso si respondiste correctamente: ahí está el aprendizaje real.",
          ],
          [
            "🔢 ProcessSteps",
            "Secuencia numerada de pasos (un proceso, algoritmo o flujo de decisión).",
            "Síguelos en orden — representan flujos de trabajo aplicables directamente a tu práctica.",
          ],
          [
            "📊 Gráficos y exploradores",
            "Visualizaciones SVG y, en algunos módulos, exploradores interactivos donde puedes activar/desactivar elementos (líneas de regresión, residuos, etc.).",
            "Interactúa con los controles — cambiar parámetros y observar qué pasa es la forma más rápida de generar intuición estadística.",
          ],
          [
            "📖 Glosario",
            "Panel con definiciones cortas de los términos estadísticos más usados en el curso.",
            "Ábrelo con el botón flotante cuando encuentres un término que no recuerdes — funciona en cualquier módulo, sin recargar la página.",
          ],
        ]}
      />

      <GlossaryButton />

      {/* ═══════════════════════════════════════════════════════════
          RUTAS DE APRENDIZAJE POR ESPECIALIDAD
      ═══════════════════════════════════════════════════════════ */}
      <h2>Rutas de aprendizaje según tu especialidad</h2>
      <p>
        Aunque recomendamos seguir el curso en orden completo, si tu tiempo es limitado o
        tienes una necesidad inmediata (por ejemplo, preparar un proyecto de
        investigación), estas rutas priorizadas te orientan sobre qué módulos abordar
        primero sin perder la base conceptual mínima (módulos 1–3, siempre recomendados).
      </p>

      <DataTable
        headers={["Especialidad", "Módulos prioritarios", "Por qué"]}
        rows={[
          [
            "🩺 Enfermería / Salud comunitaria",
            "1, 2, 3, 5, 6, 9",
            "Énfasis en lectura crítica de cribados, sesgos en programas de salud pública y comparación de grupos (t-test, chi-cuadrado) para evaluar intervenciones comunitarias.",
          ],
          [
            "💊 Farmacia",
            "1, 2, 3, 7, 8, 9, 10",
            "Regresión y supervivencia son centrales para evaluar adherencia, eficacia de tratamientos y tiempo hasta eventos adversos o terapéuticos.",
          ],
          [
            "🧠 Psicología",
            "1, 2, 3, 4, 5, 8, 12",
            "El Teorema de Bayes y la significancia vs. relevancia son claves para interpretar escalas psicométricas; la evaluación crítica de artículos es esencial en investigación clínica.",
          ],
          [
            "🏃 Fisioterapia",
            "1, 2, 3, 6, 9, 11",
            "Diseño de estudios experimentales (ECA) y pruebas básicas para comparar protocolos de rehabilitación; modelos multivariantes para ajustar por variables de confusión (edad, gravedad inicial).",
          ],
          [
            "🥗 Nutrición",
            "1, 2, 3, 5, 7, 8, 9",
            "Regresión lineal para relacionar variables dietéticas con marcadores clínicos; sesgos de investigación frecuentes en estudios observacionales nutricionales.",
          ],
          [
            "🏥 Gestión sanitaria",
            "1, 2, 3, 6, 8, 13, 14",
            "Diseño y evaluación de programas, interpretación de indicadores de gestión con criterio estadístico, y consideraciones éticas en el uso de datos institucionales.",
          ],
        ]}
      />

      <Callout type="tip" title="¿Y si mi especialidad no aparece exactamente?">
        <p>
          Las rutas son orientativas, no exclusivas. Todas las especialidades de ciencias
          de la salud comparten el mismo lenguaje estadístico de base. Si tu área no
          coincide exactamente con las anteriores (por ejemplo, odontología, medicina
          general, terapia ocupacional), la combinación{" "}
          <strong>1, 2, 3, 5, 8, 9, 12</strong> ofrece una base sólida y transversal.
        </p>
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          CÓMO SACAR EL MÁXIMO PROVECHO
      ═══════════════════════════════════════════════════════════ */}
      <h2>Cómo sacar el máximo provecho del curso</h2>

      <Callout type="memory" title="Cinco recomendaciones para aprender bioestadística aplicada">
        <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
          <li>
            <strong>No saltes los casos clínicos.</strong> Cada ejemplo está diseñado para
            anclar el concepto estadístico a una decisión real de tu práctica — es ahí
            donde ocurre el aprendizaje, no en la fórmula.
          </li>
          <li>
            <strong>Resuelve los quizzes antes de leer la explicación.</strong> El
            esfuerzo de responder (aunque te equivoques) mejora la retención más que leer
            pasivamente.
          </li>
          <li>
            <strong>Interactúa con los exploradores y gráficos.</strong> Cambia los
            parámetros, observa qué pasa con el resultado. La intuición estadística se
            construye experimentando, no memorizando fórmulas.
          </li>
          <li>
            <strong>Usa el glosario sin pena.</strong> Volver a una definición básica no es
            un retroceso — es exactamente lo que hacen los profesionales con experiencia
            cuando leen un artículo fuera de su área habitual.
          </li>
          <li>
            <strong>Relaciona cada módulo con un caso de tu propia práctica.</strong> Antes
            de avanzar al siguiente módulo, pregúntate: "¿dónde he visto esto en mi
            trabajo?". Esa conexión es lo que transforma la teoría en criterio aplicable.
          </li>
        </ul>
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          FLASHCARD DE CIERRE
      ═══════════════════════════════════════════════════════════ */}
      <Flashcard
        question="¿Necesito seguir el curso estrictamente en orden del Módulo 1 al 14?"
        answer={
          <p>
            Se recomienda completar primero los módulos 1–3 (fundamentos), ya que el resto
            del curso depende de ese vocabulario y razonamiento base. A partir de ahí,
            puedes priorizar según tu ruta de especialidad sugerida en este módulo. El
            módulo bonus de gráficos puede consultarse en cualquier momento, como
            referencia rápida.
          </p>
        }
      />

      {/* ═══════════════════════════════════════════════════════════
          REFERENCIAS
      ═══════════════════════════════════════════════════════════ */}
      <div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
        <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpenCheck className="h-6 w-6" /> Referencias y lectura complementaria
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>
            Reyes-Reyes, A. (2019). <em>Estrategias didácticas para la enseñanza de la
            estadística en ciencias de la salud: hacia un aprendizaje significativo y
            contextualizado.</em> Revista de Docencia Universitaria, 17(2), 45–62.
          </li>
        </ul>
        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            <Compass className="inline h-4 w-4 mr-1" />
            Elige tu ruta, abre el glosario cuando lo necesites, y empieza por el Módulo 1.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <Sparkles className="inline h-3.5 w-3.5 mr-1" />
            <Layers className="inline h-3.5 w-3.5 mr-1" />
            14 módulos + 1 bonus · Orden lógico y acumulativo · Aprendizaje basado en casos clínicos
          </p>
        </div>
      </div>
    </div>
  );
}
