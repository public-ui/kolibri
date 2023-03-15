package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Image component

- https://www.mediaevent.de/html/srcset.html
 */

@Tag("kol-image")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.0")
@JsModule("@public-ui/components/dist/components/kol-image")
public class KolImage extends Component {
	/**
	 * Gibt den alternativen Text an.
	 *
	 * @param value String
	 */
	public void setAlt(final String value) {
		getElement().setProperty("_alt", value);
	}

	/**
	 * Gibt den alternativen Text an.
	 *
	 * @return String
	 */
	public String getAlt() {
		return getElement().getProperty("_alt", null);
	}

	/**
	 * Gibt den Lademodus an.
	 *
	 * @param value String
	 */
	public void setLoading(final String value) {
		getElement().setProperty("_loading", value);
	}

	/**
	 * Gibt den Lademodus an.
	 *
	 * @return String
	 */
	public String getLoading() {
		return getElement().getProperty("_loading", null);
	}

	/**
	 * ...
	 *
	 * @param value String
	 */
	public void setSizes(final String value) {
		getElement().setProperty("_sizes", value);
	}

	/**
	 * ...
	 *
	 * @return String
	 */
	public String getSizes() {
		return getElement().getProperty("_sizes", null);
	}

	/**
	 * Gibt die Quell-URL an.
	 *
	 * @param value String
	 */
	public void setSrc(final String value) {
		getElement().setProperty("_src", value);
	}

	/**
	 * Gibt die Quell-URL an.
	 *
	 * @return String
	 */
	public String getSrc() {
		return getElement().getProperty("_src", null);
	}

	/**
	 * Gibt eine Liste von Quell-URLs mit Breiten der Bilder an.
	 *
	 * @param value String
	 */
	public void setSrcset(final String value) {
		getElement().setProperty("_srcset", value);
	}

	/**
	 * Gibt eine Liste von Quell-URLs mit Breiten der Bilder an.
	 *
	 * @return String
	 */
	public String getSrcset() {
		return getElement().getProperty("_srcset", null);
	}
}
