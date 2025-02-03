import { h } from '@stencil/core';
import KolFormFieldLabelFc from '../FormFieldLabel';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('KolFormFieldLabelFc', () => {
	it('should render with label', async () => {
		const label = 'Test Label';
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldLabelFc label={label} id={id} />);

		expect(page.root).toMatchSnapshot();
	});

	it('should render with accessKey and shortKey', async () => {
		const label = 'Test Label';
		const accessKey = 'A';
		const shortKey = 'S';
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldLabelFc label={label} accessKey={accessKey} shortKey={shortKey} id={id} />);

		expect(page.root).toMatchSnapshot();
	});

	it('should render with expert slot', async () => {
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolFormFieldLabelFc id={id} hasExpertSlot>
				<slot name="expert">Expert Content</slot>
			</KolFormFieldLabelFc>
		));

		expect(page.root).toMatchSnapshot();
	});

	it('should set the correct id and class names', async () => {
		const label = 'Test Label';
		const id = 'test-id';
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldLabelFc label={label} id={id} class={classNames} />);

		expect(page.root?.id).toBe(`${id}-label`);
		expect(page.root?.className).toContain('kol-form-field__label');
		expect(page.root?.className).toContain(classNames);
	});

	it('should hide label when hideLabel is true', async () => {
		const label = 'Test Label';
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldLabelFc label={label} id={id} hideLabel />);

		expect(page.root?.hidden).toBe(true);
	});

	it('should render the correct component tag "legend" ', async () => {
		const label = 'Test Label';
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldLabelFc label={label} id={id} component="legend" />);

		expect(page.root?.tagName).toBe('LEGEND');
		expect(page.root).toMatchSnapshot();
	});

	it('should render the correct component tag "label" ', async () => {
		const label = 'Test Label';
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldLabelFc label={label} id={id} component="label" />);

		expect(page.root?.tagName).toBe('LABEL');
		expect(page.root).toMatchSnapshot();
	});
});
