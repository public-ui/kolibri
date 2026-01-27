import type { KoliBriPaginationButtonCallbacks } from '../../../../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

export type PaginationOnPropType = KoliBriPaginationButtonCallbacks;
export type PaginationOnProp = Prop<PaginationOnPropType, 'on'>;

const normalizePaginationOn = (value?: unknown): unknown => value;
const validatePaginationOn = (value: unknown): value is PaginationOnPropType => typeof value === 'object' && value !== null;

export const paginationOnProp = createPropDefinition<PaginationOnProp>(normalizePaginationOn, validatePaginationOn);
