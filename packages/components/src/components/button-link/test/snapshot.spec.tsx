import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getButtonLinkHtml } from './html.mock';

import type { ButtonLinkProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolButtonLink } from '../component';

executeTests<ButtonLinkProps>(
	'ButtonLink',
	async (props): Promise<SpecPage> => {
		return await newSpecPage({
			components: [KolButtonLink],
			template: () => <kol-button-link {...props}></kol-button-link>,
		});
	},
	{
		_label: [`Beschreibung`],
	},
	getButtonLinkHtml,
);
