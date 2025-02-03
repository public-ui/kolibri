import { h } from '@stencil/core';
import NativeOptionFc from '../NativeOption';
import { renderFunctionalComponentToSpecPage } from '../../../../utils/testing';

describe('NativeOptionFc', () => {
	it('should render and match snapshot', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc value="testValue" label="testLabel" />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render an option tag with the correct value and label', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc value="testValue" label="testLabel" />);

		expect(page.root).toMatchSnapshot();

		const option = page.root;
		expect(option?.tagName).toBe('OPTION');
		expect(option?.getAttribute('value')).toBe('testValue');
		expect(option?.textContent).toBe('testLabel');
	});

	it('should render an option tag with the correct index as value and label', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc index={-1} value="testValue" label="testLabel" />);

		expect(page.root).toMatchSnapshot();

		const option = page.root;
		expect(option?.tagName).toBe('OPTION');
		expect(option?.getAttribute('value')).toBe('-1');
		expect(option?.textContent).toBe('testLabel');
	});

	it('should set selected attribute correctly based on selectedValue', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc value="testValue" label="testLabel" selectedValue="testValue" />);

		expect(page.root).toMatchSnapshot();

		const option = page.root;
		expect(option?.hasAttribute('selected')).toBe(true);
	});

	it('should set selected attribute correctly based on selectedValue (with index as value)', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc index={-1} value="testValue" label="testLabel" selectedValue="testValue" />);

		expect(page.root).toMatchSnapshot();

		const option = page.root;
		expect(option?.hasAttribute('selected')).toBe(true);
	});

	it('should set selected attribute correctly based on selectedValue as number (with index as value)', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc index={-1} value={5} label="testLabel" selectedValue={5} />);

		expect(page.root).toMatchSnapshot();

		const option = page.root;
		expect(option?.hasAttribute('selected')).toBe(true);
	});

	it('should set selected attribute correctly based on selected prop', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeOptionFc value="testValue" label="testLabel" selected />);

		expect(page.root).toMatchSnapshot();

		const option = page.root;
		expect(option?.hasAttribute('selected')).toBe(true);
	});
});
