import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        red: "#D92929",
        orange: "#F2BB16",
        yellow: "#FEE500",
        blue: "#296CF2",
        green: "#17A649",
        purple: "#9538F2",
        "light-gray": "#F2F4FB",
        "dark-gray": "#5F6680",
        "middle-blue-gray": "#B2BBDD",
        "light-blue-gray": "#DCE1F2",
        "bright-blue-gray": "#F2F4FB",
        "pale-blue": "#FCFCFF",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)"],
      },
      textShadow: {
        neon: "0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 5px rgba(250, 235, 44, 0.5), 0 0 10px rgba(250, 235, 44, 0.4), 0 0 15px rgba(250, 235, 44, 0.3), 0 0 20px rgba(250, 235, 44, 0.2), 0 0 25px rgba(250, 235, 44, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
