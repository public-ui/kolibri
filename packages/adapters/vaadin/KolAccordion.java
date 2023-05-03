package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Accordion**-Komponente ist ein Aufklapp-Menü. Klickt man auf den Kopfbereich, bestehend aus Icon und Überschrift, klappt der Inhalt mit zusätzlichen Informationen auf. Somit ist es ein interaktives Navigationselement, welches dazu dient, umfangreiche Inhalte platzsparend darzustellen.

Accordions kommen immer dann zum Einsatz, wenn einem thematischen Oberbegriff zugeordnete Inhalte angezeigt oder verborgen werden sollen. Sie erlauben umfangreichere Detailinformationen zu einem Oberbegriff, als es aus Gründen der Übersichtlichkeit eigentlich sinnvoll wäre. Sie überlassen es den Besucher:innen selbst, ob sie sich diese Informationen anzeigen lassen möchten.
 */

@Tag("kol-accordion")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-accordion")
public class KolAccordion extends Component {
	/**
	 * Gibt die Überschrift des Accordions an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value);
	}

	/**
	 * Gibt die Überschrift des Accordions an.
	 *
	 * @return String
	 */
	public String getHeading() {
		return getElement().getProperty("_heading", null);
	}

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value);
	}

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 *
	 * @return String
	 */
	public String getLevel() {
		return getElement().getProperty("_level", null);
	}

	/**
	 * Gibt an, ob das Accordion geöffnet ist.
	 *
	 * @param value String
	 */
	public void setOpen(final String value) {
		getElement().setProperty("_open", value);
	}

	/**
	 * Gibt an, ob das Accordion geöffnet ist.
	 *
	 * @return String
	 */
	public String getOpen() {
		return getElement().getProperty("_open", null);
	}
}
