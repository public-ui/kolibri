import fs from 'fs';

import { FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

const EVENT_REPLACEMENTS: Record<string, string> = {
	kolBlur: 'blur',
	kolChange: 'change',
	kolChangeHeaderCells: 'changeHeaderCells',
	kolChangePage: 'changePage',
	kolChangePageSize: 'changePageSize',
	kolClick: 'click',
	kolClose: 'close',
	kolCreate: 'create',
	kolFocus: 'focus',
	kolInput: 'input',
	kolKeydown: 'keydown',
	kolMousedown: 'mousedown',
	kolReset: 'reset',
	kolSelect: 'select',
	kolSelectionChange: 'selectionChange',
	kolSort: 'sort',
	kolSubmit: 'submit',
	kolToggle: 'toggle',
};

export class RenameKolEventNamesTask extends AbstractTask {
	private constructor(versionRange: string) {
		super('rename-kol-events', 'Rename kol* DOM events to their native names', [...FILE_EXTENSIONS], versionRange);
	}

	public static getInstance(versionRange: string): AbstractTask {
		const identifier = `${versionRange}-rename-kol-events`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RenameKolEventNamesTask(versionRange));
		}

		return this.instances.get(identifier) as RenameKolEventNamesTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, this.extensions).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = this.replaceEventNames(content);

			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private replaceEventNames(content: string): string {
		// Sort by key length descending to ensure longer event names are replaced first
		// This prevents partial replacements (e.g., kolChange before kolChangeHeaderCells)
		const sortedEntries = Object.entries(EVENT_REPLACEMENTS).sort(([keyA], [keyB]) => keyB.length - keyA.length);

		return sortedEntries.reduce((updatedContent, [oldName, newName]) => {
			return this.replaceEventNameInEventContexts(updatedContent, oldName, newName);
		}, content);
	}

	private replaceEventNameInEventContexts(content: string, oldName: string, newName: string): string {
		let updatedContent = content;

		const addEventListenerPattern = new RegExp(`(addEventListener\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(addEventListenerPattern, `$1${newName}$2`);

		const customEventPattern = new RegExp(`(new\\s+CustomEvent\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(customEventPattern, `$1${newName}$2`);

		return updatedContent;
	}
}

const renameKolEventNamesTaskInstance = RenameKolEventNamesTask.getInstance('^4');
export const RenameKolEventNamesTasks: AbstractTask[] = [renameKolEventNamesTaskInstance];
