package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Heben Sie einzelne Informationen auf Ihrer Webseite optisch mit der **IndentedText**-Komponente hervor. Die Komponente eignet sich nicht nur für besondere Abschnitte auf der Webseite, sondern auch beispielsweise für Zitate (für verlinkte Zitate kann auch die <kol-link _href="/docs/components/quote/" _label="/docs/components/quote/" _label="kol-quote-Komponente"></kol-link> verwendet werden.).
 */

@Tag("kol-indented-text")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.21")
@JsModule("@public-ui/components/dist/components/kol-indented-text")
public class KolIndentedText extends Component {
}
