package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * The quote component is implemented in two variants. The first variant is the default `short` variant as inline quote with quotation marks. The second variant is the indented `long` variant. The indented variant is used to highlight a text passage or information visually.

Both variants can be extended with a `cite` element. The `cite` element is used to identify the source of a quotation and will be displayed below the quote as a link.
 */

@Tag("kol-quote")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.7")
@JsModule("@public-ui/components/dist/components/kol-quote")
public class KolQuote extends Component {
	/**
	 * The caption of the quote.
	 *
	 * @param value String
	 */
	public void setCaption(final String value) {
		getElement().setProperty("_caption", value);
	}

	/**
	 * The caption of the quote.
	 *
	 * @return String
	 */
	public String getCaption() {
		return getElement().getProperty("_caption", null);
	}

	/**
	 * The href is a URL that designates a source document or message for the information quoted.
	 *
	 * @param value String
	 */
	public void setHref(final String value) {
		getElement().setProperty("_href", value);
	}

	/**
	 * The href is a URL that designates a source document or message for the information quoted.
	 *
	 * @return String
	 */
	public String getHref() {
		return getElement().getProperty("_href", null);
	}

	/**
	 * The text of the quote.
	 *
	 * @param value String
	 */
	public void setQuote(final String value) {
		getElement().setProperty("_quote", value);
	}

	/**
	 * The text of the quote.
	 *
	 * @return String
	 */
	public String getQuote() {
		return getElement().getProperty("_quote", null);
	}

	/**
	 * The variant of the quote.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * The variant of the quote.
	 *
	 * @return String
	 */
	public String getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
