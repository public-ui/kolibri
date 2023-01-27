package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit der **Toast**-Komponente geben Sie ein optisches Feedback an die Nutzer:innen. Sie wird nur für einen kurzen Zeitraum am Kopf des Browserfenster angezeigt und verschwindet danach automatisch.

Ein **Toast** wird nach dem Laden der Webseite am oberen Rand des Browserfenster für fünf Sekunden angezeigt. Mit Ausblenden des **Toasts** wird dieser automatisch aus dem DOM entfernt. Wird er erneut benötigt, muss er z.B. über eine JavaScript-Funktion nachgeladen werden.
 */

@Tag("kol-toast")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-toast")
public class KolToast extends Component {
	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 */
	public void set_alert(boolean | undefined _alert) {
		getElement().setProperty("_alert", _alert);
	}

	/**
	 * Gibt an, ob der Toast ein Schließen-Icon hat.
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
	 * Gibt an, ob der Toast eingeblendet wird.
	 */
	public void set_show(boolean | undefined _show) {
		getElement().setProperty("_show", _show);
	}

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 */
	public void set_showDuration(number | undefined _showDuration) {
		getElement().setProperty("_show-duration", _showDuration);
	}

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 */
	public void set_type("default" | "error" | "info" | "success" | "warning" | undefined _type) {
		getElement().setProperty("_type", _type);
	}

}