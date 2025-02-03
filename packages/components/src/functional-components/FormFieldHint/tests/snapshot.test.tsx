import { h } from '@stencil/core';
import KolFormFieldHintFc from '../FormFieldHint';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('KolFormFieldHintFc', () => {
	it('should render with hint', async () => {
		const hint = 'This is a hint';
		const id = 'test-id';
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldHintFc hint={hint} id={id} class={classNames} />);

		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toContain(hint);
	});

	it('should not render without hint', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldHintFc />);

		expect(page.root).toBeNull();
	});

	it('should set the correct id', async () => {
		const hint = 'This is a hint';
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldHintFc hint={hint} id={id} />);

		expect(page.root?.id).toBe(`${id}-hint`);
	});

	it('should set the correct class names', async () => {
		const hint = 'This is a hint';
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldHintFc hint={hint} class={classNames} />);

		expect(page.root?.className).toContain('hint');
		expect(page.root?.className).toContain(classNames);
	});
});
