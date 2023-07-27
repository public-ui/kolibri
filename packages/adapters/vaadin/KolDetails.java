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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-details")
public class KolDetails extends Component {
	/**
	 * Defines the summary label.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the summary label.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob die Komponente entweder geöffnet oder geschlossen ist.
	 *
	 * @param value String
	 */
	public void setOpen(final String value) {
		getElement().setProperty("_open", value.toString());
	}

	/**
	 * Gibt an, ob die Komponente entweder geöffnet oder geschlossen ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOpen() {
		var value = getElement().getProperty("_open", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 *
	 * @param value String
	 */
	public void setSummary(final String value) {
		getElement().setProperty("_summary", value.toString());
	}

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSummary() {
		var value = getElement().getProperty("_summary", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
