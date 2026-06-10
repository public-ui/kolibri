import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ButtonApi } from '../../internal/functional-components/button/api';
import { ButtonFC } from '../../internal/functional-components/button/component';
import { ButtonLinkController } from '../../internal/functional-components/button/controller';
import type { ButtonVariant } from '../../internal/props/button-variant';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonLinkProps,
	ButtonTypePropType,
	FocusableElement,
	IconsPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	NamePropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';

/**
 * The **ButtonLink** component is semantically a button but has the appearance of a link. All relevant properties of the Button component are adopted and extended with the design-defining properties of a link.
 *
 * A button can be disabled, therefore the **ButtonLink** also has the `_disabled` property. How this is styled visually is determined by the UX designer.
 *
 * Instead of using `_href` as with a regular link, the **ButtonLink**'s behavior is controlled via a click callback using the `_on` property.
 *
 * A link has the `target` property which optionally opens the link in a new window/tab. This behavior is not yet implemented.
 *
 * Since a link, unlike a button, is not offered in multiple variants (`primary`, `secondary`, etc.), the `_customClass` and `_variant` properties are not available.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-button-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButtonLink extends BaseWebComponent<ButtonApi> implements ButtonLinkProps, FocusableElement {
	@Element() protected readonly host?: HTMLKolButtonLinkElement;
	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();
	private readonly ctrl = new ButtonLinkController(this.stateAccess);
	private readonly formController: AssociatedInputController;

	/**
	 * Transitional bridge for the legacy AssociatedInputController, which validates
	 * props through the adopted-style-sheets state machinery.
	 */
	public state: Record<string, unknown> = {};

	public constructor() {
		super();
		this.formController = new AssociatedInputController(this, 'button', this.host);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	public async getValue(): Promise<StencilUnknown> {
		return Promise.resolve(this.ctrl.getValue());
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

	// Props
	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 * @TODO: Change type back to `AriaSelectedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = true;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';

	/**
	 * Defines the value of the element.
	 */
	@Prop() public _value?: StencilUnknown;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	// Watchers
	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		this.ctrl.watchAccessKey(value);
	}

	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		this.ctrl.watchAriaControls(value);
	}

	@Watch('_ariaDescription')
	public watchAriaDescription(value?: string): void {
		this.ctrl.watchAriaDescription(value);
	}

	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.ctrl.watchAriaExpanded(value);
	}

	@Watch('_ariaSelected')
	public watchAriaSelected(value?: boolean): void {
		this.ctrl.watchAriaSelected(value);
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.ctrl.watchDisabled(value);
	}

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.ctrl.watchHideLabel(value);
	}

	@Watch('_icons')
	public watchIcons(value?: IconsPropType): void {
		this.ctrl.watchIcons(value);
	}

	@Watch('_inline')
	public watchInline(value?: boolean): void {
		this.ctrl.watchInline(value);
	}

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	@Watch('_name')
	public watchName(value?: string): void {
		this.ctrl.watchName(value);
		this.formController.validateName(value);
	}

	@Watch('_on')
	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		this.ctrl.watchOn(value);
	}

	@Watch('_role')
	public watchRole(value?: AlternativeButtonLinkRolePropType): void {
		this.ctrl.watchRole(value);
	}

	@Watch('_shortKey')
	public watchShortKey(value?: string): void {
		this.ctrl.watchShortKey(value);
	}

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: string): void {
		this.formController.validateSyncValueBySelector(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.ctrl.watchTooltipAlign(value);
	}

	@Watch('_type')
	public watchType(value?: ButtonTypePropType): void {
		this.ctrl.watchType(value);
	}

	@Watch('_value')
	public watchValue(value?: StencilUnknown): void {
		this.ctrl.setValue(value);
		this.formController.setFormAssociatedValue(value);
	}

	@Watch('_variant')
	public watchVariant(value?: string): void {
		this.ctrl.watchVariant(value);
	}

	// Event handlers - callbacks are invoked by the controller, the web component
	// layer only handles host concerns (form propagation, DOM events).
	private readonly onClick = (event: MouseEvent): void => {
		const { value, formAction, shouldDispatchKolEvent } = this.ctrl.handleClick(event);

		if (formAction === 'submit') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		} else if (formAction === 'reset') {
			propagateResetEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		} else if (shouldDispatchKolEvent) {
			this.formController.setFormAssociatedValue(value);
		}

		if (shouldDispatchKolEvent && this.host) {
			dispatchDomEvent(this.host, KolEvent.click, value);
		}
	};

	private readonly onMouseDown = (event: MouseEvent): void => {
		this.ctrl.handleMouseDown(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.mousedown);
		}
	};

	private readonly onFocus = (event: FocusEvent): void => {
		this.ctrl.handleFocus(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly onBlur = (event: FocusEvent): void => {
		this.ctrl.handleBlur(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	// Ref setter: keeps the CtaRef for the focus/click decorators in sync and
	// lets the controller attach the tooltip listeners exactly once per element.
	private readonly refButton = (el?: HTMLButtonElement): void => {
		this.ctaRef(el);
		this.ctrl.setButtonRef(el);
	};

	// Lifecycle
	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			accessKey: this._accessKey,
			ariaControls: this._ariaControls,
			ariaDescription: this._ariaDescription,
			ariaExpanded: this._ariaExpanded,
			ariaSelected: this._ariaSelected,
			disabled: this._disabled,
			hideLabel: this._hideLabel,
			icons: this._icons,
			inline: this._inline,
			label: this._label,
			name: this._name,
			on: this._on,
			role: this._role,
			shortKey: this._shortKey,
			tooltipAlign: this._tooltipAlign,
			type: this._type,
			// Free-form variant class name; ButtonLinkController normalizes it via variantClassNameProp.
			variant: this._variant as ButtonVariant | undefined,
		});

		this.ctrl.setValue(this._value);
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		return (
			<Host>
				<ButtonFC
					accessKey={this.ctrl.getRenderProp('accessKey')}
					ariaControls={this.ctrl.getRenderProp('ariaControls')}
					ariaDescription={this.ctrl.getRenderProp('ariaDescription')}
					ariaExpanded={this.ctrl.getRenderProp('ariaExpanded')}
					ariaSelected={this.ctrl.getRenderProp('ariaSelected')}
					customClass={this.ctrl.getRenderProp('customClass')}
					disabled={this.ctrl.getRenderProp('disabled')}
					hideLabel={this.ctrl.getRenderProp('hideLabel')}
					icons={this.ctrl.getRenderProp('icons')}
					id={this.ctrl.getRenderProp('id')}
					inline={this.ctrl.getRenderProp('inline')}
					label={this.ctrl.getRenderProp('label')}
					name={this.ctrl.getRenderProp('name')}
					on={this.ctrl.getRenderProp('on')}
					role={this.ctrl.getRenderProp('role')}
					shortKey={this.ctrl.getRenderProp('shortKey')}
					tabIndex={this.ctrl.getRenderProp('tabIndex')}
					tooltipAlign={this.ctrl.getRenderProp('tooltipAlign')}
					type={this.ctrl.getRenderProp('type')}
					variant={this.ctrl.getRenderProp('variant')}
					handleClick={this.onClick}
					handleMouseDown={this.onMouseDown}
					handleFocus={this.onFocus}
					handleBlur={this.onBlur}
					refButton={this.refButton}
					refTooltipFloating={this.ctrl.setTooltipFloatingRef}
					tooltipId={this.ctrl.getTooltipId()}
				/>
			</Host>
		);
	}
}
