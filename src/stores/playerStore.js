import {observable, action, makeAutoObservable} from 'mobx';

class PlayerStore {
  @observable players = [];
  @observable playersWithoutRole = 0;
  @observable showNotice = true;
  constructor() {
    makeAutoObservable(this);
  }

  @action getPlayers() {
    return this.players;
  }

  @action addPlayers(player) {
    const newPlayers = [...this.players];
    newPlayers.push(player);
    this.players = newPlayers;
    return this.players;
  }
  @action removePlayers(player) {
    const newPlayers = [...this.players];
    const newList = newPlayers.filter(item => item !== player);
    this.players = newList;
    return this.players;
  }

  @action setPlayerRole(num) {
    runInAction(() => (this.playersWithoutRole = num));
  }
  @action resetPlayers() {
    return (this.players = []);
  }

  @action setNotice() {
    return (this.showNotice = false);
  }
}
export default new PlayerStore();
