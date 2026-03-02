import { KolQuoteTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolQuote } from './component';

type QuoteSnapshotProps = {
	_href: string;
	_label?: string;
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
	],
);
