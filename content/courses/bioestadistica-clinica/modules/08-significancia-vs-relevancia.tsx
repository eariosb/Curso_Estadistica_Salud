
import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import ProcessSteps from "@/components/pedagogy/ProcessSteps";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen } from "lucide-react";

export const meta = {
  title: "Significancia vs. Relevancia Clínica",
  subtitle: "¿Qué significa realmente un resultado estadístico?",
  objective:
    "Distinguir entre significancia estadística y relevancia clínica, e interpretar el NNT, el NNH y la MCID para tomar decisiones informadas.",
};

export default function Lesson() {
  return (
    <div className="lesson-prose">
      {/* INTRODUCCIÓN CON ANÉCDOTA */}
      <h2>La anécdota que lo cambió todo: el estudio PARAMEDIC2</h2>
      <p>
        Imagina que estás en una ambulancia, tu paciente está en paro cardíaco. Durante décadas, la
        adrenalina fue el estándar. Llega el estudio <strong>PARAMEDIC2 (2018, n=8.014)</strong> y
        encuentra que la adrenalina aumenta la supervivencia a 30 días: <strong>3.2% vs 2.4%</strong>{" "}
        en el grupo placebo. Diferencia: 0.8%. p=0.02. ¿Es esto clínicamente relevante?
      </p>
      <p>
        La diferencia absoluta es minúscula —un paciente adicional salvado por cada 125 tratados— y
        el estudio también encontró que <strong>casi duplicó el riesgo de daño neurológico severo</strong>{" "}
        en los sobrevivientes (31% vs 17.6%). Aquí tienes un resultado estadísticamente significativo
        que obliga a una conversación profundamente humana: ¿vale la pena sobrevivir con daño
        cerebral severo? La significancia sola no responde esta pregunta. La relevancia clínica, sí.
      </p>

      <Callout type="curiosity" title="¿Por qué empezamos con esta historia?">
        <p>
          Porque resume en un solo caso real todo lo que aprenderás hoy: un p-valor pequeño no te
          dice si el efecto importa, si el beneficio supera el daño, o si deberías cambiar tu
          práctica. Para eso necesitas MCID, NNT, NNH y —sobre todo— criterio clínico.
        </p>
      </Callout>

      {/* GRÁFICO CONCEPTUAL SVG */}
      <h2>Visualicemos la diferencia</h2>
      <p>
        Imagina dos campanas. La campana de la izquierda es el grupo control. La de la derecha, el
        grupo tratado. El desplazamiento entre ambas es el <strong>tamaño del efecto</strong>. La
        zona sombreada en verde claro es la <strong>MCID</strong>: el umbral a partir del cual el
        cambio empieza a importarle al paciente.
      </p>

      <svg
        viewBox="0 0 700 320"
        className="w-full my-6"
        role="img"
        overflow="visible"
        aria-label="Gráfico comparativo: significancia estadística vs relevancia clínica. Dos curvas de distribución normal superpuestas. La diferencia estadísticamente detectable es pequeña (zona roja). La MCID (zona verde) requiere un desplazamiento mayor entre las curvas."
        style={{ maxWidth: "700px", width: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}
      >
        {/* Ejes */}
        <line x1="60" y1="260" x2="660" y2="260" stroke="#333" strokeWidth="1.5" />
        <line x1="60" y1="30" x2="60" y2="265" stroke="#333" strokeWidth="1.5" />
        <text x="350" y="295" textAnchor="middle" fontSize="13" fill="#333" fontWeight="600">
          Magnitud del efecto (ej. reducción de mmHg, puntos en escala)
        </text>

        {/* Curva Control (izquierda) */}
        <path
          d="M 120 260 Q 120 258 130 250 Q 160 200 190 120 Q 220 50 250 60 Q 280 70 310 130 Q 340 210 370 248 Q 380 258 380 260"
          fill="rgba(59, 130, 246, 0.25)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x="240" y="275" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="600">
          Grupo Control
        </text>

        {/* Curva Tratado (derecha) — desplazada para mostrar diferencia detectable pero menor que MCID */}
        <path
          d="M 150 260 Q 150 258 160 250 Q 190 200 220 120 Q 250 50 280 60 Q 310 70 340 130 Q 370 210 400 248 Q 410 258 410 260"
          fill="rgba(239, 68, 68, 0.2)"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="6,3"
        />
        <text x="280" y="275" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="600">
          Grupo Tratado
        </text>

        {/* Línea de diferencia estadísticamente significativa (pequeña) */}
        <line x1="250" y1="140" x2="280" y2="140" stroke="#ef4444" strokeWidth="1.5" />
        <text x="265" y="130" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="600">
          Δ significativa
        </text>
        <text x="265" y="118" textAnchor="middle" fontSize="10" fill="#ef4444">
          (p&lt;0.001)
        </text>

        {/* MCID — desplazamiento mayor requerido */}
        <rect x="310" y="100" width="130" height="155" fill="rgba(34, 197, 94, 0.18)" rx="6" />
        <text x="375" y="116" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="700">
          MCID
        </text>
        <text x="375" y="132" textAnchor="middle" fontSize="10" fill="#16a34a">
          Diferencia Mínima
        </text>
        <text x="375" y="146" textAnchor="middle" fontSize="10" fill="#16a34a">
          Clínicamente
        </text>
        <text x="375" y="160" textAnchor="middle" fontSize="10" fill="#16a34a">
          Importante
        </text>

        {/* Flecha de anotación MCID */}
        <line x1="375" y1="170" x2="375" y2="225" stroke="#16a34a" strokeWidth="1.2" markerEnd="url(#arrowGreen)" />
        <defs>
          <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#16a34a" />
          </marker>
        </defs>

        {/* Curva desplazada a la MCID (más a la derecha, punteada más larga) */}
        <path
          d="M 240 260 Q 240 258 250 250 Q 280 200 310 120 Q 340 50 370 60 Q 400 70 430 130 Q 460 210 490 248 Q 500 258 500 260"
          fill="rgba(34, 197, 94, 0.15)"
          stroke="#16a34a"
          strokeWidth="2.5"
          strokeDasharray="10,5"
        />
        <text x="370" y="285" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="600">
          Tratado con efecto clínicamente relevante
        </text>

        {/* Leyenda inferior */}
        <rect x="390" y="30" width="16" height="16" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1" rx="2" />
        <text x="410" y="43" fontSize="10" fill="#333">
          Diferencia estadísticamente significativa (n grande)
        </text>
        <rect x="390" y="52" width="16" height="16" fill="rgba(34, 197, 94, 0.25)" stroke="#16a34a" strokeWidth="1" rx="2" />
        <text x="410" y="65" fontSize="10" fill="#333">
          Diferencia que alcanza la MCID (relevancia clínica)
        </text>
      </svg>

      <Callout type="info" title="¿Qué nos dice este gráfico?">
        <p>
          Con una muestra suficientemente grande, un desplazamiento <strong>minúsculo</strong> entre
          las curvas (rojo) puede ser estadísticamente significativo. Pero para que el cambio le
          importe al paciente, necesitas un desplazamiento que cruce el umbral de la MCID (verde). El
          p-valor solo te dice si hay desplazamiento; la MCID te dice si ese desplazamiento{" "}
          <strong>vale la pena</strong>.
        </p>
      </Callout>

      {/* SECCIÓN ORIGINAL MEJORADA */}
      <h2>El error del siglo: confundir significancia con importancia</h2>
      <p>
        Con una muestra suficientemente grande, <strong>cualquier diferencia</strong>, por pequeña
        que sea, puede alcanzar significancia estadística. Un estudio con n=50.000 puede detectar una
        diferencia de 0.3 mmHg en presión arterial con p&lt;0.001. Esa diferencia no tiene ningún
        impacto clínico. Sin el tamaño del efecto y la MCID, el valor p es solo la mitad de la
        historia.
      </p>
      <p>
        Piensa en esto: si mides la altura de 100.000 personas en dos ciudades, encontrarás una
        diferencia estadísticamente significativa de 0.2 cm entre ellas. ¿Cambia eso tu práctica
        clínica? ¿Le importa a alguien esa diferencia? No. Pero el p-valor será minúsculo.{" "}
        <strong>El tamaño muestral amplifica el p-valor, no la relevancia.</strong>
      </p>

      <DataTable
        headers={["Concepto", "Pregunta que responde", "Depende del tamaño muestral"]}
        rows={[
          [
            <strong key="sig">Significancia estadística (p)</strong>,
            "¿Es probable que esta diferencia sea fruto del azar?",
            "Sí — con n grande, casi todo es significativo",
          ],
          [
            <strong key="rel">Relevancia clínica</strong>,
            "¿Tiene este cambio un impacto real en la salud o bienestar del paciente?",
            "No — depende del contexto y de la MCID",
          ],
        ]}
      />

      <Callout type="info" title="MCID — Diferencia Mínima Clínicamente Importante">
        <p>
          Es el cambio más pequeño en una medida de resultado que un paciente percibiría como
          beneficioso y que justificaría un cambio en el manejo. Ejemplos validados en la literatura:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            <strong>EVA del dolor (0–10):</strong> MCID = 1.5–2 puntos (Farrar et al., 2001, Pain).
          </li>
          <li>
            <strong>SF-36 (calidad de vida):</strong> MCID = 3–5 puntos (Ware et al., 1993).
          </li>
          <li>
            <strong>PAS/PAD en HTA:</strong> MCID ≈ 5–10 mmHg para justificar cambio de
            antihipertensivo (Clement et al., 2014).
          </li>
          <li>
            <strong>HbA1c en DM2:</strong> MCID ≈ 0.5% para considerar beneficio clínico real (Little
            et al., 2011).
          </li>
          <li>
            <strong>FEV₁ en EPOC:</strong> MCID ≈ 100 mL (Cazzola et al., 2008).
          </li>
        </ul>
        <p className="mt-2">
          Un cambio de 0.3 puntos en la EVA con p=0.001 <strong>no es clínicamente relevante</strong>{" "}
          porque no alcanza la MCID de 1.5–2 puntos. Este es el corazón de la lección.
        </p>
      </Callout>

      <Callout type="warning" title="El peligro del n grande: el caso real del estudio ALLHAT">
        <p>
          El estudio <strong>ALLHAT (n=33.357)</strong> comparó antihipertensivos y encontró
          diferencias estadísticamente significativas en múltiples resultados secundarios con
          p&lt;0.001. Pero al examinar las diferencias absolutas, muchas eran menores a 1 mmHg o
          fracciones de eventos por cada 1.000 pacientes-año. Conclusión de los propios autores:
          "Muchas de las diferencias estadísticamente significativas observadas no son clínicamente
          relevantes dado el tamaño del estudio." Un recordatorio de que incluso los investigadores
          más rigurosos pueden ser tentados por el brillo del p-valor.
        </p>
      </Callout>

      {/* NNT Y NNH ENRIQUECIDOS */}
      <h2>NNT y NNH: las medidas más humanas de la eficacia</h2>
      <p>
        El <strong>Número Necesario a Tratar (NNT)</strong> responde a: ¿cuántos pacientes debo
        tratar para que uno se beneficie, comparado con el control? El{" "}
        <strong>NNH (Número Necesario para Hacer Daño)</strong> hace lo mismo con los efectos adversos.
        Son las medidas que <strong>traducen la estadística al lenguaje del paciente</strong>.
      </p>

      <DataTable
        headers={["NNT", "Interpretación", "Ejemplo clínico real y referencia"]}
        rows={[
          [
            "1–2",
            "Tratamiento muy efectivo",
            "Adrenalina IM en anafilaxia grave (NNT=1–2, consenso clínico); Insulina en cetoacidosis diabética",
          ],
          [
            "4–8",
            "Tratamiento altamente útil",
            "Antibióticos en otitis media aguda en niños <2 años con diagnóstico certero (NNT≈4–7, Rovers et al., 2006)",
          ],
          [
            "8–25",
            "Beneficio claro en práctica clínica",
            "Aspirina en IAM agudo: NNT≈25 para prevenir una muerte a 35 días (ISIS-2, 1988)",
          ],
          [
            "30–60",
            "Beneficio moderado, contexto-dependiente",
            "Estatinas en prevención primaria: NNT≈50–60 para prevenir un evento CV mayor a 5 años (CTT Collaboration, 2012)",
          ],
          [
            ">100",
            "Beneficio marginal, cuestionar indicación",
            "Ácido acetilsalicílico en prevención primaria en pacientes sin factores de riesgo: NNT>300 para eventos CV, pero NNH≈80 para sangrado mayor",
          ],
        ]}
      />

      <Callout type="info" title="Cálculo del NNT paso a paso">
        <p>
          <strong>NNT = 1 / Reducción Absoluta del Riesgo (RAR)</strong>
        </p>
        <p className="mt-1">
          Ejemplo: Riesgo en grupo control = 20% (0.20). Riesgo en grupo tratado = 12% (0.12).
          <br />
          RAR = 0.20 − 0.12 = 0.08 (8%).
          <br />
          NNT = 1 / 0.08 = <strong>12.5 ≈ 13</strong>.
        </p>
        <p className="mt-2">
          Interpretación: necesitas tratar a 13 pacientes para evitar <strong>1 evento</strong> que
          habría ocurrido sin el tratamiento. Es una medida de esfuerzo clínico. Cuanto más pequeño
          el NNT, más eficiente es la intervención.
        </p>
        <p className="mt-2">
          <strong>NNH = 1 / Aumento Absoluto del Riesgo (AAR).</strong> Si el riesgo de un efecto
          adverso pasa del 2% al 5%: AAR = 3% → NNH = 1/0.03 ≈ 33. Necesitas tratar a 33 pacientes
          para causar un daño adicional.
        </p>
      </Callout>

      {/* CASO PRÁCTICO DETALLADO */}
      <h2>Caso práctico: Estatinas en prevención primaria</h2>
      <p>
        Tienes frente a ti a Marta, una mujer de 58 años sin antecedentes cardiovasculares, con
        colesterol LDL de 145 mg/dL y tensión arterial normal. No fuma, no tiene diabetes. Su riesgo
        cardiovascular estimado (SCORE) es bajo-moderado. ¿Deberías prescribirle una estatina?
      </p>

      <DataTable
        headers={["Parámetro", "Valor", "¿Qué significa?"]}
        rows={[
          [
            "Riesgo basal a 5 años (control)",
            "≈4%",
            "4 de cada 100 pacientes similares tendrán un evento CV mayor en 5 años sin tratamiento",
          ],
          [
            "Riesgo con estatina a 5 años",
            "≈3.2%",
            "Reducción relativa del riesgo ≈20% (RRR típica de estatinas en prevención primaria)",
          ],
          [
            "RAR (Reducción Absoluta)",
            "0.8% (4% − 3.2%)",
            "La diferencia absoluta es pequeña porque el riesgo basal es bajo",
          ],
          [
            "NNT a 5 años",
            "1 / 0.008 = 125",
            "Necesitas tratar 125 pacientes como Marta durante 5 años para evitar 1 evento CV",
          ],
          [
            "NNH (miopatía significativa)",
            "≈50–100",
            "Por cada 50–100 pacientes tratados, 1 desarrollará miopatía que afecta su calidad de vida",
          ],
          [
            "NNT vs NNH",
            "125 vs 50–100",
            "El balance beneficio/daño es estrecho. La decisión debe ser compartida.",
          ],
        ]}
      />

      <Callout type="curiosity" title="La conversación con Marta">
        <p>
          Con estos datos, le dices a Marta: "Si tomamos 125 personas como tú y les damos esta
          pastilla durante 5 años, una evitará un infarto o un ictus. Pero entre 50 y 100 personas
          que la tomen, una tendrá dolores musculares que podrían afectar su día a día. No es una
          decisión obvia. ¿Qué valoras más tú?"
        </p>
        <p className="mt-2">
          Esto es <strong>medicina basada en evidencia aplicada con humanidad</strong>. La p puede
          ser &lt;0.001 en el ensayo clínico (porque el estudio tiene n=10.000+), pero el NNT de 125
          te obliga a personalizar la decisión. La estadística informa; el paciente decide.
        </p>
      </Callout>

      {/* TAMAÑO DEL EFECTO */}
      <h2>Tamaño del efecto: cuantificar la magnitud</h2>
      <p>
        El tamaño del efecto responde a la pregunta que el p-valor ignora: <strong>¿cuánto?</strong>{" "}
        No basta con decir "hay diferencia". Hay que medirla. Aquí tienes las medidas más utilizadas
        en la literatura biomédica y cómo interpretarlas.
      </p>

      <DataTable
        headers={["Medida", "Cuándo se usa", "Interpretación orientativa", "Equivalencia práctica"]}
        rows={[
          [
            "d de Cohen",
            "Comparar medias (T-Test, ANOVA)",
            "Pequeño: 0.2 · Moderado: 0.5 · Grande: 0.8",
            "d=0.5 equivale a una diferencia de 0.5 DE entre grupos",
          ],
          [
            "η² (eta cuadrado)",
            "Varianza explicada en ANOVA",
            "Pequeño: 0.01 · Moderado: 0.06 · Grande: 0.14",
            "η²=0.06 significa que el factor explica el 6% de la varianza total",
          ],
          [
            "r de Pearson / Spearman",
            "Correlación",
            "Débil: 0.1–0.3 · Moderada: 0.3–0.5 · Fuerte: &gt;0.5",
            "r=0.3: el 9% de la varianza es compartida (r²=0.09)",
          ],
          [
            "OR / RR con IC 95%",
            "Estudios de riesgo",
            "Evaluar si el IC cruza el 1 (efecto nulo)",
            "Un OR=1.5 con IC 95% [0.98–2.3] no es concluyente aunque p&lt;0.05",
          ],
        ]}
      />

      <Callout type="warning" title="Cuidado con la etiqueta 'grande'">
        <p>
          Un tamaño del efecto "grande" según Cohen (d=0.8) no garantiza relevancia clínica.
          Depende del contexto. Un d=0.8 en reducción del dolor puede ser enorme; un d=0.8 en
          reducción de mortalidad puede ser revolucionario. Y al revés: un d=0.2 (pequeño) en
          mortalidad cardiovascular puede traducirse en miles de vidas salvadas a nivel poblacional.
          La etiqueta es orientativa; el juicio clínico es insustituible.
        </p>
      </Callout>

      {/* RRA vs RRR ENRIQUECIDO */}
      <h2>Diferencia entre RRA y RRR: el lenguaje del riesgo</h2>

      <Callout type="curiosity" title="¿RRR o RRA? El arte de impresionar con números">
        <p>
          Un fármaco reduce el riesgo de infarto del 4% (grupo control) al 2% (grupo tratado).{" "}
          <strong>RRA = 2%</strong> (reducción absoluta: 4% − 2%).{" "}
          <strong>RRR = 50%</strong> (reducción relativa: (4% − 2%) / 4% = 50%). La RRR siempre suena
          más impresionante que la RRA. Por eso los titulares de prensa y la publicidad farmacéutica
          prefieren la RRR: "¡Reduce el riesgo a la mitad!" Suena espectacular. Pero si tu riesgo
          basal es del 4%, reducir el riesgo a la mitad significa pasar del 4% al 2%. En términos
          absolutos, el beneficio es modesto.
        </p>
        <p className="mt-2">
          <strong>Exige siempre la RRA y el riesgo basal.</strong> Sin ellos, no puedes calcular el
          NNT ni contextualizar el beneficio real para tu paciente.
        </p>
      </Callout>

      {/* VISUALIZACIÓN COMPARATIVA RRA vs RRR */}
      <h3>Visualicemos RRA vs RRR</h3>
      <svg
        viewBox="0 0 500 280"
        className="w-full my-4"
        role="img"
        overflow="visible"
        aria-label="Diagrama de barras comparando RRA y RRR. Riesgo control 4%, riesgo tratado 2%. RRA=2 puntos porcentuales. RRR=50% relativo. La RRR magnifica visualmente el efecto cuando el riesgo basal es bajo."
        style={{ maxWidth: "500px", width: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}
      >
        {/* Barra Control */}
        <rect x="60" y="100" width="80" height="140" fill="#3b82f6" rx="4" />
        <text x="100" y="90" textAnchor="middle" fontSize="13" fill="#3b82f6" fontWeight="700">
          4%
        </text>
        <text x="100" y="260" textAnchor="middle" fontSize="12" fill="#333" fontWeight="500">
          Control
        </text>

        {/* Barra Tratado */}
        <rect x="200" y="170" width="80" height="70" fill="#16a34a" rx="4" />
        <text x="240" y="160" textAnchor="middle" fontSize="13" fill="#16a34a" fontWeight="700">
          2%
        </text>
        <text x="240" y="260" textAnchor="middle" fontSize="12" fill="#333" fontWeight="500">
          Tratado
        </text>

        {/* Flecha RRA */}
        <line x1="145" y1="170" x2="195" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
        <text x="170" y="162" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="700">
          RRA = 2%
        </text>

        {/* Flecha RRR con texto */}
        <text x="370" y="145" textAnchor="middle" fontSize="14" fill="#f59e0b" fontWeight="700">
          RRR = 50%
        </text>
        <text x="370" y="165" textAnchor="middle" fontSize="11" fill="#555">
          (Reducción Relativa)
        </text>
        <text x="370" y="185" textAnchor="middle" fontSize="10" fill="#888">
          Magnifica el efecto
        </text>
        <text x="370" y="200" textAnchor="middle" fontSize="10" fill="#888">
          cuando el riesgo basal es bajo
        </text>

        <defs>
          <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
          </marker>
        </defs>

        {/* Texto explicativo */}
        <text x="250" y="38" textAnchor="middle" fontSize="13" fill="#333" fontWeight="600">
          Riesgo de evento a 5 años
        </text>
      </svg>

      <h2>Errores comunes que debes evitar</h2>
      <DataTable
        headers={["Error", "Por qué ocurre", "Cómo evitarlo"]}
        rows={[
          [
            "Confundir p < 0.05 con 'el tratamiento funciona'",
            "El p-valor solo descarta azar, no cuantifica beneficio",
            "Siempre pregunta: ¿cuál es la magnitud del efecto? ¿Supera la MCID?",
          ],
          [
            "Usar solo la RRR para impresionar",
            "La RRR magnifica efectos pequeños cuando el riesgo basal es bajo",
            "Presenta siempre la RRA y calcula el NNT",
          ],
          [
            "Ignorar el NNH al evaluar un tratamiento",
            "Nos enamoramos del beneficio y minimizamos el daño",
            "Para cada intervención, calcula NNT y NNH. Compáralos.",
          ],
          [
            "Asumir que p > 0.05 significa 'no hay efecto'",
            "Puede ser falta de potencia estadística (n pequeño)",
            "Evalúa los IC 95%. Si son amplios, el estudio puede no tener potencia suficiente.",
          ],
          [
            "Aplicar resultados sin evaluar si el paciente se parece a la muestra del estudio",
            "Los ensayos clínicos tienen criterios de inclusión estrictos",
            "Pregunta: ¿mi paciente habría sido incluido en este estudio? ¿El NNT aplica igual?",
          ],
        ]}
      />

      <Flashcard
        question="¿Qué significa exactamente que p = 0.03?"
        answer={
          <div>
            <p>
              Que si la hipótesis nula fuera cierta (no hay efecto real), habría un 3% de probabilidad
              de observar esta diferencia (o una mayor) solo por azar.
            </p>
            <p className="mt-2">
              <strong>NO significa</strong> que haya un 97% de probabilidad de que el efecto sea real.
            </p>
            <p className="mt-1">
              <strong>NO informa</strong> sobre la magnitud ni la relevancia del efecto.
            </p>
            <p className="mt-1">
              <strong>NO te dice</strong> si deberías cambiar tu práctica clínica.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              El p-valor es un colador, no una lupa. Te ayuda a separar señal de ruido, pero no te
              dice si la señal es fuerte o débil, importante o trivial.
            </p>
          </div>
        }
      />

      <Flashcard
        question="¿Puede un resultado NO significativo (p > 0.05) ser clínicamente importante?"
        answer={
          <div>
            <p>
              <strong>Sí, absolutamente.</strong> Un estudio con muestra pequeña puede no tener
              potencia para detectar una diferencia clínicamente relevante.
            </p>
            <p className="mt-2">
              p &gt; 0.05 no significa "no hay efecto". Significa "no tenemos suficiente evidencia con
              este tamaño muestral para descartar el azar con suficiente confianza".
            </p>
            <p className="mt-2">
              <strong>Acciones clave:</strong> evalúa la potencia del estudio (¿se diseñó para detectar
              una diferencia de tamaño clínicamente relevante?), mira el IC 95% (¿incluye valores
              clínicamente relevantes?), y considera si amerita un estudio más grande.
            </p>
          </div>
        }
      />

      <h2>Proceso: interpretar un resultado estadístico con criterio</h2>
      <ProcessSteps
        steps={[
          {
            step: 1,
            title: "Identifica la medida de efecto principal",
            description:
              "¿Diferencia de medias? ¿OR? ¿RR? ¿Reducción Absoluta del Riesgo? Asegúrate de conocer la magnitud del efecto, no solo el p-valor. Anota el IC 95%.",
          },
          {
            step: 2,
            title: "Busca la MCID para esa escala o variable",
            description:
              "¿La diferencia observada supera la Diferencia Mínima Clínicamente Importante definida para esa escala en esa población? Si no la supera, la significancia estadística es irrelevante.",
          },
          {
            step: 3,
            title: "Calcula o busca el NNT / NNH",
            description:
              "¿Cuántos pacientes hay que tratar para beneficiar a uno? ¿Cuántos para causar un daño? Compara NNT con NNH. Esto da perspectiva humana al resultado numérico.",
          },
          {
            step: 4,
            title: "Evalúa los intervalos de confianza",
            description:
              "El IC 95% revela la precisión del efecto estimado. Un IC muy amplio indica incertidumbre, aunque el p sea < 0.05. ¿El extremo más desfavorable del IC sigue siendo clínicamente relevante?",
          },
          {
            step: 5,
            title: "Contextualiza en tu práctica",
            description:
              "¿Los pacientes del estudio se parecen a los tuyos? ¿El riesgo basal de tu paciente justifica el NNT? ¿Es el efecto suficientemente grande como para cambiar el manejo? ¿Qué opina tu paciente?",
          },
        ]}
      />

      <Quiz
        question="Un ensayo clínico con n=10.000 demuestra que un nuevo fármaco antihipertensivo reduce la presión arterial sistólica en 1.2 mmHg (p<0.001). ¿Cuál es la interpretación más correcta?"
        options={[
          {
            text: "El fármaco es muy efectivo porque el resultado es altamente significativo (p<0.001)",
            correct: false,
          },
          {
            text: "El resultado es estadísticamente significativo pero probablemente no es clínicamente relevante (la MCID en HTA es >5 mmHg)",
            correct: true,
          },
          {
            text: "No se puede interpretar sin conocer el tipo de fármaco",
            correct: false,
          },
          {
            text: "Un p<0.001 siempre indica relevancia clínica alta",
            correct: false,
          },
        ]}
        explanation="Con n=10.000, una diferencia de 1.2 mmHg alcanza p<0.001 fácilmente. Pero una reducción de 1.2 mmHg en presión arterial no tiene impacto clínico significativo (la MCID en HTA para cambio de práctica suele estar en el rango de 5-10 mmHg). Este es el ejemplo clásico de significancia sin relevancia. Recuerda: el tamaño muestral amplifica el p-valor, no la magnitud del efecto."
      />

      <Quiz
        question="Un estudio reporta que un nuevo fármaco reduce el riesgo de ictus del 2% al 1% (RRR=50%, p=0.01). ¿Cuál es el NNT aproximado?"
        options={[
          { text: "2", correct: false },
          { text: "50", correct: false },
          { text: "100", correct: true },
          { text: "No se puede calcular con estos datos", correct: false },
        ]}
        explanation="RRA = 2% − 1% = 1% = 0.01. NNT = 1 / 0.01 = 100. Necesitas tratar a 100 pacientes para evitar un ictus. Aunque la RRR del 50% suena impresionante (y el p=0.01 es 'significativo'), el NNT de 100 refleja un beneficio modesto en términos absolutos. Esta es la trampa más común en la interpretación de ensayos clínicos."
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
                Guyatt, G., Rennie, D., Meade, M. O. & Cook, D. J. (2015). <em>Users&apos; Guides to the Medical Literature: A Manual for Evidence-Based Clinical Practice</em> (3ª ed.). McGraw-Hill.
                <span className="block text-xs text-gray-500">Capítulos 8–12 sobre interpretación de resultados; referencia obligada para leer ensayos clínicos con criterio.</span>
              </li>
              <li>
                Cohen, J. (1988). <em>Statistical Power Analysis for the Behavioral Sciences</em> (2ª ed.). Lawrence Erlbaum.
                <span className="block text-xs text-gray-500">La referencia clásica sobre tamaños del efecto (d, η², r) y su interpretación.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                StatQuest — "p-hacking: What it is and how to avoid it!":{" "}
                <a href="https://www.youtube.com/c/joshstarmer" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  youtube.com/c/joshstarmer
                </a>
                <span className="block text-xs text-gray-500">Explicación visual y divertida sobre por qué el p-valor puede ser engañoso.</span>
              </li>
              <li>
                StatQuest — "Understanding Statistical Power":{" "}
                <a href="https://www.youtube.com/c/joshstarmer" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  youtube.com/c/joshstarmer
                </a>
                <span className="block text-xs text-gray-500">Complemento ideal para entender por qué n grande no equivale a efecto importante.</span>
              </li>
              <li>
                Calculadora de tamaño del efecto (d de Cohen):{" "}
                <a href="https://www.psychometrica.de/effect_size.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  psychometrica.de/effect_size.html
                </a>
                <span className="block text-xs text-gray-500">Calcula d, r y otros tamaños de efecto con sus intervalos de confianza.</span>
              </li>
              <li>
                Calculadora de NNT online:{" "}
                <a href="https://www.nntonline.net" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  nntonline.net
                </a>
                <span className="block text-xs text-gray-500">Introduce la RAR y obtén el NNT con su IC 95%.</span>
              </li>
              <li>
                Curso gratuito "Improving Your Statistical Inferences" (Daniel Lakens, Coursera).
                <span className="block text-xs text-gray-500">Cubre tamaños del efecto, intervalos de confianza y la crisis de replicación.</span>
              </li>
              <li>
                MedCram — "NNT and NNH: How to Calculate and Interpret" (YouTube).
                <span className="block text-xs text-gray-500">Consolida el concepto de NNT/NNH con ejemplos clínicos paso a paso.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Wasserstein, R. L. & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. <em>The American Statistician</em>, <em>70</em>(2), 129–133.</li>
            <li>McGlothlin, A. E. & Lewis, R. J. (2014). Minimal clinically important difference: Defining what really matters to patients. <em>JAMA</em>, <em>312</em>(13), 1342–1343.</li>
            <li>Laupacis, A., Sackett, D. L. & Roberts, R. S. (1988). An assessment of clinically useful measures of the consequences of treatment. <em>New England Journal of Medicine</em>, <em>318</em>, 1728–1733.</li>
            <li>Farrar, J. T., Young, J. P., LaMoreaux, L., Werth, J. L. & Poole, R. M. (2001). Clinical importance of changes in chronic pain intensity measured on an 11-point numerical pain rating scale. <em>Pain</em>, <em>94</em>(2), 149–158.</li>
            <li>Clement, D. L. et al. (2014). Prognostic value of ambulatory blood-pressure recordings in patients with treated hypertension. <em>New England Journal of Medicine</em>, <em>348</em>, 2407–2415.</li>
            <li>Cazzola, M. et al. (2008). Outcomes for COPD pharmacological trials: from lung function to biomarkers. <em>European Respiratory Journal</em>, <em>31</em>(2), 416–469.</li>
            <li>ISIS-2 Collaborative Group (1988). Randomised trial of intravenous streptokinase, oral aspirin, both, or neither among 17,187 cases of suspected acute myocardial infarction. <em>The Lancet</em>, <em>332</em>(8607), 349–360.</li>
            <li>Cholesterol Treatment Trialists&apos; (CTT) Collaboration (2012). The effects of lowering LDL cholesterol with statin therapy in people at low risk of vascular disease. <em>The Lancet</em>, <em>380</em>(9841), 581–590.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Un p-valor pequeño es solo el primer paso. La verdadera pregunta clínica —¿le importa
            esto a mi paciente?— solo se responde con tamaño del efecto, MCID, NNT y NNH trabajando
            juntos.
          </p>
        </div>
      </div>
    </div>
  );
}
