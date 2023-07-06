package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Progress**-Komponente erzeugt einen Fortschrittsbalken, über den eine optische Rückmeldung gegeben werden kann.
 */

@Tag("kol-progress")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.9")
@JsModule("@public-ui/components/dist/components/kol-progress")
public class KolProgress extends Component {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value Optional<String>
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 *
	 * @param value String
	 */
	public void setMax(final Optional<String> value) {
		getElement().setProperty("_max", value);
	}

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMax() {
		return getElement().getProperty("_max", null);
	}

	/**
	 * Deprecated: Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 *
	 * @param value Optional<String>
	 */
	public void setType(final Optional<String> value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Deprecated: Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt)
	 *
	 * @param value Optional<String>
	 */
	public void setUnit(final Optional<String> value) {
		getElement().setProperty("_unit", value);
	}

	/**
	 * Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getUnit() {
		return getElement().getProperty("_unit", null);
	}

	/**
	 * Gibt an, wie weit die Anzeige fortgeschritten ist.
	 *
	 * @param value String
	 */
	public void setValue(final Optional<String> value) {
		getElement().setProperty("_value", value);
	}

	/**
	 * Gibt an, wie weit die Anzeige fortgeschritten ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getValue() {
		return getElement().getProperty("_value", null);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
