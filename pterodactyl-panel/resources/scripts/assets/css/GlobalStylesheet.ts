import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';
// @ts-expect-error untyped font file
import font from '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 100 700;
        src: url(${font}) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }

    body {
        ${tw`font-sans bg-neutral-800 text-neutral-200`};
        letter-spacing: 0.015em;
    }

    h1, h2, h3, h4, h5, h6 {
        ${tw`font-medium tracking-normal font-header`};
    }

    p {
        ${tw`text-neutral-200 leading-snug font-sans`};
    }

    form {
        ${tw`m-0`};
    }

    textarea, select, input, button, button:focus, button:focus-visible {
        ${tw`outline-none`};
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield !important;
    }

    /* Scroll Bar Style */
    ::-webkit-scrollbar {
        background: none;
        width: 16px;
        height: 16px;
    }

    ::-webkit-scrollbar-thumb {
        border: solid 0 rgb(0 0 0 / 0%);
        border-right-width: 4px;
        border-left-width: 4px;
        -webkit-border-radius: 9px 4px;
        -webkit-box-shadow: inset 0 0 0 1px hsl(211, 10%, 53%), inset 0 0 0 4px hsl(209deg 18% 30%);
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        -webkit-border-radius: 4px 9px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }

    /* ==================== STRENOXCLOUD LIQUID AMBIENT THEME ==================== */
    html {
        color-scheme: dark;
    }

    body {
        background: #07070d !important;
        color: #E2E2F0 !important;
        background-image:
            radial-gradient(ellipse 60% 40% at 15% 0%, rgba(145, 35, 215, 0.12), transparent),
            radial-gradient(ellipse 50% 35% at 85% 20%, rgba(124, 58, 237, 0.1), transparent),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59, 130, 246, 0.07), transparent) !important;
        background-attachment: fixed !important;
    }

    /* Ambient aurora background for auth pages */
    .strenox-auth-bg {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        background: #07070d;
    }

    .strenox-orb {
        position: absolute;
        z-index: 0;
        border-radius: 9999px;
        filter: blur(70px);
        opacity: 0.7;
        pointer-events: none;
        animation: strenox-drift 14s ease-in-out infinite alternate;
    }

    .strenox-auth-content {
        position: relative;
        z-index: 1;
    }

    @keyframes strenox-drift {
        from {
            transform: translate(0, 0) scale(1);
        }
        to {
            transform: translate(70px, -50px) scale(1.18);
        }
    }

    /* Liquid glass utility */
    .strenox-glass {
        background: linear-gradient(135deg, rgba(30, 21, 53, 0.72) 0%, rgba(22, 22, 31, 0.82) 100%);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border: 1px solid rgba(255, 255, 255, 0.09);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.45), 0 0 32px rgba(145, 35, 215, 0.12);
    }

    /* Dark autofill fix */
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        -webkit-text-fill-color: #E2E2F0;
        -webkit-box-shadow: 0 0 0 1000px #16161F inset;
        transition: background-color 5000s ease-in-out 0s;
    }

    /* Smoother everything */
    button, a, input, select, textarea {
        transition: all 0.2s ease;
    }

    ::selection {
        background: rgba(145, 35, 215, 0.35);
        color: #fff;
    }

    a {
        color: #A855F7;
    }

    a:hover {
        color: #C084FC;
    }

    @keyframes strenox-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(145, 35, 215, 0.2); }
        50% { box-shadow: 0 0 20px rgba(145, 35, 215, 0.45); }
    }

    .strenox-glow {
        animation: strenox-glow 2s ease-in-out infinite;
    }

    /* Page enter transition for StrenoxCloud addon pages */
    @keyframes strenox-fade-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .strenox-page {
        animation: strenox-fade-in 0.3s ease;
    }

    /* Skeleton shimmer for loading states */
    @keyframes strenox-shimmer {
        0% { background-position: -400px 0; }
        100% { background-position: 400px 0; }
    }

    .strenox-skeleton {
        background: linear-gradient(90deg, #16161F 25%, #1A1A25 50%, #16161F 75%);
        background-size: 800px 100%;
        animation: strenox-shimmer 1.4s ease infinite;
        border-radius: 8px;
    }

    @media (prefers-reduced-motion: reduce) {
        .strenox-page, .strenox-glow, .strenox-skeleton {
            animation: none;
        }
    }
`;
