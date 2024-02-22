import { KoliBri } from '@public-ui/schema';
import { css } from './cssTag';

// Informationstechnikzentrum Bund
export const ITZBund = KoliBri.createTheme('itzbund', {
	GLOBAL: css`
		:host {
			--border-color: var(--color-anthrazit);
			--border-radius: 0.125rem;
			--color-anthrazit: #333;
			--color-jade: #f3f7fb;
			--color-weiss: #fff;
			--color-petrol: #007a89;
			--color-achat: #0b4d59;
			--color-teal: #056773;
			--color-fluorit: #66ddec;
			--color-rotton: rgba(188, 0, 0, 1);
			--color-rotton-20: rgba(188, 0, 0, 0.2);
			--color-gras: #138510;
			--color-warn: #f0541e;
			--color-blut: var(--color-rotton);
			--color-input-bg-default: #e8edf2;
			--gradient-petrol-achat: linear-gradient(67deg, var(--color-petrol), var(--color-achat));
			--color-citrin: #d4c912;
			--color-umber: #494500;
			--color-gelb: #fff443;
			--color-lichtgelb: #eeff6c;
			--gradient-gelb-citrin: linear-gradient(67deg, var(--color-gelb), var(--color-citrin));
			--font-family-sans: BundesSans Web;
			--font-family-serif: BundesSerif Web;
			--font-size: 16px;
			--spacing: 0.125em;
			--kolibri-spacing: calc(2 * var(--spacing));
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
		a:focus,
		button:focus,
		input:focus,
		select:focus,
		summary:focus,
		textarea:focus {
			cursor: pointer;
			outline-color: var(--color-petrol);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
		kol-span-wc,
		kol-span-wc > span {
			gap: 0.25em;
		}
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
	`,
	'KOL-BUTTON': css`
		button {
			background-color: transparent;
		}
		a,
		button {
			border-radius: 2rem !important;
			font-family: var(--font-family-sans);
			/* text-transform: uppercase; */
		}
		a > kol-span-wc,
		button > kol-span-wc {
			border-radius: 2rem;
			border-style: solid;
			min-width: 44px;
			min-height: 44px;
			border-width: var(--spacing);
			font-size: inherit; /*line-height: 1.25em;*/ /*padding: calc(4 * var(--spacing));*/
			padding: 0 1rem;
		}
		.button a.hide-label > kol-span-wc,
		.button button.hide-label > kol-span-wc {
			padding: 0 0.5rem;
		}
		a > kol-span-wc,
		button > kol-span-wc {
			gap: 0.25em;
			transition-delay: 0;
			transition-timing-function: ease-in-out;
			transition-duration: 0.5s;
			transition-property: background, color, border-color;
		}
		kol-link-wc.primary > a > kol-span-wc,
		kol-link-wc.primary > a:disabled:hover > kol-span-wc,
		button.primary > kol-span-wc,
		button.primary:disabled:hover > kol-span-wc {
			background-color: var(--color-petrol);
			border-color: var(--color-petrol);
			color: var(--color-weiss);
		}
		kol-link-wc.primary > a:hover > kol-span-wc,
		kol-link-wc.primary > a:focus > kol-span-wc,
		button.primary:hover > kol-span-wc,
		button.primary:focus > kol-span-wc {
			background-color: var(--color-achat);
			border-color: var(--color-achat);
		}
		kol-link-wc.secondary > a > kol-span-wc,
		kol-link-wc.secondary > a:disabled:hover > kol-span-wc,
		button.secondary > kol-span-wc,
		button.secondary:disabled:hover > kol-span-wc {
			background-color: var(--color-weiss);
			border-color: var(--color-petrol);
			color: var(--color-petrol);
		}
		kol-link-wc.secondary > a:hover > kol-span-wc,
		kol-link-wc.secondary > a:focus > kol-span-wc,
		button.secondary:hover > kol-span-wc,
		button.secondary:focus > kol-span-wc {
			background-color: var(--color-petrol);
			border-color: var(--color-petrol);
			color: var(--color-weiss);
		}
		kol-link-wc.normal > a > kol-span-wc,
		kol-link-wc.normal > a:disabled:hover > kol-span-wc,
		button.normal > kol-span-wc,
		button.normal:disabled:hover > kol-span-wc {
			background-color: var(--color-weiss);
			border-color: var(--color-anthrazit);
			color: var(--color-anthrazit);
		}
		kol-link-wc.normal > a:hover > kol-span-wc,
		kol-link-wc.normal > a:focus > kol-span-wc,
		button.normal:hover > kol-span-wc,
		button.normal:focus > kol-span-wc {
			background-color: var(--color-anthrazit);
			border-color: var(--color-anthrazit);
			color: var(--color-weiss);
		}
		kol-link-wc.danger > a > kol-span-wc,
		kol-link-wc.danger > a:disabled:hover > kol-span-wc,
		button.danger > kol-span-wc,
		button.danger:disabled:hover > kol-span-wc {
			background-color: var(--color-weiss);
			border-color: var(--color-blut);
			color: var(--color-blut);
		}
		kol-link-wc.danger > a:hover > kol-span-wc,
		kol-link-wc.danger > a:focus > kol-span-wc,
		button.danger:hover > kol-span-wc,
		button.danger:focus > kol-span-wc {
			background-color: var(--color-blut);
			border-color: var(--color-blut);
			color: var(--color-weiss);
		}
		kol-link-wc.ghost > a > kol-span-wc,
		kol-link-wc.ghost > a:disabled:hover > kol-span-wc,
		button.ghost > kol-span-wc,
		button.ghost:disabled:hover > kol-span-wc {
			background-color: var(--color-ghost);
			border-color: transparent;
			color: var(--color-anthrazit);
		}
		kol-link-wc.ghost > a:hover > kol-span-wc,
		kol-link-wc.ghost > a:focus > kol-span-wc,
		button.ghost:hover > kol-span-wc,
		button.ghost:focus > kol-span-wc {
			background-color: var(--color-ghost);
			border-color: var(--color-ghost);
			color: var(--color-anthrazit);
		}
	`,
	'KOL-BUTTON-GROUP': css`
		:host > kol-button-group-wc {
			display: inline-flex;
			flex-wrap: wrap;
			gap: 0.25rem;
		}
	`,
	'KOL-LINK-BUTTON': css`
		a,
		button {
			border-radius: 2rem !important;
			font-family: var(--font-family-sans);
			/* text-transform: uppercase; */
		}
		a > kol-span-wc,
		button > kol-span-wc {
			border-radius: 2rem;
			border-style: solid;
			min-width: 44px;
			min-height: 44px;
			border-width: var(--spacing);
			font-size: inherit; /*line-height: 1.25em;*/ /*padding: calc(4 * var(--spacing));*/
			padding: 0 1rem;
		}
		.button a.hide-label > kol-span-wc,
		.button button.hide-label > kol-span-wc {
			padding: 0 0.5rem;
		}
		a > kol-span-wc,
		button > kol-span-wc {
			gap: 0.25em;
			transition-delay: 0;
			transition-timing-function: ease-in-out;
			transition-duration: 0.5s;
			transition-property: background, color, border-color;
		}
		kol-link-wc.primary > a > kol-span-wc,
		kol-link-wc.primary > a:disabled:hover > kol-span-wc,
		button.primary > kol-span-wc,
		button.primary:disabled:hover > kol-span-wc {
			background-color: var(--color-petrol);
			border-color: var(--color-petrol);
			color: var(--color-weiss);
		}
		kol-link-wc.primary > a:hover > kol-span-wc,
		kol-link-wc.primary > a:focus > kol-span-wc,
		button.primary:hover > kol-span-wc,
		button.primary:focus > kol-span-wc {
			background-color: var(--color-achat);
			border-color: var(--color-achat);
		}
		kol-link-wc.secondary > a > kol-span-wc,
		kol-link-wc.secondary > a:disabled:hover > kol-span-wc,
		button.secondary > kol-span-wc,
		button.secondary:disabled:hover > kol-span-wc {
			background-color: var(--color-weiss);
			border-color: var(--color-petrol);
			color: var(--color-petrol);
		}
		kol-link-wc.secondary > a:hover > kol-span-wc,
		kol-link-wc.secondary > a:focus > kol-span-wc,
		button.secondary:hover > kol-span-wc,
		button.secondary:focus > kol-span-wc {
			background-color: var(--color-petrol);
			border-color: var(--color-petrol);
			color: var(--color-weiss);
		}
		kol-link-wc.normal > a > kol-span-wc,
		kol-link-wc.normal > a:disabled:hover > kol-span-wc,
		button.normal > kol-span-wc,
		button.normal:disabled:hover > kol-span-wc {
			background-color: var(--color-weiss);
			border-color: var(--color-anthrazit);
			color: var(--color-anthrazit);
		}
		kol-link-wc.normal > a:hover > kol-span-wc,
		kol-link-wc.normal > a:focus > kol-span-wc,
		button.normal:hover > kol-span-wc,
		button.normal:focus > kol-span-wc {
			background-color: var(--color-anthrazit);
			border-color: var(--color-anthrazit);
			color: var(--color-weiss);
		}
		kol-link-wc.danger > a > kol-span-wc,
		kol-link-wc.danger > a:disabled:hover > kol-span-wc,
		button.danger > kol-span-wc,
		button.danger:disabled:hover > kol-span-wc {
			background-color: var(--color-weiss);
			border-color: var(--color-blut);
			color: var(--color-blut);
		}
		kol-link-wc.danger > a:hover > kol-span-wc,
		kol-link-wc.danger > a:focus > kol-span-wc,
		button.danger:hover > kol-span-wc,
		button.danger:focus > kol-span-wc {
			background-color: var(--color-blut);
			border-color: var(--color-blut);
			color: var(--color-weiss);
		}
		kol-link-wc.ghost > a > kol-span-wc,
		kol-link-wc.ghost > a:disabled:hover > kol-span-wc,
		button.ghost > kol-span-wc,
		button.ghost:disabled:hover > kol-span-wc {
			background-color: var(--color-ghost);
			border-color: transparent;
			color: var(--color-anthrazit);
		}
		kol-link-wc.ghost > a:hover > kol-span-wc,
		kol-link-wc.ghost > a:focus > kol-span-wc,
		button.ghost:hover > kol-span-wc,
		button.ghost:focus > kol-span-wc {
			background-color: var(--color-ghost);
			border-color: var(--color-ghost);
			color: var(--color-anthrazit);
		}
	`,
	'KOL-PAGINATION': css`
		.button {
			border-radius: 2rem;
			font-family: var(--font-family-sans);
		}
		.button-inner {
			background-color: var(--color-weiss);
			border-radius: 2rem;
			border: var(--spacing) solid var(--color-anthrazit);
			color: var(--color-anthrazit);
			font-size: inherit;
			gap: 0.25em;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 0 1rem;
			transition-duration: 0.5s;
			transition-property: background, color, border-color;
			transition-timing-function: ease-in-out;
		}
		.hide-label .button-inner {
			padding: 0 0.5rem;
		}
		.button:not(:disabled):hover .button-inner,
		.button:focus .button-inner {
			background-color: var(--color-anthrazit);
			border-color: var(--color-anthrazit);
			color: var(--color-weiss);
		}
		.selected .button-inner {
			background-color: var(--color-achat);
			border-color: var(--color-achat);
			color: var(--color-weiss);
			font-weight: bold;
			text-decoration: underline;
		}
	`,
	'KOL-BUTTON-LINK': css`
		kol-link-wc a,
		kol-button-wc button {
			text-decoration-line: none;
		}
		a,
		button {
			background-image: repeating-linear-gradient(to right, #66ddec, #66ddec);
			background-repeat: no-repeat;
			background-position: left 0 bottom 0;
			background-size: 25% 0.25ex;
			border-radius: var(--spacing);
			color: var(--color-petrol);
			font-family: var(--font-family-sans);
			font-size: inherit;
			/* text-transform: uppercase; */
			transition-delay: 0;
			transition-timing-function: ease-in-out;
			transition-duration: 0.5s;
			transition-property: background, color, border-color;
		}
		a:focus,
		a:hover,
		button:focus,
		button:hover {
			background-size: 100% 0.25ex;
			color: var(--color-achat);
		}
		a > kol-span-wc,
		button > kol-span-wc {
			gap: 0.25em;
		}
		.hidden {
			display: none;
			visibility: hidden;
		}
		a.skip {
			left: -99999px;
			overflow: hidden;
			position: absolute;
			z-index: 9999999;
		}
		a.skip:focus {
			background-color: white;
			box-shadow: 0 0 0.5rem 0.5rem white;
			left: unset;
			position: unset;
		}
	`,
	'KOL-INPUT-TEXT': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-INPUT-PASSWORD': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-INPUT-NUMBER': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-INPUT-DATE': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-INPUT-EMAIL': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-INPUT-FILE': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-TEXTAREA': css`
		textarea:hover,
		textarea:focus {
			border-color: var(--default-border-hover);
			outline-color: var(--primary) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--default-letter);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		textarea.error {
			background-color: var(--danger-light) !important;
			border-color: var(--danger);
		}
		textarea {
			width: 100%;
			color: var(--default-letter);
			border-width: 1px;
			border-style: solid;
			line-height: 24px;
			font-size: 16px;
			border-color: var(--kolibri-color-normal);
			border-radius: 0;
			background-color: #e8edf2 !important;
		}
		textarea::placeholder {
			color: var(--default-border);
		}
		textarea:disabled {
			cursor: not-allowed;
		}
		textarea:disabled,
		textarea:read-only {
			border-color: var(--border-default);
			background-color: var(--background-light-grey);
		}
		.kol-required span::after {
			content: '*';
		}
		kol-alert {
			margin-top: var(--spacing);
			display: block;
		}
	`,
	'KOL-ALERT': css`
		:host {
			--kolibri-border-width: 1px;
		}
		:host .default {
			border-color: var(--color-anthrazit);
		}
		.heading {
			gap: 0.5rem;
		}
		.default .heading-icon {
			background-color: var(--color-anthrazit);
		}
		:host .error {
			border-color: var(--color-rotton);
		}
		.error .heading-icon {
			background-color: var(--color-rotton);
		}
		:host .info {
			border-color: var(--color-petrol);
		}
		.info .heading-icon {
			background-color: var(--color-petrol);
		}
		:host .success {
			border-color: var(--color-gras);
		}
		:host .success .heading-icon {
			background-color: var(--color-gras);
		}
		:host .warning {
			border-color: var(--color-warn);
		}
		.warning .heading-icon {
			background-color: var(--color-warn);
		}
	`,
	'KOL-HEADING': css`
		.headline-h1,
		.headline-h2,
		.headline-h3,
		.headline-h4,
		.headline-h5,
		.headline-h6 {
			line-height: 1em;
			margin: 0;
			padding: 0;
		}
		.headline-h1 {
			font-family: var(--font-family-serif);
			font-size: 54px;
			font-weight: bold;
		}
		.headline-h2 {
			font-family: var(--font-family-serif);
			font-size: 32px;
			font-weight: bold;
		}
		.headline-h3 {
			font-family: var(--font-family-serif);
			font-size: 26px;
			font-weight: bold;
		}
		.headline-h4 {
			font-family: var(--font-family-serif);
			font-size: 20px;
			font-weight: normal;
		}
		.headline-h5 {
			font-family: var(--font-family-serif);
			font-size: 17px;
			font-weight: bold;
		}
		.headline-h6 {
			font-family: var(--font-family-sans);
			font-size: 17px;
			font-weight: normal;
		}
	`,
	'KOL-BADGE': css`
		:host {
			display: inline-block;
			font-family: inherit;
		}
		:host > span {
			border-radius: 0.3125rem;
			display: inline-flex;
		}
		:host > span kol-button-wc {
			border-left: 1px solid rgba(0, 0, 0, 0.25);
		}
		:host > span kol-span-wc {
			padding: 0.25rem 0.5rem;
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
		:host button {
			border-radius: 0 var(--spacing) var(--spacing) 0;
		}
	`,
	'KOL-INDENTED-TEXT': css`
		:host > div {
			background: var(--color-white);
			border-left: none;
			box-shadow: -4px 0px 0px var(--color-petrol);
			padding: 0.25em 0.5em;
			width: 100%;
		}
	`,
	'KOL-LINK': css`
		kol-link-wc a,
		kol-button-wc button {
			text-decoration-line: none;
		}
		a,
		button {
			background-image: repeating-linear-gradient(to right, #66ddec, #66ddec);
			background-repeat: no-repeat;
			background-position: left 0 bottom 0;
			background-size: 25% 0.25ex;
			border-radius: var(--spacing);
			color: var(--color-petrol);
			font-family: var(--font-family-sans);
			font-size: inherit;
			/* text-transform: uppercase; */
			transition-delay: 0;
			transition-timing-function: ease-in-out;
			transition-duration: 0.5s;
			transition-property: background, color, border-color;
		}
		a:focus,
		a:hover,
		button:focus,
		button:hover {
			background-size: 100% 0.25ex;
			color: var(--color-achat);
		}
		a > kol-span-wc,
		button > kol-span-wc {
			gap: 0.25em;
		}
		.hidden {
			display: none;
			visibility: hidden;
		}
		a.skip {
			left: -99999px;
			overflow: hidden;
			position: absolute;
			z-index: 9999999;
		}
		a.skip:focus {
			background-color: white;
			box-shadow: 0 0 0.5rem 0.5rem white;
			left: unset;
			position: unset;
		}
	`,
	'KOL-BREADCRUMB': css`
		li > span {
			font-weight: bold;
			/* text-transform: uppercase; */
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
	'KOL-PROGRESS': css`
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
			stroke: var(--color-fluorit);
		}
		svg line:last-child,
		svg circle:last-child {
			stroke: var(--color-achat);
			fill: transparent;
		}
		progress {
			display: none;
		}
	`,
	'KOL-SELECT': css`
		select:hover,
		select:focus {
			border-color: var(--default-border-hover);
			outline-color: var(--primary) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--default-letter);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		select.error {
			background-color: var(--danger-light) !important;
			border-color: var(--danger);
		}
		select {
			width: 100%;
			color: var(--default-letter);
			border-width: 1px;
			border-style: solid;
			line-height: 24px;
			font-size: 16px;
			border-color: var(--kolibri-color-normal);
			border-radius: 0;
			background-color: #e8edf2 !important;
		}
		select:disabled {
			cursor: not-allowed;
			border-color: var(--border-default);
			background-color: var(--background-light-grey);
		}
		option {
			height: 2em;
		}
		select:not([multiple]) option {
			padding: 0.5em;
		}
		kol-alert {
			margin-top: var(--spacing);
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
	`,
	'KOL-INPUT-COLOR': css`
		input:hover,
		input:focus {
			border-color: var(--border-color) !important;
			border-radius: none !important;
			outline-color: var(--color-achat) !important;
			outline-offset: 0;
			outline-style: solid;
			outline-width: 1px;
		}
		label {
			color: var(--color-anthrazit);
			font-size: 14px;
			line-height: 20px;
			gap: 8px;
			width: 100%;
			font-weight: bold;
		}
		input {
			cursor: pointer;
			width: 100%;
			color: var(--color-anthrazit);
			border-width: 1px;
			border-style: solid;
			border-color: var(--color-petrol);
			border-radius: 0;
			background-color: #e8edf2 !important;
			overflow: hidden;
			line-height: 24px;
			font-size: 16px;
		}
		.error input {
			background-color: var(--color-rotton-20) !important;
			border-color: var(--color-rotton) !important;
		}
		input:disabled {
			background-color: var(--color-input-bg-default);
			border-color: var(--border-color);
			cursor: not-allowed;
		}
		kol-alert {
			margin-top: calc(2 * var(--spacing));
			display: block;
		}
		.kol-required span::after {
			content: '*';
		}
		input::placeholder {
			font-style: italic;
		}
	`,
	'KOL-ACCORDION': css`
		:host > div {
			font-family: var(--font-family);
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			display: grid;
			border-color: var(--kolibri-border-color);
			border-width: 1px;
			border-style: solid;
			border-radius: 0.25rem;
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
			line-height: 1.75em;
			background-color: transparent;
			padding: 0.5rem;
		}
		:host > div[part*='open'] > kol-heading-wc button {
			padding-bottom: 0;
		}
		:host > div[part*='open'] > kol-heading-wc button kol-icon {
			width: 1em;
		}
		:host > div div[part='header'],
		:host > div[part*='open'] div[part='content'] {
			margin: 0;
		}
		:host > div div[part='header'] {
			padding-left: 2rem;
		}
		:host > div[part*='open'] div[part='content'] {
			margin: 0;
			padding: 0 1rem 1rem 2.25rem;
		}
		:host > div > kol-heading-wc button kol-icon::part(icon) {
			color: var(--color-midnight);
		}
		button {
			cursor: pointer;
			font-weight: inherit;
			font-size: inherit;
			line-height: inherit;
		}
		.content {
			padding: 0.5rem;
		}
		:host > div > kol-heading-wc button kol-icon::part(close)::before {
			font-family: 'Font Awesome 6 Free';
			content: '\\f077';
		}
		:host > div > kol-heading-wc button kol-icon::part(open)::before {
			font-family: 'Font Awesome 6 Free';
			content: '\\f078';
		}
	`,
	'KOL-TABLE': css`
		:host > div {
			overflow-x: auto;
			overflow-y: hidden;
		}
		:host > div:last-child {
			border-style: solid;
			border-width: 1px;
			border-color: var(--border-color);
		}
		.table {
			padding: 0.5em;
		}
		.table:has(.focus-element:focus) {
			outline-color: var(--color-petrol);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
			transition: outline-offset 0.2s linear;
		}
		table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0;
		}
		table,
		tr,
		th,
		td {
			border: 0 solid var(--border-color);
		}
		tr {
			border-top-width: 1px;
		}
		tr:nth-child(even) {
			background-color: #f2f2f2;
		}
		th,
		td {
			border-right-width: 1px;
			padding: 0.25em 0.5em;
		}
		th {
			background-color: #eee;
		}
		.table-sort-button .button {
			font-weight: bold;
		}
		@media (min-width: 1024px) {
			:host > div.pagination,
			:host > div.pagination > div:last-child {
				grid-auto-flow: column;
			}
			:host > div.pagination kol-pagination {
				display: flex;
				gap: 1rem;
			}
		}
	`,
	'KOL-NAV': css`
		:host .hidden {
			display: none;
		}
		:host > div > nav ul {
			list-style: none;
			margin: 0px;
			padding: 0px;
			border-radius: var(--border-radius);
			background-color: var(--color-petrol);
		}
		:host > div > nav ul > li {
			border-radius: var(--border-radius);
			overflow: hidden;
			padding: 0.125em;
		}
		:host > div > nav ul > li[part*='vertical'] + li {
			border-radius: 0;
			border-top: 0.1em dotted white;
		}
		:host > div > nav ul > li[part*='vertical selected'] {
			border-right: 0.375em solid var(--color-citrin);
		}
		:host > div > nav ul > li[part*='horizontal'] + li {
			border-radius: 0;
			border-left: 0.1em dotted white;
		}
		:host > div > nav ul > li[part*='horizontal selected'] {
			border-bottom: 0.375em solid var(--color-citrin);
		}
		:host > div > nav ul > li > div {
			height: 100%;
		}
		:host > div > nav kol-link-wc {
			width: 100%; /*height: 100%;font-weight: 600;*/
			display: block;
		}
		:host > div > nav kol-link-wc a {
			border-radius: var(--border-radius);
			background-color: var(--color-petrol);
			border: 1px solid transparent;
			grid: flex;
			line-height: 2em;
			padding: 0.5em;
			color: white;
			height: 100%;
			-webkit-box-align: center;
			align-items: center;
			display: flex;
			cursor: pointer;
			text-decoration: inherit;
		}
		:host > div > nav kol-link-wc[exportparts*='selected'] a {
			background-color: var(--color-achat);
			font-weight: 700;
		}
		:host > div > nav kol-link-wc a kol-icon.mr-2 {
			margin-right: calc(2 * 2 * var(--spacing));
		}
		:host > div > nav kol-link-wc a kol-icon.ml-2 {
			margin-left: calc(2 * 2 * var(--spacing));
		}
		:host > div > nav kol-link-wc a:focus,
		:host > div > nav kol-link-wc a:hover {
			border: 1px solid white;
			background-color: var(--color-fluorit);
			color: var(--color-anthrazit);
		} /* compact button */
		:host > div > div:last-child {
			margin-top: 0.5em;
			width: 100%;
			text-align: center;
		}
		:host > div > nav kol-link-wc a.text-center {
			display: grid;
			align-items: center;
			justify-items: center;
		} /* horizontal */
		ul.flex {
			display: flex;
		}
		li > div > div.absolute {
			position: absolute;
		}
		kol-span-wc {
			justify-items: baseline;
		}
	`,
	'KOL-CARD': css`
		:host > div {
			background-color: white;
			border-color: var(--border-color);
			border-style: solid;
			border-width: 1px;
			border-radius: calc(2 * var(--border-radius));
			width: 100%;
			height: 100%;
		}
		kol-heading {
			padding: 0.5rem;
			display: block;
			border-bottom-style: solid;
			border-bottom-color: var(--border-color);
			border-bottom-width: 1px;
		}
		:host > div > div {
			display: block;
			padding: 0.5rem;
		}
		:host > div > div:last-child {
			display: block;
			padding: 0.5rem;
			border-top-style: solid;
			border-top-color: var(--color-achat);
			border-top-width: 1px;
		}
	`,
	'KOL-INPUT-CHECKBOX': css`
		.checkbox-container {
			justify-content: flex-start;
		}
		input {
			color: var(--default-letter);
			border-color: var(--default-border);
			border-width: 2px;
			border-style: solid;
			line-height: 24px;
			font-size: 16px;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		input:hover {
			border-color: var(--color-petrol);
		} /* NEU */
		kol-input {
			display: grid;
			align-items: center;
			justify-items: left;
			width: 100%;
		}
		kol-input.default {
			grid-template-columns: calc(6 * 2 * var(--spacing)) auto;
		}
		.switch {
			grid-template-columns: calc(13 * 2 * var(--spacing)) auto;
		}
		.button {
			gap: 0.5rem 0;
			grid-template-areas:
				'input label'
				'hint hint'
				'error error';
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
			padding-left: calc(2 * 2 * var(--spacing));
		}
		kol-input > kol-alert.error {
			order: 3;
			padding-top: 0.25em;
			grid-column: span 2 / auto;
		} /* CHECKBOX */
		input[type='checkbox'] {
			appearance: none;
			background-color: white;
			cursor: pointer;
			transition: 0.5s;
		}
		input[type='checkbox']:checked {
			background-color: var(--color-petrol);
			border-color: var(--color-petrol);
		}
		.default input[type='checkbox'] {
			height: calc(6 * 2 * var(--spacing));
			min-width: calc(6 * 2 * var(--spacing));
			width: calc(6 * 2 * var(--spacing));
		}

		.default .icon {
			margin-left: 0.25rem;
		}
		.default.checked .icon {
			color: var(--color-weiss);
		}

		.switch input[type='checkbox'] {
			display: block;
			min-width: 3.2em;
			width: 3.2em;
			height: 1.7em;
			position: relative;
		}
		.switch input[type='checkbox']:before {
			/* border-radius: 0.25em; */
			-webkit-transition: 0.5s;
			-moz-transition: 0.5s;
			-ms-transition: 0.5s;
			transition: 0.5;
			width: 1.2em;
			height: 1.2em;
			left: calc(0.25em - 2px);
			top: calc(0.25em - 2px);
			background-color: black;
			position: absolute;
		}
		.switch input[type='checkbox']:checked:before {
			transform: translateX(1.5em);
			background-color: white;
		}
		.switch input[type='checkbox']:indeterminate:before {
			transform: translateX(0.75em);
			background-color: var(--color-petrol);
		}
		.switch:is(:not(.checked), .indeterminate) .icon {
			color: #fff;
		}
		kol-input span.hint {
			grid-column: span 2;
			font-style: italic;
			color: gray;
			display: block;
			order: 3;
			padding: 0 var(--spacing);
		}
		.button:focus-within {
			border-radius: 2rem;
			outline-color: var(--color-achat) !important;
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 3px;
		}
	`,
	'KOL-INPUT-RADIO': `/* INPUT */
	:host input:focus {
		outline-color: var(--color-achat) !important;
		outline-offset: 2px;
		outline-style: solid;
		outline-width: 3px;
	}
	label {
		color: var(--color-anthrazit);
		font-size: 14px;
		line-height: 20px;
		gap: 8px;
		width: 100%;
	}
	input {
		width: 100%;
		color: var(--color-anthrazit);
		border-color: var(--default-border);
		border-width: 2px;
		border-style: solid;
		border-radius: 5px; /* padding: 10px 14px; */
		line-height: 24px;
		font-size: 16px;
	}
	input:hover {
		border-color: var(--color-achat);
	}
	kol-alert {
		display: block;
		width: 100%;
	}
	.kol-required span::after {
		content: "*";
	} /* RADIO */
	fieldset {
		border: 0px;
		margin: 0px;
		padding: 0px;
		flex-wrap: wrap;
	}
	fieldset.horizontal {
		gap: 1rem;
	}
	fieldset legend {
		display: block;
		width: 100%;
		line-height: 1.5em;
	}
	.radio-input-wrapper, .input {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		margin-top: 0.25em;
		margin-bottom: 0.25em;
		align-items: center;
		position: relative;
	}
	.radio-label {
		cursor: pointer;
		display: flex;
		width: 100%;
	}
	.radio-label span {
		margin-top: 0.125em;
	}
	.radio-input-wrapper input[type="radio"] {
		appearance: none;
		transition: 0.5s;
		border-radius: 100%;
		height: calc(6 * 2 * var(--spacing));
		min-width: calc(6 * 2 * var(--spacing));
		width: calc(6 * 2 * var(--spacing));
	}
	.radio-input-wrapper input[type="radio"]:checked:before {
		box-shadow: 0 0 0.1rem black;
		background-color: var(--color-petrol);
	}
	.radio-input-wrapper input[type="radio"]:disabled {
		background-color: var(--color-input-bg-default);
		border-color: #999;
		cursor: not-allowed;
	}
	kol-alert {
		width: 100%:
	}`,
	'KOL-TOAST-CONTAINER': `:host {
		top: 1rem;
		width: 750px;
		max-width: 100%;
		left: 50%;
		transform: translateX(-50%);
	}
	.toast {
		background: #fff;
		margin-top: 1rem;
	}`,
	'KOL-TABS': `:host > div {
		display: block;
		width: 100%;
	}
	:host kol-button-group-wc {
		display: flex;
		background-color: var(--color-petrol);
	}
	:host kol-button-group-wc > div {
		display: inline-flex;
	}
	:host kol-button-group-wc > div + div {
		margin-left: 0.25em;
	}
	:host > div > div {
		padding: 0.25em;
		border: 1px solid var(--border-color);
	}
	button {
		box-sizing: border-box;
		font-size: inherit;
		line-height: 1.25em;
		cursor: pointer;
		border-width: 2px;
		box-shadow: 0 0 0.25em gray;
		width: inherit;
		overflow: hidden;
		border-style: solid;
		padding: calc(4 * var(--spacing));
		display: grid;
		gap: 0.25em;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	kol-button-wc button.selected,
	kol-button-wc[aria-selected="true"] button {
		background-color: white;
		border-bottom-width: 0.25em !important;
		border-bottom-style: solid;
		border-bottom-color: var(--color-citrin) !important;
	}
	button > kol-span-wc span {
		display: flex;
		gap: 0.25em;
		align-items: center;
		justify-content: center;
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
		background-color: var(--color-petrol);
		border-color: var(--color-petrol);
		color: white;
	}
	button.normal:hover,
	button.normal:focus {
		color: var(--color-petrol);
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
	}`,
	'KOL-SKIP-NAV': `kol-link-wc > a > kol-span-wc {
		border-radius: 2rem;
  	border-style: solid;
		gap: 0.5rem;
		line-height: 1rem;
	  padding: 0 1rem;
		background-color: var(--color-petrol);
		border-color: var(--color-petrol);
		color: var(--color-weiss);
		cursor: pointer;
	}`,
	'KOL-SPLIT-BUTTON': `.popover {
		background: #fff;
	}`,
});
