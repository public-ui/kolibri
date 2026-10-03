import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { KolibriApi } from './api';

const kolibriBem = bem.forBlock('kol-kolibri');

export type KolibriFCProps = FunctionalComponentProps<KolibriApi> & {
	/** Accessible name of the logo. */
	ariaLabel: string;
};

/** The KoliBri logo, with the label below it when `labeled` is set. */
export const KolibriFC: FC<KolibriFCProps> = ({ ariaLabel, color, labeled }) => {
	const fillColor = `rgb(${color.red},${color.green},${color.blue})`;
	return (
		<BemRootNodeFC
			block="kol-kolibri"
			component="svg"
			role="img"
			aria-label={ariaLabel}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 600 600"
			fill={fillColor}
		>
			<path d="M353 322L213 304V434L353 322Z" />
			<path d="M209 564V304L149 434L209 564Z" />
			<path d="M357 316L417 250L361 210L275 244L357 316Z" />
			<path d="M329 218L237 92L250 222L272 241L329 218Z" />
			<path d="M353 318L35 36L213 300L353 318Z" />
			<path d="M391 286L565 272L421 252L391 286Z" />
			{labeled === true && (
				<text class={kolibriBem('text')} x="250" y="525" fill={fillColor}>
					KoliBri
				</text>
			)}
		</BemRootNodeFC>
	);
};
