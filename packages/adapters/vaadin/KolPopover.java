package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * > <kol-badge _label="untested"></kol-badge> Diese neue Komponente wird als ungetestet markiert, da der vollständige Barrierefreiheitstest noch aussteht. Der vollständige Test kann bei neuen Komponenten und Funktionalitäten auch erst nach einem abgeschlossenen Release erfolgen.

Die **Popover**-Komponente stellt eine Möglichkeit dar zusätzliche Inhalte in ein temporäres Element zu setzen, das, ähnlich wie <kol-link _href="" _label="Tooltip"></kol-link>, um sein Triggerelement angeordnet ist.
Das Triggerelement ist immer das im HTML vorangehende Element (previousSibling).
 */

@Tag("kol-popover")
@NpmPackage(value = "@public-ui/components", version = "1.5.0")
@JsModule("@public-ui/components/dist/components/kol-popover")
public class KolPopover extends Component {
	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 *
	 * @param value String
	 */
	public void setAlignment(final String value) {
		getElement().setProperty("_alignment", value);
	}

	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 *
	 * @return String
	 */
	public String getAlignment() {
		return getElement().getProperty("_alignment", null);
	}

	/**
	 * Öffnet/schließt das Popover.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value);
	}

	/**
	 * Öffnet/schließt das Popover.
	 *
	 * @return String
	 */
	public String getShow() {
		return getElement().getProperty("_show", null);
	}
}
