package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.
 */

@Tag("kol-split-button")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-split-button")
public class KolSplitButton extends Component {
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
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @param value Optional<String>
	 */
	public void setCustomClass(final Optional<String> value) {
		getElement().setProperty("_custom-class", value);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCustomClass() {
		return getElement().getProperty("_custom-class", null);
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
	 * Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben.
	 *
	 * @param value Optional<String>
	 */
	public void setHideLabel(final Optional<String> value) {
		getElement().setProperty("_hide-label", value);
	}

	/**
	 * Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		return getElement().getProperty("_hide-label", null);
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
	 * Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben.
	 *
	 * @param value Optional<String>
	 */
	public void setIconOnly(final Optional<String> value) {
		getElement().setProperty("_icon-only", value);
	}

	/**
	 * Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconOnly() {
		return getElement().getProperty("_icon-only", null);
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
	 * Gibt an, welche Rolle der Schalter hat.
	 *
	 * @param value Optional<String>
	 */
	public void setRole(final Optional<String> value) {
		getElement().setProperty("_role", value);
	}

	/**
	 * Gibt an, welche Rolle der Schalter hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRole() {
		return getElement().getProperty("_role", null);
	}

	/**
	 * Gibt an, welche Rolle der Schalter hat.
	 *
	 * @param value Optional<String>
	 */
	public void setShowDropdown(final Optional<String> value) {
		getElement().setProperty("_show-dropdown", value);
	}

	/**
	 * Gibt an, welche Rolle der Schalter hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShowDropdown() {
		return getElement().getProperty("_show-dropdown", null);
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
	 * Setzt die gewünschte Ausrichtung des Tooltips (`_icon-only`).
	 *
	 * @param value Optional<String>
	 */
	public void setTooltipAlign(final Optional<String> value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Setzt die gewünschte Ausrichtung des Tooltips (`_icon-only`).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}

	/**
	 * Setzt den Typ der Schaltfläche.
	 *
	 * @param value Optional<String>
	 */
	public void setType(final Optional<String> value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Setzt den Typ der Schaltfläche.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
