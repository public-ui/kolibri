package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

/**
 * 
 */

@Tag("kol-toast-container")
@NpmPackage(value = "@public-ui/components", version = "1.7.0-rc.3")
@JsModule("@public-ui/components/dist/components/kol-toast-container")
public class KolToastContainer extends Component {
}
