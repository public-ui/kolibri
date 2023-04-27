import { KoliBri } from '@public-ui/components';

export const BMF = KoliBri.createTheme('bmf', {
	GLOBAL: `/* Design Tokens */
	:host {
		--border-radius: 5px;
		--color-midnight: #004b76;
		--color-ocean: #0077b6;
		--color-sky: #99c9e2;
		--color-ice: #cce4f0;
		--color-crimson: #780f2d;
		--color-red: #c0003c;
		--color-pink: #f2ccd8;
		--color-olive: #004d38;
		--color-green: #005c45;
		--color-jungle: #00854a;
		--color-lime: #c1ca31;
		--color-mint: #ccdeda;
		--color-fire: #7a2e1f;
		--color-orange: #c44931;
		--color-coral: #f5dcd7;
		--color-bronze: #c44931;
		--color-yellow: #c44931;
		--color-ivory: #c44931;
		--color-purple: #c44931;
		--color-lavender: #c44931;
		--color-black: #202020;
		--color-metal: #454d4f;
		--color-grey: #576164;
		--color-granite: #bec5c9;
		--color-silver: #e5e8e9;
		--color-smoke: #f2f3f4;
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
	a,
	button,
	input,
	option,
	select,
	summary,
	textarea {
		hyphens: auto;
		letter-spacing: inherit;
		word-break: break-word;
	}
	*[tabindex]:focus,
	a:focus,
	button:focus,
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
	kol-tooltip .area {
		background-color: var(--color-metal);
		color: var(--color-white);
	}
	kol-tooltip kol-span-wc {
		border-radius: var(--border-radius);
		line-height: 1.5em;
		padding: 0.5rem 0.75rem;
	}
	kol-span-wc,
	kol-span-wc > span {
		gap: 0.5em;
	}`,
	'KOL-BUTTON': `:host {
		display: inline-block;
	}
	button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		border-radius: 1.5em;
		min-width: 44px;
		min-height: 44px;
		padding: 0;
		text-decoration: none !important;
	}
	button > kol-span-wc {
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
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	button:disabled > kol-span-wc {
		cursor: not-allowed;
		opacity: 0.5;
	}
	button.primary > kol-span-wc,
	button.primary:disabled:hover > kol-span-wc {
		background-color: var(--color-midnight);
		border-color: var(--color-midnight);
		color: var(--color-white);
	}
	button.secondary > kol-span-wc,
	button.secondary:disabled:hover > kol-span-wc,
	button.normal > kol-span-wc,
	button.normal:disabled:hover > kol-span-wc {
		background-color: var(--color-white);
		border-color: var(--color-midnight);
		color: var(--color-midnight);
	}
	button.danger > kol-span-wc,
	button.danger:disabled:hover > kol-span-wc {
		background-color: var(--color-red);
		border-color: var(--color-red);
		color: var(--color-white);
	}
	button.ghost > kol-span-wc,
	button.ghost:disabled:hover > kol-span-wc {
		border-color: var(--color-white);
		background-color: var(--color-white);
		box-shadow: none;
		color: var(--color-midnight);
	} /*-----------*/
	button.primary:active > kol-span-wc,
	button.primary:hover > kol-span-wc,
	button.secondary:active > kol-span-wc,
	button.secondary:hover > kol-span-wc,
	button.normal:active > kol-span-wc,
	button.normal:hover > kol-span-wc,
	button.danger:active > kol-span-wc,
	button.danger:hover > kol-span-wc,
	button.ghost:active > kol-span-wc,
	button.ghost:hover > kol-span-wc {
		background-color: var(--color-ocean);
		border-color: var(--color-ocean);
		box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		color: var(--color-white);
	}
	button.danger:active > kol-span-wc,
	button.danger:hover > kol-span-wc {
		background-color: var(--color-crimson);
		border-color: var(--color-crimson);
	}
	button:disabled:hover > kol-span-wc,
	button:focus:hover > kol-span-wc {
		box-shadow: none;
	}
	button.primary:active > kol-span-wc,
	button.secondary:active > kol-span-wc,
	button.normal:active > kol-span-wc,
	button.danger:active > kol-span-wc,
	button.ghost:active > kol-span-wc {
		border-color: var(--color-white);
		box-shadow: none;
		outline: none;
	}
	:host button > kol-span-wc > span {
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
		width: 1.5em;
		height: 1.5em;
	}
	button.loading > kol-span-wc kol-icon {
		animation: spin 5s infinite linear;
	} /** small ghost button */
	button.small.ghost > kol-span-wc {
		border: none;
		background-color: transparent;
		box-shadow: none;
	}
	button.small.ghost > kol-span-wc > span {
		border-radius: 1.5em;
		border-style: solid;
		border-width: 2px;
		border-color: var(--color-white);
		background-color: var(--color-white);
	}
	button.small.ghost:active > kol-span-wc > span,
	button.small.ghost:hover > kol-span-wc > span,
	button.small.ghost.transparent:active > kol-span-wc > span,
	button.small.ghost.transparent:hover > kol-span-wc > span {
		background-color: var(--color-ocean);
		border-color: var(--color-ocean);
		box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		color: var(--color-white);
	} /** button with transparent background */
	button.transparent > kol-span-wc > span,
	button.small.ghost.transparent > kol-span-wc > span,
	button.transparent > kol-span-wc {
		background-color: transparent;
		border-color: transparent;
	}`,
	'KOL-INPUT-TEXT': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-INPUT-PASSWORD': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-INPUT-NUMBER': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-INPUT-EMAIL': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-INPUT-FILE': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-TEXTAREA': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-ALERT': `:host .msg,
	:host .msg {
		border-width: 0;
	}
	:host > div {
		border-width: 2px;
		border-style: solid;
		border-radius: 5px;
		display: flex;
		width: 100%;
		overflow: unset;
		border-color: transparent;
		background-color: white;
	}
	:host > div > div.heading {
		display: flex;
		gap: 0.5em;
		place-items: center;
	}
	:host > div > div.heading > div {
		display: grid;
		gap: var(--kolibri-spacing);
	}
	:host > div.msg > div.heading > kol-icon {
		place-self: baseline;
	}
	:host > div > div.heading > div {
		display: grid;
		gap: var(--spacing);
	}
	:host > div > div.heading > kol-button-wc.close {
		place-self: center;
	}
	:host > div.msg {
		align-items: start;
	}
	:host > div.default {
		border-color: var(--color-grey);
	}
	:host > div.default.msg .heading-icon {
		color: var(--color-grey);
	}
	:host > div.error {
		border-color: var(--color-red);
	}
	:host > div.error.msg .heading-icon {
		color: var(--color-red);
	}
	:host > div.info {
		border-color: var(--color-midnight);
	}
	:host > div.info.msg .heading-icon {
		color: var(--color-midnight);
	}
	:host > div.success {
		border-color: var(--color-green);
	}
	:host > div.success.msg .heading-icon {
		color: var(--color-green);
	}
	:host > div.warning {
		border-color: var(--color-orange);
	}
	:host > div.warning.msg .heading-icon {
		color: var(--color-orange);
	}
	:host .heading-icon {
		color: white;
	}
	:host > div > div.heading .heading-icon {
		padding: 0;
	}
	:host > div.msg > .heading > .heading-icon {
		padding-top: 0;
		place-items: baseline;
	}
	:host > div.msg > .heading > .heading-icon::part(icon) {
		line-height: 1.375rem;
	}
	:host > div.msg.default .heading > div > kol-heading-wc {
		color: var(--color-grey);
	}
	:host > div.msg.error .heading > div > kol-heading-wc {
		color: var(--color-red);
	}
	:host > div.msg.info .heading > div > kol-heading-wc {
		color: var(--color-midnight);
	}
	:host > div.msg.success .heading > div > kol-heading-wc {
		color: var(--color-green);
	}
	:host > div.msg.warning .heading > div > kol-heading-wc {
		color: var(--color-orange);
	} /*:host > div.msg > .heading > div {display: grid;grid-template-columns: 1fr auto;}:host > div.msg > .heading > div > .content {grid-row: 2;grid-column: 1;}:host > div.msg > div > .close {display: flex;}*/
	:host > div.msg.default .close .icon {
		color: var(--color-grey);
	}
	:host > div.msg.error .close .icon {
		color: var(--color-red);
	}
	:host > div.msg.info .close .icon {
		color: var(--color-midnight);
	}
	:host > div.msg.success .close .icon {
		color: var(--color-green);
	}
	:host > div.msg.warning .close .icon {
		color: var(--color-orange);
	} /** CARD **/
	:host .card,
	:host .card {
		border: 3px solid #004b76;
		filter: drop-shadow(0px 2px 4px rgba(8, 35, 48, 0.24));
		flex-direction: column;
	}
	:host > div.card > .heading {
		padding: 0.5rem 1rem;
	}
	:host > div.card > .heading > div {
		width: 100%;
	}
	:host > div.card > .heading .heading-icon {
		justify-self: right;
	}
	:host > div.card > .heading kol-heading-wc {
		width: 100%;
		color: white;
		display: flex;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	:host > div.card > .heading kol-heading-wc > * {
		margin: auto 0;
	}
	:host > div.card > div.content {
		padding: 0.5rem 1rem;
	}
	:host > div.card.default > .heading {
		background-color: var(--color-grey);
	}
	:host > div.card.error > .heading {
		background-color: var(--color-red);
	}
	:host > div.card.info > .heading {
		background-color: var(--color-midnight);
	}
	:host > div.card.success > .heading {
		background-color: var(--color-green);
	}
	:host > div.card.warning > .heading {
		background-color: var(--color-orange);
	}
	:is(.error, .info, .success, .warning) .heading-icon::part(icon) {
		font-family: "Font Awesome 6 Free" !important;
		font-weight: 900;
	}
	:host > div.error .heading-icon::part(icon)::before {
		content: "\\f06a";
	}
	:host > div.info .heading-icon::part(icon)::before {
		content: "\\f05a";
	}
	:host > div.success .heading-icon::part(icon)::before {
		content: "\\f058";
	}
	:host > div.warning .heading-icon::part(icon)::before {
		content: "\\f071";
	}
	:host > div.card > div > .content {
		grid-row: 2;
		grid-column: 1 / span 2;
	}
	:host > div.card.default .close {
		background-color: var(--color-grey);
	}
	:host > div.card.error .close {
		background-color: var(--color-red);
	}
	:host > div.card.info .close {
		background-color: var(--color-midnight);
	}
	:host > div.card.success .close {
		background-color: var(--color-green);
	}
	:host > div.card.warning .close {
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
	'KOL-BADGE': `:host {
		display: inline-block;
	}
	:host > span {
		border-radius: 0.3125rem;
		display: inline-flex;
		font-size: 0.875em;
		font-style: normal;
		font-weight: 700;
		line-height: 1rem;
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
	}`,
	'KOL-BUTTON-GROUP': `:host > kol-button-group-wc {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		background-color: var(--color-white);
		border-left: none;
		box-shadow: -4px 0px 0px var(--color-ocean);
		padding: 0.25em 0.5em;
		width: 100%;
	}`,
	'KOL-LINK': `a,
	button {
		color: var(--color-midnight);
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.5em;
		text-decoration-line: underline;
		border-radius: 0.25rem;
	}
	a:hover,
	button:hover {
		text-decoration-thickness: 0.25em;
	}
	a:visited,
	button:visited {
		color: var(--visited);
	}
	kol-icon {
		padding: 0 0.25em;
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
	a,
	kol-span-wc > span {
		place-items: baseline;
	}
	kol-span-wc > span {
		gap: 0.25em;
	}`,
	'KOL-DETAILS': `details > summary {
		border-radius: var(--border-radius);
	}
	details kol-indented-text {
		margin: 0.25em 0px 0px 0.65em;
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
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
		content: "\\f054";
	}
	:host > div.close > kol-heading-wc button kol-icon::part(icon)::before {
		content: "\\f078";
	}
	:host > div {
		width: 100%;
		height: 100%;
		display: grid;
	}
	:host > div div[class="header"],
	:host > div[class*="open"] div[class="content"] {
		margin: 0;
		padding-left: 2.25em;
	}
	:host > div[class*="open"] div[class="content"] {
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
	}
	ul {
		list-style: none;
	}
	.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
		background-color: var(--color-white);
		text-decoration: none;
		color: var(--color-midnight);
		width: 100%;
		display: flex;
		align-items: center;
		font-style: normal;
		padding: 0.75rem 0.5rem 0.75rem 0;
		border-left-color: var(--color-white);
		border-left-style: solid;
		border-left-width: 0.5rem;
		line-height: 1.5rem;
		min-height: 44px;
		min-width: 44px;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
		letter-spacing: 0.175px;
	}
	.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
		border-left-color: var(--color-ocean);
		font-weight: 700;
	}
	.selected :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
		background-color: var(--color-ice);
		border-left-color: var(--color-midnight);
		color: var(--color-midnight);
		font-weight: 700;
		letter-spacing: unset;
	}
	a:hover,
	.selected a:hover,
	[exportparts*="selected"] a:hover {
		background-color: var(--color-ocean);
		color: var(--color-white);
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
		grid-template-columns: 2rem auto;
	}
	:host kol-input.switch {
		grid-template-columns: 4rem auto;
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
		border-radius: 0.25em;
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
		--tw-bg-opacity: 1; /* background-color: white; */
	}
	:host kol-input.default input[type="checkbox"]:indeterminate:before {
		background-color: var(--color-white);
		height: 0.125rem;
		top: 0.6rem;
		left: 0.1rem;
		width: calc(4 * var(--spacing));
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
	}`,
	'KOL-INPUT-RANGE': `kol-input {
		gap: 0.4em;
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
	input,
	select,
	textarea {
		border: none;
	}
	input[type="color"] {
		border: none;
		min-height: 40px !important;
	}
	input[type="color"],
	input[type="file"] {
		background-color: transparent;
	}
	input::placeholder {
		color: var(--color-grey);
	}
	.input {
		border-color: var(--color-grey);
		border-radius: 0.3125rem;
		border-style: solid;
		border-width: 2px;
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
		border-color: var(--color-midnight);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
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
	'KOL-LINK-BUTTON': `a {
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
		justify-items: center;
	}
	a {
		background-color: transparent;
		border: 0;
		cursor: pointer;
		border-radius: 1.5em;
		min-width: 44px;
		min-height: 44px;
		padding: 0;
		text-decoration: none !important;
	}
	a > kol-span-wc {
		display: grid;
		min-width: 44px;
		min-height: 44px;
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
	}
	a:disabled > kol-span-wc {
		cursor: not-allowed;
		opacity: 0.5;
	}
	.primary a > kol-span-wc,
	.primary a:disabled:hover > kol-span-wc {
		background-color: var(--color-midnight);
		border-color: var(--color-midnight);
		color: var(--color-white);
	}
	.secondary a > kol-span-wc,
	.secondary a:disabled:hover > kol-span-wc,
	.normal a > kol-span-wc,
	.normal a:disabled:hover > kol-span-wc {
		background-color: var(--color-white);
		border-color: var(--color-midnight);
		color: var(--color-midnight);
	}
	.danger a > kol-span-wc,
	.danger a:disabled:hover > kol-span-wc {
		background-color: var(--color-red);
		border-color: var(--color-red);
		color: var(--color-white);
	}
	.ghost a > kol-span-wc,
	.ghost a:disabled:hover > kol-span-wc {
		border-color: var(--color-white);
		background-color: var(--color-white);
		box-shadow: none;
		color: var(--color-midnight);
	} /*-----------*/
	.primary a:active > kol-span-wc,
	.primary a:hover > kol-span-wc,
	.secondary a:active > kol-span-wc,
	.secondary a:hover > kol-span-wc,
	.normal a:active > kol-span-wc,
	.normal a:hover > kol-span-wc,
	.danger a:active > kol-span-wc,
	.danger a:hover > kol-span-wc,
	.ghost a:active > kol-span-wc,
	.ghost a:hover > kol-span-wc {
		background-color: var(--color-ocean);
		border-color: var(--color-ocean);
		box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		color: var(--color-white);
	}
	.danger a:active > kol-span-wc,
	.danger a:hover > kol-span-wc {
		background-color: var(--color-crimson);
		border-color: var(--color-crimson);
	}
	a:disabled:hover > kol-span-wc,
	a:focus:hover > kol-span-wc {
		box-shadow: none;
	}
	.primary a:active > kol-span-wc,
	.secondary a:active > kol-span-wc,
	.normal a:active > kol-span-wc,
	.danger a:active > kol-span-wc,
	.ghost a:active > kol-span-wc {
		border-color: var(--color-white);
		box-shadow: none;
		outline: none;
	}
	:host a > kol-span-wc > span {
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
		width: 1.5em;
		height: 1.5em;
	}
	a.loading > kol-span-wc kol-icon {
		animation: spin 5s infinite linear;
	} /** small ghost a */
	.ghost.small a > kol-span-wc {
		border: none;
		background-color: transparent;
		box-shadow: none;
	}
	.ghost.small a > kol-span-wc > span {
		border-radius: 1.5em;
		border-style: solid;
		border-width: 2px;
		border-color: var(--color-white);
		background-color: var(--color-white);
	}
	.ghost.small a:active > kol-span-wc > span,
	.ghost.small a:hover > kol-span-wc > span,
	.ghost.small.transparent a:active > kol-span-wc > span,
	.ghost.small.transparent a:hover > kol-span-wc > span {
		background-color: var(--color-ocean);
		border-color: var(--color-ocean);
		box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		color: var(--color-white);
	} /** a with transparent background */
	.transparent a > kol-span-wc > span,
	.ghost.small.transparent a > kol-span-wc > span,
	.transparent a > kol-span-wc {
		background-color: transparent;
		border-color: transparent;
	}
	.loading a > kol-span-wc kol-icon {
		animation: spin 5s infinite linear;
	}`,
	'KOL-BUTTON-LINK': `a,
	button {
		color: var(--color-midnight);
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.5em;
		text-decoration-line: underline;
		border-radius: 0.25rem;
	}
	a:hover,
	button:hover {
		text-decoration-thickness: 0.25em;
	}
	a:visited,
	button:visited {
		color: var(--visited);
	}
	kol-icon {
		padding: 0 0.25em;
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
	a,
	kol-span-wc > span {
		place-items: baseline;
	}
	kol-span-wc > span {
		gap: 0.25em;
	}`,
	'KOL-ABBR': `abbr {
		border-bottom: dotted var(--color-metal) 1px;
		text-decoration: none !important;
	}`,
	'KOL-ICON': `:host {
		display: inline-block;
		width: 1em;
		height: 1em;
	}
	:host > i {
		width: 1em;
		height: 1em;
	}
	@font-face {
		font-family: "Material Icons";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url("./material-icons.woff2") format("woff2"),
			url("./material-icons.woff") format("woff");
	}
	.material-icons {
		font-family: "Material Icons";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Icons Outlined";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url("./material-icons-outlined.woff2") format("woff2"),
			url("./material-icons-outlined.woff") format("woff");
	}
	.material-icons-outlined {
		font-family: "Material Icons Outlined";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Icons Round";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url("./material-icons-round.woff2") format("woff2"),
			url("./material-icons-round.woff") format("woff");
	}
	.material-icons-round {
		font-family: "Material Icons Round";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Icons Sharp";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url("./material-icons-sharp.woff2") format("woff2"),
			url("./material-icons-sharp.woff") format("woff");
	}
	.material-icons-sharp {
		font-family: "Material Icons Sharp";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Icons Two Tone";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url("./material-icons-two-tone.woff2") format("woff2"),
			url("./material-icons-two-tone.woff") format("woff");
	}
	.material-icons-two-tone {
		font-family: "Material Icons Two Tone";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Symbols Outlined";
		font-style: normal;
		font-weight: 100 700;
		font-display: block;
		src: url("./material-symbols-outlined.woff2") format("woff2");
	}
	.material-symbols-outlined {
		font-family: "Material Symbols Outlined";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Symbols Rounded";
		font-style: normal;
		font-weight: 100 700;
		font-display: block;
		src: url("./material-symbols-rounded.woff2") format("woff2");
	}
	.material-symbols-rounded {
		font-family: "Material Symbols Rounded";
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
		font-feature-settings: "liga";
	}
	@font-face {
		font-family: "Material Symbols Sharp";
		font-style: normal;
		font-weight: 100 700;
		font-display: block;
		src: url("./material-symbols-sharp.woff2") format("woff2");
	}
	.material-symbols-sharp {
		font-family: "Material Symbols Sharp";
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
		font-feature-settings: "liga";
	}
	[class*="material-icons"].home:after {
		content: "home";
	}
	[class*="material-icons"].east:after {
		content: "east";
	}
	[class*="material-symbols"].home:after {
		content: "home";
	}
	[class*="material-symbols"].arrow_right_alt:after {
		content: "arrow_right_alt";
	}`,
});
