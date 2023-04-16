import {observable, action, makeAutoObservable} from 'mobx';

class GameStore {
  @observable roles = [];
  @observable players = [];
  @observable rolePlayers = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action updateRoles(roles) {
    this.roles = roles;
    return this.roles;
  }

  @action updateRolePlayers(items) {
    this.rolePlayers = items;
    return this.rolePlayers;
  }
  @action addRoles(role) {
    const newRoles = [...this.roles];
    newRoles.push(role);
    this.roles = newRoles;
    return this.roles;
  }
  @action removeRoles(role) {
    console.log({removeRole: role});
    const newRoles = [...this.roles];
    const indexRole = newRoles.indexOf(role);
    newRoles.splice(indexRole, 1);
    this.roles = newRoles;
    return this.roles;
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
export default new GameStore();
