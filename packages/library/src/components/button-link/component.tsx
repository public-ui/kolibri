import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import {
	AriaCurrent,
	ButtonStates,
	KoliBriButtonCallbacks,
	KoliBriButtonType,
	OptionalButtonLinkProps,
	OptionalButtonLinkStates,
	RequiredButtonLinkProps,
	RequiredButtonLinkStates,
	watchTooltipAlignment,
} from '../../types/button-link';
import { Stringified } from '../../types/common';
import { Alignment, KoliBriIconProp } from '../../types/icon';
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
import { validateIcon, watchIconAlign } from '../../utils/validators/icon';
import { validateAriaLabel, validateLabel } from '../../utils/validators/label';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { watchButtonType } from '../button/controller';
import { propergateResetEventToForm, propergateSubmitEventToForm } from '../form/controller';
import { TooltipAlignment } from '../tooltip/component';

@Component({
	tag: 'kol-button-link',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class KolButtonLink
	implements Generic.Element.ComponentApi<RequiredButtonLinkProps, OptionalButtonLinkProps, RequiredButtonLinkStates, OptionalButtonLinkStates>
{
	private host?: HTMLElement | null;
	private readonly nonce = nonce();

	/**
	 * - https://github.com/ionic-team/stencil/issues/1660#issuecomment-503225460
	 * - https://stenciljs.com/docs/templating-jsx
	 */
	// - eslint-disable-next-line @stencil/own-props-must-be-private
	public forwardedRef?: HTMLButtonElement;
	// - eslint-disable-next-line @stencil/own-props-must-be-private
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
					tabIndex={this.state._tabIndex}
					type={this.state._type}
				>
					<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this.state._ariaLabel || this.state._label}>
						<slot name="expert" slot="expert"></slot>
					</kol-span-wc>
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
	 * Gibt einen beschreibenden Text für den Screenreader an. Damit die
	 * Sprachsteuerung von interaktiven Elementen funktioniert, muss der
	 * Aria-Label-Text mit dem Label-Text des Buttons beginnen.
	 *
	 * - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Gibt an, ob der Button deaktiviert ist.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

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
	 * Gibt einen beschreibenden Text für das Text-Element an.
	 */
	@Prop() public _label!: string;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: KoliBriButtonCallbacks;

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignment = 'top';

	/**
	 * Gibt an, welche Typ der Button hat.
	 */
	@Prop() public _type?: KoliBriButtonType = 'button';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: ButtonStates = {
		_ariaLabel: '',
		_icon: {},
		_iconAlign: 'left',
		_label: '',
		_on: {},
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
		validateAriaLabel(this, value);
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
		watchBoolean(this, '_iconOnly', value, {
			defaultValue: false,
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
		validateLabel(this, value);
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
	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
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
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAriaControls(this._ariaControls);
		this.validateAriaCurrent(this._ariaCurrent);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaLabel(this._ariaLabel);
		this.validateDisabled(this._disabled);
		this.validateIcon(this._icon);
		// this.validateIconAlign(this._iconAlign);
		this.validateIconOnly(this._iconOnly);
		this.validateId(this._id);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateTabIndex(this._tabIndex);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateType(this._type);
	}
}
