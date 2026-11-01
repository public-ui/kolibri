import { describe, expect, it } from '@jest/globals';

import { labelProp, secondaryHeadlineProp } from '../props';
import type { ApiFromConfig, FunctionalComponentProps, PropsConfigShape, WebComponentInterface } from './generic-types';

/** Type-level assertion helpers: a mismatch fails `pnpm lint:tsc`. */
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

const headingPropsConfig = {
	optional: [secondaryHeadlineProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

type HeadingApi = ApiFromConfig<typeof headingPropsConfig>;

type WebComponentProps = WebComponentInterface<HeadingApi>;

type HasDocumentedCamelCaseName = Expect<Equal<true, '_secondaryHeadline' extends keyof WebComponentProps ? true : false>>;
type HasDocumentedRequiredName = Expect<Equal<true, '_label' extends keyof WebComponentProps ? true : false>>;
type DoesNotLowercase = Expect<Equal<true, '_secondaryheadline' extends keyof WebComponentProps ? false : true>>;

const assertions: readonly [HasDocumentedCamelCaseName, HasDocumentedRequiredName, DoesNotLowercase] = [true, true, true];

describe('generic-types prop mapping', () => {
	it('maps prop keys to the documented web component prop names', () => {
		expect(headingPropsConfig.optional).toContain(secondaryHeadlineProp);

		const renderProps = {
			label: 'Headline',
			secondaryHeadline: 'Subheadline',
		} as FunctionalComponentProps<HeadingApi>;

		expect(assertions).toEqual([true, true, true]);
		expect(renderProps.secondaryHeadline).toBe('Subheadline');
	});
});
