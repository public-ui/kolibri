import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { LinkUseCase } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconsProp } from '../../types/icons';
import { AlignPropType } from '../../types/props/align';
import { AlternativeButtonLinkRolePropType, validateAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { validateAriaControls } from '../../types/props/aria-controls';
import { AriaCurrentPropType, validateAriaCurrent, validateListenAriaCurrent } from '../../types/props/aria-current';
import { validateAriaSelected } from '../../types/props/aria-selected';
import { DownloadPropType, validateDownload } from '../../types/props/download';
import { validateHideLabel } from '../../types/props/hide-label';
import { HrefPropType, validateHref } from '../../types/props/href';
import { validateIcons, watchIconAlign } from '../../types/props/icons';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { LinkOnCallbacksPropType, validateLinkCallbacks } from '../../types/props/link-on-callbacks';
import { LinkTargetPropType, validateLinkTarget } from '../../types/props/link-target';
import { validateStealth } from '../../types/props/stealth';
import { TooltipAlignPropType, validateTooltipAlign } from '../../types/props/tooltip-align';
import { a11yHintDisabled, devHint, devWarning } from '../../utils/a11y.tipps';
import { ariaCurrentSubject, mapBoolean2String, scrollBySelector, setEventTarget, watchBoolean, watchString } from '../../utils/prop.validators';
import { propagateFocus, showExpertSlot } from '../../utils/reuse';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { States as LinkStates } from '../link/types';
import { API } from './types';

/**
 * @internal
 */
@Component({
	tag: 'kol-link-wc',
	shadow: false,
})
export class KolLinkWc implements API {
	@Element() private readonly host?: HTMLKolLinkWcElement;
	private ref?: HTMLAnchorElement;

	private readonly catchRef = (ref?: HTMLAnchorElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private readonly onClick = (event: Event) => {
		if (typeof this.state._on?.onClick === 'function') {
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
		let goToProps = {};
		if (typeof this.state._selector === 'string') {
			goToProps = {
				role: 'link',
				tabIndex: 0,
				onClick: () => {
					scrollBySelector(this.state._selector as string);
				},
				onKeyPress: () => {
					scrollBySelector(this.state._selector as string);
				},
			};
		}

		const isExternal = typeof this.state._target === 'string' && this.state._target !== '_self';

		const tagAttrs = {
			href: typeof this.state._href === 'string' && this.state._href.length > 0 ? this.state._href : 'javascript:void(0);',
			target: typeof this.state._target === 'string' && this.state._target.length > 0 ? this.state._target : undefined,
			rel: isExternal ? 'noopener' : undefined,
			download: typeof this.state._download === 'string' ? this.state._download : undefined,
		};

		if ((this.state._useCase === 'image' || this.state._hideLabel === true) && !this.state._label) {
			devHint(`[KolLink] Es muss ein Aria-Label gesetzt werden, wenn eine Grafik verlinkt oder der _hide-label gesetzt ist.`);
		}
		return { isExternal, tagAttrs, goToProps };
	};

	public render(): JSX.Element {
		const { isExternal, tagAttrs, goToProps } = this.getRenderValues();
		const hasExpertSlot = showExpertSlot(this.state._label);
		return (
			<Host class="kol-link-wc">
				<a
					ref={this.catchRef}
					{...tagAttrs}
					aria-controls={this.state._ariaControls}
					aria-current={this.state._ariaCurrent}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-label={
						this.state._hideLabel && typeof this.state._label === 'string'
							? `${this.state._label}${isExternal ? ` (${translate('kol-open-link-in-tab')})` : ''}`
							: undefined
					}
					aria-selected={mapBoolean2String(this.state._ariaSelected)}
					class={{
						disabled: this.state._disabled === true,
						'skip ': this.state._stealth !== false,
						'icon-only': this.state._hideLabel === true, // @deprecated in v2
						'hide-label': this.state._hideLabel === true,
						'external-link': isExternal,
					}}
					{...this.state._on}
					// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
					onClick={this.onClick}
					onKeyPress={this.onClick}
					{...goToProps}
					role={this.state._role}
					tabIndex={this.state._tabIndex}
				>
					<kol-span-wc _icons={this.state._icons} _hideLabel={this.state._hideLabel} _label={hasExpertSlot ? '' : this.state._label || this.state._href}>
						<slot name="expert" slot="expert"></slot>
					</kol-span-wc>
					{isExternal && (
						<kol-icon
							class="external-link-icon"
							_label={this.state._hideLabel ? '' : translate('kol-open-link-in-tab')}
							_icons={'codicon codicon-link-external'}
							aria-hidden={this.state._hideLabel}
						/>
					)}
				</a>
				<kol-tooltip-wc
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					aria-hidden="true"
					hidden={hasExpertSlot || !this.state._hideLabel}
					_align={this.state._tooltipAlign}
					_label={this.state._label || this.state._href}
				></kol-tooltip-wc>
			</Host>
		);
	}

	/**
	 * Deprecated: Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Deprecated: Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @deprecated use _listen-aria-current instead
	 */
	@Prop() public _ariaCurrent?: AriaCurrentPropType;

	/**
	 * Deprecated: Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Deprecated: Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Deprecated: Makes the element not focusable and ignore all events.
	 *
	 * @deprecated Ein Link kann nicht deaktiviert werden, nutzen Sie den Button-Link stattdessen.
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
	 * @deprecated Use _icons.
	 */
	@Prop() public _icon?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Deprecated: Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @deprecated Wird durch das neue flexibleren Icon-Typ abgedeckt.
	 */
	@Prop() public _iconAlign?: AlignPropType;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;

	/**
	 * Listen on a aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
	 */
	@Prop() public _listenAriaCurrent?: AriaCurrentPropType;

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Deprecated: Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _selector?: string;

	/**
	 * Deprecated: Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _stealth?: boolean = false;

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
	 * Deprecated: Gibt den Verwendungsfall des Links an.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _useCase?: LinkUseCase = 'text';

	@State() public state: LinkStates = {
		_href: '', // ⚠ required
		_icons: {}, // ⚠ required
	};

	/**
	 * @deprecated
	 */
	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		validateAriaControls(this, value);
	}

	/**
	 * @deprecated use aria-current only in state
	 */
	@Watch('_ariaCurrent')
	public validateAriaCurrent(value?: AriaCurrentPropType): void {
		validateAriaCurrent(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: boolean): void {
		watchBoolean(this, '_ariaExpanded', value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}
	/**
	 * @deprecated
	 */
	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		validateAriaSelected(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		watchBoolean(this, '_disabled', value);
		if (value === true) {
			a11yHintDisabled();
		}
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

	@Watch('_icon')
	public validateIcon(value?: KoliBriIconsProp): void {
		this.validateIcons(value);
	}

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_iconAlign')
	public validateIconAlign(value?: AlignPropType): void {
		watchIconAlign(this, value);
	}

	/**
	 * @deprecated use _hide-label
	 */
	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		this.validateHideLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
	}

	@Watch('_listenAriaCurrent')
	public validateListenAriaCurrent(value?: AriaCurrentPropType): void {
		validateListenAriaCurrent(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_on')
	public validateOn(value?: LinkOnCallbacksPropType): void {
		validateLinkCallbacks(this, value);
	}

	@Watch('_role')
	public validateRole(value?: AlternativeButtonLinkRolePropType): void {
		validateAlternativeButtonLinkRole(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_selector')
	public validateSelector(value?: string): void {
		watchString(this, '_selector', value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_stealth')
	public validateStealth(value?: boolean): void {
		validateStealth(this, value);
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

	/**
	 * @deprecated
	 */
	@Watch('_useCase')
	public validateUseCase(value?: LinkUseCase): void {
		if (typeof value === 'string') {
			this.state = {
				...this.state,
				_useCase: value,
			};
		}
	}

	public componentWillLoad(): void {
		this.validateAriaControls(this._ariaControls);
		this.validateAriaCurrent(this._ariaCurrent);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaSelected(this._ariaSelected);
		this.validateDisabled(this._disabled);
		this.validateDownload(this._download);
		this.validateHideLabel(this._hideLabel || this._iconOnly);
		this.validateHref(this._href);
		this.validateIcon(this._icons || this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateLabel(this._label ?? this._ariaLabel); // explicitly allow empty string labels
		this.validateListenAriaCurrent(this._listenAriaCurrent);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateSelector(this._selector);
		this.validateStealth(this._stealth);
		this.validateTabIndex(this._tabIndex);
		this.validateTarget(this._target);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateUseCase(this._useCase);
	}

	private unsubscribeAriaCurrentSubject = ariaCurrentSubject.subscribe((event) => {
		try {
			if (this.state._listenAriaCurrent && this.state._listenAriaCurrent === event.ariaCurrent) {
				if (this.state._href === event.href) {
					this.validateAriaCurrent(event.ariaCurrent);
				} else {
					this.validateAriaCurrent(false);
				}
			}
		} catch (e) {
			devWarning(`The aria-current event is not valid.`);
		}
	});

	public disconnectedCallback(): void {
		this.unsubscribeAriaCurrentSubject.unsubscribe();
	}
}
