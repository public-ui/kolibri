import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { MODIFIED_FILES, filterFilesByExt } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

export class RefactorPropertyType extends AbstractTask {
	private readonly componentRegExp = /_label={false}/g;
	private readonly customElementRegExp = /_label="false"/g;

	private constructor() {
		super(`refactor-property-label-replace-false`, `Refactor property "_label" - replace "false" with ""`, MARKUP_EXTENSIONS, '>=1.6 <=1.7');
	}

	public static getInstance(): RefactorPropertyType {
		const identifier = `refact-property-label-replace-false`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RefactorPropertyType());
		}
		return this.instances.get(identifier) as RefactorPropertyType;
	}

	public run(baseDir: string): void {
		this.transpileComponentFileDelete(baseDir);
		this.transpileCustomElementFileDelete(baseDir);
	}

	private transpileComponentFileDelete(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.componentRegExp, `_label=""`);
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
				.replace(this.customElementRegExp, `_label=""`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
