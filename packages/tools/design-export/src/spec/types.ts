/**
 * Design specification of one block: the input of the transformation `spec → Penpot/Figma`.
 *
 * Nobody writes it by hand. `dialect/to-spec.ts` generates it from the BEM registry (design
 * properties through the BEM dialect) and the functional component (element tree); see
 * `docs/design-export/BEM-DIALECT.md`.
 */
export interface BlockDesignSpec {
	/** BEM block, equal to the tag name (`kol-button`). */
	block: string;
	/** The design axes of the component, in property order. */
	axes: DesignAxis[];
	/** Prop that a modifier mirrors, per block modifier of the registry. */
	modifiers: Record<string, ModifierBinding>;
	/** Content of a library instance: the props the samples render (label, icons, …). */
	sample: Record<string, boolean | number | string | undefined>;
	/** The element tree below the block root. */
	tree: DesignNode;
	/**
	 * Renders the component for the props of one variant (`evaluate/evaluate.ts`). When present, it
	 * replaces `tree` and `modifiers`: the functional components decide tags, classes and conditions.
	 */
	render?: (props: Record<string, boolean | number | string | undefined>) => RenderedNode;
}

/** One element as a functional component renders it. */
export interface RenderedNode {
	tag: string;
	classes: string[];
	attributes: Record<string, string>;
	/** Text content directly inside the element. */
	text?: string;
	children: RenderedNode[];
	/** Functional components whose root this element is, outermost first (`FormFieldFC`). */
	fcs?: string[];
	/** The shadow tree of an embedded web component (`kol-link`), styled by that component's rules. */
	shadow?: RenderedNode;
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
			/** Values whose variants get no interaction state (`Hover`, `Focus`). */
			inert?: (boolean | string)[];
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
	/** The node carries the `hidden` attribute (the expert slot): the library shows it hidden. */
	hidden?: boolean;
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
