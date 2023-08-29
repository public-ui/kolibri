package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Eine **Navigationsleiste** ist eine Gruppe von verwandten Links oder Navigationselementen, die durch Anklicken eine Aktion ausführen oder Inhalte anzeigen. Sie navigiert Nutzer:innen direkt zu bestimmten Inhalten der aktuellen Seite oder zu externen Seiten. Außerdem dient sie Nutzer:innen (ähnlich wie Registerkarten) als Steuerelement, um Inhalte anzuzeigen, auszublenden und zwischen ihnen zu wechseln.

**KoliBri** stellt eine umfangreich konfigurierbare, vertikale oder horizontale **Navigationsleiste** zur Verfügung, die mehrere Ebenen darstellen und in der Breite variiert werden kann.
Übergeordnete Menüpunkte die Untermenüpunkte enthalten, werden mit einem **Plus-Icon** am rechten Rand angezeigt. Wird der übergeordnete Menüpunkt mit dem Plus-Icon geöffnet, ändert sich das Plus-Icon automatisch zu einem **Minus-Icon**, mit dem der Menüpunkt wieder geschlossen werden kann.

Aktive Menüpunkte werden mit einer farbigen Markierung dargestellt.

Über eine optionale Schaltfläche unterhalb der Navigation kann die Breite der **Nav**-Komponente verändert werden. In der kleinsten Breite werden die Menütitel ausgeblendet und nur
noch die Icons ausgegeben.
 */

@Tag("kol-nav")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-nav")
public class KolNav extends Component {
	/**
	 * Defines the value of aria-current to be used with the current context within the navigation.
	 *
	 * @param value String
	 */
	public void setAriaCurrentValue(final String value) {
		getElement().setProperty("_aria-current-value", value.toString());
	}

	/**
	 * Defines the value of aria-current to be used with the current context within the navigation.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrentValue() {
		var value = getElement().getProperty("_aria-current-value", null);
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
	 * Defines if navigation nodes can be collapsed or not. Enabled by default.
	 *
	 * @param value String
	 */
	public void setCollapsible(final String value) {
		getElement().setProperty("_collapsible", value.toString());
	}

	/**
	 * Defines if navigation nodes can be collapsed or not. Enabled by default.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCollapsible() {
		var value = getElement().getProperty("_collapsible", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt an, ob die Navigation kompakt angezeigt wird.
	 *
	 * @param value String
	 */
	public void setCompact(final String value) {
		getElement().setProperty("_compact", value.toString());
	}

	/**
	 * Deprecated: Gibt an, ob die Navigation kompakt angezeigt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCompact() {
		var value = getElement().getProperty("_compact", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 *
	 * @param value String
	 */
	public void setHasCompactButton(final String value) {
		getElement().setProperty("_has-compact-button", value.toString());
	}

	/**
	 * Deprecated: Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCompactButton() {
		var value = getElement().getProperty("_has-compact-button", null);
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
	 * Defines the list of links, buttons or texts to render.
	 *
	 * @param value String
	 */
	public void setLinks(final String value) {
		getElement().setProperty("_links", value.toString());
	}

	/**
	 * Defines the list of links, buttons or texts to render.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLinks() {
		var value = getElement().getProperty("_links", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 *
	 * @param value String
	 */
	public void setOrientation(final String value) {
		getElement().setProperty("_orientation", value.toString());
	}

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOrientation() {
		var value = getElement().getProperty("_orientation", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Deprecated: Defines which variant should be used for presentation.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value.toString());
	}

	/**
	 * Deprecated: Defines which variant should be used for presentation.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		var value = getElement().getProperty("_variant", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
