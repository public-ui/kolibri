import type { JSX } from '@stencil/core';
import type { InputTypeOnDefault, Option, ShortKeyPropType, StencilUnknown, Stringified } from '../../../schema';
import { createUniqueId } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { selectPropsConfig } from '../select/api';
import { BaseSelectWebComponent } from '../select/base-web-component';

/** The props of the page size select that change with the pagination. */
export type PageSizeSelectInput = {
	label: string;
	on: InputTypeOnDefault;
	options: Option<number>[];
	value: number;
};

/**
 * The page size select of a pagination: the select field of `kol-select`, rendered into the shadow root
 * of the element that renders the pagination (`kol-pagination`, `kol-table-stateful`) instead of an
 * element of its own. That element receives the KoliBri events of the select and frames its focus, so
 * moving the focus from the select to a page button sends no blur.
 *
 * Without an element of its own, the class does what Stencil does for one: the first `render` applies
 * the props in the load order of `kol-select`; each later `render` applies the props that changed, like
 * their watchers. A state change or a prop the select writes itself (`_value`, `_touched`) renders the
 * embedding element again through `requestRender`.
 */
export class PageSizeSelect extends BaseSelectWebComponent {
	public _disabled?: boolean = false;
	public _multiple?: boolean = false;
	public _on?: InputTypeOnDefault;

	protected readonly ctaRef = createCtaRef<HTMLSelectElement>();

	public readonly id = createUniqueId('select');

	private loaded = false;
	private passed?: PageSizeSelectInput;
	private focused = false;
	private touched = false;
	private value?: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>;

	public constructor(
		private readonly getHost: () => HTMLElement | undefined,
		private readonly requestRender: () => void,
	) {
		super();
		this.initFormAssociation('select');
	}

	/** The base class reads the host while it is constructed, before `getHost` is assigned. */
	protected get host(): HTMLElement | undefined {
		return this.getHost?.();
	}

	public get inputHasFocus(): boolean {
		return this.focused;
	}

	public set inputHasFocus(value: boolean) {
		if (value !== this.focused) {
			this.focused = value;
			this.requestRender();
		}
	}

	public get _touched(): boolean | undefined {
		return this.touched;
	}

	public set _touched(value: boolean | undefined) {
		if (value !== this.touched) {
			this.touched = value === true;
			this.applyTouched(value);
			this.requestRender();
		}
	}

	public get _value(): Stringified<StencilUnknown[]> | Stringified<StencilUnknown> | undefined {
		return this.value;
	}

	public set _value(value: Stringified<StencilUnknown[]> | Stringified<StencilUnknown> | undefined) {
		if (value !== this.value) {
			this.value = value;
			this.applyValue(value);
			this.requestRender();
		}
	}

	protected getAccessKeyProp(): string | undefined {
		return undefined;
	}

	protected getShortKeyProp(): ShortKeyPropType | undefined {
		return undefined;
	}

	/** Call once per render of the embedding element. */
	public render(input: PageSizeSelectInput): JSX.Element {
		if (this.loaded) {
			this.update(input);
		} else {
			this.load(input);
		}
		return this.renderSelectField();
	}

	/** Call from `componentDidRender` of the embedding element. */
	public sync(): void {
		this.syncFormField();
	}

	/** Call when the select is no longer rendered. */
	public destroy(): void {
		this.destroyFormField();
	}

	/** The props the pagination does not pass keep the defaults of `kol-select`. */
	private load(input: PageSizeSelectInput): void {
		this.passed = input;
		this._on = input.on;
		this.value = input.value;
		this.initRenderProps(selectPropsConfig);

		this.applyAriaDetails(undefined);
		this.applyName(undefined);
		this.applySyncValueBySelector(undefined);
		this.applyTouched(false);
		this.applyAccessKey(undefined);
		this.applyMsg(undefined);
		this.applyDisabled(false);
		this.applyHideMsg(false);
		this.applyHideLabel(false);
		this.applyHint('');
		this.applyInfoPopover(undefined);
		this.applyLabel(input.label);
		this.applyShortKey(undefined);
		this.applyOn(input.on);
		this.applyTooltipAlign('top');
		this.applyVariant(undefined);
		this.applyTabIndex(undefined);
		this.applyIcons(undefined);
		this.applyOptions(input.options);
		this.applyMultiple(false);
		this.applyRequired(false);
		this.applyRows(undefined);
		this.applyValue(input.value);
		this.loaded = true;
	}

	/**
	 * Applies the props that differ from the last passed ones, in the order the pagination passes them.
	 * The value is applied only when it also differs from the current one, which an earlier choice in the
	 * select may already hold. It does not render again: the embedding element is rendering.
	 */
	private update(input: PageSizeSelectInput): void {
		const passed = this.passed!;
		this.passed = input;
		if (input.label !== passed.label) {
			this.applyLabel(input.label);
		}
		if (input.options !== passed.options) {
			this.applyOptions(input.options);
		}
		if (input.on !== passed.on) {
			this._on = input.on;
			this.applyOn(input.on);
		}
		if (input.value !== passed.value && input.value !== this.value) {
			this.value = input.value;
			this.applyValue(input.value);
		}
	}
}
