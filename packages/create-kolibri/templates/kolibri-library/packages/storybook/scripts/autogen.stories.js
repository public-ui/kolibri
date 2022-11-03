#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseFirstLetter(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function camel2KebabCase(string) {
	string = lowerCaseFirstLetter(string);
	return string.replace(/[A-Z]/g, '-' + '$&').toLowerCase();
}

function kebab2CamelCase(string) {
	return string.replace(/-./g, (segment) => segment.toUpperCase()[1]);
}

function firstLetterCamelCase(string) {
	return capitalizeFirstLetter(kebab2CamelCase(string));
}

const selectProps = /(_[a-z0-1]+=)/gi;
function replacePropNames(code, prefix, seperator) {
	code = code.replace(selectProps, '@@@$1§§§');
	let tags = code.split('@@@');
	code = tags[0];
	for (let i = 1; i < tags.length; i++) {
		const props = tags[i].split('§§§');
		// console.log(props[0], camel2KebabCase(props[0]));
		code += camel2KebabCase(props[0]) + props[1];
	}
	return code;
}

function replaceTagNames(code, prefix, seperator) {
	let tags = code.split(`${prefix}${seperator}`);
	code = tags[0];
	for (let i = 1; i < tags.length; i++) {
		const tag = camel2KebabCase(tags[i].replace(/^([a-z]+)(.*\n?)*/i, '$1'));
		code += `${prefix}${camel2KebabCase(seperator)}-${tags[i].replace(/^([a-z]+)/i, tag)}`;
	}
	return code;
}

function generateWcStory(dir, name) {
	dir = path.resolve(process.cwd(), dir);
	if (fs.existsSync(dir) === true) {
		const reactPath = path.resolve(process.cwd(), dir, 'react.stories.tsx');
		if (fs.existsSync(reactPath) === true) {
			let code = fs.readFileSync(reactPath, 'utf-8');
			code = replacePropNames(code, '<', 'Kol');
			code = replaceTagNames(code, '<', 'Kol');
			code = replaceTagNames(code, '</', 'Kol');
			code = code
				// .replaceAll(`title: 'React/`, `title: 'Web Components/`)
				.replace(/title: 'React\//g, `title: 'Web Components/`)
				// .replaceAll(`<Kol${firstLetterCamelCase(name)}`, `<kol-${name}`)
				.replace(new RegExp(`<Kol${firstLetterCamelCase(name)}`, 'g'), `<kol-${name}`)
				//.replaceAll(`</Kol${firstLetterCamelCase(name)}`, `</kol-${name}`)
				.replace(new RegExp(`</Kol${firstLetterCamelCase(name)}`, 'g'), `</kol-${name}`);
			fs.writeFileSync(path.resolve(dir, 'autogen.wc.stories.tsx'), code, 'utf-8');
		}
	}
}

function generate(fullPath) {
	const componentName = fullPath.replace(/\\/g, '/').replace(/([^\/]+)?\//g, '');
	const exampleDir = path.resolve(process.cwd(), fullPath, '1-examples');
	if (fs.existsSync(exampleDir) === false) {
		try {
			fs.mkdirSync(exampleDir);
		} catch (error) {
			console.log(`Das Verzeichnis konnte für die Komponente "${componentName}" nicht angelegt werden.`);
		}
	}
	if (fs.existsSync(exampleDir)) {
		let config = `import { withTests } from '@storybook/addon-jest';
import results from '@public-ui/components/jest-test-results.json';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { argTypes } from './arg-types';

export const ${firstLetterCamelCase(componentName)}Configuration = {
  decorators: [
    withTests({
      results,
    }),
  ],
  parameters: {
    badges: [BADGE.STABLE],
    jest: ['${componentName}.e2e.ts', '${componentName}.spec.ts', '${componentName}.spec.tsx'],
    status: { type: 'bitv' },
  },
  argTypes,
};
`;
		fs.writeFileSync(path.resolve(exampleDir, 'autogen.configuration.ts'), config, 'utf-8');
		console.log(`Die Konfiguration für die Komponente "${componentName}" wurde angelegt.`);
		generateWcStory(exampleDir, componentName);
	}
	const argTypes = path.resolve(exampleDir, 'arg-types.ts');
	if (fs.existsSync(argTypes) === false) {
		try {
			fs.writeFileSync(argTypes, `export const argTypes = {};`, 'utf-8');
			console.log(`Die Default-ArgTypes für die Komponente "${componentName}" wurde angelegt.`);
		} catch (error) {
			console.log(`Das Default-ArgTypes konnte für die Komponente "${componentName}" nicht angelegt werden.`);
		}
	}
}

function filterMdFiles(dir) {
	let files = [];
	const dirPath = path.resolve(process.cwd(), dir);
	fs.readdirSync(dirPath).forEach((file) => {
		const fullPath = path.resolve(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			generate(fullPath);
		}
	});
	return files;
}

filterMdFiles('./src/components');
