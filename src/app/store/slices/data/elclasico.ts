// src/app/store/slices/data/elclasico.ts
import type { Scenario } from '../scenarioTypes';

export const ELCLASICO_SCENARIO: Scenario = {
  id: 'elclasico',
  name: 'game.scenarios.elclasico.name',
  description: 'game.scenarios.elclasico.description',
  minPlayers: 10,
  maxPlayers: 16,
  premiumOnly:true,
  source: 'builtin',
  roles: [
    { id:1, name:'game.elclasico.roles.pablo_escobar.name', team:'mafia', active:true, shield:true,
      description:'game.elclasico.roles.pablo_escobar.description',
      duty:[
        'game.elclasico.roles.pablo_escobar.duties.0',
        'game.elclasico.roles.pablo_escobar.duties.1',
        'game.elclasico.roles.pablo_escobar.duties.2',
      ],
      icon:'pablo_escobar' as const, color:'#B91C1C' },

    { id:2, name:'game.elclasico.roles.juan.name', team:'mafia', active:true, shield:false,
      description:'game.elclasico.roles.juan.description',
      duty:['game.elclasico.roles.juan.duties.0'],
      icon:'juan' as const, color:'#EF4444' },

    { id:3, name:'game.elclasico.roles.blanco.name', team:'mafia', active:true, shield:false,
      description:'game.elclasico.roles.blanco.description',
      duty:[
        'game.elclasico.roles.blanco.duties.0',
        'game.elclasico.roles.blanco.duties.1',
      ],
      icon:'blanco' as const, color:'#DC2626' },

    { id:4, name:'game.elclasico.roles.churchill.name', team:'neutral', active:true, shield:true,
      description:'game.elclasico.roles.churchill.description',
      duty:[
        'game.elclasico.roles.churchill.duties.0',
        'game.elclasico.roles.churchill.duties.1',
        'game.elclasico.roles.churchill.duties.2',
        'game.elclasico.roles.churchill.duties.3',
      ],
      icon:'churchill' as const, color:'#F59E0B' },

    { id:5, name:'game.elclasico.roles.dr_bridget.name', team:'town', active:true, shield:false,
      description:'game.elclasico.roles.dr_bridget.description',
      duty:[
        'game.elclasico.roles.dr_bridget.duties.0',
        'game.elclasico.roles.dr_bridget.duties.1',
      ],
      icon:'dr_bridget' as const, color:'#10B981' },

    { id:6, name:'game.elclasico.roles.moreno.name', team:'town', active:true, shield:false,
      description:'game.elclasico.roles.moreno.description',
      duty:[
        'game.elclasico.roles.moreno.duties.0',
        'game.elclasico.roles.moreno.duties.1',
        'game.elclasico.roles.moreno.duties.2',
      ],
      icon:'moreno' as const, color:'#2563EB' },

    { id:7, name:'game.elclasico.roles.bonaparte.name', team:'town', active:true, shield:false,
      description:'game.elclasico.roles.bonaparte.description',
      duty:[
        'game.elclasico.roles.bonaparte.duties.0',
        'game.elclasico.roles.bonaparte.duties.1',
        'game.elclasico.roles.bonaparte.duties.2',
      ],
      icon:'bonaparte' as const, color:'#22D3EE' },

    { id:8, name:'game.elclasico.roles.martinez.name', team:'town', active:true, shield:false,
      description:'game.elclasico.roles.martinez.description',
      duty:[
        'game.elclasico.roles.martinez.duties.0',
        'game.elclasico.roles.martinez.duties.1',
        'game.elclasico.roles.martinez.duties.2',
        'game.elclasico.roles.martinez.duties.3',
      ],
      icon:'martinez' as const, color:'#60A5FA' },

    { id:9, name:'game.elclasico.roles.chaplin.name', team:'town', active:true, shield:false,
      description:'game.elclasico.roles.chaplin.description',
      duty:['game.elclasico.roles.chaplin.duties.0'],
      icon:'chaplin' as const, color:'#34D399' },

    { id:10, name:'game.elclasico.roles.citizen.name', team:'town', active:false, shield:false,
      description:'game.elclasico.roles.citizen.description',
      duty:['game.elclasico.roles.citizen.duties.0'],
      icon:'citizen' as const, color:'#9CA3AF' },
  ],
  cards: [
    { key:'guess_role', name:'game.elclasico.cards.guess_role.name', description:'game.elclasico.cards.guess_role.description' },
    { key:'vertigo',    name:'game.elclasico.cards.vertigo.name',    description:'game.elclasico.cards.vertigo.description' },
    { key:'dal',        name:'game.elclasico.cards.dal.name',        description:'game.elclasico.cards.dal.description' },
    { key:'manisa',     name:'game.elclasico.cards.manisa.name',     description:'game.elclasico.cards.manisa.description' },
    { key:'mirror',     name:'game.elclasico.cards.mirror.name',     description:'game.elclasico.cards.mirror.description' },
  ],
};
