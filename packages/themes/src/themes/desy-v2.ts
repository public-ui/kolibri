import { KoliBri } from '@public-ui/components';

// GZD Design System (Desy v2)
export const DESYv2 = KoliBri.createTheme('desy-v2', {
	GLOBAL: `
	kol-tooltip .area {
		background-color:#f2f2f2;
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
	}
	:host {
		--color-primary: #326cae;
		--color-primary-10: #1e538f;
		--color-primary-20: #08335e;
		--color-yellow-neutral: #ef9e48;
		--color-dark-yellow-neutral: #a8672c;
		--color-warning: #a94442;
		--color-success: #5cb85c;
		--color-background: #edf4f7;
		--color-black: #000000;
		--color-gray-10: #333333;
		--color-gray-20: #666666;
		--color-gray-30: #737373;
		--color-gray-40: #999999;
		--color-gray-50: #b3b3b3;
		--color-gray-60: #dddddd;
		--color-gray-70: #f2f2f2;
		--color-white: #ffffff;
		--font-family: BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif;
		--font-size: 14px;
		--spacing: 0.25em;
	}
	:host {
		color: var(--color-black);
	}
	:host * {
		box-sizing: border-box;
		font-family: var(--font-family);
	}
	:host h1,
	:host h2,
	:host h3,
	:host h4,
	:host h5,
	:host h6 {
		margin: 0;
		font-family: var(--font-family);
	}
	a,
	button {
		align-items: center;
		background-color: transparent;
		border: 0;
		color: black;
		cursor: pointer;
		display: inline-flex;
		gap: 0.25rem;
		justify-items: center;
	}
	input,
	option,
	select,
	summary,
	textarea {
		display: inline-block;
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
		word-break: break-word;
	}
	*[tabindex]:focus,
	a:focus,
	button:focus,
	input:focus,
	select:focus,
	summary:focus,
	textarea:focus {
		cursor: pointer;
		outline-color: var(--color-ocean);
		outline-offset: 2px;
		outline-style: solid;
		outline-width: 0;
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
	}`,
	'KOL-BUTTON': `a,
	button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		display: inline-block;
	}
	button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		min-width: 44px;
		min-height: 44px;
		padding: 0;
		text-decoration: none !important;
	}
	button > kol-span-wc {
		display: grid;
		gap: 0.25em;
		line-height: 1.5rem;
		font-family: Roboto;
		font-weight: 700;
		cursor: pointer;
		font-size: 1rem;
		align-items: center;
		padding: 6px 8px;
		justify-content: center;
		font-style: normal;
		text-align: center;
		outline: none;
		border-style: solid;
		border-width: 2px;
	}
	button:active > kol-span-wc {
		transform: translateY(1px);
	}
	button.primary:disabled > kol-span-wc,
	button.danger:disabled > kol-span-wc,
	button.normal:disabled > kol-span-wc {
		cursor: not-allowed;
		color: var(--color-white);
		background-color: var(--color-gray-40);
		border-color: var(--color-gray-40);
	}
	button.ghost:disabled > kol-span-wc,
	button.loading:disabled > kol-span-wc,
	button.help:disabled > kol-span-wc,
	button.secondary:disabled > kol-span-wc {
		cursor: not-allowed;
		color: var(--color-gray-40);
		background-color: var(--color-white);
		border-color: var(--color-white);
	}
	button.primary > kol-span-wc,
	button.primary:hover > kol-span-wc,
	button.normal > kol-span-wc,
	button.normal:hover > kol-span-wc {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: var(--color-white);
	}
	button.loading > kol-span-wc,
	button.loading:hover > kol-span-wc,
	button.help > kol-span-wc,
	button.help:hover > kol-span-wc,
	button.secondary > kol-span-wc,
	button.secondary:hover > kol-span-wc {
		background-color: var(--color-white);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	button.danger > kol-span-wc,
	button.danger:hover > kol-span-wc {
		background-color: var(--color-warning);
		border-color: var(--color-warning);
		color: var(--color-white);
	}
	button.ghost,
	button.ghost:hover > kol-span-wc {
		background-color: transparent;
		border-color: transparent;
		color: var(--color-primary);
	}
	button.primary:active > kol-span-wc,
	button.primary:focus > kol-span-wc,
	button.primary:hover > kol-span-wc,
	button.loading:active > kol-span-wc,
	button.loading:focus > kol-span-wc,
	button.loading:hover > kol-span-wc,
	button.help:active > kol-span-wc,
	button.help:focus > kol-span-wc,
	button.help:hover > kol-span-wc,
	button.secondary:active > kol-span-wc,
	button.secondary:focus > kol-span-wc,
	button.secondary:hover > kol-span-wc,
	button.normal:active > kol-span-wc,
	button.normal:focus > kol-span-wc,
	button.normal:hover > kol-span-wc {
		background-color: var(--color-primary-20);
		border-color: var(--color-primary-20);
		color: var(--color-white);
		outline: none;
	}
	button.loading:active > kol-span-wc,
	button.loading:focus > kol-span-wc,
	button.loading:hover > kol-span-wc,
	button.help:active > kol-span-wc,
	button.help:focus > kol-span-wc,
	button.help:hover > kol-span-wc,
	button.secondary:active > kol-span-wc,
	button.secondary:focus > kol-span-wc,
	button.secondary:hover > kol-span-wc {
		border-color: var(--color-primary-20);
	}
	button.danger:active > kol-span-wc,
	button.danger:hover > kol-span-wc {
		background-color: var(--color-dark-yellow-neutral);
		border-color: var(--color-dark-yellow-neutral);
		color: var(--color-white);
		outline: none;
	}
	button.ghost:active > kol-span-wc,
	button.ghost:hover > kol-span-wc {
		color: var(--color-primary);
		outline: none;
	}
	button > kol-span-wc > span {
		display: flex;
		gap: 0.5em;
		margin: auto;
		align-items: center;
		justify-content: center;
		letter-spacing: 0.75px;
	}
	button.icon-only > kol-span-wc {
		padding: 8px;
	}
	button.icon-only > kol-span-wc > span > span {
		display: none;
	}
	button.icon-only > kol-span-wc kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	button.loading > kol-span-wc kol-icon {
		animation: spin 5s infinite linear;
	}
	button.loading > kol-span-wc,
	button.help > kol-span-wc {
		display: inline-block;
		padding: 0;
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
		line-height: 3.25rem;
	}
	h2 {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	h3 {
		font-size: 1.125rem;
		line-height: 1.5rem;
	}`,
	'KOL-ACCORDION': `:host > div {
		font-family: var(--font-family);
		font-size: var(--font-size);
		padding: 0 0.5rem 0 0;
	}
	:host > div > kol-heading-wc {
		background-color: var(--color-background);
		color: var(--color-gray-10);
		line-height: 1.75rem;
		padding: 16px;
	}
	:host > div > kol-heading-wc:focus-within,
	:host > div > kol-heading-wc:hover {
		box-shadow: 0px 0px 0px 2px var(--color-primary) inset;
		outline: none;
	}
	:host > div > kol-heading-wc button {
		cursor: pointer;
		width: 100%;
		margin: 0;
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-end;
		gap: 2em;
		border: 0;
		align-items: center;
		overflow: hidden;
		font-size: inherit;
		font-weight: normal;
		line-height: 1.75em;
		background-color: transparent;
		padding: 0;
		outline: none;
	}
	:host > div[part*="open"] > kol-heading-wc button {
		padding-bottom: 0;
	}
	:host > div > kol-heading-wc button kol-icon::part(icon) {
		font-weight: 900;
		font-size: 26px;
		color: var(--color-black);
	}
	:host > div > kol-heading-wc button kol-icon::part(close)::before {
		font-family: "Font Awesome 6 Free";
		font-size: 14px;
		content: "\f077";
	}
	:host > div > kol-heading-wc button kol-icon::part(open)::before {
		font-family: "Font Awesome 6 Free";
		font-size: 14px;
		content: "\f078";
	}
	:host > div {
		width: 100%;
		height: 100%;
		display: grid;
	}
	:host > div div[part="content"] {
		transition: height 200ms;
	}
	:host > div div[part="header"],
	:host > div[part*="open"] div[part="content"] {
		margin: 0;
		background-color: var(--color-white);
	}
	:host > div div[part="header"] {
		padding: 0 1em;
	}
	:host > div[part*="open"] div[part="content"] {
		padding: 1em;
	}
	button {
		font-weight: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	:host > div {
		background: var(--color-white);
	}
	:host > div[part*="open"] {
		padding-bottom: 1em;
	}`,
	'KOL-ALERT': `:host > div {background-color: white;// border-width: 2px;// border-style: solid;display: flex;overflow: unset;}:host > div.default {border-color: var(--color-gray-30);}:host > div.default > .icon {background-color: var(--color-gray-30);}:host > div.error {border-color: var(--color-warning);}:host > div.error > .icon {background-color: var(--color-warning);}:host > div.info {border-color: var(--color-primary);}:host > div.info > .icon {background-color: var(--color-primary);}:host > div.success {border-color: var(--color-success);}:host > div.success > .icon {background-color: var(--color-success);}:host > div.warning {border-color: var(--color-yellow-neutral);}:host > div.warning > .icon {background-color: var(--color-yellow-neutral);}:host > div.msg > .icon {color: white;padding: 0.5em;align-items: center;display: inline-flex;}:host > div.card {border-width: 2px;border-style: solid;}:host > div.card.default .heading .icon {background-color: var(--color-gray-30);}:host > div.card.error .heading .icon {background-color: var(--color-warning);}:host > div.card.info .heading .icon {background-color: var(--color-primary);}:host > div.card.success .heading .icon {background-color: var(--color-success);}:host > div.card.warning .heading .icon {background-color: var(--color-yellow-neutral);}:host > div.card .heading .icon {color: white;padding: 0.5em;align-items: center;display: inline-flex;}:host > div kol-heading-wc .icon {margin-right: 0.5em;}:host > div.card .heading .icon {border-radius: 0 0 0.25rem 0;}:host > div.msg > div {padding: 0.25em;}:host > div.msg > div > .heading {padding: 0.25em;display: inline-block;}:host > div .content {padding: 0.25em;}:host > div > div {display: grid;grid-template-columns: 1fr auto;}:host > div > div > .content {grid-row: 2;grid-column: 1;}:host > div > div > .close {grid-row: 1 / span 2;}:host > div.card > div > .heading {width: 100%;}.close > button {min-width: 44px;min-height: 44px;display: grid;gap: 0.25em;line-height: 1.5rem;font-family: var(--font-family);font-weight: 700;cursor: pointer;border-radius: 1.5em;border-style: solid;border-width: 2px;font-size: 1rem;align-items: center;padding: 8px 14px;justify-content: center;font-style: normal;text-align: center;text-transform: uppercase;width: inherit;transition-duration: 0.5s;transition-property: background-color, color, border-color;background-color: rgba(0, 0, 0, 0);border-color: rgba(0, 0, 0, 0);}.close > button.icon-only {padding: 8px;}.close > button.icon-only kol-icon {display: inline-block;width: 1.5em;height: 1.5em;}.close > button:active {box-shadow: none;outline: none;}.close kol-icon::part(icon)::before {content: "x";color: var(--color-primary);font-family: "Font Awesome 6 Free";}`,
	'KOL-CARD': `/* https://www.figma.com/file/56JbmrssCRpjpfxoAFeHqT/Design-System-EPLF-(in-progress)?node-id=8225%3A5945 */
	:host > div {
		display: grid;
		width: 100%;
		height: 100%;
		background-color: var(--color-background);
		grid-template-rows: min-content 2fr min-content;
		box-shadow: 0 0 0.25rem var(--color-grey);
		padding: 8px;
	}
	:host kol-heading-wc {
		display: inline-flex;
		font-style: normal;
		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	:host div.content {
		padding-top: 1em;
	}
	:host div.footer {
		padding-top: 1em;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		padding: 0.25em 0.5em;
		width: 100%;
	}
	:host > div {
		background: var(--color-white);
		border: 0;
		box-shadow: -4px 0px 0px var(--color-primary);
	}`,
	'KOL-DETAILS': `:host details > kol-indented-text {
		margin: 0.25em 0 0 0.5em;
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
		stroke: var(--color-gray-60);
	}
	svg line:last-child,
	svg circle:last-child {
		stroke: var(--color-primary);
		fill: transparent;
	}
	progress {
		display: none;
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
	table {
		width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
	}
	th,
	td {
		padding: 0.25em 0.5em;
	}
	th {
		background-color: var(--color-gray-70);
	}
	th > div {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.25em;
	}
	:host > div:last-child {
		padding: 0.5em;
	}
	tbody > tr:nth-child(even) {
		background-color: var(--color-gray-70);
	}
	:host > div:last-child,
	:host > div:last-child > div:last-child {
		display: grid;
		align-items: center;
		justify-items: center;
		gap: 0.5em;
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
	'KOL-TABS': `button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	kol-button-group > div {
		margin: 0 1rem;
	}
	kol-button-group > div:first-child {
		margin-left: 0;
	}
	kol-button-group > div:last-child {
		margin-right: 0;
	}
	kol-button-group > div {
		margin: 0;
	}
	button {
		background-color: transparent;
		border: 0;
		font-style: normal;
		font-weight: normal;
		font-size: 18px;
		line-height: 22px;
		color: var(--color-primary);
		padding: 0.3em 1em;
		box-shadow: inset 0px -3px 0 0 var(--color-gray-70);
	}
	button:enabled {
		box-shadow: inset 0px -3px 0 0 var(--color-primary-10);
	}
	button:hover {
		color: var(--color-midnight);
	}
	button.primary {
		text-underline-offset: 5px;
		text-decoration-thickness: 0.25em;
		font-weight: bold;
		color: var(--color-gray-10);
		box-shadow: inset 0px -3px 0 0 var(--color-gray-70),
			inset 0px -6px 0 0 var(--color-primary-10);
	}
	button:hover,
	button:focus {
		color: var(--color-gray-10);
		box-shadow: inset 0px -6px 0 0 var(--color-primary-10);
		outline: none;
	}
	button:not(.primary) {
		cursor: pointer;
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
	:host kol-button-wc.selected button {
		min-width: 44px;
		min-height: 44px;
		display: grid;
		gap: 0.25em;
		line-height: 1.5rem;
		font-weight: 700;
		cursor: default;
		font-size: 1rem;
		align-items: center;
		padding: 0px 7px;
		justify-content: center;
		font-style: normal;
		text-align: center;
		outline: none;
		color: var(--color-white);
		border: unset;
		background-color: var(--color-primary);
	}
	:host kol-button-wc.selected button:focus,
	:host kol-button-wc.selected button:hover {
		background-color: var(--color-primary-20);
	}`,
	'KOL-LINK': `a,
	button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		display: inline-block;
	}
	kol-link-wc,
	kol-link-button-wc {
		display: inline-block;
	}
	a,
	button {
		color: var(--color-primary);
		font-style: normal;
		font-weight: 400;
		display: inline-flex;
		line-height: 1.5em;
		text-decoration-line: none !important;
		outline: none !important;
	}
	a:focus-within,
	a:hover,
	button:focus-within,
	button:hover {
		box-shadow: inset 0 -1px 0 0 var(--color-primary);
	}
	kol-icon {
		padding: 0 0.25em;
		display: inline-block;
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
	'KOL-INPUT-TEXT': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-CHECKBOX': `/* INPUT */
	kol-input {
		display: grid;
		align-items: center;
		justify-items: left;
		width: 100%;
		min-height: 44px;
	}
	kol-input.default {
		grid-template-columns: 2rem auto;
	}
	kol-input.switch {
		grid-template-columns: 4rem auto;
	}
	kol-input > div.input {
		display: inline-flex;
		order: 1;
	}
	kol-input > div.input input {
		margin: 0px;
	}
	kol-input > label {
		cursor: pointer;
		order: 2;
	}
	kol-input > kol-alert.error {
		order: 3;
		padding-top: 0.25em;
		margin-bottom: 0.4em;
		margin-top: 0.2em;
		grid-column: span 2 / auto;
	}
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning) !important;
		box-shadow: 0 0 0 1px var(--color-warning) inset;
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	input {
		cursor: pointer;
		order: 1;
		width: 100%;
		border-color: var(--color-gray-30);
		border-width: 1px;
		border-style: solid;
		line-height: 24px;
		font-size: 1rem;
	}
	input:focus,
	input:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus:hover {
		box-shadow: none;
	}
	input:active {
		box-shadow: none;
	}
	kol-alert {
		display: block;
		width: 100%;
	} /* CHECKBOX */
	kol-input label span {
		margin-top: 0.125rem;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	kol-input input[type="checkbox"] {
		appearance: none;
		background-color: white;
		cursor: pointer;
		transition: 0.5s;
	}
	kol-input input[type="checkbox"].kol-disabled:before {
		cursor: not-allowed;
	}
	kol-input input[type="checkbox"]:before {
		content: "";
		cursor: pointer;
	}
	kol-input input[type="checkbox"]:checked {
		background-color: var(--color-primary-20);
		border-color: var(--color-primary-20);
	}
	kol-input.default input[type="checkbox"] {
		width: 1rem;
		height: 1rem;
	}
	kol-input.default input[type="checkbox"]:before {
		background-color: transparent;
		display: block;
		height: calc(2 * var(--spacing));
		position: relative;
		width: calc(2 * var(--spacing));
	}
	kol-input.default input[type="checkbox"]:checked:before {
		border-right-width: 1px;
		border-bottom-width: 1px;
		left: calc(1.2 * var(--spacing) - 2px);
		top: calc(2.2 * var(--spacing) - 2px);
		transform: rotate(40deg) translate(-50%, -50%);
		background-color: transparent;
		border-width: 0px 3px 3px 0px;
		border-color: white;
		border-radius: 1px;
		border-style: solid;
		height: calc(2 * var(--spacing));
		width: calc(1 * var(--spacing));
	}
	kol-input.default input[type="checkbox"]:indeterminate {
		--tw-bg-opacity: 1;
		background-color: white;
	}
	kol-input.default input[type="checkbox"]:indeterminate:before {
		background-color: var(--color-gray-30);
		height: 0.2rem;
		top: 0.35rem;
		left: 0.15rem;
		width: calc(2.5 * var(--spacing));
	}
	kol-input.switch input[type="checkbox"] {
		min-width: 3.5em;
		width: 3.5em;
		background-color: var(--color-gray-30);
		border-width: 0;
		height: 1.5em;
		border-radius: 1.25em;
		display: inline-block;
		position: relative;
	}
	kol-input.switch input[type="checkbox"]:before {
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
	kol-input.switch input[type="checkbox"]:checked {
		background-color: var(--color-primary-20);
	}
	kol-input.switch input[type="checkbox"]:checked:before {
		-webkit-transform: translateX(2em);
		-moz-transform: translateX(2em);
		-ms-transform: translateX(2em);
		transform: translateX(2em);
		--tw-bg-opacity: 1;
	}
	kol-input.switch input[type="checkbox"]:indeterminate {
		--tw-bg-opacity: 1;
	}
	kol-input.switch input[type="checkbox"]:indeterminate:before {
		-webkit-transform: translateX(1em);
		-moz-transform: translateX(1em);
		-ms-transform: translateX(1em);
		transform: translateX(1em);
	}
	.disabled {
		opacity: 0.33;
	}`,
	'KOL-INPUT-RADIO': `/* INPUT */
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
		border-color: var(--color-grey-20);
		border-width: 1px;
		border-style: solid;
		border-radius: 5px; /* padding: 10px 14px; */
		line-height: 24px;
		font-size: 16px;
	}
	:host fieldset div input[type="radio"]:hover {
		border-color: var(--color-midnight);
		box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
	}
	:host fieldset div input[type="radio"]:focus:hover {
		box-shadow: none;
	}
	:host fieldset div input[type="radio"]:active {
		box-shadow: none;
	}
	kol-alert {
		display: block;
		width: 100%;
		margin-bottom: 0.4em;
	}
	.required legend > span::after {
		content: "*";
		padding-left: 0.125em;
	} /* RADIO */
	:host fieldset {
		border: 0px;
		margin: 0px;
		padding: 0px;
		display: grid;
		gap: 0.25em;
	}
	:host fieldset div {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		min-height: 44px;
	}
	:host fieldset div label {
		cursor: pointer;
		display: flex;
		padding-left: 0.25em;
		width: 100%;
	}
	:host fieldset div label span {
		margin-top: 0.125em;
	}
	:host fieldset div input[type="radio"] {
		appearance: none;
		transition: 0.5s;
		border-radius: 100%;
		height: 1rem;
		min-width: 1rem;
		width: 1rem;
	}
	:host fieldset div input[type="radio"]:before {
		content: "";
		cursor: pointer;
		left: calc(1 * var(--spacing) - 1px);
		top: calc(1 * var(--spacing) - 1px);
		position: relative;
		border-radius: 100%;
		display: block;
		height: calc(2 * var(--spacing));
		width: calc(2 * var(--spacing));
	}
	:host fieldset div input[type="radio"]:checked:before {
		background-color: var(--color-primary-20);
	}
	:host fieldset div input[type="radio"]:disabled {
		cursor: not-allowed;
		border-color: var(--border-default);
		background-color: var(--background-light-grey);
	}
	:host fieldset #error {
		order: 3;
	}
	:host fieldset legend {
		order: 1;
		display: contents;
	}
	:host fieldset kol-input {
		order: 2;
	}
	:host fieldset kol-alert#error {
		padding-left: 0.5em;
		color: var(--color-warning);
	}
	fieldset.error input:focus,
	fieldset.error select:focus,
	fieldset.error textarea:focus {
		border-color: var(--color-warning) !important;
		box-shadow: 0 0 0 1px var(--color-warning) inset;
	}
	:host fieldset.error kol-alert.error {
		margin-left: -0.25em;
		color: var(--color-warning);
	}
	.disabled {
		opacity: 0.33;
	}
	:host fieldset.horizontal {
		display: flex;
		flex-wrap: wrap;
	}
	:host fieldset.horizontal legend {
		display: inline-block;
		margin-bottom: 0.25em;
	}`,
	'KOL-SELECT': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-TEXTAREA': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-PASSWORD': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-NUMBER': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-EMAIL': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-FILE': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-COLOR': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-INPUT-RANGE': `kol-input {
		display: grid;
	}
	kol-input label {
		order: 1;
		padding: 0.125rem 0 0.4rem;
		vertical-align: text-top;
		line-height: 1.2;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 2;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		margin-top: 0.2em;
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
		border-color: var(--color-grey);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		width: 100%;
		line-height: normal;
		padding: 0.4rem 8px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-color: #2d6f9e;
		box-shadow: 0 0 0 1px #2d6f9e inset;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--color-primary-20);
		box-shadow: inset 0 0 0 1px var(--color-primary-20);
		outline: none;
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
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		border-color: var(--color-warning);
		box-shadow: inset 0 0 0 1px var(--color-warning);
	}
	kol-input.error kol-alert.error {
		color: var(--color-warning);
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -2.7em;
	}
	kol-button-wc button {
		border: 0;
		height: 2.7em;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	kol-button-wc button:focus,
	kol-button-wc button:hover {
		background-color: var(--color-primary);
		color: var(--color-white);
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
		background: var(--color-primary);
		color: white;
	}`,
	'KOL-NAV': `/* :host * {hyphens: var(--hyphens);font-family: var(--font-family);line-height: var(--line-height);word-break: break-word;} */
	:host .hidden {
		display: none;
	}
	:host > div > nav ul {
		list-style: none;
		margin: 0px;
		padding: 0px;
		border-radius: var(--border-radius);
		background-color: var(--color-primary);
	}
	:host > div > nav ul > li {
		border-radius: var(--border-radius);
		overflow: hidden;
		padding: 0.125em;
	}
	:host > div > nav ul > li[part*="vertical"] + li {
		border-radius: 0;
		border-top: 0.1em dotted white;
	}
	:host > div > nav ul > li[part*="vertical selected"] {
		border-right: 0.375em solid var(--color-yellow-neutral);
	}
	:host > div > nav ul > li[part*="horizontal"] + li {
		border-radius: 0;
		border-left: 0.1em dotted white;
	}
	:host > div > nav ul > li[part*="horizontal selected"] {
		border-bottom: 0.375em solid var(--color-yellow-neutral);
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
		background-color: var(--color-primary);
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
	:host > div > nav kol-link-wc[exportparts*="selected"] a {
		background-color: var(--color-primary-20);
		font-weight: 700;
	}
	:host > div > nav kol-link-wc a kol-icon.mr-2 {
		margin-right: calc(2 * var(--spacing));
	}
	:host > div > nav kol-link-wc a kol-icon.ml-2 {
		margin-left: calc(2 * var(--spacing));
	}
	:host > div > nav kol-link-wc a:focus,
	:host > div > nav kol-link-wc a:hover {
		border: 1px solid white;
		background-color: var(--kolibri-color-focus);
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
	:host kol-icon::part(icon separator) {
		font-weight: 900;
		font-size: 0.875rem;
	}
	:host kol-icon::part(icon separator)::before {
		color: black;
		content: "\f054";
		font-family: "Font Awesome 6 Free";
	}
	:host li > kol-link > kol-link-wc > a {
		color: red !important;
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
	'KOL-LINK-BUTTON': `a {
		min-width: 44px;
		min-height: 44px;
		background-color: transparent;
		border: 0;
		cursor: pointer;
		padding: 0;
		display: flex;
		gap: 0.25rem;
		justify-items: center;
		align-items: center;
		text-decoration: none !important;
	}
	a > kol-span-wc {
		display: grid;
		min-width: 44px;
		min-height: 44px;
		gap: 0.25em;
		line-height: 1.5rem;
		font-family: Roboto;
		font-weight: 700;
		cursor: pointer;
		font-size: 1rem;
		align-items: center;
		padding: 0px 7px;
		justify-content: center;
		font-style: normal;
		text-align: center;
		border: none;
		outline: none;
	}
	a:active > kol-span-wc {
		transform: translateY(1px);
	}
	.primary a:disabled > kol-span-wc,
	.danger a:disabled > kol-span-wc,
	.normal a:disabled > kol-span-wc {
		cursor: not-allowed;
		color: var(--color-white);
		background-color: var(--color-gray-40);
	}
	.ghost a:disabled > kol-span-wc,
	.loading a:disabled > kol-span-wc,
	.secondary a:disabled > kol-span-wc {
		cursor: not-allowed;
		color: var(--color-gray-40);
		background-color: var(--color-white);
		border: var(--color-gray-40) solid 3px;
	}
	.primary a > kol-span-wc,
	.primary a:hover > kol-span-wc,
	.normal a > kol-span-wc,
	.normal a:hover > kol-span-wc {
		background-color: var(--color-primary);
		color: var(--color-white);
	}
	.loading a > kol-span-wc,
	.loading a:hover > kol-span-wc,
	.secondary a > kol-span-wc,
	.secondary a:hover > kol-span-wc {
		background-color: var(--color-white);
		color: var(--color-primary);
		border: 2px solid var(--color-primary);
	}
	.danger a > kol-span-wc,
	.danger a:hover > kol-span-wc {
		background-color: var(--color-warning);
		border-color: var(--color-warning);
		color: var(--color-white);
		box-shadow: unset;
	}
	.ghost a,
	.ghost a:hover > kol-span-wc {
		background-color: unset;
		color: var(--color-primary);
		box-shadow: unset;
	}
	.primary a:active > kol-span-wc,
	.primary a:focus > kol-span-wc,
	.primary a:hover > kol-span-wc,
	.loading a:active > kol-span-wc,
	.loading a:focus > kol-span-wc,
	.loading a:hover > kol-span-wc,
	.secondary a:active > kol-span-wc,
	.secondary a:focus > kol-span-wc,
	.secondary a:hover > kol-span-wc,
	.normal a:active > kol-span-wc,
	.normal a:focus > kol-span-wc,
	.normal a:hover > kol-span-wc {
		background-color: var(--color-primary-20);
		color: var(--color-white);
		outline: none;
	}
	.loading a:active > kol-span-wc,
	.loading a:focus > kol-span-wc,
	.loading a:hover > kol-span-wc,
	.secondary a:active > kol-span-wc,
	.secondary a:focus > kol-span-wc,
	.secondary a:hover > kol-span-wc {
		border: 2px solid var(--color-primary-20);
	}
	.danger a:active > kol-span-wc,
	.danger a:hover > kol-span-wc {
		color: var(--color-white);
		background-color: var(--color-dark-yellow-neutral);
		outline: none;
	}
	.ghost a:active > kol-span-wc,
	.ghost a:hover > kol-span-wc {
		color: var(--color-primary);
		box-shadow: inset 0 0 0 2px var(--color-primary);
		outline: none;
	}
	a > kol-span-wc > span {
		display: flex;
		gap: 0.5em;
		margin: auto;
		align-items: center;
		justify-content: center;
		letter-spacing: 0.75px;
	}
	a.icon-only > kol-span-wc {
		padding: 8px;
	}
	a.icon-only > kol-span-wc > span > span {
		display: none;
	}
	a.icon-only > kol-span-wc kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	.loading a > kol-span-wc kol-icon {
		animation: spin 5s infinite linear;
	}
	.loading a > kol-span-wc {
		min-height: unset !important;
		min-width: unset !important;
	}`,
	'KOL-BUTTON-LINK': `a,
	button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		display: inline-block;
	}
	kol-link-wc,
	kol-link-button-wc {
		display: inline-block;
	}
	a,
	button {
		color: var(--color-primary);
		font-style: normal;
		font-weight: 400;
		display: inline-flex;
		line-height: 1.5em;
		text-decoration-line: none !important;
		outline: none !important;
	}
	a:focus-within,
	a:hover,
	button:focus-within,
	button:hover {
		box-shadow: inset 0 -1px 0 0 var(--color-primary);
	}
	kol-icon {
		padding: 0 0.25em;
		display: inline-block;
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
});
