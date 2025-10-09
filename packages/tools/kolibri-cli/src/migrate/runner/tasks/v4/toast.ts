import fs from 'fs';

import { FileExtension } from '../../../../types';
import { filterFilesByExt, getRemoveMode, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

// Toast migration should cover JavaScript/TypeScript files where toast services are used
const TOAST_FILE_EXTENSIONS: FileExtension[] = ['js', 'jsx', 'ts', 'tsx', 'vue'];

export class RemoveToastVariantTask extends AbstractTask {
	private readonly toastEnqueueVariantRegExp: RegExp;
	private readonly toastObjectVariantRegExp: RegExp;

	protected constructor(identifier: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(identifier, 'Remove "variant" property from Toast objects in enqueue() calls', TOAST_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		// Match variant property in enqueue() calls - multiline support
		this.toastEnqueueVariantRegExp = /(\benqueue\s*\(\s*\{[\s\S]*?)(\s*,?\s*variant\s*:\s*['"]\w+['"][\s\S]*?(?=\s*[,}]))([,\s]*[\s\S]*?\})/g;

		// Match variant property in toast objects - multiline support
		this.toastObjectVariantRegExp = /(\{\s*[\s\S]*?)(\s*,?\s*variant\s*:\s*['"]\w+['"][\s\S]*?(?=\s*[,}]))([,\s]*[\s\S]*?\})/g;
	}

	public static getInstance(versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions): RemoveToastVariantTask {
		const identifier = `remove-toast-variant-${versionRange}`;
		return new RemoveToastVariantTask(identifier, versionRange, dependentTasks, options);
	}

	public run(baseDir: string): void {
		this.transpileFiles(baseDir);
	}

	private transpileFiles(baseDir: string): void {
		filterFilesByExt(baseDir, TOAST_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			let newContent = content;
			let modified = false;

			// Simple RegEx to match variant lines
			const variantLineRegExp = /^(\s*)variant\s*:\s*['"]\w+['"],?\s*$/gm;

			// Check if the file likely contains toast-related code
			if (content.includes('enqueue') || (content.includes('type:') && content.includes('variant:'))) {
				newContent = newContent.replace(variantLineRegExp, () => {
					modified = true;
					return ''; // Remove the entire line
				});

				// Clean up potential comma issues after removing lines
				newContent = newContent.replace(/,(\s*\n\s*\})/g, '$1'); // Comma before closing brace
				newContent = newContent.replace(/\{(\s*\n\s*,)/g, '{$1'.replace(',', '')); // Comma after opening brace
				newContent = newContent.replace(/,(\s*\n\s*,)/g, '$1'); // Double commas

				// Remove excessive empty lines
				newContent = newContent.replace(/\n\s*\n\s*\n/g, '\n\n');
			}

			if (modified && getRemoveMode()) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
