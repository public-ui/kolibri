import fs from 'fs';
import { AbstractTask } from '../../abstract-task';
import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS } from '../../../../types';
import { filterFilesByExt } from '../../../shares/reuse';

export class AccordionPropertyRenamingHeadingToLabel extends AbstractTask {
	private constructor() {
		super(
			'accordion-property-renaming-heading-to-label copy',
			'Renaming property `_heading` to `_label`',
			COMPONENT_FILE_EXTENSIONS.concat(CUSTOM_ELEMENT_FILE_EXTENSIONS),
			'>=1 <2',
		);
	}

	public static getInstance(): AccordionPropertyRenamingHeadingToLabel {
		if (!(this.instance instanceof AccordionPropertyRenamingHeadingToLabel)) {
			this.instance = new AccordionPropertyRenamingHeadingToLabel();
		}
		return this.instance as AccordionPropertyRenamingHeadingToLabel;
	}

	public run(baseDir: string): void {
		this.transpileComponentFile(baseDir);
		this.transpileCustomElementFile(baseDir);
	}

	private transpileComponentFile(baseDir: string): void {
		const files = filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS);
		this.runDummy(files);
	}

	private transpileCustomElementFile(baseDir: string): void {
		const files = filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS);
		this.runDummy(files);
	}
}
