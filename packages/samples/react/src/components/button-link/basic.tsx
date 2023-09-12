import React from 'react';
import { KolButtonLink } from '@public-ui/react';

import { FC } from 'react';

export const ButtonLinkBasic: FC = () => (
	<div className="grid gap-4">
		<KolButtonLink _href="#" _label="Simple Link" />
		<p>
			In diesem Absatz wird ein Link gesetzt, der keine weiteren Attribute enthält. <KolButtonLink _href="#" _label="Simple Link" /> Er wird standardmäßig als{' '}
			<strong>inline-Element</strong> ausgegeben.
		</p>
		<p>
			In diesem Absatz wird ein Link gesetzt, der einmal als inline-block-Element ausgegeben wird.{' '}
			<KolButtonLink class="d-inline-block" _href="#" _label="Simple Link" />. Damit kann man mir per CSS-Styles eine Breite, eine Höhe und andere Eigenschaften
			zuweisen.
			<br />
			<br />
			Danach folgt ein Link, der als block-Element ausgegeben wird.
			<KolButtonLink class="d-block" _href="#" _label="Simple Link" />, daher gehe ich über die ganze Breite des Eltern-Elements erzeuge so einen Zeilenumbruch.
		</p>
	</div>
);
