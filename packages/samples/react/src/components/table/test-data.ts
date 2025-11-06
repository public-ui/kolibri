export type Data = {
	order: number;
	name: string;
	vorname: string;
	geburtsdatum: Date;
	strasse: string;
	hausNr: string;
	plz: string;
	ort: string;
};

export const DATA: Data[] = [
	{
		order: 0,
		name: 'Müller',
		vorname: 'Thomas',
		geburtsdatum: new Date('1985-03-15'),
		strasse: 'Hauptstraße',
		hausNr: '42',
		plz: '10115',
		ort: 'Berlin',
	},
	{
		order: 1,
		name: 'Schmidt',
		vorname: 'Anna',
		geburtsdatum: new Date('1992-07-22'),
		strasse: 'Bahnhofstraße',
		hausNr: '15',
		plz: '80331',
		ort: 'München',
	},
	{
		order: 2,
		name: 'Fischer',
		vorname: 'Michael',
		geburtsdatum: new Date('1978-11-08'),
		strasse: 'Gartenweg',
		hausNr: '7',
		plz: '20095',
		ort: 'Hamburg',
	},
	{
		order: 3,
		name: 'Weber',
		vorname: 'Sarah',
		geburtsdatum: new Date('1990-05-30'),
		strasse: 'Lindenallee',
		hausNr: '23a',
		plz: '50667',
		ort: 'Köln',
	},
	{
		order: 4,
		name: 'Wagner',
		vorname: 'Daniel',
		geburtsdatum: new Date('1983-09-12'),
		strasse: 'Kirchstraße',
		hausNr: '8',
		plz: '60311',
		ort: 'Frankfurt',
	},
	{
		order: 5,
		name: 'Becker',
		vorname: 'Julia',
		geburtsdatum: new Date('1995-02-18'),
		strasse: 'Rosenweg',
		hausNr: '12',
		plz: '70173',
		ort: 'Stuttgart',
	},
	{
		order: 6,
		name: 'Schulz',
		vorname: 'Markus',
		geburtsdatum: new Date('1988-12-03'),
		strasse: 'Bergstraße',
		hausNr: '56',
		plz: '40213',
		ort: 'Düsseldorf',
	},
	{
		order: 7,
		name: 'Hoffmann',
		vorname: 'Laura',
		geburtsdatum: new Date('1991-06-25'),
		strasse: 'Waldweg',
		hausNr: '3',
		plz: '04109',
		ort: 'Leipzig',
	},
	{
		order: 8,
		name: 'Koch',
		vorname: 'Sebastian',
		geburtsdatum: new Date('1987-04-14'),
		strasse: 'Marktplatz',
		hausNr: '19',
		plz: '01067',
		ort: 'Dresden',
	},
	{
		order: 9,
		name: 'Bauer',
		vorname: 'Lisa',
		geburtsdatum: new Date('1993-10-07'),
		strasse: 'Schillerstraße',
		hausNr: '45',
		plz: '30159',
		ort: 'Hannover',
	},
];
