package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Modal**-Komponente können zusätzliche Informationen oder auch Eingabeformulare in einem Dialogfenster angezeigt werden. Ein offenes **Modal** kann via **ESC** geschlossen werden.
Die **Modal**-Komponente ist standardmäßig versteckt. Sie wird i.d.R. erst nach Klick auf einen Button oder sonstigem Trigger angezeigt. Dabei wird der Hintergrund des Fensters deaktiviert und allein der Inhalt des Modal-Fensters ist aktiv.
 */

@Tag("kol-modal")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-modal")
public class KolModal extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final Optional<String> value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Setzt die Breite des Modals. (max-width: 100%).
	 *
	 * @param value Optional<String>
	 */
	public void setWidth(final Optional<String> value) {
		getElement().setProperty("_width", value);
	}

	/**
	 * Setzt die Breite des Modals. (max-width: 100%).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getWidth() {
		return getElement().getProperty("_width", null);
	}
}
