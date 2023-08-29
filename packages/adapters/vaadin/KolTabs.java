package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Tabs**-Komponente wird verwendet, um verwandte Inhalte auf derselben Seite zu organisieren und zwischen ihnen zu navigieren. Tabs sorgen dafür, dass große Inhaltsmengen für Nutzer:innen leichter organisiert werden können. Tabs sind in Registerkartenleisten angeordnet, die als Registerkartengruppen bezeichnet werden, wobei die Registerkartenbeschriftung den Nutzer:innen einen Hinweis darauf gibt, welcher Inhalt angezeigt wird, wenn die Registerkarte ausgewählt wird.
 */

@Tag("kol-tabs")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-tabs")
public class KolTabs extends Component {
	/**
	 * Defines the position of the tab captions.
	 *
	 * @param value String
	 */
	public void setAlign(final String value) {
		getElement().setProperty("_align", value.toString());
	}

	/**
	 * Defines the position of the tab captions.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAlign() {
		var value = getElement().getProperty("_align", null);
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
	 * Defines which tab is active.
	 *
	 * @param value String
	 */
	public void setSelected(final String value) {
		getElement().setProperty("_selected", value.toString());
	}

	/**
	 * Defines which tab is active.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSelected() {
		var value = getElement().getProperty("_selected", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines the tab captions.
	 *
	 * @param value String
	 */
	public void setTabs(final String value) {
		getElement().setProperty("_tabs", value.toString());
	}

	/**
	 * Defines the tab captions.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabs() {
		var value = getElement().getProperty("_tabs", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Setzt die Position der Registrierkarten.
	 *
	 * @param value String
	 */
	public void setTabsAlign(final String value) {
		getElement().setProperty("_tabs-align", value.toString());
	}

	/**
	 * Deprecated: Setzt die Position der Registrierkarten.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabsAlign() {
		var value = getElement().getProperty("_tabs-align", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
