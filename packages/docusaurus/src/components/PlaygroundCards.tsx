import { KolLinkButton } from '@public-ui/react';
import React from 'react';
import { FunctionComponent } from 'react';

interface Playground {
	name: string;
	image: string;
	url: string;
	description: JSX.Element;
}

const PLAYGROUNDS: Playground[] = [
	{
		name: '📦 CodeSandbox',
		image: 'codesandbox.png',
		url: 'https://codesandbox.io/s/minimal-kolibri-sample-oj7pee',
		description: <></>,
	},
	{
		name: '⚡ StackBlitz',
		image: 'stackblitz.png',
		url: 'https://stackblitz.com/edit/react-ts-sy6knj',
		description: <></>,
	},
];

const PlaygroundCard: FunctionComponent<Playground> = ({ name, image, url, description }) => (
	<div className="grid gap-2">
		<h3>{name}</h3>
		<img src={`/assets/playgrounds/${image}`} alt={`Vorschau des Playground ${name}'s`} />
		<p>{description}</p>
		<div className="text-center">
			<KolLinkButton _href={url} _label="Jetzt ausprobieren!" _target="${image}"></KolLinkButton>
		</div>
	</div>
);

export const PlaygroundCards: FunctionComponent = () => (
	<div className="grid gap-8 md:grid-cols-2">
		{PLAYGROUNDS.map((item, idx) => (
			<PlaygroundCard key={idx} {...item} />
		))}
	</div>
);

export default PlaygroundCards;
