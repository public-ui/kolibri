import { KoliBri } from '@public-ui/schema';

// Mitarbeiterportal Zoll
export const MAPZ = KoliBri.createTheme('mapz', {
	GLOBAL: `:host {
		--kolibri-background-color: white;
		--kolibri-background-color-modal: rgba(0, 0, 0, 0.5);
		--kolibri-border-color: #aaaaaa;
		--kolibri-border-radius: 0.25rem;
		--kolibri-border-width: 2px;
		--kolibri-color: black;
		--kolibri-color-undefined: #fb00d2;
		--kolibri-color-visited: #880b73;
		--kolibri-color-accent: #ffb752; /* #ef9e48 */
		--kolibri-color-active: #1e538f;
		--kolibri-color-hover: #1e538f;
		--kolibri-color-focus: #1e538f;
		--kolibri-color-danger: #ad0e0b; /* --kolibri-color-dark: #222222; */
		--kolibri-color-error: #ad0e0b;
		--kolibri-color-ghost: #333333;
		--kolibri-color-info: #28568a; /* --kolibri-color-light: #f2f2f2; */
		--kolibri-color-normal: #326cae;
		--kolibri-color-outline: var(--kolibri-color-focus);
		--kolibri-color-primary: #1e538f;
		--kolibri-color-secondary: #444444;
		--kolibri-color-spin-1: #000000;
		--kolibri-color-spin-2: #ff0000;
		--kolibri-color-spin-3: #ffcc00;
		--kolibri-color-success: #12632f;
		--kolibri-color-warning: #854000;
		--kolibri-color-gray: #666;
		--kolibri-font-family: var(--font-family);
		--kolibri-font-size: var(--font-size);
		--kolibri-hyphens: auto;
		--kolibri-line-height: 1.5em;
		--kolibri-shadow-color: black;
		--kolibri-spacing: 0.25em;
		--spacing: 0.25em;
		--font-family: Roboto, Droid Sans, Arial, Helvetica, sans-serif;
		--font-size: 16px;
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
		outline-color: var(--kolibri-color-outline);
		outline-offset: 2px;
		outline-style: solid;
		outline-width: 3px;
		transition: outline-offset 0.2s linear;
	}
	kol-tooltip .area {
		background-color: #f2f2f2;
	}
	kol-tooltip #arrow {
		background-color: #626262;
	}
	kol-tooltip kol-span-wc {
		border-radius: 2px;
		border: 1px solid #626262;
		color: #000000 !important;
		font-size: 0.875rem;
		line-height: 1.25rem;
		padding: 0.25rem 0.5rem;
	}
	kol-span-wc,
	kol-span-wc > span {
		gap: 0.25em;
	}
	kol-span-wc > span {
		align-items: baseline;
	}`,
	'KOL-BUTTON': `a,
	button {
		border-radius: var(--kolibri-border-radius);
		overflow: hidden;
	}
	a > kol-span-wc,
	button > kol-span-wc {
		border-radius: var(--kolibri-border-radius);
		border-style: solid;
		border-width: 2px;
		min-height: 44px;
		min-width: 44px;
		box-shadow: 0 0 0.25em gray;
		font-family: var(--kolibri-font-family);
		font-size: inherit;
		line-height: 1.25em;
		padding: calc(2 * var(--kolibri-spacing));
	}
	a > kol-span-wc,
	button > kol-span-wc {
		gap: 0.25em;
	}
	kol-link-wc.primary > a > kol-span-wc,
	kol-link-wc.primary > a:disabled:hover > kol-span-wc,
	button.primary > kol-span-wc,
	button.primary:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-primary);
		border-color: var(--kolibri-color-primary);
		color: white;
	}
	kol-link-wc.primary > a:hover > kol-span-wc,
	kol-link-wc.primary > a:focus > kol-span-wc,
	button.primary:hover > kol-span-wc,
	button.primary:focus > kol-span-wc {
		color: var(--kolibri-color-primary);
	}
	kol-link-wc.secondary > a > kol-span-wc,
	kol-link-wc.secondary > a:disabled:hover > kol-span-wc,
	button.secondary > kol-span-wc,
	button.secondary:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-secondary);
		border-color: var(--kolibri-color-secondary);
		color: white;
	}
	kol-link-wc.secondary > a:hover > kol-span-wc,
	kol-link-wc.secondary > a:focus > kol-span-wc,
	button.secondary:hover > kol-span-wc,
	button.secondary:focus > kol-span-wc {
		color: var(--kolibri-color-secondary);
	}
	kol-link-wc.normal > a > kol-span-wc,
	kol-link-wc.normal > a:disabled:hover > kol-span-wc,
	button.normal > kol-span-wc,
	button.normal:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-normal);
		border-color: var(--kolibri-color-normal);
		color: white;
	}
	kol-link-wc.normal > a:hover > kol-span-wc,
	kol-link-wc.normal > a:focus > kol-span-wc,
	button.normal:hover > kol-span-wc,
	button.normal:focus > kol-span-wc {
		color: var(--kolibri-color-normal);
	}
	kol-link-wc.danger > a > kol-span-wc,
	kol-link-wc.danger > a:disabled:hover > kol-span-wc,
	button.danger > kol-span-wc,
	button.danger:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-danger);
		border-color: var(--kolibri-color-danger);
		color: white;
	}
	kol-link-wc.danger > a:hover > kol-span-wc,
	kol-link-wc.danger > a:focus > kol-span-wc,
	button.danger:hover > kol-span-wc,
	button.danger:focus > kol-span-wc {
		color: var(--kolibri-color-danger);
	}
	kol-link-wc.ghost > a > kol-span-wc,
	kol-link-wc.ghost > a:disabled:hover > kol-span-wc,
	button.ghost > kol-span-wc,
	button.ghost:disabled:hover > kol-span-wc {
		background-color: white;
		border-color: var(--kolibri-color-ghost);
		color: var(--kolibri-color-ghost);
	}
	kol-link-wc.ghost > a:hover > kol-span-wc,
	kol-link-wc.ghost > a:focus > kol-span-wc,
	button.ghost:hover > kol-span-wc,
	button.ghost:focus > kol-span-wc {
		background-color: var(--kolibri-color-ghost);
		color: white;
	}
	kol-link-wc > a:hover > kol-span-wc,
	kol-link-wc > a:focus > kol-span-wc,
	button:hover > kol-span-wc,
	button:focus > kol-span-wc {
		background-color: white;
		box-shadow: 0 0 0.25em black;
	}`,
	'KOL-ALERT': `kol-alert-wc {
		display: block;
		border-radius: var(--kolibri-border-radius);
		border: 2px solid;
	}
	kol-alert-wc.default {
		border-color: var(--kolibri-color-gray);
	}
	kol-alert-wc.default .heading-icon {
		background-color: var(--kolibri-color-gray);
	}
	kol-alert-wc.error {
		border-color: var(--kolibri-color-error);
	}
	.error .heading-icon {
		background-color: var(--kolibri-color-error);
	}
	kol-alert-wc.info {
		border-color: var(--kolibri-color-info);
	}
	.info .heading-icon {
		background-color: var(--kolibri-color-info);
	}
	kol-alert-wc.success {
		border-color: var(--kolibri-color-success);
	}
	.success .heading-icon {
		background-color: var(--kolibri-color-success);
	}
	kol-alert-wc.warning {
		border-color: var(--kolibri-color-warning);
	}
	.warning .heading-icon {
		background-color: var(--kolibri-color-warning);
	}
	.heading .heading-icon {
		align-self: stretch;
		color: white;
		display: block;
		height: auto;
		width: auto;
		padding: var(--spacing);
	}
	.heading .heading-icon::part(icon) {
		place-items: center;
		height: 100%;
		display: grid;
	}
	.card .heading .heading-icon {
		border-radius: 0 0 var(--kolibri-border-radius);
	}
	.heading > div {
		padding: var(--spacing);
	}
	.card .content {
		padding: var(--spacing);
	}`,
	'KOL-INPUT-TEXT': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-BUTTON-GROUP': `kol-button-group-wc {
		gap: 0.25em;
	}`,
	'KOL-INPUT-PASSWORD': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-NUMBER': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-EMAIL': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-FILE': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-TEXTAREA': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-HEADING': `h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.25em;
		margin: 0;
		padding: 0;
	}
	h1 {
		font-size: 1.5rem !important;
	}
	h2 {
		font-size: 1.4rem !important;
	}
	h3 {
		font-size: 1.3rem !important;
	}
	h4 {
		font-size: 1.2rem !important;
	}
	h5 {
		font-size: 1.1rem !important;
	}
	h6 {
		font-size: 1rem !important;
	}`,
	'KOL-INPUT-CHECKBOX': `/* ALL INPUT, SELECT, TEXTAREA */
	label {
		cursor: pointer;
	}
	input {
		color: var(--default-letter);
		border-color: var(--default-border);
		border-width: 2px;
		border-style: solid;
		border-radius: 5px; /* padding: 10px 14px; */
		line-height: 24px;
		font-size: 16px;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	input:hover {
		border-color: var(--kolibri-color-primary);
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
	input[type="checkbox"]:checked {
		background-color: var(--kolibri-color-primary);
		border-color: var(--kolibri-color-primary);
	}
	.default input[type="checkbox"] {
		border-radius: 0.25em;
		height: calc(6 * var(--kolibri-spacing));
		min-width: calc(6 * var(--kolibri-spacing));
		width: calc(6 * var(--kolibri-spacing));
	}
	.default input[type="checkbox"]:before {
		border-radius: 0.25em;
		background-color: transparent;
		display: block;
		height: calc(6 * var(--kolibri-spacing));
		position: relative;
		width: calc(6 * var(--kolibri-spacing));
	}
	.default input[type="checkbox"]:checked:before {
		border-right-width: 3px;
		border-bottom-width: 3px;
		left: calc(1.5 * var(--kolibri-spacing) - 2px);
		top: calc(2.85 * var(--kolibri-spacing) - 2px);
		transform: rotate(40deg) translate(-50%, -50%);
		background-color: transparent;
		border-width: 0px 3px 3px 0px;
		border-color: white;
		border-radius: 1px;
		border-style: solid;
		height: calc(3 * var(--kolibri-spacing));
		width: calc(1.5 * var(--kolibri-spacing));
	}
	.default input[type="checkbox"]:indeterminate:before {
		background-color: var(--kolibri-color-normal);
		height: 0.375rem;
		top: 0.45rem;
		left: 0.15rem;
		width: calc(4 * var(--kolibri-spacing));
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
	.switch input[type="checkbox"]:indeterminate:before {
		-webkit-transform: translateX(0.75em);
		-moz-transform: translateX(0.75em);
		-ms-transform: translateX(0.75em);
		transform: translateX(0.75em);
		background-color: var(--kolibri-color-primary);
	}
	.disabled {
		opacity: 0.33;
	}`,
	'KOL-INPUT-RADIO': `label {
		cursor: pointer;
		display: grid;
		font-size: 14px;
		line-height: 20px;
		gap: 8px;
		width: 100%;
	}
	input {
		cursor: pointer;
		width: 100%;
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		border-radius: 5px; /* padding: 10px 14px; */
		line-height: 24px;
		font-size: 16px;
	}
	input:hover {
		border-color: var(--kolibri-color-primary);
	}
	kol-alert {
		display: block;
		width: 100%;
		margin-bottom: 0.4em;
	}
	.required label > span::after {
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
		margin-top: 0.125em;
		margin-bottom: 0.125em;
		align-items: center;
		position: relative;
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
	} /* fieldset div input[type="radio"]:before {content: "";cursor: pointer;left: calc(1.5 * var(--spacing) - 2px);top: calc(1.5 * var(--spacing) - 2px);position: relative;border-radius: 100%;display: block;height: calc(3 * var(--spacing));width: calc(3 * var(--spacing));}*/
	fieldset div input[type="radio"]:checked:before {
		box-shadow: 0 0 0.1rem black;
		background-color: var(--kolibri-color-primary);
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
	'KOL-BADGE': `:host {
		display: inline-block;
	}
	:host > span {
		border-radius: var(--kolibri-border-radius);
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
		border-top-right-radius: var(--kolibri-border-radius);
		border-bottom-right-radius: var(--kolibri-border-radius);
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
	'KOL-LINK': `a,
	button {
		color: var(--kolibri-color-primary);
		text-decoration-line: underline;
	}
	a:hover,
	button:hover {
		text-decoration-thickness: 0.2em;
	}
	kol-span-wc > span {
		align-items: baseline;
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
		stroke: #efefef;
	}
	svg line:last-child,
	svg circle:last-child {
		stroke: var(--kolibri-color-normal);
		fill: transparent;
	}`,
	'KOL-SELECT': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-COLOR': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-ACCORDION': `:host > div {
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
	:host > div > kol-heading-wc button kol-icon {
		width: 1.5em;
	}
	:host > div div[part="header"],
	:host > div[part*="open"] div[part="content"] {
		margin: 0;
		padding-left: 2.5em;
	}
	:host > div > kol-heading-wc button kol-icon::part(icon) {
		color: var(--color-midnight);
	}
	button {
		cursor: pointer;
		font-weight: inherit;
		font-size: inherit;
		line-height: inherit;
	}`,
	'KOL-CARD': `:host > div {
		border-color: var(--kolibri-border-color);
		border-style: solid;
		border-width: 2px;
		border-radius: 0.25rem;
		display: grid;
		width: 100%;
		height: 100%;
		background-color: white;
		grid-template-rows: min-content 2fr min-content;
	}
	:host kol-heading-wc {
		display: inline-flex;
		font-style: normal;
		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	:host div.footer,
	:host div.header {
		padding: 0.5rem;
	}
	:host div.content {
		padding: 0;
	}
	:host div.content,
	:host div.content + div.footer {
		border-top: 1px solid var(--kolibri-border-color);
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
		box-sizing: border-box;
		line-height: 1.25em;
		font-size: inherit;
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
	:host .selected button {
		background-color: var(--kolibri-color-primary);
		border-color: var(--kolibri-color-primary);
		color: white;
		cursor: not-allowed;
		font-weight: 700;
		text-decoration: underline;
	}`,
	'KOL-TABS': `:host {
		font-family: var(--font-family);
	}
	:host > div {
		display: block;
		width: 100%;
	}
	:host kol-button-group-wc {
		border-radius: 0.25rem 0.25rem 0 0;
		background-color: var(--kolibri-color-normal);
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
	kol-button-wc button.selected,
	kol-button-wc[aria-selected="true"] button {
		background-color: white;
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
	'KOL-TOAST': `:host > div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 0;
		z-index: 200;
	}
	:host > div > kol-alert {
		background-color: white;
		border-radius: var(--kolibri-border-radius);
		display: block;
		margin: 1rem auto;
		max-width: 750px;
	}
	:host > div > kol-button-wc {
		top: 0;
		position: relative;
		display: block;
		margin: auto;
		width: 1em;
	}`,
	'KOL-NAV': `:host > div {
		gap: var(--spacing);
	}
	a {
		text-decoration: none;
	}
	.list {
		background-color: var(--kolibri-color-normal);
		border-radius: var(--kolibri-border-radius);
		color: white;
	}
	.list.vertical > li:not(:first-child) {
		border-top: 0.1em dotted white;
	}
	.list.horizontal > li:not(:first-child) {
		border-left: 0.1em dotted white;
	}
	.vertical li.has-children.selected {
		border-right: 0.375em solid var(--kolibri-color-accent);
	}
	.entry {
		border-radius: var(--kolibri-border-radius);
	}
	.entry:focus,
	.entry:hover {
		background-color: var(--kolibri-color-focus);
	}
	.entry.selected {
		background-color: hsla(0, 0%, 100%, 0.2);
	}
	.expand-button-container {
		margin-right: 3px;
	}
	.expand-button {
		color: inherit;
	}
	.has-link .expand-button {
		background-color: hsla(0, 0%, 100%, 0.2);
	}
	.has-link .expand-button:hover {
		background-color: hsla(0, 0%, 100%, 0.4);
	}
	.entry kol-span-wc {
		color: white;
		height: 3em;
		line-height: 1.25em;
		padding: 0.5em;
	}
	.entry .expand-button kol-span-wc {
		justify-items: center;
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
	:host > div:last-child {
		border-radius: var(--kolibri-border-radius);
		border-style: solid;
		border-width: 1px;
		border-color: var(--kolibri-border-color);
	}
	:host table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}
	:host table,
	:host tr,
	:host th,
	:host td {
		border: 0 solid var(--kolibri-border-color);
	}
	:host tr {
		border-top-width: 1px;
	}
	:host tr:nth-child(even) {
		background-color: #f2f2f2;
	}
	:host th,
	:host td {
		border-right-width: 1px;
		padding: 0.25em 0.5em;
	}
	:host th {
		background-color: #eee;
	}
	:host th > div {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.25em;
	}
	:host > div.pagination {
		padding: 0.5em;
	}
	:host > div.pagination,
	:host > div.pagination > div:last-child {
		display: grid;
		align-items: center;
		justify-items: center;
		gap: 0.5em;
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
	}`,
	'KOL-LINK-BUTTON': `a,
	button {
		border-radius: var(--kolibri-border-radius);
		overflow: hidden;
	}
	a > kol-span-wc,
	button > kol-span-wc {
		border-radius: var(--kolibri-border-radius);
		border-style: solid;
		border-width: 2px;
		min-height: 44px;
		min-width: 44px;
		box-shadow: 0 0 0.25em gray;
		font-family: var(--kolibri-font-family);
		font-size: inherit;
		line-height: 1.25em;
		padding: calc(2 * var(--kolibri-spacing));
	}
	a > kol-span-wc,
	button > kol-span-wc {
		gap: 0.25em;
	}
	kol-link-wc.primary > a > kol-span-wc,
	kol-link-wc.primary > a:disabled:hover > kol-span-wc,
	button.primary > kol-span-wc,
	button.primary:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-primary);
		border-color: var(--kolibri-color-primary);
		color: white;
	}
	kol-link-wc.primary > a:hover > kol-span-wc,
	kol-link-wc.primary > a:focus > kol-span-wc,
	button.primary:hover > kol-span-wc,
	button.primary:focus > kol-span-wc {
		color: var(--kolibri-color-primary);
	}
	kol-link-wc.secondary > a > kol-span-wc,
	kol-link-wc.secondary > a:disabled:hover > kol-span-wc,
	button.secondary > kol-span-wc,
	button.secondary:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-secondary);
		border-color: var(--kolibri-color-secondary);
		color: white;
	}
	kol-link-wc.secondary > a:hover > kol-span-wc,
	kol-link-wc.secondary > a:focus > kol-span-wc,
	button.secondary:hover > kol-span-wc,
	button.secondary:focus > kol-span-wc {
		color: var(--kolibri-color-secondary);
	}
	kol-link-wc.normal > a > kol-span-wc,
	kol-link-wc.normal > a:disabled:hover > kol-span-wc,
	button.normal > kol-span-wc,
	button.normal:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-normal);
		border-color: var(--kolibri-color-normal);
		color: white;
	}
	kol-link-wc.normal > a:hover > kol-span-wc,
	kol-link-wc.normal > a:focus > kol-span-wc,
	button.normal:hover > kol-span-wc,
	button.normal:focus > kol-span-wc {
		color: var(--kolibri-color-normal);
	}
	kol-link-wc.danger > a > kol-span-wc,
	kol-link-wc.danger > a:disabled:hover > kol-span-wc,
	button.danger > kol-span-wc,
	button.danger:disabled:hover > kol-span-wc {
		background-color: var(--kolibri-color-danger);
		border-color: var(--kolibri-color-danger);
		color: white;
	}
	kol-link-wc.danger > a:hover > kol-span-wc,
	kol-link-wc.danger > a:focus > kol-span-wc,
	button.danger:hover > kol-span-wc,
	button.danger:focus > kol-span-wc {
		color: var(--kolibri-color-danger);
	}
	kol-link-wc.ghost > a > kol-span-wc,
	kol-link-wc.ghost > a:disabled:hover > kol-span-wc,
	button.ghost > kol-span-wc,
	button.ghost:disabled:hover > kol-span-wc {
		background-color: white;
		border-color: var(--kolibri-color-ghost);
		color: var(--kolibri-color-ghost);
	}
	kol-link-wc.ghost > a:hover > kol-span-wc,
	kol-link-wc.ghost > a:focus > kol-span-wc,
	button.ghost:hover > kol-span-wc,
	button.ghost:focus > kol-span-wc {
		background-color: var(--kolibri-color-ghost);
		color: white;
	}
	kol-link-wc > a:hover > kol-span-wc,
	kol-link-wc > a:focus > kol-span-wc,
	button:hover > kol-span-wc,
	button:focus > kol-span-wc {
		background-color: white;
		box-shadow: 0 0 0.25em black;
	}`,
	'KOL-BUTTON-LINK': `a,
	button {
		color: var(--kolibri-color-primary);
		text-decoration-line: underline;
	}
	a:hover,
	button:hover {
		text-decoration-thickness: 0.2em;
	}
	kol-span-wc > span {
		align-items: baseline;
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
	'KOL-INDENTED-TEXT': `:host > div {
		border-left: none;
		box-shadow: -4px 0px 0px var(--kolibri-color-primary);
		padding: 0.25em 0.5em;
		width: 100%;
	}`,
	'KOL-ICON': `/*!
	* @package IcoFont
	* @version 1.0.1
	* @author IcoFont https://icofont.com
	* @copyright Copyright (c) 2015 - 2018 IcoFont
	* @license - https://icofont.com/license/
	*/

	@font-face
	{

		font-family: "IcoFont";
	font-weight: normal;
	font-style: "Regular";
	src: url("./fonts/icofont.woff2") format("woff2"),
	url("./fonts/icofont.woff") format("woff");
	}

	[class^="icofont-"], [class*=" icofont-"]
	{
		font-family: 'IcoFont' !important;
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		line-height: 1;
	/* Better Font Rendering =========== */
		-webkit-font-feature-settings: "liga";
		-webkit-font-smoothing: antialiased;
	}
	.icofont-angry-monster:before
	{
		content: "\\e800";
	}
	.icofont-bathtub:before
	{
		content: "\\e801";
	}
	.icofont-bird-wings:before
	{
		// content: "\\e802";
	}
	.icofont-bow:before
	{
		content: "\\e803";
	}
	.icofont-castle:before
	{
		content: "\\e804";
	}
	.icofont-circuit:before
	{
		content: "\\e805";
	}
	.icofont-crown-king:before
	{
		content: "\\e806";
	}
	.icofont-crown-queen:before
	{
		content: "\\e807";
	}
	.icofont-dart:before
	{
		content: "\\e808";
	}
	.icofont-disability-race:before
	{
		content: "\\e809";
	}
	.icofont-diving-goggle:before
	{
		content: "\\e80a";
	}
	.icofont-eye-open:before
	{
		content: "\\e80b";
	}
	.icofont-flora-flower:before
	{
		content: "\\e80c";
	}
	.icofont-flora:before
	{
		content: "\\e80d";
	}
	.icofont-gift-box:before
	{
		content: "\\e80e";
	}
	.icofont-halloween-pumpkin:before
	{
		content: "\\e80f";
	}
	.icofont-hand-power:before
	{
		content: "\\e810";
	}
	.icofont-hand-thunder:before
	{
		content: "\\e811";
	}
	.icofont-king-monster:before
	{
		content: "\\e812";
	}
	.icofont-love:before
	{
		content: "\\e813";
	}
	.icofont-magician-hat:before
	{
		content: "\\e814";
	}
	.icofont-native-american:before
	{
		content: "\\e815";
	}
	.icofont-owl-look:before
	{
		content: "\\e816";
	}
	.icofont-phoenix:before
	{
		content: "\\e817";
	}
	.icofont-robot-face:before
	{
		content: "\\e818";
	}
	.icofont-sand-clock:before
	{
		content: "\\e819";
	}
	.icofont-shield-alt:before
	{
		content: "\\e81a";
	}
	.icofont-ship-wheel:before
	{
		content: "\\e81b";
	}
	.icofont-skull-danger:before
	{
		content: "\\e81c";
	}
	.icofont-skull-face:before
	{
		content: "\\e81d";
	}
	.icofont-snowmobile:before
	{
		content: "\\e81e";
	}
	.icofont-space-shuttle:before
	{
		content: "\\e81f";
	}
	.icofont-star-shape:before
	{
		content: "\\e820";
	}
	.icofont-swirl:before
	{
		content: "\\e821";
	}
	.icofont-tattoo-wing:before
	{
		content: "\\e822";
	}
	.icofont-throne:before
	{
		content: "\\e823";
	}
	.icofont-tree-alt:before
	{
		content: "\\e824";
	}
	.icofont-triangle:before
	{
		content: "\\e825";
	}
	.icofont-unity-hand:before
	{
		content: "\\e826";
	}
	.icofont-weed:before
	{
		content: "\\e827";
	}
	.icofont-woman-bird:before
	{
		content: "\\e828";
	}
	.icofont-bat:before
	{
		content: "\\e829";
	}
	.icofont-bear-face:before
	{
		content: "\\e82a";
	}
	.icofont-bear-tracks:before
	{
		content: "\\e82b";
	}
	.icofont-bear:before
	{
		content: "\\e82c";
	}
	.icofont-bird-alt:before
	{
		content: "\\e82d";
	}
	.icofont-bird-flying:before
	{
		content: "\\e82e";
	}
	.icofont-bird:before
	{
		content: "\\e82f";
	}
	.icofont-birds:before
	{
		content: "\\e830";
	}
	.icofont-bone:before
	{
		content: "\\e831";
	}
	.icofont-bull:before
	{
		content: "\\e832";
	}
	.icofont-butterfly-alt:before
	{
		content: "\\e833";
	}
	.icofont-butterfly:before
	{
		content: "\\e834";
	}
	.icofont-camel-alt:before
	{
		content: "\\e835";
	}
	.icofont-camel-head:before
	{
		content: "\\e836";
	}
	.icofont-camel:before
	{
		content: "\\e837";
	}
	.icofont-cat-alt-1:before
	{
		content: "\\e838";
	}
	.icofont-cat-alt-2:before
	{
		content: "\\e839";
	}
	.icofont-cat-alt-3:before
	{
		content: "\\e83a";
	}
	.icofont-cat-dog:before
	{
		content: "\\e83b";
	}
	.icofont-cat-face:before
	{
		content: "\\e83c";
	}
	.icofont-cat:before
	{
		content: "\\e83d";
	}
	.icofont-cow-head:before
	{
		content: "\\e83e";
	}
	.icofont-cow:before
	{
		content: "\\e83f";
	}
	.icofont-crab:before
	{
		content: "\\e840";
	}
	.icofont-crocodile:before
	{
		content: "\\e841";
	}
	.icofont-deer-head:before
	{
		content: "\\e842";
	}
	.icofont-dog-alt:before
	{
		content: "\\e843";
	}
	.icofont-dog-barking:before
	{
		content: "\\e844";
	}
	.icofont-dog:before
	{
		content: "\\e845";
	}
	.icofont-dolphin:before
	{
		content: "\\e846";
	}
	.icofont-duck-tracks:before
	{
		content: "\\e847";
	}
	.icofont-eagle-head:before
	{
		content: "\\e848";
	}
	.icofont-eaten-fish:before
	{
		content: "\\e849";
	}
	.icofont-elephant-alt:before
	{
		content: "\\e84a";
	}
	.icofont-elephant-head-alt:before
	{
		content: "\\e84b";
	}
	.icofont-elephant-head:before
	{
		content: "\\e84c";
	}
	.icofont-elephant:before
	{
		content: "\\e84d";
	}
	.icofont-elk:before
	{
		content: "\\e84e";
	}
	.icofont-fish-1:before
	{
		content: "\\e84f";
	}
	.icofont-fish-2:before
	{
		content: "\\e850";
	}
	.icofont-fish-3:before
	{
		content: "\\e851";
	}
	.icofont-fish-4:before
	{
		content: "\\e852";
	}
	.icofont-fish-5:before
	{
		content: "\\e853";
	}
	.icofont-fish:before
	{
		content: "\\e854";
	}
	.icofont-fox-alt:before
	{
		content: "\\e855";
	}
	.icofont-fox:before
	{
		content: "\\e856";
	}
	.icofont-frog-tracks:before
	{
		content: "\\e857";
	}
	.icofont-frog:before
	{
		content: "\\e858";
	}
	.icofont-froggy:before
	{
		content: "\\e859";
	}
	.icofont-giraffe-head-1:before
	{
		content: "\\e85a";
	}
	.icofont-giraffe-head-2:before
	{
		content: "\\e85b";
	}
	.icofont-giraffe-head:before
	{
		content: "\\e85c";
	}
	.icofont-giraffe:before
	{
		content: "\\e85d";
	}
	.icofont-goat-head:before
	{
		content: "\\e85e";
	}
	.icofont-gorilla:before
	{
		content: "\\e85f";
	}
	.icofont-hen-tracks:before
	{
		content: "\\e860";
	}
	.icofont-horse-head-1:before
	{
		content: "\\e861";
	}
	.icofont-horse-head-2:before
	{
		content: "\\e862";
	}
	.icofont-horse-head:before
	{
		content: "\\e863";
	}
	.icofont-horse-tracks:before
	{
		content: "\\e864";
	}
	.icofont-jellyfish:before
	{
		content: "\\e865";
	}
	.icofont-kangaroo:before
	{
		content: "\\e866";
	}
	.icofont-lemur:before
	{
		content: "\\e867";
	}
	.icofont-lion-head-1:before
	{
		content: "\\e868";
	}
	.icofont-lion-head-2:before
	{
		content: "\\e869";
	}
	.icofont-lion-head:before
	{
		content: "\\e86a";
	}
	.icofont-lion:before
	{
		content: "\\e86b";
	}
	.icofont-monkey-2:before
	{
		content: "\\e86c";
	}
	.icofont-monkey-3:before
	{
		content: "\\e86d";
	}
	.icofont-monkey-face:before
	{
		content: "\\e86e";
	}
	.icofont-monkey:before
	{
		content: "\\e86f";
	}
	.icofont-octopus-alt:before
	{
		content: "\\e870";
	}
	.icofont-octopus:before
	{
		content: "\\e871";
	}
	.icofont-owl:before
	{
		content: "\\e872";
	}
	.icofont-panda-face:before
	{
		content: "\\e873";
	}
	.icofont-panda:before
	{
		content: "\\e874";
	}
	.icofont-panther:before
	{
		content: "\\e875";
	}
	.icofont-parrot-lip:before
	{
		content: "\\e876";
	}
	.icofont-parrot:before
	{
		content: "\\e877";
	}
	.icofont-paw:before
	{
		content: "\\e878";
	}
	.icofont-pelican:before
	{
		content: "\\e879";
	}
	.icofont-penguin:before
	{
		content: "\\e87a";
	}
	.icofont-pig-face:before
	{
		content: "\\e87b";
	}
	.icofont-pig:before
	{
		content: "\\e87c";
	}
	.icofont-pigeon-1:before
	{
		content: "\\e87d";
	}
	.icofont-pigeon-2:before
	{
		content: "\\e87e";
	}
	.icofont-pigeon:before
	{
		content: "\\e87f";
	}
	.icofont-rabbit:before
	{
		content: "\\e880";
	}
	.icofont-rat:before
	{
		content: "\\e881";
	}
	.icofont-rhino-head:before
	{
		content: "\\e882";
	}
	.icofont-rhino:before
	{
		content: "\\e883";
	}
	.icofont-rooster:before
	{
		content: "\\e884";
	}
	.icofont-seahorse:before
	{
		content: "\\e885";
	}
	.icofont-seal:before
	{
		content: "\\e886";
	}
	.icofont-shrimp-alt:before
	{
		content: "\\e887";
	}
	.icofont-shrimp:before
	{
		content: "\\e888";
	}
	.icofont-snail-1:before
	{
		content: "\\e889";
	}
	.icofont-snail-2:before
	{
		content: "\\e88a";
	}
	.icofont-snail-3:before
	{
		content: "\\e88b";
	}
	.icofont-snail:before
	{
		content: "\\e88c";
	}
	.icofont-snake:before
	{
		content: "\\e88d";
	}
	.icofont-squid:before
	{
		content: "\\e88e";
	}
	.icofont-squirrel:before
	{
		content: "\\e88f";
	}
	.icofont-tiger-face:before
	{
		content: "\\e890";
	}
	.icofont-tiger:before
	{
		content: "\\e891";
	}
	.icofont-turtle:before
	{
		content: "\\e892";
	}
	.icofont-whale:before
	{
		content: "\\e893";
	}
	.icofont-woodpecker:before
	{
		content: "\\e894";
	}
	.icofont-zebra:before
	{
		content: "\\e895";
	}
	.icofont-brand-acer:before
	{
		content: "\\e896";
	}
	.icofont-brand-adidas:before
	{
		content: "\\e897";
	}
	.icofont-brand-adobe:before
	{
		content: "\\e898";
	}
	.icofont-brand-air-new-zealand:before
	{
		content: "\\e899";
	}
	.icofont-brand-airbnb:before
	{
		content: "\\e89a";
	}
	.icofont-brand-aircell:before
	{
		content: "\\e89b";
	}
	.icofont-brand-airtel:before
	{
		content: "\\e89c";
	}
	.icofont-brand-alcatel:before
	{
		content: "\\e89d";
	}
	.icofont-brand-alibaba:before
	{
		content: "\\e89e";
	}
	.icofont-brand-aliexpress:before
	{
		content: "\\e89f";
	}
	.icofont-brand-alipay:before
	{
		content: "\\e8a0";
	}
	.icofont-brand-amazon:before
	{
		content: "\\e8a1";
	}
	.icofont-brand-amd:before
	{
		content: "\\e8a2";
	}
	.icofont-brand-american-airlines:before
	{
		content: "\\e8a3";
	}
	.icofont-brand-android-robot:before
	{
		content: "\\e8a4";
	}
	.icofont-brand-android:before
	{
		content: "\\e8a5";
	}
	.icofont-brand-aol:before
	{
		content: "\\e8a6";
	}
	.icofont-brand-apple:before
	{
		content: "\\e8a7";
	}
	.icofont-brand-appstore:before
	{
		content: "\\e8a8";
	}
	.icofont-brand-asus:before
	{
		content: "\\e8a9";
	}
	.icofont-brand-ati:before
	{
		content: "\\e8aa";
	}
	.icofont-brand-att:before
	{
		content: "\\e8ab";
	}
	.icofont-brand-audi:before
	{
		content: "\\e8ac";
	}
	.icofont-brand-axiata:before
	{
		content: "\\e8ad";
	}
	.icofont-brand-bada:before
	{
		content: "\\e8ae";
	}
	.icofont-brand-bbc:before
	{
		content: "\\e8af";
	}
	.icofont-brand-bing:before
	{
		content: "\\e8b0";
	}
	.icofont-brand-blackberry:before
	{
		content: "\\e8b1";
	}
	.icofont-brand-bmw:before
	{
		content: "\\e8b2";
	}
	.icofont-brand-box:before
	{
		content: "\\e8b3";
	}
	.icofont-brand-burger-king:before
	{
		content: "\\e8b4";
	}
	.icofont-brand-business-insider:before
	{
		content: "\\e8b5";
	}
	.icofont-brand-buzzfeed:before
	{
		content: "\\e8b6";
	}
	.icofont-brand-cannon:before
	{
		content: "\\e8b7";
	}
	.icofont-brand-casio:before
	{
		content: "\\e8b8";
	}
	.icofont-brand-china-mobile:before
	{
		content: "\\e8b9";
	}
	.icofont-brand-china-telecom:before
	{
		content: "\\e8ba";
	}
	.icofont-brand-china-unicom:before
	{
		content: "\\e8bb";
	}
	.icofont-brand-cisco:before
	{
		content: "\\e8bc";
	}
	.icofont-brand-citibank:before
	{
		content: "\\e8bd";
	}
	.icofont-brand-cnet:before
	{
		content: "\\e8be";
	}
	.icofont-brand-cnn:before
	{
		content: "\\e8bf";
	}
	.icofont-brand-cocal-cola:before
	{
		content: "\\e8c0";
	}
	.icofont-brand-compaq:before
	{
		content: "\\e8c1";
	}
	.icofont-brand-debian:before
	{
		content: "\\e8c2";
	}
	.icofont-brand-delicious:before
	{
		content: "\\e8c3";
	}
	.icofont-brand-dell:before
	{
		content: "\\e8c4";
	}
	.icofont-brand-designbump:before
	{
		content: "\\e8c5";
	}
	.icofont-brand-designfloat:before
	{
		content: "\\e8c6";
	}
	.icofont-brand-disney:before
	{
		content: "\\e8c7";
	}
	.icofont-brand-dodge:before
	{
		content: "\\e8c8";
	}
	.icofont-brand-dove:before
	{
		content: "\\e8c9";
	}
	.icofont-brand-drupal:before
	{
		content: "\\e8ca";
	}
	.icofont-brand-ebay:before
	{
		content: "\\e8cb";
	}
	.icofont-brand-eleven:before
	{
		content: "\\e8cc";
	}
	.icofont-brand-emirates:before
	{
		content: "\\e8cd";
	}
	.icofont-brand-espn:before
	{
		content: "\\e8ce";
	}
	.icofont-brand-etihad-airways:before
	{
		content: "\\e8cf";
	}
	.icofont-brand-etisalat:before
	{
		content: "\\e8d0";
	}
	.icofont-brand-etsy:before
	{
		content: "\\e8d1";
	}
	.icofont-brand-fastrack:before
	{
		content: "\\e8d2";
	}
	.icofont-brand-fedex:before
	{
		content: "\\e8d3";
	}
	.icofont-brand-ferrari:before
	{
		content: "\\e8d4";
	}
	.icofont-brand-fitbit:before
	{
		content: "\\e8d5";
	}
	.icofont-brand-flikr:before
	{
		content: "\\e8d6";
	}
	.icofont-brand-forbes:before
	{
		content: "\\e8d7";
	}
	.icofont-brand-foursquare:before
	{
		content: "\\e8d8";
	}
	.icofont-brand-foxconn:before
	{
		content: "\\e8d9";
	}
	.icofont-brand-fujitsu:before
	{
		content: "\\e8da";
	}
	.icofont-brand-general-electric:before
	{
		content: "\\e8db";
	}
	.icofont-brand-gillette:before
	{
		content: "\\e8dc";
	}
	.icofont-brand-gizmodo:before
	{
		content: "\\e8dd";
	}
	.icofont-brand-gnome:before
	{
		content: "\\e8de";
	}
	.icofont-brand-google:before
	{
		content: "\\e8df";
	}
	.icofont-brand-gopro:before
	{
		content: "\\e8e0";
	}
	.icofont-brand-gucci:before
	{
		content: "\\e8e1";
	}
	.icofont-brand-hallmark:before
	{
		content: "\\e8e2";
	}
	.icofont-brand-hi5:before
	{
		content: "\\e8e3";
	}
	.icofont-brand-honda:before
	{
		content: "\\e8e4";
	}
	.icofont-brand-hp:before
	{
		content: "\\e8e5";
	}
	.icofont-brand-hsbc:before
	{
		content: "\\e8e6";
	}
	.icofont-brand-htc:before
	{
		content: "\\e8e7";
	}
	.icofont-brand-huawei:before
	{
		content: "\\e8e8";
	}
	.icofont-brand-hulu:before
	{
		content: "\\e8e9";
	}
	.icofont-brand-hyundai:before
	{
		content: "\\e8ea";
	}
	.icofont-brand-ibm:before
	{
		content: "\\e8eb";
	}
	.icofont-brand-icofont:before
	{
		content: "\\e8ec";
	}
	.icofont-brand-icq:before
	{
		content: "\\e8ed";
	}
	.icofont-brand-ikea:before
	{
		content: "\\e8ee";
	}
	.icofont-brand-imdb:before
	{
		content: "\\e8ef";
	}
	.icofont-brand-indiegogo:before
	{
		content: "\\e8f0";
	}
	.icofont-brand-intel:before
	{
		content: "\\e8f1";
	}
	.icofont-brand-ipair:before
	{
		content: "\\e8f2";
	}
	.icofont-brand-jaguar:before
	{
		content: "\\e8f3";
	}
	.icofont-brand-java:before
	{
		content: "\\e8f4";
	}
	.icofont-brand-joomla:before
	{
		content: "\\e8f5";
	}
	.icofont-brand-kickstarter:before
	{
		content: "\\e8f6";
	}
	.icofont-brand-kik:before
	{
		content: "\\e8f7";
	}
	.icofont-brand-lastfm:before
	{
		content: "\\e8f8";
	}
	.icofont-brand-lego:before
	{
		content: "\\e8f9";
	}
	.icofont-brand-lenovo:before
	{
		content: "\\e8fa";
	}
	.icofont-brand-levis:before
	{
		content: "\\e8fb";
	}
	.icofont-brand-lexus:before
	{
		content: "\\e8fc";
	}
	.icofont-brand-lg:before
	{
		content: "\\e8fd";
	}
	.icofont-brand-life-hacker:before
	{
		content: "\\e8fe";
	}
	.icofont-brand-linux-mint:before
	{
		content: "\\e8ff";
	}
	.icofont-brand-linux:before
	{
		content: "\\e900";
	}
	.icofont-brand-lionix:before
	{
		content: "\\e901";
	}
	.icofont-brand-loreal:before
	{
		content: "\\e902";
	}
	.icofont-brand-louis-vuitton:before
	{
		content: "\\e903";
	}
	.icofont-brand-mac-os:before
	{
		content: "\\e904";
	}
	.icofont-brand-marvel-app:before
	{
		content: "\\e905";
	}
	.icofont-brand-mashable:before
	{
		content: "\\e906";
	}
	.icofont-brand-mazda:before
	{
		content: "\\e907";
	}
	.icofont-brand-mcdonals:before
	{
		content: "\\e908";
	}
	.icofont-brand-mercedes:before
	{
		content: "\\e909";
	}
	.icofont-brand-micromax:before
	{
		content: "\\e90a";
	}
	.icofont-brand-microsoft:before
	{
		content: "\\e90b";
	}
	.icofont-brand-mobileme:before
	{
		content: "\\e90c";
	}
	.icofont-brand-mobily:before
	{
		content: "\\e90d";
	}
	.icofont-brand-motorola:before
	{
		content: "\\e90e";
	}
	.icofont-brand-msi:before
	{
		content: "\\e90f";
	}
	.icofont-brand-mts:before
	{
		content: "\\e910";
	}
	.icofont-brand-myspace:before
	{
		content: "\\e911";
	}
	.icofont-brand-mytv:before
	{
		content: "\\e912";
	}
	.icofont-brand-nasa:before
	{
		content: "\\e913";
	}
	.icofont-brand-natgeo:before
	{
		content: "\\e914";
	}
	.icofont-brand-nbc:before
	{
		content: "\\e915";
	}
	.icofont-brand-nescafe:before
	{
		content: "\\e916";
	}
	.icofont-brand-nestle:before
	{
		content: "\\e917";
	}
	.icofont-brand-netflix:before
	{
		content: "\\e918";
	}
	.icofont-brand-nexus:before
	{
		content: "\\e919";
	}
	.icofont-brand-nike:before
	{
		content: "\\e91a";
	}
	.icofont-brand-nokia:before
	{
		content: "\\e91b";
	}
	.icofont-brand-nvidia:before
	{
		content: "\\e91c";
	}
	.icofont-brand-omega:before
	{
		content: "\\e91d";
	}
	.icofont-brand-opensuse:before
	{
		content: "\\e91e";
	}
	.icofont-brand-oracle:before
	{
		content: "\\e91f";
	}
	.icofont-brand-panasonic:before
	{
		content: "\\e920";
	}
	.icofont-brand-paypal:before
	{
		content: "\\e921";
	}
	.icofont-brand-pepsi:before
	{
		content: "\\e922";
	}
	.icofont-brand-philips:before
	{
		content: "\\e923";
	}
	.icofont-brand-pizza-hut:before
	{
		content: "\\e924";
	}
	.icofont-brand-playstation:before
	{
		content: "\\e925";
	}
	.icofont-brand-puma:before
	{
		content: "\\e926";
	}
	.icofont-brand-qatar-air:before
	{
		content: "\\e927";
	}
	.icofont-brand-qvc:before
	{
		content: "\\e928";
	}
	.icofont-brand-readernaut:before
	{
		content: "\\e929";
	}
	.icofont-brand-redbull:before
	{
		content: "\\e92a";
	}
	.icofont-brand-reebok:before
	{
		content: "\\e92b";
	}
	.icofont-brand-reuters:before
	{
		content: "\\e92c";
	}
	.icofont-brand-samsung:before
	{
		content: "\\e92d";
	}
	.icofont-brand-sap:before
	{
		content: "\\e92e";
	}
	.icofont-brand-saudia-airlines:before
	{
		content: "\\e92f";
	}
	.icofont-brand-scribd:before
	{
		content: "\\e930";
	}
	.icofont-brand-shell:before
	{
		content: "\\e931";
	}
	.icofont-brand-siemens:before
	{
		content: "\\e932";
	}
	.icofont-brand-sk-telecom:before
	{
		content: "\\e933";
	}
	.icofont-brand-slideshare:before
	{
		content: "\\e934";
	}
	.icofont-brand-smashing-magazine:before
	{
		content: "\\e935";
	}
	.icofont-brand-snapchat:before
	{
		content: "\\e936";
	}
	.icofont-brand-sony-ericsson:before
	{
		content: "\\e937";
	}
	.icofont-brand-sony:before
	{
		content: "\\e938";
	}
	.icofont-brand-soundcloud:before
	{
		content: "\\e939";
	}
	.icofont-brand-sprint:before
	{
		content: "\\e93a";
	}
	.icofont-brand-squidoo:before
	{
		content: "\\e93b";
	}
	.icofont-brand-starbucks:before
	{
		content: "\\e93c";
	}
	.icofont-brand-stc:before
	{
		content: "\\e93d";
	}
	.icofont-brand-steam:before
	{
		content: "\\e93e";
	}
	.icofont-brand-suzuki:before
	{
		content: "\\e93f";
	}
	.icofont-brand-symbian:before
	{
		content: "\\e940";
	}
	.icofont-brand-t-mobile:before
	{
		content: "\\e941";
	}
	.icofont-brand-tango:before
	{
		content: "\\e942";
	}
	.icofont-brand-target:before
	{
		content: "\\e943";
	}
	.icofont-brand-tata-indicom:before
	{
		content: "\\e944";
	}
	.icofont-brand-techcrunch:before
	{
		content: "\\e945";
	}
	.icofont-brand-telenor:before
	{
		content: "\\e946";
	}
	.icofont-brand-teliasonera:before
	{
		content: "\\e947";
	}
	.icofont-brand-tesla:before
	{
		content: "\\e948";
	}
	.icofont-brand-the-verge:before
	{
		content: "\\e949";
	}
	.icofont-brand-thenextweb:before
	{
		content: "\\e94a";
	}
	.icofont-brand-toshiba:before
	{
		content: "\\e94b";
	}
	.icofont-brand-toyota:before
	{
		content: "\\e94c";
	}
	.icofont-brand-tribenet:before
	{
		content: "\\e94d";
	}
	.icofont-brand-ubuntu:before
	{
		content: "\\e94e";
	}
	.icofont-brand-unilever:before
	{
		content: "\\e94f";
	}
	.icofont-brand-vaio:before
	{
		content: "\\e950";
	}
	.icofont-brand-verizon:before
	{
		content: "\\e951";
	}
	.icofont-brand-viber:before
	{
		content: "\\e952";
	}
	.icofont-brand-vodafone:before
	{
		content: "\\e953";
	}
	.icofont-brand-volkswagen:before
	{
		content: "\\e954";
	}
	.icofont-brand-walmart:before
	{
		content: "\\e955";
	}
	.icofont-brand-warnerbros:before
	{
		content: "\\e956";
	}
	.icofont-brand-whatsapp:before
	{
		content: "\\e957";
	}
	.icofont-brand-wikipedia:before
	{
		content: "\\e958";
	}
	.icofont-brand-windows:before
	{
		content: "\\e959";
	}
	.icofont-brand-wire:before
	{
		content: "\\e95a";
	}
	.icofont-brand-wordpress:before
	{
		content: "\\e95b";
	}
	.icofont-brand-xiaomi:before
	{
		content: "\\e95c";
	}
	.icofont-brand-yahoobuzz:before
	{
		content: "\\e95d";
	}
	.icofont-brand-yamaha:before
	{
		content: "\\e95e";
	}
	.icofont-brand-youtube:before
	{
		content: "\\e95f";
	}
	.icofont-brand-zain:before
	{
		content: "\\e960";
	}
	.icofont-bank-alt:before
	{
		content: "\\e961";
	}
	.icofont-bank:before
	{
		content: "\\e962";
	}
	.icofont-barcode:before
	{
		content: "\\e963";
	}
	.icofont-bill-alt:before
	{
		content: "\\e964";
	}
	.icofont-billboard:before
	{
		content: "\\e965";
	}
	.icofont-briefcase-1:before
	{
		content: "\\e966";
	}
	.icofont-briefcase-2:before
	{
		content: "\\e967";
	}
	.icofont-businessman:before
	{
		content: "\\e968";
	}
	.icofont-businesswoman:before
	{
		content: "\\e969";
	}
	.icofont-chair:before
	{
		content: "\\e96a";
	}
	.icofont-coins:before
	{
		content: "\\e96b";
	}
	.icofont-company:before
	{
		content: "\\e96c";
	}
	.icofont-contact-add:before
	{
		content: "\\e96d";
	}
	.icofont-files-stack:before
	{
		content: "\\e96e";
	}
	.icofont-handshake-deal:before
	{
		content: "\\e96f";
	}
	.icofont-id-card:before
	{
		content: "\\e970";
	}
	.icofont-meeting-add:before
	{
		content: "\\e971";
	}
	.icofont-money-bag:before
	{
		content: "\\e972";
	}
	.icofont-pie-chart:before
	{
		content: "\\e973";
	}
	.icofont-presentation-alt:before
	{
		content: "\\e974";
	}
	.icofont-presentation:before
	{
		content: "\\e975";
	}
	.icofont-stamp:before
	{
		content: "\\e976";
	}
	.icofont-stock-mobile:before
	{
		content: "\\e977";
	}
	.icofont-chart-arrows-axis:before
	{
		content: "\\e978";
	}
	.icofont-chart-bar-graph:before
	{
		content: "\\e979";
	}
	.icofont-chart-flow-1:before
	{
		content: "\\e97a";
	}
	.icofont-chart-flow-2:before
	{
		content: "\\e97b";
	}
	.icofont-chart-flow:before
	{
		content: "\\e97c";
	}
	.icofont-chart-growth:before
	{
		content: "\\e97d";
	}
	.icofont-chart-histogram-alt:before
	{
		content: "\\e97e";
	}
	.icofont-chart-histogram:before
	{
		content: "\\e97f";
	}
	.icofont-chart-line-alt:before
	{
		content: "\\e980";
	}
	.icofont-chart-line:before
	{
		content: "\\e981";
	}
	.icofont-chart-pie-alt:before
	{
		content: "\\e982";
	}
	.icofont-chart-pie:before
	{
		content: "\\e983";
	}
	.icofont-chart-radar-graph:before
	{
		content: "\\e984";
	}
	.icofont-architecture-alt:before
	{
		content: "\\e985";
	}
	.icofont-architecture:before
	{
		content: "\\e986";
	}
	.icofont-barricade:before
	{
		content: "\\e987";
	}
	.icofont-bolt:before
	{
		content: "\\e988";
	}
	.icofont-bricks:before
	{
		content: "\\e989";
	}
	.icofont-building-alt:before
	{
		content: "\\e98a";
	}
	.icofont-bull-dozer:before
	{
		content: "\\e98b";
	}
	.icofont-calculations:before
	{
		content: "\\e98c";
	}
	.icofont-cement-mix:before
	{
		content: "\\e98d";
	}
	.icofont-cement-mixer:before
	{
		content: "\\e98e";
	}
	.icofont-concrete-mixer:before
	{
		content: "\\e98f";
	}
	.icofont-danger-zone:before
	{
		content: "\\e990";
	}
	.icofont-drill:before
	{
		content: "\\e991";
	}
	.icofont-eco-energy:before
	{
		content: "\\e992";
	}
	.icofont-eco-environmen:before
	{
		content: "\\e993";
	}
	.icofont-energy-air:before
	{
		content: "\\e994";
	}
	.icofont-energy-oil:before
	{
		content: "\\e995";
	}
	.icofont-energy-savings:before
	{
		content: "\\e996";
	}
	.icofont-energy-solar:before
	{
		content: "\\e997";
	}
	.icofont-energy-water:before
	{
		content: "\\e998";
	}
	.icofont-engineer:before
	{
		content: "\\e999";
	}
	.icofont-fire-extinguisher-alt:before
	{
		content: "\\e99a";
	}
	.icofont-fire-extinguisher:before
	{
		content: "\\e99b";
	}
	.icofont-fix-tools:before
	{
		content: "\\e99c";
	}
	.icofont-fork-lift:before
	{
		content: "\\e99d";
	}
	.icofont-glue-oil:before
	{
		content: "\\e99e";
	}
	.icofont-hammer-alt:before
	{
		content: "\\e99f";
	}
	.icofont-hammer:before
	{
		content: "\\e9a0";
	}
	.icofont-help-robot:before
	{
		content: "\\e9a1";
	}
	.icofont-industries-1:before
	{
		content: "\\e9a2";
	}
	.icofont-industries-2:before
	{
		content: "\\e9a3";
	}
	.icofont-industries-3:before
	{
		content: "\\e9a4";
	}
	.icofont-industries-4:before
	{
		content: "\\e9a5";
	}
	.icofont-industries-5:before
	{
		content: "\\e9a6";
	}
	.icofont-industries:before
	{
		content: "\\e9a7";
	}
	.icofont-labour:before
	{
		content: "\\e9a8";
	}
	.icofont-mining:before
	{
		content: "\\e9a9";
	}
	.icofont-paint-brush:before
	{
		content: "\\e9aa";
	}
	.icofont-pollution:before
	{
		content: "\\e9ab";
	}
	.icofont-power-zone:before
	{
		content: "\\e9ac";
	}
	.icofont-radio-active:before
	{
		content: "\\e9ad";
	}
	.icofont-recycle-alt:before
	{
		content: "\\e9ae";
	}
	.icofont-recycling-man:before
	{
		content: "\\e9af";
	}
	.icofont-safety-hat-light:before
	{
		content: "\\e9b0";
	}
	.icofont-safety-hat:before
	{
		content: "\\e9b1";
	}
	.icofont-saw:before
	{
		content: "\\e9b2";
	}
	.icofont-screw-driver:before
	{
		content: "\\e9b3";
	}
	.icofont-tools-1:before
	{
		content: "\\e9b4";
	}
	.icofont-tools-bag:before
	{
		content: "\\e9b5";
	}
	.icofont-tow-truck:before
	{
		content: "\\e9b6";
	}
	.icofont-trolley:before
	{
		content: "\\e9b7";
	}
	.icofont-trowel:before
	{
		content: "\\e9b8";
	}
	.icofont-under-construction-alt:before
	{
		content: "\\e9b9";
	}
	.icofont-under-construction:before
	{
		content: "\\e9ba";
	}
	.icofont-vehicle-cement:before
	{
		content: "\\e9bb";
	}
	.icofont-vehicle-crane:before
	{
		content: "\\e9bc";
	}
	.icofont-vehicle-delivery-van:before
	{
		content: "\\e9bd";
	}
	.icofont-vehicle-dozer:before
	{
		content: "\\e9be";
	}
	.icofont-vehicle-excavator:before
	{
		content: "\\e9bf";
	}
	.icofont-vehicle-trucktor:before
	{
		content: "\\e9c0";
	}
	.icofont-vehicle-wrecking:before
	{
		content: "\\e9c1";
	}
	.icofont-worker:before
	{
		content: "\\e9c2";
	}
	.icofont-workers-group:before
	{
		content: "\\e9c3";
	}
	.icofont-wrench:before
	{
		content: "\\e9c4";
	}
	.icofont-afghani-false:before
	{
		content: "\\e9c5";
	}
	.icofont-afghani-minus:before
	{
		content: "\\e9c6";
	}
	.icofont-afghani-plus:before
	{
		content: "\\e9c7";
	}
	.icofont-afghani-true:before
	{
		content: "\\e9c8";
	}
	.icofont-afghani:before
	{
		content: "\\e9c9";
	}
	.icofont-baht-false:before
	{
		content: "\\e9ca";
	}
	.icofont-baht-minus:before
	{
		content: "\\e9cb";
	}
	.icofont-baht-plus:before
	{
		content: "\\e9cc";
	}
	.icofont-baht-true:before
	{
		content: "\\e9cd";
	}
	.icofont-baht:before
	{
		content: "\\e9ce";
	}
	.icofont-bitcoin-false:before
	{
		content: "\\e9cf";
	}
	.icofont-bitcoin-minus:before
	{
		content: "\\e9d0";
	}
	.icofont-bitcoin-plus:before
	{
		content: "\\e9d1";
	}
	.icofont-bitcoin-true:before
	{
		content: "\\e9d2";
	}
	.icofont-bitcoin:before
	{
		content: "\\e9d3";
	}
	.icofont-dollar-flase:before
	{
		content: "\\e9d4";
	}
	.icofont-dollar-minus:before
	{
		content: "\\e9d5";
	}
	.icofont-dollar-plus:before
	{
		content: "\\e9d6";
	}
	.icofont-dollar-true:before
	{
		content: "\\e9d7";
	}
	.icofont-dollar:before
	{
		content: "\\e9d8";
	}
	.icofont-dong-false:before
	{
		content: "\\e9d9";
	}
	.icofont-dong-minus:before
	{
		content: "\\e9da";
	}
	.icofont-dong-plus:before
	{
		content: "\\e9db";
	}
	.icofont-dong-true:before
	{
		content: "\\e9dc";
	}
	.icofont-dong:before
	{
		content: "\\e9dd";
	}
	.icofont-euro-false:before
	{
		content: "\\e9de";
	}
	.icofont-euro-minus:before
	{
		content: "\\e9df";
	}
	.icofont-euro-plus:before
	{
		content: "\\e9e0";
	}
	.icofont-euro-true:before
	{
		content: "\\e9e1";
	}
	.icofont-euro:before
	{
		content: "\\e9e2";
	}
	.icofont-frank-false:before
	{
		content: "\\e9e3";
	}
	.icofont-frank-minus:before
	{
		content: "\\e9e4";
	}
	.icofont-frank-plus:before
	{
		content: "\\e9e5";
	}
	.icofont-frank-true:before
	{
		content: "\\e9e6";
	}
	.icofont-frank:before
	{
		content: "\\e9e7";
	}
	.icofont-hryvnia-false:before
	{
		content: "\\e9e8";
	}
	.icofont-hryvnia-minus:before
	{
		content: "\\e9e9";
	}
	.icofont-hryvnia-plus:before
	{
		content: "\\e9ea";
	}
	.icofont-hryvnia-true:before
	{
		content: "\\e9eb";
	}
	.icofont-hryvnia:before
	{
		content: "\\e9ec";
	}
	.icofont-lira-false:before
	{
		content: "\\e9ed";
	}
	.icofont-lira-minus:before
	{
		content: "\\e9ee";
	}
	.icofont-lira-plus:before
	{
		content: "\\e9ef";
	}
	.icofont-lira-true:before
	{
		content: "\\e9f0";
	}
	.icofont-lira:before
	{
		content: "\\e9f1";
	}
	.icofont-peseta-false:before
	{
		content: "\\e9f2";
	}
	.icofont-peseta-minus:before
	{
		content: "\\e9f3";
	}
	.icofont-peseta-plus:before
	{
		content: "\\e9f4";
	}
	.icofont-peseta-true:before
	{
		content: "\\e9f5";
	}
	.icofont-peseta:before
	{
		content: "\\e9f6";
	}
	.icofont-peso-false:before
	{
		content: "\\e9f7";
	}
	.icofont-peso-minus:before
	{
		content: "\\e9f8";
	}
	.icofont-peso-plus:before
	{
		content: "\\e9f9";
	}
	.icofont-peso-true:before
	{
		content: "\\e9fa";
	}
	.icofont-peso:before
	{
		content: "\\e9fb";
	}
	.icofont-pound-false:before
	{
		content: "\\e9fc";
	}
	.icofont-pound-minus:before
	{
		content: "\\e9fd";
	}
	.icofont-pound-plus:before
	{
		content: "\\e9fe";
	}
	.icofont-pound-true:before
	{
		content: "\\e9ff";
	}
	.icofont-pound:before
	{
		content: "\\ea00";
	}
	.icofont-renminbi-false:before
	{
		content: "\\ea01";
	}
	.icofont-renminbi-minus:before
	{
		content: "\\ea02";
	}
	.icofont-renminbi-plus:before
	{
		content: "\\ea03";
	}
	.icofont-renminbi-true:before
	{
		content: "\\ea04";
	}
	.icofont-renminbi:before
	{
		content: "\\ea05";
	}
	.icofont-riyal-false:before
	{
		content: "\\ea06";
	}
	.icofont-riyal-minus:before
	{
		content: "\\ea07";
	}
	.icofont-riyal-plus:before
	{
		content: "\\ea08";
	}
	.icofont-riyal-true:before
	{
		content: "\\ea09";
	}
	.icofont-riyal:before
	{
		content: "\\ea0a";
	}
	.icofont-rouble-false:before
	{
		content: "\\ea0b";
	}
	.icofont-rouble-minus:before
	{
		content: "\\ea0c";
	}
	.icofont-rouble-plus:before
	{
		content: "\\ea0d";
	}
	.icofont-rouble-true:before
	{
		content: "\\ea0e";
	}
	.icofont-rouble:before
	{
		content: "\\ea0f";
	}
	.icofont-rupee-false:before
	{
		content: "\\ea10";
	}
	.icofont-rupee-minus:before
	{
		content: "\\ea11";
	}
	.icofont-rupee-plus:before
	{
		content: "\\ea12";
	}
	.icofont-rupee-true:before
	{
		content: "\\ea13";
	}
	.icofont-rupee:before
	{
		content: "\\ea14";
	}
	.icofont-taka-false:before
	{
		content: "\\ea15";
	}
	.icofont-taka-minus:before
	{
		content: "\\ea16";
	}
	.icofont-taka-plus:before
	{
		content: "\\ea17";
	}
	.icofont-taka-true:before
	{
		content: "\\ea18";
	}
	.icofont-taka:before
	{
		content: "\\ea19";
	}
	.icofont-turkish-lira-false:before
	{
		content: "\\ea1a";
	}
	.icofont-turkish-lira-minus:before
	{
		content: "\\ea1b";
	}
	.icofont-turkish-lira-plus:before
	{
		content: "\\ea1c";
	}
	.icofont-turkish-lira-true:before
	{
		content: "\\ea1d";
	}
	.icofont-turkish-lira:before
	{
		content: "\\ea1e";
	}
	.icofont-won-false:before
	{
		content: "\\ea1f";
	}
	.icofont-won-minus:before
	{
		content: "\\ea20";
	}
	.icofont-won-plus:before
	{
		content: "\\ea21";
	}
	.icofont-won-true:before
	{
		content: "\\ea22";
	}
	.icofont-won:before
	{
		content: "\\ea23";
	}
	.icofont-yen-false:before
	{
		content: "\\ea24";
	}
	.icofont-yen-minus:before
	{
		content: "\\ea25";
	}
	.icofont-yen-plus:before
	{
		content: "\\ea26";
	}
	.icofont-yen-true:before
	{
		content: "\\ea27";
	}
	.icofont-yen:before
	{
		content: "\\ea28";
	}
	.icofont-android-nexus:before
	{
		content: "\\ea29";
	}
	.icofont-android-tablet:before
	{
		content: "\\ea2a";
	}
	.icofont-apple-watch:before
	{
		content: "\\ea2b";
	}
	.icofont-drawing-tablet:before
	{
		content: "\\ea2c";
	}
	.icofont-earphone:before
	{
		content: "\\ea2d";
	}
	.icofont-flash-drive:before
	{
		content: "\\ea2e";
	}
	.icofont-game-console:before
	{
		content: "\\ea2f";
	}
	.icofont-game-controller:before
	{
		content: "\\ea30";
	}
	.icofont-game-pad:before
	{
		content: "\\ea31";
	}
	.icofont-game:before
	{
		content: "\\ea32";
	}
	.icofont-headphone-alt-1:before
	{
		content: "\\ea33";
	}
	.icofont-headphone-alt-2:before
	{
		content: "\\ea34";
	}
	.icofont-headphone-alt-3:before
	{
		content: "\\ea35";
	}
	.icofont-headphone-alt:before
	{
		content: "\\ea36";
	}
	.icofont-headphone:before
	{
		content: "\\ea37";
	}
	.icofont-htc-one:before
	{
		content: "\\ea38";
	}
	.icofont-imac:before
	{
		content: "\\ea39";
	}
	.icofont-ipad:before
	{
		content: "\\ea3a";
	}
	.icofont-iphone:before
	{
		content: "\\ea3b";
	}
	.icofont-ipod-nano:before
	{
		content: "\\ea3c";
	}
	.icofont-ipod-touch:before
	{
		content: "\\ea3d";
	}
	.icofont-keyboard-alt:before
	{
		content: "\\ea3e";
	}
	.icofont-keyboard-wireless:before
	{
		content: "\\ea3f";
	}
	.icofont-keyboard:before
	{
		content: "\\ea40";
	}
	.icofont-laptop-alt:before
	{
		content: "\\ea41";
	}
	.icofont-laptop:before
	{
		content: "\\ea42";
	}
	.icofont-macbook:before
	{
		content: "\\ea43";
	}
	.icofont-magic-mouse:before
	{
		content: "\\ea44";
	}
	.icofont-micro-chip:before
	{
		content: "\\ea45";
	}
	.icofont-microphone-alt:before
	{
		content: "\\ea46";
	}
	.icofont-microphone:before
	{
		content: "\\ea47";
	}
	.icofont-monitor:before
	{
		content: "\\ea48";
	}
	.icofont-mouse:before
	{
		content: "\\ea49";
	}
	.icofont-mp3-player:before
	{
		content: "\\ea4a";
	}
	.icofont-nintendo:before
	{
		content: "\\ea4b";
	}
	.icofont-playstation-alt:before
	{
		content: "\\ea4c";
	}
	.icofont-psvita:before
	{
		content: "\\ea4d";
	}
	.icofont-radio-mic:before
	{
		content: "\\ea4e";
	}
	.icofont-radio:before
	{
		content: "\\ea4f";
	}
	.icofont-refrigerator:before
	{
		content: "\\ea50";
	}
	.icofont-samsung-galaxy:before
	{
		content: "\\ea51";
	}
	.icofont-surface-tablet:before
	{
		content: "\\ea52";
	}
	.icofont-ui-head-phone:before
	{
		content: "\\ea53";
	}
	.icofont-ui-keyboard:before
	{
		content: "\\ea54";
	}
	.icofont-washing-machine:before
	{
		content: "\\ea55";
	}
	.icofont-wifi-router:before
	{
		content: "\\ea56";
	}
	.icofont-wii-u:before
	{
		content: "\\ea57";
	}
	.icofont-windows-lumia:before
	{
		content: "\\ea58";
	}
	.icofont-wireless-mouse:before
	{
		content: "\\ea59";
	}
	.icofont-xbox-360:before
	{
		content: "\\ea5a";
	}
	.icofont-arrow-down:before
	{
		content: "\\ea5b";
	}
	.icofont-arrow-left:before
	{
		content: "\\ea5c";
	}
	.icofont-arrow-right:before
	{
		content: "\\ea5d";
	}
	.icofont-arrow-up:before
	{
		content: "\\ea5e";
	}
	.icofont-block-down:before
	{
		content: "\\ea5f";
	}
	.icofont-block-left:before
	{
		content: "\\ea60";
	}
	.icofont-block-right:before
	{
		content: "\\ea61";
	}
	.icofont-block-up:before
	{
		content: "\\ea62";
	}
	.icofont-bubble-down:before
	{
		content: "\\ea63";
	}
	.icofont-bubble-left:before
	{
		content: "\\ea64";
	}
	.icofont-bubble-right:before
	{
		content: "\\ea65";
	}
	.icofont-bubble-up:before
	{
		content: "\\ea66";
	}
	.icofont-caret-down:before
	{
		content: "\\ea67";
	}
	.icofont-caret-left:before
	{
		content: "\\ea68";
	}
	.icofont-caret-right:before
	{
		content: "\\ea69";
	}
	.icofont-caret-up:before
	{
		content: "\\ea6a";
	}
	.icofont-circled-down:before
	{
		content: "\\ea6b";
	}
	.icofont-circled-left:before
	{
		content: "\\ea6c";
	}
	.icofont-circled-right:before
	{
		content: "\\ea6d";
	}
	.icofont-circled-up:before
	{
		content: "\\ea6e";
	}
	.icofont-collapse:before
	{
		content: "\\ea6f";
	}
	.icofont-cursor-drag:before
	{
		content: "\\ea70";
	}
	.icofont-curved-double-left:before
	{
		content: "\\ea71";
	}
	.icofont-curved-double-right:before
	{
		content: "\\ea72";
	}
	.icofont-curved-down:before
	{
		content: "\\ea73";
	}
	.icofont-curved-left:before
	{
		content: "\\ea74";
	}
	.icofont-curved-right:before
	{
		content: "\\ea75";
	}
	.icofont-curved-up:before
	{
		content: "\\ea76";
	}
	.icofont-dotted-down:before
	{
		content: "\\ea77";
	}
	.icofont-dotted-left:before
	{
		content: "\\ea78";
	}
	.icofont-dotted-right:before
	{
		content: "\\ea79";
	}
	.icofont-dotted-up:before
	{
		content: "\\ea7a";
	}
	.icofont-double-left:before
	{
		content: "\\ea7b";
	}
	.icofont-double-right:before
	{
		content: "\\ea7c";
	}
	.icofont-expand-alt:before
	{
		content: "\\ea7d";
	}
	.icofont-hand-down:before
	{
		content: "\\ea7e";
	}
	.icofont-hand-drag:before
	{
		content: "\\ea7f";
	}
	.icofont-hand-drag1:before
	{
		content: "\\ea80";
	}
	.icofont-hand-drag2:before
	{
		content: "\\ea81";
	}
	.icofont-hand-drawn-alt-down:before
	{
		content: "\\ea82";
	}
	.icofont-hand-drawn-alt-left:before
	{
		content: "\\ea83";
	}
	.icofont-hand-drawn-alt-right:before
	{
		content: "\\ea84";
	}
	.icofont-hand-drawn-alt-up:before
	{
		content: "\\ea85";
	}
	.icofont-hand-drawn-down:before
	{
		content: "\\ea86";
	}
	.icofont-hand-drawn-left:before
	{
		content: "\\ea87";
	}
	.icofont-hand-drawn-right:before
	{
		content: "\\ea88";
	}
	.icofont-hand-drawn-up:before
	{
		content: "\\ea89";
	}
	.icofont-hand-grippers:before
	{
		content: "\\ea8a";
	}
	.icofont-hand-left:before
	{
		content: "\\ea8b";
	}
	.icofont-hand-right:before
	{
		content: "\\ea8c";
	}
	.icofont-hand-up:before
	{
		content: "\\ea8d";
	}
	.icofont-line-block-down:before
	{
		content: "\\ea8e";
	}
	.icofont-line-block-left:before
	{
		content: "\\ea8f";
	}
	.icofont-line-block-right:before
	{
		content: "\\ea90";
	}
	.icofont-line-block-up:before
	{
		content: "\\ea91";
	}
	.icofont-long-arrow-down:before
	{
		content: "\\ea92";
	}
	.icofont-long-arrow-left:before
	{
		content: "\\ea93";
	}
	.icofont-long-arrow-right:before
	{
		content: "\\ea94";
	}
	.icofont-long-arrow-up:before
	{
		content: "\\ea95";
	}
	.icofont-rounded-collapse:before
	{
		content: "\\ea96";
	}
	.icofont-rounded-double-left:before
	{
		content: "\\ea97";
	}
	.icofont-rounded-double-right:before
	{
		content: "\\ea98";
	}
	.icofont-rounded-down:before
	{
		content: "\\ea99";
	}
	.icofont-rounded-expand:before
	{
		content: "\\ea9a";
	}
	.icofont-rounded-left-down:before
	{
		content: "\\ea9b";
	}
	.icofont-rounded-left-up:before
	{
		content: "\\ea9c";
	}
	.icofont-rounded-left:before
	{
		content: "\\ea9d";
	}
	.icofont-rounded-right-down:before
	{
		content: "\\ea9e";
	}
	.icofont-rounded-right-up:before
	{
		content: "\\ea9f";
	}
	.icofont-rounded-right:before
	{
		content: "\\eaa0";
	}
	.icofont-rounded-up:before
	{
		content: "\\eaa1";
	}
	.icofont-scroll-bubble-down:before
	{
		content: "\\eaa2";
	}
	.icofont-scroll-bubble-left:before
	{
		content: "\\eaa3";
	}
	.icofont-scroll-bubble-right:before
	{
		content: "\\eaa4";
	}
	.icofont-scroll-bubble-up:before
	{
		content: "\\eaa5";
	}
	.icofont-scroll-double-down:before
	{
		content: "\\eaa6";
	}
	.icofont-scroll-double-left:before
	{
		content: "\\eaa7";
	}
	.icofont-scroll-double-right:before
	{
		content: "\\eaa8";
	}
	.icofont-scroll-double-up:before
	{
		content: "\\eaa9";
	}
	.icofont-scroll-down:before
	{
		content: "\\eaaa";
	}
	.icofont-scroll-left:before
	{
		content: "\\eaab";
	}
	.icofont-scroll-long-down:before
	{
		content: "\\eaac";
	}
	.icofont-scroll-long-left:before
	{
		content: "\\eaad";
	}
	.icofont-scroll-long-right:before
	{
		content: "\\eaae";
	}
	.icofont-scroll-long-up:before
	{
		content: "\\eaaf";
	}
	.icofont-scroll-right:before
	{
		content: "\\eab0";
	}
	.icofont-scroll-up:before
	{
		content: "\\eab1";
	}
	.icofont-simple-down:before
	{
		content: "\\eab2";
	}
	.icofont-simple-left-down:before
	{
		content: "\\eab3";
	}
	.icofont-simple-left-up:before
	{
		content: "\\eab4";
	}
	.icofont-simple-left:before
	{
		content: "\\eab5";
	}
	.icofont-simple-right-down:before
	{
		content: "\\eab6";
	}
	.icofont-simple-right-up:before
	{
		content: "\\eab7";
	}
	.icofont-simple-right:before
	{
		content: "\\eab8";
	}
	.icofont-simple-up:before
	{
		content: "\\eab9";
	}
	.icofont-square-down:before
	{
		content: "\\eaba";
	}
	.icofont-square-left:before
	{
		content: "\\eabb";
	}
	.icofont-square-right:before
	{
		content: "\\eabc";
	}
	.icofont-square-up:before
	{
		content: "\\eabd";
	}
	.icofont-stylish-down:before
	{
		content: "\\eabe";
	}
	.icofont-stylish-left:before
	{
		content: "\\eabf";
	}
	.icofont-stylish-right:before
	{
		content: "\\eac0";
	}
	.icofont-stylish-up:before
	{
		content: "\\eac1";
	}
	.icofont-swoosh-down:before
	{
		content: "\\eac2";
	}
	.icofont-swoosh-left:before
	{
		content: "\\eac3";
	}
	.icofont-swoosh-right:before
	{
		content: "\\eac4";
	}
	.icofont-swoosh-up:before
	{
		content: "\\eac5";
	}
	.icofont-thin-double-left:before
	{
		content: "\\eac6";
	}
	.icofont-thin-double-right:before
	{
		content: "\\eac7";
	}
	.icofont-thin-down:before
	{
		content: "\\eac8";
	}
	.icofont-thin-left:before
	{
		content: "\\eac9";
	}
	.icofont-thin-right:before
	{
		content: "\\eaca";
	}
	.icofont-thin-up:before
	{
		content: "\\eacb";
	}
	.icofont-abc:before
	{
		content: "\\eacc";
	}
	.icofont-atom:before
	{
		content: "\\eacd";
	}
	.icofont-award:before
	{
		content: "\\eace";
	}
	.icofont-bell-alt:before
	{
		content: "\\eacf";
	}
	.icofont-black-board:before
	{
		content: "\\ead0";
	}
	.icofont-book-alt:before
	{
		content: "\\ead1";
	}
	.icofont-book:before
	{
		content: "\\ead2";
	}
	.icofont-brainstorming:before
	{
		content: "\\ead3";
	}
	.icofont-certificate-alt-1:before
	{
		content: "\\ead4";
	}
	.icofont-certificate-alt-2:before
	{
		content: "\\ead5";
	}
	.icofont-certificate:before
	{
		content: "\\ead6";
	}
	.icofont-education:before
	{
		content: "\\ead7";
	}
	.icofont-electron:before
	{
		content: "\\ead8";
	}
	.icofont-fountain-pen:before
	{
		content: "\\ead9";
	}
	.icofont-globe-alt:before
	{
		content: "\\eada";
	}
	.icofont-graduate-alt:before
	{
		content: "\\eadb";
	}
	.icofont-graduate:before
	{
		content: "\\eadc";
	}
	.icofont-group-students:before
	{
		content: "\\eadd";
	}
	.icofont-hat-alt:before
	{
		content: "\\eade";
	}
	.icofont-hat:before
	{
		content: "\\eadf";
	}
	.icofont-instrument:before
	{
		content: "\\eae0";
	}
	.icofont-lamp-light:before
	{
		content: "\\eae1";
	}
	.icofont-medal:before
	{
		content: "\\eae2";
	}
	.icofont-microscope-alt:before
	{
		content: "\\eae3";
	}
	.icofont-microscope:before
	{
		content: "\\eae4";
	}
	.icofont-paper:before
	{
		content: "\\eae5";
	}
	.icofont-pen-alt-4:before
	{
		content: "\\eae6";
	}
	.icofont-pen-nib:before
	{
		content: "\\eae7";
	}
	.icofont-pencil-alt-5:before
	{
		content: "\\eae8";
	}
	.icofont-quill-pen:before
	{
		content: "\\eae9";
	}
	.icofont-read-book-alt:before
	{
		content: "\\eaea";
	}
	.icofont-read-book:before
	{
		content: "\\eaeb";
	}
	.icofont-school-bag:before
	{
		content: "\\eaec";
	}
	.icofont-school-bus:before
	{
		content: "\\eaed";
	}
	.icofont-student-alt:before
	{
		content: "\\eaee";
	}
	.icofont-student:before
	{
		content: "\\eaef";
	}
	.icofont-teacher:before
	{
		content: "\\eaf0";
	}
	.icofont-test-bulb:before
	{
		content: "\\eaf1";
	}
	.icofont-test-tube-alt:before
	{
		content: "\\eaf2";
	}
	.icofont-university:before
	{
		content: "\\eaf3";
	}
	.icofont-angry:before
	{
		content: "\\eaf4";
	}
	.icofont-astonished:before
	{
		content: "\\eaf5";
	}
	.icofont-confounded:before
	{
		content: "\\eaf6";
	}
	.icofont-confused:before
	{
		content: "\\eaf7";
	}
	.icofont-crying:before
	{
		content: "\\eaf8";
	}
	.icofont-dizzy:before
	{
		content: "\\eaf9";
	}
	.icofont-expressionless:before
	{
		content: "\\eafa";
	}
	.icofont-heart-eyes:before
	{
		content: "\\eafb";
	}
	.icofont-laughing:before
	{
		content: "\\eafc";
	}
	.icofont-nerd-smile:before
	{
		content: "\\eafd";
	}
	.icofont-open-mouth:before
	{
		content: "\\eafe";
	}
	.icofont-rage:before
	{
		content: "\\eaff";
	}
	.icofont-rolling-eyes:before
	{
		content: "\\eb00";
	}
	.icofont-sad:before
	{
		content: "\\eb01";
	}
	.icofont-simple-smile:before
	{
		content: "\\eb02";
	}
	.icofont-slightly-smile:before
	{
		content: "\\eb03";
	}
	.icofont-smirk:before
	{
		content: "\\eb04";
	}
	.icofont-stuck-out-tongue:before
	{
		content: "\\eb05";
	}
	.icofont-wink-smile:before
	{
		content: "\\eb06";
	}
	.icofont-worried:before
	{
		content: "\\eb07";
	}
	.icofont-file-alt:before
	{
		content: "\\eb08";
	}
	.icofont-file-audio:before
	{
		content: "\\eb09";
	}
	.icofont-file-avi-mp4:before
	{
		content: "\\eb0a";
	}
	.icofont-file-bmp:before
	{
		content: "\\eb0b";
	}
	.icofont-file-code:before
	{
		content: "\\eb0c";
	}
	.icofont-file-css:before
	{
		content: "\\eb0d";
	}
	.icofont-file-document:before
	{
		content: "\\eb0e";
	}
	.icofont-file-eps:before
	{
		content: "\\eb0f";
	}
	.icofont-file-excel:before
	{
		content: "\\eb10";
	}
	.icofont-file-exe:before
	{
		content: "\\eb11";
	}
	.icofont-file-file:before
	{
		content: "\\eb12";
	}
	.icofont-file-flv:before
	{
		content: "\\eb13";
	}
	.icofont-file-gif:before
	{
		content: "\\eb14";
	}
	.icofont-file-html5:before
	{
		content: "\\eb15";
	}
	.icofont-file-image:before
	{
		content: "\\eb16";
	}
	.icofont-file-iso:before
	{
		content: "\\eb17";
	}
	.icofont-file-java:before
	{
		content: "\\eb18";
	}
	.icofont-file-javascript:before
	{
		content: "\\eb19";
	}
	.icofont-file-jpg:before
	{
		content: "\\eb1a";
	}
	.icofont-file-midi:before
	{
		content: "\\eb1b";
	}
	.icofont-file-mov:before
	{
		content: "\\eb1c";
	}
	.icofont-file-mp3:before
	{
		content: "\\eb1d";
	}
	.icofont-file-pdf:before
	{
		content: "\\eb1e";
	}
	.icofont-file-php:before
	{
		content: "\\eb1f";
	}
	.icofont-file-png:before
	{
		content: "\\eb20";
	}
	.icofont-file-powerpoint:before
	{
		content: "\\eb21";
	}
	.icofont-file-presentation:before
	{
		content: "\\eb22";
	}
	.icofont-file-psb:before
	{
		content: "\\eb23";
	}
	.icofont-file-psd:before
	{
		content: "\\eb24";
	}
	.icofont-file-python:before
	{
		content: "\\eb25";
	}
	.icofont-file-ruby:before
	{
		content: "\\eb26";
	}
	.icofont-file-spreadsheet:before
	{
		content: "\\eb27";
	}
	.icofont-file-sql:before
	{
		content: "\\eb28";
	}
	.icofont-file-svg:before
	{
		content: "\\eb29";
	}
	.icofont-file-text:before
	{
		content: "\\eb2a";
	}
	.icofont-file-tiff:before
	{
		content: "\\eb2b";
	}
	.icofont-file-video:before
	{
		content: "\\eb2c";
	}
	.icofont-file-wave:before
	{
		content: "\\eb2d";
	}
	.icofont-file-wmv:before
	{
		content: "\\eb2e";
	}
	.icofont-file-word:before
	{
		content: "\\eb2f";
	}
	.icofont-file-zip:before
	{
		content: "\\eb30";
	}
	.icofont-cycling-alt:before
	{
		content: "\\eb31";
	}
	.icofont-cycling:before
	{
		content: "\\eb32";
	}
	.icofont-dumbbell:before
	{
		content: "\\eb33";
	}
	.icofont-dumbbells:before
	{
		content: "\\eb34";
	}
	.icofont-gym-alt-1:before
	{
		content: "\\eb35";
	}
	.icofont-gym-alt-2:before
	{
		content: "\\eb36";
	}
	.icofont-gym-alt-3:before
	{
		content: "\\eb37";
	}
	.icofont-gym:before
	{
		content: "\\eb38";
	}
	.icofont-muscle-weight:before
	{
		content: "\\eb39";
	}
	.icofont-muscle:before
	{
		content: "\\eb3a";
	}
	.icofont-apple:before
	{
		content: "\\eb3b";
	}
	.icofont-arabian-coffee:before
	{
		content: "\\eb3c";
	}
	.icofont-artichoke:before
	{
		content: "\\eb3d";
	}
	.icofont-asparagus:before
	{
		content: "\\eb3e";
	}
	.icofont-avocado:before
	{
		content: "\\eb3f";
	}
	.icofont-baby-food:before
	{
		content: "\\eb40";
	}
	.icofont-banana:before
	{
		content: "\\eb41";
	}
	.icofont-bbq:before
	{
		content: "\\eb42";
	}
	.icofont-beans:before
	{
		content: "\\eb43";
	}
	.icofont-beer:before
	{
		content: "\\eb44";
	}
	.icofont-bell-pepper-capsicum:before
	{
		content: "\\eb45";
	}
	.icofont-birthday-cake:before
	{
		content: "\\eb46";
	}
	.icofont-bread:before
	{
		content: "\\eb47";
	}
	.icofont-broccoli:before
	{
		content: "\\eb48";
	}
	.icofont-burger:before
	{
		content: "\\eb49";
	}
	.icofont-cabbage:before
	{
		content: "\\eb4a";
	}
	.icofont-carrot:before
	{
		content: "\\eb4b";
	}
	.icofont-cauli-flower:before
	{
		content: "\\eb4c";
	}
	.icofont-cheese:before
	{
		content: "\\eb4d";
	}
	.icofont-chef:before
	{
		content: "\\eb4e";
	}
	.icofont-cherry:before
	{
		content: "\\eb4f";
	}
	.icofont-chicken-fry:before
	{
		content: "\\eb50";
	}
	.icofont-chicken:before
	{
		content: "\\eb51";
	}
	.icofont-cocktail:before
	{
		content: "\\eb52";
	}
	.icofont-coconut-water:before
	{
		content: "\\eb53";
	}
	.icofont-coconut:before
	{
		content: "\\eb54";
	}
	.icofont-coffee-alt:before
	{
		content: "\\eb55";
	}
	.icofont-coffee-cup:before
	{
		content: "\\eb56";
	}
	.icofont-coffee-mug:before
	{
		content: "\\eb57";
	}
	.icofont-coffee-pot:before
	{
		content: "\\eb58";
	}
	.icofont-cola:before
	{
		content: "\\eb59";
	}
	.icofont-corn:before
	{
		content: "\\eb5a";
	}
	.icofont-croissant:before
	{
		content: "\\eb5b";
	}
	.icofont-crop-plant:before
	{
		content: "\\eb5c";
	}
	.icofont-cucumber:before
	{
		content: "\\eb5d";
	}
	.icofont-culinary:before
	{
		content: "\\eb5e";
	}
	.icofont-cup-cake:before
	{
		content: "\\eb5f";
	}
	.icofont-dining-table:before
	{
		content: "\\eb60";
	}
	.icofont-donut:before
	{
		content: "\\eb61";
	}
	.icofont-egg-plant:before
	{
		content: "\\eb62";
	}
	.icofont-egg-poached:before
	{
		content: "\\eb63";
	}
	.icofont-farmer-alt:before
	{
		content: "\\eb64";
	}
	.icofont-farmer:before
	{
		content: "\\eb65";
	}
	.icofont-fast-food:before
	{
		content: "\\eb66";
	}
	.icofont-food-basket:before
	{
		content: "\\eb67";
	}
	.icofont-food-cart:before
	{
		content: "\\eb68";
	}
	.icofont-fork-and-knife:before
	{
		content: "\\eb69";
	}
	.icofont-french-fries:before
	{
		content: "\\eb6a";
	}
	.icofont-fruits:before
	{
		content: "\\eb6b";
	}
	.icofont-grapes:before
	{
		content: "\\eb6c";
	}
	.icofont-honey:before
	{
		content: "\\eb6d";
	}
	.icofont-hot-dog:before
	{
		content: "\\eb6e";
	}
	.icofont-ice-cream-alt:before
	{
		content: "\\eb6f";
	}
	.icofont-ice-cream:before
	{
		content: "\\eb70";
	}
	.icofont-juice:before
	{
		content: "\\eb71";
	}
	.icofont-ketchup:before
	{
		content: "\\eb72";
	}
	.icofont-kiwi:before
	{
		content: "\\eb73";
	}
	.icofont-layered-cake:before
	{
		content: "\\eb74";
	}
	.icofont-lemon-alt:before
	{
		content: "\\eb75";
	}
	.icofont-lemon:before
	{
		content: "\\eb76";
	}
	.icofont-lobster:before
	{
		content: "\\eb77";
	}
	.icofont-mango:before
	{
		content: "\\eb78";
	}
	.icofont-milk:before
	{
		content: "\\eb79";
	}
	.icofont-mushroom:before
	{
		content: "\\eb7a";
	}
	.icofont-noodles:before
	{
		content: "\\eb7b";
	}
	.icofont-onion:before
	{
		content: "\\eb7c";
	}
	.icofont-orange:before
	{
		content: "\\eb7d";
	}
	.icofont-pear:before
	{
		content: "\\eb7e";
	}
	.icofont-peas:before
	{
		content: "\\eb7f";
	}
	.icofont-pepper:before
	{
		content: "\\eb80";
	}
	.icofont-pie-alt:before
	{
		content: "\\eb81";
	}
	.icofont-pie:before
	{
		content: "\\eb82";
	}
	.icofont-pineapple:before
	{
		content: "\\eb83";
	}
	.icofont-pizza-slice:before
	{
		content: "\\eb84";
	}
	.icofont-pizza:before
	{
		content: "\\eb85";
	}
	.icofont-plant:before
	{
		content: "\\eb86";
	}
	.icofont-popcorn:before
	{
		content: "\\eb87";
	}
	.icofont-potato:before
	{
		content: "\\eb88";
	}
	.icofont-pumpkin:before
	{
		content: "\\eb89";
	}
	.icofont-raddish:before
	{
		content: "\\eb8a";
	}
	.icofont-restaurant-menu:before
	{
		content: "\\eb8b";
	}
	.icofont-restaurant:before
	{
		content: "\\eb8c";
	}
	.icofont-salt-and-pepper:before
	{
		content: "\\eb8d";
	}
	.icofont-sandwich:before
	{
		content: "\\eb8e";
	}
	.icofont-sausage:before
	{
		content: "\\eb8f";
	}
	.icofont-soft-drinks:before
	{
		content: "\\eb90";
	}
	.icofont-soup-bowl:before
	{
		content: "\\eb91";
	}
	.icofont-spoon-and-fork:before
	{
		content: "\\eb92";
	}
	.icofont-steak:before
	{
		content: "\\eb93";
	}
	.icofont-strawberry:before
	{
		content: "\\eb94";
	}
	.icofont-sub-sandwich:before
	{
		content: "\\eb95";
	}
	.icofont-sushi:before
	{
		content: "\\eb96";
	}
	.icofont-taco:before
	{
		content: "\\eb97";
	}
	.icofont-tea-pot:before
	{
		content: "\\eb98";
	}
	.icofont-tea:before
	{
		content: "\\eb99";
	}
	.icofont-tomato:before
	{
		content: "\\eb9a";
	}
	.icofont-watermelon:before
	{
		content: "\\eb9b";
	}
	.icofont-wheat:before
	{
		content: "\\eb9c";
	}
	.icofont-baby-backpack:before
	{
		content: "\\eb9d";
	}
	.icofont-baby-cloth:before
	{
		content: "\\eb9e";
	}
	.icofont-baby-milk-bottle:before
	{
		content: "\\eb9f";
	}
	.icofont-baby-trolley:before
	{
		content: "\\eba0";
	}
	.icofont-baby:before
	{
		content: "\\eba1";
	}
	.icofont-candy:before
	{
		content: "\\eba2";
	}
	.icofont-holding-hands:before
	{
		content: "\\eba3";
	}
	.icofont-infant-nipple:before
	{
		content: "\\eba4";
	}
	.icofont-kids-scooter:before
	{
		content: "\\eba5";
	}
	.icofont-safety-pin:before
	{
		content: "\\eba6";
	}
	.icofont-teddy-bear:before
	{
		content: "\\eba7";
	}
	.icofont-toy-ball:before
	{
		content: "\\eba8";
	}
	.icofont-toy-cat:before
	{
		content: "\\eba9";
	}
	.icofont-toy-duck:before
	{
		content: "\\ebaa";
	}
	.icofont-toy-elephant:before
	{
		content: "\\ebab";
	}
	.icofont-toy-hand:before
	{
		content: "\\ebac";
	}
	.icofont-toy-horse:before
	{
		content: "\\ebad";
	}
	.icofont-toy-lattu:before
	{
		content: "\\ebae";
	}
	.icofont-toy-train:before
	{
		content: "\\ebaf";
	}
	.icofont-burglar:before
	{
		content: "\\ebb0";
	}
	.icofont-cannon-firing:before
	{
		content: "\\ebb1";
	}
	.icofont-cc-camera:before
	{
		content: "\\ebb2";
	}
	.icofont-cop-badge:before
	{
		content: "\\ebb3";
	}
	.icofont-cop:before
	{
		content: "\\ebb4";
	}
	.icofont-court-hammer:before
	{
		content: "\\ebb5";
	}
	.icofont-court:before
	{
		content: "\\ebb6";
	}
	.icofont-finger-print:before
	{
		content: "\\ebb7";
	}
	.icofont-gavel:before
	{
		content: "\\ebb8";
	}
	.icofont-handcuff-alt:before
	{
		content: "\\ebb9";
	}
	.icofont-handcuff:before
	{
		content: "\\ebba";
	}
	.icofont-investigation:before
	{
		content: "\\ebbb";
	}
	.icofont-investigator:before
	{
		content: "\\ebbc";
	}
	.icofont-jail:before
	{
		content: "\\ebbd";
	}
	.icofont-judge:before
	{
		content: "\\ebbe";
	}
	.icofont-law-alt-1:before
	{
		content: "\\ebbf";
	}
	.icofont-law-alt-2:before
	{
		content: "\\ebc0";
	}
	.icofont-law-alt-3:before
	{
		content: "\\ebc1";
	}
	.icofont-law-book:before
	{
		content: "\\ebc2";
	}
	.icofont-law-document:before
	{
		content: "\\ebc3";
	}
	.icofont-law-order:before
	{
		content: "\\ebc4";
	}
	.icofont-law-protect:before
	{
		content: "\\ebc5";
	}
	.icofont-law-scales:before
	{
		content: "\\ebc6";
	}
	.icofont-law:before
	{
		content: "\\ebc7";
	}
	.icofont-lawyer-alt-1:before
	{
		content: "\\ebc8";
	}
	.icofont-lawyer-alt-2:before
	{
		content: "\\ebc9";
	}
	.icofont-lawyer:before
	{
		content: "\\ebca";
	}
	.icofont-legal:before
	{
		content: "\\ebcb";
	}
	.icofont-pistol:before
	{
		content: "\\ebcc";
	}
	.icofont-police-badge:before
	{
		content: "\\ebcd";
	}
	.icofont-police-cap:before
	{
		content: "\\ebce";
	}
	.icofont-police-car-alt-1:before
	{
		content: "\\ebcf";
	}
	.icofont-police-car-alt-2:before
	{
		content: "\\ebd0";
	}
	.icofont-police-car:before
	{
		content: "\\ebd1";
	}
	.icofont-police-hat:before
	{
		content: "\\ebd2";
	}
	.icofont-police-van:before
	{
		content: "\\ebd3";
	}
	.icofont-police:before
	{
		content: "\\ebd4";
	}
	.icofont-thief-alt:before
	{
		content: "\\ebd5";
	}
	.icofont-thief:before
	{
		content: "\\ebd6";
	}
	.icofont-abacus-alt:before
	{
		content: "\\ebd7";
	}
	.icofont-abacus:before
	{
		content: "\\ebd8";
	}
	.icofont-angle-180:before
	{
		content: "\\ebd9";
	}
	.icofont-angle-45:before
	{
		content: "\\ebda";
	}
	.icofont-angle-90:before
	{
		content: "\\ebdb";
	}
	.icofont-angle:before
	{
		content: "\\ebdc";
	}
	.icofont-calculator-alt-1:before
	{
		content: "\\ebdd";
	}
	.icofont-calculator-alt-2:before
	{
		content: "\\ebde";
	}
	.icofont-calculator:before
	{
		content: "\\ebdf";
	}
	.icofont-circle-ruler-alt:before
	{
		content: "\\ebe0";
	}
	.icofont-circle-ruler:before
	{
		content: "\\ebe1";
	}
	.icofont-compass-alt-1:before
	{
		content: "\\ebe2";
	}
	.icofont-compass-alt-2:before
	{
		content: "\\ebe3";
	}
	.icofont-compass-alt-3:before
	{
		content: "\\ebe4";
	}
	.icofont-compass-alt-4:before
	{
		content: "\\ebe5";
	}
	.icofont-golden-ratio:before
	{
		content: "\\ebe6";
	}
	.icofont-marker-alt-1:before
	{
		content: "\\ebe7";
	}
	.icofont-marker-alt-2:before
	{
		content: "\\ebe8";
	}
	.icofont-marker-alt-3:before
	{
		content: "\\ebe9";
	}
	.icofont-marker:before
	{
		content: "\\ebea";
	}
	.icofont-math:before
	{
		content: "\\ebeb";
	}
	.icofont-mathematical-alt-1:before
	{
		content: "\\ebec";
	}
	.icofont-mathematical-alt-2:before
	{
		content: "\\ebed";
	}
	.icofont-mathematical:before
	{
		content: "\\ebee";
	}
	.icofont-pen-alt-1:before
	{
		content: "\\ebef";
	}
	.icofont-pen-alt-2:before
	{
		content: "\\ebf0";
	}
	.icofont-pen-alt-3:before
	{
		content: "\\ebf1";
	}
	.icofont-pen-holder-alt-1:before
	{
		content: "\\ebf2";
	}
	.icofont-pen-holder:before
	{
		content: "\\ebf3";
	}
	.icofont-pen:before
	{
		content: "\\ebf4";
	}
	.icofont-pencil-alt-1:before
	{
		content: "\\ebf5";
	}
	.icofont-pencil-alt-2:before
	{
		content: "\\ebf6";
	}
	.icofont-pencil-alt-3:before
	{
		content: "\\ebf7";
	}
	.icofont-pencil-alt-4:before
	{
		content: "\\ebf8";
	}
	.icofont-pencil:before
	{
		content: "\\ebf9";
	}
	.icofont-ruler-alt-1:before
	{
		content: "\\ebfa";
	}
	.icofont-ruler-alt-2:before
	{
		content: "\\ebfb";
	}
	.icofont-ruler-compass-alt:before
	{
		content: "\\ebfc";
	}
	.icofont-ruler-compass:before
	{
		content: "\\ebfd";
	}
	.icofont-ruler-pencil-alt-1:before
	{
		content: "\\ebfe";
	}
	.icofont-ruler-pencil-alt-2:before
	{
		content: "\\ebff";
	}
	.icofont-ruler-pencil:before
	{
		content: "\\ec00";
	}
	.icofont-ruler:before
	{
		content: "\\ec01";
	}
	.icofont-rulers-alt:before
	{
		content: "\\ec02";
	}
	.icofont-rulers:before
	{
		content: "\\ec03";
	}
	.icofont-square-root:before
	{
		content: "\\ec04";
	}
	.icofont-ui-calculator:before
	{
		content: "\\ec05";
	}
	.icofont-aids:before
	{
		content: "\\ec06";
	}
	.icofont-ambulance-crescent:before
	{
		content: "\\ec07";
	}
	.icofont-ambulance-cross:before
	{
		content: "\\ec08";
	}
	.icofont-ambulance:before
	{
		content: "\\ec09";
	}
	.icofont-autism:before
	{
		content: "\\ec0a";
	}
	.icofont-bandage:before
	{
		content: "\\ec0b";
	}
	.icofont-blind:before
	{
		content: "\\ec0c";
	}
	.icofont-blood-drop:before
	{
		content: "\\ec0d";
	}
	.icofont-blood-test:before
	{
		content: "\\ec0e";
	}
	.icofont-blood:before
	{
		content: "\\ec0f";
	}
	.icofont-brain-alt:before
	{
		content: "\\ec10";
	}
	.icofont-brain:before
	{
		content: "\\ec11";
	}
	.icofont-capsule:before
	{
		content: "\\ec12";
	}
	.icofont-crutch:before
	{
		content: "\\ec13";
	}
	.icofont-disabled:before
	{
		content: "\\ec14";
	}
	.icofont-dna-alt-1:before
	{
		content: "\\ec15";
	}
	.icofont-dna-alt-2:before
	{
		content: "\\ec16";
	}
	.icofont-dna:before
	{
		content: "\\ec17";
	}
	.icofont-doctor-alt:before
	{
		content: "\\ec18";
	}
	.icofont-doctor:before
	{
		content: "\\ec19";
	}
	.icofont-drug-pack:before
	{
		content: "\\ec1a";
	}
	.icofont-drug:before
	{
		content: "\\ec1b";
	}
	.icofont-first-aid-alt:before
	{
		content: "\\ec1c";
	}
	.icofont-first-aid:before
	{
		content: "\\ec1d";
	}
	.icofont-heart-beat-alt:before
	{
		content: "\\ec1e";
	}
	.icofont-heart-beat:before
	{
		content: "\\ec1f";
	}
	.icofont-heartbeat:before
	{
		content: "\\ec20";
	}
	.icofont-herbal:before
	{
		content: "\\ec21";
	}
	.icofont-hospital:before
	{
		content: "\\ec22";
	}
	.icofont-icu:before
	{
		content: "\\ec23";
	}
	.icofont-injection-syringe:before
	{
		content: "\\ec24";
	}
	.icofont-laboratory:before
	{
		content: "\\ec25";
	}
	.icofont-medical-sign-alt:before
	{
		content: "\\ec26";
	}
	.icofont-medical-sign:before
	{
		content: "\\ec27";
	}
	.icofont-nurse-alt:before
	{
		content: "\\ec28";
	}
	.icofont-nurse:before
	{
		content: "\\ec29";
	}
	.icofont-nursing-home:before
	{
		content: "\\ec2a";
	}
	.icofont-operation-theater:before
	{
		content: "\\ec2b";
	}
	.icofont-paralysis-disability:before
	{
		content: "\\ec2c";
	}
	.icofont-patient-bed:before
	{
		content: "\\ec2d";
	}
	.icofont-patient-file:before
	{
		content: "\\ec2e";
	}
	.icofont-pills:before
	{
		content: "\\ec2f";
	}
	.icofont-prescription:before
	{
		content: "\\ec30";
	}
	.icofont-pulse:before
	{
		content: "\\ec31";
	}
	.icofont-stethoscope-alt:before
	{
		content: "\\ec32";
	}
	.icofont-stethoscope:before
	{
		content: "\\ec33";
	}
	.icofont-stretcher:before
	{
		content: "\\ec34";
	}
	.icofont-surgeon-alt:before
	{
		content: "\\ec35";
	}
	.icofont-surgeon:before
	{
		content: "\\ec36";
	}
	.icofont-tablets:before
	{
		content: "\\ec37";
	}
	.icofont-test-bottle:before
	{
		content: "\\ec38";
	}
	.icofont-test-tube:before
	{
		content: "\\ec39";
	}
	.icofont-thermometer-alt:before
	{
		content: "\\ec3a";
	}
	.icofont-thermometer:before
	{
		content: "\\ec3b";
	}
	.icofont-tooth:before
	{
		content: "\\ec3c";
	}
	.icofont-xray:before
	{
		content: "\\ec3d";
	}
	.icofont-ui-add:before
	{
		content: "\\ec3e";
	}
	.icofont-ui-alarm:before
	{
		content: "\\ec3f";
	}
	.icofont-ui-battery:before
	{
		content: "\\ec40";
	}
	.icofont-ui-block:before
	{
		content: "\\ec41";
	}
	.icofont-ui-bluetooth:before
	{
		content: "\\ec42";
	}
	.icofont-ui-brightness:before
	{
		content: "\\ec43";
	}
	.icofont-ui-browser:before
	{
		content: "\\ec44";
	}
	.icofont-ui-calendar:before
	{
		content: "\\ec45";
	}
	.icofont-ui-call:before
	{
		content: "\\ec46";
	}
	.icofont-ui-camera:before
	{
		content: "\\ec47";
	}
	.icofont-ui-cart:before
	{
		content: "\\ec48";
	}
	.icofont-ui-cell-phone:before
	{
		content: "\\ec49";
	}
	.icofont-ui-chat:before
	{
		content: "\\ec4a";
	}
	.icofont-ui-check:before
	{
		content: "\\ec4b";
	}
	.icofont-ui-clip-board:before
	{
		content: "\\ec4c";
	}
	.icofont-ui-clip:before
	{
		content: "\\ec4d";
	}
	.icofont-ui-clock:before
	{
		content: "\\ec4e";
	}
	.icofont-ui-close:before
	{
		content: "\\ec4f";
	}
	.icofont-ui-contact-list:before
	{
		content: "\\ec50";
	}
	.icofont-ui-copy:before
	{
		content: "\\ec51";
	}
	.icofont-ui-cut:before
	{
		content: "\\ec52";
	}
	.icofont-ui-delete:before
	{
		content: "\\ec53";
	}
	.icofont-ui-dial-phone:before
	{
		content: "\\ec54";
	}
	.icofont-ui-edit:before
	{
		content: "\\ec55";
	}
	.icofont-ui-email:before
	{
		content: "\\ec56";
	}
	.icofont-ui-file:before
	{
		content: "\\ec57";
	}
	.icofont-ui-fire-wall:before
	{
		content: "\\ec58";
	}
	.icofont-ui-flash-light:before
	{
		content: "\\ec59";
	}
	.icofont-ui-flight:before
	{
		content: "\\ec5a";
	}
	.icofont-ui-folder:before
	{
		content: "\\ec5b";
	}
	.icofont-ui-game:before
	{
		content: "\\ec5c";
	}
	.icofont-ui-handicapped:before
	{
		content: "\\ec5d";
	}
	.icofont-ui-home:before
	{
		content: "\\ec5e";
	}
	.icofont-ui-image:before
	{
		content: "\\ec5f";
	}
	.icofont-ui-laoding:before
	{
		content: "\\ec60";
	}
	.icofont-ui-lock:before
	{
		content: "\\ec61";
	}
	.icofont-ui-love-add:before
	{
		content: "\\ec62";
	}
	.icofont-ui-love-broken:before
	{
		content: "\\ec63";
	}
	.icofont-ui-love-remove:before
	{
		content: "\\ec64";
	}
	.icofont-ui-love:before
	{
		content: "\\ec65";
	}
	.icofont-ui-map:before
	{
		content: "\\ec66";
	}
	.icofont-ui-message:before
	{
		content: "\\ec67";
	}
	.icofont-ui-messaging:before
	{
		content: "\\ec68";
	}
	.icofont-ui-movie:before
	{
		content: "\\ec69";
	}
	.icofont-ui-music-player:before
	{
		content: "\\ec6a";
	}
	.icofont-ui-music:before
	{
		content: "\\ec6b";
	}
	.icofont-ui-mute:before
	{
		content: "\\ec6c";
	}
	.icofont-ui-network:before
	{
		content: "\\ec6d";
	}
	.icofont-ui-next:before
	{
		content: "\\ec6e";
	}
	.icofont-ui-note:before
	{
		content: "\\ec6f";
	}
	.icofont-ui-office:before
	{
		content: "\\ec70";
	}
	.icofont-ui-password:before
	{
		content: "\\ec71";
	}
	.icofont-ui-pause:before
	{
		content: "\\ec72";
	}
	.icofont-ui-play-stop:before
	{
		content: "\\ec73";
	}
	.icofont-ui-play:before
	{
		content: "\\ec74";
	}
	.icofont-ui-pointer:before
	{
		content: "\\ec75";
	}
	.icofont-ui-power:before
	{
		content: "\\ec76";
	}
	.icofont-ui-press:before
	{
		content: "\\ec77";
	}
	.icofont-ui-previous:before
	{
		content: "\\ec78";
	}
	.icofont-ui-rate-add:before
	{
		content: "\\ec79";
	}
	.icofont-ui-rate-blank:before
	{
		content: "\\ec7a";
	}
	.icofont-ui-rate-remove:before
	{
		content: "\\ec7b";
	}
	.icofont-ui-rating:before
	{
		content: "\\ec7c";
	}
	.icofont-ui-record:before
	{
		content: "\\ec7d";
	}
	.icofont-ui-remove:before
	{
		content: "\\ec7e";
	}
	.icofont-ui-reply:before
	{
		content: "\\ec7f";
	}
	.icofont-ui-rotation:before
	{
		content: "\\ec80";
	}
	.icofont-ui-rss:before
	{
		content: "\\ec81";
	}
	.icofont-ui-search:before
	{
		content: "\\ec82";
	}
	.icofont-ui-settings:before
	{
		content: "\\ec83";
	}
	.icofont-ui-social-link:before
	{
		content: "\\ec84";
	}
	.icofont-ui-tag:before
	{
		content: "\\ec85";
	}
	.icofont-ui-text-chat:before
	{
		content: "\\ec86";
	}
	.icofont-ui-text-loading:before
	{
		content: "\\ec87";
	}
	.icofont-ui-theme:before
	{
		content: "\\ec88";
	}
	.icofont-ui-timer:before
	{
		content: "\\ec89";
	}
	.icofont-ui-touch-phone:before
	{
		content: "\\ec8a";
	}
	.icofont-ui-travel:before
	{
		content: "\\ec8b";
	}
	.icofont-ui-unlock:before
	{
		content: "\\ec8c";
	}
	.icofont-ui-user-group:before
	{
		content: "\\ec8d";
	}
	.icofont-ui-user:before
	{
		content: "\\ec8e";
	}
	.icofont-ui-v-card:before
	{
		content: "\\ec8f";
	}
	.icofont-ui-video-chat:before
	{
		content: "\\ec90";
	}
	.icofont-ui-video-message:before
	{
		content: "\\ec91";
	}
	.icofont-ui-video-play:before
	{
		content: "\\ec92";
	}
	.icofont-ui-video:before
	{
		content: "\\ec93";
	}
	.icofont-ui-volume:before
	{
		content: "\\ec94";
	}
	.icofont-ui-weather:before
	{
		content: "\\ec95";
	}
	.icofont-ui-wifi:before
	{
		content: "\\ec96";
	}
	.icofont-ui-zoom-in:before
	{
		content: "\\ec97";
	}
	.icofont-ui-zoom-out:before
	{
		content: "\\ec98";
	}
	.icofont-cassette-player:before
	{
		content: "\\ec99";
	}
	.icofont-cassette:before
	{
		content: "\\ec9a";
	}
	.icofont-forward:before
	{
		content: "\\ec9b";
	}
	.icofont-guiter:before
	{
		content: "\\ec9c";
	}
	.icofont-movie:before
	{
		content: "\\ec9d";
	}
	.icofont-multimedia:before
	{
		content: "\\ec9e";
	}
	.icofont-music-alt:before
	{
		content: "\\ec9f";
	}
	.icofont-music-disk:before
	{
		content: "\\eca0";
	}
	.icofont-music-note:before
	{
		content: "\\eca1";
	}
	.icofont-music-notes:before
	{
		content: "\\eca2";
	}
	.icofont-music:before
	{
		content: "\\eca3";
	}
	.icofont-mute-volume:before
	{
		content: "\\eca4";
	}
	.icofont-pause:before
	{
		content: "\\eca5";
	}
	.icofont-play-alt-1:before
	{
		content: "\\eca6";
	}
	.icofont-play-alt-2:before
	{
		content: "\\eca7";
	}
	.icofont-play-alt-3:before
	{
		content: "\\eca8";
	}
	.icofont-play-pause:before
	{
		content: "\\eca9";
	}
	.icofont-play:before
	{
		content: "\\ecaa";
	}
	.icofont-record:before
	{
		content: "\\ecab";
	}
	.icofont-retro-music-disk:before
	{
		content: "\\ecac";
	}
	.icofont-rewind:before
	{
		content: "\\ecad";
	}
	.icofont-song-notes:before
	{
		content: "\\ecae";
	}
	.icofont-sound-wave-alt:before
	{
		content: "\\ecaf";
	}
	.icofont-sound-wave:before
	{
		content: "\\ecb0";
	}
	.icofont-stop:before
	{
		content: "\\ecb1";
	}
	.icofont-video-alt:before
	{
		content: "\\ecb2";
	}
	.icofont-video-cam:before
	{
		content: "\\ecb3";
	}
	.icofont-video-clapper:before
	{
		content: "\\ecb4";
	}
	.icofont-video:before
	{
		content: "\\ecb5";
	}
	.icofont-volume-bar:before
	{
		content: "\\ecb6";
	}
	.icofont-volume-down:before
	{
		content: "\\ecb7";
	}
	.icofont-volume-mute:before
	{
		content: "\\ecb8";
	}
	.icofont-volume-off:before
	{
		content: "\\ecb9";
	}
	.icofont-volume-up:before
	{
		content: "\\ecba";
	}
	.icofont-youtube-play:before
	{
		content: "\\ecbb";
	}
	.icofont-2checkout-alt:before
	{
		content: "\\ecbc";
	}
	.icofont-2checkout:before
	{
		content: "\\ecbd";
	}
	.icofont-amazon-alt:before
	{
		content: "\\ecbe";
	}
	.icofont-amazon:before
	{
		content: "\\ecbf";
	}
	.icofont-american-express-alt:before
	{
		content: "\\ecc0";
	}
	.icofont-american-express:before
	{
		content: "\\ecc1";
	}
	.icofont-apple-pay-alt:before
	{
		content: "\\ecc2";
	}
	.icofont-apple-pay:before
	{
		content: "\\ecc3";
	}
	.icofont-bank-transfer-alt:before
	{
		content: "\\ecc4";
	}
	.icofont-bank-transfer:before
	{
		content: "\\ecc5";
	}
	.icofont-braintree-alt:before
	{
		content: "\\ecc6";
	}
	.icofont-braintree:before
	{
		content: "\\ecc7";
	}
	.icofont-cash-on-delivery-alt:before
	{
		content: "\\ecc8";
	}
	.icofont-cash-on-delivery:before
	{
		content: "\\ecc9";
	}
	.icofont-diners-club-alt-1:before
	{
		content: "\\ecca";
	}
	.icofont-diners-club-alt-2:before
	{
		content: "\\eccb";
	}
	.icofont-diners-club-alt-3:before
	{
		content: "\\eccc";
	}
	.icofont-diners-club:before
	{
		content: "\\eccd";
	}
	.icofont-discover-alt:before
	{
		content: "\\ecce";
	}
	.icofont-discover:before
	{
		content: "\\eccf";
	}
	.icofont-eway-alt:before
	{
		content: "\\ecd0";
	}
	.icofont-eway:before
	{
		content: "\\ecd1";
	}
	.icofont-google-wallet-alt-1:before
	{
		content: "\\ecd2";
	}
	.icofont-google-wallet-alt-2:before
	{
		content: "\\ecd3";
	}
	.icofont-google-wallet-alt-3:before
	{
		content: "\\ecd4";
	}
	.icofont-google-wallet:before
	{
		content: "\\ecd5";
	}
	.icofont-jcb-alt:before
	{
		content: "\\ecd6";
	}
	.icofont-jcb:before
	{
		content: "\\ecd7";
	}
	.icofont-maestro-alt:before
	{
		content: "\\ecd8";
	}
	.icofont-maestro:before
	{
		content: "\\ecd9";
	}
	.icofont-mastercard-alt:before
	{
		content: "\\ecda";
	}
	.icofont-mastercard:before
	{
		content: "\\ecdb";
	}
	.icofont-payoneer-alt:before
	{
		content: "\\ecdc";
	}
	.icofont-payoneer:before
	{
		content: "\\ecdd";
	}
	.icofont-paypal-alt:before
	{
		content: "\\ecde";
	}
	.icofont-paypal:before
	{
		content: "\\ecdf";
	}
	.icofont-sage-alt:before
	{
		content: "\\ece0";
	}
	.icofont-sage:before
	{
		content: "\\ece1";
	}
	.icofont-skrill-alt:before
	{
		content: "\\ece2";
	}
	.icofont-skrill:before
	{
		content: "\\ece3";
	}
	.icofont-stripe-alt:before
	{
		content: "\\ece4";
	}
	.icofont-stripe:before
	{
		content: "\\ece5";
	}
	.icofont-visa-alt:before
	{
		content: "\\ece6";
	}
	.icofont-visa-electron:before
	{
		content: "\\ece7";
	}
	.icofont-visa:before
	{
		content: "\\ece8";
	}
	.icofont-western-union-alt:before
	{
		content: "\\ece9";
	}
	.icofont-western-union:before
	{
		content: "\\ecea";
	}
	.icofont-boy:before
	{
		content: "\\eceb";
	}
	.icofont-business-man-alt-1:before
	{
		content: "\\ecec";
	}
	.icofont-business-man-alt-2:before
	{
		content: "\\eced";
	}
	.icofont-business-man-alt-3:before
	{
		content: "\\ecee";
	}
	.icofont-business-man:before
	{
		content: "\\ecef";
	}
	.icofont-female:before
	{
		content: "\\ecf0";
	}
	.icofont-funky-man:before
	{
		content: "\\ecf1";
	}
	.icofont-girl-alt:before
	{
		content: "\\ecf2";
	}
	.icofont-girl:before
	{
		content: "\\ecf3";
	}
	.icofont-group:before
	{
		content: "\\ecf4";
	}
	.icofont-hotel-boy-alt:before
	{
		content: "\\ecf5";
	}
	.icofont-hotel-boy:before
	{
		content: "\\ecf6";
	}
	.icofont-kid:before
	{
		content: "\\ecf7";
	}
	.icofont-man-in-glasses:before
	{
		content: "\\ecf8";
	}
	.icofont-people:before
	{
		content: "\\ecf9";
	}
	.icofont-support:before
	{
		content: "\\ecfa";
	}
	.icofont-user-alt-1:before
	{
		content: "\\ecfb";
	}
	.icofont-user-alt-2:before
	{
		content: "\\ecfc";
	}
	.icofont-user-alt-3:before
	{
		content: "\\ecfd";
	}
	.icofont-user-alt-4:before
	{
		content: "\\ecfe";
	}
	.icofont-user-alt-5:before
	{
		content: "\\ecff";
	}
	.icofont-user-alt-6:before
	{
		content: "\\ed00";
	}
	.icofont-user-alt-7:before
	{
		content: "\\ed01";
	}
	.icofont-user-female:before
	{
		content: "\\ed02";
	}
	.icofont-user-male:before
	{
		content: "\\ed03";
	}
	.icofont-user-suited:before
	{
		content: "\\ed04";
	}
	.icofont-user:before
	{
		content: "\\ed05";
	}
	.icofont-users-alt-1:before
	{
		content: "\\ed06";
	}
	.icofont-users-alt-2:before
	{
		content: "\\ed07";
	}
	.icofont-users-alt-3:before
	{
		content: "\\ed08";
	}
	.icofont-users-alt-4:before
	{
		content: "\\ed09";
	}
	.icofont-users-alt-5:before
	{
		content: "\\ed0a";
	}
	.icofont-users-alt-6:before
	{
		content: "\\ed0b";
	}
	.icofont-users-social:before
	{
		content: "\\ed0c";
	}
	.icofont-users:before
	{
		content: "\\ed0d";
	}
	.icofont-waiter-alt:before
	{
		content: "\\ed0e";
	}
	.icofont-waiter:before
	{
		content: "\\ed0f";
	}
	.icofont-woman-in-glasses:before
	{
		content: "\\ed10";
	}
	.icofont-search-1:before
	{
		content: "\\ed11";
	}
	.icofont-search-2:before
	{
		content: "\\ed12";
	}
	.icofont-search-document:before
	{
		content: "\\ed13";
	}
	.icofont-search-folder:before
	{
		content: "\\ed14";
	}
	.icofont-search-job:before
	{
		content: "\\ed15";
	}
	.icofont-search-map:before
	{
		content: "\\ed16";
	}
	.icofont-search-property:before
	{
		content: "\\ed17";
	}
	.icofont-search-restaurant:before
	{
		content: "\\ed18";
	}
	.icofont-search-stock:before
	{
		content: "\\ed19";
	}
	.icofont-search-user:before
	{
		content: "\\ed1a";
	}
	.icofont-search:before
	{
		content: "\\ed1b";
	}
	.icofont-500px:before
	{
		content: "\\ed1c";
	}
	.icofont-aim:before
	{
		content: "\\ed1d";
	}
	.icofont-badoo:before
	{
		content: "\\ed1e";
	}
	.icofont-baidu-tieba:before
	{
		content: "\\ed1f";
	}
	.icofont-bbm-messenger:before
	{
		content: "\\ed20";
	}
	.icofont-bebo:before
	{
		content: "\\ed21";
	}
	.icofont-behance:before
	{
		content: "\\ed22";
	}
	.icofont-blogger:before
	{
		content: "\\ed23";
	}
	.icofont-bootstrap:before
	{
		content: "\\ed24";
	}
	.icofont-brightkite:before
	{
		content: "\\ed25";
	}
	.icofont-cloudapp:before
	{
		content: "\\ed26";
	}
	.icofont-concrete5:before
	{
		content: "\\ed27";
	}
	.icofont-delicious:before
	{
		content: "\\ed28";
	}
	.icofont-designbump:before
	{
		content: "\\ed29";
	}
	.icofont-designfloat:before
	{
		content: "\\ed2a";
	}
	.icofont-deviantart:before
	{
		content: "\\ed2b";
	}
	.icofont-digg:before
	{
		content: "\\ed2c";
	}
	.icofont-dotcms:before
	{
		content: "\\ed2d";
	}
	.icofont-dribbble:before
	{
		content: "\\ed2e";
	}
	.icofont-dribble:before
	{
		content: "\\ed2f";
	}
	.icofont-dropbox:before
	{
		content: "\\ed30";
	}
	.icofont-ebuddy:before
	{
		content: "\\ed31";
	}
	.icofont-ello:before
	{
		content: "\\ed32";
	}
	.icofont-ember:before
	{
		content: "\\ed33";
	}
	.icofont-envato:before
	{
		content: "\\ed34";
	}
	.icofont-evernote:before
	{
		content: "\\ed35";
	}
	.icofont-facebook-messenger:before
	{
		content: "\\ed36";
	}
	.icofont-facebook:before
	{
		content: "\\ed37";
	}
	.icofont-feedburner:before
	{
		content: "\\ed38";
	}
	.icofont-flikr:before
	{
		content: "\\ed39";
	}
	.icofont-folkd:before
	{
		content: "\\ed3a";
	}
	.icofont-foursquare:before
	{
		content: "\\ed3b";
	}
	.icofont-friendfeed:before
	{
		content: "\\ed3c";
	}
	.icofont-ghost:before
	{
		content: "\\ed3d";
	}
	.icofont-github:before
	{
		content: "\\ed3e";
	}
	.icofont-gnome:before
	{
		content: "\\ed3f";
	}
	.icofont-google-buzz:before
	{
		content: "\\ed40";
	}
	.icofont-google-hangouts:before
	{
		content: "\\ed41";
	}
	.icofont-google-map:before
	{
		content: "\\ed42";
	}
	.icofont-google-plus:before
	{
		content: "\\ed43";
	}
	.icofont-google-talk:before
	{
		content: "\\ed44";
	}
	.icofont-hype-machine:before
	{
		content: "\\ed45";
	}
	.icofont-instagram:before
	{
		content: "\\ed46";
	}
	.icofont-kakaotalk:before
	{
		content: "\\ed47";
	}
	.icofont-kickstarter:before
	{
		content: "\\ed48";
	}
	.icofont-kik:before
	{
		content: "\\ed49";
	}
	.icofont-kiwibox:before
	{
		content: "\\ed4a";
	}
	.icofont-line-messenger:before
	{
		content: "\\ed4b";
	}
	.icofont-line:before
	{
		content: "\\ed4c";
	}
	.icofont-linkedin:before
	{
		content: "\\ed4d";
	}
	.icofont-linux-mint:before
	{
		content: "\\ed4e";
	}
	.icofont-live-messenger:before
	{
		content: "\\ed4f";
	}
	.icofont-livejournal:before
	{
		content: "\\ed50";
	}
	.icofont-magento:before
	{
		content: "\\ed51";
	}
	.icofont-meetme:before
	{
		content: "\\ed52";
	}
	.icofont-meetup:before
	{
		content: "\\ed53";
	}
	.icofont-mixx:before
	{
		content: "\\ed54";
	}
	.icofont-newsvine:before
	{
		content: "\\ed55";
	}
	.icofont-nimbuss:before
	{
		content: "\\ed56";
	}
	.icofont-odnoklassniki:before
	{
		content: "\\ed57";
	}
	.icofont-opencart:before
	{
		content: "\\ed58";
	}
	.icofont-oscommerce:before
	{
		content: "\\ed59";
	}
	.icofont-pandora:before
	{
		content: "\\ed5a";
	}
	.icofont-photobucket:before
	{
		content: "\\ed5b";
	}
	.icofont-picasa:before
	{
		content: "\\ed5c";
	}
	.icofont-pinterest:before
	{
		content: "\\ed5d";
	}
	.icofont-prestashop:before
	{
		content: "\\ed5e";
	}
	.icofont-qik:before
	{
		content: "\\ed5f";
	}
	.icofont-qq:before
	{
		content: "\\ed60";
	}
	.icofont-readernaut:before
	{
		content: "\\ed61";
	}
	.icofont-reddit:before
	{
		content: "\\ed62";
	}
	.icofont-renren:before
	{
		content: "\\ed63";
	}
	.icofont-rss:before
	{
		content: "\\ed64";
	}
	.icofont-shopify:before
	{
		content: "\\ed65";
	}
	.icofont-silverstripe:before
	{
		content: "\\ed66";
	}
	.icofont-skype:before
	{
		content: "\\ed67";
	}
	.icofont-slack:before
	{
		content: "\\ed68";
	}
	.icofont-slashdot:before
	{
		content: "\\ed69";
	}
	.icofont-slidshare:before
	{
		content: "\\ed6a";
	}
	.icofont-smugmug:before
	{
		content: "\\ed6b";
	}
	.icofont-snapchat:before
	{
		content: "\\ed6c";
	}
	.icofont-soundcloud:before
	{
		content: "\\ed6d";
	}
	.icofont-spotify:before
	{
		content: "\\ed6e";
	}
	.icofont-stack-exchange:before
	{
		content: "\\ed6f";
	}
	.icofont-stack-overflow:before
	{
		content: "\\ed70";
	}
	.icofont-steam:before
	{
		content: "\\ed71";
	}
	.icofont-stumbleupon:before
	{
		content: "\\ed72";
	}
	.icofont-tagged:before
	{
		content: "\\ed73";
	}
	.icofont-technorati:before
	{
		content: "\\ed74";
	}
	.icofont-telegram:before
	{
		content: "\\ed75";
	}
	.icofont-tinder:before
	{
		content: "\\ed76";
	}
	.icofont-trello:before
	{
		content: "\\ed77";
	}
	.icofont-tumblr:before
	{
		content: "\\ed78";
	}
	.icofont-twitch:before
	{
		content: "\\ed79";
	}
	.icofont-twitter:before
	{
		content: "\\ed7a";
	}
	.icofont-typo3:before
	{
		content: "\\ed7b";
	}
	.icofont-ubercart:before
	{
		content: "\\ed7c";
	}
	.icofont-viber:before
	{
		content: "\\ed7d";
	}
	.icofont-viddler:before
	{
		content: "\\ed7e";
	}
	.icofont-vimeo:before
	{
		content: "\\ed7f";
	}
	.icofont-vine:before
	{
		content: "\\ed80";
	}
	.icofont-virb:before
	{
		content: "\\ed81";
	}
	.icofont-virtuemart:before
	{
		content: "\\ed82";
	}
	.icofont-vk:before
	{
		content: "\\ed83";
	}
	.icofont-wechat:before
	{
		content: "\\ed84";
	}
	.icofont-weibo:before
	{
		content: "\\ed85";
	}
	.icofont-whatsapp:before
	{
		content: "\\ed86";
	}
	.icofont-xing:before
	{
		content: "\\ed87";
	}
	.icofont-yahoo:before
	{
		content: "\\ed88";
	}
	.icofont-yelp:before
	{
		content: "\\ed89";
	}
	.icofont-youku:before
	{
		content: "\\ed8a";
	}
	.icofont-youtube:before
	{
		content: "\\ed8b";
	}
	.icofont-zencart:before
	{
		content: "\\ed8c";
	}
	.icofont-badminton-birdie:before
	{
		content: "\\ed8d";
	}
	.icofont-baseball:before
	{
		content: "\\ed8e";
	}
	.icofont-baseballer:before
	{
		content: "\\ed8f";
	}
	.icofont-basketball-hoop:before
	{
		content: "\\ed90";
	}
	.icofont-basketball:before
	{
		content: "\\ed91";
	}
	.icofont-billiard-ball:before
	{
		content: "\\ed92";
	}
	.icofont-boot-alt-1:before
	{
		content: "\\ed93";
	}
	.icofont-boot-alt-2:before
	{
		content: "\\ed94";
	}
	.icofont-boot:before
	{
		content: "\\ed95";
	}
	.icofont-bowling-alt:before
	{
		content: "\\ed96";
	}
	.icofont-bowling:before
	{
		content: "\\ed97";
	}
	.icofont-canoe:before
	{
		content: "\\ed98";
	}
	.icofont-cheer-leader:before
	{
		content: "\\ed99";
	}
	.icofont-climbing:before
	{
		content: "\\ed9a";
	}
	.icofont-corner:before
	{
		content: "\\ed9b";
	}
	.icofont-field-alt:before
	{
		content: "\\ed9c";
	}
	.icofont-field:before
	{
		content: "\\ed9d";
	}
	.icofont-football-alt:before
	{
		content: "\\ed9e";
	}
	.icofont-football-american:before
	{
		content: "\\ed9f";
	}
	.icofont-football:before
	{
		content: "\\eda0";
	}
	.icofont-foul:before
	{
		content: "\\eda1";
	}
	.icofont-goal-keeper:before
	{
		content: "\\eda2";
	}
	.icofont-goal:before
	{
		content: "\\eda3";
	}
	.icofont-golf-alt:before
	{
		content: "\\eda4";
	}
	.icofont-golf-bag:before
	{
		content: "\\eda5";
	}
	.icofont-golf-cart:before
	{
		content: "\\eda6";
	}
	.icofont-golf-field:before
	{
		content: "\\eda7";
	}
	.icofont-golf:before
	{
		content: "\\eda8";
	}
	.icofont-golfer:before
	{
		content: "\\eda9";
	}
	.icofont-helmet:before
	{
		content: "\\edaa";
	}
	.icofont-hockey-alt:before
	{
		content: "\\edab";
	}
	.icofont-hockey:before
	{
		content: "\\edac";
	}
	.icofont-ice-skate:before
	{
		content: "\\edad";
	}
	.icofont-jersey-alt:before
	{
		content: "\\edae";
	}
	.icofont-jersey:before
	{
		content: "\\edaf";
	}
	.icofont-jumping:before
	{
		content: "\\edb0";
	}
	.icofont-kick:before
	{
		content: "\\edb1";
	}
	.icofont-leg:before
	{
		content: "\\edb2";
	}
	.icofont-match-review:before
	{
		content: "\\edb3";
	}
	.icofont-medal-sport:before
	{
		content: "\\edb4";
	}
	.icofont-offside:before
	{
		content: "\\edb5";
	}
	.icofont-olympic-logo:before
	{
		content: "\\edb6";
	}
	.icofont-olympic:before
	{
		content: "\\edb7";
	}
	.icofont-padding:before
	{
		content: "\\edb8";
	}
	.icofont-penalty-card:before
	{
		content: "\\edb9";
	}
	.icofont-racer:before
	{
		content: "\\edba";
	}
	.icofont-racing-car:before
	{
		content: "\\edbb";
	}
	.icofont-racing-flag-alt:before
	{
		content: "\\edbc";
	}
	.icofont-racing-flag:before
	{
		content: "\\edbd";
	}
	.icofont-racings-wheel:before
	{
		content: "\\edbe";
	}
	.icofont-referee:before
	{
		content: "\\edbf";
	}
	.icofont-refree-jersey:before
	{
		content: "\\edc0";
	}
	.icofont-result-sport:before
	{
		content: "\\edc1";
	}
	.icofont-rugby-ball:before
	{
		content: "\\edc2";
	}
	.icofont-rugby-player:before
	{
		content: "\\edc3";
	}
	.icofont-rugby:before
	{
		content: "\\edc4";
	}
	.icofont-runner-alt-1:before
	{
		content: "\\edc5";
	}
	.icofont-runner-alt-2:before
	{
		content: "\\edc6";
	}
	.icofont-runner:before
	{
		content: "\\edc7";
	}
	.icofont-score-board:before
	{
		content: "\\edc8";
	}
	.icofont-skiing-man:before
	{
		content: "\\edc9";
	}
	.icofont-skydiving-goggles:before
	{
		content: "\\edca";
	}
	.icofont-snow-mobile:before
	{
		content: "\\edcb";
	}
	.icofont-steering:before
	{
		content: "\\edcc";
	}
	.icofont-stopwatch:before
	{
		content: "\\edcd";
	}
	.icofont-substitute:before
	{
		content: "\\edce";
	}
	.icofont-swimmer:before
	{
		content: "\\edcf";
	}
	.icofont-table-tennis:before
	{
		content: "\\edd0";
	}
	.icofont-team-alt:before
	{
		content: "\\edd1";
	}
	.icofont-team:before
	{
		content: "\\edd2";
	}
	.icofont-tennis-player:before
	{
		content: "\\edd3";
	}
	.icofont-tennis:before
	{
		content: "\\edd4";
	}
	.icofont-tracking:before
	{
		content: "\\edd5";
	}
	.icofont-trophy-alt:before
	{
		content: "\\edd6";
	}
	.icofont-trophy:before
	{
		content: "\\edd7";
	}
	.icofont-volleyball-alt:before
	{
		content: "\\edd8";
	}
	.icofont-volleyball-fire:before
	{
		content: "\\edd9";
	}
	.icofont-volleyball:before
	{
		content: "\\edda";
	}
	.icofont-water-bottle:before
	{
		content: "\\eddb";
	}
	.icofont-whistle-alt:before
	{
		content: "\\eddc";
	}
	.icofont-whistle:before
	{
		content: "\\eddd";
	}
	.icofont-win-trophy:before
	{
		content: "\\edde";
	}
	.icofont-align-center:before
	{
		content: "\\eddf";
	}
	.icofont-align-left:before
	{
		content: "\\ede0";
	}
	.icofont-align-right:before
	{
		content: "\\ede1";
	}
	.icofont-all-caps:before
	{
		content: "\\ede2";
	}
	.icofont-bold:before
	{
		content: "\\ede3";
	}
	.icofont-brush:before
	{
		content: "\\ede4";
	}
	.icofont-clip-board:before
	{
		content: "\\ede5";
	}
	.icofont-code-alt:before
	{
		content: "\\ede6";
	}
	.icofont-color-bucket:before
	{
		content: "\\ede7";
	}
	.icofont-color-picker:before
	{
		content: "\\ede8";
	}
	.icofont-copy-invert:before
	{
		content: "\\ede9";
	}
	.icofont-copy:before
	{
		content: "\\edea";
	}
	.icofont-cut:before
	{
		content: "\\edeb";
	}
	.icofont-delete-alt:before
	{
		content: "\\edec";
	}
	.icofont-edit-alt:before
	{
		content: "\\eded";
	}
	.icofont-eraser-alt:before
	{
		content: "\\edee";
	}
	.icofont-font:before
	{
		content: "\\edef";
	}
	.icofont-heading:before
	{
		content: "\\edf0";
	}
	.icofont-indent:before
	{
		content: "\\edf1";
	}
	.icofont-italic-alt:before
	{
		content: "\\edf2";
	}
	.icofont-italic:before
	{
		content: "\\edf3";
	}
	.icofont-justify-all:before
	{
		content: "\\edf4";
	}
	.icofont-justify-center:before
	{
		content: "\\edf5";
	}
	.icofont-justify-left:before
	{
		content: "\\edf6";
	}
	.icofont-justify-right:before
	{
		content: "\\edf7";
	}
	.icofont-link-broken:before
	{
		content: "\\edf8";
	}
	.icofont-outdent:before
	{
		content: "\\edf9";
	}
	.icofont-paper-clip:before
	{
		content: "\\edfa";
	}
	.icofont-paragraph:before
	{
		content: "\\edfb";
	}
	.icofont-pin:before
	{
		content: "\\edfc";
	}
	.icofont-printer:before
	{
		content: "\\edfd";
	}
	.icofont-redo:before
	{
		content: "\\edfe";
	}
	.icofont-rotation:before
	{
		content: "\\edff";
	}
	.icofont-save:before
	{
		content: "\\ee00";
	}
	.icofont-small-cap:before
	{
		content: "\\ee01";
	}
	.icofont-strike-through:before
	{
		content: "\\ee02";
	}
	.icofont-sub-listing:before
	{
		content: "\\ee03";
	}
	.icofont-subscript:before
	{
		content: "\\ee04";
	}
	.icofont-superscript:before
	{
		content: "\\ee05";
	}
	.icofont-table:before
	{
		content: "\\ee06";
	}
	.icofont-text-height:before
	{
		content: "\\ee07";
	}
	.icofont-text-width:before
	{
		content: "\\ee08";
	}
	.icofont-trash:before
	{
		content: "\\ee09";
	}
	.icofont-underline:before
	{
		content: "\\ee0a";
	}
	.icofont-undo:before
	{
		content: "\\ee0b";
	}
	.icofont-air-balloon:before
	{
		content: "\\ee0c";
	}
	.icofont-airplane-alt:before
	{
		content: "\\ee0d";
	}
	.icofont-airplane:before
	{
		content: "\\ee0e";
	}
	.icofont-articulated-truck:before
	{
		content: "\\ee0f";
	}
	.icofont-auto-mobile:before
	{
		content: "\\ee10";
	}
	.icofont-auto-rickshaw:before
	{
		content: "\\ee11";
	}
	.icofont-bicycle-alt-1:before
	{
		content: "\\ee12";
	}
	.icofont-bicycle-alt-2:before
	{
		content: "\\ee13";
	}
	.icofont-bicycle:before
	{
		content: "\\ee14";
	}
	.icofont-bus-alt-1:before
	{
		content: "\\ee15";
	}
	.icofont-bus-alt-2:before
	{
		content: "\\ee16";
	}
	.icofont-bus-alt-3:before
	{
		content: "\\ee17";
	}
	.icofont-bus:before
	{
		content: "\\ee18";
	}
	.icofont-cab:before
	{
		content: "\\ee19";
	}
	.icofont-cable-car:before
	{
		content: "\\ee1a";
	}
	.icofont-car-alt-1:before
	{
		content: "\\ee1b";
	}
	.icofont-car-alt-2:before
	{
		content: "\\ee1c";
	}
	.icofont-car-alt-3:before
	{
		content: "\\ee1d";
	}
	.icofont-car-alt-4:before
	{
		content: "\\ee1e";
	}
	.icofont-car:before
	{
		content: "\\ee1f";
	}
	.icofont-delivery-time:before
	{
		content: "\\ee20";
	}
	.icofont-fast-delivery:before
	{
		content: "\\ee21";
	}
	.icofont-fire-truck-alt:before
	{
		content: "\\ee22";
	}
	.icofont-fire-truck:before
	{
		content: "\\ee23";
	}
	.icofont-free-delivery:before
	{
		content: "\\ee24";
	}
	.icofont-helicopter:before
	{
		content: "\\ee25";
	}
	.icofont-motor-bike-alt:before
	{
		content: "\\ee26";
	}
	.icofont-motor-bike:before
	{
		content: "\\ee27";
	}
	.icofont-motor-biker:before
	{
		content: "\\ee28";
	}
	.icofont-oil-truck:before
	{
		content: "\\ee29";
	}
	.icofont-rickshaw:before
	{
		content: "\\ee2a";
	}
	.icofont-rocket-alt-1:before
	{
		content: "\\ee2b";
	}
	.icofont-rocket-alt-2:before
	{
		content: "\\ee2c";
	}
	.icofont-rocket:before
	{
		content: "\\ee2d";
	}
	.icofont-sail-boat-alt-1:before
	{
		content: "\\ee2e";
	}
	.icofont-sail-boat-alt-2:before
	{
		content: "\\ee2f";
	}
	.icofont-sail-boat:before
	{
		content: "\\ee30";
	}
	.icofont-scooter:before
	{
		content: "\\ee31";
	}
	.icofont-sea-plane:before
	{
		content: "\\ee32";
	}
	.icofont-ship-alt:before
	{
		content: "\\ee33";
	}
	.icofont-ship:before
	{
		content: "\\ee34";
	}
	.icofont-speed-boat:before
	{
		content: "\\ee35";
	}
	.icofont-taxi:before
	{
		content: "\\ee36";
	}
	.icofont-tractor:before
	{
		content: "\\ee37";
	}
	.icofont-train-line:before
	{
		content: "\\ee38";
	}
	.icofont-train-steam:before
	{
		content: "\\ee39";
	}
	.icofont-tram:before
	{
		content: "\\ee3a";
	}
	.icofont-truck-alt:before
	{
		content: "\\ee3b";
	}
	.icofont-truck-loaded:before
	{
		content: "\\ee3c";
	}
	.icofont-truck:before
	{
		content: "\\ee3d";
	}
	.icofont-van-alt:before
	{
		content: "\\ee3e";
	}
	.icofont-van:before
	{
		content: "\\ee3f";
	}
	.icofont-yacht:before
	{
		content: "\\ee40";
	}
	.icofont-5-star-hotel:before
	{
		content: "\\ee41";
	}
	.icofont-air-ticket:before
	{
		content: "\\ee42";
	}
	.icofont-beach-bed:before
	{
		content: "\\ee43";
	}
	.icofont-beach:before
	{
		content: "\\ee44";
	}
	.icofont-camping-vest:before
	{
		content: "\\ee45";
	}
	.icofont-direction-sign:before
	{
		content: "\\ee46";
	}
	.icofont-hill-side:before
	{
		content: "\\ee47";
	}
	.icofont-hill:before
	{
		content: "\\ee48";
	}
	.icofont-hotel:before
	{
		content: "\\ee49";
	}
	.icofont-island-alt:before
	{
		content: "\\ee4a";
	}
	.icofont-island:before
	{
		content: "\\ee4b";
	}
	.icofont-sandals-female:before
	{
		content: "\\ee4c";
	}
	.icofont-sandals-male:before
	{
		content: "\\ee4d";
	}
	.icofont-travelling:before
	{
		content: "\\ee4e";
	}
	.icofont-breakdown:before
	{
		content: "\\ee4f";
	}
	.icofont-celsius:before
	{
		content: "\\ee50";
	}
	.icofont-clouds:before
	{
		content: "\\ee51";
	}
	.icofont-cloudy:before
	{
		content: "\\ee52";
	}
	.icofont-dust:before
	{
		content: "\\ee53";
	}
	.icofont-eclipse:before
	{
		content: "\\ee54";
	}
	.icofont-fahrenheit:before
	{
		content: "\\ee55";
	}
	.icofont-forest-fire:before
	{
		content: "\\ee56";
	}
	.icofont-full-night:before
	{
		content: "\\ee57";
	}
	.icofont-full-sunny:before
	{
		content: "\\ee58";
	}
	.icofont-hail-night:before
	{
		content: "\\ee59";
	}
	.icofont-hail-rainy-night:before
	{
		content: "\\ee5a";
	}
	.icofont-hail-rainy-sunny:before
	{
		content: "\\ee5b";
	}
	.icofont-hail-rainy:before
	{
		content: "\\ee5c";
	}
	.icofont-hail-sunny:before
	{
		content: "\\ee5d";
	}
	.icofont-hail-thunder-night:before
	{
		content: "\\ee5e";
	}
	.icofont-hail-thunder-sunny:before
	{
		content: "\\ee5f";
	}
	.icofont-hail-thunder:before
	{
		content: "\\ee60";
	}
	.icofont-hail:before
	{
		content: "\\ee61";
	}
	.icofont-hill-night:before
	{
		content: "\\ee62";
	}
	.icofont-hill-sunny:before
	{
		content: "\\ee63";
	}
	.icofont-hurricane:before
	{
		content: "\\ee64";
	}
	.icofont-meteor:before
	{
		content: "\\ee65";
	}
	.icofont-night:before
	{
		content: "\\ee66";
	}
	.icofont-rainy-night:before
	{
		content: "\\ee67";
	}
	.icofont-rainy-sunny:before
	{
		content: "\\ee68";
	}
	.icofont-rainy-thunder:before
	{
		content: "\\ee69";
	}
	.icofont-rainy:before
	{
		content: "\\ee6a";
	}
	.icofont-snow-alt:before
	{
		content: "\\ee6b";
	}
	.icofont-snow-flake:before
	{
		content: "\\ee6c";
	}
	.icofont-snow-temp:before
	{
		content: "\\ee6d";
	}
	.icofont-snow:before
	{
		content: "\\ee6e";
	}
	.icofont-snowy-hail:before
	{
		content: "\\ee6f";
	}
	.icofont-snowy-night-hail:before
	{
		content: "\\ee70";
	}
	.icofont-snowy-night-rainy:before
	{
		content: "\\ee71";
	}
	.icofont-snowy-night:before
	{
		content: "\\ee72";
	}
	.icofont-snowy-rainy:before
	{
		content: "\\ee73";
	}
	.icofont-snowy-sunny-hail:before
	{
		content: "\\ee74";
	}
	.icofont-snowy-sunny-rainy:before
	{
		content: "\\ee75";
	}
	.icofont-snowy-sunny:before
	{
		content: "\\ee76";
	}
	.icofont-snowy-thunder-night:before
	{
		content: "\\ee77";
	}
	.icofont-snowy-thunder-sunny:before
	{
		content: "\\ee78";
	}
	.icofont-snowy-thunder:before
	{
		content: "\\ee79";
	}
	.icofont-snowy-windy-night:before
	{
		content: "\\ee7a";
	}
	.icofont-snowy-windy-sunny:before
	{
		content: "\\ee7b";
	}
	.icofont-snowy-windy:before
	{
		content: "\\ee7c";
	}
	.icofont-snowy:before
	{
		content: "\\ee7d";
	}
	.icofont-sun-alt:before
	{
		content: "\\ee7e";
	}
	.icofont-sun-rise:before
	{
		content: "\\ee7f";
	}
	.icofont-sun-set:before
	{
		content: "\\ee80";
	}
	.icofont-sun:before
	{
		content: "\\ee81";
	}
	.icofont-sunny-day-temp:before
	{
		content: "\\ee82";
	}
	.icofont-sunny:before
	{
		content: "\\ee83";
	}
	.icofont-thunder-light:before
	{
		content: "\\ee84";
	}
	.icofont-tornado:before
	{
		content: "\\ee85";
	}
	.icofont-umbrella-alt:before
	{
		content: "\\ee86";
	}
	.icofont-umbrella:before
	{
		content: "\\ee87";
	}
	.icofont-volcano:before
	{
		content: "\\ee88";
	}
	.icofont-wave:before
	{
		content: "\\ee89";
	}
	.icofont-wind-scale-0:before
	{
		content: "\\ee8a";
	}
	.icofont-wind-scale-1:before
	{
		content: "\\ee8b";
	}
	.icofont-wind-scale-10:before
	{
		content: "\\ee8c";
	}
	.icofont-wind-scale-11:before
	{
		content: "\\ee8d";
	}
	.icofont-wind-scale-12:before
	{
		content: "\\ee8e";
	}
	.icofont-wind-scale-2:before
	{
		content: "\\ee8f";
	}
	.icofont-wind-scale-3:before
	{
		content: "\\ee90";
	}
	.icofont-wind-scale-4:before
	{
		content: "\\ee91";
	}
	.icofont-wind-scale-5:before
	{
		content: "\\ee92";
	}
	.icofont-wind-scale-6:before
	{
		content: "\\ee93";
	}
	.icofont-wind-scale-7:before
	{
		content: "\\ee94";
	}
	.icofont-wind-scale-8:before
	{
		content: "\\ee95";
	}
	.icofont-wind-scale-9:before
	{
		content: "\\ee96";
	}
	.icofont-wind-waves:before
	{
		content: "\\ee97";
	}
	.icofont-wind:before
	{
		content: "\\ee98";
	}
	.icofont-windy-hail:before
	{
		content: "\\ee99";
	}
	.icofont-windy-night:before
	{
		content: "\\ee9a";
	}
	.icofont-windy-raining:before
	{
		content: "\\ee9b";
	}
	.icofont-windy-sunny:before
	{
		content: "\\ee9c";
	}
	.icofont-windy-thunder-raining:before
	{
		content: "\\ee9d";
	}
	.icofont-windy-thunder:before
	{
		content: "\\ee9e";
	}
	.icofont-windy:before
	{
		content: "\\ee9f";
	}
	.icofont-addons:before
	{
		content: "\\eea0";
	}
	.icofont-address-book:before
	{
		content: "\\eea1";
	}
	.icofont-adjust:before
	{
		content: "\\eea2";
	}
	.icofont-alarm:before
	{
		content: "\\eea3";
	}
	.icofont-anchor:before
	{
		content: "\\eea4";
	}
	.icofont-archive:before
	{
		content: "\\eea5";
	}
	.icofont-at:before
	{
		content: "\\eea6";
	}
	.icofont-attachment:before
	{
		content: "\\eea7";
	}
	.icofont-audio:before
	{
		content: "\\eea8";
	}
	.icofont-automation:before
	{
		content: "\\eea9";
	}
	.icofont-badge:before
	{
		content: "\\eeaa";
	}
	.icofont-bag-alt:before
	{
		content: "\\eeab";
	}
	.icofont-bag:before
	{
		content: "\\eeac";
	}
	.icofont-ban:before
	{
		content: "\\eead";
	}
	.icofont-bar-code:before
	{
		content: "\\eeae";
	}
	.icofont-bars:before
	{
		content: "\\eeaf";
	}
	.icofont-basket:before
	{
		content: "\\eeb0";
	}
	.icofont-battery-empty:before
	{
		content: "\\eeb1";
	}
	.icofont-battery-full:before
	{
		content: "\\eeb2";
	}
	.icofont-battery-half:before
	{
		content: "\\eeb3";
	}
	.icofont-battery-low:before
	{
		content: "\\eeb4";
	}
	.icofont-beaker:before
	{
		content: "\\eeb5";
	}
	.icofont-beard:before
	{
		content: "\\eeb6";
	}
	.icofont-bed:before
	{
		content: "\\eeb7";
	}
	.icofont-bell:before
	{
		content: "\\eeb8";
	}
	.icofont-beverage:before
	{
		content: "\\eeb9";
	}
	.icofont-bill:before
	{
		content: "\\eeba";
	}
	.icofont-bin:before
	{
		content: "\\eebb";
	}
	.icofont-binary:before
	{
		content: "\\eebc";
	}
	.icofont-binoculars:before
	{
		content: "\\eebd";
	}
	.icofont-bluetooth:before
	{
		content: "\\eebe";
	}
	.icofont-bomb:before
	{
		content: "\\eebf";
	}
	.icofont-book-mark:before
	{
		content: "\\eec0";
	}
	.icofont-box:before
	{
		content: "\\eec1";
	}
	.icofont-briefcase:before
	{
		content: "\\eec2";
	}
	.icofont-broken:before
	{
		content: "\\eec3";
	}
	.icofont-bucket:before
	{
		content: "\\eec4";
	}
	.icofont-bucket1:before
	{
		content: "\\eec5";
	}
	.icofont-bucket2:before
	{
		content: "\\eec6";
	}
	.icofont-bug:before
	{
		content: "\\eec7";
	}
	.icofont-building:before
	{
		content: "\\eec8";
	}
	.icofont-bulb-alt:before
	{
		content: "\\eec9";
	}
	.icofont-bullet:before
	{
		content: "\\eeca";
	}
	.icofont-bullhorn:before
	{
		content: "\\eecb";
	}
	.icofont-bullseye:before
	{
		content: "\\eecc";
	}
	.icofont-calendar:before
	{
		content: "\\eecd";
	}
	.icofont-camera-alt:before
	{
		content: "\\eece";
	}
	.icofont-camera:before
	{
		content: "\\eecf";
	}
	.icofont-card:before
	{
		content: "\\eed0";
	}
	.icofont-cart-alt:before
	{
		content: "\\eed1";
	}
	.icofont-cart:before
	{
		content: "\\eed2";
	}
	.icofont-cc:before
	{
		content: "\\eed3";
	}
	.icofont-charging:before
	{
		content: "\\eed4";
	}
	.icofont-chat:before
	{
		content: "\\eed5";
	}
	.icofont-check-alt:before
	{
		content: "\\eed6";
	}
	.icofont-check-circled:before
	{
		content: "\\eed7";
	}
	.icofont-check:before
	{
		content: "\\eed8";
	}
	.icofont-checked:before
	{
		content: "\\eed9";
	}
	.icofont-children-care:before
	{
		content: "\\eeda";
	}
	.icofont-clip:before
	{
		content: "\\eedb";
	}
	.icofont-clock-time:before
	{
		content: "\\eedc";
	}
	.icofont-close-circled:before
	{
		content: "\\eedd";
	}
	.icofont-close-line-circled:before
	{
		content: "\\eede";
	}
	.icofont-close-line-squared-alt:before
	{
		content: "\\eedf";
	}
	.icofont-close-line-squared:before
	{
		content: "\\eee0";
	}
	.icofont-close-line:before
	{
		content: "\\eee1";
	}
	.icofont-close-squared-alt:before
	{
		content: "\\eee2";
	}
	.icofont-close-squared:before
	{
		content: "\\eee3";
	}
	.icofont-close:before
	{
		content: "\\eee4";
	}
	.icofont-cloud-download:before
	{
		content: "\\eee5";
	}
	.icofont-cloud-refresh:before
	{
		content: "\\eee6";
	}
	.icofont-cloud-upload:before
	{
		content: "\\eee7";
	}
	.icofont-cloud:before
	{
		content: "\\eee8";
	}
	.icofont-code-not-allowed:before
	{
		content: "\\eee9";
	}
	.icofont-code:before
	{
		content: "\\eeea";
	}
	.icofont-comment:before
	{
		content: "\\eeeb";
	}
	.icofont-compass-alt:before
	{
		content: "\\eeec";
	}
	.icofont-compass:before
	{
		content: "\\eeed";
	}
	.icofont-computer:before
	{
		content: "\\eeee";
	}
	.icofont-connection:before
	{
		content: "\\eeef";
	}
	.icofont-console:before
	{
		content: "\\eef0";
	}
	.icofont-contacts:before
	{
		content: "\\eef1";
	}
	.icofont-contrast:before
	{
		content: "\\eef2";
	}
	.icofont-copyright:before
	{
		content: "\\eef3";
	}
	.icofont-credit-card:before
	{
		content: "\\eef4";
	}
	.icofont-crop:before
	{
		content: "\\eef5";
	}
	.icofont-crown:before
	{
		content: "\\eef6";
	}
	.icofont-cube:before
	{
		content: "\\eef7";
	}
	.icofont-cubes:before
	{
		content: "\\eef8";
	}
	.icofont-dashboard-web:before
	{
		content: "\\eef9";
	}
	.icofont-dashboard:before
	{
		content: "\\eefa";
	}
	.icofont-data:before
	{
		content: "\\eefb";
	}
	.icofont-database-add:before
	{
		content: "\\eefc";
	}
	.icofont-database-locked:before
	{
		content: "\\eefd";
	}
	.icofont-database-remove:before
	{
		content: "\\eefe";
	}
	.icofont-database:before
	{
		content: "\\eeff";
	}
	.icofont-delete:before
	{
		content: "\\ef00";
	}
	.icofont-diamond:before
	{
		content: "\\ef01";
	}
	.icofont-dice-multiple:before
	{
		content: "\\ef02";
	}
	.icofont-dice:before
	{
		content: "\\ef03";
	}
	.icofont-disc:before
	{
		content: "\\ef04";
	}
	.icofont-diskette:before
	{
		content: "\\ef05";
	}
	.icofont-document-folder:before
	{
		content: "\\ef06";
	}
	.icofont-download-alt:before
	{
		content: "\\ef07";
	}
	.icofont-download:before
	{
		content: "\\ef08";
	}
	.icofont-downloaded:before
	{
		content: "\\ef09";
	}
	.icofont-drag:before
	{
		content: "\\ef0a";
	}
	.icofont-drag1:before
	{
		content: "\\ef0b";
	}
	.icofont-drag2:before
	{
		content: "\\ef0c";
	}
	.icofont-drag3:before
	{
		content: "\\ef0d";
	}
	.icofont-earth:before
	{
		content: "\\ef0e";
	}
	.icofont-ebook:before
	{
		content: "\\ef0f";
	}
	.icofont-edit:before
	{
		content: "\\ef10";
	}
	.icofont-eject:before
	{
		content: "\\ef11";
	}
	.icofont-email:before
	{
		content: "\\ef12";
	}
	.icofont-envelope-open:before
	{
		content: "\\ef13";
	}
	.icofont-envelope:before
	{
		content: "\\ef14";
	}
	.icofont-eraser:before
	{
		content: "\\ef15";
	}
	.icofont-error:before
	{
		content: "\\ef16";
	}
	.icofont-excavator:before
	{
		content: "\\ef17";
	}
	.icofont-exchange:before
	{
		content: "\\ef18";
	}
	.icofont-exclamation-circle:before
	{
		content: "\\ef19";
	}
	.icofont-exclamation-square:before
	{
		content: "\\ef1a";
	}
	.icofont-exclamation-tringle:before
	{
		content: "\\ef1b";
	}
	.icofont-exclamation:before
	{
		content: "\\ef1c";
	}
	.icofont-exit:before
	{
		content: "\\ef1d";
	}
	.icofont-expand:before
	{
		content: "\\ef1e";
	}
	.icofont-external-link:before
	{
		content: "\\ef1f";
	}
	.icofont-external:before
	{
		content: "\\ef20";
	}
	.icofont-eye-alt:before
	{
		content: "\\ef21";
	}
	.icofont-eye-blocked:before
	{
		content: "\\ef22";
	}
	.icofont-eye-dropper:before
	{
		content: "\\ef23";
	}
	.icofont-eye:before
	{
		content: "\\ef24";
	}
	.icofont-favourite:before
	{
		content: "\\ef25";
	}
	.icofont-fax:before
	{
		content: "\\ef26";
	}
	.icofont-file-fill:before
	{
		content: "\\ef27";
	}
	.icofont-film:before
	{
		content: "\\ef28";
	}
	.icofont-filter:before
	{
		content: "\\ef29";
	}
	.icofont-fire-alt:before
	{
		content: "\\ef2a";
	}
	.icofont-fire-burn:before
	{
		content: "\\ef2b";
	}
	.icofont-fire:before
	{
		content: "\\ef2c";
	}
	.icofont-flag-alt-1:before
	{
		content: "\\ef2d";
	}
	.icofont-flag-alt-2:before
	{
		content: "\\ef2e";
	}
	.icofont-flag:before
	{
		content: "\\ef2f";
	}
	.icofont-flame-torch:before
	{
		content: "\\ef30";
	}
	.icofont-flash-light:before
	{
		content: "\\ef31";
	}
	.icofont-flash:before
	{
		content: "\\ef32";
	}
	.icofont-flask:before
	{
		content: "\\ef33";
	}
	.icofont-focus:before
	{
		content: "\\ef34";
	}
	.icofont-folder-open:before
	{
		content: "\\ef35";
	}
	.icofont-folder:before
	{
		content: "\\ef36";
	}
	.icofont-foot-print:before
	{
		content: "\\ef37";
	}
	.icofont-garbage:before
	{
		content: "\\ef38";
	}
	.icofont-gear-alt:before
	{
		content: "\\ef39";
	}
	.icofont-gear:before
	{
		content: "\\ef3a";
	}
	.icofont-gears:before
	{
		content: "\\ef3b";
	}
	.icofont-gift:before
	{
		content: "\\ef3c";
	}
	.icofont-glass:before
	{
		content: "\\ef3d";
	}
	.icofont-globe:before
	{
		content: "\\ef3e";
	}
	.icofont-graffiti:before
	{
		content: "\\ef3f";
	}
	.icofont-grocery:before
	{
		content: "\\ef40";
	}
	.icofont-hand:before
	{
		content: "\\ef41";
	}
	.icofont-hanger:before
	{
		content: "\\ef42";
	}
	.icofont-hard-disk:before
	{
		content: "\\ef43";
	}
	.icofont-heart-alt:before
	{
		content: "\\ef44";
	}
	.icofont-heart:before
	{
		content: "\\ef45";
	}
	.icofont-history:before
	{
		content: "\\ef46";
	}
	.icofont-home:before
	{
		content: "\\ef47";
	}
	.icofont-horn:before
	{
		content: "\\ef48";
	}
	.icofont-hour-glass:before
	{
		content: "\\ef49";
	}
	.icofont-id:before
	{
		content: "\\ef4a";
	}
	.icofont-image:before
	{
		content: "\\ef4b";
	}
	.icofont-inbox:before
	{
		content: "\\ef4c";
	}
	.icofont-infinite:before
	{
		content: "\\ef4d";
	}
	.icofont-info-circle:before
	{
		content: "\\ef4e";
	}
	.icofont-info-square:before
	{
		content: "\\ef4f";
	}
	.icofont-info:before
	{
		content: "\\ef50";
	}
	.icofont-institution:before
	{
		content: "\\ef51";
	}
	.icofont-interface:before
	{
		content: "\\ef52";
	}
	.icofont-invisible:before
	{
		content: "\\ef53";
	}
	.icofont-jacket:before
	{
		content: "\\ef54";
	}
	.icofont-jar:before
	{
		content: "\\ef55";
	}
	.icofont-jewlery:before
	{
		content: "\\ef56";
	}
	.icofont-karate:before
	{
		content: "\\ef57";
	}
	.icofont-key-hole:before
	{
		content: "\\ef58";
	}
	.icofont-key:before
	{
		content: "\\ef59";
	}
	.icofont-label:before
	{
		content: "\\ef5a";
	}
	.icofont-lamp:before
	{
		content: "\\ef5b";
	}
	.icofont-layers:before
	{
		content: "\\ef5c";
	}
	.icofont-layout:before
	{
		content: "\\ef5d";
	}
	.icofont-leaf:before
	{
		content: "\\ef5e";
	}
	.icofont-leaflet:before
	{
		content: "\\ef5f";
	}
	.icofont-learn:before
	{
		content: "\\ef60";
	}
	.icofont-lego:before
	{
		content: "\\ef61";
	}
	.icofont-lens:before
	{
		content: "\\ef62";
	}
	.icofont-letter:before
	{
		content: "\\ef63";
	}
	.icofont-letterbox:before
	{
		content: "\\ef64";
	}
	.icofont-library:before
	{
		content: "\\ef65";
	}
	.icofont-license:before
	{
		content: "\\ef66";
	}
	.icofont-life-bouy:before
	{
		content: "\\ef67";
	}
	.icofont-life-buoy:before
	{
		content: "\\ef68";
	}
	.icofont-life-jacket:before
	{
		content: "\\ef69";
	}
	.icofont-life-ring:before
	{
		content: "\\ef6a";
	}
	.icofont-light-bulb:before
	{
		content: "\\ef6b";
	}
	.icofont-lighter:before
	{
		content: "\\ef6c";
	}
	.icofont-lightning-ray:before
	{
		content: "\\ef6d";
	}
	.icofont-like:before
	{
		content: "\\ef6e";
	}
	.icofont-line-height:before
	{
		content: "\\ef6f";
	}
	.icofont-link-alt:before
	{
		content: "\\ef70";
	}
	.icofont-link:before
	{
		content: "\\ef71";
	}
	.icofont-list:before
	{
		content: "\\ef72";
	}
	.icofont-listening:before
	{
		content: "\\ef73";
	}
	.icofont-listine-dots:before
	{
		content: "\\ef74";
	}
	.icofont-listing-box:before
	{
		content: "\\ef75";
	}
	.icofont-listing-number:before
	{
		content: "\\ef76";
	}
	.icofont-live-support:before
	{
		content: "\\ef77";
	}
	.icofont-location-arrow:before
	{
		content: "\\ef78";
	}
	.icofont-location-pin:before
	{
		content: "\\ef79";
	}
	.icofont-lock:before
	{
		content: "\\ef7a";
	}
	.icofont-login:before
	{
		content: "\\ef7b";
	}
	.icofont-logout:before
	{
		content: "\\ef7c";
	}
	.icofont-lollipop:before
	{
		content: "\\ef7d";
	}
	.icofont-long-drive:before
	{
		content: "\\ef7e";
	}
	.icofont-look:before
	{
		content: "\\ef7f";
	}
	.icofont-loop:before
	{
		content: "\\ef80";
	}
	.icofont-luggage:before
	{
		content: "\\ef81";
	}
	.icofont-lunch:before
	{
		content: "\\ef82";
	}
	.icofont-lungs:before
	{
		content: "\\ef83";
	}
	.icofont-magic-alt:before
	{
		content: "\\ef84";
	}
	.icofont-magic:before
	{
		content: "\\ef85";
	}
	.icofont-magnet:before
	{
		content: "\\ef86";
	}
	.icofont-mail-box:before
	{
		content: "\\ef87";
	}
	.icofont-mail:before
	{
		content: "\\ef88";
	}
	.icofont-male:before
	{
		content: "\\ef89";
	}
	.icofont-map-pins:before
	{
		content: "\\ef8a";
	}
	.icofont-map:before
	{
		content: "\\ef8b";
	}
	.icofont-maximize:before
	{
		content: "\\ef8c";
	}
	.icofont-measure:before
	{
		content: "\\ef8d";
	}
	.icofont-medicine:before
	{
		content: "\\ef8e";
	}
	.icofont-mega-phone:before
	{
		content: "\\ef8f";
	}
	.icofont-megaphone-alt:before
	{
		content: "\\ef90";
	}
	.icofont-megaphone:before
	{
		content: "\\ef91";
	}
	.icofont-memorial:before
	{
		content: "\\ef92";
	}
	.icofont-memory-card:before
	{
		content: "\\ef93";
	}
	.icofont-mic-mute:before
	{
		content: "\\ef94";
	}
	.icofont-mic:before
	{
		content: "\\ef95";
	}
	.icofont-military:before
	{
		content: "\\ef96";
	}
	.icofont-mill:before
	{
		content: "\\ef97";
	}
	.icofont-minus-circle:before
	{
		content: "\\ef98";
	}
	.icofont-minus-square:before
	{
		content: "\\ef99";
	}
	.icofont-minus:before
	{
		content: "\\ef9a";
	}
	.icofont-mobile-phone:before
	{
		content: "\\ef9b";
	}
	.icofont-molecule:before
	{
		content: "\\ef9c";
	}
	.icofont-money:before
	{
		content: "\\ef9d";
	}
	.icofont-moon:before
	{
		content: "\\ef9e";
	}
	.icofont-mop:before
	{
		content: "\\ef9f";
	}
	.icofont-muffin:before
	{
		content: "\\efa0";
	}
	.icofont-mustache:before
	{
		content: "\\efa1";
	}
	.icofont-navigation-menu:before
	{
		content: "\\efa2";
	}
	.icofont-navigation:before
	{
		content: "\\efa3";
	}
	.icofont-network-tower:before
	{
		content: "\\efa4";
	}
	.icofont-network:before
	{
		content: "\\efa5";
	}
	.icofont-news:before
	{
		content: "\\efa6";
	}
	.icofont-newspaper:before
	{
		content: "\\efa7";
	}
	.icofont-no-smoking:before
	{
		content: "\\efa8";
	}
	.icofont-not-allowed:before
	{
		content: "\\efa9";
	}
	.icofont-notebook:before
	{
		content: "\\efaa";
	}
	.icofont-notepad:before
	{
		content: "\\efab";
	}
	.icofont-notification:before
	{
		content: "\\efac";
	}
	.icofont-numbered:before
	{
		content: "\\efad";
	}
	.icofont-opposite:before
	{
		content: "\\efae";
	}
	.icofont-optic:before
	{
		content: "\\efaf";
	}
	.icofont-options:before
	{
		content: "\\efb0";
	}
	.icofont-package:before
	{
		content: "\\efb1";
	}
	.icofont-page:before
	{
		content: "\\efb2";
	}
	.icofont-paint:before
	{
		content: "\\efb3";
	}
	.icofont-paper-plane:before
	{
		content: "\\efb4";
	}
	.icofont-paperclip:before
	{
		content: "\\efb5";
	}
	.icofont-papers:before
	{
		content: "\\efb6";
	}
	.icofont-pay:before
	{
		content: "\\efb7";
	}
	.icofont-penguin-linux:before
	{
		content: "\\efb8";
	}
	.icofont-pestle:before
	{
		content: "\\efb9";
	}
	.icofont-phone-circle:before
	{
		content: "\\efba";
	}
	.icofont-phone:before
	{
		content: "\\efbb";
	}
	.icofont-picture:before
	{
		content: "\\efbc";
	}
	.icofont-pine:before
	{
		content: "\\efbd";
	}
	.icofont-pixels:before
	{
		content: "\\efbe";
	}
	.icofont-plugin:before
	{
		content: "\\efbf";
	}
	.icofont-plus-circle:before
	{
		content: "\\efc0";
	}
	.icofont-plus-square:before
	{
		content: "\\efc1";
	}
	.icofont-plus:before
	{
		content: "\\efc2";
	}
	.icofont-polygonal:before
	{
		content: "\\efc3";
	}
	.icofont-power:before
	{
		content: "\\efc4";
	}
	.icofont-price:before
	{
		content: "\\efc5";
	}
	.icofont-print:before
	{
		content: "\\efc6";
	}
	.icofont-puzzle:before
	{
		content: "\\efc7";
	}
	.icofont-qr-code:before
	{
		content: "\\efc8";
	}
	.icofont-queen:before
	{
		content: "\\efc9";
	}
	.icofont-question-circle:before
	{
		content: "\\efca";
	}
	.icofont-question-square:before
	{
		content: "\\efcb";
	}
	.icofont-question:before
	{
		content: "\\efcc";
	}
	.icofont-quote-left:before
	{
		content: "\\efcd";
	}
	.icofont-quote-right:before
	{
		content: "\\efce";
	}
	.icofont-random:before
	{
		content: "\\efcf";
	}
	.icofont-recycle:before
	{
		content: "\\efd0";
	}
	.icofont-refresh:before
	{
		content: "\\efd1";
	}
	.icofont-repair:before
	{
		content: "\\efd2";
	}
	.icofont-reply-all:before
	{
		content: "\\efd3";
	}
	.icofont-reply:before
	{
		content: "\\efd4";
	}
	.icofont-resize:before
	{
		content: "\\efd5";
	}
	.icofont-responsive:before
	{
		content: "\\efd6";
	}
	.icofont-retweet:before
	{
		content: "\\efd7";
	}
	.icofont-road:before
	{
		content: "\\efd8";
	}
	.icofont-robot:before
	{
		content: "\\efd9";
	}
	.icofont-royal:before
	{
		content: "\\efda";
	}
	.icofont-rss-feed:before
	{
		content: "\\efdb";
	}
	.icofont-safety:before
	{
		content: "\\efdc";
	}
	.icofont-sale-discount:before
	{
		content: "\\efdd";
	}
	.icofont-satellite:before
	{
		content: "\\efde";
	}
	.icofont-send-mail:before
	{
		content: "\\efdf";
	}
	.icofont-server:before
	{
		content: "\\efe0";
	}
	.icofont-settings-alt:before
	{
		content: "\\efe1";
	}
	.icofont-settings:before
	{
		content: "\\efe2";
	}
	.icofont-share-alt:before
	{
		content: "\\efe3";
	}
	.icofont-share-boxed:before
	{
		content: "\\efe4";
	}
	.icofont-share:before
	{
		content: "\\efe5";
	}
	.icofont-shield:before
	{
		content: "\\efe6";
	}
	.icofont-shopping-cart:before
	{
		content: "\\efe7";
	}
	.icofont-sign-in:before
	{
		content: "\\efe8";
	}
	.icofont-sign-out:before
	{
		content: "\\efe9";
	}
	.icofont-signal:before
	{
		content: "\\efea";
	}
	.icofont-site-map:before
	{
		content: "\\efeb";
	}
	.icofont-smart-phone:before
	{
		content: "\\efec";
	}
	.icofont-soccer:before
	{
		content: "\\efed";
	}
	.icofont-sort-alt:before
	{
		content: "\\efee";
	}
	.icofont-sort:before
	{
		content: "\\efef";
	}
	.icofont-space:before
	{
		content: "\\eff0";
	}
	.icofont-spanner:before
	{
		content: "\\eff1";
	}
	.icofont-speech-comments:before
	{
		content: "\\eff2";
	}
	.icofont-speed-meter:before
	{
		content: "\\eff3";
	}
	.icofont-spinner-alt-1:before
	{
		content: "\\eff4";
	}
	.icofont-spinner-alt-2:before
	{
		content: "\\eff5";
	}
	.icofont-spinner-alt-3:before
	{
		content: "\\eff6";
	}
	.icofont-spinner-alt-4:before
	{
		content: "\\eff7";
	}
	.icofont-spinner-alt-5:before
	{
		content: "\\eff8";
	}
	.icofont-spinner-alt-6:before
	{
		content: "\\eff9";
	}
	.icofont-spinner:before
	{
		content: "\\effa";
	}
	.icofont-spreadsheet:before
	{
		content: "\\effb";
	}
	.icofont-square:before
	{
		content: "\\effc";
	}
	.icofont-ssl-security:before
	{
		content: "\\effd";
	}
	.icofont-star-alt-1:before
	{
		content: "\\effe";
	}
	.icofont-star-alt-2:before
	{
		content: "\\efff";
	}
	.icofont-star:before
	{
		content: "\f000";
	}
	.icofont-street-view:before
	{
		content: "\f001";
	}
	.icofont-support-faq:before
	{
		content: "\f002";
	}
	.icofont-tack-pin:before
	{
		content: "\f003";
	}
	.icofont-tag:before
	{
		content: "\f004";
	}
	.icofont-tags:before
	{
		content: "\f005";
	}
	.icofont-tasks-alt:before
	{
		content: "\f006";
	}
	.icofont-tasks:before
	{
		content: "\f007";
	}
	.icofont-telephone:before
	{
		content: "\f008";
	}
	.icofont-telescope:before
	{
		content: "\f009";
	}
	.icofont-terminal:before
	{
		content: "\f00a";
	}
	.icofont-thumbs-down:before
	{
		content: "\f00b";
	}
	.icofont-thumbs-up:before
	{
		content: "\f00c";
	}
	.icofont-tick-boxed:before
	{
		content: "\f00d";
	}
	.icofont-tick-mark:before
	{
		content: "\f00e";
	}
	.icofont-ticket:before
	{
		content: "\f00f";
	}
	.icofont-tie:before
	{
		content: "\f010";
	}
	.icofont-toggle-off:before
	{
		content: "\f011";
	}
	.icofont-toggle-on:before
	{
		content: "\f012";
	}
	.icofont-tools-alt-2:before
	{
		content: "\f013";
	}
	.icofont-tools:before
	{
		content: "\f014";
	}
	.icofont-touch:before
	{
		content: "\f015";
	}
	.icofont-traffic-light:before
	{
		content: "\f016";
	}
	.icofont-transparent:before
	{
		content: "\f017";
	}
	.icofont-tree:before
	{
		content: "\f018";
	}
	.icofont-unique-idea:before
	{
		content: "\f019";
	}
	.icofont-unlock:before
	{
		content: "\f01a";
	}
	.icofont-unlocked:before
	{
		content: "\f01b";
	}
	.icofont-upload-alt:before
	{
		content: "\f01c";
	}
	.icofont-upload:before
	{
		content: "\f01d";
	}
	.icofont-usb-drive:before
	{
		content: "\f01e";
	}
	.icofont-usb:before
	{
		content: "\f01f";
	}
	.icofont-vector-path:before
	{
		content: "\f020";
	}
	.icofont-verification-check:before
	{
		content: "\f021";
	}
	.icofont-wall-clock:before
	{
		content: "\f022";
	}
	.icofont-wall:before
	{
		content: "\f023";
	}
	.icofont-wallet:before
	{
		content: "\f024";
	}
	.icofont-warning-alt:before
	{
		content: "\f025";
	}
	.icofont-warning:before
	{
		content: "\f026";
	}
	.icofont-water-drop:before
	{
		content: "\f027";
	}
	.icofont-web:before
	{
		content: "\f028";
	}
	.icofont-wheelchair:before
	{
		content: "\f029";
	}
	.icofont-wifi-alt:before
	{
		content: "\f02a";
	}
	.icofont-wifi:before
	{
		content: "\f02b";
	}
	.icofont-world:before
	{
		content: "\f02c";
	}
	.icofont-zigzag:before
	{
		content: "\f02d";
	}
	.icofont-zipped:before
	{
		content: "\f02e";
	}
	.icofont-xs
	{
		font-size: .5em;
	}
	.icofont-sm
	{
		font-size: .75em;
	}
	.icofont-md
	{
		font-size: 1.25em;
	}
	.icofont-lg
	{
		font-size: 1.5em;
	}
	.icofont-1x
	{
		font-size: 1em;
	}
	.icofont-2x
	{
		font-size: 2em;
	}
	.icofont-3x
	{
		font-size: 3em;
	}
	.icofont-4x
	{
		font-size: 4em;
	}
	.icofont-5x
	{
		font-size: 5em;
	}
	.icofont-6x
	{
		font-size: 6em;
	}
	.icofont-7x
	{
		font-size: 7em;
	}
	.icofont-8x
	{
		font-size: 8em;
	}
	.icofont-9x
	{
		font-size: 9em;
	}
	.icofont-10x
	{
		font-size: 10em;
	}
	.icofont-fw
	{
		text-align: center;
		width: 1.25em;
	}
	.icofont-ul
	{
		list-style-type: none;
		padding-left: 0;
		margin-left: 0;
	}
	.icofont-ul > li
	{
		position: relative;
		line-height: 2em;
	}
	.icofont-ul > li .icofont
	{
		display: inline-block;
		vertical-align: middle;
	}
	.icofont-border
	{
		border: solid 0.08em #f1f1f1;
		border-radius: .1em;
		padding: .2em .25em .15em;
	}
	.icofont-pull-left
	{
		float: left;
	}
	.icofont-pull-right
	{
		float: right;
	}
	.icofont.icofont-pull-left
	{
		margin-right: .3em;
	}
	.icofont.icofont-pull-right
	{
		margin-left: .3em;
	}
	.icofont-spin
	{
		-webkit-animation: icofont-spin 2s infinite linear;
		animation: icofont-spin 2s infinite linear;
		display: inline-block;
	}
	.icofont-pulse
	{
		-webkit-animation: icofont-spin 1s infinite steps(8);
		animation: icofont-spin 1s infinite steps(8);
		display: inline-block;
	}

	@-webkit-keyframes icofont-spin
	{
		0%
		{
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100%
		{
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes icofont-spin
	{
		0%
		{
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100%
		{
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	.icofont-rotate-90
	{
		-ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}
	.icofont-rotate-180
	{
		-ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	.icofont-rotate-270
	{
		-ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
	}
	.icofont-flip-horizontal
	{
		-ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
		-webkit-transform: scale(-1, 1);
		transform: scale(-1, 1);
	}
	.icofont-flip-vertical
	{
		-ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
		-webkit-transform: scale(1, -1);
		transform: scale(1, -1);
	}
	.icofont-flip-horizontal.icofont-flip-vertical
	{
		-ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
		-webkit-transform: scale(-1, -1);
		transform: scale(-1, -1);
	}

	:root .icofont-rotate-90,
		:root .icofont-rotate-180,
		:root .icofont-rotate-270,
		:root .icofont-flip-horizontal,
		:root .icofont-flip-vertical
	{
		-webkit-filter: none;
		filter: none;
		display: inline-block;
	}
	.icofont-inverse
	{
		color: #fff;
	}

	.sr-only
	{
		border: 0;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}

	.sr-only-focusable:active,
		.sr-only-focusable:focus
	{
		clip: auto;
		height: auto;
		margin: 0;
		overflow: visible;
		position: static;
		width: auto;
	}
	/*! * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) * Copyright 2022 Fonticons, Inc. */
	.fa {
		font-family: var(--fa-style-family, "Font Awesome 6 Free");
		font-weight: var(--fa-style, 900);
	}
	.fa,
	.fa-brands,
	.fa-duotone,
	.fa-light,
	.fa-regular,
	.fa-solid,
	.fa-thin,
	.fab,
	.fad,
	.fal,
	.far,
	.fas,
	.fat {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: var(--fa-display, inline-block);
		font-style: normal;
		font-variant: normal;
		line-height: 1;
		text-rendering: auto;
	}
	.fa-1x {
		font-size: 1em;
	}
	.fa-2x {
		font-size: 2em;
	}
	.fa-3x {
		font-size: 3em;
	}
	.fa-4x {
		font-size: 4em;
	}
	.fa-5x {
		font-size: 5em;
	}
	.fa-6x {
		font-size: 6em;
	}
	.fa-7x {
		font-size: 7em;
	}
	.fa-8x {
		font-size: 8em;
	}
	.fa-9x {
		font-size: 9em;
	}
	.fa-10x {
		font-size: 10em;
	}
	.fa-2xs {
		font-size: 0.625em;
		line-height: 0.1em;
		vertical-align: 0.225em;
	}
	.fa-xs {
		font-size: 0.75em;
		line-height: 0.08333em;
		vertical-align: 0.125em;
	}
	.fa-sm {
		font-size: 0.875em;
		line-height: 0.07143em;
		vertical-align: 0.05357em;
	}
	.fa-lg {
		font-size: 1.25em;
		line-height: 0.05em;
		vertical-align: -0.075em;
	}
	.fa-xl {
		font-size: 1.5em;
		line-height: 0.04167em;
		vertical-align: -0.125em;
	}
	.fa-2xl {
		font-size: 2em;
		line-height: 0.03125em;
		vertical-align: -0.1875em;
	}
	.fa-fw {
		text-align: center;
		width: 1.25em;
	}
	.fa-ul {
		list-style-type: none;
		margin-left: var(--fa-li-margin, 2.5em);
		padding-left: 0;
	}
	.fa-ul > li {
		position: relative;
	}
	.fa-li {
		left: calc(var(--fa-li-width, 2em) * -1);
		position: absolute;
		text-align: center;
		width: var(--fa-li-width, 2em);
		line-height: inherit;
	}
	.fa-border {
		border-radius: var(--fa-border-radius, 0.1em);
		border: var(--fa-border-width, 0.08em) var(--fa-border-style, solid)
			var(--fa-border-color, #eee);
		padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
	}
	.fa-pull-left {
		float: left;
		margin-right: var(--fa-pull-margin, 0.3em);
	}
	.fa-pull-right {
		float: right;
		margin-left: var(--fa-pull-margin, 0.3em);
	}
	.fa-beat {
		-webkit-animation-name: fa-beat;
		animation-name: fa-beat;
		-webkit-animation-delay: var(--fa-animation-delay, 0);
		animation-delay: var(--fa-animation-delay, 0);
		-webkit-animation-direction: var(--fa-animation-direction, normal);
		animation-direction: var(--fa-animation-direction, normal);
		-webkit-animation-duration: var(--fa-animation-duration, 1s);
		animation-duration: var(--fa-animation-duration, 1s);
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
		animation-timing-function: var(--fa-animation-timing, ease-in-out);
	}
	.fa-bounce {
		-webkit-animation-name: fa-bounce;
		animation-name: fa-bounce;
		-webkit-animation-delay: var(--fa-animation-delay, 0);
		animation-delay: var(--fa-animation-delay, 0);
		-webkit-animation-direction: var(--fa-animation-direction, normal);
		animation-direction: var(--fa-animation-direction, normal);
		-webkit-animation-duration: var(--fa-animation-duration, 1s);
		animation-duration: var(--fa-animation-duration, 1s);
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(
			--fa-animation-timing,
			cubic-bezier(0.28, 0.84, 0.42, 1)
		);
		animation-timing-function: var(
			--fa-animation-timing,
			cubic-bezier(0.28, 0.84, 0.42, 1)
		);
	}
	.fa-fade {
		-webkit-animation-name: fa-fade;
		animation-name: fa-fade;
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(
			--fa-animation-timing,
			cubic-bezier(0.4, 0, 0.6, 1)
		);
		animation-timing-function: var(
			--fa-animation-timing,
			cubic-bezier(0.4, 0, 0.6, 1)
		);
	}
	.fa-beat-fade,
	.fa-fade {
		-webkit-animation-delay: var(--fa-animation-delay, 0);
		animation-delay: var(--fa-animation-delay, 0);
		-webkit-animation-direction: var(--fa-animation-direction, normal);
		animation-direction: var(--fa-animation-direction, normal);
		-webkit-animation-duration: var(--fa-animation-duration, 1s);
		animation-duration: var(--fa-animation-duration, 1s);
	}
	.fa-beat-fade {
		-webkit-animation-name: fa-beat-fade;
		animation-name: fa-beat-fade;
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(
			--fa-animation-timing,
			cubic-bezier(0.4, 0, 0.6, 1)
		);
		animation-timing-function: var(
			--fa-animation-timing,
			cubic-bezier(0.4, 0, 0.6, 1)
		);
	}
	.fa-flip {
		-webkit-animation-name: fa-flip;
		animation-name: fa-flip;
		-webkit-animation-delay: var(--fa-animation-delay, 0);
		animation-delay: var(--fa-animation-delay, 0);
		-webkit-animation-direction: var(--fa-animation-direction, normal);
		animation-direction: var(--fa-animation-direction, normal);
		-webkit-animation-duration: var(--fa-animation-duration, 1s);
		animation-duration: var(--fa-animation-duration, 1s);
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
		animation-timing-function: var(--fa-animation-timing, ease-in-out);
	}
	.fa-shake {
		-webkit-animation-name: fa-shake;
		animation-name: fa-shake;
		-webkit-animation-duration: var(--fa-animation-duration, 1s);
		animation-duration: var(--fa-animation-duration, 1s);
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(--fa-animation-timing, linear);
		animation-timing-function: var(--fa-animation-timing, linear);
	}
	.fa-shake,
	.fa-spin {
		-webkit-animation-delay: var(--fa-animation-delay, 0);
		animation-delay: var(--fa-animation-delay, 0);
		-webkit-animation-direction: var(--fa-animation-direction, normal);
		animation-direction: var(--fa-animation-direction, normal);
	}
	.fa-spin {
		-webkit-animation-name: fa-spin;
		animation-name: fa-spin;
		-webkit-animation-duration: var(--fa-animation-duration, 2s);
		animation-duration: var(--fa-animation-duration, 2s);
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(--fa-animation-timing, linear);
		animation-timing-function: var(--fa-animation-timing, linear);
	}
	.fa-spin-reverse {
		--fa-animation-direction: reverse;
	}
	.fa-pulse,
	.fa-spin-pulse {
		-webkit-animation-name: fa-spin;
		animation-name: fa-spin;
		-webkit-animation-direction: var(--fa-animation-direction, normal);
		animation-direction: var(--fa-animation-direction, normal);
		-webkit-animation-duration: var(--fa-animation-duration, 1s);
		animation-duration: var(--fa-animation-duration, 1s);
		-webkit-animation-iteration-count: var(
			--fa-animation-iteration-count,
			infinite
		);
		animation-iteration-count: var(--fa-animation-iteration-count, infinite);
		-webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
		animation-timing-function: var(--fa-animation-timing, steps(8));
	}
	@media (prefers-reduced-motion: reduce) {
		.fa-beat,
		.fa-beat-fade,
		.fa-bounce,
		.fa-fade,
		.fa-flip,
		.fa-pulse,
		.fa-shake,
		.fa-spin,
		.fa-spin-pulse {
			-webkit-animation-delay: -1ms;
			animation-delay: -1ms;
			-webkit-animation-duration: 1ms;
			animation-duration: 1ms;
			-webkit-animation-iteration-count: 1;
			animation-iteration-count: 1;
			transition-delay: 0s;
			transition-duration: 0s;
		}
	}
	@-webkit-keyframes fa-beat {
		0%,
		90% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
		45% {
			-webkit-transform: scale(var(--fa-beat-scale, 1.25));
			transform: scale(var(--fa-beat-scale, 1.25));
		}
	}
	@keyframes fa-beat {
		0%,
		90% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
		45% {
			-webkit-transform: scale(var(--fa-beat-scale, 1.25));
			transform: scale(var(--fa-beat-scale, 1.25));
		}
	}
	@-webkit-keyframes fa-bounce {
		0% {
			-webkit-transform: scale(1) translateY(0);
			transform: scale(1) translateY(0);
		}
		10% {
			-webkit-transform: scale(
					var(--fa-bounce-start-scale-x, 1.1),
					var(--fa-bounce-start-scale-y, 0.9)
				)
				translateY(0);
			transform: scale(
					var(--fa-bounce-start-scale-x, 1.1),
					var(--fa-bounce-start-scale-y, 0.9)
				)
				translateY(0);
		}
		30% {
			-webkit-transform: scale(
					var(--fa-bounce-jump-scale-x, 0.9),
					var(--fa-bounce-jump-scale-y, 1.1)
				)
				translateY(var(--fa-bounce-height, -0.5em));
			transform: scale(
					var(--fa-bounce-jump-scale-x, 0.9),
					var(--fa-bounce-jump-scale-y, 1.1)
				)
				translateY(var(--fa-bounce-height, -0.5em));
		}
		50% {
			-webkit-transform: scale(
					var(--fa-bounce-land-scale-x, 1.05),
					var(--fa-bounce-land-scale-y, 0.95)
				)
				translateY(0);
			transform: scale(
					var(--fa-bounce-land-scale-x, 1.05),
					var(--fa-bounce-land-scale-y, 0.95)
				)
				translateY(0);
		}
		57% {
			-webkit-transform: scale(1) translateY(var(--fa-bounce-rebound, -0.125em));
			transform: scale(1) translateY(var(--fa-bounce-rebound, -0.125em));
		}
		64% {
			-webkit-transform: scale(1) translateY(0);
			transform: scale(1) translateY(0);
		}
		to {
			-webkit-transform: scale(1) translateY(0);
			transform: scale(1) translateY(0);
		}
	}
	@keyframes fa-bounce {
		0% {
			-webkit-transform: scale(1) translateY(0);
			transform: scale(1) translateY(0);
		}
		10% {
			-webkit-transform: scale(
					var(--fa-bounce-start-scale-x, 1.1),
					var(--fa-bounce-start-scale-y, 0.9)
				)
				translateY(0);
			transform: scale(
					var(--fa-bounce-start-scale-x, 1.1),
					var(--fa-bounce-start-scale-y, 0.9)
				)
				translateY(0);
		}
		30% {
			-webkit-transform: scale(
					var(--fa-bounce-jump-scale-x, 0.9),
					var(--fa-bounce-jump-scale-y, 1.1)
				)
				translateY(var(--fa-bounce-height, -0.5em));
			transform: scale(
					var(--fa-bounce-jump-scale-x, 0.9),
					var(--fa-bounce-jump-scale-y, 1.1)
				)
				translateY(var(--fa-bounce-height, -0.5em));
		}
		50% {
			-webkit-transform: scale(
					var(--fa-bounce-land-scale-x, 1.05),
					var(--fa-bounce-land-scale-y, 0.95)
				)
				translateY(0);
			transform: scale(
					var(--fa-bounce-land-scale-x, 1.05),
					var(--fa-bounce-land-scale-y, 0.95)
				)
				translateY(0);
		}
		57% {
			-webkit-transform: scale(1) translateY(var(--fa-bounce-rebound, -0.125em));
			transform: scale(1) translateY(var(--fa-bounce-rebound, -0.125em));
		}
		64% {
			-webkit-transform: scale(1) translateY(0);
			transform: scale(1) translateY(0);
		}
		to {
			-webkit-transform: scale(1) translateY(0);
			transform: scale(1) translateY(0);
		}
	}
	@-webkit-keyframes fa-fade {
		50% {
			opacity: var(--fa-fade-opacity, 0.4);
		}
	}
	@keyframes fa-fade {
		50% {
			opacity: var(--fa-fade-opacity, 0.4);
		}
	}
	@-webkit-keyframes fa-beat-fade {
		0%,
		to {
			opacity: var(--fa-beat-fade-opacity, 0.4);
			-webkit-transform: scale(1);
			transform: scale(1);
		}
		50% {
			opacity: 1;
			-webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
			transform: scale(var(--fa-beat-fade-scale, 1.125));
		}
	}
	@keyframes fa-beat-fade {
		0%,
		to {
			opacity: var(--fa-beat-fade-opacity, 0.4);
			-webkit-transform: scale(1);
			transform: scale(1);
		}
		50% {
			opacity: 1;
			-webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
			transform: scale(var(--fa-beat-fade-scale, 1.125));
		}
	}
	@-webkit-keyframes fa-flip {
		50% {
			-webkit-transform: rotate3d(
				var(--fa-flip-x, 0),
				var(--fa-flip-y, 1),
				var(--fa-flip-z, 0),
				var(--fa-flip-angle, -180deg)
			);
			transform: rotate3d(
				var(--fa-flip-x, 0),
				var(--fa-flip-y, 1),
				var(--fa-flip-z, 0),
				var(--fa-flip-angle, -180deg)
			);
		}
	}
	@keyframes fa-flip {
		50% {
			-webkit-transform: rotate3d(
				var(--fa-flip-x, 0),
				var(--fa-flip-y, 1),
				var(--fa-flip-z, 0),
				var(--fa-flip-angle, -180deg)
			);
			transform: rotate3d(
				var(--fa-flip-x, 0),
				var(--fa-flip-y, 1),
				var(--fa-flip-z, 0),
				var(--fa-flip-angle, -180deg)
			);
		}
	}
	@-webkit-keyframes fa-shake {
		0% {
			-webkit-transform: rotate(-15deg);
			transform: rotate(-15deg);
		}
		4% {
			-webkit-transform: rotate(15deg);
			transform: rotate(15deg);
		}
		8%,
		24% {
			-webkit-transform: rotate(-18deg);
			transform: rotate(-18deg);
		}
		12%,
		28% {
			-webkit-transform: rotate(18deg);
			transform: rotate(18deg);
		}
		16% {
			-webkit-transform: rotate(-22deg);
			transform: rotate(-22deg);
		}
		20% {
			-webkit-transform: rotate(22deg);
			transform: rotate(22deg);
		}
		32% {
			-webkit-transform: rotate(-12deg);
			transform: rotate(-12deg);
		}
		36% {
			-webkit-transform: rotate(12deg);
			transform: rotate(12deg);
		}
		40%,
		to {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
	}
	@keyframes fa-shake {
		0% {
			-webkit-transform: rotate(-15deg);
			transform: rotate(-15deg);
		}
		4% {
			-webkit-transform: rotate(15deg);
			transform: rotate(15deg);
		}
		8%,
		24% {
			-webkit-transform: rotate(-18deg);
			transform: rotate(-18deg);
		}
		12%,
		28% {
			-webkit-transform: rotate(18deg);
			transform: rotate(18deg);
		}
		16% {
			-webkit-transform: rotate(-22deg);
			transform: rotate(-22deg);
		}
		20% {
			-webkit-transform: rotate(22deg);
			transform: rotate(22deg);
		}
		32% {
			-webkit-transform: rotate(-12deg);
			transform: rotate(-12deg);
		}
		36% {
			-webkit-transform: rotate(12deg);
			transform: rotate(12deg);
		}
		40%,
		to {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
	}
	@-webkit-keyframes fa-spin {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn);
		}
	}
	@keyframes fa-spin {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn);
		}
	}
	.fa-rotate-90 {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}
	.fa-rotate-180 {
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	.fa-rotate-270 {
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
	}
	.fa-flip-horizontal {
		-webkit-transform: scaleX(-1);
		transform: scaleX(-1);
	}
	.fa-flip-vertical {
		-webkit-transform: scaleY(-1);
		transform: scaleY(-1);
	}
	.fa-flip-both,
	.fa-flip-horizontal.fa-flip-vertical {
		-webkit-transform: scale(-1);
		transform: scale(-1);
	}
	.fa-rotate-by {
		-webkit-transform: rotate(var(--fa-rotate-angle, none));
		transform: rotate(var(--fa-rotate-angle, none));
	}
	.fa-stack {
		display: inline-block;
		height: 2em;
		line-height: 2em;
		position: relative;
		vertical-align: middle;
		width: 2.5em;
	}
	.fa-stack-1x,
	.fa-stack-2x {
		left: 0;
		position: absolute;
		text-align: center;
		width: 100%;
		z-index: var(--fa-stack-z-index, auto);
	}
	.fa-stack-1x {
		line-height: inherit;
	}
	.fa-stack-2x {
		font-size: 2em;
	}
	.fa-inverse {
		color: var(--fa-inverse, #fff);
	}
	.fa-0:before {
		content: "\\30";
	}
	.fa-1:before {
		content: "\\31";
	}
	.fa-2:before {
		content: "\\32";
	}
	.fa-3:before {
		content: "\\33";
	}
	.fa-4:before {
		content: "\\34";
	}
	.fa-5:before {
		content: "\\35";
	}
	.fa-6:before {
		content: "\\36";
	}
	.fa-7:before {
		content: "\\37";
	}
	.fa-8:before {
		content: "\\38";
	}
	.fa-9:before {
		content: "\\39";
	}
	.fa-a:before {
		content: "\\41";
	}
	.fa-address-book:before,
	.fa-contact-book:before {
		content: "\\f2b9";
	}
	.fa-address-card:before,
	.fa-contact-card:before,
	.fa-vcard:before {
		content: "\\f2bb";
	}
	.fa-align-center:before {
		content: "\\f037";
	}
	.fa-align-justify:before {
		content: "\\f039";
	}
	.fa-align-left:before {
		content: "\\f036";
	}
	.fa-align-right:before {
		content: "\\f038";
	}
	.fa-anchor:before {
		content: "\\f13d";
	}
	.fa-anchor-circle-check:before {
		content: "\\e4aa";
	}
	.fa-anchor-circle-exclamation:before {
		content: "\\e4ab";
	}
	.fa-anchor-circle-xmark:before {
		content: "\\e4ac";
	}
	.fa-anchor-lock:before {
		content: "\\e4ad";
	}
	.fa-angle-down:before {
		content: "\\f107";
	}
	.fa-angle-left:before {
		content: "\\f104";
	}
	.fa-angle-right:before {
		content: "\\f105";
	}
	.fa-angle-up:before {
		content: "\\f106";
	}
	.fa-angle-double-down:before,
	.fa-angles-down:before {
		content: "\\f103";
	}
	.fa-angle-double-left:before,
	.fa-angles-left:before {
		content: "\\f100";
	}
	.fa-angle-double-right:before,
	.fa-angles-right:before {
		content: "\\f101";
	}
	.fa-angle-double-up:before,
	.fa-angles-up:before {
		content: "\\f102";
	}
	.fa-ankh:before {
		content: "\\f644";
	}
	.fa-apple-alt:before,
	.fa-apple-whole:before {
		content: "\\f5d1";
	}
	.fa-archway:before {
		content: "\\f557";
	}
	.fa-arrow-down:before {
		content: "\\f063";
	}
	.fa-arrow-down-1-9:before,
	.fa-sort-numeric-asc:before,
	.fa-sort-numeric-down:before {
		content: "\\f162";
	}
	.fa-arrow-down-9-1:before,
	.fa-sort-numeric-desc:before,
	.fa-sort-numeric-down-alt:before {
		content: "\\f886";
	}
	.fa-arrow-down-a-z:before,
	.fa-sort-alpha-asc:before,
	.fa-sort-alpha-down:before {
		content: "\\f15d";
	}
	.fa-arrow-down-long:before,
	.fa-long-arrow-down:before {
		content: "\\f175";
	}
	.fa-arrow-down-short-wide:before,
	.fa-sort-amount-desc:before,
	.fa-sort-amount-down-alt:before {
		content: "\\f884";
	}
	.fa-arrow-down-up-across-line:before {
		content: "\\e4af";
	}
	.fa-arrow-down-up-lock:before {
		content: "\\e4b0";
	}
	.fa-arrow-down-wide-short:before,
	.fa-sort-amount-asc:before,
	.fa-sort-amount-down:before {
		content: "\\f160";
	}
	.fa-arrow-down-z-a:before,
	.fa-sort-alpha-desc:before,
	.fa-sort-alpha-down-alt:before {
		content: "\\f881";
	}
	.fa-arrow-left:before {
		content: "\\f060";
	}
	.fa-arrow-left-long:before,
	.fa-long-arrow-left:before {
		content: "\\f177";
	}
	.fa-arrow-pointer:before,
	.fa-mouse-pointer:before {
		content: "\\f245";
	}
	.fa-arrow-right:before {
		content: "\\f061";
	}
	.fa-arrow-right-arrow-left:before,
	.fa-exchange:before {
		content: "\\f0ec";
	}
	.fa-arrow-right-from-bracket:before,
	.fa-sign-out:before {
		content: "\\f08b";
	}
	.fa-arrow-right-long:before,
	.fa-long-arrow-right:before {
		content: "\\f178";
	}
	.fa-arrow-right-to-bracket:before,
	.fa-sign-in:before {
		content: "\\f090";
	}
	.fa-arrow-right-to-city:before {
		content: "\\e4b3";
	}
	.fa-arrow-left-rotate:before,
	.fa-arrow-rotate-back:before,
	.fa-arrow-rotate-backward:before,
	.fa-arrow-rotate-left:before,
	.fa-undo:before {
		content: "\\f0e2";
	}
	.fa-arrow-right-rotate:before,
	.fa-arrow-rotate-forward:before,
	.fa-arrow-rotate-right:before,
	.fa-redo:before {
		content: "\\f01e";
	}
	.fa-arrow-trend-down:before {
		content: "\\e097";
	}
	.fa-arrow-trend-up:before {
		content: "\\e098";
	}
	.fa-arrow-turn-down:before,
	.fa-level-down:before {
		content: "\\f149";
	}
	.fa-arrow-turn-up:before,
	.fa-level-up:before {
		content: "\\f148";
	}
	.fa-arrow-up:before {
		content: "\\f062";
	}
	.fa-arrow-up-1-9:before,
	.fa-sort-numeric-up:before {
		content: "\\f163";
	}
	.fa-arrow-up-9-1:before,
	.fa-sort-numeric-up-alt:before {
		content: "\\f887";
	}
	.fa-arrow-up-a-z:before,
	.fa-sort-alpha-up:before {
		content: "\\f15e";
	}
	.fa-arrow-up-from-bracket:before {
		content: "\\e09a";
	}
	.fa-arrow-up-from-ground-water:before {
		content: "\\e4b5";
	}
	.fa-arrow-up-from-water-pump:before {
		content: "\\e4b6";
	}
	.fa-arrow-up-long:before,
	.fa-long-arrow-up:before {
		content: "\\f176";
	}
	.fa-arrow-up-right-dots:before {
		content: "\\e4b7";
	}
	.fa-arrow-up-right-from-square:before,
	.fa-external-link:before {
		content: "\\f08e";
	}
	.fa-arrow-up-short-wide:before,
	.fa-sort-amount-up-alt:before {
		content: "\\f885";
	}
	.fa-arrow-up-wide-short:before,
	.fa-sort-amount-up:before {
		content: "\\f161";
	}
	.fa-arrow-up-z-a:before,
	.fa-sort-alpha-up-alt:before {
		content: "\\f882";
	}
	.fa-arrows-down-to-line:before {
		content: "\\e4b8";
	}
	.fa-arrows-down-to-people:before {
		content: "\\e4b9";
	}
	.fa-arrows-h:before,
	.fa-arrows-left-right:before {
		content: "\\f07e";
	}
	.fa-arrows-left-right-to-line:before {
		content: "\\e4ba";
	}
	.fa-arrows-rotate:before,
	.fa-refresh:before,
	.fa-sync:before {
		content: "\\f021";
	}
	.fa-arrows-spin:before {
		content: "\\e4bb";
	}
	.fa-arrows-split-up-and-left:before {
		content: "\\e4bc";
	}
	.fa-arrows-to-circle:before {
		content: "\\e4bd";
	}
	.fa-arrows-to-dot:before {
		content: "\\e4be";
	}
	.fa-arrows-to-eye:before {
		content: "\\e4bf";
	}
	.fa-arrows-turn-right:before {
		content: "\\e4c0";
	}
	.fa-arrows-turn-to-dots:before {
		content: "\\e4c1";
	}
	.fa-arrows-up-down:before,
	.fa-arrows-v:before {
		content: "\\f07d";
	}
	.fa-arrows-up-down-left-right:before,
	.fa-arrows:before {
		content: "\\f047";
	}
	.fa-arrows-up-to-line:before {
		content: "\\e4c2";
	}
	.fa-asterisk:before {
		content: "\\2a";
	}
	.fa-at:before {
		content: "\\40";
	}
	.fa-atom:before {
		content: "\\f5d2";
	}
	.fa-audio-description:before {
		content: "\\f29e";
	}
	.fa-austral-sign:before {
		content: "\\e0a9";
	}
	.fa-award:before {
		content: "\\f559";
	}
	.fa-b:before {
		content: "\\42";
	}
	.fa-baby:before {
		content: "\\f77c";
	}
	.fa-baby-carriage:before,
	.fa-carriage-baby:before {
		content: "\\f77d";
	}
	.fa-backward:before {
		content: "\\f04a";
	}
	.fa-backward-fast:before,
	.fa-fast-backward:before {
		content: "\\f049";
	}
	.fa-backward-step:before,
	.fa-step-backward:before {
		content: "\\f048";
	}
	.fa-bacon:before {
		content: "\\f7e5";
	}
	.fa-bacteria:before {
		content: "\\e059";
	}
	.fa-bacterium:before {
		content: "\\e05a";
	}
	.fa-bag-shopping:before,
	.fa-shopping-bag:before {
		content: "\\f290";
	}
	.fa-bahai:before {
		content: "\\f666";
	}
	.fa-baht-sign:before {
		content: "\\e0ac";
	}
	.fa-ban:before,
	.fa-cancel:before {
		content: "\\f05e";
	}
	.fa-ban-smoking:before,
	.fa-smoking-ban:before {
		content: "\\f54d";
	}
	.fa-band-aid:before,
	.fa-bandage:before {
		content: "\\f462";
	}
	.fa-barcode:before {
		content: "\\f02a";
	}
	.fa-bars:before,
	.fa-navicon:before {
		content: "\\f0c9";
	}
	.fa-bars-progress:before,
	.fa-tasks-alt:before {
		content: "\\f828";
	}
	.fa-bars-staggered:before,
	.fa-reorder:before,
	.fa-stream:before {
		content: "\\f550";
	}
	.fa-baseball-ball:before,
	.fa-baseball:before {
		content: "\\f433";
	}
	.fa-baseball-bat-ball:before {
		content: "\\f432";
	}
	.fa-basket-shopping:before,
	.fa-shopping-basket:before {
		content: "\\f291";
	}
	.fa-basketball-ball:before,
	.fa-basketball:before {
		content: "\\f434";
	}
	.fa-bath:before,
	.fa-bathtub:before {
		content: "\\f2cd";
	}
	.fa-battery-0:before,
	.fa-battery-empty:before {
		content: "\\f244";
	}
	.fa-battery-5:before,
	.fa-battery-full:before,
	.fa-battery:before {
		content: "\\f240";
	}
	.fa-battery-3:before,
	.fa-battery-half:before {
		content: "\\f242";
	}
	.fa-battery-2:before,
	.fa-battery-quarter:before {
		content: "\\f243";
	}
	.fa-battery-4:before,
	.fa-battery-three-quarters:before {
		content: "\\f241";
	}
	.fa-bed:before {
		content: "\\f236";
	}
	.fa-bed-pulse:before,
	.fa-procedures:before {
		content: "\\f487";
	}
	.fa-beer-mug-empty:before,
	.fa-beer:before {
		content: "\\f0fc";
	}
	.fa-bell:before {
		content: "\\f0f3";
	}
	.fa-bell-concierge:before,
	.fa-concierge-bell:before {
		content: "\\f562";
	}
	.fa-bell-slash:before {
		content: "\\f1f6";
	}
	.fa-bezier-curve:before {
		content: "\\f55b";
	}
	.fa-bicycle:before {
		content: "\\f206";
	}
	.fa-binoculars:before {
		content: "\\f1e5";
	}
	.fa-biohazard:before {
		content: "\\f780";
	}
	.fa-bitcoin-sign:before {
		content: "\\e0b4";
	}
	.fa-blender:before {
		content: "\\f517";
	}
	.fa-blender-phone:before {
		content: "\\f6b6";
	}
	.fa-blog:before {
		content: "\\f781";
	}
	.fa-bold:before {
		content: "\\f032";
	}
	.fa-bolt:before,
	.fa-zap:before {
		content: "\\f0e7";
	}
	.fa-bolt-lightning:before {
		content: "\\e0b7";
	}
	.fa-bomb:before {
		content: "\\f1e2";
	}
	.fa-bone:before {
		content: "\\f5d7";
	}
	.fa-bong:before {
		content: "\\f55c";
	}
	.fa-book:before {
		content: "\\f02d";
	}
	.fa-atlas:before,
	.fa-book-atlas:before {
		content: "\\f558";
	}
	.fa-bible:before,
	.fa-book-bible:before {
		content: "\\f647";
	}
	.fa-book-bookmark:before {
		content: "\\e0bb";
	}
	.fa-book-journal-whills:before,
	.fa-journal-whills:before {
		content: "\\f66a";
	}
	.fa-book-medical:before {
		content: "\\f7e6";
	}
	.fa-book-open:before {
		content: "\\f518";
	}
	.fa-book-open-reader:before,
	.fa-book-reader:before {
		content: "\\f5da";
	}
	.fa-book-quran:before,
	.fa-quran:before {
		content: "\\f687";
	}
	.fa-book-dead:before,
	.fa-book-skull:before {
		content: "\\f6b7";
	}
	.fa-bookmark:before {
		content: "\\f02e";
	}
	.fa-border-all:before {
		content: "\\f84c";
	}
	.fa-border-none:before {
		content: "\\f850";
	}
	.fa-border-style:before,
	.fa-border-top-left:before {
		content: "\\f853";
	}
	.fa-bore-hole:before {
		content: "\\e4c3";
	}
	.fa-bottle-droplet:before {
		content: "\\e4c4";
	}
	.fa-bottle-water:before {
		content: "\\e4c5";
	}
	.fa-bowl-food:before {
		content: "\\e4c6";
	}
	.fa-bowl-rice:before {
		content: "\\e2eb";
	}
	.fa-bowling-ball:before {
		content: "\\f436";
	}
	.fa-box:before {
		content: "\\f466";
	}
	.fa-archive:before,
	.fa-box-archive:before {
		content: "\\f187";
	}
	.fa-box-open:before {
		content: "\\f49e";
	}
	.fa-box-tissue:before {
		content: "\\e05b";
	}
	.fa-boxes-packing:before {
		content: "\\e4c7";
	}
	.fa-boxes-alt:before,
	.fa-boxes-stacked:before,
	.fa-boxes:before {
		content: "\\f468";
	}
	.fa-braille:before {
		content: "\\f2a1";
	}
	.fa-brain:before {
		content: "\\f5dc";
	}
	.fa-brazilian-real-sign:before {
		content: "\\e46c";
	}
	.fa-bread-slice:before {
		content: "\\f7ec";
	}
	.fa-bridge:before {
		content: "\\e4c8";
	}
	.fa-bridge-circle-check:before {
		content: "\\e4c9";
	}
	.fa-bridge-circle-exclamation:before {
		content: "\\e4ca";
	}
	.fa-bridge-circle-xmark:before {
		content: "\\e4cb";
	}
	.fa-bridge-lock:before {
		content: "\\e4cc";
	}
	.fa-bridge-water:before {
		content: "\\e4ce";
	}
	.fa-briefcase:before {
		content: "\\f0b1";
	}
	.fa-briefcase-medical:before {
		content: "\\f469";
	}
	.fa-broom:before {
		content: "\\f51a";
	}
	.fa-broom-ball:before,
	.fa-quidditch-broom-ball:before,
	.fa-quidditch:before {
		content: "\\f458";
	}
	.fa-brush:before {
		content: "\\f55d";
	}
	.fa-bucket:before {
		content: "\\e4cf";
	}
	.fa-bug:before {
		content: "\\f188";
	}
	.fa-bug-slash:before {
		content: "\\e490";
	}
	.fa-bugs:before {
		content: "\\e4d0";
	}
	.fa-building:before {
		content: "\\f1ad";
	}
	.fa-building-circle-arrow-right:before {
		content: "\\e4d1";
	}
	.fa-building-circle-check:before {
		content: "\\e4d2";
	}
	.fa-building-circle-exclamation:before {
		content: "\\e4d3";
	}
	.fa-building-circle-xmark:before {
		content: "\\e4d4";
	}
	.fa-bank:before,
	.fa-building-columns:before,
	.fa-institution:before,
	.fa-museum:before,
	.fa-university:before {
		content: "\\f19c";
	}
	.fa-building-flag:before {
		content: "\\e4d5";
	}
	.fa-building-lock:before {
		content: "\\e4d6";
	}
	.fa-building-ngo:before {
		content: "\\e4d7";
	}
	.fa-building-shield:before {
		content: "\\e4d8";
	}
	.fa-building-un:before {
		content: "\\e4d9";
	}
	.fa-building-user:before {
		content: "\\e4da";
	}
	.fa-building-wheat:before {
		content: "\\e4db";
	}
	.fa-bullhorn:before {
		content: "\\f0a1";
	}
	.fa-bullseye:before {
		content: "\\f140";
	}
	.fa-burger:before,
	.fa-hamburger:before {
		content: "\\f805";
	}
	.fa-burst:before {
		content: "\\e4dc";
	}
	.fa-bus:before {
		content: "\\f207";
	}
	.fa-bus-alt:before,
	.fa-bus-simple:before {
		content: "\\f55e";
	}
	.fa-briefcase-clock:before,
	.fa-business-time:before {
		content: "\\f64a";
	}
	.fa-c:before {
		content: "\\43";
	}
	.fa-birthday-cake:before,
	.fa-cake-candles:before,
	.fa-cake:before {
		content: "\\f1fd";
	}
	.fa-calculator:before {
		content: "\\f1ec";
	}
	.fa-calendar:before {
		content: "\\f133";
	}
	.fa-calendar-check:before {
		content: "\\f274";
	}
	.fa-calendar-day:before {
		content: "\\f783";
	}
	.fa-calendar-alt:before,
	.fa-calendar-days:before {
		content: "\\f073";
	}
	.fa-calendar-minus:before {
		content: "\\f272";
	}
	.fa-calendar-plus:before {
		content: "\\f271";
	}
	.fa-calendar-week:before {
		content: "\\f784";
	}
	.fa-calendar-times:before,
	.fa-calendar-xmark:before {
		content: "\\f273";
	}
	.fa-camera-alt:before,
	.fa-camera:before {
		content: "\\f030";
	}
	.fa-camera-retro:before {
		content: "\\f083";
	}
	.fa-camera-rotate:before {
		content: "\\e0d8";
	}
	.fa-campground:before {
		content: "\\f6bb";
	}
	.fa-candy-cane:before {
		content: "\\f786";
	}
	.fa-cannabis:before {
		content: "\\f55f";
	}
	.fa-capsules:before {
		content: "\\f46b";
	}
	.fa-automobile:before,
	.fa-car:before {
		content: "\\f1b9";
	}
	.fa-battery-car:before,
	.fa-car-battery:before {
		content: "\\f5df";
	}
	.fa-car-burst:before,
	.fa-car-crash:before {
		content: "\\f5e1";
	}
	.fa-car-on:before {
		content: "\\e4dd";
	}
	.fa-car-alt:before,
	.fa-car-rear:before {
		content: "\\f5de";
	}
	.fa-car-side:before {
		content: "\\f5e4";
	}
	.fa-car-tunnel:before {
		content: "\\e4de";
	}
	.fa-caravan:before {
		content: "\\f8ff";
	}
	.fa-caret-down:before {
		content: "\\f0d7";
	}
	.fa-caret-left:before {
		content: "\\f0d9";
	}
	.fa-caret-right:before {
		content: "\\f0da";
	}
	.fa-caret-up:before {
		content: "\\f0d8";
	}
	.fa-carrot:before {
		content: "\\f787";
	}
	.fa-cart-arrow-down:before {
		content: "\\f218";
	}
	.fa-cart-flatbed:before,
	.fa-dolly-flatbed:before {
		content: "\\f474";
	}
	.fa-cart-flatbed-suitcase:before,
	.fa-luggage-cart:before {
		content: "\\f59d";
	}
	.fa-cart-plus:before {
		content: "\\f217";
	}
	.fa-cart-shopping:before,
	.fa-shopping-cart:before {
		content: "\\f07a";
	}
	.fa-cash-register:before {
		content: "\\f788";
	}
	.fa-cat:before {
		content: "\\f6be";
	}
	.fa-cedi-sign:before {
		content: "\\e0df";
	}
	.fa-cent-sign:before {
		content: "\\e3f5";
	}
	.fa-certificate:before {
		content: "\\f0a3";
	}
	.fa-chair:before {
		content: "\\f6c0";
	}
	.fa-blackboard:before,
	.fa-chalkboard:before {
		content: "\\f51b";
	}
	.fa-chalkboard-teacher:before,
	.fa-chalkboard-user:before {
		content: "\\f51c";
	}
	.fa-champagne-glasses:before,
	.fa-glass-cheers:before {
		content: "\\f79f";
	}
	.fa-charging-station:before {
		content: "\\f5e7";
	}
	.fa-area-chart:before,
	.fa-chart-area:before {
		content: "\\f1fe";
	}
	.fa-bar-chart:before,
	.fa-chart-bar:before {
		content: "\\f080";
	}
	.fa-chart-column:before {
		content: "\\e0e3";
	}
	.fa-chart-gantt:before {
		content: "\\e0e4";
	}
	.fa-chart-line:before,
	.fa-line-chart:before {
		content: "\\f201";
	}
	.fa-chart-pie:before,
	.fa-pie-chart:before {
		content: "\\f200";
	}
	.fa-chart-simple:before {
		content: "\\e473";
	}
	.fa-check:before {
		content: "\\f00c";
	}
	.fa-check-double:before {
		content: "\\f560";
	}
	.fa-check-to-slot:before,
	.fa-vote-yea:before {
		content: "\\f772";
	}
	.fa-cheese:before {
		content: "\\f7ef";
	}
	.fa-chess:before {
		content: "\\f439";
	}
	.fa-chess-bishop:before {
		content: "\\f43a";
	}
	.fa-chess-board:before {
		content: "\\f43c";
	}
	.fa-chess-king:before {
		content: "\\f43f";
	}
	.fa-chess-knight:before {
		content: "\\f441";
	}
	.fa-chess-pawn:before {
		content: "\\f443";
	}
	.fa-chess-queen:before {
		content: "\\f445";
	}
	.fa-chess-rook:before {
		content: "\\f447";
	}
	.fa-chevron-down:before {
		content: "\\f078";
	}
	.fa-chevron-left:before {
		content: "\\f053";
	}
	.fa-chevron-right:before {
		content: "\\f054";
	}
	.fa-chevron-up:before {
		content: "\\f077";
	}
	.fa-child:before {
		content: "\\f1ae";
	}
	.fa-child-dress:before {
		content: "\\e59c";
	}
	.fa-child-reaching:before {
		content: "\\e59d";
	}
	.fa-child-rifle:before {
		content: "\\e4e0";
	}
	.fa-children:before {
		content: "\\e4e1";
	}
	.fa-church:before {
		content: "\\f51d";
	}
	.fa-circle:before {
		content: "\\f111";
	}
	.fa-arrow-circle-down:before,
	.fa-circle-arrow-down:before {
		content: "\\f0ab";
	}
	.fa-arrow-circle-left:before,
	.fa-circle-arrow-left:before {
		content: "\\f0a8";
	}
	.fa-arrow-circle-right:before,
	.fa-circle-arrow-right:before {
		content: "\\f0a9";
	}
	.fa-arrow-circle-up:before,
	.fa-circle-arrow-up:before {
		content: "\\f0aa";
	}
	.fa-check-circle:before,
	.fa-circle-check:before {
		content: "\\f058";
	}
	.fa-chevron-circle-down:before,
	.fa-circle-chevron-down:before {
		content: "\\f13a";
	}
	.fa-chevron-circle-left:before,
	.fa-circle-chevron-left:before {
		content: "\\f137";
	}
	.fa-chevron-circle-right:before,
	.fa-circle-chevron-right:before {
		content: "\\f138";
	}
	.fa-chevron-circle-up:before,
	.fa-circle-chevron-up:before {
		content: "\\f139";
	}
	.fa-circle-dollar-to-slot:before,
	.fa-donate:before {
		content: "\\f4b9";
	}
	.fa-circle-dot:before,
	.fa-dot-circle:before {
		content: "\\f192";
	}
	.fa-arrow-alt-circle-down:before,
	.fa-circle-down:before {
		content: "\\f358";
	}
	.fa-circle-exclamation:before,
	.fa-exclamation-circle:before {
		content: "\\f06a";
	}
	.fa-circle-h:before,
	.fa-hospital-symbol:before {
		content: "\\f47e";
	}
	.fa-adjust:before,
	.fa-circle-half-stroke:before {
		content: "\\f042";
	}
	.fa-circle-info:before,
	.fa-info-circle:before {
		content: "\\f05a";
	}
	.fa-arrow-alt-circle-left:before,
	.fa-circle-left:before {
		content: "\\f359";
	}
	.fa-circle-minus:before,
	.fa-minus-circle:before {
		content: "\\f056";
	}
	.fa-circle-nodes:before {
		content: "\\e4e2";
	}
	.fa-circle-notch:before {
		content: "\\f1ce";
	}
	.fa-circle-pause:before,
	.fa-pause-circle:before {
		content: "\\f28b";
	}
	.fa-circle-play:before,
	.fa-play-circle:before {
		content: "\\f144";
	}
	.fa-circle-plus:before,
	.fa-plus-circle:before {
		content: "\\f055";
	}
	.fa-circle-question:before,
	.fa-question-circle:before {
		content: "\\f059";
	}
	.fa-circle-radiation:before,
	.fa-radiation-alt:before {
		content: "\\f7ba";
	}
	.fa-arrow-alt-circle-right:before,
	.fa-circle-right:before {
		content: "\\f35a";
	}
	.fa-circle-stop:before,
	.fa-stop-circle:before {
		content: "\\f28d";
	}
	.fa-arrow-alt-circle-up:before,
	.fa-circle-up:before {
		content: "\\f35b";
	}
	.fa-circle-user:before,
	.fa-user-circle:before {
		content: "\\f2bd";
	}
	.fa-circle-xmark:before,
	.fa-times-circle:before,
	.fa-xmark-circle:before {
		content: "\\f057";
	}
	.fa-city:before {
		content: "\\f64f";
	}
	.fa-clapperboard:before {
		content: "\\e131";
	}
	.fa-clipboard:before {
		content: "\\f328";
	}
	.fa-clipboard-check:before {
		content: "\\f46c";
	}
	.fa-clipboard-list:before {
		content: "\\f46d";
	}
	.fa-clipboard-question:before {
		content: "\\e4e3";
	}
	.fa-clipboard-user:before {
		content: "\\f7f3";
	}
	.fa-clock-four:before,
	.fa-clock:before {
		content: "\\f017";
	}
	.fa-clock-rotate-left:before,
	.fa-history:before {
		content: "\\f1da";
	}
	.fa-clone:before {
		content: "\\f24d";
	}
	.fa-closed-captioning:before {
		content: "\\f20a";
	}
	.fa-cloud:before {
		content: "\\f0c2";
	}
	.fa-cloud-arrow-down:before,
	.fa-cloud-download-alt:before,
	.fa-cloud-download:before {
		content: "\\f0ed";
	}
	.fa-cloud-arrow-up:before,
	.fa-cloud-upload-alt:before,
	.fa-cloud-upload:before {
		content: "\\f0ee";
	}
	.fa-cloud-bolt:before,
	.fa-thunderstorm:before {
		content: "\\f76c";
	}
	.fa-cloud-meatball:before {
		content: "\\f73b";
	}
	.fa-cloud-moon:before {
		content: "\\f6c3";
	}
	.fa-cloud-moon-rain:before {
		content: "\\f73c";
	}
	.fa-cloud-rain:before {
		content: "\\f73d";
	}
	.fa-cloud-showers-heavy:before {
		content: "\\f740";
	}
	.fa-cloud-showers-water:before {
		content: "\\e4e4";
	}
	.fa-cloud-sun:before {
		content: "\\f6c4";
	}
	.fa-cloud-sun-rain:before {
		content: "\\f743";
	}
	.fa-clover:before {
		content: "\\e139";
	}
	.fa-code:before {
		content: "\\f121";
	}
	.fa-code-branch:before {
		content: "\\f126";
	}
	.fa-code-commit:before {
		content: "\\f386";
	}
	.fa-code-compare:before {
		content: "\\e13a";
	}
	.fa-code-fork:before {
		content: "\\e13b";
	}
	.fa-code-merge:before {
		content: "\\f387";
	}
	.fa-code-pull-request:before {
		content: "\\e13c";
	}
	.fa-coins:before {
		content: "\\f51e";
	}
	.fa-colon-sign:before {
		content: "\\e140";
	}
	.fa-comment:before {
		content: "\\f075";
	}
	.fa-comment-dollar:before {
		content: "\\f651";
	}
	.fa-comment-dots:before,
	.fa-commenting:before {
		content: "\\f4ad";
	}
	.fa-comment-medical:before {
		content: "\\f7f5";
	}
	.fa-comment-slash:before {
		content: "\\f4b3";
	}
	.fa-comment-sms:before,
	.fa-sms:before {
		content: "\\f7cd";
	}
	.fa-comments:before {
		content: "\\f086";
	}
	.fa-comments-dollar:before {
		content: "\\f653";
	}
	.fa-compact-disc:before {
		content: "\\f51f";
	}
	.fa-compass:before {
		content: "\\f14e";
	}
	.fa-compass-drafting:before,
	.fa-drafting-compass:before {
		content: "\\f568";
	}
	.fa-compress:before {
		content: "\\f066";
	}
	.fa-computer:before {
		content: "\\e4e5";
	}
	.fa-computer-mouse:before,
	.fa-mouse:before {
		content: "\\f8cc";
	}
	.fa-cookie:before {
		content: "\\f563";
	}
	.fa-cookie-bite:before {
		content: "\\f564";
	}
	.fa-copy:before {
		content: "\\f0c5";
	}
	.fa-copyright:before {
		content: "\\f1f9";
	}
	.fa-couch:before {
		content: "\\f4b8";
	}
	.fa-cow:before {
		content: "\\f6c8";
	}
	.fa-credit-card-alt:before,
	.fa-credit-card:before {
		content: "\\f09d";
	}
	.fa-crop:before {
		content: "\\f125";
	}
	.fa-crop-alt:before,
	.fa-crop-simple:before {
		content: "\\f565";
	}
	.fa-cross:before {
		content: "\\f654";
	}
	.fa-crosshairs:before {
		content: "\\f05b";
	}
	.fa-crow:before {
		content: "\\f520";
	}
	.fa-crown:before {
		content: "\\f521";
	}
	.fa-crutch:before {
		content: "\\f7f7";
	}
	.fa-cruzeiro-sign:before {
		content: "\\e152";
	}
	.fa-cube:before {
		content: "\\f1b2";
	}
	.fa-cubes:before {
		content: "\\f1b3";
	}
	.fa-cubes-stacked:before {
		content: "\\e4e6";
	}
	.fa-d:before {
		content: "\\44";
	}
	.fa-database:before {
		content: "\\f1c0";
	}
	.fa-backspace:before,
	.fa-delete-left:before {
		content: "\\f55a";
	}
	.fa-democrat:before {
		content: "\\f747";
	}
	.fa-desktop-alt:before,
	.fa-desktop:before {
		content: "\\f390";
	}
	.fa-dharmachakra:before {
		content: "\\f655";
	}
	.fa-diagram-next:before {
		content: "\\e476";
	}
	.fa-diagram-predecessor:before {
		content: "\\e477";
	}
	.fa-diagram-project:before,
	.fa-project-diagram:before {
		content: "\\f542";
	}
	.fa-diagram-successor:before {
		content: "\\e47a";
	}
	.fa-diamond:before {
		content: "\\f219";
	}
	.fa-diamond-turn-right:before,
	.fa-directions:before {
		content: "\\f5eb";
	}
	.fa-dice:before {
		content: "\\f522";
	}
	.fa-dice-d20:before {
		content: "\\f6cf";
	}
	.fa-dice-d6:before {
		content: "\\f6d1";
	}
	.fa-dice-five:before {
		content: "\\f523";
	}
	.fa-dice-four:before {
		content: "\\f524";
	}
	.fa-dice-one:before {
		content: "\\f525";
	}
	.fa-dice-six:before {
		content: "\\f526";
	}
	.fa-dice-three:before {
		content: "\\f527";
	}
	.fa-dice-two:before {
		content: "\\f528";
	}
	.fa-disease:before {
		content: "\\f7fa";
	}
	.fa-display:before {
		content: "\\e163";
	}
	.fa-divide:before {
		content: "\\f529";
	}
	.fa-dna:before {
		content: "\\f471";
	}
	.fa-dog:before {
		content: "\\f6d3";
	}
	.fa-dollar-sign:before,
	.fa-dollar:before,
	.fa-usd:before {
		content: "\\24";
	}
	.fa-dolly-box:before,
	.fa-dolly:before {
		content: "\\f472";
	}
	.fa-dong-sign:before {
		content: "\\e169";
	}
	.fa-door-closed:before {
		content: "\\f52a";
	}
	.fa-door-open:before {
		content: "\\f52b";
	}
	.fa-dove:before {
		content: "\\f4ba";
	}
	.fa-compress-alt:before,
	.fa-down-left-and-up-right-to-center:before {
		content: "\\f422";
	}
	.fa-down-long:before,
	.fa-long-arrow-alt-down:before {
		content: "\\f309";
	}
	.fa-download:before {
		content: "\\f019";
	}
	.fa-dragon:before {
		content: "\\f6d5";
	}
	.fa-draw-polygon:before {
		content: "\\f5ee";
	}
	.fa-droplet:before,
	.fa-tint:before {
		content: "\\f043";
	}
	.fa-droplet-slash:before,
	.fa-tint-slash:before {
		content: "\\f5c7";
	}
	.fa-drum:before {
		content: "\\f569";
	}
	.fa-drum-steelpan:before {
		content: "\\f56a";
	}
	.fa-drumstick-bite:before {
		content: "\\f6d7";
	}
	.fa-dumbbell:before {
		content: "\\f44b";
	}
	.fa-dumpster:before {
		content: "\\f793";
	}
	.fa-dumpster-fire:before {
		content: "\\f794";
	}
	.fa-dungeon:before {
		content: "\\f6d9";
	}
	.fa-e:before {
		content: "\\45";
	}
	.fa-deaf:before,
	.fa-deafness:before,
	.fa-ear-deaf:before,
	.fa-hard-of-hearing:before {
		content: "\\f2a4";
	}
	.fa-assistive-listening-systems:before,
	.fa-ear-listen:before {
		content: "\\f2a2";
	}
	.fa-earth-africa:before,
	.fa-globe-africa:before {
		content: "\\f57c";
	}
	.fa-earth-america:before,
	.fa-earth-americas:before,
	.fa-earth:before,
	.fa-globe-americas:before {
		content: "\\f57d";
	}
	.fa-earth-asia:before,
	.fa-globe-asia:before {
		content: "\\f57e";
	}
	.fa-earth-europe:before,
	.fa-globe-europe:before {
		content: "\\f7a2";
	}
	.fa-earth-oceania:before,
	.fa-globe-oceania:before {
		content: "\\e47b";
	}
	.fa-egg:before {
		content: "\\f7fb";
	}
	.fa-eject:before {
		content: "\\f052";
	}
	.fa-elevator:before {
		content: "\\e16d";
	}
	.fa-ellipsis-h:before,
	.fa-ellipsis:before {
		content: "\\f141";
	}
	.fa-ellipsis-v:before,
	.fa-ellipsis-vertical:before {
		content: "\\f142";
	}
	.fa-envelope:before {
		content: "\\f0e0";
	}
	.fa-envelope-circle-check:before {
		content: "\\e4e8";
	}
	.fa-envelope-open:before {
		content: "\\f2b6";
	}
	.fa-envelope-open-text:before {
		content: "\\f658";
	}
	.fa-envelopes-bulk:before,
	.fa-mail-bulk:before {
		content: "\\f674";
	}
	.fa-equals:before {
		content: "\\3d";
	}
	.fa-eraser:before {
		content: "\\f12d";
	}
	.fa-ethernet:before {
		content: "\\f796";
	}
	.fa-eur:before,
	.fa-euro-sign:before,
	.fa-euro:before {
		content: "\\f153";
	}
	.fa-exclamation:before {
		content: "\\21";
	}
	.fa-expand:before {
		content: "\\f065";
	}
	.fa-explosion:before {
		content: "\\e4e9";
	}
	.fa-eye:before {
		content: "\\f06e";
	}
	.fa-eye-dropper-empty:before,
	.fa-eye-dropper:before,
	.fa-eyedropper:before {
		content: "\\f1fb";
	}
	.fa-eye-low-vision:before,
	.fa-low-vision:before {
		content: "\\f2a8";
	}
	.fa-eye-slash:before {
		content: "\\f070";
	}
	.fa-f:before {
		content: "\\46";
	}
	.fa-angry:before,
	.fa-face-angry:before {
		content: "\\f556";
	}
	.fa-dizzy:before,
	.fa-face-dizzy:before {
		content: "\\f567";
	}
	.fa-face-flushed:before,
	.fa-flushed:before {
		content: "\\f579";
	}
	.fa-face-frown:before,
	.fa-frown:before {
		content: "\\f119";
	}
	.fa-face-frown-open:before,
	.fa-frown-open:before {
		content: "\\f57a";
	}
	.fa-face-grimace:before,
	.fa-grimace:before {
		content: "\\f57f";
	}
	.fa-face-grin:before,
	.fa-grin:before {
		content: "\\f580";
	}
	.fa-face-grin-beam:before,
	.fa-grin-beam:before {
		content: "\\f582";
	}
	.fa-face-grin-beam-sweat:before,
	.fa-grin-beam-sweat:before {
		content: "\\f583";
	}
	.fa-face-grin-hearts:before,
	.fa-grin-hearts:before {
		content: "\\f584";
	}
	.fa-face-grin-squint:before,
	.fa-grin-squint:before {
		content: "\\f585";
	}
	.fa-face-grin-squint-tears:before,
	.fa-grin-squint-tears:before {
		content: "\\f586";
	}
	.fa-face-grin-stars:before,
	.fa-grin-stars:before {
		content: "\\f587";
	}
	.fa-face-grin-tears:before,
	.fa-grin-tears:before {
		content: "\\f588";
	}
	.fa-face-grin-tongue:before,
	.fa-grin-tongue:before {
		content: "\\f589";
	}
	.fa-face-grin-tongue-squint:before,
	.fa-grin-tongue-squint:before {
		content: "\\f58a";
	}
	.fa-face-grin-tongue-wink:before,
	.fa-grin-tongue-wink:before {
		content: "\\f58b";
	}
	.fa-face-grin-wide:before,
	.fa-grin-alt:before {
		content: "\\f581";
	}
	.fa-face-grin-wink:before,
	.fa-grin-wink:before {
		content: "\\f58c";
	}
	.fa-face-kiss:before,
	.fa-kiss:before {
		content: "\\f596";
	}
	.fa-face-kiss-beam:before,
	.fa-kiss-beam:before {
		content: "\\f597";
	}
	.fa-face-kiss-wink-heart:before,
	.fa-kiss-wink-heart:before {
		content: "\\f598";
	}
	.fa-face-laugh:before,
	.fa-laugh:before {
		content: "\\f599";
	}
	.fa-face-laugh-beam:before,
	.fa-laugh-beam:before {
		content: "\\f59a";
	}
	.fa-face-laugh-squint:before,
	.fa-laugh-squint:before {
		content: "\\f59b";
	}
	.fa-face-laugh-wink:before,
	.fa-laugh-wink:before {
		content: "\\f59c";
	}
	.fa-face-meh:before,
	.fa-meh:before {
		content: "\\f11a";
	}
	.fa-face-meh-blank:before,
	.fa-meh-blank:before {
		content: "\\f5a4";
	}
	.fa-face-rolling-eyes:before,
	.fa-meh-rolling-eyes:before {
		content: "\\f5a5";
	}
	.fa-face-sad-cry:before,
	.fa-sad-cry:before {
		content: "\\f5b3";
	}
	.fa-face-sad-tear:before,
	.fa-sad-tear:before {
		content: "\\f5b4";
	}
	.fa-face-smile:before,
	.fa-smile:before {
		content: "\\f118";
	}
	.fa-face-smile-beam:before,
	.fa-smile-beam:before {
		content: "\\f5b8";
	}
	.fa-face-smile-wink:before,
	.fa-smile-wink:before {
		content: "\\f4da";
	}
	.fa-face-surprise:before,
	.fa-surprise:before {
		content: "\\f5c2";
	}
	.fa-face-tired:before,
	.fa-tired:before {
		content: "\\f5c8";
	}
	.fa-fan:before {
		content: "\\f863";
	}
	.fa-faucet:before {
		content: "\\e005";
	}
	.fa-faucet-drip:before {
		content: "\\e006";
	}
	.fa-fax:before {
		content: "\\f1ac";
	}
	.fa-feather:before {
		content: "\\f52d";
	}
	.fa-feather-alt:before,
	.fa-feather-pointed:before {
		content: "\\f56b";
	}
	.fa-ferry:before {
		content: "\\e4ea";
	}
	.fa-file:before {
		content: "\\f15b";
	}
	.fa-file-arrow-down:before,
	.fa-file-download:before {
		content: "\\f56d";
	}
	.fa-file-arrow-up:before,
	.fa-file-upload:before {
		content: "\\f574";
	}
	.fa-file-audio:before {
		content: "\\f1c7";
	}
	.fa-file-circle-check:before {
		content: "\\e493";
	}
	.fa-file-circle-exclamation:before {
		content: "\\e4eb";
	}
	.fa-file-circle-minus:before {
		content: "\\e4ed";
	}
	.fa-file-circle-plus:before {
		content: "\\e4ee";
	}
	.fa-file-circle-question:before {
		content: "\\e4ef";
	}
	.fa-file-circle-xmark:before {
		content: "\\e494";
	}
	.fa-file-code:before {
		content: "\\f1c9";
	}
	.fa-file-contract:before {
		content: "\\f56c";
	}
	.fa-file-csv:before {
		content: "\\f6dd";
	}
	.fa-file-excel:before {
		content: "\\f1c3";
	}
	.fa-arrow-right-from-file:before,
	.fa-file-export:before {
		content: "\\f56e";
	}
	.fa-file-image:before {
		content: "\\f1c5";
	}
	.fa-arrow-right-to-file:before,
	.fa-file-import:before {
		content: "\\f56f";
	}
	.fa-file-invoice:before {
		content: "\\f570";
	}
	.fa-file-invoice-dollar:before {
		content: "\\f571";
	}
	.fa-file-alt:before,
	.fa-file-lines:before,
	.fa-file-text:before {
		content: "\\f15c";
	}
	.fa-file-medical:before {
		content: "\\f477";
	}
	.fa-file-pdf:before {
		content: "\\f1c1";
	}
	.fa-file-edit:before,
	.fa-file-pen:before {
		content: "\\f31c";
	}
	.fa-file-powerpoint:before {
		content: "\\f1c4";
	}
	.fa-file-prescription:before {
		content: "\\f572";
	}
	.fa-file-shield:before {
		content: "\\e4f0";
	}
	.fa-file-signature:before {
		content: "\\f573";
	}
	.fa-file-video:before {
		content: "\\f1c8";
	}
	.fa-file-medical-alt:before,
	.fa-file-waveform:before {
		content: "\\f478";
	}
	.fa-file-word:before {
		content: "\\f1c2";
	}
	.fa-file-archive:before,
	.fa-file-zipper:before {
		content: "\\f1c6";
	}
	.fa-fill:before {
		content: "\\f575";
	}
	.fa-fill-drip:before {
		content: "\\f576";
	}
	.fa-film:before {
		content: "\\f008";
	}
	.fa-filter:before {
		content: "\\f0b0";
	}
	.fa-filter-circle-dollar:before,
	.fa-funnel-dollar:before {
		content: "\\f662";
	}
	.fa-filter-circle-xmark:before {
		content: "\\e17b";
	}
	.fa-fingerprint:before {
		content: "\\f577";
	}
	.fa-fire:before {
		content: "\\f06d";
	}
	.fa-fire-burner:before {
		content: "\\e4f1";
	}
	.fa-fire-extinguisher:before {
		content: "\\f134";
	}
	.fa-fire-alt:before,
	.fa-fire-flame-curved:before {
		content: "\\f7e4";
	}
	.fa-burn:before,
	.fa-fire-flame-simple:before {
		content: "\\f46a";
	}
	.fa-fish:before {
		content: "\\f578";
	}
	.fa-fish-fins:before {
		content: "\\e4f2";
	}
	.fa-flag:before {
		content: "\\f024";
	}
	.fa-flag-checkered:before {
		content: "\\f11e";
	}
	.fa-flag-usa:before {
		content: "\\f74d";
	}
	.fa-flask:before {
		content: "\\f0c3";
	}
	.fa-flask-vial:before {
		content: "\\e4f3";
	}
	.fa-floppy-disk:before,
	.fa-save:before {
		content: "\\f0c7";
	}
	.fa-florin-sign:before {
		content: "\\e184";
	}
	.fa-folder-blank:before,
	.fa-folder:before {
		content: "\\f07b";
	}
	.fa-folder-closed:before {
		content: "\\e185";
	}
	.fa-folder-minus:before {
		content: "\\f65d";
	}
	.fa-folder-open:before {
		content: "\\f07c";
	}
	.fa-folder-plus:before {
		content: "\\f65e";
	}
	.fa-folder-tree:before {
		content: "\\f802";
	}
	.fa-font:before {
		content: "\\f031";
	}
	.fa-football-ball:before,
	.fa-football:before {
		content: "\\f44e";
	}
	.fa-forward:before {
		content: "\\f04e";
	}
	.fa-fast-forward:before,
	.fa-forward-fast:before {
		content: "\\f050";
	}
	.fa-forward-step:before,
	.fa-step-forward:before {
		content: "\\f051";
	}
	.fa-franc-sign:before {
		content: "\\e18f";
	}
	.fa-frog:before {
		content: "\\f52e";
	}
	.fa-futbol-ball:before,
	.fa-futbol:before,
	.fa-soccer-ball:before {
		content: "\\f1e3";
	}
	.fa-g:before {
		content: "\\47";
	}
	.fa-gamepad:before {
		content: "\\f11b";
	}
	.fa-gas-pump:before {
		content: "\\f52f";
	}
	.fa-dashboard:before,
	.fa-gauge-med:before,
	.fa-gauge:before,
	.fa-tachometer-alt-average:before {
		content: "\\f624";
	}
	.fa-gauge-high:before,
	.fa-tachometer-alt-fast:before,
	.fa-tachometer-alt:before {
		content: "\\f625";
	}
	.fa-gauge-simple-med:before,
	.fa-gauge-simple:before,
	.fa-tachometer-average:before {
		content: "\\f629";
	}
	.fa-gauge-simple-high:before,
	.fa-tachometer-fast:before,
	.fa-tachometer:before {
		content: "\\f62a";
	}
	.fa-gavel:before,
	.fa-legal:before {
		content: "\\f0e3";
	}
	.fa-cog:before,
	.fa-gear:before {
		content: "\\f013";
	}
	.fa-cogs:before,
	.fa-gears:before {
		content: "\\f085";
	}
	.fa-gem:before {
		content: "\\f3a5";
	}
	.fa-genderless:before {
		content: "\\f22d";
	}
	.fa-ghost:before {
		content: "\\f6e2";
	}
	.fa-gift:before {
		content: "\\f06b";
	}
	.fa-gifts:before {
		content: "\\f79c";
	}
	.fa-glass-water:before {
		content: "\\e4f4";
	}
	.fa-glass-water-droplet:before {
		content: "\\e4f5";
	}
	.fa-glasses:before {
		content: "\\f530";
	}
	.fa-globe:before {
		content: "\\f0ac";
	}
	.fa-golf-ball-tee:before,
	.fa-golf-ball:before {
		content: "\\f450";
	}
	.fa-gopuram:before {
		content: "\\f664";
	}
	.fa-graduation-cap:before,
	.fa-mortar-board:before {
		content: "\\f19d";
	}
	.fa-greater-than:before {
		content: "\\3e";
	}
	.fa-greater-than-equal:before {
		content: "\\f532";
	}
	.fa-grip-horizontal:before,
	.fa-grip:before {
		content: "\\f58d";
	}
	.fa-grip-lines:before {
		content: "\\f7a4";
	}
	.fa-grip-lines-vertical:before {
		content: "\\f7a5";
	}
	.fa-grip-vertical:before {
		content: "\\f58e";
	}
	.fa-group-arrows-rotate:before {
		content: "\\e4f6";
	}
	.fa-guarani-sign:before {
		content: "\\e19a";
	}
	.fa-guitar:before {
		content: "\\f7a6";
	}
	.fa-gun:before {
		content: "\\e19b";
	}
	.fa-h:before {
		content: "\\48";
	}
	.fa-hammer:before {
		content: "\\f6e3";
	}
	.fa-hamsa:before {
		content: "\\f665";
	}
	.fa-hand-paper:before,
	.fa-hand:before {
		content: "\\f256";
	}
	.fa-hand-back-fist:before,
	.fa-hand-rock:before {
		content: "\\f255";
	}
	.fa-allergies:before,
	.fa-hand-dots:before {
		content: "\\f461";
	}
	.fa-fist-raised:before,
	.fa-hand-fist:before {
		content: "\\f6de";
	}
	.fa-hand-holding:before {
		content: "\\f4bd";
	}
	.fa-hand-holding-dollar:before,
	.fa-hand-holding-usd:before {
		content: "\\f4c0";
	}
	.fa-hand-holding-droplet:before,
	.fa-hand-holding-water:before {
		content: "\\f4c1";
	}
	.fa-hand-holding-hand:before {
		content: "\\e4f7";
	}
	.fa-hand-holding-heart:before {
		content: "\\f4be";
	}
	.fa-hand-holding-medical:before {
		content: "\\e05c";
	}
	.fa-hand-lizard:before {
		content: "\\f258";
	}
	.fa-hand-middle-finger:before {
		content: "\\f806";
	}
	.fa-hand-peace:before {
		content: "\\f25b";
	}
	.fa-hand-point-down:before {
		content: "\\f0a7";
	}
	.fa-hand-point-left:before {
		content: "\\f0a5";
	}
	.fa-hand-point-right:before {
		content: "\\f0a4";
	}
	.fa-hand-point-up:before {
		content: "\\f0a6";
	}
	.fa-hand-pointer:before {
		content: "\\f25a";
	}
	.fa-hand-scissors:before {
		content: "\\f257";
	}
	.fa-hand-sparkles:before {
		content: "\\e05d";
	}
	.fa-hand-spock:before {
		content: "\\f259";
	}
	.fa-handcuffs:before {
		content: "\\e4f8";
	}
	.fa-hands:before,
	.fa-sign-language:before,
	.fa-signing:before {
		content: "\\f2a7";
	}
	.fa-american-sign-language-interpreting:before,
	.fa-asl-interpreting:before,
	.fa-hands-american-sign-language-interpreting:before,
	.fa-hands-asl-interpreting:before {
		content: "\\f2a3";
	}
	.fa-hands-bound:before {
		content: "\\e4f9";
	}
	.fa-hands-bubbles:before,
	.fa-hands-wash:before {
		content: "\\e05e";
	}
	.fa-hands-clapping:before {
		content: "\\e1a8";
	}
	.fa-hands-holding:before {
		content: "\\f4c2";
	}
	.fa-hands-holding-child:before {
		content: "\\e4fa";
	}
	.fa-hands-holding-circle:before {
		content: "\\e4fb";
	}
	.fa-hands-praying:before,
	.fa-praying-hands:before {
		content: "\\f684";
	}
	.fa-handshake:before {
		content: "\\f2b5";
	}
	.fa-hands-helping:before,
	.fa-handshake-angle:before {
		content: "\\f4c4";
	}
	.fa-handshake-alt:before,
	.fa-handshake-simple:before {
		content: "\\f4c6";
	}
	.fa-handshake-alt-slash:before,
	.fa-handshake-simple-slash:before {
		content: "\\e05f";
	}
	.fa-handshake-slash:before {
		content: "\\e060";
	}
	.fa-hanukiah:before {
		content: "\\f6e6";
	}
	.fa-hard-drive:before,
	.fa-hdd:before {
		content: "\\f0a0";
	}
	.fa-hashtag:before {
		content: "\\23";
	}
	.fa-hat-cowboy:before {
		content: "\\f8c0";
	}
	.fa-hat-cowboy-side:before {
		content: "\\f8c1";
	}
	.fa-hat-wizard:before {
		content: "\\f6e8";
	}
	.fa-head-side-cough:before {
		content: "\\e061";
	}
	.fa-head-side-cough-slash:before {
		content: "\\e062";
	}
	.fa-head-side-mask:before {
		content: "\\e063";
	}
	.fa-head-side-virus:before {
		content: "\\e064";
	}
	.fa-header:before,
	.fa-heading:before {
		content: "\\f1dc";
	}
	.fa-headphones:before {
		content: "\\f025";
	}
	.fa-headphones-alt:before,
	.fa-headphones-simple:before {
		content: "\\f58f";
	}
	.fa-headset:before {
		content: "\\f590";
	}
	.fa-heart:before {
		content: "\\f004";
	}
	.fa-heart-circle-bolt:before {
		content: "\\e4fc";
	}
	.fa-heart-circle-check:before {
		content: "\\e4fd";
	}
	.fa-heart-circle-exclamation:before {
		content: "\\e4fe";
	}
	.fa-heart-circle-minus:before {
		content: "\\e4ff";
	}
	.fa-heart-circle-plus:before {
		content: "\\e500";
	}
	.fa-heart-circle-xmark:before {
		content: "\\e501";
	}
	.fa-heart-broken:before,
	.fa-heart-crack:before {
		content: "\\f7a9";
	}
	.fa-heart-pulse:before,
	.fa-heartbeat:before {
		content: "\\f21e";
	}
	.fa-helicopter:before {
		content: "\\f533";
	}
	.fa-helicopter-symbol:before {
		content: "\\e502";
	}
	.fa-hard-hat:before,
	.fa-hat-hard:before,
	.fa-helmet-safety:before {
		content: "\\f807";
	}
	.fa-helmet-un:before {
		content: "\\e503";
	}
	.fa-highlighter:before {
		content: "\\f591";
	}
	.fa-hill-avalanche:before {
		content: "\\e507";
	}
	.fa-hill-rockslide:before {
		content: "\\e508";
	}
	.fa-hippo:before {
		content: "\\f6ed";
	}
	.fa-hockey-puck:before {
		content: "\\f453";
	}
	.fa-holly-berry:before {
		content: "\\f7aa";
	}
	.fa-horse:before {
		content: "\\f6f0";
	}
	.fa-horse-head:before {
		content: "\\f7ab";
	}
	.fa-hospital-alt:before,
	.fa-hospital-wide:before,
	.fa-hospital:before {
		content: "\\f0f8";
	}
	.fa-hospital-user:before {
		content: "\\f80d";
	}
	.fa-hot-tub-person:before,
	.fa-hot-tub:before {
		content: "\\f593";
	}
	.fa-hotdog:before {
		content: "\\f80f";
	}
	.fa-hotel:before {
		content: "\\f594";
	}
	.fa-hourglass-2:before,
	.fa-hourglass-half:before,
	.fa-hourglass:before {
		content: "\\f254";
	}
	.fa-hourglass-empty:before {
		content: "\\f252";
	}
	.fa-hourglass-3:before,
	.fa-hourglass-end:before {
		content: "\\f253";
	}
	.fa-hourglass-1:before,
	.fa-hourglass-start:before {
		content: "\\f251";
	}
	.fa-home-alt:before,
	.fa-home-lg-alt:before,
	.fa-home:before,
	.fa-house:before {
		content: "\\f015";
	}
	.fa-home-lg:before,
	.fa-house-chimney:before {
		content: "\\e3af";
	}
	.fa-house-chimney-crack:before,
	.fa-house-damage:before {
		content: "\\f6f1";
	}
	.fa-clinic-medical:before,
	.fa-house-chimney-medical:before {
		content: "\\f7f2";
	}
	.fa-house-chimney-user:before {
		content: "\\e065";
	}
	.fa-house-chimney-window:before {
		content: "\\e00d";
	}
	.fa-house-circle-check:before {
		content: "\\e509";
	}
	.fa-house-circle-exclamation:before {
		content: "\\e50a";
	}
	.fa-house-circle-xmark:before {
		content: "\\e50b";
	}
	.fa-house-crack:before {
		content: "\\e3b1";
	}
	.fa-house-fire:before {
		content: "\\e50c";
	}
	.fa-house-flag:before {
		content: "\\e50d";
	}
	.fa-house-flood-water:before {
		content: "\\e50e";
	}
	.fa-house-flood-water-circle-arrow-right:before {
		content: "\\e50f";
	}
	.fa-house-laptop:before,
	.fa-laptop-house:before {
		content: "\\e066";
	}
	.fa-house-lock:before {
		content: "\\e510";
	}
	.fa-house-medical:before {
		content: "\\e3b2";
	}
	.fa-house-medical-circle-check:before {
		content: "\\e511";
	}
	.fa-house-medical-circle-exclamation:before {
		content: "\\e512";
	}
	.fa-house-medical-circle-xmark:before {
		content: "\\e513";
	}
	.fa-house-medical-flag:before {
		content: "\\e514";
	}
	.fa-house-signal:before {
		content: "\\e012";
	}
	.fa-house-tsunami:before {
		content: "\\e515";
	}
	.fa-home-user:before,
	.fa-house-user:before {
		content: "\\e1b0";
	}
	.fa-hryvnia-sign:before,
	.fa-hryvnia:before {
		content: "\\f6f2";
	}
	.fa-hurricane:before {
		content: "\\f751";
	}
	.fa-i:before {
		content: "\\49";
	}
	.fa-i-cursor:before {
		content: "\\f246";
	}
	.fa-ice-cream:before {
		content: "\\f810";
	}
	.fa-icicles:before {
		content: "\\f7ad";
	}
	.fa-heart-music-camera-bolt:before,
	.fa-icons:before {
		content: "\\f86d";
	}
	.fa-id-badge:before {
		content: "\\f2c1";
	}
	.fa-drivers-license:before,
	.fa-id-card:before {
		content: "\\f2c2";
	}
	.fa-id-card-alt:before,
	.fa-id-card-clip:before {
		content: "\\f47f";
	}
	.fa-igloo:before {
		content: "\\f7ae";
	}
	.fa-image:before {
		content: "\\f03e";
	}
	.fa-image-portrait:before,
	.fa-portrait:before {
		content: "\\f3e0";
	}
	.fa-images:before {
		content: "\\f302";
	}
	.fa-inbox:before {
		content: "\\f01c";
	}
	.fa-indent:before {
		content: "\\f03c";
	}
	.fa-indian-rupee-sign:before,
	.fa-indian-rupee:before,
	.fa-inr:before {
		content: "\\e1bc";
	}
	.fa-industry:before {
		content: "\\f275";
	}
	.fa-infinity:before {
		content: "\\f534";
	}
	.fa-info:before {
		content: "\\f129";
	}
	.fa-italic:before {
		content: "\\f033";
	}
	.fa-j:before {
		content: "\\4a";
	}
	.fa-jar:before {
		content: "\\e516";
	}
	.fa-jar-wheat:before {
		content: "\\e517";
	}
	.fa-jedi:before {
		content: "\\f669";
	}
	.fa-fighter-jet:before,
	.fa-jet-fighter:before {
		content: "\\f0fb";
	}
	.fa-jet-fighter-up:before {
		content: "\\e518";
	}
	.fa-joint:before {
		content: "\\f595";
	}
	.fa-jug-detergent:before {
		content: "\\e519";
	}
	.fa-k:before {
		content: "\\4b";
	}
	.fa-kaaba:before {
		content: "\\f66b";
	}
	.fa-key:before {
		content: "\\f084";
	}
	.fa-keyboard:before {
		content: "\\f11c";
	}
	.fa-khanda:before {
		content: "\\f66d";
	}
	.fa-kip-sign:before {
		content: "\\e1c4";
	}
	.fa-first-aid:before,
	.fa-kit-medical:before {
		content: "\\f479";
	}
	.fa-kitchen-set:before {
		content: "\\e51a";
	}
	.fa-kiwi-bird:before {
		content: "\\f535";
	}
	.fa-l:before {
		content: "\\4c";
	}
	.fa-land-mine-on:before {
		content: "\\e51b";
	}
	.fa-landmark:before {
		content: "\\f66f";
	}
	.fa-landmark-alt:before,
	.fa-landmark-dome:before {
		content: "\\f752";
	}
	.fa-landmark-flag:before {
		content: "\\e51c";
	}
	.fa-language:before {
		content: "\\f1ab";
	}
	.fa-laptop:before {
		content: "\\f109";
	}
	.fa-laptop-code:before {
		content: "\\f5fc";
	}
	.fa-laptop-file:before {
		content: "\\e51d";
	}
	.fa-laptop-medical:before {
		content: "\\f812";
	}
	.fa-lari-sign:before {
		content: "\\e1c8";
	}
	.fa-layer-group:before {
		content: "\\f5fd";
	}
	.fa-leaf:before {
		content: "\\f06c";
	}
	.fa-left-long:before,
	.fa-long-arrow-alt-left:before {
		content: "\\f30a";
	}
	.fa-arrows-alt-h:before,
	.fa-left-right:before {
		content: "\\f337";
	}
	.fa-lemon:before {
		content: "\\f094";
	}
	.fa-less-than:before {
		content: "\\3c";
	}
	.fa-less-than-equal:before {
		content: "\\f537";
	}
	.fa-life-ring:before {
		content: "\\f1cd";
	}
	.fa-lightbulb:before {
		content: "\\f0eb";
	}
	.fa-lines-leaning:before {
		content: "\\e51e";
	}
	.fa-chain:before,
	.fa-link:before {
		content: "\\f0c1";
	}
	.fa-chain-broken:before,
	.fa-chain-slash:before,
	.fa-link-slash:before,
	.fa-unlink:before {
		content: "\\f127";
	}
	.fa-lira-sign:before {
		content: "\\f195";
	}
	.fa-list-squares:before,
	.fa-list:before {
		content: "\\f03a";
	}
	.fa-list-check:before,
	.fa-tasks:before {
		content: "\\f0ae";
	}
	.fa-list-1-2:before,
	.fa-list-numeric:before,
	.fa-list-ol:before {
		content: "\\f0cb";
	}
	.fa-list-dots:before,
	.fa-list-ul:before {
		content: "\\f0ca";
	}
	.fa-litecoin-sign:before {
		content: "\\e1d3";
	}
	.fa-location-arrow:before {
		content: "\\f124";
	}
	.fa-location-crosshairs:before,
	.fa-location:before {
		content: "\\f601";
	}
	.fa-location-dot:before,
	.fa-map-marker-alt:before {
		content: "\\f3c5";
	}
	.fa-location-pin:before,
	.fa-map-marker:before {
		content: "\\f041";
	}
	.fa-location-pin-lock:before {
		content: "\\e51f";
	}
	.fa-lock:before {
		content: "\\f023";
	}
	.fa-lock-open:before {
		content: "\\f3c1";
	}
	.fa-locust:before {
		content: "\\e520";
	}
	.fa-lungs:before {
		content: "\\f604";
	}
	.fa-lungs-virus:before {
		content: "\\e067";
	}
	.fa-m:before {
		content: "\\4d";
	}
	.fa-magnet:before {
		content: "\\f076";
	}
	.fa-magnifying-glass:before,
	.fa-search:before {
		content: "\\f002";
	}
	.fa-magnifying-glass-arrow-right:before {
		content: "\\e521";
	}
	.fa-magnifying-glass-chart:before {
		content: "\\e522";
	}
	.fa-magnifying-glass-dollar:before,
	.fa-search-dollar:before {
		content: "\\f688";
	}
	.fa-magnifying-glass-location:before,
	.fa-search-location:before {
		content: "\\f689";
	}
	.fa-magnifying-glass-minus:before,
	.fa-search-minus:before {
		content: "\\f010";
	}
	.fa-magnifying-glass-plus:before,
	.fa-search-plus:before {
		content: "\\f00e";
	}
	.fa-manat-sign:before {
		content: "\\e1d5";
	}
	.fa-map:before {
		content: "\\f279";
	}
	.fa-map-location:before,
	.fa-map-marked:before {
		content: "\\f59f";
	}
	.fa-map-location-dot:before,
	.fa-map-marked-alt:before {
		content: "\\f5a0";
	}
	.fa-map-pin:before {
		content: "\\f276";
	}
	.fa-marker:before {
		content: "\\f5a1";
	}
	.fa-mars:before {
		content: "\\f222";
	}
	.fa-mars-and-venus:before {
		content: "\\f224";
	}
	.fa-mars-and-venus-burst:before {
		content: "\\e523";
	}
	.fa-mars-double:before {
		content: "\\f227";
	}
	.fa-mars-stroke:before {
		content: "\\f229";
	}
	.fa-mars-stroke-h:before,
	.fa-mars-stroke-right:before {
		content: "\\f22b";
	}
	.fa-mars-stroke-up:before,
	.fa-mars-stroke-v:before {
		content: "\\f22a";
	}
	.fa-glass-martini-alt:before,
	.fa-martini-glass:before {
		content: "\\f57b";
	}
	.fa-cocktail:before,
	.fa-martini-glass-citrus:before {
		content: "\\f561";
	}
	.fa-glass-martini:before,
	.fa-martini-glass-empty:before {
		content: "\\f000";
	}
	.fa-mask:before {
		content: "\\f6fa";
	}
	.fa-mask-face:before {
		content: "\\e1d7";
	}
	.fa-mask-ventilator:before {
		content: "\\e524";
	}
	.fa-masks-theater:before,
	.fa-theater-masks:before {
		content: "\\f630";
	}
	.fa-mattress-pillow:before {
		content: "\\e525";
	}
	.fa-expand-arrows-alt:before,
	.fa-maximize:before {
		content: "\\f31e";
	}
	.fa-medal:before {
		content: "\\f5a2";
	}
	.fa-memory:before {
		content: "\\f538";
	}
	.fa-menorah:before {
		content: "\\f676";
	}
	.fa-mercury:before {
		content: "\\f223";
	}
	.fa-comment-alt:before,
	.fa-message:before {
		content: "\\f27a";
	}
	.fa-meteor:before {
		content: "\\f753";
	}
	.fa-microchip:before {
		content: "\\f2db";
	}
	.fa-microphone:before {
		content: "\\f130";
	}
	.fa-microphone-alt:before,
	.fa-microphone-lines:before {
		content: "\\f3c9";
	}
	.fa-microphone-alt-slash:before,
	.fa-microphone-lines-slash:before {
		content: "\\f539";
	}
	.fa-microphone-slash:before {
		content: "\\f131";
	}
	.fa-microscope:before {
		content: "\\f610";
	}
	.fa-mill-sign:before {
		content: "\\e1ed";
	}
	.fa-compress-arrows-alt:before,
	.fa-minimize:before {
		content: "\\f78c";
	}
	.fa-minus:before,
	.fa-subtract:before {
		content: "\\f068";
	}
	.fa-mitten:before {
		content: "\\f7b5";
	}
	.fa-mobile-android:before,
	.fa-mobile-phone:before,
	.fa-mobile:before {
		content: "\\f3ce";
	}
	.fa-mobile-button:before {
		content: "\\f10b";
	}
	.fa-mobile-retro:before {
		content: "\\e527";
	}
	.fa-mobile-android-alt:before,
	.fa-mobile-screen:before {
		content: "\\f3cf";
	}
	.fa-mobile-alt:before,
	.fa-mobile-screen-button:before {
		content: "\\f3cd";
	}
	.fa-money-bill:before {
		content: "\\f0d6";
	}
	.fa-money-bill-1:before,
	.fa-money-bill-alt:before {
		content: "\\f3d1";
	}
	.fa-money-bill-1-wave:before,
	.fa-money-bill-wave-alt:before {
		content: "\\f53b";
	}
	.fa-money-bill-transfer:before {
		content: "\\e528";
	}
	.fa-money-bill-trend-up:before {
		content: "\\e529";
	}
	.fa-money-bill-wave:before {
		content: "\\f53a";
	}
	.fa-money-bill-wheat:before {
		content: "\\e52a";
	}
	.fa-money-bills:before {
		content: "\\e1f3";
	}
	.fa-money-check:before {
		content: "\\f53c";
	}
	.fa-money-check-alt:before,
	.fa-money-check-dollar:before {
		content: "\\f53d";
	}
	.fa-monument:before {
		content: "\\f5a6";
	}
	.fa-moon:before {
		content: "\\f186";
	}
	.fa-mortar-pestle:before {
		content: "\\f5a7";
	}
	.fa-mosque:before {
		content: "\\f678";
	}
	.fa-mosquito:before {
		content: "\\e52b";
	}
	.fa-mosquito-net:before {
		content: "\\e52c";
	}
	.fa-motorcycle:before {
		content: "\\f21c";
	}
	.fa-mound:before {
		content: "\\e52d";
	}
	.fa-mountain:before {
		content: "\\f6fc";
	}
	.fa-mountain-city:before {
		content: "\\e52e";
	}
	.fa-mountain-sun:before {
		content: "\\e52f";
	}
	.fa-mug-hot:before {
		content: "\\f7b6";
	}
	.fa-coffee:before,
	.fa-mug-saucer:before {
		content: "\\f0f4";
	}
	.fa-music:before {
		content: "\\f001";
	}
	.fa-n:before {
		content: "\\4e";
	}
	.fa-naira-sign:before {
		content: "\\e1f6";
	}
	.fa-network-wired:before {
		content: "\\f6ff";
	}
	.fa-neuter:before {
		content: "\\f22c";
	}
	.fa-newspaper:before {
		content: "\\f1ea";
	}
	.fa-not-equal:before {
		content: "\\f53e";
	}
	.fa-note-sticky:before,
	.fa-sticky-note:before {
		content: "\\f249";
	}
	.fa-notes-medical:before {
		content: "\\f481";
	}
	.fa-o:before {
		content: "\\4f";
	}
	.fa-object-group:before {
		content: "\\f247";
	}
	.fa-object-ungroup:before {
		content: "\\f248";
	}
	.fa-oil-can:before {
		content: "\\f613";
	}
	.fa-oil-well:before {
		content: "\\e532";
	}
	.fa-om:before {
		content: "\\f679";
	}
	.fa-otter:before {
		content: "\\f700";
	}
	.fa-dedent:before,
	.fa-outdent:before {
		content: "\\f03b";
	}
	.fa-p:before {
		content: "\\50";
	}
	.fa-pager:before {
		content: "\\f815";
	}
	.fa-paint-roller:before {
		content: "\\f5aa";
	}
	.fa-paint-brush:before,
	.fa-paintbrush:before {
		content: "\\f1fc";
	}
	.fa-palette:before {
		content: "\\f53f";
	}
	.fa-pallet:before {
		content: "\\f482";
	}
	.fa-panorama:before {
		content: "\\e209";
	}
	.fa-paper-plane:before {
		content: "\\f1d8";
	}
	.fa-paperclip:before {
		content: "\\f0c6";
	}
	.fa-parachute-box:before {
		content: "\\f4cd";
	}
	.fa-paragraph:before {
		content: "\\f1dd";
	}
	.fa-passport:before {
		content: "\\f5ab";
	}
	.fa-file-clipboard:before,
	.fa-paste:before {
		content: "\\f0ea";
	}
	.fa-pause:before {
		content: "\\f04c";
	}
	.fa-paw:before {
		content: "\\f1b0";
	}
	.fa-peace:before {
		content: "\\f67c";
	}
	.fa-pen:before {
		content: "\\f304";
	}
	.fa-pen-alt:before,
	.fa-pen-clip:before {
		content: "\\f305";
	}
	.fa-pen-fancy:before {
		content: "\\f5ac";
	}
	.fa-pen-nib:before {
		content: "\\f5ad";
	}
	.fa-pen-ruler:before,
	.fa-pencil-ruler:before {
		content: "\\f5ae";
	}
	.fa-edit:before,
	.fa-pen-to-square:before {
		content: "\\f044";
	}
	.fa-pencil-alt:before,
	.fa-pencil:before {
		content: "\\f303";
	}
	.fa-people-arrows-left-right:before,
	.fa-people-arrows:before {
		content: "\\e068";
	}
	.fa-people-carry-box:before,
	.fa-people-carry:before {
		content: "\\f4ce";
	}
	.fa-people-group:before {
		content: "\\e533";
	}
	.fa-people-line:before {
		content: "\\e534";
	}
	.fa-people-pulling:before {
		content: "\\e535";
	}
	.fa-people-robbery:before {
		content: "\\e536";
	}
	.fa-people-roof:before {
		content: "\\e537";
	}
	.fa-pepper-hot:before {
		content: "\\f816";
	}
	.fa-percent:before,
	.fa-percentage:before {
		content: "\\25";
	}
	.fa-male:before,
	.fa-person:before {
		content: "\\f183";
	}
	.fa-person-arrow-down-to-line:before {
		content: "\\e538";
	}
	.fa-person-arrow-up-from-line:before {
		content: "\\e539";
	}
	.fa-biking:before,
	.fa-person-biking:before {
		content: "\\f84a";
	}
	.fa-person-booth:before {
		content: "\\f756";
	}
	.fa-person-breastfeeding:before {
		content: "\\e53a";
	}
	.fa-person-burst:before {
		content: "\\e53b";
	}
	.fa-person-cane:before {
		content: "\\e53c";
	}
	.fa-person-chalkboard:before {
		content: "\\e53d";
	}
	.fa-person-circle-check:before {
		content: "\\e53e";
	}
	.fa-person-circle-exclamation:before {
		content: "\\e53f";
	}
	.fa-person-circle-minus:before {
		content: "\\e540";
	}
	.fa-person-circle-plus:before {
		content: "\\e541";
	}
	.fa-person-circle-question:before {
		content: "\\e542";
	}
	.fa-person-circle-xmark:before {
		content: "\\e543";
	}
	.fa-digging:before,
	.fa-person-digging:before {
		content: "\\f85e";
	}
	.fa-diagnoses:before,
	.fa-person-dots-from-line:before {
		content: "\\f470";
	}
	.fa-female:before,
	.fa-person-dress:before {
		content: "\\f182";
	}
	.fa-person-dress-burst:before {
		content: "\\e544";
	}
	.fa-person-drowning:before {
		content: "\\e545";
	}
	.fa-person-falling:before {
		content: "\\e546";
	}
	.fa-person-falling-burst:before {
		content: "\\e547";
	}
	.fa-person-half-dress:before {
		content: "\\e548";
	}
	.fa-person-harassing:before {
		content: "\\e549";
	}
	.fa-hiking:before,
	.fa-person-hiking:before {
		content: "\\f6ec";
	}
	.fa-person-military-pointing:before {
		content: "\\e54a";
	}
	.fa-person-military-rifle:before {
		content: "\\e54b";
	}
	.fa-person-military-to-person:before {
		content: "\\e54c";
	}
	.fa-person-praying:before,
	.fa-pray:before {
		content: "\\f683";
	}
	.fa-person-pregnant:before {
		content: "\\e31e";
	}
	.fa-person-rays:before {
		content: "\\e54d";
	}
	.fa-person-rifle:before {
		content: "\\e54e";
	}
	.fa-person-running:before,
	.fa-running:before {
		content: "\\f70c";
	}
	.fa-person-shelter:before {
		content: "\\e54f";
	}
	.fa-person-skating:before,
	.fa-skating:before {
		content: "\\f7c5";
	}
	.fa-person-skiing:before,
	.fa-skiing:before {
		content: "\\f7c9";
	}
	.fa-person-skiing-nordic:before,
	.fa-skiing-nordic:before {
		content: "\\f7ca";
	}
	.fa-person-snowboarding:before,
	.fa-snowboarding:before {
		content: "\\f7ce";
	}
	.fa-person-swimming:before,
	.fa-swimmer:before {
		content: "\\f5c4";
	}
	.fa-person-through-window:before {
		content: "\\e433";
	}
	.fa-person-walking:before,
	.fa-walking:before {
		content: "\\f554";
	}
	.fa-person-walking-arrow-loop-left:before {
		content: "\\e551";
	}
	.fa-person-walking-arrow-right:before {
		content: "\\e552";
	}
	.fa-person-walking-dashed-line-arrow-right:before {
		content: "\\e553";
	}
	.fa-person-walking-luggage:before {
		content: "\\e554";
	}
	.fa-blind:before,
	.fa-person-walking-with-cane:before {
		content: "\\f29d";
	}
	.fa-peseta-sign:before {
		content: "\\e221";
	}
	.fa-peso-sign:before {
		content: "\\e222";
	}
	.fa-phone:before {
		content: "\\f095";
	}
	.fa-phone-alt:before,
	.fa-phone-flip:before {
		content: "\\f879";
	}
	.fa-phone-slash:before {
		content: "\\f3dd";
	}
	.fa-phone-volume:before,
	.fa-volume-control-phone:before {
		content: "\\f2a0";
	}
	.fa-photo-film:before,
	.fa-photo-video:before {
		content: "\\f87c";
	}
	.fa-piggy-bank:before {
		content: "\\f4d3";
	}
	.fa-pills:before {
		content: "\\f484";
	}
	.fa-pizza-slice:before {
		content: "\\f818";
	}
	.fa-place-of-worship:before {
		content: "\\f67f";
	}
	.fa-plane:before {
		content: "\\f072";
	}
	.fa-plane-arrival:before {
		content: "\\f5af";
	}
	.fa-plane-circle-check:before {
		content: "\\e555";
	}
	.fa-plane-circle-exclamation:before {
		content: "\\e556";
	}
	.fa-plane-circle-xmark:before {
		content: "\\e557";
	}
	.fa-plane-departure:before {
		content: "\\f5b0";
	}
	.fa-plane-lock:before {
		content: "\\e558";
	}
	.fa-plane-slash:before {
		content: "\\e069";
	}
	.fa-plane-up:before {
		content: "\\e22d";
	}
	.fa-plant-wilt:before {
		content: "\\e43b";
	}
	.fa-plate-wheat:before {
		content: "\\e55a";
	}
	.fa-play:before {
		content: "\\f04b";
	}
	.fa-plug:before {
		content: "\\f1e6";
	}
	.fa-plug-circle-bolt:before {
		content: "\\e55b";
	}
	.fa-plug-circle-check:before {
		content: "\\e55c";
	}
	.fa-plug-circle-exclamation:before {
		content: "\\e55d";
	}
	.fa-plug-circle-minus:before {
		content: "\\e55e";
	}
	.fa-plug-circle-plus:before {
		content: "\\e55f";
	}
	.fa-plug-circle-xmark:before {
		content: "\\e560";
	}
	.fa-add:before,
	.fa-plus:before {
		content: "\\2b";
	}
	.fa-plus-minus:before {
		content: "\\e43c";
	}
	.fa-podcast:before {
		content: "\\f2ce";
	}
	.fa-poo:before {
		content: "\\f2fe";
	}
	.fa-poo-bolt:before,
	.fa-poo-storm:before {
		content: "\\f75a";
	}
	.fa-poop:before {
		content: "\\f619";
	}
	.fa-power-off:before {
		content: "\\f011";
	}
	.fa-prescription:before {
		content: "\\f5b1";
	}
	.fa-prescription-bottle:before {
		content: "\\f485";
	}
	.fa-prescription-bottle-alt:before,
	.fa-prescription-bottle-medical:before {
		content: "\\f486";
	}
	.fa-print:before {
		content: "\\f02f";
	}
	.fa-pump-medical:before {
		content: "\\e06a";
	}
	.fa-pump-soap:before {
		content: "\\e06b";
	}
	.fa-puzzle-piece:before {
		content: "\\f12e";
	}
	.fa-q:before {
		content: "\\51";
	}
	.fa-qrcode:before {
		content: "\\f029";
	}
	.fa-question:before {
		content: "\\3f";
	}
	.fa-quote-left-alt:before,
	.fa-quote-left:before {
		content: "\\f10d";
	}
	.fa-quote-right-alt:before,
	.fa-quote-right:before {
		content: "\\f10e";
	}
	.fa-r:before {
		content: "\\52";
	}
	.fa-radiation:before {
		content: "\\f7b9";
	}
	.fa-radio:before {
		content: "\\f8d7";
	}
	.fa-rainbow:before {
		content: "\\f75b";
	}
	.fa-ranking-star:before {
		content: "\\e561";
	}
	.fa-receipt:before {
		content: "\\f543";
	}
	.fa-record-vinyl:before {
		content: "\\f8d9";
	}
	.fa-ad:before,
	.fa-rectangle-ad:before {
		content: "\\f641";
	}
	.fa-list-alt:before,
	.fa-rectangle-list:before {
		content: "\\f022";
	}
	.fa-rectangle-times:before,
	.fa-rectangle-xmark:before,
	.fa-times-rectangle:before,
	.fa-window-close:before {
		content: "\\f410";
	}
	.fa-recycle:before {
		content: "\\f1b8";
	}
	.fa-registered:before {
		content: "\\f25d";
	}
	.fa-repeat:before {
		content: "\\f363";
	}
	.fa-mail-reply:before,
	.fa-reply:before {
		content: "\\f3e5";
	}
	.fa-mail-reply-all:before,
	.fa-reply-all:before {
		content: "\\f122";
	}
	.fa-republican:before {
		content: "\\f75e";
	}
	.fa-restroom:before {
		content: "\\f7bd";
	}
	.fa-retweet:before {
		content: "\\f079";
	}
	.fa-ribbon:before {
		content: "\\f4d6";
	}
	.fa-right-from-bracket:before,
	.fa-sign-out-alt:before {
		content: "\\f2f5";
	}
	.fa-exchange-alt:before,
	.fa-right-left:before {
		content: "\\f362";
	}
	.fa-long-arrow-alt-right:before,
	.fa-right-long:before {
		content: "\\f30b";
	}
	.fa-right-to-bracket:before,
	.fa-sign-in-alt:before {
		content: "\\f2f6";
	}
	.fa-ring:before {
		content: "\\f70b";
	}
	.fa-road:before {
		content: "\\f018";
	}
	.fa-road-barrier:before {
		content: "\\e562";
	}
	.fa-road-bridge:before {
		content: "\\e563";
	}
	.fa-road-circle-check:before {
		content: "\\e564";
	}
	.fa-road-circle-exclamation:before {
		content: "\\e565";
	}
	.fa-road-circle-xmark:before {
		content: "\\e566";
	}
	.fa-road-lock:before {
		content: "\\e567";
	}
	.fa-road-spikes:before {
		content: "\\e568";
	}
	.fa-robot:before {
		content: "\\f544";
	}
	.fa-rocket:before {
		content: "\\f135";
	}
	.fa-rotate:before,
	.fa-sync-alt:before {
		content: "\\f2f1";
	}
	.fa-rotate-back:before,
	.fa-rotate-backward:before,
	.fa-rotate-left:before,
	.fa-undo-alt:before {
		content: "\\f2ea";
	}
	.fa-redo-alt:before,
	.fa-rotate-forward:before,
	.fa-rotate-right:before {
		content: "\\f2f9";
	}
	.fa-route:before {
		content: "\\f4d7";
	}
	.fa-feed:before,
	.fa-rss:before {
		content: "\\f09e";
	}
	.fa-rouble:before,
	.fa-rub:before,
	.fa-ruble-sign:before,
	.fa-ruble:before {
		content: "\\f158";
	}
	.fa-rug:before {
		content: "\\e569";
	}
	.fa-ruler:before {
		content: "\\f545";
	}
	.fa-ruler-combined:before {
		content: "\\f546";
	}
	.fa-ruler-horizontal:before {
		content: "\\f547";
	}
	.fa-ruler-vertical:before {
		content: "\\f548";
	}
	.fa-rupee-sign:before,
	.fa-rupee:before {
		content: "\\f156";
	}
	.fa-rupiah-sign:before {
		content: "\\e23d";
	}
	.fa-s:before {
		content: "\\53";
	}
	.fa-sack-dollar:before {
		content: "\\f81d";
	}
	.fa-sack-xmark:before {
		content: "\\e56a";
	}
	.fa-sailboat:before {
		content: "\\e445";
	}
	.fa-satellite:before {
		content: "\\f7bf";
	}
	.fa-satellite-dish:before {
		content: "\\f7c0";
	}
	.fa-balance-scale:before,
	.fa-scale-balanced:before {
		content: "\\f24e";
	}
	.fa-balance-scale-left:before,
	.fa-scale-unbalanced:before {
		content: "\\f515";
	}
	.fa-balance-scale-right:before,
	.fa-scale-unbalanced-flip:before {
		content: "\\f516";
	}
	.fa-school:before {
		content: "\\f549";
	}
	.fa-school-circle-check:before {
		content: "\\e56b";
	}
	.fa-school-circle-exclamation:before {
		content: "\\e56c";
	}
	.fa-school-circle-xmark:before {
		content: "\\e56d";
	}
	.fa-school-flag:before {
		content: "\\e56e";
	}
	.fa-school-lock:before {
		content: "\\e56f";
	}
	.fa-cut:before,
	.fa-scissors:before {
		content: "\\f0c4";
	}
	.fa-screwdriver:before {
		content: "\\f54a";
	}
	.fa-screwdriver-wrench:before,
	.fa-tools:before {
		content: "\\f7d9";
	}
	.fa-scroll:before {
		content: "\\f70e";
	}
	.fa-scroll-torah:before,
	.fa-torah:before {
		content: "\\f6a0";
	}
	.fa-sd-card:before {
		content: "\\f7c2";
	}
	.fa-section:before {
		content: "\\e447";
	}
	.fa-seedling:before,
	.fa-sprout:before {
		content: "\\f4d8";
	}
	.fa-server:before {
		content: "\\f233";
	}
	.fa-shapes:before,
	.fa-triangle-circle-square:before {
		content: "\\f61f";
	}
	.fa-arrow-turn-right:before,
	.fa-mail-forward:before,
	.fa-share:before {
		content: "\\f064";
	}
	.fa-share-from-square:before,
	.fa-share-square:before {
		content: "\\f14d";
	}
	.fa-share-alt:before,
	.fa-share-nodes:before {
		content: "\\f1e0";
	}
	.fa-sheet-plastic:before {
		content: "\\e571";
	}
	.fa-ils:before,
	.fa-shekel-sign:before,
	.fa-shekel:before,
	.fa-sheqel-sign:before,
	.fa-sheqel:before {
		content: "\\f20b";
	}
	.fa-shield-blank:before,
	.fa-shield:before {
		content: "\\f132";
	}
	.fa-shield-cat:before {
		content: "\\e572";
	}
	.fa-shield-dog:before {
		content: "\\e573";
	}
	.fa-shield-alt:before,
	.fa-shield-halved:before {
		content: "\\f3ed";
	}
	.fa-shield-heart:before {
		content: "\\e574";
	}
	.fa-shield-virus:before {
		content: "\\e06c";
	}
	.fa-ship:before {
		content: "\\f21a";
	}
	.fa-shirt:before,
	.fa-t-shirt:before,
	.fa-tshirt:before {
		content: "\\f553";
	}
	.fa-shoe-prints:before {
		content: "\\f54b";
	}
	.fa-shop:before,
	.fa-store-alt:before {
		content: "\\f54f";
	}
	.fa-shop-lock:before {
		content: "\\e4a5";
	}
	.fa-shop-slash:before,
	.fa-store-alt-slash:before {
		content: "\\e070";
	}
	.fa-shower:before {
		content: "\\f2cc";
	}
	.fa-shrimp:before {
		content: "\\e448";
	}
	.fa-random:before,
	.fa-shuffle:before {
		content: "\\f074";
	}
	.fa-shuttle-space:before,
	.fa-space-shuttle:before {
		content: "\\f197";
	}
	.fa-sign-hanging:before,
	.fa-sign:before {
		content: "\\f4d9";
	}
	.fa-signal-5:before,
	.fa-signal-perfect:before,
	.fa-signal:before {
		content: "\\f012";
	}
	.fa-signature:before {
		content: "\\f5b7";
	}
	.fa-map-signs:before,
	.fa-signs-post:before {
		content: "\\f277";
	}
	.fa-sim-card:before {
		content: "\\f7c4";
	}
	.fa-sink:before {
		content: "\\e06d";
	}
	.fa-sitemap:before {
		content: "\\f0e8";
	}
	.fa-skull:before {
		content: "\\f54c";
	}
	.fa-skull-crossbones:before {
		content: "\\f714";
	}
	.fa-slash:before {
		content: "\\f715";
	}
	.fa-sleigh:before {
		content: "\\f7cc";
	}
	.fa-sliders-h:before,
	.fa-sliders:before {
		content: "\\f1de";
	}
	.fa-smog:before {
		content: "\\f75f";
	}
	.fa-smoking:before {
		content: "\\f48d";
	}
	.fa-snowflake:before {
		content: "\\f2dc";
	}
	.fa-snowman:before {
		content: "\\f7d0";
	}
	.fa-snowplow:before {
		content: "\\f7d2";
	}
	.fa-soap:before {
		content: "\\e06e";
	}
	.fa-socks:before {
		content: "\\f696";
	}
	.fa-solar-panel:before {
		content: "\\f5ba";
	}
	.fa-sort:before,
	.fa-unsorted:before {
		content: "\\f0dc";
	}
	.fa-sort-desc:before,
	.fa-sort-down:before {
		content: "\\f0dd";
	}
	.fa-sort-asc:before,
	.fa-sort-up:before {
		content: "\\f0de";
	}
	.fa-spa:before {
		content: "\\f5bb";
	}
	.fa-pastafarianism:before,
	.fa-spaghetti-monster-flying:before {
		content: "\\f67b";
	}
	.fa-spell-check:before {
		content: "\\f891";
	}
	.fa-spider:before {
		content: "\\f717";
	}
	.fa-spinner:before {
		content: "\\f110";
	}
	.fa-splotch:before {
		content: "\\f5bc";
	}
	.fa-spoon:before,
	.fa-utensil-spoon:before {
		content: "\\f2e5";
	}
	.fa-spray-can:before {
		content: "\\f5bd";
	}
	.fa-air-freshener:before,
	.fa-spray-can-sparkles:before {
		content: "\\f5d0";
	}
	.fa-square:before {
		content: "\\f0c8";
	}
	.fa-external-link-square:before,
	.fa-square-arrow-up-right:before {
		content: "\\f14c";
	}
	.fa-caret-square-down:before,
	.fa-square-caret-down:before {
		content: "\\f150";
	}
	.fa-caret-square-left:before,
	.fa-square-caret-left:before {
		content: "\\f191";
	}
	.fa-caret-square-right:before,
	.fa-square-caret-right:before {
		content: "\\f152";
	}
	.fa-caret-square-up:before,
	.fa-square-caret-up:before {
		content: "\\f151";
	}
	.fa-check-square:before,
	.fa-square-check:before {
		content: "\\f14a";
	}
	.fa-envelope-square:before,
	.fa-square-envelope:before {
		content: "\\f199";
	}
	.fa-square-full:before {
		content: "\\f45c";
	}
	.fa-h-square:before,
	.fa-square-h:before {
		content: "\\f0fd";
	}
	.fa-minus-square:before,
	.fa-square-minus:before {
		content: "\\f146";
	}
	.fa-square-nfi:before {
		content: "\\e576";
	}
	.fa-parking:before,
	.fa-square-parking:before {
		content: "\\f540";
	}
	.fa-pen-square:before,
	.fa-pencil-square:before,
	.fa-square-pen:before {
		content: "\\f14b";
	}
	.fa-square-person-confined:before {
		content: "\\e577";
	}
	.fa-phone-square:before,
	.fa-square-phone:before {
		content: "\\f098";
	}
	.fa-phone-square-alt:before,
	.fa-square-phone-flip:before {
		content: "\\f87b";
	}
	.fa-plus-square:before,
	.fa-square-plus:before {
		content: "\\f0fe";
	}
	.fa-poll-h:before,
	.fa-square-poll-horizontal:before {
		content: "\\f682";
	}
	.fa-poll:before,
	.fa-square-poll-vertical:before {
		content: "\\f681";
	}
	.fa-square-root-alt:before,
	.fa-square-root-variable:before {
		content: "\\f698";
	}
	.fa-rss-square:before,
	.fa-square-rss:before {
		content: "\\f143";
	}
	.fa-share-alt-square:before,
	.fa-square-share-nodes:before {
		content: "\\f1e1";
	}
	.fa-external-link-square-alt:before,
	.fa-square-up-right:before {
		content: "\\f360";
	}
	.fa-square-virus:before {
		content: "\\e578";
	}
	.fa-square-xmark:before,
	.fa-times-square:before,
	.fa-xmark-square:before {
		content: "\\f2d3";
	}
	.fa-rod-asclepius:before,
	.fa-rod-snake:before,
	.fa-staff-aesculapius:before,
	.fa-staff-snake:before {
		content: "\\e579";
	}
	.fa-stairs:before {
		content: "\\e289";
	}
	.fa-stamp:before {
		content: "\\f5bf";
	}
	.fa-star:before {
		content: "\\f005";
	}
	.fa-star-and-crescent:before {
		content: "\\f699";
	}
	.fa-star-half:before {
		content: "\\f089";
	}
	.fa-star-half-alt:before,
	.fa-star-half-stroke:before {
		content: "\\f5c0";
	}
	.fa-star-of-david:before {
		content: "\\f69a";
	}
	.fa-star-of-life:before {
		content: "\\f621";
	}
	.fa-gbp:before,
	.fa-pound-sign:before,
	.fa-sterling-sign:before {
		content: "\\f154";
	}
	.fa-stethoscope:before {
		content: "\\f0f1";
	}
	.fa-stop:before {
		content: "\\f04d";
	}
	.fa-stopwatch:before {
		content: "\\f2f2";
	}
	.fa-stopwatch-20:before {
		content: "\\e06f";
	}
	.fa-store:before {
		content: "\\f54e";
	}
	.fa-store-slash:before {
		content: "\\e071";
	}
	.fa-street-view:before {
		content: "\\f21d";
	}
	.fa-strikethrough:before {
		content: "\\f0cc";
	}
	.fa-stroopwafel:before {
		content: "\\f551";
	}
	.fa-subscript:before {
		content: "\\f12c";
	}
	.fa-suitcase:before {
		content: "\\f0f2";
	}
	.fa-medkit:before,
	.fa-suitcase-medical:before {
		content: "\\f0fa";
	}
	.fa-suitcase-rolling:before {
		content: "\\f5c1";
	}
	.fa-sun:before {
		content: "\\f185";
	}
	.fa-sun-plant-wilt:before {
		content: "\\e57a";
	}
	.fa-superscript:before {
		content: "\\f12b";
	}
	.fa-swatchbook:before {
		content: "\\f5c3";
	}
	.fa-synagogue:before {
		content: "\\f69b";
	}
	.fa-syringe:before {
		content: "\\f48e";
	}
	.fa-t:before {
		content: "\\54";
	}
	.fa-table:before {
		content: "\\f0ce";
	}
	.fa-table-cells:before,
	.fa-th:before {
		content: "\\f00a";
	}
	.fa-table-cells-large:before,
	.fa-th-large:before {
		content: "\\f009";
	}
	.fa-columns:before,
	.fa-table-columns:before {
		content: "\\f0db";
	}
	.fa-table-list:before,
	.fa-th-list:before {
		content: "\\f00b";
	}
	.fa-ping-pong-paddle-ball:before,
	.fa-table-tennis-paddle-ball:before,
	.fa-table-tennis:before {
		content: "\\f45d";
	}
	.fa-tablet-android:before,
	.fa-tablet:before {
		content: "\\f3fb";
	}
	.fa-tablet-button:before {
		content: "\\f10a";
	}
	.fa-tablet-alt:before,
	.fa-tablet-screen-button:before {
		content: "\\f3fa";
	}
	.fa-tablets:before {
		content: "\\f490";
	}
	.fa-digital-tachograph:before,
	.fa-tachograph-digital:before {
		content: "\\f566";
	}
	.fa-tag:before {
		content: "\\f02b";
	}
	.fa-tags:before {
		content: "\\f02c";
	}
	.fa-tape:before {
		content: "\\f4db";
	}
	.fa-tarp:before {
		content: "\\e57b";
	}
	.fa-tarp-droplet:before {
		content: "\\e57c";
	}
	.fa-cab:before,
	.fa-taxi:before {
		content: "\\f1ba";
	}
	.fa-teeth:before {
		content: "\\f62e";
	}
	.fa-teeth-open:before {
		content: "\\f62f";
	}
	.fa-temperature-arrow-down:before,
	.fa-temperature-down:before {
		content: "\\e03f";
	}
	.fa-temperature-arrow-up:before,
	.fa-temperature-up:before {
		content: "\\e040";
	}
	.fa-temperature-0:before,
	.fa-temperature-empty:before,
	.fa-thermometer-0:before,
	.fa-thermometer-empty:before {
		content: "\\f2cb";
	}
	.fa-temperature-4:before,
	.fa-temperature-full:before,
	.fa-thermometer-4:before,
	.fa-thermometer-full:before {
		content: "\\f2c7";
	}
	.fa-temperature-2:before,
	.fa-temperature-half:before,
	.fa-thermometer-2:before,
	.fa-thermometer-half:before {
		content: "\\f2c9";
	}
	.fa-temperature-high:before {
		content: "\\f769";
	}
	.fa-temperature-low:before {
		content: "\\f76b";
	}
	.fa-temperature-1:before,
	.fa-temperature-quarter:before,
	.fa-thermometer-1:before,
	.fa-thermometer-quarter:before {
		content: "\\f2ca";
	}
	.fa-temperature-3:before,
	.fa-temperature-three-quarters:before,
	.fa-thermometer-3:before,
	.fa-thermometer-three-quarters:before {
		content: "\\f2c8";
	}
	.fa-tenge-sign:before,
	.fa-tenge:before {
		content: "\\f7d7";
	}
	.fa-tent:before {
		content: "\\e57d";
	}
	.fa-tent-arrow-down-to-line:before {
		content: "\\e57e";
	}
	.fa-tent-arrow-left-right:before {
		content: "\\e57f";
	}
	.fa-tent-arrow-turn-left:before {
		content: "\\e580";
	}
	.fa-tent-arrows-down:before {
		content: "\\e581";
	}
	.fa-tents:before {
		content: "\\e582";
	}
	.fa-terminal:before {
		content: "\\f120";
	}
	.fa-text-height:before {
		content: "\\f034";
	}
	.fa-remove-format:before,
	.fa-text-slash:before {
		content: "\\f87d";
	}
	.fa-text-width:before {
		content: "\\f035";
	}
	.fa-thermometer:before {
		content: "\\f491";
	}
	.fa-thumbs-down:before {
		content: "\\f165";
	}
	.fa-thumbs-up:before {
		content: "\\f164";
	}
	.fa-thumb-tack:before,
	.fa-thumbtack:before {
		content: "\\f08d";
	}
	.fa-ticket:before {
		content: "\\f145";
	}
	.fa-ticket-alt:before,
	.fa-ticket-simple:before {
		content: "\\f3ff";
	}
	.fa-timeline:before {
		content: "\\e29c";
	}
	.fa-toggle-off:before {
		content: "\\f204";
	}
	.fa-toggle-on:before {
		content: "\\f205";
	}
	.fa-toilet:before {
		content: "\\f7d8";
	}
	.fa-toilet-paper:before {
		content: "\\f71e";
	}
	.fa-toilet-paper-slash:before {
		content: "\\e072";
	}
	.fa-toilet-portable:before {
		content: "\\e583";
	}
	.fa-toilets-portable:before {
		content: "\\e584";
	}
	.fa-toolbox:before {
		content: "\\f552";
	}
	.fa-tooth:before {
		content: "\\f5c9";
	}
	.fa-torii-gate:before {
		content: "\\f6a1";
	}
	.fa-tornado:before {
		content: "\\f76f";
	}
	.fa-broadcast-tower:before,
	.fa-tower-broadcast:before {
		content: "\\f519";
	}
	.fa-tower-cell:before {
		content: "\\e585";
	}
	.fa-tower-observation:before {
		content: "\\e586";
	}
	.fa-tractor:before {
		content: "\\f722";
	}
	.fa-trademark:before {
		content: "\\f25c";
	}
	.fa-traffic-light:before {
		content: "\\f637";
	}
	.fa-trailer:before {
		content: "\\e041";
	}
	.fa-train:before {
		content: "\\f238";
	}
	.fa-subway:before,
	.fa-train-subway:before {
		content: "\\f239";
	}
	.fa-train-tram:before,
	.fa-tram:before {
		content: "\\f7da";
	}
	.fa-transgender-alt:before,
	.fa-transgender:before {
		content: "\\f225";
	}
	.fa-trash:before {
		content: "\\f1f8";
	}
	.fa-trash-arrow-up:before,
	.fa-trash-restore:before {
		content: "\\f829";
	}
	.fa-trash-alt:before,
	.fa-trash-can:before {
		content: "\\f2ed";
	}
	.fa-trash-can-arrow-up:before,
	.fa-trash-restore-alt:before {
		content: "\\f82a";
	}
	.fa-tree:before {
		content: "\\f1bb";
	}
	.fa-tree-city:before {
		content: "\\e587";
	}
	.fa-exclamation-triangle:before,
	.fa-triangle-exclamation:before,
	.fa-warning:before {
		content: "\\f071";
	}
	.fa-trophy:before {
		content: "\\f091";
	}
	.fa-trowel:before {
		content: "\\e589";
	}
	.fa-trowel-bricks:before {
		content: "\\e58a";
	}
	.fa-truck:before {
		content: "\\f0d1";
	}
	.fa-truck-arrow-right:before {
		content: "\\e58b";
	}
	.fa-truck-droplet:before {
		content: "\\e58c";
	}
	.fa-shipping-fast:before,
	.fa-truck-fast:before {
		content: "\\f48b";
	}
	.fa-truck-field:before {
		content: "\\e58d";
	}
	.fa-truck-field-un:before {
		content: "\\e58e";
	}
	.fa-truck-front:before {
		content: "\\e2b7";
	}
	.fa-ambulance:before,
	.fa-truck-medical:before {
		content: "\\f0f9";
	}
	.fa-truck-monster:before {
		content: "\\f63b";
	}
	.fa-truck-moving:before {
		content: "\\f4df";
	}
	.fa-truck-pickup:before {
		content: "\\f63c";
	}
	.fa-truck-plane:before {
		content: "\\e58f";
	}
	.fa-truck-loading:before,
	.fa-truck-ramp-box:before {
		content: "\\f4de";
	}
	.fa-teletype:before,
	.fa-tty:before {
		content: "\\f1e4";
	}
	.fa-try:before,
	.fa-turkish-lira-sign:before,
	.fa-turkish-lira:before {
		content: "\\e2bb";
	}
	.fa-level-down-alt:before,
	.fa-turn-down:before {
		content: "\\f3be";
	}
	.fa-level-up-alt:before,
	.fa-turn-up:before {
		content: "\\f3bf";
	}
	.fa-television:before,
	.fa-tv-alt:before,
	.fa-tv:before {
		content: "\\f26c";
	}
	.fa-u:before {
		content: "\\55";
	}
	.fa-umbrella:before {
		content: "\\f0e9";
	}
	.fa-umbrella-beach:before {
		content: "\\f5ca";
	}
	.fa-underline:before {
		content: "\\f0cd";
	}
	.fa-universal-access:before {
		content: "\\f29a";
	}
	.fa-unlock:before {
		content: "\\f09c";
	}
	.fa-unlock-alt:before,
	.fa-unlock-keyhole:before {
		content: "\\f13e";
	}
	.fa-arrows-alt-v:before,
	.fa-up-down:before {
		content: "\\f338";
	}
	.fa-arrows-alt:before,
	.fa-up-down-left-right:before {
		content: "\\f0b2";
	}
	.fa-long-arrow-alt-up:before,
	.fa-up-long:before {
		content: "\\f30c";
	}
	.fa-expand-alt:before,
	.fa-up-right-and-down-left-from-center:before {
		content: "\\f424";
	}
	.fa-external-link-alt:before,
	.fa-up-right-from-square:before {
		content: "\\f35d";
	}
	.fa-upload:before {
		content: "\\f093";
	}
	.fa-user:before {
		content: "\\f007";
	}
	.fa-user-astronaut:before {
		content: "\\f4fb";
	}
	.fa-user-check:before {
		content: "\\f4fc";
	}
	.fa-user-clock:before {
		content: "\\f4fd";
	}
	.fa-user-doctor:before,
	.fa-user-md:before {
		content: "\\f0f0";
	}
	.fa-user-cog:before,
	.fa-user-gear:before {
		content: "\\f4fe";
	}
	.fa-user-graduate:before {
		content: "\\f501";
	}
	.fa-user-friends:before,
	.fa-user-group:before {
		content: "\\f500";
	}
	.fa-user-injured:before {
		content: "\\f728";
	}
	.fa-user-alt:before,
	.fa-user-large:before {
		content: "\\f406";
	}
	.fa-user-alt-slash:before,
	.fa-user-large-slash:before {
		content: "\\f4fa";
	}
	.fa-user-lock:before {
		content: "\\f502";
	}
	.fa-user-minus:before {
		content: "\\f503";
	}
	.fa-user-ninja:before {
		content: "\\f504";
	}
	.fa-user-nurse:before {
		content: "\\f82f";
	}
	.fa-user-edit:before,
	.fa-user-pen:before {
		content: "\\f4ff";
	}
	.fa-user-plus:before {
		content: "\\f234";
	}
	.fa-user-secret:before {
		content: "\\f21b";
	}
	.fa-user-shield:before {
		content: "\\f505";
	}
	.fa-user-slash:before {
		content: "\\f506";
	}
	.fa-user-tag:before {
		content: "\\f507";
	}
	.fa-user-tie:before {
		content: "\\f508";
	}
	.fa-user-times:before,
	.fa-user-xmark:before {
		content: "\\f235";
	}
	.fa-users:before {
		content: "\\f0c0";
	}
	.fa-users-between-lines:before {
		content: "\\e591";
	}
	.fa-users-cog:before,
	.fa-users-gear:before {
		content: "\\f509";
	}
	.fa-users-line:before {
		content: "\\e592";
	}
	.fa-users-rays:before {
		content: "\\e593";
	}
	.fa-users-rectangle:before {
		content: "\\e594";
	}
	.fa-users-slash:before {
		content: "\\e073";
	}
	.fa-users-viewfinder:before {
		content: "\\e595";
	}
	.fa-cutlery:before,
	.fa-utensils:before {
		content: "\\f2e7";
	}
	.fa-v:before {
		content: "\\56";
	}
	.fa-shuttle-van:before,
	.fa-van-shuttle:before {
		content: "\\f5b6";
	}
	.fa-vault:before {
		content: "\\e2c5";
	}
	.fa-vector-square:before {
		content: "\\f5cb";
	}
	.fa-venus:before {
		content: "\\f221";
	}
	.fa-venus-double:before {
		content: "\\f226";
	}
	.fa-venus-mars:before {
		content: "\\f228";
	}
	.fa-vest:before {
		content: "\\e085";
	}
	.fa-vest-patches:before {
		content: "\\e086";
	}
	.fa-vial:before {
		content: "\\f492";
	}
	.fa-vial-circle-check:before {
		content: "\\e596";
	}
	.fa-vial-virus:before {
		content: "\\e597";
	}
	.fa-vials:before {
		content: "\\f493";
	}
	.fa-video-camera:before,
	.fa-video:before {
		content: "\\f03d";
	}
	.fa-video-slash:before {
		content: "\\f4e2";
	}
	.fa-vihara:before {
		content: "\\f6a7";
	}
	.fa-virus:before {
		content: "\\e074";
	}
	.fa-virus-covid:before {
		content: "\\e4a8";
	}
	.fa-virus-covid-slash:before {
		content: "\\e4a9";
	}
	.fa-virus-slash:before {
		content: "\\e075";
	}
	.fa-viruses:before {
		content: "\\e076";
	}
	.fa-voicemail:before {
		content: "\\f897";
	}
	.fa-volcano:before {
		content: "\\f770";
	}
	.fa-volleyball-ball:before,
	.fa-volleyball:before {
		content: "\\f45f";
	}
	.fa-volume-high:before,
	.fa-volume-up:before {
		content: "\\f028";
	}
	.fa-volume-down:before,
	.fa-volume-low:before {
		content: "\\f027";
	}
	.fa-volume-off:before {
		content: "\\f026";
	}
	.fa-volume-mute:before,
	.fa-volume-times:before,
	.fa-volume-xmark:before {
		content: "\\f6a9";
	}
	.fa-vr-cardboard:before {
		content: "\\f729";
	}
	.fa-w:before {
		content: "\\57";
	}
	.fa-walkie-talkie:before {
		content: "\\f8ef";
	}
	.fa-wallet:before {
		content: "\\f555";
	}
	.fa-magic:before,
	.fa-wand-magic:before {
		content: "\\f0d0";
	}
	.fa-magic-wand-sparkles:before,
	.fa-wand-magic-sparkles:before {
		content: "\\e2ca";
	}
	.fa-wand-sparkles:before {
		content: "\\f72b";
	}
	.fa-warehouse:before {
		content: "\\f494";
	}
	.fa-water:before {
		content: "\\f773";
	}
	.fa-ladder-water:before,
	.fa-swimming-pool:before,
	.fa-water-ladder:before {
		content: "\\f5c5";
	}
	.fa-wave-square:before {
		content: "\\f83e";
	}
	.fa-weight-hanging:before {
		content: "\\f5cd";
	}
	.fa-weight-scale:before,
	.fa-weight:before {
		content: "\\f496";
	}
	.fa-wheat-alt:before,
	.fa-wheat-awn:before {
		content: "\\e2cd";
	}
	.fa-wheat-awn-circle-exclamation:before {
		content: "\\e598";
	}
	.fa-wheelchair:before {
		content: "\\f193";
	}
	.fa-wheelchair-alt:before,
	.fa-wheelchair-move:before {
		content: "\\e2ce";
	}
	.fa-glass-whiskey:before,
	.fa-whiskey-glass:before {
		content: "\\f7a0";
	}
	.fa-wifi-3:before,
	.fa-wifi-strong:before,
	.fa-wifi:before {
		content: "\\f1eb";
	}
	.fa-wind:before {
		content: "\\f72e";
	}
	.fa-window-maximize:before {
		content: "\\f2d0";
	}
	.fa-window-minimize:before {
		content: "\\f2d1";
	}
	.fa-window-restore:before {
		content: "\\f2d2";
	}
	.fa-wine-bottle:before {
		content: "\\f72f";
	}
	.fa-wine-glass:before {
		content: "\\f4e3";
	}
	.fa-wine-glass-alt:before,
	.fa-wine-glass-empty:before {
		content: "\\f5ce";
	}
	.fa-krw:before,
	.fa-won-sign:before,
	.fa-won:before {
		content: "\\f159";
	}
	.fa-worm:before {
		content: "\\e599";
	}
	.fa-wrench:before {
		content: "\\f0ad";
	}
	.fa-x:before {
		content: "\\58";
	}
	.fa-x-ray:before {
		content: "\\f497";
	}
	.fa-close:before,
	.fa-multiply:before,
	.fa-remove:before,
	.fa-times:before,
	.fa-xmark:before {
		content: "\\f00d";
	}
	.fa-xmarks-lines:before {
		content: "\\e59a";
	}
	.fa-y:before {
		content: "\\59";
	}
	.fa-cny:before,
	.fa-jpy:before,
	.fa-rmb:before,
	.fa-yen-sign:before,
	.fa-yen:before {
		content: "\\f157";
	}
	.fa-yin-yang:before {
		content: "\\f6ad";
	}
	.fa-z:before {
		content: "\\5a";
	}
	.fa-sr-only,
	.fa-sr-only-focusable:not(:focus),
	.sr-only,
	.sr-only-focusable:not(:focus) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
	:host,
	:root {
		--fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
	}
	@font-face {
		font-family: "Font Awesome 6 Brands";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url(../webfonts/fa-brands-400.woff2) format("woff2"),
			url(../webfonts/fa-brands-400.ttf) format("truetype");
	}
	.fa-brands,
	.fab {
		font-family: "Font Awesome 6 Brands";
		font-weight: 400;
	}
	.fa-42-group:before,
	.fa-innosoft:before {
		content: "\\e080";
	}
	.fa-500px:before {
		content: "\\f26e";
	}
	.fa-accessible-icon:before {
		content: "\\f368";
	}
	.fa-accusoft:before {
		content: "\\f369";
	}
	.fa-adn:before {
		content: "\\f170";
	}
	.fa-adversal:before {
		content: "\\f36a";
	}
	.fa-affiliatetheme:before {
		content: "\\f36b";
	}
	.fa-airbnb:before {
		content: "\\f834";
	}
	.fa-algolia:before {
		content: "\\f36c";
	}
	.fa-alipay:before {
		content: "\\f642";
	}
	.fa-amazon:before {
		content: "\\f270";
	}
	.fa-amazon-pay:before {
		content: "\\f42c";
	}
	.fa-amilia:before {
		content: "\\f36d";
	}
	.fa-android:before {
		content: "\\f17b";
	}
	.fa-angellist:before {
		content: "\\f209";
	}
	.fa-angrycreative:before {
		content: "\\f36e";
	}
	.fa-angular:before {
		content: "\\f420";
	}
	.fa-app-store:before {
		content: "\\f36f";
	}
	.fa-app-store-ios:before {
		content: "\\f370";
	}
	.fa-apper:before {
		content: "\\f371";
	}
	.fa-apple:before {
		content: "\\f179";
	}
	.fa-apple-pay:before {
		content: "\\f415";
	}
	.fa-artstation:before {
		content: "\\f77a";
	}
	.fa-asymmetrik:before {
		content: "\\f372";
	}
	.fa-atlassian:before {
		content: "\\f77b";
	}
	.fa-audible:before {
		content: "\\f373";
	}
	.fa-autoprefixer:before {
		content: "\\f41c";
	}
	.fa-avianex:before {
		content: "\\f374";
	}
	.fa-aviato:before {
		content: "\\f421";
	}
	.fa-aws:before {
		content: "\\f375";
	}
	.fa-bandcamp:before {
		content: "\\f2d5";
	}
	.fa-battle-net:before {
		content: "\\f835";
	}
	.fa-behance:before {
		content: "\\f1b4";
	}
	.fa-behance-square:before {
		content: "\\f1b5";
	}
	.fa-bilibili:before {
		content: "\\e3d9";
	}
	.fa-bimobject:before {
		content: "\\f378";
	}
	.fa-bitbucket:before {
		content: "\\f171";
	}
	.fa-bitcoin:before {
		content: "\\f379";
	}
	.fa-bity:before {
		content: "\\f37a";
	}
	.fa-black-tie:before {
		content: "\\f27e";
	}
	.fa-blackberry:before {
		content: "\\f37b";
	}
	.fa-blogger:before {
		content: "\\f37c";
	}
	.fa-blogger-b:before {
		content: "\\f37d";
	}
	.fa-bluetooth:before {
		content: "\\f293";
	}
	.fa-bluetooth-b:before {
		content: "\\f294";
	}
	.fa-bootstrap:before {
		content: "\\f836";
	}
	.fa-bots:before {
		content: "\\e340";
	}
	.fa-btc:before {
		content: "\\f15a";
	}
	.fa-buffer:before {
		content: "\\f837";
	}
	.fa-buromobelexperte:before {
		content: "\\f37f";
	}
	.fa-buy-n-large:before {
		content: "\\f8a6";
	}
	.fa-buysellads:before {
		content: "\\f20d";
	}
	.fa-canadian-maple-leaf:before {
		content: "\\f785";
	}
	.fa-cc-amazon-pay:before {
		content: "\\f42d";
	}
	.fa-cc-amex:before {
		content: "\\f1f3";
	}
	.fa-cc-apple-pay:before {
		content: "\\f416";
	}
	.fa-cc-diners-club:before {
		content: "\\f24c";
	}
	.fa-cc-discover:before {
		content: "\\f1f2";
	}
	.fa-cc-jcb:before {
		content: "\\f24b";
	}
	.fa-cc-mastercard:before {
		content: "\\f1f1";
	}
	.fa-cc-paypal:before {
		content: "\\f1f4";
	}
	.fa-cc-stripe:before {
		content: "\\f1f5";
	}
	.fa-cc-visa:before {
		content: "\\f1f0";
	}
	.fa-centercode:before {
		content: "\\f380";
	}
	.fa-centos:before {
		content: "\\f789";
	}
	.fa-chrome:before {
		content: "\\f268";
	}
	.fa-chromecast:before {
		content: "\\f838";
	}
	.fa-cloudflare:before {
		content: "\\e07d";
	}
	.fa-cloudscale:before {
		content: "\\f383";
	}
	.fa-cloudsmith:before {
		content: "\\f384";
	}
	.fa-cloudversify:before {
		content: "\\f385";
	}
	.fa-cmplid:before {
		content: "\\e360";
	}
	.fa-codepen:before {
		content: "\\f1cb";
	}
	.fa-codiepie:before {
		content: "\\f284";
	}
	.fa-confluence:before {
		content: "\\f78d";
	}
	.fa-connectdevelop:before {
		content: "\\f20e";
	}
	.fa-contao:before {
		content: "\\f26d";
	}
	.fa-cotton-bureau:before {
		content: "\\f89e";
	}
	.fa-cpanel:before {
		content: "\\f388";
	}
	.fa-creative-commons:before {
		content: "\\f25e";
	}
	.fa-creative-commons-by:before {
		content: "\\f4e7";
	}
	.fa-creative-commons-nc:before {
		content: "\\f4e8";
	}
	.fa-creative-commons-nc-eu:before {
		content: "\\f4e9";
	}
	.fa-creative-commons-nc-jp:before {
		content: "\\f4ea";
	}
	.fa-creative-commons-nd:before {
		content: "\\f4eb";
	}
	.fa-creative-commons-pd:before {
		content: "\\f4ec";
	}
	.fa-creative-commons-pd-alt:before {
		content: "\\f4ed";
	}
	.fa-creative-commons-remix:before {
		content: "\\f4ee";
	}
	.fa-creative-commons-sa:before {
		content: "\\f4ef";
	}
	.fa-creative-commons-sampling:before {
		content: "\\f4f0";
	}
	.fa-creative-commons-sampling-plus:before {
		content: "\\f4f1";
	}
	.fa-creative-commons-share:before {
		content: "\\f4f2";
	}
	.fa-creative-commons-zero:before {
		content: "\\f4f3";
	}
	.fa-critical-role:before {
		content: "\\f6c9";
	}
	.fa-css3:before {
		content: "\\f13c";
	}
	.fa-css3-alt:before {
		content: "\\f38b";
	}
	.fa-cuttlefish:before {
		content: "\\f38c";
	}
	.fa-d-and-d:before {
		content: "\\f38d";
	}
	.fa-d-and-d-beyond:before {
		content: "\\f6ca";
	}
	.fa-dailymotion:before {
		content: "\\e052";
	}
	.fa-dashcube:before {
		content: "\\f210";
	}
	.fa-deezer:before {
		content: "\\e077";
	}
	.fa-delicious:before {
		content: "\\f1a5";
	}
	.fa-deploydog:before {
		content: "\\f38e";
	}
	.fa-deskpro:before {
		content: "\\f38f";
	}
	.fa-dev:before {
		content: "\\f6cc";
	}
	.fa-deviantart:before {
		content: "\\f1bd";
	}
	.fa-dhl:before {
		content: "\\f790";
	}
	.fa-diaspora:before {
		content: "\\f791";
	}
	.fa-digg:before {
		content: "\\f1a6";
	}
	.fa-digital-ocean:before {
		content: "\\f391";
	}
	.fa-discord:before {
		content: "\\f392";
	}
	.fa-discourse:before {
		content: "\\f393";
	}
	.fa-dochub:before {
		content: "\\f394";
	}
	.fa-docker:before {
		content: "\\f395";
	}
	.fa-draft2digital:before {
		content: "\\f396";
	}
	.fa-dribbble:before {
		content: "\\f17d";
	}
	.fa-dribbble-square:before {
		content: "\\f397";
	}
	.fa-dropbox:before {
		content: "\\f16b";
	}
	.fa-drupal:before {
		content: "\\f1a9";
	}
	.fa-dyalog:before {
		content: "\\f399";
	}
	.fa-earlybirds:before {
		content: "\\f39a";
	}
	.fa-ebay:before {
		content: "\\f4f4";
	}
	.fa-edge:before {
		content: "\\f282";
	}
	.fa-edge-legacy:before {
		content: "\\e078";
	}
	.fa-elementor:before {
		content: "\\f430";
	}
	.fa-ello:before {
		content: "\\f5f1";
	}
	.fa-ember:before {
		content: "\\f423";
	}
	.fa-empire:before {
		content: "\\f1d1";
	}
	.fa-envira:before {
		content: "\\f299";
	}
	.fa-erlang:before {
		content: "\\f39d";
	}
	.fa-ethereum:before {
		content: "\\f42e";
	}
	.fa-etsy:before {
		content: "\\f2d7";
	}
	.fa-evernote:before {
		content: "\\f839";
	}
	.fa-expeditedssl:before {
		content: "\\f23e";
	}
	.fa-facebook:before {
		content: "\\f09a";
	}
	.fa-facebook-f:before {
		content: "\\f39e";
	}
	.fa-facebook-messenger:before {
		content: "\\f39f";
	}
	.fa-facebook-square:before {
		content: "\\f082";
	}
	.fa-fantasy-flight-games:before {
		content: "\\f6dc";
	}
	.fa-fedex:before {
		content: "\\f797";
	}
	.fa-fedora:before {
		content: "\\f798";
	}
	.fa-figma:before {
		content: "\\f799";
	}
	.fa-firefox:before {
		content: "\\f269";
	}
	.fa-firefox-browser:before {
		content: "\\e007";
	}
	.fa-first-order:before {
		content: "\\f2b0";
	}
	.fa-first-order-alt:before {
		content: "\\f50a";
	}
	.fa-firstdraft:before {
		content: "\\f3a1";
	}
	.fa-flickr:before {
		content: "\\f16e";
	}
	.fa-flipboard:before {
		content: "\\f44d";
	}
	.fa-fly:before {
		content: "\\f417";
	}
	.fa-font-awesome-flag:before,
	.fa-font-awesome-logo-full:before,
	.fa-font-awesome:before {
		content: "\\f2b4";
	}
	.fa-fonticons:before {
		content: "\\f280";
	}
	.fa-fonticons-fi:before {
		content: "\\f3a2";
	}
	.fa-fort-awesome:before {
		content: "\\f286";
	}
	.fa-fort-awesome-alt:before {
		content: "\\f3a3";
	}
	.fa-forumbee:before {
		content: "\\f211";
	}
	.fa-foursquare:before {
		content: "\\f180";
	}
	.fa-free-code-camp:before {
		content: "\\f2c5";
	}
	.fa-freebsd:before {
		content: "\\f3a4";
	}
	.fa-fulcrum:before {
		content: "\\f50b";
	}
	.fa-galactic-republic:before {
		content: "\\f50c";
	}
	.fa-galactic-senate:before {
		content: "\\f50d";
	}
	.fa-get-pocket:before {
		content: "\\f265";
	}
	.fa-gg:before {
		content: "\\f260";
	}
	.fa-gg-circle:before {
		content: "\\f261";
	}
	.fa-git:before {
		content: "\\f1d3";
	}
	.fa-git-alt:before {
		content: "\\f841";
	}
	.fa-git-square:before {
		content: "\\f1d2";
	}
	.fa-github:before {
		content: "\\f09b";
	}
	.fa-github-alt:before {
		content: "\\f113";
	}
	.fa-github-square:before {
		content: "\\f092";
	}
	.fa-gitkraken:before {
		content: "\\f3a6";
	}
	.fa-gitlab:before {
		content: "\\f296";
	}
	.fa-gitter:before {
		content: "\\f426";
	}
	.fa-glide:before {
		content: "\\f2a5";
	}
	.fa-glide-g:before {
		content: "\\f2a6";
	}
	.fa-gofore:before {
		content: "\\f3a7";
	}
	.fa-golang:before {
		content: "\\e40f";
	}
	.fa-goodreads:before {
		content: "\\f3a8";
	}
	.fa-goodreads-g:before {
		content: "\\f3a9";
	}
	.fa-google:before {
		content: "\\f1a0";
	}
	.fa-google-drive:before {
		content: "\\f3aa";
	}
	.fa-google-pay:before {
		content: "\\e079";
	}
	.fa-google-play:before {
		content: "\\f3ab";
	}
	.fa-google-plus:before {
		content: "\\f2b3";
	}
	.fa-google-plus-g:before {
		content: "\\f0d5";
	}
	.fa-google-plus-square:before {
		content: "\\f0d4";
	}
	.fa-google-wallet:before {
		content: "\\f1ee";
	}
	.fa-gratipay:before {
		content: "\\f184";
	}
	.fa-grav:before {
		content: "\\f2d6";
	}
	.fa-gripfire:before {
		content: "\\f3ac";
	}
	.fa-grunt:before {
		content: "\\f3ad";
	}
	.fa-guilded:before {
		content: "\\e07e";
	}
	.fa-gulp:before {
		content: "\\f3ae";
	}
	.fa-hacker-news:before {
		content: "\\f1d4";
	}
	.fa-hacker-news-square:before {
		content: "\\f3af";
	}
	.fa-hackerrank:before {
		content: "\\f5f7";
	}
	.fa-hashnode:before {
		content: "\\e499";
	}
	.fa-hips:before {
		content: "\\f452";
	}
	.fa-hire-a-helper:before {
		content: "\\f3b0";
	}
	.fa-hive:before {
		content: "\\e07f";
	}
	.fa-hooli:before {
		content: "\\f427";
	}
	.fa-hornbill:before {
		content: "\\f592";
	}
	.fa-hotjar:before {
		content: "\\f3b1";
	}
	.fa-houzz:before {
		content: "\\f27c";
	}
	.fa-html5:before {
		content: "\\f13b";
	}
	.fa-hubspot:before {
		content: "\\f3b2";
	}
	.fa-ideal:before {
		content: "\\e013";
	}
	.fa-imdb:before {
		content: "\\f2d8";
	}
	.fa-instagram:before {
		content: "\\f16d";
	}
	.fa-instagram-square:before {
		content: "\\e055";
	}
	.fa-instalod:before {
		content: "\\e081";
	}
	.fa-intercom:before {
		content: "\\f7af";
	}
	.fa-internet-explorer:before {
		content: "\\f26b";
	}
	.fa-invision:before {
		content: "\\f7b0";
	}
	.fa-ioxhost:before {
		content: "\\f208";
	}
	.fa-itch-io:before {
		content: "\\f83a";
	}
	.fa-itunes:before {
		content: "\\f3b4";
	}
	.fa-itunes-note:before {
		content: "\\f3b5";
	}
	.fa-java:before {
		content: "\\f4e4";
	}
	.fa-jedi-order:before {
		content: "\\f50e";
	}
	.fa-jenkins:before {
		content: "\\f3b6";
	}
	.fa-jira:before {
		content: "\\f7b1";
	}
	.fa-joget:before {
		content: "\\f3b7";
	}
	.fa-joomla:before {
		content: "\\f1aa";
	}
	.fa-js:before {
		content: "\\f3b8";
	}
	.fa-js-square:before {
		content: "\\f3b9";
	}
	.fa-jsfiddle:before {
		content: "\\f1cc";
	}
	.fa-kaggle:before {
		content: "\\f5fa";
	}
	.fa-keybase:before {
		content: "\\f4f5";
	}
	.fa-keycdn:before {
		content: "\\f3ba";
	}
	.fa-kickstarter:before {
		content: "\\f3bb";
	}
	.fa-kickstarter-k:before {
		content: "\\f3bc";
	}
	.fa-korvue:before {
		content: "\\f42f";
	}
	.fa-laravel:before {
		content: "\\f3bd";
	}
	.fa-lastfm:before {
		content: "\\f202";
	}
	.fa-lastfm-square:before {
		content: "\\f203";
	}
	.fa-leanpub:before {
		content: "\\f212";
	}
	.fa-less:before {
		content: "\\f41d";
	}
	.fa-line:before {
		content: "\\f3c0";
	}
	.fa-linkedin:before {
		content: "\\f08c";
	}
	.fa-linkedin-in:before {
		content: "\\f0e1";
	}
	.fa-linode:before {
		content: "\\f2b8";
	}
	.fa-linux:before {
		content: "\\f17c";
	}
	.fa-lyft:before {
		content: "\\f3c3";
	}
	.fa-magento:before {
		content: "\\f3c4";
	}
	.fa-mailchimp:before {
		content: "\\f59e";
	}
	.fa-mandalorian:before {
		content: "\\f50f";
	}
	.fa-markdown:before {
		content: "\\f60f";
	}
	.fa-mastodon:before {
		content: "\\f4f6";
	}
	.fa-maxcdn:before {
		content: "\\f136";
	}
	.fa-mdb:before {
		content: "\\f8ca";
	}
	.fa-medapps:before {
		content: "\\f3c6";
	}
	.fa-medium-m:before,
	.fa-medium:before {
		content: "\\f23a";
	}
	.fa-medrt:before {
		content: "\\f3c8";
	}
	.fa-meetup:before {
		content: "\\f2e0";
	}
	.fa-megaport:before {
		content: "\\f5a3";
	}
	.fa-mendeley:before {
		content: "\\f7b3";
	}
	.fa-microblog:before {
		content: "\\e01a";
	}
	.fa-microsoft:before {
		content: "\\f3ca";
	}
	.fa-mix:before {
		content: "\\f3cb";
	}
	.fa-mixcloud:before {
		content: "\\f289";
	}
	.fa-mixer:before {
		content: "\\e056";
	}
	.fa-mizuni:before {
		content: "\\f3cc";
	}
	.fa-modx:before {
		content: "\\f285";
	}
	.fa-monero:before {
		content: "\\f3d0";
	}
	.fa-napster:before {
		content: "\\f3d2";
	}
	.fa-neos:before {
		content: "\\f612";
	}
	.fa-nfc-directional:before {
		content: "\\e530";
	}
	.fa-nfc-symbol:before {
		content: "\\e531";
	}
	.fa-nimblr:before {
		content: "\\f5a8";
	}
	.fa-node:before {
		content: "\\f419";
	}
	.fa-node-js:before {
		content: "\\f3d3";
	}
	.fa-npm:before {
		content: "\\f3d4";
	}
	.fa-ns8:before {
		content: "\\f3d5";
	}
	.fa-nutritionix:before {
		content: "\\f3d6";
	}
	.fa-octopus-deploy:before {
		content: "\\e082";
	}
	.fa-odnoklassniki:before {
		content: "\\f263";
	}
	.fa-odnoklassniki-square:before {
		content: "\\f264";
	}
	.fa-old-republic:before {
		content: "\\f510";
	}
	.fa-opencart:before {
		content: "\\f23d";
	}
	.fa-openid:before {
		content: "\\f19b";
	}
	.fa-opera:before {
		content: "\\f26a";
	}
	.fa-optin-monster:before {
		content: "\\f23c";
	}
	.fa-orcid:before {
		content: "\\f8d2";
	}
	.fa-osi:before {
		content: "\\f41a";
	}
	.fa-padlet:before {
		content: "\\e4a0";
	}
	.fa-page4:before {
		content: "\\f3d7";
	}
	.fa-pagelines:before {
		content: "\\f18c";
	}
	.fa-palfed:before {
		content: "\\f3d8";
	}
	.fa-patreon:before {
		content: "\\f3d9";
	}
	.fa-paypal:before {
		content: "\\f1ed";
	}
	.fa-perbyte:before {
		content: "\\e083";
	}
	.fa-periscope:before {
		content: "\\f3da";
	}
	.fa-phabricator:before {
		content: "\\f3db";
	}
	.fa-phoenix-framework:before {
		content: "\\f3dc";
	}
	.fa-phoenix-squadron:before {
		content: "\\f511";
	}
	.fa-php:before {
		content: "\\f457";
	}
	.fa-pied-piper:before {
		content: "\\f2ae";
	}
	.fa-pied-piper-alt:before {
		content: "\\f1a8";
	}
	.fa-pied-piper-hat:before {
		content: "\\f4e5";
	}
	.fa-pied-piper-pp:before {
		content: "\\f1a7";
	}
	.fa-pied-piper-square:before {
		content: "\\e01e";
	}
	.fa-pinterest:before {
		content: "\\f0d2";
	}
	.fa-pinterest-p:before {
		content: "\\f231";
	}
	.fa-pinterest-square:before {
		content: "\\f0d3";
	}
	.fa-pix:before {
		content: "\\e43a";
	}
	.fa-playstation:before {
		content: "\\f3df";
	}
	.fa-product-hunt:before {
		content: "\\f288";
	}
	.fa-pushed:before {
		content: "\\f3e1";
	}
	.fa-python:before {
		content: "\\f3e2";
	}
	.fa-qq:before {
		content: "\\f1d6";
	}
	.fa-quinscape:before {
		content: "\\f459";
	}
	.fa-quora:before {
		content: "\\f2c4";
	}
	.fa-r-project:before {
		content: "\\f4f7";
	}
	.fa-raspberry-pi:before {
		content: "\\f7bb";
	}
	.fa-ravelry:before {
		content: "\\f2d9";
	}
	.fa-react:before {
		content: "\\f41b";
	}
	.fa-reacteurope:before {
		content: "\\f75d";
	}
	.fa-readme:before {
		content: "\\f4d5";
	}
	.fa-rebel:before {
		content: "\\f1d0";
	}
	.fa-red-river:before {
		content: "\\f3e3";
	}
	.fa-reddit:before {
		content: "\\f1a1";
	}
	.fa-reddit-alien:before {
		content: "\\f281";
	}
	.fa-reddit-square:before {
		content: "\\f1a2";
	}
	.fa-redhat:before {
		content: "\\f7bc";
	}
	.fa-renren:before {
		content: "\\f18b";
	}
	.fa-replyd:before {
		content: "\\f3e6";
	}
	.fa-researchgate:before {
		content: "\\f4f8";
	}
	.fa-resolving:before {
		content: "\\f3e7";
	}
	.fa-rev:before {
		content: "\\f5b2";
	}
	.fa-rocketchat:before {
		content: "\\f3e8";
	}
	.fa-rockrms:before {
		content: "\\f3e9";
	}
	.fa-rust:before {
		content: "\\e07a";
	}
	.fa-safari:before {
		content: "\\f267";
	}
	.fa-salesforce:before {
		content: "\\f83b";
	}
	.fa-sass:before {
		content: "\\f41e";
	}
	.fa-schlix:before {
		content: "\\f3ea";
	}
	.fa-screenpal:before {
		content: "\\e570";
	}
	.fa-scribd:before {
		content: "\\f28a";
	}
	.fa-searchengin:before {
		content: "\\f3eb";
	}
	.fa-sellcast:before {
		content: "\\f2da";
	}
	.fa-sellsy:before {
		content: "\\f213";
	}
	.fa-servicestack:before {
		content: "\\f3ec";
	}
	.fa-shirtsinbulk:before {
		content: "\\f214";
	}
	.fa-shopify:before {
		content: "\\e057";
	}
	.fa-shopware:before {
		content: "\\f5b5";
	}
	.fa-simplybuilt:before {
		content: "\\f215";
	}
	.fa-sistrix:before {
		content: "\\f3ee";
	}
	.fa-sith:before {
		content: "\\f512";
	}
	.fa-sitrox:before {
		content: "\\e44a";
	}
	.fa-sketch:before {
		content: "\\f7c6";
	}
	.fa-skyatlas:before {
		content: "\\f216";
	}
	.fa-skype:before {
		content: "\\f17e";
	}
	.fa-slack-hash:before,
	.fa-slack:before {
		content: "\\f198";
	}
	.fa-slideshare:before {
		content: "\\f1e7";
	}
	.fa-snapchat-ghost:before,
	.fa-snapchat:before {
		content: "\\f2ab";
	}
	.fa-snapchat-square:before {
		content: "\\f2ad";
	}
	.fa-soundcloud:before {
		content: "\\f1be";
	}
	.fa-sourcetree:before {
		content: "\\f7d3";
	}
	.fa-speakap:before {
		content: "\\f3f3";
	}
	.fa-speaker-deck:before {
		content: "\\f83c";
	}
	.fa-spotify:before {
		content: "\\f1bc";
	}
	.fa-square-font-awesome:before {
		content: "\\f425";
	}
	.fa-font-awesome-alt:before,
	.fa-square-font-awesome-stroke:before {
		content: "\\f35c";
	}
	.fa-squarespace:before {
		content: "\\f5be";
	}
	.fa-stack-exchange:before {
		content: "\\f18d";
	}
	.fa-stack-overflow:before {
		content: "\\f16c";
	}
	.fa-stackpath:before {
		content: "\\f842";
	}
	.fa-staylinked:before {
		content: "\\f3f5";
	}
	.fa-steam:before {
		content: "\\f1b6";
	}
	.fa-steam-square:before {
		content: "\\f1b7";
	}
	.fa-steam-symbol:before {
		content: "\\f3f6";
	}
	.fa-sticker-mule:before {
		content: "\\f3f7";
	}
	.fa-strava:before {
		content: "\\f428";
	}
	.fa-stripe:before {
		content: "\\f429";
	}
	.fa-stripe-s:before {
		content: "\\f42a";
	}
	.fa-studiovinari:before {
		content: "\\f3f8";
	}
	.fa-stumbleupon:before {
		content: "\\f1a4";
	}
	.fa-stumbleupon-circle:before {
		content: "\\f1a3";
	}
	.fa-superpowers:before {
		content: "\\f2dd";
	}
	.fa-supple:before {
		content: "\\f3f9";
	}
	.fa-suse:before {
		content: "\\f7d6";
	}
	.fa-swift:before {
		content: "\\f8e1";
	}
	.fa-symfony:before {
		content: "\\f83d";
	}
	.fa-teamspeak:before {
		content: "\\f4f9";
	}
	.fa-telegram-plane:before,
	.fa-telegram:before {
		content: "\\f2c6";
	}
	.fa-tencent-weibo:before {
		content: "\\f1d5";
	}
	.fa-the-red-yeti:before {
		content: "\\f69d";
	}
	.fa-themeco:before {
		content: "\\f5c6";
	}
	.fa-themeisle:before {
		content: "\\f2b2";
	}
	.fa-think-peaks:before {
		content: "\\f731";
	}
	.fa-tiktok:before {
		content: "\\e07b";
	}
	.fa-trade-federation:before {
		content: "\\f513";
	}
	.fa-trello:before {
		content: "\\f181";
	}
	.fa-tumblr:before {
		content: "\\f173";
	}
	.fa-tumblr-square:before {
		content: "\\f174";
	}
	.fa-twitch:before {
		content: "\\f1e8";
	}
	.fa-twitter:before {
		content: "\\f099";
	}
	.fa-twitter-square:before {
		content: "\\f081";
	}
	.fa-typo3:before {
		content: "\\f42b";
	}
	.fa-uber:before {
		content: "\\f402";
	}
	.fa-ubuntu:before {
		content: "\\f7df";
	}
	.fa-uikit:before {
		content: "\\f403";
	}
	.fa-umbraco:before {
		content: "\\f8e8";
	}
	.fa-uncharted:before {
		content: "\\e084";
	}
	.fa-uniregistry:before {
		content: "\\f404";
	}
	.fa-unity:before {
		content: "\\e049";
	}
	.fa-unsplash:before {
		content: "\\e07c";
	}
	.fa-untappd:before {
		content: "\\f405";
	}
	.fa-ups:before {
		content: "\\f7e0";
	}
	.fa-usb:before {
		content: "\\f287";
	}
	.fa-usps:before {
		content: "\\f7e1";
	}
	.fa-ussunnah:before {
		content: "\\f407";
	}
	.fa-vaadin:before {
		content: "\\f408";
	}
	.fa-viacoin:before {
		content: "\\f237";
	}
	.fa-viadeo:before {
		content: "\\f2a9";
	}
	.fa-viadeo-square:before {
		content: "\\f2aa";
	}
	.fa-viber:before {
		content: "\\f409";
	}
	.fa-vimeo:before {
		content: "\\f40a";
	}
	.fa-vimeo-square:before {
		content: "\\f194";
	}
	.fa-vimeo-v:before {
		content: "\\f27d";
	}
	.fa-vine:before {
		content: "\\f1ca";
	}
	.fa-vk:before {
		content: "\\f189";
	}
	.fa-vnv:before {
		content: "\\f40b";
	}
	.fa-vuejs:before {
		content: "\\f41f";
	}
	.fa-watchman-monitoring:before {
		content: "\\e087";
	}
	.fa-waze:before {
		content: "\\f83f";
	}
	.fa-weebly:before {
		content: "\\f5cc";
	}
	.fa-weibo:before {
		content: "\\f18a";
	}
	.fa-weixin:before {
		content: "\\f1d7";
	}
	.fa-whatsapp:before {
		content: "\\f232";
	}
	.fa-whatsapp-square:before {
		content: "\\f40c";
	}
	.fa-whmcs:before {
		content: "\\f40d";
	}
	.fa-wikipedia-w:before {
		content: "\\f266";
	}
	.fa-windows:before {
		content: "\\f17a";
	}
	.fa-wirsindhandwerk:before,
	.fa-wsh:before {
		content: "\\e2d0";
	}
	.fa-wix:before {
		content: "\\f5cf";
	}
	.fa-wizards-of-the-coast:before {
		content: "\\f730";
	}
	.fa-wodu:before {
		content: "\\e088";
	}
	.fa-wolf-pack-battalion:before {
		content: "\\f514";
	}
	.fa-wordpress:before {
		content: "\\f19a";
	}
	.fa-wordpress-simple:before {
		content: "\\f411";
	}
	.fa-wpbeginner:before {
		content: "\\f297";
	}
	.fa-wpexplorer:before {
		content: "\\f2de";
	}
	.fa-wpforms:before {
		content: "\\f298";
	}
	.fa-wpressr:before {
		content: "\\f3e4";
	}
	.fa-xbox:before {
		content: "\\f412";
	}
	.fa-xing:before {
		content: "\\f168";
	}
	.fa-xing-square:before {
		content: "\\f169";
	}
	.fa-y-combinator:before {
		content: "\\f23b";
	}
	.fa-yahoo:before {
		content: "\\f19e";
	}
	.fa-yammer:before {
		content: "\\f840";
	}
	.fa-yandex:before {
		content: "\\f413";
	}
	.fa-yandex-international:before {
		content: "\\f414";
	}
	.fa-yarn:before {
		content: "\\f7e3";
	}
	.fa-yelp:before {
		content: "\\f1e9";
	}
	.fa-yoast:before {
		content: "\\f2b1";
	}
	.fa-youtube:before {
		content: "\\f167";
	}
	.fa-youtube-square:before {
		content: "\\f431";
	}
	.fa-zhihu:before {
		content: "\\f63f";
	}
	:host,
	:root {
		--fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
	}
	@font-face {
		font-family: "Font Awesome 6 Free";
		font-style: normal;
		font-weight: 400;
		font-display: block;
		src: url(../webfonts/fa-regular-400.woff2) format("woff2"),
			url(../webfonts/fa-regular-400.ttf) format("truetype");
	}
	.fa-regular,
	.far {
		font-family: "Font Awesome 6 Free";
		font-weight: 400;
	}
	:host,
	:root {
		--fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
	}
	@font-face {
		font-family: "Font Awesome 6 Free";
		font-style: normal;
		font-weight: 900;
		font-display: block;
		src: url(../webfonts/fa-solid-900.woff2) format("woff2"),
			url(../webfonts/fa-solid-900.ttf) format("truetype");
	}
	.fa-solid,
	.fas {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}
	@font-face {
		font-family: "Font Awesome 5 Brands";
		font-display: block;
		font-weight: 400;
		src: url(../webfonts/fa-brands-400.woff2) format("woff2"),
			url(../webfonts/fa-brands-400.ttf) format("truetype");
	}
	@font-face {
		font-family: "Font Awesome 5 Free";
		font-display: block;
		font-weight: 900;
		src: url(../webfonts/fa-solid-900.woff2) format("woff2"),
			url(../webfonts/fa-solid-900.ttf) format("truetype");
	}
	@font-face {
		font-family: "Font Awesome 5 Free";
		font-display: block;
		font-weight: 400;
		src: url(../webfonts/fa-regular-400.woff2) format("woff2"),
			url(../webfonts/fa-regular-400.ttf) format("truetype");
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url(../webfonts/fa-solid-900.woff2) format("woff2"),
			url(../webfonts/fa-solid-900.ttf) format("truetype");
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url(../webfonts/fa-brands-400.woff2) format("woff2"),
			url(../webfonts/fa-brands-400.ttf) format("truetype");
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url(../webfonts/fa-regular-400.woff2) format("woff2"),
			url(../webfonts/fa-regular-400.ttf) format("truetype");
		unicode-range: u+f003, u+f006, u+f014, u+f016-f017, u+f01a-f01b, u+f01d,
			u+f022, u+f03e, u+f044, u+f046, u+f05c-f05d, u+f06e, u+f070, u+f087-f088,
			u+f08a, u+f094, u+f096-f097, u+f09d, u+f0a0, u+f0a2, u+f0a4-f0a7, u+f0c5,
			u+f0c7, u+f0e5-f0e6, u+f0eb, u+f0f6-f0f8, u+f10c, u+f114-f115, u+f118-f11a,
			u+f11c-f11d, u+f133, u+f147, u+f14e, u+f150-f152, u+f185-f186, u+f18e,
			u+f190-f192, u+f196, u+f1c1-f1c9, u+f1d9, u+f1db, u+f1e3, u+f1ea, u+f1f7,
			u+f1f9, u+f20a, u+f247-f248, u+f24a, u+f24d, u+f255-f25b, u+f25d,
			u+f271-f274, u+f278, u+f27b, u+f28c, u+f28e, u+f29c, u+f2b5, u+f2b7, u+f2ba,
			u+f2bc, u+f2be, u+f2c0-f2c1, u+f2c3, u+f2d0, u+f2d2, u+f2d4, u+f2dc;
	}
	@font-face {
		font-family: "FontAwesome";
		font-display: block;
		src: url(../webfonts/fa-v4compatibility.woff2) format("woff2"),
			url(../webfonts/fa-v4compatibility.ttf) format("truetype");
		unicode-range: u+f041, u+f047, u+f065-f066, u+f07d-f07e, u+f080, u+f08b,
			u+f08e, u+f090, u+f09a, u+f0ac, u+f0ae, u+f0b2, u+f0d0, u+f0d6, u+f0e4,
			u+f0ec, u+f10a-f10b, u+f123, u+f13e, u+f148-f149, u+f14c, u+f156, u+f15e,
			u+f160-f161, u+f163, u+f175-f178, u+f195, u+f1f8, u+f219, u+f250, u+f252,
			u+f27a;
	}`,
	'KOL-INPUT-RANGE': `input,
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
	kol-input {
		gap: var(--spacing);
	}
	kol-input > label {
		order: 1;
		color: var(--default-letter);
	}
	kol-input > .input {
		border-color: var(--kolibri-border-color);
		border-radius: 0.25rem;
		border-style: solid;
		border-width: 2px;
		order: 2;
	}
	kol-input:hover > .input {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > .input > kol-icon:first-child {
		margin-left: 0.75em;
	}
	kol-input > .input > kol-icon:last-child {
		margin-right: 0.75em;
	}
	kol-input > .error {
		order: 3;
	}
	kol-input > .hint {
		order: 4;
		font-size: 0.875em;
	}
	input,
	select,
	textarea {
		color: var(--default-letter);
		padding: 0.5em 0.75em;
	}
	input:not([type="range"]),
	select:not([multiple]) {
		height: 2.75em;
	}
	textarea {
		display: inherit;
	}
	input::placeholder {
		color: var(--default-border-hover);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
	}
	select[multiple],
	textarea {
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
});
