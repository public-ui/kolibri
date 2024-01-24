import { readFileSync } from 'fs';
import { render } from 'mustache';
import path from 'path';
import pug from 'pug';
import { mixMembers } from 'stencil-awesome-test';
import { twig } from 'twig';

import { Props, States } from '../types';

const getState = (props: Props): States =>
	mixMembers<Props, States>(
		{
			_icons: 'codicon codicon-home', // ⚠ required
			// _label: '…', // ⚠ required TODO: required in v2
		},
		props
	);

const getIconHtmlTwig = (props: Props, additionalAttrs = ''): string => {
	const state = getState(props);
	const context = { additionalAttrs, ...state, mode: 'csr' };

	return twig({ path: path.join(__dirname, 'icon.twig'), async: false }).render(context);
};

/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment */
// @ts-ignore
const getIconHtmlMustache = (props: Props, additionalAttrs = ''): string => {
	const state = getState(props);
	const template = readFileSync(path.join(__dirname, 'icon.mustache'), { encoding: 'utf-8' });

	return render(template, {
		additionalAttrs,
		...state,
		csrMode: true,
		ssrMode: false,
	});
};

// @ts-ignore
const getIconHtmlPug = (props: Props, additionalAttrs = ''): string => {
	const compiledFunction = pug.compileFile(path.join(__dirname, 'icon.pug'));
	const state = getState(props);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return compiledFunction({
		additionalAttrs,
		mode: 'csr',
		...state,
	});
};

/* eslint-enable @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment */

export const getIconHtml = (props: Props, additionalAttrs = ''): string => {
	return getIconHtmlTwig(props, additionalAttrs);
	// return getIconHtmlMustache(props, additionalAttrs);
	// return getIconHtmlPug(props, additionalAttrs);
};
