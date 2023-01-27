package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der <b>Paginierung-Komponente</b> lassen sich umfangreiche Inhalte auf der Seite
in handliche Abschnitte unterteilen. Diese können dann über die Paginierung der Reihe nach
durchlaufen werden.
 */

@Tag("kol-pagination")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-pagination")
public class KolPagination extends Component {
	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 */
	public void set_boundaryCount(number | undefined _boundaryCount) {
		getElement().setProperty("_boundary-count", _boundaryCount);
	}

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	public void set_customClass(string | undefined _customClass) {
		getElement().setProperty("_custom-class", _customClass);
	}

	/**
	 * Gibt an, welche Sprung-Schalter sichtbar sein sollen.
	 */
	public void set_hasButtons(boolean | string | undefined | { first: boolean; last: boolean; next: boolean; previous: boolean; } _hasButtons) {
		getElement().setProperty("_has-buttons", _hasButtons);
	}

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 */
	public void set_page(double _page) {
		getElement().setProperty("_page", _page);
	}

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 */
	public void set_pageSize(double _pageSize) {
		getElement().setProperty("_page-size", _pageSize);
	}

	/**
	 * Gibt an, welche Optionen für die Seitenlänge angeboten werden.
	 */
	public void set_pageSizeOptions(number[] | string _pageSizeOptions) {
		getElement().setProperty("_page-size-options", _pageSizeOptions);
	}

	/**
	 * Gibt an, wie viele Seiten neben dem aktuell ausgewählten Seite angezeigt werden.
	 */
	public void set_siblingCount(number | undefined _siblingCount) {
		getElement().setProperty("_sibling-count", _siblingCount);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden.
	 */
	public void set_tooltipAlign("bottom" | "left" | "right" | "top" | undefined _tooltipAlign) {
		getElement().setProperty("_tooltip-align", _tooltipAlign);
	}

	/**
	 * Gibt an, wie viele Einträge mit der Pagination gehandelt werden.
	 */
	public void set_total(double _total) {
		getElement().setProperty("_total", _total);
	}

	/**
	 * Gibt an, welche Button-Variante verwendet werden soll.
	 */
	public void set_variant("custom" | "danger" | "ghost" | "normal" | "primary" | "secondary" | undefined _variant) {
		getElement().setProperty("_variant", _variant);
	}

}