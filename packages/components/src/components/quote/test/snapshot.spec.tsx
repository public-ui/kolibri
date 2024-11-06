import { KolQuoteTag } from '@component-names';
import type { QuoteProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolQuote } from '../shadow';

const baseObj = { _label: 'Caption', _href: 'https://www.example.com', _quote: 'Text of the Quote' };

executeSnapshotTests<QuoteProps>(KolQuoteTag, [KolQuote], [{ ...baseObj }, { ...baseObj, _variant: 'block' }, { ...baseObj, _variant: 'inline' }]);
