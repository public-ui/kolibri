package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Mit Hilfe der **Icon**-Komponente können Icons aus eingebundenen Icon-Fonts an beliebigen Positionen dargestellt werden. Die Ausgabe des Icon kann über das Attribut **`_icon`** gesteuert werden und erfolgt durch das Attribut **`_label`** barrierefrei. Die Ausgabe erfolgt standardmäßig als _`inline`_-Element.

Aktuell werden die Icons von <kol-link _href="https://microsoft.github.io/vscode-codicons/dist/codicon.html" _label="Codicons"></kol-link> unterstützt.

<kol-alert _heading="Hinweis" _type="info">Es ist wichtig, dass in der Rahmenseite (`index.html`) die CSS-Dateie(n) der Icon-Font(s) eingebunden ist/sind.</kol-alert>
 */

@Tag("kol-icon")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.9")
@JsModule("@public-ui/components/dist/components/kol-icon")
public class KolIcon extends Component {
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
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 *
	 * @param value String
	 */
	public void setIcon(final Optional<String> value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		return getElement().getProperty("_icon", null);
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
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @param value Optional<String>
	 */
	public void setPart(final Optional<String> value) {
		getElement().setProperty("_part", value);
	}

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getPart() {
		return getElement().getProperty("_part", null);
	}
}
