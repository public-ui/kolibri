import React from 'react';
import { KolBreadcrumb } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const BreadcrumbBasic: FC = () => (
	<>
		<SampleDescription></SampleDescription>
		<div className="grid gap-4">
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Text-Links"
				_links={[
					{ _label: 'Startseite', _href: '#/back-page' },
					{ _label: 'Unterseite der Startseite', _href: '#/back-page' },
					{
						_label: 'Unterseite der Unterseite',
						_href: '#/back-page',
					},
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Icons- oder Text-Links"
				_links={[
					{
						_label: 'Startseite',
						_icons: 'codicon codicon-home',
						_hideLabel: true,
						_href: '#/back-page',
					},
					{
						_label: 'Unterseite der Startseite mit sehr langem Link-Test',
						_href: '#/back-page',
					},
					{
						_label: 'Unterseite der Unterseite',
						_href: '#/back-page',
					},
				]}
			></KolBreadcrumb>
			<KolBreadcrumb
				_ariaLabel="Breadcrumb aus Icons- und Text-Links"
				_links={[
					{ _label: 'Startseite', _icons: 'codicon codicon-home', _href: '#/back-page' },
					{
						_label: 'Unterseite der Startseite und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
						_href: '#/back-page',
					},
					{
						_label: 'Unterseite der Unterseite',
						_href: '#/back-page',
					},
				]}
			></KolBreadcrumb>
		</div>
	</>
);
