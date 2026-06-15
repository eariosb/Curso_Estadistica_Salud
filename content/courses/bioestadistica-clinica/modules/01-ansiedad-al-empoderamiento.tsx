'use client';
import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen, Globe, FlaskConical, Wrench } from "lucide-react";
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import dynamic from 'next/dynamic';

const BlockMath = dynamic(
  () => import('react-katex').then((mod) => mod.BlockMath),
  { ssr: false }
);

const InlineMath = dynamic(
  () => import('react-katex').then((mod) => mod.InlineMath),
  { ssr: false }
);

// Configuración óptima para entornos de salud (TeX input, salida HTML ligera)
const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
  },
};


export const meta = {
  title: "De la Ansiedad al Empoderamiento",
  subtitle: "La estadística: el poder oculto en los datos de tu práctica",
  objective:
    "Reconocer la ansiedad estadística como una barrera documentada (no una deficiencia personal), comprender por qué los datos son la herramienta más poderosa del profesional de salud moderno, y dar el primer paso hacia el pensamiento estadístico aplicado.",
};

/* ─────────────────────────────────────────────────────────────
   HELPER — Rosa polar de Nightingale (SVG puro, sin dependencias)
   12 cuñas = 12 meses · ángulo = 30° por cuña
   Radio proporcional a la magnitud de cada causa
   Paleta histórica: azul-cian (enfermedades), rojo teja (heridas), gris carbón (otras)
───────────────────────────────────────────────────────────────*/
function NightingaleRose() {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Datos ilustrativos inspirados en las proporciones del diagrama original (1854-55)
  // r = radio de cada sector (escala relativa a la magnitud)
  // Los tres arrays corresponden a:
  //   [0] zymotic (enfermedades prevenibles) — AZUL CIAN
  //   [1] wounds  (heridas de combate)       — ROJO TEJA
  //   [2] other   (otras causas)             — GRIS CARBÓN
  const months = [
    "Abr", "May", "Jun", "Jul", "Ago", "Sep",
    "Oct", "Nov", "Dic", "Ene", "Feb", "Mar",
  ];
  const data = [
    // [zymo, wounds, other]  — radio en px sobre viewBox 260×260
    [28,  8,  5],
    [30,  9,  5],
    [32, 10,  6],
    [72, 12,  7],  // Jul: pico de enfermedades
    [82, 14,  8],  // Ago: máximo absoluto
    [65, 11,  6],
    [48, 10,  6],
    [38,  8,  5],
    [30,  7,  4],
    [22,  6,  4],
    [18,  5,  4],
    [20,  6,  4],
  ];

  const cx = 130, cy = 138;          // centro del diagrama
  const sliceAngle = 360 / 12;       // 30° por mes
  const offsetDeg = -90;             // primer mes arriba (norte)

  // Construye el path de un sector de radio r
  const sectorPath = (month: number, radius: number) => {
    const startDeg = offsetDeg + month * sliceAngle;
    const endDeg   = startDeg + sliceAngle;
    const x1 = cx + radius * Math.cos(toRad(startDeg));
    const y1 = cy + radius * Math.sin(toRad(startDeg));
    const x2 = cx + radius * Math.cos(toRad(endDeg));
    const y2 = cy + radius * Math.sin(toRad(endDeg));
    const large = sliceAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  // Etiqueta del mes en el borde exterior del sector mayor
  const labelPos = (month: number, radius: number) => {
    const midDeg = offsetDeg + month * sliceAngle + sliceAngle / 2;
    const r = radius + 10;
    return {
      x: cx + r * Math.cos(toRad(midDeg)),
      y: cy + r * Math.sin(toRad(midDeg)),
    };
  };

  return (
    <figure style={{ textAlign: "center", margin: "2rem auto", maxWidth: 580 }}>
      {/* Tarjeta con textura parchment */}
      <div
        style={{
          background: "linear-gradient(135deg, #f5f0e8 0%, #ede6d3 50%, #f0ead8 100%)",
          border: "1.5px solid #c9b89a",
          borderRadius: 14,
          padding: "1.25rem 1rem 0.75rem",
          boxShadow: "0 4px 18px rgba(120,90,50,0.13), inset 0 0 40px rgba(200,180,140,0.2)",
        }}
      >
        {/* Título al estilo Victorian type-specimen */}
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 11.5,
            letterSpacing: "0.04em",
            color: "#4a3520",
            margin: "0 0 0.25rem",
            textTransform: "uppercase",
          }}
        >
          Diagram of the Causes of Mortality
        </p>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 10,
            color: "#7a6245",
            fontStyle: "italic",
            margin: "0 0 0.75rem",
          }}
        >
          in the Army in the East · April 1854 – March 1855
        </p>

        <svg
          viewBox="0 0 260 230"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", maxWidth: 340, display: "block", margin: "0 auto" }}
          aria-label="Diagrama inspirado en la rosa polar de Florence Nightingale, 1858"
        >
          {/* Anillos de referencia concéntricos (grid radial) */}
          {[20, 40, 60, 82].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r}
              fill="none" stroke="#c9b89a" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.6" />
          ))}

          {/* ── Sectores: se dibujan de menor a mayor para solapado correcto ── */}
          {data.map(([z, w, o], i) => (
            <g key={i}>
              {/* Zymotics (enfermedades prevenibles) — azul-cian translúcido */}
              <path
                d={sectorPath(i, z)}
                fill="#027127"
                fillOpacity="0.72"
                stroke="#f5f0e8"
                strokeWidth="0.1"
              />
              {/* Wounds (heridas de combate) — rojo ladrillo */}
              <path
                d={sectorPath(i, w)}
                fill="#f89501"
                fillOpacity="0.85"
                stroke="#f5f0e8"
                strokeWidth="0.1"
              />
              {/* Other — gris carbón */}
              <path
                d={sectorPath(i, o)}
                fill="#5200f7"
                fillOpacity="0.75"
                stroke="#f5f0e8"
                strokeWidth="0.1"
              />
            </g>
          ))}

          {/* Separadores radiales entre meses */}
          {Array.from({ length: 12 }, (_, i) => {
            const deg = offsetDeg + i * sliceAngle;
            return (
              <line key={i}
                x1={cx} y1={cy}
                x2={cx + 88 * Math.cos(toRad(deg))}
                y2={cy + 88 * Math.sin(toRad(deg))}
                stroke="#c9b89a" strokeWidth="0.4" opacity="0.55"
              />
            );
          })}

          {/* Punto central */}
          <circle cx={cx} cy={cy} r="1" fill="#4a3520" />

          {/* Etiquetas de meses */}
          {data.map(([z], i) => {
            const outerR = Math.max(z, 28);
            const pos = labelPos(i, outerR);
            return (
              <text key={i}
                x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="7.5" fontFamily="Georgia, serif"
                fill="#4a3520" fontWeight="600"
              >
                {months[i]}
              </text>
            );
          })}

          {/* Leyenda interna compacta */}
          <g transform="translate(0, 0)">
            <rect width="10" height="10" rx="2" fill="#027127" fillOpacity="0.72" />
            <text x="14" y="8.5" fontSize="7" fontFamily="Georgia,serif" fill="#4a3520">Enfermedades prevenibles</text>
            <rect x="170" width="10" height="10" rx="2" fill="#f89501" fillOpacity="0.85" />
            <text x="184" y="8.5" fontSize="7" fontFamily="Georgia,serif" fill="#4a3520">Heridas de combate</text>
          </g>
          <g transform="translate(98, 22)">
            <rect width="10" height="10" rx="2" fill="#5200f7" fillOpacity="0.75" />
            <text x="14" y="9.5" fontSize="7" fontFamily="Georgia,serif" fill="#4a3520">Otras causas</text>
          </g>
        </svg>

        {/* Nota al pie estilo publicación victoriana */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 9.5,
            color: "#7a6245",
            fontStyle: "italic",
            marginTop: "0.6rem",
            marginBottom: 0,
            borderTop: "1px solid #c9b89a",
            paddingTop: "0.45rem",
          }}
        >
          Inspirado en el diagrama original de Florence Nightingale (1858).
          El área de cada cuña es proporcional a la magnitud mensual de cada causa de muerte.
          Nótese que las enfermedades prevenibles (verde) eclipsan las muertes en combate (amarilla).
        </p>
      </div>
    </figure>
  );
}

export default function Lesson() {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="lesson-prose">
      {/* ═══════════════════════════════════════════════════════════
          GANCHO INICIAL — FLORENCE NIGHTINGALE
      ═══════════════════════════════════════════════════════════ */}

      <h2>Una enfermera cambió el mundo con datos.</h2>
      <p>
        En octubre de 1854, Florence Nightingale llegó a un hospital militar británico en
        Estambul, durante la Guerra de Crimea. Lo que encontró era devastador: salas
        atestadas, condiciones insalubres, y una tasa de mortalidad que superaba las muertes
        en combate. Pero Nightingale no se limitó a cuidar pacientes. Hizo algo que sus
        colegas no habían pensado hacer: <strong>recolectó datos, los analizó y los
        convirtió en argumentos irrefutables</strong>.
      </p>
      <p>
        Creó el diagrama de rosa (o "coxcomb"), una visualización que mostraba, mes a mes,
        que la mayoría de los soldados morían de enfermedades prevenibles (tifus, cólera,
        disentería) y no de heridas de guerra. Reconociendo que casi nadie leía
        tablas estadísticas, Nightingale y su equipo diseñaron gráficos para capturar la
        atención y comprometer a los lectores de maneras que otros medios no podían.
        El resultado: su trabajo ayudó a persuadir al gobierno británico para que
        reformara la sanidad en hospitales militares y civiles, y la mortalidad por
        enfermedades prevenibles entre los soldados disminuyó hasta quedar por debajo de la
        de la población civil comparable.
      </p>
      <p>
        Nightingale no era matemática, ni estadistica de carrera. Era enfermera. Y cambió la historia de
        la salud pública porque entendió que <strong>los datos esconden poder</strong>, y
        que ese poder es liberado cuando los sabes leer, interpretar y comunicar.
      </p>

      {/* ── Rosa polar de Nightingale — componente rediseñado ── */}
      <NightingaleRose />

      <Callout type="info" title="La lección de Nightingale para el profesional de salud de hoy">
        <p>
          Nightingale demostró que la estadística no es meramente una herramienta para el
          análisis de datos, sino un poderoso medio para generar cambio real. En 1858 se
          convirtió en la primera mujer admitida en la Royal Statistical Society; 
          con acciones concretas; derivando preguntas clínicas de alto valor, recolectando datos
          de su entorno, y comunicando hallazgos con claridad: <br />
          <strong>Exactamente lo que este módulo te propone aprender.</strong>
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Small, H. (2024). <em>Florence Nightingale, mortality and health diagrams</em>. Visionary Press.
          Véase también: Kopf, E. W. (1916). Florence Nightingale as statistician.{" "}
          <em>Journal of the American Statistical Association</em>, <em>15</em>(116), 388–404.{" "}
          <a href="https://www.jstor.org/stable/2965763" target="_blank" rel="noopener noreferrer">
            https://www.jstor.org/stable/2965763
          </a>
        </p>
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          LA ANSIEDAD ESTADÍSTICA: UN FENÓMENO DOCUMENTADO
      ═══════════════════════════════════════════════════════════ */}

      <h2>La ansiedad estadística</h2>
      <p>
        Antes de seguir, una pregunta honesta: ¿qué sientes cuando ves una tabla de
        resultados en un artículo científico? Si la respuesta incluye palabras como
        "agobio", "skip", o "espero que no me pregunten esto"… estás en el lugar correcto.
        Y estás en muy buena compañía.
      </p>
      <p>
        La <strong>ansiedad estadística</strong> es un fenómeno cognitivo y emocional
        documentado científicamente desde los años 1980. Cruise, Cash y Bolton (1985)
        la definieron como "los sentimientos de ansiedad que se experimentan al tomar un
        curso de estadística o al realizar análisis estadísticos", y desarrollaron la
        escala STARS (Statistical Anxiety Rating Scale), el instrumento más usado para
        medirla. Los estudios han demostrado consistentemente una relación negativa
        entre la ansiedad estadística y el rendimiento, es decir: a mayor ansiedad,
        menor capacidad de aprender y aplicar la estadística. Pero esto más que ser una sentencia:
        es un punto de partida.
      </p>

      <Callout type="info" title="¿Qué mide la ansiedad estadística? Las 6 dimensiones del STARS">
        <p>
          La escala STARS identifica seis componentes de la ansiedad estadística que
          afectan a profesionales y estudiantes de todas las disciplinas:
        </p>
        <DataTable
          headers={["Dimensión STARS", "¿Cómo se manifiesta en salud?"]}
          rows={[
            ["Ansiedad de interpretación", "Bloqueo al leer tablas de resultados o p-valores en artículos clínicos"],
            ["Ansiedad de prueba/clase", "Nerviosismo ante evaluaciones o presentaciones que incluyen datos"],
            ["Miedo a pedir ayuda", "No consultar al bioestadístico del equipo por vergüenza"],
            ["Percepción de utilidad de la estadística", "Sentir que 'esto no me sirve para atender pacientes'"],
            ["Autoconcepto computacional", "Creer que 'no soy bueno/a con los números'"],
            ["Miedo al docente/experto en estadística", "Intimidación ante el estadístico del comité o el revisor de la revista"],
          ]}
        />
        <p style={{ marginTop: "0.75rem" }}>
          <strong>📖 Referencia:</strong>{" "}
          Cruise, R. J., Cash, R. W., & Bolton, D. L. (1985). Development and validation
          of an instrument to measure statistical anxiety. <em>Proceedings of the American
          Statistical Association, Section on Statistical Education</em>, 4, 92–97.
          Validación psicométrica actualizada:{" "}
          Hanna, D., Shevlin, M., & Dempster, M. (2008). The structure of the Statistics
          Anxiety Rating Scale: a confirmatory factor analysis using UK psychology students.{" "}
          <em>Personality and Individual Differences</em>, <em>45</em>, 68–74.{" "}
          <a href="https://doi.org/10.1016/j.paid.2008.03.001" target="_blank" rel="noopener noreferrer">
            https://doi.org/10.1016/j.paid.2008.03.001
          </a>
        </p>
      </Callout>

      <h3>¿Por qué ocurre? Las causas reales de la ansiedad estadística</h3>

      {/* SVG — Diagrama de causas (árbol visual) */}
      <svg
        viewBox="0 0 520 220"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", maxWidth: 520, display: "block", margin: "1rem auto" }}
        aria-label="Árbol de causas de la ansiedad estadística"
      >
        <rect width="520" height="220" rx="10" fill="#fafaf8" />
        {/* Nodo central */}
        <rect x="175" y="88" width="170" height="40" rx="8" fill="#c0392b" />
        <text x="260" y="110" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="white" fontWeight="bold">Ansiedad estadística</text>
        {/* Causa 1 */}
        <rect x="10" y="10" width="140" height="36" rx="7" fill="#e8f4fd" stroke="#5ba4cf" strokeWidth="1.5" />
        <text x="80" y="26" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#1a6291">Enseñanza basada</text>
        <text x="80" y="39" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#1a6291">en fórmulas abstractas</text>
        <line x1="150" y1="28" x2="175" y2="95" stroke="#5ba4cf" strokeWidth="1.2" strokeDasharray="4,3" />
        {/* Causa 2 */}
        <rect x="10" y="92" width="140" height="36" rx="7" fill="#e8f4fd" stroke="#5ba4cf" strokeWidth="1.5" />
        <text x="80" y="108" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#1a6291">Experiencias negativas</text>
        <text x="80" y="121" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#1a6291">previas con matemáticas</text>
        <line x1="150" y1="110" x2="175" y2="110" stroke="#5ba4cf" strokeWidth="1.2" strokeDasharray="4,3" />
        {/* Causa 3 */}
        <rect x="10" y="174" width="140" height="36" rx="7" fill="#e8f4fd" stroke="#5ba4cf" strokeWidth="1.5" />
        <text x="80" y="190" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#1a6291">Poca conexión con</text>
        <text x="80" y="203" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#1a6291">la práctica clínica real</text>
        <line x1="150" y1="192" x2="175" y2="120" stroke="#5ba4cf" strokeWidth="1.2" strokeDasharray="4,3" />
        {/* Causa 4 */}
        <rect x="370" y="10" width="140" height="36" rx="7" fill="#fef9e7" stroke="#f0a500" strokeWidth="1.5" />
        <text x="440" y="26" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#7d5a00">Miedo al error</text>
        <text x="440" y="39" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#7d5a00">y al ridículo</text>
        <line x1="370" y1="28" x2="345" y2="95" stroke="#f0a500" strokeWidth="1.2" strokeDasharray="4,3" />
        {/* Causa 5 */}
        <rect x="370" y="92" width="140" height="36" rx="7" fill="#fef9e7" stroke="#f0a500" strokeWidth="1.5" />
        <text x="440" y="108" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#7d5a00">Creencia "no soy</text>
        <text x="440" y="121" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#7d5a00">persona de números"</text>
        <line x1="370" y1="110" x2="345" y2="110" stroke="#f0a500" strokeWidth="1.2" strokeDasharray="4,3" />
        {/* Causa 6 */}
        <rect x="370" y="174" width="140" height="36" rx="7" fill="#fef9e7" stroke="#f0a500" strokeWidth="1.5" />
        <text x="440" y="190" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#7d5a00">Exposición tardía y</text>
        <text x="440" y="203" textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill="#7d5a00">sin contexto clínico</text>
        <line x1="370" y1="192" x2="345" y2="120" stroke="#f0a500" strokeWidth="1.2" strokeDasharray="4,3" />
      </svg>

      <DataTable
        headers={["Causa documentada", "Consecuencia directa en la práctica"]}
        rows={[
          [
            "Enseñanza centrada en fórmulas sin contexto clínico",
            "Desconexión total entre el curso de estadística y la realidad asistencial — la estadística se percibe como un obstáculo del grado, no como una herramienta de trabajo",
          ],
          [
            "Experiencias negativas previas con matemáticas",
            "La ansiedad matemática se transfiere a la estadística aunque sean disciplinas distintas en su propósito",
          ],
          [
            "Creencia de 'no soy persona de números'",
            "Autoexclusión del análisis de datos: se delega completamente en otros sin desarrollar criterio propio",
          ],
          [
            "Miedo al error y al ridículo ante expertos",
            "Evitar preguntar, evitar leer artículos con estadística, evitar participar en reuniones de investigación",
          ],
          [
            "Poca relevancia práctica percibida",
            "Abandono temprano de la lectura crítica de evidencia científica — se aceptan conclusiones sin cuestionar el método",
          ],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          EL PODER OCULTO EN LOS DATOS
      ═══════════════════════════════════════════════════════════ */}

      <h2>El poder que esconden los datos</h2>

      <p>
        Existe una definición que cambia la forma en que uno se relaciona con la
        estadística: los datos no son números. Los datos son <strong>observaciones del
        mundo codificadas</strong>. Cada registro clínico, cada escala de dolor, cada
        tasa de adherencia, cada evento adverso; es información sobre la realidad de tus
        pacientes. Y la estadística es simplemente el lenguaje para interrogar esa
        realidad, encontrar patrones que no son detectables a simple vista, y tomar decisiones informadas.
      </p>
      <p>
        Una ciudadanía empoderada para estudiar hechos basados en evidencia y que tenga
        la capacidad de gestionar, analizar y pensar críticamente con datos es el mejor
        remedio para un mundo guiado por noticias falsas o indiferente a los hechos.
        Este principio aplica exactamente a los profesionales de salud: sin capacidad de
        leer datos, eres vulnerable a las afirmaciones de la industria farmacéutica, de los
        medios, de los gurúes de turno. Con esa habilidad, eres un agente de cambio.
      </p>

<Callout type="tip" title="Caso 1 · Cribado en salud pública (Enfermería / Salud Comunitaria)">
  <p>
    Una enfermera realiza cribado de VIH en una feria comunitaria. Una joven de 22
    años, sin factores de riesgo conocidos, obtiene resultado positivo en una prueba
    rápida con sensibilidad del <strong>99 %</strong> y especificidad del{' '}
    <strong>98 %</strong>. La prevalencia del VIH en esa comunidad es del{' '}
    <strong>0.5 %</strong>.
  </p>

  <h4>❌ Sin estadística</h4>
  <p>
    La enfermera comunica el resultado como «positivo», deriva a infectología urgente
    y genera una angustia innecesaria, además de exponer a la persona a un posible
    estigma social. El daño emocional ya está hecho antes de cualquier confirmación.
  </p>

  <h4>✅ Con estadística: Valor Predictivo Positivo (VPP)</h4>
  <p>
    El VPP responde:{' '}
    <em>
      «si la prueba es positiva, ¿qué probabilidad real hay de tener la enfermedad?»
    </em>
    . Depende de la prevalencia, no solo de la calidad de la prueba.
  </p>

  <BlockMath math="VPP = \frac{\text{Sensibilidad} \times \text{Prevalencia}}{\text{Sensibilidad} \times \text{Prevalencia} + (1 - \text{Especificidad}) \times (1 - \text{Prevalencia})}" />

  <p>Sustituyendo los valores del caso:</p>

  <BlockMath math="VPP = \frac{0.99 \times 0.005}{0.99 \times 0.005 + 0.02 \times 0.995} = \frac{0.00495}{0.00495 + 0.0199} = \frac{0.00495}{0.02485} \approx 0.1992 \ (19.9\%)" />

  <p>
    <strong>Resultado:</strong> solo el <strong>~20 %</strong> de los resultados
    positivos corresponden a personas realmente infectadas. En otras palabras,{' '}
    <em>4 de cada 5 positivos son falsos positivos</em>.
  </p>

  <h4>🧾 Tabla de contingencia (10 000 personas)</h4>
  <p>Imaginemos que se criba a 10 000 personas de esa comunidad:</p>
  <table style={{ borderCollapse: 'collapse', width: '100%', margin: '1rem 0' }}>
    <thead>
      <tr style={{ backgroundColor: '#f3f4f6' }}>
        <th style={{ border: '1px solid #d1d5db', padding: '8px' }}></th>
        <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>VIH +</th>
        <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>VIH −</th>
        <th style={{ border: '1px solid #d1d5db', padding: '8px' }}>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          Prueba +
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', color: '#059669' }}>
          50
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', color: '#dc2626' }}>
          199
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          249
        </td>
      </tr>
      <tr>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          Prueba −
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', color: '#dc2626' }}>
          0
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', color: '#059669' }}>
          9 751
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          9 751
        </td>
      </tr>
      <tr style={{ backgroundColor: '#f9fafb' }}>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          Total
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          50
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          9 950
        </td>
        <td style={{ border: '1px solid #d1d5db', padding: '8px', fontWeight: 600 }}>
          10 000
        </td>
      </tr>
    </tbody>
  </table>

  <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
    <li>Prevalencia 0.5 % → 50 personas con VIH en 10 000.</li>
    <li>Sensibilidad 99 % → 50 verdaderos positivos (50 × 0.99).</li>
    <li>Especificidad 98 % → 199 falsos positivos (9 950 × 0.02).</li>
    <li>Total de pruebas positivas: 50 + 199 = 249.</li>
    <li>
      <InlineMath math="VPP = 50 / 249 \approx 20\%" />.
    </li>
  </ul>

  <h4>🧠 Interpretación clínica y lección aprendida</h4>
  <p>
    Incluso una prueba con sensibilidad y especificidad excelentes produce una
    avalancha de falsos positivos cuando la enfermedad es poco frecuente. Aquí,{' '}
    <strong>el 80 % de los resultados positivos son falsas alarmas</strong>. Por eso,
    los protocolos exigen siempre una prueba confirmatoria antes de informar al
    paciente. La estadística, en este caso el VPP, protege del sobrediagnóstico, el
    daño emocional y las intervenciones innecesarias.
  </p>
  <p>
    <strong>Competencia en juego:</strong> Interpretar el valor predictivo positivo en
    función de la prevalencia, sin necesidad de calcularlo manualmente en la práctica
    diaria, pero sabiendo que una prueba positiva no equivale a un diagnóstico.
  </p>
</Callout>

      {/* ═══════════════════════════════════════════════════════════
          CASOS CLÍNICOS EXPANDIDOS
      ═══════════════════════════════════════════════════════════ */}

      <h2>Tres momentos en los que la estadística cambió una decisión real</h2>

      <Callout type="tip" title="Caso 1 · Cribado en salud pública (Enfermería / Salud Comunitaria)">
        <p>
          Una enfermera realiza cribado de VIH en una feria comunitaria. Una joven de 22
          años, sin factores de riesgo conocidos, obtiene resultado positivo en una prueba
          rápida con sensibilidad del 99% y especificidad del 98%. La prevalencia del VIH
          en esa comunidad es del 0.5%.
        </p>
        <p>
          <strong>Sin estadística:</strong> La enfermera informa el resultado como
          "positivo" y remite a infectología urgente, generando angustia y estigma
          potencial.
        </p>
        <p>
          <strong>Con estadística (Valor Predictivo Positivo):</strong> En esta población
          de baja prevalencia, aunque la prueba sea muy buena, solo el 33% de los
          positivos son verdaderos positivos — es decir, <em>2 de cada 3 resultados
          positivos en esta comunidad son falsos positivos</em>. El protocolo correcto
          exige siempre una prueba confirmatoria. La estadística evita un diagnóstico
          erróneo y un daño innecesario.
        </p>
        <p>
          <strong>La competencia en juego:</strong> Interpretar valores predictivos en
          función de la prevalencia — sin necesitar calcular nada manualmente, solo
          entender el concepto.
        </p>
      </Callout>

      {/* SVG — Visual del VPP */}
      <svg
        viewBox="0 0 520 130"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", maxWidth: 520, display: "block", margin: "0.5rem auto 1.5rem" }}
        aria-label="Visualización del Valor Predictivo Positivo en baja prevalencia"
      >
        <rect width="520" height="130" rx="10" fill="#f5f5f0" />
        <text x="260" y="20" textAnchor="middle" fontSize="10.5" fontFamily="sans-serif" fill="#333" fontWeight="bold">
          1000 personas de baja prevalencia sometidas al cribado
        </text>
        <rect x="30" y="30" width="460" height="28" rx="5" fill="#cce3f5" />
        <rect x="30" y="30" width="5" height="28" rx="0" fill="#c0392b" />
        <text x="40" y="44" fontSize="9" fontFamily="sans-serif" fill="#c0392b" fontWeight="bold">5 con VIH</text>
        <text x="320" y="44" fontSize="9" fontFamily="sans-serif" fill="#1a5276">995 sin VIH</text>
        <text x="30" y="78" fontSize="9.5" fontFamily="sans-serif" fill="#555">De los 5 con VIH → ~5 test positivos (verdaderos positivos)</text>
        <text x="30" y="93" fontSize="9.5" fontFamily="sans-serif" fill="#555">De los 995 sin VIH → ~20 test positivos (falsos positivos, 2% error)</text>
        <rect x="30" y="104" width="460" height="20" rx="5" fill="#fef9e7" stroke="#f0a500" strokeWidth="1" />
        <text x="260" y="118" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#7d5a00" fontWeight="bold">
          Total positivos: 25 → Solo 5 son reales = VPP ≈ 20% (¡no 99%!)
        </text>
      </svg>

      <Callout type="tip" title="Caso 2 · Evaluación de un programa de adherencia (Farmacia / Nutrición)">
        <p>
          Un farmacéutico implementa un programa de educación para pacientes con
          hipertensión. La tasa de adherencia sube del 65% al 72% en el grupo intervenido
          (n=80) versus el 64% en el grupo control (n=80). El p-valor es 0.08.
        </p>
        <p>
          <strong>Interpretación incorrecta:</strong> "El resultado no fue significativo
          (p&gt;0.05), por tanto el programa no funciona." Se cierra el programa.
        </p>
        <p>
          <strong>Interpretación correcta con pensamiento estadístico:</strong>
        </p>
        <ul>
          <li>El intervalo de confianza del 95% para la diferencia va de -1% a +15%: incluye el cero pero también incluye efectos clínicamente relevantes.</li>
          <li>Con n=80 por grupo, el estudio tenía solo ~40% de potencia para detectar una diferencia de 8 puntos porcentuales — el estudio estaba infrapotenciado.</li>
          <li>La ausencia de significación estadística no es evidencia de ausencia de efecto. El resultado es <em>inconcluyente</em>, no negativo.</li>
          <li>Conclusión ética: el programa merece una evaluación en un estudio adecuadamente dimensionado antes de ser descartado.</li>
        </ul>
        <p>
          <strong>La competencia en juego:</strong> Distinguir "estudio negativo" de
          "estudio inconclusivo"; entender que la potencia estadística importa tanto como
          el p-valor.
        </p>
      </Callout>

      <Callout type="warning" title="Caso 3 · La trampa del valor p en psicología clínica">
        <p>
          Un psicólogo lee que una terapia grupal reduce la ansiedad con p=0.04. Antes de
          recomendarla, examina el artículo completo:
        </p>
        <ul>
          <li>El grupo control estaba en <em>lista de espera</em> — un comparador muy débil que no controla la atención ni el efecto de expectativa.</li>
          <li>El seguimiento fue de solo 4 semanas. No hay datos de si el efecto persiste.</li>
          <li>La diferencia entre grupos en la escala de ansiedad fue de 2.1 puntos (IC 95%: 0.1–4.1) en una escala de 0 a 100. ¿Es eso clínicamente relevante?</li>
          <li>El tamaño muestral era de 34 pacientes. La significación estadística con n tan pequeño y un efecto borderline es inestable.</li>
        </ul>
        <p>
          Un p &lt; 0.05 no garantiza evidencia sólida si el diseño es débil, el tamaño del
          efecto es mínimo y el seguimiento es insuficiente. <strong>El pensamiento
          estadístico crítico protege a tus pacientes de intervenciones con evidencia
          insuficiente.</strong>
        </p>
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          QUÉ ES EL PENSAMIENTO ESTADÍSTICO
      ═══════════════════════════════════════════════════════════ */}

      <h2>Pensamiento estadístico</h2>

      <p>
        El error más extendido en la formación de profesionales de salud es confundir
        <em> saber estadística</em> con <em>saber calcular</em>. El software hace los
        cálculos. Lo que ningún software puede hacer por ti es:
      </p>

      {/* SVG — Los 4 verbos del pensamiento estadístico */}
      <svg
        viewBox="0 0 520 160"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", maxWidth: 520, display: "block", margin: "1rem auto" }}
        aria-label="Los cuatro verbos del pensamiento estadístico clínico"
      >
        <rect width="520" height="200" rx="10" fill="#f0f4f8" />
        <text x="260" y="20" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#2c3e50" fontWeight="bold">
          El pensamiento estadístico clínico en 4 verbos
        </text>
        {[
          { x: 65, y: 80, label1: "PREGUNTAR", label2: "¿Qué quiero saber?", color: "#2ecc71" },
          { x: 195, y: 80, label1: "INTERPRETAR", label2: "¿Qué dicen los datos?", color: "#3498db" },
          { x: 325, y: 80, label1: "CONTEXTUALIZAR", label2: "¿Que situación requiere cual enfoque?", color: "#9b59b6" },
          { x: 455, y: 80, label1: "COMUNICAR", label2: "¿Cómo transmitir la idea?", color: "#e67e22" },
        ].map(({ x, y, label1, label2, color }, i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="52" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
            <text x={x} y={y - 8} textAnchor="middle" fontSize="9.5" fontFamily="sans-serif" fill={color} fontWeight="bold">{label1}</text>
            <text x={x} y={y + 8} textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#444">{label2.split(" ").slice(0,3).join(" ")}</text>
            <text x={x} y={y + 20} textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#444">{label2.split(" ").slice(3).join(" ")}</text>
            {i < 3 && <line x1={x + 52} y1={y} x2={x + 74} y2={y} stroke="#bbb" strokeWidth="1.5" markerEnd="url(#arr)" />}
          </g>
        ))}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#bbb" />
          </marker>
        </defs>
        <text x="260" y="148" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#888" fontStyle="italic">
          El software hace los cálculos. El pensamiento estadístico hace la diferencia.
        </text>
      </svg>

      <DataTable
        headers={["Competencia del pensamiento estadístico", "Lo que significa en la práctica clínica"]}
        rows={[
          [
            "Preguntar con datos",
            "Formular preguntas clínicas precisas que puedan responderse con la información disponible. Ej: 'Entre mis pacientes con diabetes tipo 2 y HbA1c > 8%, ¿cuántos tienen registro de actividad educativa en los últimos 6 meses?'",
          ],
          [
            "Interpretar resultados",
            "Leer un p-valor, un OR o un IC 95% y traducirlo a implicaciones clínicas reales — no como fórmula, sino como significado.",
          ],
          [
            "Contextualizar la evidencia",
            "Preguntarse si los resultados de un ensayo realizado en hospitales universitarios de EE.UU. son aplicables a tu población, con sus características específicas.",
          ],
          [
            "Comunicar con honestidad",
            "Traducir hallazgos estadísticos a lenguaje que el paciente, el gestor o el equipo clínico puedan usar para tomar decisiones — sin exagerar ni minimizar la incertidumbre.",
          ],
        ]}
      />

      {/* SVG — Ciclo datos → análisis → acción */}
      <svg
        viewBox="0 0 520 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", maxWidth: 520, display: "block", margin: "1rem auto" }}
        aria-label="Ciclo datos, análisis y acción"
      >
        <rect width="520" height="200" rx="10" fill="#f8f9fb" />
        <text x="260" y="22" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#2c3e50" fontWeight="bold">
          El ciclo completo: de los datos a la acción
        </text>
        <circle cx="100" cy="105" r="55" fill="#eafaf1" stroke="#2ecc71" strokeWidth="2.5" />
        <text x="100" y="100" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#1e8449" fontWeight="bold">DATOS</text>
        <text x="100" y="114" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#555">Registros, escalas,</text>
        <text x="100" y="125" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#555">eventos, indicadores</text>
        <circle cx="260" cy="105" r="55" fill="#eaf4fb" stroke="#3498db" strokeWidth="2.5" />
        <text x="260" y="100" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#1a5276" fontWeight="bold">ANÁLISIS</text>
        <text x="260" y="114" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#555">Patrones, tendencias,</text>
        <text x="260" y="125" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#555">comparaciones, modelos</text>
        <circle cx="420" cy="105" r="55" fill="#fdf2f8" stroke="#8e44ad" strokeWidth="2.5" />
        <text x="420" y="100" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#6c3483" fontWeight="bold">ACCIÓN</text>
        <text x="420" y="114" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#555">Decisiones, intervenciones,</text>
        <text x="420" y="125" textAnchor="middle" fontSize="8.5" fontFamily="sans-serif" fill="#555">políticas, comunicación</text>
        <line x1="155" y1="105" x2="204" y2="105" stroke="#2ecc71" strokeWidth="2" markerEnd="url(#arr2)" />
        <line x1="314" y1="105" x2="364" y2="105" stroke="#3498db" strokeWidth="2" markerEnd="url(#arr3)" />
        <text x="260" y="186" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#888" fontStyle="italic">
          ↩ El resultado retroalimenta nuevas preguntas y nuevos datos
        </text>
        <defs>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#2ecc71" />
          </marker>
          <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3498db" />
          </marker>
        </defs>
      </svg>

      <p>
        Nightingale vivió este ciclo en carne propia: observó muertes (datos) → analizó
        causas con su diagrama de rosa (análisis) → convenció al Parlamento de reformar la
        sanidad (acción). <strong>Tú tienes acceso al mismo ciclo en tu práctica diaria</strong>,
        con las herramientas computacionales más poderosas de la historia al alcance de un
        clic.
      </p>

      {/* ═══════════════════════════════════════════════════════════
          PROCESO DE TRANSFORMACIÓN — EXPANDIDO
      ═══════════════════════════════════════════════════════════ */}

      <h2>De la ansiedad al empoderamiento: el mapa de la transformación</h2>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Nombrar y desactivar la ansiedad",
            description:
              "Reconocer que es una respuesta aprendida, no un rasgo de capacidad. La evidencia muestra que la ansiedad estadística se reduce significativamente cuando el aprendizaje se contextualiza en la práctica real del estudiante. El primer paso es identificar en cuál de las 6 dimensiones del STARS sientes más resistencia y trabajarla específicamente.",
          },
          {
            step: 2,
            title: "Reconocer los datos de tu entorno",
            description:
              "Antes de aprender técnicas estadísticas, identifica qué datos existen en tu práctica cotidiana: historiales clínicos, registros de enfermería, indicadores de calidad, escalas de valoración. ¿Qué preguntas podría responder ese material? El objetivo es pasar de ver 'tablas de números' a ver 'respuestas esperando ser descubiertas'.",
          },
          {
            step: 3,
            title: "Aprender a interrogar, no a calcular",
            description:
              "La competencia clave no es hacer cálculos: es formular preguntas estadísticas bien definidas. ¿Qué quiero comparar? ¿Cuál es mi unidad de análisis? ¿Cuánta variabilidad espero? ¿Qué diferencia sería clínicamente relevante? Estas preguntas guían el análisis mucho más que cualquier fórmula.",
          },
          {
            step: 4,
            title: "Usar herramientas, no padecerlas",
            description:
              "R, SPSS, Excel, Jamovi (gratuito y con interfaz visual) son calculadoras sofisticadas que ejecutan lo que tú decides. La competencia es entender qué análisis tiene sentido para tus datos y tu pregunta — no operar la herramienta desde cero. Jamovi (https://www.jamovi.org) está diseñado específicamente para usuarios sin formación estadística profunda.",
          },
          {
            step: 5,
            title: "Leer un artículo científico críticamente",
            description:
              "Aplicar el criterio estadístico básico al leer evidencia: ¿El diseño responde la pregunta? ¿El tamaño muestral es adecuado? ¿El efecto es estadística Y clínicamente relevante? ¿Se reportan intervalos de confianza? Este es el objetivo real del módulo: convertirte en un lector crítico, no en un calculador.",
          },
          {
            step: 6,
            title: "Comunicar resultados con claridad y honestidad",
            description:
              "La última competencia del ciclo es traducir hallazgos estadísticos a lenguaje comprensible para pacientes, colegas y gestores. Usar frecuencias naturales ('3 de cada 100 pacientes'), no solo porcentajes. Reportar siempre el riesgo absoluto junto al relativo. Ser honesto sobre la incertidumbre. Esta es la habilidad que diferencia al profesional de salud con criterio estadístico del resto.",
          },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          FLASHCARDS
      ═══════════════════════════════════════════════════════════ */}

      <h2>Conceptos fundamentales del módulo</h2>

      <Flashcard
        question="¿Qué es la ansiedad estadística y qué la distingue de 'ser malo en matemáticas'?"
        answer={
          <p>
            La ansiedad estadística es una reacción emocional específica ante el
            aprendizaje o uso de la estadística, documentada científicamente desde Cruise
            et al. (1985). Es distinta de la capacidad matemática: puede afectar a
            personas con excelente razonamiento numérico, y se origina principalmente en
            la forma en que la estadística fue enseñada — centrada en fórmulas sin
            contexto clínico relevante. <strong>Es una barrera aprendida, no una
            limitación innata</strong>, y se supera con exposición gradual a estadística
            contextualizada en la práctica real.
          </p>
        }
      />

      <Flashcard
        question="¿Qué es el pensamiento estadístico y por qué es más valioso que saber calcular?"
        answer={
          <p>
            El pensamiento estadístico es la capacidad de <strong>preguntar, interpretar,
            contextualizar y comunicar</strong> información cuantitativa en el contexto
            de la práctica clínica. Es más valioso que saber calcular porque el software
            realiza todos los cálculos: lo que no puede hacer el software es decidir qué
            pregunta tiene sentido clínico, si el diseño del estudio es adecuado, si el
            efecto es relevante para tus pacientes específicos, y cómo comunicar la
            incertidumbre a quien toma decisiones.
          </p>
        }
      />

      <Flashcard
        question="¿Qué tiene en común Florence Nightingale con un enfermero o farmacéutico de hoy que analiza su práctica?"
        answer={
          <p>
            Ambos trabajan con el mismo ciclo: observan la realidad clínica (datos),
            la analizan para encontrar patrones no visibles a simple vista, y usan esos
            hallazgos para argumentar cambios en la práctica. Nightingale demostró que
            el dato del entorno inmediato — en su caso, el registro de causas de muerte
            de los soldados bajo su cuidado — es el más poderoso para generar cambio,
            porque nadie puede refutarlo con el argumento "eso no aplica aquí".
            La diferencia con hoy: ella necesitaba construir sus propias herramientas.
            Tú tienes R, Jamovi, Excel y PubMed.
          </p>
        }
      />

      {/* ═══════════════════════════════════════════════════════════
          QUIZ
      ═══════════════════════════════════════════════════════════ */}

      <Quiz
        question="Una fisioterapeuta nota que sus pacientes con dolor lumbar crónico responden mejor al tratamiento en las sesiones de la mañana que en las de la tarde, pero no está segura si es una impresión subjetiva o una diferencia real. ¿Cuál sería el primer paso del pensamiento estadístico?"
        options={[
          {
            text: "Aplicar una prueba t de muestras independientes con los datos de los últimos 6 meses",
            correct: false,
          },
          {
            text: "Formular una pregunta precisa y verificar si existen registros que permitan medirla (antes de elegir ningún análisis estadístico)",
            correct: true,
          },
          {
            text: "Consultar a un estadístico antes de hacer nada con los datos",
            correct: false,
          },
          {
            text: "Ignorar la observación hasta tener más años de experiencia",
            correct: false,
          },
        ]}
        explanation="El pensamiento estadístico comienza con la pregunta, no con la técnica. Antes de elegir ningún análisis, la fisioterapeuta debe precisar: ¿Qué mide exactamente la 'respuesta al tratamiento'? ¿En qué escala? ¿Cuántos pacientes tiene en cada franja horaria? ¿Los grupos son comparables en otros aspectos (gravedad, comorbilidad)? Solo cuando la pregunta está bien definida tiene sentido elegir cómo analizarla. Esta secuencia — pregunta → datos → análisis → interpretación — es la esencia del pensamiento estadístico clínico."
      />

      {/* ═══════════════════════════════════════════════════════════
          REFERENCIAS — Estilo Módulo 8
      ═══════════════════════════════════════════════════════════ */}
      <div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
        <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpen className="h-6 w-6" /> Referencias y recursos para profundizar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

          {/* ── Columna 1 ── */}
          <div>
            <h3 className="font-semibold text-slate-800 flex items-center gap-1">
              <FlaskConical className="h-4 w-4 text-slate-600" /> Ansiedad estadística — Fundamentos y medición
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Cruise, R. J., Cash, R. W., & Bolton, D. L. (1985). Development and validation of an instrument to measure statistical anxiety.{" "}
                <em>Proceedings of the American Statistical Association, Section on Statistical Education</em>, 4, 92–97.
                <span className="block text-xs text-gray-500">
                  Artículo original que definió la ansiedad estadística y creó la escala STARS.
                </span>
              </li>
              <li>
                Hanna, D., Shevlin, M., & Dempster, M. (2008). The structure of the Statistics Anxiety Rating Scale: a confirmatory factor analysis using UK psychology students.{" "}
                <em>Personality and Individual Differences</em>, <em>45</em>, 68–74.{" "}
                <a href="https://doi.org/10.1016/j.paid.2008.03.001" target="_blank" rel="noopener noreferrer">
                  https://doi.org/10.1016/j.paid.2008.03.001
                </a>
                <span className="block text-xs text-gray-500">
                  Validación factorial de la escala; confirma su estructura en poblaciones europeas.
                </span>
              </li>
              <li>
                Chew, P. K. H., & Dillon, D. B. (2014). Statistics anxiety update: Refining the construct and recommendations for a new research agenda.{" "}
                <em>Perspectives on Psychological Science</em>, <em>9</em>(2), 196–208.{" "}
                <a href="https://doi.org/10.1177/1745691613518077" target="_blank" rel="noopener noreferrer">
                  https://doi.org/10.1177/1745691613518077
                </a>
                <span className="block text-xs text-gray-500">
                  Revisión del estado del arte; incluye recomendaciones pedagógicas basadas en evidencia.
                </span>
              </li>
              <li>
                Terry, J. et al. (2023). SMARVUS Dataset: International Multi-Centre Study of Statistics and Mathematics Anxieties.{" "}
                <em>Journal of Open Psychology Data</em>, <em>11</em>(1), 8.{" "}
                <a href="https://doi.org/10.5334/jopd.80" target="_blank" rel="noopener noreferrer">
                  https://doi.org/10.5334/jopd.80
                </a>
                <span className="block text-xs text-gray-500">
                  Dataset global con datos de ansiedad estadística de 43 países (acceso abierto).
                </span>
              </li>
            </ul>

            <h3 className="font-semibold text-slate-800 flex items-center gap-1 mt-5">
              <FlaskConical className="h-4 w-4 text-slate-600" /> Florence Nightingale — Estadística e historia
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Kopf, E. W. (1916). Florence Nightingale as statistician.{" "}
                <em>Journal of the American Statistical Association</em>, <em>15</em>(116), 388–404.{" "}
                <a href="https://www.jstor.org/stable/2965763" target="_blank" rel="noopener noreferrer">
                  https://www.jstor.org/stable/2965763
                </a>
                <span className="block text-xs text-gray-500">
                  Documentación las contribuciones estadísticas de Nightingale.
                </span>
              </li>
              <li>
                McDonald, L. (2001). <em>Florence Nightingale on public health care</em>. Wilfrid Laurier University Press.
                <span className="block text-xs text-gray-500">
                  Edición crítica de los escritos originales de Nightingale sobre salud pública y política sanitaria.
                </span>
              </li>
              <li>
                Small, H. (2024). <em>Florence Nightingale, mortality and health diagrams</em>. Visionary Press.
                <span className="block text-xs text-gray-500">
                  Análisis histórico detallado de los diagramas originales y su impacto en la visualización de datos médicos.
                </span>
              </li>
            </ul>
          </div>

          {/* ── Columna 2 ── */}
          <div>
            <h3 className="font-semibold text-slate-800 flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-slate-600" /> Estadística clínica e inalfabetismo estadístico
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Willems, S. et al. (2023). Illusion of knowledge in statistics among clinicians: evaluating the alignment between objective accuracy and subjective confidence.{" "}
                <em>Cognitive Research</em>, <em>8</em>, 35.{" "}
                <a href="https://doi.org/10.1186/s41235-023-00474-1" target="_blank" rel="noopener noreferrer">
                  https://doi.org/10.1186/s41235-023-00474-1
                </a>
                <span className="block text-xs text-gray-500">
                  898 clínicos evaluados: alta confianza, baja precisión estadística. El estudio más reciente y alarmante del campo.
                </span>
              </li>
              <li>
                Gigerenzer, G., & Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: frequency formats.{" "}
                <em>Psychological Review</em>, <em>102</em>(4), 684–704.{" "}
                <a href="https://doi.org/10.1037/0033-295X.102.4.684" target="_blank" rel="noopener noreferrer">
                  https://doi.org/10.1037/0033-295X.102.4.684
                </a>
                <span className="block text-xs text-gray-500">
                  Demuestra que los médicos razonan mejor con frecuencias naturales que con probabilidades — base del enfoque de este módulo.
                </span>
              </li>
              <li>
                Gigerenzer, G. (2002). <em>Reckoning with risk: Learning to live with uncertainty</em>. Penguin Books.
                <span className="block text-xs text-gray-500">
                  El mejor libro de divulgación sobre razonamiento estadístico; escrito para clínicos y no especialistas. Lectura altamente recomendada.
                </span>
              </li>
              <li>
                Spiegelhalter, D. (2019). <em>The art of statistics: Learning from data</em>. Pelican Books.
                <span className="block text-xs text-gray-500">
                  Introducción moderna y rigurosa a la estadística como herramienta de pensamiento crítico. Capítulo 1 es lectura obligatoria de este módulo.
                </span>
              </li>
            </ul>

            <h3 className="font-semibold text-slate-800 flex items-center gap-1 mt-5">
              <Wrench className="h-4 w-4 text-slate-600" /> Herramientas y recursos en línea
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>
                  <a href="https://www.jamovi.org" target="_blank" rel="noopener noreferrer">
                    Jamovi
                  </a>
                </strong>{" "}
                — Software estadístico gratuito con interfaz visual; sin necesidad de programar.
                <span className="block text-xs text-gray-500">
                  Ideal para primeros análisis clínicos. Instala los módulos <em>jmv</em> y <em>GAMLj</em> desde el propio programa.
                </span>
              </li>
              <li>
                <strong>
                  <a href="https://www.r-project.org" target="_blank" rel="noopener noreferrer">
                    R Project
                  </a>
                </strong>{" "}
                +{" "}
                <a href="https://posit.co/download/rstudio-desktop/" target="_blank" rel="noopener noreferrer">
                  RStudio (Posit)
                </a>
                <span className="block text-xs text-gray-500">
                  Ecosistema estándar en investigación en salud. Curva de aprendizaje mayor, capacidades ilimitadas. Se profundiza en módulos 5–8.
                </span>
              </li>
              <li>
                <strong>
                  <a href="https://www.ncbi.nlm.nih.gov/books/NBK430685/" target="_blank" rel="noopener noreferrer">
                    StatPearls (NCBI)
                  </a>
                </strong>
                <span className="block text-xs text-gray-500">
                  Módulos educativos de estadística clínica, en inglés, acceso libre, con ejemplos biomédicos actualizados.
                </span>
              </li>
              <li>
                <strong>
                  <a href="https://www.cochrane.org/authors/handbooks-and-manuals" target="_blank" rel="noopener noreferrer">
                    Cochrane Handbook (Cap. 9–15)
                  </a>
                </strong>
                <span className="block text-xs text-gray-500">
                  El manual de referencia para leer e interpretar evidencia sistemática en salud. Indispensable para el módulo de meta-análisis.
                </span>
              </li>
              <li>
                <strong>
                  <a href="https://www.scientificamerican.com/article/how-florence-nightingale-changed-data-visualization-forever/" target="_blank" rel="noopener noreferrer">
                    Scientific American (2020)
                  </a>
                </strong>{" "}
                — "How Florence Nightingale Changed Data Visualization Forever."
                <span className="block text-xs text-gray-500">
                  Artículo de divulgación basado en investigación histórica primaria. Lectura introductoria recomendada.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cierre motivacional */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            La ansiedad estadística no es una sentencia. Es el punto de partida de quienes
            deciden entender el lenguaje con el que se toman las decisiones que afectan a sus pacientes y su desempeño profesional.
            
          </p>
          <br/>
          <p className="text-sm font-medium text-indigo-600">
            Cada módulo de este curso suma una herramienta más a esa caja: de la ansiedad
            al empoderamiento, un concepto a la vez.
          </p>
        </div>
      </div>
    </div>
    </MathJaxContext>
  );
}
