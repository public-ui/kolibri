package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Tabs**-Komponente wird verwendet, um verwandte Inhalte auf derselben Seite zu organisieren und zwischen ihnen zu navigieren. Tabs sorgen dafür, dass große Inhaltsmengen für Nutzer:innen leichter organisiert werden können. Tabs sind in Registerkartenleisten angeordnet, die als Registerkartengruppen bezeichnet werden, wobei die Registerkartenbeschriftung den Nutzer:innen einen Hinweis darauf gibt, welcher Inhalt angezeigt wird, wenn die Registerkarte ausgewählt wird.
 */

@Tag("kol-tabs")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.2")
@JsModule("@public-ui/components/dist/components/kol-tabs")
public class KolTabs extends Component {
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
	 * Gibt an, welches Tab selektiert sein soll.
	 *
	 * @param value String
	 */
	public void setSelected(final String value) {
		getElement().setProperty("_selected", value);
	}

	/**
	 * Gibt an, welches Tab selektiert sein soll.
	 *
	 * @return String
	 */
	public String getSelected() {
		return getElement().getProperty("_selected", null);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 *
	 * @param value String
	 */
	public void setTabs(final String value) {
		getElement().setProperty("_tabs", value);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 *
	 * @return String
	 */
	public String getTabs() {
		return getElement().getProperty("_tabs", null);
	}

	/**
	 * Gibt an, ob die Tab-Schalter entweder oben, rechts, unten oder links angeordnet sind.
	 *
	 * @param value String
	 */
	public void setTabsAlign(final String value) {
		getElement().setProperty("_tabs-align", value);
	}

	/**
	 * Gibt an, ob die Tab-Schalter entweder oben, rechts, unten oder links angeordnet sind.
	 *
	 * @return String
	 */
	public String getTabsAlign() {
		return getElement().getProperty("_tabs-align", null);
	}
}
