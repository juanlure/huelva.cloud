import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                terracotta: {
                    DEFAULT: '#E07A5F',
                    50: '#FDF5F3',
                    100: '#FAE8E3',
                    200: '#F5D0C7',
                    300: '#EDAFA0',
                    400: '#E07A5F',
                    500: '#D4563A',
                    600: '#B8432C',
                    700: '#993726',
                    800: '#7D3024',
                    900: '#682C23',
                },
                navy: {
                    DEFAULT: '#1E3A5F',
                    50: '#F0F4F8',
                    100: '#D9E2EC',
                    200: '#BCCCDC',
                    300: '#9FB3C8',
                    400: '#7B9AB8',
                    500: '#5D7FA3',
                    600: '#4A6785',
                    700: '#3D556D',
                    800: '#1E3A5F',
                    900: '#102A43',
                },
                cream: '#FAF7F2',
                sand: '#F5F0E8',
            },
            fontFamily: {
                display: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}

export default config
