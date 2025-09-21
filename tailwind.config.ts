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
          red: {
            100: '#ED9494',
            200: '#E43E3E',
          },
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
      keyframes: {
        // 脈衝發光效果
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)',
            transform: 'scale(1)',
            filter: 'brightness(1.01)',
          },
          '50%': {
            boxShadow:
              '0 0 25px rgba(255, 165, 0, 0.8), 0 0 35px rgba(255, 165, 0, 0.4)',
            transform: 'scale(1.02)',
            filter: 'brightness(1.15)',
          },
        },
        // 8位元遊戲風格閃爍效果
        'retro-blink': {
          '0%, 60%': {
            opacity: '1',
            filter: 'brightness(1.01)',
          },
          '61%, 80%': {
            opacity: '1',
            filter: 'brightness(0.9)',
          },
          '81%, 100%': {
            opacity: '1',
            filter: 'brightness(1.1)',
          },
        },
        // 打字機效果
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'blink-cursor': {
          '0%, 50%': { borderRightColor: 'transparent' },
          '51%, 100%': { borderRightColor: 'currentColor' },
        },
        // 像素閃爍文字
        'pixel-glitch': {
          '0%, 90%, 100%': {
            textShadow: 'none',
            transform: 'translate(0)',
          },
          '10%': {
            textShadow: '2px 0 #ff0000, -2px 0 #00ffff',
            transform: 'translate(1px, 0)',
          },
          '20%': {
            textShadow: '-2px 0 #ff0000, 2px 0 #00ffff',
            transform: 'translate(-1px, 0)',
          },
          '30%': {
            textShadow: '0 2px #ff0000, 0 -2px #00ffff',
            transform: 'translate(0, 1px)',
          },
        },
        // 8bit 彈跳文字
        'retro-bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '40%': {
            transform: 'translateY(-8px) scale(1.05)',
          },
          '60%': {
            transform: 'translateY(-4px) scale(1.02)',
          },
        },
        // 像素淡入效果
        'pixel-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
            filter: 'contrast(0) brightness(2)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.1)',
            filter: 'contrast(1.5) brightness(1.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'contrast(1) brightness(1)',
          },
        },
        // 8bit 搖擺文字
        'retro-wobble': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-2deg) scale(1.02)' },
          '50%': { transform: 'rotate(2deg) scale(0.98)' },
          '75%': { transform: 'rotate(-1deg) scale(1.01)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        // 垂直像素浮動
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(-8px)' },
          '75%': { transform: 'translateY(-4px)' },
        },
        // 快速垂直像素浮動
        'pixel-float-fast': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        // 8bit 縮放效果
        'pixel-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        // 像素化透明度變化
        'pixel-opacity': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        // 基本動畫
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'retro-blink': 'retro-blink 1.5s ease-in-out infinite',
        typewriter:
          'typewriter 2s steps(10) forwards, blink-cursor 1s step-end infinite',
        'pixel-glitch': 'pixel-glitch 3s infinite',
        'retro-bounce': 'retro-bounce 2s ease-in-out infinite',
        'pixel-fade-in': 'pixel-fade-in 1.5s ease-out forwards',
        'retro-wobble': 'retro-wobble 2s ease-in-out infinite',
        'pixel-float': 'pixel-float 4s steps(4) infinite',
        'pixel-float-fast': 'pixel-float-fast 2s steps(2) infinite',
        'pixel-scale': 'pixel-scale 3s steps(2) infinite',
        'pixel-opacity': 'pixel-opacity 2.5s steps(2) infinite',
        // 組合動畫
        'retro-cloud':
          'pixel-float 4s steps(4) infinite, pixel-scale 6s steps(3) infinite, pixel-opacity 3s steps(2) infinite',
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

      // 添加打字機動畫的特殊樣式
      newUtilities['.animate-typewriter'] = {
        overflow: 'hidden',
        'white-space': 'nowrap',
        'border-right': '2px solid',
      };

      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
