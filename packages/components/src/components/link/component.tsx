import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	DownloadPropType,
	HrefPropType,
	KoliBriIconsProp,
	LabelWithExpertSlotPropType,
	LinkAPI,
	LinkOnCallbacksPropType,
	LinkStates,
	LinkTargetPropType,
	Stringified,
	TooltipAlignPropType,
	DisabledPropType,
} from '../../schema';
import {
	devHint,
	propagateFocus,
	setEventTarget,
	showExpertSlot,
	validateAccessKey,
	validateAlternativeButtonLinkRole,
	validateAriaCurrentValue,
	validateDownload,
	validateHideLabel,
	validateHref,
	validateIcons,
	validateLabelWithExpertSlot,
	validateLinkCallbacks,
	validateLinkTarget,
	validateTabIndex,
	validateTooltipAlign,
} from '../../schema';
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import { translate } from '../../i18n';
import { onLocationChange } from './ariaCurrentService';

import { validateDisabled } from '../../schema';
import type { JSX } from '@stencil/core';
import type { UnsubscribeFunction } from './ariaCurrentService';
import { preventDefaultAndStopPropagation } from '../../utils/events';
import { KolIconTag, KolSpanWcTag, KolTooltipWcTag } from '../../core/component-names';
/**
 * @internal
 */
@Component({
	tag: 'kol-link-wc',
	shadow: false,
})
export class KolLinkWc implements LinkAPI {
	@Element() private readonly host?: HTMLKolLinkWcElement;
	private ref?: HTMLAnchorElement;
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	private readonly catchRef = (ref?: HTMLAnchorElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private readonly onClick = (event: Event) => {
		if (this.state._disabled === true) {
			preventDefaultAndStopPropagation(event);
		} else if (typeof this.state._on?.onClick === 'function') {
			event.preventDefault();
			event.stopPropagation();
			setEventTarget(event, this.ref);
			this.state._on?.onClick(event, this.state._href);
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
			devHint(`[KolLink] Es muss ein Aria-Label gesetzt werden, wenn _hide-label gesetzt ist.`);
		}
		return { isExternal, tagAttrs };
	};

	public render(): JSX.Element {
		const { isExternal, tagAttrs } = this.getRenderValues();
		const hasExpertSlot = showExpertSlot(this.state._label);
		return (
			<Host class="kol-link-wc">
				<a
					ref={this.catchRef}
					{...tagAttrs}
					accessKey={this.state._accessKey}
					aria-current={this.state._ariaCurrent}
					aria-disabled={this.state._disabled ? 'true' : undefined}
					aria-label={
						this.state._hideLabel && typeof this.state._label === 'string'
							? `${this.state._label}${isExternal ? ` (${translate('kol-open-link-in-tab')})` : ''}`
							: undefined
					}
					class={{
						disabled: this.state._disabled === true,
						'external-link': isExternal,
						'hide-label': this.state._hideLabel === true,
					}}
					{...this.state._on}
					// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
					onClick={this.onClick}
					onKeyPress={this.onClick}
					role={this.state._role}
					tabIndex={this.state._disabled ? -1 : this.state._tabIndex}
				>
					<KolSpanWcTag
						_accessKey={this.state._accessKey}
						_icons={this.state._icons}
						_hideLabel={this.state._hideLabel}
						_label={hasExpertSlot ? '' : this.state._label || this.state._href}
					>
						<slot name="expert" slot="expert"></slot>
					</KolSpanWcTag>
					{isExternal && (
						<KolIconTag
							class="external-link-icon"
							_label={this.state._hideLabel ? '' : translate('kol-open-link-in-tab')}
							_icons={'codicon codicon-link-external'}
							aria-hidden={this.state._hideLabel}
						/>
					)}
				</a>
				<KolTooltipWcTag
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					aria-hidden="true"
					hidden={hasExpertSlot || !this.state._hideLabel}
					_accessKey={this.state._accessKey}
					_align={this.state._tooltipAlign}
					_label={this.state._label || this.state._href}
				></KolTooltipWcTag>
			</Host>
		);
	}

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;

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

	@State() public state: LinkStates = {
		_ariaCurrentValue: 'page',
		_href: '', // ⚠ required
		_icons: {},
	};

	@Watch('_accessKey')
	public validateAccessKey(value?: AccessKeyPropType): void {
		validateAccessKey(this, value);
	}

	@Watch('_ariaCurrentValue')
	public validateAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		validateAriaCurrentValue(this, value);
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
	public validateHideLabel(value?: boolean): void {
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

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
	}

	@Watch('_on')
	public validateOn(value?: LinkOnCallbacksPropType): void {
		validateLinkCallbacks(this, value);
	}

	@Watch('_role')
	public validateRole(value?: AlternativeButtonLinkRolePropType): void {
		validateAlternativeButtonLinkRole(this, value);
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
	}

	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAriaCurrentValue(this._ariaCurrentValue);
		this.validateDisabled(this._disabled);
		this.validateDownload(this._download);
		this.validateHideLabel(this._hideLabel);
		this.validateHref(this._href);
		this.validateIcons(this._icons);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateTabIndex(this._tabIndex);
		this.validateTarget(this._target);
		this.validateTooltipAlign(this._tooltipAlign);
		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			this.state._ariaCurrent = location === this.state._href ? this.state._ariaCurrentValue : undefined;
		});
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
		}
	}
}
