package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Eine **Navigationsleiste** ist eine Gruppe von verwandten Links oder Navigationselementen, die durch Anklicken eine Aktion ausführen oder Inhalte anzeigen. Sie navigiert Nutzer:innen direkt zu bestimmten Inhalten der aktuellen Seite oder zu externen Seiten. Außerdem dient sie Nutzer:innen (ähnlich wie Registerkarten) als Steuerelement, um Inhalte anzuzeigen, auszublenden und zwischen ihnen zu wechseln.

**KoliBri** stellt eine umfangreich konfigurierbare, vertikale oder horizontale **Navigationsleiste** zur Verfügung, die mehrere Ebenen darstellen und in der Breite variiert werden kann.
Übergeordnete Menüpunkte die Untermenüpunkte enthalten, werden mit einem **Plus-Icon** am rechten Rand angezeigt. Wird der übergeordnete Menüpunkt mit dem Plus-Icon geöffnet, ändert sich das Plus-Icon automatisch zu einem **Minus-Icon**, mit dem der Menüpunkt wieder geschlossen werden kann.

Aktive Menüpunkte werden mit einer farbigen Markierung dargestellt.

Über eine optionale Schaltfläche unterhalb der Navigation kann die Breite der **Nav**-Komponente verändert werden. In der kleinsten Breite werden die Menütitel ausgeblendet und nur
noch die Icons ausgegeben.
 */

@Tag("kol-nav")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.20")
@JsModule("@public-ui/components/dist/components/kol-nav")
public class KolNav extends Component {
	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 *
	 * @param value String
	 */
	public void setAriaCurrentValue(final String value) {
		getElement().setProperty("_aria-current-value", value);
	}

	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 *
	 * @return String
	 */
	public String getAriaCurrentValue() {
		return getElement().getProperty("_aria-current-value", null);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 *
	 * @return String
	 */
	public String getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 *
	 * @param value String
	 */
	public void setCollapsible(final String value) {
		getElement().setProperty("_collapsible", value);
	}

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 *
	 * @return String
	 */
	public String getCollapsible() {
		return getElement().getProperty("_collapsible", null);
	}

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 *
	 * @param value String
	 */
	public void setCompact(final String value) {
		getElement().setProperty("_compact", value);
	}

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 *
	 * @return String
	 */
	public String getCompact() {
		return getElement().getProperty("_compact", null);
	}

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 *
	 * @param value String
	 */
	public void setHasCompactButton(final String value) {
		getElement().setProperty("_has-compact-button", value);
	}

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 *
	 * @return String
	 */
	public String getHasCompactButton() {
		return getElement().getProperty("_has-compact-button", null);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie an.
	 *
	 * @param value String
	 */
	public void setLinks(final String value) {
		getElement().setProperty("_links", value);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie an.
	 *
	 * @return String
	 */
	public String getLinks() {
		return getElement().getProperty("_links", null);
	}

	/**
	 * Gibt die Ausrichtung der Navigation an.
	 *
	 * @param value String
	 */
	public void setOrientation(final String value) {
		getElement().setProperty("_orientation", value);
	}

	/**
	 * Gibt die Ausrichtung der Navigation an.
	 *
	 * @return String
	 */
	public String getOrientation() {
		return getElement().getProperty("_orientation", null);
	}

	/**
	 * Stellt verschiedene Varianten der Navigation zur Verfügung.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Stellt verschiedene Varianten der Navigation zur Verfügung.
	 *
	 * @return String
	 */
	public String getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
