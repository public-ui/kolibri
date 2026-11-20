import { Log } from '../schema/index';
import * as KolTags from './component-names';
import { getSharedState } from './shared-state';

type TagNameTransformer = (tagName: string) => string;

/*
 * The runtime is bundled per output target, so a registration in one copy does not reach the
 * others. The shared state carries the registered transformer across the copies; adapters of a
 * copy without a registration read it from there.
 */
const shared = getSharedState('tag-transformer', (): { transformer?: TagNameTransformer } => ({}));

const isDefined = (tagName: string): boolean => typeof customElements !== 'undefined' && customElements.get(tagName) !== undefined;

/**
 * Wraps a transformer so it only names KoliBri component tags, registers it in the shared state
 * and returns the wrapper. The native Stencil runtime registration is a runtime concern and stays
 * with the Stencil entry, which calls this on its way to `setTagTransformer`.
 */
export const guardTagNameTransformer = (transformer: TagNameTransformer): TagNameTransformer => {
	/*
	 * The transformer has to be registered before the first component is defined, otherwise
	 * elements resolve under their untransformed tag. Overwriting a transformer after that point
	 * leaves already defined elements unusable.
	 */
	if (shared.transformer) {
		Log.warn('The tag name transformer was already registered. Components already defined keep their current tag and will not resolve under the new one.', {
			forceLog: true,
		});
	}
	const kolTags = Object.values(KolTags);
	if (kolTags.some((tag) => isDefined(tag) || isDefined(transformer(tag)))) {
		Log.warn(
			'Components are already defined while the tag name transformer is registered. They keep their current tag and will not resolve under the transformed one.',
			{
				forceLog: true,
			},
		);
	}
	const guarded = (tag: string): string => (tag.startsWith('kol-') ? transformer(tag) : tag);
	shared.transformer = guarded;
	return guarded;
};

export const getRegisteredTagNameTransformer = (): TagNameTransformer | undefined => shared.transformer;

/** Transforms a tag name with the registered transformer; an unregistered runtime passes it through. */
export const transformTag = (tagName: string): string => {
	const transformer = getRegisteredTagNameTransformer();
	return typeof transformer === 'function' ? transformer(tagName) : tagName;
};
