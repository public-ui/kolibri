import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PopoverButtonWebComponentInterface } from '../../internal/functional-components/popover-button/api';
import { PopoverButtonFC } from '../../internal/functional-components/popover-button/component';
import { PopoverBehavior } from '../../internal/functional-components/popover/behavior';
import { popoverAlignProp } from '../../internal/props';
import type {
	AccessKeyPropType,
	AriaDescriptionPropType,
	ButtonTypePropType,
	ClickableElement,
	CustomClassPropType,
	DisabledPropType,
	FocusableElement,
	HideLabelPropType,
	IconsPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	NamePropType,
	PopoverAlignPropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TabIndexPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';
import { delegateClick, delegateFocus } from '../../utils/element-interaction';
import { BaseButtonWebComponent } from '../button/base';

/**
 * A button that toggles the visibility of a popover overlay containing arbitrary content.
 * The popover uses the native HTML Popover API for lightweight, non-modal overlays.
 *
 * @slot - The popover content (displayed when the button is clicked).
 * @slot expert - Custom label content for the button (when `_label` is `false`).
 */
@Component({
	tag: 'kol-popover-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolPopoverButton extends BaseButtonWebComponent implements ClickableElement, FocusableElement, PopoverButtonWebComponentInterface {
	@Element()
	protected readonly host?: HTMLKolPopoverButtonElement;

	@State()
	public ariaDescriptionId: string = createUniqueId('aria-description');

	@State()
	public popoverOpen = false;

	/**
	 * Stateless: the shared button base is typed over `ButtonApi`, so its state access does not fit
	 * the popover API, and the open state comes from the popover's own `toggle` event.
	 */
	private readonly popoverBehavior = new PopoverBehavior(BaseWebComponent.stateLess);
	private popoverElement?: HTMLDivElement;

	/**
	 * DOM id of the popover element, referenced by the button's aria-controls attribute. Public
	 * because the element exposes it through its web component interface; it is not a `@State()`
	 * field since it never changes after creation.
	 */
	public readonly popoverId = createUniqueId('popover');

	public constructor() {
		super();
		this.initFormAssociation();
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop()
	public _accessKey?: AccessKeyPropType = undefined;

	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		this.applyAccessKey(value, this._shortKey);
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop()
	public _ariaDescription?: AriaDescriptionPropType = undefined;

	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		this.applyAriaDescription(value);
	}

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop()
	public _customClass?: CustomClassPropType = undefined;

	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		this.applyCustomClass(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop()
	public _disabled?: DisabledPropType = false;

	@Watch('_disabled')
	public watchDisabled(value?: DisabledPropType): void {
		this.applyDisabled(value);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 */
	@Prop()
	public _hideLabel?: HideLabelPropType = false;

	@Watch('_hideLabel')
	public watchHideLabel(value?: HideLabelPropType): void {
		this.applyHideLabel(value);
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop()
	public _icons?: IconsPropType = undefined;

	@Watch('_icons')
	public watchIcons(value?: IconsPropType): void {
		this.applyIcons(value);
	}

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop()
	public _inline?: InlinePropType = false;

	@Watch('_inline')
	public watchInline(value?: InlinePropType): void {
		this.applyInline(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `''` to enable the expert slot.
	 */
	@Prop()
	public _label!: LabelWithExpertSlotPropType;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop()
	public _name?: NamePropType = undefined;

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	/**
	 * Defines where to show the Popover preferably: top, right, bottom or left.
	 */
	@Prop()
	public _popoverAlign?: PopoverAlignPropType = 'right';

	@Watch('_popoverAlign')
	public watchPopoverAlign(value?: PopoverAlignPropType): void {
		popoverAlignProp.apply(value, (v) => this.popoverBehavior.watchAlign(v));
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop()
	public _shortKey?: ShortKeyPropType = undefined;

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		this.applyShortKey(value, this._accessKey);
	}

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop()
	public _syncValueBySelector?: SyncValueBySelectorPropType = undefined;

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop()
	public _tabIndex?: TabIndexPropType = undefined;

	@Watch('_tabIndex')
	public watchTabIndex(value?: TabIndexPropType): void {
		this.applyTabIndex(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop()
	public _tooltipAlign?: TooltipAlignPropType = 'top';

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop()
	public _type?: ButtonTypePropType = 'button';

	@Watch('_type')
	public watchType(value?: ButtonTypePropType): void {
		this.applyType(value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop()
	public _value?: StencilUnknown = undefined;

	@Watch('_value')
	public watchValue(value?: StencilUnknown): void {
		this.applyValue(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: VariantClassNamePropType = undefined;

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}

	/**
	 * Hides the popover programmatically.
	 */
	@Method()
	public hidePopover(): Promise<void> {
		this.popoverBehavior.setShow(false);
		return Promise.resolve();
	}

	/**
	 * Shows the popover programmatically.
	 */
	@Method()
	public showPopover(): Promise<void> {
		// Refused while the button is disabled: the trigger is a `<button disabled>`, so no user
		// interaction can open the popover, and the programmatic path must not be the one way around that.
		if (this.getRenderProp('disabled') !== true) {
			this.popoverBehavior.setShow(true);
		}
		return Promise.resolve();
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public click(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		this.unsetButtonTabIndex();
		// The popover button exposes no `_on` prop, so the button click always toggles the popover.
		this.applyOn({ onClick: this.togglePopover });
		this.popoverBehavior.componentWillLoad({ align: popoverAlignProp.getDefaultValue() });

		this.watchAccessKey(this._accessKey);
		this.watchAriaDescription(this._ariaDescription);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchPopoverAlign(this._popoverAlign);
		this.watchShortKey(this._shortKey);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTabIndex(this._tabIndex);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchType(this._type);
		this.watchValue(this._value);
		this.watchVariant(this._variant);

		this.initTooltipBehavior();
	}

	public componentDidRender(): void {
		this.syncTooltipListeners();
		// addEventListener is idempotent for an identical listener, so per-render calls are safe.
		this.popoverElement?.addEventListener('toggle', this.handleToggle);
	}

	public disconnectedCallback(): void {
		this.destroyTooltipBehavior();
		if (this.popoverElement) {
			this.popoverElement.removeEventListener('toggle', this.handleToggle);
			this.popoverElement = undefined;
		}
		this.popoverBehavior.destroy();
	}

	private readonly togglePopover = (): void => {
		this.popoverBehavior.setShow(!this.popoverOpen);
	};

	private readonly handleToggle = (event: Event): void => {
		this.popoverOpen = (event as ToggleEvent).newState === 'open';
	};

	private readonly setButtonElementRef = (element?: HTMLButtonElement): void => {
		this.ctaRef(element);
		this.popoverBehavior.setTriggerElement(element);
	};

	private readonly setPopoverElementRef = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
		this.popoverBehavior.setPopoverElementRef(element);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<PopoverButtonFC
					accessKey={this.getRenderProp('accessKey')}
					ariaDescription={this.getRenderProp('ariaDescription')}
					ariaDescriptionId={this.getState('ariaDescriptionId')}
					ariaHasPopup={this.getRenderProp('ariaHasPopup')}
					ariaSelected={this.getRenderProp('ariaSelected')}
					customClass={this.getRenderProp('customClass')}
					disabled={this.getRenderProp('disabled')}
					handleBlur={this.handleBlur}
					handleClick={this.handleClick}
					handleFocus={this.handleFocus}
					handleMouseDown={this.handleMouseDown}
					hideLabel={this.getRenderProp('hideLabel')}
					icons={this.getRenderProp('icons')}
					id={this.getRenderProp('id')}
					inline={this.getRenderProp('inline')}
					label={this.getRenderProp('label')}
					name={this.getRenderProp('name')}
					on={this.getRenderProp('on')}
					popoverAlign={this.popoverBehavior.getRenderProp('align')}
					popoverOpen={this.popoverOpen}
					popoverId={this.popoverId}
					refButton={this.setButtonElementRef}
					refPopover={this.setPopoverElementRef}
					refTooltip={this.tooltipBehavior.setTooltipElementRef}
					role={this.getRenderProp('role')}
					shortKey={this.getRenderProp('shortKey')}
					tabIndex={this.getRenderProp('tabIndex')}
					tooltipAlign={this.getRenderProp('tooltipAlign')}
					type={this.getRenderProp('type')}
					variant={this.getRenderProp('variant')}
				/>
			</Host>
		);
	}
}
