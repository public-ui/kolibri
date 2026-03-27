import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

export const headingLevelOptions = [0, 1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = (typeof headingLevelOptions)[number];

export type LevelProp = SimpleProp<'level', HeadingLevel>;
export const levelProp = createPropDefinition<LevelProp>(
	'level',
	0,
	(value) => normalizeInteger(value) as HeadingLevel,
	(v) => headingLevelOptions.includes(v),
);
