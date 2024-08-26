import type { FC } from 'react';
import React from 'react';

import { KolSkipNav } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

export const SkipNavBasic: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>KolSkipNav renders a list of navigation links that are visually hidden by default and only visible on focus.</p>
			<p>For testing purposes, click into the example and press the tab-key in order to focus the first link.</p>
		</SampleDescription>

		<KolSkipNav
			_label="Hidden navigation"
			_links={[
				{
					_label: 'To the top',
					_href: '#/back-page',
				},
				{
					_label: 'To the form',
					_href: '#/back-page',
				},
				{
					_label: 'To the end',
					_href: '#/back-page',
				},
			]}
		></KolSkipNav>
	</div>
);
