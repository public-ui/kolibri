import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { Stringified } from '../../types/common';
import { KoliBriIconsProp } from '../../types/icons';
import { AlternativeButtonLinkRolePropType, validateAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { AriaCurrentPropType, validateAriaCurrent, validateListenAriaCurrent } from '../../types/props/aria-current';
import { DownloadPropType, validateDownload } from '../../types/props/download';
import { HrefPropType, validateHref } from '../../types/props/href';
import { validateIcons } from '../../types/props/icons';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { LinkOnCallbacksPropType, validateLinkCallbacks } from '../../types/props/link-on-callbacks';
import { LinkTargetPropType, validateLinkTarget } from '../../types/props/link-target';
import { TooltipAlignPropType, validateTooltipAlign } from '../../types/props/tooltip-align';
import { devHint, devWarning } from '../../utils/a11y.tipps';
import { ariaCurrentSubject, setEventTarget, watchString } from '../../utils/prop.validators';
import { propagateFocus, showExpertSlot } from '../../utils/reuse';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { States as LinkStates } from '../link/types';
import { API } from './types';
import { validateHideLabel } from '../../types/props/hide-label';

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
		const isExternal = typeof this.state._target === 'string' && this.state._target !== '_self';

		const tagAttrs = {
			href: typeof this.state._href === 'string' && this.state._href.length > 0 ? this.state._href : 'javascript:void(0);',
			target: typeof this.state._target === 'string' && this.state._target.length > 0 ? this.state._target : undefined,
			rel: isExternal ? 'noopener' : undefined,
			download: typeof this.state._download === 'string' ? this.state._download : undefined,
		};

		if (this.state._hideLabel === true && !this.state._label) {
			devHint(`[KolLink] Es muss ein Aria-Label gesetzt werden _hide-label gesetzt ist.`);
		}
		return { isExternal, tagAttrs };
	};

	public render(): JSX.Element {
		const { isExternal, tagAttrs } = this.getRenderValues();
		const hasExpertSlot = showExpertSlot(this.state._label);
		return (
			<Host>
				<a
					ref={this.catchRef}
					{...tagAttrs}
					aria-current={this.state._ariaCurrent}
					aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
					class={{
						'external-link': isExternal,
						'hide-label': this.state._hideLabel === true,
					}}
					{...this.state._on}
					// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
					onClick={this.onClick}
					onKeyPress={this.onClick}
					role={this.state._role}
					tabIndex={this.state._tabIndex}
				>
					<kol-span-wc _icons={this.state._icons} _hideLabel={this.state._hideLabel} _label={hasExpertSlot ? '' : this.state._label || this.state._href}>
						<slot name="expert" slot="expert"></slot>
					</kol-span-wc>
					{isExternal && <kol-icon class="external-link-icon" _label={this.state._targetDescription as string} _icons={'codicon codicon-link-external'} />}
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
	 * Listen on an aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
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
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	/**
	 * Defines the description to use when the link is going to be opened in another application.
	 */
	@Prop() public _targetDescription?: string = translate('kol-open-link-in-tab');

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';

	@State() public state: LinkStates = {
		_href: '…', // ⚠ required
		_icons: {}, // ⚠ required
	};

	private validateAriaCurrent(value?: AriaCurrentPropType): void {
		validateAriaCurrent(this, value);
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
		validateHref(this, value);
	}

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
	}

	@Watch('_listenAriaCurrent')
	public validateListenAriaCurrent(value?: AriaCurrentPropType): void {
		validateListenAriaCurrent(this, value);
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

	@Watch('_targetDescription')
	public validateTargetDescription(value?: string): void {
		watchString(this, '_targetDescription', value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		validateTooltipAlign(this, value);
	}

	public componentWillLoad(): void {
		this.validateDownload(this._download);
		this.validateHideLabel(this._hideLabel);
		this.validateHref(this._href);
		this.validateIcons(this._icons);
		this.validateLabel(this._label);
		this.validateListenAriaCurrent(this._listenAriaCurrent);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateTabIndex(this._tabIndex);
		this.validateTarget(this._target);
		this.validateTargetDescription(this._targetDescription);
		this.validateTooltipAlign(this._tooltipAlign);
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
