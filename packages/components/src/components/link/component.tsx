import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { translate } from '../../i18n';
import {
	AlternativButtonLinkRole,
	LinkOnCallbacks,
	LinkStates,
	LinkTarget,
	LinkUseCase,
	OptionalLinkProps,
	OptionalLinkStates,
	RequiredLinkProps,
	RequiredLinkStates,
	watchTooltipAlignment,
} from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { AriaCurrent, PropAlignment, validateAriaCurrent, validateAriaSelected, validateStealth } from '../../types/props';
import { a11yHintDisabled, devHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { mapBoolean2String, scrollBySelector, setEventTarget, watchBoolean, watchString } from '../../utils/prop.validators';
import { propagateFocus } from '../../utils/reuse';
import { validateIcon, watchIconAlign } from '../../types/props/icon';
import { validateAriaLabelWithLabel, validateLabelWithAriaLabel } from '../../types/props/label';
import { validateTabIndex } from '../../utils/validators/tab-index';

/**
 * @internal
 */
@Component({
	tag: 'kol-link-wc',
	shadow: false,
})
export class KolLinkWc implements Generic.Element.ComponentApi<RequiredLinkProps, OptionalLinkProps, RequiredLinkStates, OptionalLinkStates> {
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
			href: typeof this.state._href === 'string' && this.state._href.length > 0 ? this.state._href : 'javascript:void(0)',
			target: typeof this.state._target === 'string' && this.state._target.length > 0 ? this.state._target : undefined,
			rel: isExternal ? 'noopener' : undefined,
		};

		if (
			(this.state._useCase === 'image' || this.state._iconOnly === true) &&
			(typeof this.state._ariaLabel !== 'string' || this.state._ariaLabel.length === 0)
		) {
			devHint(`[KolLink] Es muss ein Aria-Label gesetzt werden, wenn eine Grafik verlinkt oder der Icon-Only-Modus verwendet wird.`);
		}
		return { isExternal, tagAttrs, goToProps };
	};

	public render(): JSX.Element {
		const { isExternal, tagAttrs, goToProps } = this.getRenderValues();
		return (
			<Host>
				<a
					ref={this.catchRef}
					{...tagAttrs}
					aria-controls={this.state._ariaControls}
					aria-current={this.state._ariaCurrent}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-labelledby={this.state._useCase === 'image' || this.state._iconOnly === true ? this.nonce : undefined}
					aria-selected={mapBoolean2String(this.state._ariaSelected)}
					class={{
						disabled: this.state._disabled === true,
						'skip ': this.state._stealth !== false,
						'icon-only': this.state._iconOnly === true,
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
					<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this.state._label}>
						{/*
							Es ist keine gute Idee hier einen Slot einzufügen, da dadurch ermöglicht wird,
							die Unterstützung hinsichtlich der Barrierefreiheit der Komponente zu umgehen.
						*/}
						<slot name="expert" slot="expert" />
					</kol-span-wc>
					{isExternal && <kol-icon class="external-link-icon" _ariaLabel={this.state._targetDescription as string} _icon={'codicon codicon-link-external'} />}
				</a>
				{(this.state._iconOnly === true || this.state._useCase === 'image') && (
					<kol-tooltip
						/**
						 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
						 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
						 */
						aria-hidden="true"
						_align={this.state._tooltipAlign}
						_id={this.nonce}
						_label={this.state._ariaLabel || this.state._label}
					></kol-tooltip>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 */
	@Prop() public _ariaCurrent?: AriaCurrent;

	/**
	 * Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop({ reflect: true }) public _ariaExpanded?: boolean;

	/**
	 * Gibt einen beschreibenden Text des Links an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop({ reflect: true }) public _ariaSelected?: boolean;

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 *
	 * @deprecated A link could never be disabled. Use a button instead.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean = false;

	/**
	 * Gibt die Ziel-Url des Links an.
	 */
	@Prop() public _href!: string;

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 *
	 * @deprecated Wird durch das neue flexibleren Icon-Typ abgedeckt.
	 */
	@Prop() public _iconAlign?: PropAlignment;

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Gibt den Label für die Beschriftung der Schaltfläche an.
	 */
	// - eslint-disable-next-line @stencil/strict-mutable
	@Prop({ mutable: true, reflect: false }) public _label!: string;

	/**
	 * Gibt die EventCallback-Funktionen für den Link an.
	 * @deprecated
	 */
	@Prop() public _on?: LinkOnCallbacks;

	/**
	 * Gibt an, welche Role der Schalter hat.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _selector?: string;

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop({ reflect: true }) public _stealth?: boolean = false;

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Definiert das Verhalten, bei dem der Link geöffnet werden soll.
	 */
	@Prop() public _target?: LinkTarget;

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 */
	@Prop() public _targetDescription?: string = translate('kol-open-link-in-tab');

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: PropAlignment = 'right';

	/**
	 * Gibt den Verwendungsfall des Links an.
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _useCase?: LinkUseCase = 'text';

	@State() public state: LinkStates = {
		_href: 'javascript:void(0)',
		_icon: {},
		_label: '', // TODO: must removed to v2
		// _label: '…', // ⚠ required
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

	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		validateAriaLabelWithLabel(this, value);
	}

	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		validateAriaSelected(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 *
	 * @deprecated
	 */
	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		watchBoolean(this, '_disabled', value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	@Watch('_href')
	public validateHref(value?: string): void {
		watchString(this, '_href', value);
	}

	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	@Watch('_iconAlign')
	public validateIconAlign(value?: PropAlignment): void {
		watchIconAlign(this, value);
	}

	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		watchBoolean(this, '_iconOnly', value);
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabelWithAriaLabel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	@Watch('_on')
	public validateOn(value?: LinkOnCallbacks): void {
		if (
			typeof value === 'object' &&
			value !== null &&
			// https://eslint.org/docs/rules/no-prototype-builtins
			Object.prototype.hasOwnProperty.call(value, 'onClick') &&
			typeof value.onClick === 'function'
		) {
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

	@Watch('_selector')
	public validateSelector(value?: string): void {
		watchString(this, '_selector', value);
	}

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
	public validateTooltipAlign(value?: PropAlignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

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
		this.validateAriaLabel(this._ariaLabel);
		this.validateAriaSelected(this._ariaSelected);
		this.validateDisabled(this._disabled);
		this.validateHref(this._href);
		this.validateIcon(this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateIconOnly(this._iconOnly);
		this.validateLabel(this._label);
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
