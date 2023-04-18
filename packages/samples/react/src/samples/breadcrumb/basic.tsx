import React from 'react';
import { KolBreadcrumb } from '@public-ui/react';

import { FC } from 'react';

export const BreadcrumbBasic: FC = () => (
	<div className="grid gap-4">
		<KolBreadcrumb
			_ariaLabel="Breadcrumb aus Text-Links"
			_links={[
				{ _label: 'Startseite', _href: '#/' },
				{ _label: 'Unterseite der Startseite', _href: '#/unterseite' },
				{
					_label: 'Unterseite der Unterseite',
					_href: '#/unterseite/unterseite',
				},
			]}
		></KolBreadcrumb>
		<KolBreadcrumb
			_ariaLabel="Breadcrumb aus Icons- oder Text-Links"
			_links={[
				{
					_label: 'Startseite',
					_icon: 'codicon codicon-home',
					_iconOnly: true,
					_href: '#/',
				},
				{
					_label: 'Unterseite der Startseite mit sehr langem Link-Test',
					_href: '#/unterseite',
				},
				{
					_label: 'Unterseite der Unterseite',
					_href: '#/unterseite/unterseite',
				},
			]}
		></KolBreadcrumb>
		<KolBreadcrumb
			_ariaLabel="Breadcrumb aus Icons- und Text-Links"
			_links={[
				{ _label: 'Startseite', _icon: 'codicon codicon-home', _href: '#/' },
				{
					_label: 'Unterseite der Startseite und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
					_href: '#/unterseite',
				},
				{
					_label: 'Unterseite der Unterseite',
					_href: '#/unterseite/unterseite',
				},
			]}
		></KolBreadcrumb>
	</div>
);
