package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der ButtonLink ist semantisch ein Button und hat das Design eines Links. Hierzu werden alle relevanten Properties der Button-Komponente übernommen und um die Design-bestimmenden Properties des Links erweitert.

Einen Button kann man deaktivieren und daher gibt es bei einem ButtonLink das Property `_disabled`. Wie das optisch ausgestaltet wird, entscheidet die UX-Designer:in.

Statt, wie bei einem Link, `_href` zu verwenden, wird bei einem ButtonLink das Property über den `Click-Callback` gesteuert. Hierzu wird das `_on`-Property verwendet.

Bei einem Link gibt es das Property `target`, welches ggf. den Link in einem neuen Fenster/Tab öffnet. Das Verhalten ist aktuell noch nicht umgesetzt.

Da der Link, nicht wie der Button, in mehrere Varianten (`primary` oder `secondary` usw.) angeboten wird, stehen die Properties `_customClass` und `_variant` nicht zur Verfügung.
 */

@Tag("kol-button-link")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-button-link")
public class KolButtonLink extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann.
	 *
	 * @param value Optional<String>
	 */
	public void setAccessKey(final Optional<String> value) {
		getElement().setProperty("_access-key", value);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAccessKey() {
		return getElement().getProperty("_access-key", null);
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaControls(final Optional<String> value) {
		getElement().setProperty("_aria-controls", value);
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaControls() {
		return getElement().getProperty("_aria-controls", null);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaCurrent(final Optional<String> value) {
		getElement().setProperty("_aria-current", value);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrent() {
		return getElement().getProperty("_aria-current", null);
	}

	/**
	 * Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaExpanded(final Optional<String> value) {
		getElement().setProperty("_aria-expanded", value);
	}

	/**
	 * Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaExpanded() {
		return getElement().getProperty("_aria-expanded", null);
	}

	/**
	 * Gibt einen beschreibenden Text für den Screenreader an. Damit die
Sprachsteuerung von interaktiven Elementen funktioniert, muss der
Aria-Label-Text mit dem Label-Text des Buttons beginnen.

- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
	 *
	 * @param value Optional<String>
	 */
	public void setAriaLabel(final Optional<String> value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt einen beschreibenden Text für den Screenreader an. Damit die
Sprachsteuerung von interaktiven Elementen funktioniert, muss der
Aria-Label-Text mit dem Label-Text des Buttons beginnen.

- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaSelected(final Optional<String> value) {
		getElement().setProperty("_aria-selected", value);
	}

	/**
	 * Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaSelected() {
		return getElement().getProperty("_aria-selected", null);
	}

	/**
	 * Gibt an, ob der Button deaktiviert ist.
	 *
	 * @param value Optional<String>
	 */
	public void setDisabled(final Optional<String> value) {
		getElement().setProperty("_disabled", value);
	}

	/**
	 * Gibt an, ob der Button deaktiviert ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDisabled() {
		return getElement().getProperty("_disabled", null);
	}

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 *
	 * @param value Optional<String>
	 */
	public void setIcon(final Optional<String> value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @param value Optional<String>
	 */
	public void setIconOnly(final Optional<String> value) {
		getElement().setProperty("_icon-only", value);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconOnly() {
		return getElement().getProperty("_icon-only", null);
	}

	/**
	 * Gibt die ID der Schaltfläche an. (Selection, Testing)
	 *
	 * @param value Optional<String>
	 */
	public void setId(final Optional<String> value) {
		getElement().setProperty("_id", value);
	}

	/**
	 * Gibt die ID der Schaltfläche an. (Selection, Testing)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getId() {
		return getElement().getProperty("_id", null);
	}

	/**
	 * Setzt den sichtbaren Text des Elements.
	 *
	 * @param value String
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt den sichtbaren Text des Elements.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt an, welche Role der Schalter hat.
	 *
	 * @param value Optional<String>
	 */
	public void setRole(final Optional<String> value) {
		getElement().setProperty("_role", value);
	}

	/**
	 * Gibt an, welche Role der Schalter hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRole() {
		return getElement().getProperty("_role", null);
	}

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @param value Optional<String>
	 */
	public void setTabIndex(final Optional<String> value) {
		getElement().setProperty("_tab-index", value);
	}

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabIndex() {
		return getElement().getProperty("_tab-index", null);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setTooltipAlign(final Optional<String> value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}

	/**
	 * Gibt an, welche Typ der Button hat.
	 *
	 * @param value Optional<String>
	 */
	public void setType(final Optional<String> value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Gibt an, welche Typ der Button hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		return getElement().getProperty("_type", null);
	}
}
