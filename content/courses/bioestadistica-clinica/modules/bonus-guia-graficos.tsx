"use client";
import { useState } from "react";
import Callout from "@/components/pedagogy/Callout";
import Flashcard from "@/components/pedagogy/Flashcard";
import Quiz from "@/components/pedagogy/Quiz";
import DataTable from "@/components/pedagogy/DataTable";
import { BookOpen } from "lucide-react";

export const meta = {
  title: "Guía para Leer Gráficos",
  subtitle: "El vocabulario visual que todo profesional de la salud necesita",
  objective:
    "Identificar y decodificar los gráficos estadísticos más frecuentes en la literatura clínica, reconocer patrones, señales de alerta y distorsiones, y aplicar una mirada crítica a cualquier figura antes de tomar decisiones basadas en ella.",
};

/* ════════════════════════════════════════════════════════════════
   PALETA y utilidades
═════════════════════════════════════════════════════════════════ */
const C = {
  blue: "#378ADD", blueDk: "#0C447C", blueLt: "#E6F1FB",
  teal: "#1D9E75", tealLt: "#E1F5EE",
  red: "#E24B4A", redLt: "#FCEBEB",
  amber: "#BA7517", amberLt: "#FAEEDA",
  gray: "#888780", grayLt: "#F1EFE8", grayDk: "#2C2C2A",
  green: "#3B6D11", greenLt: "#EAF3DE",
  purple: "#534AB7", purpleLt: "#EEEDFE",
};

const FONT = "var(--font-sans, sans-serif)";
const T = {
  sm: { fontFamily: FONT, fontSize: 11, fill: C.gray },
  md: { fontFamily: FONT, fontSize: 12, fill: "#444441" },
  lg: { fontFamily: FONT, fontSize: 13, fontWeight: 500 as const, fill: C.grayDk },
};

/* ════════════════════════════════════════════════════════════════
   TIPOS
═════════════════════════════════════════════════════════════════ */
interface ForestStudy {
  name: string;
  n: string;
  or: number;
  lo: number;
  hi: number;
  w: number;
}

interface ForestScenario {
  label: string;
  i2: number;
  ph: string;
  pooledOR: number;
  pooledLo: number;
  pooledHi: number;
  annType: "success" | "danger" | "warning";
  ann: string;
  studies: ForestStudy[];
}

interface KMScenario {
  label: string;
  desc: string;
  ann: string;
  annType: "success" | "danger" | "warning";
  curveA: number[];
  curveB: number[];
}

interface BoxGroup {
  label: string;
  q1: number;
  med: number;
  q3: number;
  min: number;
  max: number;
  outliers: number[];
  color: string;
  lc: string;
}

interface ScatterScenario {
  label: string;
  r: string;
  desc: string;
  points: [number, number][];
  xLabel: string;
  yLabel: string;
  xRange: [number, number];
  yRange: [number, number];
}

interface DistributionScenario {
  label: string;
  bars: number[];
  color: string;
  desc: string;
}

interface BlandAltmanScenario {
  label: string;
  desc: string;
  pts: [number, number][];
  loa: number | null;
  mean: number;
}

interface ROCScenario {
  label: string;
  auc: number;
  desc: string;
  annType: "success" | "danger" | "warning";
  ann: string;
  points: [number, number][];
}

interface FunnelStudy {
  or: number;
  se: number;
}

interface FunnelScenario {
  label: string;
  pooledOR: number;
  desc: string;
  annType: "success" | "danger" | "warning";
  ann: string;
  points: FunnelStudy[];
}

interface ViolinScenario {
  label: string;
  data: number[];
  desc: string;
  annType: "success" | "danger" | "warning";
  ann: string;
}

interface InteractionScenario {
  label: string;
  desc: string;
  annType: "success" | "danger" | "warning";
  ann: string;
  women: [number, number];
  men: [number, number];
}

interface QQScenario {
  label: string;
  desc: string;
  annType: "success" | "warning";
  ann: string;
  generator: () => number[];
}

/* ════════════════════════════════════════════════════════════════
   COMPONENTE 1 — Forest Plot interactivo
═════════════════════════════════════════════════════════════════ */
const FOREST_SCENARIOS: Record<string, ForestScenario> = {
  low: {
    label: "I²=22% — estudios consistentes",
    i2: 22, ph: "0.28", pooledOR: 0.68, pooledLo: 0.54, pooledHi: 0.82,
    annType: "success",
    ann: "El diamante está completamente a la izquierda de OR=1 sin tocarlo: efecto significativo que reduce el riesgo. I²=22% indica baja heterogeneidad — los estudios apuntan en la misma dirección y el efecto combinado es fiable para tomar decisiones clínicas.",
    studies: [
      { name: "Smith 2018 (RCT)",  n: "312",  or: 0.61, lo: 0.42, hi: 0.88, w: 18 },
      { name: "García 2019 (RCT)", n: "480",  or: 0.72, lo: 0.55, hi: 0.94, w: 24 },
      { name: "Lee 2020 (RCT)",    n: "156",  or: 0.58, lo: 0.36, hi: 0.94, w: 14 },
      { name: "Brown 2021 (RCT)",  n: "620",  or: 0.69, lo: 0.54, hi: 0.88, w: 28 },
      { name: "Patel 2022 (RCT)",  n: "244",  or: 0.74, lo: 0.52, hi: 1.04, w: 16 },
    ],
  },
  high: {
    label: "I²=78% — alta heterogeneidad",
    i2: 78, ph: "0.001", pooledOR: 0.71, pooledLo: 0.47, pooledHi: 1.08,
    annType: "danger",
    ann: "I²=78%: heterogeneidad considerable. El diamante cruza OR=1: no significativo. Los estudios apuntan en direcciones muy distintas (algunos muestran beneficio, otros no). El efecto combinado es poco informativo sin explorar qué diferencias entre estudios (diseño, población, dosis) explican la discrepancia.",
    studies: [
      { name: "Müller 2017 (obs)",  n: "189",  or: 0.38, lo: 0.18, hi: 0.80, w: 14 },
      { name: "Tanaka 2019 (RCT)", n: "310",  or: 0.55, lo: 0.40, hi: 0.76, w: 22 },
      { name: "Wang 2020 (obs)",   n: "890",  or: 0.95, lo: 0.78, hi: 1.15, w: 28 },
      { name: "Klein 2021 (RCT)",  n: "142",  or: 1.24, lo: 0.88, hi: 1.75, w: 16 },
      { name: "Silva 2022 (obs)",  n: "412",  or: 0.48, lo: 0.28, hi: 0.82, w: 20 },
    ],
  },
  null: {
    label: "Resultado nulo (OR≈1)",
    i2: 15, ph: "0.62", pooledOR: 0.97, pooledLo: 0.84, pooledHi: 1.11,
    annType: "warning",
    ann: "El diamante está centrado en OR≈1 y la cruza: no hay evidencia de efecto. I²=15%: los estudios son muy consistentes en mostrar ausencia de efecto. Un resultado nulo con alta consistencia y buen tamaño muestral es evidencia sólida de que la intervención no funciona en esta población.",
    studies: [
      { name: "Torres 2018 (RCT)", n: "380", or: 0.94, lo: 0.76, hi: 1.17, w: 26 },
      { name: "Nguyen 2019 (RCT)", n: "290", or: 1.02, lo: 0.81, hi: 1.29, w: 22 },
      { name: "Rossi 2021 (RCT)",  n: "510", or: 0.98, lo: 0.82, hi: 1.17, w: 30 },
      { name: "Osei 2022 (RCT)",   n: "175", or: 0.96, lo: 0.73, hi: 1.27, w: 22 },
    ],
  },
};

const ForestPlot = () => {
  const [scene, setScene] = useState<keyof typeof FOREST_SCENARIOS>("low");
  const d = FOREST_SCENARIOS[scene];
  const LO_OR = 0.15, HI_OR = 1.9, BAR_W = 260;
  const px = (v: number) => Math.max(0, Math.min(BAR_W, (Math.log(v) - Math.log(LO_OR)) / (Math.log(HI_OR) - Math.log(LO_OR)) * BAR_W));
  const nullX = px(1);
  const i2Color = d.i2 < 40 ? C.green : d.i2 < 75 ? C.amber : C.red;
  const annBg = d.annType === "success" ? C.tealLt : d.annType === "danger" ? C.redLt : C.amberLt;
  const annColor = d.annType === "success" ? "#085041" : d.annType === "danger" ? "#791F1F" : "#633806";

  const btnStyle = (k: keyof typeof FOREST_SCENARIOS) => ({
    padding: "5px 12px", border: `0.5px solid ${scene === k ? C.blue : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.blueLt : "var(--color-background-secondary)",
    color: scene === k ? C.blueDk : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Escenario:</span>
        {(Object.keys(FOREST_SCENARIOS) as (keyof typeof FOREST_SCENARIOS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{FOREST_SCENARIOS[k].label}</button>
        ))}
      </div>

      {/* Cabeceras */}
      <div style={{ display: "grid", gridTemplateColumns: "148px 44px 148px 1fr 44px", gap: 0, fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", fontFamily: FONT, paddingBottom: 6, borderBottom: `1px solid ${C.gray}50` }}>
        <div>Estudio</div><div>N</div><div>OR (IC 95%)</div><div></div><div style={{ textAlign: "right" }}>Peso</div>
      </div>

      {/* Estudios */}
      {d.studies.map((s: ForestStudy, i: number) => {
        const cx = px(s.or), lx = px(s.lo), rx = px(s.hi);
        const bsz = 5 + s.w / 8;
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "148px 44px 148px 1fr 44px", alignItems: "center", padding: "3px 0", borderBottom: `0.5px solid var(--color-border-tertiary)` }}>
            <div style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-primary)" }}>{s.name}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", fontFamily: FONT }}>{s.n}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", fontFamily: FONT }}>{s.or.toFixed(2)} ({s.lo.toFixed(2)}–{s.hi.toFixed(2)})</div>
            <div style={{ position: "relative", height: 26, paddingLeft: 8 }}>
              {/* null line */}
              <div style={{ position: "absolute", left: nullX + 8, width: 1.5, background: C.red, top: 0, bottom: 0 }} />
              {/* CI line */}
              <div style={{ position: "absolute", left: lx + 8, width: rx - lx, height: 2, background: C.gray, top: 12 }} />
              {/* point */}
              <div style={{ position: "absolute", left: cx + 8 - bsz / 2, top: 13 - bsz / 2, width: bsz, height: bsz, background: C.blue, borderRadius: 2, opacity: 0.85 }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", textAlign: "right", fontFamily: FONT }}>{s.w}%</div>
          </div>
        );
      })}

      {/* Pooled diamond */}
      {(() => {
        const dcx = px(d.pooledOR), dlx = px(d.pooledLo), drx = px(d.pooledHi);
        const dw = drx - dlx;
        return (
          <div style={{ display: "grid", gridTemplateColumns: "148px 44px 148px 1fr 44px", alignItems: "center", padding: "4px 0", background: "var(--color-background-primary)", borderRadius: 4, marginTop: 2 }}>
            <div style={{ fontSize: 12, fontWeight: 500, fontFamily: FONT, color: "var(--color-text-primary)" }}>Efecto combinado</div>
            <div />
            <div style={{ fontSize: 12, fontWeight: 500, fontFamily: FONT, color: C.blueDk }}>{d.pooledOR.toFixed(2)} ({d.pooledLo.toFixed(2)}–{d.pooledHi.toFixed(2)})</div>
            <div style={{ position: "relative", height: 26, paddingLeft: 8 }}>
              <div style={{ position: "absolute", left: nullX + 8, width: 1.5, background: C.red, top: 0, bottom: 0 }} />
              <div style={{ position: "absolute", left: dlx + 8, width: dw, height: 1.5, background: C.blueDk, top: 12.5 }} />
              <svg style={{ position: "absolute", left: dcx + 8 - 10 }} width={20} height={20}>
                <polygon points="10,2 19,10 10,18 1,10" fill={C.blue} stroke={C.blueDk} strokeWidth={0.7} />
              </svg>
            </div>
            <div style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", textAlign: "right" }}>100%</div>
          </div>
        );
      })()}

      {/* Stats row */}
      <div style={{ marginTop: 8, display: "flex", gap: 20, fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", alignItems: "center" }}>
        <span>I² = <strong style={{ color: i2Color }}>{d.i2}%</strong></span>
        <div style={{ height: 6, width: 100, borderRadius: 3, background: "var(--color-border-tertiary)", overflow: "hidden", display: "inline-block" }}>
          <div style={{ height: "100%", width: `${d.i2}%`, background: i2Color, borderRadius: 3 }} />
        </div>
        <span>p-het = {d.ph}</span>
        <span>Estudios: {d.studies.length}</span>
      </div>

      {/* Annotation */}
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>Interpretación: </strong>{d.ann}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 10, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ display: "inline-block", width: 10, height: 10, background: C.blue, borderRadius: 2 }} /> Estudio individual (tamaño ∝ peso)
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ display: "inline-block", width: 20, height: 2, background: C.gray }} /> IC 95%
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width={16} height={12}><polygon points="8,1 15,6 8,11 1,6" fill={C.blue} /></svg> Efecto combinado (◆)
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ display: "inline-block", width: 2, height: 12, background: C.red }} /> OR = 1 (sin efecto)
        </span>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE 2 — Kaplan-Meier interactivo
═════════════════════════════════════════════════════════════════ */
const KM_SCENARIOS: Record<string, KMScenario> = {
  sep: {
    label: "Separación constante (HR válido)",
    desc: "Las curvas se separan desde el inicio y mantienen separación constante. El hazard ratio (HR) es constante — supuesto de proporcionalidad cumplido. Mediana de supervivencia: grupo A 14 meses vs. grupo B 8 meses.",
    ann: "Lectura correcta: el tratamiento A reduce el riesgo de evento a lo largo de todo el seguimiento. El HR resume bien el efecto. La tabla de número en riesgo al pie confirma que hay suficientes pacientes en ambos grupos hasta el mes 18.",
    annType: "success",
    curveA: [1.0,0.94,0.87,0.80,0.74,0.68,0.62,0.58,0.53,0.49,0.45,0.42,0.38,0.35,0.32,0.28,0.25,0.22,0.20],
    curveB: [1.0,0.90,0.80,0.71,0.62,0.54,0.47,0.41,0.35,0.30,0.26,0.22,0.18,0.15,0.12,0.10,0.08,0.07,0.05],
  },
  cross: {
    label: "Curvas que se cruzan ⚠",
    desc: "Las curvas se cruzan alrededor del mes 8. Esto viola el supuesto de proporcionalidad de riesgos. El HR medio es engañoso: el tratamiento B parece mejor al inicio pero peor a largo plazo.",
    ann: "⚠ Señal de alerta: curvas que se cruzan indican que el efecto del tratamiento cambia con el tiempo. El HR único de Cox no captura esta complejidad. Requiere modelos de riesgos no proporcionales o análisis por períodos separados. Contexto clínico frecuente: inmunoterapia oncológica, donde el efecto es tardío.",
    annType: "danger",
    curveA: [1.0,0.92,0.84,0.76,0.68,0.61,0.54,0.48,0.44,0.41,0.38,0.36,0.34,0.32,0.30,0.28,0.26,0.24,0.22],
    curveB: [1.0,0.96,0.90,0.83,0.74,0.63,0.51,0.43,0.37,0.31,0.26,0.22,0.18,0.15,0.13,0.11,0.09,0.08,0.07],
  },
  late: {
    label: "Efecto tardío (inmunoterapia)",
    desc: "Las curvas son paralelas los primeros 6 meses y luego se separan progresivamente. Patrón típico de inmunoterapia: el sistema inmune necesita tiempo para activarse.",
    ann: "El HR global puede subestimar el beneficio tardío. La lectura correcta exige mirar la separación en cada punto temporal, no solo el HR global. La tabla de número en riesgo al pie revela que la separación ocurre cuando ya quedan menos pacientes — interpretar con cautela el extremo derecho.",
    annType: "warning",
    curveA: [1.0,0.95,0.89,0.83,0.77,0.71,0.65,0.60,0.55,0.51,0.47,0.44,0.41,0.38,0.35,0.32,0.29,0.26,0.23],
    curveB: [1.0,0.95,0.89,0.83,0.77,0.71,0.64,0.57,0.49,0.41,0.34,0.28,0.22,0.17,0.13,0.10,0.08,0.06,0.04],
  },
};

const KaplanMeier = () => {
  const [scene, setScene] = useState<keyof typeof KM_SCENARIOS>("sep");
  const d = KM_SCENARIOS[scene];
  const W = 480, H = 240, PL = 48, PT = 20, PR = 20, PB = 50;
  const IW = W - PL - PR, IH = H - PT - PB;
  const months = Array.from({ length: 19 }, (_, i) => i);
  const xp = (m: number) => PL + (m / 18) * IW;
  const yp = (s: number) => PT + (1 - s) * IH;
  const toPath = (arr: number[]) => arr.map((s: number, i: number) => {
    if (i === 0) return `M ${xp(0)} ${yp(s)}`;
    return `H ${xp(i)} V ${yp(s)}`;
  }).join(" ");
  const annBg = d.annType === "success" ? C.tealLt : d.annType === "danger" ? C.redLt : C.amberLt;
  const annColor = d.annType === "success" ? "#085041" : d.annType === "danger" ? "#791F1F" : "#633806";
  const btnStyle = (k: keyof typeof KM_SCENARIOS) => ({
    padding: "5px 12px", border: `0.5px solid ${scene === k ? C.teal : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.tealLt : "var(--color-background-secondary)",
    color: scene === k ? "#085041" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });
  const riskA = [100, 96, 89, 81, 73, 65, 57, 50, 44, 39, 34, 30, 27, 23, 20, 17, 14, 11, 9];
  const riskB = [100, 93, 83, 73, 61, 51, 42, 35, 28, 22, 18, 14, 10, 8, 6, 5, 3, 2, 1];

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Patrón:</span>
        {(Object.keys(KM_SCENARIOS) as (keyof typeof KM_SCENARIOS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{KM_SCENARIOS[k].label}</button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} xmlns="http://www.w3.org/2000/svg">
        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
        <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
        {/* Grid lines Y */}
        {[0, 0.25, 0.5, 0.75, 1].map((v: number) => (
          <g key={v}>
            <line x1={PL} y1={yp(v)} x2={PL + IW} y2={yp(v)} stroke={C.gray} strokeWidth={0.4} strokeDasharray="3 3" />
            <text x={PL - 4} y={yp(v)} textAnchor="end" dominantBaseline="central" {...T.sm}>{(v * 100).toFixed(0)}%</text>
          </g>
        ))}
        {/* Grid lines X */}
        {[0, 3, 6, 9, 12, 15, 18].map((m: number) => (
          <g key={m}>
            <text x={xp(m)} y={PT + IH + 14} textAnchor="middle" {...T.sm}>{m}</text>
          </g>
        ))}
        {/* Axis labels */}
        <text x={PL + IW / 2} y={H - 4} textAnchor="middle" {...T.sm}>Meses</text>
        <text x={10} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 10 ${PT + IH / 2})`} {...T.sm}>Supervivencia</text>
        {/* Curves */}
        <path d={toPath(d.curveA)} fill="none" stroke={C.blue} strokeWidth={2} />
        <path d={toPath(d.curveB)} fill="none" stroke={C.red} strokeWidth={2} strokeDasharray="6 3" />
        {/* Legend */}
        <line x1={PL + IW - 110} y1={PT + 14} x2={PL + IW - 90} y2={PT + 14} stroke={C.blue} strokeWidth={2} />
        <text x={PL + IW - 86} y={PT + 18} {...T.sm} fill={C.blueDk}>Tratamiento A</text>
        <line x1={PL + IW - 110} y1={PT + 30} x2={PL + IW - 90} y2={PT + 30} stroke={C.red} strokeWidth={2} strokeDasharray="5 3" />
        <text x={PL + IW - 86} y={PT + 34} {...T.sm} fill="#791F1F">Control B</text>
        {/* Number at risk labels */}
        <text x={PL - 4} y={PT + IH + 32} textAnchor="end" {...T.sm} fill={C.blueDk}>A:</text>
        <text x={PL - 4} y={PT + IH + 44} textAnchor="end" {...T.sm} fill="#791F1F">B:</text>
        {[0, 3, 6, 9, 12, 15, 18].map((m: number, idx: number) => (
          <g key={m}>
            <text x={xp(m)} y={PT + IH + 32} textAnchor="middle" {...T.sm} fill={C.blueDk}>{riskA[m]}</text>
            <text x={xp(m)} y={PT + IH + 44} textAnchor="middle" {...T.sm} fill="#791F1F">{riskB[m]}</text>
          </g>
        ))}
        <text x={PL} y={PT + IH + 22} {...T.sm} fontSize={10}>Número en riesgo</text>
      </svg>

      <div style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.5 }}>{d.desc}</div>
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>Interpretación clínica: </strong>{d.ann}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE 3 — Boxplot comparativo
═════════════════════════════════════════════════════════════════ */
const BoxplotDemo = () => {
  const [showOutliers, setShowOutliers] = useState(true);
  const W = 560, H = 240, PL = 60, PT = 20, PR = 20, PB = 40;
  const IW = W - PL - PR, IH = H - PT - PB;
  const groups: BoxGroup[] = [
    { label: "Control", q1: 7.2, med: 7.8, q3: 8.4, min: 6.5, max: 9.2, outliers: [5.8, 11.2], color: C.blue, lc: C.blueDk },
    { label: "Dieta", q1: 6.8, med: 7.3, q3: 7.8, min: 6.0, max: 8.5, outliers: [5.2], color: C.teal, lc: "#085041" },
    { label: "Ejercicio", q1: 6.5, med: 7.0, q3: 7.5, min: 5.8, max: 8.2, outliers: [9.8], color: C.purple, lc: "#3C3489" },
    { label: "Combinado", q1: 5.9, med: 6.5, q3: 7.0, min: 5.2, max: 7.8, outliers: [4.6], color: C.green, lc: C.green },
  ];
  const yMin = 4, yMax = 12;
  const yp = (v: number) => PT + (1 - (v - yMin) / (yMax - yMin)) * IH;
  const gapX = IW / (groups.length + 1);
  const bw = gapX * 0.55;

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)" }}>HbA1c (%) por grupo de intervención — estudio de diabetes tipo 2</span>
        <button onClick={() => setShowOutliers(!showOutliers)} style={{ padding: "4px 10px", border: `0.5px solid ${showOutliers ? C.red : "#D3D1C7"}`, borderRadius: 5, background: showOutliers ? C.redLt : "var(--color-background-secondary)", color: showOutliers ? "#791F1F" : "var(--color-text-secondary)", cursor: "pointer", fontSize: 11, fontFamily: FONT }}>
          {showOutliers ? "Ocultar valores atípicos" : "Mostrar valores atípicos"}
        </button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} xmlns="http://www.w3.org/2000/svg">
        <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
        <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
        {[5, 6, 7, 8, 9, 10, 11].map((v: number) => (
          <g key={v}>
            <line x1={PL} y1={yp(v)} x2={PL + IW} y2={yp(v)} stroke={C.gray} strokeWidth={0.3} strokeDasharray="2 3" />
            <text x={PL - 6} y={yp(v)} textAnchor="end" dominantBaseline="central" {...T.sm}>{v}</text>
          </g>
        ))}
        <text x={14} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 14 ${PT + IH / 2})`} {...T.sm}>HbA1c (%)</text>
        {groups.map((g: BoxGroup, i: number) => {
          const cx = PL + gapX * (i + 1);
          const x1 = cx - bw / 2, x2 = cx + bw / 2;
          return (
            <g key={i}>
              <line x1={cx} y1={yp(g.min)} x2={cx} y2={yp(g.q1)} stroke={g.lc} strokeWidth={1.2} />
              <line x1={cx} y1={yp(g.q3)} x2={cx} y2={yp(g.max)} stroke={g.lc} strokeWidth={1.2} />
              <line x1={cx - bw * 0.2} y1={yp(g.min)} x2={cx + bw * 0.2} y2={yp(g.min)} stroke={g.lc} strokeWidth={1} />
              <line x1={cx - bw * 0.2} y1={yp(g.max)} x2={cx + bw * 0.2} y2={yp(g.max)} stroke={g.lc} strokeWidth={1} />
              <rect x={x1} y={yp(g.q3)} width={bw} height={yp(g.q1) - yp(g.q3)} fill={g.color} fillOpacity={0.2} stroke={g.lc} strokeWidth={1} rx={2} />
              <line x1={x1} y1={yp(g.med)} x2={x2} y2={yp(g.med)} stroke={g.lc} strokeWidth={2} />
              {showOutliers && g.outliers.map((o: number, j: number) => (
                <circle key={j} cx={cx} cy={yp(o)} r={4} fill="none" stroke={C.red} strokeWidth={1.2} opacity={0.8} />
              ))}
              <text x={cx} y={PT + IH + 18} textAnchor="middle" {...T.sm}>{g.label}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", marginTop: 4, lineHeight: 1.5 }}>
        {showOutliers
          ? "Los círculos rojos son valores atípicos (outliers) más allá de 1.5×IQR. El grupo 'Combinado' muestra la mediana más baja y menos dispersión. Observa: los outliers revelan pacientes que responden muy mal o muy bien — información clínicamente relevante que la media oculta."
          : "Sin outliers las cajas son más limpias. Pero nota que perderías la información sobre pacientes que responden de forma atípica — algunos pueden necesitar un enfoque diferente."}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE 4 — Scatter Plot con patrones seleccionables
═════════════════════════════════════════════════════════════════ */
const SCATTER_PATTERNS: Record<string, ScatterScenario> = {
  pos: {
    label: "Correlación positiva",
    r: "r = +0.81",
    desc: "Nube ascendente: a mayor IMC, mayor HbA1c. Correlación positiva fuerte. Usa Pearson si la relación es lineal y los datos son normales; Spearman si hay outliers o no-linealidad.",
    points: [[22,5.4],[24,5.7],[25,5.9],[26,6.1],[27,6.3],[28,6.6],[29,6.8],[30,7.0],[31,7.3],[32,7.6],[33,7.8],[34,8.0],[35,8.3],[24,5.8],[27,6.5],[30,7.1],[33,7.9],[26,6.3],[29,6.9],[32,7.5]],
    xLabel: "IMC (kg/m²)", yLabel: "HbA1c (%)", xRange:[20,37], yRange:[5,9],
  },
  none: {
    label: "Sin correlación",
    r: "r = +0.04",
    desc: "Nube circular dispersa: no hay relación entre las variables. Un r≈0 con p>0.05 confirma ausencia de asociación lineal. No confundas ausencia de correlación lineal con ausencia de cualquier relación (puede ser no-lineal).",
    points: [[22,7.1],[25,5.8],[28,8.2],[31,6.4],[34,7.5],[23,8.0],[26,6.2],[29,7.8],[32,5.9],[35,8.3],[24,6.8],[27,7.3],[30,6.1],[33,8.1],[36,6.7],[21,7.6],[24,5.5],[27,8.4],[30,7.0],[33,6.3]],
    xLabel: "Años de educación", yLabel: "Presión arterial sistólica", xRange:[8,20], yRange:[5,9],
  },
  nonlin: {
    label: "Relación en U (no lineal) ⚠",
    r: "r = -0.12",
    desc: "La nube tiene forma de U: la mortalidad es alta tanto con muy bajo como con muy alto IMC. r≈0 pero la relación es fuerte — simplemente no es lineal. ⚠ No uses Pearson ni Spearman: primero visualiza siempre el scatter antes de calcular una correlación.",
    points: [[16,8.5],[17,8.0],[18,7.6],[19,7.1],[20,6.7],[21,6.3],[22,6.0],[23,5.8],[24,5.7],[25,5.8],[26,6.0],[27,6.3],[28,6.7],[29,7.2],[30,7.7],[31,8.2],[32,8.7],[33,9.1],[34,9.5],[35,9.8]],
    xLabel: "IMC (kg/m²)", yLabel: "Mortalidad relativa", xRange:[15,37], yRange:[5,10.5],
  },
};

const ScatterPlot = () => {
  const [scene, setScene] = useState<keyof typeof SCATTER_PATTERNS>("pos");
  const d = SCATTER_PATTERNS[scene];
  const W = 400, H = 240, PL = 50, PT = 20, PR = 20, PB = 40;
  const IW = W - PL - PR, IH = H - PT - PB;
  const xp = (v: number) => PL + ((v - d.xRange[0]) / (d.xRange[1] - d.xRange[0])) * IW;
  const yp = (v: number) => PT + (1 - (v - d.yRange[0]) / (d.yRange[1] - d.yRange[0])) * IH;
  const btnStyle = (k: keyof typeof SCATTER_PATTERNS) => ({
    padding: "4px 10px", border: `0.5px solid ${scene === k ? C.purple : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.purpleLt : "var(--color-background-secondary)",
    color: scene === k ? "#3C3489" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Patrón:</span>
        {(Object.keys(SCATTER_PATTERNS) as (keyof typeof SCATTER_PATTERNS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{SCATTER_PATTERNS[k].label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: W, width: "100%", height: "auto", flex: "0 0 auto" }} xmlns="http://www.w3.org/2000/svg">
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          {d.points.map(([x, y], i) => (
            <circle key={i} cx={xp(x)} cy={yp(y)} r={4.5} fill={C.purple} fillOpacity={0.55} stroke={C.purple} strokeWidth={0.4} />
          ))}
          <text x={PL + IW / 2} y={H - 4} textAnchor="middle" {...T.sm}>{d.xLabel}</text>
          <text x={12} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 12 ${PT + IH / 2})`} {...T.sm}>{d.yLabel}</text>
          <text x={PL + IW - 4} y={PT + 14} textAnchor="end" fontFamily={FONT} fontSize={12} fontWeight={500} fill={C.purple}>{d.r}</text>
        </svg>
        <div style={{ flex: 1, fontSize: 12, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.6, minWidth: 160 }}>
          {d.desc}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE 5 — Distribuciones comparadas (histograma + densidad)
═════════════════════════════════════════════════════════════════ */
const DistributionDemo = () => {
  const [scene, setScene] = useState<keyof typeof scenarios>("normal");
  const scenarios: Record<string, DistributionScenario> = {
    normal: { label: "Normal (simétrica)", bars: [1,3,7,14,22,26,22,14,7,3,1], color: C.blue, desc: "Campana simétrica: la media, mediana y moda coinciden. Los métodos paramétricos (T-Test, ANOVA) son apropiados. Ejemplo: talla adulta, errores de medición." },
    skew: { label: "Sesgada positiva (cola derecha)", bars: [26,20,16,12,9,6,4,3,2,1,1], color: C.amber, desc: "Cola derecha: la mayoría de valores son bajos pero hay unos pocos muy altos. Típico en costos hospitalarios, tiempos de espera, biomarcadores inflamatorios. La media > mediana. Considera transformación logarítmica o métodos no paramétricos." },
    bimodal: { label: "Bimodal (dos poblaciones)", bars: [3,7,16,22,10,5,9,18,24,14,6], color: C.purple, desc: "Dos picos: mezcla de dos poblaciones distintas. Ejemplo: glucemia en una muestra que incluye diabéticos y no diabéticos. La media 'promedio' no representa a nadie bien. Primero identifica y separa los subgrupos." },
  };
  const s = scenarios[scene];
  const maxBar = Math.max(...s.bars);
  const W = 320, H = 160, PL = 24, PT = 12, PB = 24;
  const IW = W - PL - 12, IH = H - PT - PB;
  const bw = IW / s.bars.length;
  const btnStyle = (k: keyof typeof scenarios) => ({
    padding: "4px 9px", border: `0.5px solid ${scene === k ? s.color : "#D3D1C7"}`,
    borderRadius: 5, background: scene === k ? `${s.color}18` : "var(--color-background-secondary)",
    color: scene === k ? s.color : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 5, fontFamily: FONT, marginBottom: 4,
  });

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10, flexWrap: "wrap", display: "flex" }}>
        {(Object.keys(scenarios) as (keyof typeof scenarios)[]).map((k) => <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{scenarios[k].label}</button>)}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ flex: "0 0 auto" }} xmlns="http://www.w3.org/2000/svg">
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.6} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.6} />
          {s.bars.map((b: number, i: number) => {
            const bh = (b / maxBar) * IH;
            return <rect key={i} x={PL + i * bw + 1} y={PT + IH - bh} width={bw - 2} height={bh} fill={s.color} fillOpacity={0.65} rx={1} />;
          })}
        </svg>
        <div style={{ flex: 1, fontSize: 12, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.6, minWidth: 160 }}>{s.desc}</div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE 6 — Bland-Altman illustrativo
═════════════════════════════════════════════════════════════════ */
const BlandAltman = () => {
  const [pattern, setPattern] = useState<keyof typeof patterns>("good");
  const W = 360, H = 220, PL = 50, PT = 20, PR = 20, PB = 40;
  const IW = W - PL - PR, IH = H - PT - PB;
  const patterns: Record<string, BlandAltmanScenario> = {
    good: {
      label: "Buena concordancia",
      desc: "Puntos dispersos aleatoriamente alrededor de 0. Los métodos son intercambiables en todo el rango clínico.",
      pts: [[4.5,0.1],[5.2,-0.2],[5.8,0.3],[6.1,-0.1],[6.5,0.2],[7.0,-0.3],[7.4,0.1],[7.8,0.2],[8.2,-0.2],[8.6,0.0],[9.0,-0.1],[9.4,0.3],[10.0,-0.2],[10.5,0.1],[11.0,0.2]],
      loa: 0.45, mean: 0.0,
    },
    fan: {
      label: "Efecto abanico ⚠",
      desc: "⚠ Las diferencias aumentan con la magnitud. Los métodos son intercambiables para valores bajos pero divergen para valores altos. Sugiere transformación logarítmica.",
      pts: [[4.5,0.05],[5.0,0.1],[5.5,0.0],[6.0,0.2],[6.5,-0.2],[7.0,0.4],[7.5,-0.4],[8.0,0.7],[8.5,-0.6],[9.0,0.9],[9.5,-0.8],[10.0,1.2],[10.5,-1.1],[11.0,1.4],[11.5,-1.3]],
      loa: null, mean: 0.0,
    },
  };
  const d = patterns[pattern];
  const xRange: [number, number] = [4, 12], yRange: [number, number] = [-1.8, 1.8];
  const xp = (v: number) => PL + ((v - xRange[0]) / (xRange[1] - xRange[0])) * IW;
  const yp = (v: number) => PT + (1 - (v - yRange[0]) / (yRange[1] - yRange[0])) * IH;
  const btnStyle = (k: keyof typeof patterns) => ({
    padding: "4px 10px", border: `0.5px solid ${pattern === k ? C.teal : "#D3D1C7"}`,
    borderRadius: 5, background: pattern === k ? C.tealLt : "var(--color-background-secondary)",
    color: pattern === k ? "#085041" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Patrón:</span>
        {(Object.keys(patterns) as (keyof typeof patterns)[]).map((k) => <button key={k} style={btnStyle(k)} onClick={() => setPattern(k)}>{patterns[k].label}</button>)}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxWidth: W, flex: "0 0 auto" }} xmlns="http://www.w3.org/2000/svg">
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={yp(0)} x2={PL + IW} y2={yp(0)} stroke={C.teal} strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={PL + IW + 2} y={yp(0) + 4} {...T.sm} fill="#085041">0</text>
          {d.loa && <>
            <line x1={PL} y1={yp(d.loa)} x2={PL + IW} y2={yp(d.loa)} stroke={C.gray} strokeWidth={1} strokeDasharray="3 2" />
            <line x1={PL} y1={yp(-d.loa)} x2={PL + IW} y2={yp(-d.loa)} stroke={C.gray} strokeWidth={1} strokeDasharray="3 2" />
            <text x={PL + IW + 2} y={yp(d.loa) + 4} {...T.sm}>+LoA</text>
            <text x={PL + IW + 2} y={yp(-d.loa) + 4} {...T.sm}>-LoA</text>
          </>}
          {d.pts.map(([x, y], i) => (
            <circle key={i} cx={xp(x)} cy={yp(y)} r={4} fill={C.teal} fillOpacity={0.6} stroke="#085041" strokeWidth={0.4} />
          ))}
          <text x={PL + IW / 2} y={H - 4} textAnchor="middle" {...T.sm}>Media de los dos métodos</text>
          <text x={10} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 10 ${PT + IH / 2})`} {...T.sm}>Diferencia (A − B)</text>
        </svg>
        <div style={{ flex: 1, fontSize: 12, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.6, minWidth: 140 }}>{d.desc}</div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE NUEVO — Curva ROC interactiva (PRIORIDAD ALTA)
═════════════════════════════════════════════════════════════════ */
const ROC_SCENARIOS: Record<string, ROCScenario> = {
  good: {
    label: "AUC=0.89 — Buen discriminador",
    auc: 0.89,
    desc: "Troponina para IAM: excelente capacidad para distinguir pacientes con infarto de aquellos sin él. La curva se acerca a la esquina superior izquierda.",
    annType: "success",
    ann: "AUC=0.89: si tomas un paciente enfermo y uno sano al azar, el test asigna mayor probabilidad al enfermo el 89% de las veces. La curva perfecta abraza la esquina superior izquierda. Punto de corte recomendado: donde la tangente es 45° (máximo índice de Youden).",
    points: [[0,0],[0.01,0.35],[0.03,0.62],[0.06,0.78],[0.10,0.88],[0.18,0.94],[0.30,0.97],[0.50,0.99],[0.70,1.0],[1.0,1.0]],
  },
  moderate: {
    label: "AUC=0.72 — Moderado",
    auc: 0.72,
    desc: "GAD-7 para ansiedad generalizada: rendimiento aceptable pero con solapamiento considerable entre sanos y enfermos.",
    annType: "warning",
    ann: "AUC=0.72: utilidad clínica moderada. En poblaciones con prevalencia intermedia, el test ayuda pero no es definitivo. Ideal como primer cribado, no como diagnóstico único.",
    points: [[0,0],[0.08,0.25],[0.18,0.45],[0.30,0.60],[0.45,0.74],[0.60,0.85],[0.75,0.92],[0.88,0.97],[0.95,0.99],[1.0,1.0]],
  },
  null: {
    label: "AUC=0.51 — No discriminador",
    auc: 0.51,
    desc: "Test sin capacidad discriminativa: la curva se aproxima a la diagonal (azar).",
    annType: "danger",
    ann: "AUC=0.51: el test no aporta información. Su rendimiento es casi idéntico a lanzar una moneda. Busca otro biomarcador o punto de corte.",
    points: [[0,0],[0.10,0.12],[0.25,0.28],[0.40,0.42],[0.55,0.57],[0.70,0.72],[0.85,0.86],[0.93,0.93],[0.98,0.97],[1.0,1.0]],
  },
};

const RocCurve = () => {
  const [scene, setScene] = useState<keyof typeof ROC_SCENARIOS>("good");
  const [cutoffIdx, setCutoffIdx] = useState(5);
  const d = ROC_SCENARIOS[scene];
  const W = 340, H = 260, PL = 45, PT = 20, PR = 15, PB = 40;
  const IW = W - PL - PR, IH = H - PT - PB;

  const xp = (v: number) => PL + v * IW;
  const yp = (v: number) => PT + (1 - v) * IH;

  const annBg = d.annType === "success" ? C.tealLt : d.annType === "danger" ? C.redLt : C.amberLt;
  const annColor = d.annType === "success" ? "#085041" : d.annType === "danger" ? "#791F1F" : "#633806";

  const btnStyle = (k: keyof typeof ROC_SCENARIOS) => ({
    padding: "5px 12px", border: `0.5px solid ${scene === k ? C.teal : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.tealLt : "var(--color-background-secondary)",
    color: scene === k ? "#085041" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });

  const pathD = d.points.map((p: [number, number], i: number) => {
    if (i === 0) return `M ${xp(p[0])} ${yp(p[1])}`;
    return `L ${xp(p[0])} ${yp(p[1])}`;
  }).join(" ");

  const currentPoint = d.points[Math.min(cutoffIdx, d.points.length - 1)];
  const sensitivity = currentPoint[1];
  const specificity = 1 - currentPoint[0];

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Escenario:</span>
        {(Object.keys(ROC_SCENARIOS) as (keyof typeof ROC_SCENARIOS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => { setScene(k); setCutoffIdx(5); }}>{ROC_SCENARIOS[k].label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxWidth: W }} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Curva ROC con AUC=${d.auc}`}>
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT} stroke={C.gray} strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
          <text x={PL + IW + 2} y={PT + 6} {...T.sm} fill={C.gray}>Azar</text>
          <path d={pathD} fill="none" stroke={C.teal} strokeWidth={2.5} />
          <circle cx={xp(currentPoint[0])} cy={yp(currentPoint[1])} r={6} fill={C.red} fillOpacity={0.8} stroke="#FFF" strokeWidth={1.5} />
          <text x={PL + IW / 2} y={H - 4} textAnchor="middle" {...T.sm}>1 - Especificidad (FPR)</text>
          <text x={10} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 10 ${PT + IH / 2})`} {...T.sm}>Sensibilidad (TPR)</text>
          <text x={PL + IW - 4} y={PT + 14} textAnchor="end" fontFamily={FONT} fontSize={13} fontWeight={600} fill={C.teal}>AUC = {d.auc}</text>
        </svg>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>
              Punto de corte (control deslizante)
            </label>
            <input
              type="range"
              min={0}
              max={d.points.length - 1}
              value={cutoffIdx}
              onChange={(e) => setCutoffIdx(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ fontSize: 12, fontFamily: FONT, lineHeight: 1.6, marginBottom: 8 }}>
            <strong>Sensibilidad:</strong> {(sensitivity * 100).toFixed(0)}%<br />
            <strong>Especificidad:</strong> {(specificity * 100).toFixed(0)}%
          </div>
          <div style={{ fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
            {d.desc}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>Interpretación clínica: </strong>{d.ann}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE NUEVO — Funnel Plot interactivo (PRIORIDAD ALTA)
═════════════════════════════════════════════════════════════════ */
const FUNNEL_SCENARIOS: Record<string, FunnelScenario> = {
  symmetric: {
    label: "Embudo simétrico",
    pooledOR: 0.75,
    desc: "Los estudios se distribuyen simétricamente alrededor del efecto combinado. No hay evidencia visual de sesgo de publicación.",
    annType: "success",
    ann: "Embudo simétrico: los estudios pequeños (abajo) se dispersan a ambos lados del efecto combinado (OR=0.75). Esto sugiere que tanto estudios positivos como negativos han sido publicados. La estimación combinada es fiable.",
    points: [
      { or: 0.68, se: 0.15 }, { or: 0.82, se: 0.15 }, { or: 0.55, se: 0.28 }, { or: 0.95, se: 0.28 },
      { or: 0.45, se: 0.42 }, { or: 1.05, se: 0.42 }, { or: 0.35, se: 0.58 }, { or: 1.15, se: 0.58 },
      { or: 0.28, se: 0.75 }, { or: 1.25, se: 0.75 }, { or: 0.20, se: 0.92 }, { or: 1.35, se: 0.92 },
      { or: 0.70, se: 0.10 }, { or: 0.80, se: 0.10 },
    ],
  },
  asymmetric: {
    label: "Embudo asimétrico ⚠",
    pooledOR: 0.75,
    desc: "Faltan estudios pequeños con resultados negativos (OR > 1) en la base derecha del embudo. La asimetría sugiere sesgo de publicación.",
    annType: "danger",
    ann: "⚠ La asimetría sugiere sesgo de publicación. Los estudios pequeños no significativos o con resultados 'incómodos' probablemente nunca fueron publicados. La estimación combinada está inflada a favor de la intervención.",
    points: [
      { or: 0.68, se: 0.15 }, { or: 0.82, se: 0.15 }, { or: 0.55, se: 0.28 }, { or: 0.72, se: 0.28 },
      { or: 0.45, se: 0.42 }, { or: 0.62, se: 0.42 }, { or: 0.35, se: 0.58 }, { or: 0.52, se: 0.58 },
      { or: 0.28, se: 0.75 }, { or: 0.42, se: 0.75 }, { or: 0.20, se: 0.92 }, { or: 0.32, se: 0.92 },
      { or: 1.05, se: 0.08 }, { or: 0.98, se: 0.10 },
    ],
  },
  outlier: {
    label: "Estudio outlier influyente",
    pooledOR: 0.70,
    desc: "Un estudio grande (SE muy bajo) con OR=0.25 está muy alejado del resto, arrastrando el efecto combinado.",
    annType: "warning",
    ann: "Un estudio con mucho peso (SE pequeño) y resultado extremo puede sesgar todo el metaanálisis. Realiza análisis de sensibilidad excluyendo este estudio para ver cuánto cambia el efecto combinado.",
    points: [
      { or: 0.68, se: 0.18 }, { or: 0.75, se: 0.18 }, { or: 0.62, se: 0.30 }, { or: 0.80, se: 0.30 },
      { or: 0.55, se: 0.45 }, { or: 0.85, se: 0.45 }, { or: 0.48, se: 0.60 }, { or: 0.90, se: 0.60 },
      { or: 0.40, se: 0.78 }, { or: 0.95, se: 0.78 }, { or: 0.72, se: 0.12 }, { or: 0.68, se: 0.12 },
      { or: 0.25, se: 0.05 },
    ],
  },
};

const FunnelPlot = () => {
  const [scene, setScene] = useState<keyof typeof FUNNEL_SCENARIOS>("symmetric");
  const d = FUNNEL_SCENARIOS[scene];
  const W = 360, H = 250, PL = 50, PT = 20, PR = 20, PB = 40;
  const IW = W - PL - PR, IH = H - PT - PB;

  const orMin = 0.15, orMax = 1.6;
  const seMax = 1.1;

  const xp = (or: number) => PL + ((Math.log(or) - Math.log(orMin)) / (Math.log(orMax) - Math.log(orMin))) * IW;
  const yp = (se: number) => PT + (se / seMax) * IH;

  const annBg = d.annType === "success" ? C.tealLt : d.annType === "danger" ? C.redLt : C.amberLt;
  const annColor = d.annType === "success" ? "#085041" : d.annType === "danger" ? "#791F1F" : "#633806";

  const btnStyle = (k: keyof typeof FUNNEL_SCENARIOS) => ({
    padding: "5px 12px", border: `0.5px solid ${scene === k ? C.purple : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.purpleLt : "var(--color-background-secondary)",
    color: scene === k ? "#3C3489" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });

  const seSteps = Array.from({ length: 20 }, (_, i) => (i + 1) * (seMax / 20));
  const funnelLeft = seSteps.map((se: number) => ({ se, or: Math.exp(Math.log(d.pooledOR) - 1.96 * se) }));
  const funnelRight = seSteps.map((se: number) => ({ se, or: Math.exp(Math.log(d.pooledOR) + 1.96 * se) }));

  const funnelPath = (pts: {se: number, or: number}[]) => pts.map((p, i) => {
    const cmd = i === 0 ? "M" : "L";
    return `${cmd} ${xp(p.or)} ${yp(p.se)}`;
  }).join(" ");

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Escenario:</span>
        {(Object.keys(FUNNEL_SCENARIOS) as (keyof typeof FUNNEL_SCENARIOS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{FUNNEL_SCENARIOS[k].label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxWidth: W }} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Funnel plot para detección de sesgo de publicación">
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={xp(d.pooledOR)} y1={PT} x2={xp(d.pooledOR)} y2={PT + IH} stroke={C.blue} strokeWidth={1.5} strokeDasharray="4 3" />
          <line x1={xp(1)} y1={PT} x2={xp(1)} y2={PT + IH} stroke={C.red} strokeWidth={1} strokeDasharray="3 2" />
          <path d={funnelPath(funnelLeft)} fill="none" stroke={C.gray} strokeWidth={0.8} strokeDasharray="2 2" />
          <path d={funnelPath(funnelRight)} fill="none" stroke={C.gray} strokeWidth={0.8} strokeDasharray="2 2" />
          {d.points.map((p: FunnelStudy, i: number) => {
            const size = Math.max(4, 12 - p.se * 8);
            return (
              <circle key={i} cx={xp(p.or)} cy={yp(p.se)} r={size} fill={C.purple} fillOpacity={0.55} stroke={C.purple} strokeWidth={0.4} />
            );
          })}
          <text x={PL + IW / 2} y={H - 4} textAnchor="middle" {...T.sm}>Odds Ratio (escala log)</text>
          <text x={10} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 10 ${PT + IH / 2})`} {...T.sm}>Error Estándar</text>
          <line x1={PL + IW - 80} y1={PT + 8} x2={PL + IW - 60} y2={PT + 8} stroke={C.blue} strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={PL + IW - 56} y={PT + 12} {...T.sm} fill={C.blueDk}>OR combinado</text>
          <line x1={PL + IW - 80} y1={PT + 20} x2={PL + IW - 60} y2={PT + 20} stroke={C.red} strokeWidth={1} strokeDasharray="3 2" />
          <text x={PL + IW - 56} y={PT + 24} {...T.sm} fill="#791F1F">OR=1</text>
        </svg>
        <div style={{ flex: 1, minWidth: 140, fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          {d.desc}
        </div>
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>Interpretación: </strong>{d.ann}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE NUEVO — Violin Box Transition (PRIORIDAD ALTA)
═════════════════════════════════════════════════════════════════ */
const kernelDensity = (data: number[], bandwidth = 0.5, resolution = 50) => {
  const min = Math.min(...data) - 2 * bandwidth;
  const max = Math.max(...data) + 2 * bandwidth;
  const step = (max - min) / resolution;
  const kde = (x: number) => data.reduce((sum: number, d: number) => sum + Math.exp(-0.5 * ((x - d) / bandwidth) ** 2), 0) / (data.length * bandwidth * Math.sqrt(2 * Math.PI));
  return Array.from({ length: resolution }, (_, i) => ({ x: min + i * step, y: kde(min + i * step) }));
};

const generateNormalData = (mean: number, sd: number, n: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    result.push(z * sd + mean);
  }
  return result;
};

const VIOLIN_DATASETS: Record<string, ViolinScenario> = {
  normal: {
    label: "Normal (simétrica)",
    data: generateNormalData(7, 1, 40),
    desc: "Violín simétrico en forma de campana. Boxplot y violín cuentan la misma historia. La media, mediana y moda coinciden.",
    annType: "success",
    ann: "Distribución normal: el boxplot resume bien los datos. El violín confirma simetría y unimodalidad. Los métodos paramétricos (T-Test, ANOVA) son apropiados.",
  },
  bimodal: {
    label: "Bimodal (dos poblaciones)",
    data: [...generateNormalData(5.5, 0.5, 20), ...generateNormalData(8.5, 0.5, 20)],
    desc: "Violín con estrechamiento central: dos poblaciones mezcladas. El boxplot parece completamente normal — este es el momento de revelación.",
    annType: "danger",
    ann: "⚠ Bimodalidad oculta: el boxplot muestra una mediana en ~7 sin advertir que hay dos grupos distintos. La media 'promedio' no representa a nadie. Primero identifica y separa los subgrupos antes de cualquier análisis.",
  },
  skewed: {
    label: "Sesgada con outliers",
    data: [...Array.from({ length: 30 }, () => Math.exp(Math.random() * 1.5) + 4), ...Array.from({ length: 10 }, () => 9 + Math.random() * 3)],
    desc: "Violín con cola larga visible hacia la derecha. El boxplot solo muestra puntos aislados; el violín revela la densidad completa de los valores extremos.",
    annType: "warning",
    ann: "Distribución sesgada: la media > mediana. Considera transformación logarítmica o métodos no paramétricos. Los outliers no son errores de medición, son parte de la distribución real.",
  },
};

const ViolinBoxTransition = () => {
  const [showViolin, setShowViolin] = useState(false);
  const [scene, setScene] = useState<keyof typeof VIOLIN_DATASETS>("normal");
  const d = VIOLIN_DATASETS[scene];
  const W = 480, H = 220, PL = 55, PT = 20, PR = 20, PB = 35;
  const IW = W - PL - PR, IH = H - PT - PB;

  const sorted = [...d.data].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const max = sorted[n - 1];
  const med = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
  const q1 = sorted[Math.floor(n/4)];
  const q3 = sorted[Math.floor(3*n/4)];
  const iqr = q3 - q1;
  const lowerWhisker = Math.max(min, q1 - 1.5 * iqr);
  const upperWhisker = Math.min(max, q3 + 1.5 * iqr);
  const outliers = sorted.filter(v => v < lowerWhisker || v > upperWhisker);

  const yMin = Math.min(min - 1, 3);
  const yMax = Math.max(max + 1, 11);
  const yp = (v: number) => PT + (1 - (v - yMin) / (yMax - yMin)) * IH;

  const density = kernelDensity(d.data, 0.4, 60);
  const maxDensity = Math.max(...density.map(p => p.y));
  const violinWidth = 55;

  const annBg = d.annType === "success" ? C.tealLt : d.annType === "danger" ? C.redLt : C.amberLt;
  const annColor = d.annType === "success" ? "#085041" : d.annType === "danger" ? "#791F1F" : "#633806";

  const btnStyle = (k: keyof typeof VIOLIN_DATASETS) => ({
    padding: "4px 10px", border: `0.5px solid ${scene === k ? C.teal : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.tealLt : "var(--color-background-secondary)",
    color: scene === k ? "#085041" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT, marginBottom: 4,
  });

  const violinPath = () => {
    const cx = PL + IW / 2;
    const pointsLeft: string[] = [];
    const pointsRight: string[] = [];
    density.forEach((p: {x: number, y: number}) => {
      const y = yp(p.x);
      const xOffset = (p.y / maxDensity) * violinWidth;
      pointsLeft.push(`${cx - xOffset},${y}`);
      pointsRight.push(`${cx + xOffset},${y}`);
    });
    return `M ${pointsLeft.join(" L ")} L ${pointsRight.reverse().join(" L ")} Z`;
  };

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Distribución:</span>
        {(Object.keys(VIOLIN_DATASETS) as (keyof typeof VIOLIN_DATASETS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{VIOLIN_DATASETS[k].label}</button>
        ))}
        <label style={{ marginLeft: 16, fontSize: 11, fontFamily: FONT, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={showViolin} onChange={(e) => setShowViolin(e.target.checked)} />
          Mostrar Violin Plot
        </label>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxWidth: W }} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Violin/Boxplot comparativo">
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          {[4,5,6,7,8,9,10].map((v: number) => (
            <g key={v}>
              <line x1={PL} y1={yp(v)} x2={PL + IW} y2={yp(v)} stroke={C.gray} strokeWidth={0.3} strokeDasharray="2 3" />
              <text x={PL - 6} y={yp(v)} textAnchor="end" dominantBaseline="central" {...T.sm}>{v}</text>
            </g>
          ))}
          <text x={14} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 14 ${PT + IH / 2})`} {...T.sm}>Valor</text>

          {showViolin ? (
            <g>
              <path d={violinPath()} fill={C.teal} fillOpacity={0.3} stroke={C.teal} strokeWidth={1.2} />
              <line x1={PL + IW/2 - violinWidth * 0.5} y1={yp(med)} x2={PL + IW/2 + violinWidth * 0.5} y2={yp(med)} stroke={C.teal} strokeWidth={2} />
              <line x1={PL + IW/2 - violinWidth * 0.3} y1={yp(q1)} x2={PL + IW/2 + violinWidth * 0.3} y2={yp(q1)} stroke={C.teal} strokeWidth={1} strokeDasharray="2 2" />
              <line x1={PL + IW/2 - violinWidth * 0.3} y1={yp(q3)} x2={PL + IW/2 + violinWidth * 0.3} y2={yp(q3)} stroke={C.teal} strokeWidth={1} strokeDasharray="2 2" />
            </g>
          ) : (
            <g>
              <line x1={PL + 40} y1={yp(lowerWhisker)} x2={PL + IW - 40} y2={yp(lowerWhisker)} stroke={C.gray} strokeWidth={1} />
              <line x1={PL + 40} y1={yp(upperWhisker)} x2={PL + IW - 40} y2={yp(upperWhisker)} stroke={C.gray} strokeWidth={1} />
              <line x1={PL + IW/2} y1={yp(lowerWhisker)} x2={PL + IW/2} y2={yp(q1)} stroke={C.teal} strokeWidth={1.2} />
              <line x1={PL + IW/2} y1={yp(q3)} x2={PL + IW/2} y2={yp(upperWhisker)} stroke={C.teal} strokeWidth={1.2} />
              <rect x={PL + 40} y={yp(q3)} width={IW - 80} height={yp(q1) - yp(q3)} fill={C.teal} fillOpacity={0.2} stroke={C.teal} strokeWidth={1} rx={2} />
              <line x1={PL + 40} y1={yp(med)} x2={PL + IW - 40} y2={yp(med)} stroke={C.teal} strokeWidth={2} />
              {outliers.map((o: number, i: number) => (
                <circle key={i} cx={PL + IW/2} cy={yp(o)} r={4} fill="none" stroke={C.red} strokeWidth={1.2} opacity={0.8} />
              ))}
            </g>
          )}
        </svg>
        <div style={{ flex: 1, minWidth: 160, fontSize: 12, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          {d.desc}
        </div>
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>{showViolin ? "Con violín: " : "Con boxplot: "}</strong>{d.ann}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE NUEVO — Interaction Plot (PRIORIDAD MEDIA)
═════════════════════════════════════════════════════════════════ */
const INTERACTION_SCENARIOS: Record<string, InteractionScenario> = {
  parallel: {
    label: "Sin interacción (paralelas)",
    desc: "Líneas paralelas: el efecto del tratamiento es igual en ambos sexos. Ambos mejoran 4 puntos en la escala PHQ-9.",
    annType: "success",
    ann: "Sin interacción: el tratamiento es igualmente efectivo para hombres y mujeres. La estimación global del efecto es válida y puede aplicarse a toda la población.",
    women: [14, 10], men: [16, 12],
  },
  cross: {
    label: "Interacción cualitativa ⚠",
    desc: "Líneas que se cruzan: el tratamiento beneficia a mujeres (reducción de 5 puntos) pero perjudica a hombres (aumento de 3 puntos).",
    annType: "danger",
    ann: "⚠ INTERACCIÓN CUALITATIVA. El tratamiento beneficia a mujeres pero perjudica a hombres. No promedies: la media general (-1 punto) no representa a nadie. Esto obliga a estratificar el análisis y la recomendación clínica.",
    women: [15, 10], men: [13, 16],
  },
};

const InteractionPlot = () => {
  const [scene, setScene] = useState<keyof typeof INTERACTION_SCENARIOS>("parallel");
  const d = INTERACTION_SCENARIOS[scene];
  const W = 340, H = 240, PL = 55, PT = 20, PR = 20, PB = 45;
  const IW = W - PL - PR, IH = H - PT - PB;

  const yMin = 5, yMax = 20;
  const yp = (v: number) => PT + (1 - (v - yMin) / (yMax - yMin)) * IH;
  const xPos = [PL + IW * 0.2, PL + IW * 0.8];

  const annBg = d.annType === "success" ? C.tealLt : C.redLt;
  const annColor = d.annType === "success" ? "#085041" : "#791F1F";

  const btnStyle = (k: keyof typeof INTERACTION_SCENARIOS) => ({
    padding: "4px 10px", border: `0.5px solid ${scene === k ? C.blue : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.blueLt : "var(--color-background-secondary)",
    color: scene === k ? C.blueDk : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT,
  });

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginRight: 8 }}>Escenario:</span>
        {(Object.keys(INTERACTION_SCENARIOS) as (keyof typeof INTERACTION_SCENARIOS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{INTERACTION_SCENARIOS[k].label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxWidth: W }} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfico de interacción">
          <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.8} />
          {[5, 10, 15, 20].map((v: number) => (
            <g key={v}>
              <line x1={PL} y1={yp(v)} x2={PL + IW} y2={yp(v)} stroke={C.gray} strokeWidth={0.3} strokeDasharray="2 3" />
              <text x={PL - 6} y={yp(v)} textAnchor="end" dominantBaseline="central" {...T.sm}>{v}</text>
            </g>
          ))}
          <line x1={xPos[0]} y1={yp(d.women[0])} x2={xPos[1]} y2={yp(d.women[1])} stroke={C.blue} strokeWidth={2.5} />
          <line x1={xPos[0]} y1={yp(d.men[0])} x2={xPos[1]} y2={yp(d.men[1])} stroke={C.red} strokeWidth={2.5} strokeDasharray="6 3" />
          <circle cx={xPos[0]} cy={yp(d.women[0])} r={5} fill={C.blue} />
          <circle cx={xPos[1]} cy={yp(d.women[1])} r={5} fill={C.blue} />
          <circle cx={xPos[0]} cy={yp(d.men[0])} r={5} fill={C.red} />
          <circle cx={xPos[1]} cy={yp(d.men[1])} r={5} fill={C.red} />
          <text x={xPos[0]} y={PT + IH + 16} textAnchor="middle" {...T.sm}>Pre</text>
          <text x={xPos[1]} y={PT + IH + 16} textAnchor="middle" {...T.sm}>Post</text>
          <text x={10} y={PT + IH / 2} textAnchor="middle" transform={`rotate(-90 10 ${PT + IH / 2})`} {...T.sm}>PHQ-9</text>
          <line x1={PL + IW - 90} y1={PT + 10} x2={PL + IW - 70} y2={PT + 10} stroke={C.blue} strokeWidth={2.5} />
          <text x={PL + IW - 66} y={PT + 14} {...T.sm} fill={C.blueDk}>Mujeres</text>
          <line x1={PL + IW - 90} y1={PT + 24} x2={PL + IW - 70} y2={PT + 24} stroke={C.red} strokeWidth={2.5} strokeDasharray="6 3" />
          <text x={PL + IW - 66} y={PT + 28} {...T.sm} fill="#791F1F">Hombres</text>
        </svg>
        <div style={{ flex: 1, minWidth: 140, fontSize: 12, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          {d.desc}
        </div>
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>Interpretación: </strong>{d.ann}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE NUEVO — QQ-Plot interactivo (PRIORIDAD COMPLEMENTARIA)
═════════════════════════════════════════════════════════════════ */
const QQ_SCENARIOS: Record<string, QQScenario> = {
  normal: {
    label: "Normal (simétrica)",
    desc: "Puntos alineados sobre la diagonal. Los datos siguen una distribución normal.",
    annType: "success",
    ann: "Distribución normal confirmada. Los métodos paramétricos (T-Test, ANOVA, regresión lineal) son apropiados.",
    generator: () => generateNormalData(0, 1, 80),
  },
  heavyTails: {
    label: "Colas pesadas ⚠",
    desc: "Puntos se curvan hacia arriba en ambos extremos: más valores extremos de lo esperado en una normal.",
    annType: "warning",
    ann: "Colas pesadas: hay más valores extremos de lo esperado. Con n>50, el T-Test es robusto incluso con esta desviación. Para muestras pequeñas, considera métodos no paramétricos o transformaciones.",
    generator: () => {
      const result: number[] = [];
      for (let i = 0; i < 80; i++) {
        const normal = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
        result.push(normal / Math.sqrt(2/3));
      }
      return result;
    },
  },
  skewed: {
    label: "Sesgada positiva ⚠",
    desc: "Puntos se curvan hacia arriba en el extremo derecho: cola derecha más pesada de lo normal.",
    annType: "warning",
    ann: "Sesgo positivo: cola derecha pesada. La media > mediana. Considera transformación logarítmica o métodos no paramétricos. El T-Test puede ser anticonservador con muestras pequeñas.",
    generator: () => {
      const result: number[] = [];
      for (let i = 0; i < 80; i++) {
        result.push(Math.exp(Math.random() * 1.2) - 1.5);
      }
      return result;
    },
  },
};

const QQPlotInteractivo = () => {
  const [scene, setScene] = useState<keyof typeof QQ_SCENARIOS>("normal");
  const d = QQ_SCENARIOS[scene];
  const data = d.generator();
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

  const theoretical = Array.from({ length: n }, (_, i) => {
    const p = (i + 0.5) / n;
    const t = Math.sqrt(-2 * Math.log(Math.min(p, 1 - p)));
    const sign = p < 0.5 ? -1 : 1;
    const q = t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t);
    return sign * q;
  }).sort((a, b) => a - b);

  const histBins = 12;
  const minData = Math.min(...data);
  const maxData = Math.max(...data);
  const binWidth = (maxData - minData) / histBins;
  const bins = Array.from({ length: histBins }, (_, i) => ({
    x0: minData + i * binWidth,
    x1: minData + (i + 1) * binWidth,
    count: data.filter((v: number) => v >= minData + i * binWidth && v < minData + (i + 1) * binWidth).length,
  }));
  const maxCount = Math.max(...bins.map(b => b.count));

  const W = 520, H = 220, PL = 45, PT = 20, PR = 15, PB = 35;
  const IW = (W - PL - PR) / 2 - 10;
  const IH = H - PT - PB;

  const annBg = d.annType === "success" ? C.tealLt : C.amberLt;
  const annColor = d.annType === "success" ? "#085041" : "#633806";

  const btnStyle = (k: keyof typeof QQ_SCENARIOS) => ({
    padding: "4px 10px", border: `0.5px solid ${scene === k ? C.purple : "#D3D1C7"}`,
    borderRadius: 6, background: scene === k ? C.purpleLt : "var(--color-background-secondary)",
    color: scene === k ? "#3C3489" : "var(--color-text-secondary)",
    cursor: "pointer", fontSize: 11, marginRight: 6, fontFamily: FONT, marginBottom: 4,
  });

  return (
    <div style={{ margin: "1.2rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10, border: `0.5px solid ${C.gray}30` }}>
      <div style={{ marginBottom: 10, flexWrap: "wrap", display: "flex" }}>
        {(Object.keys(QQ_SCENARIOS) as (keyof typeof QQ_SCENARIOS)[]).map((k) => (
          <button key={k} style={btnStyle(k)} onClick={() => setScene(k)}>{QQ_SCENARIOS[k].label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", maxWidth: W }} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QQ-Plot e Histograma">
          {/* Histograma (izquierda) */}
          <g>
            <line x1={PL} y1={PT} x2={PL} y2={PT + IH} stroke={C.gray} strokeWidth={0.6} />
            <line x1={PL} y1={PT + IH} x2={PL + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.6} />
            {bins.map((b, i) => {
              const bh = (b.count / maxCount) * IH;
              return <rect key={i} x={PL + (i / histBins) * IW} y={PT + IH - bh} width={IW / histBins - 1} height={bh} fill={C.purple} fillOpacity={0.5} rx={1} />;
            })}
            <text x={PL + IW/2} y={H - 4} textAnchor="middle" {...T.sm}>Histograma</text>
          </g>

          {/* QQ-Plot (derecha) */}
          <g>
            <line x1={PL + IW + 25} y1={PT} x2={PL + IW + 25} y2={PT + IH} stroke={C.gray} strokeWidth={0.6} />
            <line x1={PL + IW + 25} y1={PT + IH} x2={PL + IW + 25 + IW} y2={PT + IH} stroke={C.gray} strokeWidth={0.6} />
            <line x1={PL + IW + 25} y1={PT + IH} x2={PL + IW + 25 + IW} y2={PT} stroke={C.gray} strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
            {theoretical.map((t, i) => {
              const cx = PL + IW + 25 + ((t + 3) / 6) * IW;
              const cy = PT + (1 - (sorted[i] + 3) / 6) * IH;
              return <circle key={i} cx={cx} cy={cy} r={2} fill={C.purple} fillOpacity={0.7} />;
            })}
            <text x={PL + IW + 25 + IW/2} y={H - 4} textAnchor="middle" {...T.sm}>QQ-Plot (Normal teórica)</text>
          </g>
        </svg>
        <div style={{ flex: 1, minWidth: 140, fontSize: 12, fontFamily: FONT, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          {d.desc}
        </div>
      </div>
      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: annBg, color: annColor, fontSize: 12, fontFamily: FONT, lineHeight: 1.5 }}>
        <strong>Interpretación: </strong>{d.ann}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL — Lección completa
═════════════════════════════════════════════════════════════════ */
export default function Lesson() {
  return (
    <div className="lesson-prose">

      <h2>El radiólogo de la estadística: leer gráficos en segundos</h2>
      <p>
        Cuando un radiólogo abre una imagen, no la mira con la misma mirada que una persona sin
        formación. En décimas de segundo, sus ojos se dirigen exactamente a las zonas de interés,
        buscan patrones específicos, reconocen anomalías por su forma, y descartan artefactos.
        Eso es literalmente lo que este módulo te propone aprender con los gráficos estadísticos.
      </p>
      <p>
        Un gráfico no es un adorno: es el formato más denso y honesto de los datos. Un solo Forest
        Plot puede resumir el trabajo de 15 ensayos clínicos. Una curva Kaplan-Meier puede revelar
        si un tratamiento beneficia desde el primer día o solo después de 6 meses. Un scatter plot
        puede mostrar una relación que ningún estadístico habría encontrado sin verla primero.
        La clave es saber qué buscar — y en qué orden.
      </p>

      <Callout type="info" title="El protocolo de lectura de cualquier gráfico (en este orden)">
        <p>
          <strong>1. ¿Qué miden los ejes?</strong> Lee los títulos de los ejes antes de mirar los datos. Un eje sin unidades o con escala manipulada puede distorsionar cualquier mensaje.<br /><br />
          <strong>2. ¿Qué escala tiene el eje Y?</strong> ¿Empieza en cero? ¿Usa escala logarítmica? Una barra que parece el doble puede representar solo un 5% más de diferencia si el eje no empieza en cero.<br /><br />
          <strong>3. ¿Cuál es el tamaño muestral?</strong> Los gráficos con muy pocos puntos o pacientes al final del seguimiento son menos fiables. Busca la tabla de número en riesgo o los intervalos de confianza.<br /><br />
          <strong>4. Busca las señales de alerta específicas del tipo de gráfico.</strong> Cada tipo tiene sus propias trampas: las detallas en cada sección de este módulo.
        </p>
      </Callout>

      {/* NUEVO: Principio de Tufte */}
      <Callout type="tip" title="El principio más importante que probablemente no te enseñaron">
        <p>
          Edward Tufte, el padre de la visualización moderna de datos, propuso el concepto de <strong>data-ink ratio</strong>:
          maximizar la proporción de tinta (o píxeles) dedicada a los datos respecto a la tinta decorativa.
          Cada elemento de un gráfico que no representa un dato debería tener una razón de existir.
          <br /><br />
          <strong>Ejemplos de 'chartjunk' comunes en revistas médicas:</strong> efectos 3D en gráficos de barras,
          sombras, gradientes, fondos de colores intensos, líneas de cuadrícula excesivas.
          <br /><br />
          📖 Tufte, E. R. (1983). <em>The Visual Display of Quantitative Information.</em> Graphics Press.
        </p>
      </Callout>

      {/* ════ FOREST PLOT ════ */}
      <h2>Forest Plot: la síntesis visual de la evidencia</h2>
      <p>
        El Forest Plot (o "gráfico de bosque") es la representación estándar de un metaanálisis.
        Cada estudio aparece como un cuadrado — cuyo tamaño indica su peso en el análisis —
        con una línea horizontal que muestra su intervalo de confianza al 95%. El diamante al
        final resume el efecto combinado: su centro es la estimación y su ancho, el IC 95%.
      </p>
      <p>
        Explora los tres escenarios del gráfico interactivo y fíjate en cómo el diamante y el I²
        cambian la interpretación del mismo resultado.
      </p>

      <ForestPlot />

      <Callout type="info" title="Los cinco elementos que debes leer en todo Forest Plot">
        <p>
          <strong>1. Línea de no-efecto:</strong> OR=1 para razones de odds/riesgo, 0 para diferencias de medias. Es el punto de referencia absoluto.<br /><br />
          <strong>2. El diamante:</strong> Si no toca la línea de no-efecto → resultado significativo. Si la cruza → no significativo. El ancho del diamante refleja la precisión del efecto combinado.<br /><br />
          <strong>3. I² (heterogeneidad):</strong> I²&lt;40% = baja (estudios consistentes). 40–75% = moderada (cautela). &gt;75% = alta (el diamante puede ser un "promedio" de efectos muy distintos).<br /><br />
          <strong>4. El tamaño de los cuadrados:</strong> Los estudios más grandes (mayor peso) tienen cuadrados más grandes. Si un solo estudio domina visualmente, el resultado depende críticamente de él.<br /><br />
          <strong>5. Los IC individuales:</strong> Un estudio con IC muy ancho aporta poca información. Un estudio con IC que cruce la línea de no-efecto, por sí solo no es significativo — aunque el efecto combinado lo sea.
        </p>
      </Callout>

      <Callout type="warning" title="📖 Referencias — Forest Plot e I²">
        <p>
          <strong>Dettori, J. R. et al. (2021).</strong> "Seeing the forest by looking at the trees:
          how to interpret a meta-analysis forest plot."{" "}
          <em>Global Spine Journal</em>, 11(4), 614–616.{" "}
          <a href="https://doi.org/10.1177/21925682211003889" target="_blank" rel="noopener noreferrer">
            doi:10.1177/21925682211003889
          </a>
          <br /><br />
          <strong>Higgins, J. P. T. et al. (2023).</strong> Cochrane Handbook for Systematic Reviews
          of Interventions. Chapters 9 y 10 (heterogeneidad e I²).{" "}
          <a href="https://training.cochrane.org/handbook" target="_blank" rel="noopener noreferrer">
            training.cochrane.org/handbook
          </a>
        </p>
      </Callout>

      {/* ════ KAPLAN-MEIER ════ */}
      <h2>Curvas Kaplan-Meier: el tiempo importa</h2>
      <p>
        Las curvas Kaplan-Meier muestran la probabilidad de supervivencia (o de no experimentar
        un evento) a lo largo del tiempo. Son omnipresentes en oncología, cardiología y cualquier
        estudio que mida "tiempo hasta evento" — tiempo hasta recaída, hasta reingreso, hasta muerte.
      </p>
      <p>
        El secreto para leerlas correctamente no está en mirar solo si las curvas están separadas,
        sino en <em>cuándo</em> se separan, <em>cuánto</em> se mantiene la separación, y cuántos
        pacientes quedan en riesgo al final del seguimiento.
      </p>

      <KaplanMeier />

      <Callout type="info" title="La tabla de número en riesgo: la clave que los principiantes ignoran">
        <p>
          Al pie de toda curva Kaplan-Meier bien reportada aparece una tabla con cuántos pacientes
          siguen "en riesgo" (sin haber tenido el evento ni sido censurados) en cada punto temporal.
          A medida que avanza el tiempo, este número se reduce — y las estimaciones de supervivencia
          se vuelven menos fiables. Una curva que parece estabilizarse al final puede deberse
          simplemente a que quedan muy pocos pacientes. Si al mes 24 solo hay 8 pacientes en riesgo,
          la estimación a ese tiempo es prácticamente inútil estadísticamente.
          <br /><br />
          <strong>Regla práctica:</strong> interpreta con cautela cualquier punto de la curva donde
          el número en riesgo sea menor al 20% del tamaño inicial del grupo.
        </p>
      </Callout>

      {/* ════ CURVA ROC (NUEVO) ════ */}
      <h2>Curva ROC: ¿qué tan bueno es mi test?</h2>
      <p>
        La curva ROC (Receiver Operating Characteristic) es el estándar para evaluar pruebas diagnósticas,
        biomarcadores y modelos predictivos. Cada punto de la curva representa un par
        Sensibilidad / 1-Especificidad para un punto de corte distinto. El área bajo la curva (AUC)
        resume la capacidad discriminativa: 1.0 = perfecta, 0.5 = azar.
      </p>
      <p>
        Mueve el control deslizante para ver cómo cambian la sensibilidad y especificidad al elegir
        distintos puntos de corte — una decisión clínica, no estadística.
      </p>

      <RocCurve />

      {/* ════ FUNNEL PLOT (NUEVO) ════ */}
      <h2>Funnel Plot: el detector de humo del metaanálisis</h2>
      <p>
        El Funnel Plot (gráfico de embudo) es la herramienta visual para detectar sesgo de publicación.
        Cada estudio se representa como un punto: en el eje X su efecto estimado (OR), en el eje Y
        su precisión (error estándar). Los estudios grandes y precisos están arriba; los pequeños, abajo.
      </p>
      <p>
        Si el embudo es simétrico, no hay evidencia de sesgo. Si falta una esquina (generalmente la
        de estudios pequeños con resultados negativos), el sesgo de publicación está inflando el
        efecto combinado.
      </p>

      <FunnelPlot />

      {/* ════ DISTRIBUCIONES ════ */}
      <h2>Distribuciones: la forma de los datos lo dice todo</h2>
      <p>
        Antes de elegir cualquier prueba estadística, necesitas saber cómo se distribuyen tus datos.
        La forma de la distribución determina si puedes usar métodos paramétricos (que asumen
        normalidad) o no paramétricos, y también te dice si hay subgrupos mezclados o valores
        extremos que distorsionan el análisis.
      </p>

      <DistributionDemo />

      <Callout type="tip" title="Del histograma al QQ-Plot: dos herramientas complementarias">
        <p>
          El <strong>histograma</strong> muestra la forma visual de la distribución pero depende
          del ancho de intervalo (bin width) elegido — el mismo conjunto de datos puede parecer
          normal o sesgado con distintas configuraciones. El <strong>QQ-Plot</strong> (quantile-quantile
          plot) es más fiable para evaluar normalidad: si los puntos se alinean sobre la diagonal,
          la distribución es normal; si se curvan hacia arriba en los extremos, tiene colas pesadas
          (más valores extremos de lo esperado); si forman una S, la distribución es más apuntada
          o más plana que la normal.
        </p>
      </Callout>

      {/* ════ BOXPLOT ════ */}
      <h2>Boxplot: cinco números que resumen toda la distribución</h2>
      <p>
        El boxplot (o diagrama de caja y bigotes) comprime toda la distribución en cinco valores:
        mínimo, primer cuartil (Q1 = percentil 25), mediana (Q2 = percentil 50), tercer cuartil
        (Q3 = percentil 75) y máximo. Los bigotes se extienden hasta 1.5 veces el rango intercuartílico
        (IQR = Q3 − Q1); los puntos más allá son valores atípicos.
      </p>
      <p>
        El gráfico siguiente muestra la HbA1c en cuatro grupos de intervención para diabetes tipo 2.
        Activa y desactiva los valores atípicos para ver qué información aportan.
      </p>

      <BoxplotDemo />

      <DataTable
        headers={["Lo que ves en el boxplot", "Lo que significa clínicamente"]}
        rows={[
          ["Caja muy alargada (IQR grande)", "Alta variabilidad en la respuesta — no todos los pacientes responden igual"],
          ["Mediana desplazada hacia Q1 (parte baja de la caja)", "Distribución sesgada negativamente: mayoría de valores altos, pocos muy bajos"],
          ["Bigote derecho mucho más largo que el izquierdo", "Cola derecha: hay pacientes con valores muy por encima del grupo principal"],
          ["Muchos puntos fuera de los bigotes", "Valores atípicos frecuentes — revisa si son errores de medición o pacientes genuinamente atípicos"],
          ["Cajas de dos grupos que no se solapan", "Diferencia entre grupos probablemente significativa (pero confirma con prueba estadística)"],
          ["Mediana de un grupo dentro de la caja del otro", "Diferencia pequeña — evalúa si es clínicamente relevante además de estadísticamente significativa"],
        ]}
      />

      {/* ════ VIOLIN PLOT (NUEVO) ════ */}
      <h2>Violin Plot: el boxplot que te muestra la forma real</h2>
      <p>
        El violin plot es la evolución del boxplot. Muestra la densidad completa de los datos,
        revelando información que la caja oculta: bimodalidad, colas largas, concentraciones
        inesperadas. Activa el checkbox para ver la diferencia con el mismo conjunto de datos.
      </p>

      <ViolinBoxTransition />

      {/* ════ SCATTER PLOT ════ */}
      <h2>Scatter Plot: visualiza antes de correlacionar</h2>
      <p>
        El scatter plot (nube de puntos) muestra la relación entre dos variables continuas. Es el
        único gráfico que te permite ver si la relación es lineal, no lineal, o inexistente —
        información que ningún coeficiente de correlación puede darte sin haberlo visto primero.
        La regla de oro: nunca calcules una correlación de Pearson sin visualizar primero el scatter.
      </p>

      <ScatterPlot />

      <Callout type="warning" title="La paradoja de Anscombe: misma correlación, gráficos completamente distintos">
        <p>
          En 1973, el estadístico Francis Anscombe demostró que cuatro conjuntos de datos con
          propiedades estadísticas casi idénticas (misma media, misma varianza, mismo coeficiente
          de correlación r = 0.816) producen scatter plots radicalmente diferentes: uno lineal,
          uno cuadrático, uno lineal con un único outlier influyente, y uno completamente vertical
          excepto por un punto. Solo el scatter plot revela estas diferencias. Es el argumento
          definitivo para siempre visualizar antes de calcular.
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Anscombe, F. J. (1973). "Graphs in statistical analysis."{" "}
          <em>The American Statistician</em>, 27(1), 17–21.{" "}
          <a href="https://doi.org/10.2307/2682899" target="_blank" rel="noopener noreferrer">
            doi:10.2307/2682899
          </a>
        </p>
      </Callout>

      {/* ════ INTERACTION PLOT (NUEVO) ════ */}
      <h2>Gráfico de Interacción: cuando el efecto depende del subgrupo</h2>
      <p>
        El gráfico de interacción muestra si el efecto de una intervención es diferente en distintos
        subgrupos. Líneas paralelas indican que el efecto es constante; líneas que se cruzan indican
        una interacción cualitativa — el tratamiento beneficia a unos y perjudica a otros.
      </p>

      <InteractionPlot />

      {/* ════ BLAND-ALTMAN ════ */}
      <h2>Bland-Altman: ¿pueden usarse dos métodos indistintamente?</h2>
      <p>
        Cuando necesitas saber si un nuevo método de medición (más barato, más rápido, menos invasivo)
        puede reemplazar al de referencia, el gráfico Bland-Altman es la herramienta correcta.
        Muestra en el eje Y la diferencia entre los dos métodos y en el eje X su media. Si los puntos
        se distribuyen aleatoriamente alrededor de cero dentro de los límites de acuerdo (±1.96 DE),
        los métodos son intercambiables.
      </p>

      <BlandAltman />

      <Callout type="tip" title="Los tres patrones que invalidan la intercambiabilidad">
        <p>
          <strong>Efecto abanico:</strong> la diferencia aumenta con la magnitud. Los métodos
          son intercambiables para valores bajos pero no para altos — crítico si tus pacientes
          tienen valores elevados.<br /><br />
          <strong>Desplazamiento sistemático:</strong> la media de las diferencias está lejos de
          cero. Un método sobreestima o subestima sistemáticamente respecto al otro.<br /><br />
          <strong>Más del 5% fuera de los límites:</strong> por definición estadística, en datos
          normales el 5% de los puntos debería estar fuera de los límites de acuerdo. Si hay
          más, los métodos no son clínicamente intercambiables.
          <br /><br />
          <strong>📖 Referencia:</strong>{" "}
          Bland, J. M. & Altman, D. G. (1986). "Statistical methods for assessing agreement
          between two methods of clinical measurement."{" "}
          <em>The Lancet</em>, 327(8476), 307–310.{" "}
          <a href="https://doi.org/10.1016/S0140-6736(86)90837-8" target="_blank" rel="noopener noreferrer">
            doi:10.1016/S0140-6736(86)90837-8
          </a>{" "}
          — El artículo más citado de la historia de <em>The Lancet</em>.
        </p>
      </Callout>

      {/* ════ QQ-PLOT INTERACTIVO (NUEVO) ════ */}
      <h2>QQ-Plot: ¿son normales mis datos?</h2>
      <p>
        El QQ-Plot (gráfico cuantil-cuantil) compara los cuantiles de tus datos con los de una
        distribución normal teórica. Si los puntos se alinean sobre la diagonal, la normalidad
        es una suposición razonable. Si se curvan, tienes evidencia de desviación.
      </p>

      <QQPlotInteractivo />

      {/* ════ CHULETA VISUAL (expandida) ════ */}
      <h2>La chuleta visual definitiva: señales de alerta por gráfico</h2>

      <DataTable
        headers={["Gráfico", "Primera mirada", "Señal de alerta", "Qué hacer ante la señal"]}
        rows={[
          ["Forest Plot ◆", "¿El diamante toca la línea del no-efecto?", "I² > 75%: heterogeneidad alta", "Explorar subgrupos; no extrapolar el efecto a todos los pacientes"],
          ["Funnel Plot", "¿El embudo es simétrico?", "Asimetría en la base (faltan estudios pequeños)", "Sospechar sesgo de publicación; buscar estudios no publicados"],
          ["Curva ROC", "¿El AUC > 0.80?", "AUC < 0.70: baja capacidad discriminativa", "Buscar otros biomarcadores o combinar predictores"],
          ["Kaplan-Meier", "¿Las curvas se separan? ¿Cuándo?", "Curvas que se cruzan; pocos pacientes en riesgo al final", "Análisis por períodos; verificar tabla de número en riesgo"],
          ["Histograma/Densidad", "¿La campana es simétrica?", "Bimodal (dos picos) o cola muy larga", "Separar subgrupos; considerar transformación o métodos no paramétricos"],
          ["Boxplot", "¿Dónde están las medianas?", "Muchos outliers; bigotes muy asimétricos", "Investigar outliers: ¿error o subgrupo diferente?"],
          ["Violin Plot", "¿La forma es simétrica?", "Estrechamiento central (bimodalidad oculta)", "Separar poblaciones antes de analizar"],
          ["Scatter Plot", "¿Qué forma tiene la nube?", "Forma en U, J o S (no lineal)", "No usar Pearson; considerar Spearman o modelos no lineales"],
          ["Gráfico de Interacción", "¿Las líneas son paralelas?", "Líneas que se cruzan (interacción cualitativa)", "No promediar; estratificar recomendaciones por subgrupo"],
          ["Bland-Altman", "¿Los puntos rodean el 0?", "Forma de abanico; >5% fuera de los límites", "Métodos no intercambiables; reportar límites de acuerdo"],
          ["QQ-Plot", "¿Los puntos siguen la diagonal?", "Curvatura en los extremos; forma de S", "Evaluar normalidad; T-Test robusto con n>50"],
          ["Spaghetti Plot", "¿Las líneas son paralelas?", "Líneas que se cruzan y divergen", "La media no representa a nadie; buscar predictores de respuesta"],
          ["Barras de Error", "¿Los IC se solapan mucho?", "Barras con IC que se solapan completamente", "Diferencia probablemente no significativa; verificar con prueba"],
        ]}
      />

      {/* ════ ÁRBOL DE DECISIÓN (NUEVO) ════ */}
      <h2>¿Qué gráfico usar? Un árbol de decisión rápido</h2>
      <p>Cuando estés frente a tus propios datos y no sepas qué gráfico elegir, sigue este flujo:</p>

      <DataTable
        headers={["Tu objetivo", "Tipo de variable(s)", "Gráfico recomendado", "Ejemplo clínico"]}
        rows={[
          ["Comparar grupos en una variable continua", "1 categórica + 1 continua", "Boxplot o Violin Plot", "HbA1c por grupo de tratamiento"],
          ["Mostrar relación entre 2 continuas", "2 continuas", "Scatter Plot", "IMC vs. Colesterol LDL"],
          ["Mostrar evolución temporal de un grupo", "Tiempo + continua", "Serie de Tiempo / Kaplan-Meier", "Supervivencia post-trasplante"],
          ["Mostrar evolución temporal individual", "Tiempo + continua (medidas repetidas)", "Spaghetti Plot", "Evolución de peso en cada paciente"],
          ["Evaluar una prueba diagnóstica", "Binaria (enfermo/sano) + continua (score)", "Curva ROC", "Troponina para infarto"],
          ["Evaluar concordancia entre 2 métodos", "2 mediciones continuas del mismo sujeto", "Bland-Altman", "Tensiómetro muñeca vs. brazo"],
          ["Visualizar distribución de una variable", "1 continua", "Histograma o Densidad", "Distribución de presión arterial"],
          ["Evaluar normalidad", "1 continua", "QQ-Plot", "Verificar supuestos de T-Test"],
          ["Sintetizar múltiples estudios", "Tamaño del efecto + IC", "Forest Plot (Metaanálisis)", "Efecto de estatinas en mortalidad"],
          ["Detectar sesgo de publicación", "Tamaño del efecto + precisión", "Funnel Plot", "Asimetría en metaanálisis de antidepresivos"],
          ["Comparar 3+ grupos en múltiples variables", "1 categórica + 3+ continuas", "Radar / Spider Plot", "Perfil de calidad de vida por grupo etario"],
          ["Evaluar si el efecto varía por subgrupo", "1 categórica + 1 continua + tiempo", "Gráfico de Interacción", "Efecto del tratamiento según sexo"],
        ]}
      />

      {/* ════ EJERCICIO FINAL (NUEVO) ════ */}
      <h2>Ejercicio de inspección: encuentra los errores</h2>
      <p>
        A continuación se muestra un gráfico de barras deliberadamente problemático.
        Identifica al menos 3 problemas de visualización o interpretación:
      </p>

      <div style={{ margin: "1rem 0", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: 10 }}>
        <svg viewBox="0 0 400 200" style={{ width: "100%", height: "auto" }} xmlns="http://www.w3.org/2000/svg">
          <text x="30" y="20" fontSize="11" fill="#888780">100%</text>
          <text x="30" y="70" fontSize="11" fill="#888780">85%</text>
          <text x="30" y="120" fontSize="11" fill="#888780">70%</text>
          <line x1="50" y1="10" x2="50" y2="140" stroke="#888780" strokeWidth="0.8"/>
          <line x1="50" y1="140" x2="380" y2="140" stroke="#888780" strokeWidth="0.8"/>
          <rect x="80" y="60" width="80" height="80" fill="#534AB7" opacity="0.8" rx="3"/>
          <rect x="240" y="50" width="80" height="90" fill="#1D9E75" opacity="0.8" rx="3"/>
          <text x="120" y="170" textAnchor="middle" fontSize="12" fill="#2C2C2A">Tratamiento A</text>
          <text x="280" y="170" textAnchor="middle" fontSize="12" fill="#2C2C2A">Tratamiento B</text>
          <text x="120" y="52" textAnchor="middle" fontSize="11" fill="#2C2C2A">86%</text>
          <text x="280" y="42" textAnchor="middle" fontSize="11" fill="#2C2C2A">94%</text>
        </svg>
        <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, background: "#FAEEDA", color: "#633806", fontSize: 12, lineHeight: 1.5 }}>
          <strong>Pistas:</strong> ¿Dónde empieza el eje Y? ¿Hay intervalos de confianza? ¿Sabes cuál es el tamaño muestral? ¿Las barras son proporcionales a la diferencia real?
        </div>
      </div>

      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: "pointer", fontSize: 13, color: "#0C447C" }}>Ver respuesta (haz clic para desplegar)</summary>
        <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.7 }}>
          <strong>Problemas identificables:</strong><br />
          1. <strong>Eje Y no empieza en cero</strong> (empieza en ~70%): la diferencia visual entre 86% y 94% parece enorme cuando en realidad es solo 8 puntos porcentuales.<br />
          2. <strong>Ausencia de intervalos de confianza:</strong> sin IC no sabemos si la diferencia es estadísticamente significativa o solo ruido muestral.<br />
          3. <strong>Sin tamaño muestral (n):</strong> no sabemos si esto es n=10 o n=1000. Con n pequeño, 8 puntos de diferencia pueden ser completamente atribuibles al azar.<br />
          4. <strong>Efecto 3D innecesario (chartjunk):</strong> las sombras y el degradado no añaden información y dificultan la lectura precisa de los valores.<br />
          5. <strong>Sin nota al pie ni fuente:</strong> ¿de dónde salieron estos datos? ¿Quién los recolectó? ¿En qué población?
        </div>
      </details>

      {/* ════ FLASHCARDS ════ */}
      <h2>Conceptos para consolidar</h2>

      <Flashcard
        question="En un Spaghetti Plot la mayoría de líneas suben (mejoran), pero unas pocas bajan drásticamente. ¿Qué significa esto para la práctica clínica?"
        answer={
          <p>
            Hay <strong>alta variabilidad en la respuesta individual</strong>. La media del grupo
            puede mostrar una mejora global, pero existe un subgrupo de pacientes que empeora con
            el tratamiento. Esto es clínicamente crítico: la media "oculta" a quienes se dañan.
            Conviene investigar las características de ese subgrupo (edad, comorbilidades, dosis,
            adherencia) para identificar a quiénes podría perjudicar la intervención y adaptar
            el tratamiento.
          </p>
        }
      />

      <Flashcard
        question="¿Por qué un Forest Plot con I²=80% y diamante significativo no debe usarse para cambiar la práctica clínica directamente?"
        answer={
          <p>
            Un I²=80% indica que el 80% de la variabilidad en los resultados entre estudios se
            debe a diferencias reales entre ellos — no al azar. El diamante es un promedio de
            efectos muy distintos: algunos estudios muestran gran beneficio, otros no, o incluso
            muestran daño. Aplicar ese promedio a tus pacientes equivale a usar el promedio de
            temperaturas de Islandia y Canarias para decidir qué ropa usar. Primero hay que
            explorar las fuentes de heterogeneidad (tipo de paciente, dosis, tiempo de seguimiento)
            y determinar a qué subgrupo corresponden los estudios más similares a tu contexto.
          </p>
        }
      />

      <Flashcard
        question="Un eje Y de barras que no empieza en cero: ¿por qué es problemático?"
        answer={
          <p>
            Cuando el eje Y comienza en un valor diferente de cero, diferencias pequeñas parecen
            dramáticamente grandes. Por ejemplo, si las tasas de éxito son 81% vs. 84% pero el
            eje empieza en 80%, la segunda barra parece cuatro veces más alta que la primera.
            Esta es una de las distorsiones visuales más frecuentes en presentaciones de resultados
            de ensayos y en publicidad farmacéutica. La corrección: siempre verifica los valores
            reales en la escala, no solo la altura visual de las barras.
          </p>
        }
      />

      {/* ════ QUIZZES ════ */}
      <Quiz
        question="Observas un Forest Plot donde el diamante está completamente a la izquierda de OR=1 sin tocarlo, pero el I² = 78%. ¿Cuál es la interpretación más completa y correcta?"
        options={[
          { text: "El resultado es significativo y confiable porque el diamante no toca la línea de no-efecto", correct: false },
          { text: "El resultado es estadísticamente significativo, pero la alta heterogeneidad (I²=78%) obliga a interpretar el efecto combinado con cautela y explorar las fuentes de variabilidad antes de aplicar el resultado a la práctica", correct: true },
          { text: "El resultado no es válido porque I²>50% invalida automáticamente el metaanálisis", correct: false },
          { text: "El I² no afecta a la interpretación del diamante", correct: false },
        ]}
        explanation="El diamante a la izquierda de OR=1 sin tocarlo indica significancia estadística. Sin embargo, un I²=78% señala heterogeneidad considerable: los estudios incluidos son muy diferentes entre sí en población, intervención, dosis o seguimiento. El efecto combinado es un 'promedio ponderado' de efectos distintos, y puede no aplicar bien a ningún paciente concreto. La respuesta correcta integra ambas piezas de información y exige investigar las fuentes de heterogeneidad."
      />

      <Quiz
        question="En una curva Kaplan-Meier para un ensayo de inmunoterapia en melanoma, las dos curvas son casi idénticas durante los primeros 6 meses y luego se separan progresivamente hasta el mes 24. ¿Cuál es la señal clínica más importante?"
        options={[
          { text: "No hay diferencia entre los tratamientos porque las curvas son idénticas los primeros 6 meses", correct: false },
          { text: "El HR global subestima el beneficio real porque el efecto es tardío — el análisis correcto debería estratificar por período temporal", correct: true },
          { text: "El tratamiento es ineficaz porque no muestra beneficio inmediato", correct: false },
          { text: "La separación tardía se debe probablemente a sesgo de seguimiento", correct: false },
        ]}
        explanation="Este patrón de efecto tardío es característico de la inmunoterapia en oncología: el sistema inmune necesita tiempo para activarse. El HR global calculado sobre toda la curva diluye el beneficio tardío y puede llevar a subestimar la eficacia del tratamiento. La interpretación correcta exige análisis estratificado por período temporal o modelos de riesgos no proporcionales. Ignorar esta señal puede llevar a abandonar tratamientos que funcionan bien en el subgrupo que sobrevive el período inicial."
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
                Tufte, E. R. (1983). <em>The Visual Display of Quantitative Information.</em> Graphics Press.
                <span className="block text-xs text-gray-500">La obra fundacional sobre integridad visual y diseño de gráficos estadísticos.</span>
              </li>
              <li>
                Spiegelhalter, D. (2019). <em>The Art of Statistics: Learning from Data.</em> Pelican Books.
                <span className="block text-xs text-gray-500">Lectura accesible y rigurosa sobre cómo razonar e interpretar datos visualmente.</span>
              </li>
              <li>
                Cairo, A. (2019). <em>How Charts Lie: Getting Smarter about Visual Information.</em> W. W. Norton & Company.
                <span className="block text-xs text-gray-500">Guía práctica para detectar gráficos engañosos, ejes manipulados y distorsiones visuales.</span>
              </li>
              <li>
                Wilke, C. O. (2019). <em>Fundamentals of Data Visualization.</em> O&apos;Reilly Media.
                <span className="block text-xs text-gray-500">Acceso libre en clauswilke.com/dataviz — Referencia técnica completa sobre tipos de gráficos y buenas prácticas.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                StatQuest with Josh Starmer:{" "}
                <a href="https://www.youtube.com/@statquest" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  youtube.com/@statquest
                </a>
                <span className="block text-xs text-gray-500">Canal de YouTube con tutoriales visuales excepcionales sobre estadística y gráficos.</span>
              </li>
              <li>
                Cochrane Handbook — Visualización de metaanálisis:{" "}
                <a href="https://training.cochrane.org/handbook" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  training.cochrane.org/handbook
                </a>
                <span className="block text-xs text-gray-500">Guía oficial para construir e interpretar forest plots y funnel plots.</span>
              </li>
              <li>
                From Data to Viz:{" "}
                <a href="https://www.data-to-viz.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  data-to-viz.com
                </a>
                <span className="block text-xs text-gray-500">Árbol de decisión interactivo para elegir el gráfico correcto según el tipo de datos.</span>
              </li>
              <li>
                The R Graph Gallery:{" "}
                <a href="https://r-graph-gallery.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  r-graph-gallery.com
                </a>
                <span className="block text-xs text-gray-500">Catálogo extenso de gráficos estadísticos con código reproducible.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Dettori, J. R., Norvell, D. C. & Chapman, J. R. (2021). Seeing the forest by looking at the trees: how to interpret a meta-analysis forest plot. <em>Global Spine Journal</em>, <em>11</em>(4), 614–616.</li>
            <li>Li, J., Zhang, Q. & Xu, Y. (2021). The 5 min meta-analysis: understanding how to read and interpret a forest plot. <em>Eye</em>, <em>35</em>, 1450–1452.</li>
            <li>Hanley, J. A. & McNeil, B. J. (1982). The meaning and use of the area under a receiver operating characteristic (ROC) curve. <em>Radiology</em>, <em>143</em>(1), 29–36.</li>
            <li>Egger, M., Smith, G. D., Schneider, M. & Minder, C. (1997). Bias in meta-analysis detected by a simple, graphical test. <em>BMJ</em>, <em>315</em>(7109), 629–634.</li>
            <li>Sterne, J. A. C., Sutton, A. J., Ioannidis, J. P. A. et al. (2011). Recommendations for examining and interpreting funnel plot asymmetry in meta-analyses of randomised controlled trials. <em>BMJ</em>, <em>343</em>, d4002.</li>
            <li>Rich, J. T., Neely, J. G., Paniello, R. C. et al. (2010). A practical guide to understanding Kaplan-Meier curves. <em>Otolaryngology–Head and Neck Surgery</em>, <em>143</em>(3), 331–336.</li>
            <li>Andrade, C. (2023). Survival analysis, Kaplan-Meier curves, and Cox regression. <em>Indian Journal of Psychological Medicine</em>, <em>45</em>(4), 434–435.</li>
            <li>Bland, J. M. & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. <em>The Lancet</em>, <em>327</em>(8476), 307–310.</li>
            <li>VanderWeele, T. J. & Knol, M. J. (2014). A tutorial on interaction. <em>Epidemiologic Methods</em>, <em>3</em>(1), 33–72.</li>
            <li>Anscombe, F. J. (1973). Graphs in statistical analysis. <em>The American Statistician</em>, <em>27</em>(1), 17–21.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            Un gráfico es una afirmación visual: léelo con el mismo rigor crítico con el que evaluarías
            un argumento escrito. Antes de aceptar lo que una figura parece mostrar, revisa los ejes,
            las escalas, los intervalos y lo que queda fuera del marco — ahí suele esconderse la historia completa.
          </p>
        </div>
      </div>
    </div>
  );
}