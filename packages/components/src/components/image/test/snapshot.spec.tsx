import { KolImageTag } from '@component-names';
import type { ImageProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolImage } from '../shadow';

executeSnapshotTests<ImageProps>(
	KolImageTag,
	[KolImage],
	[
		{ _alt: 'somedescription', _src: 'something' },
		{ _alt: 'somedescription', _loading: 'lazy', _src: 'https://some-url.tld/images/awesome.jpg' },
		{ _alt: 'somedescription', _loading: 'eager', _src: 'https://some-url.tld/images/awesome.jpg' },
		{
			_alt: 'somedescription',
			_loading: 'eager',
			_src: 'https://some-url.tld/images/awesome.jpg',
			_sizes: '(max-width: 710px) 120px, (max-width: 991px) 193px, 278px',
			_srcset: 'https://some-url.tld/images/awesome.avif',
		},
	],
);
