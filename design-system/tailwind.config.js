/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* ===========================================
         COLORS
         =========================================== */
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          'primary-active': 'var(--color-brand-primary-active)',
          'primary-subtle': 'var(--color-brand-primary-subtle)',
          accent: 'var(--color-brand-accent)',
          'accent-hover': 'var(--color-brand-accent-hover)',
          'accent-subtle': 'var(--color-brand-accent-subtle)',
        },
        semantic: {
          success: 'var(--color-semantic-success)',
          'success-subtle': 'var(--color-semantic-success-subtle)',
          warning: 'var(--color-semantic-warning)',
          'warning-subtle': 'var(--color-semantic-warning-subtle)',
          error: 'var(--color-semantic-error)',
          'error-subtle': 'var(--color-semantic-error-subtle)',
          info: 'var(--color-semantic-info)',
          'info-subtle': 'var(--color-semantic-info-subtle)',
        },
        gray: {
          950: 'var(--color-gray-950)',
          900: 'var(--color-gray-900)',
          800: 'var(--color-gray-800)',
          700: 'var(--color-gray-700)',
          600: 'var(--color-gray-600)',
          500: 'var(--color-gray-500)',
          400: 'var(--color-gray-400)',
          300: 'var(--color-gray-300)',
          200: 'var(--color-gray-200)',
          100: 'var(--color-gray-100)',
          50: 'var(--color-gray-50)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          elevated: 'var(--color-bg-elevated)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
          focus: 'var(--color-border-focus)',
        },
      },

      /* ===========================================
         TYPOGRAPHY
         =========================================== */
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        mono: ['var(--font-family-mono)'],
      },
      fontSize: {
        'display-xl': ['var(--font-size-display-xl)', {
          lineHeight: 'var(--line-height-display-xl)',
          letterSpacing: 'var(--letter-spacing-display-xl)',
          fontWeight: '700',
        }],
        'display-lg': ['var(--font-size-display-lg)', {
          lineHeight: 'var(--line-height-display-lg)',
          letterSpacing: 'var(--letter-spacing-display-lg)',
          fontWeight: '700',
        }],
        'display-md': ['var(--font-size-display-md)', {
          lineHeight: 'var(--line-height-display-md)',
          letterSpacing: 'var(--letter-spacing-display-md)',
          fontWeight: '600',
        }],
        'heading-lg': ['var(--font-size-heading-lg)', {
          lineHeight: 'var(--line-height-heading-lg)',
          letterSpacing: 'var(--letter-spacing-heading-lg)',
          fontWeight: '600',
        }],
        'heading-md': ['var(--font-size-heading-md)', {
          lineHeight: 'var(--line-height-heading-md)',
          letterSpacing: 'var(--letter-spacing-heading-md)',
          fontWeight: '600',
        }],
        'heading-sm': ['var(--font-size-heading-sm)', {
          lineHeight: 'var(--line-height-heading-sm)',
          letterSpacing: 'var(--letter-spacing-heading-sm)',
          fontWeight: '600',
        }],
        'body-lg': ['var(--font-size-body-lg)', {
          lineHeight: 'var(--line-height-body-lg)',
          letterSpacing: 'var(--letter-spacing-body-lg)',
          fontWeight: '400',
        }],
        'body-md': ['var(--font-size-body-md)', {
          lineHeight: 'var(--line-height-body-md)',
          letterSpacing: 'var(--letter-spacing-body-md)',
          fontWeight: '400',
        }],
        'body-sm': ['var(--font-size-body-sm)', {
          lineHeight: 'var(--line-height-body-sm)',
          letterSpacing: 'var(--letter-spacing-body-sm)',
          fontWeight: '400',
        }],
        'label': ['var(--font-size-label)', {
          lineHeight: 'var(--line-height-label)',
          letterSpacing: 'var(--letter-spacing-label)',
          fontWeight: '500',
        }],
        'caption': ['var(--font-size-caption)', {
          lineHeight: 'var(--line-height-caption)',
          letterSpacing: 'var(--letter-spacing-caption)',
          fontWeight: '400',
        }],
      },

      /* ===========================================
         SPACING
         =========================================== */
      spacing: {
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

      /* ===========================================
         BORDER RADIUS
         =========================================== */
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },

      /* ===========================================
         SHADOWS
         =========================================== */
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
      },

      /* ===========================================
         MOTION
         =========================================== */
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
        'slower': 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        'spring': 'var(--ease-spring)',
        'bounce': 'var(--ease-bounce)',
      },

      /* ===========================================
         Z-INDEX
         =========================================== */
      zIndex: {
        'base': 'var(--z-base)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'overlay': 'var(--z-overlay)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'toast': 'var(--z-toast)',
        'tooltip': 'var(--z-tooltip)',
      },

      /* ===========================================
         BREAKPOINTS
         =========================================== */
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
      },

      /* ===========================================
         ANIMATIONS
         =========================================== */
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-up': 'fade-up var(--duration-normal) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-fast) var(--ease-spring)',
        'slide-in-right': 'slide-in-right var(--duration-normal) var(--ease-out)',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
      },
    },
  },
  plugins: [],
};