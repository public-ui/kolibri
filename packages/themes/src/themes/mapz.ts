import { KoliBri } from '@public-ui/components';

// Mitarbeiterportal Zoll
export const MAPZ = KoliBri.createTheme('mapz', {
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
		--kolibri-border-color: unset;
		--kolibri-border-radius: unset;
		--kolibri-border-width: unset;
		--kolibri-color-error: unset;
		--kolibri-color-info: unset;
		--kolibri-color-success: unset;
		--kolibri-color-warning: unset;
		--kolibri-color-primary: unset;
		--kolibri-color-secondary: unset;
		--kolibri-color-normal: unset;
		--kolibri-color-danger: unset;
		--kolibri-color-ghost: unset;
		--kolibri-color-disabled: unset;
		--kolibri-color-text: unset;
		--kolibri-color-visited: unset;
		--kolibri-font-family: unset;
		--kolibri-font-size: unset;
		--kolibri-spacing: unset;
	}
	:host {
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
	*[tabindex]:focus,
	a:focus,
	button:focus,
	input:focus,
	select:focus,
	summary:focus,
	textarea:focus {
		cursor: pointer;
		outline-color: var(--kolibri-color-outline);
		outline-offset: 2px;
		outline-style: solid;
		outline-width: 3px;
		transition: outline-offset 0.2s linear;
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
	'KOL-ALERT': `:host {
		--kolibri-border-width: 1px;
	}
	.heading kol-icon {
		align-self: stretch;
		align-items: center;
	}
	.heading .heading-icon {
		height: 100%;
		width: 2em;
		padding: calc(2 * var(--kolibri-spacing));
	}
	div.default {
		border-color: var(--kolibri-color-gray);
	}
	.default .heading-icon {
		background-color: var(--kolibri-color-gray);
	}
	div.error {
		border-color: var(--kolibri-color-error);
	}
	.error .heading-icon {
		background-color: var(--kolibri-color-error);
	}
	div.info {
		border-color: var(--kolibri-color-info);
	}
	.info .heading-icon {
		background-color: var(--kolibri-color-info);
	}
	div.success {
		border-color: var(--kolibri-color-success);
	}
	.success .heading-icon {
		background-color: var(--kolibri-color-success);
	}
	div.warning {
		border-color: var(--kolibri-color-warning);
	}
	.warning .heading-icon {
		background-color: var(--kolibri-color-warning);
	}`,
	'KOL-INPUT-TEXT': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-BUTTON-GROUP': `div {
		display: inline-flex;
		flex-wrap: wrap;
		padding: 0.25em;
		border-radius: 5px;
		gap: 0.25em;
	}`,
	'KOL-INPUT-PASSWORD': `:host {
		--kolibri-spacing: 0.25rem;
	}
	kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-NUMBER': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-EMAIL': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-FILE': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-TEXTAREA': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
	}
	fieldset div input[type="radio"]:before {
		content: "";
		cursor: pointer;
		left: calc(1.5 * var(--spacing) - 2px);
		top: calc(1.5 * var(--spacing) - 2px);
		position: relative;
		border-radius: 100%;
		display: block;
		height: calc(3 * var(--spacing));
		width: calc(3 * var(--spacing));
	}
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
		border-radius: 0.3125rem;
		gap: 0.5rem;
		line-height: 1.25rem;
	}`,
	'KOL-LINK': `kol-link-wc,
	kol-link-button-wc {
		display: inline-block;
	}
	a,
	button {
		color: var(--kolibri-color-primary);
		text-decoration-line: underline;
	}
	a:hover,
	button:hover {
		text-decoration-thickness: 0.2em;
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
	'KOL-SELECT': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
		background-color: var(--kolibri-color-primary);
		color: white;
	}`,
	'KOL-INPUT-COLOR': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--kolibri-color-secondary);
	}
	kol-input > label {
		order: 1;
	}
	kol-input > label > span {
		color: var(--default-letter);
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		border-radius: 0.25rem;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
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
		line-height: 1.5em;
		color: var(--default-letter);
		border-color: var(--kolibri-border-color);
		border-width: 2px;
		border-style: solid;
		padding: 0.5em 0.75em;
		border-radius: 0.25rem;
		overflow: hidden;
		width: 100%;
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
		background-color: var(--background-light-grey);
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icon-left input,
	.icon-left select {
		padding-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		padding-right: 2em;
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
	'KOL-NAV': `* {
		hyphens: var(--kolibri-hyphens);
		font-family: var(--font-family);
		line-height: var(--kolibri-line-height);
		word-break: break-word;
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
		padding: 0.125em;
	}
	.entry:focus,
	.entry:hover {
		background-color: var(--kolibri-color-focus);
	}
	.entry.selected {
		background-color: hsla(0, 0%, 100%, 0.2);
	}
	a {
		border: 1px solid transparent;
		border-radius: var(--kolibri-border-radius);
		color: inherit;
		display: flex;
		line-height: 2em;
		padding: 0.5em;
		text-decoration: none;
	}
	a:focus-visible {
		position: relative;
		z-index: 1;
	}
	a kol-icon + span {
		margin-left: 0.5rem;
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
	:host > div:first-child {
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
	'KOL-LINK-BUTTON': `a > kol-span-wc,
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
		color: var(--kolibri-color-primary);
		display: inline-flex;
		flex-wrap: wrap;
		text-decoration-line: underline;
	}
	a:hover,
	button:hover {
		text-decoration-thickness: 0.2em;
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
	'KOL-INDENTED-TEXT': `:host > div {
		border-left: none;
		box-shadow: -4px 0px 0px var(--kolibri-color-primary);
		padding: 0.25em 0.5em;
		width: 100%;
	}`,
});
