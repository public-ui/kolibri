import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import CustomSuggestionsOptionFc from '../CustomSuggestionsOption';

describe('CustomSuggestionsOption', () => {
	const defaultProps = {
		index: 0,
		option: 'Test Option',
		selected: false,
	};

	it('renders default state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsOptionFc {...defaultProps} />,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders selected state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsOptionFc {...defaultProps} selected={true} />,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders with different index and option', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsOptionFc {...defaultProps} index={2} option="Different Option" />,
		});
		expect(page.root).toMatchSnapshot();
	});
});
