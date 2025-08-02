import type { EventEmitter } from '@stencil/core';

/**
 * Helper types that generate prop, watcher, emitter and ref names for the Skeleton example.
 */

/**
 * Generic callback type used by property watchers.
 *
 * @template T - Type of the watched value.
 */
type Callback<T> = (value?: T) => void;

/**
 * Derives `handle*` method names from a callbacks map.
 *
 * @template Callbacks - Shape of callback implementations.
 */
type ComponentCallbacks<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

/**
 * Maps event names to `EventEmitter` properties on the web component.
 *
 * @template Emitters - Record mapping event names to payload types.
 */
type WebComponentEmitters<Emitters> = {
	[K in keyof Emitters as `${Lowercase<string & K>}`]: EventEmitter<Emitters[K]>;
};

/**
 * Creates `on*` emitter props for functional components.
 *
 * @template Emitters - Record mapping event names to payload types.
 */
type FunctionalComponentEmitters<Emitters> = {
	[K in keyof Emitters as `on${Capitalize<string & K>}`]: EventEmitter<Emitters[K]>;
};

/**
 * Transforms public property names into underscored `@Prop` members.
 *
 * @template Props - Public properties accepted by the component.
 */
type ComponentProps<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]: Props[K];
};

/**
 * Converts ref names to `ref*` setter callbacks.
 *
 * @template Refs - Map of ref names to DOM element types.
 */
type ComponentRefs<Refs> = {
	[K in keyof Refs as `ref${Capitalize<string & K>}`]: (element?: Refs[K]) => void;
};

/**
 * Generates `watch*` methods for public properties.
 *
 * @template Props - Public properties exposed by the component.
 */
type ComponentWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

/**
 * Shared interface implemented by Stencil web components.
 *
 * @template State - Render state passed to the functional component.
 * @template Props - Public properties declared with an underscore.
 * @template Emitters - Events emitted by the component.
 */
export type WebComponentInterface<State, Props = Record<never, never>, Emitters = Record<never, never>> = {
	componentWillLoad(): void;
} & ComponentProps<Props> &
	ComponentWatchers<Props> &
	State &
	WebComponentEmitters<Emitters>;

/**
 * Prop type for stateless functional components.
 *
 * Combines normalized props with callbacks, refs and emitters.
 *
 * @template Props - Normalized render props.
 * @template Callbacks - Callback handlers exposed by the controller.
 * @template Emitters - Event emitters available to the component.
 * @template Refs - Ref setters forwarded from the controller.
 */
export type FunctionalComponentProps<Props, Callbacks = Record<never, never>, Emitters = Record<never, never>, Refs = Record<never, never>> = Props &
	ComponentCallbacks<Callbacks> &
	ComponentRefs<Refs> &
	FunctionalComponentEmitters<Emitters>;

/**
 * Derives `handle*` methods for controller callbacks.
 *
 * @template Callbacks - Callback functions exposed by the controller.
 */
type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

/**
 * Creates `set*Ref` functions for controller-managed refs.
 *
 * @template Refs - DOM elements controlled by the controller.
 */
type ControllerRefSetters<Refs> = {
	[K in keyof Refs as `set${Capitalize<string & K>}Ref`]: (element?: Refs[K]) => void;
};

/**
 * Contract implemented by component controllers.
 *
 * @template RenderProps - Render props shared with the web component.
 * @template Callbacks - Callback methods handled by the controller.
 * @template Refs - Ref setters exposed by the controller.
 */
export type ControllerInterface<RenderProps, Callbacks = Record<never, never>, Refs = Record<never, never>> = {
	componentWillLoad(props: RenderProps): void;
} & ComponentWatchers<RenderProps> &
	ControllerCallbackHandlers<Callbacks> &
	ControllerRefSetters<Refs>;
