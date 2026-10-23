import { highProp } from '../../props/high';
import { labelProp } from '../../props/label';
import { lowProp } from '../../props/low';
import { maxProp } from '../../props/max';
import { minProp } from '../../props/min';
import { optimumProp } from '../../props/optimum';
import { orientationProp } from '../../props/orientation';
import { unitProp } from '../../props/unit';
import { clampedNumberValueProp } from '../../props/value-number-clamped';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `high`, `low` and `optimum` stay unset as long as the consumer does not set them: the web
 * component clears their render props, because a defined boundary switches the meter to its state
 * classification and the native `<meter>` to the matching region.
 */
export const meterPropsConfig = {
	optional: [highProp, lowProp, minProp, optimumProp, orientationProp, unitProp],
	required: [clampedNumberValueProp, labelProp, maxProp],
} as const satisfies PropsConfigShape;

export type MeterApi = ApiFromConfig<typeof meterPropsConfig>;
