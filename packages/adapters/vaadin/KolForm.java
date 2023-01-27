package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Form**-Komponente dient dazu alle Eingabefelder zu umschließen, den Hinweistext für Pflichtfelder korrekt zu positionieren und die Events `submit` und `reset` weiterzuleiten.
 */

@Tag("kol-form")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-form")
public class KolForm extends Component {
	/**
	 * Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll.
	 */
	public void set_requiredText(boolean | string | undefined _requiredText) {
		getElement().setProperty("_required-text", _requiredText);
	}

}