import { defineStore } from 'pinia';

interface AppStore {
  _darkThemeStatus: null | boolean
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStore => ({
    _darkThemeStatus: null,
  }),
  getters: {
    darkThemeStatus: (state) => state._darkThemeStatus
  },
  actions: {
    setDarkThemeStatus(newStatus: boolean) {
      this._darkThemeStatus = newStatus;
    },
  },
});
