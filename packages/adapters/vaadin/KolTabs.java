package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Tabs**-Komponente wird verwendet, um verwandte Inhalte auf derselben Seite zu organisieren und zwischen ihnen zu navigieren. Tabs sorgen dafür, dass große Inhaltsmengen für Nutzer:innen leichter organisiert werden können. Tabs sind in Registerkartenleisten angeordnet, die als Registerkartengruppen bezeichnet werden, wobei die Registerkartenbeschriftung den Nutzer:innen einen Hinweis darauf gibt, welcher Inhalt angezeigt wird, wenn die Registerkarte ausgewählt wird.
 */

@Tag("kol-tabs")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-tabs")
public class KolTabs extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	public void set_ariaLabel(String _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt an, welches Tab selektiert sein soll.
	 */
	public void set_selected(number | undefined _selected) {
		getElement().setProperty("_selected", _selected);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 */
	public void set_tabs(TabButtonProps[] | string _tabs) {
		getElement().setProperty("_tabs", _tabs);
	}

	/**
	 * Gibt an, ob die Tab-Schalter entweder oben, rechts, unten oder links angeordnet sind.
	 */
	public void set_tabsAlign("bottom" | "left" | "right" | "top" | undefined _tabsAlign) {
		getElement().setProperty("_tabs-align", _tabsAlign);
	}

}