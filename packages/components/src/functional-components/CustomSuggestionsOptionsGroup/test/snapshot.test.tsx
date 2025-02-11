import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import CustomSuggestionsOptionsGroupFc from '../CustomSuggestionsOptionsGroup';

describe('CustomSuggestionsOptionsGroup', () => {
	const defaultProps = {
		blockSuggestionMouseOver: false,
	};

	it('renders default state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => (
				<CustomSuggestionsOptionsGroupFc {...defaultProps}>
					<li>Test Content</li>
				</CustomSuggestionsOptionsGroupFc>
			),
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders with blocked mouse over', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => (
				<CustomSuggestionsOptionsGroupFc {...defaultProps} blockSuggestionMouseOver={true}>
					<li>Test Content</li>
				</CustomSuggestionsOptionsGroupFc>
			),
		});
		expect(page.root).toMatchSnapshot();
	});
});
