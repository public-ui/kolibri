package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * **Buttons** dienen dazu, Benutzer:innen Auswahlmöglichkeiten für Aktionen anzuzeigen und diese in einer klaren Hierarchie anzuordnen. Sie helfen Nutzer:innen, die wichtigsten Aktionen einer Seite oder innerhalb eines Viewports zu finden und ermöglichen es ihm, diese Aktionen auszuführen. Die Beschriftung des Buttons wird verwendet, um Nutzer:innen klar anzuzeigen, welche Aktion ausgelöst wird. Buttons ermöglichen es Nutzer:innen, eine Änderung zu bestätigen, Schritte in einer Aufgabe abzuschließen oder Entscheidungen zu treffen.
 */

@Tag("kol-button")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-button")
public class KolButton extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann.
	 */
	public void set_accessKey(string | undefined _accessKey) {
		getElement().setProperty("_access-key", _accessKey);
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	public void set_ariaControls(string | undefined _ariaControls) {
		getElement().setProperty("_aria-controls", _ariaControls);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 */
	public void set_ariaCurrent("date" | "location" | "page" | "step" | "time" | boolean | undefined _ariaCurrent) {
		getElement().setProperty("_aria-current", _ariaCurrent);
	}

	/**
	 * Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	public void set_ariaExpanded(boolean | undefined _ariaExpanded) {
		getElement().setProperty("_aria-expanded", _ariaExpanded);
	}

	/**
	 * Gibt einen beschreibenden Text des Buttons an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	public void set_ariaLabel(string | undefined _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	public void set_ariaSelected(boolean | undefined _ariaSelected) {
		getElement().setProperty("_aria-selected", _ariaSelected);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	public void set_customClass(string | undefined _customClass) {
		getElement().setProperty("_custom-class", _customClass);
	}

	/**
	 * Gibt an, ob der Button deaktiviert ist.
	 */
	public void set_disabled(boolean | undefined _disabled) {
		getElement().setProperty("_disabled", _disabled);
	}

	/**
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	public void set_icon(string | undefined | { top: string | KoliBriCustomIcon; right?: string | KoliBriCustomIcon | undefined; bottom?: string | KoliBriCustomIcon | undefined; left?: string | KoliBriCustomIcon | undefined; } | { top?: string | KoliBriCustomIcon | undefined; right: string | KoliBriCustomIcon; bottom?: string | KoliBriCustomIcon | undefined; left?: string | KoliBriCustomIcon | undefined; } | { top?: string | KoliBriCustomIcon | undefined; right?: string | KoliBriCustomIcon | undefined; bottom: string | KoliBriCustomIcon; left?: string | KoliBriCustomIcon | undefined; } | { top?: string | KoliBriCustomIcon | undefined; right?: string | KoliBriCustomIcon | undefined; bottom?: string | KoliBriCustomIcon | undefined; left: string | KoliBriCustomIcon; } _icon) {
		getElement().setProperty("_icon", _icon);
	}

	/**
	 * Gibt an, ob das Icon links oder rechts dargestellt werden soll.
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
	 * Gibt die ID der Schaltfläche an. (Selection, Testing)
	 */
	public void set_id(string | undefined _id) {
		getElement().setProperty("_id", _id);
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
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	public void set_tabIndex(number | undefined _tabIndex) {
		getElement().setProperty("_tab-index", _tabIndex);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	public void set_tooltipAlign("bottom" | "left" | "right" | "top" | undefined _tooltipAlign) {
		getElement().setProperty("_tooltip-align", _tooltipAlign);
	}

	/**
	 * Gibt an, welche Typ der Button hat.
	 */
	public void set_type("button" | "reset" | "submit" | undefined _type) {
		getElement().setProperty("_type", _type);
	}

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	public void set_variant("custom" | "danger" | "ghost" | "normal" | "primary" | "secondary" | undefined _variant) {
		getElement().setProperty("_variant", _variant);
	}

}