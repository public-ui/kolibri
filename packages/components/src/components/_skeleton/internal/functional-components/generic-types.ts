import type { EventEmitter } from '@stencil/core';

type AnyRecord = Record<string, unknown>;

type Callback<T> = (value?: T) => void;

type KeyToMessage<Key extends PropertyKey> = Key extends string | number ? Key : 'symbol';

type KeyIntersection<OptionalKeys extends PropertyKey, RequiredKeys extends PropertyKey> = Extract<OptionalKeys, RequiredKeys>;

type KeyIntersectionMessage<OptionalKeys extends PropertyKey, RequiredKeys extends PropertyKey> =
	KeyIntersection<OptionalKeys, RequiredKeys> extends never
		? never
		: `PropsDefinitionError: duplicate keys ${KeyToMessage<KeyIntersection<OptionalKeys, RequiredKeys>>}`;

declare const propsDefinitionMarker: unique symbol;

type PropsDefinitionMetadata<Optional extends AnyRecord, Required extends AnyRecord> = {
	optional: Optional;
	required: Required;
};

type PropsDefinitionMessage<Optional extends AnyRecord, Required extends AnyRecord> = KeyIntersectionMessage<keyof Optional, keyof Required>;

export type PropsDefinition<Optional extends AnyRecord, Required extends AnyRecord> =
	PropsDefinitionMessage<Optional, Required> extends never
		? Required &
				Partial<Optional> & {
					readonly [propsDefinitionMarker]?: PropsDefinitionMetadata<Optional, Required>;
				}
		: PropsDefinitionMessage<Optional, Required>;

export type PropsOrDefault<Props> = Props extends null | undefined
	? Record<never, never>
	: Props extends {
				readonly [propsDefinitionMarker]?: PropsDefinitionMetadata<infer Optional extends AnyRecord, infer Required extends AnyRecord>;
		  }
		? Required & Partial<Optional>
		: Props extends AnyRecord
			? Props
			: Record<never, never>;

export interface ComponentApi {
	Props?: AnyRecord;
	States?: AnyRecord;
	Emitters?: AnyRecord;
	Methods?: Record<string, () => unknown>;
	Listeners?: AnyRecord;
	Callbacks?: Record<string, () => unknown>;
	Refs?: Record<string, HTMLElement>;
}

type Extract<T extends ComponentApi, K extends keyof ComponentApi> = PropsOrDefault<T[K]>;

type ExtractProps<T extends ComponentApi> = Extract<T, 'Props'>;
type ExtractStates<T extends ComponentApi> = Extract<T, 'States'>;
type ExtractEmitters<T extends ComponentApi> = Extract<T, 'Emitters'>;
type ExtractMethods<T extends ComponentApi> = Extract<T, 'Methods'>;
type ExtractListeners<T extends ComponentApi> = Extract<T, 'Listeners'>;
type ExtractCallbacks<T extends ComponentApi> = Extract<T, 'Callbacks'>;
type ExtractRefs<T extends ComponentApi> = Extract<T, 'Refs'>;

type ComponentCallbacks<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

type WebComponentEmitters<Emitters> = {
	[K in keyof Emitters as `${Lowercase<string & K>}`]: EventEmitter<Emitters[K]>;
};

type FunctionalComponentEmitters<Emitters> = {
	[K in keyof Emitters as `on${Capitalize<string & K>}`]: EventEmitter<Emitters[K]>;
};

type ComponentProps<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]: Props[K];
};

type ComponentRefs<Refs> = {
	[K in keyof Refs as `ref${Capitalize<string & K>}`]: (element?: Refs[K]) => void;
};

type ComponentListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

type ComponentMethods<Methods> = {
	[K in keyof Methods as `kol${Capitalize<string & K>}`]: Methods[K];
};

type ComponentWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

export type NotNullableFields<Props> = {
	[K in keyof Props]-?: NonNullable<Props[K]>;
};

export type WebComponentInterface<T extends ComponentApi> = {
	componentWillLoad(): void;
} & ComponentProps<ExtractProps<T>> &
	NotNullableFields<ExtractStates<T>> &
	ComponentWatchers<ExtractProps<T>> &
	WebComponentEmitters<ExtractEmitters<T>> &
	ComponentMethods<ExtractMethods<T>> &
	ComponentListeners<ExtractListeners<T>>;

export type FunctionalComponentProps<T extends ComponentApi> = NotNullableFields<ExtractProps<T>> &
	NotNullableFields<ExtractStates<T>> &
	ComponentCallbacks<ExtractCallbacks<T>> &
	ComponentRefs<ExtractRefs<T>> &
	FunctionalComponentEmitters<ExtractEmitters<T>>;

type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

type ControllerListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

type ControllerMethods<Methods> = {
	[K in keyof Methods]: Methods[K];
};

type ControllerRefSetters<Refs> = {
	[K in keyof Refs as `set${Capitalize<string & K>}Ref`]: (element?: Refs[K]) => void;
};

export type ControllerInterface<T extends ComponentApi = ComponentApi> = {
	componentWillLoad(props: NotNullableFields<ExtractProps<T>>): void;
	getProps(): NotNullableFields<ExtractProps<T>>;
} & ComponentWatchers<ExtractProps<T>> &
	ControllerCallbackHandlers<ExtractCallbacks<T>> &
	ControllerListeners<ExtractListeners<T>> &
	ControllerMethods<ExtractMethods<T>> &
	ControllerRefSetters<ExtractRefs<T>>;
