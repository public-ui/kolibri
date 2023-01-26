import React from 'react';

import { KolInputText, KolTable as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TableConfiguration } from './autogen.configuration';
import { TABLE_NEW_HEADERS, TABLE_PAGED_DATA } from './data';

type Zeiten = {
	stadtteil: string;
	zeiten: string;
	montag: string;
	dienstag: string;
	mittwoch: string;
	donnerstag: string;
	freitag: string;
};

export default {
	...TableConfiguration,
	title: 'React/Table/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolTable: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

/**
 * Die Component stellt eine konkrete Story im Storybook dar.
 *
 * @see: https://storybook.js.org/docs/react/get-started/whats-a-story
 */
export const Standard = (args: any) => (
	<div>
		<KolTable {...args}></KolTable>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Simple = () => (
	<div>
		<KolTable
			_caption="Beispieltabelle"
			_headers={{
				horizontal: [
					[
						{ label: 'Spalte 1', key: 'spalte1' },
						{ label: 'Spalte 2', key: 'spalte2' },
						{ label: 'Spalte 3', key: 'spalte3' },
					],
				],
			}}
			_data={[
				{ spalte1: 'Zelle 1', spalte2: 'Zelle 2', spalte3: 'Zelle 3' },
				{ spalte1: 'Zelle 1', spalte2: 'Zelle 2', spalte3: 'Zelle 3' },
				{ spalte1: 'Zelle 1', spalte2: 'Zelle 2', spalte3: 'Zelle 3' },
			]}
			class="hydrated"
		></KolTable>
	</div>
);
Simple.args = {
	...DefaultArgs,
};

Simple.storyName = 'Einfache Tabelle';

export const schedules = () => (
	<div>
		<KolTable
			_caption="Öffnungszeiten"
			_data={
				[
					{
						stadtteil: 'Brackel',
						montag: '08:00 - 12:00<br/>14:00 - 16:00',
						dienstag: '08:00 - 12:00<br/>14:00 - 15:00',
						mittwoch: '08:00 - 12:00<br/>14:00 - 15:00',
						donnerstag: '08:00 - 12:00<br/>14:00 - 18:00',
						freitag: '08:00 - 12:00',
					},
					{
						stadtteil: 'Dorstfeld',
						montag: '09:00 - 12:00<br/>14:00 - 16:00',
						dienstag: '09:00 - 12:00<br/>14:00 - 15:00',
						mittwoch: '09:00 - 12:00<br/>14:00 - 15:00',
						donnerstag: '09:00 - 12:00<br/>14:00 - 18:00',
						freitag: '09:00 - 12:00',
					},
					{
						stadtteil: 'Aplerbeck',
						montag: '08:00 - 12:00<br/>14:00 - 16:00',
						dienstag: '08:00 - 12:00<br/>14:00 - 15:00',
						mittwoch: '08:00 - 12:00<br/>14:00 - 15:00',
						donnerstag: '08:00 - 12:00<br/>14:00 - 18:00',
						freitag: '08:00 - 12:00',
					},
					{
						stadtteil: 'Innenstadt Ost',
						montag: '07:00 - 12:00<br/>14:00 - 16:00',
						dienstag: '07:00 - 12:00<br/>14:00 - 15:00',
						mittwoch: '07:00 - 12:00<br/>14:00 - 15:00',
						donnerstag: '07:00 - 12:00<br/>14:00 - 18:00',
						freitag: '07:00 - 12:00<br/>13:00 - 16:00',
					},
					{
						stadtteil: 'Innenstadt West',
						montag: '07:00 - 12:00<br/>14:00 - 16:00',
						dienstag: '07:00 - 12:00<br/>14:00 - 15:00',
						mittwoch: '07:00 - 12:00<br/>14:00 - 15:00',
						donnerstag: '07:00 - 12:00<br/>14:00 - 18:00',
						freitag: '07:00 - 12:00<br/>13:00 - 16:00',
						/*render: (el, data) => {
			   el.innerHTML = `<kol-badge _color="#ff0000" _label="NIX"></kol-badge>`;
			 },*/
					},
				] as Zeiten[]
			}
			_headers={{
				horizontal: [
					[
						{ label: '', asTd: true },
						{ label: 'Tag', colSpan: 5 },
					],
					[
						{
							label: 'Stadtteil',
							key: 'stadtteil',
							textAlign: 'left',
							sort: (data: Zeiten[]) => {
								return data.sort((first, second) => {
									if (first.stadtteil < second.stadtteil) {
										return -1;
									}
									if (first.stadtteil > second.stadtteil) {
										return 1;
									}
									return 0;
								});
							},
						},
						{ label: 'Montag', key: 'montag', textAlign: 'center' },
						{ label: 'Dienstag', key: 'dienstag', textAlign: 'center' },
						{ label: 'Mittwoch', key: 'mittwoch', textAlign: 'center' },
						{ label: 'Donnerstag', key: 'donnerstag', textAlign: 'center' },
						{ label: 'Freitag', key: 'freitag', textAlign: 'center' },
					],
				],
			}}
			class="hydrated"
		></KolTable>
	</div>
);
schedules.args = {
	...DefaultArgs,
};

schedules.storyName = 'Tabelle mit Sortierung einer Spalte';

export const rowspan = () => (
	<div>
		<KolTable
			_caption="2 Horizontal Header mit Span, 2 Vertikal Header mit Span, Daten Horizontal (Row- und
              Col-Span)"
			_headers="{'horizontal':[[{'label':'','colSpan':2,'rowSpan':2,'asTd':true},{'label':'Q2','colSpan':2},{'label':'Juni','key':'juni','rowSpan':2},{'label':'Q3','colSpan':3}],[{'label':'April','key':'april'},{'label':'Mai','key':'mai'},{'label':'Juli','key':'juli'},{'label':'August','key':'august'},{'label':'September','key':'september'}]],'vertical':[[{'label':'Bayern','rowSpan':2},{'label':'Berlin','key':'berlin','colSpan':2},{'label':'Nordrhein-Westfalen','rowSpan':3}],[{'label':'München','key':'münchen'},{'label':'Nürnberg','key':'nürnberg'},{'label':'Bonn','key':'bonn'},{'label':'Düsseldorf','key':'düsseldorf'},{'label':'Köln','key':'köln'}]]}"
			_data="[{'april':'97','mai':'99','juni':'100','juli':'101','august':'102','september':'105'},{'april':'11','mai':'13','juni':'13','juli':'13','august':'12','september':'12'},{'april':'86','mai':'85','juni':'87','juli':'88','august':'87','september':'90'},{'april':'11','mai':'12','juni':'12','juli':'11','august':'12','september':'12'},{'april':'42','mai':'41','juni':'42','juli':'43','august':'39','september':'42'},{'april':'100','mai':'99','juni':'98','juli':'99','august':'102','september':'109'}]"
		></KolTable>
	</div>
);
rowspan.args = {
	...DefaultArgs,
};

rowspan.storyName = 'Tabelle mit Rowspan/Colspan';

export const sortRender = () => {
	setTimeout(() => {
		const TABLE_DATA = [
			{
				montag: 'Alex',
				dienstag: 'Hong',
				mittwoch: 'Kevin',
				donnerstag: 'Fabian',
				freitag: 'Alex',
				samstag: 'Kevin',
				sonntag: 'Hong',
			},
			{
				montag: 'Helena',
				dienstag: 'Fabian',
				mittwoch: 'Marie',
				donnerstag: 'Ben',
				freitag: 'Marcus',
				samstag: 'Alex',
				sonntag: 'Marcus',
			},
			{
				montag: 'Fabian',
				dienstag: 'Helena',
				mittwoch: 'Fabian',
				donnerstag: 'Maya',
				freitag: 'Ben',
				samstag: 'Alex',
				sonntag: 'Helena',
			},
			{
				montag: 'Hong',
				dienstag: 'Alex',
				mittwoch: 'Kevin',
				donnerstag: 'Maya',
				freitag: 'Fabian',
				samstag: 'Helena',
				sonntag: 'Alex',
			},
		];
		document.querySelector('kol-table#table-1')._headers = TABLE_NEW_HEADERS;
		document.querySelector('kol-table#table-1')._data = TABLE_DATA;
	}, 1000);
	return (
		<KolTable
			id="table-1"
			_caption="2 Header, Daten Horizontal, Sort and Render"
			_data="[{'montag': 'Alex', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Ben'}, {'montag': 'Helena', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Marcus'}, {'montag': 'Fabian', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Ben'}, {'montag': 'Hong', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Ben'}]"
			class="hydrated"
		></KolTable>
	);
};

sortRender.storyName = 'Horizontal Sortieren/Rendern';

export const verticalSortRender = () => {
	setTimeout(() => {
		const TABLE_DATA = [
			{
				montag: 'Alex',
				dienstag: 'Hong',
				mittwoch: 'Kevin',
				donnerstag: 'Fabian',
				freitag: 'Alex',
				samstag: 'Kevin',
				sonntag: 'Hong',
			},
			{
				montag: 'Helena',
				dienstag: 'Fabian',
				mittwoch: 'Marie',
				donnerstag: 'Ben',
				freitag: 'Marcus',
				samstag: 'Alex',
				sonntag: 'Marcus',
			},
			{
				montag: 'Fabian',
				dienstag: 'Helena',
				mittwoch: 'Fabian',
				donnerstag: 'Maya',
				freitag: 'Ben',
				samstag: 'Alex',
				sonntag: 'Helena',
			},
			{
				montag: 'Hong',
				dienstag: 'Alex',
				mittwoch: 'Kevin',
				donnerstag: 'Maya',
				freitag: 'Fabian',
				samstag: 'Helena',
				sonntag: 'Alex',
			},
		];
		document.querySelector('kol-table#table-2')._headers = {
			horizontal: [
				[
					{
						asTd: true,
						colSpan: 2,
					},
				].concat(TABLE_NEW_HEADERS.vertical[0]),
				// cols: [TABLE_NEW_HEADERS.horizontal[0].cols[0]].concat(TABLE_NEW_HEADERS.vertical[0].rows),
			],
			vertical: [
				[
					{
						...TABLE_NEW_HEADERS.horizontal[0][1],
						rowSpan: TABLE_NEW_HEADERS.horizontal[0][1].colSpan,
						colSpan: undefined,
					},
					{
						...TABLE_NEW_HEADERS.horizontal[0][2],
						rowSpan: TABLE_NEW_HEADERS.horizontal[0][2].colSpan,
						colSpan: undefined,
					},
				],
			].concat([TABLE_NEW_HEADERS.horizontal[1]]),
		};
		document.querySelector('kol-table#table-2')._data = TABLE_DATA;
	}, 1000);
	return (
		<KolTable
			id="table-2"
			_caption="2 Header, Daten Vertikal, Sort and Render"
			_data="[{'montag': 'Alex', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Ben'}, {'montag': 'Helena', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Marcus'}, {'montag': 'Fabian', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Ben'}, {'montag': 'Hong', 'dienstag': 'Marie', 'mittwoch': 'Kevin', 'donnerstag': 'Maya', 'freitag': 'Ben'}]"
		></KolTable>
	);
};

verticalSortRender.storyName = 'Vertical Sortieren/Rendern';

export const tableFilter = () => {
	setTimeout(() => {
		const DATA = [
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
			{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
			{ montag: 'Hong', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
		];
		document.querySelector('#filter-table')._data = DATA;
		document.querySelector('#filter-input')._on = {
			onChange: (event) => {
				document.querySelector('#filter-table')._data = DATA.filter((tupel) => {
					const regExp = new RegExp(event.target.value, 'i');
					return (
						regExp.test(tupel.montag) ||
						regExp.test(tupel.dienstag) ||
						regExp.test(tupel.mittwoch) ||
						regExp.test(tupel.donnerstag) ||
						regExp.test(tupel.freitag)
					);
				});
			},
		};
	}, 1000);
	return (
		<div>
			<KolInputText id="filter-input" _type="search">
				Filtern
			</KolInputText>
			<KolTable
				id="filter-table"
				_caption="Tabelle + Filter"
				_headers="{'horizontal':[[{'label':'Montag','key':'montag'},{'label':'Dienstag','key':'dienstag'},{'label':'Mittwoch','key':'mittwoch'},{'label':'Donnerstag','key':'donnerstag'},{'label':'Freitag','key':'freitag'}]]}"
			></KolTable>
		</div>
	);
};

tableFilter.storyName = 'Tabelle mit Filter';

export const pagination = () => {
	setTimeout(() => {
		document.querySelector('kol-table#table-3')._data = TABLE_PAGED_DATA;
	}, 1000);
	return (
		<KolTable
			id="table-3"
			_caption="Nur Horizontal Header, Daten Horizontal, Pagination"
			_headers="{'horizontal':[[{'label':'Montag','key':'montag','width':'10em'},{'label':'Dienstag','key':'dienstag','width':'15em'},{'label':'Mittwoch','key':'mittwoch'},{'label':'Donnerstag','key':'donnerstag'},{'label':'Freitag','key':'freitag'}]]}"
			_pagination
		></KolTable>
	);
};

pagination.storyName = 'Tabelle mit Paginierung';
