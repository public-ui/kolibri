package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Progress**-Komponente erzeugt einen Fortschrittsbalken, über den eine optische Rückmeldung gegeben werden kann.
 */

@Tag("kol-progress")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-progress")
public class KolProgress extends Component {
	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 */
	public void set_max(double _max) {
		getElement().setProperty("_max", _max);
	}

	/**
	 * Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 */
	public void set_type("bar" | "cycle" | undefined _type) {
		getElement().setProperty("_type", _type);
	}

	/**
	 * Gibt die Einheit der Fortschrittswerte an.
	 */
	public void set_unit(string | undefined _unit) {
		getElement().setProperty("_unit", _unit);
	}

	/**
	 * Gibt an, wie weit die Anzeige fortgeschritten ist.
	 */
	public void set_value(double _value) {
		getElement().setProperty("_value", _value);
	}

}