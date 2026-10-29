import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isTagKebabCaseRegExp, kebabToCapitalCase, logAndCreateError, MODIFIED_FILES, POST_MESSAGES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

/**
 * Removes every tag usage of a component that was removed without a replacement: paired and
 * self-closing JSX elements, custom-element tags in markup and the component's imports. Other
 * references, such as manual instantiations or aliased declarations, are not rewritten — the
 * compiler points them out and they have to be migrated manually.
 */
export class GenericRemoveTagNameTask extends AbstractTask {
	private readonly componentSoleImportRegExp: RegExp;
	private readonly componentSoleRequireRegExp: RegExp;
	private readonly componentImportStatementRegExp: RegExp;
	private readonly componentRequireStatementRegExp: RegExp;
	private readonly componentDefaultImportRegExp: RegExp;
	private readonly componentPairedRegExp: RegExp;
	private readonly componentSelfClosingRegExp: RegExp;
	private readonly customElementPairedRegExp: RegExp;
	private readonly customElementSelfClosingRegExp: RegExp;

	private readonly oldTagNameInCamelCase: string;

	protected constructor(
		identifier: string,
		description: string,
		private readonly oldTagName: string,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
		private readonly removalNotice?: string,
	) {
		super(identifier, description, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(oldTagName)) {
			throw logAndCreateError(`Old Tag "${oldTagName}" is not in kebab case.`);
		}

		this.oldTagNameInCamelCase = kebabToCapitalCase(oldTagName);

		// Named or type import with the removed component as its only member.
		this.componentSoleImportRegExp = new RegExp(
			`import\\s+(?:type\\s+)?{\\s*${this.oldTagNameInCamelCase}\\s*}\\s*from\\s*['"\`][^'"\`]*['"\`];?\\r?\\n?`,
			'g',
		);

		// Require destructuring with the removed component as its only member.
		this.componentSoleRequireRegExp = new RegExp(
			`(?:const|var|let)\\s*{\\s*${this.oldTagNameInCamelCase}\\s*}\\s*=\\s*require\\(\\s*['"\`][^'"\`]*['"\`]\\s*\\);?\\r?\\n?`,
			'g',
		);

		// Remaining import statement to strip the removed member from.
		this.componentImportStatementRegExp = new RegExp(`import\\s+(?:type\\s+)?{[^}]*}\\s*from\\s*['"\`][^'"\`]*['"\`];?`, 'g');

		// Remaining require destructuring to strip the removed member from.
		this.componentRequireStatementRegExp = new RegExp(`(?:const|var|let)\\s*{[^}]*}\\s*=\\s*require\\(\\s*['"\`][^'"\`]*['"\`]\\s*\\);?`, 'g');

		// Default import.
		this.componentDefaultImportRegExp = new RegExp(`import\\s+${this.oldTagNameInCamelCase}\\s+from\\s*['"\`][^'"\`]*['"\`];?\\r?\\n?`, 'g');

		// Paired JSX element with its content.
		this.componentPairedRegExp = new RegExp(`<${this.oldTagNameInCamelCase}\\b(\\s[^>]*)?>[\\s\\S]*?</${this.oldTagNameInCamelCase}\\s*>`, 'g');

		// Self-closing JSX element.
		this.componentSelfClosingRegExp = new RegExp(`<${this.oldTagNameInCamelCase}\\b(\\s[^>]*)?/>`, 'g');

		// Paired custom element with its content.
		this.customElementPairedRegExp = new RegExp(`<${oldTagName}(\\s[^>]*)?>[\\s\\S]*?</${oldTagName}\\s*>`, 'g');

		// Self-closing custom element.
		this.customElementSelfClosingRegExp = new RegExp(`<${oldTagName}(\\s[^>]*)?/>`, 'g');
	}

	public run(baseDir: string): void {
		const modifiedFiles = this.removeComponentFileUsages(baseDir) + this.removeCustomElementFileUsages(baseDir);

		if (modifiedFiles > 0) {
			POST_MESSAGES.add({
				message: `The "${this.oldTagName}" component was removed without a replacement, its usages and imports have been removed.${this.removalNotice ? ` ${this.removalNotice}` : ''}`,
				type: 'warn',
			});
		}
	}

	private removeComponentFileUsages(baseDir: string): number {
		let modifiedFiles = 0;
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				.replace(this.componentSoleImportRegExp, '')
				.replace(this.componentDefaultImportRegExp, '')
				.replace(this.componentSoleRequireRegExp, '')
				.replace(this.componentImportStatementRegExp, (statement: string) => this.removeImportMember(statement))
				.replace(this.componentRequireStatementRegExp, (statement: string) => this.removeImportMember(statement))
				.replace(this.componentPairedRegExp, '')
				.replace(this.componentSelfClosingRegExp, '');
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
				modifiedFiles++;
			}
		});
		return modifiedFiles;
	}

	private removeCustomElementFileUsages(baseDir: string): number {
		let modifiedFiles = 0;
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.customElementPairedRegExp, '').replace(this.customElementSelfClosingRegExp, '');
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
				modifiedFiles++;
			}
		});
		return modifiedFiles;
	}

	private removeImportMember(statement: string): string {
		// A leading member loses its trailing comma, a trailing member its leading one — one optional-comma
		// pattern would swallow both commas of a middle member and leave `{ A B }` behind.
		const withoutMember = statement
			.replace(new RegExp(`\\b${this.oldTagNameInCamelCase}\\b\\s*,\\s*`, 'g'), '')
			.replace(new RegExp(`,\\s*\\b${this.oldTagNameInCamelCase}\\b`, 'g'), '');
		// The removed component was the only member, so the statement imports nothing anymore.
		if (/{\s*}/.test(withoutMember)) {
			return '';
		}
		return withoutMember;
	}
}
