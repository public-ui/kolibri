package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Heading**-Komponente kann überall dort verwendet werden, wo eine Überschrift angezeigt werden soll. Durch die Verwendung der unterschiedlichen Größen, lassen sich Inhalte klar strukturieren und Seiten wirkungsvoll und abwechslungsreich präsentieren. Sie trennt Styling von Semantik und ermöglicht Flexibilität.
 */

@Tag("kol-heading")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-heading")
public class KolHeading extends Component {
	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	public void set_level(1 | 2 | 3 | 4 | 5 | 6 | undefined _level) {
		getElement().setProperty("_level", _level);
	}

}