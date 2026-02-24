/**
 * Kernel Prototype Color Theme
 * Extracted from css/styles.css — use in React applications
 * Only includes colors that exist in the prototype.
 */

export const theme = {
  brand: {
    primary: "#193e6b",
    primaryHover: "#142a53",
    primaryActive: "#112c4e",
    accent: "#B3A125",
    accentHoverBg: "rgba(179, 161, 37, 0.1)",
    logoGradient: "linear-gradient(135deg, #112c4e 0%, #193e6b 50%, #1f4d82 100%)",
  },
  background: {
    page: "#EEE7E0",
    surface: "#FFFFFF",
    readonly: "#f5f5f5",
  },
  primary: {
    main: "#193e6b",
  },
  secondary: {
    main: "#448E9D",
    hover: "#3a7d8a",
  },
  accent: {
    main: "#B3A125",
  },
  text: {
    primary: "#333333",
    secondary: "#666666",
    muted: "#999999",
    hint: "#888888",
    link: "#0078d4",
    moduleLeadLink: "#2563eb",
    disabled: "#999999",
  },
  success: {
    main: "#5F8025",
    bg: "rgba(95, 128, 37, 0.1)",
    bgMedium: "rgba(95, 128, 37, 0.12)",
  },
  warning: {
    main: "#E9AC53",
    dark: "#b07a1a",
    bg: "rgba(233, 172, 83, 0.1)",
    bgMedium: "rgba(233, 172, 83, 0.15)",
  },
  danger: {
    main: "#991547",
    bg: "rgba(153, 21, 71, 0.1)",
    bgMedium: "rgba(153, 21, 71, 0.12)",
  },
  info: {
    main: "#0078d4",
  },
  border: {
    default: "rgba(0, 0, 0, 0.12)",
    light: "rgba(0, 0, 0, 0.08)",
    input: "#d0d4da",
    divider: "#eeeeee",
    focus: "#B3A125",
  },
  badge: {
    success: { bg: "rgba(95, 128, 37, 0.12)", text: "#5F8025" },
    danger: { bg: "rgba(153, 21, 71, 0.1)", text: "#991547" },
    warning: { bg: "rgba(233, 172, 83, 0.1)", text: "#E9AC53" },
    secondary: { bg: "rgba(68, 142, 157, 0.1)", text: "#448E9D" },
    accent: { bg: "rgba(179, 161, 37, 0.1)", text: "#B3A125" },
    primary: { bg: "rgba(25, 62, 107, 0.08)", text: "#193e6b" },
    auditFailed: { bg: "rgba(233, 172, 83, 0.15)", text: "#b07a1a" },
    locked: { bg: "rgba(0, 0, 0, 0.06)", text: "#999999" },
  },
  toast: {
    success: "#2d6b47",
    error: "#7a1f3a",
    info: "#193e6b",
  },
  shadow: {
    default: "0 3px 10px rgba(0, 0, 0, 0.05)",
    large: "0 5px 20px rgba(0, 0, 0, 0.08)",
    modal: "0 20px 60px rgba(0, 0, 0, 0.3)",
    dropdown: "0 8px 32px rgba(0, 0, 0, 0.18)",
    focus: "0 0 0 3px rgba(179, 161, 37, 0.15)",
  },
  violet: "#7F3F98",
  white: "#FFFFFF",
};
