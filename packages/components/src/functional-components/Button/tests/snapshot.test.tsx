import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolButtonFc from '../Button';

describe('KolButtonFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('button')?.textContent).toContain('Test Button');
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
		page.root?.querySelector('button')?.click();
		await page.waitForChanges();
		expect(onClick).toHaveBeenCalled();
	});

	it('should render with icons', async () => {
		const icons = { left: 'icon-left', right: 'icon-right' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" icons={icons} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('.icon-left')).toBeTruthy();
		expect(page.root?.querySelector('.icon-right')).toBeTruthy();
	});

	it('should hide label when hideLabel is true', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolButtonFc label="Test Button" hideLabel />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('kol-button--hide-label');
	});

	it('should render with a long tooltip inside a row-reverse flex container', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<div style={{ display: 'flex', flexDirection: 'row-reverse', width: '200px' }}>
				<KolButtonFc
					label="This is a very long tooltip text that demonstrates the behavior in a row-reverse layout"
					hideLabel
					icons="codicon codicon-home"
					variant="primary"
				></KolButtonFc>
			</div>
		));
		const button = page.root?.querySelector('button') as HTMLButtonElement;
		button.focus();
		await page.waitForChanges();
		expect(page.root).toMatchSnapshot();
	});
});
