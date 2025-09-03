import { ZODIAC_SCENARIO } from './data/zodiac';
import { NUSTRADAMUS_SCENARIO } from './data/nustradamus';
import { JACK_SCENARIO } from './data/jack';
import { ELCLASICO_SCENARIO } from './data/elclasico';

export const scenarioRegistry = {
  zodiac: ZODIAC_SCENARIO,
  nustradamus: NUSTRADAMUS_SCENARIO,
  jack: JACK_SCENARIO,
  elclasico: ELCLASICO_SCENARIO,
} as const;

export type ScenarioKey = keyof typeof scenarioRegistry;
