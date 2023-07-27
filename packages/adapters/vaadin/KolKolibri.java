package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Diese Komponente implementiert das Logo von KoliBri.
 */

@Tag("kol-kolibri")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-kolibri")
public class KolKolibri extends Component {
	/**
	 * Gibt an, ob das Bild-Logo farblich animiert werden soll.
	 *
	 * @param value String
	 */
	public void setAnimate(final String value) {
		getElement().setProperty("_animate", value.toString());
	}

	/**
	 * Gibt an, ob das Bild-Logo farblich animiert werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAnimate() {
		var value = getElement().getProperty("_animate", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, in welcher Farbe das Bild-Logo initial dargestellt werden soll.
	 *
	 * @param value String
	 */
	public void setColor(final String value) {
		getElement().setProperty("_color", value.toString());
	}

	/**
	 * Gibt an, in welcher Farbe das Bild-Logo initial dargestellt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getColor() {
		var value = getElement().getProperty("_color", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob die Logo-Beschriftung angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setLabeled(final String value) {
		getElement().setProperty("_labeled", value.toString());
	}

	/**
	 * Gibt an, ob die Logo-Beschriftung angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabeled() {
		var value = getElement().getProperty("_labeled", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
