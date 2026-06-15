"use client";
import { useState, ReactNode } from "react";
import { BookOpen } from "lucide-react";

export const meta = {
  title: "Probabilidad y el Teorema de Bayes",
  subtitle: "Cómo la probabilidad transforma la incertidumbre clínica en decisiones fundadas.",
  objective:
    "Aplicar el Teorema de Bayes para actualizar probabilidades diagnósticas, interpretar valores predictivos en función de la prevalencia y usar razones de verosimilitud (LR) en la práctica clínica.",
};

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — consistent with project palette
// ─────────────────────────────────────────────────────────────
const C = {
  teal:    "#0F6E56",
  tealLt:  "#E6F4F1",
  tealMd:  "#1A8A6C",
  amber:   "#B45309",
  amberLt: "#FEF3C7",
  blue:    "#1D4ED8",
  blueLt:  "#DBEAFE",
  rose:    "#9F1239",
  roseLt:  "#FFE4E6",
  violet:  "#5B21B6",
  violetLt:"#EDE9FE",
  slate:   "#1E293B",
  slateMd: "#475569",
  slateXl: "#94A3B8",
  bg:      "#F8FAFC",
  bgCard:  "#FFFFFF",
  border:  "#E2E8F0",
};

// ─────────────────────────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────────────────────────

function LearningGoals({ goals }: { goals: string[] }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealMd} 100%)`,
      borderRadius: 16, padding: "28px 32px", marginBottom: 40, color: "#fff"
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

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "danger" | "success" | "memory"; title?: string; children?: ReactNode }) {
  const map = {
    info:    { bg: C.blueLt,   border: C.blue,   icon: "💡" },
    warning: { bg: C.amberLt,  border: C.amber,   icon: "⚠️" },
    danger:  { bg: C.roseLt,   border: C.rose,    icon: "🚨" },
    success: { bg: C.tealLt,   border: C.teal,    icon: "✅" },
    memory:  { bg: C.violetLt, border: C.violet,  icon: "🧠" },
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

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div style={{ borderTop: `3px solid ${C.teal}`, paddingTop: 32, marginTop: 56, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{
          background: C.teal, color: "#fff", width: 44, height: 44,
          borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 17, flexShrink: 0, marginTop: 2
        }}>{number}</div>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.slate, lineHeight: 1.2 }}>{title}</h2>
          {subtitle && <p style={{ margin: "6px 0 0", fontSize: 14, color: C.slateMd }}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function FormulaBox({ label, formula, explanation }: { label?: string; formula: ReactNode; explanation?: ReactNode }) {
  return (
    <div style={{
      background: C.slate, borderRadius: 12, padding: "22px 28px", margin: "24px 0",
      position: "relative"
    }}>
      {label && (
        <div style={{ color: C.slateXl, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
          {label}
        </div>
      )}
      <div style={{
        fontFamily: "'Georgia', serif", fontSize: 19, color: "#FCD34D",
        letterSpacing: "0.02em", lineHeight: 1.5, fontWeight: 600
      }}>{formula}</div>
      {explanation && (
        <div style={{ marginTop: 12, fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>
          {explanation}
        </div>
      )}
    </div>
  );
}

function ClinicalCase({ title, profession, children }: { title?: string; profession?: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `2px solid ${C.border}`, borderRadius: 12, marginBottom: 16, overflow: "hidden"
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: open ? C.tealLt : C.bgCard,
          border: "none", padding: "16px 20px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          textAlign: "left"
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.teal,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            {profession}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.slate }}>{title}</div>
        </div>
        <span style={{
          fontSize: 20, color: C.teal, transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "none", display: "block"
        }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "20px 24px", borderTop: `1px solid ${C.border}`,
          background: C.bgCard }}>
          {children}
        </div>
      )}
    </div>
  );
}

function TableContingencia({ data }: { data: { tp: number; fp: number; fn: number; tn: number } }) {
  // data: { tp, fp, fn, tn }
  const { tp, fp, fn, tn } = data;
  const total = tp + fp + fn + tn;
  const sens = (tp / (tp + fn) * 100).toFixed(1);
  const spec = (tn / (tn + fp) * 100).toFixed(1);
  const vpp  = (tp / (tp + fp) * 100).toFixed(1);
  const vpn  = (tn / (tn + fn) * 100).toFixed(1);
  const lrPos = (tp / (tp + fn)) / (fp / (fp + tn));
  const lrNeg = (fn / (tp + fn)) / (tn / (fp + tn));

  const cell = (val: ReactNode, bg = "#fff", bold = false) => (
    <td style={{
      padding: "12px 16px", textAlign: "center", background: bg,
      fontWeight: bold ? 700 : 400, fontSize: 14, borderBottom: `1px solid ${C.border}`
    }}>{val}</td>
  );

  return (
    <div style={{ margin: "28px 0" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse",
          border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <thead>
            <tr>
              <th style={{ padding: "14px 16px", background: C.slate, color: "#fff",
                fontSize: 13, fontWeight: 600, textAlign: "left" }}>
                Resultado / Realidad
              </th>
              <th style={{ padding: "14px 16px", background: "#1A8A6C", color: "#fff",
                fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                ✓ Enfermo (D+)
              </th>
              <th style={{ padding: "14px 16px", background: "#475569", color: "#fff",
                fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                ✗ Sano (D−)
              </th>
              <th style={{ padding: "14px 16px", background: C.slate, color: "#fff",
                fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: 14,
                background: "#EFF6FF", borderBottom: `1px solid ${C.border}` }}>
                🔴 Prueba Positiva (T+)
              </td>
              {cell(tp, "#DCFCE7", true)}
              {cell(fp, "#FEE2E2")}
              {cell(tp + fp)}
            </tr>
            <tr>
              <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: 14,
                background: "#EFF6FF", borderBottom: `1px solid ${C.border}` }}>
                ⬜ Prueba Negativa (T−)
              </td>
              {cell(fn, "#FEE2E2")}
              {cell(tn, "#DCFCE7", true)}
              {cell(fn + tn)}
            </tr>
            <tr>
              <td style={{ padding: "12px 16px", fontWeight: 800, fontSize: 14,
                background: C.bg, borderBottom: `1px solid ${C.border}` }}>Total</td>
              {cell(tp + fn, C.bg, true)}
              {cell(fp + tn, C.bg, true)}
              {cell(total, C.bg, true)}
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
        {[
          { label: "Sensibilidad", val: `${sens}%`, sub: "VP / (VP+FN)", color: C.teal },
          { label: "Especificidad", val: `${spec}%`, sub: "VN / (VN+FP)", color: C.blue },
          { label: "LR+", val: lrPos.toFixed(1), sub: "Sen / (1−Esp)", color: C.amber },
          { label: "LR−", val: lrNeg.toFixed(2), sub: "(1−Sen) / Esp", color: C.violet },
          { label: "VPP", val: `${vpp}%`, sub: "VP / (VP+FP)", color: C.rose },
          { label: "VPN", val: `${vpn}%`, sub: "VN / (VN+FN)", color: C.slateMd },
        ].map(m => (
          <div key={m.label} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: "12px 14px", textAlign: "center"
          }}>
            <div style={{ fontSize: 11, color: C.slateMd, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: m.color, margin: "4px 0" }}>{m.val}</div>
            <div style={{ fontSize: 11, color: C.slateXl }}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.slateXl, marginTop: 8, textAlign: "center" }}>
        VP = Verdadero Positivo · FP = Falso Positivo · FN = Falso Negativo · VN = Verdadero Negativo
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE NOMOGRAM DE FAGAN
// ─────────────────────────────────────────────────────────────
function NomogramaFagan() {
  const [pre, setPre] = useState(20);
  const [lr, setLr]   = useState(5);

  // Convert probability → odds → post probability
  const preOdds  = pre / (100 - pre);
  const postOdds = preOdds * lr;
  const post     = (postOdds / (1 + postOdds)) * 100;

  // SVG dimensions
  const W = 420, H = 320;
  const AXIS = { y0: 28, y1: 295 };
  const COL  = { pre: 80, lr: 210, post: 340 };

  // Logarithmic mapping helpers
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  // Map probability (0–100) to Y via log-odds
  const probToY = (p: number) => {
    const safe = clamp(p, 0.5, 99.5);
    const lo   = Math.log(safe / (100 - safe));
    const loMin = Math.log(0.5 / 99.5);
    const loMax = Math.log(99.5 / 0.5);
    return AXIS.y0 + (1 - (lo - loMin) / (loMax - loMin)) * (AXIS.y1 - AXIS.y0);
  };

  // Map LR (0.001–1000) to Y via log10
  const lrToY = (r: number) => {
    const safe = clamp(r, 0.001, 1000);
    const lo   = Math.log10(safe);
    const loMin = Math.log10(0.001);
    const loMax = Math.log10(1000);
    return AXIS.y0 + (1 - (lo - loMin) / (loMax - loMin)) * (AXIS.y1 - AXIS.y0);
  };

  const PRE_TICKS  = [0.1,0.2,0.5,1,2,5,10,20,30,40,50,60,70,80,90,95,99];
  const LR_TICKS   = [0.001,0.002,0.005,0.01,0.02,0.05,0.1,0.2,0.5,1,2,5,10,20,50,100,200,500,1000];
  const POST_TICKS = [0.1,0.2,0.5,1,2,5,10,20,30,40,50,60,70,80,90,95,99];

  const y_pre  = probToY(pre);
  const y_lr   = lrToY(lr);
  const y_post = probToY(post);

  const interp = (x0: number, y0: number, x1: number, y1: number, x: number) => y0 + (y1 - y0) * (x - x0) / (x1 - x0);
  const y_line_lr = interp(COL.pre, y_pre, COL.post, y_post, COL.lr);

  const lrQuality = lr >= 10 ? { label: "Muy alto — cambio grande", color: "#059669" }
    : lr >= 5   ? { label: "Alto — cambio moderado-alto", color: "#0891B2" }
    : lr >= 2   ? { label: "Moderado — cambio pequeño", color: "#D97706" }
    : lr >= 1   ? { label: "Escaso — poca utilidad", color: "#9CA3AF" }
    : lr >= 0.2 ? { label: "LR− moderado", color: "#7C3AED" }
    : lr >= 0.1 ? { label: "LR− alto", color: "#DC2626" }
    : { label: "LR− muy alto — descarta enfermedad", color: "#991B1B" };

  const Axis = ({ ticks, x, labelLeft, yFn, isLR = false }: { ticks: number[]; x: number; labelLeft?: boolean; yFn: (v: number) => number; isLR?: boolean }) => (
    <g>
      <line x1={x} y1={AXIS.y0} x2={x} y2={AXIS.y1}
        stroke="#94A3B8" strokeWidth="1.5" />
      {ticks.map((t: number) => {
        const y = yFn(t);
        const txt = isLR ? (t >= 1 ? t : t >= 0.1 ? t.toFixed(1) : t) : `${t}`;
        return (
          <g key={t}>
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#94A3B8" strokeWidth="1" />
            <text x={labelLeft ? x - 8 : x + 8}
              y={y + 4}
              textAnchor={labelLeft ? "end" : "start"}
              fontSize="9" fill="#64748B" fontFamily="sans-serif">{txt}</text>
          </g>
        );
      })}
    </g>
  );

  return (
    <div style={{
      background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
      border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, margin: "28px 0"
    }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: C.slate, marginBottom: 4 }}>
        Nomograma de Fagan — Interactivo
      </div>
      <div style={{ fontSize: 13, color: C.slateMd, marginBottom: 20 }}>
        Ajusta la probabilidad preprueba y el LR para ver la probabilidad posprueba en tiempo real
      </div>

      {/* Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: C.slate, display: "block", marginBottom: 6 }}>
            Probabilidad preprueba: <span style={{ color: C.teal, fontSize: 16 }}>{pre}%</span>
          </label>
          <input type="range" min="1" max="99" value={pre} onChange={e => setPre(+e.target.value)}
            style={{ width: "100%", accentColor: C.teal }} />
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 11, color: C.slateXl, marginTop: 2 }}>
            <span>Raro (1%)</span><span>Frecuente (99%)</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: C.slate, display: "block", marginBottom: 6 }}>
            Likelihood Ratio (LR): <span style={{ color: C.blue, fontSize: 16 }}>{lr < 1 ? lr.toFixed(2) : lr}</span>
          </label>
          <input type="range" min="-30" max="30"
            value={Math.round(Math.log2(lr) * 5)}
            onChange={e => {
              const v = +e.target.value;
              const raw = Math.pow(2, v / 5);
              setLr(Math.round(raw * 100) / 100);
            }}
            style={{ width: "100%", accentColor: C.blue }} />
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 11, color: C.slateXl, marginTop: 2 }}>
            <span>LR− (0.001)</span><span>LR+ (1000)</span>
          </div>
        </div>
      </div>

      {/* SVG nomogram */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 420, height: "auto", display: "block", overflow: "visible" }}>
          {/* Column labels */}
          {[
            { x: COL.pre, label: "Pre-prueba (%)" },
            { x: COL.lr,  label: "Likelihood Ratio" },
            { x: COL.post, label: "Pos-prueba (%)" },
          ].map(({ x, label }) => (
            <text key={label} x={x} y={16}
              textAnchor="middle" fontSize="9.5" fill={C.slateMd}
              fontFamily="sans-serif" fontWeight="600">
              {label}
            </text>
          ))}

          {/* Axes */}
          <Axis ticks={PRE_TICKS}  x={COL.pre}  labelLeft yFn={probToY} />
          <Axis ticks={LR_TICKS}   x={COL.lr}   labelLeft={false} yFn={lrToY} isLR />
          <Axis ticks={POST_TICKS} x={COL.post} labelLeft={false} yFn={probToY} />

          {/* Connecting Bayesian line */}
          <line x1={COL.pre} y1={y_pre} x2={COL.post} y2={y_post}
            stroke="#378ADD" strokeWidth="2" strokeDasharray="6 3" />

          {/* LR intercept marker */}
          <circle cx={COL.lr} cy={y_line_lr} r="4"
            fill="white" stroke="#378ADD" strokeWidth="2" />

          {/* Endpoint dots */}
          {([[COL.pre, y_pre, C.teal], [COL.post, y_post, "#1D4ED8"]] as [number, number, string][]).map(([cx, cy, col], i) => (
            <circle key={i} cx={cx} cy={cy} r="6"
              fill={col} stroke="white" strokeWidth="2" />
          ))}

          {/* Labels for current values */}
          <text x={COL.pre - 12} y={y_pre + 4}
            textAnchor="end" fontSize="10" fill={C.teal}
            fontFamily="sans-serif" fontWeight="700">{pre}%</text>
          <text x={COL.post + 12} y={y_post + 4}
            textAnchor="start" fontSize="10" fill="#1D4ED8"
            fontFamily="sans-serif" fontWeight="700">{post.toFixed(1)}%</text>
          <text x={COL.lr} y={y_line_lr - 12}
            textAnchor="middle" fontSize="9" fill="#7C3AED"
            fontFamily="sans-serif" fontWeight="700">LR={lr < 1 ? lr.toFixed(2) : lr}</text>
        </svg>
      </div>

      {/* Result summary */}
      <div style={{
        background: C.bgCard, borderRadius: 12, padding: "18px 20px",
        border: `1px solid ${C.border}`, marginTop: 16,
        display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "center", gap: 12
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.slateMd, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em" }}>Preprueba</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.teal }}>{pre}%</div>
        </div>
        <div style={{ fontSize: 20, color: C.slateXl }}>×</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.slateMd, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em" }}>LR</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.blue }}>
            {lr < 1 ? lr.toFixed(2) : lr}
          </div>
          <div style={{ fontSize: 10, color: lrQuality.color, fontWeight: 700 }}>
            {lrQuality.label}
          </div>
        </div>
        <div style={{ fontSize: 20, color: C.slateXl }}>=</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.slateMd, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.08em" }}>Posprueba</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#1D4ED8" }}>{post.toFixed(1)}%</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: C.slateMd, marginTop: 10, textAlign: "center", fontStyle: "italic" }}>
        Fórmula: Odds_post = Odds_pre × LR → P_post = Odds_post / (1 + Odds_post)
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE QUIZ
// ─────────────────────────────────────────────────────────────
function Quiz({ question, options, correct, explanation }: { question: string; options: string[]; correct: number; explanation?: string }) {
  const [sel, setSel] = useState<number | null>(null);
  const done = sel !== null;
  return (
    <div style={{
      background: C.bgCard, border: `2px solid ${C.border}`, borderRadius: 14,
      padding: "24px 28px", margin: "28px 0"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{
          background: C.violet, color: "#fff", borderRadius: 8, padding: "4px 10px",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em"
        }}>AUTOEVALUACIÓN</span>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.slate }}>{question}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt, i) => {
          const isRight = i === correct;
          const isSel   = sel === i;
          let bg = C.bg, border = C.border, color = C.slate;
          if (done && isSel && isRight)  { bg = "#DCFCE7"; border = "#16A34A"; color = "#15803D"; }
          if (done && isSel && !isRight) { bg = "#FEE2E2"; border = "#DC2626"; color = "#991B1B"; }
          if (done && !isSel && isRight) { bg = "#F0FDF4"; border = "#86EFAC"; color = "#166534"; }
          return (
            <button key={i} onClick={() => !done && setSel(i)} style={{
              padding: "12px 16px", textAlign: "left", border: `2px solid ${border}`,
              borderRadius: 10, background: bg, color, fontSize: 14, cursor: done ? "default" : "pointer",
              fontWeight: isSel ? 700 : 400, transition: "all 0.2s"
            }}>
              <span style={{ fontWeight: 700, marginRight: 8, color: C.slateXl }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
              {done && isRight && <span style={{ marginLeft: 8 }}>✓</span>}
              {done && isSel && !isRight && <span style={{ marginLeft: 8 }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && (
        <div style={{
          marginTop: 16, padding: "14px 18px", background: C.tealLt,
          borderRadius: 10, fontSize: 14, lineHeight: 1.7, color: C.slate
        }}>
          <strong style={{ color: C.teal }}>Explicación: </strong>{explanation}
        </div>
      )}
      {!done && (
        <div style={{ marginTop: 12, fontSize: 12, color: C.slateXl, fontStyle: "italic" }}>
          Selecciona una opción para ver la explicación
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LR VISUAL SCALE
// ─────────────────────────────────────────────────────────────
function LRScale() {
  const segments = [
    { range: "LR+ > 10", label: "Cambio grande — casi confirma", color: "#059669", w: 18 },
    { range: "LR+ 5–10", label: "Cambio moderado-alto", color: "#0891B2", w: 15 },
    { range: "LR+ 2–5",  label: "Cambio pequeño", color: "#D97706", w: 15 },
    { range: "LR+ 1–2",  label: "Cambio mínimo — poca utilidad", color: "#9CA3AF", w: 12 },
    { range: "LR ≈ 1",   label: "Sin información", color: "#E5E7EB", w: 10, textDark: true },
    { range: "LR− 0.5–1", label: "Cambio mínimo", color: "#9CA3AF", w: 10 },
    { range: "LR− 0.2–0.5", label: "Cambio pequeño", color: "#7C3AED", w: 10 },
    { range: "LR− 0.1–0.2", label: "Cambio moderado-alto", color: "#9F1239", w: 10 },
  ];
  return (
    <div style={{ margin: "28px 0" }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: C.slate, marginBottom: 12 }}>
        Regla nemotécnica — Interpretación de Likelihood Ratios
      </div>
      <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", height: 52 }}>
        {segments.map((s, i) => (
          <div key={i} style={{
            flex: s.w, background: s.color, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", padding: "2px 4px"
          }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: s.textDark ? C.slate : "#fff",
              letterSpacing: "0.04em" }}>{s.range}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between",
        fontSize: 11, color: C.slateMd, marginTop: 6 }}>
        <span>← Fuertemente positivo (confirma)</span>
        <span>Fuertemente negativo (descarta) →</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
        {[
          { icon: "✅", text: "LR+ > 10 o LR− < 0.1 → Cambio grande, frecuentemente concluyente" },
          { icon: "📊", text: "LR+ 5–10 o LR− 0.1–0.2 → Cambio moderado, útil para decidir" },
          { icon: "⚠️", text: "LR+ 2–5 o LR− 0.2–0.5 → Cambio pequeño, rara vez cambia decisión" },
          { icon: "🚫", text: "LR ≈ 1 → La prueba no aporta información útil" },
        ].map((r, i) => (
          <div key={i} style={{
            background: C.bg, borderRadius: 8, padding: "10px 12px",
            fontSize: 13, color: C.slate, display: "flex", gap: 8, alignItems: "flex-start"
          }}>
            <span style={{ flexShrink: 0 }}>{r.icon}</span>{r.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PREVALENCE IMPACT EXPLORER
// ─────────────────────────────────────────────────────────────
function PrevalenceExplorer() {
  const [prev, setPrev]  = useState(10);
  const [sens, setSens] = useState(85);
  const [spec, setSpec] = useState(90);

  // Calcular tabla de contingencia para N=10000
  const N = 10000;
  const D  = Math.round(N * prev / 100);
  const nD = N - D;
  const tp = Math.round(D * sens / 100);
  const fn = D - tp;
  const tn = Math.round(nD * spec / 100);
  const fp = nD - tn;
  const vpp = tp + fp > 0 ? (tp / (tp + fp) * 100) : 0;
  const vpn = fn + tn > 0 ? (tn / (fn + tn) * 100) : 0;

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16,
      padding: "24px 28px", margin: "28px 0"
    }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: C.slate, marginBottom: 4 }}>
        Explorador de Prevalencia — Impacto en VPP y VPN
      </div>
      <div style={{ fontSize: 13, color: C.slateMd, marginBottom: 20 }}>
        Mantén la sensibilidad y especificidad fijas y observa cómo cambia el valor predictivo según la prevalencia
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Prevalencia", val: prev, set: setPrev, min: 1, max: 50, color: C.rose, symbol: "%" },
          { label: "Sensibilidad", val: sens, set: setSens, min: 50, max: 99, color: C.teal, symbol: "%" },
          { label: "Especificidad", val: spec, set: setSpec, min: 50, max: 99, color: C.blue, symbol: "%" },
        ].map(({ label, val, set, min, max, color, symbol }) => (
          <div key={label}>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.slate, display: "block", marginBottom: 4 }}>
              {label}: <span style={{ color, fontSize: 15 }}>{val}{symbol}</span>
            </label>
            <input type="range" min={min} max={max} value={val}
              onChange={e => set(+e.target.value)}
              style={{ width: "100%", accentColor: color }} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{
          background: vpp > 70 ? "#DCFCE7" : vpp > 40 ? C.amberLt : "#FEE2E2",
          borderRadius: 12, padding: "20px 24px", textAlign: "center"
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.slateMd, textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: 6 }}>Valor Predictivo Positivo</div>
          <div style={{ fontSize: 44, fontWeight: 800,
            color: vpp > 70 ? "#16A34A" : vpp > 40 ? C.amber : C.rose }}>
            {vpp.toFixed(1)}%
          </div>
          <div style={{ fontSize: 12, color: C.slateMd, marginTop: 4 }}>
            De {tp + fp} resultados positivos, {tp} son verdaderos
          </div>
        </div>
        <div style={{
          background: vpn > 95 ? "#DCFCE7" : C.amberLt,
          borderRadius: 12, padding: "20px 24px", textAlign: "center"
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.slateMd, textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: 6 }}>Valor Predictivo Negativo</div>
          <div style={{ fontSize: 44, fontWeight: 800,
            color: vpn > 95 ? "#16A34A" : C.amber }}>
            {vpn.toFixed(1)}%
          </div>
          <div style={{ fontSize: 12, color: C.slateMd, marginTop: 4 }}>
            De {fn + tn} resultados negativos, {tn} son verdaderos
          </div>
        </div>
      </div>

      <Callout type="warning" title="La paradoja del cribado en baja prevalencia">
        <p>Con una prevalencia de <strong>{prev}%</strong>, incluso con sensibilidad {sens}% y especificidad {spec}%,
        el VPP es solo <strong>{vpp.toFixed(1)}%</strong>. Esto significa que <strong>{(100 - vpp).toFixed(1)}%
        </strong> de los positivos son falsos alarmas. Este efecto es más pronunciado cuando la enfermedad es rara —
        un resultado positivo en cribado poblacional siempre necesita confirmación.</p>
      </Callout>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BAYES EVIDENCE UPDATER — Gráfico interactivo nuevo
// ─────────────────────────────────────────────────────────────
function BayesEvidenceUpdater() {
  const [prior, setPrior] = useState(30);
  const [lr, setLr] = useState(5);

  // Convert prior % to odds, apply LR, convert back to probability
  const priorOdds = prior / (100 - prior);
  const posteriorOdds = priorOdds * lr;
  const posterior = Math.round((posteriorOdds / (1 + posteriorOdds)) * 100);

  const getLRLabel = (v: number) => {
    if (v >= 20) return { label: "Evidencia muy fuerte", color: C.teal };
    if (v >= 10) return { label: "Evidencia fuerte", color: "#059669" };
    if (v >= 5)  return { label: "Evidencia moderada", color: C.blue };
    if (v >= 2)  return { label: "Evidencia débil", color: C.amber };
    return { label: "Sin valor informativo", color: C.slateMd };
  };

  const lrInfo = getLRLabel(lr);
  const delta = posterior - prior;
  const barW = (v: number) => `${Math.max(4, v)}%`;

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16,
      padding: "28px 32px", margin: "28px 0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
    }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: C.slate, marginBottom: 4 }}>
        🔬 Simulador: Bayes y la evidencia científica
      </div>
      <div style={{ fontSize: 13, color: C.slateMd, marginBottom: 24, lineHeight: 1.6 }}>
        Ajusta la probabilidad pre-estudio y la fuerza de la evidencia para ver cómo el
        Teorema de Bayes actualiza la probabilidad de que una intervención sea efectiva.
      </div>

      {/* Controles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.slate, marginBottom: 6 }}>
            Probabilidad pre-estudio: <span style={{ color: C.teal }}>{prior}%</span>
          </div>
          <div style={{ fontSize: 12, color: C.slateMd, marginBottom: 10, lineHeight: 1.5 }}>
            ¿Qué tan probable era que la intervención funcionara antes del ensayo?
            (basado en mecanismo, estudios previos, clase farmacológica)
          </div>
          <input type="range" min={5} max={90} step={5} value={prior}
            onChange={e => setPrior(Number(e.target.value))}
            style={{ width: "100%", accentColor: C.teal }} />
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 11, color: C.slateXl, marginTop: 2 }}>
            <span>5% (muy escéptico)</span><span>90% (muy optimista)</span>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.slate, marginBottom: 6 }}>
            Fuerza de la evidencia (LR del estudio):{" "}
            <span style={{ color: lrInfo.color }}>{lr}×</span>
          </div>
          <div style={{ fontSize: 12, color: C.slateMd, marginBottom: 10, lineHeight: 1.5 }}>
            Cuántas veces más probable son los resultados si la hipótesis es verdadera vs. falsa.
            Refleja poder estadístico, tamaño de efecto y calidad metodológica.
          </div>
          <input type="range" min={1} max={30} step={1} value={lr}
            onChange={e => setLr(Number(e.target.value))}
            style={{ width: "100%", accentColor: lrInfo.color }} />
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 11, color: C.slateXl, marginTop: 2 }}>
            <span>1× (sin valor)</span><span>30× (muy fuerte)</span>
          </div>
        </div>
      </div>

      {/* Visualización de barras */}
      <div style={{ background: C.bg, borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 13, fontWeight: 600, color: C.slateMd, marginBottom: 6 }}>
            <span>Probabilidad pre-estudio</span>
            <span style={{ color: C.blue, fontWeight: 800 }}>{prior}%</span>
          </div>
          <div style={{ height: 28, background: C.border, borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              width: barW(prior), height: "100%",
              background: `linear-gradient(to right, ${C.blue}, #3B82F6)`,
              transition: "width 0.4s ease", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8
            }}>
              {prior > 15 && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>{prior}%</span>}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "10px 0", fontSize: 13,
          color: lrInfo.color, fontWeight: 700 }}>
          + {lrInfo.label} (LR = {lr}×) →
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between",
            fontSize: 13, fontWeight: 600, color: C.slateMd, marginBottom: 6 }}>
            <span>Probabilidad post-estudio</span>
            <span style={{ color: C.teal, fontWeight: 800 }}>{posterior}%</span>
          </div>
          <div style={{ height: 28, background: C.border, borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              width: barW(posterior), height: "100%",
              background: `linear-gradient(to right, ${C.teal}, ${C.tealMd})`,
              transition: "width 0.4s ease", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8
            }}>
              {posterior > 15 && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>{posterior}%</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Interpretación dinámica */}
      <div style={{
        background: delta > 20 ? C.tealLt : delta > 5 ? C.blueLt : C.amberLt,
        border: `1px solid ${delta > 20 ? C.teal : delta > 5 ? C.blue : C.amber}`,
        borderRadius: 10, padding: "14px 18px"
      }}>
        <div style={{ fontWeight: 700, fontSize: 13,
          color: delta > 20 ? C.teal : delta > 5 ? C.blue : C.amber, marginBottom: 6 }}>
          📊 Interpretación bayesiana
        </div>
        <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.7 }}>
          {delta > 30
            ? `Este estudio cambia el paisaje científico. La probabilidad de que la intervención funcione pasó del ${prior}% al ${posterior}% — un incremento de ${delta} puntos porcentuales. Esta evidencia justifica cambiar la práctica clínica si el diseño del ensayo es robusto.`
            : delta > 10
            ? `El estudio contribuye positivamente. La probabilidad subió del ${prior}% al ${posterior}% (+${delta} pp). No es definitivo, pero justifica priorizar más investigación y revisar guías. Considera la prior escéptica si el mecanismo es biológicamente incierto.`
            : delta > 0
            ? `La evidencia es modesta. La probabilidad creció del ${prior}% al ${posterior}% (+${delta} pp). En ciencia, un estudio solo con esta fuerza no cambia creencias establecidas. Se necesitan réplicas independientes antes de modificar práctica.`
            : `Con un LR de ${lr}×, este resultado no aporta información diagnóstica. La probabilidad post-estudio (${posterior}%) es prácticamente igual a la prior (${prior}%). El estudio no debería cambiar las creencias de la comunidad científica.`
          }
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: C.slateXl, textAlign: "center", lineHeight: 1.6 }}>
        Ejemplo: Prior 30% + LR 10 → Post 81% | Prior 10% + LR 2 → Post 18% — La prior importa tanto como la evidencia.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN MODULE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Modulo3ProbabilidadBayes() {
  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: C.slate, lineHeight: 1.7, maxWidth: 820, margin: "0 auto", padding: "40px 24px"
    }}>

      {/* ── MODULE HEADER ───────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: C.tealLt, borderRadius: 20, padding: "6px 14px",
          fontSize: 12, fontWeight: 700, color: C.teal,
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16
        }}>
          <span>◆</span> Módulo 3 — Fundamentos
        </div>
        <h1 style={{
          margin: 0, fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 900,
          color: C.slate, lineHeight: 1.15, letterSpacing: "-0.02em"
        }}>
          Probabilidad y Teorema de Bayes
        </h1>
        <p style={{
          marginTop: 12, fontSize: 18, color: C.slateMd, lineHeight: 1.6, maxWidth: 640
        }}>
          Del azar a las decisiones informadas: cómo cuantificar la incertidumbre en tu práctica clínica
        </p>
      </div>

      <LearningGoals goals={[
        "Construir intuición sobre qué es un evento, un espacio muestral y una probabilidad — desde cero, con ejemplos clínicos concretos",
        "Comprender la probabilidad condicional como el motor del razonamiento diagnóstico",
        "Aplicar el Teorema de Bayes para actualizar probabilidades ante nueva evidencia",
        "Interpretar sensibilidad, especificidad, LRs y valores predictivos con criterio clínico",
        "Usar el Nomograma de Fagan para calcular probabilidad posprueba sin fórmulas complejas",
        "Evitar los errores más frecuentes al interpretar resultados de pruebas diagnósticas",
      ]} />

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 1 — EL ORIGEN: QUÉ ES MEDIR LA INCERTIDUMBRE
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="1" title="¿Qué es la probabilidad y por qué importa en salud?"
        subtitle="Construyendo intuición desde los conceptos más básicos" />

      <p>
        Cada día que ejerces tu profesión de salud tomas decisiones bajo incertidumbre. ¿Tiene
        este paciente una infección bacteriana o viral? ¿La dosis actual está produciendo efecto?
        ¿Vale la pena pedir más exámenes o con los datos actuales ya es suficiente para actuar?
      </p>
      <p>
        La probabilidad es el lenguaje matemático de la incertidumbre: te da un número entre 0 y 1
        (o entre 0% y 100%) que representa qué tan posible es que algo ocurra. No elimina la duda,
        pero la hace manejable y comunicable.
      </p>

      <Callout type="memory" title="La probabilidad no predice el futuro — mide posibilidades">
        Una probabilidad de 0.7 para un evento no significa que ocurrirá. Significa que, bajo
        condiciones similares, ocurriría en 7 de cada 10 casos. El resultado individual siempre
        es incierto; la probabilidad describe el comportamiento del fenómeno a lo largo del tiempo.
      </Callout>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        1.1 Experimento, espacio muestral y eventos
      </h3>
      <p>
        Antes de hablar de probabilidad necesitamos definir tres piezas:
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, margin: "20px 0" }}>
        {[
          { title: "Experimento", emoji: "🧪",
            def: "Cualquier proceso que produce un resultado observado — incluyendo examinar a un paciente, aplicar una prueba diagnóstica o registrar un dato clínico.",
            color: C.teal },
          { title: "Espacio muestral (Ω)", emoji: "🗺️",
            def: "El conjunto completo de todos los resultados posibles del experimento. Cada resultado individual se llama punto muestral.",
            color: C.blue },
          { title: "Evento (A)", emoji: "🎯",
            def: "Un subconjunto de los puntos muestrales. Puede ser un solo resultado o varios que cumplen una condición de interés.",
            color: C.violet },
        ].map(c => (
          <div key={c.title} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "18px 16px"
          }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{c.emoji}</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: c.color, marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: C.slateMd, lineHeight: 1.6 }}>{c.def}</div>
          </div>
        ))}
      </div>

      <Callout type="info" title="Ejemplo clínico — Diagnóstico en urgencias">
        <p>Un médico de urgencias evalúa el tipo de dolor torácico. El <strong>experimento</strong> es
        la evaluación del paciente. El <strong>espacio muestral</strong> incluye todos los diagnósticos
        posibles: angina estable, síndrome coronario agudo, disección aórtica, pericarditis, embolia
        pulmonar, causas musculoesqueléticas, causas gastrointestinales, entre otros.
        El <strong>evento</strong> "causa cardiovascular" es el subconjunto de diagnósticos que involucran
        el corazón y los grandes vasos.</p>
      </Callout>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        1.2 Definición formal de probabilidad
      </h3>
      <p>
        La probabilidad de un evento A, escrita P(A), es un número entre 0 y 1 que describe qué tan
        frecuente es ese resultado en relación con todos los posibles:
      </p>

      <FormulaBox
        label="Definición clásica (eventos equiprobables)"
        formula="P(A) = Número de resultados favorables / Número total de resultados posibles"
        explanation="Válida cuando todos los resultados son igualmente posibles, como en el lanzamiento de una moneda o dado no cargado."
      />
      <FormulaBox
        label="Definición frecuentista (experimentos repetidos)"
        formula="P(A) = n(A) / m   [cuando m → ∞]"
        explanation="Si el experimento se repite m veces en condiciones idénticas y el evento A ocurre n veces, P(A) = n/m. Es la que usamos cuando conocemos datos históricos o epidemiológicos."
      />

      <div style={{
        background: C.amberLt, borderRadius: 12, padding: "18px 20px", margin: "20px 0",
        border: `1px solid #FCD34D`
      }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: C.amber, marginBottom: 8 }}>
          📋 Tres propiedades fundamentales — siempre se cumplen
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { icon: "①", rule: "0 ≤ P(A) ≤ 1", desc: "Ninguna probabilidad es negativa ni mayor que 1" },
            { icon: "②", rule: "P(Ω) = 1", desc: "La probabilidad de que ocurra algún resultado posible es 1" },
            { icon: "③", rule: "P(A∪B) = P(A)+P(B)  si A∩B=∅", desc: "Para eventos mutuamente excluyentes, las probabilidades se suman" },
          ].map(r => (
            <div key={r.icon} style={{ background: "#fff", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{r.icon}</div>
              <code style={{ fontSize: 13, color: C.amber, fontWeight: 700 }}>{r.rule}</code>
              <div style={{ fontSize: 12, color: C.slateMd, marginTop: 4 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 2 — CONTEO Y FRECUENCIAS
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="2" title="Conteo, frecuencias y construcción de probabilidades"
        subtitle="El puente entre los datos observados y las probabilidades reales" />

      <p>
        Antes de calcular probabilidades necesitas contar. En salud, los datos suelen llegar
        como tablas de frecuencias: cuántos pacientes tuvieron cierto diagnóstico, cuántos
        respondieron al tratamiento, cuántos fallecieron. Cada frecuencia relativa —
        proporción de casos sobre el total — es una estimación de probabilidad.
      </p>

      <Callout type="success" title="Ejemplo — Mortalidad infantil como probabilidad">
        <p>Si en el último año nacieron 250.000 niños y 1.900 fallecieron antes de cumplir
        un año, la probabilidad de <strong>no sobrevivir</strong> el primer año es:</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 17, textAlign: "center",
          color: C.teal, fontWeight: 700, margin: "8px 0" }}>
          P(fallece antes del año) = 1.900 / 250.000 = 0,0076 = 0,76%
        </p>
        <p>Y por complemento: P(sobrevive el primer año) = 1 − 0,0076 = 0,9924 = <strong>99,24%</strong></p>
      </Callout>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        2.1 Operaciones con eventos — Unión, Intersección, Complemento
      </h3>
      <p>
        Los eventos se pueden combinar con tres operaciones básicas, equivalentes a las
        palabras "o", "y" y "no":
      </p>

      <div style={{ overflowX: "auto", margin: "20px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse",
          border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: C.slate }}>
              {["Operación", "Notación", "Se lee", "Fórmula", "Ejemplo clínico"].map(h => (
                <th key={h} style={{ padding: "12px 14px", color: "#fff",
                  fontSize: 12, fontWeight: 600, textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Unión", "A ∪ B", "A o B (o ambos)", "P(A) + P(B) − P(A∩B)", "Paciente con hipertensión OR diabetes"],
              ["Intersección", "A ∩ B", "A y B simultáneamente", "P(A) × P(B|A)", "Paciente con hipertensión Y diabetes"],
              ["Complemento", "Aᶜ o Ā", "No A", "1 − P(A)", "Ausencia de infección bacteriana"],
            ].map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.bgCard : C.bg }}>
                {r.map((c, j) => (
                  <td key={j} style={{ padding: "12px 14px", fontSize: 13,
                    fontFamily: j === 1 || j === 3 ? "Georgia, serif" : "inherit",
                    borderBottom: `1px solid ${C.border}`, color: C.slate }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        2.2 Eventos mutuamente excluyentes vs. independientes
      </h3>
      <p>
        Estos dos conceptos se confunden frecuentemente. Son distintos y no implican el uno al otro:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "16px 0" }}>
        <div style={{
          background: "#EFF6FF", border: `2px solid ${C.blue}`, borderRadius: 12, padding: "18px"
        }}>
          <div style={{ fontWeight: 800, color: C.blue, fontSize: 14, marginBottom: 8 }}>
            🔵 Mutuamente excluyentes
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.slate }}>
            <strong>Definición:</strong> No pueden ocurrir al mismo tiempo. P(A∩B) = 0.<br/>
            <strong>Implicación:</strong> P(A∪B) = P(A) + P(B) — se suman directamente<br/>
            <strong>Ejemplo médico:</strong> Un paciente no puede tener simultáneamente "sin fiebre" y
            "con fiebre". Diagnóstico de tuberculosis activa O enfermedad de Crohn (en el sentido de
            clasificación diagnóstica en ese episodio)
          </div>
        </div>
        <div style={{
          background: "#F0FDF4", border: `2px solid ${C.teal}`, borderRadius: 12, padding: "18px"
        }}>
          <div style={{ fontWeight: 800, color: C.teal, fontSize: 14, marginBottom: 8 }}>
            🟢 Estadísticamente independientes
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.slate }}>
            <strong>Definición:</strong> El resultado de uno no afecta la probabilidad del otro. P(A|B) = P(A).<br/>
            <strong>Implicación:</strong> P(A∩B) = P(A) × P(B) — se multiplican<br/>
            <strong>Ejemplo médico:</strong> El color de pelo de un paciente y su probabilidad de tener
            apendicitis son eventos independientes. Sin embargo, tabaquismo y cáncer de pulmón NO son
            independientes.
          </div>
        </div>
      </div>

      <Callout type="warning" title="⚠️ Trampa conceptual frecuente">
        Dos eventos mutuamente excluyentes con probabilidades no nulas nunca son independientes.
        Si A ocurre, sabemos con certeza que B no ocurrió — eso cambia la probabilidad de B
        de P(B) a 0. Por definición, no son independientes.
      </Callout>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        2.3 La regla aditiva — cuando los eventos no se excluyen
      </h3>

      <FormulaBox
        label="Regla aditiva general"
        formula="P(A ∪ B) = P(A) + P(B) − P(A ∩ B)"
        explanation="La intersección se resta para evitar contarla dos veces. Si A y B son mutuamente excluyentes, P(A∩B)=0 y la fórmula se simplifica a P(A)+P(B)."
      />

      <Callout type="info" title="Ejemplo — Sala de espera hospitalaria">
        <p>En la sala de espera de una clínica hay 40 pacientes. 18 tienen diagnóstico de
        hipertensión (H), 12 tienen diabetes (D) y 7 tienen ambas condiciones. ¿Cuál es la
        probabilidad de que un paciente seleccionado al azar tenga hipertensión o diabetes?</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.teal, margin: "10px 0" }}>
          P(H ∪ D) = P(H) + P(D) − P(H ∩ D)<br/>
          = 18/40 + 12/40 − 7/40 = 23/40 = <strong>0,575 (57,5%)</strong>
        </p>
        <p>No sumamos directamente 18/40 + 12/40 porque los 7 pacientes con ambas condiciones
        quedarían contados dos veces.</p>
      </Callout>

      <Quiz
        question="Una farmacia registra que el 35% de sus clientes usan antihipertensivos (A), el 20% usan hipoglucemiantes (H) y el 10% usan ambos. ¿Cuál es la probabilidad de que un cliente use al menos uno de los dos tipos?"
        options={["55%", "45%", "35%", "10%"]}
        correct={1}
        explanation="P(A∪H) = P(A) + P(H) − P(A∩H) = 0,35 + 0,20 − 0,10 = 0,45 = 45%. Los pacientes con ambos medicamentos estarían contados dos veces si solo sumáramos, por eso se resta la intersección."
      />

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 3 — PROBABILIDAD CONDICIONAL
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="3" title="Probabilidad condicional — el corazón del razonamiento clínico"
        subtitle="Cómo nueva información actualiza nuestra certeza" />

      <p>
        La probabilidad condicional es el concepto más importante de este módulo porque es
        exactamente lo que haces cuando razonas como clínico: tienes información inicial sobre
        el paciente (antecedentes, síntomas, factores de riesgo) y cada nuevo dato que obtienes
        — un resultado de laboratorio, un signo físico, una prueba de imagen — actualiza tu
        estimación de la probabilidad de cada diagnóstico.
      </p>

      <FormulaBox
        label="Probabilidad condicional"
        formula="P(A | B) = P(A ∩ B) / P(B)"
        explanation='Se lee "probabilidad de A dado que B ya ocurrió". El símbolo | significa "dado" o "condicionado a". El evento B restringe el espacio muestral relevante: ya no es todo Ω, sino solo la parte donde B ocurrió.'
      />

      <Callout type="info" title="Ejemplo — Probabilidad respiratoria condicional al tabaquismo">
        <p>En una muestra de 30 pacientes: 18 son fumadores (F) con problemas respiratorios (R),
        2 son fumadores sin problemas respiratorios, 3 son no fumadores con problemas respiratorios
        y 7 son no fumadores sin problemas respiratorios.</p>
        <p>¿Cuál es la probabilidad de tener problemas respiratorios siendo fumador?</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.teal, margin: "10px 0" }}>
          P(R | F) = P(R ∩ F) / P(F) = (18/30) / (20/30) = 18/20 = <strong>0,90 (90%)</strong>
        </p>
        <p>El condicionamiento restringe el espacio: ya no son 30 personas, sino solo los 20 fumadores.
        De ellos, 18 tienen problemas respiratorios.</p>
      </Callout>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        3.1 La regla de la multiplicación — eventos dependientes
      </h3>
      <p>
        Cuando dos eventos son dependientes, la probabilidad de que ambos ocurran se calcula
        multiplicando:
      </p>

      <FormulaBox
        label="Regla multiplicativa general"
        formula="P(A ∩ B) = P(A) × P(B | A) = P(B) × P(A | B)"
        explanation="Para eventos independientes, P(B|A) = P(B), lo que simplifica la fórmula a P(A)×P(B)."
      />

      <Callout type="success" title="Ejemplo — Extracción de pacientes sin reposición">
        <p>En una sala de urgencias hay 5 pacientes con dolor abdominal (A), 7 con heridas
        contusas (H) y 8 con fiebre alta (F) — total 20 pacientes. Se atienden consecutivamente
        sin reposición. ¿Cuál es la probabilidad de que el primero tenga herida contusa, el
        segundo fiebre y el tercero dolor abdominal?</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.teal, margin: "10px 0" }}>
          P(H₁ ∩ F₂ ∩ A₃) = (7/20) × (8/19) × (5/18) = 280/6840 ≈ <strong>0,041 (4,1%)</strong>
        </p>
        <p>Los denominadores disminuyen porque cada paciente atendido sale del grupo. Es un caso
        de eventos dependientes (sin reposición).</p>
      </Callout>

      <Quiz
        question="Dos enfermeras trabajan en turnos independientes. La enfermera A comete un error de medicación con probabilidad 0,03 y la enfermera B con probabilidad 0,05. ¿Cuál es la probabilidad de que ambas cometan un error en el mismo turno?"
        options={["0,15%", "0,08%", "8,0%", "0,015%"]}
        correct={0}
        explanation="Al ser eventos independientes: P(A∩B) = P(A) × P(B) = 0,03 × 0,05 = 0,0015 = 0,15%. Es un valor bajo, pero recuerda que los errores de medicación con consecuencias graves justifican protocolos de verificación incluso para probabilidades pequeñas."
      />

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 4 — PROBABILIDAD TOTAL Y TEOREMA DE BAYES
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="4" title="De la probabilidad total al Teorema de Bayes"
        subtitle="El motor matemático del razonamiento diagnóstico" />

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800 }}>
        4.1 El teorema de la probabilidad total
      </h3>
      <p>
        En muchas situaciones el espacio muestral está dividido en particiones exhaustivas y
        mutuamente excluyentes (B₁, B₂, ..., Bₖ — grupos que juntos cubren todos los casos posibles).
        La probabilidad total de que ocurra un evento A de interés es la suma de probabilidades
        en cada partición, ponderadas por el tamaño de cada grupo:
      </p>

      <FormulaBox
        label="Teorema de la probabilidad total"
        formula="P(A) = Σ P(A | Bⱼ) × P(Bⱼ)"
        explanation="Suma sobre todas las particiones j = 1, 2, ..., k. Es la probabilidad global del evento A teniendo en cuenta que la población está compuesta por distintos subgrupos."
      />

      <Callout type="success" title="Ejemplo — Cepillado dental y nivel educativo materno">
        <p>Una encuesta nacional registra la conducta de cepillarse los dientes después de almorzar
        según el nivel educativo de la madre: madres con enseñanza primaria (47% del total) tienen
        hijos que se cepillan con P=0,84; madres con educación secundaria (31,7%) con P=0,89;
        madres con educación superior (21,3%) con P=0,93.</p>
        <p>¿Cuál es la probabilidad total de que un niño se cepille los dientes?</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.teal, margin: "10px 0", lineHeight: 1.8 }}>
          P(C) = 0,84 × 0,470 + 0,89 × 0,317 + 0,93 × 0,213<br/>
          = 0,395 + 0,282 + 0,198 = <strong>0,875 (87,5%)</strong>
        </p>
        <p>Cada grupo aporta su probabilidad condicional ponderada por su tamaño relativo en la población.</p>
      </Callout>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        4.2 El Teorema de Bayes — invertir el condicionamiento
      </h3>
      <p>
        El Teorema de la Probabilidad Total responde: "¿cuál es la probabilidad global de A?"
        El Teorema de Bayes responde una pregunta diferente y más poderosa: <strong>dado que A
        ya ocurrió, ¿de cuál partición proviene?</strong>
      </p>
      <p>
        En diagnóstico clínico la pregunta se invierte. Sabes el resultado de la prueba
        (A ya ocurrió: el test es positivo). Quieres saber la probabilidad de la enfermedad (Bᵢ)
        dado ese resultado.
      </p>

      <FormulaBox
        label="Teorema de Bayes"
        formula="P(Bᵢ | A) = [P(A | Bᵢ) × P(Bᵢ)] / Σ P(A | Bⱼ) × P(Bⱼ)"
        explanation="El numerador es la probabilidad conjunta de A y Bᵢ. El denominador es la probabilidad total de A (suma sobre todas las particiones). El resultado es la probabilidad actualizada de la partición Bᵢ dado que observamos A."
      />

      <div style={{
        background: C.slate, borderRadius: 14, padding: "22px 26px", margin: "24px 0", color: "#fff"
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FCD34D",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
          Las tres piezas del Teorema de Bayes
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "Prior (P(Bᵢ))", color: "#34D399", desc: "Probabilidad antes de la prueba. Viene de la prevalencia, la epidemiología, los factores de riesgo y tu experiencia." },
            { name: "Verosimilitud (P(A|Bᵢ))", color: "#60A5FA", desc: "Probabilidad de observar ese resultado dado que el paciente tiene la condición. Es la sensibilidad y especificidad de tu prueba." },
            { name: "Posterior (P(Bᵢ|A))", color: "#F87171", desc: "Probabilidad después de la prueba. Es lo que buscas: la probabilidad actualizada de la enfermedad dado el resultado observado." },
          ].map(p => (
            <div key={p.name} style={{
              background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px"
            }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: p.color, marginBottom: 8 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#CBD5E1", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <ClinicalCase title="TDAH y probabilidad bayesiana en contexto escolar" profession="Psicología / Educación en salud">
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          En una escuela hay tres cursos de cuarto grado. El primer y segundo curso tienen el 30%
          de los alumnos cada uno, y el tercero el 40% restante. Las prevalencias de TDAH son 20%,
          16% y 31% respectivamente.
        </p>
        <p style={{ fontSize: 14, marginTop: 8, fontStyle: "italic", color: C.slateMd }}>
          Pregunta: Un alumno seleccionado al azar tiene TDAH. ¿Cuál es la probabilidad de que
          provenga del segundo curso?
        </p>
        <div style={{ background: C.bg, borderRadius: 8, padding: "14px 16px", marginTop: 12 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.teal, lineHeight: 2 }}>
            P(A) = 0,20×0,30 + 0,16×0,30 + 0,31×0,40 = 0,060 + 0,048 + 0,124 = 0,232<br/>
            P(C₂|TDAH) = (0,16 × 0,30) / 0,232 = 0,048 / 0,232 ≈ <strong>0,207 (20,7%)</strong>
          </div>
        </div>
        <p style={{ fontSize: 13, color: C.slateMd, marginTop: 10 }}>
          Aunque el segundo curso tiene la prevalencia más baja de TDAH (16%), dado su tamaño relativo,
          contribuye con el 20,7% de los casos totales. Bayes nos permite ir de "¿cuántos casos hay
          en cada grupo?" a "¿dado este caso, de qué grupo proviene?".
        </p>
      </ClinicalCase>

      <ClinicalCase title="Depresión en médicos rurales — riesgo por región" profession="Salud Pública / Medicina Laboral">
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          Tres provincias rurales concentran médicos de centros de salud públicos. En la Provincia A
          (32,8% de los médicos) la probabilidad histórica de depresión es 15%; en la B (31,0%)
          es 21,4%; en la C (36,2%) es 38,9%.
        </p>
        <p style={{ fontSize: 14, marginTop: 8, fontStyle: "italic", color: C.slateMd }}>
          Pregunta: Se identifica un médico con depresión. ¿Con qué probabilidad pertenece a la Provincia C?
        </p>
        <div style={{ background: C.bg, borderRadius: 8, padding: "14px 16px", marginTop: 12 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.teal, lineHeight: 2 }}>
            P(D) = 0,150×0,328 + 0,214×0,310 + 0,389×0,362<br/>
            = 0,049 + 0,066 + 0,141 = 0,256<br/>
            P(C|D) = (0,389 × 0,362) / 0,256 = 0,141 / 0,256 ≈ <strong>0,549 (54,9%)</strong>
          </div>
        </div>
        <p style={{ fontSize: 13, color: C.slateMd, marginTop: 10 }}>
          La Provincia C tiene tanto la mayor tasa de depresión como el mayor número de médicos.
          Bayes cuantifica su contribución: el 54,9% de los médicos deprimidos en estas tres provincias
          provienen de la Provincia C, lo que orienta dónde enfocar intervenciones de salud mental laboral.
        </p>
      </ClinicalCase>

      <Quiz
        question="Un psiquiatra sabe que el 45% de sus pacientes proviene de sectores con privación social. La probabilidad de trastorno mental en sectores con privación es el triple que en sectores sin privación (0,12). ¿Cuál es la probabilidad aproximada de trastorno mental en la población total de pacientes?"
        options={["18%", "24,6%", "36%", "12%"]}
        correct={1}
        explanation="P(TM) = P(TM|Privación)×P(Privación) + P(TM|Sin privación)×P(Sin privación) = 0,36×0,45 + 0,12×0,55 = 0,162 + 0,066 = 0,228 ≈ 24,6%. La tasa en sectores con privación (3×0,12=0,36) ponderada por la proporción de pacientes de ese sector."
      />

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 4.5 — BAYES MÁS ALLÁ DEL DIAGNÓSTICO
      ═══════════════════════════════════════════════════════ */}
      <div style={{ borderTop: `3px solid ${C.violet}`, paddingTop: 32, marginTop: 56, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{
            background: C.violet, color: "#fff", width: 44, height: 44,
            borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 15, flexShrink: 0, marginTop: 2
          }}>4+</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.slate, lineHeight: 1.2 }}>
              Bayes más allá del diagnóstico clínico
            </h2>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: C.slateMd }}>
              La misma lógica que actualiza una probabilidad diagnóstica actualiza el conocimiento científico
            </p>
          </div>
        </div>
      </div>

      <p>
        Hasta ahora hemos visto el Teorema de Bayes en su versión más conocida en ciencias de la salud:
        actualizar la probabilidad de que un <em>paciente</em> tenga una enfermedad ante un resultado
        diagnóstico. Pero la misma estructura mental —<strong>probabilidad previa + nueva evidencia =
        probabilidad actualizada</strong>— opera a una escala mucho mayor: en el proceso de generación
        del conocimiento científico.
      </p>

      <div style={{
        background: C.violetLt, border: `2px solid ${C.violet}`,
        borderRadius: 14, padding: "22px 26px", margin: "24px 0"
      }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: C.violet, marginBottom: 12 }}>
          🔬 El ciclo bayesiano de la ciencia médica
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 12,
          alignItems: "center" }}>
          {[
            { label: "Probabilidad pre-estudio", desc: "Lo que la comunidad científica creía antes del ensayo", icon: "🧪" },
            null,
            { label: "Nueva evidencia (ensayo clínico)", desc: "El cociente de verosimilitud del estudio: cuán compatible son los datos con cada hipótesis", icon: "📄" },
            null,
            { label: "Probabilidad post-estudio", desc: "Lo que debe creer la ciencia tras integrar el ensayo con todo lo previo", icon: "💡" },
          ].map((item, i) => item === null ? (
            <div key={i} style={{ textAlign: "center", fontSize: 24, color: C.violet, fontWeight: 800 }}>→</div>
          ) : (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "14px 16px",
              border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.slate, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: C.slateMd, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <p>
        Imagina un nuevo fármaco antihipertensivo. Antes de leer el ensayo clínico, la comunidad
        científica tiene una <strong>probabilidad previa</strong> de que el fármaco sea efectivo —
        basada en su mecanismo de acción, estudios fase I y II, y evidencia análoga de su clase
        farmacológica. Al publicarse el ensayo con un HR significativo, esa probabilidad se actualiza.
        Pero si el ensayo tiene poder estadístico bajo o sesgos estructurales, el "factor de actualización"
        es débil, y la probabilidad posterior no debería alejarse demasiado de la prior. Esta es
        exactamente la lógica que conecta este módulo con el <strong>Módulo 5</strong> (por qué p &lt; 0.05
        no es suficiente) y con el <strong>Módulo 8</strong> (cómo interpretar los modelos multivariantes).
      </p>

      <BayesEvidenceUpdater />

      <Callout type="info" title="Conexión con los módulos siguientes">
        <p>
          La distinción entre análisis <strong>confirmatorio</strong> (hipótesis preregistrada, diseño
          calculado) y <strong>exploratorio</strong> (búsqueda de señales, generador de hipótesis) es
          bayesiana en esencia: en el confirmatorio, la prior está bien definida antes de ver los datos.
          En el exploratorio, la prior es vaga y los resultados deben replicarse antes de actualizar
          creencias con fuerza. Hablaremos de esto en profundidad en el{" "}
          <strong>Módulo 10 (Ética estadística)</strong>.
        </p>
      </Callout>

      <Callout type="warning" title="Un error frecuente en metaanálisis">
        <p>
          Cuando leas un metaanálisis con un diamante significativo (p &lt; 0.05), pregúntate:
          ¿cuál era la probabilidad pre-estudio de que esta intervención funcionara? Si los estudios
          individuales son pequeños, heterogéneos y con riesgo de sesgo alto, el Teorema de Bayes
          sugiere que incluso un metaanálisis con p &lt; 0.05 puede no cambiar drásticamente una
          prior escéptica. La significancia estadística actualiza la probabilidad; no la reemplaza.
        </p>
      </Callout>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 5 — PRUEBAS DIAGNÓSTICAS
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="5" title="Bayes aplicado: sensibilidad, especificidad y valores predictivos"
        subtitle="La arquitectura de cualquier prueba diagnóstica" />

      <p>
        Toda prueba diagnóstica — un análisis de sangre, una escala de cribado, una imagen —
        puede cometer dos tipos de error: decir que la enfermedad está cuando no está
        (falso positivo) y decir que no está cuando sí está (falso negativo). La tabla 2×2
        captura estos cuatro escenarios posibles y es la base de todos los cálculos diagnósticos.
      </p>

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 24 }}>
        5.1 La tabla 2×2 — la infraestructura del diagnóstico
      </h3>
      <p>
        El siguiente ejemplo usa datos de tuberculosis: 2.345 pacientes examinados con rayos X,
        de los cuales 40 tenían tuberculosis real. 92 salieron positivos en el examen.
      </p>

      <TableContingencia data={{ tp: 31, fp: 61, fn: 9, tn: 2244 }} />

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        5.2 Las cuatro métricas clave — definición y fórmulas
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
        {[
          { title: "Sensibilidad", emoji: "🔍", color: C.teal,
            formula: "VP / (VP + FN)",
            def: "Probabilidad de que la prueba sea positiva en alguien que SÍ tiene la condición. Mide cuántos enfermos captura la prueba.",
            mnemo: "Alta sensibilidad → pocos falsos negativos. Útil para descartar (SnNout: Sensitivity Negative rules OUT)" },
          { title: "Especificidad", emoji: "🎯", color: C.blue,
            formula: "VN / (VN + FP)",
            def: "Probabilidad de que la prueba sea negativa en alguien que NO tiene la condición. Mide cuántos sanos identifica correctamente la prueba.",
            mnemo: "Alta especificidad → pocos falsos positivos. Útil para confirmar (SpPin: Specificity Positive rules IN)" },
          { title: "Valor Predictivo Positivo (VPP)", emoji: "✅", color: C.amber,
            formula: "VP / (VP + FP)",
            def: "Probabilidad de que alguien con resultado positivo realmente tenga la condición. Depende de la prevalencia.",
            mnemo: "El VPP sube cuando la prevalencia sube y cuando la especificidad es alta" },
          { title: "Valor Predictivo Negativo (VPN)", emoji: "⬜", color: C.violet,
            formula: "VN / (VN + FN)",
            def: "Probabilidad de que alguien con resultado negativo realmente NO tenga la condición. También depende de la prevalencia.",
            mnemo: "El VPN sube cuando la prevalencia baja y cuando la sensibilidad es alta" },
        ].map(m => (
          <div key={m.title} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "18px 16px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>{m.emoji}</span>
              <div style={{ fontWeight: 800, fontSize: 14, color: m.color }}>{m.title}</div>
            </div>
            <code style={{ fontSize: 13, color: m.color, fontWeight: 700, background: C.bg,
              padding: "4px 10px", borderRadius: 6, display: "block", marginBottom: 8 }}>
              {m.formula}
            </code>
            <div style={{ fontSize: 13, color: C.slateMd, lineHeight: 1.6, marginBottom: 8 }}>{m.def}</div>
            <div style={{ fontSize: 12, color: C.slateXl, fontStyle: "italic", lineHeight: 1.5 }}>💡 {m.mnemo}</div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 6 — LIKELIHOOD RATIOS Y NOMOGRAMA
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="6" title="Likelihood Ratios y el Nomograma de Fagan"
        subtitle="El puente entre la probabilidad preprueba y posprueba" />

      <p>
        Sensibilidad y especificidad son propiedades fijas de la prueba, pero no te dicen directamente
        cuánto cambia la probabilidad en tu paciente específico. Para eso existen las Razones de
        Verosimilitud (Likelihood Ratios, LR), que cuantifican exactamente cuánto se desplaza la
        aguja de la probabilidad con cada resultado.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
        <div style={{ background: "#F0FDF4", border: `2px solid ${C.teal}`, borderRadius: 12, padding: "20px" }}>
          <div style={{ fontWeight: 800, color: C.teal, fontSize: 14, marginBottom: 10 }}>
            LR+ (resultado positivo)
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.teal,
            fontWeight: 700, marginBottom: 10 }}>
            LR+ = Sensibilidad / (1 − Especificidad)
          </div>
          <div style={{ fontSize: 13, color: C.slateMd, lineHeight: 1.7 }}>
            Es cuántas veces más probable obtener un resultado positivo en una persona enferma que
            en una sana. <strong>LR+ de 5</strong> significa que un positivo es 5 veces más probable
            en enfermos que en sanos.
          </div>
        </div>
        <div style={{ background: "#EDE9FE", border: `2px solid ${C.violet}`, borderRadius: 12, padding: "20px" }}>
          <div style={{ fontWeight: 800, color: C.violet, fontSize: 14, marginBottom: 10 }}>
            LR− (resultado negativo)
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.violet,
            fontWeight: 700, marginBottom: 10 }}>
            LR− = (1 − Sensibilidad) / Especificidad
          </div>
          <div style={{ fontSize: 13, color: C.slateMd, lineHeight: 1.7 }}>
            Es cuántas veces más probable obtener un resultado negativo en un enfermo que en un sano.
            <strong> LR− de 0,1</strong> significa que un negativo es 10 veces menos probable si
            la persona está realmente enferma — muy útil para descartar.
          </div>
        </div>
      </div>

      <LRScale />

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        6.1 El Nomograma de Fagan — Bayes hecho visual
      </h3>
      <p>
        El Nomograma de Fagan es la materialización visual del Teorema de Bayes para pruebas
        diagnósticas. Tiene tres columnas: probabilidad preprueba (izquierda), LR (centro) y
        probabilidad posprueba (derecha). Una línea recta que une la preprueba con el LR indica
        la posprueba donde corta la columna derecha. Cero cálculos manuales.
      </p>

      <NomogramaFagan />

      <h3 style={{ color: C.slate, fontSize: 17, fontWeight: 800, marginTop: 28 }}>
        6.2 Casos trabajados paso a paso
      </h3>

      <ClinicalCase title="Resistencia a la insulina en consulta de nutrición" profession="Nutrición / Endocrinología">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <p><strong>Escenario:</strong> En tu consulta de nutrición, estimas que el 20% de los pacientes
          con obesidad tienen resistencia a la insulina no diagnosticada (probabilidad preprueba = 20%).
          Usas el índice HOMA-IR como prueba de cribado: Sensibilidad 85%, Especificidad 90%.</p>
          <div style={{ background: C.bg, borderRadius: 8, padding: "12px 16px", margin: "12px 0",
            fontFamily: "Georgia, serif", color: C.teal, lineHeight: 2 }}>
            LR+ = 0,85 / (1 − 0,90) = 0,85 / 0,10 = <strong>8,5</strong><br/>
            LR− = (1 − 0,85) / 0,90 = 0,15 / 0,90 = <strong>0,17</strong>
          </div>
          <p><strong>Con resultado positivo:</strong> Une 20% (preprueba) con LR+ 8,5 en el nomograma →
          probabilidad posprueba ≈ <strong>68%</strong>. Justifica iniciar evaluación adicional o medidas preventivas.</p>
          <p><strong>Con resultado negativo:</strong> Une 20% con LR− 0,17 →
          probabilidad posprueba ≈ <strong>4%</strong>. Permite descartar razonablemente la condición.</p>
        </div>
      </ClinicalCase>

      <ClinicalCase title="Cribado de VIH en feria de salud comunitaria" profession="Enfermería / Salud Pública">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <p><strong>Escenario:</strong> Un joven sin factores de riesgo acude a un stand de cribado.
          La prevalencia en esa población es muy baja: 0,1%. La prueba tiene Sensibilidad 99,9%
          y Especificidad 99,5%.</p>
          <div style={{ background: C.bg, borderRadius: 8, padding: "12px 16px", margin: "12px 0",
            fontFamily: "Georgia, serif", color: C.teal, lineHeight: 2 }}>
            LR+ = 0,999 / 0,005 ≈ <strong>200</strong><br/>
            P(posprueba positiva) ≈ <strong>16,7%</strong>
          </div>
          <p><strong>Conclusión crítica:</strong> Aunque el LR+ es altísimo (200), la probabilidad posprueba
          solo llega al 16,7% porque la preprueba era ínfima (0,1%). Un positivo aislado en cribado de baja
          prevalencia no es diagnóstico. <strong>Siempre se debe confirmar con una segunda prueba</strong> antes
          de comunicar el diagnóstico.</p>
          <Callout type="danger" title="Error grave frecuente">
            Comunicar un diagnóstico de VIH basado solo en un primer cribado positivo en población
            de bajo riesgo. Con prevalencia 0,1%, más del 83% de los positivos son falsos positivos.
          </Callout>
        </div>
      </ClinicalCase>

      <ClinicalCase title="Escala GAD-7 para ansiedad en atención primaria" profession="Psicología / Medicina de Familia">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <p><strong>Escenario:</strong> Se aplica el GAD-7 (punto de corte ≥10) a una persona que consulta
          por "nervios". En atención primaria, la prevalencia de trastorno de ansiedad generalizada es ~15%.
          El GAD-7 tiene Sensibilidad 89% y Especificidad 82%.</p>
          <div style={{ background: C.bg, borderRadius: 8, padding: "12px 16px", margin: "12px 0",
            fontFamily: "Georgia, serif", color: C.teal, lineHeight: 2 }}>
            LR+ = 0,89 / 0,18 = <strong>4,9</strong><br/>
            LR− = 0,11 / 0,82 = <strong>0,13</strong><br/><br/>
            Cribado positivo (≥10): posprueba ≈ <strong>46%</strong> → evaluación diagnóstica completa<br/>
            Cribado negativo (&lt;10): posprueba ≈ <strong>2%</strong> → muy tranquilizador
          </div>
          <p><strong>Lectura clínica:</strong> Un GAD-7 positivo no diagnostica ansiedad, pero casi
          triplica la probabilidad y justifica una evaluación estructurada. Un GAD-7 negativo
          — con un LR− de 0,13 — reduce la probabilidad de 15% a apenas 2%, lo que tiene alto
          valor para excluir el diagnóstico.</p>
        </div>
      </ClinicalCase>

      <ClinicalCase title="Adherencia terapéutica en farmacia comunitaria" profession="Farmacia / Atención Primaria">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <p><strong>Escenario:</strong> Un farmacéutico aplica el test de Morisky-Green (4 preguntas)
          a pacientes polimedicados crónicos. Estima que el 40% son no adherentes. El test tiene
          Sensibilidad 70% y Especificidad 80%.</p>
          <div style={{ background: C.bg, borderRadius: 8, padding: "12px 16px", margin: "12px 0",
            fontFamily: "Georgia, serif", color: C.teal, lineHeight: 2 }}>
            LR+ = 0,70 / 0,20 = <strong>3,5</strong> → posprueba positiva ≈ <strong>70%</strong><br/>
            LR− = 0,30 / 0,80 = <strong>0,375</strong> → posprueba negativa ≈ <strong>20%</strong>
          </div>
          <p><strong>Lectura clínica:</strong> El test ayuda a orientar, pero no es definitivo. Un positivo
          justifica una intervención educativa intensiva. Un negativo no descarta completamente la falta
          de adherencia — con un 20% de probabilidad residual, vale la pena monitorizar igualmente.</p>
        </div>
      </ClinicalCase>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 7 — EL IMPACTO DE LA PREVALENCIA
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="7" title="El rol de la prevalencia — la variable que más se olvida"
        subtitle="Por qué el mismo test puede ser útil en un contexto e inútil en otro" />

      <p>
        La sensibilidad y la especificidad son propiedades intrínsecas de la prueba — se mantienen
        relativamente estables entre poblaciones. Pero el VPP y el VPN dependen críticamente de
        la prevalencia de la enfermedad en la población que estudias. Este es el error más frecuente
        en interpretación de pruebas.
      </p>

      <PrevalenceExplorer />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0" }}>
        <Callout type="success" title="Alta prevalencia — resultado positivo es más confiable">
          En un brote de gripe invernal (prevalencia alta), un test rápido positivo en un paciente
          con fiebre y tos casi confirma el diagnóstico. El VPP es alto porque hay muchos enfermos
          entre los que se evalúan. Los falsos positivos son minoría.
        </Callout>
        <Callout type="warning" title="Baja prevalencia — positivos requieren confirmación">
          En un cribado de cáncer de mama en mujeres jóvenes sin antecedentes (prevalencia muy baja),
          un resultado positivo tiene alta probabilidad de ser falso positivo. El VPN excelente sirve
          para descartar con seguridad, pero el VPP bajo exige confirmación antes de actuar.
        </Callout>
      </div>

      <Callout type="info" title="La regla de oro del cribado en baja prevalencia">
        <p>En cribados poblacionales, la función principal es <strong>excluir la enfermedad con
        alta confianza en los negativos</strong> (VPN alto). Los positivos siempre necesitan
        confirmación con una prueba más específica. Esto no es un defecto del cribado —
        es su diseño correcto.</p>
      </Callout>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 8 — ERRORES FRECUENTES
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="8" title="Errores frecuentes — y cómo evitarlos"
        subtitle="El conocimiento sin aplicación correcta puede ser más peligroso que la ignorancia" />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "20px 0" }}>
        {[
          { error: "Confundir sensibilidad con VPP",
            detail: "Una prueba muy sensible no garantiza que un positivo confirme la condición. El VPP depende también de prevalencia y especificidad.",
            fix: "Antes de interpretar un resultado, define mentalmente la probabilidad preprueba: '¿qué tan probable era esta condición antes de hacer la prueba?'",
            color: C.rose },
          { error: "Ignorar la prevalencia",
            detail: "Aplicar un test sin considerar si estás en alta o baja prevalencia lleva a sobrestimar o subestimar su utilidad.",
            fix: "Pregúntate siempre: '¿cuánta gente en esta población realmente tiene esta condición?' antes de interpretar cualquier resultado.",
            color: C.amber },
          { error: "No usar los Likelihood Ratios",
            detail: "Muchos profesionales se limitan a sensibilidad/especificidad y se pierden la única métrica que conecta directamente con el cambio de probabilidad.",
            fix: "Acostúmbrate a buscar el LR de las pruebas que usas. Un LR+ de 10 cambia todo; un LR+ de 1,5 no cambia nada.",
            color: C.violet },
          { error: "Interpretar el resultado sin contexto",
            detail: "El resultado de una prueba es solo una pieza del rompecabezas. Ignorar la historia clínica, síntomas y factores sociales conduce a errores graves.",
            fix: "Integra siempre la información clínica y el contexto del paciente. Las probabilidades son bayesianas por naturaleza: se actualizan con cada nuevo dato.",
            color: C.blue },
          { error: "Comunicar un diagnóstico basado en un solo cribado positivo en baja prevalencia",
            detail: "En poblaciones de bajo riesgo, la mayoría de los positivos son falsos positivos — incluso con pruebas muy buenas.",
            fix: "En cribado de bajo riesgo, un positivo requiere siempre confirmación diagnóstica con prueba de referencia (gold standard) antes de comunicar el diagnóstico.",
            color: C.rose },
        ].map((e, i) => (
          <div key={i} style={{
            background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12,
            overflow: "hidden", display: "grid", gridTemplateColumns: "4px 1fr"
          }}>
            <div style={{ background: e.color }} />
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: e.color, marginBottom: 6 }}>
                ✗ {e.error}
              </div>
              <div style={{ fontSize: 13, color: C.slateMd, marginBottom: 8, lineHeight: 1.6 }}>{e.detail}</div>
              <div style={{ fontSize: 13, color: C.slate, fontWeight: 600, lineHeight: 1.6 }}>
                <span style={{ color: C.teal }}>✓ Antídoto: </span>{e.fix}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          AUTOEVALUACIONES FINALES
      ═══════════════════════════════════════════════════════ */}
      <SectionHeader number="9" title="Autoevaluación — pon a prueba tu comprensión" />

      <Quiz
        question="Una prueba diagnóstica tiene Sensibilidad 95% y Especificidad 95%. Se aplica a una población donde la prevalencia es del 1%. ¿Cuál es el Valor Predictivo Positivo aproximado?"
        options={["95%", "50%", "16%", "99%"]}
        correct={2}
        explanation="Con N=10.000: 100 enfermos (1%), de los cuales 95 son VP. De los 9.900 sanos, el 5% son FP = 495. VPP = 95 / (95+495) = 95/590 ≈ 16,1%. Aunque la prueba es excelente (95%/95%), la baja prevalencia hace que los falsos positivos superen a los verdaderos positivos. Este es el efecto más contraintuitivo de la probabilidad diagnóstica."
      />

      <Quiz
        question="Un médico aplica un test con LR+ = 0,5 a un paciente. ¿Qué concluye sobre la utilidad diagnóstica de este resultado positivo?"
        options={[
          "El resultado confirma moderadamente la enfermedad",
          "El resultado prácticamente no cambia la probabilidad de enfermedad",
          "Un LR+ de 0,5 es imposible — siempre debe ser mayor que 1",
          "El resultado reduce la probabilidad de enfermedad",
        ]}
        correct={3}
        explanation="LR+ = 0,5 significa que un resultado positivo es 2 veces MENOS probable en enfermos que en sanos — lo que reduce la probabilidad de enfermedad. Aunque se llama LR+ porque describe el escenario de test positivo, puede ser menor que 1 si la prueba tiene baja sensibilidad y/o alta especificidad en el punto de corte elegido. Un LR entre 0,5 y 2 no aporta información clínica significativa."
      />

      <Quiz
        question="¿Cuál de los siguientes factores afecta el Valor Predictivo Positivo de una prueba pero NO afecta su Sensibilidad?"
        options={[
          "El punto de corte de la prueba",
          "La variabilidad en la técnica de aplicación",
          "La prevalencia de la condición en la población evaluada",
          "La calidad de los reactivos utilizados",
        ]}
        correct={2}
        explanation="La sensibilidad es una propiedad intrínseca de la prueba — describe la proporción de verdaderos positivos entre todos los enfermos. No depende de cuántos enfermos hay en la población (prevalencia). El VPP, en cambio, sí depende de la prevalencia porque si hay muy pocos enfermos, incluso con alta sensibilidad habrá relativamente más falsos positivos que verdaderos positivos."
      />

      {/* ═══════════════════════════════════════════════════════
          CIERRE DEL MÓDULO
      ═══════════════════════════════════════════════════════ */}
      <div style={{
        background: `linear-gradient(135deg, ${C.slate} 0%, #334155 100%)`,
        borderRadius: 16, padding: "32px 36px", margin: "48px 0 32px", color: "#fff"
      }}>
        <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>
          Cierre del Módulo — Lo que llevas en tu caja de herramientas
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            "El Teorema de Bayes no es solo una fórmula — es el modelo mental del razonamiento clínico bajo incertidumbre",
            "Sensibilidad y especificidad son propiedades fijas de la prueba. VPP y VPN cambian con la prevalencia",
            "Los Likelihood Ratios son el puente entre la probabilidad preprueba y posprueba. Apréndetelos como segunda naturaleza",
            "Un positivo en baja prevalencia casi siempre necesita confirmación — la aritmética lo exige, no la prudencia",
            "El Nomograma de Fagan te da la probabilidad posprueba en segundos, sin calculadora",
            "La prevalencia no es un dato secundario — es el primer dato que debes estimar antes de interpretar cualquier resultado",
          ].map((t, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 14px",
              fontSize: 13, lineHeight: 1.6, color: "#E2E8F0",
              display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <span style={{ color: "#34D399", flexShrink: 0, fontWeight: 800 }}>◆</span>
              {t}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 20, padding: "16px 18px", background: "rgba(255,255,255,0.06)",
          borderRadius: 10, fontSize: 14, color: "#CBD5E1", lineHeight: 1.7,
          borderLeft: "3px solid #34D399"
        }}>
          En el próximo módulo exploraremos los <strong style={{ color: "#34D399" }}>sesgos más frecuentes
          en investigación en salud</strong> — cómo identificarlos, cómo afectan la validez de los estudios
          y cómo fortalecer tu criterio al leer evidencia científica.
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          RECURSOS Y BIBLIOGRAFÍA
      ═══════════════════════════════════════════════════════ */}
      <div className="mt-12 rounded-xl border border-gray-300 bg-gradient-to-r from-slate-50 to-gray-50 p-6 shadow-inner">
        <h2 className="mt-0 flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpen className="h-6 w-6" /> Recursos Curados para Profundizar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-semibold text-slate-800">📖 Lecturas Fundamentales</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Reyes-Reyes, A. & Reyes-Reyes, F. (2019). <em>Probabilidad y aplicaciones en ciencias de la salud.</em> Universidad Santo Tomás / Universidad del Desarrollo, Chile.
                <span className="block text-xs text-gray-500">Texto base de este módulo, con enfoque clínico directo.</span>
              </li>
              <li>
                Sackett, D. L., Straus, S. E., Richardson, W. S., Rosenberg, W. & Haynes, R. B. (2000). <em>Evidence-Based Medicine: How to Practice and Teach EBM</em> (2ª ed.). Churchill Livingstone.
                <span className="block text-xs text-gray-500">El texto clásico de MBE, con capítulos completos sobre LR y probabilidad posprueba.</span>
              </li>
              <li>
                McGee, S. (2012). <em>Evidence-Based Physical Diagnosis</em> (3ª ed.). Elsevier Saunders.
                <span className="block text-xs text-gray-500">Referencia magistral para los LR de signos, síntomas y pruebas físicas.</span>
              </li>
              <li>
                Greenhalgh, T. (2019). <em>How to Read a Paper: The Basics of Evidence-Based Medicine</em> (6ª ed.). BMJ Books / Wiley.
                <span className="block text-xs text-gray-500">El capítulo 7 trata las pruebas diagnósticas con claridad ejemplar.</span>
              </li>
              <li>
                Juez, P. & Diez, F. J. (1997). <em>Probabilidad y estadística en medicina.</em> Díaz de Santos.
                <span className="block text-xs text-gray-500">Enfoque formal con aplicaciones directas al diagnóstico clínico.</span>
              </li>
              <li>
                Pagano, M. & Gauvreau, K. (2001). <em>Fundamentos de bioestadística</em> (2ª ed.). Thomson Learning.
                <span className="block text-xs text-gray-500">Muy accesible para profesionales de la salud sin formación matemática avanzada.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">🎬 Videos y Recursos Online</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>
                Seeing Theory (Brown University):{" "}
                <a href="https://seeing-theory.brown.edu" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  seeing-theory.brown.edu
                </a>
                <span className="block text-xs text-gray-500">Visualizaciones interactivas de probabilidad, inferencia bayesiana y distribuciones — ideal para construir intuición.</span>
              </li>
              <li>
                Nomograma de Fagan — UIC (interactivo):{" "}
                <a href="https://araw.mede.uic.edu/cgi-bin/testcalc.pl" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  araw.mede.uic.edu
                </a>
                <span className="block text-xs text-gray-500">Calculadora oficial del Nomograma de Fagan: introduces preprueba y LR y obtienes la posprueba.</span>
              </li>
              <li>
                MDCalc — Calculadoras clínicas:{" "}
                <a href="https://www.mdcalc.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  mdcalc.com
                </a>
                <span className="block text-xs text-gray-500">Scores clínicos con LRs incorporados: Wells (TEP), HEART score (SCA), STONE score (litiasis) y muchos más.</span>
              </li>
              <li>
                OpenEpi — Epidemiología en línea:{" "}
                <a href="https://www.openepi.com/TwobyTwo/TwobyTwo.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  openepi.com
                </a>
                <span className="block text-xs text-gray-500">Calcula automáticamente sensibilidad, especificidad, VPP, VPN y LRs a partir de una tabla 2×2.</span>
              </li>
              <li>
                JAMA Rational Clinical Examination Series:{" "}
                <a href="https://jamanetwork.com/collections/44038/the-rational-clinical-examination" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  jamanetwork.com
                </a>
                <span className="block text-xs text-gray-500">Serie de artículos revisados sistemáticamente con LR de signos y síntomas clínicos.</span>
              </li>
              <li>
                Canal de YouTube: StatQuest with Josh Starmer — "Bayes' Theorem".
                <span className="block text-xs text-gray-500">Explicación visual y memorable del Teorema de Bayes paso a paso.</span>
              </li>
              <li>
                Khan Academy — Estadística y probabilidad (español):{" "}
                <a href="https://es.khanacademy.org/math/statistics-probability/probability-library" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  khanacademy.org
                </a>
                <span className="block text-xs text-gray-500">Videos gratuitos sobre probabilidad básica, Bayes y distribuciones, recomendados para reforzar fundamentos.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-slate-800">📚 Referencias Clave del Módulo</h3>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
            <li>Fagan, T. J. (1975). Nomogram for Bayes theorem. <em>New England Journal of Medicine</em>, <em>293</em>(5), 257.</li>
            <li>Grimes, D. A. & Schulz, K. F. (2005). Refining clinical diagnosis with likelihood ratios. <em>The Lancet</em>, <em>365</em>(9469), 1500–1505.</li>
            <li>Deeks, J. J. & Altman, D. G. (2004). Diagnostic tests 4: likelihood ratios. <em>BMJ</em>, <em>329</em>, 168–169.</li>
            <li>Whiting, P. F., Rutjes, A. W. S., Westwood, M. E. et al. (2011). QUADAS-2: A revised tool for quality of diagnostic accuracy studies. <em>Annals of Internal Medicine</em>, <em>155</em>(8), 529–536.</li>
          </ul>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm font-medium text-gray-600">
            La probabilidad y el Teorema de Bayes no son un adorno matemático: son la forma
            correcta de pensar cuando la certeza no está disponible —que es siempre, en la
            práctica clínica. Cada vez que actualizas tu sospecha diagnóstica ante un nuevo
            resultado, ya estás razonando como Bayes.
          </p>
        </div>
      </div>
    </div>
  );
}
