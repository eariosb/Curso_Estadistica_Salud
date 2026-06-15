import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";

export const meta = {
  title: "El Lenguaje de los Datos: Variables",
  subtitle: "Cómo nombrar bien los datos para extraer su valor real",
  objective:
    "Clasificar correctamente las variables estadísticas, comprender las consecuencias de hacerlo mal, y empezar a ver cada variable como una decisión metodológica que protege — o compromete — la validez de tus conclusiones.",
};

/* ════════════════════════════════════════════════════════════════
   DIAGRAMA 1 — Jerarquía de tipos de variables
   Árbol top-down: raíz → cualitativa/cuantitativa → 4 hojas
═════════════════════════════════════════════════════════════════ */
const DiagramaJerarquia = () => (
  <svg
    width="100%"
    viewBox="0 0 680 300"
    role="img"
    style={{ display: "block", margin: "1.2rem 0", height: "auto", maxWidth: 680 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Jerarquía de tipos de variables estadísticas en salud</title>
    <desc>
      Árbol de clasificación: Variable estadística se divide en Cualitativa (Nominal u Ordinal)
      y Cuantitativa (Discreta o Continua), con ejemplos clínicos en cada hoja.
    </desc>

    <defs>
      <marker
        id="arrowH"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M2 1L8 5L2 9"
          fill="none"
          stroke="#888780"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
      <marker
        id="arrowPurple"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M2 1L8 5L2 9"
          fill="none"
          stroke="#534AB7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
      <marker
        id="arrowTeal"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M2 1L8 5L2 9"
          fill="none"
          stroke="#0F6E56"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>

    {/* ── RAÍZ ── */}
    <rect x="240" y="14" width="200" height="44" rx="8" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth="0.5" />
    <text x="340" y="36" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="14" fontWeight="500" fill="#2C2C2A">
      Variable estadística
    </text>

    {/* ── CONECTORES raíz → nivel 1 ── */}
    <line x1="300" y1="58" x2="185" y2="104" stroke="#888780" strokeWidth="1" markerEnd="url(#arrowH)" />
    <line x1="380" y1="58" x2="495" y2="104" stroke="#888780" strokeWidth="1" markerEnd="url(#arrowH)" />

    {/* ── NIVEL 1: Cualitativa ── */}
    <rect x="60" y="104" width="200" height="44" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5" />
    <text x="160" y="126" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="14" fontWeight="500" fill="#3C3489">
      Cualitativa
    </text>

    {/* ── NIVEL 1: Cuantitativa ── */}
    <rect x="420" y="104" width="200" height="44" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5" />
    <text x="520" y="126" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="14" fontWeight="500" fill="#085041">
      Cuantitativa
    </text>

    {/* ── CONECTORES nivel 1 → nivel 2 ── */}
    <line x1="130" y1="148" x2="105" y2="196" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arrowPurple)" />
    <line x1="190" y1="148" x2="275" y2="196" stroke="#534AB7" strokeWidth="0.8" markerEnd="url(#arrowPurple)" />
    <line x1="490" y1="148" x2="455" y2="196" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#arrowTeal)" />
    <line x1="550" y1="148" x2="590" y2="196" stroke="#0F6E56" strokeWidth="0.8" markerEnd="url(#arrowTeal)" />

    {/* ── NIVEL 2: Nominal ── */}
    <rect x="20" y="196" width="170" height="56" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5" />
    <text x="105" y="216" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#3C3489">
      Nominal
    </text>
    <text x="105" y="238" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#534AB7">
      Sin orden natural
    </text>

    {/* ── NIVEL 2: Ordinal ── */}
    <rect x="205" y="196" width="170" height="56" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5" />
    <text x="290" y="216" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#3C3489">
      Ordinal
    </text>
    <text x="290" y="238" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#534AB7">
      Orden, sin equidistancia
    </text>

    {/* ── NIVEL 2: Discreta ── */}
    <rect x="395" y="196" width="140" height="56" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5" />
    <text x="465" y="216" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#085041">
      Discreta
    </text>
    <text x="465" y="238" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#0F6E56">
      Enteros, conteos
    </text>

    {/* ── NIVEL 2: Continua ── */}
    <rect x="545" y="196" width="120" height="56" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5" />
    <text x="605" y="216" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#085041">
      Continua
    </text>
    <text x="605" y="238" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#0F6E56">
      Cualquier valor
    </text>

    {/* ── EJEMPLOS PIE ── */}
    <text x="105" y="272" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Grupo sang., sexo
    </text>
    <text x="290" y="272" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Estadio NYHA, triage
    </text>
    <text x="465" y="272" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      N.º reingresos
    </text>
    <text x="605" y="272" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      PA, glucemia
    </text>
  </svg>
);

/* ════════════════════════════════════════════════════════════════
   DIAGRAMA 2 — Escalas de Stevens: jerarquía acumulativa
   4 bloques horizontales con flecha de progresión
═════════════════════════════════════════════════════════════════ */
const DiagramaStevens = () => (
  <svg
    width="100%"
    viewBox="0 0 680 210"
    role="img"
    style={{ display: "block", margin: "1.2rem 0", height: "auto", maxWidth: 680 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Jerarquía acumulativa de las cuatro escalas de medición de Stevens</title>
    <desc>
      Cuatro bloques de izquierda a derecha (nominal, ordinal, intervalo, razón) mostrando
      la propiedad que añade cada escala, con ejemplos clínicos debajo.
    </desc>

    <defs>
      <marker
        id="arrowGray"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M2 1L8 5L2 9"
          fill="none"
          stroke="#888780"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>

    {/* ── Flecha de progresión ── */}
    <line x1="42" y1="86" x2="636" y2="86" stroke="#D3D1C7" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
    <text x="340" y="106" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Más información → mayor riqueza analítica
    </text>

    {/* ── Bloque 1: Nominal ── */}
    <rect x="42" y="22" width="130" height="54" rx="8" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth="0.5" />
    <text x="107" y="42" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#2C2C2A">
      Nominal
    </text>
    <text x="107" y="62" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#5F5E5A">
      Identidad
    </text>

    {/* ── Bloque 2: Ordinal ── */}
    <rect x="192" y="22" width="130" height="54" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5" />
    <text x="257" y="42" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#3C3489">
      Ordinal
    </text>
    <text x="257" y="62" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#534AB7">
      + Orden
    </text>

    {/* ── Bloque 3: Intervalo ── */}
    <rect x="342" y="22" width="130" height="54" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="0.5" />
    <text x="407" y="42" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#0C447C">
      Intervalo
    </text>
    <text x="407" y="62" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#185FA5">
      + Distancias iguales
    </text>

    {/* ── Bloque 4: Razón ── */}
    <rect x="492" y="22" width="130" height="54" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5" />
    <text x="557" y="42" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#085041">
      Razón
    </text>
    <text x="557" y="62" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#0F6E56">
      + Cero absoluto
    </text>

    {/* ── Ejemplos fila 1 ── */}
    <text x="107" y="132" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Tipo de dieta
    </text>
    <text x="257" y="132" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Estadio cáncer
    </text>
    <text x="407" y="132" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Temperatura (°C)
    </text>
    <text x="557" y="132" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Peso (kg)
    </text>

    {/* ── Ejemplos fila 2 ── */}
    <text x="107" y="150" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Sexo, grupo sang.
    </text>
    <text x="257" y="150" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Triage, dolor EVA
    </text>
    <text x="407" y="150" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Año de nacimiento
    </text>
    <text x="557" y="150" textAnchor="middle" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#888780">
      Glucemia, PA
    </text>

    {/* ── Separador ── */}
    <line x1="42" y1="118" x2="636" y2="118" stroke="#F1EFE8" strokeWidth="1" />
  </svg>
);

/* ════════════════════════════════════════════════════════════════
   DIAGRAMA 3 — Errores de clasificación y sus consecuencias
   3 filas: error (rojo) → flecha → consecuencia (gris)
   Layout completamente rediseñado: sin solapamientos
═════════════════════════════════════════════════════════════════ */
const DiagramaErrores = () => (
  <svg
    width="100%"
    viewBox="0 0 680 220"
    role="img"
    style={{ display: "block", margin: "1.2rem 0", height: "auto", maxWidth: 680 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Tres errores clásicos de clasificación de variables y sus consecuencias</title>
    <desc>
      Tres filas horizontales. Cada fila muestra: el error cometido en rojo a la izquierda,
      una flecha en el centro, y la consecuencia metodológica en gris a la derecha.
    </desc>

    <defs>
      <marker
        id="arrowRed"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M2 1L8 5L2 9"
          fill="none"
          stroke="#A32D2D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>

    {/* ════ FILA 1 ════ */}
    {/* Error */}
    <rect x="20" y="14" width="240" height="52" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="0.5" />
    <text x="140" y="34" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#791F1F">
      Ordinal tratada como continua
    </text>
    <text x="140" y="54" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#A32D2D">
      T-Test sobre estadio NYHA (I–IV)
    </text>
    {/* Flecha */}
    <line x1="262" y1="40" x2="318" y2="40" stroke="#A32D2D" strokeWidth="1.2" markerEnd="url(#arrowRed)" />
    {/* Consecuencia */}
    <rect x="320" y="14" width="340" height="52" rx="8" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth="0.5" />
    <text x="490" y="34" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#2C2C2A">
      Análisis formalmente incorrecto
    </text>
    <text x="490" y="54" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#5F5E5A">
      El software calcula sin aviso de error
    </text>

    {/* ════ FILA 2 ════ */}
    {/* Error */}
    <rect x="20" y="84" width="240" height="52" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="0.5" />
    <text x="140" y="104" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#791F1F">
      Nominal → media aritmética
    </text>
    <text x="140" y="124" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#A32D2D">
      "Grupo sanguíneo promedio = 2.3"
    </text>
    {/* Flecha */}
    <line x1="262" y1="110" x2="318" y2="110" stroke="#A32D2D" strokeWidth="1.2" markerEnd="url(#arrowRed)" />
    {/* Consecuencia */}
    <rect x="320" y="84" width="340" height="52" rx="8" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth="0.5" />
    <text x="490" y="104" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#2C2C2A">
      Resultado sin sentido clínico
    </text>
    <text x="490" y="124" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#5F5E5A">
      Número no interpretable biológicamente
    </text>

    {/* ════ FILA 3 ════ */}
    {/* Error */}
    <rect x="20" y="154" width="240" height="52" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="0.5" />
    <text x="140" y="174" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#791F1F">
      Discreta (conteos) → T-Test
    </text>
    <text x="140" y="194" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#A32D2D">
      Reingresos asimétricos con muchos ceros
    </text>
    {/* Flecha */}
    <line x1="262" y1="180" x2="318" y2="180" stroke="#A32D2D" strokeWidth="1.2" markerEnd="url(#arrowRed)" />
    {/* Consecuencia */}
    <rect x="320" y="154" width="340" height="52" rx="8" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth="0.5" />
    <text x="490" y="174" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="13" fontWeight="500" fill="#2C2C2A">
      Modelo inadecuado para la distribución
    </text>
    <text x="490" y="194" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fill="#5F5E5A">
      Usar Poisson o Binomial Negativa
    </text>
  </svg>
);

/* ════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═════════════════════════════════════════════════════════════════ */
export default function Lesson() {
  return (
    <div className="lesson-prose">

      {/* ─── LECTURA COMPLEMENTARIA — REYES-REYES 2019 ─── */}
      <div className="rounded-xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white p-5 flex gap-4 items-start mb-8">
        <div className="rounded-xl bg-emerald-600 text-white w-11 h-11 flex items-center justify-center text-xl shrink-0">📖</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
            Lectura complementaria recomendada — Libro base del módulo
          </p>
          <p className="text-sm font-bold text-slate-800 mb-2">
            Reyes-Reyes, A. & Reyes-Reyes, F. (2019).{" "}
            <em>Probabilidad y aplicaciones en ciencias de la salud.</em>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Las variables estadísticas determinan el espacio muestral de un experimento aleatorio —
            concepto central del libro base. Leer estas secciones antes de este módulo te dará
            la intuición de por qué el tipo de variable define qué eventos son posibles y cómo
            se distribuyen las probabilidades sobre ellos.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { pp: "pp. 1–3", tema: "Experimento aleatorio, espacio muestral y eventos — fundamento de toda variable estadística" },
              { pp: "pp. 4–5", tema: "Cómo la naturaleza de un evento (discreto o continuo) cambia su probabilidad" },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-lg p-2 border border-slate-200 flex gap-2 items-start">
                <span className="text-xs font-bold text-emerald-600 shrink-0">{r.pp}</span>
                <span className="text-xs text-slate-500 leading-snug">{r.tema}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2>El tipo de variable no es una formalidad: es una decisión con consecuencias</h2>
      <p>
        Imagina que en tu hospital se está evaluando si un nuevo protocolo de triage reduce el
        tiempo hasta la primera valoración médica. Tienes tres variables: la categoría de triage
        (I–V), el tiempo de espera en minutos y el número de pacientes atendidos por turno.
        Parecen datos similares, todos son números o etiquetas. Pero tratarlos estadísticamente
        de la misma manera produciría análisis incorrectos, conclusiones inválidas y,
        potencialmente, decisiones clínicas mal fundamentadas.
      </p>
      <p>
        Clasificar bien las variables previo al "análisis real", es el paso que determina 
        qué preguntas puedes responder con los datos y con qué herramientas. 
        <strong>Una clasificación incorrecta puede invalidar todo el estudio aunque
        el software funcione perfectamente y genere resultados con aparente precisión.</strong>
      </p>

      <Callout type="warning" title="El error clásico que los revisores detectan de inmediato">
        <p>
          Tratar una variable ordinal; como el estadiaje NYHA para insuficiencia cardíaca
          (I, II, III, IV), como si fuera numérica continua y aplicarle un T-Test: el software
          calculará el resultado sin ningún error visible. Pero el análisis será formalmente
          incorrecto y el artículo será rechazado en revisión o, peor, publicado con conclusiones
          inválidas.
        </p>
        <p>
          <strong>Referencia:</strong>{" "}
          Misra, D. P. et al. (2023). A narrative review on types of data and scales of
          measurement.{" "}
          <em>Cancer Research, Statistics, and Treatment</em>, <em>6</em>(2), 279–283.{" "}
          <a href="https://doi.org/10.4103/crst.crst_1_23" target="_blank" rel="noopener noreferrer">
            https://doi.org/10.4103/crst.crst_1_23
          </a>
        </p>
      </Callout>

      {/* ─── SECCIÓN: Stevens ─── */}
      <h2>El sistema que ordena el lenguaje estadístico</h2>
      <p>
        En 1946, el psicólogo Stanley Smith Stevens publicó en <em>Science</em> que toda medición
        pertenece a uno de cuatro niveles (nominal, ordinal, intervalo o razón) y que este nivel
        determina qué operaciones matemáticas y qué pruebas estadísticas son legítimas. El sistema
        es <em>acumulativo</em>: cada escala superior hereda las propiedades de la inferior y añade
        una nueva.
      </p>

      <DiagramaStevens />

      <Callout type="info" title="Las cuatro propiedades que se acumulan escala a escala">
        <p>
          <strong>Identidad (todas las escalas):</strong> Cada valor tiene un significado único.<br />
          <strong>Magnitud (ordinal en adelante):</strong> Los valores pueden ordenarse de menor a mayor.<br />
          <strong>Intervalos iguales (intervalo en adelante):</strong> La distancia entre dos valores
          consecutivos cualesquiera es la misma — de 20 a 30°C hay la misma diferencia que de 30 a 40°C.<br />
          <strong>Cero absoluto (razón):</strong> El cero significa ausencia real de la cantidad
          medida — 0 kg es ausencia de masa; 0°C no significa ausencia de temperatura.
        </p>
        <p>
          <strong>📖 Referencia original:</strong>{" "}
          Stevens, S. S. (1946). On the theory of scales of measurement.{" "}
          <em>Science</em>, <em>103</em>(2684), 677–680.{" "}
          <a href="https://doi.org/10.1126/science.103.2684.677" target="_blank" rel="noopener noreferrer">
            https://doi.org/10.1126/science.103.2684.677
          </a>
        </p>
      </Callout>

      {/* ─── SECCIÓN: Clasificación completa ─── */}
      <h2>Clasificación completa de variables en salud</h2>

      <DiagramaJerarquia />

      <DataTable
        headers={["Tipo", "Subtipo", "Propiedad clave", "Ejemplo clínico", "Análisis habitual"]}
        rows={[
          [
            <strong key="q1">Cualitativa</strong>,
            "Nominal",
            "Solo etiquetas, sin orden",
            "Grupo sanguíneo (A, B, AB, O) · Diagnóstico CIE-10 · PCR positivo/negativo",
            "Chi-cuadrado · Tablas de frecuencia · Fisher exacto",
          ],
          [
            <strong key="q2">Cualitativa</strong>,
            "Ordinal",
            "Categorías con orden; diferencias no cuantificables",
            "Estadio NYHA (I–IV) · Triage Manchester (I–V) · Nivel de dependencia",
            "Wilcoxon · Mann-Whitney · Kruskal-Wallis · Spearman",
          ],
          [
            <strong key="c1">Cuantitativa</strong>,
            "Discreta",
            "Solo enteros; resultado de un conteo",
            "N.º episodios migraña/mes · Glasgow (3–15) · N.º fármacos en polimedicado",
            "Mediana · Modelos de conteo: Poisson, Binomial Negativa",
          ],
          [
            <strong key="c2">Cuantitativa</strong>,
            "Continua",
            "Cualquier valor del rango, incluidos decimales",
            "Presión arterial (mmHg) · IMC (kg/m²) · Glucemia (mg/dL) · HbA1c (%)",
            "T-Test · ANOVA · Correlación Pearson · Regresión lineal",
          ],
        ]}
      />

      {/* ─── SECCIÓN: Subtipos en detalle ─── */}
      <h2>Cada tipo de variable en profundidad</h2>

      <Flashcard
        question="Variable nominal — ¿cuándo y por qué?"
        answer={
          <>
            <p>
              Las variables nominales son <strong>etiquetas</strong> sin ningún orden implícito.
              Las categorías son mutuamente excluyentes y exhaustivas, pero no existe una relación
              de mayor/menor entre ellas.
            </p>
            <p>
              <strong>Reconocerlas:</strong> ¿Tiene sentido preguntar "¿cuál es mayor?"
              No → es nominal.
            </p>
            <p>
              <strong>Subtipo dicotómica:</strong> Solo dos categorías (sí/no, vivo/muerto,
              adherente/no adherente). Acepta los mismos análisis que nominal pero abre también
              regresión logística binaria.
            </p>
            <p>
              <strong>Ejemplos:</strong> Grupo sanguíneo · Estado civil · Tipo de profesional
              sanitario · Resultado PCR · Diagnóstico principal al alta (CIE-10).
            </p>
          </>
        }
      />

      <Flashcard
        question="Variable ordinal — la más malentendida en investigación clínica"
        answer={
          <>
            <p>
              Las variables ordinales tienen un <strong>orden lógico entre categorías</strong>,
              pero las distancias entre categorías no son iguales ni cuantificables. Sabemos que
              "Estadio IV" es peor que "Estadio II", pero no podemos afirmar que es "el doble de
              grave".
            </p>
            <p>
              <strong>La trampa más común:</strong> Codificar las categorías con números (1, 2, 3)
              y tratar la variable como numérica continua. Los números son solo etiquetas ordenadas,
              no cantidades.
            </p>
            <p>
              <strong>Ejemplos:</strong> Estadiaje NYHA (I–IV) · Triage (I–V) · Estadio cáncer ·
              Escala de dependencia (Leve, Moderada, Severa) · Ítems Likert individuales.
            </p>
          </>
        }
      />

      <Flashcard
        question="Variable cuantitativa discreta — cuando solo existen enteros"
        answer={
          <>
            <p>
              Resultado de un <strong>conteo</strong>. Solo puede tomar valores enteros —
              no existe Glasgow de 12,5 ni 3,7 reingresos. La distribución suele ser asimétrica
              con muchos ceros, lo que hace inadecuado asumir normalidad.
            </p>
            <p>
              <strong>Señal de alerta:</strong> Si el resultado de tu variable es un conteo
              de eventos (caídas, ingresos, readmisiones, errores de medicación), casi siempre
              requiere modelos específicos (Poisson, Binomial Negativa) en lugar de pruebas para
              datos continuos.
            </p>
            <p>
              <strong>Ejemplos:</strong> N.º de hijos · N.º de episodios de migraña/mes ·
              Glasgow (3–15) · N.º de fármacos en polimedicado · N.º de caídas en el último año.
            </p>
          </>
        }
      />

      <Flashcard
        question="Variable cuantitativa continua — la más potente analíticamente"
        answer={
          <>
            <p>
              Puede tomar <strong>cualquier valor dentro de un rango</strong>, incluyendo
              decimales. Es la escala con mayor riqueza analítica: acepta medias, desviaciones
              estándar, correlaciones y la mayoría de pruebas paramétricas.
            </p>
            <p>
              <strong>Importante:</strong> La misma variable puede clasificarse diferente según
              cómo se mida. El IMC puede ser continuo (24,7 kg/m²) u ordinal categorizado
              (normopeso/sobrepeso/obesidad). La HbA1c es continua como porcentaje pero se
              convierte en nominal dicotómica si se usa como criterio de control ({"<"}7%: sí/no).
            </p>
            <p>
              <strong>Ejemplos:</strong> Peso (kg) · PA (mmHg) · Glucemia (mg/dL) ·
              IMC (kg/m²) · Tiempo de espera en urgencias (min).
            </p>
          </>
        }
      />

      {/* ─── SECCIÓN: EVA y Likert ─── */}
      <h2>Los casos que generan debate: EVA, Likert y escalas compuestas</h2>

      <Callout type="info" title="La Escala Visual Analógica (EVA) de dolor — el debate metodológico real">
        <p>
          La EVA es una línea de 100 mm en la que el paciente marca su nivel de dolor.
          <br /><br />
          <strong>Argumento ordinal:</strong> El dolor es subjetivo. No es demostrable que la
          diferencia entre 20 y 40 mm sea la misma que entre 60 y 80 mm. Métodos adecuados:
          Wilcoxon, Mann-Whitney.<br /><br />
          <strong>Argumento continuo:</strong> La EVA genera 101 valores posibles, la distancia
          se mide objetivamente con una regla, y simulaciones muestran que el T-test tiene potencia
          estadística comparable cuando los datos no están concentrados en los extremos.<br /><br />
          <strong>Consenso actual:</strong> Sin covariables → Wilcoxon/Mann-Whitney. Con covariables
          y distribución no extremamente asimétrica → T-test o regresión lineal son opciones
          pragmáticamente aceptables. En cualquier caso, justificar explícitamente la elección.
        </p>
        <p>
          <strong>📖 Referencia:</strong>{" "}
          Heller, G. Z. et al. (2016). How to analyze the Visual Analogue Scale: myths, truths
          and clinical relevance.{" "}
          <em>Scandinavian Journal of Pain</em>, <em>13</em>, 67–75.{" "}
          <a href="https://doi.org/10.1016/j.sjpain.2016.06.012" target="_blank" rel="noopener noreferrer">
            https://doi.org/10.1016/j.sjpain.2016.06.012
          </a>
        </p>
      </Callout>

      <Callout type="info" title="Escalas Likert — ítem individual vs. escala sumada">
        <p>
          Un ítem Likert individual (Totalmente en desacuerdo → Totalmente de acuerdo) es
          <strong> ordinal</strong>. Pero una escala sumada de múltiples ítems (p.ej., 20 ítems
          de calidad de vida) se comporta mucho más como una variable continua, y estudios
          empíricos repetidos muestran que los métodos paramétricos producen conclusiones
          equivalentes a los no paramétricos.
          <br /><br />
          <strong>Regla práctica:</strong> Ítem individual → métodos no paramétricos.
          Escala sumada (≥5 ítems, distribución razonablemente simétrica) → métodos paramétricos
          con justificación explícita.
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Norman, G. (2010). Likert scales, levels of measurement and the "laws" of statistics.{" "}
          <em>Advances in Health Sciences Education</em>, <em>15</em>(5), 625–632.{" "}
          <a href="https://doi.org/10.1007/s10459-010-9222-y" target="_blank" rel="noopener noreferrer">
            https://doi.org/10.1007/s10459-010-9222-y
          </a>
        </p>
      </Callout>

      {/* ─── SECCIÓN: Ejemplos multidisciplinarios ─── */}
      <h2>Galería de ejemplos multidisciplinarios</h2>

      <DataTable
        headers={["Variable", "Área", "Clasificación correcta", "Por qué — y qué error evitas"]}
        rows={[
          [
            "Triage en urgencias (I–V)",
            "Enfermería / Urgencias",
            "Ordinal",
            "Orden claro de gravedad, pero la diferencia entre I y II no es igual a la diferencia entre IV y V.",
          ],
          [
            "Prueba de Morisky-Green (resultado)",
            "Farmacia / Adherencia",
            "Nominal dicotómica",
            "Clasifica en Adherente / No Adherente. Chi-cuadrado o regresión logística, no T-test.",
          ],
          [
            "Porcentaje de dosis adquiridas",
            "Farmacia / Adherencia",
            "Cuantitativa continua",
            "La misma adherencia puede ser nominal (Morisky) o continua (%) según el instrumento: son variables distintas.",
          ],
          [
            "Escala de Ansiedad de Hamilton (HAM-A)",
            "Psicología / Psiquiatría",
            "Discreta / Ordinal compuesta",
            "Suma de 14 ítems ordinales (0–4). Con n suficiente se aplican métodos paramétricos con justificación.",
          ],
          [
            "IMC (kg/m²)",
            "Nutrición / Medicina",
            "Cuantitativa continua",
            "Diferente de la categoría OMS de IMC (Normopeso, Sobrepeso, Obesidad), que es ordinal.",
          ],
          [
            "Categoría de IMC (OMS)",
            "Nutrición / Salud Pública",
            "Ordinal",
            "Bajo peso < Normopeso < Sobrepeso < Obesidad: orden claro, pero el salto entre categorías no es cuantificable.",
          ],
          [
            "Puntuación Glasgow (3–15)",
            "Neurología / UCI",
            "Cuantitativa discreta",
            "Solo enteros. Comparaciones con Mann-Whitney; con distribución razonablemente simétrica, T-test con justificación.",
          ],
          [
            "Estadificación de úlceras por presión (I–IV)",
            "Enfermería",
            "Ordinal",
            "El daño tisular no aumenta linealmente entre estadios. Usar Spearman o modelos logísticos ordinales.",
          ],
          [
            "HbA1c (%)",
            "Endocrinología / AP",
            "Cuantitativa continua",
            "Valor con decimales y sentido biológico. Desenlace primario en ensayos de diabetes tipo 2.",
          ],
          [
            "Control glucémico (HbA1c <7%: sí/no)",
            "Endocrinología",
            "Nominal dicotómica",
            "La misma HbA1c transformada en criterio binario cambia a nominal dicotómica: pierde información pero simplifica la comunicación.",
          ],
          [
            "N.º de reingresos a 30 días",
            "Gestión hospitalaria",
            "Cuantitativa discreta",
            "Conteo con muchos ceros y distribución asimétrica. Modelos de Poisson o Binomial Negativa, no T-test.",
          ],
          [
            "Tiempo hasta reingreso (días)",
            "Gestión hospitalaria",
            "Continua — análisis de supervivencia",
            "Variable de tiempo hasta evento. Con datos censurados: Kaplan-Meier, regresión de Cox.",
          ],
        ]}
      />

      {/* ─── SECCIÓN: Consecuencias de clasificar mal ─── */}
      <h2>Qué ocurre cuando clasificas mal una variable</h2>

      <DiagramaErrores />

      <Callout type="warning" title="Error 1 — Tratar ordinal como continua: resultado formalmente incorrecto">
        <p>
          Aplicar T-Test al estadiaje NYHA produce resultados que el software entrega sin aviso
          de error. Pero "NYHA = 2,3" carece de sentido clínico y la prueba viola los supuestos
          de equidistancia. Puede llegar a publicación y ser rechazado en revisión — o, peor,
          publicado con conclusiones inválidas que influyen en guías clínicas.
        </p>
      </Callout>

      <Callout type="warning" title="Error 2 — Tratar ordinal como nominal: pérdida de potencia">
        <p>
          Clasificar el dolor como "Leve", "Moderado" o "Severo" y analizarlo con Chi-cuadrado
          ignora el orden entre las categorías. Se pierde potencia estadística: es menos probable
          detectar una diferencia real entre grupos, aumentando el riesgo de un falso negativo.
        </p>
      </Callout>

      <Callout type="warning" title="Error 3 — Tratar conteos (discreta) como distribución normal">
        <p>
          El número de reingresos en 30 días tiene distribución asimétrica con exceso de ceros.
          Asumir normalidad e imponer T-Test produce estimaciones sesgadas. Los modelos de
          Poisson o Binomial Negativa capturan la distribución real y producen inferencias válidas.
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Manikandan, S. (2023). Statistics in medical research: Common mistakes.{" "}
          <em>Journal of Pharmacology and Pharmacotherapeutics</em>, <em>14</em>(1).{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10205532/" target="_blank" rel="noopener noreferrer">
            https://pmc.ncbi.nlm.nih.gov/articles/PMC10205532/
          </a>
        </p>
      </Callout>

      {/* ─── SECCIÓN: Proceso de clasificación ─── */}
      <h2>Protocolo de clasificación: cinco preguntas en orden</h2>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "¿Qué tipo de información representa?",
            description:
              "¿Es una categoría o etiqueta? ¿Es una cantidad medida o contada? ¿Es un rango ordenado de intensidad o severidad? Esta primera pregunta determina si vas por la rama cualitativa o cuantitativa.",
          },
          {
            step: 2,
            title: "Si es cualitativa: ¿las categorías tienen orden lógico?",
            description:
              "'Tipo de dieta' (mediterránea, vegana, baja en carbohidratos) no tiene un orden natural → Nominal. 'Estadio de insuficiencia cardíaca' (I, II, III, IV) sí tiene un orden de severidad → Ordinal. ¿Tiene sentido decir que una categoría es 'mayor' o 'más grave' que otra?",
          },
          {
            step: 3,
            title: "Si es cuantitativa: ¿puede tomar valores intermedios con sentido real?",
            description:
              "'Número de ingresos hospitalarios': no existen 2,7 ingresos → Discreta. 'Presión arterial': 118,4 mmHg tiene sentido biológico real → Continua. Regla: si el resultado es un conteo de eventos, es discreta.",
          },
          {
            step: 4,
            title: "¿Cómo se mide concretamente en tu estudio?",
            description:
              "La adherencia puede ser nominal (Morisky: adherente/no adherente) o continua (% de dosis adquiridas). El IMC puede ser continuo (24,7 kg/m²) u ordinal categorizado. La clasificación depende del instrumento de medición, no solo del concepto abstracto.",
          },
          {
            step: 5,
            title: "¿Existe debate? Justifica y realiza análisis de sensibilidad",
            description:
              "Para EVA o Likert sumado el debate es real y documentado. Consulta cómo se analiza en publicaciones de tu área, justifica explícitamente tu elección y, si puedes, reporta con ambos enfoques como análisis de sensibilidad.",
          },
        ]}
      />

      {/* ─── SECCIÓN: Errores de comunicación ─── */}
      <h2>De la clasificación al análisis: errores frecuentes y cómo corregirlos</h2>

      <DataTable
        headers={["Error al defender el análisis", "Respuesta metodológica correcta"]}
        rows={[
          [
            "'La variable es numérica porque está codificada con números'",
            "Los números son solo etiquetas en variables ordinales. NYHA codificado como 1,2,3,4 sigue siendo ordinal. Lo que importa es la naturaleza de la información, no el formato en la base de datos.",
          ],
          [
            "'Usamos la media del estadio NYHA porque es más fácil de interpretar'",
            "La 'facilidad de interpretación' no justifica una operación matemáticamente incorrecta. La mediana y el rango intercuartílico son las medidas apropiadas para variables ordinales.",
          ],
          [
            "'Los datos Likert son continuos porque tiene 5 puntos'",
            "Un ítem individual Likert es ordinal. Una escala sumada (≥5 ítems) puede tratarse como continua con justificación (Norman, 2010), pero debe declararse explícitamente.",
          ],
          [
            "'El software calculó el resultado, así que el análisis es válido'",
            "El software calcula cualquier cosa que le pidas. La validez depende de que las asunciones del test se correspondan con la naturaleza de los datos.",
          ],
          [
            "'La variable discreta la tratamos como continua porque la muestra es grande'",
            "El tamaño muestral grande ayuda por el TCL, pero no convierte una variable de conteo asimétrica con muchos ceros en una variable normal. Verifica la distribución y justifica la elección.",
          ],
        ]}
      />

      {/* ─── FLASHCARD FINAL ─── */}
      <Flashcard
        question="¿Qué diferencia fundamental existe entre escala de intervalo y escala de razón? ¿Importa en la práctica clínica?"
        answer={
          <p>
            La diferencia es el <strong>cero absoluto</strong>: en razón, el cero representa
            ausencia real de la magnitud medida (0 kg = ausencia de masa). En intervalo, el
            cero es convencional (0°C no significa ausencia de temperatura). En la práctica
            biomédica la distinción tiene poca relevancia operativa: ambas se analizan con los
            mismos métodos paramétricos. Lo que sí importa es que tanto intervalo como razón
            permiten calcular medias, desviaciones estándar y correlaciones de Pearson, mientras
            que las escalas ordinales no.
          </p>
        }
      />

      {/* ─── QUIZZES ─── */}
      <Quiz
        question="Un investigador analiza la efectividad de un programa de rehabilitación en pacientes con EPOC midiendo la disnea con la escala mMRC (0–4) antes y después. ¿Qué prueba estadística es más apropiada para comparar pre y post?"
        options={[
          { text: "T-Test para muestras pareadas", correct: false },
          { text: "Wilcoxon de rangos con signo para muestras pareadas", correct: true },
          { text: "Chi-cuadrado de Pearson", correct: false },
          { text: "ANOVA de medidas repetidas", correct: false },
        ]}
        explanation="La escala mMRC (0–4) es ordinal. Al ser datos pareados (mismos pacientes antes y después), la prueba no paramétrica apropiada es Wilcoxon de rangos con signo, que compara medianas sin asumir equidistancia entre categorías ni distribución normal de las diferencias. El T-Test pareado requiere escala al menos de intervalo."
      />

      <Quiz
        question="Un farmacéutico registra el número de consultas de revisión de medicación por paciente al año. El 60% tiene 0 consultas, el 25% tiene 1, el 10% tiene 2 y el 5% tiene 3 o más. ¿Cómo debe clasificarse y analizarse esta variable?"
        options={[
          { text: "Cuantitativa continua; usar media y T-Test", correct: false },
          {
            text: "Cuantitativa discreta con distribución asimétrica; el T-Test es inadecuado — considerar Poisson o análisis de recuentos",
            correct: true,
          },
          { text: "Ordinal; usar Mann-Whitney", correct: false },
          { text: "Nominal dicotómica; usar Chi-cuadrado", correct: false },
        ]}
        explanation="El número de consultas es una variable discreta (solo enteros) con distribución fuertemente asimétrica y exceso de ceros — clásica distribución de conteo. Los modelos de Poisson o Binomial Negativa están diseñados para estos datos y producen estimaciones válidas. Si solo se quiere comparar medianas, Wilcoxon/Mann-Whitney son aceptables, aunque no capturan la naturaleza completa de la distribución de conteo."
      />

     {/* ─── RECURSOS Y REFERENCIAS (ESTILO MÓDULO 8) ─── */}
<div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
  <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
     Recursos y Referencias Clave
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    {/* Columna izquierda: Lecturas Fundamentales */}
    <div>
      <h3 className="font-semibold text-slate-800">📖 Lecturas Fundamentales</h3>
      <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
        <li>
          Stevens, S. S. (1946). On the theory of scales of measurement. <em>Science</em>, <em>103</em>(2684), 677–680.{" "}
          <a href="https://doi.org/10.1126/science.103.2684.677" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://doi.org/10.1126/science.103.2684.677</a>
          <br />
          <span className="text-xs text-gray-500">El artículo que fundó la clasificación moderna de escalas. Lectura obligatoria para entender por qué no todas las variables admiten los mismos análisis.</span>
        </li>
        <li>
          Misra, D. P. et al. (2023). A narrative review on types of data and scales of measurement. <em>Cancer Research, Statistics, and Treatment</em>, <em>6</em>(2), 279–283.{" "}
          <a href="https://doi.org/10.4103/crst.crst_1_23" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://doi.org/10.4103/crst.crst_1_23</a>
          <br />
          <span className="text-xs text-gray-500">Revisión actualizada con ejemplos clínicos y advertencias sobre clasificación incorrecta.</span>
        </li>
        <li>
          Velardo, V. et al. (2014). Manipulating measurement scales in medical statistical analysis. <em>Journal of Medical Signals and Sensors</em>, <em>4</em>(3).{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3963323/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://pmc.ncbi.nlm.nih.gov/articles/PMC3963323/</a>
          <br />
          <span className="text-xs text-gray-500">Consecuencias de tratar variables ordinales como continuas. Ideal para justificar tus decisiones metodológicas.</span>
        </li>
        <li>
          Heller, G. Z. et al. (2016). How to analyze the Visual Analogue Scale: myths, truths and clinical relevance. <em>Scandinavian Journal of Pain</em>, <em>13</em>, 67–75.{" "}
          <a href="https://doi.org/10.1016/j.sjpain.2016.06.012" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://doi.org/10.1016/j.sjpain.2016.06.012</a>
          <br />
          <span className="text-xs text-gray-500">Desmonta mitos sobre la EVA y ofrece guías pragmáticas para elegir pruebas estadísticas.</span>
        </li>
        <li>
          Norman, G. (2010). Likert scales, levels of measurement and the "laws" of statistics. <em>Advances in Health Sciences Education</em>, <em>15</em>(5), 625–632.{" "}
          <a href="https://doi.org/10.1007/s10459-010-9222-y" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://doi.org/10.1007/s10459-010-9222-y</a>
          <br />
          <span className="text-xs text-gray-500">Defiende con evidencia que las escalas sumadas tipo Likert pueden tratarse como continuas. Clave para tu marco teórico.</span>
        </li>
        <li>
          Harpe, S. E. (2015). How to analyze Likert and other rating scale data. <em>Currents in Pharmacy Teaching and Learning</em>, <em>7</em>(6), 836–850.{" "}
          <a href="https://doi.org/10.1016/j.cptl.2015.08.001" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://doi.org/10.1016/j.cptl.2015.08.001</a>
          <br />
          <span className="text-xs text-gray-500">Revisión práctica con ejemplos farmacéuticos y educativos.</span>
        </li>
        <li>
          Manikandan, S. (2023). Statistics in medical research: Common mistakes. <em>Journal of Pharmacology and Pharmacotherapeutics</em>, <em>14</em>(1).{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10205532/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">https://pmc.ncbi.nlm.nih.gov/articles/PMC10205532/</a>
          <br />
          <span className="text-xs text-gray-500">Catálogo de errores frecuentes (incluido el mal uso de pruebas por tipo de variable) y cómo evitarlos.</span>
        </li>
      </ul>
    </div>

    {/* Columna derecha: Herramientas y Multimedia */}
    <div>
      <h3 className="font-semibold text-slate-800">🎬 Herramientas y Multimedia</h3>
      <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
        <li>
          <strong>Jamovi</strong>{" "}
          <a href="https://www.jamovi.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">jamovi.org</a>
          <br />
          <span className="text-xs text-gray-500">Software gratuito que detecta automáticamente el tipo de variable al importar datos. Empieza por aquí.</span>
        </li>
        <li>
          <strong>JASP</strong>{" "}
          <a href="https://jasp-stats.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">jasp-stats.org</a>
          <br />
          <span className="text-xs text-gray-500">Asistente interactivo de selección de prueba según tipo de variable. Ideal para practicar.</span>
        </li>
        <li>
          <strong>StatPearls – Statistical Tests</strong>{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK554507/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">ncbi.nlm.nih.gov/books/NBK554507</a>
          <br />
          <span className="text-xs text-gray-500">Guía de acceso libre que empareja cada tipo de variable con la prueba adecuada.</span>
        </li>
        <li>
          <strong>Canal de YouTube: StatQuest with Josh Starmer</strong>
          <br />
          <span className="text-xs text-gray-500">Explicaciones visuales sobre tipos de datos, distribuciones y pruebas estadísticas. Perfecto para consolidar conceptos.</span>
        </li>
        <li>
          <strong>Tutoriales de Jamovi: tipos de variables y análisis descriptivos</strong>
          <br />
          <span className="text-xs text-gray-500">Busca en YouTube “Jamovi variable types tutorial” para ver cómo asignar correctamente los tipos antes del análisis.</span>
        </li>
      </ul>
    </div>
  </div>
  <div className="mt-6 border-t border-gray-200 pt-4 text-center">
    <p className="text-sm font-medium text-gray-600">
      Clasificar una variable no es un paso burocrático: es la primera decisión analítica que protege (o compromete) la validez de las conclusiones finales. Hacerla implica fundamento, claridad de conceptos.
    </p>
  </div>
</div>

    </div>
  );
}