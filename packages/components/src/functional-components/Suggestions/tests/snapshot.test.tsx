import { h } from '@stencil/core';
import type { W3CInputValue } from '../../../schema';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import SuggestionsFc from '../Suggestions';

describe('SuggestionsFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SuggestionsFc id="test-id" suggestions={[]} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('DATALIST');
	});

	it('should render with suggestions', async () => {
		const suggestions: W3CInputValue[] = ['Option 1', 'Option 2'];
		const page = await renderFunctionalComponentToSpecPage(() => <SuggestionsFc id="test-id" suggestions={suggestions} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getElementsByTagName('option')).toHaveLength(2);
	});
});
