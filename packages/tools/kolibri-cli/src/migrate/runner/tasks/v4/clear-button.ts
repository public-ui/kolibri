import { AbstractTask } from '../../abstract-task';
import { AbstractMapPropertyValueToBooleanTask, BooleanPropertyValueMapping } from '../common/AbstractMapPropertyValueToBooleanTask';

export class RenameClearButtonPropTask extends AbstractMapPropertyValueToBooleanTask {
	public static readonly supportedTags = ['kol-combobox', 'kol-single-select'] as const;
	private static readonly mappings: BooleanPropertyValueMapping[] = [
		{ fromValue: 'false', result: 'true' },
		{ fromValue: 'true', result: 'false' },
	];

	private constructor(identifier: string, tag: (typeof RenameClearButtonPropTask.supportedTags)[number], versionRange: string) {
		super(
			identifier,
			`Rename _hide-clear-button to _has-clear-button for "${tag}"`,
			tag,
			'_hide-clear-button',
			'_has-clear-button',
			RenameClearButtonPropTask.mappings,
			versionRange,
			[],
			false,
			'false',
		);
	}

	public static getInstance(versionRange: string, tag: (typeof RenameClearButtonPropTask.supportedTags)[number] = 'kol-combobox'): RenameClearButtonPropTask {
		const identifier = `rename-clear-button-prop-${tag}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new RenameClearButtonPropTask(identifier, tag, versionRange));
		}
		return this.instances.get(identifier) as RenameClearButtonPropTask;
	}
}

export const RenameClearButtonPropTasks: AbstractTask[] = RenameClearButtonPropTask.supportedTags.map((tag) =>
	RenameClearButtonPropTask.getInstance('^4', tag),
);
