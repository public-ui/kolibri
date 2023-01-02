import React from 'react';
import { KolIcon, KolLink, KolLinkButton } from '@public-ui/react';

type FeatureItem = {
	icon: string;
	title: string;
	description: JSX.Element;
	button: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		icon: 'fa-solid fa-palette',
		title: 'Designer',
		description: (
			<>
				<p>
					Die semantisch barrierefreien und robusten Web Components können nahtlos in anderen Komponenten-Bibliotheken oder Design Systemen wiederverwendet
					werden. Mittels des{' '}
					<KolLink _href="/designer" _target="designer">
						Designers
					</KolLink>{' '}
					können die Komponenten an beliebige Styleguides oder Designs angepasst werden.
				</p>
			</>
		),
		button: <KolLinkButton _href="docs/concepts/styling/theming" _label="Styling & Design"></KolLinkButton>,
	},
	{
		icon: 'fa-solid fa-code',
		title: 'Developer',
		description: (
			<>
				<p>
					Die semantisch barrierefreien und robusten Web Components lassen sich nahtlos in webbasierten Projekten wiederverwenden. Neben der direkten Verwendung
					der Web Components bieten wir auch Framework-Adapter für Angular, React, Preact und Solid an. Und es geht noch{' '}
					<KolLink _href="docs/get-started/frameworks">mehr</KolLink> !
				</p>
			</>
		),
		button: <KolLinkButton _href="docs/get-started/frameworks" _label="Frameworks"></KolLinkButton>,
	},
	{
		icon: 'fa-solid fa-layer-group',
		title: 'Components',
		description: (
			<>
				<p>
					Die Komponentenvielfalt umfasst mittlerweile mehr als <KolLink _href="docs/components">40 Komponenten</KolLink> mit einem hohen Funktionsumfang für
					die Umsetzung verschiedenster Fachanwendungen. Mit jedem Release verbessern, erweitern und optimieren wir die Fähigkeiten unserer
					Komponenten-Bibliothek.
				</p>
			</>
		),
		button: <KolLinkButton _href="docs/category/komponenten" _label="Komponenten"></KolLinkButton>,
	},
];

function Feature({ title, icon, description, button }: FeatureItem) {
	return (
		<div className="grid gap-4 content-baseline text-center">
			<KolIcon className="text-8xl text-gray-700" _ariaLabel="" _icon={icon}></KolIcon>
			<h3 className="m-0">{title}</h3>
			<div className="grid gap-2 text-justify">{description}</div>
			<div className="grid sm:inline text-center">{button}</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className="m-8 grid gap-8 lg:grid-cols-3">
			{FeatureList.map((props, idx) => (
				<Feature key={idx} {...props} />
			))}
		</section>
	);
}
