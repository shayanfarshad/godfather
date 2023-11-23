import gameStore from './gameStore';
import playerStore from './playerStore';
import roleStore from './roleStore';
import themeStore from './themeStore';

export default () => ({
  playerStore: playerStore,
  roleStore: roleStore,
  gameStore: gameStore,
  themeStore: themeStore,
});
