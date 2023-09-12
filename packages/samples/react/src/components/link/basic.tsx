import React from 'react';
import { KolLink } from '@public-ui/react';

import { FC } from 'react';

export const LinkBasic: FC = () => (
	<div className="grid gap-4">
		<KolLink _href="#" _label="Simple Link" />
		<p>
			In diesem Absatz wird ein Link gesetzt, der keine weiteren Attribute enthält. <KolLink _href="#" _label="Simple Link" /> Er wird standardmäßig als{' '}
			<strong>inline-Element</strong> ausgegeben.
		</p>
		<p>
			In diesem Absatz wird ein Link gesetzt, der einmal als inline-block-Element ausgegeben wird.{' '}
			<KolLink class="d-inline-block" _href="#" _label="Simple Link" />. Damit kann man mir per CSS-Styles eine Breite, eine Höhe und andere Eigenschaften
			zuweisen.
			<br />
			<br />
			Danach folgt ein Link, der als block-Element ausgegeben wird.
			<KolLink class="d-block" _href="#" _label="Simple Link" />, daher gehe ich über die ganze Breite des Eltern-Elements erzeuge so einen Zeilenumbruch.
		</p>
	</div>
);
