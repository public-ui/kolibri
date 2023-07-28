import { twig } from 'twig';
import { mixMembers } from 'stencil-awesome-test';

import { KoliBriIconProps } from '../types';
import path from 'path';

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	const state = mixMembers(
		{
			_icon: 'codicon codicon-home',
		},
		props
	);

	const context = { additionalAttrs, ...state, mode: 'csr' };

	return twig({ path: path.join(__dirname, 'icon.twig'), async: false }).render(context);
};
