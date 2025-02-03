import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isTagKebabCaseRegExp, kebabToCapitalCase, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

export class RefactorPropertyErrorToMsg extends AbstractTask {
	private readonly componentRegExpCurlyBrackets: RegExp;
	private readonly componentRegExpQuotationMarks: RegExp;
	private readonly customElementRegExpQuotationMarks: RegExp;

	private constructor(identifier: string, tag: string, versionRange: string) {
		super(identifier, `Refactor property "_error" to "_msg" of "${tag}" component`, MARKUP_EXTENSIONS, versionRange);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}

		const tagCapitalCase = kebabToCapitalCase(tag);

		this.componentRegExpCurlyBrackets = new RegExp(`(<${tagCapitalCase}[^>]+)_error=\\{([^\\}]+)\\}`, 'g');
		this.componentRegExpQuotationMarks = new RegExp(`(<${tagCapitalCase}[^>]+)_error="([^"]+)"`, 'g');
		this.customElementRegExpQuotationMarks = new RegExp(`(<${tag}[^>]+)_error="([^"]+)"`, 'g');
	}

	public static getInstance(tag: string, versionRange: string): RefactorPropertyErrorToMsg {
		const identifier = `${tag}-refactor-property-error-to-msg`;

		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RefactorPropertyErrorToMsg(identifier, tag, versionRange));
		}
		return this.instances.get(identifier) as RefactorPropertyErrorToMsg;
	}

	public run(baseDir: string): void {
		this.transpileComponentFiles(baseDir);
		this.transpileCustomElementFiles(baseDir);
	}

	private transpileComponentFiles(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				.replace(this.componentRegExpCurlyBrackets, `$1_msg={{ _type: 'error', _description: $2 }}`)
				.replace(this.componentRegExpQuotationMarks, `$1_msg={{ _type: 'error', _description: '$2' }}`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFiles(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.customElementRegExpQuotationMarks, `$1_msg='${JSON.stringify({ _type: 'error', _description: '$2' })}'`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
