import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-reverse": "spin 1s linear infinite reverse",
      },
      screens: {
        sms: { min: "400px" },
      },
      boxShadow: {
        "form-auth": "inset 0 0 0px 1000px rgb(14, 86, 153)",
      },
      colors: {
        theme: {
          light: "#050A30",
        },
        navbar: {
          light: "rgba(15, 23, 42)",
          border: "#DEE2E6",
          text: "#FFFFFF",
          hover: {
            text: "rgb(156 163 175) ",
          },
        },
        sidebar: {
          dark: "rgba(15, 23, 42)",
        },
        button: {
          light: "#007BFF",
          hover: "#74C0FC",
        },
        form: {
          autofill: {
            slate: "#cbd5e1",
          },
          dark: "#0e5699",
          border: {
            dark: "#74C0FC",
            focus: {
              dark: "#053961",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["autofill"],
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    plugin(function ({
      addVariant,
    }: {
      addVariant: (name: string, selector: string) => void;
    }) {
      addVariant("autofill", "&:-webkit-autofill");
    }),
  ],
};
export default config;
