package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Lader, wie die **Spin**-Komponente, informieren die Nutzer:innen über Lade- oder Rechenvorgänge, die vom System ausgeführt werden. Der Fortschritt kann durch eine wiederholte Animation kommuniziert werden.
 */

@Tag("kol-spin")
@NpmPackage(value = "@public-ui/components", version = "1.3.0-rc.10")
@JsModule("@public-ui/components/dist/components/kol-spin")
public class KolSpin extends Component {
	/**
	 * Gibt an, ob die Ladeanzeige eingeblendet wird oder nicht.
	 */
	public void set_show(boolean | undefined _show) {
		getElement().setProperty("_show", _show);
	}

}