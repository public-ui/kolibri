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

const camelCase = (str) => {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const pascalCase = (str) => {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^[a-z]/, (g) => g.toUpperCase());
};

const javaType = (type) => {
	switch (type) {
		case 'string':
			return 'String';
		case 'boolean':
			return 'boolean';
		case 'number':
			return 'double';
		case 'array':
			return 'Array';
		case 'object':
			return 'Object';
		default:
			return type;
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
	 */
	public void set${pascalCase(attribute.name)}(${javaType(attribute.type)} ${camelCase(attribute.name)}) {
		getElement().setProperty("${attribute.name}", ${camelCase(attribute.name)});
	}

`;
	});
	file += `}`;

	fs.writeFileSync(`${LOCATION}/${pascalCase(tag.name)}.java`, file);
});
