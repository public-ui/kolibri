import React from 'react';
import {
	createComponent as createReactComponent,
	type StencilReactComponent as BaseStencilReactComponent,
} from '@stencil/react-output-target/runtime';
import type { EventName } from '@lit/react';

type EventNames = Record<string, EventName | string>;
type ComponentArgs<I extends HTMLElement, E extends EventNames, C, R extends keyof C> = Parameters<
	typeof createComponent<I, E, C, R>
>[0];

/**
 * The props of the generated proxies: the props of the Stencil React runtime widened by the `class`
 * attribute and CSS custom properties in `style`. The runtime's `HTMLAttributes` typing covers
 * neither, while the fork-based proxies accepted both, so existing consumers keep compiling.
 */
export type StencilReactComponent<I extends HTMLElement, E extends EventNames, C, R extends keyof C = never> =
	React.FunctionComponent<
		Omit<Parameters<BaseStencilReactComponent<I, E, C, R>>[0], 'class' | 'style'> & {
			class?: string;
			style?: React.CSSProperties & Record<`--${string}`, string | number | undefined>;
		}
	>;

/**
 * The proxies run through this wrapper to strip undefined props and to write the remaining props
 * onto the host element through the element ref. The Stencil React runtime writes undefined
 * properties to the element, which would override documented defaults like the checkbox `_value`,
 * and its property setting runs in a layout effect that does not fire in every environment the
 * adapters support (component tests with happy-dom render the elements without it).
 *
 * The `tagName` resolution and the element definition run at module scope, like in the generated
 * proxies: applications register the tag name transformer before the first route renders (the
 * documented bootstrap order), so the tag resolves against the registered transformer here.
 */
export const createComponent = <I extends HTMLElement, E extends EventNames, C, R extends keyof C = never>(
	args: ComponentArgs<I, E, C, R>,
): StencilReactComponent<I, E, C, R> => {
	const { transformTag, tagName, ...options } = args;
	const component = createReactComponent({ ...options, tagName: transformTag ? transformTag(tagName) : tagName });

	return React.forwardRef(
		(props: Parameters<StencilReactComponent<I, E, C, R>>[0], ref: React.Ref<I>) => {
			const setProps = Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined));
			return React.createElement(component, {
				...setProps,
				ref: React.useCallback(
					(element: I | null) => {
						if (element !== null) {
							for (const [key, value] of Object.entries(setProps)) {
								if (key !== 'children' && key !== 'ref' && key in element) {
									(element as unknown as Record<string, unknown>)[key] = value;
								}
							}
						}
						if (typeof ref === 'function') {
							ref(element);
						} else if (ref) {
							ref.current = element;
						}
					},
					[ref, setProps],
				),
			});
		},
	) as unknown as StencilReactComponent<I, E, C, R>;
};
