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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-badge")
public class KolBadge extends Component {
	/**
	 * Setzt die Hintergrundfarbe.
	 *
	 * @param value Optional<String>
	 */
	public void setColor(final Optional<String> value) {
		getElement().setProperty("_color", value);
	}

	/**
	 * Setzt die Hintergrundfarbe.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getColor() {
		return getElement().getProperty("_color", null);
	}

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 *
	 * @param value Optional<String>
	 */
	public void setIcon(final Optional<String> value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @param value Optional<String>
	 */
	public void setIconOnly(final Optional<String> value) {
		getElement().setProperty("_icon-only", value);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconOnly() {
		return getElement().getProperty("_icon-only", null);
	}

	/**
	 * Setzt den sichtbaren Text des Elements.
	 *
	 * @param value String
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt den sichtbaren Text des Elements.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 *
	 * @param value Optional<String>
	 */
	public void setSmartButton(final Optional<String> value) {
		getElement().setProperty("_smart-button", value);
	}

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSmartButton() {
		return getElement().getProperty("_smart-button", null);
	}
}
