import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, kebabToCapitalCase, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

class MapVariantStandaloneToInlineTask extends AbstractTask {
	private readonly tagCapitalCase: string;
	private readonly variantStandaloneRegExp = /\s_variant\s*=\s*(\{["'`]standalone["'`]\}|["'`]standalone["'`])/;

	private constructor(
		identifier: string,
		private readonly tag: string,
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(identifier, `Map "_variant=standalone" to "_inline" for "${tag}"`, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);
		this.tagCapitalCase = kebabToCapitalCase(tag);
	}

	public static getInstance(tag: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions): MapVariantStandaloneToInlineTask {
		const identifier = `${tag}-map-variant-standalone-to-inline`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new MapVariantStandaloneToInlineTask(identifier, tag, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as MapVariantStandaloneToInlineTask;
	}

	public run(baseDir: string): void {
		this.transpileComponentFiles(baseDir);
		this.transpileCustomElementFiles(baseDir);
	}

	private transpileComponentFiles(baseDir: string): void {
		const tagRegExp = new RegExp(`<${this.tagCapitalCase}[^>]*_variant[^>]*>`, 'g');

		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(tagRegExp, (componentTag) => this.rewriteTag(componentTag, true));
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFiles(baseDir: string): void {
		const tagRegExp = new RegExp(`<${this.tag}[^>]*_variant[^>]*>`, 'g');

		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(tagRegExp, (componentTag) => this.rewriteTag(componentTag, false));
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private rewriteTag(componentTag: string, isComponent: boolean): string {
		if (!this.variantStandaloneRegExp.test(componentTag)) {
			return componentTag;
		}

		const inlineReplacement = isComponent ? ' _inline={false}' : ' _inline="false"';
		if (/\s_inline\s*=/.test(componentTag)) {
			return componentTag.replace(this.variantStandaloneRegExp, '');
		}

		return componentTag.replace(this.variantStandaloneRegExp, inlineReplacement);
	}
}

export const MapButtonLinkVariantStandaloneToInlineTask: AbstractTask = MapVariantStandaloneToInlineTask.getInstance('kol-button-link', '^4');
export const MapLinkVariantStandaloneToInlineTask: AbstractTask = MapVariantStandaloneToInlineTask.getInstance('kol-link', '^4');
export const MapVariantStandaloneToInlineTasks: AbstractTask[] = [MapButtonLinkVariantStandaloneToInlineTask, MapLinkVariantStandaloneToInlineTask];
