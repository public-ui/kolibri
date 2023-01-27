package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Icon**-Komponente können Icons aus der Icon-Bibliothek an beliebigen Positionen erzeugt werden. Die Ausgabe des Icon kann über Attribute gesteuert werden und erfolgt barrierefrei. Die Ausgabe erfolgt standardmäßig als **_inline_**-Element.
 */

@Tag("kol-icon")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-icon")
public class KolIcon extends Component {
	/**
	 * Gibt das Aria-Label am Icon an.
	 */
	public void set_ariaLabel(String _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt einen Identifier eines Icons aus den Icon's an.
	 */
	public void set_icon(String _icon) {
		getElement().setProperty("_icon", _icon);
	}

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
/**
	 */
	public void set_part(string | undefined _part) {
		getElement().setProperty("_part", _part);
	}

}