package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit **Badges** können Sie bestimmte Informationen auf Ihrer Webseite optisch hervorheben.
KoliBri bietet neben der Angabe der Hintergrundfarbe und automatischer Berechnung der Textfarbe auch die Möglichkeit, einem Badge ein Icon und/oder einen anderen Schriftschnitt mitzugeben.
 */

@Tag("kol-badge")
@NpmPackage(value = "@public-ui/components", version = "1.4.0-rc.14")
@JsModule("@public-ui/components/dist/components/kol-badge")
public class KolBadge extends Component {
	/**
	 * Gibt die Farbe des Hintergrundes bzw. der Schrift an.
	 *
	 * @param value String
	 */
	public void setColor(final String value) {
		getElement().setProperty("_color", value);
	}

	/**
	 * Gibt die Farbe des Hintergrundes bzw. der Schrift an.
	 *
	 * @return String
	 */
	public String getColor() {
		return getElement().getProperty("_color", null);
	}

	/**
	 * Gibt einen Identifier eines Icons aus den Icofont's an. (https://icofont.com/)
	 *
	 * @param value String
	 */
	public void setIcon(final String value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Gibt einen Identifier eines Icons aus den Icofont's an. (https://icofont.com/)
	 *
	 * @return String
	 */
	public String getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @param value String
	 */
	public void setIconOnly(final String value) {
		getElement().setProperty("_icon-only", value);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @return String
	 */
	public String getIconOnly() {
		return getElement().getProperty("_icon-only", null);
	}

	/**
	 * Gibt den Label-Text des Badges an.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Gibt den Label-Text des Badges an.
	 *
	 * @return String
	 */
	public String getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 *
	 * @param value String
	 */
	public void setSmartButton(final String value) {
		getElement().setProperty("_smart-button", value);
	}

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 *
	 * @return String
	 */
	public String getSmartButton() {
		return getElement().getProperty("_smart-button", null);
	}
}
