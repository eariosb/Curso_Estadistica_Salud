import { CalloutType, calloutConfig } from "@/lib/theme";

interface Props {
  type: CalloutType;
  title: string;
  children: React.ReactNode;
}

export default function Callout({ type, title, children }: Props) {
  const cfg = calloutConfig[type];
  return (
    <div
      className="rounded-xl p-4 my-5 flex gap-3 border"
      style={{
        background: cfg.bg,
        borderColor: cfg.border,
      }}
    >
      <span className="text-lg flex-shrink-0 mt-0.5">{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-bold mb-1"
          style={{ color: cfg.titleColor }}
        >
          {title}
        </p>
        <div
          className="text-sm leading-relaxed"
          style={{ color: "var(--fg)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
