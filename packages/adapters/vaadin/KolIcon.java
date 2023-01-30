package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Icon**-Komponente können Icons aus der Icon-Bibliothek an beliebigen Positionen erzeugt werden. Die Ausgabe des Icon kann über Attribute gesteuert werden und erfolgt barrierefrei. Die Ausgabe erfolgt standardmäßig als **_inline_**-Element.
 */

@Tag("kol-icon")
@NpmPackage(value = "@public-ui/components", version = "1.3.0")
@JsModule("@public-ui/components/dist/components/kol-icon")
public class KolIcon extends Component {
	/**
	 * Gibt das Aria-Label am Icon an.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt das Aria-Label am Icon an.
	 *
	 * @return String
	 */
	public String getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Gibt einen Identifier eines Icons aus den Icon's an.
	 *
	 * @param value String
	 */
	public void setIcon(final String value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Gibt einen Identifier eines Icons aus den Icon's an.
	 *
	 * @return String
	 */
	public String getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
/**
	 *
	 * @param value String
	 */
	public void setPart(final String value) {
		getElement().setProperty("_part", value);
	}

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
/**
	 *
	 * @return String
	 */
	public String getPart() {
		return getElement().getProperty("_part", null);
	}
}
