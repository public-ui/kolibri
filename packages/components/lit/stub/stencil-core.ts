/**
 * Minimal `@stencil/core` runtime stub for the Lit spike.
 *
 * The shared KoliBri sources (orchestrator bases, prop definitions, schema) are framework-free,
 * but a few transitively imported modules (the Stencil functional components the base classes
 * reference, and `utils/dev.utils.ts`) import runtime values from `@stencil/core`. The Lit shell
 * never calls the Stencil functional components, so the stub only has to make those imports
 * resolve: `h`/`Fragment` return inert vdom descriptions and the decorators are no-ops.
 */

export const Fragment = Symbol('Fragment');

export const h = (type: unknown, props?: Record<string, unknown>): unknown => ({ tag: type, props });

export const Env: { kolibriVersion: string } = { kolibriVersion: 'lit-spike' };

const noopDecorator = (): MethodDecorator & PropertyDecorator & ClassDecorator => (() => undefined) as never;

export const Component = noopDecorator();
export const Prop = noopDecorator();
export const Watch = noopDecorator();
export const State = noopDecorator();
export const Element = noopDecorator();
export const Method = noopDecorator();
export const Event = noopDecorator();
export const Listen = noopDecorator();
export const Host = Fragment;
