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
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-card")
public class KolCard extends Component {
	/**
	 * Defines whether the element can be closed.
	 *
	 * @param value String
	 */
	public void setHasCloser(final String value) {
		getElement().setProperty("_has-closer", value.toString());
	}

	/**
	 * Defines whether the element can be closed.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCloser() {
		var value = getElement().getProperty("_has-closer", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Shows the slot="footer".
	 *
	 * @param value String
	 */
	public void setHasFooter(final String value) {
		getElement().setProperty("_has-footer", value.toString());
	}

	/**
	 * Shows the slot="footer".
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasFooter() {
		var value = getElement().getProperty("_has-footer", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 *
	 * @param value String
	 */
	public void setHeading(final String value) {
		getElement().setProperty("_heading", value.toString());
	}

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeading() {
		var value = getElement().getProperty("_heading", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 *
	 * @param value String
	 */
	public void setHeadline(final String value) {
		getElement().setProperty("_headline", value.toString());
	}

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHeadline() {
		var value = getElement().getProperty("_headline", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 *
	 * @param value String
	 */
	public void setLevel(final String value) {
		getElement().setProperty("_level", value.toString());
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLevel() {
		var value = getElement().getProperty("_level", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
