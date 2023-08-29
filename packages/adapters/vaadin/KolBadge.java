package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Mit **Badges** können Sie bestimmte Informationen auf Ihrer Webseite optisch hervorheben.
KoliBri bietet neben der Angabe der Hintergrundfarbe und automatischer Berechnung der Textfarbe auch die Möglichkeit, einem Badge ein Icon und/oder einen anderen Schriftschnitt mitzugeben.
 */

@Tag("kol-badge")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-badge")
public class KolBadge extends Component {
	/**
	 * Defines the backgroundColor and foregroundColor.
	 *
	 * @param value String
	 */
	public void setColor(final String value) {
		getElement().setProperty("_color", value.toString());
	}

	/**
	 * Defines the backgroundColor and foregroundColor.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getColor() {
		var value = getElement().getProperty("_color", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated:
⚠️ We do not support the `_hide-label` property for the `kol-badge` element,
  since it would not be accessible without visible labeling. A separate tooltip
  is not planed, because a badge is not an interactive element.
	 *
	 * @param value String
	 */
	public void setHideLabel(final String value) {
		getElement().setProperty("_hide-label", value.toString());
	}

	/**
	 * Deprecated:
⚠️ We do not support the `_hide-label` property for the `kol-badge` element,
  since it would not be accessible without visible labeling. A separate tooltip
  is not planed, because a badge is not an interactive element.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		var value = getElement().getProperty("_hide-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the icon classnames (e.g. `_icon="fa-solid fa-user"`).
	 *
	 * @param value String
	 */
	public void setIcon(final String value) {
		getElement().setProperty("_icon", value.toString());
	}

	/**
	 * Defines the icon classnames (e.g. `_icon="fa-solid fa-user"`).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		var value = getElement().getProperty("_icon", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 *
	 * @param value String
	 */
	public void setIconOnly(final String value) {
		getElement().setProperty("_icon-only", value.toString());
	}

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconOnly() {
		var value = getElement().getProperty("_icon-only", null);
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
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 *
	 * @param value String
	 */
	public void setSmartButton(final String value) {
		getElement().setProperty("_smart-button", value.toString());
	}

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSmartButton() {
		var value = getElement().getProperty("_smart-button", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
