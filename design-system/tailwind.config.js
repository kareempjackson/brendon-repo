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
      /* ----------------------------------------
         COLORS
         ---------------------------------------- */
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-hover': 'var(--color-brand-primary-hover)',
          'primary-active': 'var(--color-brand-primary-active)',
          secondary: 'var(--color-brand-secondary)',
          'secondary-hover': 'var(--color-brand-secondary-hover)',
          accent: 'var(--color-brand-accent)',
          'accent-hover': 'var(--color-brand-accent-hover)',
          warning: 'var(--color-brand-warning)',
          error: 'var(--color-brand-error)',
          'error-hover': 'var(--color-brand-error-hover)',
        },
        neutral: {
          950: 'var(--color-neutral-950)',
          900: 'var(--color-neutral-900)',
          800: 'var(--color-neutral-800)',
          700: 'var(--color-neutral-700)',
          600: 'var(--color-neutral-600)',
          500: 'var(--color-neutral-500)',
          400: 'var(--color-neutral-400)',
          300: 'var(--color-neutral-300)',
          200: 'var(--color-neutral-200)',
          100: 'var(--color-neutral-100)',
          50: 'var(--color-neutral-50)',
        },
        bg: {
          base: 'var(--color-bg-base)',
          elevated: 'var(--color-bg-elevated)',
          surface: 'var(--color-bg-surface)',
          hover: 'var(--color-bg-hover)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
      },

      /* ----------------------------------------
         TYPOGRAPHY
         ---------------------------------------- */
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['var(--font-display-xl)', {
          lineHeight: 'var(--line-height-display-xl)',
          letterSpacing: 'var(--letter-spacing-display-xl)',
          fontWeight: 'var(--font-weight-display-xl)',
        }],
        'display-lg': ['var(--font-display-lg)', {
          lineHeight: 'var(--line-height-display-lg)',
          letterSpacing: 'var(--letter-spacing-display-lg)',
          fontWeight: 'var(--font-weight-display-lg)',
        }],
        'display-md': ['var(--font-display-md)', {
          lineHeight: 'var(--line-height-display-md)',
          letterSpacing: 'var(--letter-spacing-display-md)',
          fontWeight: 'var(--font-weight-display-md)',
        }],
        'heading-lg': ['var(--font-heading-lg)', {
          lineHeight: 'var(--line-height-heading-lg)',
          letterSpacing: 'var(--letter-spacing-heading-lg)',
          fontWeight: 'var(--font-weight-heading-lg)',
        }],
        'heading-md': ['var(--font-heading-md)', {
          lineHeight: 'var(--line-height-heading-md)',
          letterSpacing: 'var(--letter-spacing-heading-md)',
          fontWeight: 'var(--font-weight-heading-md)',
        }],
        'heading-sm': ['var(--font-heading-sm)', {
          lineHeight: 'var(--line-height-heading-sm)',
          letterSpacing: 'var(--letter-spacing-heading-sm)',
          fontWeight: 'var(--font-weight-heading-sm)',
        }],
        'body-lg': ['var(--font-body-lg)', {
          lineHeight: 'var(--line-height-body-lg)',
          letterSpacing: 'var(--letter-spacing-body-lg)',
          fontWeight: 'var(--font-weight-body-lg)',
        }],
        'body-md': ['var(--font-body-md)', {
          lineHeight: 'var(--line-height-body-md)',
          letterSpacing: 'var(--letter-spacing-body-md)',
          fontWeight: 'var(--font-weight-body-md)',
        }],
        'body-sm': ['var(--font-body-sm)', {
          lineHeight: 'var(--line-height-body-sm)',
          letterSpacing: 'var(--letter-spacing-body-sm)',
          fontWeight: 'var(--font-weight-body-sm)',
        }],
        label: ['var(--font-label)', {
          lineHeight: 'var(--line-height-label)',
          letterSpacing: 'var(--letter-spacing-label)',
          fontWeight: 'var(--font-weight-label)',
        }],
        caption: ['var(--font-caption)', {
          lineHeight: 'var(--line-height-caption)',
          letterSpacing: 'var(--letter-spacing-caption)',
          fontWeight: 'var(--font-weight-caption)',
        }],
      },

      /* ----------------------------------------
         SPACING
         ---------------------------------------- */
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
      },

      /* ----------------------------------------
         BORDER RADIUS
         ---------------------------------------- */
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },

      /* ----------------------------------------
         SHADOWS
         ---------------------------------------- */
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
      },

      /* ----------------------------------------
         MOTION
         ---------------------------------------- */
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },

      /* ----------------------------------------
         Z-INDEX
         ---------------------------------------- */
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        toast: 'var(--z-toast)',
      },

      /* ----------------------------------------
         BREAKPOINTS
         ---------------------------------------- */
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1280px',
      },

      /* ----------------------------------------
         ANIMATIONS
         ---------------------------------------- */
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
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-up': 'fade-up var(--duration-normal) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-fast) var(--ease-out)',
        'slide-down': 'slide-down var(--duration-normal) var(--ease-out)',
        shimmer: 'shimmer 2s infinite linear',
        pulse: 'pulse 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};