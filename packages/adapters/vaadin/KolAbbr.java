package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Abbr**-Komponente implementiert den HTML-Tag `abbr`, wobei hier jedoch der Tooltip barrierefrei ist.
Der Tooltip für die Beschreibung wird bei Focus oder Hover der **Abbr**-Komponente angezeigt und vorgelesen.
 */

@Tag("kol-abbr")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-abbr")
public class KolAbbr extends Component {
	/**
	 * Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 */
	public void set_title(String _title) {
		getElement().setProperty("_title", _title);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	public void set_tooltipAlign("bottom" | "left" | "right" | "top" | undefined _tooltipAlign) {
		getElement().setProperty("_tooltip-align", _tooltipAlign);
	}

}