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

export class GenericUpdatePropertyValueTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;

	public constructor(
		identifier: string,
		description: string,
		tag: string,
		property: string,
		private readonly oldValue: string,
		private readonly newValue: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, description, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(property)) {
			throw logAndCreateError(`Property "${property}" is not in kebab case.`);
		}

		const propertyInCamelCase = kebabToCamelCase(property);

		// Use propertyInCamelCase for Angular components
		this.componentRegExp = new RegExp(`<${kebabToCapitalCase(tag)}[^>]+${propertyInCamelCase}=['"]${oldValue}['"]`, 'g');
		// Use original property name for custom elements
		this.customElementRegExp = new RegExp(`<${tag}[^>]+${property}=['"]${oldValue}['"]`, 'g');
	}

	public run(baseDir: string): void {
		this.transpileComponentFileUpdate(baseDir);
		this.transpileCustomElementFileUpdate(baseDir);
	}

	private transpileComponentFileUpdate(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = updateAttributeValue(content, this.componentRegExp, this.oldValue, this.newValue);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFileUpdate(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = updateAttributeValue(content, this.customElementRegExp, this.oldValue, this.newValue);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}

// Helper function to update attribute values in HTML strings
/**
 *
 * @param htmlString
 * @param tagRegExp
 * @param oldValue
 * @param newValue
 */
function updateAttributeValue(htmlString: string, tagRegExp: RegExp, oldValue: string, newValue: string): string {
	return htmlString.replace(tagRegExp, (match) => {
		return match.replace(`="${oldValue}"`, `="${newValue}"`).replace(`='${oldValue}'`, `='${newValue}'`);
	});
}
