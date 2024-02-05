import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const NavBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier ist ein Beispiel für eine Navigation. Durch anklicken des rechten + Symbols kann die Navigation erweitert und Untermenüs geöffnet werden. Durch das
				anklicken des {'<'} Symbols kann die Navigation minimiert werden.
			</p>
		</SampleDescription>
		<KolNav
			class="block w-sm"
			_label="Main navigation"
			_links={[
				{
					_label: 'Homepage',
					_icons: 'codicon codicon-home',
					_href: '#/',
				},
				{
					_label: '2 Navigation point',
					_href: '#/untermenu',
				},
				{
					_label: '3 Navigation point',
					_href: '#abc',
					_children: [
						{
							_label: '3.1 Navigation point',
							_href: '#/',
						},
						{
							_label: '3.2 Navigation point',
							_href: '#abc',
							_target: 'asdasd',
						},
						{
							_label: '3.3 Navigation point',
							_href: '#abc',
							_icons: 'fa-solid fa-cat',
							_children: [
								{
									_label: '3.3.1 Navigation point (active)',
									_href: '#abc',
								},
								{ _label: '3.3.2 Navigation point', _href: '#abc' },
							],
						},
						{
							_label: '3.4 Navigation point',
							_href: '#abc',
							_children: [
								{ _label: '3.4.1 Navigation point', _href: '#abc' },
								{ _label: '3.4.2 Navigation point', _href: '#abc' },
							],
						},
						{ _label: '3.5 Navigation point', _href: '#abc' },
					],
				},
				{ _label: '4 Navigation point', _href: '#abc' },
			]}
			_hasCompactButton
		/>
	</>
);
