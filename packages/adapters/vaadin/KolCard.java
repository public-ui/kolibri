package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Um einzelne Bereiche Ihrer Webseite optisch hervorzuheben, bietet sich die **Card**-Komponente an. Mit ihrer Hilfe können Sie Ihre Inhalte sehr einfach strukturieren.

Die **Card**-Komponente besteht aus einem **_Titel-Bereich_**, einem **_Inhalts-Bereich_** und einem **_Fuß-Bereich_**.

Der **Titel-Bereich** wird in einer größeren Schrift dargestellt. Der **Inhalts-Bereich** ist optisch durch eine horizontale Trennlinie unterhalb des Titel-Bereichs abgetrennt und wird in der Standardschrift ausgegeben.
Der **Fuß-Bereich** wird optional durch das Attribut **`_has-footer`** aktiviert und stellt dann Platz für weitere Inhalte, z.B. eine **Button**-Komponente bereit. Der Fuß-Bereich ist optisch durch eine horizontale Trennlinie vom Inhalts-Bereich abgetrennt.
 */

@Tag("kol-card")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.21")
@JsModule("@public-ui/components/dist/components/kol-card")
public class KolCard extends Component {
	/**
	 * Macht den Footerbereich der Card sichtbar.
	 *
	 * @param value String
	 */
	public void setHasFooter(final String value) {
		getElement().setProperty("_has-footer", value.toString());
	}

	/**
	 * Macht den Footerbereich der Card sichtbar.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasFooter() {
		var value = getElement().getProperty("_has-footer", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value.toString());
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeading() {
		var value = getElement().getProperty("_heading", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @param value String
	 */
	public void setHeadline(final String value) {
		getElement().setProperty("_headline", value.toString());
	}

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeadline() {
		var value = getElement().getProperty("_headline", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * 
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * 
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value.toString());
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLevel() {
		var value = getElement().getProperty("_level", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
