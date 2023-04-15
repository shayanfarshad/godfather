import gameStore from './gameStore';
import playerStore from './playerStore';
import roleStore from './roleStore';

export default () => ({
  playerStore: playerStore,
  roleStore: roleStore,
  gameStore: gameStore
});
