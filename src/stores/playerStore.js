import {observable, action, makeAutoObservable} from 'mobx';

class PlayerStore {
  @observable players = [];

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
    newPlayers.filter(item => item === player);
    this.players = newPlayers;
    return this.players;
  }
}
export default new PlayerStore();
