package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Progress**-Komponente erzeugt einen Fortschrittsbalken, über den eine optische Rückmeldung gegeben werden kann.
 */

@Tag("kol-progress")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-progress")
public class KolProgress extends Component {
	/**
	 * Setzt die Bezeichnung der Fortschrittsanzeige.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt die Bezeichnung der Fortschrittsanzeige.
	 *
	 * @return String
	 */
	public String getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 *
	 * @param value double
	 */
	public void setMax(final double value) {
		getElement().setProperty("_max", value);
	}

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 *
	 * @return double
	 */
	public double getMax() {
		return getElement().getProperty("_max", null);
	}

	/**
	 * Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 *
	 * @param value String
	 */
	public void setType(final String value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 *
	 * @return String
	 */
	public String getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt)
	 *
	 * @param value String
	 */
	public void setUnit(final String value) {
		getElement().setProperty("_unit", value);
	}

	/**
	 * Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt)
	 *
	 * @return String
	 */
	public String getUnit() {
		return getElement().getProperty("_unit", null);
	}

	/**
	 * Gibt an, wie weit die Anzeige fortgeschritten ist.
	 *
	 * @param value double
	 */
	public void setValue(final double value) {
		getElement().setProperty("_value", value);
	}

	/**
	 * Gibt an, wie weit die Anzeige fortgeschritten ist.
	 *
	 * @return double
	 */
	public double getValue() {
		return getElement().getProperty("_value", null);
	}
}
