import React from 'react';

import { KolButtonLink } from '@public-ui/react';

import type { FC } from 'react';

export const ButtonLinkBasic: FC = () => (
	<div className="grid gap-4">
		<p>
			In diesem Absatz wird ein Link gesetzt, der keine weiteren Attribute enthält. <KolButtonLink _label="Simple Link" /> Er wird standardmäßig als{' '}
			<strong>inline-Element</strong> ausgegeben.
		</p>
		<p>
			In diesem Absatz wird ein Link gesetzt, der einmal als inline-block-Element ausgegeben wird.{' '}
			<KolButtonLink style={{ display: 'inline-block', margin: '1rem', border: '1px dotted' }} _label="Simple Link" />. Damit kann man mir per CSS-Styles eine
			Breite, eine Höhe und andere Eigenschaften zuweisen.
			<br />
			<br />
			Danach folgt ein Link, der als block-Element ausgegeben wird.
			<KolButtonLink style={{ display: 'block' }} _label="Simple Link" />
			Daher gehe ich über die ganze Breite des Eltern-Elements erzeuge so einen Zeilenumbruch.
		</p>
		<p>
			<KolButtonLink _label="Disabled ButtonLink" _disabled />
		</p>
	</div>
);
