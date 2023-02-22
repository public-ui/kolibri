package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Heading**-Komponente kann überall dort verwendet werden, wo eine Überschrift angezeigt werden soll. Durch die Verwendung der unterschiedlichen Größen, lassen sich Inhalte klar strukturieren und Seiten wirkungsvoll und abwechslungsreich präsentieren. Sie trennt Styling von Semantik und ermöglicht Flexibilität.
 */

@Tag("kol-heading")
@NpmPackage(value = "@public-ui/components", version = "1.4.0-rc.9")
@JsModule("@public-ui/components/dist/components/kol-heading")
public class KolHeading extends Component {
	/**
	 * Gibt den Text der Überschrift an.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Gibt den Text der Überschrift an.
	 *
	 * @return String
	 */
	public String getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder ob es keine Überschrift ist, sondern nur fett gedruckt.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder ob es keine Überschrift ist, sondern nur fett gedruckt.
	 *
	 * @return String
	 */
	public String getLevel() {
		return getElement().getProperty("_level", null);
	}

	/**
	 * Gibt den Text der zusätzlichen Beschriftung an.
	 *
	 * @param value String
	 */
	public void setOverline(final String value) {
		getElement().setProperty("_overline", value);
	}

	/**
	 * Gibt den Text der zusätzlichen Beschriftung an.
	 *
	 * @return String
	 */
	public String getOverline() {
		return getElement().getProperty("_overline", null);
	}
}
