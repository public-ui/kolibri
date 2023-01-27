package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der LinkButton ist semantisch ein Link und hat das Design eines Buttons. Hierzu werden alle relevanten Properties der Link-Komponente übernommen und um die Design-bestimmenden Properties des Buttons erweitert.

Einen Link kann man nicht deaktivieren und daher gibt es bei einem LinkButton nicht das Property `_disabled`.

Da es die Komponente ButtonLink gibt, die semantisch ein Button und optisch ein Link ist. Ist es nicht mehr notwendig den Click-Callback zu unterstützen. Das Property `_on` wird somit als `deprecated` markiert und wird mit dem nächsten Major-Release entfernt.

Ein Button hat aus UX-Sicht mehrere Varianten (`primary` oder `secondary` usw.). Damit der LinkButton das optisch gleich aussehen kann, wurden die Properties `_customClass` und `_variant` von der Button-Komponente übernommen.
 */

@Tag("kol-link-button")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-link-button")
public class KolLinkButton extends Component {
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
	 * Gibt einen beschreibenden Text für den Screenreader an. Damit die
Sprachsteuerung von interaktiven Elementen funktioniert, muss der
Aria-Label-Text mit dem Label-Text des Buttons beginnen.

- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
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
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	public void set_iconOnly(boolean | undefined _iconOnly) {
		getElement().setProperty("_icon-only", _iconOnly);
	}

	/**
	 * Gibt einen beschreibenden Text für das Text-Element an.
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
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	public void set_variant("custom" | "danger" | "ghost" | "normal" | "primary" | "secondary" | undefined _variant) {
		getElement().setProperty("_variant", _variant);
	}

}