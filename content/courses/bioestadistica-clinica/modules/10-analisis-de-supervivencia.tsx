
import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen } from "lucide-react";

export const meta = {
  title: "Análisis de Supervivencia",
  subtitle: "Más allá del seguimiento: entendiendo el tiempo hasta el evento",
  objective:
    "Comprender la censura, construir e interpretar curvas Kaplan-Meier y evitar los errores más frecuentes en la lectura de estudios de supervivencia.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose">

      {/* ─── LECTURA COMPLEMENTARIA — REYES-REYES 2019 ─── */}
      <div className="rounded-xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-white p-5 flex gap-4 items-start mb-8">
        <div className="rounded-xl bg-emerald-600 text-white w-11 h-11 flex items-center justify-center text-xl shrink-0">📖</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-1">
            Puente con el libro base — Reyes-Reyes (2019)
          </p>
          <p className="text-sm font-bold text-slate-800 mb-2">
            <em>Probabilidad y aplicaciones en ciencias de la salud.</em>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            El análisis de supervivencia no cubre el libro de Reyes-Reyes, pero el{" "}
            <strong>estimador de Kaplan-Meier</strong> es una aplicación directa de la{" "}
            <strong>probabilidad condicional</strong> que sí estudia en profundidad
            (pp. 8–9). En cada escalón de la curva, Kaplan-Meier calcula:{" "}
            <em>P(sobrevivir hasta el tiempo t+1 | haber sobrevivido hasta t)</em> — exactamente
            la fórmula de probabilidad condicional multiplicativa. Relee esa sección si quieres
            entender la mecánica matemática detrás de cada paso de la curva.
          </p>
        </div>
      </div>

      {/* ANÉCDOTA DE APERTURA QUE ILUSTRA LA TRAMPA DE IGNORAR EL TIEMPO */}
      <h2>Cuando el tiempo cambia la historia: la lección del melanoma</h2>
      <p>
        Imagina que en un congreso de oncología te presentan dos tratamientos para el melanoma
        metastásico. A los dos años, la supervivencia es del 40% en ambos grupos. La comparación
        simple de proporciones diría que son iguales. Pero al observar las curvas Kaplan‑Meier,
        descubres que con el <strong>tratamiento A</strong> la mortalidad se concentra en los primeros
        8 meses (la curva cae en picado al inicio y luego se estabiliza), mientras que con el{" "}
        <strong>tratamiento B</strong> las muertes se reparten de forma más gradual a lo largo de los
        dos años.
      </p>
      <p>
        Esta diferencia temporal tiene consecuencias humanas enormes. El paciente que recibe el
        tratamiento A, si sobrevive al período crítico inicial, disfruta de una larga meseta de
        estabilidad. Con el tratamiento B, la amenaza permanece latente durante todo el seguimiento.
        <strong>La misma tasa a los 24 meses esconde dos experiencias vitales completamente distintas.</strong>
      </p>
      <p>
        El análisis de supervivencia no solo responde <em>¿cuántos?</em> sino{" "}
        <strong>¿cuándo?</strong>. Y eso, en la clínica, lo cambia todo.
      </p>

      <Callout type="curiosity" title="El origen del nombre">
        <p>
          El término “supervivencia” viene de las ciencias actuariales y la oncología, donde el
          desenlace era la muerte. Hoy lo usamos para cualquier evento cuyo <strong>tiempo de
          ocurrencia</strong> sea la variable de interés: cicatrización de una herida, abandono del
          tabaco, primera caída en ancianos, reingreso hospitalario… Por eso también se le llama{" "}
          <strong>análisis de tiempo hasta el evento</strong>.
        </p>
      </Callout>

      <h2>Los pilares del análisis de supervivencia</h2>
      <DataTable
        headers={["Concepto", "Definición", "Por qué es clave"]}
        rows={[
          [
            <strong key="tte">Tiempo hasta evento</strong>,
            "Período desde un origen definido hasta que ocurre el desenlace (o se censura al paciente).",
            "Captura la velocidad del efecto, no solo la tasa cruda al final.",
          ],
          [
            <strong key="cen">Censura</strong>,
            "Situación en la que no observamos el evento. No es un dato perdido, es información parcial válida.",
            "Eliminar a los censurados sesga el resultado; el análisis de supervivencia los incorpora hasta el último momento observado.",
          ],
          [
            <strong key="km">Curva Kaplan‑Meier</strong>,
            "Gráfico en escalera que estima la probabilidad de no haber experimentado el evento en cada momento.",
            "Es el estándar visual para comunicar resultados de tiempo hasta evento.",
          ],
          [
            <strong key="lr">Log‑Rank test</strong>,
            "Prueba estadística que compara dos o más curvas de supervivencia.",
            "Indica si hay diferencias significativas globales, pero asume riesgos proporcionales.",
          ],
        ]}
      />

      <h2>La censura: el concepto que no puedes ignorar</h2>
      <Callout type="warning" title="Ignorar la censura es un sesgo grave">
        <p>
          Si descartas a los pacientes que no han tenido el evento (porque terminó el estudio o se
          perdieron), estás eliminando precisamente a los que mejor o peor podrían estar. Imagina un
          estudio sobre abandono del tabaco: eliminar a los que no recaen (censurados) haría que
          pareciera que todos recaen. <strong>La censura no es un fallo, es una realidad del
          seguimiento y el análisis debe reflejarla.</strong>
        </p>
      </Callout>

      <DataTable
        headers={["Tipo de censura", "Cuándo ocurre", "Ejemplo clínico real"]}
        rows={[
          [
            <strong key="cd">Censura a la derecha (la más habitual)</strong>,
            "El evento no ha ocurrido al finalizar el seguimiento.",
            "En el estudio DAPA‑HF (dapagliflozina en IC), el 82% de los pacientes no había fallecido al cierre; son censuras a la derecha.",
          ],
          [
            "Censura a la izquierda",
            "El evento ocurrió antes de entrar al estudio, pero desconocemos el momento exacto.",
            "Niño con caries al ingresar a un programa preventivo; no sabemos cuándo apareció la lesión.",
          ],
          [
            "Censura por pérdida de seguimiento",
            "El participante abandona el estudio sin que sepamos si experimentó el evento.",
            "Paciente que deja de acudir a las visitas de control en un ensayo de anticoagulación.",
          ],
          [
            "Evento competitivo",
            "Otro evento impide observar el desenlace principal.",
            "Fallecimiento por accidente en un estudio de recaída de cáncer de mama; la muerte compite con la recaída.",
          ],
        ]}
      />

      {/* ILUSTRACIÓN SVG DE LA CENSURA */}
      <h3>Visualiza la censura en un estudio con 6 pacientes</h3>
      <svg
        viewBox="0 0 600 220"
        className="w-full my-6"
        role="img"
        aria-label="Línea de tiempo de 6 pacientes en un estudio de supervivencia. Tres experimentan el evento (puntos rojos), dos son censurados al final del estudio (flechas verdes) y uno se pierde durante el seguimiento (triángulo naranja)."
        overflow="visible"
        style={{ maxWidth: "600px", width: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}
      >
        <line x1="50" y1="180" x2="550" y2="180" stroke="#333" strokeWidth="2" />
        <text x="300" y="205" textAnchor="middle" fontSize="12" fill="#333" fontWeight="600">
          Tiempo de seguimiento (meses)
        </text>
        {/* Paciente 1: evento temprano */}
        <circle cx="120" cy="50" r="8" fill="#ef4444" />
        <text x="120" y="38" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">Evento</text>
        <line x1="120" y1="50" x2="120" y2="175" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
        {/* Paciente 2: evento más tarde */}
        <circle cx="350" cy="80" r="8" fill="#ef4444" />
        <line x1="350" y1="80" x2="350" y2="175" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="350" y="68" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">Evento</text>
        {/* Paciente 3: evento tardío */}
        <circle cx="480" cy="110" r="8" fill="#ef4444" />
        <line x1="480" y1="110" x2="480" y2="175" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="480" y="98" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">Evento</text>
        {/* Paciente 4: censura al final */}
        <line x1="450" y1="140" x2="530" y2="140" stroke="#16a34a" strokeWidth="2.5" />
        <polygon points="530,136 540,140 530,144" fill="#16a34a" />
        <text x="490" y="130" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="600">Censura (fin estudio)</text>
        <line x1="530" y1="140" x2="530" y2="175" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" />
        {/* Paciente 5: pérdida de seguimiento */}
        <line x1="200" y1="160" x2="280" y2="160" stroke="#f59e0b" strokeWidth="2.5" />
        <polygon points="280,156 288,160 280,164" fill="#f59e0b" />
        <text x="240" y="150" textAnchor="middle" fontSize="10" fill="#f59e0b" fontWeight="600">Pérdida</text>
        <line x1="280" y1="160" x2="280" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
        {/* Paciente 6: censura al final */}
        <line x1="70" y1="120" x2="150" y2="120" stroke="#16a34a" strokeWidth="2.5" />
        <polygon points="150,116 160,120 150,124" fill="#16a34a" />
        <text x="110" y="110" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="600">Censura</text>
        <line x1="150" y1="120" x2="150" y2="175" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" />
        {/* Línea base de tiempo */}
        <text x="40" y="60" fontSize="11" fill="#555">Inicio</text>
        <line x1="40" y1="65" x2="40" y2="175" stroke="#555" strokeWidth="1" strokeDasharray="3,3" />
        <text x="530" y="60" fontSize="11" fill="#555">Fin</text>
        <line x1="530" y1="65" x2="530" y2="175" stroke="#555" strokeWidth="1" strokeDasharray="3,3" />
      </svg>

      <p className="text-sm text-gray-600">
        Cada línea horizontal representa a un paciente. Los círculos rojos son eventos; las flechas
        verdes son pacientes que llegan al final sin evento (censura a la derecha); el triángulo
        naranja es una pérdida de seguimiento. Todos ellos aportan información valiosa hasta el
        momento en que dejan de ser observados.
      </p>

      <h2>Anatomía de una curva Kaplan‑Meier</h2>
      <p>
        La curva Kaplan‑Meier parece una escalera que desciende. Cada escalón hacia abajo es un
        evento; las marcas verticales pequeñas (ticks) que ves sobre la curva indican pacientes
        censurados. Fíjate bien: una curva que cae mucho al principio pero luego se vuelve plana
        cuenta una historia muy distinta de otra que desciende de manera constante.
      </p>

      <svg
        viewBox="0 0 700 420"
        className="w-full my-6"
        role="img"
        aria-label="Curva Kaplan-Meier de ejemplo con anotaciones. Eje X: meses de seguimiento; eje Y: probabilidad de supervivencia. La curva comienza en 1.0 y desciende en escalones en los meses 2, 5, 8, 14, 20 y 24. Aparecen ticks de censura (+) a lo largo de la curva. Se incluye banda de intervalo de confianza del 95% en gris. Debajo, tabla de número de pacientes en riesgo en distintos momentos."
        overflow="visible"
        style={{ maxWidth: "700px", width: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}
      >
        {/* Ejes */}
        <line x1="70" y1="30" x2="70" y2="330" stroke="#333" strokeWidth="1.5" />
        <line x1="70" y1="330" x2="630" y2="330" stroke="#333" strokeWidth="1.5" />
        <text x="350" y="365" textAnchor="middle" fontSize="13" fill="#333" fontWeight="600">
          Meses de seguimiento
        </text>
        <text x="20" y="185" textAnchor="middle" fontSize="13" fill="#333" fontWeight="600" transform="rotate(-90, 20, 185)">
          Probabilidad de supervivencia
        </text>

        {/* Etiquetas eje X */}
        {[0, 6, 12, 18, 24].map((m, i) => (
          <text key={i} x={70 + (i * 112)} y={355} textAnchor="middle" fontSize="11" fill="#555">{m}</text>
        ))}
        {/* Etiquetas eje Y */}
        {[0, 0.25, 0.5, 0.75, 1.0].map((y, i) => {
          const yPos = 330 - (i * 75);
          return (
            <text key={i} x="60" y={yPos + 4} textAnchor="end" fontSize="11" fill="#555">{y.toFixed(2)}</text>
          );
        })}

        {/* Banda del IC 95% (gris sombreado) */}
        <path
          d="M 70 30 L 182 30 L 294 105 L 406 160 L 518 230 L 630 280 L 630 300 L 518 260 L 406 190 L 294 135 L 182 60 Z"
          fill="rgba(0,0,0,0.05)"
        />

        {/* Curva Kaplan-Meier tipo escalera */}
        <polyline
          points="70,30 182,30 182,105 294,105 294,105 406,105 406,160 518,160 518,230 630,230 630,280"
          fill="none"
          stroke="#1e40af"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Ticks de censura (+) en tiempos: 3, 9, 15 meses */}
        <line x1="140" y1="30" x2="140" y2="38" stroke="#1e40af" strokeWidth="2" />
        <text x="140" y="26" textAnchor="middle" fontSize="9" fill="#1e40af">+</text>
        <line x1="238" y1="105" x2="238" y2="113" stroke="#1e40af" strokeWidth="2" />
        <text x="238" y="101" textAnchor="middle" fontSize="9" fill="#1e40af">+</text>
        <line x1="462" y1="160" x2="462" y2="168" stroke="#1e40af" strokeWidth="2" />
        <text x="462" y="156" textAnchor="middle" fontSize="9" fill="#1e40af">+</text>

        {/* Anotaciones */}
        <line x1="182" y1="105" x2="210" y2="105" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="182" cy="105" r="4" fill="#ef4444" />
        <text x="215" y="100" fontSize="11" fill="#ef4444" fontWeight="600">Evento (muerte)</text>

        <line x1="140" y1="34" x2="160" y2="45" stroke="#16a34a" strokeWidth="1.5" />
        <text x="165" y="48" fontSize="11" fill="#16a34a" fontWeight="600">Censura (+)</text>

        {/* Tabla de número en riesgo */}
        <line x1="70" y1="390" x2="630" y2="390" stroke="#ccc" strokeWidth="1" />
        <text x="350" y="408" textAnchor="middle" fontSize="11" fill="#333" fontWeight="600">Pacientes en riesgo</text>
        {["0", "6", "12", "18", "24"].map((mes, i) => {
          const x = 70 + i * 112;
          return <text key={i} x={x} y="425" textAnchor="middle" fontSize="11" fill="#555">{mes} m</text>;
        })}
        {[250, 210, 178, 145, 98].map((n, i) => {
          const x = 70 + i * 112;
          return <text key={i} x={x} y="442" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">{n}</text>;
        })}

        <text x="350" y="460" textAnchor="middle" fontSize="10" fill="#777">
          Con menos de 10‑15 pacientes en riesgo, la cola de la curva es muy imprecisa.
        </text>
      </svg>

      <Callout type="info" title="Regla nemotécnica para leer la curva">
        <p>
          <strong>Escalón = evento.</strong> <br />
          <strong>Tick (+) = censura.</strong> <br />
          <strong>Meseta larga = estabilidad.</strong> <br />
          <strong>Caída brusca = muchos eventos simultáneos.</strong> <br />
          <strong>Tabla debajo = número real de pacientes que “sostienen” la curva.</strong>
        </p>
      </Callout>

      <h2>Ejemplos multidisciplinarios con estudios reales</h2>

      <Callout type="tip" title="🔬 Insuficiencia cardíaca: DAPA‑HF (dapagliflozina)">
        <p>
          En el estudio <strong>DAPA‑HF (n=4744)</strong>, la variable principal fue un compuesto de
          muerte cardiovascular u hospitalización por insuficiencia cardíaca. Las curvas
          Kaplan‑Meier mostraron una separación precoz (hacia los 28 días) que se mantuvo y amplió
          durante 18 meses de seguimiento. El Hazard Ratio fue de 0.74 (IC 95%: 0.65‑0.85). La
          velocidad con que las curvas se separan es casi tan importante como el HR mismo: indica un
          beneficio rápido, algo que una simple comparación de proporciones ignoraría.
        </p>
      </Callout>

      <Callout type="tip" title="🧠 Recaída en trastorno por consumo de alcohol (psicología)">
        <p>
          En un ensayo aleatorizado de dos terapias tras deshabituación, la “supervivencia” es el
          tiempo hasta el primer consumo. Pacientes que completan 12 meses sin recaer son censurados
          al final del estudio. Las curvas mostraron que la terapia intensiva reducía las recaídas
          tempranas (la curva del grupo control caía abruptamente en las primeras 4 semanas, mientras
          la del grupo intervención se mantenía más alta). El test de Log‑Rank dio p=0.03. Una caída
          brusca al inicio obliga a diseñar refuerzos precoces.
        </p>
      </Callout>

      <Callout type="tip" title="👶 Lactancia materna exclusiva (nutrición / enfermería pediátrica)">
        <p>
          Evento: abandono de la lactancia materna exclusiva (medido en meses). Un estudio comparó
          consejería estándar frente a un programa intensivo de apoyo telefónico. La curva del grupo
          apoyo se mantuvo por encima, con una mediana de 5.2 meses frente a 2.8 meses. La
          inspección visual reveló que la mayor diferencia se acumulaba en los primeros 3 meses,
          precisamente cuando la curva del grupo control caía en picado. Conclusión: el apoyo
          temprano es crítico.
        </p>
      </Callout>

      <h2>Caso práctico: interpretemos juntos una curva real (estudio KEYNOTE‑024)</h2>
      <p>
        <strong>Contexto:</strong> KEYNOTE‑024 comparó pembrolizumab frente a quimioterapia basada en
        platino en cáncer de pulmón no microcítico avanzado con expresión de PD‑L1 ≥50%. El desenlace
        primario fue supervivencia global. Las curvas Kaplan‑Meier (ver figura original en{" "}
        <em>N Engl J Med 2016;375:1823‑33</em>) muestran:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Ambas curvas parten juntas y no se separan hasta aproximadamente los <strong>3 meses</strong>.</li>
        <li>A partir del 3<sup>er</sup> mes, la curva de pembrolizumab se mantiene más alta, con un descenso más lento.</li>
        <li>Alrededor de los 6‑9 meses la diferencia se acentúa.</li>
        <li>Las colas de ambas curvas (más de 18 meses) se basan en menos de 20 pacientes en riesgo.</li>
      </ul>
      <p>
        <strong>Interpretación guiada:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>La separación tardía indica que el beneficio de la inmunoterapia no es inmediato; algunos pacientes pueden incluso fallecer antes de que el efecto se manifieste.</li>
        <li>El Hazard Ratio global fue 0.60 (IC 95%: 0.41‑0.89, p=0.005), pero la violación de la asunción de riesgos proporcionales (curvas que se separan después) sugiere que el HR no es constante en el tiempo.</li>
        <li>Los IC en la cola son amplios: no podemos afirmar con certeza qué ocurre más allá de 24 meses con este tamaño muestral.</li>
      </ul>

      <Callout type="warning" title="¿Qué nos enseña este caso?">
        <p>
          Que la inspección visual de las curvas y el número en riesgo es complementaria al Log‑Rank
          y al HR. Una curva que se separa tardíamente puede tener implicaciones para el diseño de
          ensayos (seguimiento prolongado necesario) y para la decisión clínica (no esperar
          beneficio inmediato).
        </p>
      </Callout>

      <h2>Cómo construir e interpretar una curva (proceso paso a paso)</h2>
      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Define el evento y el inicio del reloj",
            description:
              "El evento debe ser binario y clínicamente relevante. El tiempo se mide desde un mismo origen para todos (aleatorización, diagnóstico, alta hospitalaria). Ejemplo: ‘tiempo hasta primer reingreso cardiovascular desde el alta’.",
          },
          {
            step: 2,
            title: "Codifica cada paciente: tiempo y estado",
            description:
              "Necesitas dos variables: (1) tiempo hasta el evento o la censura, y (2) indicador de si ocurrió el evento (1) o fue censurado (0).",
          },
          {
            step: 3,
            title: "Lee los escalones: cada bajada es un evento",
            description:
              "Cada caída vertical en la curva corresponde a uno o más eventos en ese instante. Cuanto más juntos los escalones, más densidad de eventos.",
          },
          {
            step: 4,
            title: "Busca las marcas de censura (tick marks)",
            description:
              "Cada ‘+’ o pequeño trazo vertical sobre la curva indica un paciente censurado. Muchas marcas al final te alertan de que la cola es poco fiable.",
          },
          {
            step: 5,
            title: "No ignores la tabla de pacientes en riesgo",
            description:
              "Debajo del gráfico verás una tabla con el número de pacientes aún en seguimiento en distintos momentos. Con menos de 10‑15, los intervalos de confianza se disparan.",
          },
          {
            step: 6,
            title: "Compara curvas con el test de Log‑Rank y el Hazard Ratio",
            description:
              "El Log‑Rank da un p‑valor global. El Hazard Ratio cuantifica la diferencia relativa en el riesgo instantáneo entre grupos. Verifica la asunción de riesgos proporcionales; si las curvas se cruzan, el HR puede no ser válido.",
          },
        ]}
      />

      <h2>Errores que aún cometen profesionales brillantes</h2>
      <DataTable
        headers={["Error", "Consecuencia", "Cómo corregirlo"]}
        rows={[
          [
            "Mirar solo la cola sin comprobar cuántos pacientes quedan",
            "Puedes creer que una meseta con 5 pacientes representa estabilidad real.",
            "Siempre revisa la tabla de número en riesgo debajo de la curva.",
          ],
          [
            "Confundir ticks de censura con eventos",
            "Sobreestimarás el número de eventos y la caída de la curva.",
            "Recuerda: escalón = evento, tick (+) = paciente que sale sin evento.",
          ],
          [
            "Decir que dos curvas son iguales porque se cruzan",
            "El cruce de curvas viola la asunción de riesgos proporcionales; el Log‑Rank puede no ser la herramienta adecuada.",
            "Cuando las curvas se cruzan, explora el Landmark analysis o el test de Fleming‑Harrington.",
          ],
          [
            "Comparar solo proporciones al final del seguimiento",
            "Ignoras cuándo ocurrieron los eventos. Dos curvas con igual tasa al año pueden tener trayectorias muy distintas.",
            "El análisis de supervivencia te muestra el camino, no solo el destino.",
          ],
        ]}
      />

      <Flashcard
        question="¿Por qué no basta con comparar porcentajes al final del estudio?"
        answer={
          <p>
            Porque el tiempo importa. Un tratamiento que reduce la mortalidad precoz pero la iguala
            al año es muy diferente de otro que retrasa la muerte pero no la evita. Además, ignorar a
            los censurados (pacientes que no tuvieron el evento) puede dar una imagen falsa de la
            efectividad. La curva Kaplan‑Meier aprovecha toda la información disponible, evento a
            evento.
          </p>
        }
      />

      <Flashcard
        question="¿Qué significa exactamente que un paciente esté censurado?"
        answer={
          <p>
            Significa que dejamos de observarlo sin que haya ocurrido el evento de interés. Puede ser
            porque finalizó el estudio, porque se perdió el contacto o porque sufrió un evento
            competitivo (ej. muerte por otra causa). La censura no es un fallo del estudio; es una
            realidad del seguimiento. El análisis de supervivencia lo maneja correctamente al
            incluir al paciente hasta el último momento en que sabemos que estaba libre de evento.
          </p>
        }
      />

      <Flashcard
        question="El artículo reporta un HR global de 0,72 (p = 0,04) con regresión de Cox. ¿Cómo sé si ese HR es fiable o si el efecto varía con el tiempo?"
        answer={
          <div>
            <p>
              El Hazard Ratio de Cox asume <strong>riesgos proporcionales</strong>: que el efecto
              relativo del tratamiento es constante a lo largo del tiempo. Si esto no se cumple (p.ej.,
              las curvas Kaplan-Meier se cruzan o el beneficio desaparece tras el primer año), el HR
              global puede ser engañoso.
            </p>
            <p style={{ marginTop: 8 }}>
              <strong>¿Qué buscar en el artículo?</strong>
            </p>
            <ul style={{ marginTop: 4, paddingLeft: 18, lineHeight: 1.8 }}>
              <li>
                <strong>Residuos de Schoenfeld:</strong> Prueba formal del supuesto de riesgos
                proporcionales. Si p &lt; 0,05, el HR global es cuestionable.
              </li>
              <li>
                <strong>Gráfico de log(-log):</strong> Las curvas de supervivencia deben ser
                paralelas en escala log-log si el supuesto se cumple.
              </li>
              <li>
                <strong>Cox estratificado o análisis por períodos:</strong> Si el efecto no es
                constante, los autores deberían reportar HRs separados por ventanas temporales
                (ej. &lt; 6 meses vs. &gt; 6 meses).
              </li>
            </ul>
            <p style={{ marginTop: 8, fontStyle: "italic", color: "#64748B" }}>
              Si el artículo no incluye ninguna verificación del supuesto de proporcionalidad y las
              curvas visualmente se cruzan o divergen tardíamente, toma el HR global con precaución.
              Ejemplos como KEYNOTE-024 requirieron análisis de riesgo no proporcional para capturar
              el beneficio tardío del pembrolizumab.
            </p>
          </div>
        }
      />

      <Quiz
        question="Observas una curva Kaplan‑Meier que desciende de forma brusca en los primeros 3 meses y luego se mantiene casi plana hasta los 24 meses. ¿Qué interpretación es más acertada?"
        options={[
          {
            text: "El tratamiento es ineficaz porque la mayor parte de los eventos ocurren al principio.",
            correct: false,
          },
          {
            text: "La mayoría de los eventos se concentran tempranamente; los pacientes que superan esa fase tienen un pronóstico bastante estable después.",
            correct: true,
          },
          {
            text: "La curva está mal construida porque nunca puede tener una meseta larga.",
            correct: false,
          },
          {
            text: "El número de pacientes en riesgo probablemente aumenta al final.",
            correct: false,
          },
        ]}
        explanation="Una caída precoz seguida de una meseta indica que el riesgo es alto al inicio y luego disminuye. Esto es típico en algunas cirugías de alto riesgo o en recaídas de adicciones. El número de pacientes en riesgo solo puede disminuir o mantenerse; nunca aumenta."
      />

      <Quiz
        question="¿Cuál es la principal limitación al interpretar la parte final (cola) de una curva Kaplan‑Meier?"
        options={[
          {
            text: "La cola siempre sobreestima la supervivencia por un error del método",
            correct: false,
          },
          {
            text: "Suele basarse en un número muy reducido de personas en riesgo por censura acumulada",
            correct: true,
          },
          {
            text: "El test de Log‑Rank no puede aplicarse en esa zona de la curva",
            correct: false,
          },
          {
            text: "Las marcas de censura desaparecen en la cola, haciendo el análisis imposible",
            correct: false,
          },
        ]}
        explanation="Al acumularse censuras, al final quedan muy pocos pacientes. Con menos de 10‑15, los IC se ensanchan y la curva se vuelve poco fiable. Por eso los artículos serios incluyen la tabla de pacientes en riesgo debajo del gráfico."
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
                Hosmer, D. W., Lemeshow, S. & May, S. (2008). <em>Applied Survival Analysis: Regression Modeling of Time-to-Event Data</em> (2ª ed.). Wiley.
                <span className="block text-xs text-gray-500">Texto de referencia para profundizar en modelos de regresión de Cox y diagnósticos.</span>
              </li>
              <li>
                Kleinbaum, D. G. & Klein, M. (2012). <em>Survival Analysis: A Self-Learning Text</em> (3ª ed.). Springer.
                <span className="block text-xs text-gray-500">Excelente para autodidactas, con ejemplos clínicos paso a paso.</span>
              </li>
              <li>
                Altman, D. G. & Bland, J. M. (1998). Time to event (survival) data. <em>BMJ</em>, <em>317</em>(7156), 468–469.
                <span className="block text-xs text-gray-500">Lectura breve y clarísima sobre los fundamentos del análisis de supervivencia.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                StatQuest — Survival Analysis (Kaplan-Meier, Log-Rank, Hazard Ratio):{" "}
                <a href="https://www.youtube.com/c/joshstarmer" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  youtube.com/c/joshstarmer
                </a>
                <span className="block text-xs text-gray-500">Explicación visual y amena de los tres conceptos centrales del módulo. Ideal para empezar.</span>
              </li>
              <li>
                MarinStatsLectures — Survival Analysis Series:{" "}
                <a href="https://www.youtube.com/c/MarinStatsLectures" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  youtube.com/c/MarinStatsLectures
                </a>
                <span className="block text-xs text-gray-500">Curso completo en vídeos cortos, desde censura hasta modelos de Cox. Muy riguroso.</span>
              </li>
              <li>
                Calculadora online de Kaplan-Meier (Evan Miller):{" "}
                <a href="https://www.evanmiller.org/ab-testing/survival-curves.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  evanmiller.org
                </a>
                <span className="block text-xs text-gray-500">Permite cargar datos propios y generar curvas Kaplan-Meier interactivas.</span>
              </li>
              <li>
                OpenEpi — módulo de estadística:{" "}
                <a href="https://www.openepi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  openepi.com
                </a>
                <span className="block text-xs text-gray-500">Herramienta gratuita en línea para cálculos epidemiológicos y de supervivencia básicos.</span>
              </li>
              <li>
                Curso "Survival Analysis in R" (DataCamp).
                <span className="block text-xs text-gray-500">Introduce el análisis práctico con los paquetes `survival` y `survminer` en R.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Kaplan, E. L. & Meier, P. (1958). Nonparametric estimation from incomplete observations. <em>Journal of the American Statistical Association</em>, <em>53</em>(282), 457–481.</li>
            <li>Pocock, S. J., Clayton, T. C. & Altman, D. G. (2002). Survival plots of time-to-event outcomes in clinical trials: Good practice and pitfalls. <em>The Lancet</em>, <em>359</em>(9318), 1686–1689.</li>
            <li>McMurray, J. J. V. et al. (2019). Dapagliflozin in patients with heart failure and reduced ejection fraction (DAPA-HF). <em>New England Journal of Medicine</em>, <em>381</em>, 1995–2008.</li>
            <li>Reck, M. et al. (2016). Pembrolizumab versus chemotherapy for PD-L1-positive non-small-cell lung cancer (KEYNOTE-024). <em>New England Journal of Medicine</em>, <em>375</em>, 1823–1833.</li>
            <li>Reyes-Reyes, A. (2019). <em>Probabilidad y aplicaciones en ciencias de la salud.</em> (pp. 8–9, probabilidad condicional aplicada a Kaplan-Meier).</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Detrás de cada escalón de una curva Kaplan-Meier hay una historia clínica real: no solo
            cuántos, sino cuándo. Aprender a leer el tiempo hasta el evento es aprender a ver el
            camino completo del paciente, no solo su destino final.
          </p>
        </div>
      </div>
    </div>
  );
}
