import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { JSX as StencilJSX } from '@stencil/core';

import type { JSX } from '../../components.d';

/**
 * Tag name of a KoliBri element.
 */
export type ElementTag = keyof JSX.IntrinsicElements;

/**
 * The props of a KoliBri element, derived from its tag name: its `@Prop` declarations plus the HTML attributes of the host.
 * Every prop is optional, so a variant can leave out a required prop on purpose.
 */
export type ElementProps<Tag extends ElementTag> = Partial<StencilJSX.IntrinsicElements[Tag]>;

const propsToLabel = (props: object) => {
	return Object.entries(props)
		.map(([key, value]) => `${key}=${JSON.stringify(value)}`)
		.join(' ');
};

/**
 * Executes snapshot tests for a component with different prop variants.
 *
 * Each variant is additionally pinned against the regression of #11449: the props are assigned to
 * the element right after it was attached and before its first render. The assignment must neither
 * log a console error nor be lost, which the seeding of the render props from the props config on
 * first access guarantees. Assigning before appending the element is deliberately not used: as
 * reported in #11449, that sequence never reaches the pre-load watchers and therefore pins a
 * weaker window.
 *
 * @param ComponentName Tag name of the component to test; it types the prop variants.
 * @param {Array} components Array of Web Components to render during the test. Typically, the tested component and its WC counterpart.
 * @param propVariants Array of prop variants to test. Each prop variant is an object with the props to pass to the component.
 */
export const executeSnapshotTests = <Tag extends ElementTag>(ComponentName: Tag, components: unknown[], propVariants: ElementProps<Tag>[]) => {
	const TagName: string = ComponentName;
	describe(ComponentName, () => {
		const testTable: [string, ElementProps<Tag>][] = propVariants.map((props) => [propsToLabel(props), props]);

		it.each(testTable)('should render with %s', async (_, props) => {
			const page = await newSpecPage({
				components,
				template: () => <TagName {...props} />,
			});
			await page.waitForChanges();

			expect(page.root).toMatchSnapshot();
		});

		it.each(testTable)('should keep assigning props %s before the first render silent', async (_, props) => {
			const page = await newSpecPage({
				components,
				html: '<div></div>',
			});
			const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

			const element = page.doc.createElement(ComponentName);
			page.body.appendChild(element);
			Object.assign(element, props);
			await page.waitForChanges();

			try {
				expect(errorSpy).not.toHaveBeenCalled();
			} finally {
				errorSpy.mockRestore();
			}
		});
	});
};
