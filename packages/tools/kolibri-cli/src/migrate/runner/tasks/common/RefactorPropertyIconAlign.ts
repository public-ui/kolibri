import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, kebabToCapitalCase, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

export class RefactorPropertyIconAlign extends AbstractTask {
	private tag: string;

	private constructor(tag: string) {
		super(`refactor-property-icon-align`, `Refactor property "_icon-align" - integrate in "_icons" property`, MARKUP_EXTENSIONS, '^2'); //fixme revert version
		this.tag = tag;
	}

	public static getInstance(tag: string): RefactorPropertyIconAlign {
		const identifier = `${tag}-refactor-property-label-replace-false`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RefactorPropertyIconAlign(tag));
		}
		return this.instances.get(identifier) as RefactorPropertyIconAlign;
	}

	public run(baseDir: string): void {
		this.transpileComponentFile(baseDir);
		this.transpileCustomElementFile(baseDir);
	}

	private transpileComponentFile(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = this.rewriteComponentContents(content, true);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFile(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = this.rewriteComponentContents(content, false);
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private rewriteComponentContents(input: string, isComponent: boolean): string {
		const tagName = isComponent ? kebabToCapitalCase(this.tag) : this.tag;
		const tagsRegex = new RegExp(`<(${tagName}[^>]*_icon(?:-a|A)lign[^>]*)>`, 'g');
		const iconAlignRegex = /_icon(?:-a|A)lign=["'{]+?(\w+)["'}]/;
		const iconsRegex = /_icons=(?:'|"|{"|{')([\w\s-]+)["'}]/;

		return input.replace(tagsRegex, (componentTag) => {
			const iconAlignMatches = componentTag.match(iconAlignRegex);
			const iconsMatches = componentTag.match(iconsRegex);

			// Make sure icons and iconAlign are valid
			if (iconAlignMatches?.[1] && iconsMatches?.[1]) {
				// Replace icons and iconAlign with one joined object
				const newIcons = isComponent
					? `_icons={{ '${iconAlignMatches?.[1]}': '${iconsMatches?.[1]}' }}`
					: `_icons="{ '${iconAlignMatches?.[1]}': '${iconsMatches?.[1]}' }"`;

				return componentTag.replace(iconAlignRegex, '').replace(iconsRegex, newIcons);
			}

			return componentTag;
		});
	}
}
