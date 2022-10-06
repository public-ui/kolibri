import { FormFactory } from '@leanup/form';

// FORMS FOR FORM 1
const FORMULAR_FORM = FormFactory.createForm('anschrift', {
	anschrift: {
		anrede: {
			ansprache: 'Frau',
			vorname: 'Elke',
			nachname: 'Mustermann',
		},
		adresse: {
			strasse: 'Musterstraße',
			hausnummer: '1a',
			ort: 'Musterstadt',
			plz: '54321',
		},
	},
	email: '',
	text: '',
	datum: '2000-12-24',
	password: 'Passwort',
	betrag: 45,
	status: 0,
	agb: null,
	datenschutz: null,
});

const ANSCHRIFT_FORM = FORMULAR_FORM.getControl('anschrift');
const ANREDE_FORM = ANSCHRIFT_FORM.getControl('anrede');
const ANREDE_ANSPRACHE_INPUT = ANREDE_FORM.getControl('ansprache');
const ANREDE_VORNAME_INPUT = ANREDE_FORM.getControl('vorname');
const ANREDE_NACHNAME_INPUT = ANREDE_FORM.getControl('nachname');

ANREDE_ANSPRACHE_INPUT.label = 'Anrede';
ANREDE_ANSPRACHE_INPUT.mandatory = true;
ANREDE_VORNAME_INPUT.label = 'Vorname';
ANREDE_VORNAME_INPUT.mandatory = true;
ANREDE_VORNAME_INPUT.info = 'Bitte geben Sie einen schönen Vorname ein.';
ANREDE_VORNAME_INPUT.placeholder = 'Ihr Vorname';
ANREDE_NACHNAME_INPUT.label = 'Nachname';
ANREDE_NACHNAME_INPUT.mandatory = true;
ANREDE_NACHNAME_INPUT.placeholder = 'Ihr Nachname';

const ADRESSE_FORM = ANSCHRIFT_FORM.getControl('adresse');
const ADRESSE_STRASSE_INPUT = ADRESSE_FORM.getControl('strasse');
const ADRESSE_HAUSNUMMER_INPUT = ADRESSE_FORM.getControl('hausnummer');
const ADRESSE_PLZ_INPUT = ADRESSE_FORM.getControl('plz');
const ADRESSE_ORT_INPUT = ADRESSE_FORM.getControl('ort');

ADRESSE_STRASSE_INPUT.label = 'Straße';
ADRESSE_HAUSNUMMER_INPUT.label = 'Hausnummer';
ADRESSE_PLZ_INPUT.label = 'Postleitzahl';
ADRESSE_ORT_INPUT.label = 'Ort';

// Create Form for Weitere Daten
const FORMULAR_FORM_WEITERE = FormFactory.createForm('weitere', {
	weitere: {
		kontaktdaten: {
			telefon: '',
			email: '',
		},
		zahlungsdaten: {
			bank: '',
			bic: '',
			iban: '',
			inhaber: '',
			zahlart: 'Bar',
		},
	},
});

const WEITERE_FORM = FORMULAR_FORM_WEITERE.getControl('weitere');
const KONTAKTDATEN_FORM = WEITERE_FORM.getControl('kontaktdaten');
const KONTAKTDATEN_TELEFON_INPUT = KONTAKTDATEN_FORM.getControl('telefon');
const KONTAKTDATEN_EMAIL_INPUT = KONTAKTDATEN_FORM.getControl('email');
const ZAHLUNGSDATEN_FORM = WEITERE_FORM.getControl('zahlungsdaten');
const ZAHLUNGSDATEN_BANK_INPUT = ZAHLUNGSDATEN_FORM.getControl('bank');
const ZAHLUNGSDATEN_BIC_INPUT = ZAHLUNGSDATEN_FORM.getControl('bic');
const ZAHLUNGSDATEN_IBAN_INPUT = ZAHLUNGSDATEN_FORM.getControl('iban');
const ZAHLUNGSDATEN_INHABER_INPUT = ZAHLUNGSDATEN_FORM.getControl('inhaber');
const ZAHLUNGSDATEN_ZAHLART_INPUT = ZAHLUNGSDATEN_FORM.getControl('zahlart');

KONTAKTDATEN_TELEFON_INPUT.label = 'Telefon';
KONTAKTDATEN_TELEFON_INPUT.placeholder = 'Ihre Telefonnummer';
KONTAKTDATEN_EMAIL_INPUT.label = 'E-Mail-Adresse';
KONTAKTDATEN_EMAIL_INPUT.placeholder = 'Ihre E-Mail-Adresse';
ZAHLUNGSDATEN_BANK_INPUT.label = 'Name der Bank';
ZAHLUNGSDATEN_BANK_INPUT.placeholder = 'Name Ihrer Bank';
ZAHLUNGSDATEN_BIC_INPUT.label = 'BIC';
ZAHLUNGSDATEN_BIC_INPUT.placeholder = 'BIC (Nur bei Überweisungen ins Ausland)';
ZAHLUNGSDATEN_IBAN_INPUT.label = 'IBAN';
ZAHLUNGSDATEN_IBAN_INPUT.placeholder = 'DExx xxxx xxxx xxxx xxxx xx';
ZAHLUNGSDATEN_INHABER_INPUT.label = 'Kontoinhaber';
ZAHLUNGSDATEN_INHABER_INPUT.placeholder = 'Name des Kontoinhabers';
ZAHLUNGSDATEN_ZAHLART_INPUT.label = 'Zahlart';

// Create Form for Sonstiges
const FORMULAR_FORM_SONSTIGES = FormFactory.createForm('sonstiges', {
	sonstiges: {
		kundenkonto: {
			benutzername: '',
			password: '',
		},
		zusammenfassung: {
			acceptds: '',
			acceptag: '',
			newsletter: '',
		},
	},
});

const SONSTIGES_FORM = FORMULAR_FORM_SONSTIGES.getControl('sonstiges');
const KUNDENKONTO_FORM = SONSTIGES_FORM.getControl('kundenkonto');
const ZUSAMMENFASSUNG_FORM = SONSTIGES_FORM.getControl('zusammenfassung');
const KUNDENKONTO_BENUTZERNAME_INPUT = KUNDENKONTO_FORM.getControl('benutzername');
const KUNDENKONTO_PASSWORD_INPUT = KUNDENKONTO_FORM.getControl('password');
const ZUSAMMENFASSUNG_ACCEPTDS_INPUT = ZUSAMMENFASSUNG_FORM.getControl('acceptds');
const ZUSAMMENFASSUNG_ACCEPTAG_INPUT = ZUSAMMENFASSUNG_FORM.getControl('acceptag');
const ZUSAMMENFASSUNG_NEWSLETTER_INPUT = ZUSAMMENFASSUNG_FORM.getControl('newsletter');

KUNDENKONTO_BENUTZERNAME_INPUT.label = 'Benutzername';
KUNDENKONTO_BENUTZERNAME_INPUT.placeholder = 'Wählen Sie einen Benutzernamen';
KUNDENKONTO_PASSWORD_INPUT.label = 'Passwort';
KUNDENKONTO_PASSWORD_INPUT.placeholder = 'Wählen Sie ein sicheres Passwort';
ZUSAMMENFASSUNG_ACCEPTDS_INPUT.label = 'Ich habe die Datenschutzerklärung gelesen und erkläre mich damit einverstanden';
ZUSAMMENFASSUNG_ACCEPTDS_INPUT.mandatory = true;
ZUSAMMENFASSUNG_ACCEPTAG_INPUT.label = 'Ich habe die Allgemeinen Geschäftsbedingungen gelesen und erkläre mich damit einverstanden';
ZUSAMMENFASSUNG_ACCEPTAG_INPUT.mandatory = true;
ZUSAMMENFASSUNG_NEWSLETTER_INPUT.label = 'Ich möchte den Newsletter abonnieren';

const FORMULAR_FORM_CALLBACK = FormFactory.createForm('callback', {
	callback: {
		data: {
			time: '10:00',
			name: '',
			firma: '',
			bemerkungen: '',
			acceptds: '',
			acceptag: '',
		},
	},
});

const CALLBACK_FORM = FORMULAR_FORM_CALLBACK.getControl('callback');
const DATA_FORM = CALLBACK_FORM.getControl('data');
const DATA_TIME_INPUT = DATA_FORM.getControl('time');
const DATA_NAME_INPUT = DATA_FORM.getControl('name');
const DATA_FIRMA_INPUT = DATA_FORM.getControl('firma');
const DATA_BEMERKUNGEN_INPUT = DATA_FORM.getControl('bemerkungen');
const DATA_ACCEPTDS_INPUT = DATA_FORM.getControl('acceptds');
const DATA_ACCEPTAG_INPUT = DATA_FORM.getControl('acceptag');

DATA_TIME_INPUT.label = 'Rückruf um';
DATA_TIME_INPUT.mandatory = true;
DATA_NAME_INPUT.label = 'Name';
DATA_NAME_INPUT.placeholder = 'Ihr Vor- und Nachname';
DATA_NAME_INPUT.mandatory = true;
DATA_FIRMA_INPUT.label = 'Firma';
DATA_FIRMA_INPUT.placeholder = 'Ihr Firmenname';
DATA_BEMERKUNGEN_INPUT.label = 'Bemerkungen';
DATA_BEMERKUNGEN_INPUT.placeholder = 'Geben Sie weitere Informationen ein';
DATA_ACCEPTDS_INPUT.label = 'Ich habe die Datenschutzerklärung gelesen und erkläre mich damit einverstanden';
DATA_ACCEPTDS_INPUT.mandatory = true;
DATA_ACCEPTAG_INPUT.label = 'Ich habe die allgemeinen Geschäftsbedigungen gelesen und erkläre mich damit einverstanden';
DATA_ACCEPTAG_INPUT.mandatory = true;

export {
	ANREDE_ANSPRACHE_INPUT,
	ANREDE_VORNAME_INPUT,
	ANREDE_NACHNAME_INPUT,
	ADRESSE_STRASSE_INPUT,
	ADRESSE_HAUSNUMMER_INPUT,
	ADRESSE_PLZ_INPUT,
	ADRESSE_ORT_INPUT,
	KONTAKTDATEN_TELEFON_INPUT,
	KONTAKTDATEN_EMAIL_INPUT,
	ZAHLUNGSDATEN_BANK_INPUT,
	ZAHLUNGSDATEN_BIC_INPUT,
	ZAHLUNGSDATEN_IBAN_INPUT,
	ZAHLUNGSDATEN_INHABER_INPUT,
	ZAHLUNGSDATEN_ZAHLART_INPUT,
	KUNDENKONTO_BENUTZERNAME_INPUT,
	KUNDENKONTO_PASSWORD_INPUT,
	ZUSAMMENFASSUNG_ACCEPTDS_INPUT,
	ZUSAMMENFASSUNG_ACCEPTAG_INPUT,
	ZUSAMMENFASSUNG_NEWSLETTER_INPUT,
	DATA_TIME_INPUT,
	DATA_NAME_INPUT,
	DATA_FIRMA_INPUT,
	DATA_BEMERKUNGEN_INPUT,
	DATA_ACCEPTDS_INPUT,
	DATA_ACCEPTAG_INPUT,
};
