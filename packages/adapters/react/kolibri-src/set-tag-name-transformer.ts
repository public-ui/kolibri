import { setTagTransformer } from '../src/tag-transformer';

/**
 * Bridge for the established `setTagNameTransformer` export: applications register the transformer
 * through it, and the registration limits the transformation to `kol-*` tags, because the native
 * Stencil transformer applies to every tag rendered through `h()`, including native HTML tags.
 */
export const setTagNameTransformer = (transformer: (tagName: string) => string): void => {
	setTagTransformer((tag: string) => (tag.startsWith('kol-') ? transformer(tag) : tag));
};
