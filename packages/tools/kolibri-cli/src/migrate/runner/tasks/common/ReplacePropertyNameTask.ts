import fs from 'fs';
import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isPropertyKebabCaseRegExp, isTagKebabCaseRegExp, kebabToCapitalCase } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

const EXTENSIONS = COMPONENT_FILE_EXTENSIONS.concat(CUSTOM_ELEMENT_FILE_EXTENSIONS);

export class ReplacePropertyNameTask extends AbstractTask {
	private readonly newProperty: string;
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;
	private readonly oldPropertyInCamelCase: string;
	private readonly newPropertyInCamelCase: string;

	protected constructor(
		identifier: string,
		versionRange: string,
		tag: string,
		oldProperty: string,
		newProperty: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Renaming property "${oldProperty}" to "${newProperty}" of "${tag}" component`, EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw new Error(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(oldProperty)) {
			throw new Error(`Old property "${oldProperty}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(newProperty)) {
			throw new Error(`New property "${newProperty}" is not in kebab case.`);
		}

		this.newProperty = newProperty;

		this.oldPropertyInCamelCase = kebabToCapitalCase(oldProperty);
		this.newPropertyInCamelCase = kebabToCapitalCase(newProperty);

		this.componentRegExp = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.oldPropertyInCamelCase}(="([^"]+)")`, 'g');
		this.customElementRegExp = new RegExp(`(<${tag}[^>]+)${oldProperty}(="([^"]+)")`, 'g');
	}

	public static getInstance(
		identifier: string,
		versionRange: string,
		tag: string,
		oldProperty: string,
		newProperty: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): ReplacePropertyNameTask {
		if (!(this.instance instanceof ReplacePropertyNameTask)) {
			this.instance = new ReplacePropertyNameTask(identifier, versionRange, tag, oldProperty, newProperty, dependentTasks, options);
		}
		return this.instance as ReplacePropertyNameTask;
	}

	public run(baseDir: string): void {
		this.transpileComponentFile(baseDir);
		this.transpileCustomElementFile(baseDir);
	}

	private transpileComponentFile(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.componentRegExp, `$1${this.newPropertyInCamelCase}$2`);
			if (content !== newContent) {
				console.log(newContent);
				fs.writeFileSync(`${file}.bak`, newContent);
			}
		});
	}

	private transpileCustomElementFile(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.customElementRegExp, `$1${this.newProperty}$2`);
			if (content !== newContent) {
				console.log(newContent);
				fs.writeFileSync(`${file}.bak`, newContent);
			}
		});
	}
}
