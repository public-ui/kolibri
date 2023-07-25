package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * 
 */

@Tag("kol-avatar")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.18")
@JsModule("@public-ui/components/dist/components/kol-avatar")
public class KolAvatar extends Component {
	/**
	 * Defines the label, usually the name of the person, to render as alt text and to compute initials from
	 *
	 * @param value String
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Defines the label, usually the name of the person, to render as alt text and to compute initials from
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Defines the image source to render
	 *
	 * @param value Optional<String>
	 */
	public void setSrc(final Optional<String> value) {
		getElement().setProperty("_src", value);
	}

	/**
	 * Defines the image source to render
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSrc() {
		return getElement().getProperty("_src", null);
	}
}
