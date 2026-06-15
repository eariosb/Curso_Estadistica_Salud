import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen } from "lucide-react";

export const meta = {
  title: "Sesgos en Investigación",
  subtitle: "La mirada crítica que protege a tus pacientes de la evidencia defectuosa",
  objective:
    "Identificar los sesgos más frecuentes en investigación sanitaria, entender el mecanismo causal del confounding, detectar el sesgo de publicación mediante el Funnel Plot, y aplicar herramientas estandarizadas de evaluación del riesgo de sesgo.",
};

/* ════════════════════════════════════════════════════════════════
   DIAGRAMA 1 — DAG del confounding (causal)
   Tres nodos: C arriba, E izquierda, D derecha.
   Dos flechas de C→E y C→D (en ámbar).
   Flecha real E→D (verde). Flecha espuria curva E⤳D (rojo punteado).
═════════════════════════════════════════════════════════════════ */
const DagConfounding = () => (
  <svg
    viewBox="0 0 640 270"
    role="img"
    overflow="visible"
    style={{ display: "block", margin: "1.2rem 0", width: "100%", height: "auto" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Diagrama causal del confounding: C causa E y D, generando una asociación espuria entre E y D</title>
    <desc>
      Tres nodos. C (variable de confusión) apunta a E (exposición) y a D (desenlace).
      Una flecha verde muestra la asociación real entre E y D. Una flecha roja punteada
      muestra la asociación espuria que aparece si no se controla C.
    </desc>
    <defs>
      <marker id="arrAmb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
      <marker id="arrGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#3B6D11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
      <marker id="arrRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#A32D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
    </defs>

    {/* Nodo C */}
    <rect x="220" y="14" width="200" height="52" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="0.5" />
    <text x="320" y="34" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans,sans-serif)" fontSize="14" fontWeight="500" fill="#633806">C — Variable de confusión</text>
    <text x="320" y="54" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans,sans-serif)" fontSize="11" fill="#854F0B">causa E y causa D independientemente</text>

    {/* Nodo E */}
    <rect x="30" y="160" width="190" height="52" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="0.5" />
    <text x="125" y="180" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans,sans-serif)" fontSize="14" fontWeight="500" fill="#0C447C">E — Exposición</text>
    <text x="125" y="200" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans,sans-serif)" fontSize="11" fill="#185FA5">factor de riesgo estudiado</text>

    {/* Nodo D */}
    <rect x="420" y="160" width="190" height="52" rx="8" fill="#E1F5EE" stroke="#0F6E56" strokeWidth="0.5" />
    <text x="515" y="180" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans,sans-serif)" fontSize="14" fontWeight="500" fill="#085041">D — Desenlace</text>
    <text x="515" y="200" textAnchor="middle" dominantBaseline="central" fontFamily="var(--font-sans,sans-serif)" fontSize="11" fill="#0F6E56">enfermedad / resultado</text>

    {/* C → E */}
    <line x1="265" y1="66" x2="170" y2="158" stroke="#BA7517" strokeWidth="1.5" markerEnd="url(#arrAmb)" />
    <text x="188" y="115" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#854F0B">asociado con E</text>

    {/* C → D */}
    <line x1="375" y1="66" x2="470" y2="158" stroke="#BA7517" strokeWidth="1.5" markerEnd="url(#arrAmb)" />
    <text x="452" y="115" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#854F0B">causa D</text>

    {/* E → D (asociación real, verde) */}
    <line x1="222" y1="186" x2="418" y2="186" stroke="#3B6D11" strokeWidth="2" markerEnd="url(#arrGreen)" />
    <text x="320" y="178" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#3B6D11">asociación real</text>

    {/* E ⤳ D (asociación espuria, rojo punteado curvo) */}
    <path d="M 125 158 Q 320 90 515 158" fill="none" stroke="#A32D2D" strokeWidth="1.5" strokeDasharray="7 4" markerEnd="url(#arrRed)" />
    <text x="320" y="116" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#A32D2D">asociación espuria (por C, sin ajustar)</text>

    {/* Leyenda */}
    <line x1="30" y1="240" x2="55" y2="240" stroke="#3B6D11" strokeWidth="2" />
    <text x="62" y="244" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#3B6D11">Asociación real (ajustada)</text>
    <line x1="210" y1="240" x2="235" y2="240" stroke="#A32D2D" strokeWidth="1.5" strokeDasharray="6 3" />
    <text x="242" y="244" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#A32D2D">Asociación espuria (sin ajustar)</text>
    <line x1="420" y1="240" x2="445" y2="240" stroke="#BA7517" strokeWidth="1.5" />
    <text x="452" y="244" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#854F0B">Efecto del confounder</text>
  </svg>
);

/* ════════════════════════════════════════════════════════════════
   DIAGRAMA 2 — Funnel Plot doble: simétrico vs asimétrico
   Eje X: tamaño del efecto (OR). Eje Y: precisión (tamaño muestral).
   Izquierda: puntos simétricos dentro del embudo.
   Derecha: puntos desplazados a la derecha, esquina inferior izquierda vacía.
═════════════════════════════════════════════════════════════════ */
const FunnelPlot = () => (
  <svg
    viewBox="0 0 640 330"
    role="img"
    overflow="visible"
    style={{ display: "block", margin: "1.2rem 0", width: "100%", height: "auto" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Funnel plot comparativo: embudo simétrico sin sesgo vs embudo asimétrico con sesgo de publicación</title>
    <desc>
      Dos gráficos de dispersión en formato embudo (funnel plot). El izquierdo muestra estudios
      distribuidos simétricamente, indicando ausencia de sesgo de publicación. El derecho muestra
      la esquina inferior izquierda vacía: faltan los estudios pequeños con resultados negativos,
      indicando sesgo de publicación.
    </desc>

    {/* Títulos */}
    <text x="160" y="20" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="13" fontWeight="500" fill="#2C2C2A">Sin sesgo de publicación</text>
    <text x="160" y="34" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="11" fill="#888780">Embudo simétrico</text>
    <text x="480" y="20" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="13" fontWeight="500" fill="#2C2C2A">Con sesgo de publicación</text>
    <text x="480" y="34" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="11" fill="#888780">Esquina inferior izquierda vacía</text>

    {/* ── PLOT IZQUIERDO ── */}
    <rect x="30" y="48" width="260" height="210" rx="4" fill="#F1EFE8" stroke="#D3D1C7" strokeWidth="0.5" />
    <line x1="30" y1="48" x2="30" y2="258" stroke="#B4B2A9" strokeWidth="0.8" />
    <line x1="30" y1="258" x2="290" y2="258" stroke="#B4B2A9" strokeWidth="0.8" />
    {/* Línea media */}
    <line x1="160" y1="58" x2="160" y2="258" stroke="#185FA5" strokeWidth="1" strokeDasharray="4 3" />
    {/* Embudo */}
    <polygon points="160,58 98,248 222,248" fill="none" stroke="#3B6D11" strokeWidth="1" strokeDasharray="4 3" />
    {/* Puntos — simétricos */}
    {[
      [160,68,7],[148,92,6],[172,90,6],[136,120,5],[160,118,5],[182,122,5],
      [128,154,4.5],[148,150,4.5],[162,148,4.5],[178,152,4.5],[196,156,4.5],
      [112,188,4],[130,184,4],[148,182,4],[162,180,4],[178,184,4],[194,188,4],[210,192,4],
      [100,220,3.5],[118,218,3.5],[136,214,3.5],[152,212,3.5],[166,210,3.5],
      [180,213,3.5],[196,217,3.5],[212,221,3.5],[226,225,3.5],
    ].map(([cx,cy,r],i)=>(
      <circle key={i} cx={cx} cy={cy} r={r} fill="#378ADD" fillOpacity="0.72" />
    ))}
    <text x="160" y="276" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#888780">Tamaño del efecto (OR/RR)</text>
    <text x="26" y="155" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="9" fill="#888780" transform="rotate(-90 26 155)">Precisión (n)</text>

    {/* ── PLOT DERECHO ── */}
    <rect x="350" y="48" width="260" height="210" rx="4" fill="#F1EFE8" stroke="#D3D1C7" strokeWidth="0.5" />
    <line x1="350" y1="48" x2="350" y2="258" stroke="#B4B2A9" strokeWidth="0.8" />
    <line x1="350" y1="258" x2="610" y2="258" stroke="#B4B2A9" strokeWidth="0.8" />
    <line x1="480" y1="58" x2="480" y2="258" stroke="#185FA5" strokeWidth="1" strokeDasharray="4 3" />
    <polygon points="480,58 418,248 542,248" fill="none" stroke="#3B6D11" strokeWidth="1" strokeDasharray="4 3" />
    {/* Puntos — desplazados a la derecha, izquierda vacía */}
    {[
      [480,68,7],[468,92,6],[496,90,6],[458,120,5],[480,118,5],[502,122,5],[516,126,5],
      [478,152,4.5],[494,150,4.5],[510,154,4.5],[526,158,4.5],[540,162,4.5],
      [484,188,4],[500,184,4],[516,182,4],[532,186,4],[548,190,4],[564,194,4],
      [496,218,3.5],[514,215,3.5],[530,212,3.5],[546,216,3.5],[562,220,3.5],[578,224,3.5],
    ].map(([cx,cy,r],i)=>(
      <circle key={i} cx={cx} cy={cy} r={r} fill="#378ADD" fillOpacity="0.72" />
    ))}

    {/* Zona vacía marcada */}
    <rect x="356" y="180" width="100" height="72" rx="4" fill="#FCEBEB" fillOpacity="0.8" stroke="#F09595" strokeWidth="0.8" strokeDasharray="4 3" />
    <text x="406" y="204" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#A32D2D">Estudios</text>
    <text x="406" y="218" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#A32D2D">ausentes</text>
    <text x="406" y="232" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#A32D2D">(en el cajón)</text>
    <text x="480" y="276" textAnchor="middle" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#888780">Tamaño del efecto (OR/RR)</text>

    {/* Leyenda inferior */}
    <circle cx="50" cy="300" r="5" fill="#378ADD" fillOpacity="0.72" />
    <text x="62" y="304" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#888780">Estudios publicados</text>
    <line x1="180" y1="300" x2="200" y2="300" stroke="#185FA5" strokeWidth="1" strokeDasharray="4 3" />
    <text x="206" y="304" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#888780">Efecto medio (línea de simetría)</text>
    <rect x="388" y="294" width="10" height="10" rx="2" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.8" strokeDasharray="3 2" />
    <text x="402" y="304" fontFamily="var(--font-sans,sans-serif)" fontSize="10" fill="#A32D2D">Zona de estudios ausentes</text>
  </svg>
);

export default function Lesson() {
  return (
    <div className="lesson-prose">

      {/* ════════════════════════════════════════════════════════════
          GANCHO
      ════════════════════════════════════════════════════════════ */}

      <h2>¿Por qué la primera impresión de un artículo puede ser la peor guía?</h2>
      <p>
        Imagina que lees un titular: "El café reduce un 30% el riesgo de diabetes tipo 2."
        Antes de cambiar tus recomendaciones nutricionales, conviene hacerse una pregunta:
        ¿es realmente el café, o las personas que toman café tienen en general estilos de vida
        más saludables? ¿El estudio incluyó solo a adultos jóvenes y sanos que se apuntaron
        voluntariamente? ¿Cuántos estudios similares que no encontraron efecto no llegaron
        a publicarse?
      </p>
      <p>
        Esas preguntas apuntan a algo concreto: los sesgos. Un <strong>sesgo</strong> es un
        error sistemático en el diseño, ejecución, análisis o publicación de un estudio que
        hace que los resultados no reflejen la realidad. Lo que distingue al sesgo del error
        aleatorio es su naturaleza <em>direccional</em>: no cancela con mayor tamaño muestral,
        sino que persiste y empuja las conclusiones siempre hacia el mismo lado.
      </p>
      <p>
        Este módulo te da las herramientas para detectar los sesgos más frecuentes
        antes de que lleguen a influir en tus decisiones clínicas.
      </p>

      <Callout type="info" title="Validez interna vs. validez externa — la distinción de base">
        <p>
          <strong>Validez interna:</strong> los resultados del estudio reflejan la realidad
          dentro de esa muestra, libre de sesgos. Es el primer requisito.<br /><br />
          <strong>Validez externa (generalización):</strong> los resultados son aplicables
          a otras poblaciones o contextos. Un estudio puede tener excelente validez interna
          pero escasa validez externa si la muestra fue tan restrictiva que no representa a
          tus pacientes.<br /><br />
          Un error habitual es juzgar la aplicabilidad de un estudio antes de haber evaluado
          su validez interna. El orden correcto es siempre: primero validez interna,
          después aplicabilidad.
        </p>
      </Callout>

      <Flashcard
        question="¿Por qué un estudio con p < 0.05 no garantiza que el resultado sea confiable?"
        answer={
          <p>
            El valor p mide la probabilidad de los datos bajo la hipótesis nula, no la
            ausencia de sesgo. Un estudio con sesgo de selección grave, confounding no
            controlado o sesgo de publicación puede producir un p &lt; 0.05 completamente
            espurio — y el software lo calculará sin ningún aviso. La{" "}
            <strong>validez metodológica es el primer filtro</strong>; la significancia
            estadística solo cobra sentido si el diseño del estudio es sólido.
          </p>
        }
      />

      {/* ════════════════════════════════════════════════════════════
          TAXONOMÍA DE SESGOS
      ════════════════════════════════════════════════════════════ */}

      <h2>Un mapa para orientarse: las cuatro familias de sesgo</h2>
      <p>
        Los sesgos en investigación clínica se agrupan en cuatro grandes familias según
        en qué fase del estudio aparecen y cómo distorsionan los resultados. Tenerlas
        claras permite hacer las preguntas correctas al leer un artículo.
      </p>

      <DataTable
        headers={["Familia", "Cuándo aparece", "Pregunta que debes hacer", "Consecuencia si no se controla"]}
        rows={[
          [
            "Selección",
            "Al reclutar o al asignar participantes",
            "¿Esta muestra representa a mis pacientes?",
            "Hallazgos no generalizables; efecto artificialmente inflado o atenuado",
          ],
          [
            "Información (clasificación)",
            "Al medir la exposición o el desenlace",
            "¿Todos los grupos fueron medidos con el mismo rigor?",
            "Asociaciones falsas o enmascaramiento de asociaciones reales",
          ],
          [
            "Confusión",
            "En el diseño o análisis",
            "¿Hay una tercera variable que explique la asociación?",
            "Causalidad falsa o atenuación de la asociación real",
          ],
          [
            "Publicación",
            "Al decidir qué resultados se publican",
            "¿Existen estudios negativos que no llegaron a publicarse?",
            "La literatura sobreestima sistemáticamente la eficacia de intervenciones",
          ],
        ]}
      />

      {/* ════════════════════════════════════════════════════════════
          SESGO DE SELECCIÓN
      ════════════════════════════════════════════════════════════ */}

      <h2>Sesgo de selección: cuando la muestra no es tu paciente</h2>
      <p>
        El sesgo de selección aparece cuando los criterios de inclusión y exclusión, o el
        proceso de reclutamiento, hacen que los participantes del estudio difieran
        sistemáticamente de la población para la que se pretende aplicar los resultados.
        No siempre es visible a primera vista — a menudo se esconde en la Tabla 1
        del artículo, donde se describen las características basales.
      </p>

      <Callout type="tip" title="Caso 1 · Programa de prevención de obesidad infantil (Salud Pública)">
        <p>
          Un programa comunitario se evalúa solo en familias que se apuntaron
          voluntariamente a una sesión informativa. Estas familias ya estaban más
          motivadas, tenían más recursos educativos y vivían en zonas con mejores
          infraestructuras deportivas.
          <br /><br />
          El efecto observado puede deberse a las características de las familias que
          participaron, no al programa en sí. Los resultados no son generalizables
          a familias con menos motivación o recursos — precisamente las que más
          necesitarían la intervención.
          <br /><br />
          <strong>Señal de alerta en el artículo:</strong> participantes 100%
          voluntarios, sin grupo de comparación por aleatorización, características
          basales muy favorables respecto a la población general.
        </p>
      </Callout>

      <Callout type="tip" title="Caso 2 · Sesgo de supervivencia en terapia de abandono del tabaco (Psicología)">
        <p>
          Un ensayo evalúa terapia grupal para dejar de fumar. A los 6 meses, el 40%
          de quienes <em>completaron</em> la terapia siguen sin fumar. Suena bien.
          Pero el 55% de los inscritos abandonó en las primeras 4 semanas — y los que
          abandonaron eran, en promedio, los que fumaban más y tenían mayor dependencia.
          <br /><br />
          El análisis correcto es por <strong>Intención de Tratar (ITT)</strong>:
          de todos los inscritos, el 40% × 45% = 18% lograron abstinencia. La cifra
          reportada del 40% sobreestima la eficacia casi en 2.2×.
          <br /><br />
          Este es el sesgo de supervivencia (o de "completadores"): solo se analizan
          quienes terminaron, ignorando que los que abandonaron suelen ser los que peor
          responden.
        </p>
      </Callout>

      <Callout type="tip" title="Caso 3 · Sesgo de tiempo inmortal en estudios de medicamentos (Farmacoepidemiología)">
        <p>
          En un estudio observacional sobre estatinas y mortalidad cardiovascular,
          los investigadores definen como "usuarios de estatinas" a quienes recibieron
          al menos una prescripción en el primer año de seguimiento. Pero si el evento
          ocurre en las primeras semanas, antes de que el paciente recoja la receta,
          ese período se clasifica incorrectamente como "tiempo expuesto".
          <br /><br />
          El resultado: los usuarios de estatinas parecen tener menos eventos porque
          matemáticamente <em>no podían</em> morir durante el período anterior a la
          primera prescripción. Se llama "tiempo inmortal" porque durante ese lapso
          el paciente no puede tener el evento en el grupo de exposición, pero sí
          podría haberlo en el comparador.
          <br /><br />
          Una revisión de la literatura encontró que el sesgo de tiempo inmortal
          inflaba artificialmente los beneficios observados de estatinas, antidiabéticos
          y otros fármacos en estudios de bases de datos clínicas.
        </p>
        <p>
          <strong>📖 Referencia:</strong>{" "}
          Acton, E. K. & Willis, A. W. (2023). "Core concepts in pharmacoepidemiology:
          Key biases arising in pharmacoepidemiologic studies."{" "}
          <em>Pharmacoepidemiology and Drug Safety</em>, 32(1), 9–18.{" "}
          <a href="https://doi.org/10.1002/pds.5547" target="_blank" rel="noopener noreferrer">
            doi:10.1002/pds.5547
          </a>
        </p>
      </Callout>

      {/* ════════════════════════════════════════════════════════════
          SESGO DE INFORMACIÓN
      ════════════════════════════════════════════════════════════ */}

      <h2>Sesgo de información: lo que mediste no es lo que creías medir</h2>
      <p>
        El sesgo de información (o de clasificación) ocurre cuando la forma en que se
        recoge la información sobre la exposición o el desenlace no es igualmente precisa
        en todos los grupos de comparación. Puede ser diferencial — distinto entre grupos —
        o no diferencial — igualmente impreciso en todos, pero igual de problemático.
      </p>

      <DataTable
        headers={["Tipo", "Mecanismo", "Ejemplo clínico", "Dirección del sesgo"]}
        rows={[
          [
            "Sesgo de recuerdo (recall bias)",
            "Las personas con el desenlace recuerdan mejor las exposiciones pasadas que las personas sin el desenlace",
            "Madres de niños con malformaciones congénitas reportan más exposición a medicamentos en el embarazo que madres de niños sanos, aunque la exposición real sea similar",
            "Sobreestima la asociación exposición-desenlace",
          ],
          [
            "Sesgo de detección diferencial",
            "El desenlace se busca o diagnostica con mayor intensidad en el grupo expuesto",
            "Los pacientes en un nuevo programa de seguimiento intensivo reciben más diagnósticos de hipertensión no porque tengan más hipertensión, sino porque se mide más",
            "Sobreestima la incidencia en el grupo expuesto",
          ],
          [
            "Sesgo de clasificación errónea",
            "La medición del resultado tiene errores de clasificación que no son iguales en todos los grupos",
            "Usar registros administrativos para clasificar diagnósticos de EPOC cuando la calidad del registro varía según el hospital",
            "Puede ir en cualquier dirección según si es diferencial o no",
          ],
        ]}
      />

      {/* ════════════════════════════════════════════════════════════
          CONFOUNDING — con DAG
      ════════════════════════════════════════════════════════════ */}

      <h2>Confounding: la variable oculta que falsifica la historia</h2>
      <p>
        El confounding es, quizás, el sesgo más complejo de detectar y el más frecuente en
        estudios observacionales. Una variable de confusión (confounder) es aquella que:
        está asociada con la exposición, causa el desenlace de forma independiente,
        y no es un intermediario en la cadena causal entre exposición y desenlace.
      </p>
      <p>
        El clásico ejemplo: el consumo de café (<em>E</em>) parece asociarse con cáncer
        de pulmón (<em>D</em>). Pero los bebedores de café tienden a fumar más (<em>C</em>).
        El tabaquismo es el verdadero responsable del cáncer de pulmón. Si no controlas
        el tabaquismo, la asociación café-cáncer parece real pero es espuria.
      </p>

      <DagConfounding />

      <Callout type="info" title="Los tres criterios para identificar un confounder">
        <p>
          Para que una variable sea un confounder debe cumplir simultáneamente tres condiciones:
          <br /><br />
          1. <strong>Estar asociada con la exposición</strong> (sin ser causada por ella).<br />
          2. <strong>Ser causa independiente del desenlace</strong> (en los grupos expuesto y no expuesto).<br />
          3. <strong>No ser un intermediario</strong> en la cadena causal entre exposición y desenlace.
          <br /><br />
          Si una variable cumple las tres condiciones y no la controlas, el efecto que mides
          es una mezcla del efecto real de la exposición y del efecto del confounder.
          Esto se llama "confounding residual" cuando el ajuste es incompleto.
        </p>
      </Callout>

      <Callout type="tip" title="Caso 4 · Confounding por indicación en farmacología clínica">
        <p>
          Un estudio observacional compara mortalidad en pacientes con insuficiencia
          cardíaca que reciben betabloqueantes versus los que no. El grupo sin
          betabloqueantes tiene mayor mortalidad — ¿los betabloqueantes son beneficiosos?
          <br /><br />
          Posiblemente sí, pero hay un problema: a los pacientes más graves y con más
          comorbilidades se les suele <em>no</em> prescribir betabloqueantes por contraindicaciones.
          Este es el <strong>confounding por indicación</strong>: el fármaco no se asigna
          aleatoriamente — se prescribe precisamente a los pacientes que se espera que
          más se beneficien o que pueden tolerarlo. Los grupos comparados difieren
          sistemáticamente en gravedad basal.
          <br /><br />
          <strong>Métodos de control:</strong> ajuste multivariado por índice de comorbilidades,
          propensity score matching, o — el más robusto — aleatorización.
        </p>
      </Callout>

      <Callout type="tip" title="Caso 5 · Healthy user bias en estudios de suplementos (Nutrición)">
        <p>
          Numerosos estudios observacionales sugieren que los consumidores de vitamina E
          tienen menor riesgo cardiovascular. Pero los ensayos clínicos aleatorizados
          no confirmaron el beneficio. ¿Por qué?
          <br /><br />
          Las personas que toman suplementos de vitamina E son, en promedio, personas
          más conscientes de su salud: hacen más ejercicio, fuman menos, consumen más
          frutas y verduras, tienen mejores controles médicos. Su menor riesgo cardiovascular
          se debe a su estilo de vida general, no a la vitamina E. Este es el{" "}
          <strong>healthy user bias</strong>, una forma de confounding por indicación
          especialmente frecuente en estudios de suplementos y medicamentos de venta libre.
        </p>
      </Callout>

      <DataTable
        headers={["Método de control", "Fase de aplicación", "Ventaja", "Limitación"]}
        rows={[
          [
            "Aleatorización",
            "Diseño del estudio",
            "Controla confounders conocidos Y desconocidos",
            "Solo posible en ensayos; no siempre ético o factible",
          ],
          [
            "Restricción",
            "Diseño (selección de participantes)",
            "Simple: solo incluyes personas homogéneas en el confounder",
            "Reduce la generalización; no controla variables no medidas",
          ],
          [
            "Emparejamiento (matching)",
            "Diseño (estudios caso-control)",
            "Equilibra el confounder entre casos y controles",
            "Solo controla las variables por las que se empareja; puede sobreajustar",
          ],
          [
            "Ajuste multivariado",
            "Análisis estadístico",
            "Controla múltiples confounders simultáneamente",
            "Solo controla los confounders medidos; asume modelo correcto",
          ],
          [
            "Propensity score",
            "Análisis estadístico",
            "Reduce dimensionalidad; bueno para muchos confounders",
            "Tampoco controla confounders no medidos",
          ],
        ]}
      />

      <Callout type="warning" title="📖 Referencias — Confounding en investigación clínica">
        <p>
          <strong>VanderWeele, T. J. & Shpitser, I. (2013).</strong> "On the definition of a
          confounder." <em>Annals of Statistics</em>, 41(1), 196–220.{" "}
          <a href="https://doi.org/10.1214/12-AOS1058" target="_blank" rel="noopener noreferrer">
            doi:10.1214/12-AOS1058
          </a>
          <br /><br />
          <strong>Kyriacou, D. N. & Lewis, R. J. (2016).</strong> "Confounding by indication
          in clinical research." <em>JAMA</em>, 316(17), 1818–1819.{" "}
          <a href="https://doi.org/10.1001/jama.2016.16435" target="_blank" rel="noopener noreferrer">
            doi:10.1001/jama.2016.16435
          </a>
          <br /><br />
          <strong>Catalogue of Bias — Confounding:</strong>{" "}
          <a href="https://catalogofbias.org/biases/confounding/" target="_blank" rel="noopener noreferrer">
            catalogofbias.org/biases/confounding
          </a>
        </p>
      </Callout>

      {/* ════════════════════════════════════════════════════════════
          SESGO DE PUBLICACIÓN Y FUNNEL PLOT
      ════════════════════════════════════════════════════════════ */}

      <h2>Sesgo de publicación: el conocimiento que nunca llegó a imprimirse</h2>
      <p>
        Existe un sesgo estructural en la ciencia biomédica: los estudios con resultados
        positivos o novedosos se publican mucho más fácilmente que los estudios negativos
        o que replican hallazgos previos. Turner et al. (2008) analizaron todos los ensayos
        de antidepresivos registrados ante la FDA: el 31% de los estudios nunca fue
        publicado. De los publicados, el 91% mostraban resultados positivos; del total
        registrado (incluyendo inéditos), solo el 51% eran positivos. La diferencia define
        la distorsión.
      </p>
      <p>
        Cuando esos estudios inéditos se incluyen en un metaanálisis, el efecto observado
        cae drásticamente o desaparece. Los profesionales que leen el metaanálisis publicado
        están tomando decisiones clínicas basadas en una fracción sesgada de la evidencia.
      </p>

      <Callout type="warning" title="El caso de los antidepresivos: la evidencia que cambia según los datos disponibles">
        <p>
          Kirsch et al. (2008) realizaron un metaanálisis de todos los ensayos de
          antidepresivos registrados en la FDA, incluyendo los no publicados obtenidos
          mediante la Ley de Libertad de Información. Los resultados publicados mostraban
          un efecto significativo. Pero cuando se incluían los datos no publicados,
          el efecto para los pacientes con depresión leve a moderada era clínicamente
          irrelevante según los criterios de la guía NICE (diferencia inferior a 3 puntos
          en la escala HRSD de 17 ítems).
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Turner, E. H. et al. (2008). "Selective publication of antidepressant trials and
          its influence on apparent efficacy." <em>New England Journal of Medicine</em>,
          358(3), 252–260.{" "}
          <a href="https://doi.org/10.1056/NEJMsa065779" target="_blank" rel="noopener noreferrer">
            doi:10.1056/NEJMsa065779
          </a>
        </p>
      </Callout>

      <h3>El Funnel Plot: ver el sesgo con tus ojos</h3>
      <p>
        El Funnel Plot es la herramienta visual estándar para detectar sesgo de publicación
        en un metaanálisis. Cada punto representa un estudio incluido. El eje X muestra el
        tamaño del efecto (OR, RR, diferencia de medias); el eje Y, la precisión del estudio
        — que aumenta con el tamaño muestral. Los estudios grandes, más precisos, están
        arriba; los pequeños, más imprecisos, abajo.
      </p>
      <p>
        En ausencia de sesgo, los estudios pequeños producen estimaciones más dispersas
        pero centradas alrededor del mismo efecto real que los grandes — el resultado es
        un embudo simétrico. Cuando los estudios pequeños con resultados negativos
        no se publican, la esquina inferior izquierda queda vacía: el embudo pierde
        su lado izquierdo y el efecto medio se sobreestima.
      </p>

      <FunnelPlot />

      <Callout type="info" title="El test de Egger: del ojo a la estadística">
        <p>
          La evaluación visual del Funnel Plot es subjetiva, especialmente con pocos estudios.
          El <strong>test de Egger</strong> (1997) formaliza esta detección mediante
          una regresión lineal del efecto estandarizado sobre su precisión. Un intercepto
          estadísticamente diferente de cero sugiere asimetría sistemática. Sin embargo,
          la asimetría del Funnel Plot no siempre es sesgo de publicación: también puede
          deberse a heterogeneidad real entre estudios o a diferencias en la calidad
          metodológica. Por eso, es un indicador, no una prueba definitiva.
          <br /><br />
          <strong>Regla práctica de Cochrane:</strong> el Funnel Plot tiene poder estadístico
          útil solo cuando hay <em>al menos 10 estudios</em> en el metaanálisis. Con menos,
          el resultado es poco fiable.
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Egger, M. et al. (1997). "Bias in meta-analysis detected by a simple, graphical test."{" "}
          <em>BMJ</em>, 315(7109), 629–634.{" "}
          <a href="https://doi.org/10.1136/bmj.315.7109.629" target="_blank" rel="noopener noreferrer">
            doi:10.1136/bmj.315.7109.629
          </a>
        </p>
      </Callout>

      <Callout type="info" title="El método Trim and Fill: corregir el sesgo estimado">
        <p>
          Ante un Funnel Plot asimétrico, el método <strong>Trim and Fill</strong>
          (Duval & Tweedie, 2000) estima cuántos estudios podrían faltar, los "añade"
          como hipotéticos al lado vacío del embudo, y recalcula el efecto ajustado.
          No recupera los estudios perdidos realmente, pero da una estimación conservadora
          de cuánto podría cambiar el resultado si existieran. Si el efecto ajustado
          sigue siendo significativo, la conclusión es más robusta al sesgo de publicación.
        </p>
      </Callout>

      {/* ════════════════════════════════════════════════════════════
          HERRAMIENTAS COCHRANE
      ════════════════════════════════════════════════════════════ */}

      <h2>Herramientas estandarizadas de evaluación del riesgo de sesgo</h2>
      <p>
        Leer un artículo con ojo crítico no depende solo de intuición. Existen instrumentos
        validados que estructuran la evaluación del riesgo de sesgo dominio por dominio,
        forzando al revisor a documentar cada juicio con evidencia del propio artículo.
      </p>

      <DataTable
        headers={["Herramienta", "Para qué tipo de estudio", "URL oficial", "Dominios evaluados"]}
        rows={[
          [
            "RoB 2 (Cochrane)",
            "Ensayos clínicos aleatorizados",
            "methods.cochrane.org/bias/rob-2",
            "Proceso de aleatorización · Desviaciones del tratamiento · Datos faltantes · Medición del desenlace · Selección del resultado",
          ],
          [
            "ROBINS-I (Cochrane)",
            "Estudios observacionales de intervenciones",
            "methods.cochrane.org/robins-i",
            "Confounding · Selección de participantes · Clasificación de la intervención · Desviaciones · Datos faltantes · Medición del desenlace · Selección del resultado",
          ],
          [
            "QUADAS-2",
            "Estudios de exactitud diagnóstica",
            "www.quadas.org",
            "Selección de pacientes · Prueba índice · Prueba de referencia · Flujo y tiempo",
          ],
          [
            "Newcastle-Ottawa Scale",
            "Estudios de cohortes y caso-control",
            "ohri.ca/programs/clinical_epidemiology/oxford.asp",
            "Selección · Comparabilidad · Desenlace (cohortes) o Exposición (caso-control)",
          ],
        ]}
      />

      <Callout type="warning" title="📖 Referencias — Herramientas de riesgo de sesgo">
        <p>
          <strong>Sterne, J. A. C. et al. (2019).</strong> "RoB 2: a revised tool for
          assessing risk of bias in randomised trials." <em>BMJ</em>, 366, l4898.{" "}
          <a href="https://doi.org/10.1136/bmj.l4898" target="_blank" rel="noopener noreferrer">
            doi:10.1136/bmj.l4898
          </a>
          <br /><br />
          <strong>Sterne, J. A. C. et al. (2016).</strong> "ROBINS-I: a tool for assessing
          risk of bias in non-randomised studies of interventions." <em>BMJ</em>, 355, i4919.{" "}
          <a href="https://doi.org/10.1136/bmj.i4919" target="_blank" rel="noopener noreferrer">
            doi:10.1136/bmj.i4919
          </a>
          <br /><br />
          <strong>Catalogue of Bias (Oxford):</strong>{" "}
          <a href="https://catalogofbias.org" target="_blank" rel="noopener noreferrer">
            catalogofbias.org
          </a>{" "}
          — Repositorio de más de 70 sesgos documentados, con definición, mecanismo y ejemplo clínico.
        </p>
      </Callout>

      {/* ════════════════════════════════════════════════════════════
          PROCESO — EVALUAR UN ARTÍCULO
      ════════════════════════════════════════════════════════════ */}

      <h2>Cómo evaluar el riesgo de sesgo en un artículo: el proceso paso a paso</h2>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Lee la sección de Métodos antes de los Resultados",
            description:
              "El abstract puede ocultar o minimizar problemas metodológicos. Lee Métodos primero: criterios de inclusión y exclusión, diseño, aleatorización (si la hay), cegamiento, y seguimiento. Solo después de entender cómo se hizo el estudio tiene sentido interpretar qué encontró.",
          },
          {
            step: 2,
            title: "Analiza la Tabla 1: ¿quiénes son los participantes?",
            description:
              "La Tabla 1 describe las características basales de los grupos. Pregúntate: ¿se parecen a mis pacientes? ¿Hay diferencias importantes entre los grupos al inicio (posible fallo de aleatorización o confounding no controlado)? ¿Hay grupos muy homogéneos que sugieran criterios de exclusión demasiado restrictivos?",
          },
          {
            step: 3,
            title: "Evalúa el flujograma CONSORT: ¿qué pasó con todos los participantes?",
            description:
              "El flujograma muestra cuántos participantes entraron, cuántos se asignaron a cada grupo, cuántos completaron el seguimiento y cuántos se excluyeron de cada análisis. Una pérdida >20% es señal de alerta. Verifica siempre si el análisis fue por Intención de Tratar (ITT) — la única forma de preservar las ventajas de la aleatorización.",
          },
          {
            step: 4,
            title: "Busca el registro del estudio y compara con los desenlaces publicados",
            description:
              "Verifica si el estudio fue preregistrado en ClinicalTrials.gov u OSF. Compara los desenlaces primarios del protocolo con los del artículo. Si el desenlace primario registrado no fue el que se reportó como principal, puede ser HARKing o outcome switching — formas de sesgo de publicación interno.",
          },
          {
            step: 5,
            title: "Si es un metaanálisis: busca el Funnel Plot e interpreta la asimetría",
            description:
              "Un Funnel Plot asimétrico no invalida automáticamente el metaanálisis, pero exige cautela. Verifica si los autores aplicaron el test de Egger o Begg, y si realizaron análisis Trim and Fill. Si no lo hicieron, las conclusiones deben interpretarse con reserva.",
          },
          {
            step: 6,
            title: "Reflexiona sobre la aplicabilidad a tu contexto",
            description:
              "¿La muestra del estudio representa a tus pacientes en características demográficas, gravedad, comorbilidades y contexto sanitario? Un estudio internamente válido puede ser de escasa aplicabilidad si se realizó en un entorno muy diferente al tuyo. No toda evidencia de calidad es evidencia relevante para tu práctica.",
          },
        ]}
      />

      {/* ════════════════════════════════════════════════════════════
          ERRORES FRECUENTES — TABLA
      ════════════════════════════════════════════════════════════ */}

      <h2>Los errores más frecuentes al leer un artículo — y cómo corregirlos</h2>

      <DataTable
        headers={["Error frecuente", "Por qué es un problema", "Consejo práctico"]}
        rows={[
          [
            "Confiar solo en el abstract",
            "El abstract selecciona los resultados más favorables; las limitaciones y los datos de seguimiento suelen estar enterrados en el texto completo",
            "Lee siempre Métodos y Tabla 1 completos. El abstract es un resumen de marketing, no un sustituto del artículo",
          ],
          [
            "Ignorar las pérdidas al seguimiento",
            "Si el 30% de los participantes abandonó y no se sabe qué les pasó, el análisis disponible puede ser muy diferente del resultado en toda la muestra",
            "Calcula el 'análisis de peor escenario': ¿qué pasaría si todos los que abandonaron hubieran empeorado? Si el resultado sigue siendo significativo, es robusto",
          ],
          [
            "Interpretar p < 0.05 sin evaluar el sesgo",
            "Un sesgo de selección grave puede producir un p muy pequeño completamente espurio. La significación estadística no sustituye la validez metodológica",
            "El orden correcto siempre es: diseño → riesgo de sesgo → tamaño del efecto → significación estadística",
          ],
          [
            "Pasar por alto el Funnel Plot en metaanálisis",
            "La asimetría del embudo señala que el efecto combinado puede estar inflado por estudios negativos no publicados",
            "Búscalo activamente. Si no está, es una limitación que debes mencionar al aplicar las conclusiones",
          ],
          [
            "Ignorar si los grupos basales eran comparables",
            "Si los grupos difieren en la Tabla 1 en variables relevantes, puede haber confounding no ajustado que explique los resultados",
            "Compara sistemáticamente los grupos en la Tabla 1 para detectar diferencias que podrían confundir la asociación",
          ],
        ]}
      />

      {/* ════════════════════════════════════════════════════════════
          FLASHCARDS
      ════════════════════════════════════════════════════════════ */}

      <h2>Conceptos clave para consolidar</h2>

      <Flashcard
        question="¿Cuál es la diferencia entre sesgo aleatorio y sesgo sistemático, y por qué importa para el tamaño muestral?"
        answer={
          <p>
            El <strong>error aleatorio</strong> es impredecible, va en cualquier dirección y
            se reduce con mayor tamaño muestral — más observaciones promedian las fluctuaciones
            aleatorias. El <strong>sesgo sistemático</strong> siempre empuja los resultados
            en la misma dirección: aumentar el tamaño muestral no lo corrige, sino que en
            estudios grandes puede hacer que un sesgo pequeño se vuelva estadísticamente
            significativo. Un estudio con n=50.000 y sesgo de selección grave puede producir
            un p &lt; 0.0001 completamente inválido. El tamaño muestral no es antídoto contra
            el sesgo metodológico.
          </p>
        }
      />

      <Flashcard
        question="¿Cuándo está justificado NO ajustar por una variable en un análisis multivariado?"
        answer={
          <p>
            Cuando esa variable es un <strong>mediador</strong> — es decir, está en la cadena
            causal entre la exposición y el desenlace. Por ejemplo, si estudias si fumar
            causa infarto de miocardio, no deberías ajustar por ateroesclerosis porque ésta
            es <em>el mecanismo</em> por el que fumar causa el infarto. Ajustar por un
            mediador eliminaría el efecto que quieres medir. La distinción confounder
            vs. mediador requiere conocimiento clínico del mecanismo, no solo estadístico.
          </p>
        }
      />

      <Flashcard
        question="¿Por qué el Funnel Plot con menos de 10 estudios es poco útil para detectar sesgo de publicación?"
        answer={
          <p>
            La potencia estadística del test de Egger y la inspección visual del Funnel Plot
            dependen del número de estudios. Con 5 estudios, la variabilidad natural entre
            estudios puede producir asimetría sin que haya sesgo de publicación real —
            y viceversa: el sesgo puede existir pero no detectarse porque hay pocos puntos.
            La guía Cochrane recomienda explícitamente no usar el Funnel Plot como prueba
            de sesgo de publicación cuando el metaanálisis incluye menos de 10 estudios.
          </p>
        }
      />

      {/* ════════════════════════════════════════════════════════════
          QUIZZES
      ════════════════════════════════════════════════════════════ */}

      <Quiz
        question="En un metaanálisis observas un Funnel Plot con clara asimetría: los estudios pequeños con resultados negativos o neutros están ausentes en la esquina inferior izquierda. ¿Cuál es la interpretación más razonable?"
        options={[
          { text: "El tratamiento es claramente efectivo porque el efecto promedio es grande y significativo", correct: false },
          { text: "Los estudios pequeños son siempre de baja calidad y deben ignorarse en el análisis", correct: false },
          { text: "Probablemente existe sesgo de publicación; la estimación del efecto combinado puede estar sobreestimada", correct: true },
          { text: "La asimetría es esperable y no afecta las conclusiones del metaanálisis", correct: false },
        ]}
        explanation="La esquina inferior izquierda vacía indica que los estudios pequeños con resultados negativos o neutros no llegaron a publicarse. El efecto combinado del metaanálisis refleja solo los estudios publicados — sesgados hacia resultados positivos — y probablemente sobreestima el efecto real. La conclusión correcta es que la estimación del beneficio debe tomarse con cautela y buscar registros de estudios completos para una imagen más equilibrada."
      />

      <Quiz
        question="Una nutricionista lee que 'los consumidores habituales de omega-3 tienen un 25% menos de riesgo de depresión mayor'. El estudio es una cohorte observacional. Antes de recomendar suplementos, identifica la principal amenaza metodológica:"
        options={[
          { text: "El sesgo de recuerdo, porque los participantes pueden no recordar bien su consumo de omega-3", correct: false },
          { text: "El confounding por estilo de vida saludable (healthy user bias): los consumidores de omega-3 tienden a tener dietas más equilibradas, hacer más ejercicio y tener mejor nivel socioeducativo", correct: true },
          { text: "El sesgo de tiempo inmortal, porque el estudio no ajustó el período previo al inicio del consumo", correct: false },
          { text: "El sesgo de publicación, porque los estudios negativos sobre omega-3 no se publican", correct: false },
        ]}
        explanation="El healthy user bias es la amenaza principal aquí. Las personas que consumen suplementos de forma habitual son sistemáticamente diferentes — tienden a cuidar su salud más en general, con mejor dieta, más ejercicio y más acceso a atención médica. Esta constelación de factores protege contra la depresión independientemente del omega-3. Múltiples ensayos clínicos aleatorizados de omega-3 en depresión han dado resultados mixtos, precisamente porque la aleatorización controla este confounding que los estudios observacionales no pueden controlar completamente."
      />

      {/* ════════════════════════════════════════════════════════════
          RECURSOS Y BIBLIOGRAFÍA
      ════════════════════════════════════════════════════════════ */}

      <div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
        <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpen className="h-6 w-6" /> Recursos Curados para Profundizar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-semibold text-slate-800">📖 Lecturas Fundamentales</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Kamangar, F. (2012). <em>Confounding variables in epidemiologic studies: Basics and beyond.</em> Archives of Iranian Medicine, 15(8), 508–516.
                <span className="block text-xs text-gray-500">Acceso libre en ResearchGate. Explicación accesible y completa del confounding para no estadísticos.</span>
              </li>
              <li>
                Higgins, J. P. T., Thomas, J., Chandler, J. et al. (Eds.). <em>Cochrane Handbook for Systematic Reviews of Interventions</em> (versión actual).
                <span className="block text-xs text-gray-500">Capítulo 7 (Assessing risk of bias) es la referencia metodológica más completa y de acceso libre.</span>
              </li>
              <li>
                Hernán, M. A. & Robins, J. M. (2020). <em>Causal Inference: What If.</em> Chapman & Hall/CRC.
                <span className="block text-xs text-gray-500">Descarga gratuita online. Texto de referencia para entender confounding, DAGs y sesgos desde la inferencia causal.</span>
              </li>
              <li>
                Greenhalgh, T. (2019). <em>How to Read a Paper: The Basics of Evidence-Based Medicine</em> (6ª ed.). BMJ Books / Wiley.
                <span className="block text-xs text-gray-500">Guía práctica y muy legible para evaluar críticamente artículos clínicos.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Catalogue of Bias (Oxford):{" "}
                <a href="https://catalogofbias.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  catalogofbias.org
                </a>
                <span className="block text-xs text-gray-500">Repositorio de más de 70 sesgos documentados, con definición, mecanismo y ejemplo clínico real.</span>
              </li>
              <li>
                EQUATOR Network:{" "}
                <a href="https://www.equator-network.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  equator-network.org
                </a>
                <span className="block text-xs text-gray-500">Red global de guías de reporte (CONSORT, STROBE, PRISMA) para todos los tipos de estudio en salud.</span>
              </li>
              <li>
                Cochrane Training — Handbook online:{" "}
                <a href="https://training.cochrane.org/handbook/current/chapter-07" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  training.cochrane.org/handbook
                </a>
                <span className="block text-xs text-gray-500">Capítulo 7, sobre evaluación del riesgo de sesgo en revisiones sistemáticas.</span>
              </li>
              <li>
                Herramienta RoB 2 online:{" "}
                <a href="https://www.riskofbias.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  riskofbias.info
                </a>
                <span className="block text-xs text-gray-500">Plataforma oficial para aplicar RoB 2 y ROBINS-I paso a paso.</span>
              </li>
              <li>
                CONSORT Statement:{" "}
                <a href="https://www.consort-statement.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  consort-statement.org
                </a>
                <span className="block text-xs text-gray-500">Guía y flujograma estándar para reportar y evaluar pérdidas de seguimiento en ensayos clínicos.</span>
              </li>
              <li>
                ClinicalTrials.gov:{" "}
                <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  clinicaltrials.gov
                </a>
                <span className="block text-xs text-gray-500">Registro público para verificar el preregistro y detectar outcome switching.</span>
              </li>
              <li>
                Canal de YouTube: StatQuest with Josh Starmer.
                <span className="block text-xs text-gray-500">Explicaciones visuales y accesibles sobre confounding, sesgo y meta-análisis.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Acton, E. K. & Willis, A. W. (2023). Core concepts in pharmacoepidemiology: Key biases arising in pharmacoepidemiologic studies. <em>Pharmacoepidemiology and Drug Safety</em>, <em>32</em>(1), 9–18.</li>
            <li>Kyriacou, D. N. & Lewis, R. J. (2016). Confounding by indication in clinical research. <em>JAMA</em>, <em>316</em>(17), 1818–1819.</li>
            <li>VanderWeele, T. J. & Shpitser, I. (2013). On the definition of a confounder. <em>Annals of Statistics</em>, <em>41</em>(1), 196–220.</li>
            <li>Turner, E. H., Matthews, A. M., Linardatos, E., Tell, R. A. & Rosenthal, R. (2008). Selective publication of antidepressant trials and its influence on apparent efficacy. <em>New England Journal of Medicine</em>, <em>358</em>(3), 252–260.</li>
            <li>Egger, M., Davey Smith, G., Schneider, M. & Minder, C. (1997). Bias in meta-analysis detected by a simple, graphical test. <em>BMJ</em>, <em>315</em>(7109), 629–634.</li>
            <li>Sterne, J. A. C., Savović, J., Page, M. J. et al. (2019). RoB 2: a revised tool for assessing risk of bias in randomised trials. <em>BMJ</em>, <em>366</em>, l4898.</li>
            <li>Sterne, J. A. C., Hernán, M. A., Reeves, B. C. et al. (2016). ROBINS-I: a tool for assessing risk of bias in non-randomised studies of interventions. <em>BMJ</em>, <em>355</em>, i4919.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Detectar sesgos no es un ejercicio académico: es la herramienta que protege a tus
            pacientes de tratamientos ineficaces disfrazados de evidencia sólida. Cada vez que
            preguntas "¿quién falta en esta muestra?" o "¿qué resultados no llegaron a publicarse?",
            estás ejerciendo el escepticismo que la buena práctica clínica exige.
          </p>
        </div>
      </div>

    </div>
  );
}