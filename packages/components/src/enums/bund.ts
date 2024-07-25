/**
 * Abkürzungen heraussuchen (Stand der Behörden: 02.08.2021)
 *
 * - https://www.bundesregierung.de/breg-de/bundesregierung/bundesministerien
 * - https://www.bundesregierung.de/breg-de/service/jetzt-durchstaaten-de/bundesbehoerden-410626
 * - https://de.wikipedia.org/wiki/Bundesamt_f%C3%BCr_Familie_und_zivilgesellschaftliche_Aufgaben
 */

/**
 * Seiten tauschen
 *
 * /'([a-z äöü,ß-]+)' = '([a-z äöü,ß-]+)'gi => "'$2' = '$1'"
 */

enum Bundesministerium {
	/**
	 * Bundesregierung (BReg)
	 */
	'Die Bundesregierung' = 'BReg',
	'Bundesministerium der Finanzen' = 'BMF',
	'Bundesministerium des Innern, für Bau und Heimat' = 'BMI',
	'Auswärtiges Amt' = 'AA',
	'Bundesministerium für Wirtschaft und Energie' = 'BMWi',
	'Bundesministerium der Justiz und für Verbraucherschutz' = 'BMJV',
	'Bundesministerium für Arbeit und Soziales' = 'BMAS',
	'Bundesministerium der Verteidigung' = 'BMVg',
	'Bundesministerium für Ernährung und Landwirtschaft' = 'BMEL',
	'Bundesministerium für Familie, Senioren, Frauen und Jugend' = 'BMFSFJ',
	'Bundesministerium für Gesundheit' = 'BMG',
	'Bundesministerium für Verkehr und digitale Infrastruktur' = 'BMVI',
	'Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit' = 'BMU',
	'Bundesministerium für Bildung und Forschung' = 'BMBF',
	'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung' = 'BMZ',
}

export const BUNDESMINISTERIEN = Object.getOwnPropertyNames(Bundesministerium);

enum Bundesamt {
	'Beschaffungsamt des Bundesministeriums des Innern' = 'BeschA',
	'Bundesamt für Ausrüstung, Informationstechnik und Nutzung der Bundeswehr' = 'BAAINBw',
	'Bundesamt für äußere Restitutionen' = 'BAR',
	'Bundesamt für Bauwesen und Raumordnung' = 'BBR',
	'Bundesamt für Bevölkerungsschutz und Katastrophenhilfe' = 'BBK',
	// 'Bundesamt für das Personalmanagement der Bundeswehr' = 'BAPersBw',
	'Bundesamt für Familie und zivilgesellschaftliche Aufgaben' = 'BAFzA',
	'Bundesamt für Güterverkehr' = 'BAG',
	// 'Bundesamt für Infrastruktur, Umweltschutz und Dienstleistungen der Bundeswehr' = 'BAIUDBw',
	'Bundesamt für Justiz' = 'BfJ',
	'Bundesamt für Kartographie und Geodäsie' = 'BKG',
	'Bundesamt für kerntechnische Entsorgungssicherheit' = 'BASE',
	'Bundesamt für Migration und Flüchtlinge' = 'BAMF',
	// 'Bundesamt für Naturschutz' = 'BfN',
	// 'Bundesamt für Seeschifffahrt und Hydrographie' = 'BSH',
	'Bundesamt für Sicherheit in der Informationstechnik' = 'BSI',
	// 'Bundesamt für Strahlenschutz' = 'BfS',
	'Bundesamt für Verbraucherschutz und Lebensmittelsicherheit' = 'BVL',
	'Bundesamt für Verfassungsschutz' = 'BfV',
	'Bundesamt für Wirtschaft und Ausfuhrkontrolle' = 'BAFA',
	'Bundesamt für zentrale Dienste und offene Vermögensfragen' = 'BADV',
	'Bundesanstalt für Verwaltungsdienstleistungen' = 'BAV',
	'Bundesarchiv' = 'BArch',
	'Bundesaufsichtsamt für Flugsicherung' = 'BAF',
	'Bundesausgleichsamt' = 'BAA',
	'Bundeskartellamt' = 'BKartA',
	'Bundeskriminalamt' = 'BKA',
	'Bundesnachrichtendienst' = 'BND',
	'Bundesnetzagentur für Elektrizität, Gas, Telekommunikation, Post und Eisenbahnen' = 'BNetzA',
	'Bundespolizeipräsidium' = 'BPOLP',
	'Bundesprüfstelle für jugendgefährdende Medien' = 'BPjM',
	'Bundessortenamt' = 'BSA',
	'Bundessprachenamt' = 'BSprA',
	// 'Bundesstelle für Flugunfalluntersuchung' = 'BFU',
	// 'Bundesstelle für Seeunfalluntersuchung' = 'BSU',
	'Bundesamt für Soziale Sicherung' = 'BAS',
	'Bundesverwaltungsamt' = 'BVA',
	// 'Bundeswehr-Dienstleistungszentren' = 'BwDLZ',
	'Bundeszentralamt für Steuern' = 'BZSt',
	// 'Bundeszentrale für gesundheitliche Aufklärung' = 'BZgA',
	'Deutsches Patent- und Markenamt' = 'DPMA',
	'Eisenbahn-Bundesamt' = 'EBA',
	// 'Generaldirektion Wasserstraßen und Schifffahrt' = 'GDWS',
	'Generalzolldirektion' = 'GZD',
	// 'Havariekommando' = 'HK',
	// 'Hauptzollämter' = 'HZA',
	// 'Kraftfahrt-Bundesamt' = 'KBA',
	// 'Luftfahrt-Bundesamt' = 'LBA',
	// 'Luftfahrtamt der Bundeswehr' = 'LufABw',
	'Militärischer Abschirmdienst' = 'MAD',
	// 'Planungsamt der Bundeswehr' = 'PlgABw',
	// 'Statistisches Bundesamt' = 'Destatis',
	// 'Umweltbundesamt' = 'UBA',
	// 'Wasser- und Schifffahrtsverwaltung des Bundes' = 'WSW',
	'Zentrale Stelle für Informationstechnik im Sicherheitsbereich' = 'ZITiS',
	// 'Zollämter' = 'ZA',
	// 'Zollfahndungsämter' = 'ZFA',
	// 'Zollkriminalamt' = 'ZKA',
	// 'Zollkommissariate' = 'ZKom',
}
export const BUNDESAEMTER = Object.getOwnPropertyNames(Bundesamt);

enum Bundesanstalt {
	'Informationstechnikzentrum Bund' = 'ITZBund',
	// 'Bundesanstalt für Arbeitsschutz und Arbeitsmedizin' = 'BAuA',
	'Bundesanstalt für den Digitalfunk der Behörden und Organisationen mit Sicherheitsaufgaben' = 'BDBOS',
	// 'Bundesanstalt für Finanzdienstleistungsaufsicht' = 'BaFin',
	// 'Bundesanstalt für Geowissenschaften und Rohstoffe' = 'BGR',
	// 'Bundesanstalt für Gewässerkunde' = 'BfG',
	// 'Bundesanstalt für Immobilienaufgaben' = 'BImA',
	// 'Bundesanstalt für IT-Dienstleistungen' = 'DLZ-IT', // aufgelöst 2015
	'Bundesanstalt für Landwirtschaft und Ernährung' = 'BLE',
	// 'Bundesanstalt für Materialforschung und -prüfung' = 'BAM',
	// 'Bundesanstalt für Post und Telekommunikation Deutsche Bundespost' = 'BAnst PT',
	// 'Bundesanstalt für Straßenwesen' = 'BASt',
	'Bundesanstalt Technisches Hilfswerk' = 'THW',
	// 'Bundesanstalt für vereinigungsbedingte Sonderaufgaben' = 'BvS',
	// 'Bundesanstalt für Wasserbau' = 'BAW',
	'Bundesinstitut für Arzneimittel und Medizinprodukte' = 'BfArM',
	// 'Bundesinstitut für Berufsbildung' = 'BIBB',
	'Bundesinstitut für Bevölkerungsforschung' = 'BiB',
	// 'Bundesinstitut für Risikobewertung' = 'BfR',
	'Bundesinstitut für Sportwissenschaft' = 'BISp',
	// 'Bundeszentrale für politische Bildung' = 'bpb',
	// 'Deutsches Archäologisches Institut' = 'DAI',
	// 'Deutsche Nationalbibliothek' = 'DNB',
	// 'Deutscher Wetterdienst' = 'DWD',
	// 'Johann Heinrich von Thünen-Institut – Bundesforschungsinstitut für Ländliche Räume, Wald und Fischerei' = 'TI',
	// 'Julius Kühn-Institut – Bundesforschungsinstitut für Kulturpflanzen' = 'JKI',
	// 'Max Rubner-Institut – Bundesforschungsinstitut für Ernährung und Lebensmittel' = 'MRI',
	// 'Paul-Ehrlich-Institut – Bundesinstitut für Impfstoffe und biomedizinische Arzneimittel' = 'PEI',
	// 'Physikalisch-Technische Bundesanstalt' = 'PTB',
	// 'Robert-Koch-Institut – Bundesinstitut für Infektionskrankheiten und nicht übertragbare Krankheiten' = 'RKI',
}
export const BUNDESANSTALTEN = Object.getOwnPropertyNames(Bundesanstalt);

export const BUND_LOGO_TEXT_MAP = new Map<Bundesamt | Bundesanstalt | Bundesministerium, string[]>();

export { Bundesministerium, Bundesamt, Bundesanstalt };

/* --- Bundesministerien --- */

BUND_LOGO_TEXT_MAP.set(Bundesministerium['Die Bundesregierung'], ['Die', 'Bundesregierung']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium der Finanzen'], ['Bundesministerium', 'der Finanzen']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium des Innern, für Bau und Heimat'], ['Bundesministerium', 'des Inneren, für Bau', 'und Heimat']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Auswärtiges Amt'], ['Auswärtiges Amt']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Wirtschaft und Energie'], ['Bundesministerium', 'für Wirtschaft', 'und Energie']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium der Justiz und für Verbraucherschutz'], [
	'Bundesministerium',
	'der Justiz und',
	'für Verbraucherschutz',
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Arbeit und Soziales'], ['Bundesministerium', 'für Arbeit und Soziales']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium der Verteidigung'], ['Bundesministerium', 'der Verteidigung']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Bildung und Forschung'], ['Bundesministerium', 'für Bildung', 'und Forschung']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Ernährung und Landwirtschaft'], ['Bundesministerium', 'für Ernährung', 'und Landwirtschaft']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Familie, Senioren, Frauen und Jugend'], [
	'Bundesministerium',
	'für Familie, Senioren, Frauen',
	'und Jugend',
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Gesundheit'], ['Bundesministerium', 'für Gesundheit']);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit'], [
	'Bundesministerium',
	'für Umwelt, Naturschutz',
	'und nukleare Sicherheit',
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für Verkehr und digitale Infrastruktur'], [
	'Bundesministerium',
	'für Verkehr und',
	'digitale Infrastruktur',
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium['Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung'], [
	'Bundesministerium',
	'für wirtschaftliche Zusammenarbeit',
	'und Entwicklung',
]);

/* --- Bundesämter --- */

BUND_LOGO_TEXT_MAP.set(Bundesamt['Beschaffungsamt des Bundesministeriums des Innern'], ['Beschaffungsamt', 'des Bundesministeriums', 'des Innern']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Ausrüstung, Informationstechnik und Nutzung der Bundeswehr'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für äußere Restitutionen'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Bauwesen und Raumordnung'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Bevölkerungsschutz und Katastrophenhilfe'], ['Bundesamt', 'für Bevölkerungsschutz', 'und Katastrophenhilfe']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für das Personalmanagement der Bundeswehr'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Familie und zivilgesellschaftliche Aufgaben'], [
	'Bundesamt',
	'für Familie und',
	'zivilgesellschaftliche Aufgaben',
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Güterverkehr'], ['Bundesamt', 'für Güterverkehr']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Infrastruktur, Umweltschutz und Dienstleistungen der Bundeswehr'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Justiz'], ['Bundesamt für', 'Justiz']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Kartographie und Geodäsie'], ['Bundesamt für', 'Kartographie und Geodäsie']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für kerntechnische Entsorgungssicherheit'], ['Bundesamt für', 'kerntechnische', 'Entsorgungssicherheit']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Migration und Flüchtlinge'], ['Bundesamt', 'für Migration', 'und Flüchtlinge']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Naturschutz'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Seeschifffahrt und Hydrographie'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Sicherheit in der Informationstechnik'], ['Bundesamt', 'für Sicherheit in der', 'Informationstechnik']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Strahlenschutz'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Verbraucherschutz und Lebensmittelsicherheit'], [
	'Bundesamt für',
	'Verbraucherschutz und',
	'Lebensmittelsicherheit',
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Verfassungsschutz'], ['Bundesamt für', 'Verfassungsschutz']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Wirtschaft und Ausfuhrkontrolle'], ['Bundesamt', 'für Wirtschaft', 'Ausfuhrkontrolle']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für zentrale Dienste und offene Vermögensfragen'], [
	'Bundesamt',
	'für zentrale Dienste und',
	'offene Vermögensfragen',
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesanstalt für Verwaltungsdienstleistungen'], ['Bundesanstalt', 'für Verwaltungsdienstleistungen']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesarchiv'], ['Das', 'Bundesarchiv']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesaufsichtsamt für Flugsicherung'], ['Bundesaufsichtsamt', 'für Flugsicherung']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesausgleichsamt'], ['Bundesausgleichsamt']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundeskartellamt'], ['Bundeskartellamt']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundeskriminalamt'], ['Bundeskriminalamt']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesnachrichtendienst'], ['Bundesnachrichtendienst']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesnetzagentur für Elektrizität, Gas, Telekommunikation, Post und Eisenbahnen'], ['Bundesnetzagentur']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundespolizeipräsidium'], ['Bundespolizeipräsidium']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesprüfstelle für jugendgefährdende Medien'], ['Bundesprüfstelle', 'für jugendgefährdende', 'Medien']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundessortenamt'], ['Bundessortenamt']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundessprachenamt'], ['Bundessprachenamt']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesstelle für Flugunfalluntersuchung'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesstelle für Seeunfalluntersuchung'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesamt für Soziale Sicherung'], ['Bundesamt', 'für Soziale Sicherung']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundesverwaltungsamt'], ['Bundesverwaltungsamt']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundeswehr-Dienstleistungszentren'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundeszentralamt für Steuern'], ['Bundeszentralamt', 'für Steuern']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Bundeszentrale für gesundheitliche Aufklärung'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Deutsches Patent- und Markenamt'], ['Deutsches', 'Patent- und Markenamt']);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Eisenbahn-Bundesamt'], ['Eisenbahn-Bundesamt']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Generaldirektion Wasserstraßen und Schifffahrt'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Generalzolldirektion'], ['Generalzolldirektion']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Havariekommando'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Hauptzollämter'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Kraftfahrt-Bundesamt'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Luftfahrt-Bundesamt'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Luftfahrtamt der Bundeswehr'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Militärischer Abschirmdienst'], ['Bundesamt für den', 'Militärischen Abschirmdienst']);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Planungsamt der Bundeswehr'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Statistisches Bundesamt'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Umweltbundesamt'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Wasser- und Schifffahrtsverwaltung des Bundes'], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt['Zentrale Stelle für Informationstechnik im Sicherheitsbereich'], [
	'Zentrale Stelle',
	'für Informationstechnik',
	'im Sicherheitsbereich',
]);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Zollämter'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Zollfahndungsämter'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Zollkriminalamt'], []);
// BUND_LOGO_TEXT_MAP.set(Bundesamt['Zollkommissariate'], []);

/*--- Bundesanstalten --- */
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Informationstechnikzentrum Bund'], ['Informations', 'Technik', 'Zentrum Bund']);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Bundesanstalt für den Digitalfunk der Behörden und Organisationen mit Sicherheitsaufgaben'], [
	'Bundesanstalt',
	'für den Digitalfunk der Behörden und',
	'Organisationen mit Sicherheitsaufgaben',
]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Bundesanstalt für Landwirtschaft und Ernährung'], ['Bundesanstalt für', 'Landwirtschaft und Ernährung']);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Bundesanstalt Technisches Hilfswerk'], ['Bundesanstalt', 'Technisches Hilfswerk']);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Bundesinstitut für Arzneimittel und Medizinprodukte'], ['Bundesinstitut', 'für Arzneimittel', 'und Medizinprodukte']);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Bundesinstitut für Bevölkerungsforschung'], ['Bundesinstitut', 'für Bevölkerungsforschung']);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt['Bundesinstitut für Sportwissenschaft'], ['Bundesinstitut', 'für Sportwissenschaft']);
