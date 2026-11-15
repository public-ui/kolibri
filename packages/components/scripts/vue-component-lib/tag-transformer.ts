import { setTagTransformer, transformTag } from '@public-ui/components';

/**
 * Registers the tag name transformer with the Stencil runtime, the same registration as
 * `bootstrap({ transformTagName })`. The native transformer applies to every tag rendered through
 * `h()`, so the registration limits it to `kol-*` tags.
 */
export const setTagNameTransformer = (transformer: (tagName: string) => string): void => {
	setTagTransformer((tag: string) => (tag.startsWith('kol-') ? transformer(tag) : tag));
};

export { transformTag };
