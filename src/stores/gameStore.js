import {observable, action, makeAutoObservable} from 'mobx';

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
  @observable lastMoveCards = [
    {
      id: 1,
      title: 'سکوت بره ها',
      description:
        'بازیکن اخراجی با نشان کردن دو نفر٬ آنان را بمدت یک روز سایلنت کرده و افرادی که نشان شده باشند٬ فردا حتی در دفاع امکان صحبت کردن ندارند. اگر تعداد بازیکنان به نصف رسید٬ در سکوت بره ها یک نفر سایلنت خواهد شد',
    },
    {
      id: 2,
      title: 'افشای هویت',
      description:
        'اگر بازیکن اخراجی این کارت را انتخاب کند٬ گرداننده بدون نیاز به استعالم جمعی نقش دقیق او را فاش میکند و او از بازی بیرون میرود. در این حالت امکان بازگشت به بازی توسط کنستانتین را ندارد',
    },
    {
      id: 3,
      title: 'ذهن زیبا',
      description:
        'اگر صاحب این کارت بتواند فقط نوستراداموس را از بین بازیکنان داخل بازی شناسایی کند. به بازی برمیگردد و نوستراداموس بجای او از بازی خارج میشود. اگر نوستراداموس این کارت را انتخاب کند٬ بدون نیاز به استعالم به بازی باز میگردد اما سپر وی از بین رفته و با شلیک شب کشته خواهد شد',
    },
    {
      id: 4,
      title: 'دستبند',
      description:
        'بازیکن اخراجی با کارت دستبند هرکس را نشان کند٬ توانمندی های ان شب را از وی میگیرد. نکته: اگر تنها یک مافیا در بازی مانده باشد و کارت دسبتند دریافت کرده باشد٬ همچنان امکان شلیک خواهد داشت. )شات مختص به یک مافیا نیست٬ یک توانایی تیمی است(',
    },
    {
      id: 5,
      title: 'تغییر چهره',
      description:
        'بازیکن قبل از خروج کارت نقش خود را با یکی از بازیکنان عوض می کند',
    },
  ];

  constructor() {
    makeAutoObservable(this);
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
  @action addRoles(role) {
    const newRoles = [...this.roles];
    newRoles.push(role);
    this.roles = newRoles;
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
