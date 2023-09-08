import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
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

const DATA_REMOVED_REGEXP = /DataRemoved_/gi; // not /DataRemoved-_/g
const DATA_REMOVEDS_REGEXP = /(data-removed-){2,}/g;

export class GenericRenamePropertyTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;

	private readonly newPropertyInCamelCase: string;

	protected constructor(
		identifier: string,
		description: string,
		tag: string,
		oldProperty: string,
		private readonly newProperty: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, description, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(oldProperty)) {
			throw logAndCreateError(`Old property "${oldProperty}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(newProperty)) {
			throw logAndCreateError(`New property "${newProperty}" is not in kebab case.`);
		}

		this.newPropertyInCamelCase = kebabToCamelCase(newProperty);

		this.componentRegExp = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${kebabToCapitalCase(oldProperty)}([ >=])`, 'g');
		this.customElementRegExp = new RegExp(`(<${tag}[^>]+)${oldProperty}([ >=])`, 'g');
	}

	public run(baseDir: string): void {
		this.transpileComponentFileRename(baseDir);
		this.transpileCustomElementFileRename(baseDir);
	}

	private transpileComponentFileRename(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.componentRegExp, `$1${this.newPropertyInCamelCase}$2`)
				.replace(DATA_REMOVED_REGEXP, 'data-removed-_')
				.replace(DATA_REMOVEDS_REGEXP, 'data-removed-');
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFileRename(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.customElementRegExp, `$1${this.newProperty}$2`)
				.replace(DATA_REMOVEDS_REGEXP, 'data-removed-');
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
