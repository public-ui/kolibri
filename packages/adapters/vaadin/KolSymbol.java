package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Symbol**-Komponente ermöglicht das Rendern beliebiger Symbole mit steuerbarer Ausgabe durch den Screenreader.
 */

@Tag("kol-symbol")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-symbol")
public class KolSymbol extends Component {
	/**
	 * Gibt an, was der Screenreader ausgeben soll
	 */
	public void set_ariaLabel(String _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Dieses Property gibt den String an der angezeigt werden soll.
	 */
	public void set_symbol(String _symbol) {
		getElement().setProperty("_symbol", _symbol);
	}

}