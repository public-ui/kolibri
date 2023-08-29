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
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-pagination")
public class KolPagination extends Component {
	/**
	 * Defines the amount of pages to show next to the outer arrow buttons.
	 *
	 * @param value String
	 */
	public void setBoundaryCount(final String value) {
		getElement().setProperty("_boundary-count", value.toString());
	}

	/**
	 * Defines the amount of pages to show next to the outer arrow buttons.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getBoundaryCount() {
		var value = getElement().getProperty("_boundary-count", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the custom class attribute for the buttons.
	 *
	 * @param value String
	 */
	public void setCustomClass(final String value) {
		getElement().setProperty("_custom-class", value.toString());
	}

	/**
	 * Defines the custom class attribute for the buttons.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCustomClass() {
		var value = getElement().getProperty("_custom-class", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines which navigation buttons to render (first, last, next, previous buttons).
	 *
	 * @param value String
	 */
	public void setHasButtons(final String value) {
		getElement().setProperty("_has-buttons", value.toString());
	}

	/**
	 * Defines which navigation buttons to render (first, last, next, previous buttons).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasButtons() {
		var value = getElement().getProperty("_has-buttons", null);
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
	 * Defines the current page.
	 *
	 * @param value String
	 */
	public void setPage(final String value) {
		getElement().setProperty("_page", value.toString());
	}

	/**
	 * Defines the current page.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPage() {
		var value = getElement().getProperty("_page", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the amount of entries to show per page.
	 *
	 * @param value String
	 */
	public void setPageSize(final String value) {
		getElement().setProperty("_page-size", value.toString());
	}

	/**
	 * Defines the amount of entries to show per page.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPageSize() {
		var value = getElement().getProperty("_page-size", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the options for the page-size-select.
	 *
	 * @param value String
	 */
	public void setPageSizeOptions(final String value) {
		getElement().setProperty("_page-size-options", value.toString());
	}

	/**
	 * Defines the options for the page-size-select.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPageSizeOptions() {
		var value = getElement().getProperty("_page-size-options", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the amount of pages to show next to the current page.
	 *
	 * @param value String
	 */
	public void setSiblingCount(final String value) {
		getElement().setProperty("_sibling-count", value.toString());
	}

	/**
	 * Defines the amount of pages to show next to the current page.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSiblingCount() {
		var value = getElement().getProperty("_sibling-count", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @param value String
	 */
	public void setTooltipAlign(final String value) {
		getElement().setProperty("_tooltip-align", value.toString());
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
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
	 * Defines which variant should be used for presentation.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value.toString());
	}

	/**
	 * Defines which variant should be used for presentation.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		var value = getElement().getProperty("_variant", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
