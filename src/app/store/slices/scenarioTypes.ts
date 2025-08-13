// src/app/store/slices/scenarioTypes.ts
export type Team = 'mafia' | 'town' | 'neutral';

export type Role = {
  id: number;
  name: string;           // i18n key, e.g. "game.zodiac.roles.al_capone.name"
  team: Team;
  active: boolean;
  shield: boolean;
  duty?: string[];        // i18n keys
  description?: string;   // i18n key
  icon?: string;
  color?: string;
};

export type Card = {
  key: string;            // stable key, e.g. "silenceOfTheLambs"
  name: string;           // i18n key
  description: string;    // i18n key
};

export type Scenario = {
  id: string;
  name: string;           // i18n key, e.g. "scenarios.zodiac.name" (می‌تونی بعداً اضافه کنی)
  description?: string;   // i18n key
  minPlayers: number;
  maxPlayers: number;
  source: 'builtin' | 'custom';
  premiumOnly?: boolean;
  roles: Role[];
  cards?: Card[];         // برای سناریوهایی که کارت حرکت آخر دارند
};
