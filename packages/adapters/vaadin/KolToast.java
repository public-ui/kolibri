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
@NpmPackage(value = "@public-ui/components", version = "1.7.0-rc.3")
@JsModule("@public-ui/components/dist/components/kol-toast")
public class KolToast extends Component {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the current toast status.
	 *
	 * @param value String
	 */
	public void setStatus(final String value) {
		getElement().setProperty("_status", value.toString());
	}

	/**
	 * Defines the current toast status.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getStatus() {
		var value = getElement().getProperty("_status", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines either the type of the component or of the components interactive element.
	 *
	 * @param value String
	 */
	public void setType(final String value) {
		getElement().setProperty("_type", value.toString());
	}

	/**
	 * Defines either the type of the component or of the components interactive element.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getType() {
		var value = getElement().getProperty("_type", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
