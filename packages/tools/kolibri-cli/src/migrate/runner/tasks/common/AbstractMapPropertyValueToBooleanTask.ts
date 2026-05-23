import fs from 'fs';

import { COMPONENT_FILE_EXTENSIONS, CUSTOM_ELEMENT_FILE_EXTENSIONS, MARKUP_EXTENSIONS } from '../../../../types';
import {
	filterFilesByExt,
	isPropertyKebabCaseRegExp,
	isTagKebabCaseRegExp,
	kebabToCamelCase,
	kebabToCapitalCase,
	logAndCreateError,
	MODIFIED_FILES,
} from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export type BooleanMappingResult = 'false' | 'remove' | 'true';

export type BooleanPropertyValueMapping = {
	fromValue: string;
	result: BooleanMappingResult;
};

export type BareSourceResult = BooleanMappingResult;

export abstract class AbstractMapPropertyValueToBooleanTask extends AbstractTask {
	private readonly componentTagRegExp: RegExp;
	private readonly customElementTagRegExp: RegExp;
	private readonly sourcePropertyCamelCase: string;
	private readonly tagCapitalCase: string;
	private readonly targetPropertyCamelCase: string;

	protected constructor(
		identifier: string,
		title: string,
		private readonly tag: string,
		private readonly sourceProperty: string,
		private readonly targetProperty: string,
		private readonly mappings: BooleanPropertyValueMapping[],
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		private readonly preserveExistingTarget = false,
		private readonly bareSourceResult?: BareSourceResult,
		options: TaskOptions = {},
	) {
		super(identifier, title, MARKUP_EXTENSIONS, versionRange, dependentTasks, options);

		if (!isTagKebabCaseRegExp.test(tag)) {
			throw logAndCreateError(`Tag "${tag}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(sourceProperty)) {
			throw logAndCreateError(`Source property "${sourceProperty}" is not in kebab case.`);
		}
		if (!isPropertyKebabCaseRegExp.test(targetProperty)) {
			throw logAndCreateError(`Target property "${targetProperty}" is not in kebab case.`);
		}

		this.sourcePropertyCamelCase = kebabToCamelCase(sourceProperty);
		this.targetPropertyCamelCase = kebabToCamelCase(targetProperty);
		this.tagCapitalCase = kebabToCapitalCase(tag);
		this.componentTagRegExp = new RegExp(`<${this.tagCapitalCase}[^>]*${this.sourcePropertyCamelCase}[^>]*>`, 'g');
		this.customElementTagRegExp = new RegExp(`<${this.tag}[^>]*${this.sourceProperty}[^>]*>`, 'g');
	}

	public run(baseDir: string): void {
		this.transpileComponentFiles(baseDir);
		this.transpileCustomElementFiles(baseDir);
	}

	private transpileComponentFiles(baseDir: string): void {
		filterFilesByExt(baseDir, COMPONENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.componentTagRegExp, (componentTag) => this.rewriteTag(componentTag, true));
			if (newContent !== content) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private transpileCustomElementFiles(baseDir: string): void {
		filterFilesByExt(baseDir, CUSTOM_ELEMENT_FILE_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(this.customElementTagRegExp, (componentTag) => this.rewriteTag(componentTag, false));
			if (newContent !== content) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}

	private rewriteTag(componentTag: string, isComponent: boolean): string {
		const sourcePropertyName = isComponent ? this.sourcePropertyCamelCase : this.sourceProperty;
		const targetPropertyName = isComponent ? this.targetPropertyCamelCase : this.targetProperty;

		for (const mapping of this.mappings) {
			const sourceValueRegExp = this.getSourceValueRegExp(sourcePropertyName, mapping.fromValue, isComponent);
			if (!sourceValueRegExp.test(componentTag)) {
				continue;
			}

			if (this.preserveExistingTarget && this.hasTargetProperty(componentTag, targetPropertyName)) {
				return componentTag.replace(sourceValueRegExp, '');
			}

			if (mapping.result === 'remove') {
				return componentTag.replace(sourceValueRegExp, '');
			}

			const replacement = this.getBooleanReplacement(targetPropertyName, mapping.result, isComponent);
			return componentTag.replace(sourceValueRegExp, replacement);
		}

		if (this.bareSourceResult !== undefined) {
			const bareSourceRegExp = this.getBareSourceRegExp(sourcePropertyName);
			if (bareSourceRegExp.test(componentTag)) {
				if (this.preserveExistingTarget && this.hasTargetProperty(componentTag, targetPropertyName)) {
					return componentTag.replace(bareSourceRegExp, '');
				}

				if (this.bareSourceResult === 'remove') {
					return componentTag.replace(bareSourceRegExp, '');
				}

				const replacement = this.getBooleanReplacement(targetPropertyName, this.bareSourceResult, isComponent);
				return componentTag.replace(bareSourceRegExp, replacement);
			}
		}

		return componentTag;
	}

	private hasTargetProperty(componentTag: string, targetPropertyName: string): boolean {
		const targetRegExp = new RegExp(`\\s${targetPropertyName}(?:\\s*=\\s*(?:\\{[^\\}]+\\}|["'][^"']+["']))?(?=[\\s/>])`);
		return targetRegExp.test(componentTag);
	}

	private getSourceValueRegExp(sourcePropertyName: string, fromValue: string, isComponent: boolean): RegExp {
		const escapedValue = this.escapeRegExp(fromValue);
		if (isComponent) {
			const quotedValue = `\\{\\s*(?:"${escapedValue}"|'${escapedValue}')\\s*\\}|(?:"${escapedValue}"|'${escapedValue}')`;
			const booleanLiteral = fromValue === 'true' || fromValue === 'false' ? `|\\{\\s*${escapedValue}\\s*\\}` : '';
			return new RegExp(`\\s${sourcePropertyName}\\s*=\\s*(?:${quotedValue}${booleanLiteral})`);
		}
		return new RegExp(`\\s${sourcePropertyName}\\s*=\\s*["']${escapedValue}["']`);
	}

	private getBareSourceRegExp(sourcePropertyName: string): RegExp {
		return new RegExp(`\\s${sourcePropertyName}(?!\\s*=)(?=[\\s/>])`);
	}

	private getBooleanReplacement(targetPropertyName: string, result: Exclude<BooleanMappingResult, 'remove'>, isComponent: boolean): string {
		if (isComponent) {
			return ` ${targetPropertyName}={${result}}`;
		}
		return ` ${targetPropertyName}="${result}"`;
	}

	private escapeRegExp(input: string): string {
		return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
}
