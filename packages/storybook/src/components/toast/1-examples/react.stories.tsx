import { KolButton, KolToast as MyComponent } from '@public-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ToastConfiguration } from './autogen.configuration';

export default {
	...ToastConfiguration,
	title: 'React/Toast/Beispiele',
	component: MyComponent,
} as ComponentMeta<typeof MyComponent>;

const KolToast: ComponentStory<typeof MyComponent> = (args: any) => {
	return <MyComponent {...args}>{args.children}</MyComponent>;
};

const DefaultArgs = {};

export const Standard = (args: any) => (
	<div>
		<KolToast {...args}></KolToast>
	</div>
);
Standard.args = {
	...DefaultArgs,
};

export const Success = (args: any) => {
	setTimeout(() => {
		let buttonSuccess = document.querySelector('#showSuccess');
		if (buttonSuccess) {
			buttonSuccess._on = {
				onClick: (event) => {
					document.querySelector('#success')._show = true;
				},
			};
		}
	}, 500);
	return (
		<div>
			<KolToast id="success" {...args}></KolToast>
			<KolButton id="showSuccess" _label="Success-Toast-Message anzeigen" _cta="secondary"></KolButton>
		</div>
	);
};
Success.args = {
	...DefaultArgs,
	_heading: 'The quick brown fox jumps over the lazy dog.',
	_text: 'The quick brown fox jumps over the lazy dog.',
	_type: 'success',
	_show: true,
};
Success.storyName = 'Success-Toast';

export const Error = (args: any) => {
	setTimeout(() => {
		let buttonSuccess = document.querySelector('#showError');
		if (buttonSuccess) {
			buttonSuccess._on = {
				onClick: (event) => {
					document.querySelector('#error')._show = true;
				},
			};
		}
	}, 500);
	return (
		<div>
			<KolToast id="error" {...args}></KolToast>
			<KolButton id="showError" _label="Error-Toast-Message anzeigen" _cta="secondary"></KolButton>
		</div>
	);
};
Error.args = {
	...DefaultArgs,
	_heading: 'The quick brown fox jumps over the lazy dog.',
	_text: 'The quick brown fox jumps over the lazy dog.',
	_type: 'error',
};
Error.storyName = 'Error-Toast';

export const Info = (args: any) => {
	setTimeout(() => {
		let buttonSuccess = document.querySelector('#showInfo');
		if (buttonSuccess) {
			buttonSuccess._on = {
				onClick: (event) => {
					document.querySelector('#info')._show = true;
				},
			};
		}
	}, 500);
	return (
		<div>
			<KolToast id="info" {...args}></KolToast>
			<KolButton id="showInfo" _label="Info-Toast-Message anzeigen" _cta="secondary"></KolButton>
		</div>
	);
};
Info.args = {
	...DefaultArgs,
	_heading: 'The quick brown fox jumps over the lazy dog.',
	_text: 'The quick brown fox jumps over the lazy dog.',
	_type: 'info',
};
Info.storyName = 'Info-Toast';

export const Warning = (args: any) => {
	setTimeout(() => {
		let buttonSuccess = document.querySelector('#showWarning');
		if (buttonSuccess) {
			buttonSuccess._on = {
				onClick: (event) => {
					document.querySelector('#warning')._show = true;
				},
			};
		}
	}, 500);
	return (
		<div>
			<KolToast id="warning" {...args}></KolToast>
			<KolButton id="showWarning" _label="Warning-Toast-Message anzeigen" _cta="secondary"></KolButton>
		</div>
	);
};
Warning.args = {
	...DefaultArgs,
	_heading: 'The quick brown fox jumps over the lazy dog.',
	_text: 'The quick brown fox jumps over the lazy dog.',
	_type: 'warning',
};
Warning.storyName = 'Warning-Toast';
