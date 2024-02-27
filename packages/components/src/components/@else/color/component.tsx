import { hex as hexContrast } from 'wcag-contrast';

import { h, JSX, State } from '@stencil/core';

import { Farbspektrum, FarbspektrumNames } from '../../../enums/color';
import { getValues } from '../../../utils/color.utils';

const COLOR_NAMES = Object.keys(Farbspektrum) as FarbspektrumNames[];

// ts-prune-ignore-next
// @Component({
// 	tag: 'kol-color',
// 	styleUrls: {
// 		default: '../../style.scss',
// 	},
// 	shadow: true,
// })
// ts-prune-ignore-next
export class KolColor {
	@State() private selectedColor: string | null = null;

	public render(): JSX.Element {
		// const raster: number[] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
		const raster: number[] = [0.2, 0.4, 0.6, 0.8, 1.0];
		return (
			<table
				class="text-center"
				style={{
					borderSpacing: '10px',
					borderCollapse: 'separate',
				}}
			>
				<thead>
					<tr>
						<th>Farbe</th>
						{raster.map((sat: number) => {
							return <th>{100 * sat}%</th>;
						})}
					</tr>
				</thead>
				<caption>
					Diese Tabelle stellt ein mögliches Farbspektrum im Zusammenhang mit den Farbkontrasten für die Barrierefreiheit interaktiv dar.
					<br />
					<small>
						Durch Anklicken einer Farbkachel werden alle Farbkacheln mit zu geringem Farbabstand ausgeblendet.
						<br />
						Durch erneutes Anklicken der ausgewählten Farbe (schwarz umrandet) werden wieder alle Farben eingeblendet.
					</small>
				</caption>
				<tbody>
					{COLOR_NAMES.map((colorName: FarbspektrumNames) => {
						return (
							<tr>
								<td>{colorName}</td>
								{raster.map((sat: number) => {
									const values = getValues(Farbspektrum[colorName], sat);
									let contrast = 4.5;
									if (typeof this.selectedColor === 'string' && this.selectedColor !== values.color.background) {
										contrast = hexContrast(this.selectedColor, values.color.background);
									}
									return (
										// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
										<td
											style={{
												cursor: 'pointer',
												backgroundColor: contrast >= 4.5 ? `#${values.color.background}` : 'transparent',
												color: contrast >= 4.5 ? `#${values.color.text}` : '#999',
												padding: '.5em',
												// border: this.selectedColor === values.color.background ? '2px solid #000' : 'unset',
												outline: this.selectedColor === values.color.background ? '2px solid #000' : 'unset',
												outlineOffset: '-2px',
												// fontWeight: values.contrast.score === 'AAA' ? 'bold' : 'normal',
												boxShadow: values.contrast.score === 'AAA' && contrast >= 4.5 ? '3px 3px 3px grey' : 'unset',
											}}
											onClick={() => {
												if (this.selectedColor === values.color.background) {
													this.selectedColor = null;
												} else {
													this.selectedColor = values.color.background;
												}
											}}
											onKeyPress={() => {
												if (this.selectedColor === values.color.background) {
													this.selectedColor = null;
												} else {
													this.selectedColor = values.color.background;
												}
											}}
										>
											{values.color.background}
											<br />
											<small>({values.contrast.score})</small>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}
