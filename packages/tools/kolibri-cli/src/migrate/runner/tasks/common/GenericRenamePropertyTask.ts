import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS } from '../../../../types';
import {
	filterFilesByExt,
	isPropertyKebabCaseRegExp,
	isTagKebabCaseRegExp,
	kebabToCapitalCase,
	logAndCreateError,
	MODIFIED_FILES,
} from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

const EXTENSIONS = COMPONENT_FILE_EXTENSIONS.concat(CUSTOM_ELEMENT_FILE_EXTENSIONS);
const DATA_REMOVED_REGEXP = /DataRemoved_/g; // not /DataRemoved-_/g
const DATA_REMOVEDS_REGEXP = /(data-removed-){2,}/g;

export class GenericRenamePropertyTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;

	private readonly newProperty: string;
	private readonly oldPropertyInCamelCase: string;
	private readonly newPropertyInCamelCase: string;

	protected constructor(
		identifier: string,
		description: string,
		tag: string,
		oldProperty: string,
		newProperty: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, description, EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(oldProperty)) {
			logAndCreateError(`Old property "${oldProperty}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(newProperty)) {
			throw logAndCreateError(`New property "${newProperty}" is not in kebab case.`);
		}

		this.newProperty = newProperty;

		this.oldPropertyInCamelCase = kebabToCapitalCase(oldProperty);
		this.newPropertyInCamelCase = kebabToCapitalCase(newProperty);

		this.componentRegExp = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.oldPropertyInCamelCase}([ >=])`, 'g');
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
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
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
