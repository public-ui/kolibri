import { KoliBri } from '@public-ui/schema';
import { css } from './cssTag';

// Europa Component Library - European Commission | https://ec.europa.eu/component-library/ec/
export const ECL_EC = KoliBri.createTheme('ecl-ec', {
	GLOBAL: css`
		kol-tooltip-wc .tooltip-area {
			background-color: #f2f2f2;
		}
		kol-tooltip-wc .tooltip-arrow {
			background-color: #626262;
		}
		kol-tooltip-wc .tooltip-content {
			padding: 0.25rem 0.5rem;
			font-size: 0.875rem;
			line-height: 1.25rem;
			border-radius: 2px;
			border: 1px solid #626262;
		}
		:host {
			--color-blue: #004494;
			--color-yellow: #ffd617;
			--color-grey: #404040;
			--color-blue-130: #002f67;
			--color-blue-120: #003776;
			--color-blue-110: #003d84;
			--color-blue-100: var(--color-blue);
			--color-blue-75: #4073af;
			--color-blue-50: #bfd0e4;
			--color-blue-25: #bfd0e4;
			--color-blue-5: #f2f5f9;
			--color-yellow-120: #f8ae21;
			--color-yellow-110: #fbc11d;
			--color-yellow-100: var(--color-yellow);
			--color-yellow-75: #ffde39;
			--color-yellow-50: #ffe879;
			--color-yellow-25: #fff4bb;
			--color-grey-100: var(--color-grey);
			--color-grey-75: #707070;
			--color-grey-50: #9f9f9f;
			--color-grey-25: #cfcfcf;
			--color-grey-20: #d9d9d9;
			--color-grey-15: #e3e3e3;
			--color-grey-10: #ebebeb;
			--color-grey-5: #f5f5f5;
			--color-grey-3: #f9f9f9;
			--color-blue-n: #006fb4;
			--color-orange: #f29527;
			--color-green: #467a39;
			--color-red: #da2131;
			--color-red-1xx: #981722;
			--color-black: #000;
			--color-white: #fff;
			--font-family: Arial, sans-serif;
			--font-size: 16px;
			--font-weight: 400;
			--font-weight-bold: 600;
			--line-height: 1.5em;
			--line-height-heading: 1.2em; /* ?! */
			--spacing-4xl: 64px;
			--spacing-3xl: 48px;
			--spacing-2xl: 40px;
			--spacing-xl: 32px;
			--spacing-l: 24px;
			--spacing-m: 16px;
			--spacing-s: 12px;
			--spacing-xs: 8px;
			--spacing-2xs: 4px; /* ?! */
		}
		:host {
			background-color: transparent; /* Reset global background-color defined by components */
			display: inline-block;
		}
		a,
		button {
			font-size: var(--font-size);
			outline: none;
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
		p {
			font-weight: var(--font-weight);
		}
		kol-span-wc,
		kol-span-wc > span {
			gap: 0.5em;
		}
		.required label span::after,
		.required legend span::after {
			color: var(--color-red);
			padding-left: 0.25em;
		}
	`,
	'KOL-HEADING': css`
		:host {
			font-family: var(--font-family);
		}
		.headline-h1 {
			font-size: 2rem;
			line-height: 2.5rem;
		}
		.headline-h2 {
			font-size: 1.75rem;
			line-height: 2rem;
		}
		.headline-h3 {
			font-size: 1.5rem;
			line-height: 1.75rem;
		}
		.headline-h4 {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
		.headline-h5 {
			font-size: 1rem;
			line-height: 1.5rem;
		}
		.headline-h6 {
			color: rgb(234, 0, 255);
		}
	`,
	'KOL-ACCORDION': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			background-color: var(--color-grey-5);
			border-color: var(--color-grey-25);
			border-style: solid;
			border-width: 1px;
		}
		:host > div .headline button {
			text-align: left;
			width: 100%;
			padding: 0 var(--spacing-m);
			display: flex;
			place-items: center;
		}
		:host > div .headline button kol-icon {
			margin-bottom: 0.75rem;
			margin-inline-end: 1rem;
			margin-inline-start: 0;
			margin-top: 0.75rem;
		}
		:host > div .headline button span {
			color: var(--color-grey);
			font-weight: var(--font-weight-bold);
			padding: 0.75rem 0;
			width: 100%;
		}
		:host > div[part*='open'] .headline button span {
			border-bottom: 1px solid var(--color-grey);
		}
		:host > div .headline button:focus,
		:host > div .headline button:hover {
			background-color: var(--color-grey-25);
		}
		:host > div .headline button:focus {
			outline: 2px solid var(--color-blue);
			outline-offset: -2px;
		}
		.content {
			padding: var(--spacing-s) var(--spacing-m);
		}
	`,
	'KOL-INDENTED-TEXT': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			border-end-start-radius: 0;
			border-inline-start: 10px solid var(--color-yellow);
			border-start-start-radius: 0;
			padding-bottom: 1rem;
			padding-inline-start: 1.5rem;
			padding-top: 1rem;
			margin: 0;
		}
	`,
	'KOL-BUTTON': css`
		:host {
			font-family: var(--font-family);
		}
		a,
		button {
			appearance: none;
			background: none;
			outline: none;
			text-decoration: none;
		}
		a kol-span-wc,
		button kol-span-wc {
			border-radius: 0;
			border-style: solid;
			border-width: 2px;
			font-weight: var(--font-weight-bold);
			margin: 0;
			min-height: 44px;
			min-width: 44px;
			padding: 0.25em 0.75em;
		}
		a:focus kol-span-wc,
		button:focus kol-span-wc {
			outline-offset: -4px;
			outline-width: 2px;
			outline-style: solid;
		}
		button.ghost:focus kol-span-wc {
			outline-offset: -2px;
		}
		.primary a kol-span-wc,
		.primary button kol-span-wc {
			background-color: var(--color-blue);
			border-color: var(--color-blue);
			color: var(--color-white);
		}
		.primary a:focus kol-span-wc,
		.primary button:focus kol-span-wc {
			outline-color: var(--color-white);
		}
		.primary a:hover kol-span-wc,
		.primary button:hover kol-span-wc {
			background-color: var(--color-blue-130);
			border-color: var(--color-blue-130);
		}
		.secondary a kol-span-wc,
		.secondary button kol-span-wc {
			background-color: var(--color-white);
			border-color: var(--color-blue);
			color: var(--color-blue);
		}
		.secondary a:focus kol-span-wc,
		.secondary button:focus kol-span-wc {
			outline-color: var(--color-blue);
			outline-offset: -6px;
		}
		.secondary a:hover kol-span-wc,
		.secondary button:hover kol-span-wc {
			border-color: var(--color-blue-130);
			color: var(--color-blue-130);
		}
		.normal a kol-span-wc, /* CTA */.normal button kol-span-wc {
			background-color: var(--color-yellow);
			border-color: var(--color-yellow);
			color: var(--color-black);
		}
		.normal a:hover kol-span-wc, /* CTA */.normal button:hover kol-span-wc {
			background-color: var(--color-yellow-120);
			border-color: var(--color-yellow-120);
		}
		.danger a kol-span-wc,
		.danger button kol-span-wc {
			background-color: var(--color-red);
			border-color: var(--color-red);
			color: var(--color-white);
		}
		.danger a:hover kol-span-wc,
		.danger button:hover kol-span-wc {
			background-color: var(--color-red);
			border-color: var(--color-red);
		}
		.ghost a kol-span-wc,
		.ghost button kol-span-wc {
			background-color: transparent;
			border-color: transparent;
			color: var(--color-blue);
		}
		.ghost a:focus kol-span-wc,
		.ghost button:focus kol-span-wc {
			outline-color: var(--color-blue);
		}
		.ghost a:hover kol-span-wc,
		.ghost button:hover kol-span-wc {
			color: var(--color-blue-130);
		}
	`,
	'KOL-LINK-BUTTON': css`
		:host {
			font-family: var(--font-family);
		}
		a,
		button {
			appearance: none;
			background: none;
			outline: none;
			text-decoration: none;
		}
		a kol-span-wc,
		button kol-span-wc {
			appearance: none;
			background: none;
			border-radius: 0;
			border-style: solid;
			border-width: 2px;
			font-weight: var(--font-weight-bold);
			margin: 0;
			min-height: 44px;
			min-width: 44px;
			padding: 0.25em 0.75em;
		}
		a:focus kol-span-wc,
		button:focus kol-span-wc {
			outline-offset: -4px;
			outline-width: 2px;
			outline-style: solid;
		}
		button.ghost:focus kol-span-wc {
			outline-offset: -2px;
		}
		.primary a kol-span-wc,
		.primary button kol-span-wc {
			background-color: var(--color-blue);
			border-color: var(--color-blue);
			color: var(--color-white);
		}
		.primary a:focus kol-span-wc,
		.primary button:focus kol-span-wc {
			outline-color: var(--color-white);
		}
		.primary a:hover kol-span-wc,
		.primary button:hover kol-span-wc {
			background-color: var(--color-blue-130);
			border-color: var(--color-blue-130);
		}
		.secondary a kol-span-wc,
		.secondary button kol-span-wc {
			background-color: var(--color-white);
			border-color: var(--color-blue);
			color: var(--color-blue);
		}
		.secondary a:focus kol-span-wc,
		.secondary button:focus kol-span-wc {
			outline-color: var(--color-blue);
			outline-offset: -6px;
		}
		.secondary a:hover kol-span-wc,
		.secondary button:hover kol-span-wc {
			border-color: var(--color-blue-130);
			color: var(--color-blue-130);
		}
		.normal a kol-span-wc, /* CTA */.normal button kol-span-wc {
			background-color: var(--color-yellow);
			border-color: var(--color-yellow);
			color: var(--color-black);
		}
		.normal a:hover kol-span-wc, /* CTA */.normal button:hover kol-span-wc {
			background-color: var(--color-yellow-120);
			border-color: var(--color-yellow-120);
		}
		.danger a kol-span-wc,
		.danger button kol-span-wc {
			background-color: var(--color-red);
			border-color: var(--color-red);
			color: var(--color-white);
		}
		.danger a:hover kol-span-wc,
		.danger button:hover kol-span-wc {
			background-color: var(--color-red);
			border-color: var(--color-red);
		}
		.ghost a kol-span-wc,
		.ghost button kol-span-wc {
			background-color: transparent;
			border-color: transparent;
			color: var(--color-blue);
		}
		.ghost a:focus kol-span-wc,
		.ghost button:focus kol-span-wc {
			outline-color: var(--color-blue);
		}
		.ghost a:hover kol-span-wc,
		.ghost button:hover kol-span-wc {
			color: var(--color-blue-130);
		}
	`,
	'KOL-BADGE': css`
		:host > span {
			font: normal normal var(--font-weight) 1em var(--font-family);
			padding: calc(0.5rem - 1px) calc(0.75rem - 1px);
			text-transform: uppercase;
		}
	`,
	'KOL-ALERT': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			background-color: var(--color-white);
		}
		:host > div.card {
			border-style: solid;
			border-width: 2px;
		}
		:host > div.msg {
			border: none;
		}
		:host .msg .heading kol-icon {
			font-size: 1.5em;
			margin: var(--spacing-2xs);
		}
		:host .msg .heading > div {
			padding: var(--spacing-2xs);
		}
		:host .card {
			padding-bottom: 1.5rem;
			padding-inline-end: 0.5rem;
			padding-inline-start: 1.5rem;
			padding-top: 1.5rem;
		}
		:host .card .heading {
			gap: 0.5rem;
		}
		:host .card .content {
			margin-left: 2.5rem;
		}
		:host .card .heading kol-icon {
			font-size: 2rem;
		}
		:host .default {
			border-color: var(--color-grey);
		}
		:host .default .heading kol-icon {
			color: var(--color-grey);
		}
		:host .error {
			border-color: var(--color-red);
		}
		:host .error .heading kol-icon {
			color: var(--color-red);
		}
		:host .info {
			border-color: var(--color-blue);
		}
		:host .info .heading kol-icon {
			color: var(--color-blue);
		}
		:host .success {
			border-color: var(--color-green);
		}
		:host .success .heading kol-icon {
			color: var(--color-green);
		}
		:host .warning {
			border-color: var(--color-orange);
		}
		:host .warning .heading kol-icon {
			color: var(--color-orange);
		}
	`,
	'KOL-AVATAR': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-TABS': css`
		:host {
			font-family: var(--font-family);
			--kolibri-spacing: 0.25rem;
		}
		kol-button-group-wc {
			border-bottom: 1px solid var(--color-grey-25);
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
			border-color: var(--color-grey-25);
			border-style: solid;
			border-width: 1px;
			border-bottom-color: white;
			border-top-color: var(--color-blue);
			box-shadow: 0 -3px var(--color-blue);
			font-weight: var(--font-weight-bold);
			color: var(--color-blue);
		}
		kol-button-group-wc button:hover:not(:disabled) kol-span-wc {
			color: var(--color-blue-130);
		}
		kol-button-group-wc button:focus kol-span-wc {
			outline-color: var(--color-blue-130);
			outline-style: solid;
			outline-width: 2px;
		}
	`,
	'KOL-LINK': css`
		a,
		button {
			appearance: none;
			color: var(--color-blue);
			text-decoration: underline;
		}
		a:hover,
		button:hover {
			color: var(--color-blue-130);
		}
	`,
	'KOL-BUTTON-LINK': css`
		:host {
			--kolibri-spacing: 0.25rem;
		}
		a,
		button {
			appearance: none;
			color: var(--color-blue);
			text-decoration: underline;
		}
		a:hover,
		button:hover {
			color: var(--color-blue-130);
		}
	`,
	'KOL-BREADCRUMB': css`
		:host {
			font:
				normal normal 400 0.875rem/1rem arial,
				sans-serif;
			font-weight: var(--font-weight-bold);
		}
		kol-icon::part(icon separator)::before {
			color: var(--color-blue);
		}
		li:last-child {
			color: var(--color-grey-75);
		}
		kol-icon[exportparts*='separator'] {
			margin-inline-end: 0.5rem;
			margin-inline-start: 0.5rem;
			padding: 0;
		}
		kol-link {
			font-family: var(--font-family);
		}
	`,
	'KOL-DETAILS': css`
		:host {
			font-family: var(--font-family);
		}
		details > kol-indented-text {
			margin: 0.175rem;
			padding: 0;
		}
	`,
	'KOL-PROGRESS': css`
		:host {
			font-family: var(--font-family);
		}
		:host progress,
		:host span {
			display: block;
			height: 0px;
			overflow: hidden;
			width: 0px;
		}
		svg line:first-child,
		svg circle:first-child {
			fill: transparent;
			stroke: var(--color-grey-25);
		}
		svg line:last-child,
		svg circle:last-child {
			stroke: var(--color-blue-130);
			fill: transparent;
		}
		progress {
			display: none;
		}
	`,
	'KOL-SPIN': css`
		.cycle {
			padding: 0.125rem;
			& span {
				background-color: var(--color-blue-75);
			}
		}
	`,
	'KOL-PAGINATION': css`
		:host {
			display: grid;
			font-family: var(--font-family);
		}
		.button {
			appearance: none;
			background: none;
			outline: none;
			text-decoration: none;
		}
		.button-inner {
			background-color: var(--color-yellow);
			border: 2px solid var(--color-yellow);
			color: var(--color-black);
			font-weight: var(--font-weight-bold);
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 0.25em 0.75em;
		}
		.button:not(:disabled):hover .button-inner {
			background-color: var(--color-yellow-120);
			border-color: var(--color-yellow-120);
		}
		.button:focus .button-inner {
			outline-offset: -4px;
			outline: 2px solid var(--color-black);
		}
		.button:disabled .button-inner {
			cursor: not-allowed;
			opacity: 0.5;
		}
		.selected .button-inner {
			background-color: var(--color-blue);
			border-color: var(--color-blue);
			color: var(--color-white);
			opacity: 1 !important;
			text-decoration: underline;
		}
	`,
	'KOL-INPUT-CHECKBOX': css`
		:host {
			font-family: var(--font-family);
		}
		.checkbox-container {
			justify-content: flex-start;
		}
		input[type='checkbox'] {
			background-color: var(--color-white);
			border-width: 2px;
			border-style: solid;
			color: var(--color-grey);
			line-height: 1.5em;
			font-size: 1rem;
		}
		input[type='checkbox']:focus {
			outline-color: var(--color-blue);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 2px;
		}
		input[type='checkbox'] {
			border-color: var(--color-grey-75);
		}
		input[type='checkbox']:checked {
			background-color: var(--color-blue);
			border-color: var(--color-blue);
		}
		input[type='checkbox']:hover {
			border-color: var(--color-blue);
		}
		input[type='checkbox']:checked:hover {
			background-color: var(--color-blue-130);
			border-color: var(--color-blue-130);
		}
		.error input[type='checkbox'] {
			border-color: var(--color-red);
		}
		.error input[type='checkbox']:checked {
			background-color: var(--color-red);
			border-color: var(--color-red);
		}
		.error input[type='checkbox']:hover {
			border-color: var(--color-red);
		}
		.error input[type='checkbox']:checked:hover {
			background-color: var(--color-red-1xx);
			border-color: var(--color-red-1xx);
		}
		.error.required label > span::after {
			color: var(--color-red);
		}

		.default .icon {
			margin-left: 0.2rem;
		}
		.default.checked .icon {
			color: var(--color-white);
		}

		.switch input[type='checkbox'] {
			display: block;
		}
		.switch input[type='checkbox']::before,
		.switch input[type='checkbox']:indeterminate::before {
			background-color: var(--color-grey-75);
		}
		.switch input[type='checkbox']:hover::before,
		.switch input[type='checkbox']:indeterminate:hover::before {
			background-color: var(--color-blue);
		}
		.switch input[type='checkbox']:checked::before,
		.switch input[type='checkbox']:checked:hover::before {
			background-color: var(--color-white);
		}
		.switch.error input[type='checkbox']::before {
			background-color: var(--color-red);
		}
		.switch.error input[type='checkbox']:checked::before {
			background-color: var(--color-white);
		}
		.switch.error input[type='checkbox']:indeterminate:hover::before {
			background-color: var(--color-red-1xx);
		}
		kol-input {
			gap: var(--spacing-xs);
		}
		.button {
			gap: var(--spacing-xs) 0;
			grid-template-areas:
				'input label'
				'hint hint'
				'error error';
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
		}
		.hint {
			font-size: 0.875rem;
		}
		.button:focus-within {
			outline-color: var(--color-blue);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 2px;
		}
	`,
	'KOL-INPUT-COLOR': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 44px !important;
			min-height: 44px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-CARD': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			display: grid;
			width: 100%;
			height: 100%;
			background-color: white;
			grid-template-rows: min-content 2fr min-content;
			box-shadow: 0 0 calc(var(--spacing-2xs) / 2) var(--color-black);
		}
		:host kol-heading-wc {
			display: inline-flex;
			font-style: normal;
			font-weight: 700;
			font-size: 1.25em;
			line-height: 1.75em;
		}
		:host div.header {
			padding: var(--spacing-m) var(--spacing-m) var(--spacing-xs) var(--spacing-m);
		}
		:host div.content {
			padding: var(--spacing-xs) var(--spacing-m) var(--spacing-m);
			overflow: hidden;
		}
		:host div.footer {
			padding: var(--spacing-xs) var(--spacing-m);
		}
		:host > div > div.content + div.footer {
			border-top: 2px solid var(--color-blue);
		}
	`,
	'KOL-BUTTON-GROUP': `:host > kol-button-group-wc {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--spacing-2xs);
	}`,
	'KOL-INPUT-RADIO': css`
		:host {
			font-family: var(--font-family);
		}
		fieldset {
			border: 0;
			gap: 0.5rem;
			flex-wrap: wrap;
		}
		.input-slot {
			gap: 0.25rem;
		}
		fieldset kol-alert {
			order: 1;
		}
		fieldset .hint {
			order: 2;
		}
		fieldset kol-alert {
			order: 3;
		}
		fieldset kol-input {
			order: 4;
		}
		.radio-input-wrapper {
			display: flex;
			align-items: center;
		}
		.radio-label {
			padding-left: 0.5rem;
		}
		input[type='radio'] {
			border: 2px solid var(--color-grey-75);
		}
		input[type='radio']:before {
			display: none;
		}
		input[type='radio']:checked {
			border-color: var(--color-blue);
			border-width: 7px;
		}
		input[type='radio']:focus {
			outline: 2px solid var(--color-blue);
			outline-offset: 2px;
		}
		input[type='radio']:not(:disabled):hover {
			border-color: var(--color-blue);
		}
		label,
		legend {
			color: var(--color-grey);
		}
		legend {
			font-weight: var(--font-weight-bold);
		}
		.error input[type='radio'] {
			border: 2px solid var(--color-red);
		}
		.error input[type='radio']:before {
			display: none;
		}
		.error input[type='radio']:checked {
			border-color: var(--color-red);
			border-width: 7px;
		}
		.error input[type='radio']:not(:disabled):hover {
			border-color: var(--color-red-1xx);
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-xs));
			order: 1;
			width: 100%;
		}
		.hint {
			font-size: 0.875rem;
			order: 4;
		}
	`,
	'KOL-INPUT-RANGE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input:not([type='range']):focus,
		select:focus,
		textarea:focus {
			border-top: 1px solid var(--color-blue);
			border-bottom: 1px solid var(--color-blue);
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-TEXT': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input:not([type='range']):focus,
		select:focus,
		textarea:focus {
			border-top: 1px solid var(--color-blue);
			border-bottom: 1px solid var(--color-blue);
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-KOLIBRI': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-INPUT-PASSWORD': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-NUMBER': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-DATE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-EMAIL': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-FILE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			margin: 1px;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 44px !important;
			min-height: 44px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-SELECT': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-TEXTAREA': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		.counter {
			order: 5;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-ICON': `:host,
	:host > i {
		height: 1em;
		width: 1em;
	}`,
	'KOL-TABLE': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			overflow-x: auto;
			overflow-y: hidden;
		}
		caption {
			padding: 0.5em;
		}
		th {
			font-weight: normal;
			color: var(--color-midnight);
		}
		:host table thead tr:first-child th,
		:host table thead tr:first-child td {
			border-width: 0;
			border-top-width: 2px;
			border-style: solid;
			border-color: var(--color-ice);
		}
		.table {
			padding: 0.5em;
		}
		.table:has(.focus-element:focus) {
			outline-color: var(--color-blue);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 2px;
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
			border-color: var(--color-ice);
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
		tbody tr:nth-child(odd) {
			background-color: var(--color-grey-10);
		}
		th,
		td {
			padding: 0.5em;
		}
		th[aria-sort='ascending'],
		th[aria-sort='descending'] {
			font-weight: 700;
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
		}
	`,
	'KOL-NAV': css`
		:host {
			font-family: var(--font-family);
		}
		.list {
			display: flex;
			list-style: none;
			margin: 0px;
			padding: 0px;
		}
		.list.vertical {
			flex-direction: column;
		}
		.entry {
			display: flex;
		}
		.entry kol-button-wc:first-child,
		.entry kol-link-wc,
		.entry kol-span-wc {
			flex-grow: 1;
		} /* custom. */
		nav {
			background-color: var(--color-blue);
		}
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.expand-button button {
			background-color: var(--color-blue-130);
			margin: auto;
			height: 100%;
		}
		kol-span-wc {
			border-color: transparent;
			border-style: solid;
			border-width: 2px;
			color: var(--color-white);
			font-size: 18px;
			justify-items: start;
			padding: 1rem;
			height: 100%;
		}
		li > ul,
		li + li {
			border-color: var(--color-blue-75);
			border-style: solid;
			border-width: 0;
			border-top-width: 2px;
		}
		a {
			text-decoration: none;
		}
		:is(kol-button-wc, kol-link-wc):focus-within kol-span-wc {
			border-color: var(--color-white);
		}
		:is(kol-button-wc, kol-link-wc):focus-within kol-span-wc,
		:is(kol-button-wc, kol-link-wc):hover kol-span-wc {
			text-decoration: underline;
		}
		div > .expand-button kol-icon::part(icon)::before {
			content: '\\eab6';
		}
		.expanded > div > .expand-button kol-icon::part(icon)::before {
			content: '\\eab4';
		}
	`,
	'KOL-SKIP-NAV': css`
		:host {
			font-family: var(--font-family);
		}
		kol-link-wc > a > kol-span-wc {
			border-radius: 0;
			border-style: solid;
			border-width: 2px;
			font-weight: var(--font-weight-bold);
			gap: 0.5rem;
			line-height: 1rem;
			padding: 0.25em 0.75em;
			background-color: var(--color-blue);
			border-color: var(--color-blue);
			color: var(--color-white);
			cursor: pointer;
		}
	`,
	'KOL-SPLIT-BUTTON': css`
		:host {
			font-family: var(--font-family);
		}
		.popover {
			background: #fff;
		}
	`,
	'KOL-TOAST-CONTAINER': `:host {
		top: 1rem;
		right: 1rem;
		width: 440px;
		max-width: 100%;
	}
	.toast {
		display: block;
		background: #fff;
		margin-top: 1rem;
	}
	.alert {
		display: block;
	}`,
});
