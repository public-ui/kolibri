package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Der Input-Typ **_Checkbox_** generiert eine rechteckige Box, die durch Anklicken aktiviert und wieder deaktiviert wird. In aktiviertem Zustand befindet sich ein farbiger Haken in der Box.

Eine optische Alternative zur Standard-Checkbox stellt die Ausgabe als **_Switch_** dar. Hierbei wird die Checkbox zu einem Schieberegler gewandelt, der bei Anklicken nach rechts (aktiv) bzw. nach links (inaktiv) verschoben wird.
 */

@Tag("kol-input-checkbox")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-input-checkbox")
public class KolInputCheckbox extends Component {
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
	 * Gibt an, ob die Checkbox ausgewählt ist oder nicht.
	 */
	public void set_checked(boolean | undefined _checked) {
		getElement().setProperty("_checked", _checked);
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
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	public void set_id(String _id) {
		getElement().setProperty("_id", _id);
	}

	/**
	 * Gibt an, ob die Checkbox weder ausgewählt noch nicht ausgewählt ist.
	 */
	public void set_indeterminate(boolean | undefined _indeterminate) {
		getElement().setProperty("_indeterminate", _indeterminate);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	public void set_name(string | undefined _name) {
		getElement().setProperty("_name", _name);
	}

	/**
	 * Gibt an, ob die Checkbox ein Pflichtfeld ist.
	 */
	public void set_required(boolean | undefined _required) {
		getElement().setProperty("_required", _required);
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
	 * Gibt an, welchen Type das Input haben soll.
	 */
	public void set_type("checkbox" | "switch" | undefined _type) {
		getElement().setProperty("_type", _type);
	}

	/**
	 * Gibt den Wert der Checkbox an.
	 */
	public void set_value(string | undefined _value) {
		getElement().setProperty("_value", _value);
	}

	/**
	 * Gibt an, welchen Type das Input haben soll.
	 */
	public void set_variant("checkbox" | "switch" | undefined _variant) {
		getElement().setProperty("_variant", _variant);
	}

}