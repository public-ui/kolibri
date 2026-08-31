import PackageJson from '@public-ui/components/package.json';

import { UNSTYLED_THEME, type Theme } from './theme';

type Store = {
	customThemes?: Theme[];
	darkMode: boolean;
	theme: string;
	nextTheme?: string;
	registeredThemes: Theme[];
};

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
	registeredThemes: [],
};

let STORAGE: Storage;
export function setStorage(storage: Storage) {
	STORAGE = storage;
	const RESTORE = STORAGE.getItem(STORE_IDENTIFIER);
	try {
		const store = JSON.parse(RESTORE as string) as Store;
		if (typeof store === 'object' && store !== null) {
			STORE.darkMode = store.darkMode === true;
			if (typeof store.theme === 'string' && store.theme.length > 0) {
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

export const setRegisteredThemes = (themes: Theme[]) => {
	STORE.registeredThemes = themes;
	if (!isTheme(STORE.theme)) {
		STORE.theme = STORE.nextTheme ?? themes[1]?.key ?? UNSTYLED_THEME.key;
		delete STORE.nextTheme;
	}
	setStore();
};

const isTheme = (value: string) => {
	return STORE.registeredThemes.findIndex((theme) => theme.key === value) !== -1 || value === UNSTYLED_THEME.key;
};

export const setTheme = (theme: string) => {
	if (isTheme(theme)) {
		STORE.theme = theme;
	} else if (theme) {
		STORE.nextTheme = theme;
	} else {
		throw new Error(`The theme identifier "${theme}" is not valid or an available option.`);
	}
	setStore();
};

export const getTheme = (): string => {
	return STORE.theme ?? UNSTYLED_THEME.key;
};

export const getThemeName = (theme: string) => {
	if (STORE.registeredThemes.length === 0) {
		return theme;
	}
	if (isTheme(theme)) {
		return STORE.registeredThemes.find((option) => option.key === theme)?.name;
	} else {
		throw new Error(`The theme identifier "${theme}" is not valid or an available option.`);
	}
};

export const setCustomThemes = (themes: Theme[] | undefined) => {
	STORE.customThemes = themes;
};

export const getCustomThemes = (): Theme[] | undefined => {
	console.log(STORE.theme);

	return STORE.customThemes;
};
