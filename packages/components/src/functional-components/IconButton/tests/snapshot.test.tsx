import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import type { IconButtonProps } from '../IconButton';
import KolIconButtonFc from '../IconButton';

describe('KolIconButtonFc', () => {
	it('should render button component correctly', async () => {
		const props: IconButtonProps = { componentName: 'button', label: 'Test Button', icon: 'test-icon' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('kol-button');
		expect(page.root?.querySelector('button')?.getAttribute('aria-label')).toContain('Test Button');
	});

	it('should render icon component correctly', async () => {
		const props: IconButtonProps = { componentName: 'icon', icon: 'test-icon' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('I');
		expect(page.root?.className).toContain('kol-icon');
	});

	it('should render icon with correct classes when componentName is icon', async () => {
		const props: IconButtonProps = { componentName: 'icon', icon: 'fas fa-star', class: 'custom-icon-class' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('I');
		expect(page.root?.className).toContain('kol-icon');
		expect(page.root?.className).toContain('fas');
		expect(page.root?.className).toContain('fa-star');
	});

	it('should handle onClick event', async () => {
		const onClick = jest.fn();
		const props: IconButtonProps = { componentName: 'button', label: 'Test Button', icon: 'test-icon', onClick };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		page.root?.querySelector('button')?.click();
		await page.waitForChanges();
		expect(onClick).toHaveBeenCalled();
	});

	it('should render with additional props', async () => {
		const props: IconButtonProps = { componentName: 'button', label: 'Test Button', icon: 'test-icon', class: 'custom-class' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('custom-class');
	});
});
