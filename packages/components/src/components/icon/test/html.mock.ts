import { mixMembers } from 'stencil-awesome-test';

import { KoliBriIconProps, KoliBriIconStates } from '../types';

import path from 'path';
import pug from 'pug';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compiledFunction = pug.compileFile(path.join(__dirname, 'icon.pug'));

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	const state = mixMembers<KoliBriIconProps, KoliBriIconStates>(
		{
			_icon: 'codicon codicon-home',
		},
		props
	);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return compiledFunction({
		additionalAttrs,
		mode: 'csr',
		...state,
	});
};
