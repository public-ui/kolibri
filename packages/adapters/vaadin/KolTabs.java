package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Tabs**-Komponente wird verwendet, um verwandte Inhalte auf derselben Seite zu organisieren und zwischen ihnen zu navigieren. Tabs sorgen dafür, dass große Inhaltsmengen für Nutzer:innen leichter organisiert werden können. Tabs sind in Registerkartenleisten angeordnet, die als Registerkartengruppen bezeichnet werden, wobei die Registerkartenbeschriftung den Nutzer:innen einen Hinweis darauf gibt, welcher Inhalt angezeigt wird, wenn die Registerkarte ausgewählt wird.
 */

@Tag("kol-tabs")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.9")
@JsModule("@public-ui/components/dist/components/kol-tabs")
public class KolTabs extends Component {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value Optional<String>
	 */
	public void setAriaLabel(final Optional<String> value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value Optional<String>
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt an, welches Tab selektiert sein soll.
	 *
	 * @param value Optional<String>
	 */
	public void setSelected(final Optional<String> value) {
		getElement().setProperty("_selected", value);
	}

	/**
	 * Gibt an, welches Tab selektiert sein soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSelected() {
		return getElement().getProperty("_selected", null);
	}

	/**
	 * Setzt die Daten für die Registrierkarten.
	 *
	 * @param value String
	 */
	public void setTabs(final Optional<String> value) {
		getElement().setProperty("_tabs", value);
	}

	/**
	 * Setzt die Daten für die Registrierkarten.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabs() {
		return getElement().getProperty("_tabs", null);
	}

	/**
	 * Setzt die Position der Registrierkarten.
	 *
	 * @param value Optional<String>
	 */
	public void setTabsAlign(final Optional<String> value) {
		getElement().setProperty("_tabs-align", value);
	}

	/**
	 * Setzt die Position der Registrierkarten.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabsAlign() {
		return getElement().getProperty("_tabs-align", null);
	}
}
