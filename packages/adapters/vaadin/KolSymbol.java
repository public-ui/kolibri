package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Symbol**-Komponente ermöglicht das Rendern beliebiger Symbole mit steuerbarer Ausgabe durch den Screenreader.
 */

@Tag("kol-symbol")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-symbol")
public class KolSymbol extends Component {
	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value.toString());
	}

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		var value = getElement().getProperty("_aria-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Sets the visible or semantic label of the component (e.g. Aria label, Label, Headline, Caption, Summary, etc.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Sets the visible or semantic label of the component (e.g. Aria label, Label, Headline, Caption, Summary, etc.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setSymbol(final String value) {
		getElement().setProperty("_symbol", value.toString());
	}

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSymbol() {
		var value = getElement().getProperty("_symbol", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
