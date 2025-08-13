import { Theme } from "./types";

export const lightTheme: Theme = {
    name: 'light' as const,
    colors: {
        bg: '#F7F7FB',
        bgAlt: '#FFFFFF',
        surface: '#FFFFFF',
        border: '#E7E6EE',
        text: '#1C1B22',
        subtext: '#5C5A66',
        primary: '#0EA5E9',
        premium: '#C58F00',
        danger: '#DC2626',
    },
};