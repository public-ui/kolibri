package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Eine **Navigationsleiste** ist eine Gruppe von verwandten Links oder „Navigationselementen“, die durch Anklicken eine Aktion ausführen oder Inhalte anzeigen. Sie navigiert Nutzer:innen direkt zu bestimmten Inhalten der aktuellen Seite oder zu externen Seiten. Außerdem dient sie Nutzer:innen (ähnlich wie Registerkarten) als Steuerelement, um Inhalte anzuzeigen, auszublenden und zwischen ihnen zu wechseln. Dabei werden häufig animierte Übergänge verwendet.

Die **Nav**-Komponente stellt eine vollwertige vertikale , bzw. horizontale **Navigationsleiste** bereit. Sie kann mehrere Ebenen enthalten und in verschiedenen Breiten ausgegeben werden. Die **Nav**-Komponente repräsentiert die Struktur der Webseite und hat so eine fundamentale Bedeutung sowohl für Nutzer:innen, als auch für Suchmaschinen.

**KoliBri** stellt eine umfangreich konfigurierbare, vertikale oder horizontale **Navigationsleiste** zur Verfügung, die mehrere Ebenen darstellen und in der Breite variiert werden kann.
Menüpunkte der obersten Ebene, wie z.B. die Startseite, werden stets über die ganze Breite der **Navigation** gestreckt. Nachfolgende Ebenen, als direkte Kindelemente, werden auf der linken Seite
etwas eingerückt ausgegeben. Übergeordnete Menüpunkte die Untermenüpunkte enthalten, werden mit einem **Plus-Icon** am linken Rand angezeigt. Wird der übergeordnete Menüpunkt mit dem Plus-Icon geöffnet, ändert sich
das Plus-Icon automatisch zu einem **Minus-Icon**, mit dem der Menüpunkt wieder geschlossen werden kann.

Aktive Menüpunkte werden mit einer farbigen Markierung dargestellt.

Über ein **Doppelpfeil-Icon** unterhalb der Navigation kann die Breite der **Nav**-Komponente verändert werden. In der kleinsten Breite werden die Menütitel ausgeblendet und nur
noch die Icons ausgegeben.
 */

@Tag("kol-nav")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-nav")
public class KolNav extends Component {
	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 */
	public void set_ariaCurrentValue("date" | "location" | "page" | "step" | "time" | boolean _ariaCurrentValue) {
		getElement().setProperty("_aria-current-value", _ariaCurrentValue);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	public void set_ariaLabel(String _ariaLabel) {
		getElement().setProperty("_aria-label", _ariaLabel);
	}

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 */
	public void set_collapsible(boolean | undefined _collapsible) {
		getElement().setProperty("_collapsible", _collapsible);
	}

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 */
	public void set_compact(boolean | undefined _compact) {
		getElement().setProperty("_compact", _compact);
	}

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 */
	public void set_hasCompactButton(boolean | undefined _hasCompactButton) {
		getElement().setProperty("_has-compact-button", _hasCompactButton);
	}

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie an.
	 */
	public void set_links(NavLinkWithChildrenProps[] | string _links) {
		getElement().setProperty("_links", _links);
	}

	/**
	 * Gibt die Ausrichtung der Navigation an.
	 */
	public void set_orientation("horizontal" | "vertical" | undefined _orientation) {
		getElement().setProperty("_orientation", _orientation);
	}

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	public void set_variant("primary" | "secondary" | undefined _variant) {
		getElement().setProperty("_variant", _variant);
	}

}