import type * as AdoptedStyleSheetsModule from 'adopted-style-sheets';
import type * as AriaCurrentServiceModule from '../../internals/src/components/link/ariaCurrentService';
import type * as I18nModule from '../../internals/src/core/i18n';
import type * as TooltipTrackingModule from '../../internals/src/utils/tooltip-open-tracking';
import type * as BootstrapModule from './bootstrap';
import type * as ThemeStoreModule from './theme-store';

type AdoptedStyleSheets = typeof AdoptedStyleSheetsModule;
type AriaCurrentService = typeof AriaCurrentServiceModule;
type Bootstrap = typeof BootstrapModule;
type I18n = typeof I18nModule;
type ThemeStore = typeof ThemeStoreModule;
type TooltipTracking = typeof TooltipTrackingModule;

/** Loads modules the way a further bundle copy of the runtime does: with module state of its own. */
const loadCopy = <T>(load: () => T): T => {
	let copy: T | undefined;
	jest.isolateModules(() => {
		copy = load();
	});
	return copy as T;
};

describe('state shared across bundle copies', () => {
	it('notifies the location subscribers of every copy', () => {
		const rootEntry = loadCopy(() => jest.requireActual<AriaCurrentService>('../../internals/src/components/link/ariaCurrentService'));
		const customElements = loadCopy(() => jest.requireActual<AriaCurrentService>('../../internals/src/components/link/ariaCurrentService'));
		const subscriber = jest.fn();

		const unsubscribe = customElements.onLocationChange(subscriber, false);
		rootEntry.setCurrentLocation('#/route');
		unsubscribe();

		expect(subscriber).toHaveBeenCalledWith('#/route');
	});

	it('reports a tooltip opened in one copy as open in every copy', () => {
		const rootEntry = loadCopy(() => jest.requireActual<TooltipTracking>('../../internals/src/utils/tooltip-open-tracking'));
		const customElements = loadCopy(() => jest.requireActual<TooltipTracking>('../../internals/src/utils/tooltip-open-tracking'));

		customElements.tooltipOpened();
		const open = rootEntry.isTooltipOpen();
		customElements.tooltipClosed();

		expect(open).toBe(true);
	});

	it('resolves the bootstrap options in every copy', async () => {
		const rootEntry = loadCopy(() => jest.requireActual<Bootstrap>('./bootstrap'));
		const customElements = loadCopy(() => jest.requireActual<Bootstrap>('./bootstrap'));

		await rootEntry.bootstrap([], [], { reflectInputValues: true });

		expect(customElements.getOptions()?.reflectInputValues).toBe(true);
	});

	it('translates with the instance the last initialization created in any copy', () => {
		const rootEntry = loadCopy(() => jest.requireActual<I18n>('../../internals/src/core/i18n'));
		const customElements = loadCopy(() => jest.requireActual<I18n>('../../internals/src/core/i18n'));

		const instance = rootEntry.initializeI18n('en');

		expect(customElements.getI18nInstance()).toBe(instance);
	});

	it('points the theme store of every copy at one instance', () => {
		const load = () => ({
			adoptedStyleSheets: jest.requireActual<AdoptedStyleSheets>('adopted-style-sheets'),
			themeStore: jest.requireActual<ThemeStore>('./theme-store'),
		});
		const rootEntry = loadCopy(load);
		const customElements = loadCopy(load);

		rootEntry.themeStore.shareThemeStore();
		customElements.themeStore.shareThemeStore();

		expect(customElements.adoptedStyleSheets.STORE.A11yUi).toBe(rootEntry.adoptedStyleSheets.STORE.A11yUi);
	});
});
