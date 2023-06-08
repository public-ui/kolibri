package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Alert**-Komponente gibt ein optisches Feedback an die Nutzer:innen. Sie besteht aus einem farblich gestalteten Container, einer Überschrift, einem Inhaltstext sowie einem Icon. Das verwendete Icon und die farbliche Gestaltung sind abhängig vom Typ `_type` des Alert.
 */

@Tag("kol-alert")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-alert")
public class KolAlert extends Component {
	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 *
	 * @param value Optional<String>
	 */
	public void setAlert(final Optional<String> value) {
		getElement().setProperty("_alert", value);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlert() {
		return getElement().getProperty("_alert", null);
	}

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 *
	 * @param value Optional<String>
	 */
	public void setHasCloser(final Optional<String> value) {
		getElement().setProperty("_has-closer", value);
	}

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCloser() {
		return getElement().getProperty("_has-closer", null);
	}

	/**
	 * Gibt den Titel der Meldung an.
	 *
	 * @param value Optional<String>
	 */
	public void setHeading(final Optional<String> value) {
		getElement().setProperty("_heading", value);
	}

	/**
	 * Gibt den Titel der Meldung an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeading() {
		return getElement().getProperty("_heading", null);
	}

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 *
	 * @param value Optional<String>
	 */
	public void setLevel(final Optional<String> value) {
		getElement().setProperty("_level", value);
	}

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLevel() {
		return getElement().getProperty("_level", null);
	}

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 *
	 * @param value Optional<String>
	 */
	public void setType(final Optional<String> value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
