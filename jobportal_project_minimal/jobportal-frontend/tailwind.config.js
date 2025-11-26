// tailwind.config.js
export const content = ["./index.html", "./src/**/*.{js,jsx}"];

export const theme = {
  extend: {
    keyframes: {
      rotation: {
        "0%": { transform: "rotate(0deg)" },
        "50%": { transform: "rotate(180deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      lines: {
        "0%": { transform: "translateY(-10px)" },
        "100%": { transform: "translateY(8px)" },
      },
      cloud: {
        "0%": { transform: "translateX(0) scale(1)", opacity: "0.85" },
        "50%": { transform: "translateX(6px) scale(1.08)", opacity: "1" },
        "100%": { transform: "translateX(0) scale(1)", opacity: "0.85" },
      },

      // ⭐ Added floating animations for background shapes
      float: {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-20px)" },
        "100%": { transform: "translateY(0px)" },
      },
      float2: {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-15px)" },
        "100%": { transform: "translateY(0px)" },
      },
      floatDelay: {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-25px)" },
        "100%": { transform: "translateY(0px)" },
      },

      // ⭐ FIXED fadeIn (was outside extend earlier)
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },

    animation: {
      fadeIn: "fadeIn 0.6s ease-in forwards",
      rotation: "rotation 1s linear infinite",
      lines: "lines 0.75s linear infinite",
      cloud: "cloud 2s ease-in-out infinite",

      // ⭐ Add floating animations
      float: "float 6s ease-in-out infinite",
      float2: "float2 7s ease-in-out infinite",
      floatDelay: "floatDelay 8s ease-in-out infinite",
    },

    dropShadow: {
      "glow-black": "0 0 8px rgba(0,0,0,0.6)",
    },
  },
};

export const plugins = [];
