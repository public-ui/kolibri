import { describe, expect, it, jest } from '@jest/globals';
import { alignPropTypeOptions } from '../../schema/props/align';
import { alignProp } from './align';
import { popoverAlignProp } from './popover-align';
import { tooltipAlignProp } from './tooltip-align';

/**
 * Loads `schema/props/align` before the prop modules. The align prop definitions read the options
 * from a module without imports, so they work whatever the module order.
 */
describe.each([
	['alignProp', alignProp],
	['popoverAlignProp', popoverAlignProp],
	['tooltipAlignProp', tooltipAlignProp],
])('%s loaded after schema/props/align', (_name, definition) => {
	it.each(alignPropTypeOptions)('accepts the option %p', (option) => {
		const callback = jest.fn();
		definition.apply(option, callback);
		expect(callback).toHaveBeenCalledWith(option);
	});
});
