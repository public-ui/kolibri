import { AbstractTask, TaskOptions } from '../../abstract-task';
import { AbstractMapPropertyValueToBooleanTask, BooleanPropertyValueMapping } from '../common/AbstractMapPropertyValueToBooleanTask';

class MapVariantStandaloneToInlineTask extends AbstractMapPropertyValueToBooleanTask {
	private static readonly mappings: BooleanPropertyValueMapping[] = [{ fromValue: 'standalone', result: 'false' }];

	private constructor(identifier: string, tag: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions) {
		super(
			identifier,
			`Map "_variant=standalone" to "_inline" for "${tag}"`,
			tag,
			'_variant',
			'_inline',
			MapVariantStandaloneToInlineTask.mappings,
			versionRange,
			dependentTasks,
			true,
			undefined,
			options,
		);
	}

	public static getInstance(tag: string, versionRange: string, dependentTasks?: AbstractTask[], options?: TaskOptions): MapVariantStandaloneToInlineTask {
		const identifier = `${tag}-map-variant-standalone-to-inline`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new MapVariantStandaloneToInlineTask(identifier, tag, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as MapVariantStandaloneToInlineTask;
	}
}

export const MapButtonLinkVariantStandaloneToInlineTask: AbstractTask = MapVariantStandaloneToInlineTask.getInstance('kol-button-link', '^4');
export const MapLinkVariantStandaloneToInlineTask: AbstractTask = MapVariantStandaloneToInlineTask.getInstance('kol-link', '^4');
export const MapVariantStandaloneToInlineTasks: AbstractTask[] = [MapButtonLinkVariantStandaloneToInlineTask, MapLinkVariantStandaloneToInlineTask];
