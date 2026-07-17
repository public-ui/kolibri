import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolCardWc } from '../../card/component';
import { KolDialogWc } from '../component';

describe('kol-dialog-wc scroll lock', () => {
	const getOverflow = () => document.documentElement.style.getPropertyValue('overflow');
	let currentComponent: KolDialogWc | undefined;

	const setUpPage = async () => {
		const page = await newSpecPage({
			components: [KolDialogWc, KolCardWc],
			template: () => <kol-dialog-wc _label="Test" _variant="blank" />,
		});
		await page.waitForChanges();
		const component = page.rootInstance as KolDialogWc;
		currentComponent = component;
		const dialog = page.root?.querySelector('dialog');
		expect(dialog).not.toBeNull();
		return { component, dialog: dialog! };
	};

	afterEach(() => {
		// Release a possibly remaining lock so the module-level registry is empty for the next test.
		currentComponent?.disconnectedCallback();
		currentComponent = undefined;
		document.documentElement.style.removeProperty('overflow');
		document.documentElement.style.removeProperty('padding-right');
	});

	it('locks the document scroll when shown modally', async () => {
		const { component } = await setUpPage();

		await component.show(true);

		expect(getOverflow()).toBe('hidden');
	});

	it('does not lock the document scroll when shown non-modally', async () => {
		const { component } = await setUpPage();

		await component.show(false);

		expect(getOverflow()).toBe('');
	});

	it('unlocks the document scroll when the native dialog fires a close event', async () => {
		const { component, dialog } = await setUpPage();

		await component.show(true);
		expect(getOverflow()).toBe('hidden');

		dialog.dispatchEvent(new Event('close', { bubbles: false }));
		expect(getOverflow()).toBe('');
	});

	it('unlocks the document scroll when the component is disconnected while open', async () => {
		const { component } = await setUpPage();

		await component.show(true);
		expect(getOverflow()).toBe('hidden');

		component.disconnectedCallback();
		expect(getOverflow()).toBe('');
	});
});
