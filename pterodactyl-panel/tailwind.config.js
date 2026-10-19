const colors = require('tailwindcss/colors');

const gray = {
    50: 'hsl(216, 33%, 97%)',
    100: 'hsl(214, 15%, 91%)',
    200: 'hsl(210, 16%, 82%)',
    300: 'hsl(211, 13%, 65%)',
    400: 'hsl(211, 10%, 53%)',
    500: 'hsl(211, 12%, 43%)',
    600: 'hsl(209, 14%, 37%)',
    700: 'hsl(209, 18%, 30%)',
    800: 'hsl(209, 20%, 25%)',
    900: 'hsl(210, 24%, 16%)',
};

// YETIMC PANEL Brand Colors
const YETIMC = {
    50: 'hsl(204, 100%, 97%)',
    100: 'hsl(204, 85%, 92%)',
    200: 'hsl(204, 75%, 84%)',
    300: 'hsl(204, 68%, 73%)',
    400: 'hsl(204, 62%, 62%)',
    500: 'hsl(204, 55%, 52%)',
    600: '#2B9DE8',
    700: 'hsl(204, 60%, 38%)',
    800: 'hsl(204, 55%, 28%)',
    900: 'hsl(204, 50%, 18%)',
    950: 'hsl(204, 45%, 10%)',
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ['"Space Grotesk"', '"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                black: '#0D0D12',
                // "primary" and "neutral" are deprecated, prefer the use of "blue" and "gray"
                // in new code.
                primary: YETIMC,
                gray: gray,
                neutral: gray,
                cyan: YETIMC,
                YETIMC: YETIMC,
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            transitionDuration: {
                250: '250ms',
            },
            borderColor: theme => ({
                default: theme('colors.neutral.400', 'currentColor'),
            }),
            boxShadow: {
                'YETIMC': '0 0 20px rgba(43,157,232, 0.15)',
                'YETIMC-lg': '0 0 40px rgba(43,157,232, 0.25)',
                'YETIMC-glow': '0 0 15px rgba(43,157,232, 0.3)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ]
};
