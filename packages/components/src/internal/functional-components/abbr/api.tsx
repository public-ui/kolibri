import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const abbrPropsConfig = {} as const satisfies PropsConfigShape;

export type AbbrApi = ApiFromConfig<typeof abbrPropsConfig>;
