"use client";
import { useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const C = {
  teal:     "#0F6E56",
  tealLt:   "#E6F4F1",
  tealMd:   "#1A8A6C",
  amber:    "#B45309",
  amberLt:  "#FEF3C7",
  blue:     "#1D4ED8",
  blueLt:   "#DBEAFE",
  rose:     "#9F1239",
  roseLt:   "#FFE4E6",
  violet:   "#5B21B6",
  violetLt: "#EDE9FE",
  slate:    "#1E293B",
  slateMd:  "#475569",
  slateXl:  "#94A3B8",
  bg:       "#F8FAFC",
  bgCard:   "#FFFFFF",
  border:   "#E2E8F0",
};

export const meta = {
  title: "Regresión Lineal: Modelando Relaciones en Salud",
  subtitle: "De la correlación al modelo predictivo, con ejemplos de síndrome metabólico",
  objective:
    "Distinguir correlación de causalidad, construir e interpretar un modelo de regresión lineal simple y múltiple, comprender el significado de los coeficientes, evaluar la bondad del ajuste con R², verificar los supuestos del modelo y aplicar todo esto a variables clínicas reales.",
};

// ─────────────────────────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────────────────────────

function LearningGoals({ goals }: { goals: string[] }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealMd} 100%)`,
      borderRadius: 16, padding: "28px 32px", marginBottom: 40, color: "#fff",
    }}>
      <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.12em",
        textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>
        Objetivos de aprendizaje
      </div>
      {goals.map((g, i) => (
        <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < goals.length - 1 ? 10 : 0 }}>
          <span style={{ marginTop: 1, flexShrink: 0, opacity: 0.85 }}>◆</span>
          <span style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.95 }}>{g}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ type = "info", title, children }: { type?: string; title?: string; children: React.ReactNode }) {
  const map: Record<string, { bg: string; border: string; icon: string }> = {
    info:    { bg: C.blueLt,   border: C.blue,   icon: "💡" },
    warning: { bg: C.amberLt,  border: C.amber,  icon: "⚠️" },
    danger:  { bg: C.roseLt,   border: C.rose,   icon: "🚨" },
    success: { bg: C.tealLt,   border: C.teal,   icon: "✅" },
    memory:  { bg: C.violetLt, border: C.violet, icon: "🧠" },
  };
  const t = map[type] || map.info;
  return (
    <div style={{
      background: t.bg, borderLeft: `4px solid ${t.border}`,
      borderRadius: "0 12px 12px 0", padding: "18px 22px", margin: "28px 0",
    }}>
      {title && (
        <div style={{ fontWeight: 700, fontSize: 14, color: t.border,
          marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span>{t.icon}</span>{title}
        </div>
      )}
      <div style={{ fontSize: 15, lineHeight: 1.7, color: C.slate }}>{children}</div>
    </div>
  );
}

function SectionHeader({ number, title, subtitle }: { number: string | number; title: string; subtitle?: string }) {
  return (
    <div style={{ borderTop: `3px solid ${C.teal}`, paddingTop: 32, marginTop: 56, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{
          background: C.teal, color: "#fff", width: 44, height: 44,
          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 17, flexShrink: 0, marginTop: 2,
        }}>{number}</div>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.slate, lineHeight: 1.2 }}>{title}</h2>
          {subtitle && <p style={{ margin: "6px 0 0", fontSize: 14, color: C.slateMd }}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function FormulaBox({ label, formula, explanation }: { label?: string; formula: string; explanation?: string }) {
  return (
    <div style={{ background: C.slate, borderRadius: 12, padding: "22px 28px", margin: "24px 0" }}>
      {label && (
        <div style={{ color: C.slateXl, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
          {label}
        </div>
      )}
      <div style={{
        fontFamily: "'Georgia', serif", fontSize: 19, color: "#FCD34D",
        letterSpacing: "0.02em", lineHeight: 1.5, fontWeight: 600,
      }}>{formula}</div>
      {explanation && (
        <div style={{ marginTop: 12, fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>
          {explanation}
        </div>
      )}
    </div>
  );
}

function Quiz({ question, options, explanation }: {
  question: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: "24px 28px", margin: "32px 0" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.teal,
        letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
        Verifica tu comprensión
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.slate, marginBottom: 20, lineHeight: 1.5 }}>
        {question}
      </div>
      {options.map((opt, i) => {
        const isSelected = selected === i;
        let bg = C.bg, border = C.border, textColor = C.slate;
        if (answered) {
          if (opt.correct) { bg = C.tealLt; border = C.teal; textColor = C.teal; }
          else if (isSelected && !opt.correct) { bg = C.roseLt; border = C.rose; textColor = C.rose; }
        } else if (isSelected) { bg = C.blueLt; border = C.blue; }
        return (
          <button key={i} onClick={() => !answered && setSelected(i)} style={{
            display: "block", width: "100%", textAlign: "left",
            background: bg, border: `1.5px solid ${border}`,
            borderRadius: 10, padding: "13px 18px", marginBottom: 10,
            cursor: answered ? "default" : "pointer",
            fontSize: 14, color: textColor,
            fontWeight: isSelected || (answered && opt.correct) ? 600 : 400,
          }}>
            {opt.correct && answered ? "✓ " : isSelected && answered ? "✗ " : ""}{opt.text}
          </button>
        );
      })}
      {answered && (
        <div style={{
          background: C.tealLt, border: `1px solid ${C.teal}`,
          borderRadius: 10, padding: "14px 18px", marginTop: 12,
          fontSize: 14, color: C.teal, lineHeight: 1.6,
        }}>
          <strong>Explicación:</strong> {explanation}
        </div>
      )}
    </div>
  );
}

function Flashcard({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `2px solid ${C.border}`, borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: open ? C.tealLt : C.bgCard,
        border: "none", padding: "16px 20px", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        textAlign: "left",
      }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.slate }}>{question}</div>
        <span style={{ fontSize: 20, color: C.teal, transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "18px 22px", borderTop: `1px solid ${C.border}`,
          background: C.bgCard, fontSize: 15, color: C.slateMd, lineHeight: 1.7 }}>
          {answer}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SVG DIAGRAMS
// ─────────────────────────────────────────────────────────────

function DiagramaCorrelaciones() {
  return (
    <svg viewBox="0 0 700 200" role="img"
      aria-label="Tipos de correlación: positiva fuerte, negativa moderada y sin correlación"
      overflow="visible"
      style={{ display: "block", margin: "1.5rem 0", width: "100%", height: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Diagramas de dispersión ilustrando correlación positiva, negativa y nula</title>

      {/* ── Correlación positiva fuerte ── */}
      <rect x="10" y="10" width="210" height="170" rx="10" fill="#E6F4F1" stroke="#0F6E56" strokeWidth="1.2" />
      <text x="115" y="32" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#0F6E56">Correlación Positiva</text>
      <text x="115" y="46" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0F6E56">r ≈ +0.90</text>
      {[
        [30,155],[45,143],[60,135],[75,122],[90,113],[105,102],[120,94],[135,82],[145,73],[160,64],[175,55],[190,47],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#0F6E56" opacity="0.8" />
      ))}
      <line x1="25" y1="162" x2="205" y2="40" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="115" y="185" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#475569">A más TAG/HDL, más HOMA-2</text>

      {/* ── Correlación negativa ── */}
      <rect x="245" y="10" width="210" height="170" rx="10" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.2" />
      <text x="350" y="32" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#B45309">Correlación Negativa</text>
      <text x="350" y="46" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#B45309">r ≈ −0.75</text>
      {[
        [265,55],[278,65],[292,70],[305,82],[320,90],[333,98],[348,108],[362,118],[375,125],[390,135],[403,143],[415,150],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#B45309" opacity="0.8" />
      ))}
      <line x1="258" y1="48" x2="425" y2="160" stroke="#B45309" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="350" y="185" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#475569">A más HDL, menos triglicéridos</text>

      {/* ── Sin correlación ── */}
      <rect x="480" y="10" width="210" height="170" rx="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.2" />
      <text x="585" y="32" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#475569">Sin Correlación</text>
      <text x="585" y="46" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#94A3B8">r ≈ 0.0</text>
      {[
        [500,90],[515,60],[530,130],[545,75],[560,110],[575,50],[590,145],[605,80],[620,120],[635,65],[650,100],[665,140],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#94A3B8" opacity="0.8" />
      ))}
      <line x1="493" y1="97" x2="675" y2="97" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="585" y="185" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#475569">Grupo sanguíneo vs. IMC</text>
    </svg>
  );
}

function DiagramaRegresionSimple() {
  return (
    <svg viewBox="0 0 620 260" role="img"
      aria-label="Diagrama de regresión lineal simple con residuos anotados"
      overflow="visible"
      style={{ display: "block", margin: "1.5rem 0", width: "100%", height: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Regresión lineal simple: línea de mejor ajuste, puntos de datos y residuos</title>
      <defs>
        <marker id="arrAxes" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>

      {/* Ejes */}
      <line x1="60" y1="220" x2="580" y2="220" stroke="#CBD5E1" strokeWidth="1.5" markerEnd="url(#arrAxes)" />
      <line x1="60" y1="220" x2="60" y2="20" stroke="#CBD5E1" strokeWidth="1.5" markerEnd="url(#arrAxes)" />
      <text x="585" y="224" fontFamily="Inter,sans-serif" fontSize="11" fill="#94A3B8">X (TAG/HDL)</text>
      <text x="10" y="16" fontFamily="Inter,sans-serif" fontSize="11" fill="#94A3B8" transform="rotate(-90, 10, 100)">Y (HOMA-2)</text>

      {/* Línea de regresión */}
      <line x1="75" y1="198" x2="565" y2="42" stroke="#0F6E56" strokeWidth="2.5" />

      {/* Puntos de datos con residuos */}
      {[
        { x: 100, y: 188, yi: 177 }, { x: 140, y: 165, yi: 164 },
        { x: 180, y: 158, yi: 151 }, { x: 220, y: 140, yi: 138 },
        { x: 270, y: 122, yi: 121 }, { x: 310, y: 116, yi: 108 },
        { x: 360, y:  98, yi:  92 }, { x: 400, y:  80, yi:  79 },
        { x: 440, y:  65, yi:  66 }, { x: 490, y:  58, yi:  50 },
        { x: 530, y:  38, yi:  37 },
      ].map((d, i) => (
        <g key={i}>
          {/* Residuo */}
          <line x1={d.x} y1={d.y} x2={d.x} y2={d.yi}
            stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7" />
          {/* Punto */}
          <circle cx={d.x} cy={d.y} r="5" fill="#1D4ED8" opacity="0.85" />
        </g>
      ))}

      {/* Anotaciones */}
      <text x="350" y="75" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#0F6E56">ŷ = β₀ + β₁x</text>
      <text x="350" y="90" fontFamily="Inter,sans-serif" fontSize="10" fill="#0F6E56">Línea de mejor ajuste (MCO)</text>

      {/* Residuo anotado */}
      <text x="285" y="112" fontFamily="Inter,sans-serif" fontSize="10" fill="#B45309">residuo = y − ŷ</text>
      <path d="M280 108 L270 110" fill="none" stroke="#B45309" strokeWidth="1" />

      {/* Leyenda */}
      <circle cx="75" cy="245" r="5" fill="#1D4ED8" />
      <text x="86" y="249" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Datos observados</text>
      <line x1="200" y1="245" x2="220" y2="245" stroke="#0F6E56" strokeWidth="2" />
      <text x="228" y="249" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Recta de regresión</text>
      <line x1="340" y1="241" x2="360" y2="249" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="368" y="249" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Residuo (error)</text>
    </svg>
  );
}

function DiagramaSupuestos() {
  return (
    <svg viewBox="0 0 700 180" role="img"
      aria-label="Los cuatro supuestos de la regresión lineal"
      overflow="visible"
      style={{ display: "block", margin: "1.5rem 0", width: "100%", height: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Supuestos del modelo de regresión lineal: LINE (Linealidad, Independencia, Normalidad de residuos, Equivarianza)</title>
      {[
        { x: 10,  color: C.teal,   bg: C.tealLt,   icon: "📈", code: "L", name: "Linealidad",
          desc: "Relación X↔Y es lineal", check: "Gráfico de dispersión" },
        { x: 182, color: C.blue,   bg: C.blueLt,   icon: "🔗", code: "I", name: "Independencia",
          desc: "Residuos no autocorrelados", check: "Test Durbin-Watson" },
        { x: 354, color: C.violet, bg: C.violetLt, icon: "🔔", code: "N", name: "Normalidad",
          desc: "Residuos siguen N(0,σ²)", check: "Q-Q plot, Shapiro-Wilk" },
        { x: 526, color: C.amber,  bg: C.amberLt,  icon: "⚖️", code: "E", name: "Equivarianza",
          desc: "Varianza residual constante", check: "Residuos vs. valores ajustados" },
      ].map((s) => (
        <g key={s.code}>
          <rect x={s.x} y={8} width={162} height={162} rx="12" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <text x={s.x + 81} y={38} textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="24">{s.icon}</text>
          <text x={s.x + 81} y={60} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="22" fontWeight="800" fill={s.color}>{s.code}</text>
          <text x={s.x + 81} y={80} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="13" fontWeight="700" fill="#1E293B">{s.name}</text>
          <text x={s.x + 81} y={100} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="10" fill="#475569">{s.desc}</text>
          <text x={s.x + 81} y={132} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="9" fill={s.color} fontWeight="600">Cómo verificar:</text>
          <text x={s.x + 81} y={148} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="9" fill={s.color}>{s.check}</text>
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE REGRESSION EXPLORER
// ─────────────────────────────────────────────────────────────

// Datos ilustrativos inspirados en Hernández-Lalinde et al. (2020). No corresponden a datos
// originales del estudio: son simulados con fines pedagógicos para reproducir el patrón de
// asociación reportado entre la razón TAG/HDL y el índice HOMA-2 (resistencia a la insulina).
const DATA_POINTS = [
  { x: 1.2, y: 0.9 }, { x: 1.8, y: 1.4 }, { x: 2.1, y: 1.6 }, { x: 2.4, y: 1.9 },
  { x: 2.7, y: 2.1 }, { x: 1.5, y: 1.2 }, { x: 3.1, y: 2.4 }, { x: 3.5, y: 2.8 },
  { x: 2.0, y: 1.7 }, { x: 4.0, y: 3.0 }, { x: 1.9, y: 1.5 }, { x: 3.3, y: 2.6 },
  { x: 2.8, y: 2.2 }, { x: 1.6, y: 1.3 }, { x: 4.2, y: 3.1 }, { x: 2.5, y: 2.0 },
  { x: 3.8, y: 2.9 }, { x: 1.3, y: 1.0 }, { x: 2.9, y: 2.3 }, { x: 1.7, y: 1.4 },
  { x: 3.6, y: 2.7 }, { x: 2.2, y: 1.8 }, { x: 4.5, y: 3.4 }, { x: 1.4, y: 1.1 },
  { x: 3.0, y: 2.4 }, { x: 2.3, y: 1.9 }, { x: 3.7, y: 2.8 }, { x: 1.1, y: 0.8 },
  { x: 4.1, y: 3.2 }, { x: 2.6, y: 2.1 },
];

function computeRegression(data: { x: number; y: number }[]) {
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d.x, 0);
  const sumY = data.reduce((s, d) => s + d.y, 0);
  const sumXY = data.reduce((s, d) => s + d.x * d.y, 0);
  const sumX2 = data.reduce((s, d) => s + d.x * d.x, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;
  const b1 = (sumXY - n * meanX * meanY) / (sumX2 - n * meanX * meanX);
  const b0 = meanY - b1 * meanX;
  const ssRes = data.reduce((s, d) => { const r = d.y - (b0 + b1 * d.x); return s + r * r; }, 0);
  const ssTot = data.reduce((s, d) => { const r = d.y - meanY; return s + r * r; }, 0);
  const r2 = 1 - ssRes / ssTot;
  const r = Math.sqrt(r2) * (b1 >= 0 ? 1 : -1);
  return { b0, b1, r2, r, meanX, meanY };
}

function RegresionExplorador() {
  const [showLine, setShowLine] = useState(true);
  const [showResiduals, setShowResiduals] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const { b0, b1, r2, r } = computeRegression(DATA_POINTS);

  // SVG viewport mapping
  const W = 560, H = 260;
  const PAD = { l: 50, r: 20, t: 20, b: 45 };
  const xMin = 0.8, xMax = 5.0, yMin = 0.5, yMax = 3.8;
  const toSvgX = (x: number) => PAD.l + ((x - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r);
  const toSvgY = (y: number) => PAD.t + ((yMax - y) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  // Regression line endpoints
  const rl_x1 = 1.0, rl_x2 = 4.8;
  const rl_y1 = b0 + b1 * rl_x1;
  const rl_y2 = b0 + b1 * rl_x2;

  const getRLabel = (r: number) => {
    const a = Math.abs(r);
    if (a >= 0.9) return { label: "Muy fuerte", color: C.teal };
    if (a >= 0.7) return { label: "Fuerte", color: C.teal };
    if (a >= 0.5) return { label: "Moderada", color: C.blue };
    if (a >= 0.3) return { label: "Débil", color: C.amber };
    return { label: "Muy débil / nula", color: C.rose };
  };

  const rLabel = getRLabel(r);

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 16, padding: "28px", margin: "32px 0",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.teal,
        letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
        Explorador de Regresión — Síndrome Metabólico
      </div>
      <div style={{ fontSize: 12, color: C.slateMd, marginBottom: 8, lineHeight: 1.5 }}>
        n = 30 casos simulados, inspirados en el patrón clínico descrito para Maracaibo, Venezuela.
        Variable X = Razón TAG/HDL · Variable Y = HOMA-2 (resistencia a insulina).
        <br />
        <em style={{ fontSize: 11 }}>Inspirado en: Hernández-Lalinde et al. (2020). AVFT, 38(5), 608–616.</em>
      </div>
      <div style={{
        fontSize: 11, color: C.slateXl, marginBottom: 20, fontStyle: "italic",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span aria-hidden="true">ℹ️</span>
        Los datos mostrados son simulados con fines educativos.
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <button onClick={() => setShowLine(v => !v)} style={{
          padding: "7px 16px", borderRadius: 8,
          background: showLine ? C.teal : C.bg,
          color: showLine ? "#fff" : C.slateMd,
          border: `1.5px solid ${showLine ? C.teal : C.border}`,
          fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {showLine ? "✓ " : ""}Línea de regresión
        </button>
        <button onClick={() => setShowResiduals(v => !v)} style={{
          padding: "7px 16px", borderRadius: 8,
          background: showResiduals ? C.amber : C.bg,
          color: showResiduals ? "#fff" : C.slateMd,
          border: `1.5px solid ${showResiduals ? C.amber : C.border}`,
          fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {showResiduals ? "✓ " : ""}Mostrar residuos
        </button>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} overflow="visible" style={{ display: "block", width: "100%", height: "auto" }}>
        {/* Ejes */}
        <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="#CBD5E1" strokeWidth="1" />
        <line x1={PAD.l} y1={H - PAD.b} x2={PAD.l} y2={PAD.t} stroke="#CBD5E1" strokeWidth="1" />

        {/* Ticks Y */}
        {[1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map(y => (
          <g key={y}>
            <line x1={PAD.l - 4} y1={toSvgY(y)} x2={PAD.l} y2={toSvgY(y)} stroke="#CBD5E1" strokeWidth="1" />
            <text x={PAD.l - 8} y={toSvgY(y) + 4} textAnchor="end" fontFamily="Inter,sans-serif"
              fontSize="9" fill="#94A3B8">{y}</text>
            <line x1={PAD.l} y1={toSvgY(y)} x2={W - PAD.r} y2={toSvgY(y)}
              stroke="#F1F5F9" strokeWidth="1" />
          </g>
        ))}

        {/* Ticks X */}
        {[1, 2, 3, 4, 5].map(x => (
          <g key={x}>
            <line x1={toSvgX(x)} y1={H - PAD.b} x2={toSvgX(x)} y2={H - PAD.b + 4} stroke="#CBD5E1" strokeWidth="1" />
            <text x={toSvgX(x)} y={H - PAD.b + 16} textAnchor="middle" fontFamily="Inter,sans-serif"
              fontSize="9" fill="#94A3B8">{x}</text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={(W + PAD.l) / 2} y={H - 4} textAnchor="middle" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#475569" fontWeight="600">Razón Triglicéridos / HDL-Colesterol</text>
        <text x="12" y={H / 2} textAnchor="middle" fontFamily="Inter,sans-serif"
          fontSize="10" fill="#475569" fontWeight="600"
          transform={`rotate(-90, 12, ${H / 2})`}>HOMA-2</text>

        {/* Regression line */}
        {showLine && (
          <line
            x1={toSvgX(rl_x1)} y1={toSvgY(rl_y1)}
            x2={toSvgX(rl_x2)} y2={toSvgY(rl_y2)}
            stroke={C.teal} strokeWidth="2.5" opacity="0.9"
          />
        )}

        {/* Residuals */}
        {showResiduals && DATA_POINTS.map((d, i) => {
          const yHat = b0 + b1 * d.x;
          return (
            <line key={i}
              x1={toSvgX(d.x)} y1={toSvgY(d.y)}
              x2={toSvgX(d.x)} y2={toSvgY(yHat)}
              stroke={C.amber} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7"
            />
          );
        })}

        {/* Data points */}
        {DATA_POINTS.map((d, i) => (
          <circle key={i}
            cx={toSvgX(d.x)} cy={toSvgY(d.y)} r={hoveredPoint === i ? 7 : 5}
            fill={hoveredPoint === i ? C.blue : "#1D4ED8"}
            opacity={0.85}
            style={{ cursor: "pointer", transition: "r 0.1s" }}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          />
        ))}

        {/* Tooltip */}
        {hoveredPoint !== null && (() => {
          const d = DATA_POINTS[hoveredPoint];
          const yhat = b0 + b1 * d.x;
          const res = d.y - yhat;
          const sx = toSvgX(d.x);
          const sy = toSvgY(d.y);
          const tx = sx > W - 150 ? sx - 140 : sx + 12;
          const ty = sy > H - 60 ? sy - 65 : sy - 10;
          return (
            <g>
              <rect x={tx} y={ty} width={130} height={58} rx="6" fill={C.slate} opacity="0.95" />
              <text x={tx + 8} y={ty + 16} fontFamily="Inter,sans-serif" fontSize="10" fill="#fff">
                TAG/HDL: {d.x.toFixed(1)}
              </text>
              <text x={tx + 8} y={ty + 30} fontFamily="Inter,sans-serif" fontSize="10" fill="#fff">
                HOMA-2: {d.y.toFixed(1)}
              </text>
              <text x={tx + 8} y={ty + 44} fontFamily="Inter,sans-serif" fontSize="10"
                fill={res >= 0 ? "#6EE7B7" : "#FCA5A5"}>
                Residuo: {res >= 0 ? "+" : ""}{res.toFixed(2)}
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Stats bar */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 12, marginTop: 20, padding: "16px 20px",
        background: C.slate, borderRadius: 12,
      }}>
        {[
          { label: "Intercepto (β₀)", value: b0.toFixed(3), unit: "", color: "#FCD34D" },
          { label: "Pendiente (β₁)", value: b1.toFixed(3), unit: "por unidad de X", color: "#6EE7B7" },
          { label: "Correlación (r)", value: r.toFixed(3), unit: rLabel.label, color: "#93C5FD" },
          { label: "R² (bondad ajuste)", value: (r2 * 100).toFixed(1) + "%", unit: "varianza explicada", color: "#A78BFA" },
        ].map((stat, i) => (
          <div key={i}>
            <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: 9, color: "#64748B", marginTop: 2 }}>{stat.unit}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, padding: "12px 16px", background: C.tealLt,
        borderRadius: 10, fontSize: 13, color: C.teal, lineHeight: 1.7 }}>
        <strong>Ecuación del modelo:</strong>{" "}
        HOMA-2 = {b0.toFixed(3)} + {b1.toFixed(3)} × (TAG/HDL)
        <br />
        <strong>Interpretación:</strong> por cada unidad que aumenta la razón TAG/HDL,
        la resistencia a la insulina (HOMA-2) aumenta en {b1.toFixed(3)} unidades.
        El modelo explica el {(r2 * 100).toFixed(1)}% de la variabilidad en HOMA-2.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function RegresionLineal() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif",
      color: C.slate, lineHeight: 1.75 }}>

      <LearningGoals goals={[
        "Distinguir correlación de causalidad y elegir entre Pearson y Spearman según el tipo de variable.",
        "Construir e interpretar un modelo de regresión lineal simple: intercepto, pendiente y R².",
        "Comprender el método de mínimos cuadrados ordinarios de forma intuitiva.",
        "Verificar los supuestos LINE del modelo de regresión y actuar cuando se violan.",
        "Extender la regresión simple al modelo múltiple e interpretar coeficientes parciales.",
        "Aplicar regresión lineal a un ejemplo real de síndrome metabólico en ciencias de la salud.",
      ]} />

      <p style={{ fontSize: 16, color: C.slateMd, lineHeight: 1.8, marginBottom: 32 }}>
        Dos variables que varían juntas, ¿se influyen entre sí? ¿Cuánto cambia una cuando la otra
        aumenta? ¿Puedo predecir la resistencia a la insulina de un paciente sabiendo su perfil
        lipídico? La regresión lineal responde estas preguntas con elegancia y parsimonia,
        y es sin duda la técnica estadística más usada en la investigación en ciencias de la salud.
      </p>

      {/* ══════════════════════════════════════════════
          SECCIÓN 1 — Correlación
      ══════════════════════════════════════════════ */}
      <SectionHeader number="1" title="Correlación: Medir la Fuerza de una Asociación"
        subtitle="Antes de modelar, hay que saber si hay algo que modelar" />

      <p>
        La <strong>correlación</strong> cuantifica la <em>fuerza y dirección</em> de la relación
        lineal entre dos variables cuantitativas, pero no establece causalidad ni permite
        predecir valores concretos. Es el primer paso antes de una regresión.
      </p>

      <DiagramaCorrelaciones />

      <FormulaBox
        label="Coeficiente de Pearson (r) — para variables cuantitativas con distribución normal"
        formula="r = Σ[(xᵢ − x̄)(yᵢ − ȳ)] / √[Σ(xᵢ − x̄)² · Σ(yᵢ − ȳ)²]"
        explanation="Varía entre −1 y +1. r = +1: correlación positiva perfecta. r = −1: negativa perfecta. r = 0: sin correlación lineal. Requiere: ambas variables cuantitativas, relación lineal, distribución aproximadamente normal, sin outliers influyentes."
      />

      <FormulaBox
        label="Correlación de Spearman (ρ) — para ordinales o distribución no normal"
        formula="ρ = 1 − 6Σdᵢ² / [n(n²−1)]    donde dᵢ = diferencia de rangos"
        explanation="Mide la correlación entre los rangos (posiciones ordenadas) en lugar de los valores. Robusta a outliers y válida para variables ordinales. Úsala cuando Pearson no está justificado."
      />

      <Callout type="warning" title="Correlación ≠ Causalidad: el error más frecuente en investigación">
        El consumo de helados correlaciona positivamente con el número de ahogamientos en playa.
        ¿Los helados causan ahogamientos? No: ambas aumentan en verano (factor confusor).
        <br /><br />
        En salud: el nivel de glucosa correlaciona con el número de medicamentos del paciente.
        No porque la glucosa «cause» la polifarmacia, sino porque ambas comparten el confusor
        «severidad de la enfermedad». Antes de interpretar una correlación, siempre pregunta:
        <strong> ¿existe algún tercer factor que podría explicar esta asociación?</strong>
      </Callout>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 8 }}>
          <thead>
            <tr style={{ background: C.slate }}>
              {["|r| o |ρ|", "Fuerza de asociación", "En la práctica"].map(h => (
                <th key={h} style={{ padding: "11px 14px", color: "#fff", fontWeight: 600,
                  textAlign: "left", borderBottom: `2px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["0.90 – 1.00", "Muy fuerte", "Raro en ciencias de la salud fuera de mediciones redundantes"],
              ["0.70 – 0.89", "Fuerte", "Relevante clínicamente; puede justificar un modelo predictivo"],
              ["0.50 – 0.69", "Moderada", "Asociación real pero con mucha variación no explicada"],
              ["0.30 – 0.49", "Débil", "Estadísticamente significativa con n grande, pero clínicamente modesta"],
              ["0.00 – 0.29", "Muy débil / nula", "No justifica un modelo predictivo"],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.bg : C.bgCard }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "10px 14px",
                    color: j === 0 ? C.teal : C.slateMd,
                    fontWeight: j === 0 ? 700 : 400,
                    borderBottom: `1px solid ${C.border}` }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════
          SECCIÓN 2 — Regresión Lineal Simple
      ══════════════════════════════════════════════ */}
      <SectionHeader number="2" title="Regresión Lineal Simple"
        subtitle="El modelo más simple que va más allá de la correlación" />

      <p>
        Mientras la correlación mide la fuerza de la asociación simétricamente,
        la regresión la modela asimétricamente: hay una variable <strong>dependiente</strong> (Y,
        la que quiero predecir o explicar) y una <strong>independiente</strong> (X, el predictor).
        La regresión construye la línea que mejor resume esa relación.
      </p>

      <DiagramaRegresionSimple />

      <FormulaBox
        label="Modelo de regresión lineal simple"
        formula="ŷᵢ = β₀ + β₁xᵢ + εᵢ"
        explanation="ŷᵢ: valor predicho de Y para el individuo i. β₀ (intercepto): valor de Y cuando X = 0. β₁ (pendiente): cambio en Y por cada unidad adicional de X. εᵢ (residuo): diferencia entre valor observado y predicho — lo que el modelo no explica."
      />

      <Callout type="info" title="Mínimos Cuadrados Ordinarios (MCO): la intuición geométrica">
        ¿Cómo elige el software la «mejor» línea entre todas las posibles?
        Minimizando la <strong>suma de los cuadrados de los residuos</strong>:
        <br /><br />
        Σ(yᵢ − ŷᵢ)² = Σεᵢ² → mínimo
        <br /><br />
        Se eleva al cuadrado para que residuos positivos y negativos no se cancelen,
        y para penalizar más los errores grandes que los pequeños. Las fórmulas
        de β₀ y β₁ que el software calcula son la solución analítica exacta
        de esa minimización.
      </Callout>

      <FormulaBox
        label="Estimadores MCO para β₀ y β₁"
        formula={"β₁ = Σ(xᵢ−x̄)(yᵢ−ȳ) / Σ(xᵢ−x̄)²     β₀ = ȳ − β₁ · x̄"}
        explanation="β₁ es la covarianza de X e Y dividida entre la varianza de X. β₀ garantiza que la línea pase por el punto de medias (x̄, ȳ)."
      />

      <RegresionExplorador />

      {/* ══════════════════════════════════════════════
          SECCIÓN 3 — Bondad de Ajuste
      ══════════════════════════════════════════════ */}
      <SectionHeader number="3" title="Bondad del Ajuste: ¿Cuánto Explica el Modelo?"
        subtitle="R²: la métrica que convierte la ecuación en una historia" />

      <FormulaBox
        label="Coeficiente de determinación R²"
        formula="R² = 1 − (SCRes / SCTot) = SCReg / SCTot"
        explanation="SCRes = Σ(yᵢ − ŷᵢ)²: variación no explicada por el modelo. SCTot = Σ(yᵢ − ȳ)²: variación total de Y. SCReg = variación explicada por el modelo. R² ∈ [0, 1]."
      />

      <Callout type="success" title="Interpretación de R² con un caso real">
        En el modelo HOMA-2 = β₀ + β₁(TAG/HDL) con los 30 pacientes del estudio
        de Hernández-Lalinde et al., R² ≈ 0.94.
        <br /><br />
        <strong>Interpretación:</strong> el 94% de la variabilidad en la resistencia a la insulina
        (HOMA-2) está explicada por la razón triglicéridos-colesterol (TAG/HDL).
        El 6% restante se debe a otros factores no incluidos en el modelo (edad, IMC, actividad física).
        <br /><br />
        En ciencias de la salud, R² &gt; 0.70 es considerado un ajuste excelente.
        En estudios transversales con muchas variables confusoras, R² de 0.20–0.40 es habitual
        y no invalida el modelo si los coeficientes son clínicamente relevantes.
      </Callout>

      <Callout type="warning" title="R² ajustado: cuándo usarlo en vez de R²">
        El R² simple siempre aumenta (o se mantiene igual) al añadir más predictores,
        incluso si son irrelevantes. Esto lleva a modelos sobreajustados que «memorizan»
        los datos pero no generalizan.
        <br /><br />
        <strong>R² ajustado</strong> = 1 − [(1 − R²)(n − 1) / (n − k − 1)]
        <br />
        donde k = número de predictores. Penaliza la complejidad del modelo.
        En regresión múltiple, reporta siempre R² ajustado.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 4 — Supuestos LINE
      ══════════════════════════════════════════════ */}
      <SectionHeader number="4" title="Los Supuestos del Modelo: LINE"
        subtitle="Las condiciones que hacen que los resultados sean válidos" />

      <DiagramaSupuestos />

      <p>
        Si los supuestos se cumplen, los coeficientes MCO son los mejores estimadores
        lineales insesgados (MELI). Si se violan, las estimaciones siguen siendo calculables
        pero pueden ser sesgadas, ineficientes o con intervalos de confianza incorrectos.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, margin: "24px 0" }}>
        {[
          { sup: "L — Linealidad", como: "Gráfico de dispersión X vs Y; gráfico de residuos vs. valores ajustados", falla: "Incluir término cuadrático (X²) o transformar variables (log, raíz).", color: C.teal },
          { sup: "I — Independencia", como: "Test Durbin-Watson; gráfico de residuos en el tiempo", falla: "Modelos mixtos o de efectos aleatorios para datos correlacionados (pacientes en el mismo hospital).", color: C.blue },
          { sup: "N — Normalidad", como: "Q-Q plot de residuos; test Shapiro-Wilk", falla: "Con n ≥ 30, el TCL hace la regresión robusta. Si es pequeño, considera transformaciones.", color: C.violet },
          { sup: "E — Equivarianza (homocedasticidad)", como: "Gráfico residuos vs. valores ajustados (patrón de embudo = heteroscedasticidad)", falla: "Errores estándar robustos (HC) o transformación logarítmica de Y.", color: C.amber },
        ].map((item, i) => (
          <div key={i} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "18px 20px",
          }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: item.color, marginBottom: 10 }}>{item.sup}</div>
            <div style={{ fontSize: 12, color: C.slateMd, marginBottom: 10, lineHeight: 1.5 }}>
              <strong style={{ color: C.slate }}>¿Cómo verifico?</strong> {item.como}
            </div>
            <div style={{ fontSize: 11, color: item.color, background: `${item.color}11`,
              borderRadius: 6, padding: "8px 10px", lineHeight: 1.5 }}>
              <strong>Si falla:</strong> {item.falla}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          SECCIÓN 5 — Regresión Múltiple
      ══════════════════════════════════════════════ */}
      <SectionHeader number="5" title="Regresión Lineal Múltiple"
        subtitle="El mundo real tiene más de una causa: ajustar por confusores" />

      <p>
        La regresión simple tiene un defecto: el mundo no funciona con una sola causa.
        La resistencia a la insulina no depende solo del TAG/HDL; también influyen
        la edad, el IMC y otros factores. La regresión múltiple incorpora todos
        estos predictores simultáneamente.
      </p>

      <FormulaBox
        label="Modelo de regresión lineal múltiple"
        formula="ŷ = β₀ + β₁x₁ + β₂x₂ + … + βₖxₖ + ε"
        explanation="Cada βⱼ es el coeficiente parcial de regresión: el cambio en Y por una unidad adicional de xⱼ, manteniendo todas las demás variables constantes ('ceteris paribus'). Esta es la clave de la regresión múltiple y la razón por la que se usa para ajustar por confusores."
      />

      <div style={{ background: C.slate, borderRadius: 14, padding: "22px 28px", margin: "24px 0" }}>
        <div style={{ fontSize: 11, color: C.slateXl, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
          Ejemplo: Modelo múltiple — HOMA-2 en síndrome metabólico
        </div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 16, color: "#FCD34D",
          lineHeight: 2, fontWeight: 600 }}>
          HOMA-2 = 0.23 + 0.51·(TAG/HDL) + 0.018·(Edad) + 0.031·(IMC)
        </div>
        <div style={{ marginTop: 16, display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { b: "β₁ = 0.51", var: "TAG/HDL", interp: "Cada unidad que aumenta el cociente TAG/HDL aumenta 0.51 puntos en HOMA-2, ajustando por edad e IMC." },
            { b: "β₂ = 0.018", var: "Edad (años)", interp: "Cada año adicional de edad aumenta 0.018 puntos en HOMA-2, ajustando por TAG/HDL e IMC." },
            { b: "β₃ = 0.031", var: "IMC (kg/m²)", interp: "Cada unidad de IMC adicional aumenta 0.031 puntos en HOMA-2, ajustando por TAG/HDL y edad." },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#1E3A5F", borderRadius: 8, padding: "12px 14px",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#93C5FD", marginBottom: 4 }}>{item.b}</div>
              <div style={{ fontSize: 11, color: "#CBD5E1", marginBottom: 6 }}>{item.var}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.5 }}>{item.interp}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: "#6EE7B7" }}>
          R² ajustado ≈ 0.96 — el modelo múltiple explica más variabilidad que el simple
          porque incorpora predictores independientes adicionales.
        </div>
      </div>

      <Callout type="memory" title="Multicolinealidad: el peligro oculto en la regresión múltiple">
        Si dos predictores están muy correlacionados entre sí (p.ej., IMC y circunferencia abdominal),
        los coeficientes se vuelven inestables: pequeños cambios en los datos cambian
        drásticamente los valores de β, los errores estándar se inflan y la interpretación
        individual se distorsiona. El modelo global puede tener buen R², pero ningún predictor
        individual parece «significativo».
        <br /><br />
        <strong>Cómo detectarla:</strong> Factor de Inflación de la Varianza (VIF).
        VIF &gt; 5–10 sugiere multicolinealidad problemática.
        <br />
        <strong>Cómo resolverla:</strong> eliminar uno de los predictores redundantes,
        crear un índice compuesto, o usar regresión ridge (penalizada).
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 6 — Límites y errores frecuentes
      ══════════════════════════════════════════════ */}
      <SectionHeader number="6" title="Límites y Errores Frecuentes"
        subtitle="Lo que la regresión lineal no puede (y no debe) hacer" />

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 8 }}>
          <thead>
            <tr style={{ background: C.slate }}>
              {["Error común", "Por qué es un problema", "Alternativa correcta"].map(h => (
                <th key={h} style={{ padding: "11px 14px", color: "#fff", fontWeight: 600,
                  textAlign: "left", borderBottom: `2px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Usar regresión lineal con variable Y dicotómica (sí/no)",
                "Las predicciones pueden salir fuera del rango 0–1; viola el supuesto de normalidad de residuos",
                "Regresión logística (módulo 8: Modelos Multivariantes)",
              ],
              [
                "Extrapolar el modelo fuera del rango de X",
                "La relación lineal puede no mantenerse fuera del rango observado; genera predicciones absurdas",
                "Restringir las predicciones al rango de X observado; usar intervalos de predicción",
              ],
              [
                "Interpretar β₁ como efecto causal",
                "En datos observacionales, puede haber confusores. La regresión controla los confusores medidos, no los no medidos",
                "Reconocer explícitamente que se trata de asociación ajustada, no de causalidad demostrada",
              ],
              [
                "Incluir demasiados predictores (sobreajuste)",
                "El modelo se «memoriza» los datos y no generaliza a nuevas observaciones",
                "Regla heurística: mínimo 10–20 eventos por predictor. Usar R² ajustado o validación cruzada",
              ],
              [
                "No verificar los supuestos LINE",
                "Los coeficientes pueden ser inválidos sin que el software lo avise",
                "Siempre inspeccionar gráficos diagnósticos (residuos, Q-Q plot) antes de publicar",
              ],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.bg : C.bgCard }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "10px 14px",
                    color: j === 0 ? C.rose : j === 2 ? C.teal : C.slateMd,
                    fontWeight: j === 0 ? 700 : 400,
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: j === 0 ? 13 : 12 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Flashcards y Quizzes ── */}
      <SectionHeader number="7" title="Consolida lo Aprendido" subtitle="" />

      <Flashcard
        question="¿Cuál es la diferencia entre r (correlación de Pearson) y R² (coeficiente de determinación)?"
        answer={
          <span>
            <strong>r</strong> mide la fuerza y dirección de la relación lineal entre dos variables.
            Va de −1 a +1. Por sí solo no dice cuánta variabilidad se explica.
            <br /><br />
            <strong>R²</strong> = r² para regresión simple. Representa la proporción de la variabilidad
            de Y que está explicada por el modelo. Va de 0 a 1 (0% a 100%).
            Es la métrica de bondad de ajuste del modelo.
            <br /><br />
            Ejemplo: r = 0.80 → R² = 0.64 → el modelo explica el 64% de la variabilidad de Y.
            El 36% restante es explicado por factores no incluidos en el modelo.
          </span>
        }
      />

      <Flashcard
        question="¿Por qué el intercepto (β₀) a veces carece de interpretación clínica?"
        answer={
          <span>
            El intercepto es el valor predicho de Y cuando X = 0. Muchas veces,
            X = 0 es un valor biológicamente imposible o fuera del rango de los datos.
            <br /><br />
            Ejemplo: en el modelo HOMA-2 = 0.23 + 0.51·(TAG/HDL), β₀ = 0.23 sería
            la resistencia a insulina cuando la razón TAG/HDL = 0. Eso significa que
            no hay triglicéridos ni colesterol, lo cual es inviable en biología.
            El intercepto es necesario para que la ecuación sea matemáticamente correcta,
            pero no tiene interpretación clínica directa.
          </span>
        }
      />

      <Quiz
        question="Un investigador construye un modelo de regresión lineal con glucosa basal (Y) como variable dependiente y HbA1c (%) como predictor. Obtiene β₁ = 8.4 (IC 95%: 7.1–9.7) y R² = 0.68. ¿Cuál es la interpretación correcta de β₁?"
        options={[
          { text: "La glucosa media de los pacientes con HbA1c elevada es 8.4 mg/dL", correct: false },
          { text: "Por cada 1% de aumento en HbA1c, la glucosa basal aumenta en promedio 8.4 mg/dL (IC 95%: 7.1–9.7)", correct: true },
          { text: "El 8.4% de los pacientes tienen glucosa elevada por causa de la HbA1c", correct: false },
          { text: "La HbA1c explica el 8.4% de la variabilidad en la glucosa basal", correct: false },
        ]}
        explanation="β₁ es la pendiente: el cambio promedio en Y por cada unidad adicional de X. Su intervalo de confianza indica la precisión de esa estimación. El R² = 0.68 significa que el modelo explica el 68% de la variabilidad en glucosa basal — no confundir con β₁."
      />

      <Quiz
        question="Una nutricionista aplica regresión lineal múltiple para predecir el porcentaje de masa grasa (Y) usando IMC (X₁) y edad (X₂). Obtiene R² = 0.71. Al añadir el perímetro abdominal (X₃, muy correlacionado con IMC), R² sube a 0.72 pero los errores estándar de β₁ se inflan enormemente. ¿Cuál es el problema?"
        options={[
          { text: "El tamaño muestral es insuficiente", correct: false },
          { text: "La variable Y no sigue una distribución normal", correct: false },
          { text: "Multicolinealidad entre IMC y perímetro abdominal", correct: true },
          { text: "El modelo no cumple el supuesto de linealidad", correct: false },
        ]}
        explanation="La multicolinealidad ocurre cuando dos o más predictores están muy correlacionados entre sí. IMC y perímetro abdominal miden aspectos muy parecidos de la obesidad. El modelo global puede mejorar ligeramente el R², pero los coeficientes individuales se vuelven inestables (errores estándar inflados) y difíciles de interpretar. La solución más sencilla es usar solo uno de los dos predictores, el que tenga mayor relevancia clínica o menor VIF."
      />

      {/* ── RECURSOS ── */}
      <div style={{ marginTop: 48, borderRadius: 16, border: `1px solid ${C.border}`,
        background: `linear-gradient(135deg, ${C.bg} 0%, #EEF2FF 100%)`,
        padding: "28px 32px" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: C.slate }}>
          📚 Recursos y Referencias Clave
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate, marginBottom: 12 }}>Lecturas fundamentales</h3>
            {[
              {
                ref: "Hernández-Lalinde, J. et al. (2020). Sobre el uso adecuado de la regresión lineal: Conceptualización básica mediante un ejemplo aplicado a las ciencias de la salud. AVFT, 38(5), 608–616.",
                note: "Artículo de referencia de este módulo. Ejemplo real con síndrome metabólico, fórmulas MCO y código en R. Acceso libre.",
              },
              {
                ref: "Montgomery, D. C., & Runger, G. C. (2018). Applied statistics and probability for engineers (7ª ed.). Wiley.",
                note: "Capítulos 11–13: regresión lineal simple y múltiple, verificación de supuestos y diagnóstico del modelo.",
              },
              {
                ref: "Harrell, F. E. (2015). Regression modeling strategies (2ª ed.). Springer.",
                note: "Para el que quiera ir más allá: estrategias para modelos complejos en salud, incluyendo penalización y validación.",
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>{item.ref}</div>
                <div style={{ fontSize: 11, color: C.slateMd, marginTop: 3 }}>{item.note}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate, marginBottom: 12 }}>Herramientas en R</h3>
            <div style={{ background: "#0F172A", borderRadius: 10, padding: "14px 16px",
              fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#E2E8F0", lineHeight: 1.8, marginBottom: 12 }}>
              <span style={{ color: "#94A3B8" }}># Regresión lineal simple en R</span><br />
              <span style={{ color: "#6EE7B7" }}>modelo</span> &lt;- lm(HOMA2 ~ TAG_HDL, data = datos)<br />
              <span style={{ color: "#93C5FD" }}>summary</span>(modelo)<br /><br />
              <span style={{ color: "#94A3B8" }}># Regresión múltiple</span><br />
              <span style={{ color: "#6EE7B7" }}>modelo_m</span> &lt;- lm(HOMA2 ~ TAG_HDL + Edad + IMC, data = datos)<br />
              <span style={{ color: "#93C5FD" }}>plot</span>(modelo_m) <span style={{ color: "#94A3B8" }}># gráficos diagnósticos</span><br />
              <span style={{ color: "#94A3B8" }}># VIF para multicolinealidad</span><br />
              <span style={{ color: "#93C5FD" }}>car::vif</span>(modelo_m)
            </div>
            <div style={{ background: C.tealLt, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6 }}>📊 Alternativa sin código</div>
              <div style={{ fontSize: 12, color: C.teal, lineHeight: 1.6 }}>
                <strong>Jamovi:</strong> Análisis → Regresión → Regresión Lineal.
                Muestra R², coeficientes con IC 95%, y gráficos diagnósticos básicos.
                <br /><br />
                <strong>JASP:</strong> Módulo de Regresión Lineal con output publicable
                en formato APA directamente.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
