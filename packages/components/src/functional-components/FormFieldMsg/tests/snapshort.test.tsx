import { h } from '@stencil/core';
import type { MsgPropType } from '../../../schema';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import FormFieldMsgFc from '../FormFieldMsg';

describe('FormFieldMsgFc', () => {
	it('should render with all props', async () => {
		const alert = true;
		const msg: MsgPropType = { _description: 'This is an error message', _type: 'error' };
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

		expect(page.root?.className).toContain(classNames);
	});

	it('should render the message correctly', async () => {
		const msg: MsgPropType = { _description: 'This is an error message', _type: 'error' };
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldMsgFc id="test-id" msg={msg} />);
		const ICON_LABEL = 'kol-error';

		expect(page.root?.textContent).toBe(`${ICON_LABEL}${msg._description}`);
	});
});
