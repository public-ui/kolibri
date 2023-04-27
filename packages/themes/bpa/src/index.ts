import { KoliBri } from '@public-ui/components';

// Presse- und Informationsamt der Bundesregierung
export const BPA = KoliBri.createTheme('bpa', {
	GLOBAL: `:host {
		--font-family-sans: BundesSans Web, Arial, Helvetica, sans-serif;
		--font-family-serif: BundesSerif Web, var(--kolibri-font-family-sans);
		--font-family: var(--kolibri-font-family-sans), Helvetica, sans-serif;
		--font-weight: 400;
		--font-weight-bold: bold;
		--color-white: white;
		--color-black: #111314;
		--color-blue: #0077b6;
		--color-darkblue: #004b76;
		--color-darkgray: #576164;
		--color-lightgray: #bec5c9;
		--color-lightgray-40: #e5e8e9;
		--color-red: #c0003c;
		--color-lightorange: #f7bb3d;
		--color-orange: #e19688;
		--color-green: #00854a;
		--color-cyan: #00818b;
		--color-violet-40: #bfadbc;
		--color-violet-20: #dfd6de;
	}
	@keyframes blinker {
		50% {
			opacity: 0.25;
		}
	}
	:host {
		font-family: var(--font-family-sans);
		color: var(--color-black);
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-heading);
		margin: 0;
		padding: 0;
	}
	a,
	button {
		font-size: var(--font-size);
		outline: none;
	}
	p {
		font-size: 1.5rem;
	}
	kol-span-wc,
	kol-span-wc > span {
		gap: 0.5em;
	}
	kol-tooltip #arrow {
		display: none;
	}
	kol-tooltip .area {
		background-color: var(--color-lightgray-40);
	}
	kol-tooltip kol-span-wc {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		border-radius: 2px;
		border: 1px solid var(--color-lightgray);
		margin: 0.25rem;
	}
	@media only screen and (min-width: 600px) {
		kol-tooltip kol-span-wc {
			font-size: 1rem;
			line-height: 1.375rem;
		}
	}`,
	'KOL-HEADING': `/* https://styleguide.bundesregierung.de/sg-de/medien/digitale-medien/webanwendungen/komponenten/atome/heading */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--font-family-heading);
	}
	h1 {
		margin-bottom: 1.5rem;
		font-size: 2rem;
		font-weight: 400;
		line-height: 2.5rem;
	}
	@media (min-width: 64rem) {
		h1 {
			font-size: 2.875rem;
			line-height: 3.125rem;
		}
	}
	@media (min-width: 85.375rem) {
		h1 {
			font-size: 3.5rem;
			line-height: 4.5rem;
		}
	}
	h2 {
		margin-bottom: 1.5rem;
		font-size: 1.75rem;
		font-weight: 400;
		line-height: 2rem;
		color: var(--color-blue);
	}
	@media (min-width: 64rem) {
		h2 {
			font-size: 2.5rem;
			line-height: 3rem;
		}
	}
	@media (min-width: 85.375rem) {
		h2 {
			font-size: 2.875rem;
			line-height: 3.125rem;
		}
	}
	h3 {
		margin-bottom: 1.5rem;
		font-size: 1.625rem;
		font-weight: 400;
		line-height: 2rem;
	}
	@media (min-width: 64rem) {
		h3 {
			font-size: 1.75rem;
			line-height: 2.25rem;
		}
	}
	@media (min-width: 85.375rem) {
		h3 {
			font-size: 2rem;
			line-height: 2.625rem;
		}
	}
	h4 {
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.75rem;
	}
	@media (min-width: 64rem) {
		h4 {
			font-size: 1.625rem;
			line-height: 1.875rem;
		}
	}
	@media (min-width: 85.375rem) {
		h4 {
			font-size: 1.75rem;
			line-height: 2.25rem;
		}
	}
	h5 {
		margin-bottom: 1.5rem;
		font-size: 1.1875rem;
		font-weight: 700;
		line-height: 1.75rem;
	}
	@media (min-width: 64rem) {
		h5 {
			font-size: 1.375rem;
			line-height: 1.875rem;
		}
	}
	@media (min-width: 85.375rem) {
		h5 {
			font-size: 1.5rem;
			line-height: 2.125rem;
		}
	}
	h6 {
		color: #f0f;
		animation: blinker 0.25s linear infinite;
	}`,
	'KOL-BADGE': `:host > span {
		border-radius: 2px;
	}
	:host > span > kol-span-wc {
		font-family: var(--font-family-heading);
		padding: 0.25rem 0.5rem;
	}
	:host > span > kol-span-wc > span {
		gap: 0.5rem;
	}`,
	'KOL-BUTTON': `button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: 1px solid var(--color-darkgray);
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	button.ghost > kol-span-wc {
		border: none;
	}
	button > kol-span-wc > span {
		gap: 0.625rem;
	}
	button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	button:not(:disabled):is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	button:not(:disabled):is(:hover, :focus) > kol-span-wc {
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	button:focus {
		outline: none;
	}`,
	'KOL-ALERT': `:host .success {
		color: var(--color-green);
	}
	:host .warning {
		color: var(--color-orange);
	}
	:host .error {
		color: var(--color-red);
	}
	:host .info {
		color: var(--color-cyan);
	}
	:host > div {
		border: none;
		background-color: var(--color-white);
	}
	@media only screen and (min-width: 600px) {
		:host > div {
			font-size: 1.125rem;
		}
	}
	.heading .heading-icon {
		height: 100%;
		width: 2em;
	}
	.success .heading-icon {
		color: var(--color-green);
	}
	.warning .heading-icon {
		color: var(--color-orange);
	}
	.error .heading-icon {
		color: var(--color-red);
	}
	.info .heading-icon {
		color: var(--color-cyan);
	}
	.default .heading-icon {
		color: var(--color-black);
	}
	.close {
		align-self: start;
	}
	.card.success {
		border: 1px solid var(--color-green);
	}
	.card.warning {
		border: 1px solid var(--color-orange);
	}
	.card.error {
		border: 1px solid var(--color-red);
	}
	.card.info {
		border: 1px solid var(--color-cyan);
	}
	.card.default {
		border: 1px solid var(--color-black);
	}
	.card .heading {
		padding: 0.5rem;
	}
	.card .content {
		padding: 0.5rem;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		border-left: none;
		box-shadow: -4px 0px 0px var(--color-blue);
		padding: 0.25em 0.5em;
		width: 100%;
	}`,
	'KOL-CARD': `:host {
		color: var(--color-white);
		background-color: var(--color-darkblue);
		padding: 4.5454545455%;
	}
	:host .headline {
		font-size: 1.375rem;
		line-height: 1.5rem;
		margin: 1rem 0;
	}
	@media only screen and (min-width: 600px) and (max-width: 1023px) {
		:host .headline {
			font-size: 1.5rem;
			line-height: 1.75rem;
		}
	}
	@media only screen and (min-width: 1024px) {
		:host .headline {
			font-size: 2rem;
			line-height: 2.25rem;
		}
	}
	:host .content {
		font-size: 1.1875rem;
		line-height: 1.6875rem;
	}
	@media only screen and (min-width: 600px) and (max-width: 1023px) {
		:host .content {
			font-size: 1.375rem;
			line-height: 2rem;
		}
	}
	@media only screen and (min-width: 1024px) {
		:host.content {
			font-size: 1.5rem;
			line-height: 2.125rem;
		}
	}
	:host .footer {
		margin: 1rem 0;
	}
	:is(h1, h2, h3, h4, h5, h6) {
		font-weight: 400;
	}`,
	'KOL-INPUT-CHECKBOX': `kol-input {
		gap: 0.1rem 0.75rem;
		font-size: 1.375rem;
	}
	input[type="checkbox"]:focus {
		outline: var(--color-black) dotted 1px;
		outline-offset: 0.15rem;
	}
	.hint {
		font-size: 1.125rem;
	}
	.default input[type="checkbox"] {
		border-width: 1px;
		padding: 0.125rem;
		width: 1.375rem;
		height: 1.375rem;
	}
	.default input[type="checkbox"]:checked {
		color: var(--color-white);
		background-color: var(--color-blue);
		border-color: var(--color-blue);
		padding: 0;
	}
	.default input[type="checkbox"]:checked:before {
		left: 0.35rem;
		top: 45%;
		height: 0.6rem;
		width: 0.25rem;
		transform: rotate(45deg) translate(-50%, -50%);
		border-width: 0px 2px 2px 0px;
	}
	.default input[type="checkbox"]:indeterminate:before {
		background-color: var(--color-blue);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	kol-input > kol-alert {
		order: 3;
	}
	.switch input[type="checkbox"] {
		border-width: 1px;
	}
	.switch input[type="checkbox"]:before {
		background-color: var(--color-blue);
		height: 1.3em;
		width: 1.3em;
	}
	kol-input.button {
		font-family: var(----font-family);
		font-size: 1rem;
		line-height: 1.125rem;
		padding: 0.625rem 1.125rem;
		border: 1px solid var(--color-darkgray);
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
		gap: 0.625rem;
	}
	kol-input.button {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-input.button kol-icon {
		color: var(--color-blue);
	}
	kol-input.button:is(:hover, :focus) kol-icon {
		color: var(--color-white);
	}
	kol-input.button:is(:hover, :focus) {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-input.button:is(:hover, :focus) {
		outline: 1px dotted var(--color-black);
		border: 1px solid var(--color-blue);
	}`,
	'KOL-ICON': `/* https: //styleguide.bundesregierung.de/sg-de/medien/digitale-medien/webanwendungen/komponenten/atome/icon */`,
	'KOL-ABBR': `:host abbr {
		text-decoration: none;
		border-bottom: 1px dotted currentColor;
	}`,
	'KOL-LINK-BUTTON': `.button a kol-span-wc {
		font-family: var(----font-family);
		font-size: 1rem;
		line-height: 1.125rem;
		padding: 0.625rem 1.125rem;
		border: 1px solid var(--color-darkgray);
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	.icon-only > kol-span-wc {
		padding: 0.625rem;
	}
	.button.ghost a kol-span-wc {
		border: none;
	}
	.button a kol-span-wc > span {
		gap: 0.625rem;
	}
	.button a kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	.button a kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	a:is(:hover, :focus) kol-span-wc kol-icon {
		color: var(--color-white);
	}
	a:is(:hover, :focus) kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	a:is(:hover, :focus) kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: 1px solid var(--color-blue);
	}
	a:is(:hover, :focus) {
		outline: none;
	}`,
	'KOL-INPUT-TEXT': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	} /* Move label over input as placeholder */
	:host label {
		transition: all 0.3s ease-in-out 0ms;
		transform-origin: 0;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label {
		transform: translateY(1.9375rem) scale(1.3333333333);
		cursor: text;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within):has(div.icon-left) label {
		transform: translateX(2.5rem) translateY(1.9375rem) scale(1.3333333333);
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label,
	input::placeholder {
		color: var(--color-darkgray);
	}
	:host([_error]:not(.has-value)) kol-input:not(:focus-within) label {
		color: var(--color-red);
	} /* Move hint under input */
	span.hint {
		order: 1;
	}
	span.hint::before {
		font-family: codicon;
		font-size: 1rem;
		content: "\\ea74";
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input input {
		border: none;
		background-color: var(--color-white);
		outline: none;
		height: 2.5rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input input::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}
	kol-button-wc > button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: none;
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	kol-button-wc > button > kol-span-wc > span {
		gap: 0.625rem;
	}
	kol-button-wc > button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-button-wc > button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-button-wc > button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	kol-button-wc > button:focus {
		outline: none;
	}`,
	'KOL-INPUT-EMAIL': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	} /* Move label over input as placeholder */
	:host label {
		transition: all 0.3s ease-in-out 0ms;
		transform-origin: 0;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label {
		transform: translateY(1.9375rem) scale(1.3333333333);
		cursor: text;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within):has(div.icon-left) label {
		transform: translateX(2.5rem) translateY(1.9375rem) scale(1.3333333333);
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label,
	input::placeholder {
		color: var(--color-darkgray);
	}
	:host([_error]) kol-input:not(:focus-within) label {
		color: var(--color-red);
	} /* Move hint under input */
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input input {
		border: none;
		background-color: var(--color-white);
		outline: none;
		height: 2.5rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input input::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}
	kol-button-wc > button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: none;
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	kol-button-wc > button > kol-span-wc > span {
		gap: 0.625rem;
	}
	kol-button-wc > button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-button-wc > button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-button-wc > button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	kol-button-wc > button:focus {
		outline: none;
	}`,
	'KOL-INPUT-NUMBER': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	} /* Move label over input as placeholder */
	:host(:not(.has-value)) kol-input:has(input[type="number"]) label {
		transition: all 0.3s ease-in-out 0ms;
		transform-origin: 0;
	}
	:host(:not(.has-value)) kol-input:has(input[type="number"]):not(:focus-within) label {
		transform: translateY(1.9375rem) scale(1.3333333333);
		cursor: text;
	}
	:host(:not(.has-value)) kol-input:has(input[type="number"]):not(:focus-within):has(div.icon-left) label {
		transform: translateX(2.5rem) translateY(1.9375rem) scale(1.3333333333);
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label,
	input::placeholder {
		color: var(--color-darkgray);
	}
	:host([_error]) kol-input:not(:focus-within) label {
		color: var(--color-red);
	}
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input input {
		border: none;
		background-color: var(--color-white);
		outline: none;
		height: 2.5rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input input::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}
	kol-button-wc > button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: none;
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	kol-button-wc > button > kol-span-wc > span {
		gap: 0.625rem;
	}
	kol-button-wc > button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-button-wc > button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-button-wc > button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	kol-button-wc > button:focus {
		outline: none;
	}`,
	'KOL-INPUT-COLOR': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	} /* Move hint under input */
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input input {
		border: none;
		background-color: var(--color-white);
		outline: none;
		height: 2.5rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input input::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}
	kol-button-wc > button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: none;
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	kol-button-wc > button > kol-span-wc > span {
		gap: 0.625rem;
	}
	kol-button-wc > button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-button-wc > button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-button-wc > button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	kol-button-wc > button:focus {
		outline: none;
	}`,
	'KOL-INPUT-FILE': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	} /* Move hint under input */
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		align-items: baseline;
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input input {
		border: none;
		background-color: var(--color-white);
		outline: none;
		height: 3.2rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input input::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}
	kol-button-wc > button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: none;
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	kol-button-wc > button > kol-span-wc > span {
		gap: 0.625rem;
	}
	kol-button-wc > button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-button-wc > button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-button-wc > button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	kol-button-wc > button:focus {
		outline: none;
	}`,
	'KOL-INPUT-PASSWORD': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	} /* Move label over input as placeholder */
	:host label {
		transition: all 0.3s ease-in-out 0ms;
		transform-origin: 0;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label {
		transform: translateY(1.9375rem) scale(1.3333333333);
		cursor: text;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within):has(div.icon-left) label {
		transform: translateX(2.5rem) translateY(1.9375rem) scale(1.3333333333);
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label,
	input::placeholder {
		color: var(--color-darkgray);
	}
	:host([_error]) kol-input:not(:focus-within) label {
		color: var(--color-red);
	} /* Move hint under input */
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		align-items: baseline;
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input input {
		border: none;
		background-color: var(--color-white);
		outline: none;
		height: 2.5rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input input::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}
	kol-button-wc > button > kol-span-wc {
		padding: 0.625rem 1.125rem;
		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.125rem;
		border: none;
		border-radius: 0.125rem;
		transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
	}
	kol-button-wc > button > kol-span-wc > span {
		gap: 0.625rem;
	}
	kol-button-wc > button > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-black);
	}
	kol-button-wc > button > kol-span-wc kol-icon {
		color: var(--color-blue);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc kol-icon {
		color: var(--color-white);
	}
	kol-button-wc > button:is(:hover, :focus) > kol-span-wc {
		cursor: pointer;
		background-color: var(--color-blue);
		color: var(--color-white);
	}
	kol-button-wc > button:focus > kol-span-wc {
		outline: 1px dotted var(--color-black);
		border: none;
	}
	kol-button-wc > button:focus {
		outline: none;
	}`,
	'KOL-TEXTAREA': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
		line-height: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
			line-height: 1.125rem;
		}
	} /* Move label over input as placeholder */
	:host label {
		transition: all 0.3s ease-in-out 0ms;
		transform-origin: 0;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label {
		transform: translateY(1.9375rem) scale(1.3333333333);
		cursor: text;
	}
	:host(:not(.has-value)) kol-input:not(:focus-within):has(div.icon-left) label {
		transform: translateX(2.5rem) translateY(1.9375rem) scale(1.3333333333);
	}
	:host(:not(.has-value)) kol-input:not(:focus-within) label,
	textarea::placeholder {
		color: var(--color-darkgray);
	}
	:host([_error]:not(.has-value)) kol-input:not(:focus-within) label {
		color: var(--color-red);
	} /* Move hint under input */
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input textarea:focus {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input textarea {
		border: none;
		border-bottom: 1px solid var(--color-lightgray);
		background-color: var(--color-white);
		outline: none;
		height: 2.5rem;
		font-size: 1.5rem;
		padding: 0;
	}
	kol-input:has(label:not([hidden])) div.input textarea::placeholder {
		color: transparent;
	}
	kol-alert {
		margin-top: 1.5rem;
	}`,
	'KOL-INPUT-RANGE': `input[type="range"] {
		height: 3em;
		background-color: transparent;
		outline: none;
	}
	input[type="range"]::-webkit-slider-thumb {
		border: none;
		margin-top: -0.5em;
		height: 1.5em;
		width: 1.5em;
		border-radius: 100%;
		background: var(--color-darkblue);
		cursor: pointer;
	}
	input[type="range"]::-moz-range-thumb {
		border: 1px solid var(--color-darkblue);
		height: 2em;
		width: 1em;
		border-radius: 3px;
		background: var(--color-blue);
		cursor: pointer;
		box-shadow: 1px 1px 1px var(--color-black), 0px 0px 1px var(--color-darkgray);
	}
	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: 0.5em;
		cursor: pointer;
		background: var(--color-lightgray);
		border-radius: 0.25em;
		border: none;
	}
	input[type="range"]:focus::-webkit-slider-runnable-track {
		outline: var(--color-black) dotted 1px;
		outline-offset: 0.25em;
	}
	input[type="range"]::-moz-range-track {
		width: 100%;
		height: 0.5em;
		cursor: pointer;
		background: var(--color-lightgray);
		border-radius: 0.25em;
		border: none;
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
		stroke: var(--color-lightgray);
	}
	svg line:last-child,
	svg circle:last-child {
		stroke: var(--color-darkblue);
		fill: transparent;
	}
	progress {
		display: none;
	}`,
	'KOL-INPUT-RADIO': `:host {
		font-size: 1.375rem;
		line-height: 2rem;
	}
	input {
		border: 1px solid var(--color-blue);
	}
	input:focus {
		border: 1px dashed var(--color-blue);
		outline: none;
	}
	.disabled {
		opacity: 0.5;
	}
	.disabled label,
	.disabled input {
		cursor: not-allowed;
	}
	input:checked::before {
		background-color: var(--color-blue);
	}
	fieldset {
		border: none;
	}
	fieldset.vertical {
		gap: 0.5rem;
	}
	fieldset.horizontal {
		gap: 2.5rem;
	}
	div[slot="input"] {
		gap: 0.5rem;
	}`,
	'KOL-LINK': `a {
		margin-bottom: 0;
		font-weight: 700;
		vertical-align: top;
		text-decoration: none;
		color: var(--color-blue);
		gap: 0.25rem;
	}
	a:focus,
	a:hover {
		color: var(--color-darkblue);
	}
	a:focus {
		outline: var(--color-darkblue) solid 1px;
		outline-offset: 2px;
		border-radius: 2px;
	}
	a:visited {
		text-decoration: underline;
	}
	kol-icon {
		color: var(--color-blue);
	}
	kol-icon:hover {
		color: var(--color-darkblue);
	}
	kol-span-wc > span {
		gap: 0.25rem;
	}`,
	'KOL-BUTTON-LINK': `button {
		margin-bottom: 0;
		font-weight: 700;
		vertical-align: top;
		text-decoration: none;
		color: var(--color-blue);
	}
	button:focus,
	button:hover {
		color: var(--color-darkblue);
	}
	button:focus {
		outline: var(--color-darkblue) solid 1px;
		outline-offset: 2px;
		border-radius: 2px;
	}
	kol-icon {
		color: var(--color-blue);
	}
	kol-icon:hover {
		color: var(--color-darkblue);
	}
	kol-span-wc > span {
		gap: 0.25rem;
	}`,
	'KOL-SELECT': `:host label {
		color: var(--color-darkblue);
		font-size: 0.9375rem;
	}
	@media (min-width: 37.5rem) {
		:host label {
			font-size: 1.125rem;
		}
	}
	span.hint {
		order: 1;
	}
	kol-alert {
		order: 2;
	}
	:host([_error]) label {
		color: var(--color-red);
	}
	div.input {
		border-bottom: 1px solid var(--color-lightgray);
	}
	div.input:focus-within {
		border-bottom: 1px solid var(--color-darkgray);
	}
	div.input select {
		border: none;
		background-color: var(--color-white);
		outline: none;
		font-size: 1.5rem;
		padding: 0;
	}
	div.input select:not([multiple]) {
		height: 2.5rem;
	}
	kol-alert {
		margin-top: 1.5rem;
	}`,
	'KOL-ACCORDION': `.headline button {
		font-size: 1.1875rem;
		line-height: 1.6875rem;
	}
	@media only screen and (min-width: 600px) and (max-width: 1023px) {
		.headline button {
			font-size: 1.375rem;
			line-height: 2rem;
		}
	}
	@media only screen and (min-width: 1024px) {
		.headline button {
			font-size: 1.5rem;
			line-height: 2.125rem;
		}
	}
	.headline {
		margin: 0;
		padding: 0;
	}
	.headline button {
		padding: 1rem 1rem 1rem 3.125rem;
	}
	.headline button:is(:focus, :hover) {
		text-decoration: underline;
	}
	.headline kol-span-wc {
		display: block;
	}
	.headline kol-span-wc > span {
		align-items: flex-start;
	}
	.headline kol-span-wc > span > kol-icon {
		display: block;
		order: 2;
	}
	.headline kol-span-wc > span > span {
		flex-grow: 1;
		order: 1;
		text-align: start;
	}
	:host {
		border-top: 1px solid var(--color-violet-40);
	}
	.content {
		padding: 3.125rem;
		background-color: var(--color-violet-20);
	}
	button {
		outline: none;
	}
	:host > div > kol-heading-wc button kol-icon {
		font-size: 1rem;
	}
	:host > div > kol-heading-wc button kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	:host > div.open > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\f077";
	}
	:host > div.close > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\f078";
	}`,
	'KOL-TABLE': `:host > div {
		overflow-x: auto;
		overflow-y: hidden;
	}
	caption {
		padding: 0.5em;
	}
	:host th {
		font-weight: normal;
		background-color: var(--color-darkblue);
		color: var(--color-white);
	}
	:host table thead tr:first-child th,
	:host table thead tr:first-child td {
		border-width: 0;
		border-top-width: 2px;
		border-style: solid;
		border-color: var(--color-darkgray);
	}
	table {
		width: 100%;
		border-spacing: 0;
	}
	table,
	:host table thead tr:last-child th,
	:host table thead tr:last-child td {
		border-width: 0;
		border-bottom-width: 2px;
		border-style: solid;
		border-color: var(--color-darkgray);
	}
	th {
		background-color: var(--color-white);
	}
	th div {
		width: 100%;
		display: flex;
		gap: 0.5em;
		grid-template-columns: 1fr auto;
		align-items: center;
	}
	th div.center {
		justify-content: center;
	}
	th div.right {
		justify-content: end;
	}
	tbody tr:nth-child(odd) {
		background-color: var(--color-lightgray-40);
	}
	th,
	td {
		padding: 0.5em;
	}
	td.center > div {
		display: flex;
		justify-content: center;
	}
	td.right > div {
		display: flex;
		justify-content: end;
	}
	th[aria-sort="ascending"],
	th[aria-sort="descending"] {
		font-weight: 700;
	}
	:host > div:last-child {
		padding: 0.5em;
	}
	:host > div:last-child,
	:host > div:last-child > div:last-child {
		display: grid;
		align-items: center;
		justify-items: center;
		gap: 1em;
	}
	@media (min-width: 1024px) {
		:host > div:last-child,
		:host > div:last-child > div:last-child {
			grid-auto-flow: column;
		}
		:host > div:last-child kol-pagination {
			display: flex;
			gap: 1rem;
		}
	}`,
	'KOL-TABS': `:host {
		--kolibri-spacing: 0.25rem;
	}
	kol-button-group-wc {
		border-bottom: 1px solid var(--color-lightgray);
		margin-bottom: -1px;
	}
	kol-button-group-wc button {
		border: none;
		margin-bottom: -1px;
	}
	kol-button-group-wc button kol-span-wc {
		padding: 0.5rem;
		min-height: 44px;
		min-width: 44px;
	}
	kol-button-group-wc button.selected kol-span-wc {
		border-color: var(--color-lightgray-40);
		border-style: solid;
		border-width: 1px;
		border-bottom-color: white;
		border-top-color: var(--color-blue);
		box-shadow: 0 -3px var(--color-blue);
		font-weight: var(--font-weight-bold);
		color: var(--color-blue);
	}
	kol-button-group-wc button:hover:not(:disabled) kol-span-wc {
		color: var(--color-darkblue);
	}
	kol-button-group-wc button:focus kol-span-wc {
		outline-color: var(--color-darkblue);
		outline-style: solid;
		outline-width: 2px;
	}`,
	'KOL-BUTTON-GROUP': `kol-button-group-wc {
		gap: 0.5rem;
	}`,
	'KOL-PAGINATION': `:host {
		display: grid;
		gap: var(--spacing-m);
	}
	:host > div {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
	}
	.selected button {
		min-width: 44px;
		min-height: 44px;
		display: grid;
		line-height: 1.5rem;
		font-family: var(--font-family);
		cursor: not-allowed;
		font-weight: 700;
		padding: 10px 12px;
		border: none;
		font-size: 16px;
		font-style: normal;
		text-align: center;
		text-decoration: underline;
		text-transform: uppercase;
		width: inherit;
		color: var(--color-white);
		background-color: var(--color-darkblue);
		border-color: var(--color-darkblue);
	}`,
});
