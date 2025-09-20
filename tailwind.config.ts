import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssAnimated from 'tailwindcss-animated';
import tailwindcssAnimationDelay from 'tailwindcss-animation-delay';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        'yuanta-bg': '#CEEEFF',
        linen: '#F7EDE6',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-tc)', 'system-ui', 'sans-serif'],
        cubic: ['var(--font-cubic-11)'],
      },
    },
  },
  plugins: [
    tailwindcssAnimated,
    tailwindcssAnimate,
    tailwindcssAnimationDelay,
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme('colors') as Record<string, Record<string, string>>;
      const newUtilities: Record<string, Record<string, string>> = {};

      for (const [colorName, colorShades] of Object.entries(colors)) {
        if (typeof colorShades === 'object' && colorShades !== null) {
          for (const [shade, value] of Object.entries(colorShades)) {
            if (typeof value === 'string') {
              newUtilities[`.nes-${e(colorName)}-${shade}::after`] = {
                'background-color': value,
              };
              newUtilities[
                `.nes-${e(colorName)}-${shade} .nes-corners::after`
              ] = {
                'background-color': value,
              };
            }
          }
        } else if (typeof colorShades === 'string') {
          newUtilities[`.nes-${e(colorName)}::after`] = {
            'background-color': colorShades,
          };
          newUtilities[`.nes-${e(colorName)} .nes-corners::after`] = {
            'background-color': colorShades,
          };
        }
      }

      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
