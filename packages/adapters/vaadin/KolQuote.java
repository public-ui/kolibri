package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Quote**-Komponente verfügt über zwei Varianten, eine kurze Fließtext-(`inline`) und eine eingerückte(`block`) Variante. Beide Varianten enthalten einen Link auf die Quelle des Zitates.
 */

@Tag("kol-quote")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-quote")
public class KolQuote extends Component {
	/**
	 * Setzt die Überschrift.
	 *
	 * @param value String
	 */
	public void setCaption(final String value) {
		getElement().setProperty("_caption", value);
	}

	/**
	 * Setzt die Überschrift.
	 *
	 * @return String
	 */
	public String getCaption() {
		return getElement().getProperty("_caption", null);
	}

	/**
	 * Link auf die Quelle des Zitates.
	 *
	 * @param value String
	 */
	public void setHref(final String value) {
		getElement().setProperty("_href", value);
	}

	/**
	 * Link auf die Quelle des Zitates.
	 *
	 * @return String
	 */
	public String getHref() {
		return getElement().getProperty("_href", null);
	}

	/**
	 * Setzt den Text, also das Zitat selbst.
	 *
	 * @param value String
	 */
	public void setQuote(final String value) {
		getElement().setProperty("_quote", value);
	}

	/**
	 * Setzt den Text, also das Zitat selbst.
	 *
	 * @return String
	 */
	public String getQuote() {
		return getElement().getProperty("_quote", null);
	}

	/**
	 * Setzt die Variante des Zitats.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Setzt die Variante des Zitats.
	 *
	 * @return String
	 */
	public String getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
