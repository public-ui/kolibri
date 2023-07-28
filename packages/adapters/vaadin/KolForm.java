package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Die **Form**-Komponente dient dazu alle Eingabefelder zu umschließen, den Hinweistext für Pflichtfelder korrekt zu positionieren und die Events `submit` und `reset` weiterzuleiten.
 */

@Tag("kol-form")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.21")
@JsModule("@public-ui/components/dist/components/kol-form")
public class KolForm extends Component {
	/**
	 * Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll. Ein String überschreibt den Standardtext.
	 *
	 * @param value String
	 */
	public void setRequiredText(final String value) {
		getElement().setProperty("_required-text", value.toString());
	}

	/**
	 * Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll. Ein String überschreibt den Standardtext.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRequiredText() {
		var value = getElement().getProperty("_required-text", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
