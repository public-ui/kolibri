import { h } from '@stencil/core';
import FormFieldMsgFc from '../FormFieldMsg';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import type { InternMsgPropType } from '../../../schema';

describe('FormFieldMsgFc', () => {
	it('should render with all props', async () => {
		const alert = true;
		const msg: InternMsgPropType = { description: 'This is an error message' };
		const id = 'test-id';
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldMsgFc alert={alert} msg={msg} id={id} class={classNames} />);

		expect(page.root).toMatchSnapshot();
	});

	it('should set the correct id', async () => {
		const id = 'test-id';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldMsgFc id={id} />);

		expect(page.root?.id).toBe(`${id}-msg`);
	});

	it('should set the correct class names', async () => {
		const classNames = 'custom-class';
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldMsgFc id="test-id" class={classNames} />);

		expect(page.root?.className).toContain('error');
		expect(page.root?.className).toContain(classNames);
	});

	it('should handle hideMsg prop correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldMsgFc id="test-id" hideMsg={true} />);

		expect(page.root?.className).toContain('visually-hidden');
	});

	it('should render the message correctly', async () => {
		const msg: InternMsgPropType = { description: 'This is an error message' };
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldMsgFc id="test-id" msg={msg} />);

		expect(page.root?.textContent).toBe(msg.description);
	});
});
