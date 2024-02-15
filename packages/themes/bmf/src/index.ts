import { KoliBri } from '@public-ui/schema';
import { css } from './cssTag';

export const BMF = KoliBri.createTheme('bmf', {
	GLOBAL: css`
		/* Design Tokens */
		:host {
			--border-radius: 5px;
			--color-midnight: #004b76;
			--color-ocean: #0077b6;
			--color-sky: #99c9e2;
			--color-ice: #cce4f0;
			--color-crystal: #f0f7fb;
			--color-crimson: #780f2d;
			--color-red: #c0003c;
			--color-pink: #f2ccd8;
			--color-blossom: #fbf0f3;
			--color-olive: #004d38;
			--color-green: #005c45;
			--color-jungle: #00854a;
			--color-lime: #c1ca31;
			--color-mint: #ccdeda;
			--color-haze: #f0f5f4;
			--color-fire: #7a2e1f;
			--color-orange: #c44931;
			--color-coral: #f5dcd7;
			--color-peach: #fdf6f5;
			--color-bronze: #6a4a06;
			--color-yellow: #f9e03a;
			--color-ivory: #fdf3b0;
			--color-wine: #3f1d4a;
			--color-purple: #6b4479;
			--color-lavender: #dfd6de;
			--color-black: #202020;
			--color-metal: #454d4f;
			--color-grey: #576164;
			--color-granite: #bec5c9;
			--color-silver: #e5e8e9;
			--color-smoke: #f2f3f4;
			--color-cloud: #f6f7f7;
			--color-white: #ffffff;
			--font-family: BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif;
			--font-size: 16px;
			--spacing: 0.25em;
		}
		:host {
			background-color: transparent; /* Reset global background-color defined by components */
		}
		* {
			box-sizing: border-box;
		}
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: var(--font-family);
			font-size: var(--font-size);
			margin: 0;
			padding: 0;
		}
		*[tabindex]:focus,
		kol-input:not(.checkbox, .radio) .input:focus-within,
		kol-input:is(.checkbox, .radio) input:focus,
		summary:focus {
			cursor: pointer;
			outline-color: var(--color-ocean);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
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
		kol-heading-wc {
			font-weight: 700;
		}
		kol-tooltip-wc .tooltip-floating {
			border: 1px solid var(--color-metal);
			border-radius: var(--border-radius);
		}
		kol-tooltip-wc .tooltip-arrow {
			border: 1px solid var(--color-metal);
		}
		kol-tooltip-wc .tooltip-area {
			background-color: var(--color-white);
			color: var(--color-black);
		}
		kol-tooltip-wc .tooltip-content {
			border-radius: var(--border-radius);
			line-height: 1.5em;
			padding: 0.5rem 0.75rem;
		}
		kol-span-wc,
		kol-span-wc > span {
			gap: 0.5em;
		}
	`,
	'KOL-BUTTON': css`
		:host {
			font-family: var(--font-family);
		}
		:is(a, button) {
			font-size: 1.125em;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			outline-color: var(--color-ocean);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
		:is(a, button) > kol-span-wc {
			font-weight: 700;
			border-radius: var(--a11y-min-size);
			border-style: solid;
			border-width: 2px;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 8px 14px;
			text-align: center;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
		}
		.primary :is(a, button) > kol-span-wc,
		.primary :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-midnight);
			border-color: var(--color-midnight);
			color: var(--color-white);
		}
		.secondary :is(a, button) > kol-span-wc,
		.secondary :is(a, button):disabled:hover > kol-span-wc,
		.normal :is(a, button) > kol-span-wc,
		.normal :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-white);
			border-color: var(--color-midnight);
			color: var(--color-midnight);
		}
		.danger :is(a, button) > kol-span-wc,
		.danger :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-red);
			border-color: var(--color-red);
			color: var(--color-white);
		}
		.success :is(a, button) > kol-span-wc,
		.success :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-green);
			border-color: var(--color-green);
			color: var(--color-white);
		}
		.ghost :is(a, button) > kol-span-wc,
		.ghost :is(a, button):disabled:hover > kol-span-wc {
			border-color: var(--color-white);
			background-color: var(--color-white);
			box-shadow: none;
			color: var(--color-midnight);
		} /*-----------*/
		.primary :is(a, button):active > kol-span-wc,
		.primary :is(a, button):hover > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):hover > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.normal :is(a, button):hover > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc,
		.success :is(a, button):active > kol-span-wc,
		.success :is(a, button):hover > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):hover > kol-span-wc {
			background-color: var(--color-ocean);
			border-color: var(--color-ocean);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-white);
		}
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc {
			background-color: var(--color-crimson);
			border-color: var(--color-crimson);
		}
		:is(a, button):disabled:hover > kol-span-wc,
		:is(a, button):focus:hover > kol-span-wc {
			box-shadow: none;
		}
		.primary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.success :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc {
			border-color: var(--color-white);
			box-shadow: none;
			outline: none;
		}
		:is(a, button).hide-label > kol-span-wc {
			padding: 8px;
			width: unset;
		}
		:is(a, button).hide-label > kol-span-wc > span > span {
			display: none;
		}
		:is(a, button).loading > kol-span-wc kol-icon {
			animation: spin 5s infinite linear;
		}
		/** button with inline focus */
		:is(a, button).focus-inline:focus > kol-span-wc {
			outline-offset: -2px;
		}
		/** :is(a,button) with transparent background */
		:is(a, button).transparent > kol-span-wc > span,
		.ghost :is(a, button).transparent > kol-span-wc > span,
		:is(a, button).transparent > kol-span-wc {
			background-color: transparent;
			border-color: transparent;
		}
		/** CUSTOM_CLASS */
		:is(a, button).hide-label > kol-span-wc {
			padding: 8px;
			width: unset;
		}
		:is(a, button).hide-label > kol-span-wc > span > span {
			display: block;
		}
	`,
	'KOL-INPUT-TEXT': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
		}
	`,
	'KOL-INPUT-PASSWORD': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, select, textarea, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-INPUT-NUMBER': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-INPUT-DATE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-INPUT-EMAIL': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-INPUT-FILE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		kol-input .input input[type='file'] {
			padding-top: calc(0.5em + 2px);
		}
		input {
			border: none;
		}
		input[type='file'] {
			background-color: transparent;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, select, textarea, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-TEXTAREA': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
			display: grid;
			grid-template-areas: 'error error' 'label counter' 'input input' 'hint hint';
			grid-template-columns: 1fr 115px;
		}
		kol-input .error {
			order: 1;
			grid-area: error;
		}
		kol-input label {
			order: 2;
			grid-area: label;
		}
		kol-input .counter {
			order: 2;
			grid-area: counter;
			justify-self: end;
		}
		kol-input .input {
			order: 3;
			grid-area: input;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
			grid-area: hint;
		}
		textarea {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		textarea:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		select[multiple],
		textarea {
			overflow: auto;
		}
		textarea {
			display: block;
		}
		.input {
			position: relative;
		}
		.input textarea ~ span {
			position: absolute;
			top: -1.5rem;
			right: 0;
			color: var(--color-grey);
		}
	`,
	'KOL-ALERT': css`
		:host {
			font-family: var(--font-family);
		}
		.msg,
		.msg {
			border-width: 0;
		}
		kol-alert-wc {
			border-width: 2px;
			border-style: solid;
			border-radius: 5px;
			display: flex;
			width: 100%;
			overflow: unset;
			border-color: transparent;
			background-color: white;
		}
		kol-alert-wc > .heading {
			display: flex;
			gap: 0.5em;
			place-items: center;
		}
		kol-alert-wc > .heading > div {
			display: grid;
			gap: var(--kolibri-spacing);
		}
		.msg {
			background-color: transparent;
		}
		.msg > .heading {
			place-items: flex-start;
		}
		.msg > .heading > kol-icon {
			place-self: baseline;
		}
		kol-alert-wc > .heading > div {
			display: grid;
			gap: var(--spacing);
		}
		kol-alert-wc > .heading > kol-button-wc.close {
			place-self: center;
		}
		.msg {
			align-items: start;
		}
		.default {
			border-color: var(--color-grey);
		}
		.default.msg .heading-icon {
			color: var(--color-grey);
		}
		.error {
			border-color: var(--color-red);
		}
		.error.msg .heading-icon {
			color: var(--color-red);
		}
		.info {
			border-color: var(--color-midnight);
		}
		.info.msg .heading-icon {
			color: var(--color-midnight);
		}
		.success {
			border-color: var(--color-green);
		}
		.success.msg .heading-icon {
			color: var(--color-green);
		}
		.warning {
			border-color: var(--color-orange);
		}
		.warning.msg .heading-icon {
			color: var(--color-orange);
		}
		.heading-icon {
			color: white;
		}
		kol-alert-wc .heading .heading-icon {
			padding: 0;
		}
		.msg > .heading > .heading-icon {
			padding-top: 0;
			place-items: baseline;
		}
		.msg > .heading > .heading-icon::part(icon) {
			line-height: 1.375rem;
		}
		.msg > .heading > div > kol-heading-wc {
			line-height: 20px;
			padding-top: 0.125rem;
		}
		.msg.default .heading > div > kol-heading-wc {
			color: var(--color-grey);
		}
		.msg.error .heading > div > kol-heading-wc {
			color: var(--color-red);
		}
		.msg.info .heading > div > kol-heading-wc {
			color: var(--color-midnight);
		}
		.msg.success .heading > div > kol-heading-wc {
			color: var(--color-green);
		}
		.msg.warning .heading > div > kol-heading-wc {
			color: var(--color-orange);
		} /*.msg > .heading > div {display: grid;grid-template-columns: 1fr auto;}.msg > .heading > div > .content {grid-row: 2;grid-column: 1;}.msg > div > .close {display: flex;}*/
		.msg.default .close .icon {
			color: var(--color-grey);
		}
		.msg.error .close .icon {
			color: var(--color-red);
		}
		.msg.info .close .icon {
			color: var(--color-midnight);
		}
		.msg.success .close .icon {
			color: var(--color-green);
		}
		.msg.warning .close .icon {
			color: var(--color-orange);
		}
		.card {
			border-width: 2px;
			border-style: solid;
			filter: drop-shadow(0px 2px 4px rgba(8, 35, 48, 0.24));
			flex-direction: column;
		}
		.card > .heading {
			padding: 0.5rem 1rem;
		}
		.card.hasCloser > .heading {
			padding-top: 0;
			padding-bottom: 0;
			padding-right: 0;
		}
		.card > .heading > div {
			width: 100%;
			min-height: 1.25rem;
		}
		.card > .heading .heading-icon {
			justify-self: right;
			margin-top: -4px;
		}
		.card > .heading kol-heading-wc {
			width: 100%;
			color: white;
			display: flex;
			font-size: 1.25rem;
			line-height: 1.25rem;
		}
		.card > .heading kol-heading-wc > * {
			margin: auto 0;
		}
		.card > .heading kol-button-wc button:focus {
			outline-color: var(--color-white);
			outline-offset: -3px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline 0.1s linear;
		}
		.card > .heading kol-button-wc button:hover {
			background-color: rgba(32, 32, 32, 0.2);
		}
		.card > .heading kol-button-wc button:active {
			background-color: rgba(32, 32, 32, 0.4);
		}
		.card > .heading kol-button-wc button:hover:focus {
			background-color: rgba(32, 32, 32, 0.1);
		}
		.card > .content {
			padding: 1rem;
			max-height: 9.5rem;
			overflow-y: auto;
		}
		.card.default > .heading {
			background-color: var(--color-grey);
			border-bottom: 2px solid var(--color-grey);
		}
		.card.error > .heading {
			background-color: var(--color-red);
			border-bottom: 2px solid var(--color-red);
		}
		.card.info > .heading {
			background-color: var(--color-midnight);
			border-bottom: 2px solid var(--color-midnight);
		}
		.card.success > .heading {
			background-color: var(--color-green);
			border-bottom: 2px solid var(--color-green);
		}
		.card.warning > .heading {
			background-color: var(--color-orange);
			border-bottom: 2px solid var(--color-orange);
		}
		:is(.error, .info, .success, .warning) .heading-icon::part(icon) {
			font-family: 'Material Symbols Rounded';
			font-weight: 900;
			font-variation-settings: 'FILL' 1;
			height: 1.25rem;
			width: 1.25rem;
		}
		:is(.error, .info, .success, .warning) .heading-icon {
			font-size: 1.25rem !important;
		}
		.error .heading-icon::part(icon)::before {
			content: 'error';
		}
		.info .heading-icon::part(icon)::before {
			content: 'info';
		}
		.success .heading-icon::part(icon)::before {
			content: 'check_circle';
		}
		.warning .heading-icon::part(icon)::before {
			content: 'warning';
		}
		.card > div > .content {
			grid-row: 2;
			grid-column: 1 / span 2;
		}
		.card.default .close {
			background-color: var(--color-grey);
		}
		.card.error .close {
			background-color: var(--color-red);
		}
		.card.info .close {
			background-color: var(--color-midnight);
		}
		.card.success .close {
			background-color: var(--color-green);
		}
		.card.warning .close {
			background-color: var(--color-orange);
		}
		.close > button {
			min-width: 44px;
			color: var(--color-white);
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
			width: inherit;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
			background-color: rgba(0, 0, 0, 0);
			border-color: rgba(0, 0, 0, 0);
		}
		.close > button {
			padding: 8px;
		}
		.close > button kol-icon {
			display: flex;
			width: 1em;
			height: 1em;
			font-size: 1rem;
		}
		.close > button kol-icon::part(icon) {
			font-family: 'Material Symbols Rounded';
			font-weight: 900;
		}
		.close > button kol-icon::part(icon)::before {
			content: 'close';
		}
		.close > button:active {
			box-shadow: none;
			outline: none;
		}
	`,
	'KOL-AVATAR': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-HEADING': css`
		.headline-h1,
		.headline-h2,
		.headline-h3,
		.headline-h4,
		.headline-h5,
		.headline-h6 {
			color: inherit;
			font-style: normal;
			margin: 0;
			padding: 0;
		}
		.headline-h1,
		.headline-h2,
		.headline-h3 {
			font-weight: 700;
		}
		.headline-h1 {
			font-size: 1.5rem;
			line-height: 1.75rem;
		}
		.headline-h2 {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
		.headline-h3 {
			font-size: 1.125rem;
			line-height: 1.5rem;
		}
	`,
	'KOL-BADGE': css`
		:host {
			display: inline-block;
			font-family: var(--font-family);
		}
		:host > span {
			border-radius: 0.3125rem;
			display: inline-flex;
			font-style: normal;
		}
		:host > span.smart-button {
			align-items: center;
		}
		:host > span kol-button-wc:hover > button {
			background-color: var(--color-ocean);
			color: var(--color-white);
		}
		:host > span kol-button-wc > button {
			color: inherit;
			font-size: 1rem;
			border-top-right-radius: 0.3125rem;
			border-bottom-right-radius: 0.3125rem;
			padding: 2px;
		}
		:host > span kol-span-wc {
			padding: 0.25rem 0.75rem;
		}
		:host > span > kol-span-wc {
			align-items: center;
			font-style: normal;
			gap: 0.5rem;
		}
		:host > span > kol-span-wc > span {
			display: flex;
			gap: 0.25rem;
		}
	`,
	'KOL-BUTTON-GROUP': css`
		:host > kol-button-group-wc {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5em;
		}
	`,
	'KOL-INDENTED-TEXT': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			background-color: var(--color-white);
			border-left: none;
			box-shadow: -2px 0px 0px var(--color-ocean);
			padding: 0 0.5em;
			width: 100%;
		}
	`,
	'KOL-LINK': css`
		:is(a, button) {
			color: var(--color-midnight);
			font-style: normal;
			font-weight: 400;
			text-decoration-line: underline;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			border-radius: var(--border-radius);
			outline: 2px solid;
		}
		a:hover:not([aria-disabled]),
		button:hover:not([disabled]) {
			text-decoration-thickness: 0.25em;
		}
		:is(a, button):visited {
			color: var(--visited);
		}
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
	`,
	'KOL-DETAILS': css`
		details > summary {
			border-radius: var(--border-radius);
			font-family: var(--font-family);
		}
		details kol-indented-text {
			margin: 0.25em 0px 0px 0.65em;
		}
		details kol-icon {
			font-size: 2rem;
		}
		kol-icon::part(icon) {
			font-family: 'Material Symbols Rounded';
			font-weight: 400;
		}
		details kol-icon::part(icon):before {
			content: 'chevron_right';
		}
	`,
	'KOL-PROGRESS': css`
		:host {
			font-family: var(--font-family);
		}
		.bar > div {
			flex-direction: column;
			gap: 0.5rem !important;
			width: 100px;
		}
		.bar > div text {
			color: var(--color-black);
			align-self: flex-end;
		}
		.bar svg {
			height: 1rem;
		}
		.bar .background {
			fill: var(--color-ice);
			stroke: var(--color-ice);
			stroke-width: 1px;
		}
		.bar .progress {
			fill: var(--color-midnight);
			stroke: var(--color-midnight);
		}
		.bar .border {
			display: none;
		}
		.cycle {
			overflow: visible;
		}
		.cycle .whitespace,
		.cycle .border {
			stroke: transparent;
		}
		.cycle .background {
			stroke: var(--color-ice);
			stroke-width: 1rem;
		}
		.cycle .progress {
			stroke: var(--color-midnight);
			stroke-width: 1rem;
		}
		.cycle text:first-of-type {
			color: var(--color-grey);
			line-height: 1.25rem;
			alignment-baseline: after-edge;
		}
		.cycle text:last-of-type {
			color: var(--color-black);
			font-size: 1.75rem;
			font-weight: 700;
			line-height: 1.5rem;
			alignment-baseline: central;
		}
	`,
	'KOL-SELECT': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		select {
			border: none;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input.icon-left kol-icon:first-child {
			margin-right: 0.5em;
		}
		.input.icon-right kol-icon:last-child {
			margin-left: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		select:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(select, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
		}
		select[multiple] {
			overflow: auto;
		}
		select option {
			margin: 1px 0;
			border-radius: 0.25em;
			cursor: pointer;
		}
		select:not([multiple]) option {
			padding: 0.5em;
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
		}
	`,
	'KOL-INPUT-COLOR': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		input {
			border: none;
		}
		input[type='color'] {
			border: none;
			min-height: 40px !important;
		}
		input[type='color'] {
			background-color: transparent;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5em;
			padding-right: 0.5em;
		}
		.input > input:first-child {
			padding-left: 0.375em;
		}
		.input > input:last-child {
			padding-right: 0.375em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:not([type='color']):read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-ACCORDION': css`
		:host {
			font-family: var(--font-family);
		}
		kol-span-wc > span {
			display: flex;
			place-items: baseline center;
			text-align: left;
		}
		:host > div > kol-heading-wc button {
			border-radius: var(--border-radius);
			min-height: 22px;
			padding: 12px 8px;
		}
		:host > div > kol-heading-wc button kol-span-wc {
			font-weight: 700;
			font-size: 1.125rem;
			line-height: 20px;
			gap: 0.5rem;
		}
		:host > div > kol-heading-wc button kol-span-wc > span {
			gap: 0.5em;
		}
		:host > div > kol-heading-wc button kol-icon::part(icon) {
			font-family: 'Material Symbols Rounded';
			font-weight: 400;
			color: var(--color-midnight);
		}
		kol-icon::part(icon)::before {
			content: 'arrow_forward_ios';
			transition-property: transform;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 150ms;
		}
		:host > div.open > kol-heading-wc button kol-icon::part(icon)::before {
			transform: rotate(90deg);
		}
		:host > div {
			width: 100%;
			height: 100%;
			display: grid;
		}
		:host > div div[class='header'],
		:host > div[class*='open'] div[class='content'] {
			margin: 0;
		}
		:host > div div[class='content'] {
			padding-left: 2.25em;
			padding-bottom: 12px;
			padding-right: 8px;
		}
		button:focus {
			outline: none;
		}
		:host > .accordion:focus-within {
			border-radius: var(--border-radius);
			cursor: pointer;
			outline-color: var(--color-ocean);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
	`,
	'KOL-TABLE': css`
		:host {
			font-family: var(--font-family);
		}
		:host * {
			hyphens: var(--kolibri-hyphens);
			font-family: var(--kolibri-font-family);
			line-height: var(--kolibri-line-height);
			word-break: break-word;
		}
		:host > div {
			overflow-x: auto;
			overflow-y: hidden;
		}

		.table:has(caption:focus) {
			outline-color: var(--color-ocean);
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
		caption {
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}
		table {
			width: 100%;
			border-spacing: 0;
		}
		tbody tr:last-child th,
		tr:last-child td {
			border-bottom-width: 0;
		}
		th {
			padding: 0.75em 0;
			font-weight: 700;
			color: var(--color-black);
		}
		th div {
			width: 100%;
			display: flex;
			gap: 0.5em;
			grid-template-columns: 1fr auto;
			align-items: center;
		}
		th,
		td {
			border-bottom: 1px solid var(--color-granite);
			height: 1.25rem;
		}
		tbody th {
			text-align: left;
		}
		tbody th,
		td {
			padding: 1em 0;
			vertical-align: top;
		}
		th kol-button,
		td kol-button {
			margin-top: -0.75rem;
			margin-bottom: -0.75rem;
		}
		.table-sort-button .button {
			font-weight: 700;
		}
		:host > div:last-child,
		:host > div:last-child > div:last-child {
			display: grid;
			align-items: center;
			justify-items: center;
			gap: 1em;
		}
		.pagination {
			align-items: center;
			justify-content: start;
			grid-template-columns: auto 1fr;
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
		* {
			margin: 0;
			padding: 0;
		}
		nav {
			font-family: var(--font-family);
			font-size: var(--font-size);
			width: 100%;
		}
		ul {
			list-style: none;
		}
		.entry-item :is(a, .button) {
			align-items: center;
			background-color: var(--color-white);
			border-left-color: transparent;
			border-left-style: solid;
			border-left-width: 0.5rem;
			color: var(--color-midnight);
			display: flex;
			font-style: normal;
			letter-spacing: 0.175px;
			line-height: 1.5rem;
			min-height: 44px;
			min-width: 44px;
			padding: 0.75rem 0.5rem 0.75rem 0.25rem;
			place-items: center;
			text-decoration: none;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
			width: 100%;
		}
		.vertical .active .entry-item :is(a, .button) {
			background-color: var(--color-ice);
			border-left-color: var(--color-midnight);
			color: var(--color-midnight);
			font-weight: 700;
		}
		.entry-item :is(a, .button):hover,
		.vertical .active .entry-item :is(a, .button):hover {
			background-color: var(--color-ocean);
			border-left-color: var(--color-ocean);
			color: var(--color-white);
			font-weight: 700;
		}
		.nav:not(.is-compact) .entry-item .icon {
			display: none;
		}
		/** Compact mode */
		.entry.hide-label :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
			place-items: center;
		}
		.entry.hide-label :is(a, button) {
			padding: 0;
			border-left: 0;
		}
	`,
	'KOL-CARD': css`
		:host {
			font-family: var(--font-family);
		}

		/* https://www.figma.com/file/56JbmrssCRpjpfxoAFeHqT/Design-System-EPLF-(in-progress)?node-id=8225%3A5945 */
		:host > div {
			display: grid;
			width: 100%;
			height: 100%;
			background-color: white;
			grid-template-rows: min-content 2fr min-content;
			box-shadow: 0 0 0.25rem var(--color-grey);
			border-radius: 0.25rem;
		}
		:host kol-heading-wc {
			line-height: 1.75rem;
		}
		:host div.header {
			padding: 1rem 1rem 0.5rem 1rem;
		}
		:host div.content {
			padding: 0.5rem 1rem 1rem;
			overflow: hidden;
		}
		:host div.footer {
			padding: 0.5rem 1rem;
		}
		:host > div > div.content + div.footer {
			border-top: 2px solid var(--color-ice);
		}
	`,
	'KOL-INPUT-CHECKBOX': css`
		:host {
			font-family: var(--font-family);
		}
		/* INPUT */
		:host kol-input {
			display: grid;
			align-items: center;
			justify-items: left;
			width: 100%;
			min-height: 44px;
		}
		:host kol-input.default:not(.hide-label) {
			grid-template-columns: 1.5rem auto;
			gap: 0.4em;
		}
		:host kol-input.switch:not(.hide-label) {
			grid-template-columns: 3.5rem auto;
			gap: 0.4em;
		}
		:host kol-input > div.input {
			display: inherit;
			min-height: 44px;
			order: 2;
		}
		:host kol-input > div.input input {
			margin: 0px;
		}
		:host kol-input:not(.disabled) :is(.input, label) {
			cursor: pointer;
		}
		:host kol-input.disabled :is(.input, label) {
			cursor: not-allowed;
		}
		:host kol-input > label {
			order: 3;
		}
		:host kol-input > kol-alert.error {
			order: 1;
			padding-top: 0.25em;
			grid-column: span 2 / auto;
		}
		:host kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		:host kol-input.error input:focus,
		kol-input.error select:focus,
		kol-input.error textarea:focus {
			outline-color: var(--color-red) !important;
		}
		:host kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		:host input {
			order: 1;
			width: 100%;
			border-color: var(--color-grey);
			border-width: 2px;
			border-style: solid;
			border-radius: 5px;
			line-height: 24px;
			font-size: 1rem;
		}
		:host input:hover {
			border-color: var(--color-midnight);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		}
		:host input:focus:hover {
			box-shadow: none;
		}
		:host input:active {
			box-shadow: none;
		}
		:host kol-alert {
			display: block;
			width: 100%;
		} /* CHECKBOX */
		:host kol-input label span {
			margin-top: 0.125rem;
		}
		:host .required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		:host kol-input input[type='checkbox'] {
			appearance: none;
			background-color: white;
			transition: 0.5s;
		}
		:host kol-input input[type='checkbox']:before {
			content: '';
		}
		:host kol-input input[type='checkbox']:checked {
			background-color: var(--color-midnight);
			border-color: var(--color-midnight);
		}
		:host kol-input.default .checkbox-container {
			justify-content: flex-start;
		}
		:host kol-input.default input[type='checkbox']:indeterminate {
			background-color: var(--color-midnight);
			border-color: var(--color-midnight);
		}
		:host kol-input.default .icon {
			color: var(--color-white);
			margin: -0.125rem 0 0 0.25rem; /* visually align */
		}
		:host kol-input.default input[type='checkbox'] {
			border-radius: var(--border-radius);
			height: calc(6 * var(--spacing));
			min-width: calc(6 * var(--spacing));
			width: calc(6 * var(--spacing));
		}
		.default {
			.icon::part(icon) {
				font-family: 'Material Symbols Rounded';
				font-weight: 900;
				margin-top: 1px;
			}
			&.checked .icon::part(icon)::before {
				content: 'check';
			}
			&.indeterminate .icon::part(icon)::before {
				content: 'remove';
			}
		}
		:host kol-input.switch input[type='checkbox'] {
			min-width: 3.5em;
			width: 3.5em;
			background-color: var(--color-grey);
			border-width: 0;
			height: 1.5em;
			border-radius: 1.25em;
			position: relative;
			outline: transparent solid 1px;
		}
		:host kol-input.switch input[type='checkbox']:before {
			transition: 0.5;
			width: 1.25em;
			height: 1.25em;
			left: calc(0.25em - 2px);
			top: calc(0.25em - 2px);
			border-radius: 1.25em;
			background-color: white;
			position: absolute;
		}
		:host kol-input.switch input[type='checkbox']:checked {
			background-color: var(--color-midnight);
		}
		:host kol-input.switch input[type='checkbox']:checked:before {
			transform: translateX(2em);
			--tw-bg-opacity: 1;
		}
		:host kol-input.switch input[type='checkbox']:indeterminate {
			--tw-bg-opacity: 1;
		}
		:host kol-input.switch input[type='checkbox']:indeterminate:before {
			transform: translateX(1em);
		}
		.switch {
			& .checkbox-input-element {
				display: block;
			}
			& .icon {
				width: 1.25em;
				height: 1.25em;
				left: 2px;
				color: #000;
				&::part(icon) {
					font-family: 'Material Symbols Rounded';
					font-weight: 900;
				}
				&::part(icon)::before {
					content: 'add';
				}
			}
			&.checked .icon {
				transform: translate(2em, -50%);
				&::part(icon)::before {
					content: 'check';
				}
			}
			&.indeterminate .icon {
				transform: translate(1em, -50%);
				&::part(icon)::before {
					content: 'remove';
				}
			}
		}
		:host kol-input.button {
			row-gap: 0.5rem;
		}
		:host kol-input.button.checked > .input,
		:host kol-input.button.checked > label {
			background-color: var(--color-ice);
		}
		:host kol-input.button > label {
			background-color: var(--color-silver);
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			min-height: 32px;
			align-items: center;
			display: flex;
			padding-right: 12px;
			width: 100%;
		}
		:host kol-input.button > .input {
			background-color: var(--color-silver);
			border-top-left-radius: var(--border-radius);
			border-bottom-left-radius: var(--border-radius);
			min-height: 32px;
			min-width: 32px;
			place-content: center;
		}
		:host kol-input.button.hide-label > .input {
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
		}
		:host kol-input.button > .input > div {
			display: flex;
		}
		:host kol-input.button .icon {
			height: auto;
		}
		.button:focus-within {
			border-radius: var(--a11y-min-size);
			outline-color: var(--color-ocean);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
		}
	`,
	'KOL-INPUT-RADIO': css`
		:host {
			font-family: var(--font-family);
		}
		/* INPUT */
		kol-input {
			display: grid;
			gap: 0.4em;
		}
		label {
			cursor: pointer;
			display: grid;
			line-height: 20px;
			gap: 8px;
			width: 100%;
		}
		input {
			cursor: pointer;
			width: 100%;
			border-color: var(--color-grey);
			border-width: 2px;
			border-style: solid;
			border-radius: 5px; /* padding: 10px 14px; */
			line-height: 24px;
			font-size: 16px;
		}
		input:hover {
			border-color: var(--color-midnight);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		}
		input:focus:hover {
			box-shadow: none;
		}
		input:hover {
			border-color: var(--color-midnight);
		}
		kol-alert {
			display: block;
			width: 100%;
		}
		.required legend > span::after {
			content: '*';
			padding-left: 0.125em;
		} /* RADIO */
		fieldset {
			border: 0px;
			margin: 0px;
			padding: 0px;
			display: grid;
			gap: 0.25em;
		}
		.radio-input-wrapper {
			cursor: pointer;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			min-height: 44px;
			margin: 0;
			gap: 0.5rem;
		}
		.radio-input-wrapper label {
			cursor: pointer;
			display: flex;
			padding-left: 0.25em;
			width: 100%;
		}
		.radio-input-wrapper label span {
			margin-top: 0.125em;
		}
		.radio-input-wrapper input[type='radio'] {
			appearance: none;
			transition: 0.5s;
			border-radius: 100%;
			height: calc(6 * var(--spacing));
			min-width: calc(6 * var(--spacing));
			width: calc(6 * var(--spacing));
		}
		.radio-input-wrapper input[type='radio']:before {
			content: '';
			cursor: pointer;
			border-radius: 100%;
			display: block;
		}
		.radio-input-wrapper input[type='radio']:checked:before {
			background-color: var(--color-midnight);
		}
		.radio-input-wrapper input[type='radio']:disabled {
			cursor: not-allowed;
			border-color: var(--border-default);
			background-color: var(--background-light-grey);
		}
		kol-alert.error {
			order: 1;
		}
		fieldset legend {
			order: 2;
			display: contents;
		}
		fieldset kol-input {
			order: 3;
		}
		fieldset.error {
			border-left: 3px solid var(--color-red);
			color: var(--color-red);
			font-weight: 700;
			padding-left: 1em;
		}
		fieldset.error input:focus,
		fieldset.error select:focus,
		fieldset.error textarea:focus {
			outline-color: var(--color-red) !important;
		}
		fieldset.error kol-alert.error {
			margin-left: -0.25em;
			color: var(--color-red);
			font-weight: 700;
		}
		fieldset.horizontal {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem 1rem;
		}
		fieldset.horizontal legend {
			display: inline-block;
			margin-bottom: 0.25em;
		}
		fieldset .input-slot {
			gap: 0.5rem;
		}
		.radio-input-wrapper label {
			padding-left: 0;
		}
	`,
	'KOL-TOAST-CONTAINER': css`
		:host {
			top: 1rem;
			right: 1rem;
			width: 440px;
			max-width: 100%;
		}
		.toast {
			margin-top: 1rem;
		}
	`,
	'KOL-TABS': css`
		:host {
			font-family: var(--font-family);
		}
		:host kol-button-group-wc {
			display: inline-flex;
			gap: 2rem;
			flex-wrap: wrap;
		}
		button {
			box-sizing: border-box;
			background-color: transparent;
			border: 0;
			border-radius: 0.25rem;
			font-style: normal;
			font-weight: 700;
			font-size: 18px;
			line-height: 22px;
			min-height: 44px;
			min-width: 44px;
			color: var(--color-grey);
			padding: 0;
		}
		button:hover {
			color: var(--color-midnight);
		}
		button.primary,
		button.selected {
			/* border-bottom: 0.025rem solid var(--color-midnight); */
			color: var(--color-midnight);
		}
		button kol-span-wc > span {
			border-bottom: 0.25em solid;
		}
		button kol-span-wc > span {
			gap: 0.5rem;
		}
		:host > div > div {
			padding: 0.25em 0;
		}
		.close-button {
			display: none;
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
		div[role='tabpanel'] {
			height: 100%;
		}
		div.grid {
			height: 100%;
		}
		:host > .tabs-align-right {
			display: grid;
			grid-template-columns: 1fr auto;
		}
		:host > .tabs-align-right kol-button-group-wc {
			display: grid;
			order: 2;
		}
		:host > .tabs-align-left {
			display: grid;
			grid-template-columns: auto 1fr;
		}
		:host > .tabs-align-left kol-button-group-wc {
			display: grid;
			order: 0;
		}
		:host > .tabs-align-bottom {
			display: grid;
			grid-template-rows: 1fr auto;
		}
		:host > .tabs-align-bottom kol-button-group-wc {
			order: 2;
		}
		:host > .tabs-align-bottom kol-button-group-wc > div {
			display: flex;
		}
		:host > .tabs-align-bottom > kol-button-group-wc > div > div:first-child {
			margin: 0px 1em 0px 0px;
		}
		:host > .tabs-align-bottom > kol-button-group-wc > div > div {
			margin: 0px 1em;
		}
		:host > .tabs-align-top {
			display: grid;
			grid-template-rows: auto 1fr;
		}
		:host > .tabs-align-top kol-button-group-wc {
			order: 0;
		}
		:host > .tabs-align-top kol-button-group-wc > div {
			display: flex;
		}
		:host > .tabs-align-top > kol-button-group-wc > div > div:first-child {
			margin: 0px 1em 0px 0px;
		}
		:host > .tabs-align-top > kol-button-group-wc > div > div {
			margin: 0px 1em;
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
		:host > .tabs-align-left kol-button-group-wc,
		:host > .tabs-align-right kol-button-group-wc {
			gap: inherit;
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
		:host kol-button-group-wc button {
			border: none;
		}
	`,
	'KOL-PAGINATION': css`
		:host {
			font-family: var(--font-family);
		}
		.icon::part(icon) {
			font-family: 'Material Symbols Rounded';
			font-weight: 400;
		}
		.icon {
			font-size: 18px;
		}
		.first .icon::part(icon)::before {
			content: 'keyboard_double_arrow_left';
		}
		.previous .icon::part(icon)::before {
			content: 'chevron_left';
		}
		.next .icon::part(icon)::before {
			content: 'chevron_right';
		}
		.last .icon::part(icon)::before {
			content: 'keyboard_double_arrow_right';
		}
		.button:focus {
			outline: none;
		}
		.button-inner {
			background-color: var(--color-white);
			border-radius: var(--a11y-min-size);
			border: 2px solid var(--color-midnight);
			color: var(--color-midnight);
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 8px;
			text-align: center;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
		}
		.button:focus .button-inner {
			outline-offset: 2px;
			outline: 3px solid var(--color-ocean);
			transition: outline-offset 0.2s linear;
		}
		.button:is(:active, :hover):not(:disabled) .button-inner {
			background-color: var(--color-ocean);
			border-color: var(--color-ocean);
			box-shadow: 0 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-white);
		}
		.button:active .button-inner {
			border-color: var(--color-white);
			outline: none;
		}
		.selected .button-inner {
			background-color: var(--color-ice);
			border-color: var(--color-ice);
			font-weight: 700;
		}
	`,
	'KOL-INPUT-RANGE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			gap: 0.25em;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: 0.875em;
			font-style: italic;
		}
		.inputs-wrapper {
			gap: 1em;
		}
		input::placeholder {
			color: var(--color-grey);
		}
		.input {
			background-color: var(--color-white);
			border-color: var(--color-grey);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 1em;
		}
		.input > kol-icon {
			width: 1em;
		}
		.input.icon-left > kol-icon:first-child {
			margin-right: 0.5em;
		}
		.input.icon-right > kol-icon:last-child {
			margin-left: 0.5em;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1em;
			padding-right: 1em;
		}
		.input:hover {
			border-color: var(--color-midnight);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error .input {
			border-color: var(--color-red);
			border-width: 3px;
		}
		kol-input.error:not(.hidden-error) {
			border-left: 3px solid var(--color-red);
			padding-left: 1em;
		}
		kol-input.error kol-alert.error {
			color: var(--color-red);
			font-weight: 700;
		}
		kol-input.disabled :is(.input) {
			background-color: var(--color-smoke);
			border-color: var(--color-granite);
			color: var(--color-black);
		}
	`,
	'KOL-KOLIBRI': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-LINK-BUTTON': css`
		:host {
			font-family: var(--font-family);
		}
		:is(a, button) {
			font-size: 1.125em;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			outline-color: var(--color-ocean);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
		:is(a, button) > kol-span-wc {
			font-weight: 700;
			border-radius: var(--a11y-min-size);
			border-style: solid;
			border-width: 2px;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 8px 14px;
			text-align: center;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
		}
		.primary :is(a, button) > kol-span-wc,
		.primary :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-midnight);
			border-color: var(--color-midnight);
			color: var(--color-white);
		}
		.secondary :is(a, button) > kol-span-wc,
		.secondary :is(a, button):disabled:hover > kol-span-wc,
		.normal :is(a, button) > kol-span-wc,
		.normal :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-white);
			border-color: var(--color-midnight);
			color: var(--color-midnight);
		}
		.danger :is(a, button) > kol-span-wc,
		.danger :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-red);
			border-color: var(--color-red);
			color: var(--color-white);
		}
		.ghost :is(a, button) > kol-span-wc,
		.ghost :is(a, button):disabled:hover > kol-span-wc {
			border-color: var(--color-white);
			background-color: var(--color-white);
			box-shadow: none;
			color: var(--color-midnight);
		} /*-----------*/
		.primary :is(a, button):active > kol-span-wc,
		.primary :is(a, button):hover > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):hover > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.normal :is(a, button):hover > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):hover > kol-span-wc {
			background-color: var(--color-ocean);
			border-color: var(--color-ocean);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-white);
		}
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc {
			background-color: var(--color-crimson);
			border-color: var(--color-crimson);
		}
		:is(a, button):disabled:hover > kol-span-wc,
		:is(a, button):focus:hover > kol-span-wc {
			box-shadow: none;
		}
		.primary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc {
			border-color: var(--color-white);
			box-shadow: none;
			outline: none;
		}
		:is(a, button).hide-label > kol-span-wc {
			padding: 8px;
			width: unset;
		}
		:is(a, button).hide-label > kol-span-wc > span > span {
			display: none;
		}
		:is(a, button).loading > kol-span-wc kol-icon {
			animation: spin 5s infinite linear;
		}
		/** small ghost button */
		.ghost :is(a, button).small > kol-span-wc {
			border: none;
			background-color: transparent;
			box-shadow: none;
		}
		.ghost :is(a, button).small > kol-span-wc > span {
			border-radius: 1.5em;
			border-style: solid;
			border-width: 2px;
			border-color: var(--color-white);
			background-color: var(--color-white);
		}
		.ghost :is(a, button).small:active > kol-span-wc > span,
		.ghost :is(a, button).small:hover > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:active > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:hover > kol-span-wc > span {
			background-color: var(--color-ocean);
			border-color: var(--color-ocean);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-white);
		} /** :is(a,button) with transparent background */
		:is(a, button).transparent > kol-span-wc > span,
		.ghost :is(a, button).small.transparent > kol-span-wc > span,
		:is(a, button).transparent > kol-span-wc {
			background-color: transparent;
			border-color: transparent;
		}
	`,
	'KOL-BUTTON-LINK': css`
		:is(a, button) {
			color: var(--color-midnight);
			font-style: normal;
			font-weight: 400;
			text-decoration-line: underline;
			font-size: inherit;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			border-radius: var(--border-radius);
			outline: 2px solid;
		}
		a:hover:not([aria-disabled]),
		button:hover:not([disabled]) {
			text-decoration-thickness: 0.25em;
		}
		:is(a, button):visited {
			color: var(--visited);
		}
		.hidden {
			display: none;
			visibility: hidden;
		}
		.skip {
			left: -99999px;
			overflow: hidden;
			position: absolute;
			z-index: 9999999;
		}
		.skip:focus {
			background: white;
			left: unset;
			position: unset;
		}
	`,
	'KOL-ABBR': css`
		abbr {
			border-bottom: dashed var(--color-black) 1px;
			text-decoration: none !important;
		}
	`,
	'KOL-BREADCRUMB': css`
		:host {
			font-family: var(--font-family);
		}
		li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon {
			font-size: 1.5rem;
		}
		li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon::part(icon) {
			font-family: 'Material Symbols Rounded';
			font-weight: 400;
			color: var(--color-grey);
		}
		li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon::part(icon)::before {
			content: 'chevron_right';
		}
		kol-link::part(icon) {
			font-size: 1.25rem;
		}
		ul li > :is(span, kol-link) {
			line-height: 1.25rem;
			height: 20px;
		}
		ul li:last-child > span {
			color: var(--color-grey);
		}
		kol-link {
			font-family: var(--font-family);
		}
	`,
	'KOL-MODAL': css`
		:host .overlay .modal {
			max-height: calc(100% - 32px);
		}
	`,
	'KOL-ICON': css`
		@font-face {
			font-family: 'Material Symbols Outlined';
			font-style: normal;
			font-weight: 100 700;
			font-display: block;
			src: url('./material-symbols-outlined.woff2') format('woff2');
		}
		:host > i.outlined {
			font-family: 'Material Symbols Outlined';
		}
		@font-face {
			font-family: 'Material Symbols Rounded';
			font-style: normal;
			font-weight: 100 700;
			font-display: block;
			src: url('./material-symbols-rounded.woff2') format('woff2');
		}
		:host > i.rounded {
			font-family: 'Material Symbols Rounded';
		}
		@font-face {
			font-family: 'Material Symbols Sharp';
			font-style: normal;
			font-weight: 100 700;
			font-display: block;
			src: url('./material-symbols-sharp.woff2') format('woff2');
		}
		:host > i.sharp {
			font-family: 'Material Symbols Sharp';
		}
		:host {
			display: flex;
			place-items: center;
			width: 1em;
			height: 1em;
		}
		:host > i::before {
			display: block;
		}
		:host > i {
			width: 1em;
			height: 1em;
			font-family: 'Material Symbols Rounded';
			font-weight: normal;
			font-style: normal;
			font-size: 24px;
			line-height: 1;
			letter-spacing: normal;
			text-transform: none;
			display: inline-block;
			white-space: nowrap;
			word-wrap: normal;
			direction: ltr;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: optimizeLegibility;
			font-feature-settings: 'liga';
			font-variation-settings: 'FILL' 1;
		}
		:host > i.transition {
			transition-property: transform;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 150ms;
		}
		:host > i.fill {
			font-variation-settings: 'FILL' 1;
		}
		:host > i.unfill {
			font-variation-settings: 'FILL' 0;
		}
		:host > i.rotate-90 {
			transform: rotate(90deg);
		}
		:host > i.rotate-180 {
			transform: rotate(180deg);
		}
		:host > i.rotate-270 {
			transform: rotate(270deg);
		} /* https://github.com/google/material-design-icons/blob/master/variablefont/MaterialSymbolsOutlined%5BFILL%2CGRAD%2Copsz%2Cwght%5D.codepoints */
		:host > i.\\0000310k:before {
			content: '10k';
		}
		:host > i.\\0000310mp:before {
			content: '10mp';
		}
		:host > i.\\0000311mp:before {
			content: '11mp';
		}
		:host > i.\\00003123:before {
			content: '123';
		}
		:host > i.\\0000312mp:before {
			content: '12mp';
		}
		:host > i.\\0000313mp:before {
			content: '13mp';
		}
		:host > i.\\0000314mp:before {
			content: '14mp';
		}
		:host > i.\\0000315mp:before {
			content: '15mp';
		}
		:host > i.\\0000316mp:before {
			content: '16mp';
		}
		:host > i.\\0000317mp:before {
			content: '17mp';
		}
		:host > i.\\0000318_up_rating:before {
			content: '18_up_rating';
		}
		:host > i.\\0000318mp:before {
			content: '18mp';
		}
		:host > i.\\0000319mp:before {
			content: '19mp';
		}
		:host > i.\\000031k:before {
			content: '1k';
		}
		:host > i.\\000031k_plus:before {
			content: '1k_plus';
		}
		:host > i.\\000031x_mobiledata:before {
			content: '1x_mobiledata';
		}
		:host > i.\\000031x_mobiledata_badge:before {
			content: '1x_mobiledata_badge';
		}
		:host > i.\\0000320mp:before {
			content: '20mp';
		}
		:host > i.\\0000321mp:before {
			content: '21mp';
		}
		:host > i.\\0000322mp:before {
			content: '22mp';
		}
		:host > i.\\0000323mp:before {
			content: '23mp';
		}
		:host > i.\\0000324mp:before {
			content: '24mp';
		}
		:host > i.\\000032d:before {
			content: '2d';
		}
		:host > i.\\000032k:before {
			content: '2k';
		}
		:host > i.\\000032k_plus:before {
			content: '2k_plus';
		}
		:host > i.\\000032mp:before {
			content: '2mp';
		}
		:host > i.\\0000330fps:before {
			content: '30fps';
		}
		:host > i.\\0000330fps_select:before {
			content: '30fps_select';
		}
		:host > i.\\00003360:before {
			content: '360';
		}
		:host > i.\\000033d_rotation:before {
			content: '3d_rotation';
		}
		:host > i.\\000033g_mobiledata:before {
			content: '3g_mobiledata';
		}
		:host > i.\\000033g_mobiledata_badge:before {
			content: '3g_mobiledata_badge';
		}
		:host > i.\\000033k:before {
			content: '3k';
		}
		:host > i.\\000033k_plus:before {
			content: '3k_plus';
		}
		:host > i.\\000033mp:before {
			content: '3mp';
		}
		:host > i.\\000033p:before {
			content: '3p';
		}
		:host > i.\\000034g_mobiledata:before {
			content: '4g_mobiledata';
		}
		:host > i.\\000034g_mobiledata_badge:before {
			content: '4g_mobiledata_badge';
		}
		:host > i.\\000034g_plus_mobiledata:before {
			content: '4g_plus_mobiledata';
		}
		:host > i.\\000034k:before {
			content: '4k';
		}
		:host > i.\\000034k_plus:before {
			content: '4k_plus';
		}
		:host > i.\\000034mp:before {
			content: '4mp';
		}
		:host > i.\\0000350mp:before {
			content: '50mp';
		}
		:host > i.\\000035g:before {
			content: '5g';
		}
		:host > i.\\000035g_mobiledata_badge:before {
			content: '5g_mobiledata_badge';
		}
		:host > i.\\000035k:before {
			content: '5k';
		}
		:host > i.\\000035k_plus:before {
			content: '5k_plus';
		}
		:host > i.\\000035mp:before {
			content: '5mp';
		}
		:host > i.\\0000360fps:before {
			content: '60fps';
		}
		:host > i.\\0000360fps_select:before {
			content: '60fps_select';
		}
		:host > i.\\000036_ft_apart:before {
			content: '6_ft_apart';
		}
		:host > i.\\000036k:before {
			content: '6k';
		}
		:host > i.\\000036k_plus:before {
			content: '6k_plus';
		}
		:host > i.\\000036mp:before {
			content: '6mp';
		}
		:host > i.\\000037k:before {
			content: '7k';
		}
		:host > i.\\000037k_plus:before {
			content: '7k_plus';
		}
		:host > i.\\000037mp:before {
			content: '7mp';
		}
		:host > i.\\000038k:before {
			content: '8k';
		}
		:host > i.\\000038k_plus:before {
			content: '8k_plus';
		}
		:host > i.\\000038mp:before {
			content: '8mp';
		}
		:host > i.\\000039k:before {
			content: '9k';
		}
		:host > i.\\000039k_plus:before {
			content: '39k_plus';
		}
		:host > i.\\000039mp:before {
			content: '9mp';
		}
		:host > i.abc:before {
			content: 'abc';
		}
		:host > i.ac_unit:before {
			content: 'ac_unit';
		}
		:host > i.access_alarm:before {
			content: 'access_alarm';
		}
		:host > i.access_alarms:before {
			content: 'access_alarms';
		}
		:host > i.access_time:before {
			content: 'access_time';
		}
		:host > i.access_time_filled:before {
			content: 'access_time_filled';
		}
		:host > i.accessibility:before {
			content: 'accessibility';
		}
		:host > i.accessibility_new:before {
			content: 'accessibility_new';
		}
		:host > i.accessible:before {
			content: 'accessible';
		}
		:host > i.accessible_forward:before {
			content: 'accessible_forward';
		}
		:host > i.account_balance:before {
			content: 'account_balance';
		}
		:host > i.account_balance_wallet:before {
			content: 'account_balance_wallet';
		}
		:host > i.account_box:before {
			content: 'account_box';
		}
		:host > i.account_child:before {
			content: 'account_child';
		}
		:host > i.account_child_invert:before {
			content: 'account_child_invert';
		}
		:host > i.account_circle:before {
			content: 'account_circle';
		}
		:host > i.account_circle_filled:before {
			content: 'account_circle_filled';
		}
		:host > i.account_circle_off:before {
			content: 'account_circle_off';
		}
		:host > i.account_tree:before {
			content: 'account_tree';
		}
		:host > i.action_key:before {
			content: 'action_key';
		}
		:host > i.activity_zone:before {
			content: 'activity_zone';
		}
		:host > i.acute:before {
			content: 'acute';
		}
		:host > i.ad:before {
			content: 'ad';
		}
		:host > i.ad_group:before {
			content: 'ad_group';
		}
		:host > i.ad_group_off:before {
			content: 'ad_group_off';
		}
		:host > i.ad_off:before {
			content: 'ad_off';
		}
		:host > i.ad_units:before {
			content: 'ad_units';
		}
		:host > i.adb:before {
			content: 'adb';
		}
		:host > i.add:before {
			content: 'add';
		}
		:host > i.add_a_photo:before {
			content: 'add_a_photo';
		}
		:host > i.add_ad:before {
			content: 'add_ad';
		}
		:host > i.add_alarm:before {
			content: 'add_alarm';
		}
		:host > i.add_alert:before {
			content: 'add_alert';
		}
		:host > i.add_box:before {
			content: 'add_box';
		}
		:host > i.add_business:before {
			content: 'add_business';
		}
		:host > i.add_call:before {
			content: 'add_call';
		}
		:host > i.add_card:before {
			content: 'add_card';
		}
		:host > i.add_chart:before {
			content: 'add_chart';
		}
		:host > i.add_circle:before {
			content: 'add_circle';
		}
		:host > i.add_circle_outline:before {
			content: 'add_circle_outline';
		}
		:host > i.add_comment:before {
			content: 'add_comment';
		}
		:host > i.add_home:before {
			content: 'add_home';
		}
		:host > i.add_home_work:before {
			content: 'add_home_work';
		}
		:host > i.add_ic_call:before {
			content: 'add_ic_call';
		}
		:host > i.add_link:before {
			content: 'add_link';
		}
		:host > i.add_location:before {
			content: 'add_location';
		}
		:host > i.add_location_alt:before {
			content: 'add_location_alt';
		}
		:host > i.add_moderator:before {
			content: 'add_moderator';
		}
		:host > i.add_notes:before {
			content: 'add_notes';
		}
		:host > i.add_photo_alternate:before {
			content: 'add_photo_alternate';
		}
		:host > i.add_reaction:before {
			content: 'add_reaction';
		}
		:host > i.add_road:before {
			content: 'add_road';
		}
		:host > i.add_shopping_cart:before {
			content: 'add_shopping_cart';
		}
		:host > i.add_task:before {
			content: 'add_task';
		}
		:host > i.add_to_drive:before {
			content: 'add_to_drive';
		}
		:host > i.add_to_home_screen:before {
			content: 'add_to_home_screen';
		}
		:host > i.add_to_photos:before {
			content: 'add_to_photos';
		}
		:host > i.add_to_queue:before {
			content: 'add_to_queue';
		}
		:host > i.addchart:before {
			content: 'addchart';
		}
		:host > i.adf_scanner:before {
			content: 'adf_scanner';
		}
		:host > i.adjust:before {
			content: 'adjust';
		}
		:host > i.admin_meds:before {
			content: 'admin_meds';
		}
		:host > i.admin_panel_settings:before {
			content: 'admin_panel_settings';
		}
		:host > i.ads_click:before {
			content: 'ads_click';
		}
		:host > i.agender:before {
			content: 'agender';
		}
		:host > i.agriculture:before {
			content: 'agriculture';
		}
		:host > i.air:before {
			content: 'air';
		}
		:host > i.air_freshener:before {
			content: 'air_freshener';
		}
		:host > i.air_purifier:before {
			content: 'air_purifier';
		}
		:host > i.air_purifier_gen:before {
			content: 'air_purifier_gen';
		}
		:host > i.airline_seat_flat:before {
			content: 'airline_seat_flat';
		}
		:host > i.airline_seat_flat_angled:before {
			content: 'airline_seat_flat_angled';
		}
		:host > i.airline_seat_individual_suite:before {
			content: 'airline_seat_individual_suite';
		}
		:host > i.airline_seat_legroom_extra:before {
			content: 'airline_seat_legroom_extra';
		}
		:host > i.airline_seat_legroom_normal:before {
			content: 'airline_seat_legroom_normal';
		}
		:host > i.airline_seat_legroom_reduced:before {
			content: 'airline_seat_legroom_reduced';
		}
		:host > i.airline_seat_recline_extra:before {
			content: 'airline_seat_recline_extra';
		}
		:host > i.airline_seat_recline_normal:before {
			content: 'airline_seat_recline_normal';
		}
		:host > i.airline_stops:before {
			content: 'airline_stops';
		}
		:host > i.airlines:before {
			content: 'airlines';
		}
		:host > i.airplane_ticket:before {
			content: 'airplane_ticket';
		}
		:host > i.airplanemode_active:before {
			content: 'airplanemode_active';
		}
		:host > i.airplanemode_inactive:before {
			content: 'airplanemode_inactive';
		}
		:host > i.airplay:before {
			content: 'airplay';
		}
		:host > i.airport_shuttle:before {
			content: 'airport_shuttle';
		}
		:host > i.airware:before {
			content: 'airware';
		}
		:host > i.airwave:before {
			content: 'airwave';
		}
		:host > i.alarm:before {
			content: 'alarm';
		}
		:host > i.alarm_add:before {
			content: 'alarm_add';
		}
		:host > i.alarm_off:before {
			content: 'alarm_off';
		}
		:host > i.alarm_on:before {
			content: 'alarm_on';
		}
		:host > i.alarm_smart_wake:before {
			content: 'alarm_smart_wake';
		}
		:host > i.album:before {
			content: 'album';
		}
		:host > i.align_center:before {
			content: 'align_center';
		}
		:host > i.align_end:before {
			content: 'align_end';
		}
		:host > i.align_flex_center:before {
			content: 'align_flex_center';
		}
		:host > i.align_flex_end:before {
			content: 'align_flex_end';
		}
		:host > i.align_flex_start:before {
			content: 'align_flex_start';
		}
		:host > i.align_horizontal_center:before {
			content: 'align_horizontal_center';
		}
		:host > i.align_horizontal_left:before {
			content: 'align_horizontal_left';
		}
		:host > i.align_horizontal_right:before {
			content: 'align_horizontal_right';
		}
		:host > i.align_items_stretch:before {
			content: 'align_items_stretch';
		}
		:host > i.align_justify_center:before {
			content: 'align_justify_center';
		}
		:host > i.align_justify_flex_end:before {
			content: 'align_justify_flex_end';
		}
		:host > i.align_justify_flex_start:before {
			content: 'align_justify_flex_start';
		}
		:host > i.align_justify_space_around:before {
			content: 'align_justify_space_around';
		}
		:host > i.align_justify_space_between:before {
			content: 'align_justify_space_between';
		}
		:host > i.align_justify_space_even:before {
			content: 'align_justify_space_even';
		}
		:host > i.align_justify_stretch:before {
			content: 'align_justify_stretch';
		}
		:host > i.align_self_stretch:before {
			content: 'align_self_stretch';
		}
		:host > i.align_space_around:before {
			content: 'align_space_around';
		}
		:host > i.align_space_between:before {
			content: 'align_space_between';
		}
		:host > i.align_space_even:before {
			content: 'align_space_even';
		}
		:host > i.align_start:before {
			content: 'align_start';
		}
		:host > i.align_stretch:before {
			content: 'align_stretch';
		}
		:host > i.align_vertical_bottom:before {
			content: 'align_vertical_bottom';
		}
		:host > i.align_vertical_center:before {
			content: 'align_vertical_center';
		}
		:host > i.align_vertical_top:before {
			content: 'align_vertical_top';
		}
		:host > i.all_inbox:before {
			content: 'all_inbox';
		}
		:host > i.all_inclusive:before {
			content: 'all_inclusive';
		}
		:host > i.all_match:before {
			content: 'all_match';
		}
		:host > i.all_out:before {
			content: 'all_out';
		}
		:host > i.allergies:before {
			content: 'allergies';
		}
		:host > i.allergy:before {
			content: 'allergy';
		}
		:host > i.alt_route:before {
			content: 'alt_route';
		}
		:host > i.alternate_email:before {
			content: 'alternate_email';
		}
		:host > i.altitude:before {
			content: 'altitude';
		}
		:host > i.ambient_screen:before {
			content: 'ambient_screen';
		}
		:host > i.ambulance:before {
			content: 'ambulance';
		}
		:host > i.amend:before {
			content: 'amend';
		}
		:host > i.amp_stories:before {
			content: 'amp_stories';
		}
		:host > i.analytics:before {
			content: 'analytics';
		}
		:host > i.anchor:before {
			content: 'anchor';
		}
		:host > i.android:before {
			content: 'android';
		}
		:host > i.animation:before {
			content: 'animation';
		}
		:host > i.announcement:before {
			content: 'announcement';
		}
		:host > i.aod:before {
			content: 'aod';
		}
		:host > i.aod_tablet:before {
			content: 'aod_tablet';
		}
		:host > i.aod_watch:before {
			content: 'aod_watch';
		}
		:host > i.apartment:before {
			content: 'apartment';
		}
		:host > i.api:before {
			content: 'api';
		}
		:host > i.apk_document:before {
			content: 'apk_document';
		}
		:host > i.apk_install:before {
			content: 'apk_install';
		}
		:host > i.app_badging:before {
			content: 'app_badging';
		}
		:host > i.app_blocking:before {
			content: 'app_blocking';
		}
		:host > i.app_promo:before {
			content: 'app_promo';
		}
		:host > i.app_registration:before {
			content: 'app_registration';
		}
		:host > i.app_settings_alt:before {
			content: 'app_settings_alt';
		}
		:host > i.app_shortcut:before {
			content: 'app_shortcut';
		}
		:host > i.apparel:before {
			content: 'apparel';
		}
		:host > i.approval:before {
			content: 'approval';
		}
		:host > i.approval_delegation:before {
			content: 'approval_delegation';
		}
		:host > i.apps:before {
			content: 'apps';
		}
		:host > i.apps_outage:before {
			content: 'apps_outage';
		}
		:host > i.aq:before {
			content: 'aq';
		}
		:host > i.aq_indoor:before {
			content: 'aq_indoor';
		}
		:host > i.ar_on_you:before {
			content: 'ar_on_you';
		}
		:host > i.ar_stickers:before {
			content: 'ar_stickers';
		}
		:host > i.architecture:before {
			content: 'architecture';
		}
		:host > i.archive:before {
			content: 'archive';
		}
		:host > i.area_chart:before {
			content: 'area_chart';
		}
		:host > i.arming_countdown:before {
			content: 'arming_countdown';
		}
		:host > i.arrow_and_edge:before {
			content: 'arrow_and_edge';
		}
		:host > i.arrow_back:before {
			content: 'arrow_back';
		}
		:host > i.arrow_back_ios:before {
			content: 'arrow_back_ios';
		}
		:host > i.arrow_back_ios_new:before {
			content: 'arrow_back_ios_new';
		}
		:host > i.arrow_circle_down:before {
			content: 'arrow_circle_down';
		}
		:host > i.arrow_circle_left:before {
			content: 'arrow_circle_left';
		}
		:host > i.arrow_circle_right:before {
			content: 'arrow_circle_right';
		}
		:host > i.arrow_circle_up:before {
			content: 'arrow_circle_up';
		}
		:host > i.arrow_downward:before {
			content: 'arrow_downward';
		}
		:host > i.arrow_downward_alt:before {
			content: 'arrow_downward_alt';
		}
		:host > i.arrow_drop_down:before {
			content: 'arrow_drop_down';
		}
		:host > i.arrow_drop_down_circle:before {
			content: 'arrow_drop_down_circle';
		}
		:host > i.arrow_drop_up:before {
			content: 'arrow_drop_up';
		}
		:host > i.arrow_forward:before {
			content: 'arrow_forward';
		}
		:host > i.arrow_forward_ios:before {
			content: 'arrow_forward_ios';
		}
		:host > i.arrow_insert:before {
			content: 'arrow_insert';
		}
		:host > i.arrow_left:before {
			content: 'arrow_left';
		}
		:host > i.arrow_left_alt:before {
			content: 'arrow_left_alt';
		}
		:host > i.arrow_or_edge:before {
			content: 'arrow_or_edge';
		}
		:host > i.arrow_outward:before {
			content: 'arrow_outward';
		}
		:host > i.arrow_range:before {
			content: 'arrow_range';
		}
		:host > i.arrow_right:before {
			content: 'arrow_right';
		}
		:host > i.arrow_right_alt:before {
			content: 'arrow_right_alt';
		}
		:host > i.arrow_selector_tool:before {
			content: 'arrow_selector_tool';
		}
		:host > i.arrow_split:before {
			content: 'arrow_split';
		}
		:host > i.arrow_top_left:before {
			content: 'arrow_top_left';
		}
		:host > i.arrow_top_right:before {
			content: 'arrow_top_right';
		}
		:host > i.arrow_upward:before {
			content: 'arrow_upward';
		}
		:host > i.arrow_upward_alt:before {
			content: 'arrow_upward_alt';
		}
		:host > i.arrows_more_down:before {
			content: 'arrows_more_down';
		}
		:host > i.arrows_more_up:before {
			content: 'arrows_more_up';
		}
		:host > i.arrows_outward:before {
			content: 'arrows_outward';
		}
		:host > i.art_track:before {
			content: 'art_track';
		}
		:host > i.article:before {
			content: 'article';
		}
		:host > i.article_shortcut:before {
			content: 'article_shortcut';
		}
		:host > i.artist:before {
			content: 'artist';
		}
		:host > i.aspect_ratio:before {
			content: 'aspect_ratio';
		}
		:host > i.assessment:before {
			content: 'assessment';
		}
		:host > i.assignment:before {
			content: 'assignment';
		}
		:host > i.assignment_add:before {
			content: 'assignment_add';
		}
		:host > i.assignment_ind:before {
			content: 'assignment_ind';
		}
		:host > i.assignment_late:before {
			content: 'assignment_late';
		}
		:host > i.assignment_return:before {
			content: 'assignment_return';
		}
		:host > i.assignment_returned:before {
			content: 'assignment_returned';
		}
		:host > i.assignment_turned_in:before {
			content: 'assignment_turned_in';
		}
		:host > i.assist_walker:before {
			content: 'assist_walker';
		}
		:host > i.assistant:before {
			content: 'assistant';
		}
		:host > i.assistant_device:before {
			content: 'assistant_device';
		}
		:host > i.assistant_direction:before {
			content: 'assistant_direction';
		}
		:host > i.assistant_navigation:before {
			content: 'assistant_navigation';
		}
		:host > i.assistant_on_hub:before {
			content: 'assistant_on_hub';
		}
		:host > i.assistant_photo:before {
			content: 'assistant_photo';
		}
		:host > i.assured_workload:before {
			content: 'assured_workload';
		}
		:host > i.asterisk:before {
			content: 'asterisk';
		}
		:host > i.astrophotography_auto:before {
			content: 'astrophotography_auto';
		}
		:host > i.astrophotography_off:before {
			content: 'astrophotography_off';
		}
		:host > i.atm:before {
			content: 'atm';
		}
		:host > i.atr:before {
			content: 'atr';
		}
		:host > i.attach_email:before {
			content: 'attach_email';
		}
		:host > i.attach_file:before {
			content: 'attach_file';
		}
		:host > i.attach_file_add:before {
			content: 'attach_file_add';
		}
		:host > i.attach_money:before {
			content: 'attach_money';
		}
		:host > i.attachment:before {
			content: 'attachment';
		}
		:host > i.attractions:before {
			content: 'attractions';
		}
		:host > i.attribution:before {
			content: 'attribution';
		}
		:host > i.audio_description:before {
			content: 'audio_description';
		}
		:host > i.audio_file:before {
			content: 'audio_file';
		}
		:host > i.audio_video_receiver:before {
			content: 'audio_video_receiver';
		}
		:host > i.audiotrack:before {
			content: 'audiotrack';
		}
		:host > i.auto_activity_zone:before {
			content: 'auto_activity_zone';
		}
		:host > i.auto_awesome:before {
			content: 'auto_awesome';
		}
		:host > i.auto_awesome_mosaic:before {
			content: 'auto_awesome_mosaic';
		}
		:host > i.auto_awesome_motion:before {
			content: 'auto_awesome_motion';
		}
		:host > i.auto_delete:before {
			content: 'auto_delete';
		}
		:host > i.auto_detect_voice:before {
			content: 'auto_detect_voice';
		}
		:host > i.auto_draw_solid:before {
			content: 'auto_draw_solid';
		}
		:host > i.auto_fix:before {
			content: 'auto_fix';
		}
		:host > i.auto_fix_high:before {
			content: 'auto_fix_high';
		}
		:host > i.auto_fix_normal:before {
			content: 'auto_fix_normal';
		}
		:host > i.auto_fix_off:before {
			content: 'auto_fix_off';
		}
		:host > i.auto_graph:before {
			content: 'auto_graph';
		}
		:host > i.auto_label:before {
			content: 'auto_label';
		}
		:host > i.auto_meeting_room:before {
			content: 'auto_meeting_room';
		}
		:host > i.auto_mode:before {
			content: 'auto_mode';
		}
		:host > i.auto_read_pause:before {
			content: 'auto_read_pause';
		}
		:host > i.auto_read_play:before {
			content: 'auto_read_play';
		}
		:host > i.auto_schedule:before {
			content: 'auto_schedule';
		}
		:host > i.auto_stories:before {
			content: 'auto_stories';
		}
		:host > i.auto_timer:before {
			content: 'auto_timer';
		}
		:host > i.auto_towing:before {
			content: 'auto_towing';
		}
		:host > i.auto_transmission:before {
			content: 'auto_transmission';
		}
		:host > i.auto_videocam:before {
			content: 'auto_videocam';
		}
		:host > i.autofps_select:before {
			content: 'autofps_select';
		}
		:host > i.autopause:before {
			content: 'autopause';
		}
		:host > i.autopay:before {
			content: 'autopay';
		}
		:host > i.autoplay:before {
			content: 'autoplay';
		}
		:host > i.autorenew:before {
			content: 'autorenew';
		}
		:host > i.autostop:before {
			content: 'autostop';
		}
		:host > i.av_timer:before {
			content: 'av_timer';
		}
		:host > i.avg_pace:before {
			content: 'avg_pace';
		}
		:host > i.avg_time:before {
			content: 'avg_time';
		}
		:host > i.award_star:before {
			content: 'award_star';
		}
		:host > i.azm:before {
			content: 'azm';
		}
		:host > i.baby_changing_station:before {
			content: 'baby_changing_station';
		}
		:host > i.back_hand:before {
			content: 'back_hand';
		}
		:host > i.back_to_tab:before {
			content: 'back_to_tab';
		}
		:host > i.background_dot_large:before {
			content: 'background_dot_large';
		}
		:host > i.background_dot_small:before {
			content: 'background_dot_small';
		}
		:host > i.background_grid_small:before {
			content: 'background_grid_small';
		}
		:host > i.background_replace:before {
			content: 'background_replace';
		}
		:host > i.backlight_high:before {
			content: 'backlight_high';
		}
		:host > i.backlight_high_off:before {
			content: 'backlight_high_off';
		}
		:host > i.backlight_low:before {
			content: 'backlight_low';
		}
		:host > i.backpack:before {
			content: 'backpack';
		}
		:host > i.backspace:before {
			content: 'backspace';
		}
		:host > i.backup:before {
			content: 'backup';
		}
		:host > i.backup_table:before {
			content: 'backup_table';
		}
		:host > i.badge:before {
			content: 'badge';
		}
		:host > i.badge_critical_battery:before {
			content: 'badge_critical_battery';
		}
		:host > i.bakery_dining:before {
			content: 'bakery_dining';
		}
		:host > i.balance:before {
			content: 'balance';
		}
		:host > i.balcony:before {
			content: 'balcony';
		}
		:host > i.ballot:before {
			content: 'ballot';
		}
		:host > i.bar_chart:before {
			content: 'bar_chart';
		}
		:host > i.bar_chart_4_bars:before {
			content: 'bar_chart_4_bars';
		}
		:host > i.barcode:before {
			content: 'barcode';
		}
		:host > i.barcode_reader:before {
			content: 'barcode_reader';
		}
		:host > i.barcode_scanner:before {
			content: 'barcode_scanner';
		}
		:host > i.barefoot:before {
			content: 'barefoot';
		}
		:host > i.batch_prediction:before {
			content: 'batch_prediction';
		}
		:host > i.bath_outdoor:before {
			content: 'bath_outdoor';
		}
		:host > i.bath_private:before {
			content: 'bath_private';
		}
		:host > i.bath_public_large:before {
			content: 'bath_public_large';
		}
		:host > i.bathroom:before {
			content: 'bathroom';
		}
		:host > i.bathtub:before {
			content: 'bathtub';
		}
		:host > i.battery_0_bar:before {
			content: 'battery_0_bar';
		}
		:host > i.battery_1_bar:before {
			content: 'battery_1_bar';
		}
		:host > i.battery_20:before {
			content: 'battery_20';
		}
		:host > i.battery_2_bar:before {
			content: 'battery_2_bar';
		}
		:host > i.battery_30:before {
			content: 'battery_30';
		}
		:host > i.battery_3_bar:before {
			content: 'battery_3_bar';
		}
		:host > i.battery_4_bar:before {
			content: 'battery_4_bar';
		}
		:host > i.battery_50:before {
			content: 'battery_50';
		}
		:host > i.battery_5_bar:before {
			content: 'battery_5_bar';
		}
		:host > i.battery_60:before {
			content: 'battery_60';
		}
		:host > i.battery_6_bar:before {
			content: 'battery_6_bar';
		}
		:host > i.battery_80:before {
			content: 'battery_80';
		}
		:host > i.battery_90:before {
			content: 'battery_90';
		}
		:host > i.battery_alert:before {
			content: 'battery_alert';
		}
		:host > i.battery_change:before {
			content: 'battery_change';
		}
		:host > i.battery_charging_20:before {
			content: 'battery_charging_20';
		}
		:host > i.battery_charging_30:before {
			content: 'battery_charging_30';
		}
		:host > i.battery_charging_50:before {
			content: 'battery_charging_50';
		}
		:host > i.battery_charging_60:before {
			content: 'battery_charging_60';
		}
		:host > i.battery_charging_80:before {
			content: 'battery_charging_80';
		}
		:host > i.battery_charging_90:before {
			content: 'battery_charging_90';
		}
		:host > i.battery_charging_full:before {
			content: 'battery_charging_full';
		}
		:host > i.battery_error:before {
			content: 'battery_error';
		}
		:host > i.battery_full:before {
			content: 'battery_full';
		}
		:host > i.battery_full_alt:before {
			content: 'battery_full_alt';
		}
		:host > i.battery_horiz_000:before {
			content: 'battery_horiz_000';
		}
		:host > i.battery_horiz_050:before {
			content: 'battery_horiz_050';
		}
		:host > i.battery_horiz_075:before {
			content: 'battery_horiz_075';
		}
		:host > i.battery_low:before {
			content: 'battery_low';
		}
		:host > i.battery_plus:before {
			content: 'battery_plus';
		}
		:host > i.battery_profile:before {
			content: 'battery_profile';
		}
		:host > i.battery_saver:before {
			content: 'battery_saver';
		}
		:host > i.battery_share:before {
			content: 'battery_share';
		}
		:host > i.battery_status_good:before {
			content: 'battery_status_good';
		}
		:host > i.battery_std:before {
			content: 'battery_std';
		}
		:host > i.battery_unknown:before {
			content: 'battery_unknown';
		}
		:host > i.battery_vert_005:before {
			content: 'battery_vert_005';
		}
		:host > i.battery_vert_020:before {
			content: 'battery_vert_020';
		}
		:host > i.battery_vert_050:before {
			content: 'battery_vert_050';
		}
		:host > i.battery_very_low:before {
			content: 'battery_very_low';
		}
		:host > i.beach_access:before {
			content: 'beach_access';
		}
		:host > i.bed:before {
			content: 'bed';
		}
		:host > i.bedroom_baby:before {
			content: 'bedroom_baby';
		}
		:host > i.bedroom_child:before {
			content: 'bedroom_child';
		}
		:host > i.bedroom_parent:before {
			content: 'bedroom_parent';
		}
		:host > i.bedtime:before {
			content: 'bedtime';
		}
		:host > i.bedtime_off:before {
			content: 'bedtime_off';
		}
		:host > i.beenhere:before {
			content: 'beenhere';
		}
		:host > i.bento:before {
			content: 'bento';
		}
		:host > i.bia:before {
			content: 'bia';
		}
		:host > i.bid_landscape:before {
			content: 'bid_landscape';
		}
		:host > i.bid_landscape_disabled:before {
			content: 'bid_landscape_disabled';
		}
		:host > i.bigtop_updates:before {
			content: 'bigtop_updates';
		}
		:host > i.bike_scooter:before {
			content: 'bike_scooter';
		}
		:host > i.biotech:before {
			content: 'biotech';
		}
		:host > i.blanket:before {
			content: 'blanket';
		}
		:host > i.blender:before {
			content: 'blender';
		}
		:host > i.blind:before {
			content: 'blind';
		}
		:host > i.blinds:before {
			content: 'blinds';
		}
		:host > i.blinds_closed:before {
			content: 'blinds_closed';
		}
		:host > i.block:before {
			content: 'block';
		}
		:host > i.blood_pressure:before {
			content: 'blood_pressure';
		}
		:host > i.bloodtype:before {
			content: 'bloodtype';
		}
		:host > i.bluetooth:before {
			content: 'bluetooth';
		}
		:host > i.bluetooth_audio:before {
			content: 'bluetooth_audio';
		}
		:host > i.bluetooth_connected:before {
			content: 'bluetooth_connected';
		}
		:host > i.bluetooth_disabled:before {
			content: 'bluetooth_disabled';
		}
		:host > i.bluetooth_drive:before {
			content: 'bluetooth_drive';
		}
		:host > i.bluetooth_searching:before {
			content: 'bluetooth_searching';
		}
		:host > i.blur_circular:before {
			content: 'blur_circular';
		}
		:host > i.blur_linear:before {
			content: 'blur_linear';
		}
		:host > i.blur_medium:before {
			content: 'blur_medium';
		}
		:host > i.blur_off:before {
			content: 'blur_off';
		}
		:host > i.blur_on:before {
			content: 'blur_on';
		}
		:host > i.blur_short:before {
			content: 'blur_short';
		}
		:host > i.body_fat:before {
			content: 'body_fat';
		}
		:host > i.body_system:before {
			content: 'body_system';
		}
		:host > i.bolt:before {
			content: 'bolt';
		}
		:host > i.bomb:before {
			content: 'bomb';
		}
		:host > i.book:before {
			content: 'book';
		}
		:host > i.book_2:before {
			content: 'book_2';
		}
		:host > i.book_3:before {
			content: 'book_3';
		}
		:host > i.book_4:before {
			content: 'book_4';
		}
		:host > i.book_5:before {
			content: 'book_5';
		}
		:host > i.book_online:before {
			content: 'book_online';
		}
		:host > i.bookmark:before {
			content: 'bookmark';
		}
		:host > i.bookmark_add:before {
			content: 'bookmark_add';
		}
		:host > i.bookmark_added:before {
			content: 'bookmark_added';
		}
		:host > i.bookmark_border:before {
			content: 'bookmark_border';
		}
		:host > i.bookmark_manager:before {
			content: 'bookmark_manager';
		}
		:host > i.bookmark_remove:before {
			content: 'bookmark_remove';
		}
		:host > i.bookmarks:before {
			content: 'bookmarks';
		}
		:host > i.border_all:before {
			content: 'border_all';
		}
		:host > i.border_bottom:before {
			content: 'border_bottom';
		}
		:host > i.border_clear:before {
			content: 'border_clear';
		}
		:host > i.border_color:before {
			content: 'border_color';
		}
		:host > i.border_horizontal:before {
			content: 'border_horizontal';
		}
		:host > i.border_inner:before {
			content: 'border_inner';
		}
		:host > i.border_left:before {
			content: 'border_left';
		}
		:host > i.border_outer:before {
			content: 'border_outer';
		}
		:host > i.border_right:before {
			content: 'border_right';
		}
		:host > i.border_style:before {
			content: 'border_style';
		}
		:host > i.border_top:before {
			content: 'border_top';
		}
		:host > i.border_vertical:before {
			content: 'border_vertical';
		}
		:host > i.bottom_app_bar:before {
			content: 'bottom_app_bar';
		}
		:host > i.bottom_drawer:before {
			content: 'bottom_drawer';
		}
		:host > i.bottom_navigation:before {
			content: 'bottom_navigation';
		}
		:host > i.bottom_panel_close:before {
			content: 'bottom_panel_close';
		}
		:host > i.bottom_panel_open:before {
			content: 'bottom_panel_open';
		}
		:host > i.bottom_right_click:before {
			content: 'bottom_right_click';
		}
		:host > i.bottom_sheets:before {
			content: 'bottom_sheets';
		}
		:host > i.box:before {
			content: 'box';
		}
		:host > i.box_add:before {
			content: 'box_add';
		}
		:host > i.box_edit:before {
			content: 'box_edit';
		}
		:host > i.boy:before {
			content: 'boy';
		}
		:host > i.brand_awareness:before {
			content: 'brand_awareness';
		}
		:host > i.brand_family:before {
			content: 'brand_family';
		}
		:host > i.branding_watermark:before {
			content: 'branding_watermark';
		}
		:host > i.breakfast_dining:before {
			content: 'breakfast_dining';
		}
		:host > i.breaking_news:before {
			content: 'breaking_news';
		}
		:host > i.breaking_news_alt_1:before {
			content: 'breaking_news_alt_1';
		}
		:host > i.breastfeeding:before {
			content: 'breastfeeding';
		}
		:host > i.brightness_1:before {
			content: 'brightness_1';
		}
		:host > i.brightness_2:before {
			content: 'brightness_2';
		}
		:host > i.brightness_3:before {
			content: 'brightness_3';
		}
		:host > i.brightness_4:before {
			content: 'brightness_4';
		}
		:host > i.brightness_5:before {
			content: 'brightness_5';
		}
		:host > i.brightness_6:before {
			content: 'brightness_6';
		}
		:host > i.brightness_7:before {
			content: 'brightness_7';
		}
		:host > i.brightness_alert:before {
			content: 'brightness_alert';
		}
		:host > i.brightness_auto:before {
			content: 'brightness_auto';
		}
		:host > i.brightness_empty:before {
			content: 'brightness_empty';
		}
		:host > i.brightness_high:before {
			content: 'brightness_high';
		}
		:host > i.brightness_low:before {
			content: 'brightness_low';
		}
		:host > i.brightness_medium:before {
			content: 'brightness_medium';
		}
		:host > i.bring_your_own_ip:before {
			content: 'bring_your_own_ip';
		}
		:host > i.broadcast_on_home:before {
			content: 'broadcast_on_home';
		}
		:host > i.broadcast_on_personal:before {
			content: 'broadcast_on_personal';
		}
		:host > i.broken_image:before {
			content: 'broken_image';
		}
		:host > i.browse:before {
			content: 'browse';
		}
		:host > i.browse_activity:before {
			content: 'browse_activity';
		}
		:host > i.browse_gallery:before {
			content: 'browse_gallery';
		}
		:host > i.browser_not_supported:before {
			content: 'browser_not_supported';
		}
		:host > i.browser_updated:before {
			content: 'browser_updated';
		}
		:host > i.brunch_dining:before {
			content: 'brunch_dining';
		}
		:host > i.brush:before {
			content: 'brush';
		}
		:host > i.bubble:before {
			content: 'bubble';
		}
		:host > i.bubble_chart:before {
			content: 'bubble_chart';
		}
		:host > i.bubbles:before {
			content: 'bubbles';
		}
		:host > i.bug_report:before {
			content: 'bug_report';
		}
		:host > i.build:before {
			content: 'build';
		}
		:host > i.build_circle:before {
			content: 'build_circle';
		}
		:host > i.bungalow:before {
			content: 'bungalow';
		}
		:host > i.burst_mode:before {
			content: 'burst_mode';
		}
		:host > i.bus_alert:before {
			content: 'bus_alert';
		}
		:host > i.business:before {
			content: 'business';
		}
		:host > i.business_center:before {
			content: 'business_center';
		}
		:host > i.business_chip:before {
			content: 'business_chip';
		}
		:host > i.business_messages:before {
			content: 'business_messages';
		}
		:host > i.buttons_alt:before {
			content: 'buttons_alt';
		}
		:host > i.cabin:before {
			content: 'cabin';
		}
		:host > i.cable:before {
			content: 'cable';
		}
		:host > i.cached:before {
			content: 'cached';
		}
		:host > i.cake:before {
			content: 'cake';
		}
		:host > i.cake_add:before {
			content: 'cake_add';
		}
		:host > i.calculate:before {
			content: 'calculate';
		}
		:host > i.calendar_add_on:before {
			content: 'calendar_add_on';
		}
		:host > i.calendar_apps_script:before {
			content: 'calendar_apps_script';
		}
		:host > i.calendar_clock:before {
			content: 'calendar_clock';
		}
		:host > i.calendar_month:before {
			content: 'calendar_month';
		}
		:host > i.calendar_today:before {
			content: 'calendar_today';
		}
		:host > i.calendar_view_day:before {
			content: 'calendar_view_day';
		}
		:host > i.calendar_view_month:before {
			content: 'calendar_view_month';
		}
		:host > i.calendar_view_week:before {
			content: 'calendar_view_week';
		}
		:host > i.call:before {
			content: 'call';
		}
		:host > i.call_end:before {
			content: 'call_end';
		}
		:host > i.call_end_alt:before {
			content: 'call_end_alt';
		}
		:host > i.call_log:before {
			content: 'call_log';
		}
		:host > i.call_made:before {
			content: 'call_made';
		}
		:host > i.call_merge:before {
			content: 'call_merge';
		}
		:host > i.call_missed:before {
			content: 'call_missed';
		}
		:host > i.call_missed_outgoing:before {
			content: 'call_missed_outgoing';
		}
		:host > i.call_quality:before {
			content: 'call_quality';
		}
		:host > i.call_received:before {
			content: 'call_received';
		}
		:host > i.call_split:before {
			content: 'call_split';
		}
		:host > i.call_to_action:before {
			content: 'call_to_action';
		}
		:host > i.camera:before {
			content: 'camera';
		}
		:host > i.camera_alt:before {
			content: 'camera_alt';
		}
		:host > i.camera_enhance:before {
			content: 'camera_enhance';
		}
		:host > i.camera_front:before {
			content: 'camera_front';
		}
		:host > i.camera_indoor:before {
			content: 'camera_indoor';
		}
		:host > i.camera_outdoor:before {
			content: 'camera_outdoor';
		}
		:host > i.camera_rear:before {
			content: 'camera_rear';
		}
		:host > i.camera_roll:before {
			content: 'camera_roll';
		}
		:host > i.camera_video:before {
			content: 'camera_video';
		}
		:host > i.cameraswitch:before {
			content: 'cameraswitch';
		}
		:host > i.campaign:before {
			content: 'campaign';
		}
		:host > i.camping:before {
			content: 'camping';
		}
		:host > i.cancel:before {
			content: 'cancel';
		}
		:host > i.cancel_presentation:before {
			content: 'cancel_presentation';
		}
		:host > i.cancel_schedule_send:before {
			content: 'cancel_schedule_send';
		}
		:host > i.candle:before {
			content: 'candle';
		}
		:host > i.candlestick_chart:before {
			content: 'candlestick_chart';
		}
		:host > i.captive_portal:before {
			content: 'captive_portal';
		}
		:host > i.capture:before {
			content: 'capture';
		}
		:host > i.car_crash:before {
			content: 'car_crash';
		}
		:host > i.car_rental:before {
			content: 'car_rental';
		}
		:host > i.car_repair:before {
			content: 'car_repair';
		}
		:host > i.car_tag:before {
			content: 'car_tag';
		}
		:host > i.card_giftcard:before {
			content: 'card_giftcard';
		}
		:host > i.card_membership:before {
			content: 'card_membership';
		}
		:host > i.card_travel:before {
			content: 'card_travel';
		}
		:host > i.cardiology:before {
			content: 'cardiology';
		}
		:host > i.cards:before {
			content: 'cards';
		}
		:host > i.carpenter:before {
			content: 'carpenter';
		}
		:host > i.carry_on_bag:before {
			content: 'carry_on_bag';
		}
		:host > i.carry_on_bag_checked:before {
			content: 'carry_on_bag_checked';
		}
		:host > i.carry_on_bag_inactive:before {
			content: 'carry_on_bag_inactive';
		}
		:host > i.carry_on_bag_question:before {
			content: 'carry_on_bag_question';
		}
		:host > i.cases:before {
			content: 'cases';
		}
		:host > i.casino:before {
			content: 'casino';
		}
		:host > i.cast:before {
			content: 'cast';
		}
		:host > i.cast_connected:before {
			content: 'cast_connected';
		}
		:host > i.cast_for_education:before {
			content: 'cast_for_education';
		}
		:host > i.cast_pause:before {
			content: 'cast_pause';
		}
		:host > i.cast_warning:before {
			content: 'cast_warning';
		}
		:host > i.castle:before {
			content: 'castle';
		}
		:host > i.category:before {
			content: 'category';
		}
		:host > i.celebration:before {
			content: 'celebration';
		}
		:host > i.cell_merge:before {
			content: 'cell_merge';
		}
		:host > i.cell_tower:before {
			content: 'cell_tower';
		}
		:host > i.cell_wifi:before {
			content: 'cell_wifi';
		}
		:host > i.center_focus_strong:before {
			content: 'center_focus_strong';
		}
		:host > i.center_focus_weak:before {
			content: 'center_focus_weak';
		}
		:host > i.chair:before {
			content: 'chair';
		}
		:host > i.chair_alt:before {
			content: 'chair_alt';
		}
		:host > i.chalet:before {
			content: 'chalet';
		}
		:host > i.change_circle:before {
			content: 'change_circle';
		}
		:host > i.change_history:before {
			content: 'change_history';
		}
		:host > i.charger:before {
			content: 'charger';
		}
		:host > i.charging_station:before {
			content: 'charging_station';
		}
		:host > i.chart_data:before {
			content: 'chart_data';
		}
		:host > i.chat:before {
			content: 'chat';
		}
		:host > i.chat_add_on:before {
			content: 'chat_add_on';
		}
		:host > i.chat_apps_script:before {
			content: 'chat_apps_script';
		}
		:host > i.chat_bubble:before {
			content: 'chat_bubble';
		}
		:host > i.chat_bubble_outline:before {
			content: 'chat_bubble_outline';
		}
		:host > i.chat_error:before {
			content: 'chat_error';
		}
		:host > i.chat_info:before {
			content: 'chat_info';
		}
		:host > i.chat_paste_go:before {
			content: 'chat_paste_go';
		}
		:host > i.check:before {
			content: 'check';
		}
		:host > i.check_box:before {
			content: 'check_box';
		}
		:host > i.check_box_outline_blank:before {
			content: 'check_box_outline_blank';
		}
		:host > i.check_circle:before {
			content: 'check_circle';
		}
		:host > i.check_circle_filled:before {
			content: 'check_circle_filled';
		}
		:host > i.check_circle_outline:before {
			content: 'check_circle_outline';
		}
		:host > i.check_in_out:before {
			content: 'check_in_out';
		}
		:host > i.check_indeterminate_small:before {
			content: 'check_indeterminate_small';
		}
		:host > i.check_small:before {
			content: 'check_small';
		}
		:host > i.checkbook:before {
			content: 'checkbook';
		}
		:host > i.checked_bag:before {
			content: 'checked_bag';
		}
		:host > i.checked_bag_question:before {
			content: 'checked_bag_question';
		}
		:host > i.checklist:before {
			content: 'checklist';
		}
		:host > i.checklist_rtl:before {
			content: 'checklist_rtl';
		}
		:host > i.checkroom:before {
			content: 'checkroom';
		}
		:host > i.cheer:before {
			content: 'cheer';
		}
		:host > i.chess:before {
			content: 'chess';
		}
		:host > i.chevron_left:before {
			content: 'chevron_left';
		}
		:host > i.chevron_right:before {
			content: 'chevron_right';
		}
		:host > i.child_care:before {
			content: 'child_care';
		}
		:host > i.child_friendly:before {
			content: 'child_friendly';
		}
		:host > i.chip_extraction:before {
			content: 'chip_extraction';
		}
		:host > i.chips:before {
			content: 'chips';
		}
		:host > i.chrome_reader_mode:before {
			content: 'chrome_reader_mode';
		}
		:host > i.chromecast_2:before {
			content: 'chromecast_2';
		}
		:host > i.chromecast_device:before {
			content: 'chromecast_device';
		}
		:host > i.chronic:before {
			content: 'chronic';
		}
		:host > i.church:before {
			content: 'church';
		}
		:host > i.cinematic_blur:before {
			content: 'cinematic_blur';
		}
		:host > i.circle:before {
			content: 'circle';
		}
		:host > i.circle_notifications:before {
			content: 'circle_notifications';
		}
		:host > i.circles:before {
			content: 'circles';
		}
		:host > i.circles_ext:before {
			content: 'circles_ext';
		}
		:host > i.clarify:before {
			content: 'clarify';
		}
		:host > i.class:before {
			content: 'class';
		}
		:host > i.clean_hands:before {
			content: 'clean_hands';
		}
		:host > i.cleaning:before {
			content: 'cleaning';
		}
		:host > i.cleaning_bucket:before {
			content: 'cleaning_bucket';
		}
		:host > i.cleaning_services:before {
			content: 'cleaning_services';
		}
		:host > i.clear:before {
			content: 'clear';
		}
		:host > i.clear_all:before {
			content: 'clear_all';
		}
		:host > i.clear_day:before {
			content: 'clear_day';
		}
		:host > i.clear_night:before {
			content: 'clear_night';
		}
		:host > i.climate_mini_split:before {
			content: 'climate_mini_split';
		}
		:host > i.clinical_notes:before {
			content: 'clinical_notes';
		}
		:host > i.clock_loader_10:before {
			content: 'clock_loader_10';
		}
		:host > i.clock_loader_20:before {
			content: 'clock_loader_20';
		}
		:host > i.clock_loader_40:before {
			content: 'clock_loader_40';
		}
		:host > i.clock_loader_60:before {
			content: 'clock_loader_60';
		}
		:host > i.clock_loader_80:before {
			content: 'clock_loader_80';
		}
		:host > i.clock_loader_90:before {
			content: 'clock_loader_90';
		}
		:host > i.close:before {
			content: 'close';
		}
		:host > i.close_fullscreen:before {
			content: 'close_fullscreen';
		}
		:host > i.close_small:before {
			content: 'close_small';
		}
		:host > i.closed_caption:before {
			content: 'closed_caption';
		}
		:host > i.closed_caption_disabled:before {
			content: 'closed_caption_disabled';
		}
		:host > i.closed_caption_off:before {
			content: 'closed_caption_off';
		}
		:host > i.cloud:before {
			content: 'cloud';
		}
		:host > i.cloud_circle:before {
			content: 'cloud_circle';
		}
		:host > i.cloud_done:before {
			content: 'cloud_done';
		}
		:host > i.cloud_download:before {
			content: 'cloud_download';
		}
		:host > i.cloud_off:before {
			content: 'cloud_off';
		}
		:host > i.cloud_queue:before {
			content: 'cloud_queue';
		}
		:host > i.cloud_sync:before {
			content: 'cloud_sync';
		}
		:host > i.cloud_upload:before {
			content: 'cloud_upload';
		}
		:host > i.cloudy:before {
			content: 'cloudy';
		}
		:host > i.cloudy_filled:before {
			content: 'cloudy_filled';
		}
		:host > i.cloudy_snowing:before {
			content: 'cloudy_snowing';
		}
		:host > i.co2:before {
			content: 'co2';
		}
		:host > i.co_present:before {
			content: 'co_present';
		}
		:host > i.code:before {
			content: 'code';
		}
		:host > i.code_blocks:before {
			content: 'code_blocks';
		}
		:host > i.code_off:before {
			content: 'code_off';
		}
		:host > i.coffee:before {
			content: 'coffee';
		}
		:host > i.coffee_maker:before {
			content: 'coffee_maker';
		}
		:host > i.cognition:before {
			content: 'cognition';
		}
		:host > i.collapse_all:before {
			content: 'collapse_all';
		}
		:host > i.collapse_content:before {
			content: 'collapse_content';
		}
		:host > i.collections:before {
			content: 'collections';
		}
		:host > i.collections_bookmark:before {
			content: 'collections_bookmark';
		}
		:host > i.color_lens:before {
			content: 'color_lens';
		}
		:host > i.colorize:before {
			content: 'colorize';
		}
		:host > i.colors:before {
			content: 'colors';
		}
		:host > i.comic_bubble:before {
			content: 'comic_bubble';
		}
		:host > i.comment:before {
			content: 'comment';
		}
		:host > i.comment_bank:before {
			content: 'comment_bank';
		}
		:host > i.comments_disabled:before {
			content: 'comments_disabled';
		}
		:host > i.commit:before {
			content: 'commit';
		}
		:host > i.communication:before {
			content: 'communication';
		}
		:host > i.communities:before {
			content: 'communities';
		}
		:host > i.communities_filled:before {
			content: 'communities_filled';
		}
		:host > i.commute:before {
			content: 'commute';
		}
		:host > i.compare:before {
			content: 'compare';
		}
		:host > i.compare_arrows:before {
			content: 'compare_arrows';
		}
		:host > i.compass_calibration:before {
			content: 'compass_calibration';
		}
		:host > i.component_exchange:before {
			content: 'component_exchange';
		}
		:host > i.compost:before {
			content: 'compost';
		}
		:host > i.compress:before {
			content: 'compress';
		}
		:host > i.computer:before {
			content: 'computer';
		}
		:host > i.concierge:before {
			content: 'concierge';
		}
		:host > i.conditions:before {
			content: 'conditions';
		}
		:host > i.confirmation_number:before {
			content: 'confirmation_number';
		}
		:host > i.congenital:before {
			content: 'congenital';
		}
		:host > i.connect_without_contact:before {
			content: 'connect_without_contact';
		}
		:host > i.connected_tv:before {
			content: 'connected_tv';
		}
		:host > i.connecting_airports:before {
			content: 'connecting_airports';
		}
		:host > i.construction:before {
			content: 'construction';
		}
		:host > i.contact_emergency:before {
			content: 'contact_emergency';
		}
		:host > i.contact_mail:before {
			content: 'contact_mail';
		}
		:host > i.contact_page:before {
			content: 'contact_page';
		}
		:host > i.contact_phone:before {
			content: 'contact_phone';
		}
		:host > i.contact_phone_filled:before {
			content: 'contact_phone_filled';
		}
		:host > i.contact_support:before {
			content: 'contact_support';
		}
		:host > i.contactless:before {
			content: 'contactless';
		}
		:host > i.contactless_off:before {
			content: 'contactless_off';
		}
		:host > i.contacts:before {
			content: 'contacts';
		}
		:host > i.contacts_product:before {
			content: 'contacts_product';
		}
		:host > i.content_copy:before {
			content: 'content_copy';
		}
		:host > i.content_cut:before {
			content: 'content_cut';
		}
		:host > i.content_paste:before {
			content: 'content_paste';
		}
		:host > i.content_paste_go:before {
			content: 'content_paste_go';
		}
		:host > i.content_paste_off:before {
			content: 'content_paste_off';
		}
		:host > i.content_paste_search:before {
			content: 'content_paste_search';
		}
		:host > i.contract:before {
			content: 'contract';
		}
		:host > i.contract_delete:before {
			content: 'contract_delete';
		}
		:host > i.contract_edit:before {
			content: 'contract_edit';
		}
		:host > i.contrast:before {
			content: 'contrast';
		}
		:host > i.contrast_rtl_off:before {
			content: 'contrast_rtl_off';
		}
		:host > i.control_camera:before {
			content: 'control_camera';
		}
		:host > i.control_point:before {
			content: 'control_point';
		}
		:host > i.control_point_duplicate:before {
			content: 'control_point_duplicate';
		}
		:host > i.controller_gen:before {
			content: 'controller_gen';
		}
		:host > i.conversion_path:before {
			content: 'conversion_path';
		}
		:host > i.conversion_path_off:before {
			content: 'conversion_path_off';
		}
		:host > i.conveyor_belt:before {
			content: 'conveyor_belt';
		}
		:host > i.cookie:before {
			content: 'cookie';
		}
		:host > i.cookie_off:before {
			content: 'cookie_off';
		}
		:host > i.cooking:before {
			content: 'cooking';
		}
		:host > i.cool_to_dry:before {
			content: 'cool_to_dry';
		}
		:host > i.copy_all:before {
			content: 'copy_all';
		}
		:host > i.copyright:before {
			content: 'copyright';
		}
		:host > i.coronavirus:before {
			content: 'coronavirus';
		}
		:host > i.corporate_fare:before {
			content: 'corporate_fare';
		}
		:host > i.cottage:before {
			content: 'cottage';
		}
		:host > i.counter_0:before {
			content: 'counter_0';
		}
		:host > i.counter_1:before {
			content: 'counter_1';
		}
		:host > i.counter_2:before {
			content: 'counter_2';
		}
		:host > i.counter_3:before {
			content: 'counter_3';
		}
		:host > i.counter_4:before {
			content: 'counter_4';
		}
		:host > i.counter_5:before {
			content: 'counter_5';
		}
		:host > i.counter_6:before {
			content: 'counter_6';
		}
		:host > i.counter_7:before {
			content: 'counter_7';
		}
		:host > i.counter_8:before {
			content: 'counter_8';
		}
		:host > i.counter_9:before {
			content: 'counter_9';
		}
		:host > i.countertops:before {
			content: 'countertops';
		}
		:host > i.create:before {
			content: 'create';
		}
		:host > i.create_new_folder:before {
			content: 'create_new_folder';
		}
		:host > i.credit_card:before {
			content: 'credit_card';
		}
		:host > i.credit_card_gear:before {
			content: 'credit_card_gear';
		}
		:host > i.credit_card_heart:before {
			content: 'credit_card_heart';
		}
		:host > i.credit_card_off:before {
			content: 'credit_card_off';
		}
		:host > i.credit_score:before {
			content: 'credit_score';
		}
		:host > i.crib:before {
			content: 'crib';
		}
		:host > i.crisis_alert:before {
			content: 'crisis_alert';
		}
		:host > i.crop:before {
			content: 'crop';
		}
		:host > i.crop_16_9:before {
			content: 'crop_16_9';
		}
		:host > i.crop_3_2:before {
			content: 'crop_3_2';
		}
		:host > i.crop_5_4:before {
			content: 'crop_5_4';
		}
		:host > i.crop_7_5:before {
			content: 'crop_7_5';
		}
		:host > i.crop_9_16:before {
			content: 'crop_9_16';
		}
		:host > i.crop_din:before {
			content: 'crop_din';
		}
		:host > i.crop_free:before {
			content: 'crop_free';
		}
		:host > i.crop_landscape:before {
			content: 'crop_landscape';
		}
		:host > i.crop_original:before {
			content: 'crop_original';
		}
		:host > i.crop_portrait:before {
			content: 'crop_portrait';
		}
		:host > i.crop_rotate:before {
			content: 'crop_rotate';
		}
		:host > i.crop_square:before {
			content: 'crop_square';
		}
		:host > i.crossword:before {
			content: 'crossword';
		}
		:host > i.crowdsource:before {
			content: 'crowdsource';
		}
		:host > i.cruelty_free:before {
			content: 'cruelty_free';
		}
		:host > i.css:before {
			content: 'css';
		}
		:host > i.csv:before {
			content: 'csv';
		}
		:host > i.currency_bitcoin:before {
			content: 'currency_bitcoin';
		}
		:host > i.currency_exchange:before {
			content: 'currency_exchange';
		}
		:host > i.currency_franc:before {
			content: 'currency_franc';
		}
		:host > i.currency_lira:before {
			content: 'currency_lira';
		}
		:host > i.currency_pound:before {
			content: 'currency_pound';
		}
		:host > i.currency_ruble:before {
			content: 'currency_ruble';
		}
		:host > i.currency_rupee:before {
			content: 'currency_rupee';
		}
		:host > i.currency_yen:before {
			content: 'currency_yen';
		}
		:host > i.currency_yuan:before {
			content: 'currency_yuan';
		}
		:host > i.curtains:before {
			content: 'curtains';
		}
		:host > i.curtains_closed:before {
			content: 'curtains_closed';
		}
		:host > i.custom_typography:before {
			content: 'custom_typography';
		}
		:host > i.cut:before {
			content: 'cut';
		}
		:host > i.cycle:before {
			content: 'cycle';
		}
		:host > i.cyclone:before {
			content: 'cyclone';
		}
		:host > i.dangerous:before {
			content: 'dangerous';
		}
		:host > i.dark_mode:before {
			content: 'dark_mode';
		}
		:host > i.dashboard:before {
			content: 'dashboard';
		}
		:host > i.dashboard_customize:before {
			content: 'dashboard_customize';
		}
		:host > i.data_alert:before {
			content: 'data_alert';
		}
		:host > i.data_array:before {
			content: 'data_array';
		}
		:host > i.data_check:before {
			content: 'data_check';
		}
		:host > i.data_exploration:before {
			content: 'data_exploration';
		}
		:host > i.data_info_alert:before {
			content: 'data_info_alert';
		}
		:host > i.data_loss_prevention:before {
			content: 'data_loss_prevention';
		}
		:host > i.data_object:before {
			content: 'data_object';
		}
		:host > i.data_saver_off:before {
			content: 'data_saver_off';
		}
		:host > i.data_saver_on:before {
			content: 'data_saver_on';
		}
		:host > i.data_table:before {
			content: 'data_table';
		}
		:host > i.data_thresholding:before {
			content: 'data_thresholding';
		}
		:host > i.data_usage:before {
			content: 'data_usage';
		}
		:host > i.database:before {
			content: 'database';
		}
		:host > i.dataset:before {
			content: 'dataset';
		}
		:host > i.dataset_linked:before {
			content: 'dataset_linked';
		}
		:host > i.date_range:before {
			content: 'date_range';
		}
		:host > i.deblur:before {
			content: 'deblur';
		}
		:host > i.deceased:before {
			content: 'deceased';
		}
		:host > i.decimal_decrease:before {
			content: 'decimal_decrease';
		}
		:host > i.decimal_increase:before {
			content: 'decimal_increase';
		}
		:host > i.deck:before {
			content: 'deck';
		}
		:host > i.dehaze:before {
			content: 'dehaze';
		}
		:host > i.delete:before {
			content: 'delete';
		}
		:host > i.delete_forever:before {
			content: 'delete_forever';
		}
		:host > i.delete_history:before {
			content: 'delete_history';
		}
		:host > i.delete_outline:before {
			content: 'delete_outline';
		}
		:host > i.delete_sweep:before {
			content: 'delete_sweep';
		}
		:host > i.demography:before {
			content: 'demography';
		}
		:host > i.density_large:before {
			content: 'density_large';
		}
		:host > i.density_medium:before {
			content: 'density_medium';
		}
		:host > i.density_small:before {
			content: 'density_small';
		}
		:host > i.dentistry:before {
			content: 'dentistry';
		}
		:host > i.departure_board:before {
			content: 'departure_board';
		}
		:host > i.deployed_code:before {
			content: 'deployed_code';
		}
		:host > i.deployed_code_account:before {
			content: 'deployed_code_account';
		}
		:host > i.deployed_code_alert:before {
			content: 'deployed_code_alert';
		}
		:host > i.deployed_code_history:before {
			content: 'deployed_code_history';
		}
		:host > i.deployed_code_update:before {
			content: 'deployed_code_update';
		}
		:host > i.dermatology:before {
			content: 'dermatology';
		}
		:host > i.description:before {
			content: 'description';
		}
		:host > i.deselect:before {
			content: 'deselect';
		}
		:host > i.design_services:before {
			content: 'design_services';
		}
		:host > i.desk:before {
			content: 'desk';
		}
		:host > i.deskphone:before {
			content: 'deskphone';
		}
		:host > i.desktop_access_disabled:before {
			content: 'desktop_access_disabled';
		}
		:host > i.desktop_mac:before {
			content: 'desktop_mac';
		}
		:host > i.desktop_windows:before {
			content: 'desktop_windows';
		}
		:host > i.destruction:before {
			content: 'destruction';
		}
		:host > i.details:before {
			content: 'details';
		}
		:host > i.detection_and_zone:before {
			content: 'detection_and_zone';
		}
		:host > i.detector:before {
			content: 'detector';
		}
		:host > i.detector_alarm:before {
			content: 'detector_alarm';
		}
		:host > i.detector_battery:before {
			content: 'detector_battery';
		}
		:host > i.detector_co:before {
			content: 'detector_co';
		}
		:host > i.detector_offline:before {
			content: 'detector_offline';
		}
		:host > i.detector_smoke:before {
			content: 'detector_smoke';
		}
		:host > i.detector_status:before {
			content: 'detector_status';
		}
		:host > i.developer_board:before {
			content: 'developer_board';
		}
		:host > i.developer_board_off:before {
			content: 'developer_board_off';
		}
		:host > i.developer_guide:before {
			content: 'developer_guide';
		}
		:host > i.developer_mode:before {
			content: 'developer_mode';
		}
		:host > i.developer_mode_tv:before {
			content: 'developer_mode_tv';
		}
		:host > i.device_hub:before {
			content: 'device_hub';
		}
		:host > i.device_reset:before {
			content: 'device_reset';
		}
		:host > i.device_thermostat:before {
			content: 'device_thermostat';
		}
		:host > i.device_unknown:before {
			content: 'device_unknown';
		}
		:host > i.devices:before {
			content: 'devices';
		}
		:host > i.devices_fold:before {
			content: 'devices_fold';
		}
		:host > i.devices_off:before {
			content: 'devices_off';
		}
		:host > i.devices_other:before {
			content: 'devices_other';
		}
		:host > i.devices_wearables:before {
			content: 'devices_wearables';
		}
		:host > i.dew_point:before {
			content: 'dew_point';
		}
		:host > i.diagnosis:before {
			content: 'diagnosis';
		}
		:host > i.dialer_sip:before {
			content: 'dialer_sip';
		}
		:host > i.dialogs:before {
			content: 'dialogs';
		}
		:host > i.dialpad:before {
			content: 'dialpad';
		}
		:host > i.diamond:before {
			content: 'diamond';
		}
		:host > i.dictionary:before {
			content: 'dictionary';
		}
		:host > i.difference:before {
			content: 'difference';
		}
		:host > i.digital_out_of_home:before {
			content: 'digital_out_of_home';
		}
		:host > i.digital_wellbeing:before {
			content: 'digital_wellbeing';
		}
		:host > i.dining:before {
			content: 'dining';
		}
		:host > i.dinner_dining:before {
			content: 'dinner_dining';
		}
		:host > i.directions:before {
			content: 'directions';
		}
		:host > i.directions_alt:before {
			content: 'directions_alt';
		}
		:host > i.directions_alt_off:before {
			content: 'directions_alt_off';
		}
		:host > i.directions_bike:before {
			content: 'directions_bike';
		}
		:host > i.directions_boat:before {
			content: 'directions_boat';
		}
		:host > i.directions_boat_filled:before {
			content: 'directions_boat_filled';
		}
		:host > i.directions_bus:before {
			content: 'directions_bus';
		}
		:host > i.directions_bus_filled:before {
			content: 'directions_bus_filled';
		}
		:host > i.directions_car:before {
			content: 'directions_car';
		}
		:host > i.directions_car_filled:before {
			content: 'directions_car_filled';
		}
		:host > i.directions_off:before {
			content: 'directions_off';
		}
		:host > i.directions_railway:before {
			content: 'directions_railway';
		}
		:host > i.directions_railway_filled:before {
			content: 'directions_railway_filled';
		}
		:host > i.directions_run:before {
			content: 'directions_run';
		}
		:host > i.directions_subway:before {
			content: 'directions_subway';
		}
		:host > i.directions_subway_filled:before {
			content: 'directions_subway_filled';
		}
		:host > i.directions_transit:before {
			content: 'directions_transit';
		}
		:host > i.directions_transit_filled:before {
			content: 'directions_transit_filled';
		}
		:host > i.directions_walk:before {
			content: 'directions_walk';
		}
		:host > i.directory_sync:before {
			content: 'directory_sync';
		}
		:host > i.dirty_lens:before {
			content: 'dirty_lens';
		}
		:host > i.disabled_by_default:before {
			content: 'disabled_by_default';
		}
		:host > i.disabled_visible:before {
			content: 'disabled_visible';
		}
		:host > i.disc_full:before {
			content: 'disc_full';
		}
		:host > i.discover_tune:before {
			content: 'discover_tune';
		}
		:host > i.dishwasher:before {
			content: 'dishwasher';
		}
		:host > i.dishwasher_gen:before {
			content: 'dishwasher_gen';
		}
		:host > i.display_external_input:before {
			content: 'display_external_input';
		}
		:host > i.display_settings:before {
			content: 'display_settings';
		}
		:host > i.distance:before {
			content: 'distance';
		}
		:host > i.diversity_1:before {
			content: 'diversity_1';
		}
		:host > i.diversity_2:before {
			content: 'diversity_2';
		}
		:host > i.diversity_3:before {
			content: 'diversity_3';
		}
		:host > i.diversity_4:before {
			content: 'diversity_4';
		}
		:host > i.dns:before {
			content: 'dns';
		}
		:host > i.do_disturb:before {
			content: 'do_disturb';
		}
		:host > i.do_disturb_alt:before {
			content: 'do_disturb_alt';
		}
		:host > i.do_disturb_off:before {
			content: 'do_disturb_off';
		}
		:host > i.do_disturb_on:before {
			content: 'do_disturb_on';
		}
		:host > i.do_not_disturb:before {
			content: 'do_not_disturb';
		}
		:host > i.do_not_disturb_alt:before {
			content: 'do_not_disturb_alt';
		}
		:host > i.do_not_disturb_off:before {
			content: 'do_not_disturb_off';
		}
		:host > i.do_not_disturb_on:before {
			content: 'do_not_disturb_on';
		}
		:host > i.do_not_disturb_on_total_silence:before {
			content: 'do_not_disturb_on_total_silence';
		}
		:host > i.do_not_step:before {
			content: 'do_not_step';
		}
		:host > i.do_not_touch:before {
			content: 'do_not_touch';
		}
		:host > i.dock:before {
			content: 'dock';
		}
		:host > i.dock_to_bottom:before {
			content: 'dock_to_bottom';
		}
		:host > i.dock_to_left:before {
			content: 'dock_to_left';
		}
		:host > i.dock_to_right:before {
			content: 'dock_to_right';
		}
		:host > i.docs_add_on:before {
			content: 'docs_add_on';
		}
		:host > i.docs_apps_script:before {
			content: 'docs_apps_script';
		}
		:host > i.document_scanner:before {
			content: 'document_scanner';
		}
		:host > i.domain:before {
			content: 'domain';
		}
		:host > i.domain_add:before {
			content: 'domain_add';
		}
		:host > i.domain_disabled:before {
			content: 'domain_disabled';
		}
		:host > i.domain_verification:before {
			content: 'domain_verification';
		}
		:host > i.domain_verification_off:before {
			content: 'domain_verification_off';
		}
		:host > i.domino_mask:before {
			content: 'domino_mask';
		}
		:host > i.done:before {
			content: 'done';
		}
		:host > i.done_all:before {
			content: 'done_all';
		}
		:host > i.done_outline:before {
			content: 'done_outline';
		}
		:host > i.donut_large:before {
			content: 'donut_large';
		}
		:host > i.donut_small:before {
			content: 'donut_small';
		}
		:host > i.door_back:before {
			content: 'door_back';
		}
		:host > i.door_front:before {
			content: 'door_front';
		}
		:host > i.door_open:before {
			content: 'door_open';
		}
		:host > i.door_sensor:before {
			content: 'door_sensor';
		}
		:host > i.door_sliding:before {
			content: 'door_sliding';
		}
		:host > i.doorbell:before {
			content: 'doorbell';
		}
		:host > i.doorbell_3p:before {
			content: 'doorbell_3p';
		}
		:host > i.doorbell_chime:before {
			content: 'doorbell_chime';
		}
		:host > i.double_arrow:before {
			content: 'double_arrow';
		}
		:host > i.downhill_skiing:before {
			content: 'downhill_skiing';
		}
		:host > i.download:before {
			content: 'download';
		}
		:host > i.download_2:before {
			content: 'download_2';
		}
		:host > i.download_done:before {
			content: 'download_done';
		}
		:host > i.download_for_offline:before {
			content: 'download_for_offline';
		}
		:host > i.downloading:before {
			content: 'downloading';
		}
		:host > i.draft:before {
			content: 'draft';
		}
		:host > i.draft_orders:before {
			content: 'draft_orders';
		}
		:host > i.drafts:before {
			content: 'drafts';
		}
		:host > i.drag_click:before {
			content: 'drag_click';
		}
		:host > i.drag_handle:before {
			content: 'drag_handle';
		}
		:host > i.drag_indicator:before {
			content: 'drag_indicator';
		}
		:host > i.drag_pan:before {
			content: 'drag_pan';
		}
		:host > i.draw:before {
			content: 'draw';
		}
		:host > i.draw_abstract:before {
			content: 'draw_abstract';
		}
		:host > i.draw_collage:before {
			content: 'draw_collage';
		}
		:host > i.drawing_recognition:before {
			content: 'drawing_recognition';
		}
		:host > i.dresser:before {
			content: 'dresser';
		}
		:host > i.drive_eta:before {
			content: 'drive_eta';
		}
		:host > i.drive_file_move:before {
			content: 'drive_file_move';
		}
		:host > i.drive_file_move_outline:before {
			content: 'drive_file_move_outline';
		}
		:host > i.drive_file_move_rtl:before {
			content: 'drive_file_move_rtl';
		}
		:host > i.drive_file_rename_outline:before {
			content: 'drive_file_rename_outline';
		}
		:host > i.drive_folder_upload:before {
			content: 'drive_folder_upload';
		}
		:host > i.drive_fusiontable:before {
			content: 'drive_fusiontable';
		}
		:host > i.dropdown:before {
			content: 'dropdown';
		}
		:host > i.dry:before {
			content: 'dry';
		}
		:host > i.dry_cleaning:before {
			content: 'dry_cleaning';
		}
		:host > i.dual_screen:before {
			content: 'dual_screen';
		}
		:host > i.duo:before {
			content: 'duo';
		}
		:host > i.dvr:before {
			content: 'dvr';
		}
		:host > i.dynamic_feed:before {
			content: 'dynamic_feed';
		}
		:host > i.dynamic_form:before {
			content: 'dynamic_form';
		}
		:host > i.e911_avatar:before {
			content: 'e911_avatar';
		}
		:host > i.e911_emergency:before {
			content: 'e911_emergency';
		}
		:host > i.e_mobiledata:before {
			content: 'e_mobiledata';
		}
		:host > i.e_mobiledata_badge:before {
			content: 'e_mobiledata_badge';
		}
		:host > i.earbuds:before {
			content: 'earbuds';
		}
		:host > i.earbuds_battery:before {
			content: 'earbuds_battery';
		}
		:host > i.early_on:before {
			content: 'early_on';
		}
		:host > i.earthquake:before {
			content: 'earthquake';
		}
		:host > i.east:before {
			content: 'east';
		}
		:host > i.ecg:before {
			content: 'ecg';
		}
		:host > i.ecg_heart:before {
			content: 'ecg_heart';
		}
		:host > i.eco:before {
			content: 'eco';
		}
		:host > i.eda:before {
			content: 'eda';
		}
		:host > i.edgesensor_high:before {
			content: 'edgesensor_high';
		}
		:host > i.edgesensor_low:before {
			content: 'edgesensor_low';
		}
		:host > i.edit:before {
			content: 'edit';
		}
		:host > i.edit_attributes:before {
			content: 'edit_attributes';
		}
		:host > i.edit_calendar:before {
			content: 'edit_calendar';
		}
		:host > i.edit_document:before {
			content: 'edit_document';
		}
		:host > i.edit_location:before {
			content: 'edit_location';
		}
		:host > i.edit_location_alt:before {
			content: 'edit_location_alt';
		}
		:host > i.edit_note:before {
			content: 'edit_note';
		}
		:host > i.edit_notifications:before {
			content: 'edit_notifications';
		}
		:host > i.edit_off:before {
			content: 'edit_off';
		}
		:host > i.edit_road:before {
			content: 'edit_road';
		}
		:host > i.edit_square:before {
			content: 'edit_square';
		}
		:host > i.editor_choice:before {
			content: 'editor_choice';
		}
		:host > i.egg:before {
			content: 'egg';
		}
		:host > i.egg_alt:before {
			content: 'egg_alt';
		}
		:host > i.eject:before {
			content: 'eject';
		}
		:host > i.elderly:before {
			content: 'elderly';
		}
		:host > i.elderly_woman:before {
			content: 'elderly_woman';
		}
		:host > i.electric_bike:before {
			content: 'electric_bike';
		}
		:host > i.electric_bolt:before {
			content: 'electric_bolt';
		}
		:host > i.electric_car:before {
			content: 'electric_car';
		}
		:host > i.electric_meter:before {
			content: 'electric_meter';
		}
		:host > i.electric_moped:before {
			content: 'electric_moped';
		}
		:host > i.electric_rickshaw:before {
			content: 'electric_rickshaw';
		}
		:host > i.electric_scooter:before {
			content: 'electric_scooter';
		}
		:host > i.electrical_services:before {
			content: 'electrical_services';
		}
		:host > i.elevation:before {
			content: 'elevation';
		}
		:host > i.elevator:before {
			content: 'elevator';
		}
		:host > i.email:before {
			content: 'email';
		}
		:host > i.emergency:before {
			content: 'emergency';
		}
		:host > i.emergency_heat:before {
			content: 'emergency_heat';
		}
		:host > i.emergency_heat_2:before {
			content: 'emergency_heat_2';
		}
		:host > i.emergency_home:before {
			content: 'emergency_home';
		}
		:host > i.emergency_recording:before {
			content: 'emergency_recording';
		}
		:host > i.emergency_share:before {
			content: 'emergency_share';
		}
		:host > i.emergency_share_off:before {
			content: 'emergency_share_off';
		}
		:host > i.emoji_emotions:before {
			content: 'emoji_emotions';
		}
		:host > i.emoji_events:before {
			content: 'emoji_events';
		}
		:host > i.emoji_flags:before {
			content: 'emoji_flags';
		}
		:host > i.emoji_food_beverage:before {
			content: 'emoji_food_beverage';
		}
		:host > i.emoji_nature:before {
			content: 'emoji_nature';
		}
		:host > i.emoji_objects:before {
			content: 'emoji_objects';
		}
		:host > i.emoji_people:before {
			content: 'emoji_people';
		}
		:host > i.emoji_symbols:before {
			content: 'emoji_symbols';
		}
		:host > i.emoji_transportation:before {
			content: 'emoji_transportation';
		}
		:host > i.emoticon:before {
			content: 'emoticon';
		}
		:host > i.empty_dashboard:before {
			content: 'empty_dashboard';
		}
		:host > i.enable:before {
			content: 'enable';
		}
		:host > i.encrypted:before {
			content: 'encrypted';
		}
		:host > i.endocrinology:before {
			content: 'endocrinology';
		}
		:host > i.energy:before {
			content: 'energy';
		}
		:host > i.energy_program_saving:before {
			content: 'energy_program_saving';
		}
		:host > i.energy_program_time_used:before {
			content: 'energy_program_time_used';
		}
		:host > i.energy_savings_leaf:before {
			content: 'energy_savings_leaf';
		}
		:host > i.engineering:before {
			content: 'engineering';
		}
		:host > i.enhanced_encryption:before {
			content: 'enhanced_encryption';
		}
		:host > i.ent:before {
			content: 'ent';
		}
		:host > i.enterprise:before {
			content: 'enterprise';
		}
		:host > i.enterprise_off:before {
			content: 'enterprise_off';
		}
		:host > i.equal:before {
			content: 'equal';
		}
		:host > i.equalizer:before {
			content: 'equalizer';
		}
		:host > i.error:before {
			content: 'error';
		}
		:host > i.error_circle_rounded:before {
			content: 'error_circle_rounded';
		}
		:host > i.error_med:before {
			content: 'error_med';
		}
		:host > i.error_outline:before {
			content: 'error_outline';
		}
		:host > i.escalator:before {
			content: 'escalator';
		}
		:host > i.escalator_warning:before {
			content: 'escalator_warning';
		}
		:host > i.euro:before {
			content: 'euro';
		}
		:host > i.euro_symbol:before {
			content: 'euro_symbol';
		}
		:host > i.ev_charger:before {
			content: 'ev_charger';
		}
		:host > i.ev_mobiledata_badge:before {
			content: 'ev_mobiledata_badge';
		}
		:host > i.ev_shadow:before {
			content: 'ev_shadow';
		}
		:host > i.ev_shadow_add:before {
			content: 'ev_shadow_add';
		}
		:host > i.ev_shadow_minus:before {
			content: 'ev_shadow_minus';
		}
		:host > i.ev_station:before {
			content: 'ev_station';
		}
		:host > i.event:before {
			content: 'event';
		}
		:host > i.event_available:before {
			content: 'event_available';
		}
		:host > i.event_busy:before {
			content: 'event_busy';
		}
		:host > i.event_list:before {
			content: 'event_list';
		}
		:host > i.event_note:before {
			content: 'event_note';
		}
		:host > i.event_repeat:before {
			content: 'event_repeat';
		}
		:host > i.event_seat:before {
			content: 'event_seat';
		}
		:host > i.event_upcoming:before {
			content: 'event_upcoming';
		}
		:host > i.exclamation:before {
			content: 'exclamation';
		}
		:host > i.exercise:before {
			content: 'exercise';
		}
		:host > i.exit_to_app:before {
			content: 'exit_to_app';
		}
		:host > i.expand:before {
			content: 'expand';
		}
		:host > i.expand_all:before {
			content: 'expand_all';
		}
		:host > i.expand_circle_down:before {
			content: 'expand_circle_down';
		}
		:host > i.expand_circle_right:before {
			content: 'expand_circle_right';
		}
		:host > i.expand_circle_up:before {
			content: 'expand_circle_up';
		}
		:host > i.expand_content:before {
			content: 'expand_content';
		}
		:host > i.expand_less:before {
			content: 'expand_less';
		}
		:host > i.expand_more:before {
			content: 'expand_more';
		}
		:host > i.experiment:before {
			content: 'experiment';
		}
		:host > i.explicit:before {
			content: 'explicit';
		}
		:host > i.explore:before {
			content: 'explore';
		}
		:host > i.explore_nearby:before {
			content: 'explore_nearby';
		}
		:host > i.explore_off:before {
			content: 'explore_off';
		}
		:host > i.explosion:before {
			content: 'explosion';
		}
		:host > i.export_notes:before {
			content: 'export_notes';
		}
		:host > i.exposure:before {
			content: 'exposure';
		}
		:host > i.exposure_neg_1:before {
			content: 'exposure_neg_1';
		}
		:host > i.exposure_neg_2:before {
			content: 'exposure_neg_2';
		}
		:host > i.exposure_plus_1:before {
			content: 'exposure_plus_1';
		}
		:host > i.exposure_plus_2:before {
			content: 'exposure_plus_2';
		}
		:host > i.exposure_zero:before {
			content: 'exposure_zero';
		}
		:host > i.extension:before {
			content: 'extension';
		}
		:host > i.extension_off:before {
			content: 'extension_off';
		}
		:host > i.eyeglasses:before {
			content: 'eyeglasses';
		}
		:host > i.face:before {
			content: 'face';
		}
		:host > i.face_2:before {
			content: 'face_2';
		}
		:host > i.face_3:before {
			content: 'face_3';
		}
		:host > i.face_4:before {
			content: 'face_4';
		}
		:host > i.face_5:before {
			content: 'face_5';
		}
		:host > i.face_6:before {
			content: 'face_6';
		}
		:host > i.face_retouching_natural:before {
			content: 'face_retouching_natural';
		}
		:host > i.face_retouching_off:before {
			content: 'face_retouching_off';
		}
		:host > i.face_unlock:before {
			content: 'face_unlock';
		}
		:host > i.fact_check:before {
			content: 'fact_check';
		}
		:host > i.factory:before {
			content: 'factory';
		}
		:host > i.falling:before {
			content: 'falling';
		}
		:host > i.familiar_face_and_zone:before {
			content: 'familiar_face_and_zone';
		}
		:host > i.family_history:before {
			content: 'family_history';
		}
		:host > i.family_home:before {
			content: 'family_home';
		}
		:host > i.family_link:before {
			content: 'family_link';
		}
		:host > i.family_restroom:before {
			content: 'family_restroom';
		}
		:host > i.family_star:before {
			content: 'family_star';
		}
		:host > i.farsight_digital:before {
			content: 'farsight_digital';
		}
		:host > i.fast_forward:before {
			content: 'fast_forward';
		}
		:host > i.fast_rewind:before {
			content: 'fast_rewind';
		}
		:host > i.fastfood:before {
			content: 'fastfood';
		}
		:host > i.faucet:before {
			content: 'faucet';
		}
		:host > i.favorite:before {
			content: 'favorite';
		}
		:host > i.favorite_border:before {
			content: 'favorite_border';
		}
		:host > i.fax:before {
			content: 'fax';
		}
		:host > i.feature_search:before {
			content: 'feature_search';
		}
		:host > i.featured_play_list:before {
			content: 'featured_play_list';
		}
		:host > i.featured_seasonal_and_gifts:before {
			content: 'featured_seasonal_and_gifts';
		}
		:host > i.featured_video:before {
			content: 'featured_video';
		}
		:host > i.feed:before {
			content: 'feed';
		}
		:host > i.feedback:before {
			content: 'feedback';
		}
		:host > i.female:before {
			content: 'female';
		}
		:host > i.femur:before {
			content: 'femur';
		}
		:host > i.femur_alt:before {
			content: 'femur_alt';
		}
		:host > i.fence:before {
			content: 'fence';
		}
		:host > i.fertile:before {
			content: 'fertile';
		}
		:host > i.festival:before {
			content: 'festival';
		}
		:host > i.fiber_dvr:before {
			content: 'fiber_dvr';
		}
		:host > i.fiber_manual_record:before {
			content: 'fiber_manual_record';
		}
		:host > i.fiber_new:before {
			content: 'fiber_new';
		}
		:host > i.fiber_pin:before {
			content: 'fiber_pin';
		}
		:host > i.fiber_smart_record:before {
			content: 'fiber_smart_record';
		}
		:host > i.file_copy:before {
			content: 'file_copy';
		}
		:host > i.file_download:before {
			content: 'file_download';
		}
		:host > i.file_download_done:before {
			content: 'file_download_done';
		}
		:host > i.file_download_off:before {
			content: 'file_download_off';
		}
		:host > i.file_map:before {
			content: 'file_map';
		}
		:host > i.file_open:before {
			content: 'file_open';
		}
		:host > i.file_present:before {
			content: 'file_present';
		}
		:host > i.file_save:before {
			content: 'file_save';
		}
		:host > i.file_save_off:before {
			content: 'file_save_off';
		}
		:host > i.file_upload:before {
			content: 'file_upload';
		}
		:host > i.file_upload_off:before {
			content: 'file_upload_off';
		}
		:host > i.filter:before {
			content: 'filter';
		}
		:host > i.filter_1:before {
			content: 'filter_1';
		}
		:host > i.filter_2:before {
			content: 'filter_2';
		}
		:host > i.filter_3:before {
			content: 'filter_3';
		}
		:host > i.filter_4:before {
			content: 'filter_4';
		}
		:host > i.filter_5:before {
			content: 'filter_5';
		}
		:host > i.filter_6:before {
			content: 'filter_6';
		}
		:host > i.filter_7:before {
			content: 'filter_7';
		}
		:host > i.filter_8:before {
			content: 'filter_8';
		}
		:host > i.filter_9:before {
			content: 'filter_9';
		}
		:host > i.filter_9_plus:before {
			content: 'filter_9_plus';
		}
		:host > i.filter_alt:before {
			content: 'filter_alt';
		}
		:host > i.filter_alt_off:before {
			content: 'filter_alt_off';
		}
		:host > i.filter_b_and_w:before {
			content: 'filter_b_and_w';
		}
		:host > i.filter_center_focus:before {
			content: 'filter_center_focus';
		}
		:host > i.filter_drama:before {
			content: 'filter_drama';
		}
		:host > i.filter_frames:before {
			content: 'filter_frames';
		}
		:host > i.filter_hdr:before {
			content: 'filter_hdr';
		}
		:host > i.filter_list:before {
			content: 'filter_list';
		}
		:host > i.filter_list_alt:before {
			content: 'filter_list_alt';
		}
		:host > i.filter_list_off:before {
			content: 'filter_list_off';
		}
		:host > i.filter_none:before {
			content: 'filter_none';
		}
		:host > i.filter_retrolux:before {
			content: 'filter_retrolux';
		}
		:host > i.filter_tilt_shift:before {
			content: 'filter_tilt_shift';
		}
		:host > i.filter_vintage:before {
			content: 'filter_vintage';
		}
		:host > i.finance:before {
			content: 'finance';
		}
		:host > i.finance_chip:before {
			content: 'finance_chip';
		}
		:host > i.finance_mode:before {
			content: 'finance_mode';
		}
		:host > i.find_in_page:before {
			content: 'find_in_page';
		}
		:host > i.find_replace:before {
			content: 'find_replace';
		}
		:host > i.fingerprint:before {
			content: 'fingerprint';
		}
		:host > i.fire_extinguisher:before {
			content: 'fire_extinguisher';
		}
		:host > i.fire_hydrant:before {
			content: 'fire_hydrant';
		}
		:host > i.fire_truck:before {
			content: 'fire_truck';
		}
		:host > i.fireplace:before {
			content: 'fireplace';
		}
		:host > i.first_page:before {
			content: 'first_page';
		}
		:host > i.fit_page:before {
			content: 'fit_page';
		}
		:host > i.fit_screen:before {
			content: 'fit_screen';
		}
		:host > i.fit_width:before {
			content: 'fit_width';
		}
		:host > i.fitness_center:before {
			content: 'fitness_center';
		}
		:host > i.flag:before {
			content: 'flag';
		}
		:host > i.flag_circle:before {
			content: 'flag_circle';
		}
		:host > i.flag_filled:before {
			content: 'flag_filled';
		}
		:host > i.flaky:before {
			content: 'flaky';
		}
		:host > i.flare:before {
			content: 'flare';
		}
		:host > i.flash_auto:before {
			content: 'flash_auto';
		}
		:host > i.flash_off:before {
			content: 'flash_off';
		}
		:host > i.flash_on:before {
			content: 'flash_on';
		}
		:host > i.flashlight_off:before {
			content: 'flashlight_off';
		}
		:host > i.flashlight_on:before {
			content: 'flashlight_on';
		}
		:host > i.flatware:before {
			content: 'flatware';
		}
		:host > i.flex_direction:before {
			content: 'flex_direction';
		}
		:host > i.flex_no_wrap:before {
			content: 'flex_no_wrap';
		}
		:host > i.flex_wrap:before {
			content: 'flex_wrap';
		}
		:host > i.flight:before {
			content: 'flight';
		}
		:host > i.flight_class:before {
			content: 'flight_class';
		}
		:host > i.flight_land:before {
			content: 'flight_land';
		}
		:host > i.flight_takeoff:before {
			content: 'flight_takeoff';
		}
		:host > i.flights_and_hotels:before {
			content: 'flights_and_hotels';
		}
		:host > i.flightsmode:before {
			content: 'flightsmode';
		}
		:host > i.flip:before {
			content: 'flip';
		}
		:host > i.flip_camera_android:before {
			content: 'flip_camera_android';
		}
		:host > i.flip_camera_ios:before {
			content: 'flip_camera_ios';
		}
		:host > i.flip_to_back:before {
			content: 'flip_to_back';
		}
		:host > i.flip_to_front:before {
			content: 'flip_to_front';
		}
		:host > i.flood:before {
			content: 'flood';
		}
		:host > i.floor:before {
			content: 'floor';
		}
		:host > i.floor_lamp:before {
			content: 'floor_lamp';
		}
		:host > i.flourescent:before {
			content: 'flourescent';
		}
		:host > i.flowsheet:before {
			content: 'flowsheet';
		}
		:host > i.fluid:before {
			content: 'fluid';
		}
		:host > i.fluid_balance:before {
			content: 'fluid_balance';
		}
		:host > i.fluid_med:before {
			content: 'fluid_med';
		}
		:host > i.fluorescent:before {
			content: 'fluorescent';
		}
		:host > i.flutter:before {
			content: 'flutter';
		}
		:host > i.flutter_dash:before {
			content: 'flutter_dash';
		}
		:host > i.fmd_bad:before {
			content: 'fmd_bad';
		}
		:host > i.fmd_good:before {
			content: 'fmd_good';
		}
		:host > i.foggy:before {
			content: 'foggy';
		}
		:host > i.folded_hands:before {
			content: 'folded_hands';
		}
		:host > i.folder:before {
			content: 'folder';
		}
		:host > i.folder_copy:before {
			content: 'folder_copy';
		}
		:host > i.folder_data:before {
			content: 'folder_data';
		}
		:host > i.folder_delete:before {
			content: 'folder_delete';
		}
		:host > i.folder_limited:before {
			content: 'folder_limited';
		}
		:host > i.folder_managed:before {
			content: 'folder_managed';
		}
		:host > i.folder_off:before {
			content: 'folder_off';
		}
		:host > i.folder_open:before {
			content: 'folder_open';
		}
		:host > i.folder_shared:before {
			content: 'folder_shared';
		}
		:host > i.folder_special:before {
			content: 'folder_special';
		}
		:host > i.folder_supervised:before {
			content: 'folder_supervised';
		}
		:host > i.folder_zip:before {
			content: 'folder_zip';
		}
		:host > i.follow_the_signs:before {
			content: 'follow_the_signs';
		}
		:host > i.font_download:before {
			content: 'font_download';
		}
		:host > i.font_download_off:before {
			content: 'font_download_off';
		}
		:host > i.food_bank:before {
			content: 'food_bank';
		}
		:host > i.foot_bones:before {
			content: 'foot_bones';
		}
		:host > i.footprint:before {
			content: 'footprint';
		}
		:host > i.for_you:before {
			content: 'for_you';
		}
		:host > i.forest:before {
			content: 'forest';
		}
		:host > i.fork_left:before {
			content: 'fork_left';
		}
		:host > i.fork_right:before {
			content: 'fork_right';
		}
		:host > i.forklift:before {
			content: 'forklift';
		}
		:host > i.format_align_center:before {
			content: 'format_align_center';
		}
		:host > i.format_align_justify:before {
			content: 'format_align_justify';
		}
		:host > i.format_align_left:before {
			content: 'format_align_left';
		}
		:host > i.format_align_right:before {
			content: 'format_align_right';
		}
		:host > i.format_bold:before {
			content: 'format_bold';
		}
		:host > i.format_clear:before {
			content: 'format_clear';
		}
		:host > i.format_color_fill:before {
			content: 'format_color_fill';
		}
		:host > i.format_color_reset:before {
			content: 'format_color_reset';
		}
		:host > i.format_color_text:before {
			content: 'format_color_text';
		}
		:host > i.format_h1:before {
			content: 'format_h1';
		}
		:host > i.format_h2:before {
			content: 'format_h2';
		}
		:host > i.format_h3:before {
			content: 'format_h3';
		}
		:host > i.format_h4:before {
			content: 'format_h4';
		}
		:host > i.format_h5:before {
			content: 'format_h5';
		}
		:host > i.format_h6:before {
			content: 'format_h6';
		}
		:host > i.format_image_left:before {
			content: 'format_image_left';
		}
		:host > i.format_image_right:before {
			content: 'format_image_right';
		}
		:host > i.format_indent_decrease:before {
			content: 'format_indent_decrease';
		}
		:host > i.format_indent_increase:before {
			content: 'format_indent_increase';
		}
		:host > i.format_ink_highlighter:before {
			content: 'format_ink_highlighter';
		}
		:host > i.format_italic:before {
			content: 'format_italic';
		}
		:host > i.format_letter_spacing:before {
			content: 'format_letter_spacing';
		}
		:host > i.format_letter_spacing_2:before {
			content: 'format_letter_spacing_2';
		}
		:host > i.format_letter_spacing_standard:before {
			content: 'format_letter_spacing_standard';
		}
		:host > i.format_letter_spacing_wide:before {
			content: 'format_letter_spacing_wide';
		}
		:host > i.format_letter_spacing_wider:before {
			content: 'format_letter_spacing_wider';
		}
		:host > i.format_line_spacing:before {
			content: 'format_line_spacing';
		}
		:host > i.format_list_bulleted:before {
			content: 'format_list_bulleted';
		}
		:host > i.format_list_bulleted_add:before {
			content: 'format_list_bulleted_add';
		}
		:host > i.format_list_numbered:before {
			content: 'format_list_numbered';
		}
		:host > i.format_list_numbered_rtl:before {
			content: 'format_list_numbered_rtl';
		}
		:host > i.format_overline:before {
			content: 'format_overline';
		}
		:host > i.format_paint:before {
			content: 'format_paint';
		}
		:host > i.format_paragraph:before {
			content: 'format_paragraph';
		}
		:host > i.format_quote:before {
			content: 'format_quote';
		}
		:host > i.format_shapes:before {
			content: 'format_shapes';
		}
		:host > i.format_size:before {
			content: 'format_size';
		}
		:host > i.format_strikethrough:before {
			content: 'format_strikethrough';
		}
		:host > i.format_text_clip:before {
			content: 'format_text_clip';
		}
		:host > i.format_text_overflow:before {
			content: 'format_text_overflow';
		}
		:host > i.format_text_wrap:before {
			content: 'format_text_wrap';
		}
		:host > i.format_textdirection_l_to_r:before {
			content: 'format_textdirection_l_to_r';
		}
		:host > i.format_textdirection_r_to_l:before {
			content: 'format_textdirection_r_to_l';
		}
		:host > i.format_underlined:before {
			content: 'format_underlined';
		}
		:host > i.format_underlined_squiggle:before {
			content: 'format_underlined_squiggle';
		}
		:host > i.forms_add_on:before {
			content: 'forms_add_on';
		}
		:host > i.forms_apps_script:before {
			content: 'forms_apps_script';
		}
		:host > i.fort:before {
			content: 'fort';
		}
		:host > i.forum:before {
			content: 'forum';
		}
		:host > i.forward:before {
			content: 'forward';
		}
		:host > i.forward_10:before {
			content: 'forward_10';
		}
		:host > i.forward_30:before {
			content: 'forward_30';
		}
		:host > i.forward_5:before {
			content: 'forward_5';
		}
		:host > i.forward_circle:before {
			content: 'forward_circle';
		}
		:host > i.forward_media:before {
			content: 'forward_media';
		}
		:host > i.forward_to_inbox:before {
			content: 'forward_to_inbox';
		}
		:host > i.foundation:before {
			content: 'foundation';
		}
		:host > i.frame_inspect:before {
			content: 'frame_inspect';
		}
		:host > i.frame_person:before {
			content: 'frame_person';
		}
		:host > i.frame_person_off:before {
			content: 'frame_person_off';
		}
		:host > i.frame_reload:before {
			content: 'frame_reload';
		}
		:host > i.frame_source:before {
			content: 'frame_source';
		}
		:host > i.free_breakfast:before {
			content: 'free_breakfast';
		}
		:host > i.free_cancellation:before {
			content: 'free_cancellation';
		}
		:host > i.front_hand:before {
			content: 'front_hand';
		}
		:host > i.front_loader:before {
			content: 'front_loader';
		}
		:host > i.full_coverage:before {
			content: 'full_coverage';
		}
		:host > i.full_hd:before {
			content: 'full_hd';
		}
		:host > i.full_stacked_bar_chart:before {
			content: 'full_stacked_bar_chart';
		}
		:host > i.fullscreen:before {
			content: 'fullscreen';
		}
		:host > i.fullscreen_exit:before {
			content: 'fullscreen_exit';
		}
		:host > i.function:before {
			content: 'function';
		}
		:host > i.functions:before {
			content: 'functions';
		}
		:host > i.g_mobiledata:before {
			content: 'g_mobiledata';
		}
		:host > i.g_mobiledata_badge:before {
			content: 'g_mobiledata_badge';
		}
		:host > i.g_translate:before {
			content: 'g_translate';
		}
		:host > i.gallery_thumbnail:before {
			content: 'gallery_thumbnail';
		}
		:host > i.gamepad:before {
			content: 'gamepad';
		}
		:host > i.games:before {
			content: 'games';
		}
		:host > i.garage:before {
			content: 'garage';
		}
		:host > i.garage_door:before {
			content: 'garage_door';
		}
		:host > i.garage_home:before {
			content: 'garage_home';
		}
		:host > i.garden_cart:before {
			content: 'garden_cart';
		}
		:host > i.gas_meter:before {
			content: 'gas_meter';
		}
		:host > i.gastroenterology:before {
			content: 'gastroenterology';
		}
		:host > i.gate:before {
			content: 'gate';
		}
		:host > i.gavel:before {
			content: 'gavel';
		}
		:host > i.general_device:before {
			content: 'general_device';
		}
		:host > i.generating_tokens:before {
			content: 'generating_tokens';
		}
		:host > i.genetics:before {
			content: 'genetics';
		}
		:host > i.genres:before {
			content: 'genres';
		}
		:host > i.gesture:before {
			content: 'gesture';
		}
		:host > i.gesture_select:before {
			content: 'gesture_select';
		}
		:host > i.get_app:before {
			content: 'get_app';
		}
		:host > i.gif:before {
			content: 'gif';
		}
		:host > i.gif_box:before {
			content: 'gif_box';
		}
		:host > i.girl:before {
			content: 'girl';
		}
		:host > i.gite:before {
			content: 'gite';
		}
		:host > i.glass_cup:before {
			content: 'glass_cup';
		}
		:host > i.globe:before {
			content: 'globe';
		}
		:host > i.globe_asia:before {
			content: 'globe_asia';
		}
		:host > i.globe_uk:before {
			content: 'globe_uk';
		}
		:host > i.glucose:before {
			content: 'glucose';
		}
		:host > i.glyphs:before {
			content: 'glyphs';
		}
		:host > i.go_to_line:before {
			content: 'go_to_line';
		}
		:host > i.golf_course:before {
			content: 'golf_course';
		}
		:host > i.google_home_devices:before {
			content: 'google_home_devices';
		}
		:host > i.google_plus_reshare:before {
			content: 'google_plus_reshare';
		}
		:host > i.google_tv_remote:before {
			content: 'google_tv_remote';
		}
		:host > i.google_wifi:before {
			content: 'google_wifi';
		}
		:host > i.gpp_bad:before {
			content: 'gpp_bad';
		}
		:host > i.gpp_good:before {
			content: 'gpp_good';
		}
		:host > i.gpp_maybe:before {
			content: 'gpp_maybe';
		}
		:host > i.gps_fixed:before {
			content: 'gps_fixed';
		}
		:host > i.gps_not_fixed:before {
			content: 'gps_not_fixed';
		}
		:host > i.gps_off:before {
			content: 'gps_off';
		}
		:host > i.grade:before {
			content: 'grade';
		}
		:host > i.gradient:before {
			content: 'gradient';
		}
		:host > i.grading:before {
			content: 'grading';
		}
		:host > i.grain:before {
			content: 'grain';
		}
		:host > i.graphic_eq:before {
			content: 'graphic_eq';
		}
		:host > i.grass:before {
			content: 'grass';
		}
		:host > i.grid_3x3:before {
			content: 'grid_3x3';
		}
		:host > i.grid_3x3_off:before {
			content: 'grid_3x3_off';
		}
		:host > i.grid_4x4:before {
			content: 'grid_4x4';
		}
		:host > i.grid_goldenratio:before {
			content: 'grid_goldenratio';
		}
		:host > i.grid_guides:before {
			content: 'grid_guides';
		}
		:host > i.grid_off:before {
			content: 'grid_off';
		}
		:host > i.grid_on:before {
			content: 'grid_on';
		}
		:host > i.grid_view:before {
			content: 'grid_view';
		}
		:host > i.grocery:before {
			content: 'grocery';
		}
		:host > i.group:before {
			content: 'group';
		}
		:host > i.group_add:before {
			content: 'group_add';
		}
		:host > i.group_off:before {
			content: 'group_off';
		}
		:host > i.group_remove:before {
			content: 'group_remove';
		}
		:host > i.group_work:before {
			content: 'group_work';
		}
		:host > i.grouped_bar_chart:before {
			content: 'grouped_bar_chart';
		}
		:host > i.groups:before {
			content: 'groups';
		}
		:host > i.groups_2:before {
			content: 'groups_2';
		}
		:host > i.groups_3:before {
			content: 'groups_3';
		}
		:host > i.gynecology:before {
			content: 'gynecology';
		}
		:host > i.h_mobiledata:before {
			content: 'h_mobiledata';
		}
		:host > i.h_mobiledata_badge:before {
			content: 'h_mobiledata_badge';
		}
		:host > i.h_plus_mobiledata:before {
			content: 'h_plus_mobiledata';
		}
		:host > i.h_plus_mobiledata_badge:before {
			content: 'h_plus_mobiledata_badge';
		}
		:host > i.hail:before {
			content: 'hail';
		}
		:host > i.hallway:before {
			content: 'hallway';
		}
		:host > i.hand_bones:before {
			content: 'hand_bones';
		}
		:host > i.hand_gesture:before {
			content: 'hand_gesture';
		}
		:host > i.handshake:before {
			content: 'handshake';
		}
		:host > i.handwriting_recognition:before {
			content: 'handwriting_recognition';
		}
		:host > i.handyman:before {
			content: 'handyman';
		}
		:host > i.hangout_video:before {
			content: 'hangout_video';
		}
		:host > i.hangout_video_off:before {
			content: 'hangout_video_off';
		}
		:host > i.hard_drive:before {
			content: 'hard_drive';
		}
		:host > i.hard_drive_2:before {
			content: 'hard_drive_2';
		}
		:host > i.hardware:before {
			content: 'hardware';
		}
		:host > i.hd:before {
			content: 'hd';
		}
		:host > i.hdr_auto:before {
			content: 'hdr_auto';
		}
		:host > i.hdr_auto_select:before {
			content: 'hdr_auto_select';
		}
		:host > i.hdr_enhanced_select:before {
			content: 'hdr_enhanced_select';
		}
		:host > i.hdr_off:before {
			content: 'hdr_off';
		}
		:host > i.hdr_off_select:before {
			content: 'hdr_off_select';
		}
		:host > i.hdr_on:before {
			content: 'hdr_on';
		}
		:host > i.hdr_on_select:before {
			content: 'hdr_on_select';
		}
		:host > i.hdr_plus:before {
			content: 'hdr_plus';
		}
		:host > i.hdr_plus_off:before {
			content: 'hdr_plus_off';
		}
		:host > i.hdr_strong:before {
			content: 'hdr_strong';
		}
		:host > i.hdr_weak:before {
			content: 'hdr_weak';
		}
		:host > i.headphones:before {
			content: 'headphones';
		}
		:host > i.headphones_battery:before {
			content: 'headphones_battery';
		}
		:host > i.headset:before {
			content: 'headset';
		}
		:host > i.headset_mic:before {
			content: 'headset_mic';
		}
		:host > i.headset_off:before {
			content: 'headset_off';
		}
		:host > i.healing:before {
			content: 'healing';
		}
		:host > i.health_and_beauty:before {
			content: 'health_and_beauty';
		}
		:host > i.health_and_safety:before {
			content: 'health_and_safety';
		}
		:host > i.health_metrics:before {
			content: 'health_metrics';
		}
		:host > i.heap_snapshot_large:before {
			content: 'heap_snapshot_large';
		}
		:host > i.heap_snapshot_multiple:before {
			content: 'heap_snapshot_multiple';
		}
		:host > i.heap_snapshot_thumbnail:before {
			content: 'heap_snapshot_thumbnail';
		}
		:host > i.hearing:before {
			content: 'hearing';
		}
		:host > i.hearing_disabled:before {
			content: 'hearing_disabled';
		}
		:host > i.heart_broken:before {
			content: 'heart_broken';
		}
		:host > i.heart_check:before {
			content: 'heart_check';
		}
		:host > i.heart_minus:before {
			content: 'heart_minus';
		}
		:host > i.heart_plus:before {
			content: 'heart_plus';
		}
		:host > i.heat:before {
			content: 'heat';
		}
		:host > i.heat_pump:before {
			content: 'heat_pump';
		}
		:host > i.heat_pump_balance:before {
			content: 'heat_pump_balance';
		}
		:host > i.height:before {
			content: 'height';
		}
		:host > i.helicopter:before {
			content: 'helicopter';
		}
		:host > i.help:before {
			content: 'help';
		}
		:host > i.help_center:before {
			content: 'help_center';
		}
		:host > i.help_clinic:before {
			content: 'help_clinic';
		}
		:host > i.help_outline:before {
			content: 'help_outline';
		}
		:host > i.hematology:before {
			content: 'hematology';
		}
		:host > i.hevc:before {
			content: 'hevc';
		}
		:host > i.hexagon:before {
			content: 'hexagon';
		}
		:host > i.hide:before {
			content: 'hide';
		}
		:host > i.hide_image:before {
			content: 'hide_image';
		}
		:host > i.hide_source:before {
			content: 'hide_source';
		}
		:host > i.high_density:before {
			content: 'high_density';
		}
		:host > i.high_quality:before {
			content: 'high_quality';
		}
		:host > i.high_res:before {
			content: 'high_res';
		}
		:host > i.highlight:before {
			content: 'highlight';
		}
		:host > i.highlight_keyboard_focus:before {
			content: 'highlight_keyboard_focus';
		}
		:host > i.highlight_mouse_cursor:before {
			content: 'highlight_mouse_cursor';
		}
		:host > i.highlight_off:before {
			content: 'highlight_off';
		}
		:host > i.highlight_text_cursor:before {
			content: 'highlight_text_cursor';
		}
		:host > i.highlighter_size_1:before {
			content: 'highlighter_size_1';
		}
		:host > i.highlighter_size_2:before {
			content: 'highlighter_size_2';
		}
		:host > i.highlighter_size_3:before {
			content: 'highlighter_size_3';
		}
		:host > i.highlighter_size_4:before {
			content: 'highlighter_size_4';
		}
		:host > i.highlighter_size_5:before {
			content: 'highlighter_size_5';
		}
		:host > i.hiking:before {
			content: 'hiking';
		}
		:host > i.history:before {
			content: 'history';
		}
		:host > i.history_edu:before {
			content: 'history_edu';
		}
		:host > i.history_toggle_off:before {
			content: 'history_toggle_off';
		}
		:host > i.hive:before {
			content: 'hive';
		}
		:host > i.hls:before {
			content: 'hls';
		}
		:host > i.hls_off:before {
			content: 'hls_off';
		}
		:host > i.holiday_village:before {
			content: 'holiday_village';
		}
		:host > i.home:before {
			content: 'home';
		}
		:host > i.home_and_garden:before {
			content: 'home_and_garden';
		}
		:host > i.home_app_logo:before {
			content: 'home_app_logo';
		}
		:host > i.home_filled:before {
			content: 'home_filled';
		}
		:host > i.home_health:before {
			content: 'home_health';
		}
		:host > i.home_improvement_and_tools:before {
			content: 'home_improvement_and_tools';
		}
		:host > i.home_iot_device:before {
			content: 'home_iot_device';
		}
		:host > i.home_max:before {
			content: 'home_max';
		}
		:host > i.home_max_dots:before {
			content: 'home_max_dots';
		}
		:host > i.home_mini:before {
			content: 'home_mini';
		}
		:host > i.home_pin:before {
			content: 'home_pin';
		}
		:host > i.home_repair_service:before {
			content: 'home_repair_service';
		}
		:host > i.home_speaker:before {
			content: 'home_speaker';
		}
		:host > i.home_storage:before {
			content: 'home_storage';
		}
		:host > i.home_work:before {
			content: 'home_work';
		}
		:host > i.horizontal_distribute:before {
			content: 'horizontal_distribute';
		}
		:host > i.horizontal_rule:before {
			content: 'horizontal_rule';
		}
		:host > i.horizontal_split:before {
			content: 'horizontal_split';
		}
		:host > i.hot_tub:before {
			content: 'hot_tub';
		}
		:host > i.hotel:before {
			content: 'hotel';
		}
		:host > i.hotel_class:before {
			content: 'hotel_class';
		}
		:host > i.hourglass:before {
			content: 'hourglass';
		}
		:host > i.hourglass_bottom:before {
			content: 'hourglass_bottom';
		}
		:host > i.hourglass_disabled:before {
			content: 'hourglass_disabled';
		}
		:host > i.hourglass_empty:before {
			content: 'hourglass_empty';
		}
		:host > i.hourglass_full:before {
			content: 'hourglass_full';
		}
		:host > i.hourglass_top:before {
			content: 'hourglass_top';
		}
		:host > i.house:before {
			content: 'house';
		}
		:host > i.house_siding:before {
			content: 'house_siding';
		}
		:host > i.house_with_shield:before {
			content: 'house_with_shield';
		}
		:host > i.houseboat:before {
			content: 'houseboat';
		}
		:host > i.household_supplies:before {
			content: 'household_supplies';
		}
		:host > i.how_to_reg:before {
			content: 'how_to_reg';
		}
		:host > i.how_to_vote:before {
			content: 'how_to_vote';
		}
		:host > i.hr_resting:before {
			content: 'hr_resting';
		}
		:host > i.html:before {
			content: 'html';
		}
		:host > i.http:before {
			content: 'http';
		}
		:host > i.https:before {
			content: 'https';
		}
		:host > i.hub:before {
			content: 'hub';
		}
		:host > i.humerus:before {
			content: 'humerus';
		}
		:host > i.humerus_alt:before {
			content: 'humerus_alt';
		}
		:host > i.humidity_high:before {
			content: 'humidity_high';
		}
		:host > i.humidity_indoor:before {
			content: 'humidity_indoor';
		}
		:host > i.humidity_low:before {
			content: 'humidity_low';
		}
		:host > i.humidity_mid:before {
			content: 'humidity_mid';
		}
		:host > i.humidity_percentage:before {
			content: 'humidity_percentage';
		}
		:host > i.hvac:before {
			content: 'hvac';
		}
		:host > i.ice_skating:before {
			content: 'ice_skating';
		}
		:host > i.icecream:before {
			content: 'icecream';
		}
		:host > i.ifl:before {
			content: 'ifl';
		}
		:host > i.iframe:before {
			content: 'iframe';
		}
		:host > i.iframe_off:before {
			content: 'iframe_off';
		}
		:host > i.image:before {
			content: 'image';
		}
		:host > i.image_aspect_ratio:before {
			content: 'image_aspect_ratio';
		}
		:host > i.image_not_supported:before {
			content: 'image_not_supported';
		}
		:host > i.image_search:before {
			content: 'image_search';
		}
		:host > i.imagesearch_roller:before {
			content: 'imagesearch_roller';
		}
		:host > i.imagesmode:before {
			content: 'imagesmode';
		}
		:host > i.immunology:before {
			content: 'immunology';
		}
		:host > i.import_contacts:before {
			content: 'import_contacts';
		}
		:host > i.import_export:before {
			content: 'import_export';
		}
		:host > i.important_devices:before {
			content: 'important_devices';
		}
		:host > i.in_home_mode:before {
			content: 'in_home_mode';
		}
		:host > i.inactive_order:before {
			content: 'inactive_order';
		}
		:host > i.inbox:before {
			content: 'inbox';
		}
		:host > i.inbox_customize:before {
			content: 'inbox_customize';
		}
		:host > i.incomplete_circle:before {
			content: 'incomplete_circle';
		}
		:host > i.indeterminate_check_box:before {
			content: 'indeterminate_check_box';
		}
		:host > i.indeterminate_question_box:before {
			content: 'indeterminate_question_box';
		}
		:host > i.info:before {
			content: 'info';
		}
		:host > i.info_i:before {
			content: 'info_i';
		}
		:host > i.infrared:before {
			content: 'infrared';
		}
		:host > i.ink_eraser:before {
			content: 'ink_eraser';
		}
		:host > i.ink_eraser_off:before {
			content: 'ink_eraser_off';
		}
		:host > i.ink_highlighter:before {
			content: 'ink_highlighter';
		}
		:host > i.ink_highlighter_move:before {
			content: 'ink_highlighter_move';
		}
		:host > i.ink_marker:before {
			content: 'ink_marker';
		}
		:host > i.ink_pen:before {
			content: 'ink_pen';
		}
		:host > i.inpatient:before {
			content: 'inpatient';
		}
		:host > i.input:before {
			content: 'input';
		}
		:host > i.input_circle:before {
			content: 'input_circle';
		}
		:host > i.insert_chart:before {
			content: 'insert_chart';
		}
		:host > i.insert_chart_filled:before {
			content: 'insert_chart_filled';
		}
		:host > i.insert_chart_outlined:before {
			content: 'insert_chart_outlined';
		}
		:host > i.insert_comment:before {
			content: 'insert_comment';
		}
		:host > i.insert_drive_file:before {
			content: 'insert_drive_file';
		}
		:host > i.insert_emoticon:before {
			content: 'insert_emoticon';
		}
		:host > i.insert_invitation:before {
			content: 'insert_invitation';
		}
		:host > i.insert_link:before {
			content: 'insert_link';
		}
		:host > i.insert_page_break:before {
			content: 'insert_page_break';
		}
		:host > i.insert_photo:before {
			content: 'insert_photo';
		}
		:host > i.insert_text:before {
			content: 'insert_text';
		}
		:host > i.insights:before {
			content: 'insights';
		}
		:host > i.install_desktop:before {
			content: 'install_desktop';
		}
		:host > i.install_mobile:before {
			content: 'install_mobile';
		}
		:host > i.instant_mix:before {
			content: 'instant_mix';
		}
		:host > i.integration_instructions:before {
			content: 'integration_instructions';
		}
		:host > i.interactive_space:before {
			content: 'interactive_space';
		}
		:host > i.interests:before {
			content: 'interests';
		}
		:host > i.interpreter_mode:before {
			content: 'interpreter_mode';
		}
		:host > i.inventory:before {
			content: 'inventory';
		}
		:host > i.inventory_2:before {
			content: 'inventory_2';
		}
		:host > i.invert_colors:before {
			content: 'invert_colors';
		}
		:host > i.invert_colors_off:before {
			content: 'invert_colors_off';
		}
		:host > i.ios:before {
			content: 'ios';
		}
		:host > i.ios_share:before {
			content: 'ios_share';
		}
		:host > i.iron:before {
			content: 'iron';
		}
		:host > i.iso:before {
			content: 'iso';
		}
		:host > i.jamboard_kiosk:before {
			content: 'jamboard_kiosk';
		}
		:host > i.javascript:before {
			content: 'javascript';
		}
		:host > i.join:before {
			content: 'join';
		}
		:host > i.join_full:before {
			content: 'join_full';
		}
		:host > i.join_inner:before {
			content: 'join_inner';
		}
		:host > i.join_left:before {
			content: 'join_left';
		}
		:host > i.join_right:before {
			content: 'join_right';
		}
		:host > i.joystick:before {
			content: 'joystick';
		}
		:host > i.jump_to_element:before {
			content: 'jump_to_element';
		}
		:host > i.kayaking:before {
			content: 'kayaking';
		}
		:host > i.kebab_dining:before {
			content: 'kebab_dining';
		}
		:host > i.kettle:before {
			content: 'kettle';
		}
		:host > i.key:before {
			content: 'key';
		}
		:host > i.key_off:before {
			content: 'key_off';
		}
		:host > i.key_vertical:before {
			content: 'key_vertical';
		}
		:host > i.key_visualizer:before {
			content: 'key_visualizer';
		}
		:host > i.keyboard:before {
			content: 'keyboard';
		}
		:host > i.keyboard_alt:before {
			content: 'keyboard_alt';
		}
		:host > i.keyboard_arrow_down:before {
			content: 'keyboard_arrow_down';
		}
		:host > i.keyboard_arrow_left:before {
			content: 'keyboard_arrow_left';
		}
		:host > i.keyboard_arrow_right:before {
			content: 'keyboard_arrow_right';
		}
		:host > i.keyboard_arrow_up:before {
			content: 'keyboard_arrow_up';
		}
		:host > i.keyboard_backspace:before {
			content: 'keyboard_backspace';
		}
		:host > i.keyboard_capslock:before {
			content: 'keyboard_capslock';
		}
		:host > i.keyboard_capslock_badge:before {
			content: 'keyboard_capslock_badge';
		}
		:host > i.keyboard_command_key:before {
			content: 'keyboard_command_key';
		}
		:host > i.keyboard_control_key:before {
			content: 'keyboard_control_key';
		}
		:host > i.keyboard_double_arrow_down:before {
			content: 'keyboard_double_arrow_down';
		}
		:host > i.keyboard_double_arrow_left:before {
			content: 'keyboard_double_arrow_left';
		}
		:host > i.keyboard_double_arrow_right:before {
			content: 'keyboard_double_arrow_right';
		}
		:host > i.keyboard_double_arrow_up:before {
			content: 'keyboard_double_arrow_up';
		}
		:host > i.keyboard_external_input:before {
			content: 'keyboard_external_input';
		}
		:host > i.keyboard_full:before {
			content: 'keyboard_full';
		}
		:host > i.keyboard_hide:before {
			content: 'keyboard_hide';
		}
		:host > i.keyboard_keys:before {
			content: 'keyboard_keys';
		}
		:host > i.keyboard_off:before {
			content: 'keyboard_off';
		}
		:host > i.keyboard_onscreen:before {
			content: 'keyboard_onscreen';
		}
		:host > i.keyboard_option_key:before {
			content: 'keyboard_option_key';
		}
		:host > i.keyboard_previous_language:before {
			content: 'keyboard_previous_language';
		}
		:host > i.keyboard_return:before {
			content: 'keyboard_return';
		}
		:host > i.keyboard_tab:before {
			content: 'keyboard_tab';
		}
		:host > i.keyboard_tab_rtl:before {
			content: 'keyboard_tab_rtl';
		}
		:host > i.keyboard_voice:before {
			content: 'keyboard_voice';
		}
		:host > i.kid_star:before {
			content: 'kid_star';
		}
		:host > i.king_bed:before {
			content: 'king_bed';
		}
		:host > i.kitchen:before {
			content: 'kitchen';
		}
		:host > i.kitesurfing:before {
			content: 'kitesurfing';
		}
		:host > i.lab_panel:before {
			content: 'lab_panel';
		}
		:host > i.lab_profile:before {
			content: 'lab_profile';
		}
		:host > i.lab_research:before {
			content: 'lab_research';
		}
		:host > i.label:before {
			content: 'label';
		}
		:host > i.label_important:before {
			content: 'label_important';
		}
		:host > i.label_important_outline:before {
			content: 'label_important_outline';
		}
		:host > i.label_off:before {
			content: 'label_off';
		}
		:host > i.label_outline:before {
			content: 'label_outline';
		}
		:host > i.labs:before {
			content: 'labs';
		}
		:host > i.lan:before {
			content: 'lan';
		}
		:host > i.landscape:before {
			content: 'landscape';
		}
		:host > i.landslide:before {
			content: 'landslide';
		}
		:host > i.language:before {
			content: 'language';
		}
		:host > i.language_chinese_array:before {
			content: 'language_chinese_array';
		}
		:host > i.language_chinese_cangjie:before {
			content: 'language_chinese_cangjie';
		}
		:host > i.language_chinese_dayi:before {
			content: 'language_chinese_dayi';
		}
		:host > i.language_chinese_pinyin:before {
			content: 'language_chinese_pinyin';
		}
		:host > i.language_chinese_quick:before {
			content: 'language_chinese_quick';
		}
		:host > i.language_chinese_wubi:before {
			content: 'language_chinese_wubi';
		}
		:host > i.language_french:before {
			content: 'language_french';
		}
		:host > i.language_gb_english:before {
			content: 'language_gb_english';
		}
		:host > i.language_international:before {
			content: 'language_international';
		}
		:host > i.language_japanese_kana:before {
			content: 'language_japanese_kana';
		}
		:host > i.language_korean_latin:before {
			content: 'language_korean_latin';
		}
		:host > i.language_pinyin:before {
			content: 'language_pinyin';
		}
		:host > i.language_spanish:before {
			content: 'language_spanish';
		}
		:host > i.language_us:before {
			content: 'language_us';
		}
		:host > i.language_us_colemak:before {
			content: 'language_us_colemak';
		}
		:host > i.language_us_dvorak:before {
			content: 'language_us_dvorak';
		}
		:host > i.laps:before {
			content: 'laps';
		}
		:host > i.laptop:before {
			content: 'laptop';
		}
		:host > i.laptop_chromebook:before {
			content: 'laptop_chromebook';
		}
		:host > i.laptop_mac:before {
			content: 'laptop_mac';
		}
		:host > i.laptop_windows:before {
			content: 'laptop_windows';
		}
		:host > i.lasso_select:before {
			content: 'lasso_select';
		}
		:host > i.last_page:before {
			content: 'last_page';
		}
		:host > i.launch:before {
			content: 'launch';
		}
		:host > i.laundry:before {
			content: 'laundry';
		}
		:host > i.layers:before {
			content: 'layers';
		}
		:host > i.layers_clear:before {
			content: 'layers_clear';
		}
		:host > i.lda:before {
			content: 'lda';
		}
		:host > i.leaderboard:before {
			content: 'leaderboard';
		}
		:host > i.leak_add:before {
			content: 'leak_add';
		}
		:host > i.leak_remove:before {
			content: 'leak_remove';
		}
		:host > i.left_click:before {
			content: 'left_click';
		}
		:host > i.left_panel_close:before {
			content: 'left_panel_close';
		}
		:host > i.left_panel_open:before {
			content: 'left_panel_open';
		}
		:host > i.legend_toggle:before {
			content: 'legend_toggle';
		}
		:host > i.lens:before {
			content: 'lens';
		}
		:host > i.lens_blur:before {
			content: 'lens_blur';
		}
		:host > i.letter_switch:before {
			content: 'letter_switch';
		}
		:host > i.library_add:before {
			content: 'library_add';
		}
		:host > i.library_add_check:before {
			content: 'library_add_check';
		}
		:host > i.library_books:before {
			content: 'library_books';
		}
		:host > i.library_music:before {
			content: 'library_music';
		}
		:host > i.license:before {
			content: 'license';
		}
		:host > i.lift_to_talk:before {
			content: 'lift_to_talk';
		}
		:host > i.light:before {
			content: 'light';
		}
		:host > i.light_group:before {
			content: 'light_group';
		}
		:host > i.light_mode:before {
			content: 'light_mode';
		}
		:host > i.light_off:before {
			content: 'light_off';
		}
		:host > i.lightbulb:before {
			content: 'lightbulb';
		}
		:host > i.lightbulb_circle:before {
			content: 'lightbulb_circle';
		}
		:host > i.lightbulb_outline:before {
			content: 'lightbulb_outline';
		}
		:host > i.lightning_stand:before {
			content: 'lightning_stand';
		}
		:host > i.line_axis:before {
			content: 'line_axis';
		}
		:host > i.line_curve:before {
			content: 'line_curve';
		}
		:host > i.line_end:before {
			content: 'line_end';
		}
		:host > i.line_end_arrow:before {
			content: 'line_end_arrow';
		}
		:host > i.line_end_arrow_notch:before {
			content: 'line_end_arrow_notch';
		}
		:host > i.line_end_circle:before {
			content: 'line_end_circle';
		}
		:host > i.line_end_diamond:before {
			content: 'line_end_diamond';
		}
		:host > i.line_end_square:before {
			content: 'line_end_square';
		}
		:host > i.line_start:before {
			content: 'line_start';
		}
		:host > i.line_start_arrow:before {
			content: 'line_start_arrow';
		}
		:host > i.line_start_arrow_notch:before {
			content: 'line_start_arrow_notch';
		}
		:host > i.line_start_circle:before {
			content: 'line_start_circle';
		}
		:host > i.line_start_diamond:before {
			content: 'line_start_diamond';
		}
		:host > i.line_start_square:before {
			content: 'line_start_square';
		}
		:host > i.line_style:before {
			content: 'line_style';
		}
		:host > i.line_weight:before {
			content: 'line_weight';
		}
		:host > i.linear_scale:before {
			content: 'linear_scale';
		}
		:host > i.link:before {
			content: 'link';
		}
		:host > i.link_off:before {
			content: 'link_off';
		}
		:host > i.linked_camera:before {
			content: 'linked_camera';
		}
		:host > i.linked_services:before {
			content: 'linked_services';
		}
		:host > i.liquor:before {
			content: 'liquor';
		}
		:host > i.list:before {
			content: 'list';
		}
		:host > i.list_alt:before {
			content: 'list_alt';
		}
		:host > i.list_alt_add:before {
			content: 'list_alt_add';
		}
		:host > i.lists:before {
			content: 'lists';
		}
		:host > i.live_help:before {
			content: 'live_help';
		}
		:host > i.live_tv:before {
			content: 'live_tv';
		}
		:host > i.living:before {
			content: 'living';
		}
		:host > i.local_activity:before {
			content: 'local_activity';
		}
		:host > i.local_airport:before {
			content: 'local_airport';
		}
		:host > i.local_atm:before {
			content: 'local_atm';
		}
		:host > i.local_bar:before {
			content: 'local_bar';
		}
		:host > i.local_cafe:before {
			content: 'local_cafe';
		}
		:host > i.local_car_wash:before {
			content: 'local_car_wash';
		}
		:host > i.local_convenience_store:before {
			content: 'local_convenience_store';
		}
		:host > i.local_dining:before {
			content: 'local_dining';
		}
		:host > i.local_drink:before {
			content: 'local_drink';
		}
		:host > i.local_fire_department:before {
			content: 'local_fire_department';
		}
		:host > i.local_florist:before {
			content: 'local_florist';
		}
		:host > i.local_gas_station:before {
			content: 'local_gas_station';
		}
		:host > i.local_grocery_store:before {
			content: 'local_grocery_store';
		}
		:host > i.local_hospital:before {
			content: 'local_hospital';
		}
		:host > i.local_hotel:before {
			content: 'local_hotel';
		}
		:host > i.local_laundry_service:before {
			content: 'local_laundry_service';
		}
		:host > i.local_library:before {
			content: 'local_library';
		}
		:host > i.local_mall:before {
			content: 'local_mall';
		}
		:host > i.local_movies:before {
			content: 'local_movies';
		}
		:host > i.local_offer:before {
			content: 'local_offer';
		}
		:host > i.local_parking:before {
			content: 'local_parking';
		}
		:host > i.local_pharmacy:before {
			content: 'local_pharmacy';
		}
		:host > i.local_phone:before {
			content: 'local_phone';
		}
		:host > i.local_pizza:before {
			content: 'local_pizza';
		}
		:host > i.local_play:before {
			content: 'local_play';
		}
		:host > i.local_police:before {
			content: 'local_police';
		}
		:host > i.local_post_office:before {
			content: 'local_post_office';
		}
		:host > i.local_printshop:before {
			content: 'local_printshop';
		}
		:host > i.local_see:before {
			content: 'local_see';
		}
		:host > i.local_shipping:before {
			content: 'local_shipping';
		}
		:host > i.local_taxi:before {
			content: 'local_taxi';
		}
		:host > i.location_automation:before {
			content: 'location_automation';
		}
		:host > i.location_away:before {
			content: 'location_away';
		}
		:host > i.location_chip:before {
			content: 'location_chip';
		}
		:host > i.location_city:before {
			content: 'location_city';
		}
		:host > i.location_disabled:before {
			content: 'location_disabled';
		}
		:host > i.location_home:before {
			content: 'location_home';
		}
		:host > i.location_off:before {
			content: 'location_off';
		}
		:host > i.location_on:before {
			content: 'location_on';
		}
		:host > i.location_pin:before {
			content: 'location_pin';
		}
		:host > i.location_searching:before {
			content: 'location_searching';
		}
		:host > i.locator_tag:before {
			content: 'locator_tag';
		}
		:host > i.lock:before {
			content: 'lock';
		}
		:host > i.lock_clock:before {
			content: 'lock_clock';
		}
		:host > i.lock_open:before {
			content: 'lock_open';
		}
		:host > i.lock_open_right:before {
			content: 'lock_open_right';
		}
		:host > i.lock_outline:before {
			content: 'lock_outline';
		}
		:host > i.lock_person:before {
			content: 'lock_person';
		}
		:host > i.lock_reset:before {
			content: 'lock_reset';
		}
		:host > i.login:before {
			content: 'login';
		}
		:host > i.logo_dev:before {
			content: 'logo_dev';
		}
		:host > i.logout:before {
			content: 'logout';
		}
		:host > i.looks:before {
			content: 'looks';
		}
		:host > i.looks_3:before {
			content: 'looks_3';
		}
		:host > i.looks_4:before {
			content: 'looks_4';
		}
		:host > i.looks_5:before {
			content: 'looks_5';
		}
		:host > i.looks_6:before {
			content: 'looks_6';
		}
		:host > i.looks_one:before {
			content: 'looks_one';
		}
		:host > i.looks_two:before {
			content: 'looks_two';
		}
		:host > i.loop:before {
			content: 'loop';
		}
		:host > i.loupe:before {
			content: 'loupe';
		}
		:host > i.low_density:before {
			content: 'low_density';
		}
		:host > i.low_priority:before {
			content: 'low_priority';
		}
		:host > i.loyalty:before {
			content: 'loyalty';
		}
		:host > i.lte_mobiledata:before {
			content: 'lte_mobiledata';
		}
		:host > i.lte_mobiledata_badge:before {
			content: 'lte_mobiledata_badge';
		}
		:host > i.lte_plus_mobiledata:before {
			content: 'lte_plus_mobiledata';
		}
		:host > i.lte_plus_mobiledata_badge:before {
			content: 'lte_plus_mobiledata_badge';
		}
		:host > i.luggage:before {
			content: 'luggage';
		}
		:host > i.lunch_dining:before {
			content: 'lunch_dining';
		}
		:host > i.lyrics:before {
			content: 'lyrics';
		}
		:host > i.macro_auto:before {
			content: 'macro_auto';
		}
		:host > i.macro_off:before {
			content: 'macro_off';
		}
		:host > i.magic_button:before {
			content: 'magic_button';
		}
		:host > i.magic_exchange:before {
			content: 'magic_exchange';
		}
		:host > i.magic_tether:before {
			content: 'magic_tether';
		}
		:host > i.magnification_large:before {
			content: 'magnification_large';
		}
		:host > i.magnification_small:before {
			content: 'magnification_small';
		}
		:host > i.magnify_docked:before {
			content: 'magnify_docked';
		}
		:host > i.magnify_fullscreen:before {
			content: 'magnify_fullscreen';
		}
		:host > i.mail:before {
			content: 'mail';
		}
		:host > i.mail_lock:before {
			content: 'mail_lock';
		}
		:host > i.mail_outline:before {
			content: 'mail_outline';
		}
		:host > i.male:before {
			content: 'male';
		}
		:host > i.man:before {
			content: 'man';
		}
		:host > i.man_2:before {
			content: 'man_2';
		}
		:host > i.man_3:before {
			content: 'man_3';
		}
		:host > i.man_4:before {
			content: 'man_4';
		}
		:host > i.manage_accounts:before {
			content: 'manage_accounts';
		}
		:host > i.manage_history:before {
			content: 'manage_history';
		}
		:host > i.manage_search:before {
			content: 'manage_search';
		}
		:host > i.manga:before {
			content: 'manga';
		}
		:host > i.manufacturing:before {
			content: 'manufacturing';
		}
		:host > i.map:before {
			content: 'map';
		}
		:host > i.maps_home_work:before {
			content: 'maps_home_work';
		}
		:host > i.maps_ugc:before {
			content: 'maps_ugc';
		}
		:host > i.margin:before {
			content: 'margin';
		}
		:host > i.mark_as_unread:before {
			content: 'mark_as_unread';
		}
		:host > i.mark_chat_read:before {
			content: 'mark_chat_read';
		}
		:host > i.mark_chat_unread:before {
			content: 'mark_chat_unread';
		}
		:host > i.mark_email_read:before {
			content: 'mark_email_read';
		}
		:host > i.mark_email_unread:before {
			content: 'mark_email_unread';
		}
		:host > i.mark_unread_chat_alt:before {
			content: 'mark_unread_chat_alt';
		}
		:host > i.markdown:before {
			content: 'markdown';
		}
		:host > i.markdown_copy:before {
			content: 'markdown_copy';
		}
		:host > i.markdown_paste:before {
			content: 'markdown_paste';
		}
		:host > i.markunread:before {
			content: 'markunread';
		}
		:host > i.markunread_mailbox:before {
			content: 'markunread_mailbox';
		}
		:host > i.masked_transitions:before {
			content: 'masked_transitions';
		}
		:host > i.masks:before {
			content: 'masks';
		}
		:host > i.match_case:before {
			content: 'match_case';
		}
		:host > i.match_word:before {
			content: 'match_word';
		}
		:host > i.matter:before {
			content: 'matter';
		}
		:host > i.maximize:before {
			content: 'maximize';
		}
		:host > i.measuring_tape:before {
			content: 'measuring_tape';
		}
		:host > i.media_bluetooth_off:before {
			content: 'media_bluetooth_off';
		}
		:host > i.media_bluetooth_on:before {
			content: 'media_bluetooth_on';
		}
		:host > i.media_link:before {
			content: 'media_link';
		}
		:host > i.media_output:before {
			content: 'media_output';
		}
		:host > i.media_output_off:before {
			content: 'media_output_off';
		}
		:host > i.mediation:before {
			content: 'mediation';
		}
		:host > i.medical_information:before {
			content: 'medical_information';
		}
		:host > i.medical_mask:before {
			content: 'medical_mask';
		}
		:host > i.medical_services:before {
			content: 'medical_services';
		}
		:host > i.medication:before {
			content: 'medication';
		}
		:host > i.medication_liquid:before {
			content: 'medication_liquid';
		}
		:host > i.meeting_room:before {
			content: 'meeting_room';
		}
		:host > i.memory:before {
			content: 'memory';
		}
		:host > i.memory_alt:before {
			content: 'memory_alt';
		}
		:host > i.menstrual_health:before {
			content: 'menstrual_health';
		}
		:host > i.menu:before {
			content: 'menu';
		}
		:host > i.menu_book:before {
			content: 'menu_book';
		}
		:host > i.menu_open:before {
			content: 'menu_open';
		}
		:host > i.merge:before {
			content: 'merge';
		}
		:host > i.merge_type:before {
			content: 'merge_type';
		}
		:host > i.message:before {
			content: 'message';
		}
		:host > i.metabolism:before {
			content: 'metabolism';
		}
		:host > i.mfg_nest_yale_lock:before {
			content: 'mfg_nest_yale_lock';
		}
		:host > i.mic:before {
			content: 'mic';
		}
		:host > i.mic_double:before {
			content: 'mic_double';
		}
		:host > i.mic_external_off:before {
			content: 'mic_external_off';
		}
		:host > i.mic_external_on:before {
			content: 'mic_external_on';
		}
		:host > i.mic_none:before {
			content: 'mic_none';
		}
		:host > i.mic_off:before {
			content: 'mic_off';
		}
		:host > i.microbiology:before {
			content: 'microbiology';
		}
		:host > i.microwave:before {
			content: 'microwave';
		}
		:host > i.microwave_gen:before {
			content: 'microwave_gen';
		}
		:host > i.military_tech:before {
			content: 'military_tech';
		}
		:host > i.mimo:before {
			content: 'mimo';
		}
		:host > i.mimo_disconnect:before {
			content: 'mimo_disconnect';
		}
		:host > i.mindfulness:before {
			content: 'mindfulness';
		}
		:host > i.minimize:before {
			content: 'minimize';
		}
		:host > i.minor_crash:before {
			content: 'minor_crash';
		}
		:host > i.mintmark:before {
			content: 'mintmark';
		}
		:host > i.missed_video_call:before {
			content: 'missed_video_call';
		}
		:host > i.missed_video_call_filled:before {
			content: 'missed_video_call_filled';
		}
		:host > i.missing_controller:before {
			content: 'missing_controller';
		}
		:host > i.mist:before {
			content: 'mist';
		}
		:host > i.mitre:before {
			content: 'mitre';
		}
		:host > i.mixture_med:before {
			content: 'mixture_med';
		}
		:host > i.mms:before {
			content: 'mms';
		}
		:host > i.mobile_friendly:before {
			content: 'mobile_friendly';
		}
		:host > i.mobile_off:before {
			content: 'mobile_off';
		}
		:host > i.mobile_screen_share:before {
			content: 'mobile_screen_share';
		}
		:host > i.mobiledata_off:before {
			content: 'mobiledata_off';
		}
		:host > i.mode:before {
			content: 'mode';
		}
		:host > i.mode_comment:before {
			content: 'mode_comment';
		}
		:host > i.mode_cool:before {
			content: 'mode_cool';
		}
		:host > i.mode_cool_off:before {
			content: 'mode_cool_off';
		}
		:host > i.mode_dual:before {
			content: 'mode_dual';
		}
		:host > i.mode_edit:before {
			content: 'mode_edit';
		}
		:host > i.mode_edit_outline:before {
			content: 'mode_edit_outline';
		}
		:host > i.mode_fan:before {
			content: 'mode_fan';
		}
		:host > i.mode_fan_off:before {
			content: 'mode_fan_off';
		}
		:host > i.mode_heat:before {
			content: 'mode_heat';
		}
		:host > i.mode_heat_cool:before {
			content: 'mode_heat_cool';
		}
		:host > i.mode_heat_off:before {
			content: 'mode_heat_off';
		}
		:host > i.mode_night:before {
			content: 'mode_night';
		}
		:host > i.mode_of_travel:before {
			content: 'mode_of_travel';
		}
		:host > i.mode_off_on:before {
			content: 'mode_off_on';
		}
		:host > i.mode_standby:before {
			content: 'mode_standby';
		}
		:host > i.model_training:before {
			content: 'model_training';
		}
		:host > i.monetization_on:before {
			content: 'monetization_on';
		}
		:host > i.money:before {
			content: 'money';
		}
		:host > i.money_off:before {
			content: 'money_off';
		}
		:host > i.money_off_csred:before {
			content: 'money_off_csred';
		}
		:host > i.monitor:before {
			content: 'monitor';
		}
		:host > i.monitor_heart:before {
			content: 'monitor_heart';
		}
		:host > i.monitor_weight:before {
			content: 'monitor_weight';
		}
		:host > i.monitor_weight_gain:before {
			content: 'monitor_weight_gain';
		}
		:host > i.monitor_weight_loss:before {
			content: 'monitor_weight_loss';
		}
		:host > i.monitoring:before {
			content: 'monitoring';
		}
		:host > i.monochrome_photos:before {
			content: 'monochrome_photos';
		}
		:host > i.mood:before {
			content: 'mood';
		}
		:host > i.mood_bad:before {
			content: 'mood_bad';
		}
		:host > i.mop:before {
			content: 'mop';
		}
		:host > i.more:before {
			content: 'more';
		}
		:host > i.more_down:before {
			content: 'more_down';
		}
		:host > i.more_horiz:before {
			content: 'more_horiz';
		}
		:host > i.more_time:before {
			content: 'more_time';
		}
		:host > i.more_up:before {
			content: 'more_up';
		}
		:host > i.more_vert:before {
			content: 'more_vert';
		}
		:host > i.mosque:before {
			content: 'mosque';
		}
		:host > i.motion_blur:before {
			content: 'motion_blur';
		}
		:host > i.motion_mode:before {
			content: 'motion_mode';
		}
		:host > i.motion_photos_auto:before {
			content: 'motion_photos_auto';
		}
		:host > i.motion_photos_off:before {
			content: 'motion_photos_off';
		}
		:host > i.motion_photos_on:before {
			content: 'motion_photos_on';
		}
		:host > i.motion_photos_pause:before {
			content: 'motion_photos_pause';
		}
		:host > i.motion_photos_paused:before {
			content: 'motion_photos_paused';
		}
		:host > i.motion_sensor_active:before {
			content: 'motion_sensor_active';
		}
		:host > i.motion_sensor_alert:before {
			content: 'motion_sensor_alert';
		}
		:host > i.motion_sensor_idle:before {
			content: 'motion_sensor_idle';
		}
		:host > i.motion_sensor_urgent:before {
			content: 'motion_sensor_urgent';
		}
		:host > i.motorcycle:before {
			content: 'motorcycle';
		}
		:host > i.mountain_flag:before {
			content: 'mountain_flag';
		}
		:host > i.mouse:before {
			content: 'mouse';
		}
		:host > i.move:before {
			content: 'move';
		}
		:host > i.move_down:before {
			content: 'move_down';
		}
		:host > i.move_group:before {
			content: 'move_group';
		}
		:host > i.move_item:before {
			content: 'move_item';
		}
		:host > i.move_location:before {
			content: 'move_location';
		}
		:host > i.move_selection_down:before {
			content: 'move_selection_down';
		}
		:host > i.move_selection_left:before {
			content: 'move_selection_left';
		}
		:host > i.move_selection_right:before {
			content: 'move_selection_right';
		}
		:host > i.move_selection_up:before {
			content: 'move_selection_up';
		}
		:host > i.move_to_inbox:before {
			content: 'move_to_inbox';
		}
		:host > i.move_up:before {
			content: 'move_up';
		}
		:host > i.moved_location:before {
			content: 'moved_location';
		}
		:host > i.movie:before {
			content: 'movie';
		}
		:host > i.movie_creation:before {
			content: 'movie_creation';
		}
		:host > i.movie_edit:before {
			content: 'movie_edit';
		}
		:host > i.movie_filter:before {
			content: 'movie_filter';
		}
		:host > i.movie_info:before {
			content: 'movie_info';
		}
		:host > i.moving:before {
			content: 'moving';
		}
		:host > i.moving_beds:before {
			content: 'moving_beds';
		}
		:host > i.moving_ministry:before {
			content: 'moving_ministry';
		}
		:host > i.mp:before {
			content: 'mp';
		}
		:host > i.multicooker:before {
			content: 'multicooker';
		}
		:host > i.multiline_chart:before {
			content: 'multiline_chart';
		}
		:host > i.multiple_stop:before {
			content: 'multiple_stop';
		}
		:host > i.museum:before {
			content: 'museum';
		}
		:host > i.music_cast:before {
			content: 'music_cast';
		}
		:host > i.music_note:before {
			content: 'music_note';
		}
		:host > i.music_off:before {
			content: 'music_off';
		}
		:host > i.music_video:before {
			content: 'music_video';
		}
		:host > i.my_location:before {
			content: 'my_location';
		}
		:host > i.mystery:before {
			content: 'mystery';
		}
		:host > i.nat:before {
			content: 'nat';
		}
		:host > i.nature:before {
			content: 'nature';
		}
		:host > i.nature_people:before {
			content: 'nature_people';
		}
		:host > i.navigate_before:before {
			content: 'navigate_before';
		}
		:host > i.navigate_next:before {
			content: 'navigate_next';
		}
		:host > i.navigation:before {
			content: 'navigation';
		}
		:host > i.near_me:before {
			content: 'near_me';
		}
		:host > i.near_me_disabled:before {
			content: 'near_me_disabled';
		}
		:host > i.nearby:before {
			content: 'nearby';
		}
		:host > i.nearby_error:before {
			content: 'nearby_error';
		}
		:host > i.nearby_off:before {
			content: 'nearby_off';
		}
		:host > i.nephrology:before {
			content: 'nephrology';
		}
		:host > i.nest_audio:before {
			content: 'nest_audio';
		}
		:host > i.nest_cam_floodlight:before {
			content: 'nest_cam_floodlight';
		}
		:host > i.nest_cam_indoor:before {
			content: 'nest_cam_indoor';
		}
		:host > i.nest_cam_iq:before {
			content: 'nest_cam_iq';
		}
		:host > i.nest_cam_iq_outdoor:before {
			content: 'nest_cam_iq_outdoor';
		}
		:host > i.nest_cam_magnet_mount:before {
			content: 'nest_cam_magnet_mount';
		}
		:host > i.nest_cam_outdoor:before {
			content: 'nest_cam_outdoor';
		}
		:host > i.nest_cam_stand:before {
			content: 'nest_cam_stand';
		}
		:host > i.nest_cam_wall_mount:before {
			content: 'nest_cam_wall_mount';
		}
		:host > i.nest_cam_wired_stand:before {
			content: 'nest_cam_wired_stand';
		}
		:host > i.nest_clock_farsight_analog:before {
			content: 'nest_clock_farsight_analog';
		}
		:host > i.nest_clock_farsight_digital:before {
			content: 'nest_clock_farsight_digital';
		}
		:host > i.nest_connect:before {
			content: 'nest_connect';
		}
		:host > i.nest_detect:before {
			content: 'nest_detect';
		}
		:host > i.nest_display:before {
			content: 'nest_display';
		}
		:host > i.nest_display_max:before {
			content: 'nest_display_max';
		}
		:host > i.nest_doorbell_visitor:before {
			content: 'nest_doorbell_visitor';
		}
		:host > i.nest_eco_leaf:before {
			content: 'nest_eco_leaf';
		}
		:host > i.nest_farsight_weather:before {
			content: 'nest_farsight_weather';
		}
		:host > i.nest_found_savings:before {
			content: 'nest_found_savings';
		}
		:host > i.nest_gale_wifi:before {
			content: 'nest_gale_wifi';
		}
		:host > i.nest_heat_link_e:before {
			content: 'nest_heat_link_e';
		}
		:host > i.nest_heat_link_gen_3:before {
			content: 'nest_heat_link_gen_3';
		}
		:host > i.nest_hello_doorbell:before {
			content: 'nest_hello_doorbell';
		}
		:host > i.nest_locator_tag:before {
			content: 'nest_locator_tag';
		}
		:host > i.nest_mini:before {
			content: 'nest_mini';
		}
		:host > i.nest_multi_room:before {
			content: 'nest_multi_room';
		}
		:host > i.nest_protect:before {
			content: 'nest_protect';
		}
		:host > i.nest_remote:before {
			content: 'nest_remote';
		}
		:host > i.nest_remote_comfort_sensor:before {
			content: 'nest_remote_comfort_sensor';
		}
		:host > i.nest_secure_alarm:before {
			content: 'nest_secure_alarm';
		}
		:host > i.nest_sunblock:before {
			content: 'nest_sunblock';
		}
		:host > i.nest_tag:before {
			content: 'nest_tag';
		}
		:host > i.nest_thermostat:before {
			content: 'nest_thermostat';
		}
		:host > i.nest_thermostat_e_eu:before {
			content: 'nest_thermostat_e_eu';
		}
		:host > i.nest_thermostat_gen_3:before {
			content: 'nest_thermostat_gen_3';
		}
		:host > i.nest_thermostat_sensor:before {
			content: 'nest_thermostat_sensor';
		}
		:host > i.nest_thermostat_sensor_eu:before {
			content: 'nest_thermostat_sensor_eu';
		}
		:host > i.nest_thermostat_zirconium_eu:before {
			content: 'nest_thermostat_zirconium_eu';
		}
		:host > i.nest_true_radiant:before {
			content: 'nest_true_radiant';
		}
		:host > i.nest_wake_on_approach:before {
			content: 'nest_wake_on_approach';
		}
		:host > i.nest_wake_on_press:before {
			content: 'nest_wake_on_press';
		}
		:host > i.nest_wifi_gale:before {
			content: 'nest_wifi_gale';
		}
		:host > i.nest_wifi_mistral:before {
			content: 'nest_wifi_mistral';
		}
		:host > i.nest_wifi_point:before {
			content: 'nest_wifi_point';
		}
		:host > i.nest_wifi_point_vento:before {
			content: 'nest_wifi_point_vento';
		}
		:host > i.nest_wifi_pro:before {
			content: 'nest_wifi_pro';
		}
		:host > i.nest_wifi_pro_2:before {
			content: 'nest_wifi_pro_2';
		}
		:host > i.nest_wifi_router:before {
			content: 'nest_wifi_router';
		}
		:host > i.network_cell:before {
			content: 'network_cell';
		}
		:host > i.network_check:before {
			content: 'network_check';
		}
		:host > i.network_intelligence_history:before {
			content: 'network_intelligence_history';
		}
		:host > i.network_intelligence_update:before {
			content: 'network_intelligence_update';
		}
		:host > i.network_locked:before {
			content: 'network_locked';
		}
		:host > i.network_manage:before {
			content: 'network_manage';
		}
		:host > i.network_node:before {
			content: 'network_node';
		}
		:host > i.network_ping:before {
			content: 'network_ping';
		}
		:host > i.network_wifi:before {
			content: 'network_wifi';
		}
		:host > i.network_wifi_1_bar:before {
			content: 'network_wifi_1_bar';
		}
		:host > i.network_wifi_1_bar_locked:before {
			content: 'network_wifi_1_bar_locked';
		}
		:host > i.network_wifi_2_bar:before {
			content: 'network_wifi_2_bar';
		}
		:host > i.network_wifi_2_bar_locked:before {
			content: 'network_wifi_2_bar_locked';
		}
		:host > i.network_wifi_3_bar:before {
			content: 'network_wifi_3_bar';
		}
		:host > i.network_wifi_3_bar_locked:before {
			content: 'network_wifi_3_bar_locked';
		}
		:host > i.network_wifi_locked:before {
			content: 'network_wifi_locked';
		}
		:host > i.neurology:before {
			content: 'neurology';
		}
		:host > i.new_label:before {
			content: 'new_label';
		}
		:host > i.new_releases:before {
			content: 'new_releases';
		}
		:host > i.new_window:before {
			content: 'new_window';
		}
		:host > i.news:before {
			content: 'news';
		}
		:host > i.newsmode:before {
			content: 'newsmode';
		}
		:host > i.newspaper:before {
			content: 'newspaper';
		}
		:host > i.newsstand:before {
			content: 'newsstand';
		}
		:host > i.next_plan:before {
			content: 'next_plan';
		}
		:host > i.next_week:before {
			content: 'next_week';
		}
		:host > i.nfc:before {
			content: 'nfc';
		}
		:host > i.night_shelter:before {
			content: 'night_shelter';
		}
		:host > i.night_sight_auto:before {
			content: 'night_sight_auto';
		}
		:host > i.night_sight_auto_off:before {
			content: 'night_sight_auto_off';
		}
		:host > i.night_sight_max:before {
			content: 'night_sight_max';
		}
		:host > i.nightlife:before {
			content: 'nightlife';
		}
		:host > i.nightlight:before {
			content: 'nightlight';
		}
		:host > i.nightlight_round:before {
			content: 'nightlight_round';
		}
		:host > i.nights_stay:before {
			content: 'nights_stay';
		}
		:host > i.no_accounts:before {
			content: 'no_accounts';
		}
		:host > i.no_adult_content:before {
			content: 'no_adult_content';
		}
		:host > i.no_backpack:before {
			content: 'no_backpack';
		}
		:host > i.no_crash:before {
			content: 'no_crash';
		}
		:host > i.no_drinks:before {
			content: 'no_drinks';
		}
		:host > i.no_encryption:before {
			content: 'no_encryption';
		}
		:host > i.no_encryption_gmailerrorred:before {
			content: 'no_encryption_gmailerrorred';
		}
		:host > i.no_flash:before {
			content: 'no_flash';
		}
		:host > i.no_food:before {
			content: 'no_food';
		}
		:host > i.no_luggage:before {
			content: 'no_luggage';
		}
		:host > i.no_meals:before {
			content: 'no_meals';
		}
		:host > i.no_meeting_room:before {
			content: 'no_meeting_room';
		}
		:host > i.no_photography:before {
			content: 'no_photography';
		}
		:host > i.no_sim:before {
			content: 'no_sim';
		}
		:host > i.no_sound:before {
			content: 'no_sound';
		}
		:host > i.no_stroller:before {
			content: 'no_stroller';
		}
		:host > i.no_transfer:before {
			content: 'no_transfer';
		}
		:host > i.noise_aware:before {
			content: 'noise_aware';
		}
		:host > i.noise_control_off:before {
			content: 'noise_control_off';
		}
		:host > i.noise_control_on:before {
			content: 'noise_control_on';
		}
		:host > i.nordic_walking:before {
			content: 'nordic_walking';
		}
		:host > i.north:before {
			content: 'north';
		}
		:host > i.north_east:before {
			content: 'north_east';
		}
		:host > i.north_west:before {
			content: 'north_west';
		}
		:host > i.not_accessible:before {
			content: 'not_accessible';
		}
		:host > i.not_accessible_forward:before {
			content: 'not_accessible_forward';
		}
		:host > i.not_interested:before {
			content: 'not_interested';
		}
		:host > i.not_listed_location:before {
			content: 'not_listed_location';
		}
		:host > i.not_started:before {
			content: 'not_started';
		}
		:host > i.note:before {
			content: 'note';
		}
		:host > i.note_add:before {
			content: 'note_add';
		}
		:host > i.note_alt:before {
			content: 'note_alt';
		}
		:host > i.note_stack:before {
			content: 'note_stack';
		}
		:host > i.note_stack_add:before {
			content: 'note_stack_add';
		}
		:host > i.notes:before {
			content: 'notes';
		}
		:host > i.notification_add:before {
			content: 'notification_add';
		}
		:host > i.notification_important:before {
			content: 'notification_important';
		}
		:host > i.notification_multiple:before {
			content: 'notification_multiple';
		}
		:host > i.notifications:before {
			content: 'notifications';
		}
		:host > i.notifications_active:before {
			content: 'notifications_active';
		}
		:host > i.notifications_none:before {
			content: 'notifications_none';
		}
		:host > i.notifications_off:before {
			content: 'notifications_off';
		}
		:host > i.notifications_paused:before {
			content: 'notifications_paused';
		}
		:host > i.notifications_unread:before {
			content: 'notifications_unread';
		}
		:host > i.numbers:before {
			content: 'numbers';
		}
		:host > i.nutrition:before {
			content: 'nutrition';
		}
		:host > i.ods:before {
			content: 'ods';
		}
		:host > i.odt:before {
			content: 'odt';
		}
		:host > i.offline_bolt:before {
			content: 'offline_bolt';
		}
		:host > i.offline_pin:before {
			content: 'offline_pin';
		}
		:host > i.offline_share:before {
			content: 'offline_share';
		}
		:host > i.oil_barrel:before {
			content: 'oil_barrel';
		}
		:host > i.on_device_training:before {
			content: 'on_device_training';
		}
		:host > i.on_hub_device:before {
			content: 'on_hub_device';
		}
		:host > i.oncology:before {
			content: 'oncology';
		}
		:host > i.ondemand_video:before {
			content: 'ondemand_video';
		}
		:host > i.online_prediction:before {
			content: 'online_prediction';
		}
		:host > i.onsen:before {
			content: 'onsen';
		}
		:host > i.opacity:before {
			content: 'opacity';
		}
		:host > i.open_in_browser:before {
			content: 'open_in_browser';
		}
		:host > i.open_in_full:before {
			content: 'open_in_full';
		}
		:host > i.open_in_new:before {
			content: 'open_in_new';
		}
		:host > i.open_in_new_down:before {
			content: 'open_in_new_down';
		}
		:host > i.open_in_new_off:before {
			content: 'open_in_new_off';
		}
		:host > i.open_in_phone:before {
			content: 'open_in_phone';
		}
		:host > i.open_jam:before {
			content: 'open_jam';
		}
		:host > i.open_with:before {
			content: 'open_with';
		}
		:host > i.ophthalmology:before {
			content: 'ophthalmology';
		}
		:host > i.oral_disease:before {
			content: 'oral_disease';
		}
		:host > i.order_approve:before {
			content: 'order_approve';
		}
		:host > i.order_play:before {
			content: 'order_play';
		}
		:host > i.orders:before {
			content: 'orders';
		}
		:host > i.orthopedics:before {
			content: 'orthopedics';
		}
		:host > i.other_admission:before {
			content: 'other_admission';
		}
		:host > i.other_houses:before {
			content: 'other_houses';
		}
		:host > i.outbound:before {
			content: 'outbound';
		}
		:host > i.outbox:before {
			content: 'outbox';
		}
		:host > i.outbox_alt:before {
			content: 'outbox_alt';
		}
		:host > i.outdoor_garden:before {
			content: 'outdoor_garden';
		}
		:host > i.outdoor_grill:before {
			content: 'outdoor_grill';
		}
		:host > i.outgoing_mail:before {
			content: 'outgoing_mail';
		}
		:host > i.outlet:before {
			content: 'outlet';
		}
		:host > i.outlined_flag:before {
			content: 'outlined_flag';
		}
		:host > i.outpatient:before {
			content: 'outpatient';
		}
		:host > i.outpatient_med:before {
			content: 'outpatient_med';
		}
		:host > i.output:before {
			content: 'output';
		}
		:host > i.output_circle:before {
			content: 'output_circle';
		}
		:host > i.oven:before {
			content: 'oven';
		}
		:host > i.oven_gen:before {
			content: 'oven_gen';
		}
		:host > i.overview:before {
			content: 'overview';
		}
		:host > i.overview_key:before {
			content: 'overview_key';
		}
		:host > i.oxygen_saturation:before {
			content: 'oxygen_saturation';
		}
		:host > i.p2p:before {
			content: 'p2p';
		}
		:host > i.pace:before {
			content: 'pace';
		}
		:host > i.pacemaker:before {
			content: 'pacemaker';
		}
		:host > i.package:before {
			content: 'package';
		}
		:host > i.package_2:before {
			content: 'package_2';
		}
		:host > i.padding:before {
			content: 'padding';
		}
		:host > i.page_control:before {
			content: 'page_control';
		}
		:host > i.page_info:before {
			content: 'page_info';
		}
		:host > i.pageless:before {
			content: 'pageless';
		}
		:host > i.pages:before {
			content: 'pages';
		}
		:host > i.pageview:before {
			content: 'pageview';
		}
		:host > i.paid:before {
			content: 'paid';
		}
		:host > i.palette:before {
			content: 'palette';
		}
		:host > i.pallet:before {
			content: 'pallet';
		}
		:host > i.pan_tool:before {
			content: 'pan_tool';
		}
		:host > i.pan_tool_alt:before {
			content: 'pan_tool_alt';
		}
		:host > i.pan_zoom:before {
			content: 'pan_zoom';
		}
		:host > i.panorama:before {
			content: 'panorama';
		}
		:host > i.panorama_fish_eye:before {
			content: 'panorama_fish_eye';
		}
		:host > i.panorama_horizontal:before {
			content: 'panorama_horizontal';
		}
		:host > i.panorama_photosphere:before {
			content: 'panorama_photosphere';
		}
		:host > i.panorama_vertical:before {
			content: 'panorama_vertical';
		}
		:host > i.panorama_wide_angle:before {
			content: 'panorama_wide_angle';
		}
		:host > i.paragliding:before {
			content: 'paragliding';
		}
		:host > i.park:before {
			content: 'park';
		}
		:host > i.partly_cloudy_day:before {
			content: 'partly_cloudy_day';
		}
		:host > i.partly_cloudy_night:before {
			content: 'partly_cloudy_night';
		}
		:host > i.partner_exchange:before {
			content: 'partner_exchange';
		}
		:host > i.partner_reports:before {
			content: 'partner_reports';
		}
		:host > i.party_mode:before {
			content: 'party_mode';
		}
		:host > i.passkey:before {
			content: 'passkey';
		}
		:host > i.password:before {
			content: 'password';
		}
		:host > i.patient_list:before {
			content: 'patient_list';
		}
		:host > i.pattern:before {
			content: 'pattern';
		}
		:host > i.pause:before {
			content: 'pause';
		}
		:host > i.pause_circle:before {
			content: 'pause_circle';
		}
		:host > i.pause_circle_filled:before {
			content: 'pause_circle_filled';
		}
		:host > i.pause_circle_outline:before {
			content: 'pause_circle_outline';
		}
		:host > i.pause_presentation:before {
			content: 'pause_presentation';
		}
		:host > i.payment:before {
			content: 'payment';
		}
		:host > i.payments:before {
			content: 'payments';
		}
		:host > i.pedal_bike:before {
			content: 'pedal_bike';
		}
		:host > i.pediatrics:before {
			content: 'pediatrics';
		}
		:host > i.pen_size_1:before {
			content: 'pen_size_1';
		}
		:host > i.pen_size_2:before {
			content: 'pen_size_2';
		}
		:host > i.pen_size_3:before {
			content: 'pen_size_3';
		}
		:host > i.pen_size_4:before {
			content: 'pen_size_4';
		}
		:host > i.pen_size_5:before {
			content: 'pen_size_5';
		}
		:host > i.pending:before {
			content: 'pending';
		}
		:host > i.pending_actions:before {
			content: 'pending_actions';
		}
		:host > i.pentagon:before {
			content: 'pentagon';
		}
		:host > i.people:before {
			content: 'people';
		}
		:host > i.people_alt:before {
			content: 'people_alt';
		}
		:host > i.people_outline:before {
			content: 'people_outline';
		}
		:host > i.percent:before {
			content: 'percent';
		}
		:host > i.performance_max:before {
			content: 'performance_max';
		}
		:host > i.pergola:before {
			content: 'pergola';
		}
		:host > i.perm_camera_mic:before {
			content: 'perm_camera_mic';
		}
		:host > i.perm_contact_calendar:before {
			content: 'perm_contact_calendar';
		}
		:host > i.perm_data_setting:before {
			content: 'perm_data_setting';
		}
		:host > i.perm_device_information:before {
			content: 'perm_device_information';
		}
		:host > i.perm_identity:before {
			content: 'perm_identity';
		}
		:host > i.perm_media:before {
			content: 'perm_media';
		}
		:host > i.perm_phone_msg:before {
			content: 'perm_phone_msg';
		}
		:host > i.perm_scan_wifi:before {
			content: 'perm_scan_wifi';
		}
		:host > i.person:before {
			content: 'person';
		}
		:host > i.person_2:before {
			content: 'person_2';
		}
		:host > i.person_3:before {
			content: 'person_3';
		}
		:host > i.person_4:before {
			content: 'person_4';
		}
		:host > i.person_add:before {
			content: 'person_add';
		}
		:host > i.person_add_alt:before {
			content: 'person_add_alt';
		}
		:host > i.person_add_disabled:before {
			content: 'person_add_disabled';
		}
		:host > i.person_alert:before {
			content: 'person_alert';
		}
		:host > i.person_apron:before {
			content: 'person_apron';
		}
		:host > i.person_book:before {
			content: 'person_book';
		}
		:host > i.person_cancel:before {
			content: 'person_cancel';
		}
		:host > i.person_celebrate:before {
			content: 'person_celebrate';
		}
		:host > i.person_check:before {
			content: 'person_check';
		}
		:host > i.person_edit:before {
			content: 'person_edit';
		}
		:host > i.person_filled:before {
			content: 'person_filled';
		}
		:host > i.person_off:before {
			content: 'person_off';
		}
		:host > i.person_outline:before {
			content: 'person_outline';
		}
		:host > i.person_pin:before {
			content: 'person_pin';
		}
		:host > i.person_pin_circle:before {
			content: 'person_pin_circle';
		}
		:host > i.person_play:before {
			content: 'person_play';
		}
		:host > i.person_raised_hand:before {
			content: 'person_raised_hand';
		}
		:host > i.person_remove:before {
			content: 'person_remove';
		}
		:host > i.person_search:before {
			content: 'person_search';
		}
		:host > i.personal_bag:before {
			content: 'personal_bag';
		}
		:host > i.personal_bag_off:before {
			content: 'personal_bag_off';
		}
		:host > i.personal_bag_question:before {
			content: 'personal_bag_question';
		}
		:host > i.personal_injury:before {
			content: 'personal_injury';
		}
		:host > i.personal_places:before {
			content: 'personal_places';
		}
		:host > i.personal_video:before {
			content: 'personal_video';
		}
		:host > i.pest_control:before {
			content: 'pest_control';
		}
		:host > i.pest_control_rodent:before {
			content: 'pest_control_rodent';
		}
		:host > i.pet_supplies:before {
			content: 'pet_supplies';
		}
		:host > i.pets:before {
			content: 'pets';
		}
		:host > i.phishing:before {
			content: 'phishing';
		}
		:host > i.phone:before {
			content: 'phone';
		}
		:host > i.phone_alt:before {
			content: 'phone_alt';
		}
		:host > i.phone_android:before {
			content: 'phone_android';
		}
		:host > i.phone_bluetooth_speaker:before {
			content: 'phone_bluetooth_speaker';
		}
		:host > i.phone_callback:before {
			content: 'phone_callback';
		}
		:host > i.phone_disabled:before {
			content: 'phone_disabled';
		}
		:host > i.phone_enabled:before {
			content: 'phone_enabled';
		}
		:host > i.phone_forwarded:before {
			content: 'phone_forwarded';
		}
		:host > i.phone_in_talk:before {
			content: 'phone_in_talk';
		}
		:host > i.phone_iphone:before {
			content: 'phone_iphone';
		}
		:host > i.phone_locked:before {
			content: 'phone_locked';
		}
		:host > i.phone_missed:before {
			content: 'phone_missed';
		}
		:host > i.phone_paused:before {
			content: 'phone_paused';
		}
		:host > i.phonelink:before {
			content: 'phonelink';
		}
		:host > i.phonelink_erase:before {
			content: 'phonelink_erase';
		}
		:host > i.phonelink_lock:before {
			content: 'phonelink_lock';
		}
		:host > i.phonelink_off:before {
			content: 'phonelink_off';
		}
		:host > i.phonelink_ring:before {
			content: 'phonelink_ring';
		}
		:host > i.phonelink_ring_off:before {
			content: 'phonelink_ring_off';
		}
		:host > i.phonelink_setup:before {
			content: 'phonelink_setup';
		}
		:host > i.photo:before {
			content: 'photo';
		}
		:host > i.photo_album:before {
			content: 'photo_album';
		}
		:host > i.photo_auto_merge:before {
			content: 'photo_auto_merge';
		}
		:host > i.photo_camera:before {
			content: 'photo_camera';
		}
		:host > i.photo_camera_back:before {
			content: 'photo_camera_back';
		}
		:host > i.photo_camera_front:before {
			content: 'photo_camera_front';
		}
		:host > i.photo_filter:before {
			content: 'photo_filter';
		}
		:host > i.photo_frame:before {
			content: 'photo_frame';
		}
		:host > i.photo_library:before {
			content: 'photo_library';
		}
		:host > i.photo_prints:before {
			content: 'photo_prints';
		}
		:host > i.photo_size_select_actual:before {
			content: 'photo_size_select_actual';
		}
		:host > i.photo_size_select_large:before {
			content: 'photo_size_select_large';
		}
		:host > i.photo_size_select_small:before {
			content: 'photo_size_select_small';
		}
		:host > i.php:before {
			content: 'php';
		}
		:host > i.physical_therapy:before {
			content: 'physical_therapy';
		}
		:host > i.piano:before {
			content: 'piano';
		}
		:host > i.piano_off:before {
			content: 'piano_off';
		}
		:host > i.picture_as_pdf:before {
			content: 'picture_as_pdf';
		}
		:host > i.picture_in_picture:before {
			content: 'picture_in_picture';
		}
		:host > i.picture_in_picture_alt:before {
			content: 'picture_in_picture_alt';
		}
		:host > i.picture_in_picture_center:before {
			content: 'picture_in_picture_center';
		}
		:host > i.picture_in_picture_large:before {
			content: 'picture_in_picture_large';
		}
		:host > i.picture_in_picture_medium:before {
			content: 'picture_in_picture_medium';
		}
		:host > i.picture_in_picture_mobile:before {
			content: 'picture_in_picture_mobile';
		}
		:host > i.picture_in_picture_off:before {
			content: 'picture_in_picture_off';
		}
		:host > i.picture_in_picture_small:before {
			content: 'picture_in_picture_small';
		}
		:host > i.pie_chart:before {
			content: 'pie_chart';
		}
		:host > i.pie_chart_filled:before {
			content: 'pie_chart_filled';
		}
		:host > i.pie_chart_outline:before {
			content: 'pie_chart_outline';
		}
		:host > i.pie_chart_outlined:before {
			content: 'pie_chart_outlined';
		}
		:host > i.pill:before {
			content: 'pill';
		}
		:host > i.pill_off:before {
			content: 'pill_off';
		}
		:host > i.pin:before {
			content: 'pin';
		}
		:host > i.pin_drop:before {
			content: 'pin_drop';
		}
		:host > i.pin_end:before {
			content: 'pin_end';
		}
		:host > i.pin_invoke:before {
			content: 'pin_invoke';
		}
		:host > i.pinch:before {
			content: 'pinch';
		}
		:host > i.pinch_zoom_in:before {
			content: 'pinch_zoom_in';
		}
		:host > i.pinch_zoom_out:before {
			content: 'pinch_zoom_out';
		}
		:host > i.pip:before {
			content: 'pip';
		}
		:host > i.pip_exit:before {
			content: 'pip_exit';
		}
		:host > i.pivot_table_chart:before {
			content: 'pivot_table_chart';
		}
		:host > i.place:before {
			content: 'place';
		}
		:host > i.place_item:before {
			content: 'place_item';
		}
		:host > i.plagiarism:before {
			content: 'plagiarism';
		}
		:host > i.planner_banner_ad_pt:before {
			content: 'planner_banner_ad_pt';
		}
		:host > i.planner_review:before {
			content: 'planner_review';
		}
		:host > i.play_arrow:before {
			content: 'play_arrow';
		}
		:host > i.play_circle:before {
			content: 'play_circle';
		}
		:host > i.play_disabled:before {
			content: 'play_disabled';
		}
		:host > i.play_for_work:before {
			content: 'play_for_work';
		}
		:host > i.play_lesson:before {
			content: 'play_lesson';
		}
		:host > i.play_music:before {
			content: 'play_music';
		}
		:host > i.play_pause:before {
			content: 'play_pause';
		}
		:host > i.play_shapes:before {
			content: 'play_shapes';
		}
		:host > i.playing_cards:before {
			content: 'playing_cards';
		}
		:host > i.playlist_add:before {
			content: 'playlist_add';
		}
		:host > i.playlist_add_check:before {
			content: 'playlist_add_check';
		}
		:host > i.playlist_add_check_circle:before {
			content: 'playlist_add_check_circle';
		}
		:host > i.playlist_add_circle:before {
			content: 'playlist_add_circle';
		}
		:host > i.playlist_play:before {
			content: 'playlist_play';
		}
		:host > i.playlist_remove:before {
			content: 'playlist_remove';
		}
		:host > i.plumbing:before {
			content: 'plumbing';
		}
		:host > i.plus_one:before {
			content: 'plus_one';
		}
		:host > i.podcasts:before {
			content: 'podcasts';
		}
		:host > i.podiatry:before {
			content: 'podiatry';
		}
		:host > i.podium:before {
			content: 'podium';
		}
		:host > i.point_of_sale:before {
			content: 'point_of_sale';
		}
		:host > i.point_scan:before {
			content: 'point_scan';
		}
		:host > i.policy:before {
			content: 'policy';
		}
		:host > i.poll:before {
			content: 'poll';
		}
		:host > i.polyline:before {
			content: 'polyline';
		}
		:host > i.polymer:before {
			content: 'polymer';
		}
		:host > i.pool:before {
			content: 'pool';
		}
		:host > i.portable_wifi_off:before {
			content: 'portable_wifi_off';
		}
		:host > i.portrait:before {
			content: 'portrait';
		}
		:host > i.position_bottom_left:before {
			content: 'position_bottom_left';
		}
		:host > i.position_bottom_right:before {
			content: 'position_bottom_right';
		}
		:host > i.position_top_right:before {
			content: 'position_top_right';
		}
		:host > i.post:before {
			content: 'post';
		}
		:host > i.post_add:before {
			content: 'post_add';
		}
		:host > i.potted_plant:before {
			content: 'potted_plant';
		}
		:host > i.power:before {
			content: 'power';
		}
		:host > i.power_input:before {
			content: 'power_input';
		}
		:host > i.power_off:before {
			content: 'power_off';
		}
		:host > i.power_rounded:before {
			content: 'power_rounded';
		}
		:host > i.power_settings_new:before {
			content: 'power_settings_new';
		}
		:host > i.prayer_times:before {
			content: 'prayer_times';
		}
		:host > i.precision_manufacturing:before {
			content: 'precision_manufacturing';
		}
		:host > i.pregnancy:before {
			content: 'pregnancy';
		}
		:host > i.pregnant_woman:before {
			content: 'pregnant_woman';
		}
		:host > i.preliminary:before {
			content: 'preliminary';
		}
		:host > i.prescriptions:before {
			content: 'prescriptions';
		}
		:host > i.present_to_all:before {
			content: 'present_to_all';
		}
		:host > i.preview:before {
			content: 'preview';
		}
		:host > i.preview_off:before {
			content: 'preview_off';
		}
		:host > i.price_change:before {
			content: 'price_change';
		}
		:host > i.price_check:before {
			content: 'price_check';
		}
		:host > i.print:before {
			content: 'print';
		}
		:host > i.print_add:before {
			content: 'print_add';
		}
		:host > i.print_connect:before {
			content: 'print_connect';
		}
		:host > i.print_disabled:before {
			content: 'print_disabled';
		}
		:host > i.print_error:before {
			content: 'print_error';
		}
		:host > i.print_lock:before {
			content: 'print_lock';
		}
		:host > i.priority:before {
			content: 'priority';
		}
		:host > i.priority_high:before {
			content: 'priority_high';
		}
		:host > i.privacy:before {
			content: 'privacy';
		}
		:host > i.privacy_tip:before {
			content: 'privacy_tip';
		}
		:host > i.private_connectivity:before {
			content: 'private_connectivity';
		}
		:host > i.problem:before {
			content: 'problem';
		}
		:host > i.procedure:before {
			content: 'procedure';
		}
		:host > i.process_chart:before {
			content: 'process_chart';
		}
		:host > i.production_quantity_limits:before {
			content: 'production_quantity_limits';
		}
		:host > i.productivity:before {
			content: 'productivity';
		}
		:host > i.progress_activity:before {
			content: 'progress_activity';
		}
		:host > i.prompt_suggestion:before {
			content: 'prompt_suggestion';
		}
		:host > i.propane:before {
			content: 'propane';
		}
		:host > i.propane_tank:before {
			content: 'propane_tank';
		}
		:host > i.psychiatry:before {
			content: 'psychiatry';
		}
		:host > i.psychology:before {
			content: 'psychology';
		}
		:host > i.psychology_alt:before {
			content: 'psychology_alt';
		}
		:host > i.public:before {
			content: 'public';
		}
		:host > i.public_off:before {
			content: 'public_off';
		}
		:host > i.publish:before {
			content: 'publish';
		}
		:host > i.published_with_changes:before {
			content: 'published_with_changes';
		}
		:host > i.pulmonology:before {
			content: 'pulmonology';
		}
		:host > i.pulse_alert:before {
			content: 'pulse_alert';
		}
		:host > i.punch_clock:before {
			content: 'punch_clock';
		}
		:host > i.push_pin:before {
			content: 'push_pin';
		}
		:host > i.qr_code:before {
			content: 'qr_code';
		}
		:host > i.qr_code_2:before {
			content: 'qr_code_2';
		}
		:host > i.qr_code_2_add:before {
			content: 'qr_code_2_add';
		}
		:host > i.qr_code_scanner:before {
			content: 'qr_code_scanner';
		}
		:host > i.query_builder:before {
			content: 'query_builder';
		}
		:host > i.query_stats:before {
			content: 'query_stats';
		}
		:host > i.question_answer:before {
			content: 'question_answer';
		}
		:host > i.question_exchange:before {
			content: 'question_exchange';
		}
		:host > i.question_mark:before {
			content: 'question_mark';
		}
		:host > i.queue:before {
			content: 'queue';
		}
		:host > i.queue_music:before {
			content: 'queue_music';
		}
		:host > i.queue_play_next:before {
			content: 'queue_play_next';
		}
		:host > i.quick_phrases:before {
			content: 'quick_phrases';
		}
		:host > i.quick_reference:before {
			content: 'quick_reference';
		}
		:host > i.quick_reference_all:before {
			content: 'quick_reference_all';
		}
		:host > i.quick_reorder:before {
			content: 'quick_reorder';
		}
		:host > i.quickreply:before {
			content: 'quickreply';
		}
		:host > i.quiet_time:before {
			content: 'quiet_time';
		}
		:host > i.quiet_time_active:before {
			content: 'quiet_time_active';
		}
		:host > i.quiz:before {
			content: 'quiz';
		}
		:host > i.r_mobiledata:before {
			content: 'r_mobiledata';
		}
		:host > i.radar:before {
			content: 'radar';
		}
		:host > i.radio:before {
			content: 'radio';
		}
		:host > i.radio_button_checked:before {
			content: 'radio_button_checked';
		}
		:host > i.radio_button_partial:before {
			content: 'radio_button_partial';
		}
		:host > i.radio_button_unchecked:before {
			content: 'radio_button_unchecked';
		}
		:host > i.radiology:before {
			content: 'radiology';
		}
		:host > i.railway_alert:before {
			content: 'railway_alert';
		}
		:host > i.rainy:before {
			content: 'rainy';
		}
		:host > i.rainy_heavy:before {
			content: 'rainy_heavy';
		}
		:host > i.rainy_light:before {
			content: 'rainy_light';
		}
		:host > i.rainy_snow:before {
			content: 'rainy_snow';
		}
		:host > i.ramen_dining:before {
			content: 'ramen_dining';
		}
		:host > i.ramp_left:before {
			content: 'ramp_left';
		}
		:host > i.ramp_right:before {
			content: 'ramp_right';
		}
		:host > i.range_hood:before {
			content: 'range_hood';
		}
		:host > i.rate_review:before {
			content: 'rate_review';
		}
		:host > i.raven:before {
			content: 'raven';
		}
		:host > i.raw_off:before {
			content: 'raw_off';
		}
		:host > i.raw_on:before {
			content: 'raw_on';
		}
		:host > i.read_more:before {
			content: 'read_more';
		}
		:host > i.readiness_score:before {
			content: 'readiness_score';
		}
		:host > i.real_estate_agent:before {
			content: 'real_estate_agent';
		}
		:host > i.rear_camera:before {
			content: 'rear_camera';
		}
		:host > i.rebase:before {
			content: 'rebase';
		}
		:host > i.rebase_edit:before {
			content: 'rebase_edit';
		}
		:host > i.receipt:before {
			content: 'receipt';
		}
		:host > i.receipt_long:before {
			content: 'receipt_long';
		}
		:host > i.recent_actors:before {
			content: 'recent_actors';
		}
		:host > i.recent_patient:before {
			content: 'recent_patient';
		}
		:host > i.recommend:before {
			content: 'recommend';
		}
		:host > i.record_voice_over:before {
			content: 'record_voice_over';
		}
		:host > i.rectangle:before {
			content: 'rectangle';
		}
		:host > i.recycling:before {
			content: 'recycling';
		}
		:host > i.redeem:before {
			content: 'redeem';
		}
		:host > i.redo:before {
			content: 'redo';
		}
		:host > i.reduce_capacity:before {
			content: 'reduce_capacity';
		}
		:host > i.refresh:before {
			content: 'refresh';
		}
		:host > i.regular_expression:before {
			content: 'regular_expression';
		}
		:host > i.relax:before {
			content: 'relax';
		}
		:host > i.release_alert:before {
			content: 'release_alert';
		}
		:host > i.remember_me:before {
			content: 'remember_me';
		}
		:host > i.reminder:before {
			content: 'reminder';
		}
		:host > i.reminders_alt:before {
			content: 'reminders_alt';
		}
		:host > i.remote_gen:before {
			content: 'remote_gen';
		}
		:host > i.remove:before {
			content: 'remove';
		}
		:host > i.remove_circle:before {
			content: 'remove_circle';
		}
		:host > i.remove_circle_outline:before {
			content: 'remove_circle_outline';
		}
		:host > i.remove_done:before {
			content: 'remove_done';
		}
		:host > i.remove_from_queue:before {
			content: 'remove_from_queue';
		}
		:host > i.remove_moderator:before {
			content: 'remove_moderator';
		}
		:host > i.remove_red_eye:before {
			content: 'remove_red_eye';
		}
		:host > i.remove_road:before {
			content: 'remove_road';
		}
		:host > i.remove_selection:before {
			content: 'remove_selection';
		}
		:host > i.remove_shopping_cart:before {
			content: 'remove_shopping_cart';
		}
		:host > i.reopen_window:before {
			content: 'reopen_window';
		}
		:host > i.reorder:before {
			content: 'reorder';
		}
		:host > i.repartition:before {
			content: 'repartition';
		}
		:host > i.repeat:before {
			content: 'repeat';
		}
		:host > i.repeat_on:before {
			content: 'repeat_on';
		}
		:host > i.repeat_one:before {
			content: 'repeat_one';
		}
		:host > i.repeat_one_on:before {
			content: 'repeat_one_on';
		}
		:host > i.replay:before {
			content: 'replay';
		}
		:host > i.replay_10:before {
			content: 'replay_10';
		}
		:host > i.replay_30:before {
			content: 'replay_30';
		}
		:host > i.replay_5:before {
			content: 'replay_5';
		}
		:host > i.replay_circle_filled:before {
			content: 'replay_circle_filled';
		}
		:host > i.reply:before {
			content: 'reply';
		}
		:host > i.reply_all:before {
			content: 'reply_all';
		}
		:host > i.report:before {
			content: 'report';
		}
		:host > i.report_gmailerrorred:before {
			content: 'report_gmailerrorred';
		}
		:host > i.report_off:before {
			content: 'report_off';
		}
		:host > i.report_problem:before {
			content: 'report_problem';
		}
		:host > i.request_page:before {
			content: 'request_page';
		}
		:host > i.request_quote:before {
			content: 'request_quote';
		}
		:host > i.reset_image:before {
			content: 'reset_image';
		}
		:host > i.reset_tv:before {
			content: 'reset_tv';
		}
		:host > i.reset_wrench:before {
			content: 'reset_wrench';
		}
		:host > i.resize:before {
			content: 'resize';
		}
		:host > i.respiratory_rate:before {
			content: 'respiratory_rate';
		}
		:host > i.responsive_layout:before {
			content: 'responsive_layout';
		}
		:host > i.restart_alt:before {
			content: 'restart_alt';
		}
		:host > i.restaurant:before {
			content: 'restaurant';
		}
		:host > i.restaurant_menu:before {
			content: 'restaurant_menu';
		}
		:host > i.restore:before {
			content: 'restore';
		}
		:host > i.restore_from_trash:before {
			content: 'restore_from_trash';
		}
		:host > i.restore_page:before {
			content: 'restore_page';
		}
		:host > i.resume:before {
			content: 'resume';
		}
		:host > i.reviews:before {
			content: 'reviews';
		}
		:host > i.rewarded_ads:before {
			content: 'rewarded_ads';
		}
		:host > i.rheumatology:before {
			content: 'rheumatology';
		}
		:host > i.rib_cage:before {
			content: 'rib_cage';
		}
		:host > i.rice_bowl:before {
			content: 'rice_bowl';
		}
		:host > i.right_click:before {
			content: 'right_click';
		}
		:host > i.right_panel_close:before {
			content: 'right_panel_close';
		}
		:host > i.right_panel_open:before {
			content: 'right_panel_open';
		}
		:host > i.ring_volume:before {
			content: 'ring_volume';
		}
		:host > i.ring_volume_filled:before {
			content: 'ring_volume_filled';
		}
		:host > i.ripples:before {
			content: 'ripples';
		}
		:host > i.robot:before {
			content: 'robot';
		}
		:host > i.robot_2:before {
			content: 'robot_2';
		}
		:host > i.rocket:before {
			content: 'rocket';
		}
		:host > i.rocket_launch:before {
			content: 'rocket_launch';
		}
		:host > i.roller_shades:before {
			content: 'roller_shades';
		}
		:host > i.roller_shades_closed:before {
			content: 'roller_shades_closed';
		}
		:host > i.roller_skating:before {
			content: 'roller_skating';
		}
		:host > i.roofing:before {
			content: 'roofing';
		}
		:host > i.room:before {
			content: 'room';
		}
		:host > i.room_preferences:before {
			content: 'room_preferences';
		}
		:host > i.room_service:before {
			content: 'room_service';
		}
		:host > i.rotate_90_degrees_ccw:before {
			content: 'rotate_90_degrees_ccw';
		}
		:host > i.rotate_90_degrees_cw:before {
			content: 'rotate_90_degrees_cw';
		}
		:host > i.rotate_left:before {
			content: 'rotate_left';
		}
		:host > i.rotate_right:before {
			content: 'rotate_right';
		}
		:host > i.roundabout_left:before {
			content: 'roundabout_left';
		}
		:host > i.roundabout_right:before {
			content: 'roundabout_right';
		}
		:host > i.rounded_corner:before {
			content: 'rounded_corner';
		}
		:host > i.route:before {
			content: 'route';
		}
		:host > i.router:before {
			content: 'router';
		}
		:host > i.routine:before {
			content: 'routine';
		}
		:host > i.rowing:before {
			content: 'rowing';
		}
		:host > i.rss_feed:before {
			content: 'rss_feed';
		}
		:host > i.rsvp:before {
			content: 'rsvp';
		}
		:host > i.rtt:before {
			content: 'rtt';
		}
		:host > i.rubric:before {
			content: 'rubric';
		}
		:host > i.rule:before {
			content: 'rule';
		}
		:host > i.rule_folder:before {
			content: 'rule_folder';
		}
		:host > i.rule_settings:before {
			content: 'rule_settings';
		}
		:host > i.run_circle:before {
			content: 'run_circle';
		}
		:host > i.running_with_errors:before {
			content: 'running_with_errors';
		}
		:host > i.rv_hookup:before {
			content: 'rv_hookup';
		}
		:host > i.safety_check:before {
			content: 'safety_check';
		}
		:host > i.safety_check_off:before {
			content: 'safety_check_off';
		}
		:host > i.safety_divider:before {
			content: 'safety_divider';
		}
		:host > i.sailing:before {
			content: 'sailing';
		}
		:host > i.salinity:before {
			content: 'salinity';
		}
		:host > i.sanitizer:before {
			content: 'sanitizer';
		}
		:host > i.satellite:before {
			content: 'satellite';
		}
		:host > i.satellite_alt:before {
			content: 'satellite_alt';
		}
		:host > i.sauna:before {
			content: 'sauna';
		}
		:host > i.save:before {
			content: 'save';
		}
		:host > i.save_alt:before {
			content: 'save_alt';
		}
		:host > i.save_as:before {
			content: 'save_as';
		}
		:host > i.saved_search:before {
			content: 'saved_search';
		}
		:host > i.savings:before {
			content: 'savings';
		}
		:host > i.scale:before {
			content: 'scale';
		}
		:host > i.scan:before {
			content: 'scan';
		}
		:host > i.scan_delete:before {
			content: 'scan_delete';
		}
		:host > i.scanner:before {
			content: 'scanner';
		}
		:host > i.scatter_plot:before {
			content: 'scatter_plot';
		}
		:host > i.scene:before {
			content: 'scene';
		}
		:host > i.schedule:before {
			content: 'schedule';
		}
		:host > i.schedule_send:before {
			content: 'schedule_send';
		}
		:host > i.schema:before {
			content: 'schema';
		}
		:host > i.school:before {
			content: 'school';
		}
		:host > i.science:before {
			content: 'science';
		}
		:host > i.science_off:before {
			content: 'science_off';
		}
		:host > i.score:before {
			content: 'score';
		}
		:host > i.scoreboard:before {
			content: 'scoreboard';
		}
		:host > i.screen_lock_landscape:before {
			content: 'screen_lock_landscape';
		}
		:host > i.screen_lock_portrait:before {
			content: 'screen_lock_portrait';
		}
		:host > i.screen_lock_rotation:before {
			content: 'screen_lock_rotation';
		}
		:host > i.screen_record:before {
			content: 'screen_record';
		}
		:host > i.screen_rotation:before {
			content: 'screen_rotation';
		}
		:host > i.screen_rotation_alt:before {
			content: 'screen_rotation_alt';
		}
		:host > i.screen_rotation_up:before {
			content: 'screen_rotation_up';
		}
		:host > i.screen_search_desktop:before {
			content: 'screen_search_desktop';
		}
		:host > i.screen_share:before {
			content: 'screen_share';
		}
		:host > i.screenshot:before {
			content: 'screenshot';
		}
		:host > i.screenshot_frame:before {
			content: 'screenshot_frame';
		}
		:host > i.screenshot_keyboard:before {
			content: 'screenshot_keyboard';
		}
		:host > i.screenshot_monitor:before {
			content: 'screenshot_monitor';
		}
		:host > i.screenshot_region:before {
			content: 'screenshot_region';
		}
		:host > i.screenshot_tablet:before {
			content: 'screenshot_tablet';
		}
		:host > i.scrollable_header:before {
			content: 'scrollable_header';
		}
		:host > i.scuba_diving:before {
			content: 'scuba_diving';
		}
		:host > i.sd:before {
			content: 'sd';
		}
		:host > i.sd_card:before {
			content: 'sd_card';
		}
		:host > i.sd_card_alert:before {
			content: 'sd_card_alert';
		}
		:host > i.sd_storage:before {
			content: 'sd_storage';
		}
		:host > i.sdk:before {
			content: 'sdk';
		}
		:host > i.search:before {
			content: 'search';
		}
		:host > i.search_check:before {
			content: 'search_check';
		}
		:host > i.search_hands_free:before {
			content: 'search_hands_free';
		}
		:host > i.search_off:before {
			content: 'search_off';
		}
		:host > i.security:before {
			content: 'security';
		}
		:host > i.security_key:before {
			content: 'security_key';
		}
		:host > i.security_update:before {
			content: 'security_update';
		}
		:host > i.security_update_good:before {
			content: 'security_update_good';
		}
		:host > i.security_update_warning:before {
			content: 'security_update_warning';
		}
		:host > i.segment:before {
			content: 'segment';
		}
		:host > i.select:before {
			content: 'select';
		}
		:host > i.select_all:before {
			content: 'select_all';
		}
		:host > i.select_check_box:before {
			content: 'select_check_box';
		}
		:host > i.select_to_speak:before {
			content: 'select_to_speak';
		}
		:host > i.select_window:before {
			content: 'select_window';
		}
		:host > i.select_window_off:before {
			content: 'select_window_off';
		}
		:host > i.self_care:before {
			content: 'self_care';
		}
		:host > i.self_improvement:before {
			content: 'self_improvement';
		}
		:host > i.sell:before {
			content: 'sell';
		}
		:host > i.send:before {
			content: 'send';
		}
		:host > i.send_and_archive:before {
			content: 'send_and_archive';
		}
		:host > i.send_money:before {
			content: 'send_money';
		}
		:host > i.send_time_extension:before {
			content: 'send_time_extension';
		}
		:host > i.send_to_mobile:before {
			content: 'send_to_mobile';
		}
		:host > i.sensor_door:before {
			content: 'sensor_door';
		}
		:host > i.sensor_occupied:before {
			content: 'sensor_occupied';
		}
		:host > i.sensor_window:before {
			content: 'sensor_window';
		}
		:host > i.sensors:before {
			content: 'sensors';
		}
		:host > i.sensors_krx:before {
			content: 'sensors_krx';
		}
		:host > i.sensors_krx_off:before {
			content: 'sensors_krx_off';
		}
		:host > i.sensors_off:before {
			content: 'sensors_off';
		}
		:host > i.sentiment_calm:before {
			content: 'sentiment_calm';
		}
		:host > i.sentiment_content:before {
			content: 'sentiment_content';
		}
		:host > i.sentiment_dissatisfied:before {
			content: 'sentiment_dissatisfied';
		}
		:host > i.sentiment_excited:before {
			content: 'sentiment_excited';
		}
		:host > i.sentiment_extremely_dissatisfied:before {
			content: 'sentiment_extremely_dissatisfied';
		}
		:host > i.sentiment_frustrated:before {
			content: 'sentiment_frustrated';
		}
		:host > i.sentiment_neutral:before {
			content: 'sentiment_neutral';
		}
		:host > i.sentiment_sad:before {
			content: 'sentiment_sad';
		}
		:host > i.sentiment_satisfied:before {
			content: 'sentiment_satisfied';
		}
		:host > i.sentiment_satisfied_alt:before {
			content: 'sentiment_satisfied_alt';
		}
		:host > i.sentiment_stressed:before {
			content: 'sentiment_stressed';
		}
		:host > i.sentiment_very_dissatisfied:before {
			content: 'sentiment_very_dissatisfied';
		}
		:host > i.sentiment_very_satisfied:before {
			content: 'sentiment_very_satisfied';
		}
		:host > i.sentiment_worried:before {
			content: 'sentiment_worried';
		}
		:host > i.service_toolbox:before {
			content: 'service_toolbox';
		}
		:host > i.set_meal:before {
			content: 'set_meal';
		}
		:host > i.settings:before {
			content: 'settings';
		}
		:host > i.settings_accessibility:before {
			content: 'settings_accessibility';
		}
		:host > i.settings_account_box:before {
			content: 'settings_account_box';
		}
		:host > i.settings_alert:before {
			content: 'settings_alert';
		}
		:host > i.settings_applications:before {
			content: 'settings_applications';
		}
		:host > i.settings_b_roll:before {
			content: 'settings_b_roll';
		}
		:host > i.settings_backup_restore:before {
			content: 'settings_backup_restore';
		}
		:host > i.settings_bluetooth:before {
			content: 'settings_bluetooth';
		}
		:host > i.settings_brightness:before {
			content: 'settings_brightness';
		}
		:host > i.settings_cell:before {
			content: 'settings_cell';
		}
		:host > i.settings_cinematic_blur:before {
			content: 'settings_cinematic_blur';
		}
		:host > i.settings_ethernet:before {
			content: 'settings_ethernet';
		}
		:host > i.settings_heart:before {
			content: 'settings_heart';
		}
		:host > i.settings_input_antenna:before {
			content: 'settings_input_antenna';
		}
		:host > i.settings_input_component:before {
			content: 'settings_input_component';
		}
		:host > i.settings_input_composite:before {
			content: 'settings_input_composite';
		}
		:host > i.settings_input_hdmi:before {
			content: 'settings_input_hdmi';
		}
		:host > i.settings_input_svideo:before {
			content: 'settings_input_svideo';
		}
		:host > i.settings_motion_mode:before {
			content: 'settings_motion_mode';
		}
		:host > i.settings_night_sight:before {
			content: 'settings_night_sight';
		}
		:host > i.settings_overscan:before {
			content: 'settings_overscan';
		}
		:host > i.settings_panorama:before {
			content: 'settings_panorama';
		}
		:host > i.settings_phone:before {
			content: 'settings_phone';
		}
		:host > i.settings_photo_camera:before {
			content: 'settings_photo_camera';
		}
		:host > i.settings_power:before {
			content: 'settings_power';
		}
		:host > i.settings_remote:before {
			content: 'settings_remote';
		}
		:host > i.settings_slow_motion:before {
			content: 'settings_slow_motion';
		}
		:host > i.settings_suggest:before {
			content: 'settings_suggest';
		}
		:host > i.settings_system_daydream:before {
			content: 'settings_system_daydream';
		}
		:host > i.settings_timelapse:before {
			content: 'settings_timelapse';
		}
		:host > i.settings_video_camera:before {
			content: 'settings_video_camera';
		}
		:host > i.settings_voice:before {
			content: 'settings_voice';
		}
		:host > i.settop_component:before {
			content: 'settop_component';
		}
		:host > i.severe_cold:before {
			content: 'severe_cold';
		}
		:host > i.shadow:before {
			content: 'shadow';
		}
		:host > i.shadow_add:before {
			content: 'shadow_add';
		}
		:host > i.shadow_minus:before {
			content: 'shadow_minus';
		}
		:host > i.shape_line:before {
			content: 'shape_line';
		}
		:host > i.shape_recognition:before {
			content: 'shape_recognition';
		}
		:host > i.shapes:before {
			content: 'shapes';
		}
		:host > i.share:before {
			content: 'share';
		}
		:host > i.share_location:before {
			content: 'share_location';
		}
		:host > i.share_off:before {
			content: 'share_off';
		}
		:host > i.share_reviews:before {
			content: 'share_reviews';
		}
		:host > i.share_windows:before {
			content: 'share_windows';
		}
		:host > i.sheets_rtl:before {
			content: 'sheets_rtl';
		}
		:host > i.shelf_auto_hide:before {
			content: 'shelf_auto_hide';
		}
		:host > i.shelf_position:before {
			content: 'shelf_position';
		}
		:host > i.shelves:before {
			content: 'shelves';
		}
		:host > i.shield:before {
			content: 'shield';
		}
		:host > i.shield_lock:before {
			content: 'shield_lock';
		}
		:host > i.shield_locked:before {
			content: 'shield_locked';
		}
		:host > i.shield_moon:before {
			content: 'shield_moon';
		}
		:host > i.shield_person:before {
			content: 'shield_person';
		}
		:host > i.shield_question:before {
			content: 'shield_question';
		}
		:host > i.shield_with_heart:before {
			content: 'shield_with_heart';
		}
		:host > i.shield_with_house:before {
			content: 'shield_with_house';
		}
		:host > i.shift:before {
			content: 'shift';
		}
		:host > i.shift_lock:before {
			content: 'shift_lock';
		}
		:host > i.shop:before {
			content: 'shop';
		}
		:host > i.shop_2:before {
			content: 'shop_2';
		}
		:host > i.shop_two:before {
			content: 'shop_two';
		}
		:host > i.shopping_bag:before {
			content: 'shopping_bag';
		}
		:host > i.shopping_basket:before {
			content: 'shopping_basket';
		}
		:host > i.shopping_cart:before {
			content: 'shopping_cart';
		}
		:host > i.shopping_cart_checkout:before {
			content: 'shopping_cart_checkout';
		}
		:host > i.shopping_cart_off:before {
			content: 'shopping_cart_off';
		}
		:host > i.shoppingmode:before {
			content: 'shoppingmode';
		}
		:host > i.short_stay:before {
			content: 'short_stay';
		}
		:host > i.short_text:before {
			content: 'short_text';
		}
		:host > i.shortcut:before {
			content: 'shortcut';
		}
		:host > i.show_chart:before {
			content: 'show_chart';
		}
		:host > i.shower:before {
			content: 'shower';
		}
		:host > i.shuffle:before {
			content: 'shuffle';
		}
		:host > i.shuffle_on:before {
			content: 'shuffle_on';
		}
		:host > i.shutter_speed:before {
			content: 'shutter_speed';
		}
		:host > i.shutter_speed_add:before {
			content: 'shutter_speed_add';
		}
		:host > i.shutter_speed_minus:before {
			content: 'shutter_speed_minus';
		}
		:host > i.sick:before {
			content: 'sick';
		}
		:host > i.side_navigation:before {
			content: 'side_navigation';
		}
		:host > i.sign_language:before {
			content: 'sign_language';
		}
		:host > i.signal_cellular_0_bar:before {
			content: 'signal_cellular_0_bar';
		}
		:host > i.signal_cellular_1_bar:before {
			content: 'signal_cellular_1_bar';
		}
		:host > i.signal_cellular_2_bar:before {
			content: 'signal_cellular_2_bar';
		}
		:host > i.signal_cellular_3_bar:before {
			content: 'signal_cellular_3_bar';
		}
		:host > i.signal_cellular_4_bar:before {
			content: 'signal_cellular_4_bar';
		}
		:host > i.signal_cellular_add:before {
			content: 'signal_cellular_add';
		}
		:host > i.signal_cellular_alt:before {
			content: 'signal_cellular_alt';
		}
		:host > i.signal_cellular_alt_1_bar:before {
			content: 'signal_cellular_alt_1_bar';
		}
		:host > i.signal_cellular_alt_2_bar:before {
			content: 'signal_cellular_alt_2_bar';
		}
		:host > i.signal_cellular_connected_no_internet_0_bar:before {
			content: 'signal_cellular_connected_no_internet_0_bar';
		}
		:host > i.signal_cellular_connected_no_internet_4_bar:before {
			content: 'signal_cellular_connected_no_internet_4_bar';
		}
		:host > i.signal_cellular_no_sim:before {
			content: 'signal_cellular_no_sim';
		}
		:host > i.signal_cellular_nodata:before {
			content: 'signal_cellular_nodata';
		}
		:host > i.signal_cellular_null:before {
			content: 'signal_cellular_null';
		}
		:host > i.signal_cellular_off:before {
			content: 'signal_cellular_off';
		}
		:host > i.signal_cellular_pause:before {
			content: 'signal_cellular_pause';
		}
		:host > i.signal_disconnected:before {
			content: 'signal_disconnected';
		}
		:host > i.signal_wifi_0_bar:before {
			content: 'signal_wifi_0_bar';
		}
		:host > i.signal_wifi_4_bar:before {
			content: 'signal_wifi_4_bar';
		}
		:host > i.signal_wifi_4_bar_lock:before {
			content: 'signal_wifi_4_bar_lock';
		}
		:host > i.signal_wifi_bad:before {
			content: 'signal_wifi_bad';
		}
		:host > i.signal_wifi_connected_no_internet_4:before {
			content: 'signal_wifi_connected_no_internet_4';
		}
		:host > i.signal_wifi_off:before {
			content: 'signal_wifi_off';
		}
		:host > i.signal_wifi_statusbar_4_bar:before {
			content: 'signal_wifi_statusbar_4_bar';
		}
		:host > i.signal_wifi_statusbar_not_connected:before {
			content: 'signal_wifi_statusbar_not_connected';
		}
		:host > i.signal_wifi_statusbar_null:before {
			content: 'signal_wifi_statusbar_null';
		}
		:host > i.signature:before {
			content: 'signature';
		}
		:host > i.signpost:before {
			content: 'signpost';
		}
		:host > i.sim_card:before {
			content: 'sim_card';
		}
		:host > i.sim_card_alert:before {
			content: 'sim_card_alert';
		}
		:host > i.sim_card_download:before {
			content: 'sim_card_download';
		}
		:host > i.single_bed:before {
			content: 'single_bed';
		}
		:host > i.sip:before {
			content: 'sip';
		}
		:host > i.skateboarding:before {
			content: 'skateboarding';
		}
		:host > i.skeleton:before {
			content: 'skeleton';
		}
		:host > i.skillet:before {
			content: 'skillet';
		}
		:host > i.skillet_cooktop:before {
			content: 'skillet_cooktop';
		}
		:host > i.skip_next:before {
			content: 'skip_next';
		}
		:host > i.skip_previous:before {
			content: 'skip_previous';
		}
		:host > i.skull:before {
			content: 'skull';
		}
		:host > i.sledding:before {
			content: 'sledding';
		}
		:host > i.sleep:before {
			content: 'sleep';
		}
		:host > i.sleep_score:before {
			content: 'sleep_score';
		}
		:host > i.slide_library:before {
			content: 'slide_library';
		}
		:host > i.sliders:before {
			content: 'sliders';
		}
		:host > i.slideshow:before {
			content: 'slideshow';
		}
		:host > i.slow_motion_video:before {
			content: 'slow_motion_video';
		}
		:host > i.smart_button:before {
			content: 'smart_button';
		}
		:host > i.smart_display:before {
			content: 'smart_display';
		}
		:host > i.smart_outlet:before {
			content: 'smart_outlet';
		}
		:host > i.smart_screen:before {
			content: 'smart_screen';
		}
		:host > i.smart_toy:before {
			content: 'smart_toy';
		}
		:host > i.smartphone:before {
			content: 'smartphone';
		}
		:host > i.smb_share:before {
			content: 'smb_share';
		}
		:host > i.smoke_free:before {
			content: 'smoke_free';
		}
		:host > i.smoking_rooms:before {
			content: 'smoking_rooms';
		}
		:host > i.sms:before {
			content: 'sms';
		}
		:host > i.sms_failed:before {
			content: 'sms_failed';
		}
		:host > i.snippet_folder:before {
			content: 'snippet_folder';
		}
		:host > i.snooze:before {
			content: 'snooze';
		}
		:host > i.snowboarding:before {
			content: 'snowboarding';
		}
		:host > i.snowing:before {
			content: 'snowing';
		}
		:host > i.snowing_heavy:before {
			content: 'snowing_heavy';
		}
		:host > i.snowmobile:before {
			content: 'snowmobile';
		}
		:host > i.snowshoeing:before {
			content: 'snowshoeing';
		}
		:host > i.soap:before {
			content: 'soap';
		}
		:host > i.social_distance:before {
			content: 'social_distance';
		}
		:host > i.social_leaderboard:before {
			content: 'social_leaderboard';
		}
		:host > i.solar_power:before {
			content: 'solar_power';
		}
		:host > i.sort:before {
			content: 'sort';
		}
		:host > i.sort_by_alpha:before {
			content: 'sort_by_alpha';
		}
		:host > i.sos:before {
			content: 'sos';
		}
		:host > i.sound_detection_dog_barking:before {
			content: 'sound_detection_dog_barking';
		}
		:host > i.sound_detection_glass_break:before {
			content: 'sound_detection_glass_break';
		}
		:host > i.sound_detection_loud_sound:before {
			content: 'sound_detection_loud_sound';
		}
		:host > i.sound_sampler:before {
			content: 'sound_sampler';
		}
		:host > i.soup_kitchen:before {
			content: 'soup_kitchen';
		}
		:host > i.source:before {
			content: 'source';
		}
		:host > i.source_environment:before {
			content: 'source_environment';
		}
		:host > i.source_notes:before {
			content: 'source_notes';
		}
		:host > i.south:before {
			content: 'south';
		}
		:host > i.south_america:before {
			content: 'south_america';
		}
		:host > i.south_east:before {
			content: 'south_east';
		}
		:host > i.south_west:before {
			content: 'south_west';
		}
		:host > i.spa:before {
			content: 'spa';
		}
		:host > i.space_bar:before {
			content: 'space_bar';
		}
		:host > i.space_dashboard:before {
			content: 'space_dashboard';
		}
		:host > i.spatial_audio:before {
			content: 'spatial_audio';
		}
		:host > i.spatial_audio_off:before {
			content: 'spatial_audio_off';
		}
		:host > i.spatial_tracking:before {
			content: 'spatial_tracking';
		}
		:host > i.speaker:before {
			content: 'speaker';
		}
		:host > i.speaker_group:before {
			content: 'speaker_group';
		}
		:host > i.speaker_notes:before {
			content: 'speaker_notes';
		}
		:host > i.speaker_notes_off:before {
			content: 'speaker_notes_off';
		}
		:host > i.speaker_phone:before {
			content: 'speaker_phone';
		}
		:host > i.special_character:before {
			content: 'special_character';
		}
		:host > i.specific_gravity:before {
			content: 'specific_gravity';
		}
		:host > i.speech_to_text:before {
			content: 'speech_to_text';
		}
		:host > i.speed:before {
			content: 'speed';
		}
		:host > i.speed_0_5:before {
			content: 'speed_0_5';
		}
		:host > i.speed_1_2:before {
			content: 'speed_1_2';
		}
		:host > i.speed_1_5:before {
			content: 'speed_1_5';
		}
		:host > i.speed_2x:before {
			content: 'speed_2x';
		}
		:host > i.spellcheck:before {
			content: 'spellcheck';
		}
		:host > i.splitscreen:before {
			content: 'splitscreen';
		}
		:host > i.splitscreen_add:before {
			content: 'splitscreen_add';
		}
		:host > i.splitscreen_bottom:before {
			content: 'splitscreen_bottom';
		}
		:host > i.splitscreen_left:before {
			content: 'splitscreen_left';
		}
		:host > i.splitscreen_right:before {
			content: 'splitscreen_right';
		}
		:host > i.splitscreen_top:before {
			content: 'splitscreen_top';
		}
		:host > i.splitscreen_vertical_add:before {
			content: 'splitscreen_vertical_add';
		}
		:host > i.spo2:before {
			content: 'spo2';
		}
		:host > i.spoke:before {
			content: 'spoke';
		}
		:host > i.sports:before {
			content: 'sports';
		}
		:host > i.sports_and_outdoors:before {
			content: 'sports_and_outdoors';
		}
		:host > i.sports_bar:before {
			content: 'sports_bar';
		}
		:host > i.sports_baseball:before {
			content: 'sports_baseball';
		}
		:host > i.sports_basketball:before {
			content: 'sports_basketball';
		}
		:host > i.sports_cricket:before {
			content: 'sports_cricket';
		}
		:host > i.sports_esports:before {
			content: 'sports_esports';
		}
		:host > i.sports_football:before {
			content: 'sports_football';
		}
		:host > i.sports_golf:before {
			content: 'sports_golf';
		}
		:host > i.sports_gymnastics:before {
			content: 'sports_gymnastics';
		}
		:host > i.sports_handball:before {
			content: 'sports_handball';
		}
		:host > i.sports_hockey:before {
			content: 'sports_hockey';
		}
		:host > i.sports_kabaddi:before {
			content: 'sports_kabaddi';
		}
		:host > i.sports_martial_arts:before {
			content: 'sports_martial_arts';
		}
		:host > i.sports_mma:before {
			content: 'sports_mma';
		}
		:host > i.sports_motorsports:before {
			content: 'sports_motorsports';
		}
		:host > i.sports_rugby:before {
			content: 'sports_rugby';
		}
		:host > i.sports_score:before {
			content: 'sports_score';
		}
		:host > i.sports_soccer:before {
			content: 'sports_soccer';
		}
		:host > i.sports_tennis:before {
			content: 'sports_tennis';
		}
		:host > i.sports_volleyball:before {
			content: 'sports_volleyball';
		}
		:host > i.sprinkler:before {
			content: 'sprinkler';
		}
		:host > i.sprint:before {
			content: 'sprint';
		}
		:host > i.square:before {
			content: 'square';
		}
		:host > i.square_foot:before {
			content: 'square_foot';
		}
		:host > i.ssid_chart:before {
			content: 'ssid_chart';
		}
		:host > i.stack:before {
			content: 'stack';
		}
		:host > i.stack_off:before {
			content: 'stack_off';
		}
		:host > i.stack_star:before {
			content: 'stack_star';
		}
		:host > i.stacked_bar_chart:before {
			content: 'stacked_bar_chart';
		}
		:host > i.stacked_email:before {
			content: 'stacked_email';
		}
		:host > i.stacked_inbox:before {
			content: 'stacked_inbox';
		}
		:host > i.stacked_line_chart:before {
			content: 'stacked_line_chart';
		}
		:host > i.stacks:before {
			content: 'stacks';
		}
		:host > i.stadia_controller:before {
			content: 'stadia_controller';
		}
		:host > i.stadium:before {
			content: 'stadium';
		}
		:host > i.stairs:before {
			content: 'stairs';
		}
		:host > i.star:before {
			content: 'star';
		}
		:host > i.star_border:before {
			content: 'star_border';
		}
		:host > i.star_border_purple500:before {
			content: 'star_border_purple500';
		}
		:host > i.star_half:before {
			content: 'star_half';
		}
		:host > i.star_outline:before {
			content: 'star_outline';
		}
		:host > i.star_purple500:before {
			content: 'star_purple500';
		}
		:host > i.star_rate:before {
			content: 'star_rate';
		}
		:host > i.star_rate_half:before {
			content: 'star_rate_half';
		}
		:host > i.stars:before {
			content: 'stars';
		}
		:host > i.start:before {
			content: 'start';
		}
		:host > i.stat_0:before {
			content: 'stat_0';
		}
		:host > i.stat_1:before {
			content: 'stat_1';
		}
		:host > i.stat_2:before {
			content: 'stat_2';
		}
		:host > i.stat_3:before {
			content: 'stat_3';
		}
		:host > i.stat_minus_1:before {
			content: 'stat_minus_1';
		}
		:host > i.stat_minus_2:before {
			content: 'stat_minus_2';
		}
		:host > i.stat_minus_3:before {
			content: 'stat_minus_3';
		}
		:host > i.stay_current_landscape:before {
			content: 'stay_current_landscape';
		}
		:host > i.stay_current_portrait:before {
			content: 'stay_current_portrait';
		}
		:host > i.stay_primary_landscape:before {
			content: 'stay_primary_landscape';
		}
		:host > i.stay_primary_portrait:before {
			content: 'stay_primary_portrait';
		}
		:host > i.step:before {
			content: 'step';
		}
		:host > i.step_into:before {
			content: 'step_into';
		}
		:host > i.step_out:before {
			content: 'step_out';
		}
		:host > i.step_over:before {
			content: 'step_over';
		}
		:host > i.steppers:before {
			content: 'steppers';
		}
		:host > i.steps:before {
			content: 'steps';
		}
		:host > i.stethoscope:before {
			content: 'stethoscope';
		}
		:host > i.stethoscope_arrow:before {
			content: 'stethoscope_arrow';
		}
		:host > i.stethoscope_check:before {
			content: 'stethoscope_check';
		}
		:host > i.sticky_note:before {
			content: 'sticky_note';
		}
		:host > i.sticky_note_2:before {
			content: 'sticky_note_2';
		}
		:host > i.stock_media:before {
			content: 'stock_media';
		}
		:host > i.stockpot:before {
			content: 'stockpot';
		}
		:host > i.stop:before {
			content: 'stop';
		}
		:host > i.stop_circle:before {
			content: 'stop_circle';
		}
		:host > i.stop_screen_share:before {
			content: 'stop_screen_share';
		}
		:host > i.storage:before {
			content: 'storage';
		}
		:host > i.store:before {
			content: 'store';
		}
		:host > i.store_mall_directory:before {
			content: 'store_mall_directory';
		}
		:host > i.storefront:before {
			content: 'storefront';
		}
		:host > i.storm:before {
			content: 'storm';
		}
		:host > i.straight:before {
			content: 'straight';
		}
		:host > i.straighten:before {
			content: 'straighten';
		}
		:host > i.strategy:before {
			content: 'strategy';
		}
		:host > i.stream:before {
			content: 'stream';
		}
		:host > i.stream_apps:before {
			content: 'stream_apps';
		}
		:host > i.streetview:before {
			content: 'streetview';
		}
		:host > i.stress_management:before {
			content: 'stress_management';
		}
		:host > i.strikethrough_s:before {
			content: 'strikethrough_s';
		}
		:host > i.stroke_full:before {
			content: 'stroke_full';
		}
		:host > i.stroke_partial:before {
			content: 'stroke_partial';
		}
		:host > i.stroller:before {
			content: 'stroller';
		}
		:host > i.style:before {
			content: 'style';
		}
		:host > i.styler:before {
			content: 'styler';
		}
		:host > i.stylus:before {
			content: 'stylus';
		}
		:host > i.stylus_laser_pointer:before {
			content: 'stylus_laser_pointer';
		}
		:host > i.stylus_note:before {
			content: 'stylus_note';
		}
		:host > i.subdirectory_arrow_left:before {
			content: 'subdirectory_arrow_left';
		}
		:host > i.subdirectory_arrow_right:before {
			content: 'subdirectory_arrow_right';
		}
		:host > i.subheader:before {
			content: 'subheader';
		}
		:host > i.subject:before {
			content: 'subject';
		}
		:host > i.subscript:before {
			content: 'subscript';
		}
		:host > i.subscriptions:before {
			content: 'subscriptions';
		}
		:host > i.subtitles:before {
			content: 'subtitles';
		}
		:host > i.subtitles_off:before {
			content: 'subtitles_off';
		}
		:host > i.subway:before {
			content: 'subway';
		}
		:host > i.summarize:before {
			content: 'summarize';
		}
		:host > i.sunny:before {
			content: 'sunny';
		}
		:host > i.sunny_snowing:before {
			content: 'sunny_snowing';
		}
		:host > i.superscript:before {
			content: 'superscript';
		}
		:host > i.supervised_user_circle:before {
			content: 'supervised_user_circle';
		}
		:host > i.supervised_user_circle_off:before {
			content: 'supervised_user_circle_off';
		}
		:host > i.supervisor_account:before {
			content: 'supervisor_account';
		}
		:host > i.support:before {
			content: 'support';
		}
		:host > i.support_agent:before {
			content: 'support_agent';
		}
		:host > i.surfing:before {
			content: 'surfing';
		}
		:host > i.surgical:before {
			content: 'surgical';
		}
		:host > i.surround_sound:before {
			content: 'surround_sound';
		}
		:host > i.swap_calls:before {
			content: 'swap_calls';
		}
		:host > i.swap_driving_apps:before {
			content: 'swap_driving_apps';
		}
		:host > i.swap_driving_apps_wheel:before {
			content: 'swap_driving_apps_wheel';
		}
		:host > i.swap_horiz:before {
			content: 'swap_horiz';
		}
		:host > i.swap_horizontal_circle:before {
			content: 'swap_horizontal_circle';
		}
		:host > i.swap_vert:before {
			content: 'swap_vert';
		}
		:host > i.swap_vertical_circle:before {
			content: 'swap_vertical_circle';
		}
		:host > i.sweep:before {
			content: 'sweep';
		}
		:host > i.swipe:before {
			content: 'swipe';
		}
		:host > i.swipe_down:before {
			content: 'swipe_down';
		}
		:host > i.swipe_down_alt:before {
			content: 'swipe_down_alt';
		}
		:host > i.swipe_left:before {
			content: 'swipe_left';
		}
		:host > i.swipe_left_alt:before {
			content: 'swipe_left_alt';
		}
		:host > i.swipe_right:before {
			content: 'swipe_right';
		}
		:host > i.swipe_right_alt:before {
			content: 'swipe_right_alt';
		}
		:host > i.swipe_up:before {
			content: 'swipe_up';
		}
		:host > i.swipe_up_alt:before {
			content: 'swipe_up_alt';
		}
		:host > i.swipe_vertical:before {
			content: 'swipe_vertical';
		}
		:host > i.switch:before {
			content: 'switch';
		}
		:host > i.switch_access:before {
			content: 'switch_access';
		}
		:host > i.switch_access_2:before {
			content: 'switch_access_2';
		}
		:host > i.switch_access_shortcut:before {
			content: 'switch_access_shortcut';
		}
		:host > i.switch_access_shortcut_add:before {
			content: 'switch_access_shortcut_add';
		}
		:host > i.switch_account:before {
			content: 'switch_account';
		}
		:host > i.switch_camera:before {
			content: 'switch_camera';
		}
		:host > i.switch_left:before {
			content: 'switch_left';
		}
		:host > i.switch_right:before {
			content: 'switch_right';
		}
		:host > i.switch_video:before {
			content: 'switch_video';
		}
		:host > i.switches:before {
			content: 'switches';
		}
		:host > i.sword_rose:before {
			content: 'sword_rose';
		}
		:host > i.swords:before {
			content: 'swords';
		}
		:host > i.symptoms:before {
			content: 'symptoms';
		}
		:host > i.synagogue:before {
			content: 'synagogue';
		}
		:host > i.sync:before {
			content: 'sync';
		}
		:host > i.sync_alt:before {
			content: 'sync_alt';
		}
		:host > i.sync_disabled:before {
			content: 'sync_disabled';
		}
		:host > i.sync_lock:before {
			content: 'sync_lock';
		}
		:host > i.sync_problem:before {
			content: 'sync_problem';
		}
		:host > i.sync_saved_locally:before {
			content: 'sync_saved_locally';
		}
		:host > i.syringe:before {
			content: 'syringe';
		}
		:host > i.system_security_update:before {
			content: 'system_security_update';
		}
		:host > i.system_security_update_good:before {
			content: 'system_security_update_good';
		}
		:host > i.system_security_update_warning:before {
			content: 'system_security_update_warning';
		}
		:host > i.system_update:before {
			content: 'system_update';
		}
		:host > i.system_update_alt:before {
			content: 'system_update_alt';
		}
		:host > i.tab:before {
			content: 'tab';
		}
		:host > i.tab_close:before {
			content: 'tab_close';
		}
		:host > i.tab_close_right:before {
			content: 'tab_close_right';
		}
		:host > i.tab_duplicate:before {
			content: 'tab_duplicate';
		}
		:host > i.tab_group:before {
			content: 'tab_group';
		}
		:host > i.tab_move:before {
			content: 'tab_move';
		}
		:host > i.tab_new_right:before {
			content: 'tab_new_right';
		}
		:host > i.tab_recent:before {
			content: 'tab_recent';
		}
		:host > i.tab_unselected:before {
			content: 'tab_unselected';
		}
		:host > i.table:before {
			content: 'table';
		}
		:host > i.table_bar:before {
			content: 'table_bar';
		}
		:host > i.table_chart:before {
			content: 'table_chart';
		}
		:host > i.table_chart_view:before {
			content: 'table_chart_view';
		}
		:host > i.table_lamp:before {
			content: 'table_lamp';
		}
		:host > i.table_restaurant:before {
			content: 'table_restaurant';
		}
		:host > i.table_rows:before {
			content: 'table_rows';
		}
		:host > i.table_rows_narrow:before {
			content: 'table_rows_narrow';
		}
		:host > i.table_view:before {
			content: 'table_view';
		}
		:host > i.tablet:before {
			content: 'tablet';
		}
		:host > i.tablet_android:before {
			content: 'tablet_android';
		}
		:host > i.tablet_mac:before {
			content: 'tablet_mac';
		}
		:host > i.tabs:before {
			content: 'tabs';
		}
		:host > i.tactic:before {
			content: 'tactic';
		}
		:host > i.tag:before {
			content: 'tag';
		}
		:host > i.tag_faces:before {
			content: 'tag_faces';
		}
		:host > i.takeout_dining:before {
			content: 'takeout_dining';
		}
		:host > i.tamper_detection_off:before {
			content: 'tamper_detection_off';
		}
		:host > i.tamper_detection_on:before {
			content: 'tamper_detection_on';
		}
		:host > i.tap_and_play:before {
			content: 'tap_and_play';
		}
		:host > i.tapas:before {
			content: 'tapas';
		}
		:host > i.target:before {
			content: 'target';
		}
		:host > i.task:before {
			content: 'task';
		}
		:host > i.task_alt:before {
			content: 'task_alt';
		}
		:host > i.taunt:before {
			content: 'taunt';
		}
		:host > i.taxi_alert:before {
			content: 'taxi_alert';
		}
		:host > i.team_dashboard:before {
			content: 'team_dashboard';
		}
		:host > i.temp_preferences_custom:before {
			content: 'temp_preferences_custom';
		}
		:host > i.temp_preferences_eco:before {
			content: 'temp_preferences_eco';
		}
		:host > i.temple_buddhist:before {
			content: 'temple_buddhist';
		}
		:host > i.temple_hindu:before {
			content: 'temple_hindu';
		}
		:host > i.tenancy:before {
			content: 'tenancy';
		}
		:host > i.terminal:before {
			content: 'terminal';
		}
		:host > i.terrain:before {
			content: 'terrain';
		}
		:host > i.text_ad:before {
			content: 'text_ad';
		}
		:host > i.text_decrease:before {
			content: 'text_decrease';
		}
		:host > i.text_fields:before {
			content: 'text_fields';
		}
		:host > i.text_fields_alt:before {
			content: 'text_fields_alt';
		}
		:host > i.text_format:before {
			content: 'text_format';
		}
		:host > i.text_increase:before {
			content: 'text_increase';
		}
		:host > i.text_rotate_up:before {
			content: 'text_rotate_up';
		}
		:host > i.text_rotate_vertical:before {
			content: 'text_rotate_vertical';
		}
		:host > i.text_rotation_angledown:before {
			content: 'text_rotation_angledown';
		}
		:host > i.text_rotation_angleup:before {
			content: 'text_rotation_angleup';
		}
		:host > i.text_rotation_down:before {
			content: 'text_rotation_down';
		}
		:host > i.text_rotation_none:before {
			content: 'text_rotation_none';
		}
		:host > i.text_select_end:before {
			content: 'text_select_end';
		}
		:host > i.text_select_jump_to_beginning:before {
			content: 'text_select_jump_to_beginning';
		}
		:host > i.text_select_jump_to_end:before {
			content: 'text_select_jump_to_end';
		}
		:host > i.text_select_move_back_character:before {
			content: 'text_select_move_back_character';
		}
		:host > i.text_select_move_back_word:before {
			content: 'text_select_move_back_word';
		}
		:host > i.text_select_move_down:before {
			content: 'text_select_move_down';
		}
		:host > i.text_select_move_forward_character:before {
			content: 'text_select_move_forward_character';
		}
		:host > i.text_select_move_forward_word:before {
			content: 'text_select_move_forward_word';
		}
		:host > i.text_select_move_up:before {
			content: 'text_select_move_up';
		}
		:host > i.text_select_start:before {
			content: 'text_select_start';
		}
		:host > i.text_snippet:before {
			content: 'text_snippet';
		}
		:host > i.text_to_speech:before {
			content: 'text_to_speech';
		}
		:host > i.textsms:before {
			content: 'textsms';
		}
		:host > i.texture:before {
			content: 'texture';
		}
		:host > i.texture_add:before {
			content: 'texture_add';
		}
		:host > i.texture_minus:before {
			content: 'texture_minus';
		}
		:host > i.theater_comedy:before {
			content: 'theater_comedy';
		}
		:host > i.theaters:before {
			content: 'theaters';
		}
		:host > i.thermometer:before {
			content: 'thermometer';
		}
		:host > i.thermometer_add:before {
			content: 'thermometer_add';
		}
		:host > i.thermometer_gain:before {
			content: 'thermometer_gain';
		}
		:host > i.thermometer_loss:before {
			content: 'thermometer_loss';
		}
		:host > i.thermometer_minus:before {
			content: 'thermometer_minus';
		}
		:host > i.thermostat:before {
			content: 'thermostat';
		}
		:host > i.thermostat_auto:before {
			content: 'thermostat_auto';
		}
		:host > i.thermostat_carbon:before {
			content: 'thermostat_carbon';
		}
		:host > i.things_to_do:before {
			content: 'things_to_do';
		}
		:host > i.thread_unread:before {
			content: 'thread_unread';
		}
		:host > i.thumb_down:before {
			content: 'thumb_down';
		}
		:host > i.thumb_down_alt:before {
			content: 'thumb_down_alt';
		}
		:host > i.thumb_down_filled:before {
			content: 'thumb_down_filled';
		}
		:host > i.thumb_down_off:before {
			content: 'thumb_down_off';
		}
		:host > i.thumb_down_off_alt:before {
			content: 'thumb_down_off_alt';
		}
		:host > i.thumb_up:before {
			content: 'thumb_up';
		}
		:host > i.thumb_up_alt:before {
			content: 'thumb_up_alt';
		}
		:host > i.thumb_up_filled:before {
			content: 'thumb_up_filled';
		}
		:host > i.thumb_up_off:before {
			content: 'thumb_up_off';
		}
		:host > i.thumb_up_off_alt:before {
			content: 'thumb_up_off_alt';
		}
		:host > i.thumbnail_bar:before {
			content: 'thumbnail_bar';
		}
		:host > i.thumbs_up_down:before {
			content: 'thumbs_up_down';
		}
		:host > i.thunderstorm:before {
			content: 'thunderstorm';
		}
		:host > i.tibia:before {
			content: 'tibia';
		}
		:host > i.tibia_alt:before {
			content: 'tibia_alt';
		}
		:host > i.time_auto:before {
			content: 'time_auto';
		}
		:host > i.time_to_leave:before {
			content: 'time_to_leave';
		}
		:host > i.timelapse:before {
			content: 'timelapse';
		}
		:host > i.timeline:before {
			content: 'timeline';
		}
		:host > i.timer:before {
			content: 'timer';
		}
		:host > i.timer_10:before {
			content: 'timer_10';
		}
		:host > i.timer_10_alt_1:before {
			content: 'timer_10_alt_1';
		}
		:host > i.timer_10_select:before {
			content: 'timer_10_select';
		}
		:host > i.timer_3:before {
			content: 'timer_3';
		}
		:host > i.timer_3_alt_1:before {
			content: 'timer_3_alt_1';
		}
		:host > i.timer_3_select:before {
			content: 'timer_3_select';
		}
		:host > i.timer_off:before {
			content: 'timer_off';
		}
		:host > i.tips_and_updates:before {
			content: 'tips_and_updates';
		}
		:host > i.tire_repair:before {
			content: 'tire_repair';
		}
		:host > i.title:before {
			content: 'title';
		}
		:host > i.toast:before {
			content: 'toast';
		}
		:host > i.toc:before {
			content: 'toc';
		}
		:host > i.today:before {
			content: 'today';
		}
		:host > i.toggle_off:before {
			content: 'toggle_off';
		}
		:host > i.toggle_on:before {
			content: 'toggle_on';
		}
		:host > i.token:before {
			content: 'token';
		}
		:host > i.toll:before {
			content: 'toll';
		}
		:host > i.tonality:before {
			content: 'tonality';
		}
		:host > i.toolbar:before {
			content: 'toolbar';
		}
		:host > i.tools_flat_head:before {
			content: 'tools_flat_head';
		}
		:host > i.tools_installation_kit:before {
			content: 'tools_installation_kit';
		}
		:host > i.tools_ladder:before {
			content: 'tools_ladder';
		}
		:host > i.tools_level:before {
			content: 'tools_level';
		}
		:host > i.tools_phillips:before {
			content: 'tools_phillips';
		}
		:host > i.tools_pliers_wire_stripper:before {
			content: 'tools_pliers_wire_stripper';
		}
		:host > i.tools_power_drill:before {
			content: 'tools_power_drill';
		}
		:host > i.tools_wrench:before {
			content: 'tools_wrench';
		}
		:host > i.tooltip:before {
			content: 'tooltip';
		}
		:host > i.top_panel_close:before {
			content: 'top_panel_close';
		}
		:host > i.top_panel_open:before {
			content: 'top_panel_open';
		}
		:host > i.topic:before {
			content: 'topic';
		}
		:host > i.tornado:before {
			content: 'tornado';
		}
		:host > i.total_dissolved_solids:before {
			content: 'total_dissolved_solids';
		}
		:host > i.touch_app:before {
			content: 'touch_app';
		}
		:host > i.touchpad_mouse:before {
			content: 'touchpad_mouse';
		}
		:host > i.touchpad_mouse_off:before {
			content: 'touchpad_mouse_off';
		}
		:host > i.tour:before {
			content: 'tour';
		}
		:host > i.toys:before {
			content: 'toys';
		}
		:host > i.toys_and_games:before {
			content: 'toys_and_games';
		}
		:host > i.toys_fan:before {
			content: 'toys_fan';
		}
		:host > i.track_changes:before {
			content: 'track_changes';
		}
		:host > i.traffic:before {
			content: 'traffic';
		}
		:host > i.trail_length:before {
			content: 'trail_length';
		}
		:host > i.trail_length_medium:before {
			content: 'trail_length_medium';
		}
		:host > i.trail_length_short:before {
			content: 'trail_length_short';
		}
		:host > i.train:before {
			content: 'train';
		}
		:host > i.tram:before {
			content: 'tram';
		}
		:host > i.transcribe:before {
			content: 'transcribe';
		}
		:host > i.transfer_within_a_station:before {
			content: 'transfer_within_a_station';
		}
		:host > i.transform:before {
			content: 'transform';
		}
		:host > i.transgender:before {
			content: 'transgender';
		}
		:host > i.transit_enterexit:before {
			content: 'transit_enterexit';
		}
		:host > i.transition_chop:before {
			content: 'transition_chop';
		}
		:host > i.transition_dissolve:before {
			content: 'transition_dissolve';
		}
		:host > i.transition_fade:before {
			content: 'transition_fade';
		}
		:host > i.transition_push:before {
			content: 'transition_push';
		}
		:host > i.transition_slide:before {
			content: 'transition_slide';
		}
		:host > i.translate:before {
			content: 'translate';
		}
		:host > i.transportation:before {
			content: 'transportation';
		}
		:host > i.travel:before {
			content: 'travel';
		}
		:host > i.travel_explore:before {
			content: 'travel_explore';
		}
		:host > i.travel_luggage_and_bags:before {
			content: 'travel_luggage_and_bags';
		}
		:host > i.trending_down:before {
			content: 'trending_down';
		}
		:host > i.trending_flat:before {
			content: 'trending_flat';
		}
		:host > i.trending_up:before {
			content: 'trending_up';
		}
		:host > i.trip:before {
			content: 'trip';
		}
		:host > i.trip_origin:before {
			content: 'trip_origin';
		}
		:host > i.trolley:before {
			content: 'trolley';
		}
		:host > i.trophy:before {
			content: 'trophy';
		}
		:host > i.troubleshoot:before {
			content: 'troubleshoot';
		}
		:host > i.try:before {
			content: 'try';
		}
		:host > i.tsunami:before {
			content: 'tsunami';
		}
		:host > i.tsv:before {
			content: 'tsv';
		}
		:host > i.tty:before {
			content: 'tty';
		}
		:host > i.tune:before {
			content: 'tune';
		}
		:host > i.tungsten:before {
			content: 'tungsten';
		}
		:host > i.turn_left:before {
			content: 'turn_left';
		}
		:host > i.turn_right:before {
			content: 'turn_right';
		}
		:host > i.turn_sharp_left:before {
			content: 'turn_sharp_left';
		}
		:host > i.turn_sharp_right:before {
			content: 'turn_sharp_right';
		}
		:host > i.turn_slight_left:before {
			content: 'turn_slight_left';
		}
		:host > i.turn_slight_right:before {
			content: 'turn_slight_right';
		}
		:host > i.turned_in:before {
			content: 'turned_in';
		}
		:host > i.turned_in_not:before {
			content: 'turned_in_not';
		}
		:host > i.tv:before {
			content: 'tv';
		}
		:host > i.tv_gen:before {
			content: 'tv_gen';
		}
		:host > i.tv_guide:before {
			content: 'tv_guide';
		}
		:host > i.tv_off:before {
			content: 'tv_off';
		}
		:host > i.tv_options_edit_channels:before {
			content: 'tv_options_edit_channels';
		}
		:host > i.tv_options_input_settings:before {
			content: 'tv_options_input_settings';
		}
		:host > i.tv_remote:before {
			content: 'tv_remote';
		}
		:host > i.tv_signin:before {
			content: 'tv_signin';
		}
		:host > i.tv_with_assistant:before {
			content: 'tv_with_assistant';
		}
		:host > i.two_pager:before {
			content: 'two_pager';
		}
		:host > i.two_wheeler:before {
			content: 'two_wheeler';
		}
		:host > i.type_specimen:before {
			content: 'type_specimen';
		}
		:host > i.u_turn_left:before {
			content: 'u_turn_left';
		}
		:host > i.u_turn_right:before {
			content: 'u_turn_right';
		}
		:host > i.ulna_radius:before {
			content: 'ulna_radius';
		}
		:host > i.ulna_radius_alt:before {
			content: 'ulna_radius_alt';
		}
		:host > i.umbrella:before {
			content: 'umbrella';
		}
		:host > i.unarchive:before {
			content: 'unarchive';
		}
		:host > i.undo:before {
			content: 'undo';
		}
		:host > i.unfold_less:before {
			content: 'unfold_less';
		}
		:host > i.unfold_less_double:before {
			content: 'unfold_less_double';
		}
		:host > i.unfold_more:before {
			content: 'unfold_more';
		}
		:host > i.unfold_more_double:before {
			content: 'unfold_more_double';
		}
		:host > i.ungroup:before {
			content: 'ungroup';
		}
		:host > i.universal_currency:before {
			content: 'universal_currency';
		}
		:host > i.universal_currency_alt:before {
			content: 'universal_currency_alt';
		}
		:host > i.universal_local:before {
			content: 'universal_local';
		}
		:host > i.unknown_2:before {
			content: 'unknown_2';
		}
		:host > i.unknown_5:before {
			content: 'unknown_5';
		}
		:host > i.unknown_document:before {
			content: 'unknown_document';
		}
		:host > i.unknown_med:before {
			content: 'unknown_med';
		}
		:host > i.unlicense:before {
			content: 'unlicense';
		}
		:host > i.unpublished:before {
			content: 'unpublished';
		}
		:host > i.unsubscribe:before {
			content: 'unsubscribe';
		}
		:host > i.upcoming:before {
			content: 'upcoming';
		}
		:host > i.update:before {
			content: 'update';
		}
		:host > i.update_disabled:before {
			content: 'update_disabled';
		}
		:host > i.upgrade:before {
			content: 'upgrade';
		}
		:host > i.upload:before {
			content: 'upload';
		}
		:host > i.upload_2:before {
			content: 'upload_2';
		}
		:host > i.upload_file:before {
			content: 'upload_file';
		}
		:host > i.urology:before {
			content: 'urology';
		}
		:host > i.usb:before {
			content: 'usb';
		}
		:host > i.usb_off:before {
			content: 'usb_off';
		}
		:host > i.user_attributes:before {
			content: 'user_attributes';
		}
		:host > i.vaccines:before {
			content: 'vaccines';
		}
		:host > i.vacuum:before {
			content: 'vacuum';
		}
		:host > i.valve:before {
			content: 'valve';
		}
		:host > i.vape_free:before {
			content: 'vape_free';
		}
		:host > i.vaping_rooms:before {
			content: 'vaping_rooms';
		}
		:host > i.variable_add:before {
			content: 'variable_add';
		}
		:host > i.variable_insert:before {
			content: 'variable_insert';
		}
		:host > i.variable_remove:before {
			content: 'variable_remove';
		}
		:host > i.variables:before {
			content: 'variables';
		}
		:host > i.ventilator:before {
			content: 'ventilator';
		}
		:host > i.verified:before {
			content: 'verified';
		}
		:host > i.verified_user:before {
			content: 'verified_user';
		}
		:host > i.vertical_align_bottom:before {
			content: 'vertical_align_bottom';
		}
		:host > i.vertical_align_center:before {
			content: 'vertical_align_center';
		}
		:host > i.vertical_align_top:before {
			content: 'vertical_align_top';
		}
		:host > i.vertical_distribute:before {
			content: 'vertical_distribute';
		}
		:host > i.vertical_shades:before {
			content: 'vertical_shades';
		}
		:host > i.vertical_shades_closed:before {
			content: 'vertical_shades_closed';
		}
		:host > i.vertical_split:before {
			content: 'vertical_split';
		}
		:host > i.vibration:before {
			content: 'vibration';
		}
		:host > i.video_call:before {
			content: 'video_call';
		}
		:host > i.video_camera_back:before {
			content: 'video_camera_back';
		}
		:host > i.video_camera_front:before {
			content: 'video_camera_front';
		}
		:host > i.video_camera_front_off:before {
			content: 'video_camera_front_off';
		}
		:host > i.video_chat:before {
			content: 'video_chat';
		}
		:host > i.video_file:before {
			content: 'video_file';
		}
		:host > i.video_label:before {
			content: 'video_label';
		}
		:host > i.video_library:before {
			content: 'video_library';
		}
		:host > i.video_search:before {
			content: 'video_search';
		}
		:host > i.video_settings:before {
			content: 'video_settings';
		}
		:host > i.video_stable:before {
			content: 'video_stable';
		}
		:host > i.videocam:before {
			content: 'videocam';
		}
		:host > i.videocam_off:before {
			content: 'videocam_off';
		}
		:host > i.videogame_asset:before {
			content: 'videogame_asset';
		}
		:host > i.videogame_asset_off:before {
			content: 'videogame_asset_off';
		}
		:host > i.view_agenda:before {
			content: 'view_agenda';
		}
		:host > i.view_array:before {
			content: 'view_array';
		}
		:host > i.view_carousel:before {
			content: 'view_carousel';
		}
		:host > i.view_column:before {
			content: 'view_column';
		}
		:host > i.view_column_2:before {
			content: 'view_column_2';
		}
		:host > i.view_comfy:before {
			content: 'view_comfy';
		}
		:host > i.view_comfy_alt:before {
			content: 'view_comfy_alt';
		}
		:host > i.view_compact:before {
			content: 'view_compact';
		}
		:host > i.view_compact_alt:before {
			content: 'view_compact_alt';
		}
		:host > i.view_cozy:before {
			content: 'view_cozy';
		}
		:host > i.view_day:before {
			content: 'view_day';
		}
		:host > i.view_headline:before {
			content: 'view_headline';
		}
		:host > i.view_in_ar:before {
			content: 'view_in_ar';
		}
		:host > i.view_in_ar_new:before {
			content: 'view_in_ar_new';
		}
		:host > i.view_in_ar_off:before {
			content: 'view_in_ar_off';
		}
		:host > i.view_kanban:before {
			content: 'view_kanban';
		}
		:host > i.view_list:before {
			content: 'view_list';
		}
		:host > i.view_module:before {
			content: 'view_module';
		}
		:host > i.view_quilt:before {
			content: 'view_quilt';
		}
		:host > i.view_sidebar:before {
			content: 'view_sidebar';
		}
		:host > i.view_stream:before {
			content: 'view_stream';
		}
		:host > i.view_timeline:before {
			content: 'view_timeline';
		}
		:host > i.view_week:before {
			content: 'view_week';
		}
		:host > i.vignette:before {
			content: 'vignette';
		}
		:host > i.villa:before {
			content: 'villa';
		}
		:host > i.visibility:before {
			content: 'visibility';
		}
		:host > i.visibility_lock:before {
			content: 'visibility_lock';
		}
		:host > i.visibility_off:before {
			content: 'visibility_off';
		}
		:host > i.vital_signs:before {
			content: 'vital_signs';
		}
		:host > i.vitals:before {
			content: 'vitals';
		}
		:host > i.voice_chat:before {
			content: 'voice_chat';
		}
		:host > i.voice_over_off:before {
			content: 'voice_over_off';
		}
		:host > i.voice_selection:before {
			content: 'voice_selection';
		}
		:host > i.voicemail:before {
			content: 'voicemail';
		}
		:host > i.volcano:before {
			content: 'volcano';
		}
		:host > i.volume_down:before {
			content: 'volume_down';
		}
		:host > i.volume_down_alt:before {
			content: 'volume_down_alt';
		}
		:host > i.volume_mute:before {
			content: 'volume_mute';
		}
		:host > i.volume_off:before {
			content: 'volume_off';
		}
		:host > i.volume_up:before {
			content: 'volume_up';
		}
		:host > i.volunteer_activism:before {
			content: 'volunteer_activism';
		}
		:host > i.voting_chip:before {
			content: 'voting_chip';
		}
		:host > i.vpn_key:before {
			content: 'vpn_key';
		}
		:host > i.vpn_key_alert:before {
			content: 'vpn_key_alert';
		}
		:host > i.vpn_key_off:before {
			content: 'vpn_key_off';
		}
		:host > i.vpn_lock:before {
			content: 'vpn_lock';
		}
		:host > i.vr180_create2d:before {
			content: 'vr180_create2d';
		}
		:host > i.vr180_create2d_off:before {
			content: 'vr180_create2d_off';
		}
		:host > i.vrpano:before {
			content: 'vrpano';
		}
		:host > i.wall_art:before {
			content: 'wall_art';
		}
		:host > i.wall_lamp:before {
			content: 'wall_lamp';
		}
		:host > i.wallet:before {
			content: 'wallet';
		}
		:host > i.wallpaper:before {
			content: 'wallpaper';
		}
		:host > i.wallpaper_slideshow:before {
			content: 'wallpaper_slideshow';
		}
		:host > i.ward:before {
			content: 'ward';
		}
		:host > i.warehouse:before {
			content: 'warehouse';
		}
		:host > i.warning:before {
			content: 'warning';
		}
		:host > i.warning_amber:before {
			content: 'warning_amber';
		}
		:host > i.warning_off:before {
			content: 'warning_off';
		}
		:host > i.wash:before {
			content: 'wash';
		}
		:host > i.watch:before {
			content: 'watch';
		}
		:host > i.watch_button_press:before {
			content: 'watch_button_press';
		}
		:host > i.watch_later:before {
			content: 'watch_later';
		}
		:host > i.watch_off:before {
			content: 'watch_off';
		}
		:host > i.watch_screentime:before {
			content: 'watch_screentime';
		}
		:host > i.watch_wake:before {
			content: 'watch_wake';
		}
		:host > i.water:before {
			content: 'water';
		}
		:host > i.water_bottle:before {
			content: 'water_bottle';
		}
		:host > i.water_bottle_large:before {
			content: 'water_bottle_large';
		}
		:host > i.water_damage:before {
			content: 'water_damage';
		}
		:host > i.water_do:before {
			content: 'water_do';
		}
		:host > i.water_drop:before {
			content: 'water_drop';
		}
		:host > i.water_ec:before {
			content: 'water_ec';
		}
		:host > i.water_full:before {
			content: 'water_full';
		}
		:host > i.water_heater:before {
			content: 'water_heater';
		}
		:host > i.water_lock:before {
			content: 'water_lock';
		}
		:host > i.water_loss:before {
			content: 'water_loss';
		}
		:host > i.water_lux:before {
			content: 'water_lux';
		}
		:host > i.water_medium:before {
			content: 'water_medium';
		}
		:host > i.water_orp:before {
			content: 'water_orp';
		}
		:host > i.water_ph:before {
			content: 'water_ph';
		}
		:host > i.water_pump:before {
			content: 'water_pump';
		}
		:host > i.water_voc:before {
			content: 'water_voc';
		}
		:host > i.waterfall_chart:before {
			content: 'waterfall_chart';
		}
		:host > i.waves:before {
			content: 'waves';
		}
		:host > i.waving_hand:before {
			content: 'waving_hand';
		}
		:host > i.wb_auto:before {
			content: 'wb_auto';
		}
		:host > i.wb_cloudy:before {
			content: 'wb_cloudy';
		}
		:host > i.wb_incandescent:before {
			content: 'wb_incandescent';
		}
		:host > i.wb_iridescent:before {
			content: 'wb_iridescent';
		}
		:host > i.wb_shade:before {
			content: 'wb_shade';
		}
		:host > i.wb_sunny:before {
			content: 'wb_sunny';
		}
		:host > i.wb_twilight:before {
			content: 'wb_twilight';
		}
		:host > i.wc:before {
			content: 'wc';
		}
		:host > i.weather_hail:before {
			content: 'weather_hail';
		}
		:host > i.weather_mix:before {
			content: 'weather_mix';
		}
		:host > i.weather_snowy:before {
			content: 'weather_snowy';
		}
		:host > i.web:before {
			content: 'web';
		}
		:host > i.web_asset:before {
			content: 'web_asset';
		}
		:host > i.web_asset_off:before {
			content: 'web_asset_off';
		}
		:host > i.web_stories:before {
			content: 'web_stories';
		}
		:host > i.web_traffic:before {
			content: 'web_traffic';
		}
		:host > i.webhook:before {
			content: 'webhook';
		}
		:host > i.weekend:before {
			content: 'weekend';
		}
		:host > i.weight:before {
			content: 'weight';
		}
		:host > i.west:before {
			content: 'west';
		}
		:host > i.whatshot:before {
			content: 'whatshot';
		}
		:host > i.wheelchair_pickup:before {
			content: 'wheelchair_pickup';
		}
		:host > i.where_to_vote:before {
			content: 'where_to_vote';
		}
		:host > i.widgets:before {
			content: 'widgets';
		}
		:host > i.width:before {
			content: 'width';
		}
		:host > i.width_full:before {
			content: 'width_full';
		}
		:host > i.width_normal:before {
			content: 'width_normal';
		}
		:host > i.width_wide:before {
			content: 'width_wide';
		}
		:host > i.wifi:before {
			content: 'wifi';
		}
		:host > i.wifi_1_bar:before {
			content: 'wifi_1_bar';
		}
		:host > i.wifi_2_bar:before {
			content: 'wifi_2_bar';
		}
		:host > i.wifi_add:before {
			content: 'wifi_add';
		}
		:host > i.wifi_calling:before {
			content: 'wifi_calling';
		}
		:host > i.wifi_calling_1:before {
			content: 'wifi_calling_1';
		}
		:host > i.wifi_calling_2:before {
			content: 'wifi_calling_2';
		}
		:host > i.wifi_calling_3:before {
			content: 'wifi_calling_3';
		}
		:host > i.wifi_channel:before {
			content: 'wifi_channel';
		}
		:host > i.wifi_find:before {
			content: 'wifi_find';
		}
		:host > i.wifi_home:before {
			content: 'wifi_home';
		}
		:host > i.wifi_lock:before {
			content: 'wifi_lock';
		}
		:host > i.wifi_notification:before {
			content: 'wifi_notification';
		}
		:host > i.wifi_off:before {
			content: 'wifi_off';
		}
		:host > i.wifi_password:before {
			content: 'wifi_password';
		}
		:host > i.wifi_protected_setup:before {
			content: 'wifi_protected_setup';
		}
		:host > i.wifi_proxy:before {
			content: 'wifi_proxy';
		}
		:host > i.wifi_tethering:before {
			content: 'wifi_tethering';
		}
		:host > i.wifi_tethering_error:before {
			content: 'wifi_tethering_error';
		}
		:host > i.wifi_tethering_off:before {
			content: 'wifi_tethering_off';
		}
		:host > i.wind_power:before {
			content: 'wind_power';
		}
		:host > i.window:before {
			content: 'window';
		}
		:host > i.window_closed:before {
			content: 'window_closed';
		}
		:host > i.window_open:before {
			content: 'window_open';
		}
		:host > i.window_sensor:before {
			content: 'window_sensor';
		}
		:host > i.wine_bar:before {
			content: 'wine_bar';
		}
		:host > i.woman:before {
			content: 'woman';
		}
		:host > i.woman_2:before {
			content: 'woman_2';
		}
		:host > i.work:before {
			content: 'work';
		}
		:host > i.work_alert:before {
			content: 'work_alert';
		}
		:host > i.work_history:before {
			content: 'work_history';
		}
		:host > i.work_off:before {
			content: 'work_off';
		}
		:host > i.work_outline:before {
			content: 'work_outline';
		}
		:host > i.work_update:before {
			content: 'work_update';
		}
		:host > i.workflow:before {
			content: 'workflow';
		}
		:host > i.workspace_premium:before {
			content: 'workspace_premium';
		}
		:host > i.workspaces:before {
			content: 'workspaces';
		}
		:host > i.workspaces_outline:before {
			content: 'workspaces_outline';
		}
		:host > i.wounds_injuries:before {
			content: 'wounds_injuries';
		}
		:host > i.wrap_text:before {
			content: 'wrap_text';
		}
		:host > i.wrist:before {
			content: 'wrist';
		}
		:host > i.wrong_location:before {
			content: 'wrong_location';
		}
		:host > i.wysiwyg:before {
			content: 'wysiwyg';
		}
		:host > i.yard:before {
			content: 'yard';
		}
		:host > i.your_trips:before {
			content: 'your_trips';
		}
		:host > i.youtube_activity:before {
			content: 'youtube_activity';
		}
		:host > i.youtube_searched_for:before {
			content: 'youtube_searched_for';
		}
		:host > i.zone_person_alert:before {
			content: 'zone_person_alert';
		}
		:host > i.zone_person_idle:before {
			content: 'zone_person_idle';
		}
		:host > i.zone_person_urgent:before {
			content: 'zone_person_urgent';
		}
		:host > i.zoom_in:before {
			content: 'zoom_in';
		}
		:host > i.zoom_in_map:before {
			content: 'zoom_in_map';
		}
		:host > i.zoom_out:before {
			content: 'zoom_out';
		}
		:host > i.zoom_out_map:before {
			content: 'zoom_out_map';
		}
	`,
	'KOL-SKIP-NAV': css`
		kol-link-wc > a > kol-span-wc {
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
	'KOL-SPIN': css`
		.cycle {
			padding: 0.125rem;
			& span {
				background-color: #fc0;
			}
		}
	`,
});
