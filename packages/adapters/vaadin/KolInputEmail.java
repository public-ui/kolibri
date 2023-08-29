package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Der Input-Typ **E-Mail** erzeugt ein Eingabefeld für E-Mails.
 */

@Tag("kol-input-email")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-input-email")
public class KolInputEmail extends Component {
	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 *
	 * @param value String
	 */
	public void setAccessKey(final String value) {
		getElement().setProperty("_access-key", value.toString());
	}

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAccessKey() {
		var value = getElement().getProperty("_access-key", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines whether the screen-readers should read out the notification.
	 *
	 * @param value String
	 */
	public void setAlert(final String value) {
		getElement().setProperty("_alert", value.toString());
	}

	/**
	 * Defines whether the screen-readers should read out the notification.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlert() {
		var value = getElement().getProperty("_alert", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines whether the input can be auto-completed.
	 *
	 * @param value String
	 */
	public void setAutoComplete(final String value) {
		getElement().setProperty("_auto-complete", value.toString());
	}

	/**
	 * Defines whether the input can be auto-completed.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAutoComplete() {
		var value = getElement().getProperty("_auto-complete", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 *
	 * @param value String
	 */
	public void setDisabled(final String value) {
		getElement().setProperty("_disabled", value.toString());
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDisabled() {
		var value = getElement().getProperty("_disabled", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the error message text.
	 *
	 * @param value String
	 */
	public void setError(final String value) {
		getElement().setProperty("_error", value.toString());
	}

	/**
	 * Defines the error message text.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getError() {
		var value = getElement().getProperty("_error", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Shows the character count on the lower border of the input.
	 *
	 * @param value String
	 */
	public void setHasCounter(final String value) {
		getElement().setProperty("_has-counter", value.toString());
	}

	/**
	 * Shows the character count on the lower border of the input.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCounter() {
		var value = getElement().getProperty("_has-counter", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Hides the label.
	 *
	 * @param value String
	 */
	public void setHideLabel(final String value) {
		getElement().setProperty("_hide-label", value.toString());
	}

	/**
	 * Hides the label.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		var value = getElement().getProperty("_hide-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the hint text.
	 *
	 * @param value String
	 */
	public void setHint(final String value) {
		getElement().setProperty("_hint", value.toString());
	}

	/**
	 * Defines the hint text.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHint() {
		var value = getElement().getProperty("_hint", null);
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
	 * Defines the internal ID of the primary component element.
	 *
	 * @param value String
	 */
	public void setId(final String value) {
		getElement().setProperty("_id", value.toString());
	}

	/**
	 * Defines the internal ID of the primary component element.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getId() {
		var value = getElement().getProperty("_id", null);
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
	 * Deprecated: Gibt die Liste der Vorschlagswörter an.
	 *
	 * @param value String
	 */
	public void setList(final String value) {
		getElement().setProperty("_list", value.toString());
	}

	/**
	 * Deprecated: Gibt die Liste der Vorschlagswörter an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getList() {
		var value = getElement().getProperty("_list", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the maximum number of input characters.
	 *
	 * @param value String
	 */
	public void setMaxLength(final String value) {
		getElement().setProperty("_max-length", value.toString());
	}

	/**
	 * Defines the maximum number of input characters.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMaxLength() {
		var value = getElement().getProperty("_max-length", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Makes the input accept multiple inputs.
	 *
	 * @param value String
	 */
	public void setMultiple(final String value) {
		getElement().setProperty("_multiple", value.toString());
	}

	/**
	 * Makes the input accept multiple inputs.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getMultiple() {
		var value = getElement().getProperty("_multiple", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the technical name of an input field.
	 *
	 * @param value String
	 */
	public void setName(final String value) {
		getElement().setProperty("_name", value.toString());
	}

	/**
	 * Defines the technical name of an input field.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getName() {
		var value = getElement().getProperty("_name", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines a validation pattern for the input field.
	 *
	 * @param value String
	 */
	public void setPattern(final String value) {
		getElement().setProperty("_pattern", value.toString());
	}

	/**
	 * Defines a validation pattern for the input field.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPattern() {
		var value = getElement().getProperty("_pattern", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 *
	 * @param value String
	 */
	public void setPlaceholder(final String value) {
		getElement().setProperty("_placeholder", value.toString());
	}

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPlaceholder() {
		var value = getElement().getProperty("_placeholder", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Makes the input element read only.
	 *
	 * @param value String
	 */
	public void setReadOnly(final String value) {
		getElement().setProperty("_read-only", value.toString());
	}

	/**
	 * Makes the input element read only.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getReadOnly() {
		var value = getElement().getProperty("_read-only", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Makes the input element required.
	 *
	 * @param value String
	 */
	public void setRequired(final String value) {
		getElement().setProperty("_required", value.toString());
	}

	/**
	 * Makes the input element required.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRequired() {
		var value = getElement().getProperty("_required", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die Breite des Eingabefeldes in Buchstabenbreiten.
	 *
	 * @param value String
	 */
	public void setSize(final String value) {
		getElement().setProperty("_size", value.toString());
	}

	/**
	 * Setzt die Breite des Eingabefeldes in Buchstabenbreiten.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSize() {
		var value = getElement().getProperty("_size", null);
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

	/**
	 * Suggestions to provide for the input.
	 *
	 * @param value String
	 */
	public void setSuggestions(final String value) {
		getElement().setProperty("_suggestions", value.toString());
	}

	/**
	 * Suggestions to provide for the input.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSuggestions() {
		var value = getElement().getProperty("_suggestions", null);
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
	 * Shows if the input was touched by a user.
	 *
	 * @param value String
	 */
	public void setTouched(final String value) {
		getElement().setProperty("_touched", value.toString());
	}

	/**
	 * Shows if the input was touched by a user.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTouched() {
		var value = getElement().getProperty("_touched", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the value of the input.
	 *
	 * @param value String
	 */
	public void setValue(final String value) {
		getElement().setProperty("_value", value.toString());
	}

	/**
	 * Defines the value of the input.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getValue() {
		var value = getElement().getProperty("_value", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
