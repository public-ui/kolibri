package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der Input-Typ **File** erzeugt ein Eingabefeld für zum Beispiel Uploads. Es können eine oder auch mehrere Dateien ausgewählt werden.
 */

@Tag("kol-input-file")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-input-file")
public class KolInputFile extends Component {
	/**
	 * Gibt an, welche Dateiformate erlaubt sind.
	 *
	 * @param value Optional<String>
	 */
	public void setAccept(final Optional<String> value) {
		getElement().setProperty("_accept", value);
	}

	/**
	 * Gibt an, welche Dateiformate erlaubt sind.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAccept() {
		return getElement().getProperty("_accept", null);
	}

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
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 *
	 * @param value Optional<String>
	 */
	public void setIcon(final Optional<String> value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
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
	 * Gibt an, ob mehrere Werte eingegeben werden können.
	 *
	 * @param value Optional<String>
	 */
	public void setMultiple(final Optional<String> value) {
		getElement().setProperty("_multiple", value);
	}

	/**
	 * Gibt an, ob mehrere Werte eingegeben werden können.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMultiple() {
		return getElement().getProperty("_multiple", null);
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
	 * Gibt den Wert des Eingabefeldes an.
	 *
	 * @param value Optional<String>
	 */
	public void setValue(final Optional<String> value) {
		getElement().setProperty("_value", value);
	}

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getValue() {
		return getElement().getProperty("_value", null);
	}
}
