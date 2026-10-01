export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#fdfbf7',
          dark: '#1c1917',
        },
        rose: {
          light: '#ffe4e6',
          dark: '#881337',
        }
      },
      fontFamily: {
        handwriting: ['"Caveat"', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        elegant: ['"Great Vibes"', 'cursive'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'bloom': 'bloom 2s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        bloom: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
