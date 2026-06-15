import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { AlertTriangle, Filter, Crosshair, Eye, TrendingUp, BookOpen } from "lucide-react";

export const meta = {
  title: "Modelos Multivariantes: Viendo a Través del Espejo de la Causalidad",
  subtitle:
    "Domina el ajuste estadístico, interpreta la regresión logística y aprende cuándo el Odds Ratio te está engañando",
  objective:
    "Desarrollar un ojo crítico para detectar confusión, leer tablas de regresión ajustada como un investigador senior y comunicar riesgos sin distorsionar la verdad clínica.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose space-y-8">
      {/* Gancho inicial con una paradoja clínica */}
      <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-purple-100 p-3">
            <AlertTriangle className="h-8 w-8 text-purple-700" />
          </div>
          <div>
            <h2 className="mt-0 text-2xl font-bold text-purple-950">
              La paradoja del café, los helados y la UCI
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              ¿Por qué un día los titulares gritan que el café salva vidas y al siguiente que las
              destruye? ¿Cómo es posible que los helados predigan ahogamientos o que, en algunos
              estudios, la obesidad parezca "protectora" en la UCI? La respuesta no está en la
              estadística avanzada, sino en un concepto profundamente humano:{" "}
              <strong>las variables ocultas que nunca medimos</strong>. Los modelos multivariantes
              son tu herramienta para destapar esos factores escondidos y ver la realidad que los
              números simples no pueden mostrar.
            </p>
          </div>
        </div>
      </div>

      {/* El confusor explicado como un personaje */}
      <h2>🎭 El Factor de Confusión</h2>
      <p>
        Imagina que el confusor es un titiritero. Mueve al mismo tiempo la exposición que estudias
        y el desenlace que mides, creando una asociación falsa entre ellos. Tu trabajo como
        investigador es cortar esos hilos.
      </p>

      <Callout type="info" title="El test del confusor en tres actos">
        <p className="space-y-2">
          <span className="block">
            <strong>Acto 1:</strong> El confusor debe estar asociado con la exposición.{" "}
            <em>(Ej: El tabaquismo es más frecuente en bebedores de café).</em>
          </span>
          <span className="block">
            <strong>Acto 2:</strong> El confusor debe ser un factor de riesgo independiente para el
            desenlace. <em>(Ej: Fumar causa cáncer de pulmón).</em>
          </span>
          <span className="block">
            <strong>Acto 3:</strong> El confusor no debe ser un mecanismo intermedio, un mediador en
            la cadena causal. <em>(Ajustar por un mediador es un error de sobreajuste).</em>
          </span>
        </p>
      </Callout>

      <DataTable
        headers={["Paradoja Clínica", "Confusor Oculto", "¿Qué pasó realmente?"]}
        rows={[
          [
            "Beber café se asocia a cáncer de pulmón",
            "Tabaquismo",
            "Los fumadores tienden a beber más café. Al ajustar por tabaco, la asociación café-cáncer desaparece.",
          ],
          [
            "Comer más helados se asocia a más ahogamientos",
            "Temperatura ambiente (verano)",
            "En verano la gente come más helados y también se baña más. El confusor crea una asociación espuria.",
          ],
          [
            "La obesidad parece 'protectora' en la UCI",
            "Gravedad al ingreso",
            "Los obesos ingresan más jóvenes y por causas menos graves. Al ajustar por severidad, la paradoja se esfuma.",
          ],
          [
            "Nueva superficie anti-úlceras no muestra beneficio",
            "Riesgo basal del paciente",
            "Las superficies nuevas se usan en pacientes de mayor riesgo. Sin ajustar, el efecto protector real se oculta.",
          ],
        ]}
        caption="Tabla 1: Ejemplos clásicos de confusión que todo profesional de la salud debe conocer."
      />

      {/* Flashcard para un concepto sutil pero clave */}
      <Flashcard
        question="¿Es lo mismo 'ajustar por edad' que 'estratificar por edad'?"
        answer={
          <p>
            No, y la diferencia es crucial. <strong>Estratificar</strong> es como poner una lupa en
            cada grupo de edad y ver el efecto por separado.{" "}
            <strong>Ajustar (modelo multivariante)</strong> es como calcular un promedio ponderado de
            esos efectos, asumiendo que la edad funciona igual en todos los estratos. Peligro: si el
            efecto de tu tratamiento cambia drásticamente en jóvenes vs. ancianos (interacción), el
            ajuste simple puede esconder una verdad clínicamente vital. Siempre explora la
            interacción antes de promediar.
          </p>
        }
      />

      {/* El OR vs RR: La gran trampa narrativa */}
      <h2>🧨 La Gran Trampa del Odds Ratio: Cuando los Números Gritan Más que la Realidad</h2>
      <p>
        Esta es una de las lecciones más valiosas que aprenderás hoy. El Odds Ratio (OR) es un
        mentiroso funcional: se comporta de maravilla cuando los eventos son raros, pero se vuelve
        un exagerado compulsivo cuando los eventos son frecuentes. En la clínica, donde a menudo
        tratamos desenlaces comunes (infecciones de herida, náuseas postoperatorias, abandono del
        tratamiento), esta distorsión puede llevar a decisiones erróneas.
      </p>

      <Callout type="warning" title="Demostración quirúrgica: OR vs RR con tus propias manos">
        <div className="space-y-3">
          <p>
            <strong>Escenario:</strong> Ensayo clínico sobre infección de herida quirúrgica.
          </p>
          <div className="grid grid-cols-2 gap-4 rounded-md bg-white p-3 text-sm">
            <div>
              <p className="font-bold text-red-700">Apósito Tradicional</p>
              <p>Infección: 40% (40 de 100)</p>
            </div>
            <div>
              <p className="font-bold text-green-700">Apósito Nuevo</p>
              <p>Infección: 60% (60 de 100)</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <p>
              <strong className="text-blue-700">Riesgo Relativo (RR):</strong> 60% / 40% ={" "}
              <span className="font-bold">1.5</span> → El nuevo apósito conlleva un 50% más de
              riesgo. Comunicación honesta.
            </p>
            <p>
              <strong className="text-purple-700">Odds Ratio (OR):</strong> (60/40) / (40/60) = 1.5
              / 0.667 = <span className="font-bold">2.25</span> → Parece que más que duplica el
              riesgo. Comunicación engañosa.
            </p>
          </div>
          <p className="mt-3 rounded bg-red-50 p-2 text-sm font-medium text-red-800">
            Conclusión: Con un evento al 40%, usar el OR como si fuese un RR es un error de
            interpretación grave que infla artificialmente la magnitud del problema.
          </p>
        </div>
      </Callout>

      <DataTable
        headers={["Frecuencia del Evento", "Comportamiento del OR", "Regla de Oro Clínica"]}
        rows={[
          [
            "Menos del 10% (raro)",
            "OR ≈ RR (se comporta bien)",
            "Puedes interpretar el OR como una aproximación directa al riesgo. Es un invitado educado.",
          ],
          [
            "Más del 10% (frecuente)",
            "OR > RR (exagera la asociación)",
            "Nunca digas 'triplica el riesgo'. Reporta solo dirección y significancia. Si necesitas la magnitud real, usa RR ajustado.",
          ],
        ]}
      />

      <Callout type="tip" title="🔧 Caja de Herramientas: Cómo obtener RR ajustados (y no morir en el intento)">
        <p>
          Si tu evento es frecuente y el revisor te exige un Riesgo Relativo ajustado, no uses
          regresión logística. Tu solución moderna es:{" "}
          <strong>Regresión de Poisson con Varianza Robusta (Sandwich)</strong> o{" "}
          <strong>Regresión Log-Binomial</strong>. Están disponibles en Jamovi (módulo GAMLj), JASP
          y, por supuesto, en R. Este enfoque evita la exageración del OR y te permite comunicar el
          riesgo de forma honesta y directa para tu paciente.
        </p>
      </Callout>

      {/* Lectura de tablas: De la sopa de números a la narrativa clínica */}
      <h2>📋 Cómo Leer una Tabla de Regresión Logística Sin Perder el Aliento</h2>
      <p>
        Te presento una tabla realista de un estudio sobre Reacciones Adversas a Medicamentos (RAM).
        Vamos a extraer la historia clínica que cuentan estos números.
      </p>

      <DataTable
        headers={["Variable (Factor de Riesgo)", "OR Ajustado", "IC 95%", "Valor p", "Tu Interpretación Clínica"]}
        rows={[
          [
            "Edad (por cada 10 años más)",
            "1.45",
            "1.20 – 1.75",
            "< 0.001",
            "Cada década de vida aumenta las odds de sufrir una RAM en un 45%. Factor de riesgo no modificable, pero identifica población vulnerable.",
          ],
          [
            "Sexo femenino",
            "1.80",
            "1.10 – 2.95",
            "0.019",
            "Ser mujer casi duplica las odds de RAM. Dato esencial para personalizar la prescripción.",
          ],
          [
            "Polimedicación (≥5 fármacos)",
            "2.30",
            "1.40 – 3.78",
            "0.001",
            "El factor de riesgo modificable más potente. Revisar la medicación es una intervención directa para reducir RAM.",
          ],
          [
            "Uso del fármaco X (vs. alternativas)",
            "0.65",
            "0.42 – 0.99",
            "0.045",
            "Factor protector significativo. El fármaco X reduce las odds de RAM en un 35%. Evidencia a favor de su uso preferente.",
          ],
        ]}
        caption="Tabla 2: Factores asociados a Reacción Adversa a Medicamento (RAM) en pacientes hospitalizados. Modelo de regresión logística ajustado por todas las variables de la tabla."
      />

      <div className="rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 p-5">
        <h3 className="mt-0 flex items-center gap-2 text-indigo-800">
          <Crosshair className="h-5 w-5" /> Tips de lectura rápida para la guardia
        </h3>
        <ul className="space-y-2 text-sm text-indigo-900">
          <li>
            <strong>Significancia:</strong> Mira el IC 95%. Si NO cruza el 1 (en OR) o el 0 (en
            coeficientes), la asociación es estadísticamente significativa (p&lt;0.05). El valor p
            exacto te da el grado de evidencia en contra de la hipótesis nula.
          </li>
          <li>
            <strong>Dirección:</strong> OR &gt; 1 = factor de riesgo. OR &lt; 1 = factor protector.
            Simple y directo.
          </li>
          <li>
            <strong>Magnitud relativa:</strong> Compara los OR entre sí para priorizar factores de
            riesgo. Aquí, la polimedicación (OR=2.30) pesa más que la edad por década (OR=1.45).
          </li>
        </ul>
      </div>

      {/* Casos prácticos multidisciplinarios */}
      <h2>🏥 Del Dato al Diagnóstico: Casos Reales en tu Especialidad</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-5">
          <h3 className="mt-0 flex items-center gap-2 text-teal-800">
            <Eye className="h-5 w-5" /> Psicología Clínica
          </h3>
          <p className="text-sm font-semibold">Predictores de abandono en TCC para ansiedad</p>
          <p className="text-sm text-gray-700">
            OR ajustados: Edad &lt;30 años = <strong>2.10</strong> (1.30-3.40); Bajo apoyo social ={" "}
            <strong>3.50</strong> (2.00-6.12); Comorbilidad psiquiátrica ={" "}
            <strong>1.90</strong> (1.10-3.28).{" "}
            <em>
              Lección: El apoyo social emerge como el factor de riesgo modificable más potente. La
              intervención no es solo individual; debe incluir el entorno.
            </em>
          </p>
        </div>
        <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-5">
          <h3 className="mt-0 flex items-center gap-2 text-teal-800">
            <TrendingUp className="h-5 w-5" /> Fisioterapia
          </h3>
          <p className="text-sm font-semibold">
            Recuperación funcional tras fractura de cadera
          </p>
          <p className="text-sm text-gray-700">
            OR ajustados: Edad ≥85 años = <strong>0.40</strong> (reduce odds de recuperación); Buen
            estado cognitivo = <strong>2.80</strong>; Inicio de fisioterapia &lt;48h ={" "}
            <strong>1.95</strong>.{" "}
            <em>
              Lección: La intervención precoz es un factor independiente casi tan potente como un
              buen estado cognitivo basal. El tiempo es función.
            </em>
          </p>
        </div>
      </div>

      {/* Errores frecuentes en formato de "pecados" */}
      <h2>⛔ Los 5 Pecados Capitales al Interpretar Modelos Multivariantes</h2>
      <div className="space-y-4">
        {[
          {
            title: "Ignorar confusores no medidos",
            consequence:
              "Tu ajuste es una armadura con agujeros. El sesgo residual sigue campando a sus anchas.",
            fix: "Evalúa críticamente si los autores midieron los confusores que la fisiopatología y la literatura señalan como claves. Si faltan, el estudio es débil.",
          },
          {
            title: "Interpretar OR como RR en eventos frecuentes",
            consequence:
              "Afirmar que un OR de 2.8 'casi triplica el riesgo' es una falta de honestidad científica que infla resultados.",
            fix: "Ante evento >10%, limita tu lenguaje a dirección y significancia. Si necesitas magnitud real, calcula o solicita el RR ajustado.",
          },
          {
            title: "Sobreajustar: meter el ventilador en el modelo",
            consequence:
              "Incluir mediadores (pasos intermedios) o variables basura distorsiona el efecto de la exposición principal, creando un espejismo estadístico.",
            fix: "El ajuste debe basarse en un DAG (Gráfico Acíclico Dirigido) o un modelo conceptual claro, no en una pesca de variables automática.",
          },
          {
            title: "Cazar significación sin mirar el tamaño del efecto",
            consequence:
              "Con muestras enormes, cualquier tontería sale significativa. Un OR de 1.02 puede ser 'significativo' pero clínicamente irrelevante.",
            fix: "Pregúntate siempre: ¿esta magnitud de efecto cambiaría mi práctica clínica? La significancia estadística no es sinónimo de relevancia clínica.",
          },
          {
            title: "No reportar qué variables se ajustaron",
            consequence:
              "Falta de transparencia y reproducibilidad. Desconfía de frases vagas como 'se ajustó por factores relevantes'.",
            fix: "Exige una tabla con todos los OR ajustados o una nota al pie detallada. La ciencia de calidad es reproducible.",
          },
        ].map((pecado, idx) => (
          <div key={idx} className="rounded-lg border border-red-200 bg-red-50 p-5">
            <h3 className="mt-0 flex items-center gap-2 text-red-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-sm font-bold">
                {idx + 1}
              </span>
              {pecado.title}
            </h3>
            <p className="text-red-700">
              <strong>Consecuencia:</strong> {pecado.consequence}
            </p>
            <p className="text-red-700">
              <strong>Antídoto:</strong> {pecado.fix}
            </p>
          </div>
        ))}
      </div>

      {/* ─── CALLOUT PRINCIPIO DE PARSIMONIA Y REGLA 10 EPV ─── */}
      <Callout type="warning" title="La regla de los 10 eventos por variable (10 EPV) — parsimonia en regresión logística">
        <p>
          Una de las decisiones más críticas al construir un modelo multivariante es cuántas
          variables incluir. Incluir demasiadas variables para pocos eventos es el{" "}
          <strong>sobreajuste</strong> (<em>overfitting</em>): el modelo "aprende" el ruido
          de los datos de entrenamiento y falla en nuevas muestras.
        </p>
        <p style={{ marginTop: 8 }}>
          La <strong>regla empírica de Peduzzi et al. (1996)</strong> establece que para
          una regresión logística estable se necesitan al menos{" "}
          <strong>10 eventos por cada variable independiente</strong> candidata al modelo
          (no por cada covariable, sino por cada parámetro estimado). Por ejemplo:
        </p>
        <ul style={{ marginTop: 6, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>
            Estudio con <strong>50 ingresos hospitalarios</strong> (el evento) → máximo
            5 variables en el modelo. Con más, el modelo es inestable y los OR tienen
            intervalos de confianza enormes o inverosímiles.
          </li>
          <li>
            Estudio con <strong>200 reingresos</strong> → hasta 20 variables son manejables,
            aunque siempre se prefiere guiarse por un DAG conceptual y no por la capacidad
            matemática bruta.
          </li>
        </ul>
        <p style={{ marginTop: 8 }}>
          <strong>Al leer un artículo:</strong> cuenta los eventos del desenlace y divide
          entre el número de variables ajustadas. Si el cociente es menor de 10, el modelo
          puede estar sobreajustado. Busca si los autores reportaron validación interna
          (bootstrap, split-sample) o externa. Si no lo hacen, interpreta los OR ajustados
          con mucha cautela.
        </p>
        <p style={{ marginTop: 6, fontSize: 12, color: "#64748B" }}>
          Referencia: Peduzzi, P., Concato, J., Kemper, E., Holford, T. R. & Feinstein, A. R.
          (1996). A simulation study of the number of events per variable in logistic regression
          analysis. <em>Journal of Clinical Epidemiology</em>, <em>49</em>(12), 1373–1379.
        </p>
      </Callout>

      {/* Proceso de lectura crítica como un algoritmo clínico */}
      <h2>🩺 Algoritmo de Lectura Crítica para Modelos Multivariantes</h2>
      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Identifica la Pregunta y el Diseño",
            description:
              "¿Cuál es la exposición principal y el desenlace? En estudios observacionales (cohortes, casos y controles), el ajuste multivariante es casi obligatorio para controlar la confusión. En un ensayo clínico aleatorizado bien hecho, el ajuste es un refinamiento, no una necesidad.",
          },
          {
            step: 2,
            title: "Audita las Variables de Ajuste (Sección de Métodos)",
            description:
              "Busca la lista de covariables incluidas. ¿Están los sospechosos habituales (edad, sexo, comorbilidad)? ¿Falta algún confusor obvio según la literatura? Si el modelo no incluye variables clave, sus resultados son cuestionables.",
          },
          {
            step: 3,
            title: "Examina la Tabla de Resultados Ajustados",
            description:
              "Concéntrate en los OR (o RR) ajustados, sus intervalos de confianza al 95% y los valores p. Recuerda: un IC 95% que no cruza el 1 indica significancia. Compara la magnitud de los OR ajustados entre sí para priorizar factores.",
          },
          {
            step: 4,
            title: "Interpreta la Magnitud con Cautela (Frecuencia del Evento)",
            description:
              "Pregúntate: ¿cuál es la frecuencia basal del evento? Si es >10%, el OR sobreestima. No lo traduzcas directamente a 'riesgo'. Si los autores no reportan la frecuencia basal, es una bandera roja.",
          },
          {
            step: 5,
            title: "Compara lo Crudo vs. lo Ajustado (La Prueba del Confusor)",
            description:
              "Un cambio sustancial (>10%) entre el OR crudo y el ajustado indica que la confusión operaba y el ajuste fue efectivo. Si apenas cambia, o el confusor no era tal, o el ajuste no aportó mucho. Esto te da pistas sobre la robustez del hallazgo.",
          },
        ]}
      />

      {/* Quiz con un caso trampa */}
      <Quiz
        question="Un estudio sobre profilaxis antiemética reporta náuseas postoperatorias en el 35% con el fármaco estándar y en el 20% con el nuevo. El OR ajustado (controlando por sexo, edad y tipo de cirugía) es 0.45 (IC 95%: 0.28-0.71). Un colega te dice: 'El nuevo fármaco reduce el riesgo de náuseas en un 55%'. ¿Es correcta esta afirmación?"
        options={[
          {
            text: "Sí, porque 1 - 0.45 = 0.55, lo que significa una reducción del riesgo del 55%.",
            correct: false,
          },
          {
            text: "No, porque el OR sobreestima la magnitud del efecto cuando el evento es tan frecuente (35%). La reducción real del riesgo es menor.",
            correct: true,
          },
          {
            text: "Sí, siempre que el IC 95% no incluya el 1 y el valor p sea significativo.",
            correct: false,
          },
          {
            text: "No, porque el OR ajustado nunca se puede usar para calcular reducciones de riesgo relativas.",
            correct: false,
          },
        ]}
        explanation="Excelente pregunta. Con un evento basal del 35%, el OR de 0.45 exagera el efecto protector. La reducción real del riesgo (usando RR) es menor que el 55% que sugiere el OR. Lo correcto aquí es afirmar que el fármaco reduce significativamente las odds de náuseas, y que la dirección y la significancia son sólidas. Si necesitas cuantificar la reducción con precisión y honestidad para tus pacientes, solicita el RR ajustado (mediante regresión de Poisson robusta). Comunicar un 55% de reducción de riesgo basado en el OR es, en este contexto, científicamente inexacto."
      />

      {/* Recursos y Bibliografía */}
      <div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
        <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpen className="h-6 w-6" /> Para Convertirte en un Experto en Causalidad y Modelos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-semibold text-slate-800">📖 Lecturas Fundamentales</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Hernán, M. A. & Robins, J. M. (2020). <em>Causal inference: What if</em>. Chapman & Hall/CRC. (Descarga gratuita online).{" "}
                <span className="block text-xs text-gray-500">
                  El libro de cabecera moderno sobre inferencia causal. Imprescindible para entender DAGs y confusión.
                </span>
              </li>
              <li>
                Rothman, K. J., et al. (2008). <em>Modern epidemiology</em> (3rd ed.). Lippincott Williams & Wilkins.{" "}
                <span className="block text-xs text-gray-500">
                  El tratado clásico y riguroso sobre sesgo, confusión y modelos en epidemiología clínica.
                </span>
              </li>
              <li>
                Martínez-González, M. A., Sánchez-Villegas, A., Toledo, E. & Faulin, J. (2020). <em>Bioestadística amigable</em> (4ª ed.). Elsevier.{" "}
                <span className="block text-xs text-gray-500">
                  Capítulos dedicados a regresión logística y análisis de supervivencia explicados con claridad y ejemplos del mundo real.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Tutoriales Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Curso Online: "Causal Diagrams" de Miguel Hernán (edX/YouTube)</strong>
                <span className="block text-xs text-gray-500">
                  Una serie magistral y gratuita para aprender a dibujar e interpretar DAGs y entender la confusión de raíz.
                </span>
              </li>
              <li>
                <strong>Canal de YouTube: StatQuest with Josh Starmer</strong>
                <span className="block text-xs text-gray-500">
                  Explicaciones visuales y divertidas sobre regresión logística, Odds Ratios y más. Perfecto para consolidar conceptos.
                </span>
              </li>
              <li>
                <strong>Tutoriales de GAMLj en Jamovi</strong>
                <span className="block text-xs text-gray-500">
                  Busca tutoriales del módulo GAMLj para aprender a ejecutar regresiones logísticas,
                  de Poisson y modelos mixtos directamente en Jamovi, paso a paso.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            La diferencia entre ver números y entender la historia que esconden es lo que separa a
            un técnico de un clínico-investigador. Hoy has afilado tu mirada. Recuerda: ajustar no
            es una técnica, es una filosofía de pensamiento crítico.
          </p>
        </div>
      </div>
    </div>
  );
}