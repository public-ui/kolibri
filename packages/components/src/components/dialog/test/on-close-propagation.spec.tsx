import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolCardWc } from '../../card/component';
import { KolDialogWc } from '../component';

describe('kol-dialog-wc onClose event propagation', () => {
	it('does not call onClose when a child dispatches a bubbling close event', async () => {
		const onClose = jest.fn();

		const page = await newSpecPage({
			components: [KolDialogWc, KolCardWc],
			template: () => <kol-dialog-wc _label="Test" _variant="blank" _on={{ onClose }} />,
		});
		await page.waitForChanges();

		// Dispatch a 'close' event from a child element (simulates KolAlert closer).
		const child = document.createElement('div');
		page.root?.appendChild(child);
		child.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));

		expect(onClose).not.toHaveBeenCalled();
	});

	it('calls onClose when the native dialog element fires a close event', async () => {
		const onClose = jest.fn();

		const page = await newSpecPage({
			components: [KolDialogWc, KolCardWc],
			template: () => <kol-dialog-wc _label="Test" _variant="blank" _on={{ onClose }} />,
		});
		await page.waitForChanges();

		// Dispatch a 'close' event from the dialog element itself (simulates native dialog close).
		const dialog = page.root?.querySelector('dialog');
		dialog?.dispatchEvent(new Event('close', { bubbles: false }));

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not throw when onClose is set to boolean true', async () => {
		const page = await newSpecPage({
			components: [KolDialogWc, KolCardWc],
			// onClose: true is a valid value per validateOn (line 179 in component.tsx)
			template: () => <kol-dialog-wc _label="Test" _variant="blank" _on={{ onClose: true }} />,
		});
		await page.waitForChanges();

		const dialog = page.root?.querySelector('dialog');
		expect(() => dialog?.dispatchEvent(new Event('close', { bubbles: false }))).not.toThrow();
	});
});
