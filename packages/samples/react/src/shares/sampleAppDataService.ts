import { PUBLIC_THEMES, UNSTYLED_THEME } from './theme';

type JsonData = Record<string, unknown>;

export const getThemeVariantDataKey = (theme: string): string => `theme-variant-data:${theme}`;

const getThemeVariantDataUrl = (theme: string): string => `/assets/variants/inject-variants_${theme}.json`;

const sampleAppDataRequests = new Map<string, string>(
	[UNSTYLED_THEME, ...PUBLIC_THEMES].map(({ key }) => [getThemeVariantDataKey(key), getThemeVariantDataUrl(key)]),
);

const values = new Map<string, JsonData>();

let initializePromise: Promise<void> | undefined;

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

export const sampleAppDataService = {
	getValue: <T = JsonData>(key: string): T | undefined => values.get(key) as T | undefined,
	initialize: async (): Promise<void> => {
		initializePromise ??= Promise.all(Array.from(sampleAppDataRequests, ([key, url]) => fetchJsonData(key, url))).then(() => undefined);
		return initializePromise;
	},
};
