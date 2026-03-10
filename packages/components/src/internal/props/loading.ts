import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const LOADING_OPTIONS = ['eager', 'lazy'] as const;
export type LoadingType = (typeof LOADING_OPTIONS)[number];
export type LoadingProp = SimpleProp<'loading', LoadingType>;

const LOADING_SET: ReadonlySet<string> = new Set(LOADING_OPTIONS);

export const loadingProp = createPropDefinition<LoadingProp>(
	(value: unknown) => normalizeString(value) as LoadingType,
	(v) => LOADING_SET.has(v),
	'lazy',
);
