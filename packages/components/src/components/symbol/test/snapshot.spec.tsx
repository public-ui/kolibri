import { KolSymbolTag } from '../../../core/component-names';
import type { SymbolProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolSymbol } from '../component';

executeSnapshotTests<SymbolProps>(
	KolSymbolTag,
	[KolSymbol],
	[
		{ _label: 'Slash', _symbol: '/' },
		{ _label: 'Backslash', _symbol: '\\' },
	],
);
