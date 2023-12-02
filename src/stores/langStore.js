import {observable, action, makeAutoObservable} from 'mobx';

class LangStore {
  @observable language = 'fa';
  constructor() {
    makeAutoObservable(this);
  }

  @action getLanguage() {
    return this.language;
  }

  @action changeLanguage(lang) {
    this.language = lang;
    return this.language;
  }
}

export default new LangStore();
