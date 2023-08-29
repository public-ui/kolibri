package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Table**-Komponente dient primär der übersichtlichen Darstellung von Datenmengen. Dabei ist sie so ausgelegt, dass sie alle von den Daten abhängige Werte automatisch ermittelt und die Tabelle entsprechend darstellt. Hierzu gehören beispielsweise die optionalen Funktionalitäten Spaltensortierung oder Pagination.

<kol-indented-text _summary="Backend-seitige Pagination">
	Bei sehr großen Datenmengen ist auch eine manuelle Nutzung der Table-Komponente möglich. Das bedeutet, dass die Tabelle seitenweise "manuell" befüllt wird. Hierzu kann einfach anstatt der Table-Pagination eine "eigene" Pagination unter der Tabelle mittels der Pagination-Komponente verwendet werden.
</kol-indented-text>
 */

@Tag("kol-table")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-table")
public class KolTable extends Component {
	/**
	 * Deprecated: Defines the visible caption of the component.
	 *
	 * @param value String
	 */
	public void setCaption(final String value) {
		getElement().setProperty("_caption", value.toString());
	}

	/**
	 * Deprecated: Defines the visible caption of the component.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCaption() {
		var value = getElement().getProperty("_caption", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the primary table data.
	 *
	 * @param value String
	 */
	public void setData(final String value) {
		getElement().setProperty("_data", value.toString());
	}

	/**
	 * Defines the primary table data.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getData() {
		var value = getElement().getProperty("_data", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the data for the table footer.
	 *
	 * @param value String
	 */
	public void setDataFoot(final String value) {
		getElement().setProperty("_data-foot", value.toString());
	}

	/**
	 * Defines the data for the table footer.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDataFoot() {
		var value = getElement().getProperty("_data-foot", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the horizontal and vertical table headers.
	 *
	 * @param value String
	 */
	public void setHeaders(final String value) {
		getElement().setProperty("_headers", value.toString());
	}

	/**
	 * Defines the horizontal and vertical table headers.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeaders() {
		var value = getElement().getProperty("_headers", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the table min-width.
	 *
	 * @param value String
	 */
	public void setMinWidth(final String value) {
		getElement().setProperty("_min-width", value.toString());
	}

	/**
	 * Defines the table min-width.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMinWidth() {
		var value = getElement().getProperty("_min-width", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines whether to show the data distributed over multiple pages.
	 *
	 * @param value String
	 */
	public void setPagination(final String value) {
		getElement().setProperty("_pagination", value.toString());
	}

	/**
	 * Defines whether to show the data distributed over multiple pages.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPagination() {
		var value = getElement().getProperty("_pagination", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
