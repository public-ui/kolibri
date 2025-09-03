import fs from 'fs';

import { SCSS_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

/**
 * Finds and removes a CSS selector and its complete rule block, handling nested braces correctly.
 * Also handles comma-separated selector lists.
 * @param {string} content The CSS content to process
 * @param {string} selector The selector to remove (must start with a dot)
 * @returns {string} The content with the selector removed
 */
function removeSelectorWithNestedBraces(content: string, selector: string): string {
	// Find all CSS rule blocks (selector groups followed by braces)
	const ruleRegex = /([^{}]+)\s*{/g;
	let match;
	let result = content;
	let offset = 0;

	while ((match = ruleRegex.exec(content)) !== null) {
		const selectorGroup = match[1].trim();
		const ruleStart = match.index;
		const openBraceIndex = match.index + match[0].length - 1;

		// Check if this selector group contains our target selector
		const selectors = selectorGroup.split(',').map((s) => s.trim());
		let targetSelectorIndex = -1;

		// First try exact match (for comma-separated lists)
		targetSelectorIndex = selectors.findIndex((s) => s === selector);

		// If no exact match, check if any selector contains our target as a class
		if (targetSelectorIndex === -1) {
			targetSelectorIndex = selectors.findIndex((s) => {
				// Split by spaces to get individual parts of compound selectors
				const parts = s.split(/\s+/);
				return parts.includes(selector);
			});
		}

		if (targetSelectorIndex === -1) {
			// Target selector not found in this group, continue
			continue;
		}

		// Find the matching closing brace using brace counting
		let braceCount = 1;
		let currentIndex = openBraceIndex + 1;
		let inString = false;
		let stringChar = '';
		let inComment = false;
		let inSingleLineComment = false;

		while (currentIndex < content.length && braceCount > 0) {
			const char = content[currentIndex];
			const nextChar = content[currentIndex + 1];

			// Handle single-line comments
			if (!inString && !inComment && char === '/' && nextChar === '/') {
				inSingleLineComment = true;
				currentIndex += 2;
				continue;
			}

			if (inSingleLineComment) {
				if (char === '\n' || char === '\r') {
					inSingleLineComment = false;
				}
				currentIndex++;
				continue;
			}

			// Handle multi-line comments
			if (!inString && !inSingleLineComment && char === '/' && nextChar === '*') {
				inComment = true;
				currentIndex += 2;
				continue;
			}

			if (inComment) {
				if (char === '*' && nextChar === '/') {
					inComment = false;
					currentIndex += 2;
					continue;
				}
				currentIndex++;
				continue;
			}

			// Handle strings
			if (!inComment && !inSingleLineComment && (char === '"' || char === "'")) {
				if (!inString) {
					inString = true;
					stringChar = char;
				} else if (char === stringChar && content[currentIndex - 1] !== '\\') {
					inString = false;
					stringChar = '';
				}
			}

			// Count braces only when not in strings or comments
			if (!inString && !inComment && !inSingleLineComment) {
				if (char === '{') {
					braceCount++;
				} else if (char === '}') {
					braceCount--;
				}
			}

			currentIndex++;
		}

		if (braceCount === 0) {
			let replacement: string;

			if (selectors.length === 1) {
				// Only one selector in the list, remove the entire rule block
				replacement = `/* removed ${selector} */`;
			} else {
				// Multiple selectors, remove only the target selector
				const remainingSelectors = selectors.filter((_, index) => index !== targetSelectorIndex);
				const ruleContent = content.substring(openBraceIndex, currentIndex);
				replacement = `${remainingSelectors.join(', ')} ${ruleContent}`;
			}

			// Adjust for previous replacements
			const adjustedStart = ruleStart - offset;
			const adjustedEnd = currentIndex - offset;

			result = result.substring(0, adjustedStart) + replacement + result.substring(adjustedEnd);
			const originalLength = currentIndex - ruleStart;
			offset += originalLength - replacement.length;
		}

		// Reset regex lastIndex to continue searching
		ruleRegex.lastIndex = currentIndex;
	}

	return result;
}

export class ScssRemoveSelectorTask extends AbstractTask {
	protected constructor(
		identifier: string,
		private readonly selector: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Remove selector "${selector}"`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!selector.startsWith('.')) {
			throw logAndCreateError(`Selector "${selector}" must start with a dot.`);
		}
	}

	public static getInstance(selector: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): ScssRemoveSelectorTask {
		const identifier = `remove-selector-${selector}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssRemoveSelectorTask(identifier, selector, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssRemoveSelectorTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = removeSelectorWithNestedBraces(content, this.selector);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
