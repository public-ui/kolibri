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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.25")
@JsModule("@public-ui/components/dist/components/kol-avatar")
public class KolAvatar extends Component {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the image source to render
	 *
	 * @param value String
	 */
	public void setSrc(final String value) {
		getElement().setProperty("_src", value.toString());
	}

	/**
	 * Defines the image source to render
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSrc() {
		var value = getElement().getProperty("_src", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
