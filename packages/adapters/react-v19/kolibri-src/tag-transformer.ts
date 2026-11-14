import { setTagTransformer as clientSetTagTransformer, transformTag, getTagTransformer } from '../src/tag-transformer';

/**
 * Bridge over the generated tag transformer: applications register the transformer through
 * `setTagNameTransformer`, and the registration limits the transformation to `kol-*` tags, because
 * the native Stencil transformer applies to every tag rendered through `h()`, including native
 * HTML tags.
 */
export const setTagNameTransformer = (transformer: (tagName: string) => string): void => {
	clientSetTagTransformer((tag: string) => (tag.startsWith('kol-') ? transformer(tag) : tag));
};

export { transformTag, getTagTransformer };
