import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type { Generic } from 'adopted-style-sheets';
import { getFeatureFlag } from 'adopted-style-sheets';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ButtonApi, ButtonWebComponentInterface } from '../../internal/functional-components/button/api';
import { buttonPropsConfig } from '../../internal/functional-components/button/api';
import { ButtonFC } from '../../internal/functional-components/button/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaSelectedProp,
	buttonCallbacksProp,
	buttonTypeProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkRoleProp,
	nameProp,
	shortKeyProp,
	spanIconsProp,
	tooltipAlignProp,
	variantProp,
} from '../../internal/props';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonProps,
	ButtonTypePropType,
	ClickableElement,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { setEventTarget } from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import { nonce } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';

/**
 * The **Button** component is used to present users with action options and arrange them in a clear hierarchy. It helps users find the most important actions on a page or within a viewport and allows them to execute those actions. The button label clearly indicates which action will be triggered. Buttons allow users to confirm a change, complete steps in a task, or make decisions.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButton extends BaseWebComponent<ButtonApi> implements ButtonProps, ButtonWebComponentInterface, ClickableElement, FocusableElement {
	@Element() protected readonly host?: HTMLKolButtonElement;

	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();

	// --- Composed behaviors ---

	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	/**
	 * `AssociatedInputController` predates the skeleton architecture: it expects a
	 * `Generic.Element.Component`, i.e. a mutable `state` bag plus underscored props. A skeleton web
	 * component has no such bag, so the controller receives this minimal adapter instead of the
	 * component itself. It carries exactly what the controller reads and writes: `state` (patched
	 * by `validateName`), `_name` and `_syncValueBySelector`.
	 */
	private readonly formAssociation: Generic.Element.Component & Pick<ButtonProps, '_name' | '_syncValueBySelector'> = { state: {} };

	private readonly associatedController: AssociatedInputController;

	public constructor() {
		super();
		this.associatedController = new AssociatedInputController(this.formAssociation, 'button', this.host);
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(buttonPropsConfig);

		this.watchAccessKey(this._accessKey);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaDescription(this._ariaDescription);
		this.watchAriaExpanded(this._ariaExpanded);
		this.watchAriaSelected(this._ariaSelected);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchOn(this._on);
		this.watchRole(this._role);
		this.watchShortKey(this._shortKey);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchType(this._type);
		this.watchValue(this._value);
		this.watchVariant(this._variant);

		this.tooltipBehavior.componentWillLoad({
			label: this.getRenderProp('label'),
			align: this.getRenderProp('tooltipAlign'),
		});
	}

	public componentDidRender(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		this.tooltipBehavior.destroy();
	}

	// --- Event handling ---

	private readonly handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		this.tooltipBehavior.hideTooltip();

		const type = this.getRenderProp('type');
		if (type === 'submit') {
			propagateSubmitEventToForm({ form: this.host, ref: this.ctaRef.el });
		} else if (type === 'reset') {
			propagateResetEventToForm({ form: this.host, ref: this.ctaRef.el });
		} else {
			// TODO: Static form handling
			this.associatedController.setFormAssociatedValue(this._value);

			const onClick = this.getRenderProp('on').onClick;
			if (typeof onClick === 'function') {
				setEventTarget(event, this.ctaRef.el);
				onClick(event, this._value);
			}
		}

		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, this._value);
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

	// --- Public methods ---

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown> {
		return this._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<ButtonFC
					accessKey={this.getRenderProp('accessKey')}
					ariaControls={this.getRenderProp('ariaControls')}
					ariaDescription={this.getRenderProp('ariaDescription')}
					ariaDescriptionId={this.ariaDescriptionId}
					ariaExpanded={this.getRenderProp('ariaExpanded')}
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
					refButton={this.ctaRef}
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
		validateAccessAndShortKey(value, this._shortKey);
	}

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;
	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		ariaControlsProp.apply(value, (v) => this.setRenderProp('ariaControls', v));
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
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		ariaExpandedProp.apply(value, (v) => this.setRenderProp('ariaExpanded', v));
	}

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;
	@Watch('_ariaSelected')
	public watchAriaSelected(value?: boolean): void {
		ariaSelectedProp.apply(value, (v) => this.setRenderProp('ariaSelected', v));
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
	@Watch('_name')
	public watchName(value?: string): void {
		nameProp.apply(value, (v) => this.setRenderProp('name', v));
		this.formAssociation._name = value;
		this.associatedController.validateName(value);
	}

	/**
	 * Defines the callback functions for button events.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;
	@Watch('_on')
	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		buttonCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;
	@Watch('_role')
	public watchRole(value?: AlternativeButtonLinkRolePropType): void {
		linkRoleProp.apply(value, (v) => this.setRenderProp('role', v));
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;
	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;
	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.formAssociation._syncValueBySelector = value;
		this.associatedController.validateSyncValueBySelector(value);
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
	@Watch('_value')
	public watchValue(value?: StencilUnknown): void {
		this.associatedController.setFormAssociatedValue(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		// The predecessor took the default from the inner `kol-button-wc`, whose `_variant` prop
		// defaulted to the `buttonVariantDefault` feature flag (or `'normal'`). Now that
		// `kol-button` renders the functional component itself, that fallback has to live here —
		// as a fallback rather than a `@Prop` default, so the public API stays identical.
		variantProp.apply(value ?? getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal', (v) => this.setRenderProp('variant', v));
	}
}
