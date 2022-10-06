import { Component, Host, JSX, h, Method, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import {
	AriaCurrent,
	ButtonStates,
	KoliBriButtonCallbacks,
	KoliBriButtonLinkShowAs,
	KoliBriButtonType,
	KoliBriButtonVariant,
	OptionalButtonProps,
	OptionalButtonStates,
	RequiredButtonProps,
	RequiredButtonStates,
	watchShowAs,
	watchTooltipAlignment,
} from '../../types/button-link';
import { Alignment, KoliBriIconProp, watchIcon, watchIconAlign } from '../../types/icon';
import { a11yHintDisabled, devHint } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import {
	mapBoolean2String,
	mapStringOrBoolean2String,
	setEventTargetAndStopPropagation,
	watchBoolean,
	watchString,
	watchValidator,
} from '../../utils/prop.validators';
import { propergateResetEventToForm, propergateSubmitEventToForm } from '../form/controller';
import { TooltipAlignment } from '../tooltip/component';
import { syncAriaLabelBeforePatch, watchButtonType, watchButtonVariant } from './controller';

/**
 * @internal
 */
@Component({
	tag: 'kol-button-wc',
	shadow: false,
})
export class KolButtonWc implements Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates> {
	private host?: HTMLElement | null;
	private readonly nonce = nonce();

	/**
	 * - https://github.com/ionic-team/stencil/issues/1660#issuecomment-503225460
	 * - https://stenciljs.com/docs/templating-jsx
	 */
	// eslint-disable-next-line @stencil/own-props-must-be-private
	public forwardedRef?: HTMLButtonElement;
	// eslint-disable-next-line @stencil/own-props-must-be-private
	public ref?: HTMLButtonElement;

	private readonly catchHost = (host?: HTMLElement | null) => {
		this.host = host;
	};

	private readonly catchRef = (ref?: HTMLButtonElement) => {
		this.forwardedRef = ref;
		this.ref = ref;
	};

	private readonly onClick = (event: Event) => {
		if (this.state._type === 'submit') {
			propergateSubmitEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else if (this.state._type === 'reset') {
			propergateResetEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else if (typeof this.state._on?.onClick === 'function') {
			setEventTargetAndStopPropagation(event, this.ref);
			this.state._on?.onClick(event as PointerEvent);
		} else {
			devHint(`It is no button click callback configured!`);
		}
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHost}>
				<button
					ref={this.catchRef}
					accessKey={this.state._accessKey}
					aria-controls={this.state._ariaControls}
					aria-current={mapStringOrBoolean2String(this.state._ariaCurrent)}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-label={this.state._iconOnly === false ? this.state._ariaLabel || this.state._label : undefined}
					aria-labelledby={this.state._iconOnly === true ? this.nonce : undefined}
					class={{
						[this.state._showAs as string]: true,
						[this.state._variant as string]: true,
						'icon-only': this.state._iconOnly === true,
						[this.state._customClass as string]: typeof this.state._customClass === 'string' && this.state._customClass.length > 0,
					}}
					disabled={this.state._disabled}
					id={this.state._id}
					{...this.state._on}
					onClick={this.onClick}
					style={{
						width: 'inherit',
					}}
					type={this.state._type}
				>
					{this.state._icon.top && (
						<kol-icon
							class={{
								'icon top': true,
							}}
							style={this.state._icon.top.style}
							_ariaLabel=""
							_icon={this.state._icon.top.icon}
						/>
					)}
					<span class="flex items-center">
						{this.state._icon.left && (
							<kol-icon
								class={{
									'icon left': true,
									'mr-2': this.state._iconOnly === false,
								}}
								style={this.state._icon.left.style}
								_ariaLabel=""
								_icon={this.state._icon.left.icon}
							/>
						)}
						{this.state._iconOnly === false && (
							<span>
								{typeof this.state._label === 'string' && this.state._label}
								{/*
                  Es ist keine gute Idee hier einen Slot einzufügen,
                  da dadurch die komplette Unterstützung der Komponente
                  umgangen werden kann.
                  <slot />
                */}
							</span>
						)}
						{this.state._icon.right && (
							<kol-icon
								class={{
									'icon right': true,
									'ml-2': this.state._iconOnly === false,
								}}
								style={this.state._icon.right.style}
								_ariaLabel=""
								_icon={this.state._icon.right.icon}
							/>
						)}
					</span>
					{this.state._icon.bottom && (
						<kol-icon
							class={{
								'icon bottom': true,
							}}
							style={this.state._icon.bottom.style}
							_ariaLabel=""
							_icon={this.state._icon.bottom.icon}
						/>
					)}
				</button>
				{this.state._iconOnly === true && (
					<kol-tooltip
						/**
						 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
						 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
						 */
						// aria-hidden="true"
						_align={this.state._tooltipAlign}
						_id={this.nonce}
						_label={this.state._ariaLabel || this.state._label}
					></kol-tooltip>
				)}
			</Host>
		);
	}

	/**
	 * Gibt die Referenz auf das interaktive Element in der Komponente zurück.
	 */
	@Method()
	async getInteractiveElementRef(): Promise<HTMLButtonElement | undefined> {
		return Promise.resolve(this.ref);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, welche Elemente kontrolliert werden.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 */
	@Prop() public _ariaCurrent?: AriaCurrent;

	/**
	 * Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Gibt einen Text des Buttons für den Screenreader an. Für die Sprachsteuerung muss der Aria-Text mit dem Label-Text des Buttons beginnen. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	// eslint-disable-next-line @stencil/strict-mutable
	@Prop({ mutable: true, reflect: true }) public _ariaLabel?: string = '';

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Gibt an, ob der Button deaktiviert ist.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: KoliBriIconProp;

	/**
	 * Gibt an, ob das Icon links oder rechts dargestellt werden soll.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: Alignment = 'left';

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop() public _iconOnly?: boolean = false;

	/**
	 * Gibt die ID der Schaltfläche an. (Selection, Testing)
	 */
	@Prop() public _id?: string;

	/**
	 * Gibt den Label für die Beschriftung der Schaltfläche an.
	 */
	// eslint-disable-next-line @stencil/strict-mutable
	@Prop({ mutable: true, reflect: true }) public _label!: string;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: KoliBriButtonCallbacks;

	/**
	 * Gibt an, ob der Button als Button oder Link dargestellt werden soll.
	 */
	@Prop() public _showAs?: KoliBriButtonLinkShowAs = 'button';

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignment = 'top';

	/**
	 * Gibt an, welche Typ der Button hat.
	 */
	@Prop() public _type?: KoliBriButtonType = 'button';

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: ButtonStates = {
		_ariaLabel: '',
		_icon: {},
		_iconAlign: 'left',
		_label: '',
		_on: {},
		_showAs: 'button',
		_type: 'button',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		watchString(this, '_accessKey', value);
	}

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
			'_ariaControls',
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
		watchString(this, '_ariaLabel', value, {
			hooks: {
				beforePatch: syncAriaLabelBeforePatch,
			},
		});
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
		watchBoolean(this, '_iconOnly', value, {
			defaultValue: false,
			// hooks: {
			//   beforePatch: (_value, nextState) => {
			//     let ariaLabel = this.state._ariaLabel;
			//     if (nextState.has('_ariaLabel')) {
			//       ariaLabel = nextState.get('_ariaLabel') as string;
			//     }
			//     if (typeof ariaLabel !== 'string' || ariaLabel.length <= 0) {
			//       devHint(`[KolButton]: Bevor Icon-Only aktiviert wird, muss ein Aria-Label bzw. Label gesetzt werden.`);
			//       nextState.set('_iconOnly', false);
			//     }
			//   },
			// },
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_id')
	public validateId(value?: string): void {
		watchString(this, '_id', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value, {
			hooks: {
				beforePatch: syncAriaLabelBeforePatch,
			},
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: KoliBriButtonCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_showAs')
	public validateShowAs(value?: KoliBriButtonLinkShowAs): void {
		watchShowAs(this, value);
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
	@Watch('_type')
	public validateType(value?: KoliBriButtonType): void {
		watchButtonType(this, '_type', value);
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
		this.validateAccessKey(this._accessKey);
		this.validateAriaControls(this._ariaControls);
		this.validateAriaCurrent(this._ariaCurrent);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaLabel(this._ariaLabel);
		this.validateCustomClass(this._customClass);
		this.validateDisabled(this._disabled);
		this.validateIconAlign(this._iconAlign);
		this.validateIcon(this._icon);
		this.validateIconOnly(this._iconOnly);
		this.validateId(this._id);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateShowAs(this._showAs);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateType(this._type);
		this.validateVariant(this._variant);

		if (Date.now() === 0) {
			console.log(this.forwardedRef, this.ref);
		}
	}
}
