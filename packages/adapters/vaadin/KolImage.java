package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Image**-Komponente dient dazu, Bilder darzustellen.
 */

@Tag("kol-image")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-image")
public class KolImage extends Component {
	/**
	 * Setzt den alternativen Text.
	 *
	 * @param value String
	 */
	public void setAlt(final String value) {
		getElement().setProperty("_alt", value.toString());
	}

	/**
	 * Setzt den alternativen Text.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlt() {
		var value = getElement().getProperty("_alt", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the loading mode for the image.
	 *
	 * @param value String
	 */
	public void setLoading(final String value) {
		getElement().setProperty("_loading", value.toString());
	}

	/**
	 * Defines the loading mode for the image.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLoading() {
		var value = getElement().getProperty("_loading", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the image sizes for different screen resolutions, supporting _srcset.
	 *
	 * @param value String
	 */
	public void setSizes(final String value) {
		getElement().setProperty("_sizes", value.toString());
	}

	/**
	 * Defines the image sizes for different screen resolutions, supporting _srcset.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSizes() {
		var value = getElement().getProperty("_sizes", null);
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

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 *
	 * @param value String
	 */
	public void setSrcset(final String value) {
		getElement().setProperty("_srcset", value.toString());
	}

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSrcset() {
		var value = getElement().getProperty("_srcset", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
