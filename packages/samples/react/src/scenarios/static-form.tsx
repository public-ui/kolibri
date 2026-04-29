import {
	KolButton,
	KolCombobox,
	KolHeading,
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolSelect,
	KolSingleSelect,
	KolTextarea,
} from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../components/SampleDescription';
import { COUNTRY_SUGGESTIONS, COUNTRY_OPTIONS } from '../shares/country';

export const StaticForm: FC = () => {
	const { searchParams } = new URL(location.href);

	// Options for Select/Radio components
	const GENDER_OPTIONS = [
		{ label: 'Männlich', value: 'male' },
		{ label: 'Weiblich', value: 'female' },
		{ label: 'Divers', value: 'diverse' },
		{ label: 'Keine Angabe', value: 'none' },
	];

	const LANGUAGE_OPTIONS = [
		{ label: 'Deutsch', value: 'de' },
		{ label: 'Englisch', value: 'en' },
		{ label: 'Französisch', value: 'fr' },
		{ label: 'Spanisch', value: 'es' },
	];

	const INTEREST_OPTIONS = [
		{ label: 'Technologie', value: 'tech' },
		{ label: 'Sport', value: 'sports' },
		{ label: 'Kultur', value: 'culture' },
		{ label: 'Wissenschaft', value: 'science' },
		{ label: 'Reisen', value: 'travel' },
		{ label: 'Kochen', value: 'cooking' },
	];

	return (
		<>
			<SampleDescription>
				<p>Dieses Beispiel zeigt ein praxisnahes Benutzerregistrierungsformular mit KoliBri-Komponenten.</p>
				<ol>
					<li>
						Aktivieren Sie den <code>experimental mode</code>:{' '}
						<code className="bg-gray-200"><meta name="kolibri" content="dev-mode=false;experimental-mode=true;" /></code>
					</li>
					<li>
						Verwenden Sie ein natives <code>form</code>-Element:{' '}
						<code className="bg-gray-200"><form method="GET">...</form></code>
					</li>
					<li>
						Jedes Eingabefeld benötigt ein <code>name</code>-Attribut:{' '}
						<code className="bg-gray-200"><KolInputText _name="vorname" _label="Vorname" /></code>
					</li>
					<li>
						Ein Button muss den Typ <code>submit</code> haben:{' '}
						<code className="bg-gray-200"><KolButton _label="Registrieren" _type="submit" _variant="primary" /></code>
					</li>
				</ol>
			</SampleDescription>

			<section className="w-full flex flex-col">
				{searchParams.size > 0 && (
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Übermittelte Daten" />
						<pre className="text-base">
							<code>{JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}</code>
						</pre>
					</div>
				)}

				<form className="grid gap-6" method="get" noValidate>
					{/* Persönliche Daten */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Persönliche Daten" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<KolInputText _name="vorname" _label="Vorname" _required _hint="Pflichtfeld" />
							<KolInputText _name="nachname" _label="Nachname" _required _hint="Pflichtfeld" />
						</div>
						<KolInputDate _name="geburtsdatum" _label="Geburtsdatum" _required _hint="Pflichtfeld" />
						<KolInputRadio
							_name="geschlecht"
							_label="Geschlecht"
							_options={GENDER_OPTIONS}
							_orientation="horizontal"
						/>
					</div>

					{/* Kontaktdaten */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Kontaktdaten" />
						<KolInputEmail _name="email" _label="E-Mail-Adresse" _required _hint="Pflichtfeld" _type="email" />
						<KolInputText _name="telefon" _label="Telefonnummer" _type="tel" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<KolInputText _name="strasse" _label="Straße und Hausnummer" />
							<KolInputText _name="plz" _label="PLZ" />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<KolInputText _name="ort" _label="Ort" />
							<KolSelect
								_name="land"
								_label="Land"
								_options={COUNTRY_OPTIONS}
								_required
							/>
						</div>
					</div>

					{/* Präferenzen */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Ihre Präferenzen" />
						<KolInputCheckbox _name="newsletter" _label="Ich möchte den Newsletter abonnieren" />
						<KolSelect
							_name="sprache"
							_label="Bevorzugte Sprache"
							_options={LANGUAGE_OPTIONS}
							_required
						/>
						<KolSelect
							_name="interessen"
							_label="Ihre Interessen (Mehrfachauswahl)"
							_options={INTEREST_OPTIONS}
							_multiple
							_rows={3}
						/>
						<KolInputRange
							_name="benachrichtigungen"
							_label="Häufigkeit von Benachrichtigungen"
							_min={0}
							_max={10}
							_value={3}
							_step={1}
							_list={[
								{ label: 'Nie', value: 0 },
								{ label: 'Selten', value: 3 },
								{ label: 'Oft', value: 7 },
								{ label: 'Immer', value: 10 },
							]}
						/>
					</div>

					{/* Zugangsdaten */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Zugangsdaten" />
						<KolInputText _name="benutzername" _label="Benutzername" _required _hint="Pflichtfeld" />
						<KolInputPassword
							_name="passwort"
							_label="Passwort"
							_required
							_hint="Mindestens 8 Zeichen"
							_pattern=".{8,}"
						/>
						<KolInputPassword
							_name="passwort_wiederholung"
							_label="Passwort wiederholen"
							_required
							_hint="Passwort bestätigen"
							_pattern=".{8,}"
						/>
					</div>

					{/* AGB & Datenschutz */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Rechtliches" />
						<KolInputCheckbox
							_name="agb"
							_label="Ich akzeptiere die Allgemeinen Geschäftsbedingungen"
							_required
							_error="Sie müssen die AGB akzeptieren"
						/>
						<KolInputCheckbox
							_name="datenschutz"
							_label="Ich bin mit der Verarbeitung meiner Daten gemäß der Datenschutzerklärung einverstanden"
							_required
							_error="Sie müssen der Datenverarbeitung zustimmen"
						/>
						<KolInputCheckbox
							_name="werbung"
							_label="Ich bin damit einverstanden, Werbung per E-Mail zu erhalten"
						/>
					</div>

					{/* Avatar Upload */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Profilbild" />
						<KolInputFile
							_name="avatar"
							_label="Profilbild hochladen"
							_accept="image/*"
							_hint="Maximal 2MB"
						/>
					</div>

					{/* Farbpräferenz */}
					<div className="grid gap-4">
						<KolHeading _level={2} _label="Design-Einstellungen" />
						<KolInputColor
							_name="theme_color"
							_label="Wählen Sie Ihre bevorzugte Theme-Farbe"
							_value="#3f51b5"
						/>
					</div>

					{/* Kommentare */}
					<div className="grid gap-4">
						<KolTextarea
							_name="kommentare"
							_label="Weitere Kommentare oder Anmerkungen"
							_rows={5}
							_placeholder="Hier können Sie uns weitere Informationen mitteilen..."
						/>
					</div>

					{/* Buttons */}
					<div className="flex flex-wrap gap-4">
						<KolButton _label="Registrieren" _type="submit" _variant="primary" _icons="codicon codicon-check" />
						<KolButton _label="Zurücksetzen" _type="reset" _variant="secondary" _icons="codicon codicon-trash" />
					</div>

					{/* Hidden Input für erzwungene Übermittlung */}
					<input type="hidden" value={crypto.randomUUID()} name="random" />
				</form>
			</section>
		</>
	);
};
