import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { GetStateFn } from '../generic-types';
import type { ProgressApi } from './api';
import { ProgressController } from './controller';

describe('ProgressController', () => {
	let ctrl: ProgressController;

	beforeEach(() => {
		jest.useFakeTimers();
		ctrl = new ProgressController({ setState: jest.fn(), getState: jest.fn() as GetStateFn<ProgressApi> });
	});

	afterEach(() => {
		ctrl.destroy();
		jest.useRealTimers();
	});

	describe('value clamping', () => {
		it('clamps initial value=100 to max=50', () => {
			ctrl.componentWillLoad({ label: '', max: 50, unit: '%', value: 100, variant: 'bar' });
			expect(ctrl.getRenderProp('value')).toBe(50);
		});

		it('re-clamps to new max without re-setting value', () => {
			ctrl.componentWillLoad({ label: '', max: 50, unit: '%', value: 100, variant: 'bar' });
			ctrl.watchMax(80);
			expect(ctrl.getRenderProp('value')).toBe(80);
		});
	});
});
