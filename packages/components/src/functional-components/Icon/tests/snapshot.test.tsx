import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolIconFc from '../Icon';

describe('KolIconFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('I');
	});

	it('should render with the correct class', async () => {
		const className = 'test-class';
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" class={className} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('I');
		expect(page.root?.className).toContain('kol-icon');
	});

	it('should render with the correct style', async () => {
		const style = { color: 'red' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test" style={style} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('style')).toContain('color');
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
		expect(page.root?.tagName).toBe('I');
		expect(page.root?.className).toContain(icons);
		expect(page.root?.getAttribute('aria-label')).toBe(label);
	});

	it('should have aria-hidden when no label provided', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('aria-hidden')).toBe('true');
	});

	it('should have role=img when label provided', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="test-label" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('role')).toBe('img');
	});

	it('should have role=presentation when no label provided', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolIconFc icons="test" label="" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('role')).toBe('presentation');
	});
});
