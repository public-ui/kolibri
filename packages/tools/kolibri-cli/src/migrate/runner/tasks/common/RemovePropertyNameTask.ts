import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS } from '../../../../types';
import {
	filterFilesByExt,
	getRemoveMode,
	isPropertyKebabCaseRegExp,
	isTagKebabCaseRegExp,
	kebabToCapitalCase,
	logAndCreateError,
	MODIFIED_FILES,
} from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';
import { GenericRenamePropertyTask } from './GenericRenamePropertyTask';

const DATA_REMOVED_REGEXP = /data-removed-/g;

export class RemovePropertyNameTask extends GenericRenamePropertyTask {
	private readonly componentRegExpBoolean: RegExp;
	private readonly componentRegExpCurlyBrackets: RegExp;
	private readonly componentRegExpQuotationMarks: RegExp;
	private readonly customElementRegExpBoolean: RegExp;
	private readonly customElementRegExpCurlyBrackets: RegExp;
	private readonly customElementRegExpQuotationMarks: RegExp;

	private readonly propertyInCamelCase: string;

	protected constructor(identifier: string, tag: string, property: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(identifier, `Remove property "${property}" of "${tag}" component`, tag, property, `data-removed-${property}`, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(property)) {
			throw logAndCreateError(`Property "${property}" is not in kebab case.`);
		}

		this.propertyInCamelCase = kebabToCapitalCase(property);

		this.componentRegExpBoolean = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.propertyInCamelCase}([ >])`, 'g');
		this.componentRegExpCurlyBrackets = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.propertyInCamelCase}(=\\{[^\\}]+\\})`, 'g');
		this.componentRegExpQuotationMarks = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.propertyInCamelCase}(="[^"]+")`, 'g');
		this.customElementRegExpBoolean = new RegExp(`(<${tag}[^>]+)${property}([ >])`, 'g');
		this.customElementRegExpCurlyBrackets = new RegExp(`(<${tag}[^>]+)${property}(=\\{[^\\}]+\\})`, 'g');
		this.customElementRegExpQuotationMarks = new RegExp(`(<${tag}[^>]+)${property}(="[^"]+")`, 'g');
	}

	public static getInstance(
		tag: string,
		property: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): RemovePropertyNameTask {
		const identifier = `${tag}-remove-property-${property}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RemovePropertyNameTask(identifier, tag, property, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as RemovePropertyNameTask;
	}

	public run(baseDir: string): void {
		switch (getRemoveMode()) {
			case 'delete':
				this.transpileComponentFileDelete(baseDir);
				this.transpileCustomElementFileDelete(baseDir);
				break;
			default:
				super.run(baseDir);
		}
	}

	private transpileComponentFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(DATA_REMOVED_REGEXP, ``)
				.replace(this.componentRegExpBoolean, `$1$2`)
				.replace(this.componentRegExpCurlyBrackets, `$1`)
				.replace(this.componentRegExpQuotationMarks, `$1`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(DATA_REMOVED_REGEXP, ``)
				.replace(this.customElementRegExpBoolean, `$1$2`)
				.replace(this.customElementRegExpCurlyBrackets, `$1`)
				.replace(this.customElementRegExpQuotationMarks, `$1`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
