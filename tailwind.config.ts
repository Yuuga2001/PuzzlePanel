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
        'stone-light': '#d4b483', // 明るい黄土色
        'stone-dark': '#3a3a3a',   // 黒っぽい石板
        'symbol-light': '#ffffff', // O の色
        'symbol-dark': '#212121', // X の色
        'background': '#2a2a2a', // 神殿の背景
      },
      boxShadow: {
        'inner-strong': 'inset 0 4px 8px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
