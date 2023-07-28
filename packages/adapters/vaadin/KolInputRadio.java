package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die Komponente **InputRadio** besteht aus einer Sammlung von Radio-Elementen und stellt so eine Auswahlmöglichkeit zwischen verschiedenen Werten dar. Es kann immer nur ein einzelner Wert zur gleichen Zeit ausgewählt werden. Ausgewählte Radio-Elemente werden i.d.R. mit einem gefüllten und optisch hervorgehobenen Kreis dargestellt.

<kol-alert _alert _heading="Hinweis" _level="1" _type="info">
  Das Input-Radio dient der Abbildung einer Auswahlmöglichkeit bei der mindestens und maximal eine Auswahl getroffen werden kann. Das bedeutet, dass ein Input-Radio nicht einzeln vorkommen kann. Aufgrund dessen haben wir die Komponente als Listen-Komponente umgesetzt.
</kol-alert><br/>
 */

@Tag("kol-input-radio")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.21")
@JsModule("@public-ui/components/dist/components/kol-input-radio")
public class KolInputRadio extends Component {
	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 *
	 * @param value String
	 */
	public void setAccessKey(final String value) {
		getElement().setProperty("_access-key", value.toString());
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAccessKey() {
		var value = getElement().getProperty("_access-key", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 *
	 * @param value String
	 */
	public void setAlert(final String value) {
		getElement().setProperty("_alert", value.toString());
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlert() {
		var value = getElement().getProperty("_alert", null);
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
	 * Gibt den Text für eine Fehlermeldung an.
	 *
	 * @param value String
	 */
	public void setError(final String value) {
		getElement().setProperty("_error", value.toString());
	}

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getError() {
		var value = getElement().getProperty("_error", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 *
	 * @param value String
	 */
	public void setHideLabel(final String value) {
		getElement().setProperty("_hide-label", value.toString());
	}

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHideLabel() {
		var value = getElement().getProperty("_hide-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt den Hinweistext an.
	 *
	 * @param value String
	 */
	public void setHint(final String value) {
		getElement().setProperty("_hint", value.toString());
	}

	/**
	 * Gibt den Hinweistext an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHint() {
		var value = getElement().getProperty("_hint", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 *
	 * @param value String
	 */
	public void setId(final String value) {
		getElement().setProperty("_id", value.toString());
	}

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getId() {
		var value = getElement().getProperty("_id", null);
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
	 * Gibt die Liste der Optionen für das Eingabefeld an.
	 *
	 * @param value String
	 */
	public void setList(final String value) {
		getElement().setProperty("_list", value.toString());
	}

	/**
	 * Gibt die Liste der Optionen für das Eingabefeld an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getList() {
		var value = getElement().getProperty("_list", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 *
	 * @param value String
	 */
	public void setName(final String value) {
		getElement().setProperty("_name", value.toString());
	}

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getName() {
		var value = getElement().getProperty("_name", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Options the user can choose from, also supporting Optgroup.
	 *
	 * @param value String
	 */
	public void setOptions(final String value) {
		getElement().setProperty("_options", value.toString());
	}

	/**
	 * Options the user can choose from, also supporting Optgroup.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOptions() {
		var value = getElement().getProperty("_options", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 *
	 * @param value String
	 */
	public void setOrientation(final String value) {
		getElement().setProperty("_orientation", value.toString());
	}

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOrientation() {
		var value = getElement().getProperty("_orientation", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 *
	 * @param value String
	 */
	public void setRequired(final String value) {
		getElement().setProperty("_required", value.toString());
	}

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRequired() {
		var value = getElement().getProperty("_required", null);
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
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value String
	 */
	public void setTooltipAlign(final String value) {
		getElement().setProperty("_tooltip-align", value.toString());
	}

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		var value = getElement().getProperty("_tooltip-align", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 *
	 * @param value String
	 */
	public void setTouched(final String value) {
		getElement().setProperty("_touched", value.toString());
	}

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTouched() {
		var value = getElement().getProperty("_touched", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt den Wert der Radio an. (Known Bug: https://github.com/ionic-team/stencil/issues/3902)
	 *
	 * @param value String
	 */
	public void setValue(final String value) {
		getElement().setProperty("_value", value.toString());
	}

	/**
	 * Gibt den Wert der Radio an. (Known Bug: https://github.com/ionic-team/stencil/issues/3902)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getValue() {
		var value = getElement().getProperty("_value", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
