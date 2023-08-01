import path from 'path';
import { KoliBriIconProps } from '../types';
import { mixMembers } from 'stencil-awesome-test';
import { readFileSync } from 'fs';
import { render } from 'mustache';
import { twig } from 'twig';

export const getIconHtmlTwig = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	const state = mixMembers(
		{
			_icon: 'codicon codicon-home',
		},
		props
	);

	const context = { additionalAttrs, ...state, mode: 'csr' };

	return twig({ path: path.join(__dirname, 'icon.twig'), async: false }).render(context);
};

export const getIconHtmlMustache = (props: KoliBriIconProps, additionalAttrs = ''): string => {
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

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	return getIconHtmlTwig(props, additionalAttrs);
	// return getIconHtmlMustache(props, additionalAttrs);
};
