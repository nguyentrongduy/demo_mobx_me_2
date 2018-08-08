import AppStore from './appStore';
import RouterStore from './routerStore';

const Keys = {
	app: 'app',
	router: 'router'
};

const stores = {
	app: AppStore,
	router: RouterStore
};

export { Keys, stores };