module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F9FAFB",
          dark: "#0A0A0A", // Deeper black for better contrast
          secondary: "#F3F4F6",
          "dark-secondary": "#1A1A1A",
        },
        foreground: {
          DEFAULT: "#1A1A1A",
          dark: "#FFFFFF",
          muted: "#6B7280",
          "dark-muted": "#9CA3AF",
        },
        primary: {
          DEFAULT: "#FF6F00", // Your vibrant orange
          50: "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB74D",
          400: "#FFA726",
          500: "#FF6F00",
          600: "#F45100",
          700: "#C43E00",
          800: "#A63100",
          900: "#7F2704",
          950: "#5D1C02",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#00C853", // Your vibrant green
          50: "#E8F5E8",
          100: "#C8E6C8",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#00C853",
          600: "#00B248",
          700: "#009624",
          800: "#00791A",
          900: "#005F12",
          950: "#004509",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#00E5FF", // Your cyan accent
          50: "#E0F7FF",
          100: "#B3ECFF",
          200: "#80DEEA",
          300: "#4DD0E1",
          400: "#26C6DA",
          500: "#00E5FF",
          600: "#00B8D4",
          700: "#0091EA",
          800: "#0277BD",
          900: "#01579B",
          950: "#014A87",
          foreground: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "#FF3D00", // Your vibrant red
          50: "#FFEBEE",
          100: "#FFCDD2",
          200: "#EF9A9A",
          300: "#E57373",
          400: "#EF5350",
          500: "#FF3D00",
          600: "#E53935",
          700: "#D32F2F",
          800: "#C62828",
          900: "#B71C1C",
          foreground: "#FFFFFF",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1E1E1E",
          glass: "rgba(255, 255, 255, 0.1)",
          "glass-dark": "rgba(255, 255, 255, 0.05)",
          foreground: "#1A1A1A",
          darkForeground: "#E5E7EB",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          dark: "#1E1E1E",
          glass: "rgba(255, 255, 255, 0.95)",
          "glass-dark": "rgba(30, 30, 30, 0.95)",
          foreground: "#1A1A1A",
          darkForeground: "#E5E7EB",
        },
        muted: {
          DEFAULT: "#D1D5DB",
          dark: "#4B5563",
          foreground: "#6B7280",
          darkForeground: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#374151",
          glass: "rgba(255, 255, 255, 0.2)",
          "glass-dark": "rgba(255, 255, 255, 0.1)",
        },
        input: {
          DEFAULT: "#F9FAFB",
          dark: "#2C2C2C",
          glass: "rgba(255, 255, 255, 0.1)",
          "glass-dark": "rgba(255, 255, 255, 0.05)",
        },
        ring: "#FF6F00",
        chart: {
          1: "#FF6F00", // Primary orange
          2: "#00C853", // Secondary green
          3: "#00E5FF", // Accent cyan
          4: "#FF3D00", // Destructive red
          5: "#737373", // Neutral
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Orbitron", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        92: "23rem",
        96: "24rem",
        104: "26rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
        "5xl": "96px",
      },
      boxShadow: {
        // Glassmorphism shadows
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "glass-xl": "0 35px 60px -12px rgba(0, 0, 0, 0.3)",
        // Neon glows
        neon: "0 0 10px #FF6F00, 0 0 20px #FF6F00, 0 0 30px #FF6F00",
        "neon-sm": "0 0 5px #FF6F00, 0 0 10px #FF6F00",
        "neon-lg": "0 0 20px #FF6F00, 0 0 30px #FF6F00, 0 0 40px #FF6F00",
        "neon-secondary":
          "0 0 10px #00C853, 0 0 20px #00C853, 0 0 30px #00C853",
        "neon-accent": "0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #00E5FF",
        // Modern card shadows
        "card-hover":
          "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "card-focus": "0 20px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        // Existing animations
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",

        // Pulse animations
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        // Glow animations
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-pulse": "glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        // Float animations
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out infinite 1.5s",

        // Rotation animations
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin-reverse 3s linear infinite",

        // Scale animations
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #FF6F00, 0 0 10px #FF6F00" },
          "100%": {
            boxShadow: "0 0 10px #FF6F00, 0 0 20px #FF6F00, 0 0 30px #FF6F00",
          },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 111, 0, 0.4)" },
          "50%": {
            boxShadow:
              "0 0 20px rgba(255, 111, 0, 0.8), 0 0 30px rgba(255, 111, 0, 0.6)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-5%)" },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
        filter: "filter",
        backdrop: "backdrop-filter",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        900: "900ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "bounce-out": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      blur: {
        "4xl": "72px",
        "5xl": "96px",
        "6xl": "128px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for glassmorphism utilities
    function ({ addUtilities }) {
      const newUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(255, 255, 255, 0.05)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-strong": {
          background: "rgba(255, 255, 255, 0.2)",
          "backdrop-filter": "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
        ".text-gradient-primary": {
          background: "linear-gradient(135deg, #FF6F00, #F45100)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-secondary": {
          background: "linear-gradient(135deg, #00C853, #00B248)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-accent": {
          background: "linear-gradient(135deg, #00E5FF, #00B8D4)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
