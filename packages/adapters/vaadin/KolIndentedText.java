package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Heben Sie einzelne Informationen auf Ihrer Webseite optisch mit der **IndentedText**-Komponente hervor. Die Komponente eignet sich nicht nur für besondere Abschnitte auf der Webseite, sondern auch beispielsweise für Zitate.

In der Komponente kann beliebiger HTML-Code verwendet werden.
 */

@Tag("kol-indented-text")
@NpmPackage(value = "@public-ui/components", version = "1.4.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-indented-text")
public class KolIndentedText extends Component {
}
