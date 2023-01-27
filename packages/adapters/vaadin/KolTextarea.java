package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die Komponente **Textarea** stellt ein größeres Eingabefeld für Inhalte zur Verfügung. Im Gegensatz zum
InputText können hier auch umfangreiche Inhalte eingegeben werden, die auch mit Zeilenumbrüchen versehen sein können.
 */

@Tag("kol-textarea")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-textarea")
public class KolTextarea extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	public void set_accessKey(string | undefined _accessKey) {
		getElement().setProperty("_access-key", _accessKey);
	}

	/**
	 * Passt die Höhe des Eingabefeldes automatisch an den Füllstand an.
	 */
	public void set_adjustHeight(boolean | undefined _adjustHeight) {
		getElement().setProperty("_adjust-height", _adjustHeight);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	public void set_alert(boolean | undefined _alert) {
		getElement().setProperty("_alert", _alert);
	}

	/**
	 * Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.
	 */
	public void set_disabled(boolean | undefined _disabled) {
		getElement().setProperty("_disabled", _disabled);
	}

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	public void set_error(string | undefined _error) {
		getElement().setProperty("_error", _error);
	}

	/**
	 * Gibt an, ob am unteren Rand des Eingabefeldes die Anzahl der Zeichen angezeigt werden soll.
	 */
	public void set_hasCounter(boolean | undefined _hasCounter) {
		getElement().setProperty("_has-counter", _hasCounter);
	}

	/**
	 * Gibt an, ob das Eingabefeld kein sichtbares Label haben soll.
	 */
	public void set_hideLabel(boolean | undefined _hideLabel) {
		getElement().setProperty("_hide-label", _hideLabel);
	}

	/**
	 * Gibt den Text für eine Hinweistext an.
	 */
	public void set_hint(string | undefined _hint) {
		getElement().setProperty("_hint", _hint);
	}

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	public void set_id(String _id) {
		getElement().setProperty("_id", _id);
	}

	/**
	 * Gibt an, wie viele Zeichen man maximal eingeben kann.
	 */
	public void set_maxLength(number | undefined _maxLength) {
		getElement().setProperty("_max-length", _maxLength);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	public void set_name(string | undefined _name) {
		getElement().setProperty("_name", _name);
	}

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 */
	public void set_placeholder(string | undefined _placeholder) {
		getElement().setProperty("_placeholder", _placeholder);
	}

	/**
	 * Gibt an, ob das Eingabefeld nur lesend ist.
	 */
	public void set_readOnly(boolean | undefined _readOnly) {
		getElement().setProperty("_read-only", _readOnly);
	}

	/**
	 * Gibt an, ob das Eingabefeld ein Pflichtfeld ist.
	 */
	public void set_required(boolean | undefined _required) {
		getElement().setProperty("_required", _required);
	}

	/**
	 * Gibt an, ob die Größe des Eingabefeldes geändert werden kann. (https://developer.mozilla.org/de/docs/Web/CSS/resize)
	 */
	public void set_resize("both" | "horizontal" | "none" | "vertical" | undefined _resize) {
		getElement().setProperty("_resize", _resize);
	}

	/**
	 * Gibt die Anzahl der anzuzeigenden Zeilen des Eingabefeldes an.
	 */
	public void set_rows(number | undefined _rows) {
		getElement().setProperty("_rows", _rows);
	}

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	public void set_tabIndex(number | undefined _tabIndex) {
		getElement().setProperty("_tab-index", _tabIndex);
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	public void set_touched(boolean | undefined _touched) {
		getElement().setProperty("_touched", _touched);
	}

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 */
	public void set_value(string | undefined _value) {
		getElement().setProperty("_value", _value);
	}

}