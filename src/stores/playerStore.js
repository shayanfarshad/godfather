import {observable, action, makeAutoObservable, toJS, runInAction} from 'mobx';

class PlayerStore {
  @observable players = [];
  @observable playersWithoutRole = 0;
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
}
export default new PlayerStore();
