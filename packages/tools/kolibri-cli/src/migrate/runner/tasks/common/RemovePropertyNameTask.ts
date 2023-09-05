import fs from 'fs';
import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS } from '../../../../types';
import { MODIFIED_FILES, filterFilesByExt, isPropertyKebabCaseRegExp, isTagKebabCaseRegExp, kebabToCapitalCase } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

const EXTENSIONS = COMPONENT_FILE_EXTENSIONS.concat(CUSTOM_ELEMENT_FILE_EXTENSIONS);

export class RemovePropertyNameTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly customElementRegExp: RegExp;
	private readonly propertyInCamelCase: string;

	protected constructor(identifier: string, tag: string, property: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(identifier, `Remove property "${property}" of "${tag}" component`, EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw new Error(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(property)) {
			throw new Error(`Property "${property}" is not in kebab case.`);
		}

		this.propertyInCamelCase = kebabToCapitalCase(property);

		this.componentRegExp = new RegExp(`(<${kebabToCapitalCase(tag)}[^>]+)${this.propertyInCamelCase}="[^"]+"`, 'g');
		this.customElementRegExp = new RegExp(`(<${tag}[^>]+)${property}="[^"]+"`, 'g');
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
		this.transpileComponentFile(baseDir);
		this.transpileCustomElementFile(baseDir);
	}

	private transpileComponentFile(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.componentRegExp, `$1$2`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				// fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFile(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.customElementRegExp, `$1$2`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				// fs.writeFileSync(file, newContent);
			}
		});
	}
}
