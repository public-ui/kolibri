import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, FileExtension, MARKUP_EXTENSIONS } from '../../../../types';
import {
	filterFilesByExt,
	isPropertyKebabCaseRegExp,
	isTagKebabCaseRegExp,
	kebabToCamelCase,
	kebabToCapitalCase,
	logAndCreateError,
	MODIFIED_FILES,
} from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

/**
 * Moves the plain text content of a component into a property, e.g. `<kol-abbr>z. B.</kol-abbr>`
 * becomes `<kol-abbr _abbr="z. B."></kol-abbr>`. Content with markup, expressions or quotes, and
 * elements that already set the property, stay unchanged.
 */
export class MoveTextContentToPropertyTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;
	private readonly propertyInCamelCase: string;

	private constructor(
		identifier: string,
		private readonly tag: string,
		private readonly property: string,
		versionRange: string,
		dependentTasks: AbstractTask[],
		options: TaskOptions,
	) {
		super(identifier, `Move the text content of "${tag}" to the property "${property}"`, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(property)) {
			throw logAndCreateError(`Property "${property}" is not in kebab case.`);
		}

		const tagCapitalCase = kebabToCapitalCase(tag);
		this.propertyInCamelCase = kebabToCamelCase(property);

		this.componentRegExp = new RegExp(`<(${tagCapitalCase}(?:\\s[^>]*)?)>([^<>{}"]+)<\\/${tagCapitalCase}>`, 'g');
		this.customElementRegExp = new RegExp(`<(${tag}(?:\\s[^>]*)?)>([^<>{}"]+)<\\/${tag}>`, 'g');
	}

	public static getInstance(
		tag: string,
		property: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): MoveTextContentToPropertyTask {
		const identifier = `${tag}-move-text-content-to-property-${property}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new MoveTextContentToPropertyTask(identifier, tag, property, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as MoveTextContentToPropertyTask;
	}

	public run(baseDir: string): void {
		this.transpile(
			baseDir,
			COMPONENT_FILE_EXTENSIONS,
			this.componentRegExp,
			this.propertyInCamelCase,
			(opening, property, text) => `<${opening} ${property}="${text}" />`,
		);
		this.transpile(
			baseDir,
			CUSTOM_ELEMENT_FILE_EXTENSIONS,
			this.customElementRegExp,
			this.property,
			(opening, property, text) => `<${opening} ${property}="${text}"></${this.tag}>`,
		);
	}

	private transpile(
		baseDir: string,
		extensions: FileExtension[],
		regExp: RegExp,
		property: string,
		replace: (opening: string, property: string, text: string) => string,
	): void {
		filterFilesByExt(baseDir, extensions).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(regExp, (match: string, opening: string, text: string) => {
				const trimmed = text.trim();
				if (trimmed.length === 0 || new RegExp(`\\s${property}[\\s=>]`).test(` ${opening} `)) {
					return match;
				}
				return replace(opening.trimEnd(), property, trimmed.replace(/\s+/g, ' '));
			});
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
