import { Component, h, JSX, Prop } from '@stencil/core';
import { Alignment, KoliBriIconProp } from '../../types/icon';
import { Generic } from '@public-ui/core';
import { AriaCurrent, LinkOnCallbacks, LinkTarget, LinkUseCase, OptionalLinkProps, RequiredLinkProps } from '../../types/button-link';
import { TooltipAlignment } from '../tooltip/component';
import { Stringified } from '../../types/common';

/**
 * @part link - Ermöglicht das Stylen des Links.
 * @part span - Ermöglicht das Stylen des Linktextes.
 * @part hidden - Ermöglicht das Ausblenden des Linktextes.
 */
@Component({
	tag: 'kol-link',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolLink implements Generic.Element.Members<RequiredLinkProps, OptionalLinkProps> {
	public render(): JSX.Element {
		return (
			<kol-link-wc
				_ariaControls={this._ariaControls}
				_ariaCurrent={this._ariaCurrent}
				_ariaExpanded={this._ariaExpanded}
				_ariaLabel={this._ariaLabel}
				_ariaSelected={this._ariaSelected}
				_disabled={this._disabled}
				_fill={this._fill}
				_href={this._href}
				_icon={this._icon}
				_iconAlign={this._iconAlign}
				_iconOnly={this._iconOnly}
				_on={this._on}
				_part={this._part}
				_selector={this._selector}
				_stealth={this._stealth}
				_tabIndex={this._tabIndex}
				_target={this._target}
				_targetDescription={this._targetDescription}
				_tooltipAlign={this._tooltipAlign}
				_underline={this._underline}
				_useCase={this._useCase}
			>
				<slot />
			</kol-link-wc>
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
	@Prop() public _iconOnly?: boolean = false;

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
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 */
	@Prop() public _selector?: string;

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 */
	@Prop() public _stealth?: boolean = false;

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
	@Prop() public _underline?: boolean = true;

	/**
	 * Gibt den Verwendungsfall des Links an.
	 */
	@Prop() public _useCase?: LinkUseCase = 'text';
}
