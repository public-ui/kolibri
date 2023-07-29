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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.23")
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
	 * Setzt den Lademodus.
	 *
	 * @param value String
	 */
	public void setLoading(final String value) {
		getElement().setProperty("_loading", value.toString());
	}

	/**
	 * Setzt den Lademodus.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLoading() {
		var value = getElement().getProperty("_loading", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset.
	 *
	 * @param value String
	 */
	public void setSizes(final String value) {
		getElement().setProperty("_sizes", value.toString());
	}

	/**
	 * Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSizes() {
		var value = getElement().getProperty("_sizes", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die Quell-URL des Bildes.
	 *
	 * @param value String
	 */
	public void setSrc(final String value) {
		getElement().setProperty("_src", value.toString());
	}

	/**
	 * Setzt die Quell-URL des Bildes.
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
