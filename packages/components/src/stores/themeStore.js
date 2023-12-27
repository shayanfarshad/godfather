import {observable, action, makeAutoObservable, toJS, runInAction} from 'mobx';
import { setColorMode } from '../theme';

class ThemeStore {
  @observable isDark = true;
  constructor() {
    makeAutoObservable(this);
  }

  @action getTheme() {
    return this.isDark;
  }

  @action setTheme(theme) {
    setColorMode(theme)
    return (this.isDark = theme);
  }
}
export default new ThemeStore();
