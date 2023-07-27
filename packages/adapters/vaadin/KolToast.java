package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Mit der **Toast**-Komponente geben Sie ein optisches Feedback an die Nutzer:innen. Sie wird nur für einen kurzen Zeitraum am Kopf des Browserfenster angezeigt und verschwindet danach automatisch.

Ein **Toast** wird nach dem Laden der Webseite am oberen Rand des Browserfenster für zehn Sekunden angezeigt. Mit Ausblenden des **Toasts** wird dieser automatisch aus dem DOM entfernt. Wird er erneut benötigt, muss er z.B. über eine JavaScript-Funktion nachgeladen werden.
 */

@Tag("kol-toast")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-toast")
public class KolToast extends Component {
	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 *
	 * @param value String
	 */
	public void setAlert(final String value) {
		getElement().setProperty("_alert", value.toString());
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlert() {
		var value = getElement().getProperty("_alert", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob die Komponente einen Schließen-Schalter hat.
	 *
	 * @param value String
	 */
	public void setHasCloser(final String value) {
		getElement().setProperty("_has-closer", value.toString());
	}

	/**
	 * Gibt an, ob die Komponente einen Schließen-Schalter hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCloser() {
		var value = getElement().getProperty("_has-closer", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value.toString());
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeading() {
		var value = getElement().getProperty("_heading", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the text to show in the Toast.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the text to show in the Toast.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value.toString());
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLevel() {
		var value = getElement().getProperty("_level", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value.toString());
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShow() {
		var value = getElement().getProperty("_show", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 *
	 * @param value String
	 */
	public void setShowDuration(final String value) {
		getElement().setProperty("_show-duration", value.toString());
	}

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShowDuration() {
		var value = getElement().getProperty("_show-duration", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 *
	 * @param value String
	 */
	public void setType(final String value) {
		getElement().setProperty("_type", value.toString());
	}

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		var value = getElement().getProperty("_type", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
