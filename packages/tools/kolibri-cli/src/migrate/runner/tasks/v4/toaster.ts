import fs from 'fs';

import { FileExtension } from '../../../../types';
import { filterFilesByExt, getRemoveMode, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

// ToasterService migration should cover JavaScript/TypeScript files where the service is used
const TOASTER_FILE_EXTENSIONS: FileExtension[] = ['js', 'jsx', 'ts', 'tsx', 'vue'];

export class RemoveToasterGetInstanceOptionsTask extends AbstractTask {
	private readonly getInstanceOptionsRegExp: RegExp;

	protected constructor(identifier: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(identifier, 'Remove "defaultVariant" option from ToasterService.getInstance() calls', TOASTER_FILE_EXTENSIONS, versionRange, dependentTasks, options);

		// Match ToasterService.getInstance(document, { defaultVariant: '...' })
		// This regex captures the service call and removes the options parameter if it only contains defaultVariant
		this.getInstanceOptionsRegExp = /(\bToasterService\.getInstance\s*\(\s*[^,)]+)(\s*,\s*\{\s*defaultVariant\s*:\s*['"]\w+['"]\s*\})(\s*\))/g;
	}

	public static getInstance(versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions): RemoveToasterGetInstanceOptionsTask {
		const identifier = `remove-toaster-get-instance-options-${versionRange}`;
		return new RemoveToasterGetInstanceOptionsTask(identifier, versionRange, dependentTasks, options);
	}

	public run(baseDir: string): void {
		this.transpileFiles(baseDir);
	}

	private transpileFiles(baseDir: string): void {
		filterFilesByExt(baseDir, TOASTER_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			let newContent = content;
			let modified = false;

			// Remove defaultVariant options from ToasterService.getInstance() calls
			newContent = newContent.replace(this.getInstanceOptionsRegExp, (match, before: string, optionsParam: string, after: string) => {
				modified = true;
				// Simply remove the options parameter entirely
				return before + after;
			});

			// Also handle more complex cases where there might be other options mixed in
			// Match any options object that contains defaultVariant and remove just that property
			const complexOptionsRegExp = /(\bToasterService\.getInstance\s*\(\s*[^,)]+\s*,\s*\{[^}]*?)(?:,\s*)?defaultVariant\s*:\s*['"]\w+['"](?:,\s*)?([^}]*\})/g;

			newContent = newContent.replace(complexOptionsRegExp, (match, before: string, after: string) => {
				// Only modify if we haven't already handled this with the simpler regex
				if (!this.getInstanceOptionsRegExp.test(match)) {
					modified = true;
					// Clean up potential double commas
					const cleanBefore = before.replace(/,\s*$/, '');
					const cleanAfter = after.replace(/^\s*,/, '');

					// Check if the options object would be empty after removing defaultVariant
					if (cleanAfter.trim() === '}' && cleanBefore.trim().endsWith('{')) {
						// Remove the entire options parameter
						return cleanBefore.replace(/\s*,\s*\{\s*$/, '');
					}

					// Add comma if needed between remaining properties
					if (cleanBefore.trim() !== '{' && cleanAfter.trim() !== '}' && !cleanBefore.endsWith(',') && !cleanAfter.startsWith(',')) {
						return cleanBefore + ',' + cleanAfter;
					}

					return cleanBefore + cleanAfter;
				}
				return match;
			});

			if (modified && getRemoveMode()) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
