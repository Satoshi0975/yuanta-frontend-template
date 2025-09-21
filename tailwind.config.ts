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
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        sts: {
          text: '#070707',
          gray: '#BDBBBB',
          rank: {
            '1': '#D88600',
            '2': '#5B5B5B',
            '3': '#917C5A',
          },
          blue: {
            600: '#2356B5',
            500: '#206ED5',
            400: '#187CFF',
            300: '#5A9DF5',
            200: '#79C2FF',
            100: '#CEEEFF',
          },
          orange: {
            500: '#783E01',
            400: '#FF953E',
            300: '#FFB374',
            200: '#F7EDE6',
            100: '#FEFAF7',
          },
          green: {
            100: '#95C321',
            200: '#63AE3A',
          },
        },
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

      function generateColorUtilities(
        colorObj: Record<string, Record<string, string> | string>,
        prefix: string = ''
      ) {
        for (const [key, value] of Object.entries(colorObj)) {
          const className = prefix ? `${prefix}-${key}` : key;

          if (typeof value === 'string') {
            // 這是最終的顏色值
            newUtilities[`.nes-${e(className)}::after`] = {
              'background-color': value,
            };
            newUtilities[`.nes-${e(className)} .nes-corners::after`] = {
              'background-color': value,
            };
          } else if (typeof value === 'object' && value !== null) {
            // 這是嵌套的顏色物件，遞迴處理
            generateColorUtilities(value, className);
          }
        }
      }

      generateColorUtilities(colors);
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
