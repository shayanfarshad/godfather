import gameStore from './gameStore';
import langStore from './langStore';
import PlayerStore from './playerStore';
import roleStore from './roleStore';
import themeStore from './themeStore';

export default () => ({
  playerStore: PlayerStore,
  roleStore: roleStore,
  gameStore: gameStore,
  langStore: langStore,
  themeStore: themeStore,
});
