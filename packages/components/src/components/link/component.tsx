import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { IconFC } from '../../internal/functional-components/icon/component';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	AriaExpandedPropType,
	AriaOwnsPropType,
	CustomClassPropType,
	DisabledPropType,
	DownloadPropType,
	FocusableElement,
	HideLabelPropType,
	HrefPropType,
	InlinePropType,
	InternalLinkAPI,
	KoliBriIconsProp,
	LabelWithExpertSlotPropType,
	LinkOnCallbacksPropType,
	LinkStates,
	LinkTargetPropType,
	ShortKeyPropType,
	Stringified,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import {
	devHint,
	setEventTarget,
	showExpertSlot,
	validateAccessKey,
	validateAlternativeButtonLinkRole,
	validateAriaControls,
	validateAriaCurrentValue,
	validateAriaDescription,
	validateAriaExpanded,
	validateAriaOwns,
	validateCustomClass,
	validateDisabled,
	validateDownload,
	validateHideLabel,
	validateHref,
	validateIcons,
	validateInline,
	validateLabelWithExpertSlot,
	validateLinkCallbacks,
	validateLinkTarget,
	validateShortKey,
	validateTooltipAlign,
	validateVariantClassName,
} from '../../schema';
import { validateTabIndex } from '../../schema/props/tab-index';
import { setClick } from '../../utils/element-click';
import { setFocus } from '../../utils/element-focus';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { UnsubscribeFunction } from './ariaCurrentService';
import { onLocationChange } from './ariaCurrentService';

import { translate } from '../../i18n';
import { SpanFC } from '../../internal/functional-components/span/component';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import clsx from '../../utils/clsx';

/**
 * @internal
 */
@Component({
	tag: 'kol-link-wc',
	shadow: false,
})
export class KolLinkWc implements InternalLinkAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolLinkElement;

	private anchorRef?: HTMLAnchorElement;
	private readonly tooltipCtrl = new TooltipController(BaseWebComponent.stateLess);
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	private readonly translateOpenLinkInTab = translate('kol-open-link-in-tab');

	private readonly setAnchorRef = (ref?: HTMLAnchorElement) => {
		this.anchorRef = ref;
	};

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(): Promise<void> {
		return setFocus(this.anchorRef!);
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	public async click(): Promise<void> {
		return setClick(this.anchorRef!);
	}

	private readonly onClick = (event: Event) => {
		if (this.state._disabled === true) {
			event.preventDefault();
		} else {
			if (typeof this.state._on?.onClick === 'function') {
				setEventTarget(event, this.anchorRef);
				this.state._on?.onClick(event, this.state._href);
			}
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.click, this.state._href);
			}
		}
	};

	private readonly getRenderValues = () => {
		/**
		 * DX
		 * Das möchte ich ungern für HTML machen, sondern nur für Barrierefreiheitsthemen.
		 */
		// if (typeof this.state._href === 'string' && this.state._href.length > 0) {
		//   console.error('Setz den URL.');
		//   throw new Error('Setz den URL.');
		// }

		// switch (this.state._target) {
		//   case '_blank':
		//   case '_self':
		//     break;
		//   default:
		//     console.error('Fehlerhaftes Target.');
		//     throw new Error('Fehlerhaftes Target.');
		// }

		// ROBUSTHEIT durch Validierung
		const isExternal = typeof this.state._target === 'string' && this.state._target !== '_self';

		const tagAttrs = {
			href: typeof this.state._href === 'string' && this.state._href.length > 0 ? this.state._href : 'javascript:void(0);',
			target: typeof this.state._target === 'string' && this.state._target.length > 0 ? this.state._target : undefined,
			rel: isExternal ? 'noopener' : undefined,
			download: typeof this.state._download === 'string' ? this.state._download : undefined,
		};

		if (this.state._hideLabel === true && !this.state._label) {
			devHint(`[KolLink] An aria-label must be set when _hide-label is set.`);
		}
		return { isExternal, tagAttrs };
	};

	public render(): JSX.Element {
		const { isExternal, tagAttrs } = this.getRenderValues();
		const hasExpertSlot = showExpertSlot(this.state._label);
		const ariaDescription = this.state._ariaDescription?.trim();

		return (
			<Host>
				<a
					ref={this.setAnchorRef}
					{...tagAttrs}
					accessKey={this.state._accessKey}
					aria-current={this.state._ariaCurrent}
					aria-controls={this.state._ariaControls}
					aria-description={ariaDescription || undefined}
					aria-disabled={this.state._disabled ? 'true' : undefined}
					aria-expanded={typeof this.state._ariaExpanded === 'boolean' ? String(this.state._ariaExpanded) : undefined}
					aria-owns={this.state._ariaOwns}
					aria-label={
						this.state._hideLabel && typeof this.state._label === 'string'
							? `${this.state._label}${isExternal ? ` (${this.translateOpenLinkInTab})` : ''}`
							: undefined
					}
					aria-keyshortcuts={this.state._shortKey}
					class={clsx('kol-link', {
						'kol-link--disabled': this.state._disabled === true,
						'kol-link--external-link': isExternal,
						'kol-link--hide-label': this.state._hideLabel === true,
						[`kol-link--${this.state._variant as string}`]: this.state._variant !== undefined,
						'kol-link--inline': this.state._inline === true,
						'kol-link--standalone': this.state._inline === false,
						[this.state._customClass as string]:
							this.state._variant === 'custom' && typeof this.state._customClass === 'string' && this.state._customClass.length > 0,
					})}
					{...this.state._on}
					// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
					onClick={this.onClick}
					onKeyPress={this.onClick}
					role={this.state._role}
					tabIndex={this.state._disabled ? -1 : this.state._tabIndex}
				>
					<SpanFC
						class="kol-link__text"
						badgeText={this.state._accessKey || this.state._shortKey}
						icons={this.state._icons}
						hideLabel={this.state._hideLabel}
						label={hasExpertSlot ? '' : this.state._label || this.state._href}
					>
						<slot name="expert" slot="expert"></slot>
					</SpanFC>
					{isExternal && (
						<IconFC
							class="kol-link__icon"
							label={this.state._hideLabel ? '' : this.translateOpenLinkInTab}
							icons={'kolicon-link-external'}
							aria-hidden={this.state._hideLabel}
						/>
					)}
				</a>
				{this.state._hideLabel === true && !hasExpertSlot && (
					<div class="kol-link__tooltip">
						<TooltipFC
							badgeText={this.state._accessKey || this.state._shortKey || ''}
							label={typeof this.state._label === 'string' ? this.state._label : typeof this.state._href === 'string' ? this.state._href : ''}
							id={this.tooltipCtrl.getRenderProp('id')}
							refFloating={this.tooltipCtrl.setTooltipElementRef}
						/>
					</div>
				)}
			</Host>
		);
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;

	/**
	 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
	 * @TODO: Change type to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines the contextual relationship between a parent and its child elements.
	 */
	@Prop() public _ariaOwns?: AriaOwnsPropType;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href!: HrefPropType;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = true;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';

	/**
	 * Defines which button variant should be used for presentation.
	 * @internal
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	@State() public state: LinkStates = {
		_ariaCurrentValue: 'page',
		_href: '', // ⚠ required
		_icons: {},
	};

	@Watch('_accessKey')
	public validateAccessKey(value?: AccessKeyPropType): void {
		validateAccessKey(this, value);
		validateAccessAndShortKey(value, this._shortKey);
	}

	@Watch('_ariaCurrentValue')
	public validateAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		validateAriaCurrentValue(this, value);
	}

	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		validateAriaControls(this, value);
	}

	@Watch('_ariaDescription')
	public validateAriaDescription(value?: AriaDescriptionPropType): void {
		validateAriaDescription(this, value);
	}

	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: AriaExpandedPropType): void {
		validateAriaExpanded(this, value);
	}

	@Watch('_ariaOwns')
	public validateAriaOwns(value?: AriaOwnsPropType): void {
		validateAriaOwns(this, value);
	}

	@Watch('_customClass')
	public validateCustomClass(value?: CustomClassPropType): void {
		validateCustomClass(this, value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		validateDisabled(this, value);
	}

	@Watch('_download')
	public validateDownload(value?: DownloadPropType): void {
		validateDownload(this, value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType): void {
		validateHideLabel(this, value);
	}

	@Watch('_href')
	public validateHref(value?: string): void {
		validateHref(this, value, {
			required: true,
		});
	}

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	@Watch('_inline')
	public validateInline(value?: InlinePropType): void {
		validateInline(this, value, {
			defaultValue: true,
		});
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
		this.tooltipCtrl.watchLabel(typeof value === 'string' ? value : undefined);
	}

	@Watch('_on')
	public validateOn(value?: LinkOnCallbacksPropType): void {
		validateLinkCallbacks(this, value);
	}

	@Watch('_role')
	public validateRole(value?: AlternativeButtonLinkRolePropType): void {
		validateAlternativeButtonLinkRole(this, value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		validateShortKey(this, value);
		validateAccessAndShortKey(this._accessKey, value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
	}

	@Watch('_target')
	public validateTarget(value?: LinkTargetPropType): void {
		validateLinkTarget(this, value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		validateTooltipAlign(this, value);
		this.tooltipCtrl.watchAlign(value);
	}

	@Watch('_variant')
	public validateVariantClassName(value?: VariantClassNamePropType): void {
		validateVariantClassName(this, value);
	}

	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAriaCurrentValue(this._ariaCurrentValue);
		this.validateAriaControls(this._ariaControls);
		this.validateAriaDescription(this._ariaDescription);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaOwns(this._ariaOwns);
		this.validateCustomClass(this._customClass);
		this.validateDisabled(this._disabled);
		this.validateDownload(this._download);
		this.validateHideLabel(this._hideLabel);
		this.validateHref(this._href);
		this.validateIcons(this._icons);
		this.validateInline(this._inline);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateShortKey(this._shortKey);
		this.validateTabIndex(this._tabIndex);
		this.validateTarget(this._target);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateVariantClassName(this._variant);
		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			this.state._ariaCurrent = location === this.state._href ? this.state._ariaCurrentValue : undefined;
		});
		validateAccessAndShortKey(this._accessKey, this._shortKey);
		this.tooltipCtrl.componentWillLoad({
			label: typeof this.state._label === 'string' ? this.state._label : typeof this.state._href === 'string' ? this.state._href : '',
			align: this._tooltipAlign,
		});
	}

	public componentDidRender(): void {
		if (this.anchorRef) {
			this.tooltipCtrl.syncListeners(undefined, this.anchorRef, true);
		}
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
		}
		this.tooltipCtrl.destroy();
	}
}
