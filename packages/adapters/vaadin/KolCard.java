package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Um einzelne Bereiche Ihrer Webseite optisch hervorzuheben, bietet sich die **Card**-Komponente an. Mit ihrer Hilfe können Sie Ihre Inhalte sehr einfach strukturieren.

Die **Card**-Komponente besteht aus einem **_Titel-Bereich_**, einem **_Inhalts-Bereich_** und einem **_Fuß-Bereich_**.

Der **Titel-Bereich** wird in einer größeren Schrift dargestellt. Der **Inhalts-Bereich** ist optisch durch eine horizontale Trennlinie unterhalb des Titel-Bereichs abgetrennt und wird in der Standardschrift ausgegeben.
Der **Fuß-Bereich** wird optional durch das Attribut **`_has-footer`** aktiviert und stellt dann Platz für weitere Inhalte, z.B. eine **Button**-Komponente bereit. Der Fuß-Bereich ist optisch durch eine horizontale Trennlinie vom Inhalts-Bereich abgetrennt.
 */

@Tag("kol-card")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.22")
@JsModule("@public-ui/components/dist/components/kol-card")
public class KolCard extends Component {
	/**
	 * Macht den Footerbereich der Card sichtbar.
	 *
	 * @param value String
	 */
	public void setHasFooter(final String value) {
		getElement().setProperty("_has-footer", value);
	}

	/**
	 * Macht den Footerbereich der Card sichtbar.
	 *
	 * @return String
	 */
	public String getHasFooter() {
		return getElement().getProperty("_has-footer", null);
	}

	/**
	 * Gibt die Überschrift der Card an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value);
	}

	/**
	 * Gibt die Überschrift der Card an.
	 *
	 * @return String
	 */
	public String getHeading() {
		return getElement().getProperty("_heading", null);
	}

	/**
	 * Gibt die Überschrift der Card an.
	 *
	 * @param value String
	 */
	public void setHeadline(final String value) {
		getElement().setProperty("_headline", value);
	}

	/**
	 * Gibt die Überschrift der Card an.
	 *
	 * @return String
	 */
	public String getHeadline() {
		return getElement().getProperty("_headline", null);
	}

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value);
	}

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 *
	 * @return String
	 */
	public String getLevel() {
		return getElement().getProperty("_level", null);
	}
}
