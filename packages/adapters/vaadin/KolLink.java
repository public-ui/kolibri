package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Link**-Komponente rendert einen auf Barrierefreiheit optimierten Link, der als Text, als Icon oder auch in Kombination ausgegeben werden kann.

Beachten Sie, dass die Komponente automatisch ein Padding links und rechts zum umgebenden Text erzeugt. Sie kann daher im Fließtext ohne
Eingabe von Leerzeichen eingefügt werden. Zusätzliche Leerzeichen vergrößern den Abstand zum umgebenden Text.
 */

@Tag("kol-link")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-link")
public class KolLink extends Component {
	/**
	 * Deprecated: Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @param value String
	 */
	public void setAriaControls(final String value) {
		getElement().setProperty("_aria-controls", value.toString());
	}

	/**
	 * Deprecated: Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaControls() {
		var value = getElement().getProperty("_aria-controls", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @param value String
	 */
	public void setAriaCurrent(final String value) {
		getElement().setProperty("_aria-current", value.toString());
	}

	/**
	 * Deprecated: Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrent() {
		var value = getElement().getProperty("_aria-current", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @param value String
	 */
	public void setAriaExpanded(final String value) {
		getElement().setProperty("_aria-expanded", value.toString());
	}

	/**
	 * Deprecated: Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaExpanded() {
		var value = getElement().getProperty("_aria-expanded", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value.toString());
	}

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		var value = getElement().getProperty("_aria-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @param value String
	 */
	public void setAriaSelected(final String value) {
		getElement().setProperty("_aria-selected", value.toString());
	}

	/**
	 * Deprecated: Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaSelected() {
		var value = getElement().getProperty("_aria-selected", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Makes the element not focusable and ignore all events.
	 *
	 * @param value String
	 */
	public void setDisabled(final String value) {
		getElement().setProperty("_disabled", value.toString());
	}

	/**
	 * Deprecated: Makes the element not focusable and ignore all events.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDisabled() {
		var value = getElement().getProperty("_disabled", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 *
	 * @param value String
	 */
	public void setDownload(final String value) {
		getElement().setProperty("_download", value.toString());
	}

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDownload() {
		var value = getElement().getProperty("_download", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Hides the label and shows the description in a Tooltip instead.
	 *
	 * @param value String
	 */
	public void setHideLabel(final String value) {
		getElement().setProperty("_hide-label", value.toString());
	}

	/**
	 * Hides the label and shows the description in a Tooltip instead.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		var value = getElement().getProperty("_hide-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the target URI of the link.
	 *
	 * @param value String
	 */
	public void setHref(final String value) {
		getElement().setProperty("_href", value.toString());
	}

	/**
	 * Defines the target URI of the link.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHref() {
		var value = getElement().getProperty("_href", null);
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
	 * Deprecated: Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @param value String
	 */
	public void setIconAlign(final String value) {
		getElement().setProperty("_icon-align", value.toString());
	}

	/**
	 * Deprecated: Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconAlign() {
		var value = getElement().getProperty("_icon-align", null);
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Listen on a aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
	 *
	 * @param value String
	 */
	public void setListenAriaCurrent(final String value) {
		getElement().setProperty("_listen-aria-current", value.toString());
	}

	/**
	 * Listen on a aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getListenAriaCurrent() {
		var value = getElement().getProperty("_listen-aria-current", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the role of the components primary element.
	 *
	 * @param value String
	 */
	public void setRole(final String value) {
		getElement().setProperty("_role", value.toString());
	}

	/**
	 * Defines the role of the components primary element.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRole() {
		var value = getElement().getProperty("_role", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @param value String
	 */
	public void setSelector(final String value) {
		getElement().setProperty("_selector", value.toString());
	}

	/**
	 * Deprecated: Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSelector() {
		var value = getElement().getProperty("_selector", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @param value String
	 */
	public void setStealth(final String value) {
		getElement().setProperty("_stealth", value.toString());
	}

	/**
	 * Deprecated: Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getStealth() {
		var value = getElement().getProperty("_stealth", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @param value String
	 */
	public void setTabIndex(final String value) {
		getElement().setProperty("_tab-index", value.toString());
	}

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabIndex() {
		var value = getElement().getProperty("_tab-index", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines where to open the link.
	 *
	 * @param value String
	 */
	public void setTarget(final String value) {
		getElement().setProperty("_target", value.toString());
	}

	/**
	 * Defines where to open the link.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTarget() {
		var value = getElement().getProperty("_target", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the description to use when the link is going to be opened in another application.
	 *
	 * @param value String
	 */
	public void setTargetDescription(final String value) {
		getElement().setProperty("_target-description", value.toString());
	}

	/**
	 * Defines the description to use when the link is going to be opened in another application.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTargetDescription() {
		var value = getElement().getProperty("_target-description", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @param value String
	 */
	public void setTooltipAlign(final String value) {
		getElement().setProperty("_tooltip-align", value.toString());
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		var value = getElement().getProperty("_tooltip-align", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt den Verwendungsfall des Links an.
	 *
	 * @param value String
	 */
	public void setUseCase(final String value) {
		getElement().setProperty("_use-case", value.toString());
	}

	/**
	 * Deprecated: Gibt den Verwendungsfall des Links an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getUseCase() {
		var value = getElement().getProperty("_use-case", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
