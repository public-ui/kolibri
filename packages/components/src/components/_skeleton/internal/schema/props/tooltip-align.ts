import { alignPropTypeOptions, type TooltipAlignPropType } from '../../../../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

export type TooltipAlignProp = Prop<TooltipAlignPropType, 'tooltipAlign'>;

const normalizeTooltipAlign = (value?: unknown): unknown => value;
const validateTooltipAlign = (value: unknown): value is TooltipAlignPropType => typeof value === 'string' && alignPropTypeOptions.includes(value);

export const tooltipAlignProp = createPropDefinition<TooltipAlignProp>(normalizeTooltipAlign, validateTooltipAlign);
