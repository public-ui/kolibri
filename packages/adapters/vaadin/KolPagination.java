package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Paginierung**-Komponente lassen sich umfangreiche, aufgeteilte Inhalte, wie zum Beispiel Suchergebnisse, der Reihe nach durchlaufen.
 */

@Tag("kol-pagination")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.19")
@JsModule("@public-ui/components/dist/components/kol-pagination")
public class KolPagination extends Component {
	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 *
	 * @param value String
	 */
	public void setBoundaryCount(final String value) {
		getElement().setProperty("_boundary-count", value);
	}

	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 *
	 * @return String
	 */
	public String getBoundaryCount() {
		return getElement().getProperty("_boundary-count", null);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @param value String
	 */
	public void setCustomClass(final String value) {
		getElement().setProperty("_custom-class", value);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @return String
	 */
	public String getCustomClass() {
		return getElement().getProperty("_custom-class", null);
	}

	/**
	 * Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen.
	 *
	 * @param value String
	 */
	public void setHasButtons(final String value) {
		getElement().setProperty("_has-buttons", value);
	}

	/**
	 * Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen.
	 *
	 * @return String
	 */
	public String getHasButtons() {
		return getElement().getProperty("_has-buttons", null);
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 *
	 * @param value double
	 */
	public void setPage(final double value) {
		getElement().setProperty("_page", value);
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 *
	 * @return double
	 */
	public double getPage() {
		return getElement().getProperty("_page", null);
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 *
	 * @param value double
	 */
	public void setPageSize(final double value) {
		getElement().setProperty("_page-size", value);
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 *
	 * @return double
	 */
	public double getPageSize() {
		return getElement().getProperty("_page-size", null);
	}

	/**
	 * Setzt die Optionen für das Seitenlängenselect.
	 *
	 * @param value String
	 */
	public void setPageSizeOptions(final String value) {
		getElement().setProperty("_page-size-options", value);
	}

	/**
	 * Setzt die Optionen für das Seitenlängenselect.
	 *
	 * @return String
	 */
	public String getPageSizeOptions() {
		return getElement().getProperty("_page-size-options", null);
	}

	/**
	 * Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden.
	 *
	 * @param value String
	 */
	public void setSiblingCount(final String value) {
		getElement().setProperty("_sibling-count", value);
	}

	/**
	 * Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden.
	 *
	 * @return String
	 */
	public String getSiblingCount() {
		return getElement().getProperty("_sibling-count", null);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden.
	 *
	 * @param value String
	 */
	public void setTooltipAlign(final String value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden.
	 *
	 * @return String
	 */
	public String getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}

	/**
	 * Setzt die Gesamtanzahl der Seiten.
	 *
	 * @param value double
	 */
	public void setTotal(final double value) {
		getElement().setProperty("_total", value);
	}

	/**
	 * Setzt die Gesamtanzahl der Seiten.
	 *
	 * @return double
	 */
	public double getTotal() {
		return getElement().getProperty("_total", null);
	}

	/**
	 * Gibt an, welche Button-Variante verwendet werden soll.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Button-Variante verwendet werden soll.
	 *
	 * @return String
	 */
	public String getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
