import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxDarkModeService {
  storageKey = 'darkModeEnabled';

  _darkModeStorageEnabled = signal(true);
  darkModeStorageEnabled = this._darkModeStorageEnabled.asReadonly();

  constructor() { }

  disableDarkModeStateStorage() {
    this._darkModeStorageEnabled.set(false);
    localStorage.removeItem(this.storageKey);
  }

  storeDarkModeState(state: boolean) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  getDarkModeState() {
    return this.darkModeStorageEnabled() 
      ? localStorage.getItem(this.storageKey) == 'true' 
      : false;
  }
}
