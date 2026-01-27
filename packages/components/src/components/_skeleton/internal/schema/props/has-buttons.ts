import type { PaginationHasButton } from '../../../../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

export type HasButtonsPropType = PaginationHasButton;
export type HasButtonsProp = Prop<HasButtonsPropType, 'hasButtons'>;

const normalizeHasButtons = (value?: unknown): unknown => value;
const validateHasButtons = (value: unknown): value is HasButtonsPropType => typeof value === 'object' && value !== null;

export const hasButtonsProp = createPropDefinition<HasButtonsProp>(normalizeHasButtons, validateHasButtons);
