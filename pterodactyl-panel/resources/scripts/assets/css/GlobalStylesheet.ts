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
        font-family: 'Inter', system-ui, sans-serif !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        text-rendering: optimizeLegibility !important;
        font-synthesis: none !important;
        background-image:
            radial-gradient(ellipse 55% 38% at 8% -5%, rgba(145, 35, 215, 0.22), transparent),
            radial-gradient(ellipse 45% 35% at 92% 6%, rgba(124, 58, 237, 0.18), transparent),
            radial-gradient(ellipse 40% 32% at 78% 48%, rgba(59, 130, 246, 0.08), transparent),
            radial-gradient(ellipse 65% 45% at 50% 108%, rgba(145, 35, 215, 0.13), transparent),
            radial-gradient(ellipse 30% 25% at 15% 75%, rgba(168, 85, 247, 0.07), transparent),
            radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px) !important;
        background-size: auto, auto, auto, auto, auto, 28px 28px !important;
        background-attachment: fixed !important;
    }

    /* Slow breathing ambient light over the whole app */
    body::after {
        content: '';
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background:
            radial-gradient(ellipse 42% 30% at 85% 15%, rgba(145, 35, 215, 0.1), transparent),
            radial-gradient(ellipse 38% 28% at 10% 85%, rgba(124, 58, 237, 0.08), transparent);
        animation: strenox-ambient-breathe 9s ease-in-out infinite;
    }

    @keyframes strenox-ambient-breathe {
        0%, 100% {
            opacity: 0.55;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.06);
        }
    }

    /* Keep app content above the ambient layer */
    #app {
        position: relative;
        z-index: 1;
    }

    /* Client sidebar v2 */
    .sx-side-link {
        border: 1px solid transparent;
        position: relative;
    }

    .sx-side-link:hover {
        background: rgba(145, 35, 215, 0.1);
        transform: translateX(3px);
    }

    .sx-side-link:hover .sx-side-ico {
        border-color: rgba(145, 35, 215, 0.5);
        box-shadow: 0 0 12px rgba(145, 35, 215, 0.3);
        color: #c084fc;
    }

    .sx-side-ico {
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.65rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.07);
        color: #8b90a5;
        font-size: 0.8rem;
        transition: all 0.18s ease;
    }

    a[style*='inset 2px'] .sx-side-ico,
    .sx-side-link[aria-current='page'] .sx-side-ico {
        background: linear-gradient(135deg, #a855f7, #7c3aed);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 4px 12px rgba(145, 35, 215, 0.5), 0 0 14px rgba(168, 85, 247, 0.35);
    }

    /* Activity timeline */
    .strenox-activity-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .strenox-timeline-row {
        display: grid;
        grid-template-columns: 3.25rem 1fr;
        gap: 0.25rem;
        padding: 0.9rem 1rem;
        border-radius: 1rem;
        border: 1px solid rgba(145, 35, 215, 0.16);
        background: linear-gradient(135deg, rgba(30, 21, 53, 0.5) 0%, rgba(22, 22, 31, 0.85) 100%);
        box-shadow: 0 0 14px rgba(145, 35, 215, 0.06);
        transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        animation: strenox-row-in 0.4s ease backwards;
    }

    .strenox-timeline-row:hover {
        border-color: rgba(145, 35, 215, 0.45);
        box-shadow: 0 0 22px rgba(145, 35, 215, 0.16);
        transform: translateY(-1px);
    }

    .strenox-activity-list > *:nth-child(2) { animation-delay: 0.05s; }
    .strenox-activity-list > *:nth-child(3) { animation-delay: 0.1s; }
    .strenox-activity-list > *:nth-child(4) { animation-delay: 0.15s; }
    .strenox-activity-list > *:nth-child(5) { animation-delay: 0.2s; }
    .strenox-activity-list > *:nth-child(6) { animation-delay: 0.25s; }
    .strenox-activity-list > *:nth-child(7) { animation-delay: 0.3s; }
    .strenox-activity-list > *:nth-child(n + 8) { animation-delay: 0.32s; }

    @keyframes strenox-row-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .strenox-timeline-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .strenox-timeline-rail::after {
        content: '';
        flex: 1;
        width: 2px;
        margin-top: 0.5rem;
        border-radius: 2px;
        background: linear-gradient(180deg, rgba(145, 35, 215, 0.5), rgba(145, 35, 215, 0.05));
    }

    .strenox-activity-list > *:last-child .strenox-timeline-rail::after {
        display: none;
    }

    .strenox-timeline-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
        overflow: hidden;
        flex-shrink: 0;
        border: 2px solid rgba(145, 35, 215, 0.55);
        box-shadow: 0 0 14px rgba(145, 35, 215, 0.3);
    }

    .strenox-timeline-body {
        min-width: 0;
    }

    .strenox-timeline-head {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.15rem;
    }

    .strenox-timeline-actor {
        font-weight: 600;
        color: #e2e2f0;
    }

    .strenox-timeline-event {
        margin-left: 0.4rem;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        padding: 0.15rem 0.55rem;
        border-radius: 9999px;
        color: #c084fc;
        background: rgba(145, 35, 215, 0.14);
        border: 1px solid rgba(145, 35, 215, 0.35);
        text-decoration: none;
        transition: all 0.15s ease;
        white-space: nowrap;
    }

    .strenox-timeline-event:hover {
        background: rgba(145, 35, 215, 0.28);
        color: #fff;
        box-shadow: 0 0 12px rgba(145, 35, 215, 0.35);
    }

    .strenox-timeline-meta {
        margin-top: 0.35rem;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.75rem;
        color: #8888a8;
    }

    .strenox-timeline-sep {
        margin: 0 0.35rem;
        color: #4a4a5e;
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

    /* Modern pill inputs across the panel */
    input[type='text'],
    input[type='password'],
    input[type='email'],
    input[type='number'],
    input[type='search'],
    select,
    textarea {
        border-radius: 12px !important;
    }

    input[type='text']:focus,
    input[type='password']:focus,
    input[type='email']:focus,
    input[type='number']:focus,
    input[type='search']:focus,
    select:focus,
    textarea:focus {
        border-color: #9123D7 !important;
        box-shadow: 0 0 0 3px rgba(145, 35, 215, 0.18), 0 0 18px rgba(145, 35, 215, 0.25) !important;
    }

    /* Floating logo */
    @keyframes strenox-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }

    .strenox-float {
        animation: strenox-float 4s ease-in-out infinite;
    }

    /* Shimmering gradient headline text */
    @keyframes strenox-shimmer {
        to {
            background-position: 200% center;
        }
    }

    .strenox-shimmer-text {
        background: linear-gradient(110deg, #C084FC 15%, #F5F3FF 38%, #A855F7 55%, #7C3AED 80%);
        background-size: 220% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        animation: strenox-shimmer 5s linear infinite;
        padding-right: 0.14em;
        margin-right: -0.14em;
        padding-bottom: 0.1em;
        margin-bottom: -0.1em;
        filter: drop-shadow(0 0 22px rgba(168, 85, 247, 0.35));
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
        .strenox-page, .strenox-glow, .strenox-skeleton, .strenox-float {
            animation: none;
        }

        .strenox-timeline-row {
            animation: none;
        }

        body::after {
            animation: none;
            opacity: 0.7;
        }

        .strenox-orb {
            animation: none;
        }

        .strenox-shimmer-text {
            animation: none;
        }
    }
`;
