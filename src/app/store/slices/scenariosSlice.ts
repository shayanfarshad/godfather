// src/app/store/slices/scenariosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Scenario } from './scenarioTypes';
import { ZODIAC_SCENARIO } from './data/zodiac';
import { NUSTRADAMUS_SCENARIO } from './data/nustradamus';
import { JACK_SCENARIO } from './data/jack';
import { ELCLASICO_SCENARIO } from './data/elclasico';

type State = {
    builtins: Scenario[];
    customs: Scenario[];
    selectedSource: 'builtin' | 'custom';
    selectedScenarioId?: string;
};

const builtins: Scenario[] = [
    ZODIAC_SCENARIO,
    NUSTRADAMUS_SCENARIO,
    JACK_SCENARIO,
    ELCLASICO_SCENARIO,
];

const initialState: State = {
    builtins,
    customs: [],
    selectedSource: 'builtin',
    selectedScenarioId: builtins[0].id,
};

const scenariosSlice = createSlice({
    name: 'scenarios',
    initialState,
    reducers: {
        selectSource(state, action: PayloadAction<'builtin' | 'custom'>) {
            state.selectedSource = action.payload;
            const list = action.payload === 'builtin' ? state.builtins : state.customs;
            state.selectedScenarioId = list[0]?.id;
        },
        selectScenario(state, action: PayloadAction<string>) {
            state.selectedScenarioId = action.payload;
        },

        // مدیریت سناریوهای کاستوم (Builder)
        addCustomScenario(state, action: PayloadAction<Scenario>) {
            state.customs.push(action.payload);
            if (state.selectedSource === 'custom' && !state.selectedScenarioId) {
                state.selectedScenarioId = action.payload.id;
            }
        },
        updateCustomScenario(state, action: PayloadAction<Scenario>) {
            const ix = state.customs.findIndex(s => s.id === action.payload.id);
            if (ix >= 0) state.customs[ix] = action.payload;
        },
        deleteCustomScenario(state, action: PayloadAction<string>) {
            state.customs = state.customs.filter(s => s.id !== action.payload);
            if (state.selectedSource === 'custom' && state.selectedScenarioId === action.payload) {
                state.selectedScenarioId = state.customs[0]?.id;
            }
        },
    },
});

export const { actions: scenariosAction, reducer: ScenariosReducer } = scenariosSlice;



