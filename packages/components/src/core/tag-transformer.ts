import { setTagTransformer } from '@stencil/core';
import { Log } from '../schema';
import * as KolTags from './component-names';
import { getSharedState } from './shared-state';

type TagNameTransformer = (tagName: string) => string;

/*
 * The runtime is bundled per output target, so the native `setTagTransformer` of one copy does not
 * reach the others. The shared state carries the registered transformer across the copies; adapters
 * of a copy without a registration read it from there.
 */
const shared = getSharedState('tag-transformer', (): { transformer?: TagNameTransformer } => ({}));

const isDefined = (tagName: string): boolean => typeof customElements !== 'undefined' && customElements.get(tagName) !== undefined;

/**
 * Registers the tag name transformer with the native Stencil runtime and returns the wrapper that
 * limits the transformation to `kol-*` tags: the native transformer applies to every tag rendered
 * through `h()`, including native HTML tags like `div` or `span`, while the public transformation
 * only names KoliBri component tags.
 */
export const registerTagNameTransformer = (transformer: TagNameTransformer): TagNameTransformer => {
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
	setTagTransformer(guarded);
	shared.transformer = guarded;
	return guarded;
};

export const getRegisteredTagNameTransformer = (): TagNameTransformer | undefined => shared.transformer;
