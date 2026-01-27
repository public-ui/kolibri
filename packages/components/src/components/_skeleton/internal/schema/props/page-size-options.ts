import type { Option } from '../../../../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

export type PageSizeOptionsPropType = Option<number>[];
export type PageSizeOptionsProp = Prop<PageSizeOptionsPropType, 'pageSizeOptions'>;

const normalizePageSizeOptions = (value?: unknown): unknown => value;
const validatePageSizeOptions = (value: unknown): value is PageSizeOptionsPropType => Array.isArray(value);

export const pageSizeOptionsProp = createPropDefinition<PageSizeOptionsProp>(normalizePageSizeOptions, validatePageSizeOptions);
