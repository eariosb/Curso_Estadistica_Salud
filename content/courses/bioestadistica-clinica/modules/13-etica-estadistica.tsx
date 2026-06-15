import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { Shield, AlertTriangle, Search, FileText, Users, Scale, Eye, Heart, Stethoscope, BookOpen, Video, ExternalLink } from "lucide-react";

export const meta = {
  title: "Ética Estadística: La Integridad Detrás de Cada Número",
  subtitle: "Del dato crudo a la decisión clínica: por qué el rigor ético importa en cada paso del análisis",
  objective:
    "Comprender que cada fase del proceso estadístico —recolección, limpieza, modelamiento e interpretación— tiene dimensiones éticas inseparables de su dimensión técnica, y aprender a actuar con integridad en cada una de ellas.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose space-y-8">
      {/* Introducción con gancho emocional */}
      <div className="rounded-xl border border-emerald-200 
      bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-emerald-100 p-3">
            <Shield className="h-8 w-8 text-emerald-700" />
          </div>
          <div>
            <h2 className="mt-0 text-2xl font-bold text-emerald-950">
              Cuando los números mienten sin que nadie haya mentido
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Imagina esta escena: un comité de ética hospitalaria revisa tu estudio sobre un nuevo
              protocolo de prevención de úlceras por presión. Los números son correctos, el análisis
              es impecable, el p-valor es significativo. Pero alguien pregunta: "¿Por qué excluyeron
              a los pacientes más graves del análisis?" Silencio incómodo. No hubo fraude, no hubo
              fabricación de datos. Solo una decisión "técnica" de limpieza que, vista desde la ética,
              distorsionó completamente la realidad clínica. Bienvenido al terreno donde la estadística
              y la ética se funden en una sola disciplina.
            </p>
          </div>
        </div>
      </div>

      {/* El ciclo ético del dato */}
      <h2>🔄 El Viaje Ético del Dato: Cuatro Estaciones de Decisión</h2>
      <p>
        Un error frecuente —y peligroso— es pensar que la ética estadística se reduce a "no
        fabricar datos" o "no mentir en los resultados". La realidad es mucho más sutil y
        desafiante. Las decisiones con mayor carga ética suceden mucho antes del informe final:
        cuando decides qué registrar, cómo limpiar los datos, qué modelo elegir y cómo comunicar
        lo que encontraste. Una cadena de decisiones aparentemente técnicas puede producir
        conclusiones sesgadas, injustas o directamente dañinas, aunque ninguna de ellas sea
        individualmente fraudulenta.
      </p>

      <div className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 italic">
        <p className="flex items-start gap-3 text-amber-900">
          <Stethoscope className="mt-1 h-5 w-5 flex-shrink-0" />
          <span>
            <strong>Anécdota de un epidemiólogo senior:</strong> "En mis 30 años revisando
            artículos para revistas clínicas, solo he detectado fabricación de datos dos veces.
            Pero he encontrado decisiones de limpieza no documentadas que cambiaban las
            conclusiones en al menos el 15% de los manuscritos. El problema casi nunca es la
            mentira descarada; es la decisión 'técnica' que nadie cuestionó porque parecía inocua."
          </span>
        </p>
      </div>

      <Callout type="info" title="El ciclo ético del dato estadístico en salud">
        <div className="space-y-3">
          <p>
            <strong>Fase 1 — Recolección y gestión:</strong> ¿Qué se registra, con qué rigor,
            quién tiene acceso y cómo se protege la privacidad del paciente?
          </p>
          <p>
            <strong>Fase 2 — Limpieza y transformación:</strong> ¿Cómo se manejan outliers,
            datos faltantes y transformaciones sin fabricar los resultados deseados?
          </p>
          <p>
            <strong>Fase 3 — Modelamiento y pronóstico:</strong> ¿Cómo se selecciona un modelo
            y qué consecuencias tiene sobre quiénes se benefician o son perjudicados?
          </p>
          <p>
            <strong>Fase 4 — Interpretación y comunicación:</strong> ¿Cómo se informan los
            resultados sin inflarlos, sesgarlos o hacerlos incomprensibles para quienes
            toman decisiones clínicas?
          </p>
        </div>
      </Callout>

      {/* FASE 1: RECOLECCIÓN Y GESTIÓN ÉTICA DEL DATO */}
      <h2>📋 Fase 1: Recolección y Gestión Ética del Dato Crudo</h2>

      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
        <h3 className="mt-0 flex items-center gap-2 text-blue-800">
          <Users className="h-5 w-5" /> ¿Por qué importa éticamente cómo recolectas los datos?
        </h3>
        <p className="text-gray-700">
          El dato clínico no es una observación neutral: es el resultado de decisiones sobre
          qué medir, en quién, con qué instrumento, y quién tiene acceso a esa información.
          Cada una de esas decisiones puede introducir sesgos que persisten hasta el análisis
          final, por más sofisticado que sea el modelo estadístico aplicado después.{" "}
          <em>Garbage in, garbage out</em> no es solo un problema técnico: si los datos de
          entrada son sistemáticamente incompletos para ciertos grupos poblacionales, los
          resultados serán sistemáticamente injustos para esos mismos grupos.
        </p>
      </div>

      <Callout type="info" title="Los principios FAIR: el estándar internacional de gestión ética del dato">
        <p>
          Publicados en 2016 en <em>Scientific Data</em> (Wilkinson et al.), los principios
          FAIR definen que los datos de investigación deben ser:
        </p>
        <div className="mt-3 space-y-2">
          <p>
            <strong>F — Findable (Encontrables):</strong> Con identificadores únicos y
            metadatos que permitan localizarlos.
          </p>
          <p>
            <strong>A — Accessible (Accesibles):</strong> Disponibles bajo condiciones claras;
            accesibles para quienes tienen autorización.
          </p>
          <p>
            <strong>I — Interoperable (Interoperables):</strong> En formatos estándar que
            permitan combinarlos con otros conjuntos de datos.
          </p>
          <p>
            <strong>R — Reusable (Reutilizables):</strong> Con documentación suficiente de
            proveniencia, licencias claras y criterios de calidad registrados.
          </p>
        </div>
        <p className="mt-3">
          Aplicar FAIR no es burocracia: es la condición mínima para que otro investigador
          pueda verificar tus datos, detectar errores y replicar tus conclusiones.
        </p>
      </Callout>

      <h3>La trazabilidad como compromiso ético</h3>
      <p>
        La <strong>proveniencia del dato</strong> (quién lo registró, cuándo, con qué
        instrumento, bajo qué condiciones) no es un tecnicismo de bases de datos: es la cadena
        de custodia que permite verificar si lo que reportas es lo que realmente observaste.
        Sin trazabilidad, cualquier afirmación sobre los datos es, en el mejor caso,
        inverificable y, en el peor, indistinguible de una fabricación.
      </p>

      <DataTable
        headers={["Práctica", "Riesgo Ético", "Estándar Correcto"]}
        rows={[
          [
            "Registrar datos directamente en la hoja de análisis, sin fuente primaria",
            "Imposible verificar si el dato fue transcrito correctamente o alterado post hoc",
            "Mantener siempre una fuente primaria inmutable (papel original, base de datos con marca de tiempo, REDCap con auditoría)",
          ],
          [
            "No documentar las versiones del conjunto de datos",
            "Si alguien detecta un error posterior, es imposible saber qué análisis se hizo con qué versión",
            "Versionar los datos con fecha (ej. datos_v1_20240301.csv) y registrar en un log todos los cambios realizados",
          ],
          [
            "Compartir datos sin anonimización suficiente",
            "Violación de privacidad de participantes; en muchos países, infracción legal (RGPD en Europa, Habeas Data en Colombia)",
            "Aplicar protocolo de anonimización antes de compartir; usar repositorios con control de acceso (OSF, Zenodo, PhysioNet para datos clínicos)",
          ],
          [
            "Recopilar datos solo de grupos convenientes (p. ej., solo hombres adultos porque son más fáciles de reclutar)",
            "El modelo o la intervención resultante puede no funcionar en mujeres, niños o ancianos — daño para esos grupos ignorados",
            "Definir a priori los criterios de inclusión/exclusión y justificarlos. Si hay limitaciones, declararlas explícitamente en las limitaciones del estudio",
          ],
        ]}
      />

      <Callout type="tip" title="🛠️ Herramientas prácticas de gestión ética del dato">
        <div className="space-y-2">
          <p>
            <strong>REDCap:</strong> Sistema de captura de datos para investigación clínica con
            auditoría de cambios. Estándar en hospitales universitarios.{" "}
            <a href="https://www.project-redcap.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              project-redcap.org
            </a>
          </p>
          <p>
            <strong>OSF (Open Science Framework):</strong> Almacenamiento con control de versiones,
            preregistro y opción de acceso restringido para datos sensibles.{" "}
            <a href="https://osf.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              osf.io
            </a>
          </p>
          <p>
            <strong>Zenodo:</strong> Repositorio del CERN para datos de investigación; asigna DOI a
            cada depósito, lo que garantiza trazabilidad y citabilidad.{" "}
            <a href="https://zenodo.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              zenodo.org
            </a>
          </p>
          <p>
            <strong>PhysioNet:</strong> Repositorio especializado en datos fisiológicos y clínicos
            con protocolos de acceso controlado.{" "}
            <a href="https://physionet.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              physionet.org
            </a>
          </p>
        </div>
      </Callout>

      {/* FASE 2: LIMPIEZA Y TRANSFORMACIÓN ÉTICA */}
      <h2>🧹 Fase 2: Limpieza y Transformación Ética de los Datos</h2>

      <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-5">
        <h3 className="mt-0 flex items-center gap-2 text-purple-800">
          <Search className="h-5 w-5" /> El momento más silencioso de los sesgos
        </h3>
        <p className="text-gray-700">
          La limpieza de datos ocurre antes del análisis formal, lo que la hace invisible en
          los artículos publicados. Sin embargo, es exactamente aquí donde más decisiones
          discrecionales se toman: qué observaciones se consideran errores, cuáles se imputan,
          cómo se manejan los valores extremos. Cada una de esas decisiones puede alterar el
          resultado final tanto como una prueba estadística mal elegida. La diferencia entre
          limpiar datos y manipularlos reside en una sola cosa:{" "}
          <strong>si las reglas se establecieron antes de ver los resultados o después</strong>.
        </p>
      </div>

      <h3>El dilema ético de los valores atípicos (outliers)</h3>
      <p>
        Un valor atípico puede ser tres cosas muy distintas: un error de medición, una
        variación biológica real, o la señal más importante del conjunto de datos. Eliminar
        outliers sin justificación previa es la forma más encubierta de p-hacking. Pero
        mantenerlos ciegamente también puede ser un error metodológico si se trata de errores
        de captura verificables.
      </p>

      <Callout type="warning" title="Los outliers pueden ser las voces más importantes de tus datos">
        <p>
          En epidemiología, los valores extremos suelen representar a pacientes con
          presentaciones atípicas de la enfermedad, comorbilidades severas o pertenecientes
          a subpoblaciones subrepresentadas en el estudio. Eliminarlos{" "}
          <em>porque complican el análisis</em> es eliminar precisamente a quienes más
          necesitamos entender. Como señala Cathy O'Neil en{" "}
          <em>Weapons of Math Destruction</em> (2016):{" "}
          <strong>"Las reglas matemáticas frecuentemente ocultan juicios de valor."</strong>{" "}
          En el manejo de outliers, decidir qué cuenta como 'ruido' es decidir de quién
          importa la experiencia.
        </p>
      </Callout>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Define las reglas de exclusión ANTES de ver los datos",
            description:
              "En el protocolo o plan de análisis estadístico (SAP), especifica: '¿Se excluirán observaciones con valores fuera de X rango fisiológico? ¿Por qué ese rango?' Si las reglas de limpieza no estaban escritas antes, cualquier exclusión posterior es sospechosa de cherry-picking.",
          },
          {
            step: 2,
            title: "Distingue entre error de captura y variación real",
            description:
              "Un paciente con una presión arterial de 400 mmHg registrada es probablemente un error de captura (justificado excluir con documentación). Un paciente con PA de 200 mmHg es un hallazgo clínico real que debe mantenerse en el análisis principal y mencionarse en los resultados.",
          },
          {
            step: 3,
            title: "Documenta CADA exclusión y su razón",
            description:
              "El análisis ético requiere un 'log de limpieza': cuántos registros había, cuántos se excluyeron, por qué criterio, cuántos quedan. Este registro es parte de la trazabilidad del estudio y debe estar disponible para revisores. El flujo CONSORT para ensayos clínicos exige exactamente esto.",
          },
          {
            step: 4,
            title: "Realiza análisis de sensibilidad",
            description:
              "Una vez hecho el análisis principal, repítelo incluyendo los outliers excluidos. Si los resultados cambian dramáticamente, tienes un hallazgo de robustez que debe reportarse. Si son estables, tienes evidencia de que la exclusión fue metodológicamente justificada.",
          },
          {
            step: 5,
            title: "Imputa datos faltantes con método explícito y justificado",
            description:
              "La imputación múltiple (MICE) es el estándar actual para datos faltantes no aleatorios. Usarla no es obligatorio, pero sí lo es justificar qué método usaste y por qué. El método 'last observation carried forward' (LOCF) puede introducir sesgos sistemáticos y es cada vez menos aceptado sin justificación.",
          },
        ]}
      />

      <DataTable
        headers={["Práctica de Limpieza", "¿Ética o Antiética?", "Criterio de Distinción"]}
        rows={[
          [
            "Excluir registros duplicados verificados",
            "✅ Ética",
            "El criterio (registro con mismo ID y fecha) estaba especificado a priori en el protocolo",
          ],
          [
            "Excluir pacientes que no respondieron al tratamiento porque 'ensucian' el resultado",
            "❌ Antiética (ITT violado)",
            "Se violan los principios de Intención de Tratar; los no respondedores son información clínica crítica",
          ],
          [
            "Transformar una variable con distribución asimétrica (log, raíz cuadrada) antes del análisis",
            "✅ Ética si está justificada",
            "La transformación debe estar justificada metodológicamente a priori, no elegida post hoc para mejorar el p-valor",
          ],
          [
            "Elegir la transformación que produce el p-valor más pequeño entre varias probadas",
            "❌ Antiética (forma de p-hacking)",
            "La transformación se eligió en función del resultado deseado, no de las propiedades de los datos",
          ],
          [
            "Imputar datos faltantes con la media del grupo y reportarlo en métodos",
            "⚠️ Aceptable con precauciones",
            "Es un método conservador pero puede subestimar la varianza. Aceptable en pilotos si se declara; no ideal en estudios confirmatorios",
          ],
        ]}
      />

      {/* FASE 3: MODELAMIENTO ÉTICO Y SESGOS ALGORÍTMICOS */}
      <h2>🤖 Fase 3: Selección de Modelos, Pronósticos y Sesgos Algorítmicos</h2>

      <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
        <h3 className="mt-0 flex items-center gap-2 text-red-800">
          <Scale className="h-5 w-5" /> Por qué elegir un modelo es una decisión moral, no solo estadística
        </h3>
        <p className="text-gray-700">
          Un modelo estadístico o de machine learning no describe la realidad: la aproxima
          bajo ciertos supuestos. Qué modelo eliges, con qué datos lo entrenas, cómo lo
          evalúas y a qué población lo aplicas determina a quién beneficia y a quién perjudica.
          En salud, esta no es una consideración abstracta: los modelos predictivos clínicos se
          usan para asignar recursos, priorizar atención, tomar decisiones de tratamiento o
          determinar elegibilidad para ensayos.
        </p>
      </div>

      <Callout type="warning" title="⚠️ Caso real: el algoritmo que discriminó por raza sin usar la raza como variable">
        <p>
          En 2019, Obermeyer et al. publicaron en <em>Science</em> que un algoritmo comercial
          usado en hospitales de EE.UU. para priorizar pacientes de alto riesgo subestimaba
          sistemáticamente la gravedad de los pacientes negros. El algoritmo usaba el{" "}
          <em>costo histórico de atención médica</em> como proxy de necesidad de salud — una
          variable aparentemente neutral. Pero el costo histórico refleja acceso al sistema,
          no necesidad real: los pacientes negros históricamente habían recibido menos atención
          (y por tanto generado menos costos), así que el algoritmo los clasificaba como menos
          enfermos de lo que realmente estaban. El sesgo no estaba en el algoritmo: estaba en
          los datos, que codificaban décadas de inequidad estructural.
        </p>
      </Callout>

      <h3>Los tres tipos de sesgo algorítmico en salud</h3>

      <DataTable
        headers={["Tipo de Sesgo", "Mecanismo", "Ejemplo Clínico", "Mitigación"]}
        rows={[
          [
            "Sesgo de datos históricos",
            "El modelo aprende de datos que reflejan inequidades pasadas del sistema de salud",
            "Un modelo entrenado con registros de un hospital terciario no generaliza bien a poblaciones rurales o de bajos recursos que rara vez llegaban a ese hospital",
            "Diversificar las fuentes de entrenamiento; documentar de dónde vienen los datos y qué poblaciones están subrepresentadas",
          ],
          [
            "Sesgo por proxy variable",
            "Se usa una variable correlacionada con raza, sexo o nivel socioeconómico en lugar de la variable de interés clínico",
            "Usar 'cumplimiento del tratamiento' como predictor, cuando el incumplimiento está correlacionado con acceso a medicamentos, no con voluntad del paciente",
            "Análisis de equidad (fairness audit) por subgrupos antes de implementar; usar variables con validez clínica directa",
          ],
          [
            "Overfitting (sobreajuste)",
            "El modelo se ajusta demasiado a los datos de entrenamiento y no generaliza a nuevos pacientes",
            "Un modelo que predice mortalidad con 98% de precisión en el hospital donde se desarrolló, pero con 65% en otro hospital de la misma ciudad",
            "Validación externa obligatoria antes de implementación clínica; reportar métricas en la cohorte de validación, no solo en la de entrenamiento",
          ],
        ]}
      />

      <Callout type="tip" title="🤔 Preguntas éticas antes de implementar un modelo predictivo en clínica">
        <div className="space-y-2">
          <p><strong>1. ¿En qué datos fue entrenado?</strong> ¿Qué poblaciones representan y cuáles están ausentes?</p>
          <p><strong>2. ¿Fue validado externamente?</strong> ¿En una cohorte diferente, en un contexto diferente?</p>
          <p><strong>3. ¿Se evaluó el rendimiento por subgrupos?</strong> ¿Funciona igual de bien en hombres y mujeres, en jóvenes y ancianos, en distintos grupos étnicos?</p>
          <p><strong>4. ¿Qué pasa cuando el modelo se equivoca?</strong> ¿Los errores son aleatorios o sistemáticamente perjudican a ciertos grupos?</p>
          <p><strong>5. ¿Es interpretable para quien lo usará?</strong> Un clínico que no entiende por qué el modelo emite una alerta no puede ejercer juicio crítico sobre ella.</p>
          <p><strong>6. ¿Quién es responsable cuando el modelo causa daño?</strong> La responsabilidad no puede ser difusa entre el desarrollador, el hospital y el médico.</p>
        </div>
      </Callout>

      <Flashcard
        question="Un modelo de predicción de riesgo cardiovascular tiene un AUC de 0.87 en la cohorte de entrenamiento y 0.71 en la cohorte de validación externa. ¿Cuál es el problema ético de implementarlo clínicamente con solo los datos de entrenamiento?"
        answer={
          <p>
            La diferencia entre AUC 0.87 y 0.71 indica <strong>overfitting</strong>: el modelo
            aprendió características específicas de los pacientes en quienes fue entrenado y
            no generaliza bien a nuevos pacientes. Implementar este modelo en la práctica
            clínica equivale a tomar decisiones sobre pacientes reales con un instrumento cuyo
            rendimiento real es significativamente peor de lo reportado. El daño potencial
            es concreto: un paciente de alto riesgo puede ser clasificado como bajo riesgo
            por el modelo sobreajustado, retrasando intervenciones preventivas. La validación
            externa no es un requisito burocrático: es la garantía mínima de que el modelo
            funciona en el mundo real, no solo en los datos con los que fue construido.
          </p>
        }
      />

      {/* SESGOS COGNITIVOS DEL INVESTIGADOR */}
      <h2>🧠 Los Sesgos Cognitivos del Investigador: El Factor Humano en el Análisis</h2>

      <p>
        Hasta aquí hemos hablado de sesgos en los datos y en los algoritmos. Pero existe
        otro tipo de sesgo igualmente peligroso: el del investigador que analiza. Los sesgos
        cognitivos son errores sistemáticos de pensamiento que afectan cómo buscamos,
        interpretamos y recordamos la evidencia. No son fallos de inteligencia: son
        características del procesamiento humano de información, documentadas empíricamente
        en décadas de investigación cognitiva y que afectan a expertos tanto como a novatos.
      </p>

      <div className="my-6 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-5 italic">
        <p className="flex items-start gap-3 text-purple-900">
          <Eye className="mt-1 h-5 w-5 flex-shrink-0" />
          <span>
            <strong>Dato que humilla:</strong> Willems et al. (2023) evaluaron a 898 clínicos
            en preguntas básicas de estadística. La mayoría respondió mal, pero lo más
            preocupante fue que los más seguros de sus respuestas eran los más propensos a
            interpretar mal los p-valores. La confianza no correlaciona con la competencia
            estadística; de hecho, a menudo la inversa.
          </span>
        </p>
      </div>

      <DataTable
        headers={["Sesgo Cognitivo", "¿Cómo Aparece en Estadística Clínica?", "Antídoto"]}
        rows={[
          [
            "Sesgo de confirmación",
            "Interpretar resultados ambiguos como favorables a nuestra hipótesis inicial. Buscar literatura que apoya nuestra teoría e ignorar la que la contradice. Seleccionar subgrupos post hoc que confirman el resultado esperado.",
            "Análisis ciego (sin saber qué grupo es intervención/control). Revisión sistemática de literatura incluyendo activamente resultados nulos. Preregistro de hipótesis.",
          ],
          [
            "Sesgo de anclaje",
            "El primer resultado que ves ('el p-valor salió 0.04') ancla toda la interpretación posterior, aunque los análisis de sensibilidad muestren que el efecto es inestable.",
            "Revisar intervalos de confianza y tamaños de efecto antes de mirar el p-valor. Evaluar la consistencia del resultado en todos los análisis secundarios.",
          ],
          [
            "Exceso de confianza",
            "Un hallazgo en un solo estudio lleva a conclusiones universales. Interpretar como 'efecto establecido' lo que es un único hallazgo preliminar.",
            "Verificar el poder estadístico del estudio. Distinguir entre estudios exploratorios y confirmatorios. Reportar el intervalo de confianza como medida de incertidumbre.",
          ],
          [
            "Sesgo de disponibilidad",
            "Sobreestimar la frecuencia de efectos adversos que vienen a la mente fácilmente (porque ocurrieron recientemente o fueron dramáticos), subestimando los más comunes pero 'aburridos'.",
            "Usar datos de incidencia actualizados de fuentes sistemáticas (registros, metaanálisis) en lugar de estimaciones intuitivas.",
          ],
          [
            "Sesgo del costo hundido",
            "Defender una hipótesis rechazada por los datos porque se invirtieron años de investigación en ella. No reportar resultados nulos porque 'arruinan el artículo'.",
            "Entender que un resultado nulo es científicamente tan valioso como uno positivo — y éticamente superior a no publicar. La publicación negativa evita que otros repitan el error.",
          ],
        ]}
      />

      <Callout type="tip" title="🔬 El análisis ciego como antídoto estructural al sesgo de confirmación">
        <p>
          El análisis ciego (<em>blinded analysis</em>) consiste en analizar los datos sin
          saber cuál grupo es la intervención y cuál es el control, hasta tomar las
          decisiones analíticas clave. Es la extensión lógica del cegamiento clínico al
          estadístico. Si bien es imposible en muchos diseños, cuando es factible elimina
          la principal fuente de sesgo de confirmación en el análisis. Varios grupos han
          propuesto extensiones de este concepto para estudios observacionales bajo el
          nombre de <strong>"análisis de especificación ciega"</strong> (blind specification analysis).
        </p>
      </Callout>

      {/* FASE 4: INTERPRETACIÓN Y COMUNICACIÓN ÉTICA */}
      <h2>📢 Fase 4: Interpretación Ética y Comunicación de Resultados</h2>

      <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5">
        <h3 className="mt-0 flex items-center gap-2 text-orange-800">
          <FileText className="h-5 w-5" /> El "spin" estadístico: cómo la verdad puede ser engañosa
        </h3>
        <p className="text-gray-700">
          El <strong>spin</strong> en reporte de resultados es la práctica de presentar los
          datos de forma técnicamente correcta pero comunicativamente distorsionada, de manera
          que el lector forme una impresión más favorable del tratamiento o el hallazgo de lo
          que los datos justifican. No es mentir: es elegir cuidadosamente qué verdad contar
          y cómo contarla. La revisión sistemática de Boutron et al. (2010) encontró spin
          en el <strong>57% de los ensayos clínicos aleatorizados</strong> con resultados
          primarios no significativos publicados en revistas biomédicas de alto impacto.
        </p>
      </div>

      <DataTable
        headers={["Forma de Spin", "Ejemplo Real", "Reporte Ético Equivalente"]}
        rows={[
          [
            "Usar riesgo relativo en lugar de riesgo absoluto para exagerar el efecto",
            "'El tratamiento X reduce el riesgo de infarto en un 50%' (RRR). El riesgo basal era 2%, y con tratamiento es 1%: reducción absoluta de 1 punto porcentual. NNT = 100.",
            "Reportar siempre riesgo absoluto (ARR) y NNT junto al riesgo relativo. 'La reducción absoluta fue del 1% (IC 95%: 0.2%–1.8%), con un NNT de 100 pacientes durante 5 años.'",
          ],
          [
            "Presentar un desenlace secundario significativo como si fuera el resultado principal",
            "El estudio no alcanzó su endpoint primario (mortalidad), pero una mejoría en calidad de vida reportada como subescala fue 'significativa' y se convierte en el título del artículo.",
            "El abstract y la conclusión deben reflejar el resultado del desenlace primario preregistrado. Los secundarios se reportan como exploratorios.",
          ],
          [
            "Interpretar la ausencia de significación estadística como 'sin efecto'",
            "'No encontramos diferencias significativas entre los grupos, por lo tanto el nuevo tratamiento es equivalente al estándar.'",
            "'El estudio no tuvo poder estadístico suficiente para detectar diferencias. El intervalo de confianza del 95% para la diferencia media fue [-3.2, 8.1], que incluye tanto la posibilidad de un efecto clínicamente relevante como de ausencia de efecto.'",
          ],
          [
            "Reportar solo el p-valor sin el tamaño del efecto",
            "'La diferencia fue estadísticamente significativa (p=0.001)' — en un estudio con n=50,000 donde la diferencia clínica es trivial.",
            "Reportar siempre el tamaño del efecto (d de Cohen, RR, OR, diferencia de medias) e interpretar su relevancia clínica, no solo la significancia estadística.",
          ],
        ]}
      />

      <Callout type="warning" title="📰 La trampa del riesgo relativo: el ejemplo más recurrente en prensa médica">
        <p>
          En 2019, titulares de medios de todo el mundo proclamaron que la terapia hormonal
          sustitutiva (THS) aumentaba el riesgo de cáncer de mama "en un 30%". Este era el
          riesgo relativo. El riesgo absoluto, que los titulares omitieron: de cada 50 mujeres
          que no toman THS durante 5 años, 3 desarrollan cáncer de mama. Con THS, son 4 de 50.
          Una mujer adicional por cada 50 tratadas. Una diferencia real — pero muy distinta a
          la impresión de "30% más de riesgo" que domina la percepción pública.
        </p>
        <p className="mt-2">
          La obligación ética del investigador es presentar ambas cifras. Comunicar solo el
          riesgo relativo no es un error estadístico: es una elección comunicativa con
          consecuencias reales en las decisiones de las pacientes.
        </p>
      </Callout>

      <h3>Comunicar resultados a no-expertos: una obligación ética, no un opcional</h3>
      <p>
        Si tu investigación fue financiada con fondos públicos o involucró participantes
        humanos, tienes una deuda de claridad con la sociedad. Comunicar bien los resultados
        estadísticos a no-expertos no es simplificar ni vulgarizar: es hacer accesible la
        incertidumbre, los límites del conocimiento y la relevancia práctica de los
        hallazgos.
      </p>

      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Usa frecuencias naturales, no probabilidades",
            description:
              "'10 de cada 1000 pacientes' es comprendido correctamente por el 90% de las personas. '1% de los pacientes' es comprendido por menos del 25%. La investigación de Gigerenzer y Hoffrage (1995) demostró que el formato de frecuencias naturales mejora dramáticamente la comprensión estadística en médicos y pacientes.",
          },
          {
            step: 2,
            title: "Reporta siempre riesgo absoluto Y relativo, nunca solo uno",
            description:
              "El riesgo relativo captura el tamaño del efecto independientemente del riesgo basal, útil para comparar estudios. El riesgo absoluto y el NNT (número necesario a tratar) son los más relevantes para decisiones clínicas individuales. Reportar ambos no es redundante: es completo.",
          },
          {
            step: 3,
            title: "Presenta la incertidumbre, no la ocultes",
            description:
              "Un intervalo de confianza amplio no es una vergüenza a esconder: es información valiosa que dice al lector cuánto sabe realmente el estudio. 'El efecto estimado fue de 5 puntos (IC 95%: 0.1–9.9)' transmite algo muy diferente a '5 puntos (IC 95%: 4.8–5.2)'.",
          },
          {
            step: 4,
            title: "Distingue relevancia estadística de relevancia clínica",
            description:
              "Un resultado estadísticamente significativo puede ser clínicamente irrelevante si el tamaño del efecto es pequeño. Define antes del análisis cuál es la diferencia mínima clínicamente importante (MCID) para tu desenlace.",
          },
          {
            step: 5,
            title: "Reporta los resultados nulos con la misma energía que los positivos",
            description:
              "No encontrar un efecto es un hallazgo científico valioso. 'No encontramos evidencia de que X sea efectivo en esta población' es información que evita que miles de pacientes reciban intervenciones inútiles y que otros investigadores repitan el mismo experimento negativo.",
          },
        ]}
      />

      {/* QUIZ Y FLASHCARD */}
      <Quiz
        question="Un investigador anuncia: 'Nuestro nuevo fármaco reduce el riesgo de accidente cerebrovascular en un 40%.' El riesgo basal en la población estudiada era del 2% a 10 años, y con el fármaco fue del 1.2%. ¿Cuál es la evaluación ética y estadística más correcta?"
        options={[
          {
            text: "El 40% es correcto y suficiente para comunicar el resultado.",
            correct: false,
          },
          {
            text: "El 40% es el riesgo relativo, técnicamente correcto, pero comunicar solo ese número sin el riesgo absoluto (0.8%) y el NNT (~125) es éticamente problemático porque exagera la percepción del beneficio.",
            correct: true,
          },
          {
            text: "El resultado debería reportarse como 'no significativo' si el intervalo de confianza no se reporta.",
            correct: false,
          },
          {
            text: "El riesgo relativo siempre es la métrica preferida en comunicación clínica.",
            correct: false,
          },
        ]}
        explanation="El riesgo relativo del 40% es matemáticamente correcto (0.8/2.0 = 0.4; reducción del 40%). Pero el riesgo absoluto es de 0.8 puntos porcentuales y el NNT es ~125 (1/0.008). Una reducción del 40% en riesgo relativo suena transformadora; tratar a 125 personas para prevenir 1 evento en 10 años es una evaluación muy diferente para el clínico y el paciente. La ética de la comunicación estadística exige presentar ambas perspectivas: la relativa (para comparabilidad) y la absoluta (para decisión clínica individual)."
      />

      <Flashcard
        question="¿Qué diferencia a 'limpiar datos' (legítimo) de 'manipular datos' (antiético) cuando se excluyen observaciones del análisis?"
        answer={
          <p>
            La diferencia es temporal y documental: la limpieza ética sigue reglas
            establecidas <strong>antes de ver los resultados</strong> (en el protocolo o
            plan de análisis estadístico) y documenta <em>cada exclusión</em> con su razón.
            La manipulación establece las reglas <em>después</em> de ver los datos, eligiendo
            las exclusiones que producen el resultado deseado. Técnicamente, las decisiones
            pueden ser idénticas: la diferencia está en el momento en que se tomaron y en si
            quedaron registradas. Por eso el preregistro del plan de análisis es la única
            garantía verificable de que la limpieza fue prospectiva.
          </p>
        }
      />

      {/* ─── SECCIÓN PREREGISTRO ─── */}
      <h2>📋 Preregistro y Registered Reports: la garantía de la transparencia</h2>
      <p>
        El debate sobre la distinción entre análisis <strong>confirmatorio</strong> y{" "}
        <strong>exploratorio</strong> tiene una solución práctica concreta: el{" "}
        <strong>preregistro</strong>. Registrar de forma pública —antes de recolectar o ver
        los datos— la pregunta, los desenlaces primarios, el plan de análisis y los criterios
        de éxito convierte el estudio confirmatorio en verificable. Sin preregistro, nadie
        puede distinguir, a posteriori, si las hipótesis se plantearon antes o después de
        ver los datos (HARKing).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-bold text-blue-800 mb-2">🔬 ClinicalTrials.gov</p>
          <p className="text-sm text-blue-700 leading-relaxed">
            Obligatorio para ensayos clínicos que buscan publicación en revistas ICMJE. El registro
            previo al reclutamiento documenta desenlaces primarios, plan de análisis y tamaño
            muestral. Permite comparar lo preregistrado con lo publicado y detectar cambios
            post-hoc en los desenlaces (<em>outcome switching</em>).
          </p>
          <p className="text-xs text-blue-500 mt-2 font-mono">clinicaltrials.gov</p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
          <p className="text-sm font-bold text-violet-800 mb-2">🔓 OSF (Open Science Framework)</p>
          <p className="text-sm text-violet-700 leading-relaxed">
            Plataforma del Center for Open Science, gratuita y de acceso abierto, para preregistrar
            estudios observacionales, cuasi-experimentales y secundarios (que no caben en
            ClinicalTrials). Permite timestamping, control de versiones y acceso embargado
            hasta publicación. Ampliamente aceptada por revistas de psicología, enfermería
            y salud pública.
          </p>
          <p className="text-xs text-violet-500 mt-2 font-mono">osf.io</p>
        </div>
      </div>

      <Flashcard
        question="¿Qué son los Registered Reports y por qué reducen el sesgo de publicación?"
        answer={
          <div>
            <p>
              Los <strong>Registered Reports</strong> son un formato editorial en el que la
              revista evalúa y acepta (o rechaza) el artículo <em>antes</em> de que se
              recojan los datos, basándose únicamente en la importancia de la pregunta y la
              calidad del método. Una vez aceptado en principio, el estudio se publica
              independientemente de si los resultados son positivos o nulos.
            </p>
            <p style={{ marginTop: 8 }}>
              <strong>¿Por qué importa?</strong> El sesgo de publicación clásico surge porque
              las revistas prefieren resultados positivos. Con Registered Reports, el criterio
              de aceptación es el diseño, no el resultado. Esto elimina el incentivo para el
              p-hacking, el HARKing y la no-publicación de resultados nulos. Más de 300 revistas
              científicas ya ofrecen este formato, incluyendo <em>BMJ Open</em>,{" "}
              <em>PLOS ONE</em> y varias revistas de enfermería y salud pública.
            </p>
          </div>
        }
      />

      <Callout type="tip" title="Conexión con el Módulo 11 (Estudio Piloto)">
        <p>
          El preregistro aplica también a los estudios piloto. Al preregistrar un piloto,
          estableces de antemano que los desenlaces son de <strong>proceso</strong> (reclutamiento,
          retención, variabilidad), no de eficacia. Esto protege contra la tentación de
          reportar un efecto exploratorio como si fuera confirmatorio —el error más frecuente
          en pilotos publicados en ciencias de la salud.
        </p>
      </Callout>

      {/* SÍNTESIS FINAL */}
      <h2>🔄 Síntesis: El Ciclo Virtuoso de la Estadística Ética</h2>
      <p>
        La ética estadística no es una lista de prohibiciones. Es una forma de trabajar
        que hace que la ciencia funcione mejor: produce resultados más reproducibles, más
        confiables y más útiles para las personas que dependen de ellos. Cada decisión
        ética tiene un correlato metodológico que mejora la calidad del trabajo:
      </p>

      <DataTable
        headers={["Decisión Ética", "Beneficio Metodológico Directo"]}
        rows={[
          ["Preregistrar hipótesis y plan de análisis", "Separa confirmación de exploración; protege la validez inferencial"],
          ["Documentar cada decisión de limpieza de datos", "Hace el análisis reproducible; permite auditoría y detección de errores"],
          ["Validar externamente los modelos antes de implementarlos", "Detecta overfitting y sesgos de generalización que destruirían el valor del modelo en uso real"],
          ["Reportar intervalos de confianza y tamaños de efecto junto a p-valores", "Da información completa para que lectores y clínicos evalúen la relevancia práctica"],
          ["Publicar resultados nulos", "Reduce el sesgo de publicación, ahorra recursos a otros investigadores, y protege a pacientes de intervenciones inútiles"],
          ["Comunicar riesgos absolutos y relativos", "Permite decisiones informadas por pacientes y clínicos; reduce el efecto de framing sobre la percepción del beneficio"],
        ]}
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
                O&apos;Neil, C. (2016). <em>Weapons of Math Destruction.</em> Crown Publishers.
                <span className="block text-xs text-gray-500">Análisis accesible sobre cómo las decisiones "técnicas" en datos reproducen injusticias estructurales.</span>
              </li>
              <li>
                Gigerenzer, G. (2002). <em>Reckoning with Risk: Learning to Live with Uncertainty.</em> Penguin Books.
                <span className="block text-xs text-gray-500">El libro más accesible sobre razonamiento estadístico para no especialistas.</span>
              </li>
              <li>
                Barocas, S., Hardt, M. & Narayanan, A. (2023). <em>Fairness and Machine Learning.</em> MIT Press.
                <span className="block text-xs text-gray-500">Acceso libre en fairmlbook.org — El texto de referencia en equidad algorítmica.</span>
              </li>
              <li>
                Hernán, M. A. & Robins, J. M. (2020). <em>Causal Inference: What If.</em> Chapman & Hall/CRC.
                <span className="block text-xs text-gray-500">Descarga gratuita online. Imprescindible para entender DAGs y confusión.</span>
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
                <span className="block text-xs text-gray-500">Repositorio de más de 70 sesgos documentados en investigación clínica.</span>
              </li>
              <li>
                METRICS (Stanford):{" "}
                <a href="https://metrics.stanford.edu" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  metrics.stanford.edu
                </a>
                <span className="block text-xs text-gray-500">Centro global de investigación sobre integridad metodológica en ciencia biomédica.</span>
              </li>
              <li>
                EQUATOR Network:{" "}
                <a href="https://www.equator-network.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  equator-network.org
                </a>
                <span className="block text-xs text-gray-500">Red global de guías de reporte para todos los tipos de estudio en salud.</span>
              </li>
              <li>
                Curso en línea: "Causal Diagrams" de Miguel Hernán (edX/YouTube).
                <span className="block text-xs text-gray-500">Serie magistral y gratuita para aprender a dibujar e interpretar DAGs.</span>
              </li>
              <li>
                Canal de YouTube: StatQuest with Josh Starmer.
                <span className="block text-xs text-gray-500">Explicaciones visuales y divertidas sobre conceptos estadísticos complejos.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J. et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. <em>Scientific Data</em>, <em>3</em>, 160018.</li>
            <li>Obermeyer, Z., Powers, B., Vogeli, C. & Mullainathan, S. (2019). Dissecting racial bias in an algorithm used to manage the health of populations. <em>Science</em>, <em>366</em>(6464), 447–453.</li>
            <li>Boutron, I., Dutton, S., Ravaud, P. & Altman, D. G. (2010). Reporting and interpretation of randomized controlled trials with statistically nonsignificant results for primary outcomes. <em>JAMA</em>, <em>303</em>(20), 2058–2064.</li>
            <li>Mansournia, M. A., Nazemipour, M. & Etminan, M. (2024). Recommendations for accurate reporting in medical research. <em>The Lancet</em>, <em>403</em>, 2103–2110.</li>
            <li>Willems, S., Vandebroek, M. & Hellinckx, P. (2023). Illusion of knowledge in statistics among clinicians. <em>Cognitive Research: Principles and Implications</em>, <em>8</em>, 35.</li>
            <li>Gigerenzer, G. & Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: Frequency formats. <em>Psychological Review</em>, <em>102</em>(4), 684–704.</li>
            <li>Sterne, J. A. C., White, I. R., Carlin, J. B. et al. (2009). Multiple imputation for missing data in epidemiological and clinical research: potential and pitfalls. <em>BMJ</em>, <em>338</em>, b2393.</li>
            <li>Guo, M., Chen, J. & Li, Y. (2023). Normal workflow and key strategies for data cleaning toward real-world data: viewpoint. <em>Interactive Journal of Medical Research</em>, <em>12</em>, e44310.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            La integridad es la columna vertebral de la
            confianza que los pacientes, los profesionales al servicio en areas de la salud y la sociedad depositan en la ciencia de
            la salud. Cada decisión ética que tomas como investigador protege esa confianza.
          </p>
        </div>
      </div>
    </div>
  );
}