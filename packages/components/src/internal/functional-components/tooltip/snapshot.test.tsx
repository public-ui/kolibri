import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TooltipFC } from './component';

describe('TooltipFC', () => {
	it.each([
		{ label: 'Tooltip label' },
		{ label: 'Tooltip label', align: 'top' as const },
		{ label: 'Tooltip label', align: 'right' as const },
		{ label: 'Tooltip label', align: 'bottom' as const },
		{ label: 'Tooltip label', align: 'left' as const },
		{ label: 'Tooltip label', id: 'tooltip-id' },
		{ label: 'Tooltip label', badgeText: 'A' },
		{ label: 'Tooltip label', id: 'tooltip-id', badgeText: 'A', align: 'bottom' as const },
	])('renders correctly with props: %j', async (props) => {
		const page = await newSpecPage({
			components: [],
			template: () => <TooltipFC {...props} />,
		});
		expect(page.root).toMatchSnapshot();
	});
});
