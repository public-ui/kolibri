import { isTheme, Store, Theme } from './theme';

class Storage {
	private readonly store: Map<string, string> = new Map();

	public setItem(key: string, value: string) {
		this.store.set(key, value);
	}

	public getItem(key: string) {
		return this.store.get(key) || null;
	}
}

export const STORAGE = new Storage();
// const storage = new Storage();
const RESTORE = STORAGE.getItem('public-ui.website');
const STORE: Store = {
	darkMode: false,
	theme: 'bmf',
};

try {
	const store = JSON.parse(RESTORE) as Store;
	if (typeof store === 'object' && store !== null) {
		STORE.darkMode = store.darkMode === true;
		if (isTheme(store.theme)) {
			STORE.theme = store.theme;
		}
	}
} catch (e) {
	/* empty */
}

const setStore = () => {
	STORAGE.setItem('public-ui.website', JSON.stringify(STORE));
};

const switchDarkMode = (mode: boolean) => {
	const html = document.querySelector('html');
	if (html) {
		html.dataset.theme = mode ? 'dark' : 'light';
	}
};

export const setDarkMode = (value: boolean) => {
	STORE.darkMode = value === true;
	switchDarkMode(STORE.darkMode);
	setStore();
};

export const getDarkMode = (): boolean => {
	return STORE.darkMode === true;
};

export const setTheme = (theme: Theme) => {
	if (isTheme(theme)) {
		STORE.theme = theme;
		setStore();
	} else {
		throw new Error(`The theme identifier "${theme}" is not valid or an available option.`);
	}
};

export const getTheme = (): Theme => {
	return `${STORE.theme}`;
};
