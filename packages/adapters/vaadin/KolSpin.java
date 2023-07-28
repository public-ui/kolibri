package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.
 */

@Tag("kol-spin")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.21")
@JsModule("@public-ui/components/dist/components/kol-spin")
public class KolSpin extends Component {
	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value.toString());
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShow() {
		var value = getElement().getProperty("_show", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value.toString());
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		var value = getElement().getProperty("_variant", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
