/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12151C',
          light: '#1B202B',
          lighter: '#252B38',
        },
        parchment: '#EDEAE3',
        amber: {
          DEFAULT: '#E8A33D',
          soft: '#F0BB6B',
        },
        sage: {
          DEFAULT: '#7FA98D',
          soft: '#9CC0AC',
        },
        coral: {
          DEFAULT: '#D9695F',
          soft: '#E38B83',
        },
        muted: '#8A8F9C',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
