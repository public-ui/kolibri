package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der Input-Typ **Text** erzeugt ein Eingabefeld für normalen Text, Suchbegriffe, URLs oder Telefonnummern.
 */

@Tag("kol-input-text")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.22")
@JsModule("@public-ui/components/dist/components/kol-input-text")
public class KolInputText extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 *
	 * @param value String
	 */
	public void setAccessKey(final String value) {
		getElement().setProperty("_access-key", value);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 *
	 * @return String
	 */
	public String getAccessKey() {
		return getElement().getProperty("_access-key", null);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 *
	 * @param value String
	 */
	public void setAlert(final String value) {
		getElement().setProperty("_alert", value);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 *
	 * @return String
	 */
	public String getAlert() {
		return getElement().getProperty("_alert", null);
	}

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 *
	 * @param value String
	 */
	public void setAutoComplete(final String value) {
		getElement().setProperty("_auto-complete", value);
	}

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 *
	 * @return String
	 */
	public String getAutoComplete() {
		return getElement().getProperty("_auto-complete", null);
	}

	/**
	 * Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.
	 *
	 * @param value String
	 */
	public void setDisabled(final String value) {
		getElement().setProperty("_disabled", value);
	}

	/**
	 * Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.
	 *
	 * @return String
	 */
	public String getDisabled() {
		return getElement().getProperty("_disabled", null);
	}

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 *
	 * @param value String
	 */
	public void setError(final String value) {
		getElement().setProperty("_error", value);
	}

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 *
	 * @return String
	 */
	public String getError() {
		return getElement().getProperty("_error", null);
	}

	/**
	 * Versteckt das sichtbare Label des Elements.
	 *
	 * @param value String
	 */
	public void setHideLabel(final String value) {
		getElement().setProperty("_hide-label", value);
	}

	/**
	 * Versteckt das sichtbare Label des Elements.
	 *
	 * @return String
	 */
	public String getHideLabel() {
		return getElement().getProperty("_hide-label", null);
	}

	/**
	 * Gibt den Hinweistext an.
	 *
	 * @param value String
	 */
	public void setHint(final String value) {
		getElement().setProperty("_hint", value);
	}

	/**
	 * Gibt den Hinweistext an.
	 *
	 * @return String
	 */
	public String getHint() {
		return getElement().getProperty("_hint", null);
	}

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 *
	 * @param value String
	 */
	public void setIcon(final String value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 *
	 * @return String
	 */
	public String getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 *
	 * @param value String
	 */
	public void setId(final String value) {
		getElement().setProperty("_id", value);
	}

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 *
	 * @return String
	 */
	public String getId() {
		return getElement().getProperty("_id", null);
	}

	/**
	 * Gibt die Liste der Vorschlagswörter an.
	 *
	 * @param value String
	 */
	public void setList(final String value) {
		getElement().setProperty("_list", value);
	}

	/**
	 * Gibt die Liste der Vorschlagswörter an.
	 *
	 * @return String
	 */
	public String getList() {
		return getElement().getProperty("_list", null);
	}

	/**
	 * Gibt an, wie viele Zeichen man maximal eingeben kann.
	 *
	 * @param value String
	 */
	public void setMaxLength(final String value) {
		getElement().setProperty("_max-length", value);
	}

	/**
	 * Gibt an, wie viele Zeichen man maximal eingeben kann.
	 *
	 * @return String
	 */
	public String getMaxLength() {
		return getElement().getProperty("_max-length", null);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 *
	 * @param value String
	 */
	public void setName(final String value) {
		getElement().setProperty("_name", value);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 *
	 * @return String
	 */
	public String getName() {
		return getElement().getProperty("_name", null);
	}

	/**
	 * Gibt ein Prüfmuster für das Eingabefeld an.
	 *
	 * @param value String
	 */
	public void setPattern(final String value) {
		getElement().setProperty("_pattern", value);
	}

	/**
	 * Gibt ein Prüfmuster für das Eingabefeld an.
	 *
	 * @return String
	 */
	public String getPattern() {
		return getElement().getProperty("_pattern", null);
	}

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 *
	 * @param value String
	 */
	public void setPlaceholder(final String value) {
		getElement().setProperty("_placeholder", value);
	}

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 *
	 * @return String
	 */
	public String getPlaceholder() {
		return getElement().getProperty("_placeholder", null);
	}

	/**
	 * Setzt das Eingabefeld in den schreibgeschützten Modus.
	 *
	 * @param value String
	 */
	public void setReadOnly(final String value) {
		getElement().setProperty("_read-only", value);
	}

	/**
	 * Setzt das Eingabefeld in den schreibgeschützten Modus.
	 *
	 * @return String
	 */
	public String getReadOnly() {
		return getElement().getProperty("_read-only", null);
	}

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 *
	 * @param value String
	 */
	public void setRequired(final String value) {
		getElement().setProperty("_required", value);
	}

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 *
	 * @return String
	 */
	public String getRequired() {
		return getElement().getProperty("_required", null);
	}

	/**
	 * Setzt die Breite des Eingabefeldes in Buchstabenbreiten.
	 *
	 * @param value String
	 */
	public void setSize(final String value) {
		getElement().setProperty("_size", value);
	}

	/**
	 * Setzt die Breite des Eingabefeldes in Buchstabenbreiten.
	 *
	 * @return String
	 */
	public String getSize() {
		return getElement().getProperty("_size", null);
	}

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 *
	 * @param value String
	 */
	public void setTabIndex(final String value) {
		getElement().setProperty("_tab-index", value);
	}

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 *
	 * @return String
	 */
	public String getTabIndex() {
		return getElement().getProperty("_tab-index", null);
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 *
	 * @param value String
	 */
	public void setTouched(final String value) {
		getElement().setProperty("_touched", value);
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 *
	 * @return String
	 */
	public String getTouched() {
		return getElement().getProperty("_touched", null);
	}

	/**
	 * Gibt an, ob es ein Text-, Suche-, URL- oder Telefon-Eingabefeld ist.
	 *
	 * @param value String
	 */
	public void setType(final String value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Gibt an, ob es ein Text-, Suche-, URL- oder Telefon-Eingabefeld ist.
	 *
	 * @return String
	 */
	public String getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 *
	 * @param value String
	 */
	public void setValue(final String value) {
		getElement().setProperty("_value", value);
	}

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 *
	 * @return String
	 */
	public String getValue() {
		return getElement().getProperty("_value", null);
	}
}
