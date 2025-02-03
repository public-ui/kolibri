import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolIconFc from '../Icon';

describe('KolIconFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render with the correct class', async () => {
		const className = 'test-class';
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" class={className} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain(className);
	});

	it('should render with the correct style', async () => {
		const style = { color: 'red' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" style={style} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.style.color).toBe('red');
	});

	it('should handle onClick event', async () => {
		const onClick = jest.fn();
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" onClick={onClick} />);
		page.root?.click();
		expect(onClick).toHaveBeenCalled();
	});

	it('should render with the correct icons and label', async () => {
		const icons = 'test-icons';
		const label = 'test-label';
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons={icons} label={label} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_icons')).toBe(icons);
		expect(page.root?.getAttribute('_label')).toBe(label);
	});
});
