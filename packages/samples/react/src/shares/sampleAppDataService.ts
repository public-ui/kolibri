type JsonData = Record<string, unknown>;

export const getThemeVariantDataKey = (theme: string): string => `theme-variant-data:${theme}`;

const sampleAppDataRequests = new Map<string, string>([
	[getThemeVariantDataKey('bwst'), '/assets/variants/inject-variants_bwst.json'],
	[getThemeVariantDataKey('default'), '/assets/variants/inject-variants_default.json'],
	[getThemeVariantDataKey('desy-v11'), '/assets/variants/inject-variants_desy-v11.json'],
	[getThemeVariantDataKey('ecl-ec'), '/assets/variants/inject-variants_ecl-ec.json'],
	[getThemeVariantDataKey('ecl-eu'), '/assets/variants/inject-variants_ecl-eu.json'],
	[getThemeVariantDataKey('kern-v2'), '/assets/variants/inject-variants_kern-v2.json'],
	[getThemeVariantDataKey('unstyled'), '/assets/variants/inject-variants_unstyled.json'],
]);

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
			console.info('Error fetching sample app data: HTTP ' + response.status);
			return;
		}
		const json = (await response.json()) as unknown;
		if (json && typeof json === 'object' && !Array.isArray(json)) {
			values.set(key, json as JsonData);
		}
	} catch (error) {
		console.info('Sample app data file could not be loaded or parsed', error);
	}
};

export const sampleAppDataService = {
	getValue: <T = JsonData>(key: string): T | undefined => values.get(key) as T | undefined,
	initialize: async (): Promise<void> => {
		initializePromise ??= Promise.all(Array.from(sampleAppDataRequests, ([key, url]) => fetchJsonData(key, url))).then(() => undefined);
		return initializePromise;
	},
};
