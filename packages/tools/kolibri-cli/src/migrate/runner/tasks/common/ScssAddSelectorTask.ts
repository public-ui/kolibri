import fs from 'fs';

import { SCSS_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

/**
 * Escapes special characters for use in a regular expression.
 * @param {string} str String to escape
 * @returns {string} Escaped string
 */
function escapeRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Analyzes the content to determine formatting preferences
 * @param {string} content The CSS content to analyze
 * @returns {object} Formatting preferences object
 */
function analyzeFormatting(content: string): {
	indentChar: string;
	indentSize: number;
	newlineBeforeOpenBrace: boolean;
	newlineAfterOpenBrace: boolean;
	newlineBeforeCloseBrace: boolean;
	newlineAfterCloseBrace: boolean;
} {
	const lines = content.split('\n');

	// Detect indentation
	let tabCount = 0;
	let spaceCount = 0;
	const indentSizes: number[] = [];

	for (const line of lines) {
		if (line.trim() === '') continue;

		const leadingWhitespace = line.match(/^(\s*)/)?.[1] || '';
		if (leadingWhitespace.includes('\t')) {
			tabCount++;
		} else if (leadingWhitespace.length > 0) {
			spaceCount++;
			indentSizes.push(leadingWhitespace.length);
		}
	}

	const usesTabs = tabCount > spaceCount;
	const averageSpaceIndent = indentSizes.length > 0 ? Math.round(indentSizes.reduce((sum, size) => sum + size, 0) / indentSizes.length) : 2;

	// Detect brace formatting patterns
	let newlineBeforeOpenBrace = false;
	let newlineAfterOpenBrace = true; // Default to true for readability
	let newlineBeforeCloseBrace = true; // Default to true for readability
	let newlineAfterCloseBrace = true; // Default to true for separation

	// Look for existing CSS rules to determine formatting style
	const cssRulePattern = /[^{]*\{[^}]*\}/g;
	const matches = content.match(cssRulePattern);

	if (matches && matches.length > 0) {
		let beforeOpenCount = 0;
		let afterOpenCount = 0;
		let beforeCloseCount = 0;
		let afterCloseCount = 0;

		for (const match of matches) {
			// Check for newline before opening brace
			if (/\n\s*\{/.test(match)) beforeOpenCount++;

			// Check for newline after opening brace
			if (/\{\s*\n/.test(match)) afterOpenCount++;

			// Check for newline before closing brace
			if (/\n\s*\}/.test(match)) beforeCloseCount++;

			// Check for newline after closing brace (look at the context)
			if (/\}\s*\n/.test(match)) afterCloseCount++;
		}

		// Use majority rule for formatting decisions
		const totalMatches = matches.length;
		newlineBeforeOpenBrace = beforeOpenCount > totalMatches / 2;
		newlineAfterOpenBrace = afterOpenCount > totalMatches / 2;
		newlineBeforeCloseBrace = beforeCloseCount > totalMatches / 2;
		newlineAfterCloseBrace = afterCloseCount > totalMatches / 2;
	}

	return {
		indentChar: usesTabs ? '\t' : ' ',
		indentSize: usesTabs ? 1 : averageSpaceIndent,
		newlineBeforeOpenBrace,
		newlineAfterOpenBrace,
		newlineBeforeCloseBrace,
		newlineAfterCloseBrace,
	};
}

/**
 * Formats a CSS rule according to the detected formatting style
 * @param {string} selector The CSS selector
 * @param {string} rules The CSS rules
 * @param {object} formatting The formatting preferences
 * @param {string} formatting.indentChar The character used for indentation (tab or space)
 * @param {number} formatting.indentSize The number of indent characters per level
 * @param {boolean} formatting.newlineBeforeOpenBrace Whether to add newline before opening brace
 * @param {boolean} formatting.newlineAfterOpenBrace Whether to add newline after opening brace
 * @param {boolean} formatting.newlineBeforeCloseBrace Whether to add newline before closing brace
 * @param {boolean} formatting.newlineAfterCloseBrace Whether to add newline after closing brace
 * @returns {string} The formatted CSS rule
 */
function formatCssRule(
	selector: string,
	rules: string,
	formatting: {
		indentChar: string;
		indentSize: number;
		newlineBeforeOpenBrace: boolean;
		newlineAfterOpenBrace: boolean;
		newlineBeforeCloseBrace: boolean;
		newlineAfterCloseBrace: boolean;
	},
): string {
	const indent = formatting.indentChar.repeat(formatting.indentSize);

	// Ensure rules are properly indented and trimmed
	const formattedRules = rules
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0)
		.map((line) => indent + line)
		.join('\n');

	let result = '';

	// Add selector
	result += selector;

	// Add space or newline before opening brace
	if (formatting.newlineBeforeOpenBrace) {
		result += '\n';
	} else {
		result += ' ';
	}

	// Add opening brace
	result += '{';

	// Add newline after opening brace if needed
	if (formatting.newlineAfterOpenBrace) {
		result += '\n';
	}

	// Add rules
	if (formattedRules.trim()) {
		if (!formatting.newlineAfterOpenBrace) {
			result += ' ';
		}
		result += formattedRules;
		if (!formatting.newlineBeforeCloseBrace) {
			result += ' ';
		}
	}

	// Add newline before closing brace if needed
	if (formatting.newlineBeforeCloseBrace && formattedRules.trim()) {
		result += '\n';
	}

	// Add closing brace
	result += '}';

	// Add newline after closing brace if needed
	if (formatting.newlineAfterCloseBrace) {
		result += '\n';
	}

	return result;
}

export class ScssAddSelectorTask extends AbstractTask {
	private readonly regExp: RegExp;

	protected constructor(
		identifier: string,
		private readonly selector: string,
		private readonly rules: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Add selector "${selector}"`, SCSS_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		if (!selector.startsWith('.')) {
			throw logAndCreateError(`Selector "${selector}" must start with a dot.`);
		}

		this.regExp = new RegExp(escapeRegExp(selector) + '\\s*{');
	}

	public static getInstance(
		selector: string,
		rules: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ScssAddSelectorTask {
		// Include rules in identifier to ensure unique instances for different rule sets
		const identifier = `add-selector-${selector}-${rules.replace(/[^a-zA-Z0-9]/g, '_')}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ScssAddSelectorTask(identifier, selector, rules, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ScssAddSelectorTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, SCSS_FILE_EXTENSIONS).forEach((file) => {
			let content = fs.readFileSync(file, 'utf8');
			if (!this.regExp.test(content)) {
				const formatting = analyzeFormatting(content);
				const newRule = formatCssRule(this.selector, this.rules, formatting);

				// Add appropriate spacing before the new rule
				if (content.trim() && !content.endsWith('\n')) {
					content += '\n';
				}
				if (content.trim()) {
					content += '\n';
				}
				content += newRule;

				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, content);
			}
		});
	}
}
