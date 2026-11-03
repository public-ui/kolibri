import { describe, expect, it } from '@jest/globals';

import type { HeadingLevel } from '../props';
import { hrefProp, labelLangSegmentsProp, levelProp } from '../props';
import type { ApiFromConfig, FunctionalComponentProps, PropsConfigShape } from './generic-types';
import { resolveFcProps } from './props-from-config';

/** Type-level assertion helper: a mismatch fails `pnpm lint:tsc`. */
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

/** All slots optional: requiredness is a property of the slot, and the resolver only ever defaults optional props. */
const testPropsConfig = {
	optional: [hrefProp, labelLangSegmentsProp, levelProp],
} as const satisfies PropsConfigShape;

type TestApi = ApiFromConfig<typeof testPropsConfig, { States: { headingId: string } }>;

describe('resolveFcProps', () => {
	it('applies the configured default to omitted optional props and leaves default-less props unset', () => {
		const props: FunctionalComponentProps<TestApi> = { headingId: 'heading-1' };
		const resolved = resolveFcProps(testPropsConfig, props);

		expect(resolved.href).toBe('');
		expect(resolved.level).toBe(0);
		expect(resolved.label).toBeUndefined(); // labelLangSegmentsProp has no default: "not set" is legitimate
		expect(resolved.headingId).toBe('heading-1');
	});

	it('lets present values win', () => {
		const props: FunctionalComponentProps<TestApi> = { headingId: 'heading-1', href: '/page', label: 'Label', level: 3 };
		const resolved = resolveFcProps(testPropsConfig, props);

		expect(resolved.href).toBe('/page');
		expect(resolved.level).toBe(3);
		expect(resolved.label).toBe('Label');
	});

	it('lets a present undefined win over the default, as unsetRenderProp requires', () => {
		const props: FunctionalComponentProps<TestApi> = { headingId: 'heading-1', href: undefined, label: 'Label', level: undefined };
		const resolved = resolveFcProps(testPropsConfig, props);

		expect(resolved.href).toBeUndefined();
		expect(resolved.level).toBeUndefined();
	});

	it('passes HTML attributes through unchanged', () => {
		const props: FunctionalComponentProps<TestApi> = { class: 'my-hook', headingId: 'heading-1', label: 'Label' };
		const resolved = resolveFcProps(testPropsConfig, props);

		expect(resolved.class).toBe('my-hook');
	});

	it('resolves the optional props to their strict types', () => {
		const props: FunctionalComponentProps<TestApi> = { headingId: 'heading-1', label: 'Label' };
		const resolved = resolveFcProps(testPropsConfig, props);

		// Type-level assertion: a mismatch fails `pnpm lint:tsc`.
		type ResolvedHrefIsStrict = Equal<string, typeof resolved.href>;
		type ResolvedLevelIsStrict = Equal<HeadingLevel, typeof resolved.level>;
		const assertions: readonly [ResolvedHrefIsStrict, ResolvedLevelIsStrict] = [true, true];
		expect(assertions).toEqual([true, true]);

		// Marking the value as intentionally read keeps it out of `no-unused-vars`: only its types are consumed.
		void resolved;
	});
});
