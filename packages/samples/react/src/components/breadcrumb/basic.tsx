import React from 'react';

import { KolBreadcrumb } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const BreadcrumbBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolBreadcrumb shows a breadcrumb navigation. The sample illustrates a variation of link, text and icon elements.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolBreadcrumb
				_label="Breadcrumb aus Text-Links"
				_links={[
					{ _label: 'homepage', _href: '#/back-page' },
					{ _label: 'Bottom of the homepage', _href: '#/back-page' },
					{
						_label: 'Underside of the underside',
						_href: '#/back-page',
					},
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_label="Breadcrumb from icons or text links"
				_links={[
					{
						_label: 'homepage',
						_icons: 'codicon codicon-home',
						_hideLabel: true,
						_href: '#/back-page',
					},
					{
						_label: 'Subpage of the start page with very long link test',
						_href: '#/back-page',
					},
					{
						_label: 'Underside of the underside',
						_href: '#/back-page',
					},
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_label="Breadcrumb from icons and text links"
				_links={[
					{ _label: 'homepage', _icons: 'codicon codicon-home', _href: '#/back-page' },
					{
						_label: 'Subpage of the main page and I_am_a_really_long_compound_word_trying_to_break_the_layout',
						_href: '#/back-page',
					},
					{
						_label: 'Underside of the underside',
						_href: '#/back-page',
					},
				]}
			></KolBreadcrumb>
		</div>
	</>
);
