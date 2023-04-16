import {observable, action, makeAutoObservable} from 'mobx';

class GameStore {
  @observable roles = [];
  @observable players = [];
  @observable rolePlayers = [];
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
      description: 'اگر بازیکن اخراجی این کارت را انتخاب کند٬ گرداننده بدون نیاز به استعالم جمعی نقش دقیق او را فاش میکند و او از بازی بیرون میرود. در این حالت امکان بازگشت به بازی توسط کنستانتین را ندارد',
    },
    {
      id: 3,
      title: 'ذهن زیبا',
      description: 'اگر صاحب این کارت بتواند فقط نوستراداموس را از بین بازیکنان داخل بازی شناسایی کند. به بازی برمیگردد و نوستراداموس بجای او از بازی خارج میشود. اگر نوستراداموس این کارت را انتخاب کند٬ بدون نیاز به استعالم به بازی باز میگردد اما سپر وی از بین رفته و با شلیک شب کشته خواهد شد',
    },
    {
      id: 4,
      title: 'دستبند',
      description: 'بازیکن اخراجی با کارت دستبند هرکس را نشان کند٬ توانمندی های ان شب را از وی میگیرد. نکته: اگر تنها یک مافیا در بازی مانده باشد و کارت دسبتند دریافت کرده باشد٬ همچنان امکان شلیک خواهد داشت. )شات مختص به یک مافیا نیست٬ یک توانایی تیمی است(',
    },
    {
      id: 5,
      title: 'تغییر چهره',
      description: 'بازیکن قبل از خروج کارت نقش خود را با یکی از بازیکنان عوض می کند',
    },
    
  ];

  constructor() {
    makeAutoObservable(this);
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
}
export default new GameStore();
