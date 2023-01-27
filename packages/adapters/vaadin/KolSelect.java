package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Select**-Komponente erzeugt eine Auswahlliste, aus der eine oder mehrere vorgegebene Möglichkeiten ausgewählt werden können.
 */

@Tag("kol-select")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-select")
public class KolSelect extends Component {
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
	 * Gibt an, ob eine individuelle Höhe übergeben werden soll.
	 */
	public void set_height(string | undefined _height) {
		getElement().setProperty("_height", _height);
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
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	public void set_list(SelectOption<string>[] | string _list) {
		getElement().setProperty("_list", _list);
	}

	/**
	 * Gibt an, ob mehrere Werte eingegeben werden können.
	 */
	public void set_multiple(boolean | undefined _multiple) {
		getElement().setProperty("_multiple", _multiple);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	public void set_name(string | undefined _name) {
		getElement().setProperty("_name", _name);
	}

	/**
	 * Gibt an, ob die Selectbox ein Pflichtfeld ist.
	 */
	public void set_required(boolean | undefined _required) {
		getElement().setProperty("_required", _required);
	}

	/**
	 * Gibt an, wie viele Optionen im Drop-Down-Menü sichtbar sein sollen.
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
	public void set_value(string | undefined | unknown[] _value) {
		getElement().setProperty("_value", _value);
	}

}