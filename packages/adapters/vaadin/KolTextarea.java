package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die Komponente **Textarea** stellt ein größeres Eingabefeld für Inhalte zur Verfügung. Im Gegensatz zum <kol-link _href="/docs/components/input-text" _label="InputText"></kol-link> können hier auch umfangreiche Inhalte eingegeben werden, die auch mit Zeilenumbrüchen versehen sein können.
 */

@Tag("kol-textarea")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-textarea")
public class KolTextarea extends Component {
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
	 * Passt die Höhe des Eingabefeldes automatisch an den Füllstand an.
	 *
	 * @param value Optional<String>
	 */
	public void setAdjustHeight(final Optional<String> value) {
		getElement().setProperty("_adjust-height", value);
	}

	/**
	 * Passt die Höhe des Eingabefeldes automatisch an den Füllstand an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAdjustHeight() {
		return getElement().getProperty("_adjust-height", null);
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
	 * Aktiviert den Zeichenanzahlzähler am unteren Rand des Eingabefeldes.
	 *
	 * @param value Optional<String>
	 */
	public void setHasCounter(final Optional<String> value) {
		getElement().setProperty("_has-counter", value);
	}

	/**
	 * Aktiviert den Zeichenanzahlzähler am unteren Rand des Eingabefeldes.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCounter() {
		return getElement().getProperty("_has-counter", null);
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
	 * Setzt die maximale Zeichenanzahl.
	 *
	 * @param value Optional<String>
	 */
	public void setMaxLength(final Optional<String> value) {
		getElement().setProperty("_max-length", value);
	}

	/**
	 * Setzt die maximale Zeichenanzahl.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMaxLength() {
		return getElement().getProperty("_max-length", null);
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
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 *
	 * @param value Optional<String>
	 */
	public void setPlaceholder(final Optional<String> value) {
		getElement().setProperty("_placeholder", value);
	}

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPlaceholder() {
		return getElement().getProperty("_placeholder", null);
	}

	/**
	 * Setzt das Eingabefeld in den schreibgeschützten Modus.
	 *
	 * @param value Optional<String>
	 */
	public void setReadOnly(final Optional<String> value) {
		getElement().setProperty("_read-only", value);
	}

	/**
	 * Setzt das Eingabefeld in den schreibgeschützten Modus.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getReadOnly() {
		return getElement().getProperty("_read-only", null);
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
	 * Gibt an, ob die Größe des Eingabefeldes von Nutzer:innen geändert werden kann. (https://developer.mozilla.org/de/docs/Web/CSS/resize)
	 *
	 * @param value Optional<String>
	 */
	public void setResize(final Optional<String> value) {
		getElement().setProperty("_resize", value);
	}

	/**
	 * Gibt an, ob die Größe des Eingabefeldes von Nutzer:innen geändert werden kann. (https://developer.mozilla.org/de/docs/Web/CSS/resize)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getResize() {
		return getElement().getProperty("_resize", null);
	}

	/**
	 * Gibt die Anzahl der anzuzeigenden Zeilen des Eingabefeldes an.
	 *
	 * @param value Optional<String>
	 */
	public void setRows(final Optional<String> value) {
		getElement().setProperty("_rows", value);
	}

	/**
	 * Gibt die Anzahl der anzuzeigenden Zeilen des Eingabefeldes an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRows() {
		return getElement().getProperty("_rows", null);
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
