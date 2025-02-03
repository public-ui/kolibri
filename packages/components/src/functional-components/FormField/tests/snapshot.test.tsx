import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolFormFieldFc from '../FormField';
import type { InternMsgPropType } from '../../../schema';

describe('KolFormFieldFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('DIV');
	});

	it('should render correctly with fieldset tag', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" component="fieldset" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('FIELDSET');
	});

	it('should render correctly with div tag', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" component="div" />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('DIV');
	});

	it('should render with required props', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" required />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.className).toContain('required');
	});

	it('should render with error message', async () => {
		const msg: InternMsgPropType = { type: 'error', description: 'Error message' };
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" msg={msg} touched />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toContain('Error message');
	});

	it('should render with hint', async () => {
		const hint = 'Hint message';
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" hint={hint} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toContain(hint);
	});

	it('should render with counter', async () => {
		const counter = { currentLength: 5, maxLength: 10 };
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" counter={counter} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.textContent).toContain(5);
		expect(page.root?.textContent).toContain(10);
	});

	it('should render with tooltip', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolFormFieldFc id="test-id" label="Test Label" tooltipAlign="right" />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render with custom children', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolFormFieldFc id="test-id" label="Test Label">
				<input type="text" />
			</KolFormFieldFc>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.getElementsByTagName('input')).toHaveLength(1);
	});
});
