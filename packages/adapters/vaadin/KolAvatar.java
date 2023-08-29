package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Avatar**-Komponente zeigt entweder ein kleines Bild des Users oder dessen Initialen an, falls kein Bild vorhanden ist.
 */

@Tag("kol-avatar")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-avatar")
public class KolAvatar extends Component {
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
	 * Sets the image `src` attribute to the given string.
	 *
	 * @param value String
	 */
	public void setSrc(final String value) {
		getElement().setProperty("_src", value.toString());
	}

	/**
	 * Sets the image `src` attribute to the given string.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSrc() {
		var value = getElement().getProperty("_src", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
