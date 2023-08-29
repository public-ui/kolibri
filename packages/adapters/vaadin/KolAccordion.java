package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Accordion**-Komponente ist ein Aufklapp-Menü. Klickt man auf den Kopfbereich, bestehend aus Icon und Überschrift, klappt der Inhalt mit zusätzlichen Informationen auf. Somit ist es ein interaktives Navigationselement, welches dazu dient, umfangreiche Inhalte platzsparend darzustellen.

Accordions kommen immer dann zum Einsatz, wenn einem thematischen Oberbegriff zugeordnete Inhalte angezeigt oder verborgen werden sollen. Sie erlauben umfangreichere Detailinformationen zu einem Oberbegriff, als es aus Gründen der Übersichtlichkeit eigentlich sinnvoll wäre. Sie überlassen es den Besucher:innen selbst, ob sie sich diese Informationen anzeigen lassen möchten.
 */

@Tag("kol-accordion")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-accordion")
public class KolAccordion extends Component {
	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value.toString());
	}

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeading() {
		var value = getElement().getProperty("_heading", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

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
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value.toString());
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLevel() {
		var value = getElement().getProperty("_level", null);
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
}
