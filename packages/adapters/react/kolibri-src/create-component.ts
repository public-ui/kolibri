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
 * The generated proxies call `createComponent` at module scope, while applications register the
 * tag name transformer later through `bootstrap` or `setTagNameTransformer`. Because the tag would
 * otherwise be resolved eagerly against an unregistered transformer, resolving the final tag and
 * defining the custom element is deferred to the first render.
 */
export const createComponent = <I extends HTMLElement, E extends EventNames, C, R extends keyof C = never>(
	args: ComponentArgs<I, E, C, R>,
): StencilReactComponent<I, E, C, R> => {
	let component: InstanceType<StencilReactComponent<I, E, C, R>> | undefined;
	const { transformTag, tagName, ...options } = args;

	return React.forwardRef(
		(props: Parameters<StencilReactComponent<I, E, C, R>>[0], ref: React.Ref<I>) =>
			React.createElement(
				(component ??= createReactComponent({ ...options, tagName: transformTag ? transformTag(tagName) : tagName })),
				{ ...props, ref },
			),
	) as unknown as StencilReactComponent<I, E, C, R>;
};
