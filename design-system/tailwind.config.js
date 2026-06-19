/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      /* ============================================
         COLORS
         ============================================ */
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          'primary-active': 'var(--color-brand-primary-active)',
          'primary-subtle': 'var(--color-brand-primary-subtle)',
          secondary: 'var(--color-brand-secondary)',
          accent: 'var(--color-brand-accent)',
          'accent-hover': 'var(--color-brand-accent-hover)',
          warning: 'var(--color-brand-warning)',
          error: 'var(--color-brand-error)',
          'error-hover': 'var(--color-brand-error-hover)',
          success: 'var(--color-brand-success)',
        },
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          elevated: 'var(--color-bg-elevated)',
          overlay: 'var(--color-bg-overlay)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          subtle: 'var(--color-border-subtle)',
          emphasis: 'var(--color-border-emphasis)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          link: 'var(--color-text-link)',
        },
      },

      /* ============================================
         TYPOGRAPHY
         ============================================ */
      fontFamily: {
        sans: ['var(--font-family-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['var(--font-size-display-xl)', {
          lineHeight: 'var(--line-height-display-xl)',
          letterSpacing: 'var(--letter-spacing-display-xl)',
          fontWeight: 'var(--font-weight-display-xl)',
        }],
        'display-lg': ['var(--font-size-display-lg)', {
          lineHeight: 'var(--line-height-display-lg)',
          letterSpacing: 'var(--letter-spacing-display-lg)',
          fontWeight: 'var(--font-weight-display-lg)',
        }],
        'display-md': ['var(--font-size-display-md)', {
          lineHeight: 'var(--line-height-display-md)',
          letterSpacing: 'var(--letter-spacing-display-md)',
          fontWeight: 'var(--font-weight-display-md)',
        }],
        'heading-lg': ['var(--font-size-heading-lg)', {
          lineHeight: 'var(--line-height-heading-lg)',
          letterSpacing: 'var(--letter-spacing-heading-lg)',
          fontWeight: 'var(--font-weight-heading-lg)',
        }],
        'heading-md': ['var(--font-size-heading-md)', {
          lineHeight: 'var(--line-height-heading-md)',
          letterSpacing: 'var(--letter-spacing-heading-md)',
          fontWeight: 'var(--font-weight-heading-md)',
        }],
        'heading-sm': ['var(--font-size-heading-sm)', {
          lineHeight: 'var(--line-height-heading-sm)',
          letterSpacing: 'var(--letter-spacing-heading-sm)',
          fontWeight: 'var(--font-weight-heading-sm)',
        }],
        'body-lg': ['var(--font-size-body-lg)', {
          lineHeight: 'var(--line-height-body-lg)',
          letterSpacing: 'var(--letter-spacing-body-lg)',
          fontWeight: 'var(--font-weight-body-lg)',
        }],
        'body-md': ['var(--font-size-body-md)', {
          lineHeight: 'var(--line-height-body-md)',
          letterSpacing: 'var(--letter-spacing-body-md)',
          fontWeight: 'var(--font-weight-body-md)',
        }],
        'body-sm': ['var(--font-size-body-sm)', {
          lineHeight: 'var(--line-height-body-sm)',
          letterSpacing: 'var(--letter-spacing-body-sm)',
          fontWeight: 'var(--font-weight-body-sm)',
        }],
        'label': ['var(--font-size-label)', {
          lineHeight: 'var(--line-height-label)',
          letterSpacing: 'var(--letter-spacing-label)',
          fontWeight: 'var(--font-weight-label)',
        }],
        'caption': ['var(--font-size-caption)', {
          lineHeight: 'var(--line-height-caption)',
          letterSpacing: 'var(--letter-spacing-caption)',
          fontWeight: 'var(--font-weight-caption)',
        }],
      },

      /* ============================================
         SPACING
         ============================================ */
      spacing: {
        'px': 'var(--spacing-px)',
        '0': 'var(--spacing-0)',
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
      },

      /* ============================================
         BORDER RADIUS
         ============================================ */
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },

      /* ============================================
         SHADOWS
         ============================================ */
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
      },

      /* ============================================
         MOTION
         ============================================ */
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
        'slower': 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        'linear': 'var(--ease-linear)',
        'in': 'var(--ease-in)',
        'out': 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        'spring': 'var(--ease-spring)',
        'bounce': 'var(--ease-bounce)',
      },

      /* ============================================
         Z-INDEX
         ============================================ */
      zIndex: {
        'base': 'var(--z-base)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'overlay': 'var(--z-overlay)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'tooltip': 'var(--z-tooltip)',
        'toast': 'var(--z-toast)',
      },

      /* ============================================
         BREAKPOINTS
         ============================================ */
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
      },

      /* ============================================
         ANIMATIONS
         ============================================ */
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-out': 'fade-out var(--duration-normal) var(--ease-out)',
        'slide-up': 'slide-up var(--duration-normal) var(--ease-out)',
        'slide-down': 'slide-down var(--duration-normal) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-normal) var(--ease-spring)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-subtle': 'pulse-subtle 2s var(--ease-in-out) infinite',
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};