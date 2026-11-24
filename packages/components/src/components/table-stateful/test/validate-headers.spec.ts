import type * as SchemaModule from '../../../../internals/src/schema/index';

jest.mock('../../../../internals/src/schema', () => {
	const actual: typeof SchemaModule = jest.requireActual('../../../../internals/src/schema');
	return { ...actual, devHint: jest.fn() };
});

import type { KoliBriTableHeaders } from '../../../../internals/src/schema/index';
import * as Schema from '../../../../internals/src/schema/index';
import { setRuntimeMode } from '../../../../internals/src/schema/utils/dev.utils';
import { KolTableStateful } from '../component';

describe('KolTableStateful.watchHeaders', () => {
	it('warns when compareFn is set without key', () => {
		setRuntimeMode('development');
		const table = new KolTableStateful();
		const headers: KoliBriTableHeaders = {
			horizontal: [
				[
					{
						label: 'Foo',
						compareFn: () => 0,
						width: 100,
					},
				],
			],
		};
		table.watchHeaders(headers);
		expect(Schema.devHint).toHaveBeenCalledWith("[KolTableStateful] A sortable column requires the 'key' property.");
	});
});
