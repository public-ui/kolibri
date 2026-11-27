import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { hintProp, labelProp } from '../props';
import { BaseWebComponent } from './base-web-component';
import type { ApiFromConfig, PropsConfigShape } from './generic-types';

const config = {
	required: [labelProp],
	optional: [hintProp],
} as const satisfies PropsConfigShape;

type SampleApi = ApiFromConfig<typeof config>;

class Sample extends BaseWebComponent<SampleApi> {
	protected readonly propsConfig: PropsConfigShape = config;

	public applyLabel(value?: string): void {
		this.applyProp(labelProp, value);
	}

	public applyHint(value: string | undefined, callback: (normalized: string) => void): void {
		this.applyProp(hintProp, value, callback);
	}
}

afterEach(() => {
	jest.restoreAllMocks();
});

describe('BaseWebComponent.applyProp', () => {
	it('stores the normalized value as the render prop named after the definition', () => {
		const sample = new Sample();
		sample.applyLabel('Report');

		expect(sample.getRenderProp('label')).toBe('Report');
	});

	it('passes the requiredness from the props config to apply', () => {
		const sample = new Sample();
		const apply = jest.spyOn(labelProp, 'apply');
		sample.applyLabel('Summary');

		expect(apply).toHaveBeenCalledWith('Summary', expect.any(Function), true);
	});

	it('hands the normalized value to a given callback instead of storing it', () => {
		const sample = new Sample();
		const callback = jest.fn();
		sample.applyHint('Draft', callback);

		expect(callback).toHaveBeenCalledWith('Draft');
		expect(sample.getRenderProp('hint')).not.toBe('Draft');
	});
});
