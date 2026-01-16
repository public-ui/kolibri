import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isTagKebabCaseRegExp, kebabToCapitalCase, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class GenericRenameTagNameTask extends AbstractTask {
	private readonly componentRegExp: RegExp;
	private readonly componentImportRegExp: RegExp;
	private readonly componentNamedImportRegExp: RegExp;
	private readonly componentDefaultImportRegExp: RegExp;
	private readonly componentTypeImportRegExp: RegExp;
	private readonly componentRequireRegExp: RegExp;
	private readonly customElementRegExp: RegExp;

	private readonly newTagNameInCamelCase: string;
	private readonly oldTagNameInCamelCase: string;

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
		this.oldTagNameInCamelCase = kebabToCapitalCase(oldTagName);

		// Tag replacement in JSX: <KolButton ... /> → <KolButtonNew ... />
		this.componentRegExp = new RegExp(`([\\<\\/])${this.oldTagNameInCamelCase}(\\s+[^\\>]*|\\>)`, 'g');

		// Legacy: React/Vue adapter imports with package restriction
		this.componentImportRegExp = new RegExp(
			`([\\w {,\\r\\n]+)${this.oldTagNameInCamelCase}([, ]\\s+[\\r\\n\\w },]+'@public-ui\\/(?:react(?:-v19)?|vue)')`,
			'g',
		);

		// ESM Named Imports: import { KolButton, ... } from '@public-ui/react-v19';
		this.componentNamedImportRegExp = new RegExp(`(import\\s*{[^}]*?)\\b${this.oldTagNameInCamelCase}\\b([^}]*}\\s*from\\s*['"\`][^'"\`]*['"\`])`, 'g');

		// ESM Default Imports: import KolButton from '@public-ui/react-v19';
		this.componentDefaultImportRegExp = new RegExp(`import\\s+${this.oldTagNameInCamelCase}\\s+(from\\s+['"\`][^'"\`]*['"\`])`, 'g');

		// TypeScript Type Imports: import type { KolButton } from '@public-ui/react-v19';
		this.componentTypeImportRegExp = new RegExp(`(import\\s+type\\s*{[^}]*?)\\b${this.oldTagNameInCamelCase}\\b([^}]*}\\s*from\\s*['"\`][^'"\`]*['"\`])`, 'g');

		// CommonJS Requires: const { KolButton } = require('@public-ui/react-v19');
		this.componentRequireRegExp = new RegExp(
			`((?:const|var|let)\\s*{[^}]*?)\\b${this.oldTagNameInCamelCase}\\b([^}]*}\\s*=\\s*require\\(['"\`][^'"\`]*['"\`]\\))`,
			'g',
		);

		// Custom element tag replacement in HTML: <kol-button ... /> → <kol-button-new ... />
		this.customElementRegExp = new RegExp(`([\\<\\/])${oldTagName}(\\s+[^\\>]*|\\>)`, 'g');
	}

	public run(baseDir: string): void {
		this.transpileComponentFileRename(baseDir);
		this.transpileCustomElementFileRename(baseDir);
	}

	private transpileComponentFileRename(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			let newContent = content;

			// Replace JSX/HTML tags
			newContent = newContent.replace(this.componentRegExp, `$1${this.newTagNameInCamelCase}$2`);

			// Replace ALL component name usages with a simple word-boundary pattern
			// This catches: imports, const/var/let declarations, function calls, type annotations, etc.
			newContent = newContent.replace(new RegExp(`\\b${this.oldTagNameInCamelCase}\\b`, 'g'), this.newTagNameInCamelCase);

			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
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
