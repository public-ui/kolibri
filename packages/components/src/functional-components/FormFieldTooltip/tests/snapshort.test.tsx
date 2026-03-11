import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import FormFieldTooltipFc from '../FormFieldTooltip';

describe('FormFieldTooltipFc', () => {
	it('should render correctly', async () => {
		const label = 'Test Label';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label={label} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('.kol-tooltip__content')?.getAttribute('id')).toBe('test-id-label');
		expect(page.root?.querySelector('.kol-span__label:not([aria-hidden])')?.textContent).toBe(label);
	});

	it('should set the correct class names', async () => {
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label="Test Label" class={classNames} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('kol-form-field__tooltip');
		expect(page.root?.className).toContain(classNames);
	});

	it('should set aria-hidden attribute', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label="Test Label" />);
		expect(page.root?.getAttribute('aria-hidden')).toBe('true');
	});

	it('should set the correct badgeText', async () => {
		const badgeText = 'Badge Text';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label="Test Label" badgeText={badgeText} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('kbd.badge-text-hint')?.textContent).toBe(badgeText);
	});

	it('should set the correct align property', async () => {
		const align = 'left';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label="Test Label" align={align} />);

		expect(page.root).toMatchSnapshot();
		// align is used for JS positioning via the controller, reflected in snapshots
	});

	it('should set the correct id and label', async () => {
		const id = 'test-id';
		const label = 'Test Label';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id={id} label={label} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('.kol-tooltip__content')?.getAttribute('id')).toBe(`${id}-label`);
		expect(page.root?.querySelector('.kol-span__label:not([aria-hidden])')?.textContent).toBe(label);
	});
});
