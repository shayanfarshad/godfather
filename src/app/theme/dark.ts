import type { Theme } from './types';

export const darkTheme: Theme = {
    name: 'dark' as const,
    colors: {
        bg: '#1F1525',            // بادمجونی تیره
        bgAlt: '#2A1B33',
        surface: '#2F223D',
        border: '#3B2A4A',
        text: '#EAEAEA',
        subtext: '#B9B4C2',
        primary: '#3EC6E0',       // فیروزه‌ای CTA
        premium: '#FFD166',       // طلایی پریمیوم
        danger: '#F87171',
    },
};