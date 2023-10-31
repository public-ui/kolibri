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

const removeLineBreaksAndSpaces = (match: string) => {
	return match.replace(/\r?\n/g, ' ').replace(/>\s+/g, '>').replace(/\s+</g, '<');
};

export class LabelExpertSlot extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly componentNoLabelPropRegExp: RegExp;
	private readonly customElementRegExp: RegExp;
	private readonly customElementNoLabelPropRegExp: RegExp;
	private readonly propertyInCamelCase: string;

	private constructor(
		identifier: string,
		private readonly tag: string,
		readonly property: string,
		versionRange: string,
		dependentTasks: AbstractTask[],
		options: TaskOptions,
	) {
		super(identifier, `Move innerText of "${tag}" component to property "${property}"`, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(property)) {
			throw logAndCreateError(`Property "${property}" is not in kebab case.`);
		}

		const tagCapitalCase = kebabToCapitalCase(tag);
		this.propertyInCamelCase = kebabToCamelCase(property);

		// https://regex101.com/r/WkEKxu/1

		this.componentRegExp = new RegExp(`(<${tagCapitalCase}[^>]*)>([^<]+(\\n\\s*)*)(<\\/${tagCapitalCase}>)`, 'g');
		this.customElementRegExp = new RegExp(`(<${tag}[^>]*)>([^<]+(\\n\\s*)*)(<\\/${tag}>)`, 'g');

		this.componentRegExp = new RegExp(`<(${tagCapitalCase}[^>]*)>([^<>]+)(<\\/${tagCapitalCase}>)`, 'g');
		this.customElementRegExp = new RegExp(`<(${tag}[^>]*)>([^<>]+)(<\\/${tag}>)`, 'g');

		this.componentNoLabelPropRegExp = new RegExp(`<${tagCapitalCase}[^>]*>`, 'g');
		this.customElementNoLabelPropRegExp = new RegExp(`<${tag}[^>]*>`, 'g');
	}

	public static getInstance(
		tag: string,
		property: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): LabelExpertSlot {
		const identifier = `${tag}-move-innerText-to-property-${property}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new LabelExpertSlot(identifier, tag, property, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as LabelExpertSlot;
	}

	public run(baseDir: string): void {
		this.transpileComponentFileDelete(baseDir);
		this.transpileCustomElementFileDelete(baseDir);
	}

	private addMissingEmptyLabelToActivateExpertSlot(substring: string): string {
		if (!substring.endsWith('=>') && !substring.includes(`_label`)) {
			return substring.replace(/(\/?>)/, ` _label=""$1`);
		}
		return substring;
	}

	private transpileComponentFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.componentRegExp, removeLineBreaksAndSpaces)
				.replace(this.componentRegExp, (...args) => {
					if (typeof args[2] === 'string' && args[2].includes('{')) {
						args[2] = args[2].replace(/\{/g, '${');
					}
					return `<${args[1]} ${this.propertyInCamelCase}={\`${args[2]}\`}/>`;
				})
				.replace(this.componentNoLabelPropRegExp, this.addMissingEmptyLabelToActivateExpertSlot.bind(this));
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.customElementRegExp, removeLineBreaksAndSpaces)
				.replace(this.customElementRegExp, (...args) => {
					if (typeof args[2] === 'string' && args[2].includes('{')) {
						args[2] = args[2].replace(/\{/g, '${');
					}
					return `<${args[1]} ${this.propertyInCamelCase}="${args[2]}"></${this.tag}>`;
				})
				.replace(this.customElementNoLabelPropRegExp, this.addMissingEmptyLabelToActivateExpertSlot.bind(this));
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
