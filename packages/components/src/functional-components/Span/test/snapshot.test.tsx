import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import KolSpanFc from './..';

describe('KolSpanFc', () => {
	it('should render with default props', async () => {
		const page = await newSpecPage({
			components: [KolSpanFc],
			template: () => <KolSpanFc label="Default Label" />,
		});

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName.toLowerCase()).toBe('span');
		expect(page.root?.classList.contains('kol-span-wc')).toBe(true);
		expect(page.root?.textContent).toContain('Default Label');
	});

	it('should render with icons', async () => {
		const icons = { top: { icon: 'top-icon' }, left: { icon: 'left-icon' }, right: { icon: 'right-icon' }, bottom: { icon: 'bottom-icon' } };
		const page = await newSpecPage({
			components: [KolSpanFc],
			template: () => <KolSpanFc label="Label with Icons" icons={icons} />,
		});

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('.top')).not.toBeNull();
		expect(page.root?.querySelector('.left')).not.toBeNull();
		expect(page.root?.querySelector('.right')).not.toBeNull();
		expect(page.root?.querySelector('.bottom')).not.toBeNull();
	});

	it('should hide label when hideLabel is true', async () => {
		const page = await newSpecPage({
			components: [KolSpanFc],
			template: () => <KolSpanFc label="Hidden Label" hideLabel={true} />,
		});

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.classList.contains('hide-label')).toBe(true);
		expect(page.root?.textContent).not.toContain('Hidden Label');
	});

	it('should render with badge text', async () => {
		const page = await newSpecPage({
			components: [KolSpanFc],
			template: () => <KolSpanFc label="Label with Badge" badgeText="Badge" />,
		});

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toContain('Badge');
	});

	it('should allow markdown in label', async () => {
		const page = await newSpecPage({
			components: [KolSpanFc],
			template: () => <KolSpanFc label="**Bold Label**" allowMarkdown={true} />,
		});

		expect(page.root).toBeDefined();
		expect(page.root).toMatchSnapshot();
		// Here you could add specific markdown rendering checks if needed
	});
});
