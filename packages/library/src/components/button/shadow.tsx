import { Component, h, JSX, Method, Prop } from '@stencil/core';

import { Generic } from '@public-ui/core';
import {
	AriaCurrent,
	KoliBriButtonCallbacks,
	KoliBriButtonType,
	KoliBriButtonVariant,
	OptionalButtonProps,
	RequiredButtonProps,
} from '../../types/button-link';
import { Alignment, KoliBriIconProp } from '../../types/icon';
import { TooltipAlignment } from '../tooltip/component';
import { Stringified } from '../../types/common';

@Component({
	tag: 'kol-button',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolButton implements Generic.Element.Members<RequiredButtonProps, OptionalButtonProps> {
	/**
	 * - https://github.com/ionic-team/stencil/issues/1660#issuecomment-503225460
	 * - https://stenciljs.com/docs/templating-jsx
	 */
	// - eslint-disable-next-line @stencil/own-props-must-be-private
	public forwardedRef?: HTMLKolButtonWcElement;
	// - eslint-disable-next-line @stencil/own-props-must-be-private
	public ref?: HTMLKolButtonWcElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		this.forwardedRef = ref;
		this.ref = ref;
	};

	/**
	 * Gibt die Referenz auf das interaktive Element in der Komponente zurück.
	 */
	@Method()
	async getInteractiveElementRef(): Promise<HTMLButtonElement | undefined> {
		return await this.ref?.getInteractiveElementRef();
	}

	public render(): JSX.Element {
		return (
			<kol-button-wc
				_accessKey={this._accessKey}
				_ariaControls={this._ariaControls}
				_ariaCurrent={this._ariaCurrent}
				_ariaExpanded={this._ariaExpanded}
				_ariaLabel={this._ariaLabel}
				_customClass={this._customClass}
				_disabled={this._disabled}
				_icon={this._icon}
				_iconAlign={this._iconAlign}
				_iconOnly={this._iconOnly}
				_id={this._id}
				_label={this._label}
				_on={this._on}
				_tabIndex={this._tabIndex}
				_tooltipAlign={this._tooltipAlign}
				_type={this._type}
				_variant={this._variant}
				ref={this.catchRef}
				style={{
					width: 'inherit',
				}}
			>
				<slot name="expert" slot="expert"></slot>
			</kol-button-wc>
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
	 * Gibt einen beschreibenden Text des Buttons an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	@Prop() public _ariaLabel?: string = '';

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
	 * Gibt den Label für die Beschriftung der Schaltfläche an.
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
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';
}
