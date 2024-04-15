import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getImageHtml } from './html.mock';

import type { ImageProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolImage } from '../shadow';

executeTests<ImageProps>(
	'Image',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolImage],
			template: () => <kol-image {...props}></kol-image>,
		});
		return page;
	},
	{
		_alt: ['somedescription'],
		_src: ['something'],
	},
	getImageHtml,
);

executeTests<ImageProps>(
	'Image',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolImage],
			template: () => <kol-image {...props}></kol-image>,
		});
		return page;
	},
	{
		_alt: ['somedescription'],
		_loading: ['eager'],
		_sizes: ['(max-width: 710px) 120px, (max-width: 991px) 193px, 278px'],
		_src: ['https://some-url.tld/images/awesome.jpg'],
		_srcset: ['https://some-url.tld/images/awesome.avif, https://some-url.tld/images/awesome.webp'],
	},
	getImageHtml,
);
