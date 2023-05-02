package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Image**-Komponente dient dazu, Bilder darzustellen.
 */

@Tag("kol-image")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.19")
@JsModule("@public-ui/components/dist/components/kol-image")
public class KolImage extends Component {
	/**
	 * Setzt den alternativen Text.
	 *
	 * @param value String
	 */
	public void setAlt(final String value) {
		getElement().setProperty("_alt", value);
	}

	/**
	 * Setzt den alternativen Text.
	 *
	 * @return String
	 */
	public String getAlt() {
		return getElement().getProperty("_alt", null);
	}

	/**
	 * Setzt den Lademodus.
	 *
	 * @param value String
	 */
	public void setLoading(final String value) {
		getElement().setProperty("_loading", value);
	}

	/**
	 * Setzt den Lademodus.
	 *
	 * @return String
	 */
	public String getLoading() {
		return getElement().getProperty("_loading", null);
	}

	/**
	 * Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset.
	 *
	 * @param value String
	 */
	public void setSizes(final String value) {
		getElement().setProperty("_sizes", value);
	}

	/**
	 * Setzt Größen für unterschiedliche Auflösungen, unterstützend für _srcset.
	 *
	 * @return String
	 */
	public String getSizes() {
		return getElement().getProperty("_sizes", null);
	}

	/**
	 * Setzt die Quell-URL des Bildes.
	 *
	 * @param value String
	 */
	public void setSrc(final String value) {
		getElement().setProperty("_src", value);
	}

	/**
	 * Setzt die Quell-URL des Bildes.
	 *
	 * @return String
	 */
	public String getSrc() {
		return getElement().getProperty("_src", null);
	}

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 *
	 * @param value String
	 */
	public void setSrcset(final String value) {
		getElement().setProperty("_srcset", value);
	}

	/**
	 * Setzt eine Liste von Quell-URLs mit Breiten der Bilder.
	 *
	 * @return String
	 */
	public String getSrcset() {
		return getElement().getProperty("_srcset", null);
	}
}
