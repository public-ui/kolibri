import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ButtonApi } from '../../internal/functional-components/button/api';
import { ButtonFC } from '../../internal/functional-components/button/component';
import { ButtonController } from '../../internal/functional-components/button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { AlternativeButtonLinkRole } from '../../internal/props/alternative-button-link-role';
import type { ButtonType } from '../../internal/props/button-type';
import type { ButtonVariant } from '../../internal/props/button-variant';
import type { IconsPropType, KolFocusOptions, StencilUnknown, TooltipAlignPropType } from '../../schema';
import { setEventTarget } from '../../schema';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';

/**
 * The **Button** component is used to present users with action options and arrange them in a clear hierarchy.
 * It helps users find the most important actions on a page or within a viewport and allows them to execute those actions.
 * The button label clearly indicates which action will be triggered. Buttons allow users to confirm a change, complete steps in a task, or make decisions.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButton extends BaseWebComponent<ButtonApi> implements WebComponentInterface<ButtonApi> {
	@Element() protected readonly host?: HTMLKolButtonElement;
	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();
	private readonly ctrl = new ButtonController(this.stateAccess);
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

	/**
	 * Returns the current value.
	 */
	@Method()
	public async getValue(): Promise<StencilUnknown> {
		return Promise.resolve(this.ctrl.getValue());
	}

	// Props
	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: string;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines the internal ID of the primary component element.
	 * @internal
	 */
	@Prop() public _id?: string;

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Defines the callback functions for button events.
	 * @deprecated Use native event listeners instead
	 */
	@Prop() public _on?: {
		onClick?: (event: MouseEvent, value?: unknown) => void;
		onMouseDown?: (event: MouseEvent) => void;
		onFocus?: (event: FocusEvent) => void;
		onBlur?: (event: FocusEvent) => void;
	};

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRole;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: string;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: string;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonType = 'button';

	/**
	 * Defines the value of the element.
	 */
	@Prop() public _value?: StencilUnknown;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariant = 'normal';

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

	@Watch('_customClass')
	public watchCustomClass(value?: string): void {
		this.ctrl.watchCustomClass(value);
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

	@Watch('_id')
	public watchId(value?: string): void {
		this.ctrl.watchId(value);
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

	@Watch('_role')
	public watchRole(value?: AlternativeButtonLinkRole): void {
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

	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		this.ctrl.watchTabIndex(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.ctrl.watchTooltipAlign(value);
	}

	@Watch('_type')
	public watchType(value?: ButtonType): void {
		this.ctrl.watchType(value);
	}

	@Watch('_value')
	public watchValue(value?: StencilUnknown): void {
		this.ctrl.setValue(value);
		this.formController.setFormAssociatedValue(value);
	}

	@Watch('_variant')
	public watchVariant(value?: ButtonVariant): void {
		this.ctrl.watchVariant(value);
	}

	// Event handlers
	private readonly onClick = (event: MouseEvent): void => {
		this.ctrl.handleClick(event);

		const type = this.ctrl.getRenderProp('type');

		if (type === 'submit') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		} else if (type === 'reset') {
			propagateResetEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		} else {
			// Regular button - set form value and trigger callback
			this.formController.setFormAssociatedValue(this._value);

			if (typeof this._on?.onClick === 'function') {
				setEventTarget(event, this.ctaRef.el);
				this._on.onClick(event, this._value);
			}
		}

		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, this._value);
		}
	};

	private readonly onMouseDown = (event: MouseEvent): void => {
		this._on?.onMouseDown?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.mousedown);
		}
	};

	private readonly onFocus = (event: FocusEvent): void => {
		this._on?.onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly onBlur = (event: FocusEvent): void => {
		this._on?.onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	// Lifecycle
	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			accessKey: this._accessKey,
			ariaControls: this._ariaControls,
			ariaDescription: this._ariaDescription,
			ariaExpanded: this._ariaExpanded,
			ariaSelected: this._ariaSelected,
			customClass: this._customClass,
			disabled: this._disabled,
			hideLabel: this._hideLabel,
			icons: this._icons,
			id: this._id,
			inline: this._inline,
			label: this._label,
			name: this._name,
			role: this._role,
			shortKey: this._shortKey,
			tabIndex: this._tabIndex,
			tooltipAlign: this._tooltipAlign,
			type: this._type,
			variant: this._variant,
		});

		this.ctrl.setValue(this._value);
	}

	public componentDidRender(): void {
		this.ctrl.syncTooltipListeners(this.ctaRef.el);
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
					refButton={this.ctaRef}
					refTooltipFloating={this.ctrl.setTooltipFloatingRef}
					tooltipId={this.ctrl.getTooltipId()}
				/>
			</Host>
		);
	}
}
