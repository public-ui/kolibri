package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Vielen Dank, dass Sie diese Komponente zur Umsetzung eines Modals verwenden wollen. Inzwischen ist das native `<dialog>` Element sehr gut unterstützt (<kol-link _href="https://caniuse.com/?search=dialog" _label="https://caniuse.com/?search=dialog" _target="_blank" _label="caniuse"></kol-link>), barrierefrei, einfach zu benutzen und performanter (da nativ), daher empfehlen wir dieses zu verwenden. Wenn Sie aufgrund von Abwärtskompatibilität, oder weil Sie die **Modal**-Komponente bereits eingebaut haben, die Dokumentation zu unserem KolModal suchen, finden Sie diese etwas weiter unten. Die **Modal**-Komponente wird in Version 2 noch zur Verfügung stehen.
 */

@Tag("kol-modal")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.21")
@JsModule("@public-ui/components/dist/components/kol-modal")
public class KolModal extends Component {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setAriaLabel(final String value) {
		getElement().setProperty("_aria-label", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		var value = getElement().getProperty("_aria-label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @param value String
	 */
	public void setLabel(final String value) {
		getElement().setProperty("_label", value.toString());
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		var value = getElement().getProperty("_label", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Setzt die Breite des Modals. (max-width: 100%).
	 *
	 * @param value String
	 */
	public void setWidth(final String value) {
		getElement().setProperty("_width", value.toString());
	}

	/**
	 * Setzt die Breite des Modals. (max-width: 100%).
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getWidth() {
		var value = getElement().getProperty("_width", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
