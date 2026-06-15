interface Step {
  step: number | string;
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
}

export default function ProcessSteps({ steps }: Props) {
  return (
    <div className="my-6 space-y-0">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4 relative">
          {/* Connector line */}
          {i < steps.length - 1 && (
            <span
              className="absolute left-[17px] top-9 bottom-0 w-0.5"
              style={{ background: "var(--border)" }}
            />
          )}

          {/* Step number */}
          <div
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white relative z-10"
            style={{ background: "var(--primary)" }}
          >
            {s.step}
          </div>

          {/* Content */}
          <div className="pb-6 pt-1 flex-1">
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--fg)" }}
            >
              {s.title}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              {s.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
