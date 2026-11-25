import type { EventName } from '@lit/react';
import { getRegisteredTagNameTransformer } from '@public-ui/components';
import { createComponent as createReactComponent, type StencilReactComponent as BaseStencilReactComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
import { setTagTransformer as clientSetTagTransformer, getTagTransformer } from '../src/tag-transformer';

type EventNames = Record<string, EventName | string>;
type ComponentArgs<I extends HTMLElement, E extends EventNames, C, R extends keyof C> = Parameters<typeof createComponent<I, E, C, R>>[0];

/**
 * The props of the generated proxies: the props of the Stencil React runtime widened by the `class`
 * attribute and CSS custom properties in `style`, which the runtime's `HTMLAttributes` typing does
 * not cover and which the proxies accept.
 */
export type StencilReactComponent<I extends HTMLElement, E extends EventNames, C, R extends keyof C = never> = React.FunctionComponent<
	Omit<Parameters<BaseStencilReactComponent<I, E, C, R>>[0], 'class' | 'style'> & {
		class?: string;
		style?: React.CSSProperties & Record<`--${string}`, string | number | undefined>;
	}
>;

/**
 * The proxies run through this wrapper to strip undefined props and to write the remaining component
 * props (`_`-prefixed) onto the host element through the element ref; `style`, `className` and the
 * event handlers stay with React and the runtime. The Stencil React runtime writes undefined
 * properties to the element, which would override documented defaults like the checkbox `_value`,
 * and its property setting runs in a layout effect that does not fire in every environment the
 * adapters support (component tests with happy-dom render the elements without it).
 *
 * The generated proxies call `createComponent` at module scope, before the application registers the
 * tag name transformer. The wrapper therefore resolves the tag and defines the custom element on the
 * first render, so the transformer must be registered before the first render.
 */
export const createComponent = <I extends HTMLElement, E extends EventNames, C, R extends keyof C = never>(
	args: ComponentArgs<I, E, C, R>,
): StencilReactComponent<I, E, C, R> => {
	const { transformTag, tagName, ...options } = args;
	let component: ReturnType<typeof createReactComponent<I, E, C, R>> | undefined;

	/*
	 * `bootstrap({ transformTagName })` registers through the root entry, a runtime copy this
	 * adapter does not see. The shared state carries the transformer, and the generated copy is
	 * seeded with it, so either registration covers the proxies and their inner rendering.
	 */
	const resolveTagName = (): string => {
		const registered = getRegisteredTagNameTransformer();
		if (registered && !getTagTransformer()) {
			clientSetTagTransformer(registered);
		}
		return transformTag ? transformTag(tagName) : tagName;
	};

	return React.forwardRef((props: Parameters<StencilReactComponent<I, E, C, R>>[0], ref: React.Ref<I>) => {
		component ??= createReactComponent({ ...options, tagName: resolveTagName() });
		const setProps = Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined));
		return React.createElement(component, {
			...setProps,
			ref: React.useCallback(
				(element: I | null) => {
					if (element !== null) {
						for (const [key, value] of Object.entries(setProps)) {
							if (key.startsWith('_') && key in element) {
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
	}) as unknown as StencilReactComponent<I, E, C, R>;
};
