import { KolQuoteTag } from '../../../internals/src/core/component-names';
import type { LabelLangSegmentsPropType } from '../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../utils/testing';
import { KolQuote } from './component';

type QuoteSnapshotProps = {
	_href: string;
	_label?: LabelLangSegmentsPropType;
	_quote: string;
	_variant?: string;
};

executeSnapshotTests<QuoteSnapshotProps>(
	KolQuoteTag,
	[KolQuote],
	[
		{ _href: 'https://example.com', _label: 'Caption', _quote: 'Text of the Quote' },
		{ _href: 'https://example.com', _label: 'Caption', _quote: 'Text of the Quote', _variant: 'block' },
		{ _href: 'https://example.com', _label: 'Caption', _quote: 'Text of the Quote', _variant: 'inline' },
		{ _href: 'https://example.com', _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }], _quote: 'Text of the Quote' },
	],
);
