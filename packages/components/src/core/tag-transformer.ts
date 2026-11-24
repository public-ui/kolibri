import { setTagTransformer } from '@stencil/core';
import { guardTagNameTransformer, type TagNameTransformer } from '../../internals/src/core/tag-transformer';

/*
 * Registers the kol-guarded transformer with the native Stencil runtime; the shared-state registry
 * and the guard live in the internals, where the framework-free form controller and the Lit stub
 * read the same registration.
 */
export const registerTagNameTransformer = (transformer: TagNameTransformer): TagNameTransformer => {
	const guarded = guardTagNameTransformer(transformer);
	setTagTransformer(guarded);
	return guarded;
};

export { getRegisteredTagNameTransformer } from '../../internals/src/core/tag-transformer';
