package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * Mit Hilfe der **Logo**-Komponente können an beliebigen Positionen die Logos verschiedener Bundesinstitutionen ausgegeben werden. Das Logo wird dabei aus einer Sammlung von SVG-Grafiken zusammengesetzt, die fertig konstruiert vorliegen.
 */

@Tag("kol-logo")
@NpmPackage(value = "@public-ui/components", version = "1.6.2")
@JsModule("@public-ui/components/dist/components/kol-logo")
public class KolLogo extends Component {
	/**
	 * Deprecated: Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an.
	 *
	 * @param value String
	 */
	public void setAbbr(final String value) {
		getElement().setProperty("_abbr", value.toString());
	}

	/**
	 * Deprecated: Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAbbr() {
		var value = getElement().getProperty("_abbr", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

	/**
	 * Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an.
	 *
	 * @param value String
	 */
	public void setOrg(final String value) {
		getElement().setProperty("_org", value.toString());
	}

	/**
	 * Gibt die Abkürzung eines Ministeriums, eines Amts oder einer Bundesanstalt an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getOrg() {
		var value = getElement().getProperty("_org", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}
}
