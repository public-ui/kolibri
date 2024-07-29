import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const NavHorizontal: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolNav with horizontal alignment.</p>
		</SampleDescription>
		<KolNav
			_ariaLabel="Main navigation"
			_links={[
				{
					_label: 'Homepage',
					_href: '#/back-page',
				},
				{
					_label: '2 Navigation point',
					_href: '#/back-page',
				},
				{
					_active: true,
					_label: '3 Navigation point',
					_href: '#/back-page',
					_children: [
						{
							_label: '3.1 Navigation point',
						},
						{
							_label: '3.2 Navigation point',
							_href: '#/back-page',
							_target: 'asdasd',
						},
						{
							_active: true,
							_label: '3.3 Navigation point',
							_href: '#/back-page',
							_children: [
								{
									_active: true,
									_label: '3.3.1 Navigation point (active)',
									_href: '#/back-page',
								},
								{ _label: '3.3.2 Navigation point', _href: '#/back-page' },
							],
						},
						{
							_label: '3.4 Navigation point',
							_href: '#/back-page',
							_children: [
								{ _label: '3.4.1 Navigation point', _href: '#/back-page' },
								{ _label: '3.4.2 Navigation point', _href: '#/back-page' },
							],
						},
						{ _label: '3.5 Navigation point', _href: '#/back-page' },
					],
				},
				{ _label: '4 Navigation point', _href: '#/back-page' },
			]}
			_orientation="horizontal"
		/>
	</>
);
