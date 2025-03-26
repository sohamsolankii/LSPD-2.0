/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                appear: {
                    from: {
                        opacity: '0',
                        transform: 'translateX(-100px)',
                    },
                    to: {
                        opacity: '1',
                        clipPath: 'translateX(0px)',
                    },
                },
            },
            //   animation: {
            // 	appear: 'appear 1s ease-in-out forwards',
            //   },
        },
    },
    plugins: [],
    darkMode: 'class', // Add this line to enable dark mode class
}
