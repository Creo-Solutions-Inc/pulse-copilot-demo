/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e1a730',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        pulse: {
          primary: '#e1a730',
          'primary-content': '#000000',
          secondary: '#334155',
          'secondary-content': '#ffffff',
          accent: '#0891b2',
          'accent-content': '#ffffff',
          neutral: '#374151',
          'neutral-content': '#f3f4f6',
          'base-100': '#ffffff',
          'base-200': '#f8f9fa',
          'base-300': '#e5e7eb',
          'base-content': '#1f2937',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
}