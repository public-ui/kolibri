package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Paginierung**-Komponente lassen sich umfangreiche, aufgeteilte Inhalte, wie zum Beispiel Suchergebnisse, der Reihe nach durchlaufen.
 */

@Tag("kol-pagination")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.9")
@JsModule("@public-ui/components/dist/components/kol-pagination")
public class KolPagination extends Component {
	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 *
	 * @param value Optional<String>
	 */
	public void setBoundaryCount(final Optional<String> value) {
		getElement().setProperty("_boundary-count", value);
	}

	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getBoundaryCount() {
		return getElement().getProperty("_boundary-count", null);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @param value Optional<String>
	 */
	public void setCustomClass(final Optional<String> value) {
		getElement().setProperty("_custom-class", value);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCustomClass() {
		return getElement().getProperty("_custom-class", null);
	}

	/**
	 * Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen.
	 *
	 * @param value Optional<String>
	 */
	public void setHasButtons(final Optional<String> value) {
		getElement().setProperty("_has-buttons", value);
	}

	/**
	 * Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasButtons() {
		return getElement().getProperty("_has-buttons", null);
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 *
	 * @param value String
	 */
	public void setPage(final Optional<String> value) {
		getElement().setProperty("_page", value);
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPage() {
		return getElement().getProperty("_page", null);
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 *
	 * @param value Optional<String>
	 */
	public void setPageSize(final Optional<String> value) {
		getElement().setProperty("_page-size", value);
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPageSize() {
		return getElement().getProperty("_page-size", null);
	}

	/**
	 * Setzt die Optionen für das Seitenlängenselect.
	 *
	 * @param value Optional<String>
	 */
	public void setPageSizeOptions(final Optional<String> value) {
		getElement().setProperty("_page-size-options", value);
	}

	/**
	 * Setzt die Optionen für das Seitenlängenselect.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPageSizeOptions() {
		return getElement().getProperty("_page-size-options", null);
	}

	/**
	 * Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden.
	 *
	 * @param value Optional<String>
	 */
	public void setSiblingCount(final Optional<String> value) {
		getElement().setProperty("_sibling-count", value);
	}

	/**
	 * Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSiblingCount() {
		return getElement().getProperty("_sibling-count", null);
	}

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setTooltipAlign(final Optional<String> value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}

	/**
	 * Setzt die Gesamtanzahl der Seiten.
	 *
	 * @param value String
	 */
	public void setTotal(final Optional<String> value) {
		getElement().setProperty("_total", value);
	}

	/**
	 * Setzt die Gesamtanzahl der Seiten.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTotal() {
		return getElement().getProperty("_total", null);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
