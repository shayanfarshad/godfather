import type { Theme } from './types';

export const darkTheme: Theme = {
    name: 'dark' as const,
    colors: {
        bg: '#1C1722',            // بادمجونی تیره
        bgAlt: '#251D2D',
        surface: '#86728A',
        border: '#3B2A4A',
        text: '#cfc2c5',
        subtext: '#B6A7AB',
        primary: '#3EC6E0',       // فیروزه‌ای CTA
        premium: '#FFD166',       // طلایی پریمیوم
        danger: '#F87171',
        white: '#ffffff'
    },
};