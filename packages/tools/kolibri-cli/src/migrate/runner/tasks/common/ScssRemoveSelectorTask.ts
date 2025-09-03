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
	let result = content;
	let offset = 0;
	let currentIndex = 0;

	while (currentIndex < content.length) {
		// Find the next opening brace while properly handling strings and comments
		const ruleStart = findNextRuleBlock(content, currentIndex);
		if (ruleStart === -1) break;

		const openBraceIndex = ruleStart.openBraceIndex;
		const selectorGroup = content.substring(ruleStart.selectorStart, openBraceIndex).trim();

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
			// Target selector not found in this group, advance past this rule
			currentIndex = findMatchingCloseBrace(content, openBraceIndex);
			if (currentIndex === -1) break;
			currentIndex++;
			continue;
		}

		// Find the matching closing brace using the existing brace counting logic
		const closeBraceIndex = findMatchingCloseBrace(content, openBraceIndex);

		if (closeBraceIndex === -1) {
			// Malformed CSS, skip this rule
			break;
		}

		let replacement: string;

		if (selectors.length === 1) {
			// Only one selector in the list, remove the entire rule block
			replacement = `/* removed ${selector} */`;
		} else {
			// Multiple selectors, remove only the target selector
			const remainingSelectors = selectors.filter((_, index) => index !== targetSelectorIndex);
			const ruleContent = content.substring(openBraceIndex, closeBraceIndex + 1);
			replacement = `${remainingSelectors.join(', ')} ${ruleContent}`;
		}

		// Adjust for previous replacements
		const adjustedStart = ruleStart.selectorStart - offset;
		const adjustedEnd = closeBraceIndex + 1 - offset;

		result = result.substring(0, adjustedStart) + replacement + result.substring(adjustedEnd);
		const originalLength = closeBraceIndex + 1 - ruleStart.selectorStart;
		offset += originalLength - replacement.length;

		// Continue searching after this rule
		currentIndex = closeBraceIndex + 1;
	}

	return result;
}

/**
 * Finds the next CSS rule block while properly handling strings and comments.
 * @param {string} content The CSS content to search
 * @param {number} startIndex The index to start searching from
 * @returns {object|number} Object with selectorStart and openBraceIndex, or -1 if no rule found
 */
function findNextRuleBlock(content: string, startIndex: number): { selectorStart: number; openBraceIndex: number } | -1 {
	let currentIndex = startIndex;
	let inString = false;
	let stringChar = '';
	let inComment = false;
	let inSingleLineComment = false;
	let potentialSelectorStart = -1;

	while (currentIndex < content.length) {
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

		// Look for rule blocks only when not in strings or comments
		if (!inString && !inComment && !inSingleLineComment) {
			if (char === '{') {
				// Found opening brace, find the start of this selector
				if (potentialSelectorStart === -1) {
					// Find the start of the selector by looking backwards for the previous rule end or start of content
					potentialSelectorStart = findSelectorStart(content, currentIndex);
				}
				return {
					selectorStart: potentialSelectorStart,
					openBraceIndex: currentIndex,
				};
			} else if (char === '}') {
				// End of a rule, reset potential selector start
				potentialSelectorStart = -1;
			} else if (potentialSelectorStart === -1 && /\S/.test(char)) {
				// First non-whitespace character, potential start of a selector
				potentialSelectorStart = currentIndex;
			}
		}

		currentIndex++;
	}

	return -1;
}

/**
 * Finds the start of a selector by looking backwards from an opening brace.
 * @param {string} content The CSS content
 * @param {number} openBraceIndex The index of the opening brace
 * @returns {number} The index where the selector starts
 */
function findSelectorStart(content: string, openBraceIndex: number): number {
	let index = openBraceIndex - 1;

	// Skip whitespace before the opening brace
	while (index >= 0 && /\s/.test(content[index])) {
		index--;
	}

	// Find the start of the selector (after previous '}' or at beginning)
	while (index >= 0) {
		if (content[index] === '}') {
			return index + 1;
		}
		index--;
	}

	return 0; // Start of content
}

/**
 * Finds the matching closing brace for an opening brace, handling nested braces correctly.
 * @param {string} content The CSS content
 * @param {number} openBraceIndex The index of the opening brace
 * @returns {number} The index of the matching closing brace, or -1 if not found
 */
function findMatchingCloseBrace(content: string, openBraceIndex: number): number {
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

	return braceCount === 0 ? currentIndex - 1 : -1;
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
