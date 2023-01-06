import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import {
	AlternativButtonLinkRole,
	AriaCurrent,
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
import { Alignment, KoliBriIconProp } from '../../types/icon';
import { a11yHintDisabled, devHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { mapBoolean2String, scrollBySelector, watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { TooltipAlignment } from '../tooltip/component';
import { validateIcon, watchIconAlign } from '../../utils/validators/icon';
import { Stringified } from '../../types/common';
import { propergateFocus } from '../../utils/reuse';
import { validateAriaLabel, validateLabel } from '../../utils/validators/label';

type RequiredNavLinkProps = RequiredLinkProps;
type OptionalNavLinkProps = OptionalLinkProps & {
	active: boolean;
};
export type NavLinkProps = Generic.Element.Members<RequiredNavLinkProps, OptionalNavLinkProps>;

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
		propergateFocus(this.host, this.ref);
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

		const tagAttrs = {
			href: typeof this.state._href === 'string' && this.state._href.length > 0 ? this.state._href : 'javascript:void(0)',
			target: typeof this.state._target === 'string' && this.state._target.length > 0 ? this.state._target : undefined,
			rel: typeof this.state._target === 'string' && this.state._target !== '_self' ? 'noopener' : undefined,
		};

		/**
		 * Das möchte ich ungern für HTML machen, sondern nur für Barrierefreiheitsthemen.
		 */
		// if (typeof this.state._ariaLabel === 'string' && this.state._ariaLabel.length > 0) {
		//   console.error('Setz den Titel.');
		//   throw new Error('Setz den Titel.');
		// }
		let fill = this.state._fill;
		if (this.state._stealth !== false) {
			fill = false;
		}

		let underline = this.state._underline;
		if (this.state._useCase === 'image') {
			underline = false;
		}

		if (
			(this.state._useCase === 'image' || this.state._iconOnly === true) &&
			(typeof this.state._ariaLabel !== 'string' || this.state._ariaLabel.length === 0)
		) {
			devHint(`[KolLink] Es muss ein Aria-Label gesetzt werden, wenn eine Grafik verlinkt oder der Icon-Only-Modus verwendet wird.`);
		}
		return { tagAttrs, underline, fill, goToProps };
	};

	public render(): JSX.Element {
		const { tagAttrs, underline, fill, goToProps } = this.getRenderValues();
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
						'disabled ': this.state._disabled === true,
						// 'bg-white text-normal hover:text-primary': this.state._useCase !== 'nav',
						'kol-visited': this.state._useCase !== 'nav',
						'flex flex-wrap items-center': this.state._iconOnly === false,
						'grid text-center': this.state._iconOnly === true,
						'skip ': this.state._stealth !== false,
						'icon-only': this.state._iconOnly === true,
					}}
					part={`link ${typeof this.state._part === 'string' ? this.state._part : ''}`}
					{...this.state._on}
					{...goToProps}
					role={this.state._role}
					style={{
						cursor: 'pointer',
						display: this.state._useCase === 'image' ? 'block' : undefined,
						textDecorationLine: underline === true ? 'underline' : 'none',
						width: fill === true ? '100%' : undefined,
					}}
					tabIndex={this.state._tabIndex}
				>
					<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this.state._ariaLabel || this.state._label}>
						{/*
							Es ist keine gute Idee hier einen Slot einzufügen, da dadurch
							die Unterstützung hinsichtlich der Barrierefreiheit der Komponente
							umgangen werden kann.
						*/}
						<slot name="expert" slot="expert" />
					</kol-span-wc>
					{typeof this.state._target === 'string' && this.state._target !== '_self' && (
						<kol-icon class="external-link" _ariaLabel={this.state._targetDescription as string} _icon={'fa-solid fa-arrow-up-right-from-square'} />
					)}
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
	@Prop() public _ariaLabel?: string = '';

	/**
	 * Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop({ reflect: true }) public _ariaSelected?: boolean;

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean = false;

	/**
	 * Gibt an, ob der Link die gesamte zur Verfügung stehende Breite ausfüllt.
	 */
	@Prop({ reflect: true }) public _fill?: boolean = false;

	/**
	 * Gibt die Ziel-Url des Links an.
	 */
	@Prop() public _href?: string = '';

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 *
	 * @deprecated Wird durch das neue flexibleren Icon-Typ abgedeckt.
	 */
	@Prop() public _iconAlign?: Alignment = 'left';

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
	 *
	 * @deprecated Hierzu sollte statt Link- die ButtonLink-Komponente verwendet werden.
	 */
	@Prop() public _on?: LinkOnCallbacks;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 */
	@Prop() public _part?: string;

	/**
	 * Gibt an, welche Role der Schalter hat.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 */
	@Prop() public _selector?: string;

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
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
	@Prop() public _targetDescription?: string = 'Der Link wird in einem neuen Tab geöffnet.';

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignment = 'right';

	/**
	 * Gibt an, ob die Links unterstrichen dargestellt werden.
	 */
	@Prop({ reflect: true }) public _underline?: boolean = true;

	/**
	 * Gibt den Verwendungsfall des Links an.
	 */
	@Prop() public _useCase?: LinkUseCase = 'text';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: LinkStates = {
		_ariaLabel: '',
		_icon: {},
		/**
		 * @deprecated
		 */
		_iconAlign: 'left',
		_label: '',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		watchString(this, '_ariaControls', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaCurrent')
	public validateAriaCurrent(value?: AriaCurrent): void {
		watchValidator(
			this,
			'_ariaCurrent',
			(value) => value === true || value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time',
			new Set(['boolean', 'String {data, location, page, step, time}']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: boolean): void {
		watchBoolean(this, '_ariaExpanded', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		validateAriaLabel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		watchBoolean(this, '_ariaSelected', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		watchBoolean(this, '_disabled', value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_fill')
	public validateFill(value?: boolean): void {
		watchBoolean(this, '_fill', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_href')
	public validateHref(value?: string): void {
		watchString(this, '_href', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	@Watch('_iconAlign')
	public validateIconAlign(value?: Alignment): void {
		watchIconAlign(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		watchBoolean(this, '_iconOnly', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabel(this, value);
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_part')
	public validatePart(value?: string): void {
		watchString(this, '_part', value, {
			defaultValue: '',
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_role')
	public validateRole(value?: AlternativButtonLinkRole): void {
		watchString(this, '_role', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_selector')
	public validateSelector(value?: string): void {
		watchString(this, '_selector', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_stealth')
	public validateStealth(value?: boolean): void {
		watchBoolean(this, '_stealth', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_target')
	public validateTarget(value?: LinkTarget): void {
		watchString(this, '_target', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_targetDescription')
	public validateTargetDescription(value?: string): void {
		watchString(this, '_targetDescription', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_underline')
	public validateUnderline(value?: boolean): void {
		watchBoolean(this, '_underline', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
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

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAriaControls(this._ariaControls);
		this.validateAriaCurrent(this._ariaCurrent);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaLabel(this._ariaLabel);
		this.validateAriaSelected(this._ariaSelected);
		this.validateDisabled(this._disabled);
		this.validateFill(this._fill);
		this.validateHref(this._href);
		this.validateIcon(this._icon);
		// this.validateIconAlign(this._iconAlign);
		this.validateIconOnly(this._iconOnly);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validatePart(this._part);
		this.validateRole(this._role);
		this.validateSelector(this._selector);
		this.validateStealth(this._stealth);
		this.validateTabIndex(this._tabIndex);
		this.validateTarget(this._target);
		this.validateTargetDescription(this._targetDescription);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateUnderline(this._underline);
		this.validateUseCase(this._useCase);
	}
}
