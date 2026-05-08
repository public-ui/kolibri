import { PUBLIC_THEMES, UNSTYLED_THEME } from './theme';

import type { Theme } from './theme';

type JsonData = Record<string, unknown>;

const getDefaultThemes = (): Theme[] => [UNSTYLED_THEME, ...PUBLIC_THEMES];

export const getThemeVariantDataKey = (theme: string): string => `theme-variant-data:${theme}`;

const getThemeVariantDataUrl = (theme: string): string => `assets/variants/inject-variants_${theme}.json`;

const getSampleAppDataRequests = (themes: Theme[] = getDefaultThemes()): Map<string, string> => {
	return new Map<string, string>(themes.map(({ key }) => [getThemeVariantDataKey(key), getThemeVariantDataUrl(key)]));
};

const values = new Map<string, JsonData>();
const loadPromises = new Map<string, Promise<void>>();
const loadedKeys = new Set<string>();

const fetchJsonData = async (key: string, url: string): Promise<void> => {
	try {
		const response = await fetch(url);
		if (response.status === 404) {
			// No variants file for a theme is an expected state.
			return;
		}
		if (!response.ok) {
			console.warn('Error fetching sample app data: HTTP ' + response.status);
			return;
		}
		const json = (await response.json()) as unknown;
		if (json && typeof json === 'object' && !Array.isArray(json)) {
			values.set(key, json as JsonData);
		}
	} catch (error) {
		console.warn('Sample app data file could not be loaded or parsed', error);
	}
};

const getLoadPromise = (key: string, url: string): Promise<void> => {
	let loadPromise = loadPromises.get(key);
	if (!loadPromise) {
		loadPromise = fetchJsonData(key, url).then(() => {
			loadedKeys.add(key);
		});
		loadPromises.set(key, loadPromise);
	}
	return loadPromise;
};

export const sampleAppDataService = {
	getValue: <T = JsonData>(key: string): T | undefined => values.get(key) as T | undefined,
	initialize: async (themes?: Theme[]): Promise<void> => {
		await Promise.all(Array.from(getSampleAppDataRequests(themes), ([key, url]) => getLoadPromise(key, url)));
	},
	isInitialized: (themes?: Theme[]): boolean => Array.from(getSampleAppDataRequests(themes).keys()).every((key) => loadedKeys.has(key)),
};
