package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Mit Hilfe der **Paginierung**-Komponente lassen sich umfangreiche, aufgeteilte Inhalte, wie zum Beispiel Suchergebnisse, der Reihe nach durchlaufen.
 */

@Tag("kol-pagination")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.23")
@JsModule("@public-ui/components/dist/components/kol-pagination")
public class KolPagination extends Component {
	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 *
	 * @param value String
	 */
	public void setBoundaryCount(final String value) {
		getElement().setProperty("_boundary-count", value.toString());
	}

	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getBoundaryCount() {
		var value = getElement().getProperty("_boundary-count", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @param value String
	 */
	public void setCustomClass(final String value) {
		getElement().setProperty("_custom-class", value.toString());
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCustomClass() {
		var value = getElement().getProperty("_custom-class", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen.
	 *
	 * @param value String
	 */
	public void setHasButtons(final String value) {
		getElement().setProperty("_has-buttons", value.toString());
	}

	/**
	 * Setzt die Sichtbarkeit der Anfang/zurück/weiter/Ende-Schaltflächen.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasButtons() {
		var value = getElement().getProperty("_has-buttons", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 *
	 * @param value String
	 */
	public void setPage(final String value) {
		getElement().setProperty("_page", value.toString());
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPage() {
		var value = getElement().getProperty("_page", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 *
	 * @param value String
	 */
	public void setPageSize(final String value) {
		getElement().setProperty("_page-size", value.toString());
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPageSize() {
		var value = getElement().getProperty("_page-size", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die Optionen für das Seitenlängenselect.
	 *
	 * @param value String
	 */
	public void setPageSizeOptions(final String value) {
		getElement().setProperty("_page-size-options", value.toString());
	}

	/**
	 * Setzt die Optionen für das Seitenlängenselect.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPageSizeOptions() {
		var value = getElement().getProperty("_page-size-options", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden.
	 *
	 * @param value String
	 */
	public void setSiblingCount(final String value) {
		getElement().setProperty("_sibling-count", value.toString());
	}

	/**
	 * Gibt an, wie viele Seiten neben der aktuell Ausgewählten angezeigt werden.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSiblingCount() {
		var value = getElement().getProperty("_sibling-count", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setTooltipAlign(final String value) {
		getElement().setProperty("_tooltip-align", value.toString());
	}

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		var value = getElement().getProperty("_tooltip-align", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die Gesamtanzahl der Seiten.
	 *
	 * @param value String
	 */
	public void setTotal(final String value) {
		getElement().setProperty("_total", value.toString());
	}

	/**
	 * Setzt die Gesamtanzahl der Seiten.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTotal() {
		var value = getElement().getProperty("_total", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value.toString());
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		var value = getElement().getProperty("_variant", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
