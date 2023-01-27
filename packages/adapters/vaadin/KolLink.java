package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Link**-Komponente rendert einen auf Barrierefreiheit optimierten Link, der als Text, als Icon oder auch in Kombination ausgegeben werden kann.
Möglich ist auch die Ausgabe eines versteckten Links.

Der Link wird standardmäßig in klassischer Form mit Unterstrich ausgegeben, der jedoch über ein Attribut auch ohne CSS entfernt werden kann. Weitere Informationen zu Custom Styles finden Sie weiter unten.

Beachten Sie, dass die Komponente automatisch ein Padding links und rechts zum umgebenden Text erzeugt. Sie kann daher im Fließtext ohne
Eingabe von Leerzeichen eingefügt werden. Zusätzliche Leerzeichen vergrößern den Abstand zum umgebenden Text.
 */

@Tag("kol-link")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-link")
public class KolLink extends Component {
	/**
	 * Gibt an, welche Elemente kontrolliert werden.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	public void set_ariaControls(string | undefined _ariaControls) {
		getElement().setProperty("_aria-controls", _ariaControls);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 */
	public void set_ariaCurrent("date" | "location" | "page" | "step" | "time" | boolean | undefined _ariaCurrent) {
		getElement().setProperty("_aria-current", _ariaCurrent);
	}

	/**
	 * Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	public void set_ariaExpanded(boolean | undefined _ariaExpanded) {
		getElement().setProperty("_aria-expanded", _ariaExpanded);
	}

	/**
	 * Gibt einen beschreibenden Text des Links an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	public void set_ariaLabel(string | undefined _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt an, ob der Link gerade ausgewählt ist. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	public void set_ariaSelected(boolean | undefined _ariaSelected) {
		getElement().setProperty("_aria-selected", _ariaSelected);
	}

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 */
	public void set_disabled(boolean | undefined _disabled) {
		getElement().setProperty("_disabled", _disabled);
	}

	/**
	 * Gibt die Ziel-Url des Links an.
	 */
	public void set_href(String _href) {
		getElement().setProperty("_href", _href);
	}

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
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
	 * Gibt den Label für die Beschriftung der Schaltfläche an.
	 */
	public void set_label(String _label) {
		getElement().setProperty("_label", _label);
	}

	/**
	 * Gibt an, welche Role der Schalter hat.
	 */
	public void set_role("tab" | undefined _role) {
		getElement().setProperty("_role", _role);
	}

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 */
	public void set_selector(string | undefined _selector) {
		getElement().setProperty("_selector", _selector);
	}

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 */
	public void set_stealth(boolean | undefined _stealth) {
		getElement().setProperty("_stealth", _stealth);
	}

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	public void set_tabIndex(number | undefined _tabIndex) {
		getElement().setProperty("_tab-index", _tabIndex);
	}

	/**
	 * Definiert das Verhalten, bei dem der Link geöffnet werden soll.
	 */
	public void set_target(string | undefined _target) {
		getElement().setProperty("_target", _target);
	}

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 */
	public void set_targetDescription(string | undefined _targetDescription) {
		getElement().setProperty("_target-description", _targetDescription);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	public void set_tooltipAlign("bottom" | "left" | "right" | "top" | undefined _tooltipAlign) {
		getElement().setProperty("_tooltip-align", _tooltipAlign);
	}

	/**
	 * Gibt den Verwendungsfall des Links an.
	 */
	public void set_useCase("image" | "nav" | "text" | undefined _useCase) {
		getElement().setProperty("_use-case", _useCase);
	}

}