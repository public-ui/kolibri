package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.
 */

@Tag("kol-spin")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.12")
@JsModule("@public-ui/components/dist/components/kol-spin")
public class KolSpin extends Component {
	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @param value Optional<String>
	 */
	public void setShow(final Optional<String> value) {
		getElement().setProperty("_show", value);
	}

	/**
	 * Gibt an, ob die Komponente entweder ein- oder ausgeblendet ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getShow() {
		return getElement().getProperty("_show", null);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setVariant(final Optional<String> value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
