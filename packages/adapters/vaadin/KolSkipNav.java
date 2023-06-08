package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **SkipNav**-Komponente kann eine versteckte Navigation erzeugt werden. Sie dient dazu, Sehbehinderten das Überspringen von Seitenbereichen zu ermöglichen. Sie wird nur nach Anspringen durch die **Tab-Taste** sichtbar.
 */

@Tag("kol-skip-nav")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-skip-nav")
public class KolSkipNav extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final Optional<String> value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Setzt die Liste der darzustellenden Links.
	 *
	 * @param value String
	 */
	public void setLinks(final Optional<String> value) {
		getElement().setProperty("_links", value);
	}

	/**
	 * Setzt die Liste der darzustellenden Links.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLinks() {
		return getElement().getProperty("_links", null);
	}
}
