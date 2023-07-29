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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.23")
@JsModule("@public-ui/components/dist/components/kol-popover")
public class KolPopover extends Component {
	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 *
	 * @param value String
	 */
	public void setAlign(final String value) {
		getElement().setProperty("_align", value.toString());
	}

	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlign() {
		var value = getElement().getProperty("_align", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value.toString());
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShow() {
		var value = getElement().getProperty("_show", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
