import React from 'react';
import { createComponent, type StencilReactComponent } from '@stencil/react-output-target/runtime';

type ComponentArgs<I extends HTMLElement, E, C, R extends keyof C> = Parameters<typeof createComponent<I, E, C, R>>[0];

/**
 * The generated proxies call `createComponent` at module scope, while applications register the
 * tag name transformer later through `bootstrap` or `setTagNameTransformer`. Because the tag would
 * otherwise be resolved eagerly against an unregistered transformer, resolving the final tag and
 * defining the custom element is deferred to the first render.
 */
export const createComponent = <
	I extends HTMLElement,
	E extends Record<string, unknown> = {},
	C = Omit<I, keyof HTMLElement>,
	R extends keyof C = never,
>(
	args: ComponentArgs<I, E, C, R>,
): StencilReactComponent<I, E, C, R> => {
	let component: StencilReactComponent<I, E, C, R> | undefined;

	return React.forwardRef(
		(props: Parameters<StencilReactComponent<I, E, C, R>>[0], ref: React.Ref<I>) =>
			React.createElement(
				(component ??= createComponent({ ...args, tagName: args.transformTag ? args.transformTag(args.tagName) : args.tagName })),
				{ ...props, ref },
			),
	) as StencilReactComponent<I, E, C, R>;
};
