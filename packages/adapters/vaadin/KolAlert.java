package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Alert**-Komponente gibt ein optisches Feedback an die Nutzer:innen. Sie besteht aus einem farblich gestalteten Container, einer Überschrift, einem Inhaltstext sowie einem Icon. Das verwendete Icon und die farbliche Gestaltung sind abhängig vom Typ `_type` des Alert.
 */

@Tag("kol-alert")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-alert")
public class KolAlert extends Component {
	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 */
	public void set_alert(boolean | undefined _alert) {
		getElement().setProperty("_alert", _alert);
	}

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 */
	public void set_hasCloser(boolean | undefined _hasCloser) {
		getElement().setProperty("_has-closer", _hasCloser);
	}

	/**
	 * Gibt den Titel der Meldung an.
	 */
	public void set_heading(string | undefined _heading) {
		getElement().setProperty("_heading", _heading);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	public void set_level(1 | 2 | 3 | 4 | 5 | 6 | undefined _level) {
		getElement().setProperty("_level", _level);
	}

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 */
	public void set_type("default" | "error" | "info" | "success" | "warning" | undefined _type) {
		getElement().setProperty("_type", _type);
	}

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 */
	public void set_variant("card" | "msg" | undefined _variant) {
		getElement().setProperty("_variant", _variant);
	}

}