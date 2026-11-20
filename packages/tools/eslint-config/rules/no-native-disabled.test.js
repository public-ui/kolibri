import tsParser from '@typescript-eslint/parser';
import { RuleTester } from 'eslint';
import { describe, it } from 'mocha';
import rule from './no-native-disabled.js';

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
	languageOptions: {
		parser: tsParser,
		parserOptions: { ecmaFeatures: { jsx: true } },
	},
});

ruleTester.run('no-native-disabled', rule, {
	valid: [
		{ code: `<button aria-disabled={disabled ? 'true' : undefined} />` },
		{ code: `<button aria-disabled={undefined} />` },
		{ code: `<input aria-disabled="true" readOnly />` },
		{ code: `<input type="hidden" />` },
		{ code: `<button aria-hidden="true" tabIndex={-1} />` },
		{ code: `<option disabled={true} />` },
		{ code: `<optgroup disabled />` },
		{ code: `<KolButtonWcTag _disabled={true} />` },
		{ code: `<Fc disabled={true} />` },
		{ code: `<kol-button _disabled />` },
		{ code: `<div class="x" />` },
		{ code: `const props = { 'aria-disabled': 'true', readOnly: true }; <input {...props} />` },
		{ code: `const base = { 'aria-disabled': 'true' }; const props = { ...base, id: 'a' }; <select {...props} />` },
		{ code: `<textarea {...{ 'aria-disabled': undefined }} />` },
	],
	invalid: [
		{
			code: `<button aria-disabled="true" disabled={disabled} />`,
			errors: [{ messageId: 'nativeDisabled' }],
		},
		{
			code: `<fieldset disabled />`,
			errors: [{ messageId: 'nativeDisabled' }],
		},
		{
			code: `const props = { disabled, 'aria-disabled': 'true' }; <input {...props} />`,
			errors: [{ messageId: 'nativeDisabledSpread' }],
		},
		{
			code: `const props = { disabled: true } as Props; <textarea aria-disabled="true" {...props} />`,
			errors: [{ messageId: 'nativeDisabledSpread' }],
		},
		{
			code: `const base = { disabled }; const props = { ...base }; <select aria-disabled="true" {...props} />`,
			errors: [{ messageId: 'nativeDisabledSpread' }],
		},
		{
			code: `<button type="button" />`,
			errors: [{ messageId: 'ariaDisabledRequired' }],
		},
		{
			code: `<a href="#" />`,
			errors: [{ messageId: 'ariaDisabledRequired' }],
		},
		{
			code: `<summary tabIndex={-1} />`,
			errors: [{ messageId: 'ariaDisabledRequired' }],
		},
		{
			code: `<input disabled={disabled} />`,
			errors: [{ messageId: 'ariaDisabledRequired' }, { messageId: 'nativeDisabled' }],
		},
	],
});
