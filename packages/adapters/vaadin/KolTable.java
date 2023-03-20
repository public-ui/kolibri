package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Table**-Komponente dient primär der übersichtlichen Darstellung von Datenmengen. Dabei ist sie so ausgelegt, dass sie alle von den Daten abhängige Werte automatisch ermittelt und die Tabelle entsprechend darstellt. Hierzu gehören beispielsweise die optionalen Funktionalitäten Spaltensortierung oder Pagination.

<kol-indented-text _summary="Backend-seitige Pagination">
	Bei sehr großen Datenmengen ist auch eine manuelle Nutzung der Table-Komponente möglich. Das bedeutet, dass die Tabelle seitenweise "manuell" befüllt wird. Hierzu kann einfach anstatt der Table-Pagination eine "eigene" Pagination unter der Tabelle mittels der Pagination-Komponente verwendet werden.
</kol-indented-text>
 */

@Tag("kol-table")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-table")
public class KolTable extends Component {
	/**
	 * Gibt den  Titel oder eine Legende mit Erklärungen zur Tabelle an.
	 *
	 * @param value String
	 */
	public void setCaption(final String value) {
		getElement().setProperty("_caption", value);
	}

	/**
	 * Gibt den  Titel oder eine Legende mit Erklärungen zur Tabelle an.
	 *
	 * @return String
	 */
	public String getCaption() {
		return getElement().getProperty("_caption", null);
	}

	/**
	 * Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden.
	 *
	 * @param value String
	 */
	public void setData(final String value) {
		getElement().setProperty("_data", value);
	}

	/**
	 * Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden.
	 *
	 * @return String
	 */
	public String getData() {
		return getElement().getProperty("_data", null);
	}

	/**
	 * Gibt die horizontalen und vertikalen Header für die Tabelle an.
	 *
	 * @param value String
	 */
	public void setHeaders(final String value) {
		getElement().setProperty("_headers", value);
	}

	/**
	 * Gibt die horizontalen und vertikalen Header für die Tabelle an.
	 *
	 * @return String
	 */
	public String getHeaders() {
		return getElement().getProperty("_headers", null);
	}

	/**
	 * Gibt an, die minimale Breite der Tabelle an.
	 *
	 * @param value String
	 */
	public void setMinWidth(final String value) {
		getElement().setProperty("_min-width", value);
	}

	/**
	 * Gibt an, die minimale Breite der Tabelle an.
	 *
	 * @return String
	 */
	public String getMinWidth() {
		return getElement().getProperty("_min-width", null);
	}

	/**
	 * Gibt an, ob die Daten geteilt in Seiten angezeigt wird.
	 *
	 * @param value String
	 */
	public void setPagination(final String value) {
		getElement().setProperty("_pagination", value);
	}

	/**
	 * Gibt an, ob die Daten geteilt in Seiten angezeigt wird.
	 *
	 * @return String
	 */
	public String getPagination() {
		return getElement().getProperty("_pagination", null);
	}
}
