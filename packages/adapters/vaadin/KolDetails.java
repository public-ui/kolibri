package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Mit Hilfe der **Detail**-Komponente können weiterführende Informationen zunächst mit einem kurzen Einleitungstext angezeigt werden, die erst nach Klick
durch die Nutzer:innen auf ein Pfeil-Icon in voller Größe aufgeklappt werden.

Die **Detail**-Komponente stellt sich standardmäßig als einzeiliges Layout-Element dar, das aus einem Pfeil-Icon und einem nachfolgenden,
kurzen Einleitungstext gebildet wird. Der eigentliche Inhalt der Komponente wird erst nach Klick auf den Kopfbereich nach unten hin geöffnet. Das Pfeil-Icon ändert dabei
seine Ausrichtung von **_rechts_** nach **_unten_**.
Analog lässt sich die Komponente auch wieder schließen und der Inhalt damit verbergen.
 */

@Tag("kol-details")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-details")
public class KolDetails extends Component {
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
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 *
	 * @param value String
	 */
	public void setOpen(final String value) {
		getElement().setProperty("_open", value.toString());
	}

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOpen() {
		var value = getElement().getProperty("_open", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt die Zusammenfassung der Detailbeschreibung an.
	 *
	 * @param value String
	 */
	public void setSummary(final String value) {
		getElement().setProperty("_summary", value.toString());
	}

	/**
	 * Deprecated: Gibt die Zusammenfassung der Detailbeschreibung an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSummary() {
		var value = getElement().getProperty("_summary", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
