import { h } from '@stencil/core';
import KolHeadingFc from '../Heading';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('KolHeadingFc', () => {
	it('should render with default props', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolHeadingFc>Default Heading</KolHeadingFc>);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('H1');
		expect(page.root?.textContent).toContain('Default Heading');
		expect(page.root?.classList.contains('kol-heading-wc')).toBe(true);
	});

	it('should render with a specific level', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolHeadingFc level={3}>Level 3 Heading</KolHeadingFc>);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('H3');
		expect(page.root?.textContent).toContain('Level 3 Heading');
		expect(page.root?.classList.contains('kol-heading-wc')).toBe(true);
	});

	it('should render with a secondary headline', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolHeadingFc secondaryHeadline="Secondary Headline">Main Heading</KolHeadingFc>);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();

		expect(page.root?.tagName).toBe('HGROUP');
		expect(page.root?.querySelector('h1')).not.toBeNull();
		expect(page.root?.querySelector('h2')).not.toBeNull();
		expect(page.root?.textContent).toContain('Main Heading');
		expect(page.root?.textContent).toContain('Secondary Headline');
		expect(page.root?.classList.contains('kol-heading-wc')).toBe(true);
		expect(page.root?.querySelector('h1')?.classList.contains('kol-heading-wc')).toBe(false);
		expect(page.root?.querySelector('h2')?.classList.contains('kol-heading-wc')).toBe(false);
	});

	it('should apply custom class names', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolHeadingFc class="custom-class">Custom Class Heading</KolHeadingFc>);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('H1');
		expect(page.root?.classList.contains('custom-class')).toBe(true);
		expect(page.root?.classList.contains('kol-heading-wc')).toBe(true);
		expect(page.root?.textContent).toContain('Custom Class Heading');
	});
});
