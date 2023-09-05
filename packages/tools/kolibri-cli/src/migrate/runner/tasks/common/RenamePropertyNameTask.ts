import fs from 'fs';
import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS } from '../../../../types';
import { MODIFIED_FILES, filterFilesByExt, isPropertyKebabCaseRegExp, isTagKebabCaseRegExp, kebabToCapitalCase } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

const EXTENSIONS = COMPONENT_FILE_EXTENSIONS.concat(CUSTOM_ELEMENT_FILE_EXTENSIONS);

export class RenamePropertyNameTask extends AbstractTask {
	private readonly newProperty: string;
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;
	private readonly oldPropertyInCamelCase: string;
	private readonly newPropertyInCamelCase: string;

	protected constructor(
		identifier: string,
		tag: string,
		oldProperty: string,
		newProperty: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Rename property "${oldProperty}" to "${newProperty}" of "${tag}" component`, EXTENSIONS, versionRange, dependentTasks, options);

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

		this.componentRegExp = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.oldPropertyInCamelCase}(="[^"]+")`, 'g');
		this.customElementRegExp = new RegExp(`(<${tag}[^>]+)${oldProperty}(="[^"]+")`, 'g');
	}

	public static getInstance(
		tag: string,
		oldProperty: string,
		newProperty: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): RenamePropertyNameTask {
		const identifier = `${tag}-rename-property-${oldProperty}-to-${newProperty}`;
		if (!this.instances.has(identifier)) {
			this.instances?.set(identifier, new RenamePropertyNameTask(identifier, tag, oldProperty, newProperty, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as RenamePropertyNameTask;
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
				MODIFIED_FILES.add(file);
				// fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFile(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.customElementRegExp, `$1${this.newProperty}$2`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				// fs.writeFileSync(file, newContent);
			}
		});
	}
}
