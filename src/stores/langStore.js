import {observable, action, makeAutoObservable} from 'mobx';

class LangStore {
  @observable language = 'en';
  constructor() {
    makeAutoObservable(this);
  }

  @action getLanguage() {
    return this.language;
  }

  @action changeLanguage(lang) {
    return (this.language = lang);
  }
}
export default new LangStore();
