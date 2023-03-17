package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Modal**-Komponente können zusätzliche Informationen oder auch Eingabeformulare in einem
Dialogfenster angezeigt werden. Sie wird nach Klick auf einen Button aufgerufen und über ein eigenes
Close-Icon wieder geschlossen. Die **Modal**-Komponente basiert auf der **Card**-Komponente und ist standardmäßig versteckt. Sie wird i.d.R.
erst nach Klick auf einen Button oder sonstigem Trigger angezeigt. Dabei wird der Hintergrund des Fensters deaktiviert und allein der Inhalt
des Modal-Fensters ist aktiv. Das **Modal**-Fenster wird über ein **Close-Icon** oben rechts im Kopfbereich wieder
geschlossen.
 */

@Tag("kol-modal")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-modal")
public class KolModal extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @return String
	 */
	public String getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Gibt an, ob das Modal angezeigt wird.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value);
	}

	/**
	 * Gibt an, ob das Modal angezeigt wird.
	 *
	 * @return String
	 */
	public String getShow() {
		return getElement().getProperty("_show", null);
	}

	/**
	 * Gibt an, wie breit der Anzeigebereich sein soll (<= max-width: 100%).
	 *
	 * @param value String
	 */
	public void setWidth(final String value) {
		getElement().setProperty("_width", value);
	}

	/**
	 * Gibt an, wie breit der Anzeigebereich sein soll (<= max-width: 100%).
	 *
	 * @return String
	 */
	public String getWidth() {
		return getElement().getProperty("_width", null);
	}
}
