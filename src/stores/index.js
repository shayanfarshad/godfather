import gameStore from './gameStore';
import langStore from './langStore';
import playerStore from './playerStore';
import roleStore from './roleStore';
import themeStore from './themeStore';

export default () => ({
  playerStore: playerStore,
  roleStore: roleStore,
  gameStore: gameStore,
  langStore: langStore,
  themeStore: themeStore,
});
