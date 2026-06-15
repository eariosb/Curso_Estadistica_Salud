"use client";

import { useState } from "react";

interface Option {
  text: string;
  correct: boolean;
}

interface Props {
  question: string;
  options: Option[];
  explanation?: string;
}

export default function Quiz({ question, options, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  return (
    <div
      className="rounded-2xl border my-6 p-5"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <p
        className="text-[0.7rem] font-bold uppercase tracking-widest mb-3"
        style={{ color: "var(--primary)" }}
      >
        Quiz de verificación
      </p>
      <p
        className="text-[0.95rem] font-semibold mb-4 leading-snug"
        style={{ color: "var(--fg)" }}
      >
        {question}
      </p>

      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const answered = selected !== null;
          const isCorrect = opt.correct;

          let bg = "var(--card)";
          let border = "var(--border)";
          let color = "var(--fg)";

          if (answered) {
            if (isCorrect) {
              bg = "var(--secondary-light)";
              border = "var(--secondary)";
              color = "#065f46";
            } else if (isSelected && !isCorrect) {
              bg = "#FEF2F2";
              border = "#EF4444";
              color = "#991B1B";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className="text-left px-4 py-3 rounded-xl text-sm border-2 transition-all"
              style={{
                background: bg,
                borderColor: border,
                color,
                cursor: answered ? "default" : "pointer",
                fontWeight: answered && isCorrect ? 600 : 400,
              }}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {selected !== null && explanation && (
        <div
          className="mt-4 px-4 py-3 rounded-xl text-sm leading-relaxed"
          style={{ background: "var(--muted)", color: "var(--fg-muted)" }}
        >
          {explanation}
        </div>
      )}
    </div>
  );
}
