/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: '#1E1E2E',
        surface: {
          DEFAULT: '#252537',
          low: '#1A1A2A',
          high: '#292839',
          bright: '#383849',
        },
        'surface-light': '#2D2D44',
        
        // Primary (Purple)
        primary: {
          DEFAULT: '#7C3AED',
          container: '#8B5CF6',
          dim: '#D2BBFF',
        },
        
        // Secondary (Emerald/Success)
        secondary: {
          DEFAULT: '#10B981',
          container: '#00A572',
          dim: '#4EDEA3',
        },
        
        // Tertiary (Amber/Warning)
        tertiary: {
          DEFAULT: '#F59E0B',
          container: '#C9962A',
        },
        
        // Error
        error: {
          DEFAULT: '#EF4444',
          container: '#FFB4AB',
        },
        
        // Text colors
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        
        // Border
        border: '#374151',
        'border-variant': '#4A4455',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['2.75rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline': ['1.5rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'title': ['1.125rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['0.6875rem', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      boxShadow: {
        'ambient': '0px 24px 48px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress': 'progress 1s ease-in-out infinite',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
};
