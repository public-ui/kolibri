import { KolQuoteTag } from '../../../core/component-names';
import type { QuoteProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolQuote } from '../shadow';

const baseObj = { _label: 'Caption', _href: 'https://example.com', _quote: 'Text of the Quote' };

executeSnapshotTests<QuoteProps>(KolQuoteTag, [KolQuote], [{ ...baseObj }, { ...baseObj, _variant: 'block' }, { ...baseObj, _variant: 'inline' }]);
