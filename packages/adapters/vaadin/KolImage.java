package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Image**-Komponente dient dazu, Bilder darzustellen.
 */

@Tag("kol-image")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.9")
@JsModule("@public-ui/components/dist/components/kol-image")
public class KolImage extends Component {
	/**
	 * Setzt den alternativen Text.
	 *
	 * @param value String
	 */
	public void setAlt(final Optional<String> value) {
		getElement().setProperty("_alt", value);
	}

	/**
	 * Setzt den alternativen Text.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlt() {
		return getElement().getProperty("_alt", null);
	}

	/**
	 * Setzt den Lademodus.
	 *
	 * @param value Optional<String>
	 */
	public void setLoading(final Optional<String> value) {
		getElement().setProperty("_loading", value);
	}

	/**
	 * Setzt den Lademodus.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLoading() {
		return getElement().getProperty("_loading", null);
	}

	/**
	 * Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset.
	 *
	 * @param value Optional<String>
	 */
	public void setSizes(final Optional<String> value) {
		getElement().setProperty("_sizes", value);
	}

	/**
	 * Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSizes() {
		return getElement().getProperty("_sizes", null);
	}

	/**
	 * Setzt die Quell-URL des Bildes.
	 *
	 * @param value String
	 */
	public void setSrc(final Optional<String> value) {
		getElement().setProperty("_src", value);
	}

	/**
	 * Setzt die Quell-URL des Bildes.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSrc() {
		return getElement().getProperty("_src", null);
	}

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 *
	 * @param value Optional<String>
	 */
	public void setSrcset(final Optional<String> value) {
		getElement().setProperty("_srcset", value);
	}

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSrcset() {
		return getElement().getProperty("_srcset", null);
	}
}
