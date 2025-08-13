// src/app/store/slices/data/nustradamus.ts
import type { Scenario } from '../scenarioTypes';

export const NUSTRADAMUS_SCENARIO: Scenario = {
    id: 'nustradamus',
    name: 'game.scenarios.nustradamus.name',
    description: 'game.scenarios.nustradamus.description',
    minPlayers: 9,
    maxPlayers: 15,
    source: 'builtin',
    roles: [
        {
            id: 1, name: 'game.nustradamus.roles.godfather.name', team: 'mafia', active: true, shield: true,
            description: 'game.nustradamus.roles.godfather.description',
            duty: [
                'game.nustradamus.roles.godfather.duties.0',
                'game.nustradamus.roles.godfather.duties.1',
                'game.nustradamus.roles.godfather.duties.2',
            ],
            icon: 'godfather' as const, color: '#B91C1C'
        },

        {
            id: 2, name: 'game.nustradamus.roles.saul_goodman.name', team: 'mafia', active: true, shield: false,
            description: 'game.nustradamus.roles.saul_goodman.description',
            duty: [
                'game.nustradamus.roles.saul_goodman.duties.0',
                'game.nustradamus.roles.saul_goodman.duties.1',
                'game.nustradamus.roles.saul_goodman.duties.2',
            ],
            icon: 'saul_goodman' as const, color: '#DC2626'
        },

        {
            id: 3, name: 'game.nustradamus.roles.matador.name', team: 'mafia', active: true, shield: false,
            description: 'game.nustradamus.roles.matador.description',
            duty: ['game.nustradamus.roles.matador.duties.0'],
            icon: 'matador' as const, color: '#EF4444'
        },

        {
            id: 4, name: 'game.nustradamus.roles.nostradamus.name', team: 'neutral', active: true, shield: true,
            description: 'game.nustradamus.roles.nostradamus.description',
            duty: [
                'game.nustradamus.roles.nostradamus.duties.0',
                'game.nustradamus.roles.nostradamus.duties.1',
                'game.nustradamus.roles.nostradamus.duties.2',
            ],
            icon: 'nostradamus' as const, color: '#F59E0B'
        },

        {
            id: 5, name: 'game.nustradamus.roles.dr_watson.name', team: 'town', active: true, shield: false,
            description: 'game.nustradamus.roles.dr_watson.description',
            duty: [
                'game.nustradamus.roles.dr_watson.duties.0',
                'game.nustradamus.roles.dr_watson.duties.1',
            ],
            icon: 'dr_watson' as const, color: '#10B981'
        },

        {
            id: 6, name: 'game.nustradamus.roles.leon.name', team: 'town', active: true, shield: true,
            description: 'game.nustradamus.roles.leon.description',
            duty: [
                'game.nustradamus.roles.leon.duties.0',
                'game.nustradamus.roles.leon.duties.1',
                'game.nustradamus.roles.leon.duties.2',
            ],
            icon: 'leon' as const, color: '#2563EB'
        },

        {
            id: 7, name: 'game.nustradamus.roles.citizen_kane.name', team: 'town', active: true, shield: false,
            description: 'game.nustradamus.roles.citizen_kane.description',
            duty: [
                'game.nustradamus.roles.citizen_kane.duties.0',
                'game.nustradamus.roles.citizen_kane.duties.1',
            ],
            icon: 'citizen_kane' as const , color: '#22D3EE'
        },

        {
            id: 8, name: 'game.nustradamus.roles.constantine.name', team: 'town', active: true, shield: false,
            description: 'game.nustradamus.roles.constantine.description',
            duty: [
                'game.nustradamus.roles.constantine.duties.0',
                'game.nustradamus.roles.constantine.duties.1',
            ],
            icon: 'constantine' as const, color: '#60A5FA'
        },

        {
            id: 9, name: 'game.nustradamus.roles.citizen.name', team: 'town', active: false, shield: false,
            description: 'game.nustradamus.roles.citizen.description',
            duty: ['game.nustradamus.roles.citizen.duties.0'],
            icon: 'citizen' as const, color: '#9CA3AF'
        },
    ],
    cards: [
        { key: 'silenceOfTheLambs', name: 'game.nustradamus.cards.silenceOfTheLambs.name', description: 'game.nustradamus.cards.silenceOfTheLambs.description' },
        { key: 'identityReveal', name: 'game.nustradamus.cards.identityReveal.name', description: 'game.nustradamus.cards.identityReveal.description' },
        { key: 'beautifulMind', name: 'game.nustradamus.cards.beautifulMind.name', description: 'game.nustradamus.cards.beautifulMind.description' },
        { key: 'handcuffs', name: 'game.nustradamus.cards.handcuffs.name', description: 'game.nustradamus.cards.handcuffs.description' },
        { key: 'faceChange', name: 'game.nustradamus.cards.faceChange.name', description: 'game.nustradamus.cards.faceChange.description' },
    ],
};
