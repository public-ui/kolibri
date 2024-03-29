import type { FC } from 'react';
import React from 'react';

import { KolLink } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const LinkBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind Beispiele für verschiedene Links.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolLink _href="#/back-page" _label="Simple Link" />
			<KolLink _disabled _href="#/back-page" _label="Simple Link (deaktiviert)" />
			<KolLink _hideLabel _icons="codicon codicon-home" _href="#/back-page" _label="Icon Link" />
			<KolLink _disabled _hideLabel _icons="codicon codicon-home" _href="#/back-page" _label="Icon Link (deaktiviert)" />
			<p>
				In diesem Absatz wird ein Link gesetzt, der keine weiteren Attribute enthält. <KolLink _href="#/back-page" _label="Simple Link" /> Er wird standardmäßig
				als <strong>inline-Element</strong> ausgegeben.
			</p>
			<p>
				In diesem Absatz wird ein Link gesetzt, der einmal als inline-block-Element ausgegeben wird.{' '}
				<KolLink class="d-inline-block" _accessKey="S" _href="#/back-page" _label="Simple Link" />. Damit kann man mir per CSS-Styles eine Breite, eine Höhe und
				andere Eigenschaften zuweisen.
				<br />
				<br />
				Danach folgt ein Link, der als block-Element ausgegeben wird. <KolLink class="d-block" _href="#/back-page" _label="Simple Link" />, daher gehe ich über
				die ganze Breite des Eltern-Elements erzeuge so einen Zeilenumbruch.
			</p>
		</div>
	</>
);
