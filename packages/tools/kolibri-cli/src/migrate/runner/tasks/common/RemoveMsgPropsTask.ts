import fs from 'fs';
import { parseExpression } from '@babel/parser';
import generate from '@babel/generator';
import type { ObjectExpression } from '@babel/types';

import { MARKUP_EXTENSIONS } from '../../../../types';
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

export class RemoveMsgPropsTask extends AbstractTask {
	private constructor(identifier: string, versionRange: string) {
		super(identifier, 'Remove _label and _variant from _msg', MARKUP_EXTENSIONS, versionRange);
	}

	public static getInstance(versionRange: string): RemoveMsgPropsTask {
		const identifier = 'remove-msg-props';
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RemoveMsgPropsTask(identifier, versionRange));
		}
		return this.instances.get(identifier) as RemoveMsgPropsTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, MARKUP_EXTENSIONS).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			let newContent = content;

			newContent = newContent.replace(/_msg=\{\{([\s\S]*?)\}\}/g, (_match: string, body: string) => {
				try {
					const ast = parseExpression(body, { plugins: ['typescript'] });
					if (ast.type === 'ObjectExpression') {
						const obj = ast as ObjectExpression;
						obj.properties = obj.properties.filter((prop) => {
							if (prop.type === 'ObjectProperty') {
								const { key } = prop;
								if (key.type === 'Identifier') {
									return key.name !== '_label' && key.name !== '_variant';
								}
								if (key.type === 'StringLiteral') {
									return key.value !== '_label' && key.value !== '_variant';
								}
							}
							return true;
						});
						return `_msg={{${generate(obj).code}}}`;
					}
				} catch {
					/* ignore parsing errors */
				}
				return `_msg={{${body}}}`;
			});

			newContent = newContent.replace(/_msg=('([^']*)'|"([^"]*)")/g, (match: string, _p0: string, single: string, dbl: string) => {
				const quote = single !== undefined ? "'" : '"';
				const json = single ?? dbl;
				try {
					const obj = JSON.parse(json) as Record<string, unknown>;
					delete (obj as { _label?: unknown })._label;
					delete (obj as { _variant?: unknown })._variant;
					return `_msg=${quote}${JSON.stringify(obj)}${quote}`;
				} catch {
					return match;
				}
			});

			if (content !== newContent) {
				fs.writeFileSync(file, newContent);
				MODIFIED_FILES.add(file);
			}
		});
	}
}
