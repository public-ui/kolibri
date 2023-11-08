import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { MODIFIED_FILES, filterFilesByExt, isKebabCaseRegExp, isTagKebabCaseRegExp, logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

type SlotAttributeName = 'slot' | 'data-removed-slot';

export class GenericRenameSlotNameTask extends AbstractTask {
	private readonly regExpCurlyBrackets: RegExp;
	private readonly regExpQuotationMarks: RegExp;
	private readonly regExpCurlyBracketsAndQuotationMarks: RegExp;

	protected constructor(
		identifier: string,
		description: string,
		tag: string,
		oldSlotName: string,
		private readonly newSlotName: string,
		private readonly slotAttributeName: SlotAttributeName,
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(identifier, description, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(oldSlotName)) {
			throw logAndCreateError(`Slot name "${oldSlotName}" is not in kebab case.`);
		}
		if (!isKebabCaseRegExp.test(newSlotName)) {
			throw logAndCreateError(`New slot name "${newSlotName}" is not in kebab case.`);
		}

		this.regExpCurlyBrackets = new RegExp(`(data-removed-)*slot=\\{'${oldSlotName}'\\}`, 'g');
		this.regExpQuotationMarks = new RegExp(`(data-removed-)*slot="${oldSlotName}"`, 'g');
		this.regExpCurlyBracketsAndQuotationMarks = new RegExp(`(data-removed-)*slot=\\{"${oldSlotName}"\\}`, 'g');
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content
				// Replacements
				.replace(this.regExpCurlyBrackets, `${this.slotAttributeName}="${this.newSlotName}"`)
				.replace(this.regExpQuotationMarks, `${this.slotAttributeName}="${this.newSlotName}"`)
				.replace(this.regExpCurlyBracketsAndQuotationMarks, `${this.slotAttributeName}="${this.newSlotName}"`);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
