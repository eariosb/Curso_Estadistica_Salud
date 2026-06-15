"use client";

import { useState } from "react";

interface Props {
  question: string;
  answer: React.ReactNode;
}

export default function Flashcard({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl border overflow-hidden my-5 cursor-pointer transition-all"
      style={{
        borderColor: open ? "var(--primary)" : "var(--border)",
        boxShadow: open ? "0 0 0 3px rgba(37,99,235,0.08)" : "none",
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Question */}
      <div
        className="px-5 py-4 flex items-center justify-between gap-4"
        style={{ background: "var(--muted)" }}
      >
        <span
          className="text-sm font-semibold flex-1"
          style={{ color: "var(--fg)" }}
        >
          {question}
        </span>
        <span
          className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all"
          style={{
            background: open ? "var(--primary)" : "var(--card)",
            color: open ? "#fff" : "var(--fg-muted)",
            transform: open ? "rotate(45deg)" : "none",
            border: "1px solid var(--border)",
          }}
        >
          +
        </span>
      </div>

      {/* Answer */}
      {open && (
        <div
          className="px-5 py-4 text-sm leading-relaxed border-t"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--fg)",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
