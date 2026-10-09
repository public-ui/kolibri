import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type * as SchemaModule from '../../../schema';

jest.mock('../../../schema', () => {
	const actual: typeof SchemaModule = jest.requireActual('../../../schema');
	return { ...actual, devHint: jest.fn() };
});

import * as Schema from '../../../schema';
import { KolInputPassword } from '../component';

describe('KolInputPassword _autoComplete devHint', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('triggers devHint on initial load when _autoComplete is "on"', async () => {
		await newSpecPage({
			components: [KolInputPassword],
			template: () => <kol-input-password _label="Password" _name="password" _autoComplete="on" />,
		});

		expect(Schema.devHint).toHaveBeenCalledWith(`[KolInputPassword] The 'autocomplete' option should not be set to "on" for a password input field`);
	});

	it('triggers devHint on runtime change to "on"', async () => {
		const page = await newSpecPage({
			components: [KolInputPassword],
			template: () => <kol-input-password _label="Password" _name="password" _autoComplete="current-password" />,
		});

		expect(Schema.devHint).not.toHaveBeenCalled();

		const component = page.rootInstance as KolInputPassword;
		component.watchAutoComplete('on');

		expect(Schema.devHint).toHaveBeenCalledWith(`[KolInputPassword] The 'autocomplete' option should not be set to "on" for a password input field`);
	});

	it('does not trigger devHint when _autoComplete is "current-password"', async () => {
		await newSpecPage({
			components: [KolInputPassword],
			template: () => <kol-input-password _label="Password" _name="password" _autoComplete="current-password" />,
		});

		expect(Schema.devHint).not.toHaveBeenCalled();
	});
});
