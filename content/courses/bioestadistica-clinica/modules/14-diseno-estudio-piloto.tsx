"use client";
import { useState } from "react";
import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen } from "lucide-react";

// ─── Semáforo interactivo de viabilidad del piloto ───────────────────────────
function SemaforoPiloto() {
  const [reclutamiento, setReclutamiento] = useState(75);
  const [retencion, setRetencion] = useState(75);
  const [adherencia, setAdherencia] = useState(75);

  const semaforo = (val: number, umbrales: { verde: number; amarillo: number }) => {
    if (val >= umbrales.verde) return { color: "#059669", bg: "#ECFDF5", label: "Verde — Proceder", icon: "🟢" };
    if (val >= umbrales.amarillo) return { color: "#D97706", bg: "#FFFBEB", label: "Amarillo — Modificar protocolo", icon: "🟡" };
    return { color: "#DC2626", bg: "#FEF2F2", label: "Rojo — Replantear el estudio", icon: "🔴" };
  };

  const criterios = [
    {
      label: "Tasa de reclutamiento",
      desc: "% de elegibles que aceptan participar",
      value: reclutamiento,
      setter: setReclutamiento,
      umbrales: { verde: 80, amarillo: 60 },
      unit: "%",
    },
    {
      label: "Tasa de retención",
      desc: "% de participantes que completan el seguimiento",
      value: retencion,
      setter: setRetencion,
      umbrales: { verde: 80, amarillo: 60 },
      unit: "%",
    },
    {
      label: "Adherencia al protocolo",
      desc: "% de sesiones / dosis según protocolo",
      value: adherencia,
      setter: setAdherencia,
      umbrales: { verde: 75, amarillo: 50 },
      unit: "%",
    },
  ];

  const resultados = criterios.map(c => semaforo(c.value, c.umbrales));
  const rojos = resultados.filter(r => r.label.startsWith("Rojo")).length;
  const amarillos = resultados.filter(r => r.label.startsWith("Amarillo")).length;

  const veredicto = rojos >= 2
    ? { texto: "Replantear: el estudio piloto no fue viable en su forma actual. Revisa el protocolo de reclutamiento, los criterios de elegibilidad o la carga para los participantes antes de continuar.", color: "#DC2626", bg: "#FEF2F2", icon: "🔴" }
    : rojos === 1 || amarillos >= 2
    ? { texto: "Proceder con modificaciones: la factibilidad es parcial. Documenta las barreras, ajusta el protocolo y considera un periodo de extensión piloto antes de escalar al ensayo definitivo.", color: "#D97706", bg: "#FFFBEB", icon: "🟡" }
    : { texto: "Proceder al ensayo definitivo: los tres criterios de factibilidad se cumplen. Usa las estimaciones de variabilidad obtenidas para el cálculo muestral del estudio confirmatorio.", color: "#059669", bg: "#ECFDF5", icon: "🟢" };

  return (
    <div style={{
      border: "2px solid #E2E8F0", borderRadius: 16, padding: "28px 32px",
      background: "#F8FAFC", margin: "28px 0", boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: "#1E293B", marginBottom: 4 }}>
        🚦 Semáforo de Viabilidad del Piloto
      </div>
      <div style={{ fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 1.6 }}>
        Ajusta los resultados observados de tu piloto. Los umbrales se fijan{" "}
        <strong>a priori</strong>, antes de ver los datos. Aquí usamos los estándares
        metodológicos de Billingham et al. (2013).
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
        {criterios.map((c, i) => {
          const s = resultados[i];
          return (
            <div key={i} style={{
              background: s.bg, border: `1px solid ${s.color}22`,
              borderRadius: 12, padding: "18px 22px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1E293B" }}>{c.label}</span>
                  <span style={{ fontSize: 12, color: "#64748B", marginLeft: 8 }}>{c.desc}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{c.value}{c.unit}</span>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                </div>
              </div>
              <input type="range" min={0} max={100} step={5} value={c.value}
                onChange={e => c.setter(Number(e.target.value))}
                style={{ width: "100%", accentColor: s.color }} />
              <div style={{ display: "flex", justifyContent: "space-between",
                fontSize: 11, color: "#94A3B8", marginTop: 4 }}>
                <span>🔴 Rojo &lt; {c.umbrales.amarillo}%</span>
                <span>🟡 Amarillo {c.umbrales.amarillo}–{c.umbrales.verde - 1}%</span>
                <span>🟢 Verde ≥ {c.umbrales.verde}%</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: s.color, fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Veredicto global */}
      <div style={{
        background: veredicto.bg, border: `2px solid ${veredicto.color}`,
        borderRadius: 12, padding: "18px 22px"
      }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: veredicto.color, marginBottom: 8 }}>
          {veredicto.icon} Veredicto de factibilidad global
        </div>
        <div style={{ fontSize: 13, color: "#1E293B", lineHeight: 1.7 }}>{veredicto.texto}</div>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: "#94A3B8", lineHeight: 1.6 }}>
        Referencia de umbrales: Billingham, S.A.M., Whitehead, A.L., & Julious, S.A. (2013).
        An audit of sample sizes for pilot and feasibility trials being undertaken in the United
        Kingdom registered in the United Kingdom Clinical Research Network database.
        <em> BMC Medical Research Methodology, 13</em>, 104.
      </div>
    </div>
  );
}

export const meta = {
  title: "Diseño de Estudio Piloto",
  subtitle: "De la idea a la evidencia: el primer paso hacia la investigación en tu práctica",
  objective:
    "Formular preguntas PICO, calcular el tamaño muestral adecuado para un piloto y elaborar un plan de análisis estadístico transparente y reproducible.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose">
      <h2>¿Qué es (y qué no es) un estudio piloto?</h2>
      <p>
        Un estudio piloto evalúa si tu idea es <strong>factible</strong> — no si funciona. Su
        objetivo es probar los métodos, estimar parámetros de variabilidad y detectar problemas
        logísticos antes de invertir recursos en un estudio a gran escala. El error más frecuente
        y éticamente cuestionable es tratar un piloto como un ensayo clínico confirmatorio.
      </p>

      <Callout type="warning" title="Distinción crítica">
        <p>
          Un piloto con n=20 <strong>no puede demostrar eficacia</strong> con p&lt;0.05. Si
          intentas hacerlo, tienes un estudio infra-potenciado, no un piloto. Llámalo "serie de
          casos" o "estudio preliminar", pero no concluyas efectividad. La transparencia sobre
          los objetivos es la máxima virtud ética en investigación.
        </p>
      </Callout>

      <h2>Formulando la pregunta: el formato PICO</h2>

      <DataTable
        headers={["Componente", "Pregunta que responde", "Ejemplo práctico"]}
        rows={[
          [
            "P — Paciente / Población",
            "¿A quién va dirigido tu estudio?",
            "Adultos mayores de 65 años con insuficiencia cardíaca dados de alta",
          ],
          [
            "I — Intervención",
            "¿Qué acción o tratamiento evalúas?",
            "Llamada telefónica de enfermería a las 48h y 7 días post-alta",
          ],
          [
            "C — Comparación",
            "¿Frente a qué alternativa?",
            "Cuidado habitual al alta (sin llamadas de seguimiento)",
          ],
          [
            "O — Outcome (desenlace de piloto)",
            "¿Qué mides para evaluar factibilidad?",
            "Tasa de reclutamiento ≥70%, retención a 30 días ≥80%, DE del tiempo hasta reingreso",
          ],
        ]}
      />

      <h2>Ejemplos PICO por área de la salud</h2>

      <Callout type="tip" title="Enfermería comunitaria: hipertensión no controlada">
        <p>
          <strong>P:</strong> Adultos con HTA no controlada en atención primaria. <strong>I:</strong>{" "}
          Automedida domiciliaria con envío de registros por mensajería. <strong>C:</strong> Medición
          solo en consulta. <strong>O (piloto):</strong> Adherencia ≥75% de los días, usabilidad
          de la app, estimación de la variabilidad de la PA.
        </p>
      </Callout>

      <Callout type="tip" title="Psicología: mindfulness en adolescentes con ansiedad">
        <p>
          <strong>P:</strong> Adolescentes con ansiedad moderada en contexto escolar.{" "}
          <strong>I:</strong> Programa grupal de mindfulness, 8 sesiones semanales.{" "}
          <strong>C:</strong> Lista de espera (con ofrecimiento del programa al finalizar).{" "}
          <strong>O (piloto):</strong> Asistencia ≥70%, satisfacción, estimación del cambio en
          GAD-7 para calcular el tamaño muestral futuro.
        </p>
      </Callout>

      <Callout type="tip" title="Fisioterapia: telerehabilitación en lumbalgia crónica">
        <p>
          <strong>P:</strong> Pacientes con lumbalgia crónica inespecífica. <strong>I:</strong>{" "}
          Ejercicio terapéutico supervisado por videollamada. <strong>C:</strong> Ejercicio
          presencial. <strong>O (piloto):</strong> Tasa de reclutamiento, adherencia a las sesiones
          online, incidencia de problemas técnicos, estimación de la diferencia en EVA.
        </p>
      </Callout>

      <h2>Tamaño muestral en un piloto: no uses potencia estadística</h2>

      <Callout type="warning" title="El error más común en estudios piloto">
        <p>
          <strong>NO uses GRANMO o similares</strong> con potencia del 80% y alfa=0.05 para
          calcular la muestra de un piloto. Eso es para el estudio definitivo. El piloto no
          está diseñado para probar hipótesis de eficacia; no tiene sentido calcular su
          muestra con esa lógica.
        </p>
      </Callout>

      <DataTable
        headers={["Objetivo del piloto", "Recomendación muestral", "Referencia"]}
        rows={[
          [
            "Estimar desviación estándar de una variable continua",
            "Mínimo 20–30 participantes por grupo",
            "Whitehead et al. (2016): ≥25 por grupo",
          ],
          [
            "Estimar una proporción (ej. tasa de retención del 80%)",
            "50–100 participantes totales",
            "Browne (1995), Julious (2005)",
          ],
          [
            "Detectar problemas logísticos y evaluar factibilidad general",
            "30–50 participantes totales",
            "Regla pragmática general",
          ],
        ]}
        caption="Recomendaciones para tamaño muestral en estudios piloto (sin cálculo de potencia)"
      />

      <Callout type="info" title="Justificación correcta en el protocolo">
        <p>
          "El tamaño muestral de este estudio piloto se establece en n=40 (20 por grupo) siguiendo
          las recomendaciones de Julious (2005) y Whitehead (2016) para estudios piloto cuyo
          objetivo es estimar la desviación estándar del cambio en la escala EVA con suficiente
          precisión para planificar un futuro ECA definitivo. Este tamaño permitirá además evaluar
          la factibilidad del reclutamiento y la adherencia al protocolo."
        </p>
      </Callout>

      <h2>Plan de análisis estadístico paso a paso</h2>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Identifica el tipo de variable de cada desenlace",
            description:
              "Para cada variable principal y secundaria, determina si es nominal, ordinal, continua o tiempo hasta evento.",
          },
          {
            step: 2,
            title: "Determina grupos e independencia de observaciones",
            description:
              "¿Dos grupos o más? ¿Mediciones independientes (personas distintas) o pareadas (antes-después en las mismas personas)?",
          },
          {
            step: 3,
            title: "Elige las pruebas estadísticas adecuadas",
            description:
              "Para descripción: medias (DE) o medianas (RIC) según distribución; frecuencias (%) para categóricas. Para comparaciones exploratorias: T-Test, Wilcoxon, Chi-cuadrado, siempre con IC 95% y reconociendo que el estudio no tiene potencia confirmatoria.",
          },
          {
            step: 4,
            title: "Define el manejo de datos faltantes",
            description:
              "Análisis por Intención de Tratar (ITT) modificada: todos con al menos una medición post-basal. Análisis de sensibilidad de 'peor escenario' para evaluar la robustez.",
          },
          {
            step: 5,
            title: "Documenta las pérdidas en un diagrama de flujo CONSORT",
            description:
              "Registra el número de participantes en cada etapa: cribados, elegibles, reclutados, asignados, que reciben la intervención, que completan seguimiento y analizados.",
          },
          {
            step: 6,
            title: "Define los criterios de éxito del piloto a priori",
            description:
              "Establece semáforos: Verde (>80% retención → proceder), Amarillo (60–80% → proceder con modificaciones), Rojo (<60% → replantear). Sin estos umbrales, la interpretación es subjetiva.",
          },
        ]}
      />

      {/* ─── OBJETIVOS DE PROCESO ─── */}
      <h2>📌 Los desenlaces de un piloto son de proceso, no de eficacia</h2>
      <p>
        Este es el punto más crítico —y más frecuentemente ignorado— del diseño piloto.
        Los objetivos primarios de un estudio piloto deben ser desenlaces de{" "}
        <strong>proceso</strong> y <strong>factibilidad</strong>, no comparaciones de
        eficacia entre grupos. Cualquier comparación de eficacia en un piloto debe estar
        explícitamente etiquetada como <em>exploratoria</em> en el protocolo, en el
        manuscrito y en el resumen.
      </p>

      <DataTable
        headers={["Tipo de desenlace", "Ejemplos correctos en un piloto", "¿Se reporta con p-valor?"]}
        rows={[
          [
            "🟢 Reclutamiento",
            "Tasa de reclutamiento mensual, % de elegibles que aceptan, tiempo hasta completar muestra",
            "No — se reporta como proporción con IC 95%",
          ],
          [
            "🟢 Retención",
            "% que completa el seguimiento, motivos de abandono, tiempo hasta abandono",
            "No — se describe con frecuencias y CONSORT flowchart",
          ],
          [
            "🟢 Adherencia / Fidelidad",
            "% de sesiones completadas, dosis recibida vs. prescrita, fidelidad del interventor",
            "No — se reporta por grupo como estadística descriptiva",
          ],
          [
            "🟢 Variabilidad del desenlace",
            "Desviación estándar del desenlace principal (para el cálculo muestral del definitivo)",
            "No — se reporta como DE con IC 95%",
          ],
          [
            "🟡 Eficacia exploratoria",
            "Diferencia de medias, OR, HR entre grupos del piloto",
            "Sí, pero con advertencia explícita: 'El estudio no tuvo potencia para este análisis; resultados son exploratorios'",
          ],
          [
            "🔴 Eficacia confirmatoria",
            "Concluir que el tratamiento funciona o no basándose en p-valor del piloto",
            "NUNCA — error metodológico y ético grave",
          ],
        ]}
      />

      <Callout type="warning" title="Cómo redactarlo correctamente en el manuscrito">
        <p>
          En lugar de: <em>"La intervención redujo el dolor (p=0,03), lo que sugiere que es efectiva."</em>
        </p>
        <p style={{ marginTop: 8 }}>
          Escribe: <em>"El análisis exploratorio de eficacia mostró una reducción en el dolor
          de 1,8 puntos EVA (IC 95%: 0,3–3,3) en el grupo intervención. Dado el tamaño
          muestral del piloto (n=30), este hallazgo es orientativo y no confirma eficacia.
          La desviación estándar estimada (DE=2,4) se utilizará para el cálculo muestral
          del ensayo definitivo."</em>
        </p>
      </Callout>

      {/* Semáforo interactivo */}
      <SemaforoPiloto />

      <h2>Comunicando resultados a diferentes audiencias</h2>

      <DataTable
        headers={["Audiencia", "Enfoque", "Ejemplo de mensaje"]}
        rows={[
          [
            "Colegas e investigadores",
            "Lenguaje técnico, tasas de reclutamiento/retención, IC, lecciones aprendidas",
            "'Este piloto demuestra factibilidad (tasa 75%) y proporciona estimaciones para un ensayo definitivo de 120 pacientes por grupo.'",
          ],
          [
            "Pacientes o participantes",
            "Lenguaje sencillo, objetivo de probar si el programa era práctico y aceptable",
            "'Sus comentarios nos ayudarán a mejorar el programa para futuros participantes.'",
          ],
          [
            "Gestores o decisores",
            "Factibilidad, recursos, aceptabilidad, potencial de escalabilidad",
            "'El programa es viable con los recursos actuales de enfermería: 85% completaron el seguimiento y el tiempo medio por llamada fue de 12 minutos.'",
          ],
        ]}
      />

      {/* ─── BLAND-ALTMAN ─── */}
      <h2>📐 Análisis de concordancia: cuando validas un instrumento de medida</h2>
      <p>
        Si tu piloto incluye validar un nuevo tensiómetro, una app de monitoreo o una escala
        traducida, necesitas demostrar que <strong>mide lo mismo que el estándar de referencia</strong>.
        El error más frecuente es usar correlación de Pearson para esto. La correlación mide si
        dos variables van en la misma dirección, no si son intercambiables.
      </p>

      <Callout type="danger" title="Error clásico: usar r de Pearson para concordancia">
        <p>
          Dos instrumentos pueden tener r = 0.99 pero diferir sistemáticamente en 10 mmHg.
          La correlación alta solo indica que <em>cuando uno sube, el otro sube</em> — no que
          coincidan en valor. Para concordancia necesitas el{" "}
          <strong>análisis de Bland-Altman</strong>.
        </p>
      </Callout>

      <DataTable
        headers={["Método", "Pregunta que responde", "Cuándo usarlo"]}
        rows={[
          [
            "Correlación de Pearson (r)",
            "¿Varían en la misma dirección?",
            "Relación lineal, NO concordancia",
          ],
          [
            "CCI (Coeficiente de Correlación Intraclase)",
            "¿Qué proporción de la varianza total se debe a diferencias reales entre pacientes?",
            "Concordancia de variables continuas entre observadores o instrumentos",
          ],
          [
            "Bland-Altman",
            "¿Cuán lejos están las mediciones entre sí? ¿Hay sesgo sistemático?",
            "Validación de instrumentos de medida clínica",
          ],
          [
            "Kappa de Cohen (κ)",
            "¿Coinciden los observadores más allá del azar? (variables categóricas)",
            "Concordancia entre observadores en escalas nominales u ordinales",
          ],
        ]}
                caption="Guía rápida para elegir el índice de concordancia correcto."
      />

      <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-5 my-4">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">
          Caso clínico — Bland-Altman
        </p>
        <p className="font-semibold text-teal-900 mb-2">
          Un piloto valida un tensiómetro automático de muñeca frente a un esfigmomanómetro
          aneroide en 30 pacientes hipertensos.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {[
            { label: "Sesgo medio (bias)", value: "+2.1 mmHg", desc: "El tensiómetro de muñeca sobreestima sistemáticamente en 2.1 mmHg" },
            { label: "Límites de concordancia (±1.96 DE)", value: "−4.8 a +9.0 mmHg", desc: "El 95% de las diferencias cae en este rango" },
            { label: "Interpretación", value: "Sesgo aceptable, límites amplios", desc: "El límite superior +9 mmHg supera la MCID de 5 mmHg para PAS" },
            { label: "Conclusión del piloto", value: "No recomendado para HTA grave", desc: "Válido solo para monitoreo leve/moderado" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-teal-200">
              <p className="text-xs font-bold text-teal-600 uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-slate-800 my-1">{item.value}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-teal-600 mt-3">
          Bland JM, Altman DG. Statistical methods for assessing agreement between two methods of
          clinical measurement. <em>Lancet</em>. 1986;1(8476):307-310.
        </p>
      </div>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Calcula la diferencia (D) entre los dos métodos para cada paciente",
            description: "D = Método nuevo − Método de referencia. Si D > 0 sistemáticamente, el nuevo sobreestima.",
          },
          {
            step: 2,
            title: "Calcula la media de las diferencias (sesgo)",
            description: "Sesgo = Media de todas las D. Un sesgo cercano a 0 indica que no hay error sistemático.",
          },
          {
            step: 3,
            title: "Calcula los límites de concordancia",
            description: "LC = Sesgo ± 1.96 × DE(D). Contienen el 95% de las diferencias esperadas entre métodos.",
          },
          {
            step: 4,
            title: "Evalúa clínicamente los límites",
            description: "Compara los LC con la MCID. Si los LC son menores que la MCID, los métodos son intercambiables.",
          },
        ]}
      />

      <h2>Comunicando resultados a diferentes audiencias</h2>

      <DataTable
        headers={["Audiencia", "Enfoque", "Ejemplo de mensaje"]}
        rows={[
          [
            "Colegas e investigadores",
            "Tasas de reclutamiento/retención, IC, variabilidad estimada",
            "Este piloto demuestra factibilidad (tasa 75%) y proporciona estimaciones para un ensayo definitivo de 120 pacientes por grupo.",
          ],
          [
            "Pacientes o participantes",
            "Lenguaje sencillo, objetivo de viabilidad",
            "Sus comentarios nos ayudarán a mejorar el programa para futuros participantes.",
          ],
          [
            "Gestores o decisores",
            "Factibilidad, recursos, aceptabilidad, escalabilidad",
            "El programa es viable: 85% completaron el seguimiento y el tiempo medio por llamada fue de 12 minutos.",
          ],
        ]}
      />

      <Flashcard
        question="¿Cuál es el desenlace más importante en un estudio piloto?"
        answer={
          <p>
            Los <strong>indicadores de factibilidad</strong>: tasa de reclutamiento, tasa de
            retención, adherencia al protocolo y estimaciones de variabilidad (DE del desenlace
            principal) para alimentar el cálculo muestral del futuro ensayo definitivo. Las
            comparaciones de eficacia son meramente exploratorias.
          </p>
        }
      />

      <Flashcard
        question="¿Cómo justificas el n de tu piloto ante el comité de ética?"
        answer={
          <div>
            <p className="mb-2">Evita "n=30 porque es suficiente". Cita metodología:</p>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li><strong>Browne (1995):</strong> n=30 por grupo estima la DE con precisión aceptable.</li>
              <li><strong>Julious (2005):</strong> n=12 por grupo es el mínimo absoluto (IC 80% para varianza).</li>
            </ul>
          </div>
        }
      />

      <Quiz
        question="¿Cuál es el objetivo principal del tamaño muestral en un estudio piloto?"
        options={[
          { text: "Garantizar potencia estadística del 80% para detectar diferencias clínicas", correct: false },
          { text: "Demostrar la eficacia de la intervención con p<0.05", correct: false },
          { text: "Estimar parámetros de factibilidad y variabilidad para planificar el estudio definitivo", correct: true },
          { text: "Cumplir requisitos formales del comité de ética", correct: false },
        ]}
        explanation="El tamaño muestral de un piloto se basa en recomendaciones metodológicas para estimar parámetros de viabilidad y variabilidad. No se calcula con potencia estadística porque el piloto no está diseñado para probar hipótesis de eficacia. Usar GRANMO con alfa=0.05 y beta=0.20 para un piloto es un error metodológico."
      />

      <Quiz
        question="Bland-Altman de tu piloto: sesgo = +2.1 mmHg, LC = −4.8 a +9.0 mmHg, MCID de PAS = 5 mmHg. ¿Conclusión?"
        options={[
          { text: "Válido: el sesgo (2.1) es menor que la MCID (5 mmHg)", correct: false },
          { text: "El límite superior (+9.0 mmHg) supera la MCID, por lo que no es intercambiable para HTA grave", correct: true },
          { text: "Los límites de concordancia confirman que ambos métodos son equivalentes", correct: false },
          { text: "Solo importa el sesgo medio, no los límites extremos", correct: false },
        ]}
        explanation="Aunque el sesgo medio de +2.1 mmHg es modesto, el límite superior de +9.0 mmHg supera la MCID de 5 mmHg. Esto significa que en el 2.5% de mediciones el error podría ser >+9 mmHg — suficiente para reclasificar a un paciente hipertenso grave. Para uso en HTA severa, este tensiómetro no es intercambiable con el esfigmomanómetro aneroide."
      />

      {/* RECURSOS Y BIBLIOGRAFÍA */}
      <div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
        <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpen className="h-6 w-6" /> Recursos Curados para Profundizar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-semibold text-slate-800">📖 Lecturas Fundamentales</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Thabane, L., Ma, J., Chu, R. et al. (2010). A tutorial on pilot studies: the what, why and how. <em>BMC Medical Research Methodology</em>, <em>10</em>, 1.
                <span className="block text-xs text-gray-500">El tutorial más citado y accesible para entender el propósito y el diseño de un estudio piloto.</span>
              </li>
              <li>
                Lancaster, G. A., Dodd, S. & Williamson, P. R. (2004). Design and analysis of pilot studies: recommendations for good practice. <em>Journal of Evaluation in Clinical Practice</em>, <em>10</em>(2), 307–312.
                <span className="block text-xs text-gray-500">Referencia fundacional sobre buenas prácticas de diseño y análisis de pilotos.</span>
              </li>
              <li>
                Bland, J. M. & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. <em>The Lancet</em>, <em>1</em>(8476), 307–310.
                <span className="block text-xs text-gray-500">El artículo original que introdujo el análisis de Bland-Altman, clave para validar instrumentos de medida.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                NIHR — Guidance on pilot and feasibility studies:{" "}
                <a href="https://www.nihr.ac.uk/documents/pilot-studies-guidance-for-researchers/2580" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  nihr.ac.uk
                </a>
                <span className="block text-xs text-gray-500">Guía oficial del National Institute for Health Research sobre cómo diseñar y reportar estudios piloto.</span>
              </li>
              <li>
                CONSORT Extension for Pilot and Feasibility Trials:{" "}
                <a href="https://www.equator-network.org/reporting-guidelines/consort-extension-for-randomised-pilot-and-feasibility-trials-2016-a-statement/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  equator-network.org
                </a>
                <span className="block text-xs text-gray-500">Lista de verificación específica para reportar ensayos piloto y de factibilidad con rigor.</span>
              </li>
              <li>
                EQUATOR Network:{" "}
                <a href="https://www.equator-network.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  equator-network.org
                </a>
                <span className="block text-xs text-gray-500">Repositorio general de guías de reporte (CONSORT, STROBE, PRISMA) aplicables al protocolo del piloto.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Browne, R. H. (1995). On the use of a pilot sample for sample size determination. <em>Statistics in Medicine</em>, <em>14</em>(17), 1933–1940.</li>
            <li>Billingham, S. A. M., Whitehead, A. L. & Julious, S. A. (2013). An audit of sample sizes for pilot and feasibility trials being undertaken in the United Kingdom registered in the United Kingdom Clinical Research Network database. <em>BMC Medical Research Methodology</em>, <em>13</em>, 104.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Un buen piloto no busca demostrar que tu idea funciona, sino prepararte para que el
            estudio definitivo no falle por sorpresas evitables. Invertir tiempo en planificar y
            documentar cada decisión metodológica hoy es el mejor regalo que puedes hacerle a tu
            futura investigación.
          </p>
        </div>
      </div>
    </div>
  );
}
