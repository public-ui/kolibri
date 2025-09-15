import type * as SchemaModule from '../../../schema';

jest.mock('../../../schema', () => {
	const actual: typeof SchemaModule = jest.requireActual('../../../schema');
	return { ...actual, devHint: jest.fn() };
});

import * as Schema from '../../../schema';
import type { KoliBriTableHeaders } from '../../../schema';
import { setRuntimeMode } from '../../../schema/utils/dev.utils';
import { KolTableStateful } from '../shadow';

describe('KolTableStateful.validateHeaders', () => {
	it('warns when compareFn is set without key', () => {
		setRuntimeMode('development');
		const table = new KolTableStateful();
		const headers: KoliBriTableHeaders = {
			horizontal: [
				[
					{
						label: 'Foo',
						compareFn: () => 0,
					},
				],
			],
		};
		table.validateHeaders(headers);
		expect(Schema.devHint).toHaveBeenCalledWith("[KolTableStateful] A sortable column requires the 'key' property.");
	});
});
