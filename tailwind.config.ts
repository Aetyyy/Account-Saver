import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#050A30",
        },
        navbar: {
          light: "rgba(15, 23, 42, 0.8)",
          border: "#DEE2E6",
          text: "#FFFFFF",
          hover: {
            text: "rgb(156 163 175) ",
          },
        },
        button: {
          light: "#007BFF",
          hover: "#74C0FC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
