package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Der LinkButton ist semantisch ein Link und hat das Design eines Buttons. Hierzu werden alle relevanten Properties der Link-Komponente übernommen und um die Design-bestimmenden Properties des Buttons erweitert.
Weitere Informationen zum Aussehen finden Sie auf der <kol-link _href="/docs/components/button" _label="/docs/components/button" _label="Seite des Buttons"></kol-link>.
 */

@Tag("kol-link-button")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.25")
@JsModule("@public-ui/components/dist/components/kol-link-button")
public class KolLinkButton extends Component {
	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @param value String
	 */
	public void setAriaControls(final String value) {
		getElement().setProperty("_aria-controls", value.toString());
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaControls() {
		var value = getElement().getProperty("_aria-controls", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus das interaktive Element der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @param value String
	 */
	public void setAriaCurrent(final String value) {
		getElement().setProperty("_aria-current", value.toString());
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus das interaktive Element der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrent() {
		var value = getElement().getProperty("_aria-current", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @param value String
	 */
	public void setAriaExpanded(final String value) {
		getElement().setProperty("_aria-expanded", value.toString());
	}

	/**
	 * Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaExpanded() {
		var value = getElement().getProperty("_aria-expanded", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		var value = getElement().getProperty("_aria-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @param value String
	 */
	public void setAriaSelected(final String value) {
		getElement().setProperty("_aria-selected", value.toString());
	}

	/**
	 * Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaSelected() {
		var value = getElement().getProperty("_aria-selected", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the custom class attribute.
	 *
	 * @param value String
	 */
	public void setCustomClass(final String value) {
		getElement().setProperty("_custom-class", value.toString());
	}

	/**
	 * Defines the custom class attribute.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCustomClass() {
		var value = getElement().getProperty("_custom-class", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 *
	 * @param value String
	 */
	public void setDisabled(final String value) {
		getElement().setProperty("_disabled", value.toString());
	}

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
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
	 * Tells the label and shows it in a Tooltip instead.
TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 *
	 * @param value String
	 */
	public void setHideLabel(final String value) {
		getElement().setProperty("_hide-label", value.toString());
	}

	/**
	 * Tells the label and shows it in a Tooltip instead.
TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		var value = getElement().getProperty("_hide-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * This property is used for a link from a reference to the target URL.
	 *
	 * @param value String
	 */
	public void setHref(final String value) {
		getElement().setProperty("_href", value.toString());
	}

	/**
	 * This property is used for a link from a reference to the target URL.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHref() {
		var value = getElement().getProperty("_href", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the icon classnames.
	 *
	 * @param value String
	 */
	public void setIcon(final String value) {
		getElement().setProperty("_icon", value.toString());
	}

	/**
	 * Defines the icon classnames.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		var value = getElement().getProperty("_icon", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 *
	 * @param value String
	 */
	public void setIconOnly(final String value) {
		getElement().setProperty("_icon-only", value.toString());
	}

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconOnly() {
		var value = getElement().getProperty("_icon-only", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
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
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @param value String
	 */
	public void setTabIndex(final String value) {
		getElement().setProperty("_tab-index", value.toString());
	}

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
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
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 *
	 * @param value String
	 */
	public void setTargetDescription(final String value) {
		getElement().setProperty("_target-description", value.toString());
	}

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
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
	 * Defines which variant should be used for presentation.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value.toString());
	}

	/**
	 * Defines which variant should be used for presentation.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		var value = getElement().getProperty("_variant", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
