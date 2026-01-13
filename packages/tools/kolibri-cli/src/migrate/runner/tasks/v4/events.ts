import fs from 'fs';

import { FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

const EVENT_REPLACEMENTS: Record<string, string> = {
	kolBlur: 'blur',
	kolChange: 'change',
	kolChangeHeaderCells: 'changeheadercells',
	kolChangePage: 'changepage',
	kolChangePageSize: 'changepagesize',
	kolClick: 'click',
	kolClose: 'close',
	kolCreate: 'create',
	kolFocus: 'focus',
	kolInput: 'input',
	kolKeydown: 'keydown',
	kolMousedown: 'mousedown',
	kolReset: 'reset',
	kolSelect: 'select',
	kolSelectionChange: 'selectionchange',
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

		// Handle addEventListener('kolX', ...)
		const addEventListenerPattern = new RegExp(`(addEventListener\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(addEventListenerPattern, `$1${newName}$2`);

		// Handle removeEventListener('kolX', ...)
		const removeEventListenerPattern = new RegExp(`(removeEventListener\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(removeEventListenerPattern, `$1${newName}$2`);

		// Handle new CustomEvent('kolX', ...)
		const customEventPattern = new RegExp(`(new\\s+CustomEvent\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(customEventPattern, `$1${newName}$2`);

		// Handle assignments and object property values: foo = 'kolX', { event: 'kolX' }
		const assignmentPattern = new RegExp(`([=:]\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(assignmentPattern, `$1${newName}$2`);

		// Handle JSX/TSX event handler props: onKolClick -> onClick, etc.
		const capitalize = (value: string): string => (value.length === 0 ? value : value[0].toUpperCase() + value.slice(1));
		const oldPropName = `on${capitalize(oldName)}`;
		const newPropName = `on${capitalize(newName)}`;
		const jsxPropPattern = new RegExp(`\\b${oldPropName}\\b`, 'g');
		updatedContent = updatedContent.replace(jsxPropPattern, newPropName);

		// Handle simple template literals: `kolX`
		const templateLiteralPattern = new RegExp(`(\`)${oldName}(\`)`, 'g');
		updatedContent = updatedContent.replace(templateLiteralPattern, `$1${newName}$2`);
		const dispatchEventPattern = new RegExp(`(dispatchEvent\\s*\\(\\s*new\\s+Event\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(dispatchEventPattern, `$1${newName}$2`);

		const koliBriCreatorPattern = new RegExp(`(dispatchEvent\\s*\\(\\s*createKoliBriEvent\\s*\\(\\s*['"])${oldName}(['"])`, 'g');
		updatedContent = updatedContent.replace(koliBriCreatorPattern, `$1${newName}$2`);

		// Handle bare event names at statement boundaries and as function arguments
		// Match: (start of line, whitespace, or parenthesis)eventName(whitespace, comma, semicolon, or end of line)
		// This handles cases like:
		//   - kolChange (standalone at end of line)
		//   - addEventListener(kolClick, handler)
		//   - dispatchEvent(new Event(kolX))
		// Negative lookahead/lookbehind would be better but JavaScript regex support is limited
		// So we match the surrounding context and preserve it
		const bareEventPattern = new RegExp(`(^|[\\s(])${oldName}([\\s,;\\n]|$)`, 'gm');
		updatedContent = updatedContent.replace(bareEventPattern, `$1${newName}$2`);

		return updatedContent;
	}
}

const renameKolEventNamesTaskInstance = RenameKolEventNamesTask.getInstance('^4');
export const RenameKolEventNamesTasks: AbstractTask[] = [renameKolEventNamesTaskInstance];
