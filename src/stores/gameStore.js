import {observable, action, makeAutoObservable} from 'mobx';
import {translate} from '../i18n';

class GameStore {
  @observable roles = [];
  @observable players = [];
  @observable rolePlayers = [];
  @observable night = 0;
  @observable day = 0;
  @observable nightStory = [
    {
      id: 0,
      turn: 1,
      name: 'شب معارفه',
      description:
        'در این شب در ابتدا نوستراداموس استعلام ۳ یا ۲ نفر را میگیرد که با توجه به آن استعلام می تواند با مافیا یا شهروند بازی کند و در ادامه مافیا بیدار می شوند و هم دیگر را می شناسند ، دراین شب مافیا شلیک ندارند',
      jobs: [
        {
          id: 0,
          role: 'نوستراداموس',
        },
      ],
    },
    {
      id: 1,
      turn: 2,
      name: 'شب',
      description: '',
      jobs: [
        {
          id: 0,
          role: 'مافیا',
        },
        {
          id: 1,
          role: 'دکتر',
        },
        {
          id: 2,
          role: 'لئون',
        },
        {
          id: 3,
          role: 'همشهری کین',
        },
        {
          id: 4,
          role: 'کنستانتین',
        },
      ],
    },
  ];
  @observable nustraLastMove = [
    {
      id: 1,
      title: translate('game.rolecards.lastMoveCards.lambsSilence'),
      description: translate('game.rolecards.lastMoveCards.lambDesc'),
    },
    {
      id: 2,
      title: translate('game.rolecards.lastMoveCards.IdentityDisclosure'),
      description: translate('game.rolecards.lastMoveCards.identityDesc'),
    },
    {
      id: 3,
      title: translate('game.rolecards.lastMoveCards.beautifulMind'),
      description: translate(
        'game.rolecards.lastMoveCards.beautifalNustraDesc',
      ),
    },
    {
      id: 4,
      title: translate('game.rolecards.lastMoveCards.bracelet'),
      description: translate('game.rolecards.lastMoveCards.braceletDesc'),
    },
    {
      id: 5,
      title: translate('game.rolecards.lastMoveCards.faceoff'),
      description: translate('game.rolecards.lastMoveCards.faceoffDesc'),
    },
  ];

  @observable jackLastMove = [
    {
      id: 1,
      title: translate('game.rolecards.lastMoveCards.lambsSilence'),
      description: translate('game.rolecards.lastMoveCards.lambDesc'),
    },
    {
      id: 2,
      title: translate('game.rolecards.lastMoveCards.IdentityDisclosure'),
      description: translate('game.rolecards.lastMoveCards.identityDesc'),
    },
    {
      id: 3,
      title: translate('game.rolecards.lastMoveCards.beautifulMind'),
      description: translate('game.rolecards.lastMoveCards.beautifalJackDesc'),
    },
    {
      id: 4,
      title: translate('game.rolecards.lastMoveCards.bracelet'),
      description: translate('game.rolecards.lastMoveCards.braceletDesc'),
    },
    {
      id: 5,
      title: translate('game.rolecards.lastMoveCards.faceoff'),
      description: translate('game.rolecards.lastMoveCards.faceoffDesc'),
    },
  ];
  constructor() {
    makeAutoObservable(this);
    this.roles = [];
  }
  @action addDay() {
    this.day = this.day + 1;
    return this.day;
  }
  @action addNight() {
    this.night = this.night + 1;
    return this.night;
  }
  @action updateRoles(roles) {
    this.roles = roles;
    return this.roles;
  }
  @action updateLastCards(cards) {
    this.lastMoveCards = cards;
    return this.roles;
  }

  @action updateRolePlayers(items) {
    this.rolePlayers = items;
    return this.rolePlayers;
  }
  @action getRoles() {
    return this.roles;
  }
  @action addRoles(role) {
    if (!this.roles) {
      this.roles = []; // Initialize if undefined
    }
    const newRoles = [...this.roles];
    newRoles.push(role);
    this.roles = newRoles;

    // this.roles.push(role);
    return this.roles;
  }
  @action removeRoles(role) {
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
  @action gameReset() {
    this.roles = [];
    this.players = [];
    this.rolePlayers = [];
    this.night = 0;
    this.day = 0;
  }
}
export default new GameStore();
