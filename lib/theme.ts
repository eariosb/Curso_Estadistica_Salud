export const colors = {
  bg: "#F9FAFB",
  fg: "#1E293B",
  primary: "#2563EB",
  primaryLight: "#EFF6FF",
  secondary: "#059669",
  secondaryLight: "#ECFDF5",
  warning: "#D97706",
  warningLight: "#FFFBEB",
  purple: "#7C3AED",
  purpleLight: "#F3E8FF",
  muted: "#F1F5F9",
  card: "#FFFFFF",
  border: "#E2E8F0",
  fgMuted: "#64748B",
  fgSubtle: "#94A3B8",
} as const;

export type CalloutType =
  | "info"
  | "warning"
  | "tip"
  | "curiosity"
  | "success"
  | "memory"
  | "danger"
  | "range"
  | "checkbox";

export const calloutConfig: Record<
  CalloutType,
  { icon: string; bg: string; border: string; titleColor: string }
> = {
  info: {
    icon: "💡",
    bg: "#EFF6FF",
    border: "rgba(37,99,235,0.15)",
    titleColor: "#2563EB",
  },
  warning: {
    icon: "⚠️",
    bg: "#FFFBEB",
    border: "rgba(217,119,6,0.15)",
    titleColor: "#D97706",
  },
  tip: {
    icon: "✅",
    bg: "#ECFDF5",
    border: "rgba(5,150,105,0.15)",
    titleColor: "#059669",
  },
  curiosity: {
    icon: "🔬",
    bg: "#F3E8FF",
    border: "rgba(124,58,237,0.15)",
    titleColor: "#7C3AED",
  },
  success: {
    icon: "✅",
    bg: "#ECFDF5",
    border: "rgba(5,150,105,0.2)",
    titleColor: "#059669",
  },
  memory: {
    icon: "🧠",
    bg: "#EDE9FE",
    border: "rgba(109,40,217,0.15)",
    titleColor: "#6D28D9",
  },
  danger: {
    icon: "🚨",
    bg: "#FFF1F2",
    border: "rgba(190,18,60,0.15)",
    titleColor: "#BE123C",
  },
  range: {
    icon: "📊",
    bg: "#F0F9FF",
    border: "rgba(14,165,233,0.15)",
    titleColor: "#0369A1",
  },
  checkbox: {
    icon: "☑️",
    bg: "#F8FAFC",
    border: "rgba(100,116,139,0.2)",
    titleColor: "#475569",
  },
};
