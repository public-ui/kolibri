import { registerTagNameTransformer } from '@public-ui/components';
import { setTagTransformer as clientSetTagTransformer, getTagTransformer, transformTag } from '../src/tag-transformer';

/**
 * Bridge over the generated tag transformer: the registration covers both runtime copies of the
 * components package — `registerTagNameTransformer` the root entry (the toast container is created
 * through its `transformTag`), the generated setter the custom elements build the proxies define
 * their elements through. One registration through the adapter or through
 * `bootstrap({ transformTagName })` covers both copies.
 */
export const setTagNameTransformer = (transformer: (tagName: string) => string): void => {
	clientSetTagTransformer(registerTagNameTransformer(transformer));
};

export { getTagTransformer, transformTag };
