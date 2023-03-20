package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Alert**-Komponente gibt ein optisches Feedback an die Nutzer:innen. Sie besteht aus einem farblich gestalteten Container, einer Überschrift, einem Inhaltstext sowie einem Icon. Das verwendete Icon und die farbliche Gestaltung sind abhängig vom Typ `_type` des Alert.
 */

@Tag("kol-alert")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.2")
@JsModule("@public-ui/components/dist/components/kol-alert")
public class KolAlert extends Component {
	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 *
	 * @param value String
	 */
	public void setAlert(final String value) {
		getElement().setProperty("_alert", value);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 *
	 * @return String
	 */
	public String getAlert() {
		return getElement().getProperty("_alert", null);
	}

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 *
	 * @param value String
	 */
	public void setHasCloser(final String value) {
		getElement().setProperty("_has-closer", value);
	}

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 *
	 * @return String
	 */
	public String getHasCloser() {
		return getElement().getProperty("_has-closer", null);
	}

	/**
	 * Gibt den Titel der Meldung an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value);
	}

	/**
	 * Gibt den Titel der Meldung an.
	 *
	 * @return String
	 */
	public String getHeading() {
		return getElement().getProperty("_heading", null);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 *
	 * @return String
	 */
	public String getLevel() {
		return getElement().getProperty("_level", null);
	}

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 *
	 * @param value String
	 */
	public void setType(final String value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 *
	 * @return String
	 */
	public String getType() {
		return getElement().getProperty("_type", null);
	}

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 *
	 * @return String
	 */
	public String getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
