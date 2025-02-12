import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import CustomSuggestionsToggle from '../CustomSuggestionsToggle';

describe('CustomSuggestionsToggle', () => {
	it('renders default state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsToggle />,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders disabled state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsToggle disabled={true} />,
		});
		expect(page.root).toMatchSnapshot();
	});
});
