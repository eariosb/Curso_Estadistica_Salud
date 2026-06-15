"use client";
import { useState } from "react";

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
  title: "Muestreo Avanzado y Diseño de Estudios",
  subtitle: "Cómo elegir bien a quiénes estudiar y cómo estructurar la investigación",
  objective:
    "Dominar los tipos de muestreo probabilístico y no probabilístico en contextos reales de salud, comprender los principios del diseño de experimentos (aleatorización, replicación, bloqueo), distinguir los tipos de estudios en salud y conectar el diseño con la validez de las conclusiones.",
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

function Quiz({ question, options, explanation }: {
  question: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: "24px 28px", margin: "32px 0",
    }}>
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
            fontSize: 14, color: textColor, fontWeight: isSelected || (answered && opt.correct) ? 600 : 400,
            transition: "all 0.15s",
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

function DiagramaTiposEstudios() {
  return (
    <svg viewBox="0 0 700 360" role="img"
      aria-label="Clasificación de tipos de estudios en investigación en salud"
      overflow="visible"
      style={{ display: "block", margin: "1.5rem 0", width: "100%", height: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Árbol de clasificación de estudios: observacionales vs experimentales, transversales, cohortes, casos-controles y ECA</title>

      {/* Raíz */}
      <rect x="230" y="10" width="240" height="42" rx="10" fill="#1E293B" />
      <text x="350" y="36" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="14" fontWeight="700" fill="#fff">Estudio de investigación</text>

      {/* Líneas nivel 1 */}
      <line x1="280" y1="52" x2="160" y2="100" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="420" y1="52" x2="540" y2="100" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Observacional */}
      <rect x="60" y="100" width="200" height="40" rx="8" fill="#E6F4F1" stroke="#0F6E56" strokeWidth="1.5" />
      <text x="160" y="125" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="13" fontWeight="700" fill="#0F6E56">Observacional</text>

      {/* Experimental */}
      <rect x="440" y="100" width="200" height="40" rx="8" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="540" y="125" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="13" fontWeight="700" fill="#1D4ED8">Experimental</text>

      {/* Subramas observacional */}
      <line x1="100" y1="140" x2="80" y2="188" stroke="#0F6E56" strokeWidth="1" />
      <line x1="140" y1="140" x2="185" y2="188" stroke="#0F6E56" strokeWidth="1" />
      <line x1="200" y1="140" x2="285" y2="188" stroke="#0F6E56" strokeWidth="1" />

      {[
        { x: 20,  y: 188, w: 120, label: "Transversal", sub: "Snapshot único", color: C.teal, desc: "Prevalencia, encuestas" },
        { x: 130, y: 188, w: 120, label: "Cohorte",    sub: "Seguimiento en el tiempo",  color: C.teal, desc: "Incidencia, RR" },
        { x: 250, y: 188, w: 130, label: "Caso-Control", sub: "Retrospectivo", color: C.teal, desc: "OR, raros/crónicos" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={56} rx="7"
            fill={C.tealLt} stroke={C.teal} strokeWidth="1" />
          <text x={b.x + b.w / 2} y={b.y + 20} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill={C.teal}>{b.label}</text>
          <text x={b.x + b.w / 2} y={b.y + 36} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="9" fill={C.slateMd}>{b.sub}</text>
          <text x={b.x + b.w / 2} y={b.y + 50} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="9" fill={C.teal} fontStyle="italic">{b.desc}</text>
        </g>
      ))}

      {/* Subramas experimental */}
      <line x1="500" y1="140" x2="470" y2="188" stroke="#1D4ED8" strokeWidth="1" />
      <line x1="570" y1="140" x2="600" y2="188" stroke="#1D4ED8" strokeWidth="1" />

      {[
        { x: 410, y: 188, w: 120, label: "ECA", sub: "Aleatorizado controlado", desc: "Estándar de oro" },
        { x: 545, y: 188, w: 125, label: "Cuasi-experimental", sub: "Sin aleatorización", desc: "Estudios antes-después" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={56} rx="7"
            fill={C.blueLt} stroke={C.blue} strokeWidth="1" />
          <text x={b.x + b.w / 2} y={b.y + 20} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill={C.blue}>{b.label}</text>
          <text x={b.x + b.w / 2} y={b.y + 36} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="9" fill={C.slateMd}>{b.sub}</text>
          <text x={b.x + b.w / 2} y={b.y + 50} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="9" fill={C.blue} fontStyle="italic">{b.desc}</text>
        </g>
      ))}

      {/* Jerarquía evidencia */}
      <rect x="20" y="272" width="660" height="76" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <text x="350" y="292" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="12" fontWeight="700" fill="#1E293B">Pirámide de evidencia (de mayor a menor)</text>
      {["Meta-análisis / RS", "ECA", "Cohorte prospectiva", "Caso-Control", "Transversal / Serie de casos", "Opinión expertos"].map((e, i) => (
        <text key={i} x={35 + i * 106} y={316} fontFamily="Inter,sans-serif"
          fontSize="9.5" fontWeight={i < 2 ? 700 : 400}
          fill={i === 0 ? C.blue : i === 1 ? C.teal : C.slateMd}>
          {i + 1}. {e}
        </text>
      ))}
      <text x="350" y="342" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="9" fill={C.slateXl}>→ Mayor poder causal ←</text>
    </svg>
  );
}

function DiagramaPrincipiosDoE() {
  return (
    <svg viewBox="0 0 700 200" role="img"
      aria-label="Los tres principios del diseño de experimentos"
      style={{ display: "block", margin: "1.5rem 0", width: "100%", height: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Tres principios del diseño de experimentos: aleatorización, replicación y bloqueo</title>

      {[
        { x: 20,  color: C.teal, bg: C.tealLt, n: "01", title: "Aleatorización", icon: "🎲",
          desc1: "Asignar tratamientos al azar.", desc2: "Elimina sesgo de selección.", desc3: "Base del ECA." },
        { x: 257, color: C.blue, bg: C.blueLt, n: "02", title: "Replicación", icon: "🔁",
          desc1: "Repetir el experimento.", desc2: "Estima el error experimental.", desc3: "Aumenta precisión." },
        { x: 494, color: C.violet, bg: C.violetLt, n: "03", title: "Bloqueo", icon: "🧱",
          desc1: "Agrupar unidades similares.", desc2: "Controla factores de confusión.", desc3: "Ej: bloques por centro." },
      ].map((p) => (
        <g key={p.n}>
          <rect x={p.x} y={10} width={186} height={175} rx="12" fill={p.bg} stroke={p.color} strokeWidth="1.5" />
          <text x={p.x + 93} y={42} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="26">{p.icon}</text>
          <text x={p.x + 93} y={66} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="11" fontWeight="700" letterSpacing="0.08em" fill={p.color}>{p.n}</text>
          <text x={p.x + 93} y={88} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="14" fontWeight="800" fill="#1E293B">{p.title}</text>
          <text x={p.x + 93} y={112} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="11" fill="#475569">{p.desc1}</text>
          <text x={p.x + 93} y={130} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="11" fill="#475569">{p.desc2}</text>
          <text x={p.x + 93} y={148} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="11" fill={p.color} fontWeight="600">{p.desc3}</text>
        </g>
      ))}
    </svg>
  );
}

function DiagramaECA() {
  return (
    <svg viewBox="0 0 700 240" role="img"
      aria-label="Flujo de un ensayo clínico aleatorizado (ECA)"
      overflow="visible"
      style={{ display: "block", margin: "1.5rem 0", width: "100%", height: "auto" }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Flujo de un ensayo clínico aleatorizado: elegibilidad, consentimiento, aleatorización, grupos y desenlace</title>
      <defs>
        <marker id="arrEca" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="5" markerHeight="5" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>

      {/* Población → Elegibles */}
      <rect x="20" y="95" width="110" height="50" rx="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
      <text x="75" y="117" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#475569">Población</text>
      <text x="75" y="133" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#94A3B8">candidata</text>
      <line x1="130" y1="120" x2="165" y2="120" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrEca)" />

      {/* Criterios */}
      <rect x="165" y="95" width="110" height="50" rx="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
      <text x="220" y="117" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#B45309">Criterios</text>
      <text x="220" y="133" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#B45309">inclusión/excl.</text>
      <line x1="275" y1="120" x2="310" y2="120" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrEca)" />

      {/* Consentimiento */}
      <rect x="310" y="95" width="110" height="50" rx="8" fill="#E6F4F1" stroke="#0F6E56" strokeWidth="1" />
      <text x="365" y="117" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#0F6E56">Consent.</text>
      <text x="365" y="133" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#0F6E56">informado</text>
      <line x1="420" y1="120" x2="455" y2="120" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrEca)" />

      {/* Aleatorización */}
      <rect x="455" y="86" width="80" height="68" rx="10" fill="#1E293B" />
      <text x="495" y="116" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#FCD34D">🎲</text>
      <text x="495" y="132" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#fff">Alea-</text>
      <text x="495" y="146" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#fff">torización</text>

      {/* Bifurcación */}
      <line x1="535" y1="105" x2="570" y2="75" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrEca)" />
      <line x1="535" y1="135" x2="570" y2="165" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#arrEca)" />

      {/* Intervención */}
      <rect x="570" y="50" width="110" height="48" rx="8" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="625" y="71" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#1D4ED8">Intervención</text>
      <text x="625" y="87" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#1D4ED8">(tratamiento activo)</text>

      {/* Control */}
      <rect x="570" y="140" width="110" height="48" rx="8" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5" />
      <text x="625" y="161" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#475569">Control</text>
      <text x="625" y="177" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#475569">(placebo / estándar)</text>

      {/* Seguimiento → desenlace */}
      <text x="350" y="210" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="11" fill="#94A3B8">Seguimiento →</text>
      <text x="490" y="210" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="11" fill="#94A3B8">→ Medición del desenlace →</text>
      <text x="630" y="210" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="11" fontWeight="700" fill={C.teal}>→ Comparar grupos</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE SAMPLE SIZE CALCULATOR
// ─────────────────────────────────────────────────────────────
function CalculadoraMuestral() {
  const [tipo, setTipo] = useState<"proporcion" | "media">("proporcion");
  const [confianza, setConfianza] = useState(95);
  const [potencia, setPotencia] = useState(80);
  const [p, setP] = useState(0.5);
  const [e, setE] = useState(0.05);
  const [delta, setDelta] = useState(5);
  const [sigma, setSigma] = useState(15);

  // Z values for common confidence levels
  const zAlpha: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
  const zBeta: Record<number, number> = { 80: 0.84, 90: 1.28, 95: 1.645 };

  const za = zAlpha[confianza] || 1.96;
  const zb = zBeta[potencia] || 0.84;

  let n = 0;
  if (tipo === "proporcion") {
    n = Math.ceil((za * za * p * (1 - p)) / (e * e));
  } else {
    n = Math.ceil(((za + zb) * (za + zb) * 2 * sigma * sigma) / (delta * delta));
  }

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 16, padding: "28px", margin: "32px 0",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.teal,
        letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
        Estimador de Tamaño Muestral
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {(["proporcion", "media"] as const).map(t => (
          <button key={t} onClick={() => setTipo(t)} style={{
            padding: "8px 18px", borderRadius: 8,
            background: tipo === t ? C.teal : C.bg,
            color: tipo === t ? "#fff" : C.slateMd,
            border: `1.5px solid ${tipo === t ? C.teal : C.border}`,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            {t === "proporcion" ? "Proporción" : "Comparar medias"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {/* Confianza */}
        <div>
          <label style={{ fontSize: 12, color: C.slateMd, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Nivel de confianza: <strong style={{ color: C.teal }}>{confianza}%</strong>
          </label>
          <input type="range" min={90} max={99} step={5} value={confianza}
            onChange={e => setConfianza(Number(e.target.value))}
            style={{ width: "100%" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.slateXl }}>
            <span>90%</span><span>95%</span><span>99%</span>
          </div>
        </div>

        {tipo === "media" && (
          <div>
            <label style={{ fontSize: 12, color: C.slateMd, fontWeight: 600, display: "block", marginBottom: 6 }}>
              Potencia estadística: <strong style={{ color: C.teal }}>{potencia}%</strong>
            </label>
            <input type="range" min={80} max={95} step={10} value={potencia}
              onChange={e => setPotencia(Number(e.target.value))}
              style={{ width: "100%" }} />
          </div>
        )}

        {tipo === "proporcion" ? (
          <>
            <div>
              <label style={{ fontSize: 12, color: C.slateMd, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Proporción esperada (p): <strong style={{ color: C.teal }}>{(p * 100).toFixed(0)}%</strong>
              </label>
              <input type="range" min={0.1} max={0.9} step={0.05} value={p}
                onChange={ev => setP(Number(ev.target.value))}
                style={{ width: "100%" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.slateMd, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Error máximo (ε): <strong style={{ color: C.teal }}>±{(e * 100).toFixed(0)}%</strong>
              </label>
              <input type="range" min={0.01} max={0.1} step={0.01} value={e}
                onChange={ev => setE(Number(ev.target.value))}
                style={{ width: "100%" }} />
            </div>
          </>
        ) : (
          <>
            <div>
              <label style={{ fontSize: 12, color: C.slateMd, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Diferencia mínima (δ): <strong style={{ color: C.teal }}>{delta} unidades</strong>
              </label>
              <input type="range" min={1} max={20} step={1} value={delta}
                onChange={ev => setDelta(Number(ev.target.value))}
                style={{ width: "100%" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.slateMd, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Desviación estándar (σ): <strong style={{ color: C.teal }}>{sigma} unidades</strong>
              </label>
              <input type="range" min={5} max={30} step={1} value={sigma}
                onChange={ev => setSigma(Number(ev.target.value))}
                style={{ width: "100%" }} />
            </div>
          </>
        )}
      </div>

      {/* Resultado */}
      <div style={{
        marginTop: 28, background: C.slate, borderRadius: 12,
        padding: "20px 24px", display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 800, color: "#FCD34D", lineHeight: 1 }}>
            {n.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>participantes necesarios</div>
        </div>
        <div style={{ borderLeft: `1px solid #334155`, paddingLeft: 20, flex: 1 }}>
          <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.7 }}>
            {tipo === "proporcion" ? (
              <>
                Para estimar una proporción de <strong style={{ color: "#FCD34D" }}>{(p * 100).toFixed(0)}%</strong>{" "}
                con un error máximo de <strong style={{ color: "#FCD34D" }}>±{(e * 100).toFixed(0)}%</strong>{" "}
                y un nivel de confianza del <strong style={{ color: "#FCD34D" }}>{confianza}%</strong>.
              </>
            ) : (
              <>
                Para detectar una diferencia de <strong style={{ color: "#FCD34D" }}>{delta} unidades</strong>{" "}
                (σ = {sigma}) con potencia <strong style={{ color: "#FCD34D" }}>{potencia}%</strong>{" "}
                y confianza {confianza}%. Total: {n} por grupo ({(n * 2).toLocaleString()} total).
              </>
            )}
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 8 }}>
            ⚠️ Considera agregar un 10–20% por pérdidas durante el seguimiento.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function MuestreoDisenoEstudios() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif",
      color: C.slate, lineHeight: 1.75 }}>

      <LearningGoals goals={[
        "Distinguir muestreo probabilístico y no probabilístico, y elegir el adecuado según el contexto.",
        "Calcular e interpretar el tamaño muestral básico para estudios de proporción y comparación de medias.",
        "Aplicar los tres principios del diseño de experimentos (aleatorización, replicación y bloqueo).",
        "Clasificar los tipos de estudios en salud y entender qué inferencias causales permite cada uno.",
        "Conectar el diseño del estudio con la capacidad de controlar los sesgos identificados en el módulo anterior.",
      ]} />

      <p style={{ fontSize: 16, color: C.slateMd, lineHeight: 1.8, marginBottom: 32 }}>
        Conoces ya qué son los sesgos. Ahora aprenderás a atacarlos desde la raíz: el diseño.
        Un buen diseño no solo elige bien a quién estudiar, sino que también estructura cómo
        se asignan los tratamientos, cuántos individuos se necesitan y cómo se organizan
        los grupos para que la comparación sea justa. Esto es lo que transforma una observación
        en evidencia.
      </p>

      {/* ══════════════════════════════════════════════
          SECCIÓN 1 — Muestreo Probabilístico Avanzado
      ══════════════════════════════════════════════ */}
      <SectionHeader number="1" title="Muestreo Probabilístico: Profundidad"
        subtitle="Estrategias para garantizar la representatividad en contextos complejos" />

      <p>
        En el módulo anterior viste los cuatro tipos básicos. Aquí añadimos la capa
        que realmente aparece en la práctica: la asignación de tamaños dentro del
        muestreo estratificado, el problema del muestreo polietápico y cuándo
        el diseño complejo exige corrección del análisis.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 16 }}>
          <thead>
            <tr style={{ background: C.slate }}>
              {["Tipo", "Asignación de n por estrato", "Cuándo usarlo en salud"].map(h => (
                <th key={h} style={{ padding: "11px 14px", color: "#fff", fontWeight: 600,
                  textAlign: "left", borderBottom: `2px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Estratificado proporcional", "nₛ = n × Nₛ/N", "Encuestas de salud nacional: cada servicio/región representada según su peso real"],
              ["Estratificado óptimo (Neyman)", "nₛ ∝ Nₛ × σₛ", "Cuando la variabilidad difiere mucho entre estratos (ej: UCI vs. Atención Primaria)"],
              ["Polietápico (clusters)", "1ᵃ etapa: unidades primarias; 2ᵃ: dentro de c/u", "Estudios multicéntricos, encuestas de hogares, screening comunitario"],
              ["Por cuotas (no prob.)", "Fija n por subgrupo sin sorteo", "Estudios piloto rápidos cuando no hay lista disponible"],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.bg : C.bgCard }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "10px 14px", color: j === 0 ? C.teal : C.slateMd,
                    fontWeight: j === 0 ? 700 : 400, borderBottom: `1px solid ${C.border}` }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info" title="El efecto del diseño (DEFF): cuando la complejidad tiene un coste estadístico">
        El muestreo por conglomerados (clusters) es eficiente logísticamente, pero estadísticamente
        costoso: las personas dentro de un mismo cluster son más parecidas entre sí que personas
        de distintos clusters (correlación intraclúster, ICC). Esto reduce la «información
        efectiva» de cada individuo adicional dentro del mismo cluster.
        <br /><br />
        El <strong>efecto del diseño (DEFF)</strong> = Varianza(diseño complejo) / Varianza(MAS)
        <br />
        Si DEFF = 2, necesitas el doble de individuos que con MAS para la misma precisión.
        Los artículos de encuestas nacionales (ENDES, ENSE) siempre reportan DEFF.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 2 — Muestreo No Probabilístico
      ══════════════════════════════════════════════ */}
      <SectionHeader number="2" title="Muestreo No Probabilístico"
        subtitle="Cuándo es la única opción y cómo mitigar sus limitaciones" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, margin: "20px 0" }}>
        {[
          { icon: "🏥", name: "Conveniencia", desc: "Pacientes accesibles en tu propio servicio. Rápido pero con sesgo de selección inherente.", color: C.amber },
          { icon: "🧐", name: "Intencional / Juicio", desc: "Seleccionas casos que cumplen criterios específicos de interés. Útil en estudios de caso y piloto.", color: C.teal },
          { icon: "🌐", name: "Bola de nieve", desc: "Participantes reclutan a otros de su red. Para poblaciones de difícil acceso (adicciones, VIH, colectivos estigmatizados).", color: C.violet },
          { icon: "📊", name: "Cuotas", desc: "Se fijan proporciones por subgrupo (edad, sexo) sin aleatorización interna. El cuasi-estratificado del investigador.", color: C.blue },
        ].map((item, i) => (
          <div key={i} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "18px 20px",
            borderTop: `3px solid ${item.color}`,
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: item.color, marginBottom: 6 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: C.slateMd, lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <Callout type="warning" title="La trampa de generalizar desde una muestra no probabilística">
        En investigación clínica, la mayoría de los estudios observacionales usan muestreo
        por conveniencia (pacientes de un hospital, voluntarios de un estudio). Esto es
        aceptable si se declara explícitamente y la discusión reconoce que los resultados
        <em> aplican al perfil de pacientes del centro</em>, no a la población general.
        El error frecuente es presentar conclusiones amplias («los pacientes con EPOC tienen…»)
        sin reconocer que la muestra solo incluyó pacientes hospitalizados moderados-graves.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 3 — Tamaño Muestral
      ══════════════════════════════════════════════ */}
      <SectionHeader number="3" title="Tamaño Muestral: el Equilibrio entre Precisión y Recursos"
        subtitle="Ni demasiado pequeño (sin poder), ni demasiado grande (costoso e innecesario)" />

      <p>
        El tamaño muestral no es un número que se elige al azar o que se maximiza sin límite.
        Es un cálculo preciso que depende de cuánta imprecisión puedes tolerar,
        qué tan grande esperas que sea el efecto que buscas, y con qué probabilidad
        quieres detectarlo si realmente existe.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, margin: "20px 0" }}>
        {[
          { label: "Nivel de confianza (1−α)", icon: "🎯", desc: "95% es el estándar. A mayor confianza, mayor n. Con 99% de confianza necesitas más personas.", color: C.teal },
          { label: "Potencia estadística (1−β)", icon: "⚡", desc: "80–90% es habitual. La probabilidad de detectar un efecto si existe. Baja potencia = muchos falsos negativos.", color: C.blue },
          { label: "Tamaño del efecto (δ)", icon: "📏", desc: "La diferencia mínima clínicamente relevante. Efectos pequeños requieren muestras mucho mayores.", color: C.amber },
          { label: "Variabilidad (σ o p)", icon: "📉", desc: "Más variabilidad en los datos → más individuos necesarios para obtener la misma precisión.", color: C.violet },
        ].map((item, i) => (
          <div key={i} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "16px 18px",
          }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <div style={{ fontWeight: 700, fontSize: 13, color: item.color, margin: "8px 0 4px" }}>{item.label}</div>
            <div style={{ fontSize: 12, color: C.slateMd, lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <CalculadoraMuestral />

      <Callout type="success" title="Ejemplo real: estudio de adherencia en pacientes diabéticos">
        Un estudio quiere estimar la proporción de pacientes con DM2 que logra HbA1c &lt; 7%
        en atención primaria. Estudios previos sugieren un 40–50%.
        <br /><br />
        Con <strong>p = 0.50</strong> (estimación conservadora), <strong>ε = ±5%</strong> y
        confianza <strong>95%</strong>: n ≈ 385 pacientes.
        <br />
        Con <strong>ε = ±3%</strong>: n ≈ 1.067.
        <br /><br />
        <strong>Conclusión práctica:</strong> reducir a la mitad el margen de error cuadruplica
        el tamaño muestral. La elección de ε es una decisión clínica, no estadística.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 4 — Principios del Diseño de Experimentos
      ══════════════════════════════════════════════ */}
      <SectionHeader number="4" title="Los Tres Principios del Diseño de Experimentos"
        subtitle="La gramática que hace legibles los resultados de un estudio experimental" />

      <p>
        Ronald Fisher formuló en los años 1920 los principios que todavía rigen
        el diseño experimental moderno. No son dogmas: son soluciones elegantes
        a problemas reales de interpretación de resultados.
      </p>

      <DiagramaPrincipiosDoE />

      <Callout type="memory" title="Aleatorización: el principio más importante">
        La aleatorización es lo que convierte la «asociación» en «causalidad plausible».
        Al asignar tratamientos al azar, se garantiza que <em>en promedio</em> los grupos
        sean comparables en todas las variables conocidas <strong>y desconocidas</strong>.
        Ningún ajuste estadístico posterior puede reemplazar lo que logra la aleatorización
        en el diseño. Un estudio observacional con ajuste multivariante siempre asume
        que no hay confusores no medidos — un supuesto que no se puede verificar.
      </Callout>

      <Callout type="info" title="Bloqueo: la solución elegante a la variabilidad predecible">
        El bloqueo consiste en agrupar unidades experimentales que son más similares entre sí
        (mismo centro hospitalario, misma cohorte de edad, misma semana de reclutamiento)
        y <em>aleatorizar dentro de cada bloque</em>.
        <br /><br />
        En un ECA multicéntrico, el «centro» es un factor de bloqueo: las condiciones
        locales (equipamiento, práctica habitual, perfil de pacientes) varían entre centros.
        Bloqueando por centro, esa variabilidad se controla y la comparación intervención-control
        es más limpia dentro de cada centro.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 5 — Tipos de estudios
      ══════════════════════════════════════════════ */}
      <SectionHeader number="5" title="Tipos de Estudios en Salud"
        subtitle="Cada diseño responde una pregunta distinta con un nivel diferente de evidencia causal" />

      <DiagramaTiposEstudios />

      <DiagramaECA />

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 16 }}>
          <thead>
            <tr style={{ background: C.slate }}>
              {["Diseño", "Pregunta que responde", "Medida de asociación", "Limitación principal"].map(h => (
                <th key={h} style={{ padding: "11px 14px", color: "#fff", fontWeight: 600,
                  textAlign: "left", borderBottom: `2px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Transversal", "¿Qué proporción tiene X?", "Prevalencia, OR crudo", "No infiere causalidad, sesgo de supervivencia"],
              ["Cohorte", "¿Quiénes desarrollan el evento?", "Riesgo Relativo (RR), Hazard Ratio", "Caro, largo plazo, pérdidas en el seguimiento"],
              ["Caso-Control", "¿Qué causó el evento pasado?", "Odds Ratio (OR)", "Sesgo de memoria, no estima incidencia directa"],
              ["ECA", "¿Funciona la intervención?", "RR, NNT, diferencia de medias", "Caro, criterios estrictos, validez externa limitada"],
              ["Cuasi-experimental", "¿Hubo cambio antes-después?", "Diferencias pre-post", "Sin aleatorización: confusión residual inevitable"],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.bg : C.bgCard }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "10px 14px",
                    color: j === 0 ? C.teal : C.slateMd,
                    fontWeight: j === 0 ? 700 : 400,
                    borderBottom: `1px solid ${C.border}` }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="success" title="El NNT: traduciendo resultados estadísticos a decisiones clínicas">
        El <strong>Número Necesario a Tratar (NNT)</strong> = 1 / Reducción Absoluta del Riesgo
        es la medida más útil para la práctica porque responde: «¿a cuántos pacientes hay que
        tratar para evitar un evento?».
        <br /><br />
        Si un antihipertensivo reduce el riesgo de ictus del 8% al 5% (RAR = 3%):
        NNT = 1 / 0.03 = <strong>33 pacientes</strong> durante el tiempo del ensayo para
        evitar un ictus. Esta cifra contextualiza si el beneficio justifica el coste y
        los efectos adversos.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 6 — Flashcards y Quizzes
      ══════════════════════════════════════════════ */}
      <SectionHeader number="6" title="Consolida lo Aprendido" subtitle="" />

      <Flashcard
        question="¿Por qué la aleatorización no siempre es posible en investigación en salud?"
        answer={
          <span>
            Existen restricciones <strong>éticas</strong> (no puedes asignar al azar una persona
            al grupo «fumador»), <strong>logísticas</strong> (costo, tiempo, acceso), y
            <strong> de naturaleza</strong> (para estudiar el efecto del sexo o la edad no puedes
            aleatorizar). En estos casos se usan diseños observacionales con control de confusión
            por ajuste estadístico (multivariante) o diseños cuasi-experimentales. El reto es
            reconocer honestamente qué inferencias causales son y no son posibles con cada diseño.
          </span>
        }
      />

      <Flashcard
        question="¿Qué diferencia hay entre errores tipo I y tipo II, y cómo se relacionan con el tamaño muestral?"
        answer={
          <span>
            <strong>Error tipo I (α):</strong> rechazar H₀ cuando es verdadera (falso positivo).
            Se controla fijando el nivel de significancia (usualmente α = 0.05).
            <br /><br />
            <strong>Error tipo II (β):</strong> no rechazar H₀ cuando es falsa (falso negativo).
            La potencia estadística = 1 − β (típicamente 0.80 ó 0.90).
            <br /><br />
            Aumentar el tamaño muestral reduce simultáneamente ambos errores. Con n fijo,
            reducir α (p. ej. a 0.01) aumenta β: hay un trade-off que solo puede resolverse
            incrementando n. En ensayos con desenlaces graves (mortalidad), se acepta un
            α mayor (0.10) para no perder efectos reales pequeños pero clínicamente relevantes.
          </span>
        }
      />

      <Quiz
        question="Un investigador diseña un ECA para comparar dos pautas analgésicas en dolor postoperatorio. Recluta pacientes en 6 hospitales distintos con diferentes protocolos de manejo. ¿Qué principio del DoE debería aplicar para controlar la variabilidad entre centros?"
        options={[
          { text: "Replicación: aumentar el número de pacientes por hospital", correct: false },
          { text: "Bloqueo por centro: aleatorizar dentro de cada hospital por separado", correct: true },
          { text: "Aleatorización central: asignar todos los pacientes globalmente sin considerar el centro", correct: false },
          { text: "Estratificación post-hoc del análisis estadístico", correct: false },
        ]}
        explanation="El bloqueo por centro (también llamado estratificación en la aleatorización) garantiza que cada hospital tenga una distribución equilibrada de ambos tratamientos. Esto controla la variabilidad entre centros antes del análisis, lo que es mucho más poderoso que ajustar estadísticamente después. La estratificación post-hoc puede ayudar en el análisis pero no reemplaza un diseño bien bloqueado."
      />

      <Quiz
        question="Una farmacéutica quiere estudiar si los pacientes de edad avanzada (>75 años) tienen mayor riesgo de hipoglucemia grave con insulina que los adultos menores. ¿Cuál es el diseño de estudio más adecuado considerando que el evento es poco frecuente?"
        options={[
          { text: "Estudio transversal con una encuesta única", correct: false },
          { text: "Ensayo Clínico Aleatorizado", correct: false },
          { text: "Estudio de casos y controles", correct: true },
          { text: "Estudio de cohorte prospectiva de 10 años", correct: false },
        ]}
        explanation="El estudio de casos y controles es el diseño más eficiente para eventos raros como la hipoglucemia grave. Se identifican casos (pacientes que sufrieron hipoglucemia grave) y controles (que no la sufrieron) y se compara retrospectivamente la exposición a insulina y la edad. Un ECA sería poco ético (asignar el tratamiento al azar), y un estudio de cohorte de 10 años requeriría miles de pacientes para capturar suficientes eventos raros."
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
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate, marginBottom: 12 }}>Sobre diseño de estudios</h3>
            {[
              {
                ref: "Hulley, S. B., Cummings, S. R., Browner, W. S., Grady, D. G., & Newman, T. B. (2013). Designing clinical research (4ª ed.). LWW.",
                note: "El manual de referencia en diseño de investigación clínica: tipos de estudios, muestreo y cálculo muestral.",
              },
              {
                ref: "Montgomery, D. C. (2017). Design and analysis of experiments (9ª ed.). Wiley.",
                note: "Texto clásico sobre DoE. Capítulos 2–4: los tres principios y diseños completamente aleatorizados.",
              },
              {
                ref: "CONSORT Group. (2010). The CONSORT statement. https://www.consort-statement.org",
                note: "Lista de verificación para reportar ECAs. Estándar mundial adoptado por las principales revistas médicas.",
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>{item.ref}</div>
                <div style={{ fontSize: 11, color: C.slateMd, marginTop: 3 }}>{item.note}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate, marginBottom: 12 }}>Para el día a día</h3>
            {[
              {
                ref: "Gordis, L. (2014). Epidemiology (5ª ed.). Elsevier Saunders.",
                note: "Capítulos 7–12: tipos de estudios epidemiológicos con ejemplos de salud pública accesibles.",
              },
              {
                ref: "Sackett, D. L., Straus, S. E., Richardson, W. S., Rosenberg, W., & Haynes, R. B. (2000). Evidence-based medicine (2ª ed.). Churchill Livingstone.",
                note: "La fuente original de la pirámide de evidencia y la lectura crítica de estudios clínicos.",
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>{item.ref}</div>
                <div style={{ fontSize: 11, color: C.slateMd, marginTop: 3 }}>{item.note}</div>
              </div>
            ))}
            <div style={{ background: C.tealLt, borderRadius: 10, padding: "14px 16px", marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6 }}>🛠️ Herramientas</div>
              <div style={{ fontSize: 12, color: C.teal, lineHeight: 1.6 }}>
                <strong>G*Power (software libre)</strong> — cálculo de tamaño muestral para &gt;50 diseños estadísticos.
                <br />
                <strong>STROBE / CONSORT / PRISMA</strong> — guías de reporte según tipo de estudio.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
