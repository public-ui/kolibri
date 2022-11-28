import { promises as fs } from 'fs';

import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { JsonDocs, OutputTarget } from '@stencil/core/internal';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { solidOutputTarget } from '@stencil/solid-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

const TAGS = [
	'kol-abbr',
	'kol-accordion',
	'kol-alert',
	'kol-badge',
	'kol-breadcrumb',
	'kol-button',
	'kol-button-group',
	'kol-button-link',
	'kol-card',
	'kol-details',
	'kol-form',
	'kol-heading',
	'kol-icon',
	'kol-icon-font-awesome',
	'kol-icon-icofont',
	'kol-indented-text',
	'kol-input-adapter-leanup',
	'kol-input-checkbox',
	'kol-input-color',
	'kol-input-date',
	'kol-input-file',
	'kol-input-email',
	'kol-input-number',
	'kol-input-password',
	'kol-input-radio',
	'kol-input-text',
	'kol-kolibri',
	'kol-link',
	'kol-link-button',
	'kol-link-group',
	'kol-logo',
	'kol-modal',
	'kol-nav',
	'kol-pagination',
	'kol-progress',
	'kol-select',
	'kol-skip-nav',
	'kol-span',
	'kol-spin',
	'kol-symbol',
	'kol-table',
	'kol-tabs',
	'kol-textarea',
	'kol-toast',
	'kol-tooltip',
	'kol-version',
];
const EXCLUDE_TAGS = [
	'kol-all',
	'kol-button-wc',
	'kol-color',
	'kol-counter',
	'kol-heading-wc',
	'kol-input',
	'kol-input-radio-group',
	'kol-link-wc',
	'kol-span-wc',
];
const BUNDLES: {
	components: string[];
}[] = [];
TAGS.forEach((tag) => {
	BUNDLES.push({
		components: [tag],
	});
});
// console.log(TAGS, TAGS.length);

// const util = require('util');
// async function generateCSPHashes(config: Config, compilerCtx: any, buildCtx: any, docs: any): Promise<void> {
//   // console.log('config', config.bundles);
//   // console.log('compilerCtx', util.inspect(compilerCtx.moduleMap, { depth: 1 }));
//   console.log('buildCtx', util.inspect(buildCtx.components, { depth: 1 }));
//   return new Promise((resolve: Function) => {
//     // require('./hashing')();
//     resolve();
//   });
// }

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
			directivesProxyFile: '../adapters/angular/v8/src/components.ts',
			includeImportCustomElements: false,
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v9/src/components.ts',
			includeImportCustomElements: false,
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v10/src/components.ts',
			includeImportCustomElements: false,
		}),
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
		// preactOutputTarget({
		//   componentCorePackage: '@public-ui/components',
		//   excludeComponents: EXCLUDE_TAGS,
		//   proxiesFile: '../adapters/preact/src/index.ts',
		//   includeDefineCustomElements: false,
		// }),
		reactOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/react/src/index.ts',
			includeDefineCustomElements: false,
		}),
		solidOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/solid/src/index.ts',
			includeDefineCustomElements: false,
		}),
		// svelteOutputTarget({
		// 	componentCorePackage: '@public-ui/components',
		// 	excludeComponents: EXCLUDE_TAGS,
		// 	proxiesFile: '../adapters/svelte/src/index.ts',
		// 	includeDefineCustomElements: false,
		// }),
		vueOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			proxiesFile: '../adapters/vue/src/index.ts',
			includeDefineCustomElements: false,
		}),
		{
			type: 'dist-custom-elements',
		},
		{
			type: 'dist-custom-elements-bundle',
			externalRuntime: false,
		},
		// {
		// 	// https://stenciljs.com/docs/hydrate-app
		// 	type: 'dist-hydrate-script',
		// },
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
	// globalStyle: 'src/global/style.css',
	namespace: 'kolibri',
	preamble: 'KoliBri - the accessible web component library',
	outputTargets: outputTargets,
	plugins: [
		sass(),
		postcss({
			plugins: [
				// require('postcss-windicss'),
				require('./node_martin/postcss-windicss')({
					// touchMode: 'insert-comment',
				}),
			],
		}),
	],
	rollupPlugins: {
		before: [],
		after: [],
	},
	taskQueue: 'immediate',
};
