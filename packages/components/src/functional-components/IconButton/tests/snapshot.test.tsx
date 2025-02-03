import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import type { IconButtonProps } from '../IconButton';
import KolIconButtonFc from '../IconButton';

describe('KolIconButtonFc', () => {
	it('should render button component correctly', async () => {
		const props: IconButtonProps = { componentName: 'button', label: 'Test Button', icon: 'test-icon' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('KOL-BUTTON-WC');
		expect(page.root?.getAttribute('_label')).toContain('Test Button');
	});

	it('should render icon component correctly', async () => {
		const props: IconButtonProps = { componentName: 'icon', icon: 'test-icon' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('KOL-ICON');
	});

	it('should handle onClick event', async () => {
		const onClick = jest.fn();
		const props: IconButtonProps = { componentName: 'button', label: 'Test Button', icon: 'test-icon', onClick };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root?.getAttribute('onClick')).toBeDefined();
	});

	it('should render with additional props', async () => {
		const props: IconButtonProps = { componentName: 'button', label: 'Test Button', icon: 'test-icon', class: 'custom-class' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconButtonFc {...props} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('custom-class');
	});
});
