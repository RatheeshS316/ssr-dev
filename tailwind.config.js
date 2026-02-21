/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                bg: '#020510',
                surface: '#080d1a',
                surface2: '#0b1120',
                surface3: '#131b2f',
                brand: {
                    DEFAULT: '#3b82f6',
                    dark: '#1d4ed8',
                    light: '#60a5fa',
                },
            },
            maxWidth: {
                '8xl': '1400px',
                '9xl': '1600px',
            },
            animation: {
                'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
                'shimmer': 'shimmer 1.5s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.06)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(135deg, #67e8f9, #3b82f6, #a855f7)',
                'grid-pattern': 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '60px 60px',
            },
        },
    },
    plugins: [],
}
