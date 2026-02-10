/**
 * @fileoverview ESLint rule to enforce imports from barrel files (index.ts) for
 * directories that contain one. Direct imports to individual modules inside
 * such directories are forbidden.
 *
 * The rule accepts an array of directory path patterns (relative to the repo
 * root, using forward slashes). Every pattern is matched against the **resolved
 * import target directory**. When a match is found the import must point to
 * the directory itself (i.e. the barrel) rather than a specific file inside it.
 *
 * Example configuration:
 *
 * ```js
 * 'kolibri/require-barrel-import': ['error', {
 *   directories: ['schema/props'],
 * }]
 * ```
 *
 * Valid:
 *   import { countProp } from '../../schema/props';
 *
 * Invalid:
 *   import { countProp } from '../../schema/props/count';
 *   import { normalizeString } from '../../schema/props/helpers/normalizers';
 */

'use strict';

const path = require('path');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Enforce imports through barrel files for configured directories',
		},
		fixable: 'code',
		schema: [
			{
				type: 'object',
				properties: {
					directories: {
						type: 'array',
						items: { type: 'string' },
						description: 'Directory path patterns that must be imported via their barrel file (index.ts).',
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			requireBarrelImport: 'Import from "{{importPath}}" bypasses the barrel file. Import from "{{barrelPath}}" instead.',
		},
	},

	create(context) {
		const options = context.options[0] || {};
		const directories = options.directories || [];

		if (directories.length === 0) {
			return {};
		}

		/**
		 * Checks whether an import source is a relative path that reaches into
		 * a barrel-protected directory instead of stopping at it.
		 *
		 * Files that reside *inside* the barrel directory are allowed to import
		 * siblings and sub-modules freely – only external consumers must go
		 * through the barrel.
		 */
		function check(node, importSource) {
			if (!importSource || !importSource.startsWith('.')) {
				return; // only check relative imports
			}

			const currentFile = context.filename;
			const currentDir = path.dirname(currentFile);
			const normalizedCurrentFile = currentFile.replace(/\\/g, '/');
			const resolved = path.resolve(currentDir, importSource);
			const normalizedResolved = resolved.replace(/\\/g, '/');

			for (const dir of directories) {
				const normalizedDir = dir.replace(/\\/g, '/');

				// Check if the current file itself is inside the barrel directory.
				// If so, internal imports are allowed.
				if (normalizedCurrentFile.includes(`/${normalizedDir}/`)) {
					continue;
				}

				// Find the position of the directory pattern in the resolved path
				const dirIndex = normalizedResolved.indexOf(`/${normalizedDir}/`);
				if (dirIndex === -1) {
					// Also check if the path ends with the directory (no trailing slash case)
					const endsWithDir = normalizedResolved.endsWith(`/${normalizedDir}`);
					if (endsWithDir) {
						// This is fine – it points directly to the barrel directory
						continue;
					}
					continue;
				}

				// The resolved path goes *into* the directory – that is not allowed.
				// Calculate the barrel path: trim everything after the directory pattern.
				const barrelAbsolute = normalizedResolved.substring(0, dirIndex + 1 + normalizedDir.length);
				const barrelRelative = path.relative(currentDir, barrelAbsolute).replace(/\\/g, '/');
				const barrelPath = barrelRelative.startsWith('.') ? barrelRelative : `./${barrelRelative}`;

				context.report({
					node,
					messageId: 'requireBarrelImport',
					data: {
						importPath: importSource,
						barrelPath,
					},
					fix(fixer) {
						return fixer.replaceText(node.source, `'${barrelPath}'`);
					},
				});
				break;
			}
		}

		return {
			ImportDeclaration(node) {
				check(node, node.source.value);
			},
			// Also handle dynamic imports and re-exports
			ExportNamedDeclaration(node) {
				if (node.source) {
					check(node, node.source.value);
				}
			},
			ExportAllDeclaration(node) {
				if (node.source) {
					check(node, node.source.value);
				}
			},
		};
	},
};
