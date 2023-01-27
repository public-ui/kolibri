package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit **Badges** können Sie bestimmte Informationen auf Ihrer Webseite optisch hervorheben.
KoliBri bietet neben der Angabe der Hintergrundfarbe und automatischer Berechnung der Textfarbe auch die Möglichkeit, einem Badge ein Icon und/oder einen anderen Schriftschnitt mitzugeben.
 */

@Tag("kol-badge")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-badge")
public class KolBadge extends Component {
	/**
	 * Gibt die Farbe des Hintergrundes bzw. der Schrift an.
	 */
	public void set_color(string | undefined | { backgroundColor: string; color: string; } _color) {
		getElement().setProperty("_color", _color);
	}

	/**
	 * Gibt einen Identifier eines Icons aus den Icofont's an. (https://icofont.com/)
	 */
	public void set_icon(string | undefined | { top: string | KoliBriCustomIcon; right?: string | KoliBriCustomIcon | undefined; bottom?: string | KoliBriCustomIcon | undefined; left?: string | KoliBriCustomIcon | undefined; } | { top?: string | KoliBriCustomIcon | undefined; right: string | KoliBriCustomIcon; bottom?: string | KoliBriCustomIcon | undefined; left?: string | KoliBriCustomIcon | undefined; } | { top?: string | KoliBriCustomIcon | undefined; right?: string | KoliBriCustomIcon | undefined; bottom: string | KoliBriCustomIcon; left?: string | KoliBriCustomIcon | undefined; } | { top?: string | KoliBriCustomIcon | undefined; right?: string | KoliBriCustomIcon | undefined; bottom?: string | KoliBriCustomIcon | undefined; left: string | KoliBriCustomIcon; } _icon) {
		getElement().setProperty("_icon", _icon);
	}

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 */
	public void set_iconAlign("bottom" | "left" | "right" | "top" | undefined _iconAlign) {
		getElement().setProperty("_icon-align", _iconAlign);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	public void set_iconOnly(boolean | undefined _iconOnly) {
		getElement().setProperty("_icon-only", _iconOnly);
	}

	/**
	 * Gibt den Label-Text des Badges an.
	 */
	public void set_label(String _label) {
		getElement().setProperty("_label", _label);
	}

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 */
	public void set_smartButton(string | undefined | { _label: string; } & { _ariaControls?: string | undefined; _ariaCurrent?: AriaCurrent | undefined; _ariaExpanded?: boolean | undefined; _ariaLabel?: string | undefined; _ariaSelected?: boolean | undefined; _disabled?: boolean | undefined; _icon?: Stringified<KoliBriIconProp> | undefined; _iconAlign?: Alignment | undefined; _iconOnly?: boolean | undefined; _role?: "tab" | undefined; _tabIndex?: number | undefined; _tooltipAlign?: Alignment | undefined; _accessKey?: string | undefined; _id?: string | undefined; _on?: KoliBriButtonCallbacks<unknown> | undefined; _type?: KoliBriButtonType | undefined; _value?: unknown; _customClass?: string | undefined; _variant?: KoliBriButtonVariant | undefined; } _smartButton) {
		getElement().setProperty("_smart-button", _smartButton);
	}

}