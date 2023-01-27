package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Accordion**-Komponente ist ein Aufklapp-Menü. Klickt man auf den Kopfbereich, bestehend aus Icon und Überschrift, öffnet sich ein Textfeld mit zusätzlichen Informationen. Somit ist es ein interaktives Navigationselement, welches dazu dient, umfangreiche Inhalte platzsparend darzustellen.

Accordions kommen immer dann zum Einsatz, wenn einem thematischen Oberbegriff zugeordnete Inhalte angezeigt oder verborgen werden sollen. Sie erlauben umfangreichere Detailinformationen zu einem Oberbegriff, als es aus Gründen der Übersichtlichkeit eigentlich sinnvoll wäre. Sie überlassen es den Besucher:innen selbst, ob sie sich diese Informationen anzeigen lassen möchten.
 */

@Tag("kol-accordion")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-accordion")
public class KolAccordion extends Component {
	/**
	 * Gibt die Überschrift des Accordions an.
	 */
	public void set_heading(String _heading) {
		getElement().setProperty("_heading", _heading);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	public void set_level(1 | 2 | 3 | 4 | 5 | 6 | undefined _level) {
		getElement().setProperty("_level", _level);
	}

	/**
	 * Gibt an, ob das Accordion geöffnet ist.
	 */
	public void set_open(boolean | undefined _open) {
		getElement().setProperty("_open", _open);
	}

}