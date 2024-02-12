import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC, useEffect, useState } from 'react';
import { ButtonOrLinkOrTextWithChildrenProps } from '@public-ui/components';

export const NavActive: FC = () => {
	const [links, setLinks] = useState<ButtonOrLinkOrTextWithChildrenProps[]>([]);

	const handleLinks = (route: string) => {
		const link = links.find((link) => link._label === route);
		if (!link) return;
		link._active = !link._active;
		setLinks(links);
	};

	useEffect(() => {
		setLinks([
			{
				_label: 'Main',
				_icons: 'codicon codicon-home',
				_on: {
					onClick: () => handleLinks('Main'),
				},
			},
			{
				_label: 'Abbr',
				_on: {
					onClick: () => handleLinks('Abbr'),
				},
			},
			{
				_label: 'Accordion',
				_on: {
					onClick: () => handleLinks('Accordion'),
				},
			},
			{
				_active: true,
				_label: 'Alert',
				_on: {
					onClick: () => handleLinks('Alert'),
				},
				_children: [
					{
						_label: 'Main',
						_icons: 'codicon codicon-home',
						_on: {
							onClick: () => handleLinks('/'),
						},
					},
					{
						_active: true,
						_label: 'Abbr',
						_href: '#/back-page',
						_on: {
							onClick: () => handleLinks('/abbr'),
						},
					},
					{
						_label: 'Accordion',
						_href: '#/back-page',
						_on: {
							onClick: () => handleLinks('/accordion'),
						},
					},
					{
						_label: 'Alert',
						_href: '#/back-page',
					},
					{
						_label: 'Badget',
						_on: {
							onClick: () => handleLinks('/badget'),
						},
					},
				],
			},
			{
				_label: 'Badget',
				_on: {
					onClick: () => handleLinks('Badget'),
				},
			},
		]);
	}, []);

	return <KolNav _ariaLabel="Main navigation" _links={links} />;
};
