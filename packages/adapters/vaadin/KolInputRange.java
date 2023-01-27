package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der Input-Typ **Range** erzeugt ein interaktives Element, mit dem Werte durch Verschieben eines Reglers verändert werden können.
 */

@Tag("kol-input-range")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-input-range")
public class KolInputRange extends Component {
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
	 * Gibt die Liste der Vorschlagswörter an.
	 */
	public void set_list(Option<number>[] | string | undefined _list) {
		getElement().setProperty("_list", _list);
	}

	/**
	 * Gibt den Maximalwert des Eingabefeldes an.
	 */
	public void set_max(number | undefined _max) {
		getElement().setProperty("_max", _max);
	}

	/**
	 * Gibt den Minimalwert des Eingabefeldes an.
	 */
	public void set_min(number | undefined _min) {
		getElement().setProperty("_min", _min);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	public void set_name(string | undefined _name) {
		getElement().setProperty("_name", _name);
	}

	/**
	 * Gibt die Schrittweite der Wertveränderung an.
	 */
	public void set_step(number | undefined _step) {
		getElement().setProperty("_step", _step);
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
	public void set_value(number | undefined _value) {
		getElement().setProperty("_value", _value);
	}

}