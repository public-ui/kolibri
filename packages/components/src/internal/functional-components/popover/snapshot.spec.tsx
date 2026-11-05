import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { PopoverFC } from './component';

describe('PopoverFC', () => {
	it.each([{ align: 'top' as const }, { align: 'right' as const }, { align: 'bottom' as const }, { align: 'left' as const }])(
		'renders correctly with props: %j',
		async (props) => {
			const page = await newSpecPage({
				components: [],
				template: () => <PopoverFC {...props} />,
			});
			expect(page.root).toMatchSnapshot();
		},
	);
});
