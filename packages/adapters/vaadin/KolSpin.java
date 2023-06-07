package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Ladeanzeigen, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.
 */

@Tag("kol-spin")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.0")
@JsModule("@public-ui/components/dist/components/kol-spin")
public class KolSpin extends Component {
	/**
	 * Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht.
	 *
	 * @param value String
	 */
	public void setShow(final String value) {
		getElement().setProperty("_show", value);
	}

	/**
	 * Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht.
	 *
	 * @return String
	 */
	public String getShow() {
		return getElement().getProperty("_show", null);
	}

	/**
	 * Gibt an, welche Ladeanimation oder ob keine Animation verwendet werden soll.
	 *
	 * @param value String
	 */
	public void setVariant(final String value) {
		getElement().setProperty("_variant", value);
	}

	/**
	 * Gibt an, welche Ladeanimation oder ob keine Animation verwendet werden soll.
	 *
	 * @return String
	 */
	public String getVariant() {
		return getElement().getProperty("_variant", null);
	}
}
