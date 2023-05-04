import { promises as fs } from 'fs';

import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { JsonDocs, OutputTarget } from '@stencil/core/internal';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { sass } from '@stencil/sass';

const TAGS = ['{{kebab name}}-button', '{{kebab name}}-form-login'];
const EXCLUDE_TAGS = ['{{kebab name}}-button-wc', '{{kebab name}}-form-login-wc'];
const BUNDLES: {
	components: string[];
}[] = [];
TAGS.forEach((tag) => {
	BUNDLES.push({
		components: [tag],
	});
});

async function generateCustomElementsJson(docsData: JsonDocs) {
	const jsonData = {
		version: require('./package.json').version,
		tags: docsData.components.map((component) => ({
			name: component.tag,
			// path: component.filePath,
			description: component.docs,

			attributes: component.props
				.filter((prop) => prop.attr)
				.map((prop) => ({
					name: prop.attr,
					type: prop.type,
					description: prop.docs,
					defaultValue: prop.default,
					required: prop.required,
				})),

			events: component.events.map((event) => ({
				name: event.event,
				description: event.docs,
			})),

			methods: component.methods.map((method) => ({
				name: method.name,
				description: method.docs,
				signature: method.signature,
			})),

			slots: component.slots.map((slot) => ({
				name: slot.name,
				description: slot.docs,
			})),

			cssProperties: component.styles
				.filter((style) => style.annotation === 'prop')
				.map((style) => ({
					name: style.name,
					description: style.docs,
				})),

			cssParts: component.parts.map((part) => ({
				name: part.name,
				description: part.docs,
			})),
		})),
	};

	await fs.writeFile('./custom-elements.json', JSON.stringify(jsonData, null, 2));
}

let outputTargets: OutputTarget[] = [
	{
		type: 'dist',
		copy: [
			{
				src: 'assets',
			},
		],
	},
	{
		type: 'www',
		serviceWorker: null,
		copy: [
			{
				src: 'assets',
			},
		],
	},
	// {
	//   type: 'custom',
	//   name: 'CSP',
	//   generator: generateCSPHashes,
	// },
];

if (process.env.NODE_ENV === 'production') {
	outputTargets = outputTargets.concat([
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v11/src/components.ts',
			includeImportCustomElements: false,
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v12/src/components.ts',
			includeImportCustomElements: false,
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v13/src/components.ts',
			includeImportCustomElements: false,
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v14/src/components.ts',
			includeImportCustomElements: false,
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v15/src/components.ts',
			includeImportCustomElements: false,
		}),
		reactOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/react/src/index.ts',
			includeDefineCustomElements: false,
		}),
		vueOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/vue/src/index.ts',
			includeDefineCustomElements: false,
		}),
		{
			minify: true,
			type: 'dist-custom-elements',
		},
		{
			// https://stenciljs.com/docs/docs-vscode
			type: 'docs-vscode',
			file: 'vscode-custom-data.json',
		},
		{
			type: 'docs-custom',
			generator: generateCustomElementsJson,
		},
		// {
		//   file: 'docs.json',
		//   type: 'docs-json',
		// },
		{
			// dir: 'docs',
			footer: '',
			type: 'docs-readme',
			strict: true,
		},
	]);
}

export const config: Config = {
	// buildEs5: true,
	// extras: {
	//   cssVarsShim: true,
	//   dynamicImportShim: true,
	//   shadowDomShim: true,
	//   safari10: true,
	//   scriptDataOpts: true,
	//   appendChildSlotFix: false,
	//   cloneNodeFix: false,
	//   slotChildNodesFix: true,
	// },
	// enableCache: true,
	invisiblePrehydration: true,
	hashFileNames: false,
	bundles: BUNDLES,
	globalScript: 'src/global/script.ts',
	globalStyle: 'src/global/style.css',
	namespace: '{{kebab name}}',
	preamble: 'Web component library based on KoliBri.',
	outputTargets: outputTargets,
	plugins: [sass(), postcss()],
	rollupPlugins: {
		before: [],
		after: [],
	},
	taskQueue: 'immediate',
};
