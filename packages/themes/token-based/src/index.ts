import { KoliBri } from '@public-ui/schema';

export const TOKEN_BASED = KoliBri.createTheme('token-based', {
	GLOBAL: `
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
		font-family: var(--font-family); /* font-size: var(--font-size); */
	}
	* {
		box-sizing: border-box;
	}
	*:not(i) {
		font-family: var(--font-family);
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
	kol-tooltip .tooltip-floating {
		border: 1px solid var(--color-metal);
		border-radius: var(--border-radius);
	}
	kol-tooltip .tooltip-arrow {
		border: 1px solid var(--color-metal);
	}
	kol-tooltip .tooltip-area {
		background-color: var(--color-white);
		color: var(--color-metal);
	}
	kol-tooltip .tooltip-content {
		border-radius: var(--border-radius);
		line-height: 1.5em;
		padding: 0.5rem 0.75rem;
	}
	kol-span-wc,
	kol-span-wc > span {
		gap: 0.5em;
	}`,
	'KOL-BUTTON': `:is(a, button):focus {
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
	:is(a, button):disabled > kol-span-wc {
		cursor: not-allowed;
		opacity: 0.5;
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
	}`,
	'KOL-INPUT-TEXT': `kol-input {
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
	input:read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(input, label) {
		opacity: 1;
	}
	kol-input.disabled :is(input, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
	}`,
	'KOL-INPUT-PASSWORD': `kol-input {
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
	input:read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(button, input, label, option, select, textarea) {
		opacity: 1;
	}
	kol-input.disabled :is(input, select, textarea, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-INPUT-NUMBER': `kol-input {
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
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(input, label) {
		opacity: 1;
	}
	kol-input.disabled :is(input, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-INPUT-DATE': `kol-input {
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
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(input, label) {
		opacity: 1;
	}
	kol-input.disabled :is(input, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-INPUT-EMAIL': `kol-input {
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
	input:read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(input, label) {
		opacity: 1;
	}
	kol-input.disabled :is(input, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-INPUT-FILE': `kol-input {
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
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	input {
		border: none;
	}
	input[type="file"] {
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
	input:read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(button, input, label, option, select, textarea) {
		opacity: 1;
	}
	kol-input.disabled :is(input, select, textarea, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-TEXTAREA': `kol-input {
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
	textarea:read-only,
	textarea:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
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
	.input {
		position: relative;
	}
	.input textarea ~ span {
		position: absolute;
		top: -1.5rem;
		right: 0;
		color: var(--color-grey);
	}`,
	'KOL-ALERT': `.msg,
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
		border-width: 3px;
		border-style: solid;
		filter: drop-shadow(0px 2px 4px rgba(8, 35, 48, 0.24));
		flex-direction: column;
	}
	.card > .heading {
		padding: 0.5rem 1rem;
	}
	.card[_has-closer] > .heading {
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
	.card > .content {
		padding: 0.5rem 1rem;
	}
	.card.default > .heading {
		background-color: var(--color-grey);
	}
	.card.error > .heading {
		background-color: var(--color-red);
	}
	.card.info > .heading {
		background-color: var(--color-midnight);
	}
	.card.success > .heading {
		background-color: var(--color-green);
	}
	.card.warning > .heading {
		background-color: var(--color-orange);
	}
	:is(.error, .info, .success, .warning) .heading-icon::part(icon) {
		font-family: "Font Awesome 6 Free" !important;
		font-weight: 900;
		height: 1.25rem;
		width: 1.25rem;
	}
	:is(.error, .info, .success, .warning) .heading-icon {
		font-size: 1.25rem !important;
	}
	.error .heading-icon::part(icon)::before {
		content: "\\f06a";
	}
	.info .heading-icon::part(icon)::before {
		content: "\\f05a";
	}
	.success .heading-icon::part(icon)::before {
		content: "\\f058";
	}
	.warning .heading-icon::part(icon)::before {
		content: "\\f071";
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
	.close > button.hide-label {
		padding: 8px;
	}
	.close > button.hide-label kol-icon {
		display: flex;
		width: 1em;
		height: 1em;
		font-size: 1rem;
	}
	.close > button.hide-label kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	.close > button.hide-label kol-icon::part(icon)::before {
		content: "\\f00d";
	}
	.close > button:active {
		box-shadow: none;
		outline: none;
	}`,
	'KOL-HEADING': `h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: inherit;
		font-style: normal;
		margin: 0;
		padding: 0;
	}
	h1,
	h2,
	h3 {
		font-weight: 700;
	}
	h1 {
		font-size: 1.5rem;
		line-height: 1.75rem;
	}
	h2 {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	h3 {
		font-size: 1.125rem;
		line-height: 1.5rem;
	}`,
	'KOL-BADGE': `:host {
		display: inline-block;
	}
	:host > span {
		border-radius: 0.3125rem;
		display: inline-flex;
		font-size: 1em;
		font-style: normal;
		line-height: 1.25rem;
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
	}`,
	'KOL-BUTTON-GROUP': `:host > kol-button-group-wc {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		background-color: var(--color-white);
		border-left: none;
		box-shadow: -2px 0px 0px var(--color-ocean);
		padding: 0 0.5em;
		width: 100%;
	}`,
	'KOL-LINK': `:is(a, button) {
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
	:is(a, button):hover {
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
	}`,
	'KOL-DETAILS': `details > summary {
		border-radius: var(--border-radius);
	}
	details kol-indented-text {
		margin: 0.25em 0px 0px 0.65em;
	}
	kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
		margin-right: 0.5rem;
	}
	details[open] kol-icon::part(icon):before {
		content: "\\f078";
	}
	details:not([open]) kol-icon::part(icon):before {
		content: "\\f054";
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
	:host svg line:first-child,
	:host svg circle:first-child {
		fill: transparent;
		stroke: var(--color-ice);
	}
	:host svg line:last-child,
	:host svg circle:last-child {
		fill: transparent;
		stroke: var(--color-midnight);
	}`,
	'KOL-SELECT': `kol-input {
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
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(select, label, option) {
		opacity: 1;
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
		padding: 0.5em;
		border-radius: 0.25em;
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
	'KOL-INPUT-COLOR': `kol-input {
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
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"] {
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
	input:not([type="color"]):read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(input, label) {
		opacity: 1;
	}
	kol-input.disabled :is(input, .input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-ACCORDION': `kol-span-wc > span {
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
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
		color: var(--color-midnight);
	}
	:host > div.open > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\f078";
	}
	:host > div.close > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\f054";
	}
	:host > div {
		width: 100%;
		height: 100%;
		display: grid;
	}
	:host > div div[class="header"],
	:host > div[class*="open"] div[class="content"] {
		margin: 0;
	}
	:host > div div[class="content"] {
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
	}`,
	'KOL-TABLE': `:host * {
		hyphens: var(--kolibri-hyphens);
		font-family: var(--kolibri-font-family);
		line-height: var(--kolibri-line-height);
		word-break: break-word;
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
	th div.center {
		justify-content: center;
	}
	th div.right {
		justify-content: end;
	}
	tr:nth-child(even) {
		background-color: #f2f2f2;
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
	'KOL-NAV': `* {
		margin: 0;
		padding: 0;
	}
	nav {
		font-family: var(--font-family);
		font-size: var(--font-size);
		background-color: var(--color-smoke);
		width: 100%;
	}
	ul {
		list-style: none;
	}
	kol-link-wc,
	a {
		height: 100%;
		min-height: 44px;
		display: flex;
		place-items: center;
	}
	.entry > kol-span-wc > span {
		width: 100%;
	}
	.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
		background-color: var(--color-white);
		text-decoration: none;
		color: var(--color-midnight);
		width: 100%;
		display: flex;
		align-items: center;
		font-style: normal;
		line-height: 1.5rem;
		min-height: 44px;
		min-width: 44px;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
		letter-spacing: 0.175px;
	}
	.entry > :is(kol-link-wc, kol-button-wc):first-child :is(a, button) {
		color: var(--color-midnight);
		text-decoration: none;
	}
	.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
		border-left-color: var(--color-ocean);
		background-color: var(--color-ocean);
	}
	.entry
		> :is(kol-link-wc, kol-button-wc, kol-span-wc):first-child:hover
		> :is(a, button, span) {
		color: var(--color-white);
		font-weight: 700;
		letter-spacing: unset;
	}
	.selected > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
		background-color: var(--color-ice);
		color: var(--color-midnight);
		font-weight: 700;
	}
	.selected
		> :is(kol-link-wc, kol-button-wc, kol-span-wc):first-child
		> :is(a, button, span) {
		font-weight: 700;
	}
	.selected :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
		color: var(--color-white);
		letter-spacing: unset;
	}
	.entry > kol-span-wc > span,
	.entry :is(a, button) {
		border-left-color: transparent;
		border-left-style: solid;
		border-left-width: 0.5rem;
		padding: 0.75rem 0.5rem 0.75rem 0.25rem;
	}
	.selected :is(a, button),
	[exportparts*="selected"] a {
		border-left-color: var(--color-midnight);
	} /** Compact mode */
	.entry.compact :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
		place-items: center;
	}
	.entry.compact > kol-span-wc > span {
		flex-direction: column;
	}
	.entry.compact > kol-span-wc > span,
	.entry.compact :is(a, button) {
		padding-left: 0;
	}`,
	'KOL-CARD': `/* https://www.figma.com/file/56JbmrssCRpjpfxoAFeHqT/Design-System-EPLF-(in-progress)?node-id=8225%3A5945 */
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
	}`,
	'KOL-INPUT-CHECKBOX': `/* INPUT */
	:host kol-input {
		display: grid;
		align-items: center;
		justify-items: left;
		width: 100%;
		min-height: 44px;
		gap: 0.4em;
	}
	:host kol-input.default {
		grid-template-columns: 1.5rem auto;
	}
	:host kol-input.switch {
		grid-template-columns: 3.5rem auto;
	}
	:host kol-input > div.input {
		display: inherit;
		min-height: 44px;
		order: 2;
	}
	:host kol-input > div.input input {
		margin: 0px;
	}
	:host kol-input > label {
		cursor: pointer;
		order: 3;
	}
	:host kol-input > kol-alert.error {
		order: 1;
		padding-top: 0.25em;
		grid-column: span 2 / auto;
	}
	:host kol-input.error {
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
		cursor: pointer;
		order: 1;
		width: 100%;
		border-color: var(--color-grey);
		border-width: 2px;
		border-style: solid;
		border-radius: 5px; /* padding: 10px 14px; */
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
		content: "*";
		padding-left: 0.125em;
	}
	:host kol-input input[type="checkbox"] {
		appearance: none;
		background-color: white;
		cursor: pointer;
		transition: 0.5s;
	}
	:host kol-input input[type="checkbox"].kol-disabled:before {
		cursor: not-allowed;
	}
	:host kol-input input[type="checkbox"]:before {
		content: "";
		cursor: pointer;
	}
	:host kol-input input[type="checkbox"]:checked {
		background-color: var(--color-midnight);
		border-color: var(--color-midnight);
	}
	:host kol-input.default input[type="checkbox"] {
		border-radius: var(--border-radius);
		height: calc(6 * var(--spacing));
		min-width: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
	}
	:host kol-input.default input[type="checkbox"]:before {
		border-radius: 1.5em;
		background-color: transparent;
		display: block;
		height: calc(6 * var(--spacing));
		position: relative;
		width: calc(6 * var(--spacing));
	}
	:host kol-input.default input[type="checkbox"]:checked:before {
		border-right-width: 3px;
		border-bottom-width: 3px;
		left: calc(1.5 * var(--spacing) - 2px);
		top: calc(2.85 * var(--spacing) - 2px);
		transform: rotate(40deg) translate(-50%, -50%);
		background-color: transparent;
		border-width: 0px 3px 3px 0px;
		border-color: white;
		border-radius: 1px;
		border-style: solid;
		height: calc(3 * var(--spacing));
		width: calc(1.5 * var(--spacing));
	}
	:host kol-input.default input[type="checkbox"]:indeterminate {
		--tw-bg-opacity: 1;
		background-color: var(--color-midnight);
	}
	:host kol-input.default input[type="checkbox"]:indeterminate:before {
		background-color: var(--color-white);
		height: 0.125rem;
		top: 0.6rem;
		left: 0.25rem;
		width: calc(3 * var(--spacing));
		transform: inherit;
	}
	:host kol-input.default input[type="checkbox"]:checked:indeterminate:before {
		border-width: 0px 1px 1px 0px;
	}
	:host kol-input.switch input[type="checkbox"] {
		min-width: 3.5em;
		width: 3.5em;
		background-color: var(--color-grey);
		border-width: 0;
		height: 1.5em;
		border-radius: 1.25em;
		display: inline-block;
		position: relative;
	}
	:host kol-input.switch input[type="checkbox"]:before {
		-webkit-transition: 0.5s;
		-moz-transition: 0.5s;
		-ms-transition: 0.5s;
		transition: 0.5;
		width: 1.25em;
		height: 1.25em;
		left: calc(0.25em - 2px);
		top: calc(0.25em - 2px);
		border-radius: 1.25em;
		background-color: white;
		position: absolute;
	}
	:host kol-input.switch input[type="checkbox"]:checked {
		background-color: var(--color-midnight);
	}
	:host kol-input.switch input[type="checkbox"]:checked:before {
		-webkit-transform: translateX(2em);
		-moz-transform: translateX(2em);
		-ms-transform: translateX(2em);
		transform: translateX(2em);
		--tw-bg-opacity: 1;
	}
	:host kol-input.switch input[type="checkbox"]:indeterminate {
		--tw-bg-opacity: 1;
	}
	:host kol-input.switch input[type="checkbox"]:indeterminate:before {
		-webkit-transform: translateX(1em);
		-moz-transform: translateX(1em);
		-ms-transform: translateX(1em);
		transform: translateX(1em);
	}
	:host .disabled {
		opacity: 0.33;
	}`,
	'KOL-INPUT-RADIO': `/* INPUT */
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
		content: "*";
		padding-left: 0.125em;
	} /* RADIO */
	fieldset {
		border: 0px;
		margin: 0px;
		padding: 0px;
		display: grid;
		gap: 0.25em;
	}
	fieldset div {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		min-height: 44px;
		margin: 0;
	}
	fieldset div label {
		cursor: pointer;
		display: flex;
		padding-left: 0.25em;
		width: 100%;
	}
	fieldset div label span {
		margin-top: 0.125em;
	}
	fieldset div input[type="radio"] {
		appearance: none;
		transition: 0.5s;
		border-radius: 100%;
		height: calc(6 * var(--spacing));
		min-width: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
	}
	fieldset div input[type="radio"]:before {
		content: "";
		cursor: pointer;
		border-radius: 100%;
		display: block;
	}
	fieldset div input[type="radio"]:checked:before {
		background-color: var(--color-midnight);
	}
	fieldset div input[type="radio"]:disabled {
		cursor: not-allowed;
		border-color: var(--border-default);
		background-color: var(--background-light-grey);
	}
	fieldset #error {
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
		padding-left: 1em;
		border-left: 3px solid var(--color-red);
	}
	fieldset kol-alert#error {
		color: var(--color-red);
		font-weight: 700;
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
	.disabled {
		opacity: 0.33;
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
	fieldset [slot="input"] {
		gap: 0.5rem;
	}
	fieldset div label {
		padding-left: 0;
	}`,
	'KOL-TOAST': `:host > div {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 0;
		z-index: 200;
	}
	:host > div > kol-alert {
		display: block;
		margin-left: auto;
		margin-right: unset;
		padding: 2rem;
		max-width: 750px;
	}
	:host > div > kol-button-wc {
		top: 0;
		position: relative;
		display: block;
		width: 1em;
	}`,
	'KOL-TABS': `button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
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
	div[role="tabpanel"] {
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
	}`,
	'KOL-PAGINATION': `:host {
		display: grid;
		gap: 1rem;
	}
	:host > div {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5em;
	}
	:host .selected button {
		min-width: 44px;
		min-height: 44px;
		display: grid;
		line-height: 1.5rem;
		font-family: var(--font-family);
		cursor: not-allowed;
		font-weight: 700;
		padding: 10px 12px;
		border-radius: 1.5em;
		border: none;
		font-size: 16px;
		font-style: normal;
		text-align: center;
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
		color: var(--color-midnight);
		background-color: var(--color-ice);
		border-color: var(--color-ice);
	}
	:host > div > span {
		align-self: flex-end;
		padding-bottom: 0.5rem;
		color: var(--color-midnight);
	}
	kol-button::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	kol-button.first::part(icon):before {
		content: "\\f100";
	}
	kol-button.previous::part(icon):before {
		content: "\\f104";
	}
	kol-button.next::part(icon):before {
		content: "\\f105";
	}
	kol-button.last::part(icon):before {
		content: "\\f101";
	}`,
	'KOL-INPUT-RANGE': `kol-input {
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
	input:read-only,
	input:disabled {
		cursor: not-allowed;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error .input:focus-within {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-input.disabled :is(input, label) {
		opacity: 1;
	}
	kol-input.disabled :is(.input) {
		background-color: var(--color-smoke);
		border-color: var(--color-granite);
		color: var(--color-black);
	}`,
	'KOL-LINK-BUTTON': `:is(a, button):focus {
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
	:is(a, button):disabled > kol-span-wc {
		cursor: not-allowed;
		opacity: 0.5;
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
	}`,
	'KOL-BUTTON-LINK': `:is(a, button) {
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
	:is(a, button):hover {
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
	}`,
	'KOL-ABBR': `abbr {
		border-bottom: dashed var(--color-black) 1px;
		text-decoration: none !important;
	}`,
	'KOL-BREADCRUMB': `li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon {
		font-size: 0.75rem;
	}
	li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
		color: var(--color-grey);
	}
	li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon::part(icon)::before {
		content: "\\f054";
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
	}`,
	'KOL-MODAL': `:host .overlay .modal {
		max-height: calc(100% - 32px);
	}`,
	'KOL-ICON': `:host {
		width: 1em;
		height: 1em;
	}
	:host > i {
		width: 1em;
		height: 1em;
	}
	`,
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
});
