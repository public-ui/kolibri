import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TooltipFC } from './component';

describe('TooltipFC', () => {
	it.each([
		{ label: 'Tooltip label', badgeText: '', align: 'bottom' as const },
		{ label: 'Tooltip label', align: 'top' as const, badgeText: '' },
		{ label: 'Tooltip label', align: 'right' as const, badgeText: '' },
		{ label: 'Tooltip label', align: 'bottom' as const, badgeText: '' },
		{ label: 'Tooltip label', align: 'left' as const, badgeText: '' },
		{ label: 'Tooltip label', id: 'tooltip-id', badgeText: '', align: 'bottom' as const },
		{ label: 'Tooltip label', badgeText: 'A', align: 'bottom' as const },
		{ label: 'Tooltip label', id: 'tooltip-id', badgeText: 'A', align: 'bottom' as const },
	])('renders correctly with props: %j', async (props) => {
		const page = await newSpecPage({
			components: [],
			template: () => <TooltipFC {...props} />,
		});
		expect(page.root).toMatchSnapshot();
	});
});
