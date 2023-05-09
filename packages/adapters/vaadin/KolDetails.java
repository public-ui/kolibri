package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Detail**-Komponente können weiterführende Informationen zunächst mit einem kurzen Einleitungstext angezeigt werden, die erst nach Klick
durch die Nutzer:innen auf ein Pfeil-Icon in voller Größe aufgeklappt werden.

Die **Detail**-Komponente stellt sich standardmäßig als einzeiliges Layout-Element dar, das aus einem Pfeil-Icon und einem nachfolgenden,
kurzen Einleitungstext gebildet wird. Der eigentliche Inhalt der Komponente wird erst nach Klick auf den Kopfbereich nach unten hin geöffnet. Das Pfeil-Icon ändert dabei
seine Ausrichtung von **_rechts_** nach **_unten_**.
Analog lässt sich die Komponente auch wieder schließen und der Inhalt damit verbergen.
 */

@Tag("kol-details")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.22")
@JsModule("@public-ui/components/dist/components/kol-details")
public class KolDetails extends Component {
	/**
	 * Gibt an, ob die Detailbeschreibung geöffnet oder geschlossen ist.
	 *
	 * @param value String
	 */
	public void setOpen(final String value) {
		getElement().setProperty("_open", value);
	}

	/**
	 * Gibt an, ob die Detailbeschreibung geöffnet oder geschlossen ist.
	 *
	 * @return String
	 */
	public String getOpen() {
		return getElement().getProperty("_open", null);
	}

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 *
	 * @param value String
	 */
	public void setSummary(final String value) {
		getElement().setProperty("_summary", value);
	}

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 *
	 * @return String
	 */
	public String getSummary() {
		return getElement().getProperty("_summary", null);
	}
}
