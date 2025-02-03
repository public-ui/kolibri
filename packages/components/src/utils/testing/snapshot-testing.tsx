import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

const propsToLabel = (props: Record<string, unknown>) => {
	return Object.entries(props)
		.map(([key, value]) => `${key}=${JSON.stringify(value)}`)
		.join(' ');
};

/**
 * Executes snapshot tests for a component with different prop variants.
 * @param {string} ComponentName Name of the component to test in kebab-case.
 * @param {Array} components Array of Web Components to render during the test. Typically, the tested component and its WC counterpart.
 * @param propVariants Array of prop variants to test. Each prop variant is an object with the props to pass to the component.
 */
export const executeSnapshotTests = <Props extends Record<string, unknown>>(ComponentName: string, components: unknown[], propVariants: Props[]) => {
	describe(ComponentName, () => {
		const testTable: [string, Props][] = propVariants.map((props) => [propsToLabel(props), props]);

		jest.useFakeTimers();

		it.each(testTable)('should render with %s', async (_, props) => {
			const page = await newSpecPage({
				components,
				template: () => <ComponentName {...props} />,
			});
			await page.waitForChanges();

			expect(page.root).toMatchSnapshot();
		});
	});
};
