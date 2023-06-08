package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Quote**-Komponente verfügt über zwei Varianten, eine kurze Fließtext-(`inline`) und eine eingerückte(`block`) Variante. Beide Varianten enthalten einen Link auf die Quelle des Zitates.
 */

@Tag("kol-quote")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-quote")
public class KolQuote extends Component {
	/**
	 * Setzt die Überschrift.
	 *
	 * @param value Optional<String>
	 */
	public void setCaption(final Optional<String> value) {
		getElement().setProperty("_caption", value);
	}

	/**
	 * Setzt die Überschrift.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCaption() {
		return getElement().getProperty("_caption", null);
	}

	/**
	 * Link auf die Quelle des Zitates.
	 *
	 * @param value String
	 */
	public void setHref(final Optional<String> value) {
		getElement().setProperty("_href", value);
	}

	/**
	 * Link auf die Quelle des Zitates.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHref() {
		return getElement().getProperty("_href", null);
	}

	/**
	 * Setzt den Text, also das Zitat selbst.
	 *
	 * @param value String
	 */
	public void setQuote(final Optional<String> value) {
		getElement().setProperty("_quote", value);
	}

	/**
	 * Setzt den Text, also das Zitat selbst.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getQuote() {
		return getElement().getProperty("_quote", null);
	}

	/**
	 * Setzt die Variante des Zitats.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Setzt die Variante des Zitats.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
