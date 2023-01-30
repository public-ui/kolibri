const fs = require('fs');
const path = require('path');
const ELEMENTS = require(path.relative(__dirname, 'custom-elements.json'));
const PACKAGE_JSON = require(path.relative(__dirname, 'package.json'));

const FILE_HEAD = `package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

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

const javaType = (type) => {
	switch (type) {
		case 'boolean':
			return 'boolean';
		case 'number':
			return 'double';
		case 'array':
			return 'Array';
		case 'object':
			return 'Object';
		case 'string':
		default:
			return 'String';
	}
};

const BLACKLIST = [
	'kol-button-group',
	'kol-color',
	'kol-counter',
	'kol-heading-wc',
	'kol-icon-font-awesome',
	'kol-icon-icofont',
	'kol-input-adapter-leanup',
	'kol-input-radio-group',
	'kol-kolibri',
	'kol-logo',
	'kol-link-group',
	'kol-span',
	'kol-span-wc',
	'kol-version',
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
	 * @param value ${javaType(attribute.type)}
	 */
	public void set${pascalCase(attribute.name)}(final ${javaType(attribute.type)} value) {
		getElement().setProperty("${attribute.name}", value);
	}

	/**
	 * ${attribute.description}
	 *
	 * @return ${javaType(attribute.type)}
	 */
	public ${javaType(attribute.type)} get${pascalCase(attribute.name)}() {
		return getElement().getProperty("${attribute.name}", null);
	}

`;
	});
	file = `${file.trim()}
}
`;

	fs.writeFileSync(`${LOCATION}/${pascalCase(tag.name)}.java`, file);
});
