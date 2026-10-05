import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { CustomSuggestionsOptionFC, CustomSuggestionsOptionsGroupFC } from './custom-suggestions';

describe('CustomSuggestionsOptionFC', () => {
	const defaultProps = {
		disabled: false,
		index: 0,
		option: 'Test Option',
		selected: false,
	};

	it('renders default state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsOptionFC {...defaultProps} />,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders selected state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsOptionFC {...defaultProps} selected={true} />,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders with different index and option', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => <CustomSuggestionsOptionFC {...defaultProps} index={2} option="Different Option" />,
		});
		expect(page.root).toMatchSnapshot();
	});
});

describe('CustomSuggestionsOptionsGroupFC', () => {
	const defaultProps = {
		blockSuggestionMouseOver: false,
	};

	it('renders default state', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => (
				<CustomSuggestionsOptionsGroupFC {...defaultProps}>
					<li>Test Content</li>
				</CustomSuggestionsOptionsGroupFC>
			),
		});
		expect(page.root).toMatchSnapshot();
	});

	it('renders with blocked mouse over', async () => {
		const page = await newSpecPage({
			components: [],
			template: () => (
				<CustomSuggestionsOptionsGroupFC {...defaultProps} blockSuggestionMouseOver={true}>
					<li>Test Content</li>
				</CustomSuggestionsOptionsGroupFC>
			),
		});
		expect(page.root).toMatchSnapshot();
	});
});
