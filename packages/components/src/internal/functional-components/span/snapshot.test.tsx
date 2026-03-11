import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { SpanFC } from './component';

describe('SpanFC', () => {
	it('should render with default props', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Default Label" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName.toLowerCase()).toBe('span');
		expect(page.root?.classList.contains('kol-span')).toBe(true);
		expect(page.root?.textContent).toContain('Default Label');
	});

	it('should render with icons', async () => {
		const icons = { top: { icon: 'top-icon' }, left: { icon: 'left-icon' }, right: { icon: 'right-icon' }, bottom: { icon: 'bottom-icon' } };
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Label with Icons" icons={icons} />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelectorAll('i')).toHaveLength(4);
	});

	it('should hide label when hideLabel is true', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Hidden Label" hideLabel={true} />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.classList.contains('kol-span--hide-label')).toBe(true);
		expect(page.root?.textContent).not.toContain('Hidden Label');
	});

	it('should render with badge text', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Label with Badge" badgeText="Badge" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toContain('Badge');
	});

	it('should allow markdown in label', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="**Bold Label**" allowMarkdown={true} />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
	});

	it('should underline exact badge text match in label', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Test Label" badgeText="T" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
	});

	it('should underline multi-char badge text in label', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Test Label" badgeText="st" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
	});

	it('should try uppercase badge text variant when no exact match', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Test Label" badgeText="test" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
	});

	it('should try lowercase badge text variant when no uppercase match', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Test Label" badgeText="TEST" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
	});

	it('should handle badge text with no match in label', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <SpanFC label="Test Label" badgeText="X" />);

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
	});
});
