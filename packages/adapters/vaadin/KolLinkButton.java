package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der LinkButton ist semantisch ein Link und hat das Design eines Buttons. Hierzu werden alle relevanten Properties der Link-Komponente übernommen und um die Design-bestimmenden Properties des Buttons erweitert.
Weitere Informationen zum Aussehen finden Sie auf der <kol-link _href="/docs/components/button" _label="Seite des Buttons"></kol-link>.
 */

@Tag("kol-link-button")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-link-button")
public class KolLinkButton extends Component {
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
	 * Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaCurrent(final Optional<String> value) {
		getElement().setProperty("_aria-current", value);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrent() {
		return getElement().getProperty("_aria-current", null);
	}

	/**
	 * Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaExpanded(final Optional<String> value) {
		getElement().setProperty("_aria-expanded", value);
	}

	/**
	 * Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
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
	 * Gibt an, ob der Link deaktiviert ist.
	 *
	 * @param value Optional<String>
	 */
	public void setDisabled(final Optional<String> value) {
		getElement().setProperty("_disabled", value);
	}

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDisabled() {
		return getElement().getProperty("_disabled", null);
	}

	/**
	 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
	 *
	 * @param value Optional<String>
	 */
	public void setDownload(final Optional<String> value) {
		getElement().setProperty("_download", value);
	}

	/**
	 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDownload() {
		return getElement().getProperty("_download", null);
	}

	/**
	 * Gibt die Ziel-Url des Links an.
	 *
	 * @param value String
	 */
	public void setHref(final Optional<String> value) {
		getElement().setProperty("_href", value);
	}

	/**
	 * Gibt die Ziel-Url des Links an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHref() {
		return getElement().getProperty("_href", null);
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
	 * Setzt die Role der Schaltfläche.
	 *
	 * @param value Optional<String>
	 */
	public void setRole(final Optional<String> value) {
		getElement().setProperty("_role", value);
	}

	/**
	 * Setzt die Role der Schaltfläche.
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
	 * Gibt an wo der Link geöffnet werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setTarget(final Optional<String> value) {
		getElement().setProperty("_target", value);
	}

	/**
	 * Gibt an wo der Link geöffnet werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTarget() {
		return getElement().getProperty("_target", null);
	}

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 *
	 * @param value Optional<String>
	 */
	public void setTargetDescription(final Optional<String> value) {
		getElement().setProperty("_target-description", value);
	}

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTargetDescription() {
		return getElement().getProperty("_target-description", null);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setTooltipAlign(final Optional<String> value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}

	/**
	 * Gibt an, welche Ausprägung der Link-Button hat.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Ausprägung der Link-Button hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
