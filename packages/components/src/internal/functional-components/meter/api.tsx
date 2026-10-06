import { highProp, labelProp, lowProp, maxProp, minProp, numberValueProp, optimumProp, orientationProp, unitProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `high`, `low` and `optimum` stay unset as long as the consumer does not set them: the web
 * component clears their render props, because a defined boundary switches the meter to its state
 * classification and the native `<meter>` to the matching region.
 */
export const meterPropsConfig = {
	optional: [highProp, lowProp, minProp, optimumProp, orientationProp, unitProp],
	required: [labelProp, maxProp, numberValueProp],
} as const satisfies PropsConfigShape;

export type MeterApi = ApiFromConfig<typeof meterPropsConfig>;
