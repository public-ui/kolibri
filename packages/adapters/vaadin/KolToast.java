package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit der **Toast**-Komponente geben Sie ein optisches Feedback an die Nutzer:innen. Sie wird nur für einen kurzen Zeitraum am Kopf des Browserfenster angezeigt und verschwindet danach automatisch.

Ein **Toast** wird nach dem Laden der Webseite am oberen Rand des Browserfenster für zehn Sekunden angezeigt. Mit Ausblenden des **Toasts** wird dieser automatisch aus dem DOM entfernt. Wird er erneut benötigt, muss er z.B. über eine JavaScript-Funktion nachgeladen werden.
 */

@Tag("kol-toast")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.12")
@JsModule("@public-ui/components/dist/components/kol-toast")
public class KolToast extends Component {
	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 *
	 * @param value Optional<String>
	 */
	public void setAlert(final Optional<String> value) {
		getElement().setProperty("_alert", value);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlert() {
		return getElement().getProperty("_alert", null);
	}

	/**
	 * Gibt an, ob die Komponente einen Schließen-Schalter hat.
	 *
	 * @param value Optional<String>
	 */
	public void setHasCloser(final Optional<String> value) {
		getElement().setProperty("_has-closer", value);
	}

	/**
	 * Gibt an, ob die Komponente einen Schließen-Schalter hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCloser() {
		return getElement().getProperty("_has-closer", null);
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @param value Optional<String>
	 */
	public void setHeading(final Optional<String> value) {
		getElement().setProperty("_heading", value);
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeading() {
		return getElement().getProperty("_heading", null);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setLevel(final Optional<String> value) {
		getElement().setProperty("_level", value);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLevel() {
		return getElement().getProperty("_level", null);
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @param value Optional<String>
	 */
	public void setShow(final Optional<String> value) {
		getElement().setProperty("_show", value);
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShow() {
		return getElement().getProperty("_show", null);
	}

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setShowDuration(final Optional<String> value) {
		getElement().setProperty("_show-duration", value);
	}

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShowDuration() {
		return getElement().getProperty("_show-duration", null);
	}

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 *
	 * @param value Optional<String>
	 */
	public void setType(final Optional<String> value) {
		getElement().setProperty("_type", value);
	}

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		return getElement().getProperty("_type", null);
	}
}
