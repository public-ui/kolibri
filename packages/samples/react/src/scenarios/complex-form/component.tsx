import React from 'react';
import type { FC } from 'react';

import { KolHeading, KolProgress, KolTable, KolTabs } from '@public-ui/react';

import { TerminKopfdatenComponent } from './kopfdaten/component';
import { TerminLocationComponent } from './location/component';
import { TerminScheduleComponent } from './schedule/component';

type Zeiten = {
	stadtteil: string;
	zeiten: string;
	montag: string;
	dienstag: string;
	mittwoch: string;
	donnerstag: string;
	freitag: string;
};

export const TerminComponent: FC = () => (
	<>
		<div className="grid sm:grid-cols-1 gap-2 my-3">
			<KolHeading _label="Terminreservierung" />
			<KolHeading _label="Termine für Einwohnermelde- (incl. Pass- und Ausweisangelegenheiten) und Kraftfahrzeugangelegenheiten" _level={2} />
			<div style={{ fontFamily: 'Arial' }}>
				<p className="py-2">Derzeit kann generell nur mit vorheriger Terminvereinbarung bei den Bürgerdiensten vorgesprochen werden.</p>
				<p className="py-2">
					Die Termine für Einwohnermelde- und Kraftfahrzeugangelegenheiten werden täglich ab 07:00 Uhr für den gleichen Tag, für den gleichen Tag 7 Tage und für
					den gleichen Tag 14 Tage später freigegeben. So können Sie jeden Tag spontan Termine für den gleichen Tag und planbar Termine für eine Woche oder zwei
					Wochen später erhalten.
				</p>
				<p className="py-2">
					Sofern online keine Termine innerhalb der nächsten 14 Tage mehr verfügbar sind, führt auch eine darüber hinaus gehende telefonische Kontaktaufnahme
					leider zu keinem anderen Ergebnis. In diesem Fall versuchen Sie es bitte am nächsten Morgen erneut.
				</p>
				<p className="py-2">
					Bitte achten Sie darauf, den richtigen Kalender für Ihr Anliegen auszuwählen. Hinweis: Bitte geben Sie bei Ihrer Terminvereinbarung zur lückenlosen
					Kontaktverfolgung immer Ihre korrekte Telefonnummer und E-Mail Adresse an. Wir behalten uns vor, gebuchte Termine mit falschen Angaben zu löschen.
				</p>
			</div>
		</div>
		<div className="grid sm:grid-cols-1 gap-2">
			<KolTable
				_label="Öffnungszeiten"
				_data={
					[
						{
							stadtteil: 'Brackel',
							montag: '08:00 - 12:00, 14:00 - 16:00',
							dienstag: '08:00 - 12:00, 14:00 - 15:00',
							mittwoch: '08:00 - 12:00, 14:00 - 15:00',
							donnerstag: '08:00 - 12:00, 14:00 - 18:00',
							freitag: '08:00 - 12:00',
						},
						{
							stadtteil: 'Dorstfeld',
							montag: '09:00 - 12:00, 14:00 - 16:00',
							dienstag: '09:00 - 12:00, 14:00 - 15:00',
							mittwoch: '09:00 - 12:00, 14:00 - 15:00',
							donnerstag: '09:00 - 12:00, 14:00 - 18:00',
							freitag: '09:00 - 12:00',
						},
						{
							stadtteil: 'Aplerbeck',
							montag: '08:00 - 12:00, 14:00 - 16:00',
							dienstag: '08:00 - 12:00, 14:00 - 15:00',
							mittwoch: '08:00 - 12:00, 14:00 - 15:00',
							donnerstag: '08:00 - 12:00, 14:00 - 18:00',
							freitag: '08:00 - 12:00',
						},
						{
							stadtteil: 'Innenstadt Ost',
							montag: '07:00 - 12:00, 14:00 - 16:00',
							dienstag: '07:00 - 12:00, 14:00 - 15:00',
							mittwoch: '07:00 - 12:00, 14:00 - 15:00',
							donnerstag: '07:00 - 12:00, 14:00 - 18:00',
							freitag: '07:00 - 12:00, 13:00 - 16:00',
						},
						{
							stadtteil: 'Innenstadt West',
							montag: '07:00 - 12:00, 14:00 - 16:00',
							dienstag: '07:00 - 12:00, 14:00 - 15:00',
							mittwoch: '07:00 - 12:00, 14:00 - 15:00',
							donnerstag: '07:00 - 12:00, 14:00 - 18:00',
							freitag: '07:00 - 12:00, 13:00 - 16:00',
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
				_minWidth="50em"
				style={{
					display: 'inline-grid',
					width: '100%',
				}}
			></KolTable>
			<KolTabs
				className="block mt-4"
				_ariaLabel="Registerkarten"
				_tabs={[
					{
						_label: '1. Einwohnermeldeämter',
					},
					{
						_label: '2. Freie Termine',
					},
					{
						_label: '3. Persönliche Daten',
					},
				]}
			>
				<div>
					<KolHeading _level={2} _label="Wählen Sie einen Stadtteil aus" />
					<TerminLocationComponent onSubmitted={() => {}} />
				</div>
				<div>
					<KolHeading _level={2} _label="Wählen Sie einen Termin aus" />
					<TerminScheduleComponent onSubmitted={() => {}} />
				</div>
				<div>
					<KolHeading _level={2} _label="Geben Sie Ihre Kontaktdaten ein" />
					<TerminKopfdatenComponent onSubmitted={() => {}} />
				</div>
			</KolTabs>
		</div>
		<div className="grid sm:grid-cols-1 gap-2">
			<div className="border-top"></div>
			<KolHeading _level={3} _label="Fortschritt" />
			<KolProgress _value={0} _max={100} _unit="Prozent des Formulars"></KolProgress>
		</div>
	</>
);
