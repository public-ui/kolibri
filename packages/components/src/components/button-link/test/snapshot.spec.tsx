import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getButtonLinkHtml } from './html.mock';
import { KolButtonLinkTag } from '../../../core/component-names';

executeTests<Props>(
	'ButtonLink',
	async (props): Promise<SpecPage> => {
		return await newSpecPage({
			components: COMPONENTS,
			template: () => <KolButtonLinkTag {...props}></KolButtonLinkTag>,
		});
	},
	{
		_label: [`Beschreibung`],
	},
	getButtonLinkHtml,
);
