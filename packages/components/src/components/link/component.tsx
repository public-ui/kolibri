import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { AlternativButtonLinkRole, KoliBriLinkAPI, LinkOnCallbacks, LinkStates, LinkTarget, LinkUseCase, watchTooltipAlignment } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { Align } from '../../types/props/align';
import { AriaCurrent, validateAriaCurrent } from '../../types/props/aria-current';
import { validateAriaSelected } from '../../types/props/aria-selected';
import { validateDownload } from '../../types/props/download';
import { validateHideLabel } from '../../types/props/hide-label';
import { validateHref } from '../../types/props/href';
import { validateIcon, watchIconAlign } from '../../types/props/icon';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { validateStealth } from '../../types/props/stealth';
import { a11yHintDisabled, devHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { mapBoolean2String, scrollBySelector, setEventTarget, watchBoolean, watchString } from '../../utils/prop.validators';
import { propagateFocus } from '../../utils/reuse';
import { validateTabIndex } from '../../utils/validators/tab-index';

/**
 * @internal
 */
@Component({
	tag: 'kol-link-wc',
	shadow: false,
})
export class KolLinkWc implements KoliBriLinkAPI {
	@Element() private readonly host?: HTMLKolLinkWcElement;
	private readonly nonce = nonce();
	private ref?: HTMLAnchorElement;

	private readonly catchRef = (ref?: HTMLAnchorElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private readonly onClick = (event: Event) => {
		if (typeof this.state._on?.onClick === 'function') {
			event.preventDefault();
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
		};

		if ((this.state._useCase === 'image' || this.state._hideLabel === true) && !this.state._label) {
			devHint(`[KolLink] Es muss ein Aria-Label gesetzt werden, wenn eine Grafik verlinkt oder der _hide-label gesetzt ist.`);
		}
		return { isExternal, tagAttrs, goToProps };
	};

	public render(): JSX.Element {
		const { isExternal, tagAttrs, goToProps } = this.getRenderValues();
		const hasExpertSlot: boolean = this.state._label === false;
		return (
			<Host>
				<a
					ref={this.catchRef}
					{...tagAttrs}
					aria-controls={this.state._ariaControls}
					aria-current={this.state._ariaCurrent}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-labelledby={this.state._hideLabel ? this.nonce : undefined}
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
					<kol-span-wc _icon={this.state._icon} _hideLabel={this.state._hideLabel} _label={hasExpertSlot ? false : this.state._label || this.state._href}>
						<slot name="expert" slot="expert"></slot>
					</kol-span-wc>
					{isExternal && <kol-icon class="external-link-icon" _label={this.state._targetDescription as string} _icon={'codicon codicon-link-external'} />}
				</a>
				<kol-tooltip
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					aria-hidden="true"
					hidden={hasExpertSlot || !this.state._hideLabel}
					_align={this.state._tooltipAlign}
					_id={this.nonce}
					_label={this.state._label || this.state._href}
				></kol-tooltip>
			</Host>
		);
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus das interaktive Element der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 */
	@Prop() public _ariaCurrent?: AriaCurrent;

	/**
	 * Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 *  @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 *
	 * @deprecated Ein Link kann nicht deaktiviert werden, nutzen Sie den Button-Link stattdessen.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
	 */
	@Prop() public _download?: boolean | string = false;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Gibt die Ziel-Url des Links an.
	 */
	@Prop() public _href!: string;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Deprecated: Gibt an, ob das Icon links oder rechts von der Beschriftung angezeigt werden soll.
	 *
	 * @deprecated Wird durch das neue flexibleren Icon-Typ abgedeckt.
	 */
	@Prop() public _iconAlign?: Align;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;

	/**
	 * Gibt die EventCallback-Funktionen für den Link an.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _on?: LinkOnCallbacks;

	/**
	 * Gibt die Rolle des primären Elements in der Komponente an.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _selector?: string;

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _stealth?: boolean = false;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an wo der Link geöffnet werden soll.
	 */
	@Prop() public _target?: LinkTarget;

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 */
	@Prop() public _targetDescription?: string = translate('kol-open-link-in-tab');

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align = 'right';

	/**
	 * Gibt den Verwendungsfall des Links an.
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _useCase?: LinkUseCase = 'text';

	@State() public state: LinkStates = {
		_href: '…', // ⚠ required
		_icon: {},
		_label: false,
	};

	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		watchString(this, '_ariaControls', value);
	}

	@Watch('_ariaCurrent')
	public validateAriaCurrent(value?: AriaCurrent): void {
		validateAriaCurrent(this, value);
	}

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
	public validateDownload(value?: boolean | string): void {
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

	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_iconAlign')
	public validateIconAlign(value?: Align): void {
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

	/**
	 * @deprecated
	 */
	@Watch('_on')
	public validateOn(value?: LinkOnCallbacks): void {
		if (typeof value === 'object' && typeof value?.onClick === 'function') {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	@Watch('_role')
	public validateRole(value?: AlternativButtonLinkRole): void {
		watchString(this, '_role', value);
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
	public validateTarget(value?: LinkTarget): void {
		watchString(this, '_target', value);
	}

	@Watch('_targetDescription')
	public validateTargetDescription(value?: string): void {
		watchString(this, '_targetDescription', value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: Align): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
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
		this.validateIcon(this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateLabel(this._label || this._ariaLabel);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateSelector(this._selector);
		this.validateStealth(this._stealth);
		this.validateTabIndex(this._tabIndex);
		this.validateTarget(this._target);
		this.validateTargetDescription(this._targetDescription);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateUseCase(this._useCase);
	}
}
