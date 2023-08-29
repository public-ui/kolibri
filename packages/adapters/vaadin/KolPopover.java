package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Popover**-Komponente stellt eine Möglichkeit dar zusätzliche Inhalte in ein temporäres Element zu setzen, das, ähnlich wie <kol-link _href="" _label="Tooltip"></kol-link>, um sein Triggerelement angeordnet ist.
Das Triggerelement ist immer das im HTML vorangehende Element (previousSibling).
 */

@Tag("kol-popover")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-popover")
public class KolPopover extends Component {
	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left. In relation to trigger element.
	 *
	 * @param value String
	 */
	public void setAlign(final String value) {
		getElement().setProperty("_align", value.toString());
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left. In relation to trigger element.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlign() {
		var value = getElement().getProperty("_align", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Makes the element show up.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value.toString());
	}

	/**
	 * Makes the element show up.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShow() {
		var value = getElement().getProperty("_show", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
