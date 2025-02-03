import { h } from '@stencil/core';
import FormFieldTooltipFc from '../FormFieldTooltip';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('FormFieldTooltipFc', () => {
	it('should render correctly', async () => {
		const label = 'Test Label';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label={label} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_id')).toBe(null);
		expect(page.root?.getAttribute('_label')).toBe(label);
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
		expect(page.root?.getAttribute('_badgeText')).toBe(badgeText);
	});

	it('should set the correct align property', async () => {
		const align = 'left';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id="test-id" label="Test Label" align={align} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_align')).toBe(align);
	});

	it('should set the correct id and label', async () => {
		const id = 'test-id';
		const label = 'Test Label';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id={id} label={label} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_id')).toBe(null);
		expect(page.root?.getAttribute('_label')).toBe(label);
	});

	it('should set the correct id when hideLabel is true', async () => {
		const id = 'test-id';
		const label = 'Test Label';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldTooltipFc id={id} label={label} hideLabel={true} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.getAttribute('_id')).toBe(`${id}-label`);
		expect(page.root?.getAttribute('_label')).toBe(label);
	});
});
