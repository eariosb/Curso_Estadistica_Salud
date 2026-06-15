import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BarChart3, Stethoscope, Brain, Pill, Heart, Microscope } from "lucide-react";

export const meta = {
  title: "Pruebas Estadísticas Básicas: De los Datos a la Decisión Clínica",
  subtitle: "Domina el T-Test, Wilcoxon y Chi-cuadrado con Jamovi y JASP sin ser matemático",
  objective:
    "Tomar decisiones clínicas sólidas eligiendo, ejecutando e interpretando las pruebas estadísticas correctas con software gratuito, como un investigador experimentado.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose space-y-8">

      {/* ─── LECTURA COMPLEMENTARIA — REYES-REYES 2019 ─── */}
      <div className="rounded-xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white p-5 flex gap-4 items-start">
        <div className="rounded-xl bg-emerald-600 text-white w-11 h-11 flex items-center justify-center text-xl shrink-0">📖</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
            Lectura complementaria recomendada
          </p>
          <p className="text-sm font-bold text-slate-800 mb-1">
            Reyes-Reyes, A. & Reyes-Reyes, F. (2019).{" "}
            <em>Probabilidad y aplicaciones en ciencias de la salud.</em>
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Aunque el libro se centra en probabilidad, las secciones de <strong>probabilidad condicional
            (pp. 8–9)</strong> construyen la intuición necesaria para entender por qué las pruebas
            estadísticas asumen una hipótesis nula y calculan la probabilidad de los datos{" "}
            <em>dado que la hipótesis nula es verdadera</em> — exactamente la lógica de cada
            prueba en este módulo.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { pp: "pp. 5–7", tema: "Eventos mutuamente excluyentes — fundamento del Chi-cuadrado" },
              { pp: "pp. 8–9", tema: "Probabilidad condicional — corazón del valor p" },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-lg p-2 border border-slate-200 flex gap-2 items-start">
                <span className="text-xs font-bold text-emerald-600 shrink-0">{r.pp}</span>
                <span className="text-xs text-slate-500 leading-snug">{r.tema}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Introducción con gancho emocional */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-100 p-3">
            <Stethoscope className="h-8 w-8 text-blue-700" />
          </div>
          <div>
            <h2 className="mt-0 text-2xl font-bold text-blue-950">
              Imagina esta escena clínica real...
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Tienes 40 pacientes. A 20 les administraste el fármaco A, a otros 20 el fármaco B. La
              presión arterial bajó más en el grupo B. Pero... ¿es una diferencia real o solo ruido
              aleatorio? ¿Y si tu jefe te pregunta "con qué seguridad puedes afirmarlo"? Aquí no
              sirven corazonadas. Aquí entra la estadística inferencial, tu nueva aliada, no tu
              enemiga.
            </p>
          </div>
        </div>
      </div>

      {/* El Mapa de Decisión: Enfoque visual y práctico */}
      <h2>🧭 Tu brújula estadística: El mapa de decisión</h2>
      <p>
        Elegir la prueba incorrecta es como recetar ibuprofeno para una infección bacteriana: no
        solo no funciona, sino que puede llevarte a conclusiones peligrosas. Antes de tocar Jamovi,
        respira hondo y hazte estas <strong>tres preguntas de oro</strong>:
      </p>

      <Callout type="info" title="Las 3 preguntas que decides antes de cualquier análisis">
        <ol className="list-decimal space-y-3 pl-5 font-medium">
          <li>
            <strong>¿Qué tipo de variable quiero analizar?</strong> ¿Es una medición continua (presión
            en mmHg, dolor en escala 0-10)? ¿Es categórica (curado/no curado, grupo
            sanguíneo)? ¿Es ordinal (estadio tumoral I, II, III)?
          </li>
          <li>
            <strong>¿Cuántos grupos quiero comparar?</strong> ¿Son solo dos (fármaco A vs B) o más de
            dos (placebo, dosis baja, dosis alta)?
          </li>
          <li>
            <strong>¿Los datos son independientes o relacionados?</strong> ¿Medimos a personas
            distintas (grupos independientes) o a las mismas personas antes y después de una
            intervención (datos pareados)?
          </li>
        </ol>
      </Callout>

      <DataTable
        headers={[
          "Situación Clínica Típica",
          "Supuesto Clave a Verificar",
          "Prueba Paramétrica (Reina)",
          "Alternativa No Paramétrica (Escudera Leal)",
        ]}
        rows={[
          [
            "Comparar presión arterial entre dos fármacos (grupos de pacientes distintos)",
            "Normalidad + varianzas similares (homogeneidad)",
            "T-Test para muestras independientes",
            "U de Mann-Whitney",
          ],
          [
            "Evaluar dolor antes y después de una infiltración (mismos pacientes)",
            "Las diferencias (después - antes) siguen una curva normal",
            "T-Test para muestras pareadas",
            "Prueba de Wilcoxon de rangos con signo",
          ],
          [
            "Comparar tiempo de recuperación entre tres técnicas quirúrgicas",
            "Normalidad + homogeneidad de varianzas",
            "ANOVA de una vía",
            "Kruskal-Wallis",
          ],
          [
            "¿Hay relación entre fumar (Sí/No) y desarrollar EPOC (Sí/No)?",
            "Frecuencias esperadas ≥5 en cada casilla de la tabla",
            "Chi-cuadrado de Pearson",
            "Prueba exacta de Fisher",
          ],
          [
            "Comparar tasa de adherencia (Buena/Regular/Mala) entre tres tipos de dieta — proporciones en más de 2 grupos",
            "Frecuencias esperadas ≥5 por celda; variable sin orden natural o con orden (escala Likert)",
            "Chi-cuadrado de homogeneidad (sin orden) / Chi-cuadrado de tendencia lineal (con orden)",
            "Kruskal-Wallis con comparaciones post-hoc de Dunn",
          ],
        ]}
      />

      <Callout type="info" title="Cuando tienes más de dos grupos: Chi² de homogeneidad y Kruskal-Wallis">
        <p>
          Una situación clínica muy frecuente que la tabla amplía: comparar proporciones (o rangos)
          entre <strong>tres o más grupos</strong>. Por ejemplo, ¿es diferente la tasa de adherencia
          terapéutica entre pacientes con dieta mediterránea, dieta baja en carbohidratos y dieta
          convencional?
        </p>
        <ul style={{ marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>
            <strong>Chi-cuadrado de homogeneidad:</strong> Compara proporciones de una variable
            categórica entre 3+ grupos independientes (sin asumir orden). El p-valor global indica
            si <em>algún</em> grupo difiere; los residuos ajustados identifican cuál.
          </li>
          <li>
            <strong>Chi-cuadrado de tendencia lineal (Cochran-Armitage):</strong> Cuando los grupos
            siguen un orden natural (dosis baja, media, alta), este test detecta tendencias
            monotónicas con más potencia.
          </li>
          <li>
            <strong>Kruskal-Wallis:</strong> Extensión no paramétrica del Mann-Whitney para 3+
            grupos con variables ordinales o continuas sin normalidad. Tras un Kruskal-Wallis
            significativo, aplica comparaciones post-hoc de <strong>Dunn con corrección de
            Bonferroni</strong> para identificar qué pares difieren. En el Módulo 9 verás estos
            tests en artículos de evaluación crítica.
          </li>
        </ul>
      </Callout>

      {/* Sección sobre normalidad con un enfoque narrativo */}
      <h2>📊 La verdad sobre la "normalidad" que nadie te cuenta</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Callout type="warning" title="La trampa del p-valor en muestras grandes">
          <p>
            ¿Has hecho un Shapiro-Wilk con 150 pacientes y te dio significativo (p&lt;0.05)?
            Respira. No pasa nada. Las pruebas de normalidad son como alarmas ultrasensibles: con
            muestras grandes, pitan por cualquier desviación minúscula. Tu T-Test es robusto como
            un roble. Confía más en lo que ven tus ojos: el histograma y el gráfico Q-Q.
          </p>
        </Callout>

        <Callout type="tip" title="Regla de oro clínica para dormir tranquilo">
          <p>
            <strong>Si tienes dudas, opta por la prueba no paramétrica (Wilcoxon).</strong> Es como
            elegir un todoterreno en lugar de un deportivo: pierdes un poco de velocidad (potencia
            estadística), pero rara vez te dejará tirado en el camino. Con más de 30 pacientes por
            grupo y sin valores extremos absurdos, el T-Test es perfectamente fiable.
          </p>
        </Callout>
      </div>

      {/* Anécdota de anclaje emocional */}
      <div className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 italic">
        <p className="flex items-start gap-3 text-amber-900">
          <Brain className="mt-1 h-5 w-5 flex-shrink-0" />
          <span>
            <strong>Anécdota de residente:</strong> "Revisando mi primer paper, usé Wilcoxon porque
            la 'normalidad' fallaba. El revisor, un señor mayor con pinta de sabio, me dijo: <em>'Joven, 
            si tiene 200 pacientes, el T-Test le vale. El Teorema Central del Límite es su amigo, 
            no le dé vueltas'</em>. Tenía razón. Aprendí que el contexto y el tamaño muestral mandan 
            tanto como los test formales."
          </span>
        </p>
      </div>

      {/* Ejemplos multidisciplinarios con un diseño más rico */}
      <h2>💊 Casos prácticos de tu día a día</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: <Pill className="h-6 w-6" />,
            area: "Farmacia / Medicina",
            scenario:
              "Comparas la reducción de HbA1c entre dos antidiabéticos orales en 60 pacientes (30 por grupo). El histograma muestra una campana simétrica.",
            test: "T-Test para muestras independientes",
            reason:
              "Variable cuantitativa continua, 2 grupos, independientes, distribución normal.",
          },
          {
            icon: <Heart className="h-6 w-6" />,
            area: "Enfermería / Psicología",
            scenario:
              "Quieres saber si la tasa de abandono del tabaco (Sí/No) es diferente entre quienes recibieron terapia grupal vs. consejo breve.",
            test: "Chi-cuadrado de Pearson",
            reason:
              "Dos variables categóricas (tratamiento recibido y resultado). Comprueba frecuencias esperadas >5.",
          },
          {
            icon: <Microscope className="h-6 w-6" />,
            area: "Fisioterapia / Rehabilitación",
            scenario:
              "Mides la escala EVA de dolor lumbar justo antes y justo después de una sesión de punción seca en los mismos 25 pacientes.",
            test: "Wilcoxon pareado",
            reason:
              "Datos ordinales (EVA) o continuos sin normalidad clara, 2 medidas en los mismos sujetos.",
          },
          {
            icon: <BarChart3 className="h-6 w-6" />,
            area: "Nutrición / Salud Pública",
            scenario:
              "Comparas la adherencia a la dieta (clasificada como Baja/Media/Alta) entre dos programas educativos diferentes en grupos de pacientes distintos.",
            test: "U de Mann-Whitney",
            reason:
              "Variable de resultado ordinal. Respetas el orden natural de las categorías.",
          },
        ].map((caso, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {caso.icon}
              {caso.area}
            </div>
            <p className="mb-2 text-gray-800">{caso.scenario}</p>
            <div className="mt-3 rounded-md bg-green-50 p-3">
              <p className="mb-1 text-xs font-bold text-green-800">PRUEBA RECOMENDADA:</p>
              <p className="text-sm font-semibold text-green-900">{caso.test}</p>
              <p className="mt-1 text-xs text-green-700">{caso.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── EJEMPLO COMPLETO PASO A PASO ─── */}
      <h2>🔬 Ejemplo completo con datos reales: T-Test de HbA1c</h2>
      <p>
        Antes de abrir Jamovi, entiende lo que estás haciendo. Aquí tienes un caso clínico real,
        resuelto en 6 pasos, con los números que verías en pantalla.
      </p>

      <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 my-4">
        <p className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-2">Caso Clínico</p>
        <p className="text-base text-blue-900 font-semibold mb-1">
          ¿Reduce un programa de educación diabetológica la HbA1c en DM2?
        </p>
        <p className="text-sm text-blue-700">
          Ensayo clínico aleatorizado, 2 grupos paralelos, n = 60 (30 educación estructurada vs.
          30 cuidado habitual). Seguimiento 6 meses. Basado en Deakin et al., <em>Cochrane</em> 2005.
        </p>
      </div>

      <DataTable
        headers={["Paso", "Pregunta que te haces", "Respuesta en este caso"]}
        rows={[
          [
            <strong key="1">① Tipo de variable</strong>,
            "¿La variable de resultado es cuantitativa continua?",
            "Sí. HbA1c (%) es continua. ✓",
          ],
          [
            <strong key="2">② Diseño</strong>,
            "¿Los grupos son independientes o los mismos sujetos?",
            "Independientes: distinto paciente en cada grupo. ✓",
          ],
          [
            <strong key="3">③ Normalidad</strong>,
            "¿n ≥ 30 por grupo o el histograma parece normal?",
            "n = 30 por grupo. El Teorema Central del Límite nos protege. ✓",
          ],
          [
            <strong key="4">④ Prueba elegida</strong>,
            "¿Cuál es la prueba correcta?",
            "T-Test para muestras independientes (Welch).",
          ],
          [
            <strong key="5">⑤ Resultado Jamovi</strong>,
            "¿Qué obtengo?",
            "t(56) = −2.25, p = 0.028, IC 95%: [−1.32 %, −0.08 %]",
          ],
          [
            <strong key="6">⑥ Interpretación</strong>,
            "¿Es significativo Y relevante?",
            "Sí. Δ = −0.7 % supera la MCID de 0.5 % (ADA 2023). d Cohen = 0.58 (efecto moderado).",
          ],
        ]}
        caption="Deakin et al. Cochrane 2005 / UKPDS NEJM 1998 — adaptado con fines pedagógicos."
      />

      <div className="rounded-xl bg-slate-800 text-green-300 font-mono text-xs p-5 my-4 overflow-x-auto">
        <p className="text-slate-400 mb-2">// Salida típica de Jamovi — Prueba T para Muestras Independientes</p>
        <p>Variable   │   t    │  gl  │    p    │ Dif.medias │  IC 95%</p>
        <p>───────────┼────────┼──────┼─────────┼────────────┼────────────────</p>
        <p>HbA1c      │ −2.248 │ 56.1 │  0.028* │   −0.70 %  │ [−1.32, −0.08]</p>
        <p className="mt-2 text-slate-400">* Educación: n=30, M=7.20%, DE=1.10 │ Control: n=30, M=7.90%, DE=1.30</p>
      </div>

      <Callout type="success" title="Cómo reportarlo en tu artículo">
        <p>
          "Los pacientes del grupo educación presentaron una HbA1c media significativamente menor
          que el grupo control a los 6 meses (7.2% vs 7.9%; diferencia −0.7%, IC 95%: −1.32 a
          −0.08; t(56)=−2.25, p=0.028). El tamaño del efecto fue moderado (d=0.58). La diferencia
          observada supera la MCID establecida en 0.5% para intervenciones no farmacológicas en DM2
          (ADA Standards, 2023), lo que sugiere relevancia clínica."
        </p>
      </Callout>

      {/* Chi-cuadrado 2x2 */}
      <h2>📋 Chi-cuadrado: cuando tus variables son categóricas</h2>
      <p>
        Imagina que quieres saber si la tasa de abandono del tabaco (Sí/No) difiere entre
        pacientes que recibieron <strong>terapia grupal</strong> vs. <strong>consejo breve</strong>.
        Ambas variables son categóricas: aquí entra el Chi-cuadrado.
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="px-4 py-3 text-left"> </th>
              <th className="px-4 py-3 text-center">Dejó de fumar ✓</th>
              <th className="px-4 py-3 text-center">Sigue fumando ✗</th>
              <th className="px-4 py-3 text-center font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50 border-b border-slate-200">
              <td className="px-4 py-3 font-semibold text-blue-800">Terapia grupal</td>
              <td className="px-4 py-3 text-center font-bold text-green-700">38</td>
              <td className="px-4 py-3 text-center text-slate-600">22</td>
              <td className="px-4 py-3 text-center font-bold">60</td>
            </tr>
            <tr className="bg-slate-50 border-b border-slate-200">
              <td className="px-4 py-3 font-semibold text-slate-700">Consejo breve</td>
              <td className="px-4 py-3 text-center font-bold text-green-700">24</td>
              <td className="px-4 py-3 text-center text-slate-600">36</td>
              <td className="px-4 py-3 text-center font-bold">60</td>
            </tr>
            <tr className="bg-slate-200">
              <td className="px-4 py-3 font-bold">Total</td>
              <td className="px-4 py-3 text-center font-bold">62</td>
              <td className="px-4 py-3 text-center font-bold">58</td>
              <td className="px-4 py-3 text-center font-bold text-slate-800">120</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DataTable
        headers={["Métrica", "Valor", "Interpretación"]}
        rows={[
          ["Chi² (Pearson)", "5.14", "Estadístico observado"],
          ["gl", "1", "Tabla 2×2 → siempre 1 grado de libertad"],
          ["Valor p", "0.023", "Rechaza H₀: las proporciones difieren"],
          ["OR (Odds Ratio)", "2.59", "La terapia grupal tiene 2.6× más odds de éxito"],
          ["IC 95% OR", "[1.14 – 5.88]", "No incluye 1 → significativo"],
          ["Frecuencias esperadas", "min = 29", "Todas ≥ 5 → Chi² válido (no necesitas Fisher)"],
        ]}
        caption="Tabla 2×2 ficticia para ilustrar el cálculo. OR calculado con OpenEpi."
      />

      <Callout type="info" title="La regla de oro de Fisher vs Chi²">
        <p>
          Si <strong>alguna frecuencia esperada es menor de 5</strong>, el Chi-cuadrado pierde
          fiabilidad. Usa la <strong>Prueba Exacta de Fisher</strong>. Jamovi la calcula
          automáticamente en la misma tabla de resultados — solo activa la casilla "Fisher's exact
          test". En tablas grandes (más de 2×2) con frecuencias bajas, considera agrupar categorías.
        </p>
      </Callout>

      {/* Software con enfoque en la usabilidad */}
      <h2>🖥️ Jamovi y JASP: Tus Residentes Digitales de Confianza</h2>
      <p>
        Olvida la línea de comandos de R o las licencias prohibitivas de SPSS. Jamovi y JASP son el
        futuro amigable del análisis estadístico en salud. Piensa en ellos como un electrocardiógrafo
        digital: intuitivos, modernos y diseñados para que te centres en el diagnóstico (la
        interpretación clínica) y no en la mecánica del aparato.
      </p>

      <DataTable
        headers={["Característica", "Por qué te hará la vida más fácil"]}
        rows={[
          ["Interfaz en español y por menús", "Sin código. Similar a usar una app de tu móvil. Todo con clics y arrastrando variables."],
          ["Resultados en formato APA", "Tablas listas para copiar y pegar en tu TFG, TFM o artículo científico. Se acabó el maquetar a mano."],
          ["Pruebas estadísticas integradas", "T-Test, ANOVA, Wilcoxon, Chi-cuadrado, regresiones... todas a un par de clics de distancia."],
          ["Jamovi: Módulos ampliables", "Añade análisis de mediación, meta-análisis o potencia estadística desde su 'tienda' interna."],
          ["JASP: Enfoque bayesiano", "Si además del p-valor necesitas hablar de probabilidades con tu jefe, JASP te da factores de Bayes."],
        ]}
      />

      {/* Proceso paso a paso con un tono más narrativo */}
      <h2>👣 Tutorial Relámpago: Tu primer T-Test en Jamovi</h2>
      <p className="text-sm text-gray-500">
        Sigue estos pasos con tus datos abiertos. En menos de 3 minutos tendrás el resultado que
        buscabas.
      </p>
      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Prepara el 'Campo de Batalla' (Tus Datos)",
            description:
              "Abre Jamovi. Ve a la pestaña 'Datos'. Pega desde Excel o importa tu .csv. Estructura obligatoria: una columna 'Grupo' (con etiquetas 'Fármaco A', 'Fármaco B') y una columna numérica 'PAS' (presión arterial sistólica). Cada fila es un paciente único.",
          },
          {
            step: 2,
            title: "Elige tu Arma Analítica",
            description:
              "Haz clic en la pestaña 'Análisis' en la parte superior. Busca el icono 'Pruebas T'. Despliega el menú y selecciona 'Prueba T para muestras independientes'. Se abrirá un panel de opciones a la izquierda.",
          },
          {
            step: 3,
            title: "Asigna los Roles a las Variables",
            description:
              "Arrastra tu variable de resultado ('PAS') al cuadro 'Variables dependientes'. Luego, arrastra tu variable de agrupación ('Grupo') al cuadro 'Variable de agrupación'. Jamovi detectará automáticamente los grupos.",
          },
          {
            step: 4,
            title: "Marca las Opciones de Informe Clínico",
            description:
              "En el panel izquierdo, activa estas tres casillas VITALES: 'Prueba de Levene' (para comprobar si las varianzas son iguales), 'Diferencia de medias' e 'Intervalo de confianza al 95%'. Marca también 'Estadísticos descriptivos' para ver medias y DE.",
          },
          {
            step: 5,
            title: "Interpreta como un Profesional",
            description:
              "En la tabla de resultados, mira la fila que dice 'Prueba t de Student'. Ahí está tu estadístico 't', los 'gl' (grados de libertad) y el ansiado 'valor p'. Pero no te quedes solo ahí: observa la diferencia de medias y su intervalo de confianza. ¿Es una diferencia clínicamente relevante? Eso es lo que realmente importa.",
          },
        ]}
      />

      {/* Errores frecuentes con un tono correctivo pero amable */}
      <h2>⚠️ Los 3 Errores que Cometen (Casi) Todos los que Empiezan</h2>
      
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <h3 className="mt-0 flex items-center gap-2 text-red-800">
            <span className="text-2xl">1.</span> Tratar datos pareados como independientes
          </h3>
          <p className="text-red-700">
            Si mides la glucemia al mismo paciente antes y después de una intervención, NO puedes
            usar un T-Test para grupos independientes. Sería como comparar manzanas con naranjas,
            perdiendo la valiosa información del cambio individual. En Jamovi, usa la opción
            "Prueba T para muestras pareadas". Tu estudio ganará potencia y credibilidad.
          </p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <h3 className="mt-0 flex items-center gap-2 text-red-800">
            <span className="text-2xl">2.</span> Malinterpretar el p-valor como un semáforo
          </h3>
          <p className="text-red-700">
            El error más grave y extendido: pensar que p=0.03 significa "hay un 97% de
            probabilidad de que el fármaco funcione". FALSO. El p-valor asume que el fármaco NO
            funciona (hipótesis nula) y te dice: "si asumo que es un fraude, ¿qué probabilidad
            tendría de ver estos resultados por pura chiripa?". No te dice nada sobre la
            probabilidad de tu hipótesis. Un p=0.03 no siempre es clínicamente relevante.
          </p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-5">
          <h3 className="mt-0 flex items-center gap-2 text-red-800">
            <span className="text-2xl">3.</span> Cazar estrellitas mágicas (p &lt; 0.05)
          </h3>
          <p className="text-red-700">
            Si haces 20 T-Tests a la vez buscando algo "significativo", casi seguro que encontrarás
            una estrellita por pura suerte. Es la pesca de arrastre estadística (p-hacking).
            Declara de antemano qué vas a comparar y corrige por comparaciones múltiples (Bonferroni
            es un buen comienzo). La integridad científica te lo agradecerá.
          </p>
        </div>
      </div>

      {/* Flashcard interactivo */}
      <Flashcard
        question="Tengo una tabla 2x2 con pocos pacientes y una casilla con valor esperado de 3. ¿Qué hago?"
        answer={
          <p>
            Chi-cuadrado se quejará. Su supuesto clave (<strong>todas las frecuencias esperadas ≥5</strong>) está herido. 
            Tu salvación es la <strong>Prueba Exacta de Fisher</strong>. Es la navaja suiza para tablas 
            pequeñas y muestras escasas. Tanto Jamovi como JASP la calculan por ti automáticamente, 
            a menudo en la misma ventana de resultados que el Chi-cuadrado. Solo tienes que mirar la 
            fila correcta. No te compliques.
          </p>
        }
      />

      {/* Quiz con explicación enriquecida */}
      <Quiz
        question="Estás evaluando la efectividad de una nueva crema para la dermatitis. Mides el índice SCORAD (0-103) en 15 pacientes antes de usarla y en los mismos 15 pacientes un mes después. El QQ-plot de las diferencias muestra una desviación clara de la normalidad. ¿Qué prueba eliges?"
        options={[
          { text: "T-Test para muestras independientes", correct: false },
          { text: "Prueba de Wilcoxon de rangos con signo", correct: true },
          { text: "Chi-cuadrado de Pearson", correct: false },
          { text: "ANOVA de medidas repetidas", correct: false },
        ]}
        explanation="Claramente, es un diseño pareado (mismo paciente antes/después). Como la variable es continua pero la muestra es pequeña (n=15) y las diferencias NO son normales, la prueba paramétrica pareada pierde fiabilidad. La alternativa no paramétrica segura y robusta es la Prueba de Wilcoxon de rangos con signo. No te la juegues con el T-Test aquí; tu comité de ética y tu revisor lo agradecerán."
      />

      {/* Sección final con recursos y bibliografía */}
      <div className="mt-12 rounded-xl border border-gray-300 bg-gray-50 p-6">
        <h2 className="mt-0 text-xl font-bold text-gray-800">
          📚 Para seguir aprendiendo (Recursos curados para ti)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-semibold text-indigo-800">📖 Libros y Guías</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Martínez-González, M. A., Sánchez-Villegas, A., Toledo, E. & Faulin, J. (2020). <em>Bioestadística amigable</em> (4ª ed.). Elsevier.
                <span className="block text-xs text-gray-500">— La biblia para profesionales de la salud. Explica los conceptos con ejemplos clínicos reales.</span>
              </li>
              <li>
                Field, A. (2018). <em>Discovering statistics using IBM SPSS statistics</em> (5th ed.). SAGE.
                <span className="block text-xs text-gray-500">— Aunque menciona SPSS, los conceptos y la pedagogía de Andy Field (con sus gatos y anécdotas) son insuperables. Aplica todo lo que aprendas en Jamovi.</span>
              </li>
              <li>
                Navarro, D. J. & Foxcroft, D. R. (2019). <em>Learning statistics with jamovi</em>.
                <span className="block text-xs text-gray-500">— Gratuito y online. El manual de referencia para aprender estadística USANDO Jamovi.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-800">🎬 Videos y Tutoriales Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Canal de YouTube: Stats with Jamovi</strong>
                <span className="block text-xs text-gray-500">
                  Tutoriales gratuitos y muy visuales para cada prueba estadística paso a paso en Jamovi.
                </span>
              </li>
              <li>
                <strong>Canal de YouTube: Regorz Statistik</strong>
                <span className="block text-xs text-gray-500">
                  El canal de referencia en español para análisis con JASP y Jamovi, desde lo más básico hasta modelos avanzados.
                </span>
              </li>
              <li>
                <strong>Curso online: "Data Science for Health" (Coursera/EdX)</strong>
                <span className="block text-xs text-gray-500">
                  Para cuando quieras ir un paso más allá y adentrarte en la interpretación moderna de datos en salud.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Tu viaje en la estadística aplicada a la salud comienza con una prueba correcta.
            Si tienes dudas, vuelve al mapa de decisión.{" "}
            <strong>La práctica forja el conocimiento.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
