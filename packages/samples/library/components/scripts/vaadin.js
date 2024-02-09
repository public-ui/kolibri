const fs = require('fs');
const path = require('path');
const ELEMENTS = require(path.relative(__dirname, 'custom-elements.json'));
const PACKAGE_JSON = require(path.relative(__dirname, 'package.json'));

const FILE_HEAD = `package com.example.adapters;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

import java.util.Optional;

`;

const LOCATION = path.resolve(__dirname, '../', '../', 'adapters', 'vaadin');

console.log('LOCATION', LOCATION);

fs.mkdirSync(LOCATION, { recursive: true });

const removeUnderscore = (str) => {
	return str.replace(/^_/g, '');
};

const camelCase = (str) => {
	return removeUnderscore(str).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const pascalCase = (str) => {
	return removeUnderscore(str)
		.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
		.replace(/^[a-z]/, (g) => g.toUpperCase());
};

const makeOptionalIfNotRequired = (str, required) => {
	if (required) {
		return str;
	} else {
		return `Optional<${str}>`;
	}
};

const javaType = (type, required) => {
	switch (type) {
		case 'boolean':
			return makeOptionalIfNotRequired('boolean', required);
		default:
			return makeOptionalIfNotRequired('String', required);
	}
};

const BLACKLIST = [
	'kol-alert-wc',
	'kol-avatar-wc',
	'kol-button-group',
	'kol-button-group-wc',
	'kol-color',
	'kol-counter',
	'kol-heading-wc',
	'kol-icon-font-awesome',
	'kol-icon-icofont',
	'kol-input-adapter-leanup',
	'kol-input-radio-group',
	'kol-link-group',
	'kol-span',
	'kol-span-wc',
];

ELEMENTS.tags.forEach((tag) => {
	if (BLACKLIST.includes(tag.name)) {
		return;
	}

	let file = FILE_HEAD;
	file += `/**
 * ${tag.description}
 */

`;
	file += `@Tag("${tag.name}")
@NpmPackage(value = "${PACKAGE_JSON.name}", version = "${PACKAGE_JSON.version}")
@JsModule("${PACKAGE_JSON.name}/dist/components/${tag.name}")
`;
	file += `public class ${pascalCase(tag.name)} extends Component {
`;
	tag.attributes.forEach((attribute) => {
		file += `	/**
	 * ${attribute.description}
	 *
	 * @param value ${javaType(attribute.type, true)}
	 */
	public void set${pascalCase(attribute.name)}(final ${javaType(attribute.type, true)} value) {
		getElement().setProperty("${attribute.name}", value.toString());
	}

	/**
	 * ${attribute.description}
	 *
	 * @return ${javaType(attribute.type, attribute.require)}
	 */
	public ${javaType(attribute.type, attribute.require)} get${pascalCase(attribute.name)}() {
		var value = getElement().getProperty("${attribute.name}", null);
		return value.isEmpty() ? Optional.empty() : Optional.of(value);
	}

`;
	});
	file = `${file.trim()}
}
`;

	fs.writeFileSync(`${LOCATION}/${pascalCase(tag.name)}.java`, file);
});
