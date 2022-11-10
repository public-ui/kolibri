import React from 'react';

import { KoliBriDevHelper } from '@public-ui/components';
import {
	KolAccordion,
	KolBadge,
	KolButton,
	KolDetails,
	KolForm,
	KolForm as MyComponent,
	KolIndentedText,
	KolInputCheckbox,
	KolInputEmail,
	KolInputRadio,
	KolInputText,
	KolLink,
	KolSelect,
	KolTable,
} from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';

import { FormConfiguration } from './autogen.configuration';

export default {
	...FormConfiguration,
	title: 'React/Form/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const DefaultArgs = {};

export const Form = () => (
	<KolForm>
		<div>
			<KolAccordion _heading="Kontakdaten" _level={1}>
				<div slot="content">
					<KolInputRadio
						_value="Frau"
						_required
						_name="ansprache"
						_id="ansprache"
						_list='[{"label":"Herr","value":"Herr"},{"label":"Frau","value":"Frau"},{"label":"Firma","value":"Firma"}]'
					>
						Ansprache
					</KolInputRadio>
					<KolInputText _required _name="vorname" _id="vorname" _placeholder="Ihr Vorname" _type="text">
						Vorname
					</KolInputText>
					<KolInputText _required _name="nachname" _id="nachname" _placeholder="Ihr Nachname" _type="text">
						Nachname
					</KolInputText>
					<KolInputText _required _name="adresse" _id="adresse" _placeholder="Ihr Adresse" _type="text">
						Adresse
					</KolInputText>
					<KolInputText _required _name="postleitzahl" _id="postleitzahl" _placeholder="Postleitzahl" _type="text">
						Postleitzahl
					</KolInputText>
					<KolInputText _required _name="ort" _id="ort" _placeholder="Ihr Ort" _type="text">
						Ort
					</KolInputText>
					<KolInputText _required _name="telefon" _id="telefon" _placeholder="Ihre Telefonnummer" _type="text">
						Telefon
					</KolInputText>
					<KolInputEmail _required _name="email" _id="email" _placeholder="Ihr E-Mail-Adresse">
						E-Mail
					</KolInputEmail>
				</div>
			</KolAccordion>
			<KolAccordion _heading="Zahlungsdaten" _level={2}>
				<div slot="content">
					<KolSelect
						_value="Rechnung"
						_required
						_name="zahlart"
						_id="zahlart"
						_list={KoliBriDevHelper.stringifyJson([
							{ value: 'Bar', label: 'Bar' },
							{ value: 'Rechnung', label: 'Rechnung' },
							{ value: 'Lastschrift', label: 'Lastschrift' },
						])}
					>
						Zahlunsgmittel
					</KolSelect>
					<KolDetails _summary="Hinweis" _open>
						Bitte beachten Sie, das wir bargeldlose Zahlungsmittel bevorzugen.
					</KolDetails>
					<KolInputText _required _name="inhaber" _id="inhaber" _placeholder="Kontoinhaber" _type="text">
						Kontoinhaber
					</KolInputText>
					<KolInputText _required _name="iban" _id="iban" _placeholder="IBAN" _type="text">
						IBAN
					</KolInputText>
					<KolInputText _required _name="bic" _id="bic" _placeholder="BIC" _type="text">
						BIC
					</KolInputText>
					<KolInputText _required _name="bank" _id="bank" _placeholder="Name der Bank" _type="text">
						Bank
					</KolInputText>
				</div>
			</KolAccordion>
			<KolAccordion _heading="Kundenkonto" _level={2}>
				<div slot="content">
					<KolInputText _value="" _required _name="username" _id="username" _placeholder="Benutzername" _type="text">
						Benutzername
					</KolInputText>
					<KolIndentedText>Der Benutzername ist für die Anmeldung erforderlich</KolIndentedText>
					<KolInputText _required _name="password" _id="password" _placeholder="Passwort" _type="text">
						Passwort
					</KolInputText>
					<KolIndentedText>
						Wählen Sie ein sicheres Passwort. Mindestlänge: 12 Zeichen, mit Groß- und Kleinschreibung, Zahlen und Sonderzeichen wie #!?_
					</KolIndentedText>
				</div>
			</KolAccordion>
			<KolAccordion _heading="Zusammenfassung" _level={2}>
				<div slot="content">
					<KolInputCheckbox _value="" _required _name="acceptds" _id="acceptds" _type="checkbox">
						Ich habe die <KolLink _href="#">Datenschutzerklärung</KolLink> gelesen und zur Kenntnis genommen
					</KolInputCheckbox>
					<KolInputCheckbox _value="" _required _name="acceptag" _id="acceptag" _type="checkbox">
						Ich habe die <KolLink _href="#">Allgemeinen Geschäftsbedingungen</KolLink> gelesen und zur Kenntnis genommen
					</KolInputCheckbox>
					<KolInputCheckbox _value="" _name="newsletter" _id="newsletter" _as-switch _type="checkbox">
						Ich möchte den Newsletter abonnieren
					</KolInputCheckbox>
					<KolButton _label="Absenden" _icon="icofont-envelope" />
				</div>
			</KolAccordion>
		</div>
	</KolForm>
);
Form.args = {
	...DefaultArgs,
};
Form.storyName = 'Formular';
