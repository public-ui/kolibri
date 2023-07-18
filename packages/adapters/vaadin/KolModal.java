package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Vielen Dank, dass Sie diese Komponente zur Umsetzung eines Modals verwenden wollen. Inzwischen ist das native `<dialog>` Element sehr gut unterstützt ([caniuse](https://caniuse.com/?search=dialog)), barrierefrei, einfach zu benutzen und performanter (da nativ), daher empfehlen wir dieses zu verwenden. Wenn Sie aufgrund von Abwärtskompatibilität, oder weil Sie die **Modal**-Komponente bereits eingebaut haben, die Dokumentation zu unserem KolModal suchen, finden Sie diese etwas weiter unten. Die **Modal**-Komponente wird in Version 2 noch zur Verfügung stehen.
 */

@Tag("kol-modal")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.12")
@JsModule("@public-ui/components/dist/components/kol-modal")
public class KolModal extends Component {
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
	 * Setzt die Breite des Modals. (max-width: 100%).
	 *
	 * @param value Optional<String>
	 */
	public void setWidth(final Optional<String> value) {
		getElement().setProperty("_width", value);
	}

	/**
	 * Setzt die Breite des Modals. (max-width: 100%).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getWidth() {
		return getElement().getProperty("_width", null);
	}
}
