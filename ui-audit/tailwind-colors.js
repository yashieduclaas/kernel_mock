/**
 * Tailwind color extension for Kernel Prototype
 * The Kernel prototype does not use Tailwind; this file is generated
 * for use when adopting Tailwind in a React application.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#193e6b",
          "primary-hover": "#142a53",
          accent: "#B3A125",
        },
        kernel: {
          midnight: "#193e6b",
          gold: "#B3A125",
          violet: "#7F3F98",
          "jelly-blue": "#448E9D",
          sunray: "#E9AC53",
          avocado: "#5F8025",
          "violet-red": "#991547",
          beige: "#EEE7E0",
          dark: "#333333",
        },
        // Semantic overrides
        primary: {
          DEFAULT: "#193e6b",
          hover: "#142a53",
        },
        success: {
          DEFAULT: "#5F8025",
          bg: "rgba(95, 128, 37, 0.1)",
        },
        warning: {
          DEFAULT: "#E9AC53",
          dark: "#b07a1a",
        },
        danger: {
          DEFAULT: "#991547",
          bg: "rgba(153, 21, 71, 0.1)",
        },
      },
      backgroundColor: {
        page: "#EEE7E0",
        surface: "#FFFFFF",
      },
    },
  },
};
