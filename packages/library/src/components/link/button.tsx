import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import {
	AriaCurrent,
	KoliBriButtonVariant,
	LinkButtonStates,
	LinkOnCallbacks,
	LinkTarget,
	LinkUseCase,
	OptionalLinkButtonProps,
	OptionalLinkButtonStates,
	OptionalLinkProps,
	RequiredLinkButtonProps,
	RequiredLinkButtonStates,
	RequiredLinkProps,
	watchTooltipAlignment,
} from '../../types/button-link';
import { Alignment, KoliBriIconProp, watchIcon, watchIconAlign } from '../../types/icon';
import { a11yHintDisabled, devHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { mapBoolean2String, scrollBySelector, watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { TooltipAlignment } from '../tooltip/component';
import { watchButtonVariant } from '../button/controller';

type RequiredNavLinkProps = RequiredLinkProps & unknown;
type OptionalNavLinkProps = OptionalLinkProps & {
	active: boolean;
	/**
	 * @deprecated Verwende stattdessen das Property _ariaLabel.
	 */
	label?: string;
};
export type NavLinkProps = Generic.Element.Members<RequiredNavLinkProps, OptionalNavLinkProps>;

/**
 * @internal
 */
@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolLinkButton
	implements Generic.Element.ComponentApi<RequiredLinkButtonProps, OptionalLinkButtonProps, RequiredLinkButtonStates, OptionalLinkButtonStates>
{
	private readonly nonce = nonce();

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
						[this.state._variant as string]: true,
						'icon-only': this.state._iconOnly === true,
						[this.state._customClass as string]: typeof this.state._customClass === 'string' && this.state._customClass.length > 0,
					}}
					part={`link ${typeof this.state._part === 'string' ? this.state._part : ''}`}
					{...this.state._on}
					{...goToProps}
					style={{
						cursor: 'pointer',
						display: this.state._useCase === 'image' ? 'block' : undefined,
						textDecorationLine: underline === true ? 'underline' : 'none',
						width: fill === true ? '100%' : undefined,
					}}
				>
					{this.state._icon.left && (
						<kol-icon
							class={{
								'mr-2': this.state._iconOnly === false,
							}}
							style={this.state._icon.left.style}
							_ariaLabel=""
							_icon={this.state._icon.left.icon}
						/>
					)}
					<span
						class={{
							'float-left': this.state._useCase === 'image',
							'hidden ': this.state._iconOnly === true,
						}}
						part={`span${this.state._iconOnly === true ? ' hidden' : ''}`}
					>
						{/*
							Es ist keine gute Idee hier einen Slot einzufügen, da dadurch
							die Unterstützung hinsichtlich der Barrierefreiheit der Komponente
							umgangen werden kann.
						*/}
						<slot />
					</span>
					{this.state._icon.right && (
						<kol-icon
							class={{
								'ml-2': this.state._iconOnly === false,
							}}
							style={this.state._icon.right.style}
							_ariaLabel=""
							_icon={this.state._icon.right.icon}
						/>
					)}
					{typeof this.state._target === 'string' && this.state._target !== '_self' && (
						<sup
							class={{
								'no-underline': true,
								'inline-block ml-1': this.state._useCase === 'text',
								'relative ': this.state._useCase !== 'text',
							}}
						>
							<kol-icon _ariaLabel={this.state._targetDescription as string} _icon={'icofont-external-link'} />
						</sup>
					)}
				</a>
				<kol-tooltip
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					// aria-hidden="true"
					_align={this.state._tooltipAlign}
					_id={this.state._useCase === 'image' || this.state._iconOnly === true ? this.nonce : undefined}
					_label={this.state._useCase === 'image' || this.state._iconOnly === true ? this.state._ariaLabel : ''}
				></kol-tooltip>
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
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Gibt einen beschreibenden Text des Links an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	@Prop() public _ariaLabel?: string = '';

	/**
	 * Gibt an, ob der Link gerade ausgewählt ist. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Gibt an, ob der Link die gesamte zur Verfügung stehende Breite ausfüllt.
	 */
	@Prop() public _fill?: boolean = false;

	/**
	 * Gibt die Ziel-Url des Links an.
	 */
	@Prop() public _href?: string = '';

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: KoliBriIconProp;

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: Alignment = 'left';

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop() public _iconOnly?: boolean = false;

	/**
	 * Gibt die EventCallback-Funktionen für den Link an.
	 */
	@Prop() public _on?: LinkOnCallbacks;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 */
	@Prop() public _part?: string;

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 */
	@Prop() public _selector?: string;

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 */
	@Prop() public _stealth?: boolean = false;

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
	@Prop() public _underline?: boolean = true;

	/**
	 * Gibt den Verwendungsfall des Links an.
	 */
	@Prop() public _useCase?: LinkUseCase = 'text';

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: LinkButtonStates = {
		_ariaLabel: '',
		_icon: {},
		/**
		 * @deprecated
		 */
		_iconAlign: 'left',
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
		watchString(this, '_ariaLabel', value);
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
	@Watch('_customClass')
	public validateCustomClass(value?: string): void {
		watchString(this, '_customClass', value, {
			defaultValue: undefined,
		});
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
		watchIcon(this, value);
	}

	/**
	 * @deprecated
	 */
	/**
	 * @see: components/abbr/component.tsx (@Watch)
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
	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
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
	@Watch('_variant')
	public validateVariant(value?: KoliBriButtonVariant): void {
		watchButtonVariant(this, '_variant', value);
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
		this.validateCustomClass(this._customClass);
		this.validateDisabled(this._disabled);
		this.validateFill(this._fill);
		this.validateHref(this._href);
		this.validateIcon(this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateIconOnly(this._iconOnly);
		this.validateOn(this._on);
		this.validatePart(this._part);
		this.validateSelector(this._selector);
		this.validateStealth(this._stealth);
		this.validateTarget(this._target);
		this.validateTargetDescription(this._targetDescription);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateUnderline(this._underline);
		this.validateUseCase(this._useCase);
		this.validateVariant(this._variant);
	}
}
