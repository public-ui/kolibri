package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * **Buttons** dienen dazu, Nutzer:innen Auswahlmöglichkeiten für Aktionen anzuzeigen und diese in einer klaren Hierarchie anzuordnen. Sie helfen den Nutzer:innen, die wichtigsten Aktionen einer Seite oder innerhalb eines Applikation zu finden und ermöglichen es ihm, diese Aktionen auszuführen.

Die **ButtonGroup**-Komponente fasst mehrere Buttons zu einer optischen und funktionalen Einheit zusammen.
 */

@Tag("kol-button-group-wc")
@NpmPackage(value = "@public-ui/components", version = "1.5.0-rc.3")
@JsModule("@public-ui/components/dist/components/kol-button-group-wc")
public class KolButtonGroupWc extends Component {
}
