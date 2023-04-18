import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

export const NavActive: FC = () => {
	const [links, setLinks] = useState([]);

	const handleLinks = (route: string) => {
		const link = links.find((link) => link._label === route);
		link._active = !link._active;
		setLinks(links);
	};

	useEffect(() => {
		setLinks([
			{
				_label: 'Main',
				_icon: 'fa-solid fa-house',
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
				_active: false,
				_label: 'Alert',
				_on: {
					onClick: () => handleLinks('Alert'),
				},
				_children: [
					{
						_label: 'Main',
						_icon: 'fa-solid fa-house',
						_on: {
							onClick: () => handleLinks('/'),
						},
					},
					{
						_label: 'Abbr',
						_href: '/abbr',
						_on: {
							onClick: () => handleLinks('/abbr'),
						},
					},
					{
						_label: 'Accordion',
						_href: '/accordion',
						_on: {
							onClick: () => handleLinks('/accordion'),
						},
					},
					{
						_label: 'Alert',
						_href: '/alert',
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
