package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Detail**-Komponente können weiterführende Informationen zunächst mit einem kurzen Einleitungstext angezeigt werden, die erst nach Klick
durch die Nutzer:innen auf ein Pfeil-Icon in voller Größe aufgeklappt werden.

Die **Detail**-Komponente stellt sich standardmäßig als einzeiliges Layout-Element dar, das aus einem Pfeil-Icon und einem nachfolgenden,
kurzen Einleitungstext gebildet wird. Der eigentliche Inhalt der Komponente wird erst nach Klick auf das Icon nach unten hin geöffnet. Das Pfeil-Icon ändert dabei
seine Ausrichtung von **_rechts_** nach **_unten_**.<br/>Analog lässt sich die Komponente auch wieder schließen und der Inhalt damit verbergen.
 */

@Tag("kol-details")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-details")
public class KolDetails extends Component {
	/**
	 * Gibt an, ob die Detailbeschreibung geöffnet oder geschlossen ist.
	 */
	public void set_open(boolean | undefined _open) {
		getElement().setProperty("_open", _open);
	}

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 */
	public void set_summary(String _summary) {
		getElement().setProperty("_summary", _summary);
	}

}