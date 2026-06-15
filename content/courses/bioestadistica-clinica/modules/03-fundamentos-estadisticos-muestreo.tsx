"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — consistent with project palette
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
  title: "Fundamentos Estadísticos y Muestreo",
  subtitle: "Antes de analizar, hay que entender qué medimos y a quién",
  objective:
    "Distinguir los pilares de la estadística descriptiva e inferencial, comprender la diferencia entre población y muestra, interpretar correctamente las medidas de tendencia central y dispersión, y dominar los principios del muestreo probabilístico aplicados a la investigación en salud.",
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
    <div style={{
      background: C.slate, borderRadius: 12, padding: "22px 28px", margin: "24px 0",
    }}>
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

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "20px 24px",
      borderTop: `3px solid ${color}`,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: C.slateMd, lineHeight: 1.4 }}>{label}</div>
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
    <div style={{
      border: `2px solid ${C.border}`, borderRadius: 12,
      marginBottom: 16, overflow: "hidden",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: open ? C.tealLt : C.bgCard,
        border: "none", padding: "16px 20px", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        textAlign: "left",
      }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.slate }}>{question}</div>
        <span style={{
          fontSize: 20, color: C.teal, transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "none",
        }}>▾</span>
      </button>
      {open && (
        <div style={{
          padding: "18px 22px", borderTop: `1px solid ${C.border}`,
          background: C.bgCard, fontSize: 15, color: C.slateMd, lineHeight: 1.7,
        }}>
          {answer}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SVG DIAGRAMS
// ─────────────────────────────────────────────────────────────

function DiagramaDescInferencial() {
  return (
    <svg width="100%" viewBox="0 0 700 200" role="img"
      aria-label="Estadística descriptiva vs inferencial"
      style={{ display: "block", margin: "1.5rem 0", height: "auto", maxWidth: 700 }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Estadística descriptiva e inferencial: diagrama comparativo</title>

      {/* Descriptiva */}
      <rect x="20" y="30" width="290" height="140" rx="14"
        fill="#E6F4F1" stroke="#0F6E56" strokeWidth="1.5" />
      <text x="165" y="58" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="14" fontWeight="700" fill="#0F6E56">Estadística Descriptiva</text>
      <text x="165" y="82" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="12" fill="#475569">Resume y organiza datos</text>
      <text x="165" y="102" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="12" fill="#475569">que ya tenemos</text>
      <text x="40" y="128" fontFamily="Inter,sans-serif" fontSize="11" fill="#0F6E56">📊 Media, mediana, moda</text>
      <text x="40" y="146" fontFamily="Inter,sans-serif" fontSize="11" fill="#0F6E56">📊 Desviación estándar, rango</text>
      <text x="40" y="164" fontFamily="Inter,sans-serif" fontSize="11" fill="#0F6E56">📊 Tablas y gráficos</text>

      {/* Flecha central */}
      <line x1="315" y1="100" x2="385" y2="100" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <text x="350" y="88" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="10" fill="#94A3B8">inferir</text>

      {/* Inferencial */}
      <rect x="390" y="30" width="290" height="140" rx="14"
        fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="535" y="58" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="14" fontWeight="700" fill="#1D4ED8">Estadística Inferencial</text>
      <text x="535" y="82" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="12" fill="#475569">Generaliza a la población</text>
      <text x="535" y="102" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="12" fill="#475569">desde una muestra</text>
      <text x="410" y="128" fontFamily="Inter,sans-serif" fontSize="11" fill="#1D4ED8">🔬 Pruebas de hipótesis</text>
      <text x="410" y="146" fontFamily="Inter,sans-serif" fontSize="11" fill="#1D4ED8">🔬 Intervalos de confianza</text>
      <text x="410" y="164" fontFamily="Inter,sans-serif" fontSize="11" fill="#1D4ED8">🔬 Modelos de regresión</text>
    </svg>
  );
}

function DiagramaPoblacionMuestra() {
  return (
    <svg width="100%" viewBox="0 0 680 240" role="img"
      aria-label="Relación entre población y muestra"
      style={{ display: "block", margin: "1.5rem 0", height: "auto", maxWidth: 680 }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Población, marco muestral y muestra: diagrama de círculos concéntricos</title>
      {/* Población */}
      <ellipse cx="340" cy="120" rx="310" ry="110" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="90" y="50" fontFamily="Inter,sans-serif" fontSize="13" fontWeight="600" fill="#475569">Población</text>
      <text x="90" y="66" fontFamily="Inter,sans-serif" fontSize="11" fill="#94A3B8">Todos los casos posibles</text>
      {/* Marco muestral */}
      <ellipse cx="340" cy="125" rx="200" ry="75" fill="#E6F4F1" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="5 2" />
      <text x="180" y="68" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="600" fill="#0F6E56">Marco muestral</text>
      <text x="185" y="82" fontFamily="Inter,sans-serif" fontSize="10" fill="#0F6E56">Lista de donde se extrae la muestra</text>
      {/* Muestra */}
      <ellipse cx="340" cy="128" rx="90" ry="40" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
      <text x="340" y="122" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="13" fontWeight="700" fill="#1D4ED8">Muestra</text>
      <text x="340" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#1D4ED8">n casos estudiados</text>
      {/* Flecha muestreo */}
      <path d="M480 90 Q560 40 620 110" fill="none" stroke="#B45309" strokeWidth="1.5" markerEnd="url(#arrAmber)" />
      <defs>
        <marker id="arrAmber" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>
      <text x="555" y="40" fontFamily="Inter,sans-serif" fontSize="11" fill="#B45309" fontWeight="600">Muestreo</text>
      {/* Flecha inferencia */}
      <path d="M620 140 Q560 190 480 155" fill="none" stroke="#5B21B6" strokeWidth="1.5" markerEnd="url(#arrViolet)" />
      <defs>
        <marker id="arrViolet" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>
      <text x="545" y="198" fontFamily="Inter,sans-serif" fontSize="11" fill="#5B21B6" fontWeight="600">Inferencia</text>
    </svg>
  );
}

function DiagramaTiposMuestreo() {
  return (
    <svg width="100%" viewBox="0 0 700 320" role="img"
      aria-label="Tipos de muestreo probabilístico"
      style={{ display: "block", margin: "1.5rem 0", height: "auto", maxWidth: 700 }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Cuatro tipos principales de muestreo probabilístico con descripción visual</title>
      {/* Título */}
      <text x="350" y="22" textAnchor="middle" fontFamily="Inter,sans-serif"
        fontSize="14" fontWeight="700" fill="#1E293B">Tipos de muestreo probabilístico</text>

      {/* ── MAS ── */}
      <rect x="20" y="40" width="155" height="130" rx="10" fill="#E6F4F1" stroke="#0F6E56" strokeWidth="1.2" />
      <text x="97" y="62" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#0F6E56">Aleatorio Simple</text>
      {[0,1,2,3,4,5,6,7,8,9,10,11].map((_, i) => (
        <circle key={i} cx={50 + (i%6)*17} cy={86 + Math.floor(i/6)*18}
          r="5.5" fill={[0,3,7,10].includes(i) ? "#0F6E56" : "#94A3B8"} />
      ))}
      <text x="97" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Cada individuo tiene la</text>
      <text x="97" y="155" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">misma probabilidad.</text>
      <text x="97" y="172" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontStyle="italic" fill="#0F6E56">Ej: sorteo de voluntarios</text>

      {/* ── Estratificado ── */}
      <rect x="190" y="40" width="155" height="130" rx="10" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.2" />
      <text x="267" y="62" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#1D4ED8">Estratificado</text>
      <rect x="205" y="72" width="52" height="44" rx="4" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="0.8" />
      <text x="231" y="92" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#1D4ED8">Grupo A</text>
      {[0,1,2].map(i => <circle key={i} cx={215+i*16} cy={106} r="4.5" fill={i<1 ? "#1D4ED8" : "#93C5FD"} />)}
      <rect x="270" y="72" width="58" height="44" rx="4" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="0.8" />
      <text x="299" y="92" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#1D4ED8">Grupo B</text>
      {[0,1,2,3].map(i => <circle key={i} cx={279+i*13} cy={106} r="4.5" fill={i<2 ? "#1D4ED8" : "#93C5FD"} />)}
      <text x="267" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Se divide en estratos</text>
      <text x="267" y="155" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">y se muestrea en c/u.</text>
      <text x="267" y="172" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontStyle="italic" fill="#1D4ED8">Ej: por servicio hospitalario</text>

      {/* ── Sistemático ── */}
      <rect x="360" y="40" width="155" height="130" rx="10" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.2" />
      <text x="437" y="62" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#B45309">Sistemático</text>
      {[0,1,2,3,4,5,6,7,8,9,10,11].map((_, i) => (
        <circle key={i} cx={378 + (i%6)*21} cy={86 + Math.floor(i/6)*18}
          r="5.5" fill={i%3===0 ? "#B45309" : "#FDE68A"} />
      ))}
      <text x="437" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Se escoge cada k-ésimo</text>
      <text x="437" y="155" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">elemento de la lista.</text>
      <text x="437" y="172" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontStyle="italic" fill="#B45309">Ej: cada 3ª historia clínica</text>

      {/* ── Conglomerados ── */}
      <rect x="530" y="40" width="155" height="130" rx="10" fill="#EDE9FE" stroke="#5B21B6" strokeWidth="1.2" />
      <text x="607" y="62" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#5B21B6">Conglomerados</text>
      {[
        {cx:557,cy:88,fill:true},{cx:572,cy:95,fill:true},{cx:563,cy:105,fill:true},
        {cx:600,cy:84,fill:false},{cx:617,cy:91,fill:false},{cx:607,cy:102,fill:false},
        {cx:648,cy:87,fill:true},{cx:663,cy:95,fill:true},{cx:655,cy:106,fill:true},
      ].map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="6"
          fill={d.fill ? "#5B21B6" : "#C4B5FD"}
          stroke={d.fill ? "#3B0764" : "#7C3AED"} strokeWidth="0.5" />
      ))}
      <rect x="540" y="74" width="42" height="42" rx="6" fill="none" stroke="#5B21B6" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="640" y="74" width="42" height="42" rx="6" fill="none" stroke="#5B21B6" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="607" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">Se seleccionan grupos</text>
      <text x="607" y="155" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#475569">completos (clínicas, aulas).</text>
      <text x="607" y="172" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fontStyle="italic" fill="#5B21B6">Ej: seleccionar centros de salud</text>

      {/* Resumen comparativo */}
      <rect x="20" y="188" width="660" height="118" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <text x="350" y="208" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#1E293B">Comparativa rápida</text>
      {[
        ["Tipo", "Ventaja principal", "Limitación clave", "Uso típico en salud"],
        ["MAS", "Máxima objetividad", "Requiere lista completa", "Ensayos clínicos pequeños"],
        ["Estratificado", "Representa subgrupos", "Más complejo", "Estudios por patología/servicio"],
        ["Sistemático", "Fácil implementación", "Sesgo si hay periodicidad", "Registros y bases de datos"],
        ["Conglomerados", "Bajo costo logístico", "Mayor error de muestreo", "Encuestas nacionales de salud"],
      ].map((row, ri) => (
        row.map((cell, ci) => (
          <text key={`${ri}-${ci}`}
            x={25 + ci * 165} y={225 + ri * 16}
            fontFamily="Inter,sans-serif"
            fontSize={ri === 0 ? 10 : 10}
            fontWeight={ri === 0 || ci === 0 ? 700 : 400}
            fill={ri === 0 ? "#0F6E56" : ci === 0 ? "#1E293B" : "#475569"}>
            {cell}
          </text>
        ))
      ))}
    </svg>
  );
}

function BoxplotExplicado() {
  // Visual explanation of boxplot elements
  return (
    <svg width="100%" viewBox="0 0 680 180" role="img"
      aria-label="Anatomía de un boxplot con anotaciones"
      style={{ display: "block", margin: "1.5rem 0", height: "auto", maxWidth: 680 }}
      xmlns="http://www.w3.org/2000/svg">
      <title>Anatomía del diagrama de caja (boxplot): mínimo, Q1, mediana, Q3, máximo e IQR</title>

      {/* Eje */}
      <line x1="60" y1="110" x2="620" y2="110" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Bigotes */}
      <line x1="120" y1="110" x2="230" y2="110" stroke="#1E293B" strokeWidth="2" />
      <line x1="120" y1="96" x2="120" y2="124" stroke="#1E293B" strokeWidth="2" />
      <line x1="490" y1="110" x2="570" y2="110" stroke="#1E293B" strokeWidth="2" />
      <line x1="570" y1="96" x2="570" y2="124" stroke="#1E293B" strokeWidth="2" />
      {/* Caja IQR */}
      <rect x="230" y="75" width="260" height="70" rx="4" fill="#E6F4F1" stroke="#0F6E56" strokeWidth="2" />
      {/* Mediana */}
      <line x1="360" y1="75" x2="360" y2="145" stroke="#0F6E56" strokeWidth="3" />

      {/* Etiquetas */}
      <text x="120" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#475569">Mín</text>
      <text x="230" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#475569">Q1</text>
      <text x="360" y="66" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#0F6E56">Mediana (Q2)</text>
      <text x="490" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#475569">Q3</text>
      <text x="570" y="140" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#475569">Máx</text>

      {/* IQR bracket */}
      <path d="M230 58 L230 50 L490 50 L490 58" fill="none" stroke="#B45309" strokeWidth="1.5" />
      <text x="360" y="44" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#B45309">IQR = Q3 − Q1</text>
      <text x="360" y="32" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#B45309">(Rango Intercuartílico: el 50% central de los datos)</text>

      {/* Puntos de datos debajo */}
      {[100,130,155,175,200,225,240,260,290,310,330,345,360,375,395,420,445,470,500,540,565].map((x, i) => (
        <circle key={i} cx={x} cy={160} r="3.5" fill="#94A3B8" />
      ))}
      <text x="340" y="178" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#94A3B8">
        Distribución de datos individuales
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// INTERACTIVE SAMPLING DEMO
// ─────────────────────────────────────────────────────────────
function MuestreoInteractivo() {
  const [tipo, setTipo] = useState<"mas" | "sistematico" | "estratificado">("mas");
  const [n, setN] = useState(6);

  const totalPop = 24;
  const ids = Array.from({ length: totalPop }, (_, i) => i);

  // Assign strata: 0-7 = Urgencias, 8-15 = Medicina, 16-23 = Cirugía
  const strato = (id: number) => id < 8 ? 0 : id < 16 ? 1 : 2;
  const stratoColors = ["#0F6E56", "#1D4ED8", "#B45309"];
  const stratoNames = ["Urgencias", "Medicina", "Cirugía"];

  const selected = (() => {
    if (tipo === "mas") {
      // deterministic "random" sample using a fixed seed pattern
      const indices = [2, 7, 9, 13, 17, 21, 4, 11, 18, 1, 14, 22];
      return new Set(indices.slice(0, n));
    }
    if (tipo === "sistematico") {
      const k = Math.floor(totalPop / n);
      const start = 1;
      const sel = new Set<number>();
      for (let i = 0; i < n; i++) sel.add((start + i * k) % totalPop);
      return sel;
    }
    if (tipo === "estratificado") {
      const perStrato = Math.floor(n / 3);
      const sel = new Set<number>();
      [0, 1, 2].forEach(s => {
        const members = ids.filter(id => strato(id) === s);
        members.slice(0, perStrato).forEach(m => sel.add(m));
      });
      return sel;
    }
    return new Set<number>();
  })();

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 16, padding: "28px", margin: "32px 0",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.teal,
        letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
        Simulador de Muestreo
      </div>

      {/* Controles */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {(["mas", "sistematico", "estratificado"] as const).map(t => (
          <button key={t} onClick={() => setTipo(t)} style={{
            padding: "8px 18px", borderRadius: 8,
            background: tipo === t ? C.teal : C.bg,
            color: tipo === t ? "#fff" : C.slateMd,
            border: `1.5px solid ${tipo === t ? C.teal : C.border}`,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            {t === "mas" ? "MAS" : t === "sistematico" ? "Sistemático" : "Estratificado"}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <label style={{ fontSize: 12, color: C.slateMd }}>n = </label>
          <input type="range" min={3} max={9} value={n}
            onChange={e => setN(Number(e.target.value))}
            style={{ width: 80 }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.teal, minWidth: 20 }}>{n}</span>
        </div>
      </div>

      {/* Grid de individuos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8, marginBottom: 20 }}>
        {ids.map(id => {
          const isSel = selected.has(id);
          const s = strato(id);
          const color = stratoColors[s];
          return (
            <div key={id} style={{
              width: "100%", aspectRatio: "1",
              borderRadius: 8, background: isSel ? color : `${color}22`,
              border: `2px solid ${isSel ? color : `${color}55`}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: isSel ? 700 : 400,
              color: isSel ? "#fff" : color,
              transition: "all 0.2s",
            }}>
              {id + 1}
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {stratoNames.map((name, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: stratoColors[i] }} />
            <span style={{ color: C.slateMd }}>{name}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.slateMd }}>
          <strong style={{ color: C.teal }}>{selected.size}</strong> de {totalPop} seleccionados
        </div>
      </div>

      <div style={{ marginTop: 16, padding: "12px 16px", background: C.tealLt,
        borderRadius: 10, fontSize: 13, color: C.teal, lineHeight: 1.6 }}>
        {tipo === "mas" && "🎲 Muestreo Aleatorio Simple: cada individuo tiene la misma probabilidad de ser elegido. Ideal cuando la población es homogénea y se tiene acceso a toda la lista."}
        {tipo === "sistematico" && `📋 Sistemático: se selecciona cada k=${Math.floor(totalPop / n)}ᵒ individuo de la lista. Eficiente con registros ordenados; cuidado si existe alguna periodicidad en los datos.`}
        {tipo === "estratificado" && "📊 Estratificado: se garantiza representación de cada servicio (Urgencias, Medicina, Cirugía). Muy útil cuando los grupos difieren entre sí y queremos resultados por subgrupo."}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function FundamentosEstadisticosMuestreo() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif",
      color: C.slate, lineHeight: 1.75 }}>

      <LearningGoals goals={[
        "Distinguir estadística descriptiva de inferencial y saber cuándo usa cada una en tu práctica.",
        "Comprender la diferencia entre parámetros poblacionales y estadísticos muestrales.",
        "Interpretar correctamente medidas de tendencia central (media, mediana, moda) y dispersión (DT, IQR).",
        "Identificar los cuatro tipos principales de muestreo probabilístico y elegir el más adecuado según el contexto.",
        "Entender por qué el tamaño muestral y el diseño del muestreo condicionan la validez de cualquier estudio.",
      ]} />

      {/* ── INTRO ── */}
      <p style={{ fontSize: 16, color: C.slateMd, lineHeight: 1.8, marginBottom: 32 }}>
        Imagina que trabajas en atención primaria y quieres saber cuántos de tus pacientes
        con hipertensión controlan bien su presión arterial. No puedes revisar los 3.000 expedientes
        de tu centro, así que revisas 150 bien elegidos. Con esos 150 datos —tu <strong>muestra</strong>—
        describes lo que observas (<em>estadística descriptiva</em>) y luego extrapolas
        tus conclusiones a los 3.000 (<em>estadística inferencial</em>). Todo lo que aprenderás
        en este módulo es el andamiaje invisible que hace posible esa extrapolación de forma válida.
      </p>

      {/* ══════════════════════════════════════════════
          SECCIÓN 1 — Descriptiva vs Inferencial
      ══════════════════════════════════════════════ */}
      <SectionHeader number="1" title="Descriptiva vs. Inferencial"
        subtitle="Dos caras de la misma moneda, con roles muy distintos" />

      <DiagramaDescInferencial />

      <p>
        La <strong>estadística descriptiva</strong> te da el resumen de lo que ya tienes:
        la media de glucosa de tus 150 pacientes, su distribución por grupo de edad,
        el porcentaje que cumple el objetivo terapéutico. No va más allá de los datos en mano.
      </p>
      <p>
        La <strong>estadística inferencial</strong> es donde ocurre la magia —y el riesgo.
        Usas esos 150 pacientes para afirmar algo sobre los 3.000 del centro, o incluso
        sobre todos los pacientes hipertensos de tu región. Esa generalización solo es válida
        si la muestra fue bien obtenida.
      </p>

      <Callout type="memory" title="La distinción que lo cambia todo">
        Cuando lees en un artículo «la media de la muestra fue 135 mmHg (IC 95%: 132–138)»,
        la media de 135 es <em>descriptiva</em> (dice lo que pasó en esos pacientes).
        El intervalo de confianza 95% es <em>inferencial</em>: estima dónde probablemente
        está la media real de la población. Son dos piezas distintas con interpretaciones distintas.
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 2 — Población, Marco y Muestra
      ══════════════════════════════════════════════ */}
      <SectionHeader number="2" title="Población, Marco Muestral y Muestra"
        subtitle="Tres conceptos que se confunden con frecuencia y tienen consecuencias distintas" />

      <DiagramaPoblacionMuestra />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16, margin: "24px 0" }}>
        <StatCard icon="🌍" value="Población (N)" label="Todos los individuos sobre los que quieres concluir. Puede ser infinita o muy grande." color={C.slateMd} />
        <StatCard icon="📋" value="Marco muestral" label="Lista operativa de donde se extraerá la muestra. Idealmente coincide con la población." color={C.teal} />
        <StatCard icon="🔬" value="Muestra (n)" label="Subconjunto efectivamente estudiado. La calidad del muestreo determina si representa a la población." color={C.blue} />
      </div>

      <Callout type="warning" title="El error del marco muestral: cuando la lista no es toda la población">
        Un estudio clásico de error de marco muestral: encuestar sobre hábitos de salud
        usando el teléfono fijo excluye sistemáticamente a personas jóvenes, nómadas digitales
        y familias de bajos ingresos. Tu marco (personas con teléfono fijo) no coincide con
        tu población objetivo (todos los adultos), y la muestra heredará ese sesgo
        sin importar lo riguroso que seas después.
      </Callout>

      <Callout type="info" title="Parámetros vs. estadísticos: el lenguaje de la inferencia">
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          <li style={{ marginBottom: 6 }}><strong>Parámetro</strong>: valor verdadero de la <em>población</em>. Se denota con letras griegas: μ (media poblacional), σ (desviación estándar poblacional), π (proporción poblacional). <em>Casi nunca lo conocemos.</em></li>
          <li style={{ marginBottom: 6 }}><strong>Estadístico</strong>: valor calculado de la <em>muestra</em>. Se denota con letras latinas: x̄ (media muestral), s (desviación estándar muestral), p (proporción muestral). <em>Es lo que calculas con tus datos.</em></li>
          <li>El objetivo de la inferencia es usar los estadísticos para estimar los parámetros.</li>
        </ul>
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 3 — Medidas de Tendencia Central
      ══════════════════════════════════════════════ */}
      <SectionHeader number="3" title="Medidas de Tendencia Central"
        subtitle="Media, mediana y moda: cuándo usar cada una y por qué importa la distribución" />

      <p>
        Las medidas de tendencia central buscan responder: «¿cuál es el valor típico?».
        Pero «típico» puede significar tres cosas distintas según la distribución de tus datos.
      </p>

      <FormulaBox
        label="Media aritmética (x̄)"
        formula="x̄ = (x₁ + x₂ + … + xₙ) / n = Σxᵢ / n"
        explanation="Suma todos los valores y divide entre el número de observaciones. Sensible a valores extremos (outliers). Válida para variables cuantitativas con distribución aproximadamente simétrica."
      />

      <FormulaBox
        label="Mediana (Me)"
        formula="Valor central cuando los datos están ordenados de menor a mayor"
        explanation="Si n es impar: el valor en la posición (n+1)/2. Si n es par: la media de las posiciones n/2 y n/2+1. Robusta frente a outliers. Preferida en distribuciones asimétricas o variables ordinales."
      />

      <Callout type="success" title="La distribución del tiempo hasta el alta hospitalaria en urgencias">
        Imagina los tiempos de espera en urgencias de un lunes: la mayoría de pacientes
        espera entre 30 y 90 minutos, pero 3 casos complejos esperan 6 horas.
        <br /><br />
        <strong>Media:</strong> inflada por esos 3 casos → puede dar 2,5 horas, que no refleja
        la experiencia del paciente típico.<br />
        <strong>Mediana:</strong> 55 minutos → el valor que verdaderamente divide al 50% «por encima»
        y 50% «por debajo».<br />
        <br />
        Por eso los tiempos de espera en salud se reportan <em>siempre</em> como medianas.
      </Callout>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16, margin: "28px 0" }}>
        {[
          { m: "Media", cuando: "Distribución simétrica, sin outliers extremos", ejemplo: "Glucosa basal en población normoglucémica", icon: "➕" },
          { m: "Mediana", cuando: "Distribución asimétrica, con outliers, ordinal", ejemplo: "Tiempo hasta evento, puntuaciones de dolor", icon: "⚖️" },
          { m: "Moda", cuando: "Variable nominal o para identificar valor más frecuente", ejemplo: "Diagnóstico más común en planta, grupo sanguíneo prevalente", icon: "🏆" },
        ].map((item, i) => (
          <div key={i} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "18px 20px",
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.slate, marginBottom: 6 }}>{item.m}</div>
            <div style={{ fontSize: 12, color: C.slateMd, marginBottom: 10, lineHeight: 1.5 }}>{item.cuando}</div>
            <div style={{ fontSize: 11, color: C.teal, background: C.tealLt,
              borderRadius: 6, padding: "6px 10px" }}>
              📋 {item.ejemplo}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          SECCIÓN 4 — Medidas de Dispersión
      ══════════════════════════════════════════════ */}
      <SectionHeader number="4" title="Medidas de Dispersión"
        subtitle="La media sin dispersión es como un pronóstico sin margen de error: incompleto" />

      <p>
        Dos grupos de pacientes pueden tener exactamente la misma media de presión arterial
        y comportarse de forma completamente distinta en la práctica. La dispersión
        te dice cuánto varían los valores individuales respecto al central.
      </p>

      <FormulaBox
        label="Varianza muestral (s²)"
        formula="s² = Σ(xᵢ − x̄)² / (n − 1)"
        explanation="Promedio de las desviaciones cuadráticas. Se usa n−1 (corrección de Bessel) para obtener un estimador insesgado de la varianza poblacional. Las unidades son el cuadrado de las unidades originales."
      />

      <FormulaBox
        label="Desviación Estándar (s)"
        formula="s = √[Σ(xᵢ − x̄)² / (n − 1)]"
        explanation="Raíz cuadrada de la varianza. Mismas unidades que la variable original. Con distribución normal: ~68% de los datos están en x̄ ± 1s; ~95% en x̄ ± 2s."
      />

      <BoxplotExplicado />

      <FormulaBox
        label="Rango Intercuartílico (IQR)"
        formula="IQR = Q3 − Q1"
        explanation="Dispersión del 50% central de los datos. Robusto a outliers. Complemento natural de la mediana: mediana ± IQR describe bien las distribuciones asimétricas."
      />

      <Callout type="info" title="Coeficiente de Variación (CV): cuando comparar dispersiones de distintas unidades">
        <strong>CV = (s / x̄) × 100%</strong>
        <br /><br />
        ¿La variabilidad en la glucemia (mg/dL) es mayor o menor que la variabilidad en la frecuencia
        cardíaca (lpm)? No puedes comparar directamente las DT porque las unidades son distintas.
        El CV lo resuelve expresando la dispersión como porcentaje de la media.
        <br /><br />
        CV &lt; 15%: baja variabilidad · CV 15–30%: moderada · CV &gt; 30%: alta.
        Útil en control de calidad de laboratorio y reproducibilidad de mediciones.
      </Callout>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 24 }}>
          <thead>
            <tr style={{ background: C.slate }}>
              {["Medida", "Fórmula simplificada", "Robustez a outliers", "Úsala con"].map(h => (
                <th key={h} style={{ padding: "11px 14px", color: "#fff", fontWeight: 600,
                  textAlign: "left", borderBottom: `2px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Rango", "Máx − Mín", "❌ Muy sensible", "Descripción rápida, control de calidad"],
              ["Varianza (s²)", "Σ(xᵢ−x̄)²/(n−1)", "❌ Sensible", "Cálculos intermedios, ANOVA"],
              ["Desviación Estándar (s)", "√Varianza", "❌ Sensible", "Variables normales: HbA1c, PA, peso"],
              ["IQR (Q3−Q1)", "Percentil 75 − Percentil 25", "✅ Robusto", "Tiempos de espera, ingresos, escalas"],
              ["CV (%)", "(s/x̄)×100", "❌ Sensible", "Comparar dispersión entre variables distintas"],
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

      {/* ══════════════════════════════════════════════
          SECCIÓN 5 — Distribución Normal
      ══════════════════════════════════════════════ */}
      <SectionHeader number="5" title="La Distribución Normal"
        subtitle="El modelo probabilístico más útil en biología y medicina" />

      <p>
        La distribución normal (o gaussiana) es una curva simétrica en forma de campana.
        No es un capricho matemático: surge de forma natural cuando muchos factores pequeños
        e independientes se suman (altura, presión arterial, error de medición).
        Entenderla te permite interpretar z-scores, pruebas t, intervalos de confianza
        y prácticamente todo lo que viene en los módulos siguientes.
      </p>

      <svg width="100%" viewBox="0 0 680 200" role="img"
        aria-label="Curva normal con regla empírica 68-95-99.7"
        style={{ display: "block", margin: "1rem 0", height: "auto", maxWidth: 680 }}
        xmlns="http://www.w3.org/2000/svg">
        <title>Distribución normal: regla 68-95-99.7</title>
        {/* Curva normal aproximada con path */}
        <path d="M60,160 C80,160 100,155 120,140 C140,125 150,100 170,75 C185,55 200,45 220,40 C240,35 255,38 270,42 C290,47 310,62 330,72 C345,80 355,80 370,72 C385,62 400,47 420,42 C440,38 455,35 480,40 C500,45 515,55 530,75 C550,100 560,125 580,140 C600,155 620,160 640,160 Z"
          fill="#E6F4F1" stroke="#0F6E56" strokeWidth="2" />
        {/* Línea media */}
        <line x1="350" y1="35" x2="350" y2="165" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="350" y="180" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#0F6E56">μ</text>

        {/* Brackets 68% */}
        <line x1="220" y1="160" x2="480" y2="160" stroke="#B45309" strokeWidth="1" />
        <line x1="220" y1="155" x2="220" y2="165" stroke="#B45309" strokeWidth="1" />
        <line x1="480" y1="155" x2="480" y2="165" stroke="#B45309" strokeWidth="1" />
        <text x="350" y="176" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#B45309">68%  (μ ± 1σ)</text>

        {/* Brackets 95% */}
        <line x1="120" y1="150" x2="580" y2="150" stroke="#1D4ED8" strokeWidth="1" />
        <line x1="120" y1="145" x2="120" y2="155" stroke="#1D4ED8" strokeWidth="1" />
        <line x1="580" y1="145" x2="580" y2="155" stroke="#1D4ED8" strokeWidth="1" />
        <text x="350" y="143" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#1D4ED8">95%  (μ ± 2σ)</text>

        {/* Labels σ */}
        {[
          { x: 220, label: "−2σ" }, { x: 285, label: "−1σ" },
          { x: 350, label: "μ" }, { x: 415, label: "+1σ" }, { x: 480, label: "+2σ" },
        ].map((l, i) => (
          <text key={i} x={l.x} y={24} textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="10" fill="#94A3B8">{l.label}</text>
        ))}
      </svg>

      <Callout type="success" title="La regla empírica 68–95–99.7 en contexto clínico">
        Si la presión arterial sistólica en adultos sanos sigue una distribución normal con
        μ = 120 mmHg y σ = 10 mmHg:
        <ul style={{ paddingLeft: 18, margin: "10px 0 0" }}>
          <li>El <strong>68%</strong> tendrá PAS entre 110 y 130 mmHg (μ ± 1σ).</li>
          <li>El <strong>95%</strong> tendrá PAS entre 100 y 140 mmHg (μ ± 2σ).</li>
          <li>Solo el <strong>5%</strong> estará fuera de ese rango — aquí empiezan los «valores inusuales».</li>
          <li>Un intervalo de referencia clínico del 95% se construye precisamente así.</li>
        </ul>
      </Callout>

      {/* ══════════════════════════════════════════════
          SECCIÓN 6 — Muestreo
      ══════════════════════════════════════════════ */}
      <SectionHeader number="6" title="Muestreo: del Porqué al Cómo"
        subtitle="La ciencia de elegir bien a quiénes estudiar" />

      <p>
        El muestreo no es simplemente «coger algunos pacientes». Es una decisión metodológica
        que condiciona si tus conclusiones serán válidas más allá de los individuos estudiados.
        Un estudio con <em>n</em> = 50 bien seleccionados puede ser más poderoso que uno con
        <em> n</em> = 5.000 mal elegidos.
      </p>

      <DiagramaTiposMuestreo />

      <MuestreoInteractivo />

      <Callout type="warning" title="Error de muestreo vs. sesgo de muestreo">
        <strong>Error de muestreo:</strong> variación aleatoria inevitable entre muestras
        distintas de la misma población. Disminuye al aumentar <em>n</em>. Es cuantificable
        (se expresa como error estándar o intervalo de confianza). No es un error «culpable»,
        es parte natural de la inferencia estadística.
        <br /><br />
        <strong>Sesgo de muestreo:</strong> distorsión sistemática porque la muestra no representa
        a la población (voluntarios, personas accesibles, solo casos graves). <em>No mejora
        con más tamaño muestral</em>: si el método está sesgado, multiplicar <em>n</em> solo
        magnifica el error.
      </Callout>

      <Callout type="memory" title="Muestreo no probabilístico: cuando la aleatoriedad no es posible">
        En investigación clínica real a veces no puedes aleatorizar. Los tipos más comunes:
        <ul style={{ paddingLeft: 18, margin: "10px 0 0" }}>
          <li><strong>Conveniencia:</strong> pacientes del propio servicio. Rápido, pero sesgado hacia los que llegan a tu centro.</li>
          <li><strong>Intencional (propósito):</strong> seleccionas casos que cumplen criterios específicos. Útil para estudios cualitativos o piloto.</li>
          <li><strong>Bola de nieve:</strong> participantes reclutan a otros. Aplicable en poblaciones ocultas o estigmatizadas (adicciones, VIH).</li>
          <li><strong>Cuotas:</strong> fijas proporciones de subgrupos. Similar al estratificado pero sin aleatoriedad dentro de cada cuota.</li>
        </ul>
        <br />
        La clave: <em>reportar siempre el método de muestreo</em> y sus limitaciones en la sección de métodos.
      </Callout>

      {/* Flashcards */}
      <SectionHeader number="7" title="Consolida: Preguntas Clave"
        subtitle="Desplega cada tarjeta para verificar tu comprensión" />

      <Flashcard
        question="¿Cuál es la diferencia entre μ (mu) y x̄ (x barra)?"
        answer={
          <span>
            μ es la <strong>media poblacional</strong>: el valor verdadero de toda la población,
            que raramente conocemos y nunca podemos calcular directamente (habría que medir a todos).
            x̄ es la <strong>media muestral</strong>: lo que calculas con tus datos.
            Cuando haces inferencia estadística, usas x̄ para <em>estimar</em> μ,
            con un margen de error que se expresa como intervalo de confianza.
          </span>
        }
      />

      <Flashcard
        question="¿Cuándo es mejor reportar la mediana que la media?"
        answer={
          <span>
            Cuando la distribución es <strong>asimétrica</strong> (tiempo hasta evento,
            costes hospitalarios, número de ingresos) o cuando hay <strong>valores extremos</strong>
            que alejan la media del valor «típico». La mediana es también la medida adecuada
            para <strong>variables ordinales</strong> (escalas de dolor, estadiajes, triage).
            Regla práctica: si la media y la mediana difieren notablemente, usa la mediana
            como medida principal y reporta la media como secundaria o no la reportes.
          </span>
        }
      />

      <Flashcard
        question="¿Por qué el muestreo estratificado proporcional es preferido en muchos estudios de salud?"
        answer={
          <span>
            Porque garantiza que subgrupos importantes (por sexo, grupo etario, diagnóstico principal)
            estén representados en la muestra en la misma proporción que en la población.
            Esto hace que las estimaciones dentro de cada subgrupo sean más <strong>precisas</strong>
            y permite comparaciones válidas entre grupos sin necesidad de tamaños muestrales
            desproporcionadamente grandes. Es el método usado habitualmente en encuestas nacionales
            de salud y estudios epidemiológicos multicéntricos.
          </span>
        }
      />

      {/* Quizzes */}
      <Quiz
        question="Un farmacéutico analiza el número de medicamentos por paciente polimedicado en su farmacia. Los datos muestran que la mayoría toma entre 5 y 8, pero hay 4 pacientes que toman más de 15. ¿Qué medida de tendencia central es más apropiada para describir la «carga farmacológica típica»?"
        options={[
          { text: "Media aritmética", correct: false },
          { text: "Mediana", correct: true },
          { text: "Moda", correct: false },
          { text: "Media geométrica", correct: false },
        ]}
        explanation="Los 4 pacientes con más de 15 medicamentos inflarán la media hacia arriba, haciendo que no represente bien al paciente típico. La mediana es robusta a estos valores extremos y refleja el valor central real de la distribución asimétrica. La moda podría ser útil como complemento para identificar el número más frecuente, pero no como medida de tendencia central principal."
      />

      <Quiz
        question="Un investigador quiere estudiar la adherencia al tratamiento antihipertensivo en adultos mayores de su ciudad (N = 80.000 aprox.). Tiene acceso a los registros de 5 centros de salud. El objetivo es que los resultados representen tanto a zonas urbanas (60% de la población) como a rurales (40%). ¿Cuál es el método de muestreo más adecuado?"
        options={[
          { text: "Muestreo aleatorio simple", correct: false },
          { text: "Muestreo sistemático de los registros de un solo centro", correct: false },
          { text: "Muestreo estratificado por zona (urbana/rural) con asignación proporcional", correct: true },
          { text: "Muestreo por conveniencia en la farmacia del investigador", correct: false },
        ]}
        explanation="El muestreo estratificado proporcional garantiza que el 60% de la muestra provenga de zonas urbanas y el 40% de rurales, igual que en la población. Esto permite comparar adherencia entre zonas y obtener estimaciones globales sin sesgo de representación. El MAS también sería válido pero menos eficiente si los estratos son muy diferentes entre sí. El muestreo por conveniencia introduciría sesgo sistemático no cuantificable."
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
                authors: "Gordis, L. (2014).",
                title: "Epidemiology",
                rest: " (5ª ed.). Elsevier Saunders.",
                note: "Capítulos 2–4: población, muestra y medidas descriptivas con ejemplos de salud pública.",
              },
              {
                authors: "Levy, P. S. & Lemeshow, S. (2008).",
                title: "Sampling of Populations: Methods and Applications",
                rest: " (4ª ed.). Wiley.",
                note: "El texto de referencia en muestreo en poblaciones finitas aplicado a investigación en salud.",
              },
              {
                authors: "Altman, D. G. (1991).",
                title: "Practical Statistics for Medical Research",
                rest: ". Chapman & Hall.",
                note: "Medidas descriptivas y muestreo explicados para el clínico sin formación matemática avanzada.",
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>{item.authors} <em>{item.title}</em>{item.rest}</div>
                <div style={{ fontSize: 11, color: C.slateMd, marginTop: 3 }}>{item.note}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.slate, marginBottom: 12 }}>Para profundizar</h3>
            {[
              {
                authors: "Hulley, S. B. et al. (2013).",
                title: "Designing Clinical Research",
                rest: " (4ª ed.). Wolters Kluwer.",
                note: "Diseño de estudios en salud con énfasis en validez interna y externa del muestreo.",
              },
              {
                authors: "Field, A. (2018).",
                title: "Discovering Statistics Using IBM SPSS Statistics",
                rest: " (5ª ed.). SAGE.",
                note: "Capítulo 1: distribución normal, estadísticos descriptivos e introducción a la inferencia.",
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>{item.authors} <em>{item.title}</em>{item.rest}</div>
                <div style={{ fontSize: 11, color: C.slateMd, marginTop: 3 }}>{item.note}</div>
              </div>
            ))}
            <div style={{ background: C.tealLt, borderRadius: 10, padding: "14px 16px", marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.teal, marginBottom: 6 }}>🔗 Herramienta práctica</div>
              <div style={{ fontSize: 12, color: C.teal }}>
                <strong>OpenEpi.com</strong> — calculadora gratuita de tamaños muestrales para estudios en salud.
                Permite calcular n para proporciones, medias y estudios de casos y controles.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
