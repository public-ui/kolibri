package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Breadcrumb**-Komponente kann der Pfad zur aktuellen Position einer Webseite in einer hierarchischen Struktur dargestellt werden.
 */

@Tag("kol-breadcrumb")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-breadcrumb")
public class KolBreadcrumb extends Component {
	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	public void set_ariaLabel(String _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 */
	public void set_links(NavLinkProps[] | string _links) {
		getElement().setProperty("_links", _links);
	}

}