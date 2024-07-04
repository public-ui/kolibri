import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import { angularOutputTarget } from '@public-ui/stencil-angular-output-target';
import { Config } from '@stencil/core';
import { JsonDocs, OutputTarget } from '@stencil/core/internal';
import { postcss } from '@stencil-community/postcss';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@public-ui/stencil-react-output-target';
import { solidOutputTarget } from '@public-ui/stencil-solid-output-target';
import { vueOutputTarget } from '@public-ui/stencil-vue-output-target';

const TAGS = [
	'kol-abbr',
	'kol-accordion',
	'kol-alert',
	'kol-avatar',
	'kol-badge',
	'kol-breadcrumb',
	'kol-button',
	'kol-button-group',
	'kol-button-link',
	'kol-card',
	'kol-details',
	'kol-drawer',
	'kol-form',
	'kol-heading',
	'kol-icon',
	'kol-image',
	'kol-indented-text',
	'kol-input-checkbox',
	'kol-input-color',
	'kol-input-date',
	'kol-input-email',
	'kol-input-file',
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
	'kol-quote',
	'kol-select',
	'kol-skip-nav',
	'kol-spin',
	'kol-split-button',
	'kol-symbol',
	'kol-table',
	'kol-table-stateless',
	'kol-table-stateful',
	'kol-tabs',
	'kol-toolbar',
	'kol-textarea',
	'kol-toast-container',
	'kol-tree',
	'kol-tree-item',
	'kol-version',
];
const EXCLUDE_TAGS = [
	'kol-alert-wc',
	'kol-all',
	'kol-avatar-wc',
	'kol-button-group-wc',
	'kol-button-link-text-switch',
	'kol-button-wc',
	'kol-color',
	'kol-counter',
	'kol-heading-wc',
	'kol-input',
	'kol-link-wc',
	'kol-popover-wc',
	'kol-span',
	'kol-span-wc',
	'kol-table-stateless-wc',
	'kol-tooltip-wc',
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

	await fsPromises.writeFile('./custom-elements.json', JSON.stringify(jsonData, null, 2));
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
			directivesProxyFile: '../adapters/angular/v15/src/components.ts',
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v16/src/components.ts',
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v17/src/components.ts',
		}),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			excludeComponents: EXCLUDE_TAGS,
			directivesProxyFile: '../adapters/angular/v18/src/components.ts',
		}),
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
		// {
		// 	type: 'dist-custom-elements-bundle',
		// 	externalRuntime: false,
		// },
		{
			// https://stenciljs.com/docs/hydrate-app
			type: 'dist-hydrate-script',
			dir: '../adapters/hydrate/dist',
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
	// https://stenciljs.com/docs/config-extras
	extras: {
		// appendChildSlotFix: true,
		// cloneNodeFix: true,
		enableImportInjection: true,
		// initializeNextTick: true,
		// lifecycleDOMEvents: true,
		// scopedSlotTextContentFix: true,
		// scriptDataOpts: true,
		// slotChildNodesFix: true,
		tagNameTransform: true,
	},
	// enableCache: true,
	invisiblePrehydration: true,
	hashFileNames: false,
	bundles: BUNDLES,
	globalScript: 'src/global/script.ts',
	// globalStyle: 'src/global/style.css',
	namespace: 'kolibri',
	preamble: 'KoliBri - The accessible HTML-Standard',
	outputTargets: outputTargets,
	plugins: [sass(), postcss()],
	rollupPlugins: {
		before: [],
		after: [],
	},
	taskQueue: 'immediate',
	testing: {
		setupFilesAfterEnv: ['./test-env.js'],
	},
};
