import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getAvatarHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { AvatarProps } from '@public-ui/schema';

executeTests<AvatarProps>(
	'Avatar',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-avatar {...props} />,
		});
		return page;
	},
	{
		_label: ['Erika Maria Mustermann', `Erika`],
		_src: [`/example-image.jpg`],
	},
	getAvatarHtml
);
