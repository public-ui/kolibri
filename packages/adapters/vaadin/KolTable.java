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
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-table")
public class KolTable extends Component {
	/**
	 * Gibt den  Titel oder eine Legende mit Erklärungen zur Tabelle an.
	 */
	public void set_caption(String _caption) {
		getElement().setProperty("_caption", _caption);
	}

	/**
	 * Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden.
	 */
	public void set_data(KoliBriDataType[] | string _data) {
		getElement().setProperty("_data", _data);
	}

	/**
	 * Gibt die horizontalen und vertikalen Header für die Tabelle an.
	 */
	public void set_headers(string | { horizontal?: KoliBriTableHeaderCell[][] | undefined; vertical?: KoliBriTableHeaderCell[][] | undefined; } _headers) {
		getElement().setProperty("_headers", _headers);
	}

	/**
	 * Gibt an, die minimale Breite der Tabelle an.
	 */
	public void set_minWidth(string | undefined _minWidth) {
		getElement().setProperty("_min-width", _minWidth);
	}

	/**
	 * Gibt an, ob die Daten geteilt in Seiten angezeigt wird.
	 */
	public void set_pagination(boolean | string | undefined | { _page: number; } & { _on?: KoliBriPaginationButtonCallbacks | undefined; _page?: number | undefined; _total?: number | undefined; _customClass?: string | undefined; _variant?: KoliBriButtonVariant | undefined; _boundaryCount?: number | undefined; _hasButtons?: boolean | Stringified<PaginationHasButton> | undefined; _pageSize?: number | undefined; _pageSizeOptions?: Stringified<number[]> | undefined; _siblingCount?: number | undefined; _tooltipAlign?: Alignment | undefined; } _pagination) {
		getElement().setProperty("_pagination", _pagination);
	}

}