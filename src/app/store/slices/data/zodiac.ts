// src/app/store/slices/data/zodiac.ts
import type { Scenario } from '../scenarioTypes';

export const ZODIAC_SCENARIO: Scenario = {
    id: 'zodiac',
    name: 'game.scenarios.zodiac.name',                // اگر کلیدش رو داری
    description: 'game.scenarios.zodiac.description',  // اختیاری
    minPlayers: 8,
    maxPlayers: 14,
    premiumOnly: true,
    source: 'builtin',
    roles: [
        {
            id: 1, name: 'game.zodiac.roles.al_capone.name', team: 'mafia', active: true, shield: false,
            description: 'game.zodiac.roles.al_capone.description',
            duty: [
                'game.zodiac.roles.al_capone.duties.0',
                'game.zodiac.roles.al_capone.duties.1',
            ],
            icon: 'alcapone' as const, color: '#B91C1C'
        },

        {
            id: 2, name: 'game.zodiac.roles.bomber.name', team: 'mafia', active: false, shield: false,
            description: 'game.zodiac.roles.bomber.description',
            duty: [
                'game.zodiac.roles.bomber.duties.0',
                'game.zodiac.roles.bomber.duties.1',
            ],
            icon: 'bomber' as const, color: '#F97316'
        },

        {
            id: 3, name: 'game.zodiac.roles.magician.name', team: 'mafia', active: true, shield: false,
            description: 'game.zodiac.roles.magician.description',
            duty: ['game.zodiac.roles.magician.duties.0'],
            icon: 'magician' as const, color: '#A855F7'
        },

        {
            id: 4, name: 'game.zodiac.roles.doctor.name', team: 'town', active: true, shield: false,
            description: 'game.zodiac.roles.doctor.description',
            duty: [
                'game.zodiac.roles.doctor.duties.0',
                'game.zodiac.roles.doctor.duties.1',
            ],
            icon: 'doctor' as const, color: '#10B981'
        },

        {
            id: 5, name: 'game.zodiac.roles.detective.name', team: 'town', active: true, shield: false,
            description: 'game.zodiac.roles.detective.description',
            duty: [
                'game.zodiac.roles.detective.duties.0',
                'game.zodiac.roles.detective.duties.1',
                'game.zodiac.roles.detective.duties.2',
            ],
            icon: 'detective' as const, color: '#60A5FA'
        },

        {
            id: 6, name: 'game.zodiac.roles.professional.name', team: 'town', active: true, shield: false,
            description: 'game.zodiac.roles.professional.description',
            duty: [
                'game.zodiac.roles.professional.duties.0',
                'game.zodiac.roles.professional.duties.1',
            ],
            icon: 'professional' as const, color: '#0891B2'
        },

        {
            id: 7, name: 'game.zodiac.roles.gunsmith.name', team: 'town', active: true, shield: false,
            description: 'game.zodiac.roles.gunsmith.description',
            duty: [
                'game.zodiac.roles.gunsmith.duties.0',
                'game.zodiac.roles.gunsmith.duties.1',
                'game.zodiac.roles.gunsmith.duties.2',
            ],
            icon: 'gunsmith' as const, color: '#2563EB'
        },

        {
            id: 8, name: 'game.zodiac.roles.bodyguard.name', team: 'town', active: false, shield: false,
            description: 'game.zodiac.roles.bodyguard.description',
            duty: [
                'game.zodiac.roles.bodyguard.duties.0',
                'game.zodiac.roles.bodyguard.duties.1',
                'game.zodiac.roles.bodyguard.duties.2',
            ],
            icon: 'bodyguard' as const, color: '#34D399'
        },

        {
            id: 9, name: 'game.zodiac.roles.mason.name', team: 'town', active: true, shield: false,
            description: 'game.zodiac.roles.mason.description',
            duty: [
                'game.zodiac.roles.mason.duties.0',
                'game.zodiac.roles.mason.duties.1',
                'game.zodiac.roles.mason.duties.2',
            ],
            icon: 'mason' as const, color: '#22D3EE'
        },

        {
            id: 10, name: 'game.zodiac.roles.citizen.name', team: 'town', active: false, shield: false,
            description: 'game.zodiac.roles.citizen.description',
            duty: [
                'game.zodiac.roles.citizen.duties.0',
                'game.zodiac.roles.citizen.duties.1',
            ],
            icon: 'citizen' as const, color: '#9CA3AF'
        },

        {
            id: 11, name: 'game.zodiac.roles.zodiac.name', team: 'neutral', active: true, shield: false,
            description: 'game.zodiac.roles.zodiac.description',
            duty: [
                'game.zodiac.roles.zodiac.duties.0',
                'game.zodiac.roles.zodiac.duties.1',
                'game.zodiac.roles.zodiac.duties.2',
                'game.zodiac.roles.zodiac.duties.3',
            ],
            icon: 'zodiac', color: '#F59E0B'
        },
    ],
};
