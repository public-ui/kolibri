import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ResolvedButtonProps } from '../../internal/functional-components/button/resolve-props';
import { resolveButtonProps } from '../../internal/functional-components/button/resolve-props';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { PopoverButtonApi } from '../../internal/functional-components/popover-button/api';
import { popoverButtonPropsConfig } from '../../internal/functional-components/popover-button/api';
import { PopoverButtonFC } from '../../internal/functional-components/popover-button/component';
import { PopoverController } from '../../internal/functional-components/popover/controller';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import {
	accessKeyProp,
	ariaDescriptionProp,
	buttonCallbacksProp,
	buttonTypeProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	popoverAlignProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../internal/props';
import type {
	AccessKeyPropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	ClickableElement,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	IdPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	PopoverAlignPropType,
	PopoverButtonProps,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { setEventTarget } from '../../schema';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { createCtaRef, directClick, directFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * Transitional `kol-popover-button-wc` — a `shadow:false` element that renders `PopoverButtonFC`
 * (which renders `ButtonFC`) directly into the light DOM.
 *
 * It exists because legacy consumers (split-button, FormFieldLabel) render `<kol-popover-button-wc>`
 * inside their own shadow DOM and reach the inner `.kol-popover-button` / `.kol-button` CSS classes
 * from their stylesheets. A `shadow:true` element would encapsulate those classes behind a shadow
 * boundary, breaking consumer styling. When every consumer migrates to render `PopoverButtonFC`
 * directly, this element can be deleted.
 *
 * @internal
 * @slot - The popover content.
 * @slot expert - Custom label content for the button (when `_label` is `false`).
 */
@Component({
	tag: 'kol-popover-button-wc',
	shadow: false,
})
export class KolPopoverButtonWc
	extends BaseWebComponent<PopoverButtonApi>
	implements ClickableElement, FocusableElement, PopoverButtonProps, WebComponentInterface<PopoverButtonApi>
{
	@Element() protected readonly host?: HTMLKolPopoverButtonWcElement;

	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();

	private readonly popoverCtrl = new PopoverController();
	private popoverElement?: HTMLDivElement;
	private readonly popoverId = createUniqueId('popover');

	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	@State() private popoverOpen = false;

	private readonly setPopoverElementRef = (element?: HTMLDivElement) => {
		this.popoverElement = element;
		this.popoverCtrl.setPopoverElementRef(element);
	};

	// --- Lifecycle ---
	public componentWillLoad(): void {
		this.initRenderProps(popoverButtonPropsConfig);
		this.unsetRenderProp('tabIndex');
		this.watchAccessKey(this._accessKey);
		this.watchAriaDescription(this._ariaDescription);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		this.watchId(this._id);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchOn(this._on);
		this.watchPopoverAlign(this._popoverAlign);
		this.watchShortKey(this._shortKey);
		this.watchTabIndex(this._tabIndex);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchType(this._type);
		this.watchVariant(this._variant);
		this.tooltipBehavior.componentWillLoad({ label: this.getRenderProp('label'), align: this.getRenderProp('tooltipAlign') });
	}

	public componentDidRender(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
		if (this.popoverElement) {
			this.popoverElement.addEventListener('toggle', this.handleToggle);
		}
		if (this.getRenderProp('popoverAlign')) {
			this.popoverCtrl.setAlign(this.getRenderProp('popoverAlign'));
		}
	}

	public disconnectedCallback(): void {
		if (this.popoverElement) {
			this.popoverElement.removeEventListener('toggle', this.handleToggle);
		}
		this.popoverCtrl.destroy();
		this.popoverElement = undefined;
		this.tooltipBehavior.destroy();
	}

	// --- Public methods ---
	/**
	 * Hides the popover programmatically by calling the PopoverController.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async hidePopover() {
		this.popoverCtrl.setShow(false);
	}

	/**
	 * Show the popover programmatically by calling the PopoverController.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async showPopover() {
		this.popoverCtrl.setShow(true);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@directFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@directClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Event handling ---
	private readonly handleToggle = (event: Event): void => {
		this.popoverOpen = (event as ToggleEvent).newState === 'open';
	};

	private readonly handleClick = (event: MouseEvent): void {
		event.stopPropagation();
		this.tooltipBehavior.hideTooltip();
		this.popoverCtrl.setShow(!this.popoverOpen);
		const onClick = this.getRenderProp('on').onClick;
		if (typeof onClick === 'function') {
			setEventTarget(event, this.ctaRef.el);
			onClick(event, this._value);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click);
		}
	};

	private readonly handleMouseDown = (event: MouseEvent): void => {
		this.getRenderProp('on').onMouseDown?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.mousedown);
		}
	};

	private readonly handleFocus = (event: FocusEvent): void => {
		this.getRenderProp('on').onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly handleBlur = (event: FocusEvent): void => {
		this.getRenderProp('on').onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	// --- Render ---
	public render(): JSX.Element {
		return (
			<PopoverButtonFC
				ariaDescriptionId={this.getState('ariaDescriptionId')}
				buttonProps={this.resolveButtonProps()}
				handleBlur={this.handleBlur}
				handleClick={this.handleClick}
				handleFocus={this.handleFocus}
				handleMouseDown={this.handleMouseDown}
				popoverAlign={this.getRenderProp('popoverAlign')}
				popoverId={this.popoverId}
				popoverOpen={this.popoverOpen}
				popoverRef={this.setPopoverElementRef}
				refButton={this.ctaRef}
				refTooltip={this.tooltipBehavior.setTooltipElementRef}
			/>
		);
	}

	private resolveButtonProps(): ResolvedButtonProps {
		return resolveButtonProps(
			{
				_accessKey: this.getRenderProp('accessKey'),
				_ariaDescription: this.getRenderProp('ariaDescription'),
				_customClass: this.getRenderProp('customClass'),
				_disabled: this.getRenderProp('disabled'),
				_hideLabel: this.getRenderProp('hideLabel'),
				_icons: this.getRenderProp('icons'),
				_id: this.getRenderProp('id'),
				_inline: this.getRenderProp('inline'),
				_label: this.getRenderProp('label'),
				_name: this._name,
				_on: this.getRenderProp('on'),
				_shortKey: this.getRenderProp('shortKey'),
				_tabIndex: this.getRenderProp('tabIndex'),
				_tooltipAlign: this.getRenderProp('tooltipAlign'),
				_type: this.getRenderProp('type'),
				_variant: this.getRenderProp('variant'),
			},
			this.host,
		);
	}

	// --- @State ---
	@State() public ariaDescriptionId: string = nonce();

	// --- Props + Watchers ---
	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;
	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;
	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		ariaDescriptionProp.apply(value, (v) => this.setRenderProp('ariaDescription', v));
	}

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;
	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		customClassProp.apply(value, (v) => this.setRenderProp('customClass', v));
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;
	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => this.setRenderProp('hideLabel', v));
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsPropType;
	@Watch('_icons')
	public watchIcons(value?: IconsPropType): void {
		spanIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	/**
	 * Defines the internal ID of the primary component element.
	 * @internal
	 */
	@Prop() public _id?: IdPropType;
	@Watch('_id')
	public watchId(value?: IdPropType): void {
		idProp.apply(value, (v) => this.setRenderProp('id', v));
	}

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = false;
	@Watch('_inline')
	public watchInline(value?: InlinePropType): void {
		inlineProp.apply(value, (v) => this.setRenderProp('inline', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;
	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.tooltipBehavior.watchLabel(v);
		});
	}

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Defines the callback functions for button events.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;
	@Watch('_on')
	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		buttonCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Defines where to show the Popover preferably: top, right, bottom or left.
	 */
	@Prop() public _popoverAlign?: PopoverAlignPropType = 'bottom';
	@Watch('_popoverAlign')
	public watchPopoverAlign(value?: PopoverAlignPropType): void {
		popoverAlignProp.apply(value, (v) => {
			this.setRenderProp('popoverAlign', v);
			this.popoverCtrl.setAlign(v);
		});
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;
	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
	}

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;
	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		if (typeof value === 'number') {
			tabIndexProp.apply(value, (v) => this.setRenderProp('tabIndex', v));
		} else {
			this.unsetRenderProp('tabIndex');
		}
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';
	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		tooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipBehavior.watchAlign(v);
		});
	}

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';
	@Watch('_type')
	public watchType(value?: ButtonTypePropType): void {
		buttonTypeProp.apply(value, (v) => this.setRenderProp('type', v));
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop() public _value?: StencilUnknown;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType = 'normal';
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
