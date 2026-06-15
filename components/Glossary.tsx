"use client";

import { X, BookMarked } from "lucide-react";
import { colors } from "@/lib/theme";

export interface GlossaryTerm {
  term: string;
  definition: string;
  modules: string[]; // e.g. ["02", "03"]
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "p-valor",
    definition:
      "Probabilidad de observar un resultado tan extremo (o más) que el obtenido, si la hipótesis nula fuera cierta. No es la probabilidad de que la hipótesis nula sea verdadera.",
    modules: ["03", "08", "09"],
  },
  {
    term: "Intervalo de confianza (IC 95%)",
    definition:
      "Rango de valores plausibles para un parámetro poblacional, calculado de forma que, si repitiéramos el estudio muchas veces, el 95% de esos intervalos contendrían el valor real.",
    modules: ["03", "08"],
  },
  {
    term: "Odds ratio (OR)",
    definition:
      "Cociente entre la probabilidad (en forma de odds) de que ocurra un evento en el grupo expuesto frente al grupo no expuesto. Frecuente en estudios de casos y controles.",
    modules: ["06", "09", "11"],
  },
  {
    term: "Riesgo relativo (RR)",
    definition:
      "Cociente entre la probabilidad de que ocurra un evento en el grupo expuesto y la probabilidad de que ocurra en el grupo no expuesto. Frecuente en estudios de cohortes y ECA.",
    modules: ["06", "09"],
  },
  {
    term: "NNT (Número Necesario a Tratar)",
    definition:
      "Número de pacientes que deben recibir un tratamiento para prevenir un evento adicional, comparado con el control. Se calcula como el inverso de la reducción absoluta del riesgo.",
    modules: ["08", "12"],
  },
  {
    term: "Censura",
    definition:
      "En análisis de supervivencia, ocurre cuando no se observa el evento de interés durante el seguimiento (por pérdida de seguimiento, fin del estudio, etc.), pero se sabe que el paciente estuvo libre de evento hasta ese momento.",
    modules: ["10"],
  },
  {
    term: "Sensibilidad",
    definition:
      "Proporción de personas con la enfermedad que la prueba identifica correctamente como positivas (verdaderos positivos / total de enfermos).",
    modules: ["01", "09"],
  },
  {
    term: "Especificidad",
    definition:
      "Proporción de personas sin la enfermedad que la prueba identifica correctamente como negativas (verdaderos negativos / total de sanos).",
    modules: ["01", "09"],
  },
  {
    term: "Valor Predictivo Positivo (VPP)",
    definition:
      "Probabilidad de que una persona con resultado positivo realmente tenga la enfermedad. Depende fuertemente de la prevalencia, no solo de la calidad de la prueba.",
    modules: ["01"],
  },
  {
    term: "Valor Predictivo Negativo (VPN)",
    definition:
      "Probabilidad de que una persona con resultado negativo realmente no tenga la enfermedad. También depende de la prevalencia.",
    modules: ["01"],
  },
  {
    term: "Sesgo",
    definition:
      "Error sistemático (no aleatorio) en el diseño, conducción o análisis de un estudio que distorsiona la estimación del efecto en una dirección particular.",
    modules: ["05"],
  },
  {
    term: "Confusión (variable confusora)",
    definition:
      "Variable asociada tanto a la exposición como al resultado, que distorsiona la asociación observada entre ambas si no se controla adecuadamente.",
    modules: ["05", "11"],
  },
  {
    term: "Regresión lineal",
    definition:
      "Modelo estadístico que describe la relación entre una variable dependiente continua y una o más variables independientes mediante una ecuación lineal.",
    modules: ["07"],
  },
  {
    term: "R² (coeficiente de determinación)",
    definition:
      "Proporción de la variabilidad de la variable dependiente que es explicada por el modelo de regresión. Va de 0 a 1 (o 0% a 100%).",
    modules: ["07"],
  },
  {
    term: "ANOVA",
    definition:
      "Análisis de varianza: prueba estadística que compara las medias de tres o más grupos para determinar si al menos una difiere significativamente de las demás.",
    modules: ["09", "11"],
  },
  {
    term: "Significancia estadística",
    definition:
      "Indica que un resultado es poco probable bajo el azar (típicamente p < 0.05). No implica necesariamente que el efecto sea grande o clínicamente relevante.",
    modules: ["08"],
  },
  {
    term: "Relevancia clínica",
    definition:
      "Magnitud de un efecto que es suficientemente grande como para importar en la práctica, independientemente de si alcanzó significancia estadística.",
    modules: ["08"],
  },
  {
    term: "Hipótesis nula (H₀)",
    definition:
      "Afirmación de que no existe efecto o diferencia entre los grupos comparados; es la hipótesis que las pruebas estadísticas intentan rechazar.",
    modules: ["03", "08"],
  },
  {
    term: "Potencia estadística",
    definition:
      "Probabilidad de detectar un efecto real (rechazar correctamente H₀) si efectivamente existe. Depende del tamaño muestral, el tamaño del efecto y el nivel de significancia.",
    modules: ["06", "08"],
  },
  {
    term: "Variable (tipos)",
    definition:
      "Característica medible que puede tomar distintos valores. Se clasifican en cualitativas (nominales, ordinales) y cuantitativas (discretas, continuas).",
    modules: ["02"],
  },
  {
    term: "Teorema de Bayes",
    definition:
      "Fórmula que permite actualizar la probabilidad de una hipótesis (por ejemplo, tener una enfermedad) a la luz de nueva evidencia (por ejemplo, un resultado de prueba).",
    modules: ["04"],
  },
  {
    term: "Curva de Kaplan-Meier",
    definition:
      "Representación gráfica de la probabilidad de supervivencia (o de estar libre de un evento) a lo largo del tiempo, que tiene en cuenta los datos censurados.",
    modules: ["10"],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Glossary({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Glosario de términos estadísticos"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,23,42,0.45)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "relative",
          width: "min(420px, 100%)",
          maxWidth: "100vw",
          height: "100%",
          background: colors.card,
          boxShadow: "-8px 0 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            borderBottom: `1px solid ${colors.border}`,
            background: colors.primaryLight,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <BookMarked size={20} color={colors.primary} />
            <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: colors.fg }}>
              Glosario estadístico
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar glosario"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "0.35rem",
              borderRadius: "0.5rem",
              display: "flex",
              color: colors.fgMuted,
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "1rem 1.25rem", flex: 1 }}>
          <p style={{ fontSize: "0.8rem", color: colors.fgMuted, marginBottom: "1rem", lineHeight: 1.5 }}>
            Definiciones breves de los términos estadísticos más usados en el curso. El
            número entre paréntesis indica el módulo donde se explica en profundidad.
          </p>
          {glossaryTerms.map((t) => (
            <div
              key={t.term}
              style={{
                paddingBottom: "0.85rem",
                marginBottom: "0.85rem",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: colors.fg }}>
                {t.term}{" "}
                <span style={{ fontWeight: 500, fontSize: "0.75rem", color: colors.primary }}>
                  ({t.modules.map((m) => `Mód. ${m}`).join(", ")})
                </span>
              </p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: colors.fgMuted, lineHeight: 1.55 }}>
                {t.definition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
