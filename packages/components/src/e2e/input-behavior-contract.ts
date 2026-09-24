import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { type E2EPage, test } from '@stencil/playwright';
import { setContentWithRetry } from './utils/setContentWithRetry';

/**
 * One entry of the recorded interaction: a DOM event observed on the host or an `_on` callback call.
 * `custom` separates the KoliBri `CustomEvent`s from native events that reach the host through the shadow boundary.
 */
type ContractEntry =
	| { source: 'callback'; type: string; value?: unknown }
	| {
			source: 'event';
			type: string;
			custom: boolean;
			detail?: unknown;
	  };

type BehaviorContract = {
	/** Entries recorded while focusing the field, entering the test value and moving the focus to an element outside the field. */
	edit: ContractEntry[];
	/** Entries recorded while clicking the interactive element. */
	click: ContractEntry[];
	/** Entries recorded while focusing the interactive element and pressing a key on it. */
	keydown: ContractEntry[];
	/** `FormData` entries of the surrounding form after entering the test value, with `reflectInputValues`. */
	formData: [string, string][];
	/** `FormData` entries as in `formData`, additionally in experimental mode. */
	experimentalFormData: [string, string][];
	/** `_touched` of the host once the focus has left the field. */
	touchedAfterBlur: boolean;
	/** `_value` of the host after the first render without a preset `_value`. */
	initialValue: unknown;
	/** `value` of the `_syncValueBySelector` target after entering the test value in experimental mode. */
	syncedValue: string;
};

type TestInputBehaviorContractOptions = {
	/** Attributes every rendered field needs besides `_label`, e.g. `_options`. */
	additionalProperties?: string;
	componentName: string;
	/** Enters the test value into the interactive element. */
	fillAction: (input: Locator, page: Page & E2EPage) => Promise<void>;
	/** Selects the interactive element inside the shadow root. */
	inputSelector: string;
	/** Behavior of the legacy implementation, which every migration must keep unchanged. */
	pinned: BehaviorContract;
};

/** KoliBri `CustomEvent` dispatched on the host. */
const kolEvent = (type: string, detail: unknown = null): ContractEntry => ({ source: 'event', type, custom: true, detail });
/** Native event that reaches the host through the shadow boundary. */
const nativeEvent = (type: string): ContractEntry => ({ source: 'event', type, custom: false });
/** Call of the `_on` callback for the event type. */
const callback = (type: string, value?: unknown): ContractEntry => ({ source: 'callback', type, value });

type RecordedWindow = Window & { __contract?: ContractEntry[] };

const RECORDED_EVENTS = ['blur', 'change', 'click', 'focus', 'input', 'keydown'];

/** Attaches the recorder to the host: listeners for every public event and an `_on` object with every callback. */
const startRecording = async (host: Locator) => {
	await host.evaluate((element: HTMLElement & { _on?: unknown }, eventTypes: string[]) => {
		const entries: ContractEntry[] = [];
		(window as RecordedWindow).__contract = entries;
		/* Playwright serializes a `FileList` as an empty object, so files are recorded by name. */
		const serializable = (value: unknown): unknown => (value instanceof FileList ? Array.from(value, (file) => file.name) : value);
		eventTypes.forEach((type) => {
			element.addEventListener(type, (event: Event) => {
				entries.push(
					event instanceof CustomEvent ? { source: 'event', type, custom: true, detail: serializable(event.detail) } : { source: 'event', type, custom: false },
				);
			});
		});
		element._on = {
			onBlur: () => entries.push({ source: 'callback', type: 'blur' }),
			onChange: (_event: Event, value?: unknown) => entries.push({ source: 'callback', type: 'change', value: serializable(value) }),
			onClick: () => entries.push({ source: 'callback', type: 'click' }),
			onFocus: () => entries.push({ source: 'callback', type: 'focus' }),
			onInput: (_event: Event, value?: unknown) => entries.push({ source: 'callback', type: 'input', value: serializable(value) }),
			onKeyDown: () => entries.push({ source: 'callback', type: 'keydown' }),
		};
	}, RECORDED_EVENTS);
};

const readRecording = (page: Page) => page.evaluate(() => (window as RecordedWindow).__contract ?? []);

/**
 * Inserts the markup after the KoliBri runtime has started. The form field controllers read the experimental mode and
 * `reflectInputValues` in their constructor, so both must be active before the element is created.
 */
const insertAfterStartup = async (page: Page & E2EPage, html: string, parentSelector = 'body') => {
	await page.evaluate(([markup, selector]) => document.querySelector(selector)?.insertAdjacentHTML('beforeend', markup), [html, parentSelector]);
	await page.waitForChanges();
};

const EXPERIMENTAL_MODE_HEAD = '<head><meta name="kolibri" content="experimental-mode=true" /></head>';

/** Public module entry of the build under test, which exports `register` next to the lazy loader `STENCIL_ENTRY_PATH`. */
const MODULE_ENTRY_PATH = `${(process.env.STENCIL_ENTRY_PATH ?? '/build/kolibri').replace(/\/[^/]*$/, '')}/index.esm.js`;

/** Enables `reflectInputValues`, which only `register()` can set, without registering a theme. */
const registerWithReflectInputValues = async (page: Page) => {
	await page.evaluate(async (entryPath: string) => {
		const { register } = (await import(entryPath)) as { register: (themes: unknown[], loaders: unknown[], options: object) => Promise<unknown> };
		await register([], [], { reflectInputValues: true });
	}, MODULE_ENTRY_PATH);
};

const readFormData = (page: Page) =>
	page
		.locator('form')
		.evaluate((form: HTMLFormElement) => [...new FormData(form).entries()].map(([key, value]) => [key, typeof value === 'string' ? value : value.name]));

/**
 * Pins the observable behavior of a form field: event and callback order with payload, `_touched`, the initial value,
 * form participation and `_syncValueBySelector`. It is written against the legacy implementation before the skeleton
 * migration (G0 of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`) and must stay green unchanged through the migration.
 */
const testInputBehaviorContract = <ElementType extends { _touched?: boolean; _value?: unknown } & HTMLElement>({
	additionalProperties = '',
	componentName,
	fillAction,
	inputSelector,
	pinned,
}: TestInputBehaviorContractOptions) => {
	const field = (attributes = '') => `<${componentName} _label="Input" ${additionalProperties} ${attributes}></${componentName}>`;

	test.describe('Behavior contract', () => {
		test('emits the pinned events and callbacks while editing', async ({ page }) => {
			await setContentWithRetry(page, `${field()}<button id="outside">Outside</button>`);
			const host = page.locator(componentName);
			const input = page.locator(inputSelector);
			await startRecording(host);

			await input.focus();
			await fillAction(input, page);
			await page.locator('#outside').focus();
			await page.waitForChanges();

			expect(await readRecording(page)).toEqual(pinned.edit);
		});

		test('emits the pinned events and callbacks on click', async ({ page, browserName }) => {
			/* See https://github.com/microsoft/playwright/issues/33864 */
			test.skip(browserName === 'firefox', 'Clicking on some native inputs, e.g. input[type=color], in Firefox currently makes the page close itself.');

			await setContentWithRetry(page, field());
			await startRecording(page.locator(componentName));

			await page.locator(inputSelector).click();
			await page.waitForChanges();

			expect(await readRecording(page)).toEqual(pinned.click);
		});

		test('emits the pinned events and callbacks on keydown', async ({ page }) => {
			await setContentWithRetry(page, field());
			await startRecording(page.locator(componentName));

			await page.locator(inputSelector).press('Shift');
			await page.waitForChanges();

			expect(await readRecording(page)).toEqual(pinned.keydown);
		});

		test('sets _touched as pinned once the focus leaves the field', async ({ page }) => {
			await setContentWithRetry(page, `${field()}<button id="outside">Outside</button>`);
			const host = page.locator(componentName);

			expect(await host.evaluate((element: ElementType) => element._touched)).toBe(false);
			await expect(host).not.toHaveAttribute('_touched');

			await page.locator(inputSelector).focus();
			await page.waitForChanges();
			expect(await host.evaluate((element: ElementType) => element._touched)).toBe(false);

			await page.locator('#outside').focus();
			await page.waitForChanges();
			expect(await host.evaluate((element: ElementType) => element._touched)).toBe(pinned.touchedAfterBlur);
			if (pinned.touchedAfterBlur) {
				await expect(host).toHaveAttribute('_touched');
			} else {
				await expect(host).not.toHaveAttribute('_touched');
			}
		});

		test('initializes _value as pinned', async ({ page }) => {
			await setContentWithRetry(page, field());
			await page.waitForChanges();

			expect(await page.locator(componentName).evaluate((element: ElementType) => element._value)).toEqual(pinned.initialValue);
		});

		test('does not take part in a native form without reflectInputValues', async ({ page }) => {
			await setContentWithRetry(page, `<form>${field('_name="field"')}</form>`);
			await fillAction(page.locator(inputSelector), page);
			await page.waitForChanges();

			await expect(page.locator(`${componentName} > [data-form-associated]`)).toHaveCount(0);
			expect(await readFormData(page)).toEqual([]);
		});

		test('reflects its value into a hidden form element with reflectInputValues', async ({ page }) => {
			await setContentWithRetry(page, `<form></form>`);
			await registerWithReflectInputValues(page);
			await insertAfterStartup(page, field('_name="field"'), 'form');
			await fillAction(page.locator(inputSelector), page);
			await page.waitForChanges();

			await expect(page.locator(`${componentName} > [data-form-associated]`)).toHaveCount(1);
			expect(await readFormData(page)).toEqual(pinned.formData);
		});

		test('submits its value in a native form with reflectInputValues in experimental mode', async ({ page }) => {
			await setContentWithRetry(page, `${EXPERIMENTAL_MODE_HEAD}<body><form></form></body>`);
			await registerWithReflectInputValues(page);
			await insertAfterStartup(page, field('_name="field"'), 'form');
			await fillAction(page.locator(inputSelector), page);
			await page.waitForChanges();

			expect(await readFormData(page)).toEqual(pinned.experimentalFormData);
		});

		test('synchronizes the value into _syncValueBySelector in experimental mode', async ({ page }) => {
			await setContentWithRetry(page, `${EXPERIMENTAL_MODE_HEAD}<body><input id="target" /></body>`);
			await insertAfterStartup(page, field('_sync-value-by-selector="#target"'));

			await fillAction(page.locator(inputSelector), page);
			await page.waitForChanges();

			await expect(page.locator('#target')).toHaveValue(pinned.syncedValue);
		});

		test('ignores _syncValueBySelector outside experimental mode', async ({ page }) => {
			await setContentWithRetry(page, `<input id="target" />`);
			await insertAfterStartup(page, field('_sync-value-by-selector="#target"'));

			await fillAction(page.locator(inputSelector), page);
			await page.waitForChanges();

			await expect(page.locator('#target')).toHaveValue('');
		});
	});
};

export { callback, kolEvent, nativeEvent, testInputBehaviorContract };
export type { BehaviorContract, ContractEntry };
