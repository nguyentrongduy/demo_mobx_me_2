import { action, observable } from 'mobx';
import LocalStorageKey from '../constants/LocalStorageKey';

export class AppStore {
	@observable appLoaded = false;

	@action
	setAppLoaded() {
		this.appLoaded = true;
	}

	@action
	getRememberMe() {
		let rememberMe = window.localStorage.getItem(LocalStorageKey.LOGIN_REMEMBER);
		if(rememberMe === undefined || rememberMe === null)
			return false;
		else
			return JSON.parse(rememberMe)
	}

	@action
	setRememberMe() {
		localStorage.setItem(LocalStorageKey.LOGIN_REMEMBER, "true");
	}

	@action
	getLoginStatus() {
		let status = localStorage.getItem(LocalStorageKey.LOGIN_STATUS);
		if(status === undefined || status === null)
			return false;
		else
			return JSON.parse(status);
	}

	@action
	setLoginStatus(loginStatus) {
		localStorage.setItem(LocalStorageKey.LOGIN_STATUS, loginStatus !== undefined ? loginStatus : "false");
	}

	@action
	clearLocalStorage() {
		localStorage.clear();
	}
}

export default new AppStore();