package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Quote**-Komponente verfügt über zwei Varianten, eine kurze Fließtext-(`inline`) und eine eingerückte(`block`) Variante. Beide Varianten enthalten einen Link auf die Quelle des Zitates.
 */

@Tag("kol-quote")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.23")
@JsModule("@public-ui/components/dist/components/kol-quote")
public class KolQuote extends Component {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setCaption(final String value) {
		getElement().setProperty("_caption", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCaption() {
		var value = getElement().getProperty("_caption", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt den Link zur Quelle des Zitates an.
	 *
	 * @param value String
	 */
	public void setHref(final String value) {
		getElement().setProperty("_href", value.toString());
	}

	/**
	 * Gibt den Link zur Quelle des Zitates an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHref() {
		var value = getElement().getProperty("_href", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the label of the citation link.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the label of the citation link.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt den Text, also das Zitat selbst.
	 *
	 * @param value String
	 */
	public void setQuote(final String value) {
		getElement().setProperty("_quote", value.toString());
	}

	/**
	 * Setzt den Text, also das Zitat selbst.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getQuote() {
		var value = getElement().getProperty("_quote", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value.toString());
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		var value = getElement().getProperty("_variant", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
