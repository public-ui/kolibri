package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der Input-Typ **_Checkbox_** generiert eine rechteckige Box, die durch Anklicken aktiviert und wieder deaktiviert wird. In aktiviertem Zustand befindet sich ein farbiger Haken in der Box.
 */

@Tag("kol-input-checkbox")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-input-checkbox")
public class KolInputCheckbox extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 *
	 * @param value Optional<String>
	 */
	public void setAccessKey(final Optional<String> value) {
		getElement().setProperty("_access-key", value);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAccessKey() {
		return getElement().getProperty("_access-key", null);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 *
	 * @param value Optional<String>
	 */
	public void setAlert(final Optional<String> value) {
		getElement().setProperty("_alert", value);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlert() {
		return getElement().getProperty("_alert", null);
	}

	/**
	 * Gibt an, ob die Checkbox ausgewählt ist oder nicht. (kann gelesen und gesetzt werden)
	 *
	 * @param value Optional<String>
	 */
	public void setChecked(final Optional<String> value) {
		getElement().setProperty("_checked", value);
	}

	/**
	 * Gibt an, ob die Checkbox ausgewählt ist oder nicht. (kann gelesen und gesetzt werden)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getChecked() {
		return getElement().getProperty("_checked", null);
	}

	/**
	 * Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.
	 *
	 * @param value Optional<String>
	 */
	public void setDisabled(final Optional<String> value) {
		getElement().setProperty("_disabled", value);
	}

	/**
	 * Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDisabled() {
		return getElement().getProperty("_disabled", null);
	}

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 *
	 * @param value Optional<String>
	 */
	public void setError(final Optional<String> value) {
		getElement().setProperty("_error", value);
	}

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getError() {
		return getElement().getProperty("_error", null);
	}

	/**
	 * Versteckt das sichtbare Label des Elements.
	 *
	 * @param value Optional<String>
	 */
	public void setHideLabel(final Optional<String> value) {
		getElement().setProperty("_hide-label", value);
	}

	/**
	 * Versteckt das sichtbare Label des Elements.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		return getElement().getProperty("_hide-label", null);
	}

	/**
	 * Gibt den Hinweistext an.
	 *
	 * @param value Optional<String>
	 */
	public void setHint(final Optional<String> value) {
		getElement().setProperty("_hint", value);
	}

	/**
	 * Gibt den Hinweistext an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHint() {
		return getElement().getProperty("_hint", null);
	}

	/**
	 * Ermöglicht das Überschreiben der Icons für die Checkbox.
	 *
	 * @param value Optional<String>
	 */
	public void setIcon(final Optional<String> value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Ermöglicht das Überschreiben der Icons für die Checkbox.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 *
	 * @param value Optional<String>
	 */
	public void setId(final Optional<String> value) {
		getElement().setProperty("_id", value);
	}

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getId() {
		return getElement().getProperty("_id", null);
	}

	/**
	 * Gibt an, ob die Checkbox weder ausgewählt noch nicht ausgewählt ist.
	 *
	 * @param value Optional<String>
	 */
	public void setIndeterminate(final Optional<String> value) {
		getElement().setProperty("_indeterminate", value);
	}

	/**
	 * Gibt an, ob die Checkbox weder ausgewählt noch nicht ausgewählt ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIndeterminate() {
		return getElement().getProperty("_indeterminate", null);
	}

	/**
	 * Das Label dient der Beschriftung unterschiedlicher Elemente.
- Button -> label text
- Heading -> headline text
- Input, Select und Textarea -> label text
- Summary -> summary text
- Table -> caption text
- etc.

Das Label ist häufig ein Pflichtattribut und kann leer gesetzt werden,
wenn man das Label mittels dem Expert-Slot überschreiben will.
	 *
	 * @param value String
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Das Label dient der Beschriftung unterschiedlicher Elemente.
- Button -> label text
- Heading -> headline text
- Input, Select und Textarea -> label text
- Summary -> summary text
- Table -> caption text
- etc.

Das Label ist häufig ein Pflichtattribut und kann leer gesetzt werden,
wenn man das Label mittels dem Expert-Slot überschreiben will.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 *
	 * @param value Optional<String>
	 */
	public void setName(final Optional<String> value) {
		getElement().setProperty("_name", value);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getName() {
		return getElement().getProperty("_name", null);
	}

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 *
	 * @param value Optional<String>
	 */
	public void setRequired(final Optional<String> value) {
		getElement().setProperty("_required", value);
	}

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRequired() {
		return getElement().getProperty("_required", null);
	}

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 *
	 * @param value Optional<String>
	 */
	public void setTabIndex(final Optional<String> value) {
		getElement().setProperty("_tab-index", value);
	}

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabIndex() {
		return getElement().getProperty("_tab-index", null);
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 *
	 * @param value Optional<String>
	 */
	public void setTouched(final Optional<String> value) {
		getElement().setProperty("_touched", value);
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTouched() {
		return getElement().getProperty("_touched", null);
	}

	/**
	 * Gibt an, welchen Type das Input haben soll.
	 *
	 * @param value Optional<String>
	 */
	public void setType(final Optional<String> value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Gibt an, welchen Type das Input haben soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Gibt den Schlüssel/Namen der Checkbox an. ({ [value]: [checked] })
	 *
	 * @param value Optional<String>
	 */
	public void setValue(final Optional<String> value) {
		getElement().setProperty("_value", value);
	}

	/**
	 * Gibt den Schlüssel/Namen der Checkbox an. ({ [value]: [checked] })
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getValue() {
		return getElement().getProperty("_value", null);
	}

	/**
	 * Gibt an, welchen Type das Input haben soll.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welchen Type das Input haben soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
