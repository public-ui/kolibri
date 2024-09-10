import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isTagKebabCaseRegExp, kebabToCapitalCase, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class GenericRenameTagNameTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly componentImportRegExp: RegExp;
	private readonly customElementRegExp: RegExp;

	private readonly newTagNameInCamelCase: string;

	protected constructor(
		identifier: string,
		description: string,
		oldTagName: string,
		private readonly newTagName: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, description, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(oldTagName)) {
			throw logAndCreateError(`Old Tag "${oldTagName}" is not in kebab case.`);
		}

		if (!isTagKebabCaseRegExp.test(newTagName)) {
			throw logAndCreateError(`Old Tag "${newTagName}" is not in kebab case.`);
		}

		this.newTagNameInCamelCase = kebabToCapitalCase(newTagName);

		this.componentRegExp = new RegExp(`([\\<\\/])${kebabToCapitalCase(oldTagName)}(\\s+[^\\>]*|\\>)`, 'g');
		this.componentImportRegExp = new RegExp(`([\\w {,\\r\\n]+)${kebabToCapitalCase(oldTagName)}([, ]\\s+[\\r\\n\\w },]+'@public-ui/react')`, 'g');
		this.customElementRegExp = new RegExp(`([\\<\\/])${oldTagName}(\\s+[^\\>]*|\\>)`, 'g');
	}

	public run(baseDir: string): void {
		this.transpileComponentFileRename(baseDir);
		this.transpileCustomElementFileRename(baseDir);
	}

	private transpileComponentFileRename(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			console.log('CONTENT: ', content);
			const newContent = content
				// Replacements
				.replace(this.componentRegExp, `$1${this.newTagNameInCamelCase}$2`)
				.replace(this.componentImportRegExp, `$1${this.newTagNameInCamelCase}$2`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}

			console.log('NEW CONTENT: ', newContent);
		});
	}

	private transpileCustomElementFileRename(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.customElementRegExp, `$1${this.newTagName}$2`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
