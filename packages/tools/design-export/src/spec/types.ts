/**
 * Design facet of the BEM specification: the facts a design tool needs that the BEM registry
 * (`packages/components/src/schema/bem-registry.ts`) does not carry today.
 *
 * The registry names the block, its elements and their modifiers as flat sets. A design tool
 * additionally needs the tree the elements form, what kind of layer each element is, which prop
 * switches which modifier, which modifiers are design axes and what content a library instance
 * shows. With this facet the transformation `spec → Penpot/Figma` runs without a browser and
 * gives byte-identical output for identical sources (see `docs/design-export/BEM-SPEC-DESIGN-FACET.md`).
 *
 * The format is a proposal: the pilot specs live in this package until the facet moves into the
 * registry next to `BEM`.
 */
export interface BlockDesignSpec {
	/** BEM block, equal to the tag name (`kol-button`). */
	block: string;
	/** The design axes of the component, in property order. */
	axes: DesignAxis[];
	/** Prop that a modifier mirrors, per block modifier of the registry. */
	modifiers: Record<string, ModifierBinding>;
	/** Content of a library instance: the props the samples render (label, icons, …). */
	sample: Record<string, boolean | string>;
	/** The element tree below the block root. */
	tree: DesignNode;
}

/** A modifier that mirrors a prop: present when the prop has the value (or is truthy without `value`). */
export interface ModifierBinding {
	prop: string;
	value?: boolean | string;
}

/**
 * One design axis: a prop the designer switches (variant property in Penpot and Figma) or an
 * interaction state of the interactive element.
 */
export type DesignAxis =
	| {
			kind: 'prop';
			/** Property name in the design tool (`Variant`, `Type`, `Disabled`). */
			name: string;
			prop: string;
			values: (boolean | string)[];
			/**
			 * Modifier the value sets on the block root. `{value}` is replaced by the value; absent for an
			 * axis that only switches a prop already bound in `modifiers` (`_disabled` → `disabled`).
			 */
			modifier?: string;
	  }
	| {
			kind: 'state';
			/** Property name in the design tool (`Hover`, `Focus`). */
			name: string;
			state: InteractionState;
	  };

export type InteractionState = 'active' | 'focus' | 'hover';

/** One layer of the element tree. */
export interface DesignNode {
	/** BEM element of the block; absent for the block root. */
	element?: string;
	/** Rendered HTML tag; decides user-agent defaults and the native `disabled` attribute. */
	tag: string;
	kind: DesignNodeKind;
	/**
	 * The node carries the interaction states (`:hover`, `:focus`) and the native `disabled`
	 * attribute while the component is disabled.
	 */
	interactive?: boolean;
	/** Embedded component rendered through its functional component (item), e.g. `kol-span`. */
	embeds?: string;
	/** Props passed to the embedded component, as prop names of this component or literals. */
	embedProps?: Record<string, ValueSource>;
	/** Modifiers of the element, each bound to a prop. */
	modifiers?: Record<string, ModifierBinding>;
	/** The node exists only when the prop is set (truthy) or has the given value. */
	when?: ModifierBinding;
	/** Text content of a `text` node. */
	text?: ValueSource;
	/** Icon class of an `icon` node (`kolicon-cross`). */
	glyph?: ValueSource;
	children?: DesignNode[];
}

/**
 * - `frame`: a box (div, button, a); becomes a frame with auto layout.
 * - `text`: a text run; becomes a text layer.
 * - `icon`: an icon glyph of the icon font; becomes a placeholder layer named after the icon.
 * - `slot`: a slot for consumer content; becomes an empty frame designers fill.
 */
type DesignNodeKind = 'frame' | 'icon' | 'slot' | 'text';

/**
 * Where a value comes from: a literal, a prop of the component, or a prop value looked up in a
 * table (the alert icon depends on `_type`).
 */
export type ValueSource = { literal: boolean | string } | { map?: Record<string, string>; prop: string };
