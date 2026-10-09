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

// StrenoxCloud Brand Colors
const strenox = {
    50: 'hsl(263, 100%, 97%)',
    100: 'hsl(263, 85%, 92%)',
    200: 'hsl(263, 75%, 84%)',
    300: 'hsl(263, 68%, 73%)',
    400: 'hsl(263, 62%, 62%)',
    500: 'hsl(263, 55%, 52%)',
    600: '#9123D7',
    700: 'hsl(263, 60%, 38%)',
    800: 'hsl(263, 55%, 28%)',
    900: 'hsl(263, 50%, 18%)',
    950: 'hsl(263, 45%, 10%)',
};

module.exports = {
    content: [
        './resources/scripts/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ['"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
            },
            colors: {
                black: '#0D0D12',
                // "primary" and "neutral" are deprecated, prefer the use of "blue" and "gray"
                // in new code.
                primary: strenox,
                gray: gray,
                neutral: gray,
                cyan: strenox,
                strenox: strenox,
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
                'strenox': '0 0 20px rgba(145, 35, 215, 0.15)',
                'strenox-lg': '0 0 40px rgba(145, 35, 215, 0.25)',
                'strenox-glow': '0 0 15px rgba(145, 35, 215, 0.3)',
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
