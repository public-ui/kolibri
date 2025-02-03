import { h } from '@stencil/core';
import ToastItemFc from '../ToastItem';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import type { Toast } from '../../../schema';

describe('ToastItemFc', () => {
	const mockOnClose = jest.fn();
	const basicToast: Toast = {
		type: 'info',
		label: 'Test Toast',
		description: 'Test Description',
		variant: 'card',
	};

	it('should render with basic props and status', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <ToastItemFc toast={basicToast} onClose={mockOnClose} status="settled" />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('.kol-alert__heading')?.textContent).toContain('Test Toast');
		expect(page.root?.querySelector('.kol-alert__content')?.textContent).toContain('Test Description');
	});

	it('should render with different status classes', async () => {
		const statuses: Array<'adding' | 'settled' | 'removing'> = ['adding', 'settled', 'removing'];

		for (const status of statuses) {
			const page = await renderFunctionalComponentToSpecPage(() => <ToastItemFc toast={basicToast} onClose={mockOnClose} status={status} />);

			expect(page.root?.classList.contains(`kol-toast-item--${status}`)).toBeTruthy();
		}
	});
});
