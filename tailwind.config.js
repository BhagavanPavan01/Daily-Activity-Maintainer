/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'slide-in': 'slideIn 0.5s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'shimmer': 'shimmer 3s infinite',
                'pulse-slow': 'pulse 1.5s infinite',
                'slide-in-left': 'slideInLeft 0.3s ease-out',
            },
            keyframes: {
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
}