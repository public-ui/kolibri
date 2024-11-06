import { KolSpanWcTag } from '@component-names';
import type { SpanProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolSpanWc } from '../component';

executeSnapshotTests<SpanProps>(
	KolSpanWcTag,
	[KolSpanWc],
	[{ _label: 'Text' }, { _label: 'Text', _accessKey: 'v' }, { _label: 'Text', _hideLabel: true }, { _label: 'Text', _icons: 'codicon codicon-home' }],
);
