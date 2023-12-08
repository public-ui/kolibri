import { KoliBri } from '@public-ui/schema';

// Bundeszentralamt für Steuern
export const BZSt = KoliBri.createTheme('bzst', {
	GLOBAL: `/* NOTE: Alle ':root' CSS properties sollten in KoliBri zu ':host' kopiert werden und umgekehrt. Damit vereinheitlicht man alle Variablen auf beiden Seiten und kann diese dann individuell nutzen.*/ /* colors */
	:root,
	:host {
		/* token */
		--color-bleached-silk: #f2f2f2;
		--color-carbon: #333;
		--color-chilled-lemonade: #ffe695;
		--color-green: #4d7f6f;
		--color-green-light: #a7c0b8;
		--color-green-dark: #23614e;
		--color-heroic-blue: #126dff;
		--color-mercury: #ebebeb;
		--color-red-epiphyllum: #d00000;
		--color-speedwell: #595f73;
		--color-tropic-sea: #007194;
		--color-white: #fff; /* template */ /* general */
		--colorDark: var(--color-carbon);
		--colorLight: var(--color-white); /* primary color */
		--colorPrimary: var(--color-green-dark);
		--colorPrimaryFront: var(--color-white);
		--colorPrimarySuccess: var(--color-green);
		--colorPrimarySuccessFront: var(--color-white);
		--colorPrimaryActive: var(--color-green-light);
		--colorPrimaryActiveFront: var(--color-carbon); /* secondary color */
		--colorSecondary: var(--color-white);
		--colorSecondaryFront: var(--color-carbon);
		--colorSecondarySuccess: var(--color-bleached-silk);
		--colorSecondarySuccessFront: var(--color-carbon);
		--colorSecondaryActive: var(--color-mercury);
		--colorSecondaryActiveFront: var(--color-carbon); /* text */
		--colorText: var(--color-carbon);
		--colorTextBg: var(--color-white);
		--colorTextLight: var(--color-white);
		--colorTextLightBg: var(--color-carbon);
		--colorTextDisabled: var(--color-speedwell);
		--colorTextDisabledBg: var(--color-mercury);
		--colorTextActive: var(--color-green-dark);
		--colorTextActiveBg: var(--color-white); /* signal */
		--colorSignal: var(--color-tropic-sea);
		--colorSignalFront: var(
		--color-white
		); /* colorSignalFocus hat keine Frontfarbe */
		--colorSignalFocus: var(--color-heroic-blue);
		--colorSignalSuccess: var(--color-green);
		--colorSignalSuccessFront: var(--color-white);
		--colorSignalWarn: var(--color-chilled-lemonade);
		--colorSignalWarnFront: var(--color-carbon);
		--colorSignalError: var(--color-red-epiphyllum);
		--colorSignalErrorFront: var(--color-white); /* disabled */
		--colorDisabled: var(--color-mercury);
	} /* font, headline, text */
	:root,
	:host {
		/* token */
		--font-family: "BundesSans Web", system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
		sans-serif; /* Basis-Größe: html, rem */
		--font-size: 100%;
		--line-height: 1.6875rem; /* template */ /* h1 */
		--headline1FontSize: 2.5rem;
		--headline1LineHeight: 2.8125rem; /* h2 */
		--headline2FontSize: 2rem;
		--headline2LineHeight: 2.5rem; /* h3 */
		--headline3FontSize: 1.3125rem;
		--headline3LineHeight: 1.6875rem; /* h4 */
		--headline4FontSize: 1rem;
		--headline4LineHeight: 1.6875rem; /* text */
		--textFont: var(--font-family);
		--textFontColor: var(--colorText);
		--textFontSerif: "BundesSerif Web", var(--textFont);
		--textFontSize: 1rem;
		--textFontLineHeight: 1.6875rem;
		--textFontWeight: normal;
	} /* Abstände */
	:root,
	:host {
		/* template */
		--gap: 2rem;
		--gapDouble: calc(var(--gap) * 2);
		--gapSmall: 1.25rem; /* TODO: benötigt nur außerhalb KoliBri Komponenten? */
		--gapSmallest: 0.625rem;
		--gapLarge: 2.5rem;
	} /* formular */
	:root,
	:host {
		/* template */
		--formBorderWidthAndStyle: 1px solid; /* TODO: eigentlich --color-green sein, aber im Styleguide ist der Wert: #23614E */
		--formBorder: var(--formBorderWidthAndStyle) var(--colorPrimarySuccess);
		--formBorderHover: var(--formBorderWidthAndStyle) var(--colorPrimaryActive);
		--formBorderDisabled: var(--formBorderWidthAndStyle) var(--colorDisabled);
		--formBorderInvalid: var(--formBorderWidthAndStyle) var(--colorSignalError);
		--focusOutline: var(--colorSignalFocus) solid 2px;
		--formFieldBackground: var(--colorLight); /*Select option */
		--formFieldBackgroundHover: var(--colorPrimary); /* Select options */
		--formFieldBackgroundEven: var(--formFieldBackground); /* Select options */
		--formFieldBackgroundOdd: var(--colorSecondaryActive);
		--formFieldBackgroundDisabled: var(--colorSecondarySuccess);
		--formFieldTextColorDisabled: var(--colorTextDisabled);
	} /* ********************************* */ /* ********************************* */ /* ********************************* */ /* ********************************* */
	:host {
		/* Primärfarbe und Abstufungen */
		--color-gruen-dunkel: var(--colorPrimary);
		--color-gruen: var(--colorPrimarySuccess);
		--color-gruen-hell: var(--colorPrimaryActive); /* Sekundärfarben */
		--color-weiss: var(--colorSecondary);
		--color-grau-dunkel: var(--colorSecondaryFront);
		--color-grau-hell: var(--colorSecondaryActive);
		--color-grau-weiss: var(--colorSecondarySuccess); /* Textfarben */
		--color-graublau: var(--colorTextDisabled); /* Signalfarben */
		--color-blau: var(--colorSignalFocus);
		--color-blau-dunkel: var(--colorSignal);
		--color-gelb: var(--colorSignalWarn);
		--color-rot: var(--colorSignalError);
		--color-disabled: var(--colorTextDisabled);
		--text-size: var(--textFontSize);
		--color-focus: var(--color-blau);
		--spacing: 4px;
		--color-text: var(--color-grau-dunkel);
	}
	:host {
		color: var(--color-black);
		font-family: var(--font-family);
	}
	:host * {
		box-sizing: border-box;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--textFontSerif);
	}
	h1,
	h2 {
		font-weight: var(--textFontWeight);
	}
	h1 {
		font-size: var(--headline1FontSize);
		line-height: var(--headline1LineHeight);
	}
	h2 {
		font-size: var(--headline2FontSize);
		line-height: var(--headline2LineHeight);
	}
	h3 {
		font-size: var(--headline3FontSize);
		line-height: var(--headline3LineHeight);
	}
	h4,
	h5,
	h6 {
		font-size: var(--headline4FontSize);
		line-height: var(--headline4LineHeight);
	}
	a,
	button,
	input,
	option,
	select,
	summary,
	textarea {
		-ms-hyphens: auto;
		-webkit-hyphens: auto;
		hyphens: auto;
		letter-spacing: inherit;
		display: block;
	} /* a,button,caption,input,option,select,summary,table,textarea {font-size: 1rem;} */
	*[tabindex]:focus,
	kol-input:not(.checkbox, .radio) .input:focus-within,
	kol-input:is(.checkbox, .radio) input:focus,
	summary:focus {
		outline: var(--focusOutline);
		outline-offset: 2px;
		transition: outline-offset 0.2s linear;
	}
	@keyframes spin {
		0% {
		transform: rotate(0deg);
		}
		100% {
		transform: rotate(360deg);
		}
	}
	kol-tooltip .area {
		background-color: var(--colorDark);
		color: var(--colorLight);
	}
	kol-tooltip kol-span-wc {
		line-height: 1.5em;
		padding: 0.5rem 0.75rem;
	}
	kol-span-wc,
	kol-span-wc > span {
		gap: 0.5em;
	}
	kol-span-wc,
	kol-span-wc > span {
		gap: 0.3em;
	}`,
	'KOL-BUTTON': `:host {
		--background-color: var(--color-gruen-dunkel);
		--border-color: var(--color-gruen-dunkel);
		--border-size: 1px;
		--min-size: 2.75rem;
		display: inline-block;
	}
	button {
		border-width: var(--border-size);
		border-style: solid;
		min-width: var(--min-size);
		min-height: var(--min-size);
		display: grid;
		gap: 0.25em;
		line-height: 1.5;
		font-family: var(--font-family);
		cursor: pointer;
		font-size: var(--text-size);
		align-items: center;
		padding: 0.5rem 0.875rem !important;
		justify-content: center;
		font-style: normal;
		text-align: center;
		text-transform: uppercase;
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	button:hover:enabled {
		text-decoration: underline;
	}
	button:focus {
		outline: var(--color-focus) solid 2px;
	}
	button.primary,
	button.primary:active,
	button.primary:hover {
		background-color: var(--background-color);
		border-color: var(--border-color);
		color: var(--color-weiss);
	}
	button.secondary,
	button.danger,
	button.normal,
	button.ghost {
		background-color: var(--color-weiss);
		border-color: var(--color-gruen-hell);
		color: var(--color-grau-dunkel);
	}
	button.ghost {
		background-color: transparent;
		color: inherit;
		border: calc(var(--border-size) * 2) solid transparent;
	}
	button.secondary:active,
	button.secondary:hover {
		background-color: var(--background-color);
		border-color: var(--background-color);
		border-width: var(--border-size);
		color: var(--color-weiss);
	}
	button:disabled,
	button:disabled:hover {
		background-color: var(--color-weiss);
		border-color: var(--color-grau-hell);
		color: var(--color-disabled);
		cursor: not-allowed;
	}
	button > span {
		display: flex;
		gap: 0.5em;
		margin: auto;
		align-items: center;
		justify-content: center;
	}
	button.icon-only {
		padding: 0.5rem;
	}
	button.icon-only kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	button.loading kol-icon {
		animation: spin 5s infinite linear;
	}`,
	'KOL-INPUT-TEXT': `kol-input {
		gap: 0.4em;
	}
	kol-input .error {
		order: 3;
	}
	kol-input label {
		font-weight: 700;
		order: 1;
	}
	kol-input .input {
		order: 2;
	}
	kol-input .hint {
		order: 4;
		font-size: 0.875em;
		font-style: italic;
	}
	input {
		border: none;
	}
	.input {
		border-color: var(--color-grey);
		border-style: solid;
		border-width: 1px;
		padding: 0 0.5em;
	}
	.input > kol-icon {
		width: 1.5em;
	}
	.input > input:first-child {
		padding-left: 0.375em;
	}
	.input > input:last-child {
		padding-right: 0.375em;
	}
	.input:hover {
		border-color: var(--color-gruen-hell);
	}
	input:not([type="color"]):read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-rot);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-rot) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-rot);
		font-weight: 700;
	}
	.disabled {
		opacity: 0.33;
	}
	label {
		color: var(--color-text);
		line-height: 1.5;
	}
	.input {
		font-size: var(--text-size);
		line-height: 1.5;
		color: var(--colorText);
		border-color: var(--color-gruen);
		border-style: solid;
		width: 100%;
	}
	input:not([type="range"]) {
		height: 2.75em;
	}
	input::placeholder {
		color: var(--color-grau-dunkel);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}`,
	'KOL-INPUT-PASSWORD': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: 1rem;
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
		overflow: hidden;
		width: 100%;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.75em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	select[multiple],
	textarea {
		overflow: auto;
	}
	textarea {
		display: block;
	}
	select option {
		margin: 1px 0;
		padding: 0.5em;
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-INPUT-NUMBER': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: black;
	}
	input:focus-within,
	select:focus-within,
	textarea:focus-within {
		outline: var(--color-focus) solid 2px;
	}
	kol-input label {
		font-weight: 700;
		order: 1;
		margin-bottom: var(--gapSmallest);
	}
	kol-input label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--textFont);
		background-color: transparent;
		box-sizing: border-box;
		font-size: var(--textFontSize);
		display: inline-flex;
		line-height: 1.5;
		color: black;
		border-color: var(--color-gruen);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em;
		overflow: hidden;
		width: 100%;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.75em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	select[multiple],
	textarea {
		overflow: auto;
	}
	textarea {
		display: block;
	}
	select option {
		margin: 1px 0;
		padding: 0.5em;
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		background: var(--color-ocean);
		color: white;
	}`,
	'KOL-INPUT-DATE': `kol-input label {
		font-weight: 700;
		margin-bottom: var(--gapSmallest);
	}
	input {
		border: var(--formBorder);
	}
	input:hover {
		border: var(--formBorderHover);
	}`,
	'KOL-INPUT-EMAIL': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: 1rem;
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
		overflow: hidden;
		width: 100%;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.75em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	select[multiple],
	textarea {
		overflow: auto;
	}
	textarea {
		display: block;
	}
	select option {
		margin: 1px 0;
		padding: 0.5em;
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-INPUT-FILE': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: 1rem;
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
		overflow: hidden;
		width: 100%;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.75em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	select[multiple],
	textarea {
		overflow: auto;
	}
	textarea {
		display: block;
	}
	select option {
		margin: 1px 0;
		padding: 0.5em;
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-TEXTAREA': `kol-input {
		gap: 0.4em;
	}
	kol-input .error {
		order: 3;
	}
	kol-input label {
		font-weight: 700;
		order: 1;
	}
	kol-input .input {
		order: 2;
	}
	kol-input .hint {
		order: 4;
		font-size: 0.875em;
		font-style: italic;
	}
	input,
	select,
	textarea {
		border: none;
	}
	.input {
		color: var(--colorText);
		border: var(--formBorder);
		font-size: var(--textFontSize);
		line-height: 1.5;
		padding: 0 0.5em;
		width: 100%;
	}
	.input > kol-icon {
		width: 1.5em;
	}
	.input > input:first-child {
		padding-left: 0.375em;
	}
	.input > input:last-child {
		padding-right: 0.375em;
	}
	.input:hover {
		border-color: var(--color-gruen-hell);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-rot);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-rot) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-rot);
		font-weight: 700;
	}
	.disabled {
		opacity: 0.33;
	}
	label {
		color: var(--color-text);
		line-height: 1.5;
	}
	.input {
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}`,
	'KOL-ALERT': `:host > div {
		background-color: white;
		border-width: 2px;
		border-style: solid;
		border-radius: 0.25rem;
		display: flex;
		overflow: unset;
	}
	:host > div.default {
		border-color: var(--color-grau-dunkel);
	}
	:host > div.default > .icon {
		background-color: var(--color-grau-dunkel);
	}
	:host > div.error {
		border-color: var(--color-rot);
	}
	:host > div.error > .icon {
		background-color: var(--color-rot);
	}
	:host > div.info {
		border-color: var(--color-blau);
	}
	:host > div.info > .icon {
		background-color: var(--color-blau);
	}
	:host > div.success {
		border-color: var(--color-gruen);
	}
	:host > div.success > .icon {
		background-color: var(--color-gruen);
	}
	:host > div.warning {
		border-color: var(--color-gelb);
	}
	:host > div.warning > .icon {
		background-color: var(--color-gelb);
	}
	:host > div.msg > .icon {
		color: white;
		padding: 0.5em;
		align-items: center;
		display: inline-flex;
	}
	:host > div.msg.warning > .icon {
		color: black;
	}
	:host > div.card.default .heading .icon {
		background-color: var(--color-grau-dunkel);
	}
	:host > div.card.error .heading .icon {
		background-color: var(--color-rot);
	}
	:host > div.card.info .heading .icon {
		background-color: var(--color-blau);
	}
	:host > div.card.success .heading .icon {
		background-color: var(--color-gruen);
	}
	:host > div.card.warning .heading .icon {
		background-color: var(--color-gelb);
	}
	:host > div.card .heading .icon {
		color: white;
		padding: 0.5em;
		align-items: center;
		display: inline-flex;
	}
	:host > div.card.warning .heading .icon {
		color: black;
	}
	:host > div kol-heading-wc .icon {
		margin-right: 0.5em;
	}
	:host > div.card .heading .icon {
		border-radius: 0 0 0.25rem 0;
	}
	:host > div.msg > div {
		padding: 0.25em;
	}
	:host > div.msg > div > .heading {
		padding: 0.25em;
		display: inline-block;
	}
	:host > div .content {
		padding: 0.25em;
	}
	:host > div > div {
		display: grid;
		grid-template-columns: 1fr auto;
	}
	:host > div > div > .content {
		grid-row: 2;
		grid-column: 1;
	}
	:host > div > div > .close {
		grid-row: 1 / span 2;
		display: flex;
	}
	:host > div.msg > div > .close > * {
		margin: auto;
	}
	:host > div.msg.default .close .icon {
		color: var(--color-grau-dunkel);
	}
	:host > div.msg.error .close .icon {
		color: var(--color-rot);
	}
	:host > div.msg.info .close .icon {
		color: var(--color-blau);
	}
	:host > div.msg.success .close .icon {
		color: var(--color-gruen);
	}
	:host > div.msg.warning .close .icon {
		color: var(--color-gelb);
	}
	:host > div.card > div > .heading {
		width: 100%;
	}
	.close > button {
		min-width: 44px;
		min-height: 44px;
		display: grid;
		gap: 0.25em;
		line-height: 1.5rem;
		font-family: var(--font-family);
		font-weight: 700;
		cursor: pointer;
		border-radius: 1.5em;
		border-style: solid;
		border-width: 2px;
		font-size: 1rem;
		align-items: center;
		padding: 8px 14px;
		justify-content: center;
		font-style: normal;
		text-align: center;
		text-transform: uppercase;
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
		background-color: rgba(0, 0, 0, 0);
		border-color: rgba(0, 0, 0, 0);
	}
	.close > button.icon-only {
		padding: 8px;
	}
	.close > button.icon-only kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	.close > button:active {
		box-shadow: none;
		outline: none;
	}
	.close kol-icon::part(icon)::before {
		content: "\\f00d";
	}`,
	'KOL-HEADING': `.headline {
		margin-top: 0;
	}`,
	'KOL-BADGE': `:host {
		display: inline-block;
	}
	kol-span-wc {
		align-items: center;
		border-radius: 0.3125rem;
		display: grid;
		gap: 0.5rem;
		line-height: 1.25rem;
		padding: 0.25rem 0.75rem;
	}
	kol-span-wc span {
		display: flex;
		gap: 0.25rem;
	}`,
	'KOL-BUTTON-GROUP': `div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		width: 100%;
		padding: 15px;
		background: var(--color-grau-weiss);
		box-shadow: -4px 0px 0px var(--color-gruen);
	}`,
	'KOL-LINK': `:is(a, button) {
		/* color: var(--color-midnight); */
		color: var(--external-link-color, var(--color-gruen));
		font-style: normal;
		font-weight: 400;
		padding: var(--external-link-padding, 0);
		text-decoration-line: none;
	}
	:is(a, button):focus {
		/* outline: var(--color-focus) solid 2px; */
		outline: none;
	}
	:is(a, button):hover {
		/* text-decoration-thickness: 0.25em; */
		box-shadow: inset 0 -1px 0 0 var(--external-link-color, var(--color-gruen));
	}
	.hidden {
		display: none;
		visibility: hidden;
	} /*************************/ /* kol-link-wc {display: inline-block;} */ /* kol-icon {padding: 0 0.25rem;} */
	.hidden {
		display: none;
		visibility: hidden;
	}
	.skip {
		left: -99999px;
		overflow: hidden;
		position: absolute;
		z-index: 9999999;
		line-height: 1em;
	}
	.skip:focus {
		background: white;
		left: unset;
		position: unset;
	}
	.icon-only {
		padding-bottom: 0.2rem;
	}
	:is(a) kol-span-wc > span {
		gap: var(--gapSmallest);
	}`,
	'KOL-DETAILS': `details {
		display: grid;
		width: 100%;
	}
	summary {
		cursor: pointer;
		display: flow-root;
		margin: 0;
		padding: 0;
	}
	summary span {
		margin-left: 0.25rem;
		text-decoration: underline;
	}
	summary span:hover {
		text-decoration-thickness: 0.25em;
	}
	details > kol-indented-text {
		margin: 0.25em 0 0 0.6em;
	}`,
	'KOL-SPIN': `.spin {
		display: inline-block;
		height: 1rem;
		position: relative;
		width: 3rem;
	}
	.spin span {
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
		border: 0.1rem solid rgb(255, 255, 255);
		border-radius: 50%;
		height: 0.8rem;
		width: 0.8rem;
		top: 0.1rem;
		position: absolute;
	}
	.spin span:nth-child(1) {
		background-color: #fc0;
		z-index: 0;
		animation: 2s ease 0s infinite normal none running spin1;
		left: 0.1rem;
	}
	.spin span:nth-child(2) {
		background-color: #f00;
		z-index: 1;
		animation: 2s ease 0s infinite normal none running spin2;
		left: 0.1rem;
	}
	.spin span:nth-child(3) {
		background-color: #000;
		z-index: 1;
		animation: 2s ease 0s infinite normal none running spin2;
		left: 1.1rem;
	}
	.spin span:nth-child(4) {
		background-color: #666;
		z-index: 0;
		animation: 2s ease 0s infinite normal none running spin3;
		left: 2.1rem;
	}
	@keyframes spin1 {
		0% {
		transform: scale(0);
		}
		100% {
		transform: scale(1);
		}
	}
	@keyframes spin2 {
		0% {
		transform: translate(0px, 0px);
		}
		100% {
		transform: translate(1rem, 0px);
		}
	}
	@keyframes spin3 {
		0% {
		transform: scale(1);
		}
		100% {
		transform: scale(0);
		}
	}`,
	'KOL-PROGRESS': `:host progress,
	:host span {
		display: block;
		height: 0px;
		overflow: hidden;
		width: 0px;
	}
	svg line:first-child,
	svg circle:first-child {
		fill: transparent;
		stroke: var(--color-ice);
	}
	svg line:last-child,
	svg circle:last-child {
		stroke: var(--color-midnight);
		fill: transparent;
	}
	progress {
		display: none;
	}`,
	'KOL-SELECT': `:host {
		--color: var(--colorText); /* --color: blue; */
	}
	kol-input {
		color: var(--color);
		font-size: var(--textFontSize);
		gap: var(--gapSmallest);
	}
	label {
		font-weight: 700;
		order: 1;
	}
	.input {
		order: 2;
	}
	kol-alert.error {
		color: var(--colorSignalError);
		order: 3;
	}
	select {
		background-color: var(--colorLight);
		line-height: 1.5;
		color: var(--color);
		border: var(--formBorder);
		padding: 0.5em 0.75em;
	}
	select:hover,
	select:focus {
		border-color: var(--colorPrimaryActive);
	}
	select:disabled {
		cursor: not-allowed;
	}
	select[multiple] {
		overflow: auto;
	}
	select option {
		margin: 1px 0;
		padding: 0.5em;
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	} /* kol-input.error select:invalid { */
	kol-input.error select {
		border-color: var(--colorSignalError);
	} /* option:active:not(:disabled),option:focus:not(:disabled),option:hover:not(:disabled) {color: white;} */`,
	'KOL-INPUT-COLOR': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: 1rem;
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
		overflow: hidden;
		width: 100%;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.75em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	select[multiple],
	textarea {
		overflow: auto;
	}
	textarea {
		display: block;
	}
	select option {
		margin: 1px 0;
		padding: 0.5em;
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-ACCORDION': `:host > div {
		font-family: var(--font-family);
		padding: 0 0.5rem 0 0;
	}
	:host > div > kol-heading-wc {
		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	:host > div > kol-heading-wc button {
		cursor: pointer;
		width: 100%;
		margin: 0;
		display: flex;
		gap: 0.5em;
		border: 0;
		align-items: center;
		overflow: hidden;
		font-size: inherit;
		line-height: 1.5em;
		background-color: transparent;
		padding: 0.5em;
		padding-left: 0;
	}
	:host > div[part*="open"] > kol-heading-wc button {
		padding: 0.5em;
		padding-left: 0;
	}
	:host > div > kol-heading-wc button kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
		color: var(--color-midnight);
	}
	.accordion > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\2b";
	}
	.accordion.open > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\f068";
	}
	.accordion {
		width: 100%;
		height: 100%;
		display: grid;
	}
	.accordion[part*="open"] div[part="header"] {
		padding-left: 2em;
	}
	.accordion[part*="open"] div[part="content"] {
		padding-top: 1rem;
	}
	button {
		font-weight: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	.accordion {
		background: var(--color-white);
	}
	.accordion[part*="open"] {
		padding-bottom: 1em;
	} /* .accordion > [part="header"] {height: 0;} */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
	}`,
	'KOL-TABLE': `:host * {
		hyphens: var(--hyphens);
		line-height: var(--textFontLineHeight);
	}
	:host > div:first-child {
		overflow-x: auto;
		overflow-y: hidden;
	}
	table {
		border-collapse: collapse;
	}
	caption {
		height: auto;
		text-align: left;
	} /* visuell verstecken */
	caption {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}
	table,
	tr,
	th,
	td {
		border: 0 solid var(--color-weiss);
	}
	tr {
		border-top-width: 2px;
	}
	th {
		background-color: var(--color-gruen);
		color: var(--color-weiss);
		font-weight: normal;
	}
	tbody > tr:nth-child(odd) {
		background-color: #f2f2f2;
	}
	tbody > tr:hover {
		background-color: var(--color-gruen-dunkel);
		color: var(--color-weiss);
	}
	th,
	td {
		border-right-width: 2px;
		padding: 0.25em 0.5em;
	}
	th > div {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.25em;
	}
	.pagination {
		padding: 0.5em;
		font-size: var(--textFontSize);
		gap: 1rem;
	}
	th kol-button button {
		padding: 0.5rem;
	} /* default: [aria-sort="none"] */
	[data-sort] kol-button::part(icon)::before {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
		content: "\\f0dc";
	}
	[data-sort="sort-ASC"] kol-button::part(icon)::before {
		content: "\\f0de";
	}
	[data-sort="sort-DESC"] kol-button::part(icon)::before {
		content: "\\f0dd";
	}`,
	'KOL-NAV': `ul {
		list-style: none;
	}
	a {
		color: var(--colorText);
		display: block;
		padding: 0.3rem 0.5rem;
		text-decoration: none;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	a:hover {
		background-color: var(--colorPrimarySuccess);
		color: var(--colorLight);
	}
	a:focus,
	button:focus {
		outline: var(--focusOutline);
		outline-offset: 2px;
		transition: outline-offset 0.2s linear;
	}
	.list[data-deep="0"] {
		font-family: var(--textFontSerif);
	}
	.horizontal {
		gap: var(--gap);
	}`,
	'KOL-CARD': `:host > div {
		--card-padding: var(--gap);
		border-color: var(--color-gruen);
		border-style: solid;
		border-width: 1px;
		border-radius: 0.25rem;
		box-shadow: 0px 0px 1.875rem 0px rgba(0, 0, 0, 0.3);
		display: grid;
		width: 100%;
		height: 100%;
		background-color: white;
		grid-template-rows: min-content 2fr min-content;
		padding-bottom: var(--gapLarge);
	}
	:host kol-heading-wc {
		display: inline-flex;
		font-style: normal;
	}
	:host kol-heading-wc h1,
	:host kol-heading-wc h2 {
		font-family: var(--textFontSerif);
		font-weight: var(--textFontWeight);
		margin: 0;
	}
	:host kol-heading-wc h1 {
		font-size: var(--headline1FontSize);
		line-height: var(--headline1LineHeight);
	}
	:host kol-heading-wc h2 {
		font-size: var(--headline2FontSize);
		line-height: var(--headline2LineHeight);
	}
	:host kol-heading-wc h3 {
		font-size: var(--headline3FontSize);
		line-height: var(--headline3LineHeight);
	}
	:host kol-heading-wc h4 {
		font-size: var(--headline4FontSize);
		line-height: var(--headline4LineHeight);
	}
	:host div.header {
		border-bottom: 1px solid var(--color-gruen);
		padding: var(--card-padding);
		align-items: flex-start;
		display: flex;
		gap: 0 var(--gapSmall);
		justify-content: space-between;
	}
	:host div.content {
		padding: var(--card-padding) var(--card-padding) 0;
	}
	:host div.footer {
		margin-top: 3rem;
		padding: 0 var(--card-padding);
	}`,
	'KOL-INPUT-CHECKBOX': `:host {
		--border-width: 1px;
		--spacing: 0.25rem;
	}
	label {
		cursor: pointer;
	}
	input {
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: var(--border-width);
		border-style: solid;
		line-height: 24px;
		font-size: 16px;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	input:hover {
		border-color: var(--color-blau);
	} /* NEU */
	kol-input {
		display: grid;
		align-items: center;
		justify-items: left;
		width: 100%;
	}
	kol-input.checkbox {
		grid-template-columns: calc(6 * var(--spacing)) auto;
	}
	kol-input.switch {
		grid-template-columns: calc(13 * var(--spacing)) auto;
	}
	kol-input > div.input {
		display: inline-flex;
		order: 1;
	}
	kol-input > div.input input {
		margin: 0px;
	}
	kol-input > label {
		order: 2;
		padding-left: calc(2 * var(--spacing));
	}
	kol-input > kol-alert.error {
		order: 3;
		padding-top: 0.25em;
		grid-column: span 2 / auto;
	} /* CHECKBOX */
	input[type="checkbox"] {
		appearance: none;
		background-color: white;
		cursor: pointer;
		transition: 0.5s;
	}
	input[type="checkbox"].kol-disabled:before {
		cursor: not-allowed;
	}
	input[type="checkbox"]:before {
		content: "";
		cursor: pointer;
	}
	input[type="checkbox"]:checked {
		background-color: var(--color-blau);
		border-color: var(--color-blau);
	}
	.checkbox input[type="checkbox"] {
		height: calc(6 * var(--spacing));
		min-width: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:before {
		background-color: transparent;
		display: block;
		height: calc(6 * var(--spacing));
		position: relative;
		width: calc(6 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:checked:before {
		border-right-width: 3px;
		border-bottom-width: 3px;
		left: calc(1.5 * var(--spacing) - var(--border-width));
		top: calc(2.85 * var(--spacing) - var(--border-width));
		transform: rotate(40deg) translate(-50%, -50%);
		background-color: transparent;
		border-width: 0px 3px 3px 0px;
		border-color: white;
		border-style: solid;
		height: calc(3 * var(--spacing));
		width: calc(1.5 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:indeterminate:before {
		background-color: var(--color-grau-dunkel);
		height: 0.375rem;
		top: 0.5rem;
		left: 0.2rem;
		width: calc(4 * var(--spacing));
	}
	.switch input[type="checkbox"] {
		min-width: 3.2em;
		width: 3.2em;
		height: 1.7em;
		display: inline-block;
		position: relative;
	}
	.switch input[type="checkbox"]:before {
		-webkit-transition: 0.5s;
		-moz-transition: 0.5s;
		-ms-transition: 0.5s;
		transition: 0.5;
		width: 1.2em;
		height: 1.2em;
		left: calc(0.25em - var(--border-width));
		top: calc(0.25em - var(--border-width));
		background-color: black;
		position: absolute;
	}
	.switch input[type="checkbox"]:checked:before {
		-webkit-transform: translateX(1.5em);
		-moz-transform: translateX(1.5em);
		-ms-transform: translateX(1.5em);
		transform: translateX(1.5em);
		background-color: white;
	}
	.switch input[type="checkbox"]:indeterminate:before {
		-webkit-transform: translateX(0.75em);
		-moz-transform: translateX(0.75em);
		-ms-transform: translateX(0.75em);
		transform: translateX(0.75em);
		background-color: var(--color-blau);
	}
	.disabled {
		opacity: 0.33;
	}
	.button:focus-within {
		outline: var(--focusOutline);
		outline-offset: 2px;
	}`,
	'KOL-INPUT-RADIO': `:host {
		--border-width: 1px;
		--input-color: var(--color-gruen-dunkel);
		--input-inner-position: calc(var(--spacing) + var(--border-width));
		--input-inner-size: calc(var(--spacing) * 3);
		--input-outer-size: calc(var(--spacing) * 6);
	}
	div[slot="input"] {
		align-items: center;
		display: flex;
		gap: calc(var(--spacing) * 2);
	}
	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
	}
	fieldset.horizontal {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 32px;
	}
	input {
		cursor: pointer;
		display: grid;
		align-self: center;
		border: var(--border-width) solid var(--input-color);
		appearance: none;
		border-radius: 100%;
		height: var(--input-outer-size);
		width: var(--input-outer-size);
		margin: 0;
	}
	input:hover {
		--border-width: 2px;
	}
	input:focus:hover {
		box-shadow: none;
	}
	input:disabled {
		--input-color: var(--color-disabled);
	}
	input:disabled:hover {
		--border-width: 1px;
	}
	input:disabled + label {
		color: var(--color-disabled);
	}
	input::before {
		content: "";
		cursor: pointer; /* left: var(--input-inner-position);top: var(--input-inner-position); */
		position: relative;
		border-radius: 100%;
		display: inline-block;
		height: var(--input-inner-size);
		width: var(--input-inner-size);
	}
	input:hover::before {
		--input-inner-position: var(--spacing);
	}
	input:checked::before {
		background-color: var(--input-color);
	}
	kol-input {
		display: grid;
	}
	kol-input {
		margin-bottom: 1rem;
	}
	kol-input.error input {
		border-color: var(--color-rot);
		padding-left: 1em;
	}
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		outline: var(--color-focus) solid 2px !important;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		order: 1;
	}
	kol-input.error kol-alert.error {
		color: var(--color-rot);
		font-weight: 700;
	}
	label {
		color: var(--color-text);
		cursor: pointer;
		display: grid;
		font-size: var(--text-size); /* order: 2; */
		font-weight: 700;
	}
	legend {
		font-size: var(--text-size);
		margin-bottom: var(--text-size);
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.75em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}`,
	'KOL-TOAST': `:host > div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 0;
		z-index: 200;
	}
	:host > div > kol-alert {
		display: block;
		margin: auto;
		padding: 1rem;
		max-width: 750px;
	}
	:host > div > kol-button-wc {
		top: 0;
		position: relative;
		display: block;
		margin: auto;
		width: 1em;
	}`,
	'KOL-TABS': `button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	:host {
		font-family: var(--font-family);
	}
	:host > div {
		display: block;
		width: 100%;
	}
	:host kol-button-group-wc {
		display: inline-block;
		border-radius: 0.25rem 0.25rem 0 0;
		background-color: var(--kolibri-color-normal);
	}
	:host kol-button-group-wc > div {
		display: inline-flex;
	}
	:host kol-button-group-wc > div + div {
		margin-left: 0.25em;
	}
	:host > div > div {
		padding: 0.25em;
		border: 1px solid var(--kolibri-border-color);
		border-radius: 0 0 0.25rem 0.25rem;
	}
	button {
		box-sizing: border-box;
		font-size: inherit;
		line-height: 1.25em;
		cursor: pointer;
		border-width: 2px;
		box-shadow: 0 0 0.25em gray;
		font-family: var(--kolibri-font-family);
		width: inherit;
		border-radius: var(--kolibri-border-radius);
		border-style: solid;
		padding: calc(2 * var(--kolibri-spacing));
		display: grid;
		gap: 0.25em;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	kol-button-wc[aria-selected="true"] button {
		border-bottom-width: 0.25em !important;
		border-bottom-style: solid;
		border-bottom-color: var(--kolibri-color-accent) !important;
	}
	button > kol-span-wc span {
		display: flex;
		gap: 0.25em;
		align-items: center;
		justify-content: center;
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	button.primary,
	button.primary:disabled:hover {
		background-color: var(--kolibri-color-primary);
		border-color: var(--kolibri-color-primary);
		color: white;
	}
	button.primary:hover,
	button.primary:focus {
		color: var(--kolibri-color-primary);
	}
	button.secondary,
	button.secondary:disabled:hover {
		background-color: var(--kolibri-color-secondary);
		border-color: var(--kolibri-color-secondary);
		color: white;
	}
	button.secondary:hover,
	button.secondary:focus {
		color: var(--kolibri-color-secondary);
	}
	button.normal,
	button.normal:disabled:hover {
		background-color: var(--kolibri-color-normal);
		border-color: var(--kolibri-color-normal);
		color: white;
	}
	button.normal:hover,
	button.normal:focus {
		color: var(--kolibri-color-normal);
	}
	button.danger,
	button.danger:disabled:hover {
		background-color: var(--kolibri-color-danger);
		border-color: var(--kolibri-color-danger);
		color: white;
	}
	button.danger:hover,
	button.danger:focus {
		color: var(--kolibri-color-danger);
	}
	button.ghost,
	button.ghost:disabled:hover {
		background-color: white;
		border-color: var(--kolibri-color-ghost);
		color: var(--kolibri-color-ghost);
	}
	button.ghost:hover,
	button.ghost:focus {
		background-color: var(--kolibri-color-ghost);
		color: white;
	}
	button:hover,
	button:focus {
		background-color: white;
		box-shadow: 0 0 0.25em black;
	}
	button:active {
		outline: 0 !important;
		box-shadow: none !important;
	}
	.close-button {
		font-size: 25%;
		height: fit-content;
		width: 0;
	}
	.close-button button {
		width: 1rem;
		position: relative;
		height: 1rem;
		left: -4.25em;
		top: 0.25em;
	}
	:host > div {
		display: grid;
	}
	:host > div.tabs-align-left {
		grid-template-columns: auto 1fr;
	}
	:host > div.tabs-align-right {
		grid-template-columns: 1fr auto;
	}
	:host > .tabs-align-left kol-button-group-wc,
	:host > .tabs-align-top kol-button-group-wc {
		order: 0;
	}
	:host > .tabs-align-bottom kol-button-group-wc,
	:host > .tabs-align-right kol-button-group-wc {
		order: 1;
	}
	:host > div.tabs-align-left kol-button-group-wc > div,
	:host > div.tabs-align-left kol-button-group-wc > div > div,
	:host > div.tabs-align-right kol-button-group-wc > div,
	:host > div.tabs-align-right kol-button-group-wc > div > div {
		display: grid;
	}
	:host > div.tabs-align-left kol-button-group-wc > div > div kol-button-wc,
	:host > div.tabs-align-right kol-button-group-wc > div > div kol-button-wc {
		width: 100%;
	}
	:host > div.tabs-align-bottom kol-button-group-wc div,
	:host > div.tabs-align-top kol-button-group-wc div {
		display: flex;
		flex-wrap: wrap;
	}
	:host > div.tabs-align-bottom > kol-button-group-wc {
		border-radius: 0 0 0.25rem 0.25rem;
	}
	:host > div.tabs-align-bottom > div {
		border-radius: 0.25rem 0.25rem 0 0;
	}
	:host > div.tabs-align-top > kol-button-group-wc {
		border-radius: 0.25rem 0.25rem 0 0;
	}
	:host > div.tabs-align-top > div {
		border-radius: 0 0 0.25rem 0.25rem;
	}
	:host > div.tabs-align-left > kol-button-group-wc {
		border-radius: 0.25rem 0 0 0.25rem;
	}
	:host > div.tabs-align-left > div {
		border-radius: 0 0.25rem 0.25rem 0;
	}
	:host > div.tabs-align-right > kol-button-group-wc {
		border-radius: 0 0.25rem 0.25rem 0;
	}
	:host > div.tabs-align-right > div {
		border-radius: 0.25rem 0 0 0.25rem;
	}`,
	'KOL-PAGINATION': `:host {
		align-items: center;
		display: flex;
		gap: 1rem;
	}
	.navigation-list {
		align-items: center;
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
		margin: 0;
		padding: 0;
	}
	.navigation-list > li {
		min-width: var(--a11y-min-size);
		text-align: center;
	}
	.selected button {
		cursor: not-allowed;
		font-weight: 700;
		border-radius: 1.5em;
		border: none;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
		color: var(--color-midnight);
	}
	kol-button::part(icon)::before {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	kol-button.first::part(icon)::before {
		content: "\\f100";
	}
	kol-button.previous::part(icon)::before {
		content: "\\f104";
	}
	kol-button.next::part(icon)::before {
		content: "\\f105";
	}
	kol-button.last::part(icon)::before {
		content: "\\f101";
	}`,
	'KOL-INPUT-RANGE': `/* https://www.cssportal.com/style-input-range/ */
	kol-input {
		display: grid;
	}
	kol-input label {
		display: grid;
		order: 2;
		margin-bottom: 0.4em;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 3;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		order: 1;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: 1rem;
		display: inline-flex;
		line-height: 1.5em;
		border-color: var(--color-grey);
		border-width: 2px;
		border-style: solid;
		padding: 0.625em 0.875em;
		border-radius: 0.3125rem;
		overflow: hidden;
		width: calc(100% - 4em);
	}
	input,
	select:not([multiple]) {
		height: 2.75em;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	input:hover {
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
		border-color: var(--border-default);
	}
	.required #label::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.725em 0.875em;
		box-sizing: border-box;
		border-color: transparent;
		border-width: 2px;
		border-style: solid;
	}
	.icon-left input,
	.icon-left select {
		padding-left: calc(0.875em + 1em + 0.5em);
	}
	.icon-right input,
	.icon-right select {
		padding-right: calc(0.875em + 1em + 0.5em);
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grey);
		border-radius: 0.25rem;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	.icon-left input,
	.icon-left select {
		margin-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		margin-right: 2em;
	}
	input[type="range"] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	input[type="range"] {
		overflow: visible;
		background-color: var(--color-ice);
		border: 0;
		height: 0.5rem;
		padding: 0;
		padding-bottom: 0;
		margin-bottom: 0;
	}
	input[type="range"]::-webkit-slider-thumb {
		box-sizing: border-box;
		background-color: var(--color-midnight);
		height: 20px;
		width: 20px;
		border-radius: 20px;
		cursor: pointer;
		-webkit-appearance: none;
	}`,
	'KOL-LINK-BUTTON': `:host {
		display: inline-block;
	} /*-----------*/
	a {
		border-width: 1px;
		border-style: solid;
		min-width: 44px;
		min-height: 44px;
		display: grid;
		gap: 0.25em;
		line-height: 1.5rem;
		font-family: var(--font-family);
		font-weight: 700;
		cursor: pointer;
		align-items: center;
		padding: 8px 14px;
		justify-content: center;
		font-style: normal;
		text-align: center;
		text-transform: uppercase;
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	a:hover:enabled {
		text-decoration: underline;
	}
	.primary a,
	.primary a:active,
	.primary a:hover {
		background-color: var(--color-gruen-dunkel);
		border-color: var(--color-gruen-dunkel);
		color: var(--color-weiss);
	}
	.secondary a,
	.danger a,
	.normal a,
	.ghost a {
		background-color: var(--color-weiss);
		border-color: var(--color-gruen-hell);
		color: var(--color-grau-dunkel);
	}
	.secondary a:active,
	.secondary a:hover {
		background-color: var(--color-gruen-dunkel);
		border-color: var(--color-gruen-dunkel);
		border-width: 1px;
		color: var(--color-weiss);
	}
	a:disabled,
	a:disabled:hover {
		background-color: var(--color-weiss);
		border-color: var(--color-grau-hell);
		color: var(--color-graublau);
		cursor: not-allowed;
	}
	a > span {
		display: flex;
		gap: 0.5em;
		margin: auto;
		align-items: center;
		justify-content: center;
	}
	a.icon-only {
		padding: 8px;
	}
	a.icon-only kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	a.loading kol-icon {
		animation: spin 5s infinite linear;
	}`,
	'KOL-BUTTON-LINK': `button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
	}
	kol-link-button-wc {
		display: inline-block;
	}
	button {
		color: var(--textFontColorblau);
		font-style: normal;
		font-weight: 400;
		display: inline-flex;
		line-height: 1.5em;
		text-decoration-line: none !important;
		outline: none !important;
	}
	button:focus-within,
	button:hover {
		box-shadow: inset 0 -1px 0 0 currentColor;
	}
	kol-icon {
		padding: 0 0.25em;
		display: inline-block;
	}`,
	'KOL-ABBR': `abbr {
		text-decoration: none;
		border-bottom: dotted var(--color-metal) 1px;
	}`,
	'KOL-BREADCRUMB': `nav {
		width: 100%;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	kol-link {
		display: inline;
	}
	:host kol-icon[exportparts*="separator"] {
		padding: 0 0.5rem;
	}
	:host kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
		font-size: 0.875rem !important;
	}
	:host kol-icon::part(icon)::before {
		color: currentColor;
		font-family: "Font Awesome 6 Free";
	}
	:host ul > li:not(:first-child) kol-icon::part(icon)::before {
		content: "\\f105";
	}
	:host li > kol-link > kol-link-wc > a {
		color: red !important;
	}`,
	'KOL-MODAL': `:host .overlay .modal {
		max-height: calc(100% - 32px);
	}`,
	'KOL-ICON': `:host {
		color: inherit;
	} /*! * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) * Copyright 2022 Fonticons, Inc. */
	.fa {
		font-family: var(--fa-style-family, "Font Awesome 6 Free");
		font-weight: var(--fa-style, 900);
	}
	.fa,
	.fas,
	.fa-solid,
	.far,
	.fa-regular,
	.fal,
	.fa-light,
	.fat,
	.fa-thin,
	.fad,
	.fa-duotone,
	.fab,
	.fa-brands {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: var(--fa-display, inline-block);
		font-style: normal;
		font-variant: normal;
		line-height: 1;
		text-rendering: auto;
	}
	[class*="fa-"] {
		font-style: 0.8rem;
	} /************************************************************/
	.fa-arrow-right::before {
		content: "\\f061";
	}
	.fa-arrow-right-from-bracket::before {
		content: "\\f08b";
	}
	.fa-clock::before {
		content: "\\f017";
	}
	.fa-home::before {
		content: "\\f015";
	}
	.fa-times-circle::before {
		content: "\\f057";
	}
	.fa-exclamation-triangle::before {
		content: "\\f071";
	} /************************************************************/
	.fa-chevron-left::before {
		content: "\\f053";
	}
	.fa-chevron-right::before {
		content: "\\f054";
	}
	.fa-download::before {
		content: "\\f019";
	}
	fa-exclamation-triangle::before {
		content: "\\f071";
	}
	.fa-file::before {
		content: "\\f15b";
	}
	.fa-house::before {
		content: "\\f015";
	}
	.fa-link::before {
		content: "\\f0c1";
	}
	.fa-plus::before {
		content: "\\2b";
	}
	.fa-search::before {
		content: "\\f002";
	}
	.fa-times-circle::before {
		content: "\\f057";
	}
	.fa-arrow-up-right-from-square::before {
		content: "\\f08e";
	}
	.fa-user::before {
		content: "\\f007";
	}
	.fa-xmark::before {
		content: "\\f00d";
	} /************************************************************/
	:root,
	:host {
		--fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
	}
	@font-face {
		font-family: "Font Awesome 6 Free";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url("../webfonts/fa-regular-400.woff2") format("woff2"),
		url("../webfonts/fa-regular-400.ttf") format("truetype");
	}
	.far,
	.fa-regular {
		font-family: "Font Awesome 6 Free";
		font-weight: 400;
	}
	:root,
	:host {
		--fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
	}
	@font-face {
		font-family: "Font Awesome 6 Free";
		font-style: normal;
		font-weight: 900;
		font-display: block;
		src: url("../webfonts/fa-solid-900.woff2") format("woff2"),
		url("../webfonts/fa-solid-900.ttf") format("truetype");
	}
	.fas,
	.fa-solid {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	@font-face {
		font-family: "Font Awesome 5 Brands";
		font-display: block;
		font-weight: 400;
		src: url("../webfonts/fa-brands-400.woff2") format("woff2"),
		url("../webfonts/fa-brands-400.ttf") format("truetype");
	}
	@font-face {
		font-family: "Font Awesome 5 Free";
		font-display: block;
		font-weight: 900;
		src: url("../webfonts/fa-solid-900.woff2") format("woff2"),
		url("../webfonts/fa-solid-900.ttf") format("truetype");
	}
	@font-face {
		font-family: "Font Awesome 5 Free";
		font-display: block;
		font-weight: 400;
		src: url("../webfonts/fa-regular-400.woff2") format("woff2"),
		url("../webfonts/fa-regular-400.ttf") format("truetype");
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url("../webfonts/fa-solid-900.woff2") format("woff2"),
		url("../webfonts/fa-solid-900.ttf") format("truetype");
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url("../webfonts/fa-brands-400.woff2") format("woff2"),
		url("../webfonts/fa-brands-400.ttf") format("truetype");
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url("../webfonts/fa-regular-400.woff2") format("woff2"),
		url("../webfonts/fa-regular-400.ttf") format("truetype");
		unicode-range: U+F003, U+F006, U+F014, U+F016-F017, U+F01A-F01B, U+F01D,
		U+F022, U+F03E, U+F044, U+F046, U+F05C-F05D, U+F06E, U+F070, U+F087-F088,
		U+F08A, U+F094, U+F096-F097, U+F09D, U+F0A0, U+F0A2, U+F0A4-F0A7, U+F0C5,
		U+F0C7, U+F0E5-F0E6, U+F0EB, U+F0F6-F0F8, U+F10C, U+F114-F115, U+F118-F11A,
		U+F11C-F11D, U+F133, U+F147, U+F14E, U+F150-F152, U+F185-F186, U+F18E,
		U+F190-F192, U+F196, U+F1C1-F1C9, U+F1D9, U+F1DB, U+F1E3, U+F1EA, U+F1F7,
		U+F1F9, U+F20A, U+F247-F248, U+F24A, U+F24D, U+F255-F25B, U+F25D,
		U+F271-F274, U+F278, U+F27B, U+F28C, U+F28E, U+F29C, U+F2B5, U+F2B7, U+F2BA,
		U+F2BC, U+F2BE, U+F2C0-F2C1, U+F2C3, U+F2D0, U+F2D2, U+F2D4, U+F2DC;
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url("../webfonts/fa-v4compatibility.woff2") format("woff2"),
		url("../webfonts/fa-v4compatibility.ttf") format("truetype");
		unicode-range: U+F041, U+F047, U+F065-F066, U+F07D-F07E, U+F080, U+F08B,
		U+F08E, U+F090, U+F09A, U+F0AC, U+F0AE, U+F0B2, U+F0D0, U+F0D6, U+F0E4,
		U+F0EC, U+F10A-F10B, U+F123, U+F13E, U+F148-F149, U+F14C, U+F156, U+F15E,
		U+F160-F161, U+F163, U+F175-F178, U+F195, U+F1F8, U+F219, U+F250, U+F252,
		U+F27A;
	}`,
	'KOL-SKIP-NAV': `kol-link-wc > a > kol-span-wc {
		border-radius: var(--a11y-min-size);
		border-style: solid;
		border-width: 2px;
		gap: 0.5rem;
		line-height: 1rem;
		padding: 8px 14px;
		background-color: var(--color-ocean);
		border-color: var(--color-ocean);
		color: var(--color-white);
		cursor: pointer;
	}`,
	'KOL-LINK-GROUP': `ul {
		list-style: none;
		margin: 0px;
		padding: 0px;
	}
	nav.horizontal ul {
		display: flex;
		flex-wrap: wrap;
	}
	nav.horizontal li {
		list-style: none;
		margin-left: 1.25rem;
		margin-right: 0.25rem;
	}
	nav.horizontal li:first-child {
		margin-left: 0;
	}
	nav.horizontal li:last-child {
		margin-right: 0;
	}
	nav.vertical li {
		margin-left: 1.75rem;
		margin-right: 0.5rem;
	}
	li.list-none {
		list-style-type: none !important;
		margin-left: 0;
	}`,
	'KOL-TOOLTIP': `:host {
		--kolibri-font-size: var(--textFontSize);
	}`,
});
