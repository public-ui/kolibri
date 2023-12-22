import { KoliBri } from '@public-ui/schema';

/**
 * Tag-function serves two purposes:
 * 1) By being named `css`, it provides developer support with syntax highlighting and Prettier support
 * 2) It wraps the styles in a CSS layer
 */
const cssWithCustomLayerName =
	(layerName: string) =>
	(input: TemplateStringsArray): string =>
		`@layer ${layerName} { ${input.join(``)} }`;
const css = (input: TemplateStringsArray): string => cssWithCustomLayerName('kol-theme-component')(input);

export const DEFAULT = KoliBri.createTheme('default', {
	GLOBAL: cssWithCustomLayerName('kol-theme-global')`
		:host {
			--border-radius: var(--kolibri-border-radius, 5px);
			--font-family: var(--kolibri-font-family, BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif);
			--font-size: var(--kolibri-font-size, 16px);
			--spacing: var(--kolibri-spacing, 0.25rem);
			--border-width: var(--kolibri-border-width, 1px);
			--color-primary: var(--kolibri-color-primary, #004b76);
			--color-primary-variant: var(--kolibri-color-primary-variant, #0077b6);
			--color-danger: var(--kolibri-color-danger, #c0003c);
			--color-warning: var(--kolibri-color-warning, #c44931);
			--color-success: var(--kolibri-color-success, #005c45);
			--color-subtle: var(--kolibri-color-subtle, #576164);
			--color-light: var(--kolibri-color-light, #ffffff);
			--color-text: var(--kolibri-color-text, #202020);
			--color-mute: var(--kolibri-color-mute, #f2f3f4);
			--color-mute-variant: var(--kolibri-color-mute-variant, #bec5c9);
		}
		:host {
			background-color: transparent; /* Reset global background-color defined by components */
			font-family: var(--font-family);
			font-size: var(--font-size);
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
			margin: 0;
			padding: 0;
		}
		*[tabindex]:focus,
		kol-input:not(.checkbox, .radio) .input:focus-within,
		kol-input:is(.checkbox, .radio) input:focus,
		summary:focus {
			cursor: pointer;
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
		kol-heading-wc {
			font-weight: 700;
		}
		kol-tooltip-wc .tooltip-floating {
			border: var(--border-width) solid var(--color-subtle);
			border-radius: var(--border-radius);
		}
		kol-tooltip-wc .tooltip-arrow {
			border: var(--border-width) solid var(--color-subtle);
		}
		kol-tooltip-wc .tooltip-area {
			background-color: var(--color-light);
		}
		kol-tooltip-wc .tooltip-content {
			border-radius: var(--border-radius);
			line-height: 1.5;
			padding: 0.5rem 0.75rem;
		}
		kol-span-wc,
		kol-span-wc > span {
			gap: 0.5rem;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	`,
	'KOL-BUTTON': css`
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: calc(var(--border-width) * 2);
			transition: outline-offset 0.2s linear;
		}
		:is(a, button) > kol-span-wc {
			font-weight: 700;
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: var(--border-width);
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
			background-color: var(--color-primary);
			border-color: var(--color-primary);
			color: var(--color-light);
		}
		.secondary :is(a, button) > kol-span-wc,
		.secondary :is(a, button):disabled:hover > kol-span-wc,
		.normal :is(a, button) > kol-span-wc,
		.normal :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-light);
			border-color: var(--color-primary);
			color: var(--color-primary);
		}
		.danger :is(a, button) > kol-span-wc,
		.danger :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
			color: var(--color-light);
		}
		.ghost :is(a, button) > kol-span-wc,
		.ghost :is(a, button):disabled:hover > kol-span-wc {
			border-color: var(--color-light);
			background-color: var(--color-light);
			box-shadow: none;
			color: var(--color-primary);
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
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		}
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
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
			border-color: var(--color-light);
			box-shadow: none;
			outline: none;
		}
		:is(a, button).hide-label > kol-span-wc {
			padding: 0.8rem;
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
			border-width: var(--border-width);
			border-color: var(--color-light);
			background-color: var(--color-light);
		}
		.ghost :is(a, button).small:active > kol-span-wc > span,
		.ghost :is(a, button).small:hover > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:active > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:hover > kol-span-wc > span {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		} /** :is(a,button) with transparent background */
		:is(a, button).transparent > kol-span-wc > span,
		.ghost :is(a, button).small.transparent > kol-span-wc > span,
		:is(a, button).transparent > kol-span-wc {
			background-color: transparent;
			border-color: transparent;
		}
		.access-key-hint {
			background: var(--color-mute-variant);
			border-radius: 3px;
			color: var(--color-text);
			padding: 0 0.3em;
		}
	`,
	'KOL-INPUT-TEXT': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
		}
	`,
	'KOL-INPUT-PASSWORD': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(button, input, label, option, select, textarea) {
			opacity: 1;
		}
		kol-input.disabled :is(input, select, textarea, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-NUMBER': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-DATE': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-EMAIL': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-FILE': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
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
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(button, input, label, option, select, textarea) {
			opacity: 1;
		}
		kol-input.disabled :is(input, select, textarea, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-TEXTAREA': css`
		kol-input {
			gap: 0.25rem;
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
		kol-input .counter {
			order: 4;
		}
		kol-input .hint {
			order: 5;
			font-size: 0.9rem;
			font-style: italic;
		}
		textarea {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		textarea:read-only,
		textarea:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
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
	`,
	'KOL-ALERT': css`
		.msg {
			border-width: 0;
		}
		kol-alert-wc {
			border-width: var(--border-width);
			border-style: solid;
			border-radius: var(--border-radius);
			display: flex;
			width: 100%;
			overflow: unset;
			border-color: transparent;
			background-color: var(--color-light);
		}
		kol-alert-wc > .heading {
			display: flex;
			gap: 0.5em;
			place-items: center;
		}
		kol-alert-wc > .heading > div {
			display: grid;
			gap: 0.25rem;
		}
		.msg > .heading > kol-icon {
			place-self: baseline;
		}
		kol-alert-wc > .heading > kol-button-wc.close {
			place-self: center;
		}
		.msg {
			align-items: start;
		}
		.default {
			border-color: var(--color-subtle);
		}
		.default.msg .heading-icon {
			color: var(--color-subtle);
		}
		.error {
			border-color: var(--color-danger);
		}
		.error.msg .heading-icon {
			color: var(--color-danger);
		}
		.info {
			border-color: var(--color-primary);
		}
		.info.msg .heading-icon {
			color: var(--color-primary);
		}
		.success {
			border-color: var(--color-success);
		}
		.success.msg .heading-icon {
			color: var(--color-success);
		}
		.warning {
			border-color: var(--color-warning);
		}
		.warning.msg .heading-icon {
			color: var(--color-warning);
		}
		.heading-icon {
			color: var(--color-light);
		}
		kol-alert-wc .heading .heading-icon {
			padding: 0;
		}
		.msg > .heading > .heading-icon {
			padding-top: 0;
			place-items: baseline;
		}
		.msg > .heading > div > kol-heading-wc {
			padding-top: calc(--var-spacing / 2);
		}
		.msg.default .heading > div > kol-heading-wc {
			color: var(--color-subtle);
		}
		.msg.error .heading > div > kol-heading-wc {
			color: var(--color-danger);
		}
		.msg.info .heading > div > kol-heading-wc {
			color: var(--color-primary);
		}
		.msg.success .heading > div > kol-heading-wc {
			color: var(--color-success);
		}
		.msg.warning .heading > div > kol-heading-wc {
			color: var(--color-warning);
		}
		.msg.default .close .icon {
			color: var(--color-subtle);
		}
		.msg.error .close .icon {
			color: var(--color-danger);
		}
		.msg.info .close .icon {
			color: var(--color-primary);
		}
		.msg.success .close .icon {
			color: var(--color-success);
		}
		.msg.warning .close .icon {
			color: var(--color-warning);
		}
		.card {
			border-width: var(--border-width);
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
			color: var(--color-light);
			display: flex;
			font-size: 1.25rem;
			line-height: 1.25rem;
		}
		.card > .heading kol-heading-wc > * {
			margin: auto 0;
		}
		.card > .content {
			padding: 1rem;
		}
		.card.default > .heading {
			background-color: var(--color-subtle);
		}
		.card.error > .heading {
			background-color: var(--color-danger);
		}
		.card.info > .heading {
			background-color: var(--color-primary);
		}
		.card.success > .heading {
			background-color: var(--color-success);
		}
		.card.warning > .heading {
			background-color: var(--color-warning);
		}
		:is(.error, .info, .success, .warning) .heading-icon {
			font-size: 1.25rem;
		}
		.card > div > .content {
			grid-row: 2;
			grid-column: 1 / span 2;
		}
		.card.default .close {
			background-color: var(--color-subtle);
		}
		.card.error .close {
			background-color: var(--color-danger);
		}
		.card.info .close {
			background-color: var(--color-primary);
		}
		.card.success .close {
			background-color: var(--color-success);
		}
		.card.warning .close {
			background-color: var(--color-warning);
		}
		.close > button {
			border-radius: 50%; /* visible on focus */
			color: var(--color-light);
			cursor: pointer;
			height: var(--a11y-min-size);
			width: var(--a11y-min-size);
		}
		.close > button.hide-label kol-icon {
			display: flex;
			width: 1em;
			height: 1em;
			font-size: 1.2rem;
		}
		.close > button:active {
			box-shadow: none;
			outline: none;
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
			font-size: inherit;
		}
		:host > span {
			border-radius: var(--border-radius);
			display: inline-flex;
			font-style: normal;
		}
		:host > span.smart-button {
			align-items: center;
		}
		:host > span kol-button-wc:hover > button {
			background-color: var(--color-primary-variant);
			color: var(--color-light);
		}
		:host > span kol-button-wc > button {
			color: inherit;
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			padding: 0.2rem;
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
			gap: var(--spacing);
		}
	`,
	'KOL-INDENTED-TEXT': css`
		:host > div {
			background-color: var(--color-light);
			border-left: none;
			box-shadow: -2px 0px 0px var(--color-primary-variant);
			padding: 0 0.5rem;
			width: 100%;
		}
	`,
	'KOL-LINK': css`
		:is(a, button) {
			color: var(--color-primary);
			font-style: normal;
			font-weight: 400;
			text-decoration-line: underline;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			border-radius: var(--border-radius);
			outline: var(--border-width) solid;
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
		}
	`,
	'KOL-DETAILS': css`
		details > summary {
			border-radius: var(--border-radius);
		}
		details kol-indented-text {
			margin: 0.25rem 0 0 0.65rem;
		}
		kol-icon {
			font-size: 1.2rem;
		}
	`,
	'KOL-PROGRESS': css`
		:host progress,
		:host span {
			display: block;
			height: 0px;
			overflow: hidden;
			width: 0px;
		}
		:host svg line:first-child,
		:host svg circle:first-child {
			fill: transparent;
			stroke: var(--color-mute-variant);
		}
		:host svg line:last-child,
		:host svg circle:last-child {
			fill: transparent;
			stroke: var(--color-primary);
		}

		.cycle .progress {
			stroke: var(--color-primary-variant);
		}
	`,
	'KOL-SELECT': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		select {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 2rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		select:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(select, label, option) {
			opacity: 1;
		}
		kol-input.disabled :is(select, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
		}
		select[multiple] {
			overflow: auto;
		}
		select option {
			margin: 1px 0;
			border-radius: var(--border-radius);
			cursor: pointer;
		}
		select option:disabled {
			cursor: not-allowed;
		}
		select:not([multiple]) option {
			padding: 0.5em;
		}
		option:active:not(:disabled),
		option:checked:not(:disabled),
		option:focus:not(:disabled),
		option:hover:not(:disabled) {
			background: var(--color-primary-variant);
			color: var(--color-light);
		}
	`,
	'KOL-INPUT-COLOR': css`
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
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
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-ACCORDION': css`
		kol-span-wc > span {
			display: flex;
			place-items: baseline center;
			text-align: left;
		}
		:host > div > kol-heading-wc button {
			border-radius: var(--border-radius);
			min-height: 2.2rem;
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
		:host > div > kol-heading-wc button kol-icon {
			color: var(--color-primary);
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
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
	`,
	'KOL-TABLE': css`
		:host * {
			hyphens: var(--hyphens);
			font-family: var(--font-family);
			line-height: var(--line-height);
			word-break: break-word;
		}
		:host > div {
			overflow-x: auto;
			overflow-y: hidden;
		}
		caption {
			padding: 0.5rem;
		}
		th {
			font-weight: normal;
			color: var(--color-primary);
		}
		:host table thead tr:first-child th,
		:host table thead tr:first-child td {
			border-width: 0;
			border-top-width: calc(var(--border-width) * 2);
			border-style: solid;
			border-color: var(--color-primary-variant);
		}
		table {
			width: 100%;
			border-spacing: 0;
		}
		table,
		:host table thead tr:last-child th,
		:host table thead tr:last-child td {
			border-width: 0;
			border-bottom-width: calc(var(--border-width) * 2);
			border-style: solid;
			border-color: var(--color-primary-variant);
		}
		th {
			background-color: var(--color-light);
		}
		th div {
			width: 100%;
			display: flex;
			gap: 0.5rem;
			grid-template-columns: 1fr auto;
			align-items: center;
		}
		tr:nth-child(even) {
			background-color: var(--color-mute);
		}
		th,
		td {
			padding: 0.5rem;
		}
		th[aria-sort='ascending'],
		th[aria-sort='descending'] {
			font-weight: 700;
		}
		:host > div:last-child {
			padding: 0.5rem;
		}
		:host > div:last-child,
		:host > div:last-child > div:last-child {
			display: grid;
			align-items: center;
			justify-items: center;
			gap: 1rem;
		}

		@media (min-width: 1024px) {
			div.pagination kol-pagination {
				display: flex;
				align-items: center;
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
			background-color: var(--color-mute);
			width: 100%;
		}
		ul {
			list-style: none;
		}
		kol-link-wc,
		a {
			height: 100%;
			min-height: var(--a11y-min-size);
			display: flex;
			place-items: center;
		}
		.entry > kol-span-wc > span {
			width: 100%;
		}
		.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
			background-color: var(--color-light);
			text-decoration: none;
			color: var(--color-primary);
			width: 100%;
			display: flex;
			align-items: center;
			font-style: normal;
			line-height: 1.5rem;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
			letter-spacing: 0.175px;
		}
		.entry > :is(kol-link-wc, kol-button-wc):first-child :is(a, button) {
			color: var(--color-primary);
			text-decoration: none;
		}
		.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
			border-left-color: var(--color-primary-variant);
			background-color: var(--color-primary-variant);
		}
		.entry > :is(kol-link-wc, kol-button-wc, kol-span-wc):first-child:hover > :is(a, button, span) {
			color: var(--color-primary-variant);
			font-weight: 700;
			letter-spacing: unset;
		}
		.selected > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
			background-color: var(--color-primary-variant);
			color: var(--color-primary);
			font-weight: 700;
		}
		.selected > :is(kol-link-wc, kol-button-wc, kol-span-wc):first-child > :is(a, button, span) {
			font-weight: 700;
		}
		.selected :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
			color: var(--color-primary-variant);
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
		[exportparts*='selected'] a {
			border-left-color: var(--color-primary);
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
		}
	`,
	'KOL-CARD': css`
		/* https://www.figma.com/file/56JbmrssCRpjpfxoAFeHqT/Design-System-EPLF-(in-progress)?node-id=8225%3A5945 */
		:host > div {
			display: grid;
			width: 100%;
			height: 100%;
			background-color: var(--color-light);
			grid-template-rows: min-content 2fr min-content;
			box-shadow: 0 0 0.25rem var(--color-subtle);
			border-radius: var(--border-radius);
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
	`,
	'KOL-INPUT-CHECKBOX': css`
		:host kol-input {
			display: grid;
			align-items: center;
			justify-items: left;
			width: 100%;
			min-height: var(--a11y-min-size);
			gap: 0.4rem;
		}
		:host kol-input.default {
			grid-template-columns: 1.5rem auto;
		}
		:host kol-input.switch {
			grid-template-columns: 3.5rem auto;
		}
		:host kol-input.button {
			gap: 0.4rem 0;
		}
		.checkbox-container {
			justify-content: flex-start;
		}
		:host kol-input > div.input {
			display: inherit;
			min-height: var(--a11y-min-size);
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
			padding-top: calc(var(--spacing) / 2);
			grid-column: span 2 / auto;
		}
		:host kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		:host kol-input.error input:focus,
		kol-input.error select:focus,
		kol-input.error textarea:focus {
			outline-color: var(--color-danger) !important;
		}
		:host kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		:host input {
			cursor: pointer;
			order: 1;
			width: 100%;
			border-color: var(--color-subtle);
			border-width: 2px;
			border-style: solid;
			border-radius: var(--border-radius);
			line-height: 24px;
			font-size: 1rem;
		}
		:host input:hover {
			border-color: var(--color-primary);
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
			cursor: pointer;
			transition: 0.5s;
		}
		:host kol-input input[type='checkbox']:checked {
			background-color: var(--color-primary);
			border-color: var(--color-primary);
		}
		:host kol-input.default input[type='checkbox'] {
			border-radius: var(--border-radius);
			height: calc(6 * 0.25rem);
			min-width: calc(6 * 0.25rem);
			width: calc(6 * 0.25rem);
		}
		:host kol-input.default input[type='checkbox']:indeterminate {
			background-color: var(--color-primary);
		}
		:host kol-input.default .icon {
			color: var(--color-light);
			margin-left: 0.25rem;
		}

		:host kol-input.switch input[type='checkbox'] {
			background-color: var(--color-subtle);
			border-radius: 1.25em;
			border-width: 0;
			display: block;
			height: 1.5em;
			min-width: 3.5em;
			position: relative;
			width: 3.5em;
		}
		:host kol-input.switch input[type='checkbox']:before {
			width: 1.25em;
			height: 1.25em;
			left: calc(0.25em - 2px);
			top: calc(0.25em - 2px);
			border-radius: 1.25em;
			background-color: white;
			position: absolute;
		}
		:host kol-input.switch input[type='checkbox']:checked {
			background-color: var(--color-primary);
		}
		:host kol-input.switch input[type='checkbox']:checked:before {
			transform: translateX(2em);
		}
		:host kol-input.switch input[type='checkbox']:indeterminate:before {
			transform: translateX(1em);
		}
		.switch {
			& .icon {
				width: 1.25em;
				height: 1.25em;
				left: 2px;
			}

			&.checked .icon {
				transform: translate(2em, -50%);
			}

			&.indeterminate .icon {
				transform: translate(1em, -50%);
			}
		}
		:host .disabled {
			opacity: 0.33;
		}
		.button:focus-within {
			border-radius: var(--border-radius);
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: calc(var(--border-width) * 2);
		}
	`,
	'KOL-INPUT-RADIO': css`
		label {
			cursor: pointer;
			display: grid;
			line-height: 20px;
			gap: calc(var(--spacing) * 2);
			width: 100%;
		}
		input {
			cursor: pointer;
			width: 100%;
			border-color: var(--color-subtle);
			border-width: 2px;
			border-style: solid;
			border-radius: 5px;
			line-height: 24px;
		}
		input:hover {
			border-color: var(--color-primary);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		}
		input:focus:hover {
			box-shadow: none;
		}
		input:hover {
			border-color: var(--color-primary);
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
			align-items: center;
			cursor: pointer;
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
			margin: 0;
			min-height: var(--a11y-min-size);
			position: relative;
		}
		.radio-input-wrapper label {
			cursor: pointer;
			display: flex;
			padding-left: calc(var(--spacing) / 2);
			width: 100%;
		}
		.radio-input-wrapper label span {
			margin-top: 0.125em;
		}
		.radio-input-wrapper input[type='radio'] {
			appearance: none;
			transition: 0.5s;
			border-radius: 100%;
			height: calc(6 * 0.25rem);
			min-width: calc(6 * 0.25rem);
			width: calc(6 * 0.25rem);
		}
		.radio-input-wrapper input[type='radio']:before {
			content: '';
			cursor: pointer;
			border-radius: 100%;
			display: block;
		}
		.radio-input-wrapper input[type='radio']:checked:before {
			background-color: var(--color-primary);
		}
		.radio-input-wrapper input[type='radio']:disabled {
			cursor: not-allowed;
			background-color: var(--color-mute-variant);
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
			border-left: 3px solid var(--color-danger);
			color: var(--color-danger);
			font-weight: 700;
			padding-left: 1rem;
		}
		fieldset.error input:focus,
		fieldset.error select:focus,
		fieldset.error textarea:focus {
			outline-color: var(--color-danger) !important;
		}
		fieldset.error kol-alert.error {
			margin-left: -0.25em;
			color: var(--color-danger);
			font-weight: 700;
		}
		.disabled {
			opacity: 0.33;
		}
		fieldset.horizontal {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing) calc(var(--spacing) * 2);
		}
		fieldset.horizontal legend {
			display: inline-block;
			margin-bottom: calc(var(--spacing) / 2);
		}
		fieldset .input-slot {
			gap: var(--spacing);
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
		}
		.toast {
			margin-top: 1rem;
		}
	`,
	'KOL-TABS': css`
		button:disabled {
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
			border-radius: var(--border-radius);
			font-style: normal;
			font-weight: 700;
			font-size: 18px;
			line-height: 22px;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			color: var(--color-subtle);
			padding: 0;
		}
		button:hover {
			color: var(--color-primary);
		}
		button.primary,
		button.selected {
			color: var(--color-primary);
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
			margin: 0px 1rem 0px 0px;
		}
		:host > .tabs-align-bottom > kol-button-group-wc > div > div {
			margin: 0px 1rem;
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
			margin: 0px 1rem 0px 0px;
		}
		:host > .tabs-align-top > kol-button-group-wc > div > div {
			margin: 0px 1rem;
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
		.button:focus {
			outline: none;
		}
		.button-inner {
			background-color: var(--color-light);
			border-radius: var(--border-radius);
			border: 1px solid var(--color-primary);
			color: var(--color-primary);
			font-weight: 700;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 8px;
			text-align: center;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
		}
		.button:focus .button-inner {
			outline-offset: 2px;
			outline: 2px solid var(--color-primary-variant);
			transition: outline-offset 0.2s linear;
		}
		.button:is(:active, :hover):not(:disabled) .button-inner {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		}
		.button:active .button-inner {
			color: var(--color-light);
			outline: none;
		}
		.button:disabled .button-inner {
			cursor: not-allowed;
			opacity: 0.5;
		}
		.selected .button-inner {
			background-color: var(--color-mute-variant);
			border-radius: var(--a11y-min-size);
			border: 0;
			opacity: 1 !important;
		}
	`,
	'KOL-INPUT-RANGE': css`
		.inputs-wrapper {
			gap: 1rem;
		}
		kol-input {
			gap: 0.25rem;
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
			font-size: 0.9rem;
			font-style: italic;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 0.5rem;
		}
		.input > kol-icon {
			width: 1rem;
		}
		.input.icon-left > kol-icon:first-child {
			margin-right: 0.5rem;
		}
		.input.icon-right > kol-icon:last-child {
			margin-left: 0.5rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: 1rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(.input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-LINK-BUTTON': css`
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: calc(var(--border-width) * 2);
			transition: outline-offset 0.2s linear;
		}
		:is(a, button) > kol-span-wc {
			font-weight: 700;
			border-radius: var(--a11y-min-size);
			border-style: solid;
			outline-width: calc(var(--border-width) * 2);
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
			background-color: var(--color-primary);
			border-color: var(--color-primary);
			color: var(--color-light);
		}
		.secondary :is(a, button) > kol-span-wc,
		.secondary :is(a, button):disabled:hover > kol-span-wc,
		.normal :is(a, button) > kol-span-wc,
		.normal :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-light);
			border-color: var(--color-primary);
			color: var(--color-primary);
		}
		.danger :is(a, button) > kol-span-wc,
		.danger :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
			color: var(--color-light);
		}
		.ghost :is(a, button) > kol-span-wc,
		.ghost :is(a, button):disabled:hover > kol-span-wc {
			border-color: var(--color-light);
			background-color: var(--color-light);
			box-shadow: none;
			color: var(--color-primary);
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
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		}
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
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
			border-color: var(--color-light);
			box-shadow: none;
			outline: none;
		}
		:is(a, button).hide-label > kol-span-wc {
			padding: 0.8rem;
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
			border-width: var(--border-width);
			border-color: var(--color-light);
			background-color: var(--color-light);
		}
		.ghost :is(a, button).small:active > kol-span-wc > span,
		.ghost :is(a, button).small:hover > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:active > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:hover > kol-span-wc > span {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
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
			color: var(--color-primary);
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
			outline: calc(var(--border-width) * 2) solid;
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
		}
		.access-key-hint {
			background: var(--color-mute-variant);
			border-radius: 3px;
			color: var(--color-text);
			padding: 0 0.3em;
		}
	`,
	'KOL-ABBR': css`
		abbr {
			border-bottom: dashed var(--color-text) 1px;
			text-decoration: none !important;
		}
	`,
	'KOL-BREADCRUMB': css`
		li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon {
			font-size: 0.75rem;
			color: var(--color-subtle);
		}
		kol-link::part(icon) {
			font-size: 1.25rem;
		}
		ul li > :is(span, kol-link) {
			line-height: 1.25rem;
			height: 20px;
		}
		ul li:last-child > span {
			color: var(--color-subtle);
		}
	`,
	'KOL-MODAL': css`
		:host .overlay .modal {
			max-height: calc(100% - 32px);
		}
	`,
	'KOL-ICON': css`
		:host {
			width: 1em;
			height: 1em;
		}
		:host > i {
			width: 1em;
			height: 1em;
		}
	`,
	'KOL-SKIP-NAV': css`
		kol-link-wc > a > kol-span-wc {
			border-radius: var(--a11y-min-size);
			border-style: solid;
			border-width: var(--border-width);
			gap: calc(var(--spacing) * 2);
			line-height: 1rem;
			padding: 8px 14px;
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			color: var(--color-light);
			cursor: pointer;
		}
	`,
	'KOL-SPLIT-BUTTON': css`
		.popover {
			background: #fff;
		}
	`,
});
