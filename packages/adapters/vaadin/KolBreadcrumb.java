package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Breadcrumb**-Komponente kann der Pfad zur aktuellen Position einer Webseite in einer hierarchischen Struktur dargestellt werden.
 */

@Tag("kol-breadcrumb")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.22")
@JsModule("@public-ui/components/dist/components/kol-breadcrumb")
public class KolBreadcrumb extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @return String
	 */
	public String getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Setzt die Liste der darzustellenden Links.
	 *
	 * @param value String
	 */
	public void setLinks(final String value) {
		getElement().setProperty("_links", value);
	}

	/**
	 * Setzt die Liste der darzustellenden Links.
	 *
	 * @return String
	 */
	public String getLinks() {
		return getElement().getProperty("_links", null);
	}
}
