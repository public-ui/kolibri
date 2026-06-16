import type { KoliBriFeatureFlags } from '../../schema';

/**
 * These tests exercise the real feature-flag resolution (`getFeatureFlag`) – including the
 * `adopted-style-sheets` theme registration that `bootstrap()` performs – instead of mocking
 * `getFeatureFlag` itself. Module state (`options`, the theme-flag registry and the
 * `adopted-style-sheets` default-theme singleton) is reset before every test via
 * `jest.resetModules()` so the scenarios cannot pollute each other. The re-imported modules
 * are narrowed to the small surface the tests use to keep the dynamic imports type-safe.
 */
type FeatureFlagKey = keyof KoliBriFeatureFlags;

interface BootstrapApi {
	bootstrap: (themes: unknown, loaders: () => void, options?: unknown) => Promise<unknown>;
	getFeatureFlag: <K extends FeatureFlagKey>(key: K) => KoliBriFeatureFlags[K] | undefined;
	mergeFeatureFlags: (...flagSets: (KoliBriFeatureFlags | undefined)[]) => KoliBriFeatureFlags;
}

interface SchemaApi {
	KoliBri: { createTheme: (name: string, cssMap: Record<string, string>, featureFlags?: KoliBriFeatureFlags) => unknown };
	getThemeFeatureFlags: (themeName: string) => KoliBriFeatureFlags | undefined;
	getRegisteredThemeFeatureFlag: <K extends FeatureFlagKey>(key: K) => KoliBriFeatureFlags[K] | undefined;
	getConflictingThemeFeatureFlagKeys: () => FeatureFlagKey[];
}

const importBootstrap = async (): Promise<BootstrapApi> => (await import('../bootstrap')) as unknown as BootstrapApi;
const importSchema = async (): Promise<SchemaApi> => (await import('../../schema')) as unknown as SchemaApi;

describe('getFeatureFlag', () => {
	let bootstrapApi: BootstrapApi;
	let schemaApi: SchemaApi;

	const bootstrapWith = (themeName: string, detect: 'auto' | 'fixed', featureFlags?: KoliBriFeatureFlags, features?: KoliBriFeatureFlags) => {
		const theme = schemaApi.KoliBri.createTheme(themeName, { GLOBAL: '' }, featureFlags);
		return bootstrapApi.bootstrap(theme, () => {}, {
			features,
			theme: detect === 'fixed' ? { detect, name: themeName } : { detect },
		});
	};

	beforeEach(async () => {
		jest.resetModules();
		// Re-import after the reset so bootstrap, the schema registry and the
		// adopted-style-sheets default-theme singleton all start from a clean slate.
		bootstrapApi = await importBootstrap();
		schemaApi = await importSchema();
	});

	it('returns undefined before bootstrap and without any declared flag', () => {
		expect(bootstrapApi.getFeatureFlag('inputNumberButtons')).toBeUndefined();
	});

	it('resolves an app-level override passed via the bootstrap "features" option', async () => {
		await bootstrapWith('app-theme', 'fixed', undefined, { inputNumberButtons: 'hide' });

		expect(bootstrapApi.getFeatureFlag('inputNumberButtons')).toBe('hide');
	});

	it('lets the app-level override win over a theme-declared flag', async () => {
		await bootstrapWith('override-theme', 'fixed', { inputNumberButtons: 'hide' }, { inputNumberButtons: 'show' });

		expect(bootstrapApi.getFeatureFlag('inputNumberButtons')).toBe('show');
	});

	it('resolves a theme-declared flag in "fixed" detection mode', async () => {
		await bootstrapWith('fixed-theme', 'fixed', { inputNumberButtons: 'hide' });

		expect(schemaApi.getThemeFeatureFlags('fixed-theme')).toEqual({ inputNumberButtons: 'hide' });
		expect(bootstrapApi.getFeatureFlag('inputNumberButtons')).toBe('hide');
	});

	// Regression test for the actual bug: in detection mode 'auto' adopted-style-sheets never
	// sets a global default theme, so getDefaultThemeName() returns null. Before the fix the
	// theme-declared flag was silently ignored and getFeatureFlag() returned undefined.
	it('resolves a theme-declared flag in "auto" detection mode (regression #8881)', async () => {
		const { getDefaultThemeName } = await import('adopted-style-sheets');
		await bootstrapWith('auto-theme', 'auto', { inputNumberButtons: 'hide' });

		expect(getDefaultThemeName()).toBeNull();
		expect(bootstrapApi.getFeatureFlag('inputNumberButtons')).toBe('hide');
	});

	it('returns undefined when the active theme declares no flags', async () => {
		await bootstrapWith('plain-theme', 'fixed');

		expect(bootstrapApi.getFeatureFlag('inputNumberButtons')).toBeUndefined();
	});
});

describe('mergeFeatureFlags', () => {
	let mergeFeatureFlags: BootstrapApi['mergeFeatureFlags'];

	beforeEach(async () => {
		jest.resetModules();
		mergeFeatureFlags = (await importBootstrap()).mergeFeatureFlags;
	});

	it('merges left-to-right so later entries win and ignores undefined sets', () => {
		expect(mergeFeatureFlags({ inputNumberButtons: 'show' }, undefined, { inputNumberButtons: 'hide' })).toEqual({ inputNumberButtons: 'hide' });
	});

	it('returns an empty object when nothing is passed', () => {
		expect(mergeFeatureFlags()).toEqual({});
	});
});

describe('theme feature-flag registry', () => {
	let schemaApi: SchemaApi;

	beforeEach(async () => {
		jest.resetModules();
		schemaApi = await importSchema();
	});

	it('stores flags declared via createTheme third argument', () => {
		schemaApi.KoliBri.createTheme('registry-theme', { GLOBAL: '' }, { inputNumberButtons: 'hide' });

		expect(schemaApi.getThemeFeatureFlags('registry-theme')).toEqual({ inputNumberButtons: 'hide' });
	});

	it('clears stale flags when the theme is re-registered without flags (HMR/dev reload)', () => {
		schemaApi.KoliBri.createTheme('reload-theme', { GLOBAL: '' }, { inputNumberButtons: 'hide' });
		expect(schemaApi.getThemeFeatureFlags('reload-theme')).toEqual({ inputNumberButtons: 'hide' });

		schemaApi.KoliBri.createTheme('reload-theme', { GLOBAL: '' });

		expect(schemaApi.getThemeFeatureFlags('reload-theme')).toBeUndefined();
	});

	it('resolves the first declared value across registered themes', () => {
		schemaApi.KoliBri.createTheme('no-flag-theme', { GLOBAL: '' });
		schemaApi.KoliBri.createTheme('hiding-theme', { GLOBAL: '' }, { inputNumberButtons: 'hide' });

		expect(schemaApi.getRegisteredThemeFeatureFlag('inputNumberButtons')).toBe('hide');
	});

	it('returns undefined when no registered theme declares the flag', () => {
		schemaApi.KoliBri.createTheme('empty-theme', { GLOBAL: '' });

		expect(schemaApi.getRegisteredThemeFeatureFlag('inputNumberButtons')).toBeUndefined();
	});

	it('detects flags declared with conflicting values across registered themes', () => {
		schemaApi.KoliBri.createTheme('light-theme', { GLOBAL: '' }, { inputNumberButtons: 'show' });
		schemaApi.KoliBri.createTheme('dark-theme', { GLOBAL: '' }, { inputNumberButtons: 'hide' });

		expect(schemaApi.getConflictingThemeFeatureFlagKeys()).toEqual(['inputNumberButtons']);
	});

	it('reports no conflict when registered themes agree on a flag value', () => {
		schemaApi.KoliBri.createTheme('first-theme', { GLOBAL: '' }, { inputNumberButtons: 'hide' });
		schemaApi.KoliBri.createTheme('second-theme', { GLOBAL: '' }, { inputNumberButtons: 'hide' });

		expect(schemaApi.getConflictingThemeFeatureFlagKeys()).toEqual([]);
	});
});
