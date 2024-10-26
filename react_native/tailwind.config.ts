/* eslint-disable @typescript-eslint/no-magic-numbers */
/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#FEF5ED",
          100: "#FEEDDE",
          150: "#FDE3CB",
          200: "#FDD6BD",
          250: "#FCC1A5",
          300: "#FBB89B",
          350: "#FAA08C",
          400: "#F79C81",
          450: "#F4886C",
          500: "#F27059",
          550: "#E15E4F",
          600: "#D04B41",
          650: "#BA3F3A",
          700: "#AE2C2D",
          750: "#942426",
          800: "#8C1C25",
          850: "#7B1623",
          900: "#741120",
          950: "#5C0B1B",
        },
      },
    },
  },
};

module.exports = config;
