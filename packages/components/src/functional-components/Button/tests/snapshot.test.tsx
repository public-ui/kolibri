import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolButtonFc from '../Button';

describe('KolButtonFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('KOL-BUTTON-WC');
		expect(page.root?.getAttribute('_label')).toContain('Test Button');
	});

	it('should render with custom class', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" class="custom-class" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('custom-class');
	});

	it('should handle click event', async () => {
		const onClick = jest.fn();
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" onClick={onClick} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_on')).toBeDefined();
	});

	it('should render with icons', async () => {
		const icons = { left: 'icon-left', right: 'icon-right' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" icons={icons} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?._icons).toEqual(icons);
	});

	it('should hide label when hideLabel is true', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" hideLabel />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_hideLabel')).toBeDefined();
	});
});
