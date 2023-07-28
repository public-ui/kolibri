import { mixMembers } from 'stencil-awesome-test';
import path from 'path';
import { readFileSync } from 'fs';
import { render } from 'mustache';

import { KoliBriIconProps } from '../types';

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	const state = mixMembers(
		{
			_icon: 'codicon codicon-home',
		},
		props
	);

	const template = readFileSync(path.join(__dirname, 'icon.mustache'), { encoding: 'utf-8' });

	return render(template, {
		additionalAttrs,
		...state,
		csrMode: true,
		ssrMode: false,
	});
};
