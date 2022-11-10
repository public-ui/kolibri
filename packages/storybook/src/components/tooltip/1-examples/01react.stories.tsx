import React from 'react';
import { KolAlert, KolTooltip, KolButton, KolDetails } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import { BikBitvTest, STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Tooltip/Beispiele',
	component: KolTooltip,
} as ComponentMeta<typeof KolTooltip>;

export const Anwendung = () => {
	return (
		<BikBitvTest _heading="Tooltip">
			<p>
				Die Tooltip-Komponente implementiert das Gegenstück zum Aria-Label. Es ist also explizit nur dafür vorgesehen, dem/der Nutzer:in ohne Screenreader die
				Beschriftung eines Elementes anzuzeigen.
			</p>
			<KolDetails _summary="Hinweise zur Barrierefreiheit" class="hydrated">
				<p>
					Die Tooltip-Komponente wird bei Focus oder Hover angezeigt und dient ausschließlich dem/der sehenden Nutzer:in ohne Screenreader die Beschriftung
					(Aria-Label) lesen zu können. Der Text des Tooltips ist selbst nicht mit der Tastatur erreichbar und zudem mittels Aria-Hidden für die Screenreader
					versteckt.
				</p>
				<KolAlert _type="info" class="hydrated">
					Aus Sicht des Barrierefreiheitstests können Tooltips ignoriert werden, solange zudem von der Entwicklung sichergestellt wurde, dass der Tooltip-Text
					auch in gleicher Weise vom Screenreader vorgelesen wird.
				</KolAlert>
			</KolDetails>
			<KolButton _label="Oben" _icon="icofont-simple-up" _icon-only="" _tooltip-align="top" _variant="primary"></KolButton>
			<KolButton _label="Unten" _icon="icofont-simple-down" _icon-only="" _tooltip-align="bottom" _variant="secondary"></KolButton>
			<KolButton _label="Links" _icon="icofont-simple-left" _icon-only="" _tooltip-align="left" _variant="normal"></KolButton>
			<KolButton _label="Rechts" _icon="icofont-simple-right" _icon-only="" _tooltip-align="right" _variant="danger"></KolButton>
			<KolButton
				_label="Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip. Ich bin der Text im Tooltip."
				_icon="icofont-home"
				_icon-only=""
				_variant="ghost"
			></KolButton>{' '}
			<KolButton _label="Disabled" _icon="icofont-bin" _icon-only="" _disabled></KolButton>
		</BikBitvTest>
	);
};
