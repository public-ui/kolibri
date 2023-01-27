package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Um einzelne Bereiche Ihrer Webseite optisch hervorzuheben, bietet sich die **Card**-Komponente an. Mit ihrer Hilfe können Sie Ihre Inhalte sehr einfach strukturieren.

Die **Card**-Komponente besteht aus einem **_Titel-Bereich_**, einem **_Inhalts-Bereich_** und einem **_Fuß-Bereich_**.

Der **Titel-Bereich** wird in einer größeren Schrift dargestellt. Der **Inhalts-Bereich** ist optisch durch eine horizontale Trennlinie unterhalb des Titel-Bereichs abgetrennt und wird in der Standardschrift ausgegeben.
Der **Fuß-Bereich** wird optional durch ein Attribut aktiviert und stellt dann Platz für weitere Inhalte, z.B. eine **Button**-Komponente bereit. Der Fuß-Bereich ist optisch durch eine horizontale Trennlinie vom Inhalts-Bereich abgetrennt.
 */

@Tag("kol-card")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-card")
public class KolCard extends Component {
	/**
	 * Gibt an, ob die Card einen Footer-Bereich hat.
	 */
	public void set_hasFooter(boolean | undefined _hasFooter) {
		getElement().setProperty("_has-footer", _hasFooter);
	}

	/**
	 * Gibt die Überschrift der Card an.
	 */
	public void set_heading(String _heading) {
		getElement().setProperty("_heading", _heading);
	}

	/**
	 * Gibt die Überschrift der Card an.
	 */
	public void set_headline(string | undefined _headline) {
		getElement().setProperty("_headline", _headline);
	}

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	public void set_level(1 | 2 | 3 | 4 | 5 | 6 | undefined _level) {
		getElement().setProperty("_level", _level);
	}

}