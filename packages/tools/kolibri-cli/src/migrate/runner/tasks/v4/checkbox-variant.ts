import fs from 'fs';

import { MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, isTagKebabCaseRegExp, logAndCreateError, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

type VariantRewrite = {
	/** The `_variant` value that switches the checkbox into the dedicated component. */
	variant: 'button' | 'switch';
	/** The tag of the dedicated component, in kebab case. */
	newTagKebabCase: string;
	/** The tag of the dedicated component, in capital case for JSX. */
	newTagCapitalCase: string;
};

const VARIANT_REWRITES: VariantRewrite[] = [
	{ variant: 'switch', newTagKebabCase: 'kol-input-switch', newTagCapitalCase: 'KolInputSwitch' },
	{ variant: 'button', newTagKebabCase: 'kol-input-toggle-button', newTagCapitalCase: 'KolInputToggleButton' },
];

/** Removes the mapped `_variant` attribute; only the renamed tags carry it after the rename pass. */
const REMOVE_VARIANT_ATTRIBUTE_REG_EXP = /\s+_variant=(?:"(?:button|switch)"|'(?:button|switch)')/g;

/**
 * Rewrites `<kol-input-checkbox _variant="switch">` and `_variant="button"` into the dedicated
 * component tags `kol-input-switch` and `kol-input-toggle-button`, in markup and in JSX. Bound
 * `_variant={expression}` values are not covered.
 */
export class RenameCheckboxVariantToTagNameTask extends AbstractTask {
	private constructor(identifier: string, description: string, versionRange: string, options: TaskOptions = {}) {
		super(identifier, description, MARKUP_EXTENSIONS, versionRange, [], options);

		for (const { newTagKebabCase } of VARIANT_REWRITES) {
			if (!isTagKebabCaseRegExp.test(newTagKebabCase)) {
				throw logAndCreateError(`New tag "${newTagKebabCase}" is not in kebab case.`);
			}
		}
	}

	public static getInstance(versionRange: string, options: TaskOptions = {}): RenameCheckboxVariantToTagNameTask {
		const identifier = 'kol-input-checkbox-rename-variant-to-dedicated-tag';
		if (!this.instances.has(identifier)) {
			this.instances.set(
				identifier,
				new RenameCheckboxVariantToTagNameTask(
					identifier,
					'Rename the kol-input-checkbox variants switch and button to the dedicated component tags',
					versionRange,
					options,
				),
			);
		}
		return this.instances.get(identifier) as RenameCheckboxVariantToTagNameTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, MARKUP_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			let newContent = content;

			for (const { variant, newTagKebabCase, newTagCapitalCase } of VARIANT_REWRITES) {
				/**
				 * Renames the custom element tag and the JSX component tag of matching variants only,
				 * including the closing tag of a paired element. A checkbox nests no other checkbox,
				 * so the lazy pair match is safe.
				 */
				newContent = newContent.replace(
					new RegExp(`<kol-input-checkbox\\b([^>]*_variant=["']${variant}["'][^>]*?)(\\/>|>[\\s\\S]*?<\\/kol-input-checkbox>)`, 'g'),
					(_match, attributes: string, rest: string) => `<${newTagKebabCase}${attributes}${rest.replace('kol-input-checkbox', newTagKebabCase)}`,
				);
				newContent = newContent.replace(
					new RegExp(`<KolInputCheckbox\\b([^>]*_variant=["']${variant}["'][^>]*?)(\\/>|>[\\s\\S]*?<\\/KolInputCheckbox>)`, 'g'),
					(_match, attributes: string, rest: string) => `<${newTagCapitalCase}${attributes}${rest.replace('KolInputCheckbox', newTagCapitalCase)}`,
				);
			}
			newContent = newContent.replace(REMOVE_VARIANT_ATTRIBUTE_REG_EXP, '');

			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}
