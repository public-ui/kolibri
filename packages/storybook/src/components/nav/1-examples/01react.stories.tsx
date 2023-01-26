import React from 'react';
import { KolNav } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import { BikBitvTest, STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Nav/Beispiele',
	component: KolNav,
} as ComponentMeta<typeof KolNav>;

const Nav1 = () => (
	<KolNav
		_ariaLabel="Navigation mit sinnvoller Breite"
		_links={[
			{
				_label: '1 Navigationspunkt mit sehr langem Link-Test',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_target: 'asdasd',
			},
			{
				_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
			},
			{
				_active: true,
				_label: '3 Navigationspunkt',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_children: [
					{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker' },
					{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker', _target: 'asdasd' },
					{
						_active: true,
						_label: '3.3 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
							{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{
						_label: '3.4 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
							{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{ _label: '3.5 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _label: '4 Navigationspunkt', _href: '#abc' },
		]}
		_orientation="horizontal"
	></KolNav>
);
const Nav2 = () => (
	<KolNav
		_ariaLabel="Navigation mit sinnvoller Breite"
		_links={[
			{
				_label: '1 Navigationspunkt mit sehr langem Link-Test',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_iconOnly: true,
				_target: 'asdasd',
			},
			{
				_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_iconOnly: true,
			},
			{
				_active: true,
				_label: '3 Navigationspunkt',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_iconOnly: true,
				_children: [
					{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker' },
					{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker', _target: 'asdasd' },
					{
						_active: true,
						_label: '3.3 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
							{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{
						_label: '3.4 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
							{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{ _label: '3.5 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _label: '4 Navigationspunkt', _href: '#abc', _iconOnly: true },
		]}
		_orientation="horizontal"
		style={{ display: 'inline-flex' }}
	></KolNav>
);
const Nav3 = () => (
	<KolNav
		style={{ maxWidth: '20em' }}
		_ariaLabel="Navigation mit sinnvoller Breite"
		_links={[
			{
				_label: '1 Navigationspunkt mit sehr langem Link-Test',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_target: 'asdasd',
			},
			{
				_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
			},
			{
				_active: true,
				_label: '3 Navigationspunkt',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_children: [
					{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker' },
					{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker', _target: 'asdasd' },
					{
						_active: true,
						_label: '3.3 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
							{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{
						_label: '3.4 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
							{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{ _label: '3.5 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _label: '4 Navigationspunkt', _href: '#abc' },
		]}
	></KolNav>
);
const Nav4 = () => (
	<KolNav
		style={{ fontSize: '80%', maxWidth: '20em' }}
		_ariaLabel="Navigation in der Breite beschränkt"
		_has-compact-button=""
		_links={[
			{
				_label: '1 Navigationspunkt mit sehr langem Link-Test',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_target: 'asdasd',
			},
			{
				_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
			},
			{
				_active: true,
				_label: '3 Navigationspunkt',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_children: [
					{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker' },
					{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker', _target: 'asdasd' },
					{
						_active: true,
						_label: '3.3 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
							{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{
						_label: '3.4 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
							{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{ _label: '3.5 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _label: '4 Navigationspunkt', _href: '#abc' },
		]}
	></KolNav>
);
const Nav5 = () => (
	<KolNav
		style={{ fontSize: '60%', maxWidth: '20em' }}
		_ariaLabel="Navigation initial eingeklappt"
		_compact
		_links={[
			{
				_label: '1 Navigationspunkt mit sehr langem Link-Test',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_target: 'asdasd',
			},
			{
				_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
			},
			{
				_active: true,
				_label: '3 Navigationspunkt',
				_href: '#abc',
				_icon: 'icofont-woodpecker',
				_children: [
					{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker' },
					{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker', _target: 'asdasd' },
					{
						_active: true,
						_label: '3.3 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
							{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{
						_label: '3.4 Navigationspunkt',
						_href: '#abc',
						_children: [
							{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
							{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
						],
					},
					{ _label: '3.5 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _label: '4 Navigationspunkt', _href: '#abc' },
		]}
	></KolNav>
);

export const Erweitert = () => (
	<BikBitvTest _heading="Nav">
		<Nav1 />
		<Nav2 />
		<Nav3 />
		<Nav4 />
		<Nav5 />
	</BikBitvTest>
);
