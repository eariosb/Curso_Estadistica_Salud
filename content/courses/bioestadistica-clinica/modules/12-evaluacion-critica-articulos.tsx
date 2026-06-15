
import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen } from "lucide-react";

export const meta = {
  title: "Evaluación Crítica de Artículos",
  subtitle: "¿Cómo saber si un artículo científico es confiable y relevante para tu práctica?",
  objective:
    "Aplicar un método sistemático en 15 minutos para evaluar la calidad metodológica, analizar la Tabla 1 y detectar distorsiones visuales en gráficos científicos.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose">
      {/* ANÉCDOTA DE APERTURA: EL CASO QUE DESPERTÓ LA LECTURA CRÍTICA */}
      <h2>El artículo que cambió la práctica… y luego fue retirado</h2>
      <p>
        Corría el año 1998. Un pequeño estudio publicado en <em>The Lancet</em> vinculaba la vacuna
        triple vírica con el autismo. La repercusión mediática fue inmediata, las tasas de vacunación
        cayeron y brotes de sarampión reaparecieron. Años después, una lectura crítica sistemática
        reveló graves fallos: muestra minúscula (12 niños), diseño sin grupo control, datos
        manipulados y un conflicto de intereses no declarado. La revista retiró el artículo, el autor
        perdió su licencia médica y, sin embargo, el daño a la salud pública ya estaba hecho.
      </p>
      <p>
        Este caso extremo ilustra por qué <strong>la lectura crítica no es una habilidad optativa</strong>; 
        es tu escudo profesional. Millones de personas se vieron afectadas porque muchos colegas no 
        se detuvieron a analizar la Tabla 1, los métodos o la honestidad de los gráficos. Hoy, tú 
        vas a aprender a no caer en esa trampa.
      </p>

      <h2>La lectura crítica como defensa profesional</h2>
      <p>
        Cada día se publican más de 4.000 artículos biomédicos. Muchos presentan limitaciones 
        metodológicas serias, y hasta el 30% de los ensayos publicados en revistas de alto impacto 
        tienen “spin” (interpretación sesgada de los resultados). Dominar una lectura rápida pero 
        rigurosa es lo que separa a un profesional que utiliza la evidencia de uno que es utilizado 
        por ella.
      </p>

      <DataTable
        headers={["Dimensión de evaluación", "Pregunta clave"]}
        rows={[
          [
            "Validez metodológica",
            "¿El diseño es sólido y adecuado para la pregunta de investigación?",
          ],
          [
            "Rigor estadístico",
            "¿Las pruebas son apropiadas? ¿Se reportan IC 95%? ¿Se controlaron confusores?",
          ],
          [
            "Transparencia en los datos",
            "¿Se informan las pérdidas de seguimiento y los datos faltantes?",
          ],
          [
            "Presentación gráfica honesta",
            "¿Los gráficos reflejan fielmente los hallazgos o hay ejes truncados y escalas engañosas?",
          ],
          [
            "Aplicabilidad a tu contexto",
            "¿Los participantes se parecen a las personas que atiendes? ¿La intervención es factible en tu entorno?",
          ],
        ]}
      />

      <Callout type="info" title="Nemotecnia REVA">
        <p>
          <strong>R</strong>elevancia clínica, <strong>E</strong>rrores metodológicos,{" "}
          <strong>V</strong>alidez estadística, <strong>A</strong>plicabilidad. Úsala como checklist mental.
        </p>
      </Callout>

      {/* LA TABLA 1 EN PROFUNDIDAD */}
      <h2>La Tabla 1: el corazón de la comparación basal</h2>

      <Callout type="warning" title="Nunca te saltes la Tabla 1">
        <p>
          La Tabla 1 muestra las características basales de los grupos comparados. Su análisis
          permite detectar si la aleatorización fue exitosa o si existen desequilibrios que puedan
          sesgar los resultados. Un grupo que parte siendo más joven, menos grave o con mejor estado
          funcional tendrá mejores resultados independientemente de la intervención.
        </p>
      </Callout>

      <DataTable
        headers={["Escenario", "Área", "Lo que revela la Tabla 1", "Interpretación"]}
        rows={[
          [
            "Ejercicio fortalecimiento vs. estiramiento en dolor lumbar",
            "Fisioterapia",
            "Edad 45 vs. 46 años; EVA basal 6.2 vs. 6.3; todos los p > 0.20",
            "Aleatorización exitosa. Las diferencias al final se atribuyen al tipo de ejercicio.",
          ],
          [
            "Dieta mediterránea vs. baja en grasas",
            "Nutrición",
            "IMC 28 vs. 32 (p=0.01); actividad física diferente (p=0.03)",
            "Alerta roja. Los grupos no son comparables. Se necesita ajuste multivariante.",
          ],
          [
            "Programa de prevención de caídas",
            "Enfermería",
            "Edad 78.2 vs. 78.5 años (p=0.04)",
            "p<0.05 pero diferencia de 0.3 años: irrelevante clínicamente. La aleatorización fue excelente.",
          ],
        ]}
      />

      {/* VISUALIZACIÓN DE UNA TABLA 1 CON DESEQUILIBRIO */}
      <svg
        viewBox="0 0 500 200"
        className="w-full my-6"
        role="img"
        aria-label="Comparación de medias basales entre dos grupos. Grupo control tiene IMC 28, grupo intervención IMC 32, destacando la diferencia significativa que debe generar sospecha."
        overflow="visible"
        style={{ maxWidth: "500px", width: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}
      >
        <text x="250" y="25" textAnchor="middle" fontSize="14" fontWeight="700">Ejemplo: IMC basal en dos grupos</text>
        {/* Barra control */}
        <rect x="100" y="110" width="80" height="60" fill="#3b82f6" rx="4" />
        <text x="140" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">28 kg/m²</text>
        <text x="140" y="185" textAnchor="middle" fontSize="12" fill="#333">Grupo Control</text>
        {/* Barra intervención */}
        <rect x="280" y="70" width="80" height="100" fill="#ef4444" rx="4" />
        <text x="320" y="60" textAnchor="middle" fontSize="13" fontWeight="600" fill="#ef4444">32 kg/m²</text>
        <text x="320" y="185" textAnchor="middle" fontSize="12" fill="#333">Grupo Intervención</text>
        {/* Línea de significancia */}
        <line x1="230" y1="95" x2="270" y2="95" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed1)" />
        <text x="250" y="88" textAnchor="middle" fontSize="10" fill="#ef4444">p=0.01</text>
        <defs>
          <marker id="arrowRed1" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
      <p className="text-sm text-gray-600">
        Incluso una diferencia de 4 puntos de IMC puede sesgar los resultados si no se ajusta. La 
        aleatorización no garantiza comparabilidad cuando la muestra es pequeña.
      </p>

      <Flashcard
        question="¿Qué indica un valor p < 0.05 en la Tabla 1 de un ensayo clínico aleatorizado?"
        answer={
          <p>
            Indica que existe una <strong>diferencia estadísticamente significativa</strong> en esa
            característica basal entre los grupos. No significa automáticamente que el estudio sea
            inválido, pero sí que los grupos no son perfectamente comparables en ese aspecto. Hay
            que verificar si los autores ajustaron por esa variable en el análisis principal.
            Recuerda: con muestras grandes, diferencias mínimas e irrelevantes pueden tener p&lt;0.05.
          </p>
        }
      />

      <h2>El spin: cuando los autores “venden” lo que no es</h2>
      <p>
        El “spin” es la estrategia, consciente o inconsciente, de presentar los resultados de forma 
        más favorable de lo que realmente son. Es muy frecuente en estudios con desenlace primario 
        no significativo. Un ejemplo clásico: cambiar el foco hacia un desenlace secundario que sí 
        fue significativo y presentarlo como si fuera el principal.
      </p>
      <Callout type="warning" title="Señales de spin">
        <ul className="list-disc pl-6 space-y-1">
          <li>En el abstract se omite el resultado del desenlace primario no significativo.</li>
          <li>Se destaca un análisis de subgrupos que no estaba pre‐especificado.</li>
          <li>Se habla de “eficacia” cuando el estudio no fue diseñado para demostrarla.</li>
          <li>Las conclusiones superan lo que los datos permiten decir.</li>
        </ul>
      </Callout>

      <h2>Gráficos que engañan: detectando distorsiones visuales</h2>
      <p>
        Los gráficos son una ventana… o un espejismo. Estas son las trampas más comunes que 
        encontrarás en artículos científicos.
      </p>

      <DataTable
        headers={["Trampa visual", "Mecanismo", "Antídoto"]}
        rows={[
          [
            "Eje Y truncado",
            "El eje vertical no empieza en 0, exagerando diferencias absolutamente pequeñas",
            "Revisa siempre la escala del eje Y. ¿Empieza en cero o en un valor arbitrario?",
          ],
          [
            "Escala logarítmica no explicitada (Forest Plots)",
            "Las distancias visuales no reflejan las diferencias reales en escala lineal",
            "Busca en el pie de figura si se especifica 'escala logarítmica'. Verifica si las distancias entre 0.1, 1 y 10 son iguales.",
          ],
          [
            "Kaplan-Meier sin tabla de número en riesgo",
            "Una curva que parece estable puede basarse en solo 2–8 pacientes en la cola",
            "Busca siempre la tabla de 'número en riesgo' debajo del gráfico. Con <10–15 personas, la cola es poco fiable.",
          ],
          [
            "Cherry picking (selección parcial de datos)",
            "Se muestran solo los grupos favorables, omitiendo comparadores o desenlaces adversos",
            "Lee el texto completo. ¿Muestra el gráfico todos los grupos del estudio? ¿Se reportan los eventos adversos?",
          ],
          [
            "Doble eje Y",
            "Se superponen dos escalas diferentes para forzar una correlación visual",
            "Pregunta: ¿ambas variables comparten la misma métrica? Si no, la comparación puede ser falaz.",
          ],
        ]}
      />

      {/* GRÁFICO SVG COMPARATIVO: EJE TRUNCADO VS EJE COMPLETO */}
      <svg
        viewBox="0 0 700 300"
        className="w-full my-6"
        role="img"
        aria-label="Dos gráficos de barras comparando la adherencia terapéutica. A la izquierda, eje Y truncado desde 80% a 100% exagera la diferencia. A la derecha, eje Y desde 0% muestra la diferencia real mínima."
        overflow="visible"
        style={{ maxWidth: "700px", width: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}
      >
        <text x="350" y="25" textAnchor="middle" fontSize="15" fontWeight="700">Mismo dato, dos impresiones radicalmente distintas</text>
        
        {/* Gráfico truncado (izquierda) */}
        <text x="200" y="50" textAnchor="middle" fontSize="13" fontWeight="600" fill="#ef4444">Eje Y truncado (engañoso)</text>
        <line x1="90" y1="230" x2="90" y2="70" stroke="#333" strokeWidth="1.5" />
        <line x1="90" y1="230" x2="310" y2="230" stroke="#333" strokeWidth="1.5" />
        {[80,85,90,95,100].map((val, i) => {
          const y = 230 - i*40;
          return (
            <text key={i} x="80" y={y+4} textAnchor="end" fontSize="10" fill="#555">{val}%</text>
          );
        })}
        {/* Barras */}
        <rect x="130" y="190" width="50" height="40" fill="#3b82f6" rx="2" />
        <text x="155" y="185" textAnchor="middle" fontSize="11" fill="#3b82f6">94%</text>
        <rect x="230" y="150" width="50" height="80" fill="#16a34a" rx="2" />
        <text x="255" y="145" textAnchor="middle" fontSize="11" fill="#16a34a">98%</text>
        <text x="210" y="258" textAnchor="middle" fontSize="11" fill="#333">Grupo A</text>
        <text x="310" y="258" textAnchor="middle" fontSize="11" fill="#333">B</text>

        {/* Gráfico completo (derecha) */}
        <text x="510" y="50" textAnchor="middle" fontSize="13" fontWeight="600" fill="#16a34a">Eje Y desde 0% (honesto)</text>
        <line x1="400" y1="230" x2="400" y2="70" stroke="#333" strokeWidth="1.5" />
        <line x1="400" y1="230" x2="620" y2="230" stroke="#333" strokeWidth="1.5" />
        {[0,25,50,75,100].map((val, i) => {
          const y = 230 - i*40;
          return (
            <text key={i} x="390" y={y+4} textAnchor="end" fontSize="10" fill="#555">{val}%</text>
          );
        })}
        <rect x="440" y="78" width="50" height="152" fill="#3b82f6" rx="2" />
        <text x="465" y="72" textAnchor="middle" fontSize="11" fill="#3b82f6">94%</text>
        <rect x="540" y="62" width="50" height="168" fill="#16a34a" rx="2" />
        <text x="565" y="56" textAnchor="middle" fontSize="11" fill="#16a34a">98%</text>
        <text x="490" y="258" textAnchor="middle" fontSize="11" fill="#333">Grupo A</text>
        <text x="590" y="258" textAnchor="middle" fontSize="11" fill="#333">B</text>
      </svg>

      <Callout type="warning" title="Ejemplo real: eje truncado en farmacia">
        <p>
          Un gráfico compara adherencia terapéutica entre dos grupos. El eje Y va del 80% al 100%.
          El grupo A (98%) parece duplicar al grupo B (94%). En realidad, la diferencia absoluta es
          de solo 4 puntos porcentuales. Un eje que empezara en 0 haría esa diferencia casi invisible.
        </p>
      </Callout>

      {/* CASO PRÁCTICO REAL DE DISTORSIÓN */}
      <h2>Caso práctico: el estudio que exageraba el beneficio</h2>
      <p>
        En 2020, un estudio sobre un nuevo anticoagulante mostraba un gráfico de barras con una 
        reducción del 50% en el riesgo de ictus (p=0.04). El eje Y iba del 2.5% al 3.5%, y las 
        barras parecían muy diferentes. Al recalcular los números, el riesgo absoluto pasaba del 
        3.2% al 2.8%. La <strong>Reducción Absoluta del Riesgo era del 0.4%</strong>; el NNT, de 
        250. La revista posteriormente añadió una nota aclaratoria tras las críticas de lectores 
        que aplicaron lectura crítica.
      </p>
      <p className="text-sm text-gray-600">
        Moraleja: nunca aceptes un gráfico sin examinar sus ejes y calcular el efecto en términos 
        absolutos.
      </p>

      <h2>Lectura crítica en 15 minutos: método integrado</h2>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Título, autores y pregunta de investigación (1 min)",
            description:
              "¿El título refleja el tema claramente? ¿Los autores declaran conflictos de interés? ¿La pregunta es relevante para tu práctica?",
          },
          {
            step: 2,
            title: "Resumen con escepticismo (2 min)",
            description:
              "Lee el abstract para una idea general, pero no te fíes solo de él. Identifica objetivo, diseño, participantes, intervención y desenlace. Anota qué buscarás en el texto completo.",
          },
          {
            step: 3,
            title: "Examina la Tabla 1 (3 min)",
            description:
              "Compara visualmente las características basales. ¿Diferencias >10% en variables clave? ¿Muchos valores p significativos? Conclusión preliminar: ¿son los grupos comparables?",
          },
          {
            step: 4,
            title: "Revisa la sección de Métodos (3 min)",
            description:
              "Diseño: ¿adecuado para la pregunta? Participantes: ¿criterios de inclusión razonables? Análisis: ¿se especifican pruebas? ¿Se ajustó por confusores? ¿Se menciona el manejo de datos faltantes?",
          },
          {
            step: 5,
            title: "Evalúa los resultados y los gráficos (4 min)",
            description:
              "¿El efecto es significativo (IC que no cruza el valor nulo)? ¿Es clínicamente relevante (NNT, MCID)? Analiza gráficos: ejes truncados, censura en KM, ausencia de tabla de riesgo. Busca “spin” en la redacción.",
          },
          {
            step: 6,
            title: "Discusión y limitaciones (2 min)",
            description:
              "¿Los autores reconocen las limitaciones? ¿Las conclusiones son coherentes con los resultados o exageran los hallazgos? ¿Mencionan aplicabilidad a tu contexto?",
          },
          {
            step: 7,
            title: "Reflexión sobre aplicabilidad (1 min)",
            description:
              "¿Puedo aplicar estos resultados a las personas que atiendo? ¿La intervención es factible en mi entorno? ¿El beneficio justifica el esfuerzo y los posibles riesgos?",
          },
        ]}
      />

      <DataTable
        headers={["Error frecuente en lectura crítica", "Consejo práctico"]}
        rows={[
          [
            "Fiarse solo del resumen (abstract)",
            "Lee siempre Métodos y Tabla 1 antes de aceptar las conclusiones",
          ],
          [
            "No analizar la Tabla 1",
            "Dedica al menos 2–3 minutos. Es la mejor inversión de tiempo en lectura crítica",
          ],
          [
            "Confiar en los gráficos sin revisar escalas",
            "Mira siempre los ejes. Desconfía de gráficos sin número de riesgo o ejes que no empiezan en cero",
          ],
          [
            "Ignorar conflictos de interés y financiación",
            "Los estudios financiados por la industria pueden tener sesgo de publicación o interpretación favorable",
          ],
          [
            "Olvidar la aplicabilidad clínica",
            "Pregúntate: ¿Mis pacientes se parecen a los del estudio? ¿Es factible en mi centro?",
          ],
        ]}
      />

      {/* HERRAMIENTAS Y RECURSOS */}
      <h2>Herramientas que facilitan la evaluación crítica</h2>
      <Callout type="info" title="Plantillas y webs imprescindibles">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>CASP (Critical Appraisal Skills Programme)</strong>: plantillas en español para 
            ensayos clínicos, revisiones sistemáticas, cohortes, etc. Gratuitas en{" "}
            <a href="https://casp-uk.net" target="_blank" rel="noopener">casp-uk.net</a>.
          </li>
          <li>
            <strong>JAMA Evidence</strong>: la guía <em>Users’ Guides to the Medical Literature</em> 
            con ejemplos prácticos.
          </li>
          <li>
            <strong>EQUATOR Network</strong> (<a href="https://www.equator-network.org" target="_blank" rel="noopener">equator-network.org</a>):
            repositorio de guías de presentación (CONSORT, STROBE, PRISMA).
          </li>
          <li>
            <strong>GRADEpro</strong>: software para evaluar la calidad de la evidencia y graduar 
            recomendaciones.
          </li>
          <li>
            <strong>REDCap</strong> o <strong>OpenClinica</strong>: para conocer cómo se gestionan 
            los datos y detectar posibles sesgos.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="¿Cuál es el paso imprescindible para asegurar que los resultados de un artículo sean útiles y aplicables a tu práctica profesional?"
        options={[
          { text: "Leer solo el resumen para ahorrar tiempo", correct: false },
          {
            text: "Analizar la Tabla 1 y los métodos estadísticos, además de reflexionar sobre la aplicabilidad al propio contexto",
            correct: true,
          },
          { text: "Confiar en la reputación de la revista donde se publicó", correct: false },
          { text: "Fijarse solo en los gráficos más llamativos y el valor p", correct: false },
        ]}
        explanation="La lectura crítica eficiente requiere verificar la comparabilidad de los grupos (Tabla 1), la idoneidad del diseño y las pruebas estadísticas (Métodos), y finalmente evaluar si los participantes del estudio se parecen a las personas que atiendes en tu práctica y si la intervención es factible en tu contexto. El resumen puede omitir limitaciones críticas; los gráficos pueden ser manipulados; la reputación de la revista no garantiza la calidad de un artículo concreto."
      />

      <Quiz
        question="En la Tabla 1 de un ensayo clínico observas que la edad media difiere en 1.5 años (p=0.02) y el IMC en 0.8 kg/m² (p=0.15). ¿Qué debes hacer?"
        options={[
          { text: "Ignorarlo porque las diferencias son pequeñas", correct: false },
          { text: "Considerar que la aleatorización falló y el estudio no es válido", correct: false },
          { text: "Verificar si ajustaron por edad en el análisis multivariante, ya que una diferencia significativa pero pequeña puede no ser clínicamente relevante", correct: true },
          { text: "Solicitar la retractación del artículo", correct: false },
        ]}
        explanation="Diferencias pequeñas pueden ser estadísticamente significativas con muestras grandes, pero clínicamente irrelevantes. Sin embargo, si la variable está relacionada con el desenlace, debe ajustarse en el análisis. El valor p en la Tabla 1 no mide la magnitud del desequilibrio, solo la probabilidad de que sea debido al azar."
      />

      <Callout type="warning" title="💡 Regla de oro">
        <p>
          <strong>Ante cualquier artículo, pregúntate:</strong> ¿los datos presentados justifican
          las conclusiones? No te dejes seducir por el valor p, la fama de los autores o la estética
          de los gráficos. Tú eres el juez último. La lectura crítica es tu bisturí intelectual.
        </p>
      </Callout>

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
                Guyatt, G., Rennie, D., et al. (eds.). (2015). <em>Users&apos; Guides to the Medical Literature: A Manual for Evidence-Based Clinical Practice</em> (3rd ed.). McGraw-Hill.
                <span className="block text-xs text-gray-500">El manual de referencia mundial para aprender a leer críticamente la literatura médica.</span>
              </li>
              <li>
                Greenhalgh, T. (2019). <em>How to Read a Paper: The Basics of Evidence-Based Medicine</em> (6th ed.). Wiley-Blackwell.
                <span className="block text-xs text-gray-500">Texto accesible y muy didáctico, ideal para clínicos que se inician en la lectura crítica.</span>
              </li>
              <li>
                Ioannidis, J. P. A. (2005). Why most published research findings are false. <em>PLoS Medicine</em>, <em>2</em>(8), e124.
                <span className="block text-xs text-gray-500">Un clásico imprescindible sobre los sesgos estructurales de la investigación publicada.</span>
              </li>
              <li>
                Goldacre, B. (2012). <em>Bad Pharma: How Drug Companies Mislead Doctors and Harm Patients.</em> Fourth Estate.
                <span className="block text-xs text-gray-500">Casos reales de spin, sesgo de publicación y manipulación de datos en ensayos clínicos.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                CASP Checklists (Critical Appraisal Skills Programme):{" "}
                <a href="https://casp-uk.net/casp-tools-checklists/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  casp-uk.net
                </a>
                <span className="block text-xs text-gray-500">Plantillas gratuitas, también en español, para evaluar ensayos, cohortes y revisiones sistemáticas.</span>
              </li>
              <li>
                EQUATOR Network:{" "}
                <a href="https://www.equator-network.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  equator-network.org
                </a>
                <span className="block text-xs text-gray-500">Repositorio de guías de reporte (CONSORT, STROBE, PRISMA) para verificar si un estudio sigue los estándares.</span>
              </li>
              <li>
                Testing Treatments:{" "}
                <a href="https://www.testingtreatments.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  testingtreatments.org
                </a>
                <span className="block text-xs text-gray-500">Libro interactivo gratuito que enseña a evaluar críticamente la evidencia clínica.</span>
              </li>
              <li>
                Canal de YouTube "Physiotutors" — Critical Appraisal of a Randomised Controlled Trial.
                <span className="block text-xs text-gray-500">Aunque enfocado a fisioterapia, la metodología de evaluación es universal.</span>
              </li>
              <li>
                Canal de YouTube "Healthcare Triage" — How to spot spin and bias in medical papers.
                <span className="block text-xs text-gray-500">Explica con ejemplos reales cómo detectar "spin" en las conclusiones de los artículos.</span>
              </li>
              <li>
                Curso online "Critical Appraisal of Medical Literature" (Universidad de Rochester, Coursera).
                <span className="block text-xs text-gray-500">Curso con foros de discusión para practicar la lectura crítica de forma guiada.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Altman, D. G. & Bland, J. M. (1991). Statistics notes: The quality of reporting in medical research. <em>BMJ</em>, <em>303</em>(6814), 1257–1258.</li>
            <li>Schulz, K. F., Altman, D. G. & Moher, D. (2010). CONSORT 2010 statement: Updated guidelines for reporting parallel group randomised trials. <em>BMJ</em>, <em>340</em>, c332.</li>
            <li>Boutron, I., Altman, D. G., Hopewell, S. et al. (2010). Impact of spin in the abstract of randomised controlled trials. <em>JAMA</em>, <em>304</em>(16), 1841–1842.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Cada artículo que lees es una conversación con sus autores: tu trabajo no es aceptar
            ni rechazar de plano, sino preguntar con rigor. La lectura crítica, practicada con
            constancia, se convierte en tu mejor herramienta para proteger a las personas que confían
            en tu criterio profesional.
          </p>
        </div>
      </div>
    </div>
  );
}
