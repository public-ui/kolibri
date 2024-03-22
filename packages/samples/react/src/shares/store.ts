import { Option } from '@public-ui/components';
import PackageJson from '@public-ui/components/package.json';

import { isTheme, Store, ThemeAndUnstyled, THEME_OPTIONS } from './theme';

const STORE_IDENTIFIER = `public-ui.v${PackageJson.version}`;

class StaticStorage {
	private readonly store: Map<string, string> = new Map();

	public setItem(key: string, value: string) {
		this.store.set(key, value);
	}

	public getItem(key: string) {
		return this.store.get(key) || null;
	}
}

const STORE: Store = {
	darkMode: false,
	theme: 'default',
};

let STORAGE: Storage;
export function setStorage(storage: Storage) {
	STORAGE = storage;
	const RESTORE = STORAGE.getItem(STORE_IDENTIFIER);
	try {
		const store = JSON.parse(RESTORE as string) as Store;
		if (typeof store === 'object' && store !== null) {
			STORE.darkMode = store.darkMode === true;
			if (isTheme(store.theme)) {
				STORE.theme = store.theme;
			}
		}
	} catch (e) {
		/* empty */
	}
}
setStorage(new StaticStorage() as unknown as Storage);

const setStore = () => {
	STORAGE.setItem(STORE_IDENTIFIER, JSON.stringify(STORE));
};

const switchDarkMode = (mode: boolean) => {
	const html = document.querySelector('html');
	if (html) {
		html.dataset.theme = mode ? 'dark' : 'light';
	}
};

// ts-prune-ignore-next
export const setDarkMode = (value: boolean) => {
	STORE.darkMode = value === true;
	switchDarkMode(STORE.darkMode);
	setStore();
};

// ts-prune-ignore-next
export const getDarkMode = (): boolean => {
	return STORE.darkMode === true;
};

export const setTheme = (theme: ThemeAndUnstyled) => {
	if (isTheme(theme)) {
		STORE.theme = theme;
		setStore();
	} else {
		throw new Error(`The theme identifier "${theme}" is not valid or an available option.`);
	}
};

export const getTheme = (): ThemeAndUnstyled => {
	return `${STORE.theme}`;
};

export const getThemeName = (theme: ThemeAndUnstyled) => {
	if (isTheme(theme)) {
		return THEME_OPTIONS.find((option) => (option as Option<ThemeAndUnstyled>).value === theme)?.label;
	} else {
		throw new Error(`The theme identifier "${theme}" is not valid or an available option.`);
	}
};
