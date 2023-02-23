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
@NpmPackage(value = "@public-ui/components", version = "1.4.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-abbr")
public class KolAbbr extends Component {
	/**
	 * Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 *
	 * @param value String
	 */
	public void setTitle(final String value) {
		getElement().setProperty("_title", value);
	}

	/**
	 * Dieses Property gibt die Beschreibung oder Erläuterung der Abkürzung an.
	 *
	 * @return String
	 */
	public String getTitle() {
		return getElement().getProperty("_title", null);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setTooltipAlign(final String value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return String
	 */
	public String getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}
}
