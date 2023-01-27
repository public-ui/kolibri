package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der Input-Typ **Password** erzeugt ein Eingabefeld für Passwörter. Die Eingabe wird über Punktsymbole maskiert.
 */

@Tag("kol-input-password")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-input-password")
public class KolInputPassword extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	public void set_accessKey(string | undefined _accessKey) {
		getElement().setProperty("_access-key", _accessKey);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	public void set_alert(boolean | undefined _alert) {
		getElement().setProperty("_alert", _alert);
	}

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 */
	public void set_autoComplete("off" | "on" | undefined _autoComplete) {
		getElement().setProperty("_auto-complete", _autoComplete);
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
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 */
	public void set_icon(string | undefined | { right: string | KoliBriCustomIcon; left?: string | KoliBriCustomIcon | undefined; } | { right?: string | KoliBriCustomIcon | undefined; left: string | KoliBriCustomIcon; } _icon) {
		getElement().setProperty("_icon", _icon);
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
	 * Gibt ein Prüfpattern für das Eingabefeld an.
	 */
	public void set_pattern(string | undefined _pattern) {
		getElement().setProperty("_pattern", _pattern);
	}

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 */
	public void set_placeholder(string | undefined _placeholder) {
		getElement().setProperty("_placeholder", _placeholder);
	}

	/**
	 * Gibt an, ob die Eingabefeld nur lesend ist.
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
	 * Gibt an, wie viele Zeichen man eingeben kann.
	 */
	public void set_size(number | undefined _size) {
		getElement().setProperty("_size", _size);
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