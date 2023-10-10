import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        monoLisa: 'var(--font-monolisa)', // in any page we use font-monolisa
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter'],
  },
};

export default config;
