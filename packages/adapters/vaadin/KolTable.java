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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-table")
public class KolTable extends Component {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setCaption(final String value) {
		getElement().setProperty("_caption", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCaption() {
		var value = getElement().getProperty("_caption", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden.
	 *
	 * @param value String
	 */
	public void setData(final String value) {
		getElement().setProperty("_data", value.toString());
	}

	/**
	 * Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getData() {
		var value = getElement().getProperty("_data", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Hier können die Daten für die Fußzeile der Tabelle übergeben werden.
	 *
	 * @param value String
	 */
	public void setDataFoot(final String value) {
		getElement().setProperty("_data-foot", value.toString());
	}

	/**
	 * Hier können die Daten für die Fußzeile der Tabelle übergeben werden.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDataFoot() {
		var value = getElement().getProperty("_data-foot", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die horizontalen und vertikalen Header für die Tabelle an.
	 *
	 * @param value String
	 */
	public void setHeaders(final String value) {
		getElement().setProperty("_headers", value.toString());
	}

	/**
	 * Gibt die horizontalen und vertikalen Header für die Tabelle an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeaders() {
		var value = getElement().getProperty("_headers", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the table caption.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the table caption.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, die minimale Breite der Tabelle an.
	 *
	 * @param value String
	 */
	public void setMinWidth(final String value) {
		getElement().setProperty("_min-width", value.toString());
	}

	/**
	 * Gibt an, die minimale Breite der Tabelle an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMinWidth() {
		var value = getElement().getProperty("_min-width", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob die Daten geteilt in Seiten angezeigt wird.
	 *
	 * @param value String
	 */
	public void setPagination(final String value) {
		getElement().setProperty("_pagination", value.toString());
	}

	/**
	 * Gibt an, ob die Daten geteilt in Seiten angezeigt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPagination() {
		var value = getElement().getProperty("_pagination", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
