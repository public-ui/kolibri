import React from 'react';
import { KolBreadcrumb } from '@public-ui/react';

import { FC } from 'react';

export const BreadcrumbBasic: FC = () => (
	<div className="grid gap-4">
		<KolBreadcrumb
			_label="Breadcrumb aus Text-Links"
			_links={[
				{ _label: 'Startseite', _href: '#/breadcrumb/sample-page' },
				{ _label: 'Unterseite der Startseite', _href: '#/breadcrumb/sample-page' },
				{
					_label: 'Unterseite der Unterseite',
					_href: '#/breadcrumb/sample-page',
				},
			]}
		></KolBreadcrumb>
		<KolBreadcrumb
			_label="Breadcrumb aus Icons- oder Text-Links"
			_links={[
				{
					_label: 'Startseite',
					_icons: 'codicon codicon-home',
					_hideLabel: true,
					_href: '#/breadcrumb/sample-page',
				},
				{
					_label: 'Unterseite der Startseite mit sehr langem Link-Test',
					_href: '#/breadcrumb/sample-page',
				},
				{
					_label: 'Unterseite der Unterseite',
					_href: '#/breadcrumb/sample-page',
				},
			]}
		></KolBreadcrumb>
		<KolBreadcrumb
			_label="Breadcrumb aus Icons- und Text-Links"
			_links={[
				{ _label: 'Startseite', _icons: 'codicon codicon-home', _href: '#/breadcrumb/sample-page' },
				{
					_label: 'Unterseite der Startseite und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
					_href: '#/breadcrumb/sample-page',
				},
				{
					_label: 'Unterseite der Unterseite',
					_href: '#/breadcrumb/sample-page',
				},
			]}
		></KolBreadcrumb>
	</div>
);
