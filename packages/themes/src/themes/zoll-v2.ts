import { KoliBri } from '@public-ui/components';

// Design System Zoll (v2)
export const ZOLLv2 = KoliBri.createTheme('zoll-v2', {
	GLOBAL: `:host {
		--border-color: var(--color-neutral);
		--border-radius: 0.25rem;
		--box-shadow: rgba(0, 0, 0, 0.12) 0 12px 12px -4px,
			rgba(0, 0, 0, 0.04) 0 4px 4px -4px;
		--color-blau: #264f8e;
		--color-blau-dark: #08335e;
		--color-blau-light: #326cae;
		--color-akzent: #ef9e48;
		--color-akzent-dark: #da793c;
		--color-akzent-light: #f5ba6c;
		--color-neutral: #e3e3e3;
		--color-neutral-dark: #333;
		--color-neutral-light: #f7f7f7;
		--color-rot: #ce3033;
		--color-gelb: #f6cd35;
		--color-gruen: #008549;
		--color-grau-100: hsl(0 0% 0%);
		--color-grau-90: hsl(0 0% 10%);
		--color-grau-80: hsl(0 0% 20%);
		--color-grau-70: hsl(0 0% 30%);
		--color-grau-60: hsl(0 0% 40%);
		--color-grau-50: hsl(0 0% 50%);
		--color-grau-40: hsl(0 0% 60%);
		--color-grau-30: hsl(0 0% 70%);
		--color-grau-20: hsl(0 0% 80%);
		--color-grau-10: hsl(0 0% 90%);
		--color-grau-0: hsl(0 0% 100%);
		--gap: 0.25rem;
		--spacing: 0.25rem;
		--font-family: Roboto, Kreon, Georgia, Times New Roman, sans-serif;
		--font-size: 16px;
		--font-weight-bold: 700;
		--line-height-bold: 1.2em; /* em! */
		--line-height-regular: 1.5em; /* em! */
	}
	*[tabindex]:focus,
	a:focus,
	button:focus,
	summary:focus,
	kol-input:not(.checkbox, .radio) .input:focus-within,
	kol-input:is(.checkbox, .radio) input:focus {
		outline-color: var(--color-blau-dark);
		outline-offset: 0.125rem;
		outline-style: solid;
		outline-width: 0.125rem;
		transition: outline-offset 0.25s linear;
	}
	*:not(i) {
		font-family: var(--font-family);
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
	kol-tooltip .area {
		background-color: #f2f2f2;
	}
	kol-tooltip #arrow {
		background-color: #626262;
	}
	kol-tooltip kol-span-wc {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		border-radius: 2px;
		border: 1px solid #626262;
	}`,
	'KOL-BADGE': `:host {
		display: inline-block;
	}
	:host > span {
		border-radius: 0.3125rem;
		display: inline-flex;
		line-height: 1.25rem;
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
	}`,
	'KOL-HEADING': `h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: var(--font-weight-bold);
		margin: 0;
		padding: 1rem 0;
		text-align: left;
	}
	h1 {
		font-size: 2.5rem;
		line-height: 1.2;
		padding: 0 0 1rem 0;
	}
	h2 {
		font-size: 2rem;
		line-height: 1.25;
	}
	h3 {
		font-size: 1.75rem;
		line-height: 1.29;
	}
	h4 {
		font-size: 1.5rem;
		line-height: 1.33;
	}
	h5 {
		font-size: 1.25rem;
		line-height: 1.4;
	}
	h6 {
		font-size: 1rem;
		line-height: 1.5;
	}`,
	'KOL-LINK': `:is(a, button) {
		align-items: baseline;
		color: var(--color-blau);
		gap: 0.25em;
		text-decoration-line: none;
	}
	a:active,
	a:focus,
	a:hover,
	button:active,
	button:focus,
	button:hover {
		outline-width: 0;
		text-decoration-line: underline;
		text-decoration-thickness: 0.1rem !important;
	}
	:is(a, button) > kol-span-wc {
		order: 1;
		gap: 0.25em;
	}
	:is(a, button) > kol-span-wc > span {
		align-items: baseline;
		gap: 0.25em;
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
	'KOL-BUTTON-LINK': `:is(a, button) {
		align-items: baseline;
		color: var(--color-blau);
		gap: 0.25em;
		text-decoration-line: none;
	}
	a:active,
	a:focus,
	a:hover,
	button:active,
	button:focus,
	button:hover {
		outline-width: 0;
		text-decoration-line: underline;
		text-decoration-thickness: 0.1rem !important;
	}
	:is(a, button) > kol-span-wc {
		order: 1;
		gap: 0.25em;
	}
	:is(a, button) > kol-span-wc > span {
		align-items: baseline;
		gap: 0.25em;
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
	'KOL-TABLE': `caption {
		background-color: var(--color-neutral);
		caption-side: TOP;
		font-size: 1.5rem; /* 1.75rem */ /* line-height: 3rem; */
		margin-bottom: 0.25rem;
		padding: 0.75rem;
		text-align: left;
	}
	table {
		border-spacing: 0;
		border-color: var(--color-neutral);
		border-style: solid;
		border-width: 0;
		border-top-width: 1px;
	}
	td,
	th {
		color: var(--color-neutral-dark);
		border-color: var(--color-neutral);
		border-style: solid;
		border-width: 0;
		border-bottom-width: 1px;
		padding: 0.5rem;
	}
	tbody tr:nth-child(odd) {
		background-color: var(--color-grau-10);
	}`,
	'KOL-ACCORDION': `:host > div {
		border-color: var(--border-color);
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 1px;
	}
	:host > div > kol-heading-wc > * {
		display: grid;
		margin: -1px;
	}
	:host > div > kol-heading-wc button > kol-span-wc {
		background-color: var(--color-neutral-light);
		border-color: var(--border-color);
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 2px;
		color: var(--color-blau);
		font-weight: var(--font-weight-bold);
		text-align: left;
		padding: 1.5rem;
	}
	:host > div > kol-heading-wc button:hover > kol-span-wc {
		border-color: var(--color-blau-dark);
	}
	:host > div > kol-heading-wc button > kol-span-wc > span {
		gap: 0.5em;
	}
	.content,
	[part*="content"] {
		padding: 1.5rem 1.5rem 2rem 1.5rem;
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
	'KOL-ALERT': `:host > div {
		border-width: 2px;
		border-style: solid;
		border-radius: 0.25rem;
		color: var(--color-neutral-dark);
	}
	:host > div .content {
		font-style: italic;
		font-size: 0.8rem;
	}
	div.card {
		display: grid;
		gap: 0.625rem;
		padding: 1.5rem 1.5rem 2rem 1.5rem;
	}
	div.card .heading {
		display: flex;
	}
	div.card .heading .heading-icon {
		align-items: center;
		display: inline-flex;
		font-size: 2rem;
		margin-right: 1.5rem;
		padding: 0;
	}
	div.default {
		border-color: var(--color-neutral-dark);
	}
	div.card.default .heading {
		color: var(--color-neutral-dark);
	}
	div.info {
		border-color: var(--color-blau);
	}
	div.card.info .heading {
		color: var(--color-blau);
	}
	div.warning {
		background-color: var(--color-gelb);
		border-color: var(--color-gelb);
	}
	div.card.warning .heading {
		color: var(--color-neutral-dark);
	}
	div.error {
		border-color: var(--color-rot);
	}
	div.card.error .heading {
		color: var(--color-rot);
	}
	div.success {
		border-color: var(--color-gruen);
	}
	div.card.success .heading {
		color: var(--color-gruen);
	}
	div.card div.content {
		line-height: 1.5rem;
		padding-left: 3.5rem;
	}
	div.msg {
		border-width: 0;
		display: flex;
		gap: calc(2 * var(--gap));
		padding: var(--gap);
	}
	div.msg .heading {
		display: flex;
		gap: var(--spacing);
		flex-grow: 1;
		align-items: flex-start;
	}
	div.msg .heading > div {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
	div.info .heading kol-icon.heading-icon {
		display: grid;
		place-items: center;
		background-color: var(--color-blau);
		border-radius: 100%;
		min-width: 2em;
		min-height: 2em;
	}
	div.card.info .heading kol-icon.heading-icon {
		font-size: 1em;
	}
	div.msg.info .heading kol-icon.heading-icon {
		font-size: 0.5em;
	}
	div.info .heading kol-icon.heading-icon::part(icon) {
		color: white;
	}
	div.msg.default {
		color: var(--color-neutral-dark);
	}
	div.msg.error {
		color: var(--color-rot);
	}
	div.msg.info {
		color: var(--color-blau);
	}
	div.msg.warning {
		color: var(--color-neutral-dark);
	}
	div.msg.success {
		color: var(--color-gruen);
	}
	div > div > kol-heading-wc {
		grid-column: 1 / span 3;
	}
	.close button {
		border-radius: var(--border-radius);
		min-height: 44px;
		min-width: 44px;
		background-color: var(--color-neutral);
		padding: 0.75rem;
		color: var(--color-blau);
	}
	div.card .close button {
		transform: translateX(1.5rem)
			translateY(calc(-1rem - 44px - 2px + var(--gap)));
	}
	kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	div.default kol-icon::part(icon)::before {
		content: "\\f05a";
	}
	div.error kol-icon::part(icon)::before {
		content: "\\f06a";
	}
	div.info kol-icon::part(icon)::before {
		content: "\\f0eb";
	}
	div.success kol-icon::part(icon)::before {
		content: "\\f058";
	}
	div.warning kol-icon::part(icon)::before {
		content: "\\f071";
	}
	.close button kol-icon::part(icon)::before {
		content: "\\f00d";
	}`,
	'KOL-CARD': `:host > div {
		border-color: var(--border-color);
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 1px;
	}
	:host > div .header {
		padding: 1.5rem;
	}`,
	'KOL-BUTTON': `:host > kol-button-wc > button > kol-span-wc,
	:host > kol-link-wc > a > kol-span-wc {
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 2px;
		gap: 0.5rem;
		line-height: 1rem;
	}
	:host > kol-button-wc > button > kol-span-wc:not(.icon-only),
	:host > kol-link-wc > a > kol-span-wc:not(.icon-only) {
		padding: 0.75rem 1rem;
	}
	:host > kol-button-wc > button > kol-span-wc.icon-only,
	:host > kol-link-wc > a > kol-span-wc.icon-only {
		padding: 0.75rem;
	}
	:host > kol-button-wc > button > kol-span-wc span,
	:host > kol-link-wc > a > kol-span-wc span {
		gap: 0.5rem;
	}
	:host > kol-button-wc.primary > button > kol-span-wc,
	:host > kol-link-wc.primary > a > kol-span-wc {
		background-color: var(--color-akzent);
		border-color: var(--color-akzent);
		color: white;
	}
	:host > kol-button-wc.primary > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.primary > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.primary > a:focus > kol-span-wc,
	:host > kol-link-wc.primary > a:hover > kol-span-wc {
		background-color: var(--color-akzent-dark);
	}
	:host > kol-button-wc.secondary > button > kol-span-wc,
	:host > kol-link-wc.secondary > a > kol-span-wc {
		background-color: white;
		border-color: var(--color-blau);
		color: var(--color-blau);
	}
	:host > kol-button-wc.secondary > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.secondary > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.secondary > a:focus > kol-span-wc,
	:host > kol-link-wc.secondary > a:hover > kol-span-wc {
		border-color: var(--color-blau-dark);
		color: var(--color-blau-dark);
	}
	:host > kol-button-wc.normal > button > kol-span-wc,
	:host > kol-link-wc.normal > a > kol-span-wc {
		background-color: var(--color-blau);
		border-color: var(--color-blau);
		color: white;
	}
	:host > kol-button-wc.normal > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.normal > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.normal > a:focus > kol-span-wc,
	:host > kol-link-wc.normal > a:hover > kol-span-wc {
		background-color: var(--color-blau-dark);
	}
	:host > kol-button-wc.danger > button > kol-span-wc,
	:host > kol-link-wc.danger > a > kol-span-wc {
		background-color: var(--color-rot);
		border-color: var(--color-rot);
		color: white;
	}
	:host > kol-button-wc.danger > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.danger > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.danger > a:focus > kol-span-wc,
	:host > kol-link-wc.danger > a:hover > kol-span-wc {
		background-color: var(--color-rot);
	}
	:host > kol-button-wc.ghost > button > kol-span-wc,
	:host > kol-link-wc.ghost > a > kol-span-wc {
		background-color: transparent;
		border-color: transparent;
		color: var(--color-blau);
	}
	:host > kol-button-wc.ghost > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.ghost > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.ghost > a:focus > kol-span-wc,
	:host > kol-link-wc.ghost > a:hover > kol-span-wc {
		color: var(--color-blau-dark);
	}
	:host > kol-button-wc > button:not(:disabeld):hover,
	:host > kol-link-wc > a:hover {
		outline-color: var(--color-blau-dark);
		outline-offset: 0.125rem;
		outline-style: solid;
		outline-width: 0.125rem;
		transition: outline-offset 0.2s linear;
	}
	a:focus,
	button:not(:disabled):focus {
		cursor: pointer;
		outline-color: var(--color-blau-dark);
		outline-offset: 0.125rem;
		outline-style: solid;
		outline-width: 0.125rem;
		transition: outline-offset 0.2s linear;
	}`,
	'KOL-LINK-BUTTON': `:host > kol-button-wc > button > kol-span-wc,
	:host > kol-link-wc > a > kol-span-wc {
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 2px;
		gap: 0.5rem;
		line-height: 1rem;
	}
	:host > kol-button-wc > button > kol-span-wc:not(.icon-only),
	:host > kol-link-wc > a > kol-span-wc:not(.icon-only) {
		padding: 0.75rem 1rem;
	}
	:host > kol-button-wc > button > kol-span-wc.icon-only,
	:host > kol-link-wc > a > kol-span-wc.icon-only {
		padding: 0.75rem;
	}
	:host > kol-button-wc > button > kol-span-wc span,
	:host > kol-link-wc > a > kol-span-wc span {
		gap: 0.5rem;
	}
	:host > kol-button-wc.primary > button > kol-span-wc,
	:host > kol-link-wc.primary > a > kol-span-wc {
		background-color: var(--color-akzent);
		border-color: var(--color-akzent);
		color: white;
	}
	:host > kol-button-wc.primary > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.primary > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.primary > a:focus > kol-span-wc,
	:host > kol-link-wc.primary > a:hover > kol-span-wc {
		background-color: var(--color-akzent-dark);
	}
	:host > kol-button-wc.secondary > button > kol-span-wc,
	:host > kol-link-wc.secondary > a > kol-span-wc {
		background-color: white;
		border-color: var(--color-blau);
		color: var(--color-blau);
	}
	:host > kol-button-wc.secondary > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.secondary > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.secondary > a:focus > kol-span-wc,
	:host > kol-link-wc.secondary > a:hover > kol-span-wc {
		border-color: var(--color-blau-dark);
		color: var(--color-blau-dark);
	}
	:host > kol-button-wc.normal > button > kol-span-wc,
	:host > kol-link-wc.normal > a > kol-span-wc {
		background-color: var(--color-blau);
		border-color: var(--color-blau);
		color: white;
	}
	:host > kol-button-wc.normal > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.normal > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.normal > a:focus > kol-span-wc,
	:host > kol-link-wc.normal > a:hover > kol-span-wc {
		background-color: var(--color-blau-dark);
	}
	:host > kol-button-wc.danger > button > kol-span-wc,
	:host > kol-link-wc.danger > a > kol-span-wc {
		background-color: var(--color-rot);
		border-color: var(--color-rot);
		color: white;
	}
	:host > kol-button-wc.danger > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.danger > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.danger > a:focus > kol-span-wc,
	:host > kol-link-wc.danger > a:hover > kol-span-wc {
		background-color: var(--color-rot);
	}
	:host > kol-button-wc.ghost > button > kol-span-wc,
	:host > kol-link-wc.ghost > a > kol-span-wc {
		background-color: transparent;
		border-color: transparent;
		color: var(--color-blau);
	}
	:host > kol-button-wc.ghost > button:not(:disabled):focus > kol-span-wc,
	:host > kol-button-wc.ghost > button:not(:disabled):hover > kol-span-wc,
	:host > kol-link-wc.ghost > a:focus > kol-span-wc,
	:host > kol-link-wc.ghost > a:hover > kol-span-wc {
		color: var(--color-blau-dark);
	}
	:host > kol-button-wc > button:not(:disabeld):hover,
	:host > kol-link-wc > a:hover {
		outline-color: var(--color-blau-dark);
		outline-offset: 0.125rem;
		outline-style: solid;
		outline-width: 0.125rem;
		transition: outline-offset 0.2s linear;
	}
	a:focus,
	button:not(:disabled):focus {
		cursor: pointer;
		outline-color: var(--color-blau-dark);
		outline-offset: 0.125rem;
		outline-style: solid;
		outline-width: 0.125rem;
		transition: outline-offset 0.2s linear;
	}`,
	'KOL-BUTTON-GROUP': `:host > kol-button-group-wc {
		background-color: var(--color-neutral);
		border-radius: var(--border-radius);
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.25rem;
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
	:host .selected button > kol-span-wc {
		background-color: var(--color-akzent);
		border-color: var(--color-akzent-dark);
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 2px;
		color: white;
		cursor: not-allowed;
		font-weight: 700;
		line-height: 1rem;
		padding: 0.75rem 1rem;
		text-decoration: underline;
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
	'KOL-PROGRESS': `svg line:first-child,
	svg circle:first-child {
		stroke: var(--color-neutral);
	}
	svg line:last-child,
	svg circle:last-child {
		stroke: var(--color-blau);
	}`,
	'KOL-INPUT-CHECKBOX': `:host {
		--spacing: 0.25rem;
	}
	input {
		border-color: var(--color-neutral-dark);
		border-width: 2px;
		border-style: solid;
	}
	label {
		cursor: pointer;
	}
	kol-input:hover label,
	kol-input:has(input:focus, select:focus, textarea:focus, ) label {
		text-decoration: underline;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	} /* NEU */
	kol-input {
		display: grid;
		align-items: center;
		justify-items: left;
		width: 100%;
	}
	kol-input.default {
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
	input[type="checkbox"]:checked,
	input[type="checkbox"]:indeterminate {
		background-color: var(--color-blau);
		border-color: var(--color-blau);
	}
	.default input[type="checkbox"] {
		border-radius: 0.25em;
		height: calc(6 * var(--spacing));
		min-width: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
	}
	.default input[type="checkbox"]:before {
		border-radius: 0.25em;
		background-color: transparent;
		display: block;
		height: calc(6 * var(--spacing));
		position: relative;
		width: calc(6 * var(--spacing));
	}
	.default input[type="checkbox"]:checked:before {
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
	.default input[type="checkbox"]:indeterminate {
		background-color: var(--color-blau);
	}
	.default input[type="checkbox"]:indeterminate:before {
		background-color: white;
		height: 0.25rem;
		top: 0.5rem;
		left: 0.25rem;
		width: 0.75rem;
	}
	.switch input[type="checkbox"] {
		min-width: 3.2em;
		width: 3.2em;
		height: 1.7em;
		border-radius: 0.25em;
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
		left: calc(0.25em - 2px);
		top: calc(0.25em - 2px);
		border-radius: 0.25em;
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
	.switch input[type="checkbox"]:indeterminate {
		background-color: var(--color-blau);
	}
	.switch input[type="checkbox"]:indeterminate:before {
		-webkit-transform: translateX(0.75em);
		-moz-transform: translateX(0.75em);
		-ms-transform: translateX(0.75em);
		transform: translateX(0.75em);
		background-color: white;
	}
	.disabled {
		opacity: 0.33;
	}`,
	'KOL-INPUT-RADIO': `/* ALL INPUT, SELECT, TEXTAREA */
	:host {
		--spacing: 0.25rem;
	}
	input {
		border-color: var(--color-neutral-dark);
		border-width: 2px;
		border-style: solid;
	}
	label {
		cursor: pointer;
	}
	kol-input:has(input:disabled) input,
	kol-input:has(input:disabled) label {
		cursor: not-allowed !important;
		opacity: 0.5;
	}
	kol-input:hover label,
	kol-input:has(input:focus, select:focus, textarea:focus, ) label {
		text-decoration: underline;
	}
	.required legend > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	label {
		display: grid;
		gap: 8px;
		width: 100%;
	}
	input {
		width: 100%;
		border-color: var(--color-neutral-dark);
		border-width: 2px;
		border-style: solid;
	}
	input:hover {
		border-color: var(--color-blau);
	}
	kol-alert {
		display: block;
		width: 100%;
		margin-bottom: 0.4em;
	} /* RADIO */
	fieldset {
		border: 0px;
		margin: 0px;
		padding: 0px;
		display: grid;
		gap: 0.25em;
	}
	fieldset div {
		display: flex;
		flex-direction: row;
		margin-top: 0.125em;
		margin-bottom: 0.125em;
		align-items: center;
		position: relative;
	}
	fieldset div label {
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
	fieldset div input[type="radio"]:checked:before {
		box-shadow: 0 0 0.1rem black;
		background-color: var(--color-blau);
	}
	fieldset #error {
		margin: 0.4em 0;
		order: 3;
	}
	fieldset legend {
		order: 1;
		display: contents;
	}
	fieldset kol-input {
		order: 2;
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
	}`,
	'KOL-INPUT-COLOR': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-INPUT-FILE': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-INPUT-EMAIL': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-INPUT-NUMBER': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-INPUT-TEXT': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-SELECT': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-TEXTAREA': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		background: white;
		border-left: none;
		box-shadow: calc(-1 * var(--gap)) 0px 0px var(--color-blau);
		padding: var(--gap) calc(2 * var(--gap));
		width: 100%;
	}`,
	'KOL-DETAILS': `:host details > kol-indented-text {
		margin: 0.25em 0 0 0.65em;
	}`,
	'KOL-NAV': `.list {
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
		color: black;
		flex-grow: 1;
	} /* custom. */
	nav {
		background-color: #f2f2f2;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.expand-button button {
		margin: auto;
		height: 100%;
	}
	:is(a, button):focus {
		outline: none;
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
		content: "\\eab6";
	}
	.expanded > div > .expand-button kol-icon::part(icon)::before {
		content: "\\eab4";
	}`,
	'KOL-TABS': `:host > div {
		display: block;
		width: 100%;
	}
	:host kol-button-group-wc {
		border-radius: 0.25rem 0.25rem 0 0;
		background-color: var(--color-blau-light);
	}
	:host kol-button-group-wc > div {
		display: inline-flex;
	}
	:host kol-button-group-wc > div + div {
		margin-left: 0.25em;
	}
	:host kol-button-group-wc button {
		width: 100%;
	}
	:host > div > div {
		padding: 0.25em;
		border: 1px solid var(--border-color);
		border-radius: 0 0 0.25rem 0.25rem;
	}
	button {
		box-sizing: border-box;
		font-size: inherit;
		line-height: 1.25em;
		cursor: pointer;
		border-width: 2px;
		box-shadow: 0 0 0.25em gray;
		font-family: var(--font-family);
		width: inherit;
		border-radius: var(--border-radius);
		border-style: solid;
		padding: calc(2 * var(--spacing));
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
		border-bottom-color: var(--color-akzent) !important;
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
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}
	button.primary:hover,
	button.primary:focus {
		color: var(--color-primary);
	}
	button.secondary,
	button.secondary:disabled:hover {
		background-color: var(--color-secondary);
		border-color: var(--color-secondary);
		color: white;
	}
	button.secondary:hover,
	button.secondary:focus {
		color: var(--color-secondary);
	}
	button.normal,
	button.normal:disabled:hover {
		background-color: var(--color-normal);
		border-color: var(--color-normal);
		color: white;
	}
	button.normal:hover,
	button.normal:focus {
		color: var(--color-normal);
	}
	button.danger,
	button.danger:disabled:hover {
		background-color: var(--color-danger);
		border-color: var(--color-danger);
		color: white;
	}
	button.danger:hover,
	button.danger:focus {
		color: var(--color-danger);
	}
	button.ghost,
	button.ghost:disabled:hover {
		background-color: white;
		border-color: var(--color-ghost);
		color: var(--color-ghost);
	}
	button.ghost:hover,
	button.ghost:focus {
		background-color: var(--color-ghost);
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
	'KOL-BREADCRUMB': `ul,
	li {
		gap: 0px;
		place-items: baseline;
	}
	kol-icon {
		text-align: center;
	}
	kol-icon::part(icon):before {
		content: "/";
		text-align: center;
	}`,
	'KOL-INPUT-PASSWORD': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-INPUT-RANGE': `kol-input .input {
		border-color: var(--color-grau-30);
		border-width: 2px;
		border-style: solid;
		padding: 0px 0.75em;
		gap: var(--gap);
		overflow: hidden;
	}
	kol-input .input:focus-within,
	kol-input .input:hover {
		border-color: var(--color-grau-60);
	}
	kol-input:not(.select, .textarea) .input {
		height: calc(var(--a11y-min-size) - 4px);
	}
	kol-input:not(.range) .input :is(input, select, textarea) {
		background-color: white;
		border: 0;
	}
	kol-input .input input[type="file"] {
		padding-top: calc(0.5em + 2px);
	}
	kol-input > label {
		font-weight: var(--font-weight-bold);
		order: 1;
		margin-bottom: 0.25rem;
	}
	kol-input > label > span {
		color: var(--default-letter);
	}
	kol-input > div.input {
		border-radius: 0.25rem;
		order: 2;
	}
	kol-input > span.hint {
		color: var(--color-grau-60);
		font-style: italic;
		order: 4;
		font-size: 0.8rem;
	}
	kol-input > kol-alert.error {
		order: 3;
	}`,
	'KOL-ICON': `:host,
	:host > i {
		height: 1em;
		width: 1em;
	}`,
});
