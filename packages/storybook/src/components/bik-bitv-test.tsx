import React, { Component } from 'react';
import { KolButton, KolCard, KolHeading, KolModal, KolSelect } from '@public-ui/react';
import { DEFAULT_REQUIRED_VALIDATOR, InputControl, ValidationHandler } from '@leanup/form';

const handler = new ValidationHandler();
handler.validators.add(DEFAULT_REQUIRED_VALIDATOR);

export const STORY_CONFIG = {
	parameters: {
		layout: 'centered',
	},
};

const control = new InputControl('input', {
	mandatory: true,
});
control.setValidationHandler(handler);

export const DEFAULT_INPUT_PROPS = {
	_error: 'Ich bin ein Fehler',
	// _required: true,
};

type Props = {
	_heading: string;
	_maxWidth?: string;
};

type State = {
	activeElement: HTMLElement | null;
	theme: string;
};

let defaultTheme = '';
const kolTheme = localStorage.getItem('kol-theme');
if (typeof kolTheme === 'string') {
	defaultTheme = kolTheme;
}

export class BikBitvTest extends Component<Props, State> {
	public state = {
		activeElement: null,
		theme: defaultTheme,
	};

	private renderModal() {
		return (
			<KolModal
				_activeElement={this.state.activeElement}
				_on={{
					onClose: () => {
						this.setState(() => ({
							activeElement: null,
						}));
					},
				}}
				_width="40em"
			>
				<KolCard
					style={{
						display: 'block',
						backgroundColor: 'white',
					}}
					_hasFooter
					_headline="Hinweise zu den Styleguides"
				>
					<p
						style={{
							margin: 0,
							padding: 0,
						}}
						slot="content"
					>
						Dieses Auswahl-Menü ist nur für den BIK BITV-Test vorgesehen und ermöglicht das Umschalten des Styleguides. Wenn das Auswahl-Menü im Storybook
						angezeigt wird, sollte es immer auf Neutral eingestellt sein, damit diese Einstellung nicht mit der Storybook-Theme-Einstellung kollidiert.
					</p>
					<div slot="footer">
						<KolButton
							_label="Schließen"
							_on={{
								onClick: () => {
									this.setState(() => ({
										activeElement: null,
									}));
								},
							}}
						></KolButton>
					</div>
				</KolCard>
			</KolModal>
		);
	}

	public render(): JSX.Element {
		return (
			<div
				className={`d-grid gap-2 ${this.state.theme}`}
				style={{
					margin: 'auto',
					maxWidth: this.props._maxWidth || '50em',
				}}
			>
				<div
					style={{
						position: 'fixed',
						display: 'flex',
						gap: '.5em',
						top: '1em',
						left: '1em',
						alignItems: 'end',
						justifyContent: 'center',
					}}
				>
					<KolSelect
						_list={[
							{
								label: 'Neutral',
								value: '',
							},
							{
								label: 'BMF-Styleguide',
								value: 'default',
							},
							{
								label: 'ITZBund-Styleguide',
								value: 'itzbund',
							},
						]}
						_on={{
							onChange: (_event, value) => {
								if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
									localStorage.setItem('kol-theme', value[0]);
									this.setState(() => ({
										theme: value[0],
									}));
								}
							},
						}}
						_value={[this.state.theme]}
					>
						Styleguide umschalten
					</KolSelect>
					<KolButton
						style={{
							fontSize: '95%',
						}}
						_label="Hilfe"
						_icon="icofont-info"
						_hideLabel
						_on={{
							onClick: (event) => {
								this.setState(() => ({
									activeElement: event.target as HTMLElement,
								}));
							},
						}}
					></KolButton>
					{this.renderModal()}
				</div>
				<KolHeading>{this.props._heading}</KolHeading>
				{this.props.children}
			</div>
		);
	}
}
