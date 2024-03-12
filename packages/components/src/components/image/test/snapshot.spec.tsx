import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getImageHtml } from './html.mock';

executeTests<Props>(
	'Image',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
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

executeTests<Props>(
	'Image',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
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
