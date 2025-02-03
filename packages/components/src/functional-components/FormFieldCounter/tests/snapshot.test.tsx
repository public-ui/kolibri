import { h } from '@stencil/core';
import KolFormFieldCounterFc from '../FormFieldCounter';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('KolFormFieldCounterFc', () => {
	it('should render correctly', async () => {
		const currentLength = 5;
		const maxLength = 10;
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolFormFieldCounterFc currentLength={currentLength} maxLength={maxLength} class={classNames} />
		));

		expect(page.root).toMatchSnapshot();
	});

	it('should render currentLength and maxLength correctly', async () => {
		const currentLength = 5;
		const maxLength = 10;
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldCounterFc currentLength={currentLength} maxLength={maxLength} />);

		expect(page.root?.textContent).toContain(currentLength.toString());
		expect(page.root?.textContent).toContain(maxLength.toString());
	});

	it('should set the correct class names', async () => {
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldCounterFc class={classNames} />);

		expect(page.root?.className).toContain('counter');
		expect(page.root?.className).toContain(classNames);
	});
});
