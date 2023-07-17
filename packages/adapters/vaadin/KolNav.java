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
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.12")
@JsModule("@public-ui/components/dist/components/kol-nav")
public class KolNav extends Component {
	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setAriaCurrentValue(final Optional<String> value) {
		getElement().setProperty("_aria-current-value", value);
	}

	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrentValue() {
		return getElement().getProperty("_aria-current-value", null);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value Optional<String>
	 */
	public void setAriaLabel(final Optional<String> value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 *
	 * @param value Optional<String>
	 */
	public void setCollapsible(final Optional<String> value) {
		getElement().setProperty("_collapsible", value);
	}

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCollapsible() {
		return getElement().getProperty("_collapsible", null);
	}

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 *
	 * @param value Optional<String>
	 */
	public void setCompact(final Optional<String> value) {
		getElement().setProperty("_compact", value);
	}

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getCompact() {
		return getElement().getProperty("_compact", null);
	}

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 *
	 * @param value Optional<String>
	 */
	public void setHasCompactButton(final Optional<String> value) {
		getElement().setProperty("_has-compact-button", value);
	}

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHasCompactButton() {
		return getElement().getProperty("_has-compact-button", null);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value Optional<String>
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt die Liste der darzustellenden Button, Links oder Texte an.
	 *
	 * @param value String
	 */
	public void setLinks(final Optional<String> value) {
		getElement().setProperty("_links", value);
	}

	/**
	 * Gibt die Liste der darzustellenden Button, Links oder Texte an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLinks() {
		return getElement().getProperty("_links", null);
	}

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 *
	 * @param value Optional<String>
	 */
	public void setOrientation(final Optional<String> value) {
		getElement().setProperty("_orientation", value);
	}

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOrientation() {
		return getElement().getProperty("_orientation", null);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
