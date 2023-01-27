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
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-modal")
public class KolModal extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	public void set_ariaLabel(String _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt an, ob das Modal angezeigt wird.
	 */
	public void set_show(boolean | undefined _show) {
		getElement().setProperty("_show", _show);
	}

	/**
	 * Gibt an, wie breit der Anzeigebereich sein soll (<= max-width: 100%).
	 */
	public void set_width(string | undefined _width) {
		getElement().setProperty("_width", _width);
	}

}