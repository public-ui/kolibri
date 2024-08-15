const FORMULAR_FORM = LeanUpForm.FormFactory.createForm('anschrift', {
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

console.log(FORMULAR_FORM);

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
ANREDE_NACHNAME_INPUT.label = 'Nachname';

ANREDE_VORNAME_INPUT.changeListeners.add((...args) => {
	console.log(...args);
});

class DemoFehler extends LeanUpForm.AbstractValidator {
	constructor() {
		super('Test');
	}
	isValid(value) {
		if ((typeof value === 'string' && value.length > 5) || (typeof value === 'boolean' && value === false)) {
			return false;
		}
		return true;
	}
}

class DemoFormatter extends LeanUpForm.AbstractFormatter {
	format(value) {
		return value.toLocaleUpperCase();
	}
	parse(value) {
		return value;
	}
}

class Demo4SignSepFormatter extends LeanUpForm.AbstractFormatter {
	format(value) {
		const words = value.match(/(.{1,4})/g);
		return Array.isArray(words) ? words.join(' ') : value;
	}
	parse(value) {
		return value.replace(/ +/g, '');
	}
}

class DemoMaxLength extends LeanUpForm.AbstractFormatter {
	format(value) {
		return value;
	}
	parse(value) {
		return value.substring(0, 6);
	}
}

const VALIDATION_HANDLER = new LeanUpForm.ValidationHandler();
VALIDATION_HANDLER.validators.add(new DemoFehler());
ANREDE_VORNAME_INPUT.setValidationHandler(VALIDATION_HANDLER);
ANREDE_NACHNAME_INPUT.setValidationHandler(VALIDATION_HANDLER);

const FORMAT_HANDLER = new LeanUpForm.FormatHandler();
FORMAT_HANDLER.formatters.add([new DemoFormatter(), new Demo4SignSepFormatter(), new DemoMaxLength()]);
ANREDE_VORNAME_INPUT.setFormatHandler(FORMAT_HANDLER);

document.querySelector('#kol-input-text')._control = ANREDE_VORNAME_INPUT;

// console.log(VALIDATION_HANDLER);
// console.log(ANREDE_VORNAME_INPUT);
// console.log(ANREDE_NACHNAME_INPUT);

const ADRESSE_FORM = ANSCHRIFT_FORM.getControl('adresse');
const ADRESSE_STRASSE_INPUT = ADRESSE_FORM.getControl('strasse');
const ADRESSE_HAUSNUMMER_INPUT = ADRESSE_FORM.getControl('hausnummer');
const ADRESSE_PLZ_INPUT = ADRESSE_FORM.getControl('plz');
const ADRESSE_ORT_INPUT = ADRESSE_FORM.getControl('ort');

ADRESSE_STRASSE_INPUT.label = 'Straße';
ADRESSE_HAUSNUMMER_INPUT.label = 'Hausnummer';
ADRESSE_PLZ_INPUT.label = 'Postleitzahl';
ADRESSE_ORT_INPUT.label = 'Ort';

const STATUS_INPUT = FORMULAR_FORM.getControl('status');
const EMAIL_INPUT = FORMULAR_FORM.getControl('email');
const TEXT_INPUT = FORMULAR_FORM.getControl('text');
const BETRAG_INPUT = FORMULAR_FORM.getControl('betrag');
const AGB_INPUT = FORMULAR_FORM.getControl('agb');
const DATENSCHUTZ_INPUT = FORMULAR_FORM.getControl('datenschutz');

STATUS_INPUT.label = 'Status';
EMAIL_INPUT.label = 'E-Mail-Adresse';
// EMAIL_INPUT.mandatory = true;
EMAIL_INPUT.info = 'Bitte geben Sie hier eine E-Mail-Adresse ein.';
TEXT_INPUT.label = 'Text';
TEXT_INPUT.mandatory = true;
TEXT_INPUT.setValidationHandler(VALIDATION_HANDLER);
BETRAG_INPUT.label = 'Betrag';
BETRAG_INPUT.mandatory = true;
BETRAG_INPUT.setValidationHandler(VALIDATION_HANDLER);
AGB_INPUT.label = 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen.';
AGB_INPUT.mandatory = true;
AGB_INPUT.setValidationHandler(VALIDATION_HANDLER);
DATENSCHUTZ_INPUT.label = 'Ich akzeptiere die Datenschutzerklärung.';

const PASSWORD_INPUT = FORMULAR_FORM.getControl('password');
const DATUM_INPUT = FORMULAR_FORM.getControl('datum');
PASSWORD_INPUT.label = 'Passwort';
DATUM_INPUT.label = 'Datum';

ANREDE_ANSPRACHE_INPUT.readonly = true;
ANREDE_ANSPRACHE_INPUT.changeListeners.add((value) => {
	ANREDE_VORNAME_INPUT.disabled = !ANREDE_VORNAME_INPUT.disabled;
	ANREDE_NACHNAME_INPUT.readonly = !ANREDE_NACHNAME_INPUT.readonly;
	AGB_INPUT.readonly = !AGB_INPUT.readonly;
	DATENSCHUTZ_INPUT.disabled = !DATENSCHUTZ_INPUT.disabled;
});
ANREDE_VORNAME_INPUT.changeListeners.add(() => {
	// document.querySelector('#vorname').setAttribute('_error', ANREDE_VORNAME_INPUT.error);
});
ANREDE_NACHNAME_INPUT.changeListeners.add(() => {
	document.querySelector('#nachname').setAttribute('_readonly', ANREDE_NACHNAME_INPUT.readonly);
});
// EMAIL_INPUT.changeListeners.add(() => {
// 	document.querySelector('#email').setAttribute('_error', EMAIL_INPUT.error);
// 	document.querySelector('#email').setAttribute('_disabled', EMAIL_INPUT.disabled);
// });
// AGB_INPUT.changeListeners.add((value) => {
//   ANREDE_ANSPRACHE_INPUT.disabled = !ANREDE_ANSPRACHE_INPUT.disabled;
// });

function domReady() {
	document.querySelector('#anrede-adapter')._control = ANREDE_ANSPRACHE_INPUT;
	const ANREDE_ANSPRACHE_OPTIONS = [
		{
			label: 'Herr',
			value: 'Herr',
		},
		{
			label: 'Frau',
			value: 'Frau',
		},
	];
	document.querySelectorAll('kol-input-radido').forEach((inputRadio) => {
		inputRadio._list = ANREDE_ANSPRACHE_OPTIONS;
		inputRadio._on = {
			onChange: console.log,
		};
	});

	// document.querySelector('#vorname')._control = ANREDE_VORNAME_INPUT;
	// document.querySelector('#nachname')._control = ANREDE_NACHNAME_INPUT;

	document.querySelector('kol-form').addEventListener('submit', (event) => {
		event.stopPropagation();
		console.log(event, ANREDE_FORM.getData());
	});
	// document.querySelector('#strasse')._control = ADRESSE_STRASSE_INPUT;
	// document.querySelector('#hausnummer')._control = ADRESSE_HAUSNUMMER_INPUT;
	// document.querySelector('#plz')._control = ADRESSE_PLZ_INPUT;
	// document.querySelector('#ort')._control = ADRESSE_ORT_INPUT;

	// document.querySelector('#status')._control = STATUS_INPUT;
	const STATUS_OPTIONS = [
		{
			value: null,
			label: '- keine Auswahl -',
		},
		{
			label: 'Optgroup 1',
			options: [
				{
					value: 'a1',
					label: 'A1',
				},
				{
					disabled: true,
					value: 'b1',
					label: 'B1',
				},
				{
					label: 'Optgroup 2',
					options: [
						{
							value: 'a2',
							label: 'A2',
						},
						{
							value: 'b2',
							label: 'B2',
						},
					],
				},
				{
					value: 'c1',
					label: 'C1',
				},
			],
		},
		{
			value: '1',
			label: 'Gute Laune',
		},
		{
			value: '2',
			label: 'Geht so',
		},
		{
			value: '3',
			label: 'Schlechte Laune',
		},
		{
			value: '4',
			label: 'ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
		},
	];
	// document.querySelector('#status')._options = STATUS_OPTIONS;

	// document.querySelector('#email')._control = EMAIL_INPUT;
	// document.querySelector('#email').setAttribute('_mandatory', EMAIL_INPUT.mandatory);
	// document.querySelector('#email').setAttribute('_info', EMAIL_INPUT.info);

	// document.querySelector('#texteingabe')._control = TEXT_INPUT;
	// document.querySelector('#slider')._control = BETRAG_INPUT;

	document.querySelectorAll('.datenschutz-checkbox').forEach((input) => {
		input._control = AGB_INPUT;
	});
	document.querySelector('#new-input-checkbox')._control = AGB_INPUT;
	document.querySelector('#new-input-checkbox-leanup')._control = AGB_INPUT;
	document.querySelectorAll('kol-input-radio.herr-frau').forEach((input) => {
		input._list = ANREDE_ANSPRACHE_OPTIONS;
	});

	document.querySelector('#kol-input-text')._control = ANREDE_VORNAME_INPUT;
	document.querySelector('kol-input-text.vorname')._list = NAMEN;

	document.querySelector('#new-input-email')._control = EMAIL_INPUT;
	document.querySelector('#new-input-color')._control = new LeanUpForm.InputControl('color', {
		label: 'Farbe',
		value: '#ff0000',
	});
	document.querySelector('#new-input-file')._control = new LeanUpForm.InputControl('file', {
		label: 'Datei(en) hochladen',
	});
	document.querySelector('#new-input-range')._control = BETRAG_INPUT;

	document.querySelector('#new-textarea')._control = TEXT_INPUT;
	const interval = setInterval(() => {
		TEXT_INPUT.value = `${TEXT_INPUT.value}A`;
		document.querySelector('kol-textarea[_hide-label=""]')._value = TEXT_INPUT.value;
	}, 1000);
	const timeout = setTimeout(() => {
		clearInterval(interval);
		clearTimeout(timeout);
	}, 10);
	STATUS_INPUT.value = `['c1','2']`;
	document.querySelectorAll('kol-select').forEach((select) => {
		select._on = {
			onChange: console.log,
		};
	});
	document.querySelectorAll('kol-select.list4value').forEach((select) => {
		select._list =
			"[{'value':null,'label':'- keine Auswahl -'},{'label':'Optgroup 1','options':[{'value':'a1','label':'A1'},{'disabled':true,'value':'b1','label':'B1'},{'label':'Optgroup 2','options':[{'value':'a2','label':'A2'},{'value':'b2','label':'B2'}]},{'value':'c1','label':'C1'}]},{'value':'1','label':'Gute Laune'},{'value':'2','label':'Geht so'},{'value':'3','label':'Schlechte Laune'},{'value':'4','label':'ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen'}]";
	});
	document.querySelectorAll('kol-select.value4list').forEach((select) => {
		select._value = STATUS_INPUT.value;
	});
	setTimeout(() => {
		document.querySelectorAll('kol-select.value4list').forEach((select) => {
			select._list =
				"[{'value':null,'label':'- keine Auswahl -'},{'label':'Optgroup 1','options':[{'value':'a1','label':'A1'},{'disabled':true,'value':'b1','label':'B1'},{'label':'Optgroup 2','options':[{'value':'a2','label':'A2'},{'value':'b2','label':'B2'}]},{'value':'c1','label':'C1'}]},{'value':'1','label':'Gute Laune'},{'value':'2','label':'Geht so'},{'value':'3','label':'Schlechte Laune'},{'value':'4','label':'ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen'}]";
		});
		document.querySelectorAll('.select-adapter').forEach((select) => {
			select._control = STATUS_INPUT;
		});
		document.querySelectorAll('kol-select.list4value').forEach((select) => {
			select._value = STATUS_INPUT.value;
		});
	}, 5000);

	document.querySelector('#new-input-date')._control = DATUM_INPUT;

	document.querySelector('#filter-table')._data = DATA;
	document.querySelector('#filter-input')._on = {
		onChange: (event) => {
			console.log(event.target.value);
			document.querySelector('#filter-table')._data = DATA.filter((tupel) => {
				const regExp = new RegExp(event.target.value, 'i');
				return (
					regExp.test(tupel.montag) || regExp.test(tupel.dienstag) || regExp.test(tupel.mittwoch) || regExp.test(tupel.donnerstag) || regExp.test(tupel.freitag)
				);
			});
		},
	};

	var fixSelect = document.querySelector('#fix-select-multi');
	if (fixSelect instanceof HTMLElement) {
		fixSelect._list = [
			{ label: 'Baum', value: Date.now() },
			{ label: 'Baum', value: Date.now() },
		];
		fixSelect._on = {
			// onClick: (...args) => {
			//   console.log('onClick', args);
			// },
			onChange: (...args) => {
				console.log('onChange', args);
				setTimeout(() => {
					fixSelect._list = [{ label: 'Baum', value: Date.now() }].concat(fixSelect._list);
					setTimeout(() => {
						console.log(fixSelect._value);
					}, 100);
				}, 100);
			},
		};
	}
}

document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		setTimeout(domReady, 1000);
	}
};

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

const NAMEN = [
	'Lucy',
	'Lukas',
	'Ella',
	'Konstantin',
	'Amy',
	'Ben',
	'Emely',
	'Jonas',
	'Finja',
	'Elias',
	'Amelie',
	'Niklas',
	'Luise',
	'David',
	'Frieda',
	'Oskar',
	'Katharina',
	'Philipp',
	'Romy',
	'Leon',
	'Juna',
	'Noah',
	'Theresa',
	'Luis',
	'Eva',
	'Paul',
	'Julia',
	'Finn',
	'Anna',
	'Felix',
	'Carla',
	'Julian',
	'Paulina',
	'Maximilian',
	'Elisabeth',
	'Henry',
	'Rosa',
	'Tim',
	'Mia',
	'Karl',
	'Maya',
	'Friedrich',
	'Selma',
	'Peter',
	'Edda',
	'Quirin',
	'Flora',
	'Liam',
	'Berenike',
	'Linus',
	'Simone',
	'Quentin',
	'Elena',
	'Paul',
	'Meike',
	'Johannes',
	'Susanne',
	'Alexander',
	'Annika',
	'Anton',
	'Augusta',
	'Aras',
	'Alba',
	'Asis',
	'Wilma',
	'Adrian',
	'Annegret',
	'Arthur',
	'Aglaia',
	'Adam',
	'Aaliyah',
	'Arian',
	'Annabelle',
	'Amos',
	'Alma',
	'Arik',
	'Alicia',
	'Ake',
	'Anette',
	'Altfried',
	'Astrid',
	'Ari',
	'Anisha',
	'Andreas',
	'Antke',
	'Allessandro',
	'Abigail',
	'Achim',
	'Aideen',
	'Ben',
	'Aini',
	'Bela',
	'Aida',
	'Baldur',
	'Aamenah',
	'Benedikt',
	'Ariane',
	'Beat',
	'Adriana',
	'Bernd',
	'Alexandra',
	'Bertram',
	'Ava',
	'Blue',
	'Arielle',
	'Badi',
	'Allissa',
	'Batiste',
	'Aamu',
	'Bastian',
	'Arzu',
	'Caleb',
	'Anouk',
	'Caspar',
	'Andrea',
	'Calvin',
	'Bianca',
	'Cadmus',
	'Blanka',
	'Christoph',
	'Benita',
	'Cedrik',
	'Bettina',
	'Camern',
	'Bamika',
	'Carsten',
	'Bente',
	'Cainan',
	'Barbara',
	'Cem',
	'Berit',
	'Carl',
	'Bentje',
	'Cyranus',
	'Birte',
	'Curt',
	'Brigitte',
	'Daniel',
	'Christiane',
	'Dominik',
	'Charlotte',
	'Darius',
	'Catherina',
	'Dario',
	'Caroline',
	'Dag',
	'Caren',
	'Diminic',
	'Caecilia',
	'Damian',
	'Celine',
	'Diego',
	'Coco',
	'Dieter',
	'Chaya',
	'Demian',
	'Dalia',
	'Dewis',
	'Deenah',
	'Dirk',
	'Daphne',
	'Donald',
	'Delia',
	'Enzo',
	'Dari',
	'Emil',
	'Doerte',
	'Erik',
	'Djamila',
	'Edwin',
	'Dominique',
	'Eliah',
	'Doerte',
	'Ethan',
	'Dorothee',
	'Erwin',
	'Emira',
	'Eliot',
	'Emily',
	'Enes',
	'Elif',
	'Emilio',
	'Ellen',
	'Ebbo',
	'Enna',
	'Eberhard',
	'Ebba',
	'Edgar',
	'Eleni',
	'Fabrizius',
	'Freya',
	'Finn',
	'Fiona',
	'Fabian',
	'Franziska',
	'Fabio',
	'Luzia',
	'Finjas',
	'Fabienne',
	'Franz',
	'Mädchen',
	'Jungen',
	'Fiona',
	'Falko',
	'Felina',
	'Fatih',
	'Felicitas',
	'Fynn',
	'Fabia',
	'Flavio',
	'Fabiola',
	'Fady',
	'Fabrizia',
	'Fritz',
	'Filomae',
	'Falko',
	'Floris',
	'Gabriel',
	'Fae',
	'Gustav',
	'Fanny',
	'Guiseppe',
	'Fritzi',
	'Günter',
	'Greta',
	'Gerhard',
	'Gabrielle',
	'Georg',
	'Grit',
	'Gel',
	'Gwen',
	'Gerald',
	'Gabi',
	'Geoffrey',
	'Gila',
	'Gismund',
	'Giorgina',
	'Giulio',
	'Gisele',
	'Godo',
	'Heike',
	'Henri',
	'Hanna',
	'Hannes',
	'Helena',
	'Henry',
	'Haima',
	'Henrik',
	'Heike',
	'Hendrik',
	'Helen',
	'Heiko',
	'Isabell',
	'Haku',
	'Ida',
	'Hanno',
	'Ilona',
	'Hugo',
	'Ingrid',
	'Henryk',
	'Iris',
	'Hardy',
	'Ira',
	'Hagar',
	'Iara',
	'Hafiz',
	'Ivette',
	'Haile',
	'Irma',
	'Hakan',
	'Jardis',
	'Hasso',
	'Juni',
	'Harry',
	'Juna',
	'Hauke',
	'Josephine',
	'Harun',
	'Jella',
	'Hayo',
	'Jill',
	'Idil',
	'Jennifer',
	'Ian',
	'Jakobine',
	'Izzy',
	'Jessika',
	'Ibrahim',
	'Julie',
	'Igor',
	'Jasmin',
	'Jack',
	'Joana',
	'Jules',
	'Jaqueline',
	'Julian',
	'Jonna',
	'Jan',
	'Jean',
	'Jakob',
	'Janis',
	'Jaap',
	'Jodi',
	'Jonathan',
	'Jen',
	'Jannik',
	'Justyna',
	'Jona',
	'Jutta',
	'Jannis',
	'Kathleen',
	'Joel',
	'Kayra',
	'Jonte',
	'Klara',
	'Jarin',
	'Kiara',
	'Jörn',
	'Kathrin',
	'Jari',
	'Catrin',
	'Jannik',
	'Kiki',
	'Jukka',
	'Judith',
	'Samo',
	'Celia',
	'Jaakov',
	'Kaaria',
	'Jeremy',
	'Kerstin',
	'Jarne',
	'Kim',
	'Kilian',
	'Kader',
	'Kai',
	'Kaisa',
	'Kylan',
	'Liv',
	'Kristian',
	'Livia',
	'Kasper',
	'Louisa',
	'Kadmos',
	'Lucy',
	'Klaus',
	'Lina',
	'Kaarle',
	'Lena',
	'Kevin',
	'Leonie',
	'Kadir',
	'Lea',
	'Konrad',
	'Leni',
	'Lukas',
	'Lotta',
	'Leon',
	'Laura',
	'Leopold',
	'Lara',
	'Luca',
	'Lia',
	'Linas',
	'Lisa',
	'Roland',
	'Luna',
	'Leo',
	'Linda',
	'Lennard',
	'Laureen',
	'Luke',
	'Liv',
	'Lenny',
	'Liz',
	'Lasse',
	'Mona',
	'Lion',
	'Mareen',
	'Luca',
	'Mathilda',
	'Lutz',
	'Marlene',
	'Levi',
	'Marianne',
	'Matthias',
	'Mara',
	'Moritz',
	'Mina',
	'Meteo',
	'Magdalena',
	'Mats',
	'Miriam',
	'Matthis',
	'Marianne',
	'Mattes',
	'Martje',
	'Milo',
	'Maeve',
	'Mika',
	'Mae',
	'Maxim',
	'Mädchen',
	'Jungen',
	'Nadja',
	'Marlon',
	'Nadine',
	'Mark',
	'Nele',
	'Matti',
	'Nora',
	'Max',
	'Nina',
	'Morris',
	'Nada',
	'Miran',
	'Nadeshda',
	'Miro',
	'Nancy',
	'Niklas',
	'Nova',
	'Nika',
	'Nika',
	'Niko',
	'Nike',
	'Nabil',
	'Oda',
	'Noel',
	'Odilie',
	'Nils',
	'Okka',
	'Nick',
	'Olea',
	'Neo',
	'Odett',
	'Nadeem',
	'Olivia',
	'Namo',
	'Odilia',
	'Nepomuk',
	'Oana',
	'Oscar',
	'Pia',
	'Ole',
	'Paula',
	'Oliver',
	'Phlomena',
	'Olivier',
	'Paloma',
	'Onur',
	'Paris',
	'Owen',
	'Paola',
	'Obbo',
	'Poppy',
	'Idil',
	'Panja',
	'Otto',
	'Pardis',
	'Oswald',
	'Quirine',
	'Paul',
	'Quinta',
	'Phil',
	'Qara',
	'Patrick',
	'Ria',
	'Paavo',
	'Rita',
	'Pamir',
	'Raina',
	'Pascal',
	'Rabea',
	'Peter',
	'Radost',
	'Quinn',
	'Rabi',
	'Quazim',
	'Ronina',
	'Kasimir',
	'Rae',
	'René',
	'Radia',
	'Riko',
	'Svea',
	'Robin',
	'Smila',
	'Raphael',
	'Sofia',
	'Rudi',
	'Sonja',
	'Remigius',
	'Sophie',
	'Richard',
	'Stella',
	'Radi',
	'Sarah',
	'Rainer',
	'Silvie',
	'Rasmus',
	'Silke',
	'Ruben',
	'Sila',
	'Samuel',
	'Siri',
	'Stefan',
	'Sarah',
	'Sascha',
	'Saara',
	'Serkan',
	'Svenja',
	'Marco',
	'Sabine',
	'Manuel',
	'Sandra',
	'Tom',
	'Tiffanie',
	'Tim',
	'Thea',
	'Theo',
	'Tilda',
	'Theodor',
	'Tardis',
	'Thilo',
	'Tamina',
	'Till',
	'Tamy',
	'Timo',
	'Trudi',
	'Tino',
	'Tea',
	'Tiny',
	'Tima',
	'Taylor',
	'Tabia',
	'Titus',
	'Tassja',
	'Tristan',
	'Tilla',
	'Tizian',
	'Tabita',
	'Todd',
	'Tahua',
	'Thomas',
	'Uli',
	'Taavi',
	'Ulrike',
	'Tillmann',
	'Ute',
	'Uwe',
	'Uda',
	'Udo',
	'Ulla',
	'Ugor',
	'Ulrika',
	'Ulrich',
	'Ulva',
	'Uli',
	'Ulvi',
	'Ulas',
	'Uma',
	'Ulf',
	'Violeta',
	'Volker',
	'Victoria',
	'Vinzent',
	'Vanessa',
	'Valentin',
	'Valentine',
	'Vitus',
	'Valeska',
	'Volker',
	'Wandy',
	'Valentin',
	'Waris',
	'Vidu',
	'Walli',
	'Valerio',
	'Waltraud',
	'Wilhelm',
	'Wanda',
	'William',
	'Xenia',
	'Will',
	'Xani',
	'Walter',
	'Xanthe',
	'Wanja',
	'Yvonne',
	'Wadi',
	'Yu',
	'Walid',
	'Yla',
	'Xaver',
	'Zoe',
	'Yannis',
	'Zilla',
	'Yannik',
	'Zuri',
	'Yoshi',
	'Zamira',
	'Yunus',
];

document.querySelector('kol-input-text.vorname')._list = NAMEN;
