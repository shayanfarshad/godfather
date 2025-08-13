// src/app/store/slices/data/jack.ts
import type { Scenario } from '../scenarioTypes';

export const JACK_SCENARIO: Scenario = {
  id: 'jack',
  name: 'game.scenarios.jack.name',
  description: 'game.scenarios.jack.description',
  minPlayers: 9,
  maxPlayers: 15,
  source: 'builtin',
  roles: [
    { id:1, name:'game.jack.roles.godfather.name', team:'mafia', active:true, shield:true,
      description:'game.jack.roles.godfather.description',
      duty:[
        'game.jack.roles.godfather.duties.0',
        'game.jack.roles.godfather.duties.1',
      ],
      icon:'godfather' as const, color:'#B91C1C' },

    { id:2, name:'game.jack.roles.matador.name', team:'mafia', active:true, shield:false,
      description:'game.jack.roles.matador.description',
      duty:['game.jack.roles.matador.duties.0'],
      icon:'matador' as const, color:'#EF4444' },

    { id:3, name:'game.jack.roles.dr_watson.name', team:'town', active:true, shield:false,
      description:'game.jack.roles.dr_watson.description',
      duty:[
        'game.jack.roles.dr_watson.duties.0',
        'game.jack.roles.dr_watson.duties.1',
      ],
      icon:'dr_watson' as const, color:'#10B981' },

    { id:4, name:'game.jack.roles.leon.name', team:'town', active:true, shield:true,
      description:'game.jack.roles.leon.description',
      duty:[
        'game.jack.roles.leon.duties.0',
        'game.jack.roles.leon.duties.1',
        'game.jack.roles.leon.duties.2',
      ],
      icon:'leon' as const, color:'#2563EB' },

    { id:5, name:'game.jack.roles.citizen_kane.name', team:'town', active:true, shield:false,
      description:'game.jack.roles.citizen_kane.description',
      duty:[
        'game.jack.roles.citizen_kane.duties.0',
        'game.jack.roles.citizen_kane.duties.1',
      ],
      icon:'citizen_kane' as const, color:'#22D3EE' },

    { id:6, name:'game.jack.roles.constantine.name', team:'town', active:true, shield:false,
      description:'game.jack.roles.constantine.description',
      duty:[
        'game.jack.roles.constantine.duties.0',
        'game.jack.roles.constantine.duties.1',
      ],
      icon:'constantine' as const, color:'#60A5FA' },

    { id:7, name:'game.jack.roles.citizen.name', team:'town', active:false, shield:false,
      description:'game.jack.roles.citizen.description',
      duty:['game.jack.roles.citizen.duties.0'],
      icon:'citizen' as const, color:'#9CA3AF' },

    { id:8, name:'game.jack.roles.jack_sparrow.name', team:'neutral', active:true, shield:true,
      description:'game.jack.roles.jack_sparrow.description',
      duty:[
        'game.jack.roles.jack_sparrow.duties.0',
        'game.jack.roles.jack_sparrow.duties.1',
        'game.jack.roles.jack_sparrow.duties.2',
        'game.jack.roles.jack_sparrow.duties.3',
      ],
      icon:'jack_sparrow' as const, color:'#F59E0B' },
  ],
  cards: [
    { key:'silenceOfTheLambs', name:'game.jack.cards.silenceOfTheLambs.name', description:'game.jack.cards.silenceOfTheLambs.description' },
    { key:'identityReveal',    name:'game.jack.cards.identityReveal.name',    description:'game.jack.cards.identityReveal.description' },
    { key:'beautifulMind',     name:'game.jack.cards.beautifulMind.name',     description:'game.jack.cards.beautifulMind.description' },
    { key:'handcuffs',         name:'game.jack.cards.handcuffs.name',         description:'game.jack.cards.handcuffs.description' },
    { key:'faceChange',        name:'game.jack.cards.faceChange.name',        description:'game.jack.cards.faceChange.description' },
  ],
};
