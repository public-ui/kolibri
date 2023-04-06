import { KoliBri } from '@public-ui/components';

// Bundeszentralamt für Steuern
export const BZSt = KoliBri.createTheme('bzst', {
	GLOBAL: `:host {
		/* Primärfarbe und Abstufungen */
		--color-gruen-dunkel: #23614e;
		--color-gruen: #4d7f6f;
		--color-gruen-hell: #a7c0b8; /* Sekundärfarben */
		--color-weiss: #fff;
		--color-grau-dunkel: #333;
		--color-grau-hell: #ebebeb;
		--color-grau-weiss: #f2f2f2; /* Textfarben */
		--color-graublau: #595f73; /* Signalfarben */
		--color-blau: #126dff;
		--color-blau-dunkel: #007194;
		--color-gelb: #ffe695;
		--color-rot: #d00000;
		--color-disabled: #595f73;
		--font-family: BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif;
		--font-size: 10px;
		--text-size: calc(var(--font-size) * 1.8);
		--line-height: 19px;
		--color-focus: var(--color-blau);
		--spacing: 4px;
		--color-text: var(--color-grau-dunkel);
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
		/* margin: 0; */
		font-family: var(--font-family);
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
		display: block;
	}
	a:focus,
	button:focus,
	input:focus,
	select:focus,
	summary:focus,
	textarea:focus {
		cursor: pointer;
		outline-color: var(--color-focus);
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
	}`,
	'KOL-BUTTON': `:host {
		--background-color: var(--color-gruen-dunkel);
		--border-color: var(--color-gruen-dunkel);
		--border-size: 1px;
		--min-size: 4.4rem;
		display: inline-block;
	}
	button {
		border-width: var(--border-size);
		border-style: solid;
		min-width: var(--min-size);
		min-height: var(--min-size);
		display: grid;
		gap: 0.25em;
		line-height: 1.5rem;
		font-family: var(--font-family);
		cursor: pointer;
		font-size: var(--text-size);
		align-items: center;
		padding: 0.8rem 1.4rem;
		justify-content: center;
		font-style: normal;
		text-align: center;
		text-transform: uppercase;
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	button:hover:enabled {
		text-decoration: underline;
	}
	button:focus {
		outline: var(--color-focus) solid 2px;
	}
	button.primary,
	button.primary:active,
	button.primary:hover {
		background-color: var(--background-color);
		border-color: var(--border-color);
		color: var(--color-weiss);
	}
	button.secondary,
	button.danger,
	button.normal,
	button.ghost {
		background-color: var(--color-weiss);
		border-color: var(--color-gruen-hell);
		color: var(--color-grau-dunkel);
	}
	button.ghost {
		background-color: transparent;
		color: #fff;
		border: calc(var(--border-size) * 2) solid transparent;
	}
	button.secondary:active,
	button.secondary:hover {
		background-color: var(--background-color);
		border-color: var(--background-color);
		border-width: var(--border-size);
		color: var(--color-weiss);
	}
	button:disabled,
	button:disabled:hover {
		background-color: var(--color-weiss);
		border-color: var(--color-grau-hell);
		color: var(--color-disabled);
		cursor: not-allowed;
	}
	button > span {
		display: flex;
		gap: 0.5em;
		margin: auto;
		align-items: center;
		justify-content: center;
	}
	button.icon-only {
		padding: 8px;
	}
	button.icon-only kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	button.loading kol-icon {
		animation: spin 5s infinite linear;
	}`,
	'KOL-INPUT-TEXT': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
		font-size: var(--text-size);
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--color-gruen-hell);
	}
	.error input:invalid,
	.error select:invalid,
	.error textarea:invalid {
		border-color: var(--color-rot);
	}
	input:focus-within,
	select:focus-within,
	textarea:focus-within {
		outline: var(--color-focus) solid 2px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-width: 2px;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 1rem;
	}
	kol-input > label > span {
		color: black;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25rem;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: var(--text-size);
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-gruen-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-INPUT-PASSWORD': `kol-input {
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
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
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
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
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
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
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
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
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
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
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
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
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
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
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
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-TEXTAREA': `/* input */
	kol-input {
		display: grid;
		padding: 0;
		margin: 0;
		font-size: var(--text-size);
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--color-gruen-hell);
	}
	.error input:invalid,
	.error select:invalid,
	.error textarea:invalid {
		border-color: var(--color-rot);
	}
	input:focus-within,
	select:focus-within,
	textarea:focus-within {
		outline: var(--color-focus) solid 2px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-width: 2px;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 1rem;
	}
	kol-input > label > span {
		color: black;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25rem;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: var(--text-size);
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-gruen-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-ALERT': `:host > div {
		background-color: white;
		border-width: 2px;
		border-style: solid;
		border-radius: 0.25rem;
		display: flex;
		overflow: unset;
	}
	:host > div.default {
		border-color: var(--color-grau-dunkel);
	}
	:host > div.default > .icon {
		background-color: var(--color-grau-dunkel);
	}
	:host > div.error {
		border-color: var(--color-rot);
	}
	:host > div.error > .icon {
		background-color: var(--color-rot);
	}
	:host > div.info {
		border-color: var(--color-blau);
	}
	:host > div.info > .icon {
		background-color: var(--color-blau);
	}
	:host > div.success {
		border-color: var(--color-gruen);
	}
	:host > div.success > .icon {
		background-color: var(--color-gruen);
	}
	:host > div.warning {
		border-color: var(--color-gelb);
	}
	:host > div.warning > .icon {
		background-color: var(--color-gelb);
	}
	:host > div.msg > .icon {
		color: white;
		padding: 0.5em;
		align-items: center;
		display: inline-flex;
	}
	:host > div.msg.warning > .icon {
		color: black;
	}
	:host > div.card.default .heading .icon {
		background-color: var(--color-grau-dunkel);
	}
	:host > div.card.error .heading .icon {
		background-color: var(--color-rot);
	}
	:host > div.card.info .heading .icon {
		background-color: var(--color-blau);
	}
	:host > div.card.success .heading .icon {
		background-color: var(--color-gruen);
	}
	:host > div.card.warning .heading .icon {
		background-color: var(--color-gelb);
	}
	:host > div.card .heading .icon {
		color: white;
		padding: 0.5em;
		align-items: center;
		display: inline-flex;
	}
	:host > div.card.warning .heading .icon {
		color: black;
	}
	:host > div kol-heading-wc .icon {
		margin-right: 0.5em;
	}
	:host > div.card .heading .icon {
		border-radius: 0 0 0.25rem 0;
	}
	:host > div.msg > div {
		padding: 0.25em;
	}
	:host > div.msg > div > .heading {
		padding: 0.25em;
		display: inline-block;
	}
	:host > div .content {
		padding: 0.25em;
	}
	:host > div > div {
		display: grid;
		grid-template-columns: 1fr auto;
	}
	:host > div > div > .content {
		grid-row: 2;
		grid-column: 1;
	}
	:host > div > div > .close {
		grid-row: 1 / span 2;
		display: flex;
	}
	:host > div.msg > div > .close > * {
		margin: auto;
	}
	:host > div.msg.default .close .icon {
		color: var(--color-grau-dunkel);
	}
	:host > div.msg.error .close .icon {
		color: var(--color-rot);
	}
	:host > div.msg.info .close .icon {
		color: var(--color-blau);
	}
	:host > div.msg.success .close .icon {
		color: var(--color-gruen);
	}
	:host > div.msg.warning .close .icon {
		color: var(--color-gelb);
	}
	:host > div.card > div > .heading {
		width: 100%;
	}
	.close > button {
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
		text-transform: uppercase;
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
	}
	.close kol-icon::part(icon)::before {
		content: "\f00d";
	}`,
	'KOL-HEADING': `h1,
	h2,
	h3,
	h4 {
		color: var(--color-grau-dunkel);
	}
	h1,
	h2 {
		font-weight: normal;
	} /* h3,h4 {font-weight: bold;} */
	h1 {
		font-size: calc(var(--font-size) * 4);
		line-height: calc(var(--font-size) * 4.5);
		font-weight: normal;
	}
	h2 {
		font-size: calc(var(--font-size) * 3.2);
		line-height: calc(var(--font-size) * 3.7);
		font-weight: normal;
	}
	h3 {
		font-size: calc(var(--font-size) * 2.1);
		line-height: calc(var(--font-size) * 2.7);
	}
	h4 {
		font-size: calc(var(--font-size) * 1.8);
		line-height: calc(var(--font-size) * 2.7);
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
	'KOL-BUTTON-GROUP': `div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		width: 100%;
		padding: 15px;
		background: var(--color-grau-weiss);
		box-shadow: -4px 0px 0px var(--color-gruen);
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
	a {
		color: var(--color-gruen);
		font-style: normal;
		font-weight: 400;
		display: inline-flex;
		line-height: 1.5em;
		text-decoration-line: none !important; /* outline: none !important; */
	}
	a:focus-within {
		outline: var(--color-focus) solid 2px;
	} /* a:focus-within, */
	a:hover {
		box-shadow: inset 0 -1px 0 0 var(--color-gruen);
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
	'KOL-DETAILS': `details {
		display: grid;
		width: 100%;
	}
	summary {
		cursor: pointer;
		display: flow-root;
		margin: 0;
		padding: 0;
	}
	summary span {
		margin-left: 0.25rem;
		text-decoration: underline;
	}
	summary span:hover {
		text-decoration-thickness: 0.25em;
	}
	details > kol-indented-text {
		margin: 0.25em 0 0 0.6em;
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
		stroke: var(--color-ice);
	}
	svg line:last-child,
	svg circle:last-child {
		stroke: var(--color-midnight);
		fill: transparent;
	}
	progress {
		display: none;
	}`,
	'KOL-SELECT': `kol-input {
		display: grid;
		padding: 0;
		margin: 0;
		font-size: var(--text-size);
	}
	input:focus,
	input:hover,
	select:focus,
	select:hover,
	textarea:focus,
	textarea:hover {
		border-color: var(--color-gruen-hell);
	}
	.error input:invalid,
	.error select:invalid,
	.error textarea:invalid {
		border-color: var(--color-rot);
	}
	input:focus-within,
	select:focus-within,
	textarea:focus-within {
		outline: var(--color-focus) solid 2px;
	}
	input:hover,
	select:hover,
	textarea:hover {
		border-width: 2px;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 1rem;
	}
	kol-input > label > span {
		color: black;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25rem;
		order: 3;
	}
	input,
	select,
	textarea {
		font-family: var(--font-family);
		background-color: transparent;
		box-sizing: border-box;
		font-size: var(--text-size);
		display: inline-flex;
		line-height: 1.5em;
		color: black;
		border-color: var(--color-gruen-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
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
		border-color: black;
	}
	kol-input > label {
		order: 1;
		margin-bottom: 0.25em;
	}
	kol-input > label > span {
		color: black;
		font-size: 0.875rem;
		line-height: 1.5rem;
	}
	kol-input > div.input {
		background-color: white;
		display: block;
		order: 2;
	}
	kol-input > kol-alert.error {
		margin-top: 0.25em;
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
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: 1px;
		border-style: solid;
		padding: 0.5em 0.75em;
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
		color: var(--color-grau-dunkel);
	}
	input:not([type="color"]):read-only,input:disabled,/* select:read-only, */select:disabled,textarea:read-only,textarea:disabled {
		cursor: not-allowed;
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
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grau-dunkel);
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
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
		cursor: pointer;
	}
	select option:disabled {
		cursor: not-allowed;
	}
	option:active:not(:disabled),
	option:checked:not(:disabled),
	option:focus:not(:disabled),
	option:hover:not(:disabled) {
		color: white;
	}`,
	'KOL-ACCORDION': `:host > div {
		font-family: var(--font-family);
		padding: 0 0.5rem 0 0;
	}
	:host > div > kol-heading-wc {
		background-color: var(--color-gruen-hell);
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
		padding: 0.5em;
	}
	:host > div[part*="open"] > kol-heading-wc button {
		padding: 0.5em;
	}
	:host > div > kol-heading-wc button kol-icon::part(icon) {
		font-weight: 900;
		color: var(--color-midnight);
	}
	:host > div > kol-heading-wc button kol-icon::part(close)::before {
		font-family: "Font Awesome 6 Free";
		content: "\f077";
	}
	:host > div > kol-heading-wc button kol-icon::part(open)::before {
		font-family: "Font Awesome 6 Free";
		content: "\f078";
	}
	:host > div {
		width: 100%;
		height: 100%;
		display: grid;
	}
	:host > div[part*="open"] div[part="header"],
	:host > div[part*="open"] div[part="content"] {
		padding-left: 2em;
	}
	:host > div[part*="open"] div[part="content"] {
		font-size: 18px;
		line-height: 24px;
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
	}
	:host > div > [part="header"] {
		height: 0;
	}`,
	'KOL-TABLE': `:host * {
		hyphens: var(--hyphens);
		font-family: var(--font-family);
		line-height: var(--line-height);
		word-break: normal;
	}
	:host > div:first-child {
		overflow-x: auto;
		overflow-y: hidden;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}
	caption {
		height: auto;
		text-align: left;
		padding: 1rem 0;
	}
	table,
	tr,
	th,
	td {
		border: 0 solid var(--color-weiss);
	}
	tr {
		border-top-width: 2px;
	}
	th {
		background-color: var(--color-gruen);
		color: var(--color-weiss);
		font-weight: normal;
	}
	tbody > tr:nth-child(odd) {
		background-color: #f2f2f2;
	}
	tbody > tr:hover {
		background-color: var(--color-gruen-dunkel);
		color: var(--color-weiss);
	}
	th,
	td {
		border-right-width: 2px;
		padding: 0.25em 0.5em;
	}
	th > div {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.25em;
	}
	:host > div.pagination {
		padding: 0.5em;
	}
	:host > div:last-child,
	:host > div.pagination > div:last-child {
		display: grid;
		align-items: center;
		justify-items: center;
		gap: 0.5em;
	}
	@media (min-width: 1024px) {
		:host > div:last-child,
		:host > div.pagination > div:last-child {
			grid-auto-flow: column;
		}
		:host > div.pagination kol-pagination {
			display: flex;
			gap: 1rem;
		}
	}
	:host kol-button button {
		padding: 1rem;
	}`,
	'KOL-NAV': `* {
		margin: 0;
		padding: 0;
	}
	nav {
		font-family: var(--font-family);
		font-size: 18px;
		background-color: var(--color-grau-hell);
	}
	ul {
		list-style: none;
	}
	a {
		background-color: var(--color-white);
		text-decoration: none;
		color: var(--color-dunkel);
		width: 100%;
		display: block;
		font-style: normal;
		font-weight: 700;
		padding: 0.75rem 0.5rem 0.75rem 0;
		border-left-color: var(--color-gruen-dunkel);
		border-left-style: solid;
		border-left-width: 0.5rem;
		line-height: 1.5rem;
		min-height: 44px;
		min-width: 44px;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	a:hover {
		border-left-color: var(--color-gruen-dunkel);
		background-color: var(--color-gruen-hell);
		color: var(--color-grau-dunkel);
	}
	a > kol-icon {
		display: inline-block;
		text-align: center;
		width: 44px;
	}
	button {
		background-color: var(--color-gruen-dunkel);
	}
	a[part*="selected"] {
		background-color: var(--color-ice);
		border-left-color: var(--color-midnight);
		color: var(--color-midnight);
	}
	.hidden {
		display: none;
	}
	:host > div > div:last-child {
		margin-top: 0.5em;
		width: 100%;
		text-align: center;
	} /* horizontal */
	ul.flex {
		display: flex;
	}
	li > div > div.absolute {
		position: absolute;
	}`,
	'KOL-CARD': `:host > div {
		--card-padding: calc(var(--font-size) * 3.2);
		border-color: var(--color-grau-hell);
		border-style: solid;
		border-width: 1px;
		border-radius: 0.25rem;
		display: grid;
		width: 100%;
		height: 100%;
		background-color: white;
		grid-template-rows: min-content 2fr min-content;
		padding-bottom: calc(var(--font-size) * 4);
	}
	:host kol-heading-wc {
		display: inline-flex;
		font-style: normal;
		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	:host kol-heading-wc h1 {
		font-size: calc(var(--font-size) * 4);
		line-height: calc(var(--font-size) * 4.5);
		font-weight: normal;
		margin: 0;
	}
	:host kol-heading-wc h2 {
		font-size: calc(var(--font-size) * 3.2);
		line-height: calc(var(--font-size) * 3.7);
		font-weight: normal;
		margin: 0;
	}
	:host kol-heading-wc h3 {
		font-size: calc(var(--font-size) * 2.1);
		line-height: calc(var(--font-size) * 2.7);
	}
	:host kol-heading-wc h4 {
		font-size: calc(var(--font-size) * 1.8);
		line-height: calc(var(--font-size) * 2.7);
	}
	:host div.header {
		border-bottom: 1px solid currentColor;
		padding: var(--card-padding);
	}
	:host div.content {
		padding: var(--card-padding) var(--card-padding) 0;
	}
	:host div.footer {
		margin-top: calc(var(--font-size) * 3);
		padding: 0 var(--card-padding);
	}`,
	'KOL-INPUT-CHECKBOX': `:host {
		--border-width: 1px;
		--spacing: 0.25rem;
	}
	label {
		cursor: pointer;
	}
	input {
		color: black;
		border-color: var(--color-grau-dunkel);
		border-width: var(--border-width);
		border-style: solid;
		line-height: 24px;
		font-size: 16px;
	}
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
	}
	input:hover {
		border-color: var(--color-blau);
	} /* NEU */
	kol-input {
		display: grid;
		align-items: center;
		justify-items: left;
		width: 100%;
	}
	kol-input.checkbox {
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
		background-color: var(--color-blau);
		border-color: var(--color-blau);
	}
	.checkbox input[type="checkbox"] {
		height: calc(6 * var(--spacing));
		min-width: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:before {
		background-color: transparent;
		display: block;
		height: calc(6 * var(--spacing));
		position: relative;
		width: calc(6 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:checked:before {
		border-right-width: 3px;
		border-bottom-width: 3px;
		left: calc(1.5 * var(--spacing) - var(--border-width));
		top: calc(2.85 * var(--spacing) - var(--border-width));
		transform: rotate(40deg) translate(-50%, -50%);
		background-color: transparent;
		border-width: 0px 3px 3px 0px;
		border-color: white;
		border-style: solid;
		height: calc(3 * var(--spacing));
		width: calc(1.5 * var(--spacing));
	}
	.checkbox input[type="checkbox"]:indeterminate:before {
		background-color: var(--color-grau-dunkel);
		height: 0.375rem;
		top: 0.5rem;
		left: 0.2rem;
		width: calc(4 * var(--spacing));
	}
	.switch input[type="checkbox"] {
		min-width: 3.2em;
		width: 3.2em;
		height: 1.7em;
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
		left: calc(0.25em - var(--border-width));
		top: calc(0.25em - var(--border-width));
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
		background-color: var(--color-blau);
	}
	.disabled {
		opacity: 0.33;
	}`,
	'KOL-INPUT-RADIO': `:host {
		--border-width: 1px;
		--input-color: var(--color-gruen-dunkel);
		--input-inner-position: calc(var(--spacing) + var(--border-width));
		--input-inner-size: calc(var(--spacing) * 3);
		--input-outer-size: calc(var(--spacing) * 6);
	}
	div[slot="input"] {
		align-items: center;
		display: flex;
		gap: calc(var(--spacing) * 2);
	}
	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
	}
	fieldset.horizontal {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 32px;
	}
	input {
		cursor: pointer;
		border: var(--border-width) solid var(--input-color);
		appearance: none;
		border-radius: 100%;
		height: var(--input-outer-size);
		width: var(--input-outer-size);
		margin: 0;
	}
	input:hover {
		--border-width: 2px;
	}
	input:focus:hover {
		box-shadow: none;
	}
	input:disabled {
		--input-color: var(--color-disabled);
	}
	input:disabled:hover {
		--border-width: 1px;
	}
	input:disabled + label {
		color: var(--color-disabled);
	}
	input::before {
		content: "";
		cursor: pointer;
		left: var(--input-inner-position);
		top: var(--input-inner-position);
		position: relative;
		border-radius: 100%;
		display: block;
		height: var(--input-inner-size);
		width: var(--input-inner-size);
	}
	input:hover::before {
		--input-inner-position: var(--spacing);
	}
	input:checked::before {
		background-color: var(--input-color);
	}
	kol-input {
		display: grid;
	}
	kol-input {
		margin-bottom: 1rem;
	}
	kol-input.error input {
		border-color: var(--color-rot);
		padding-left: 1em;
	}
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		outline: var(--color-focus) solid 2px !important;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		order: 1;
	}
	kol-input.error kol-alert.error {
		color: var(--color-rot);
		font-weight: 700;
	}
	label {
		color: var(--color-text);
		cursor: pointer;
		display: grid;
		font-size: var(--text-size); /* order: 2; */
	}
	legend {
		font-size: var(--text-size);
		margin-bottom: var(--text-size);
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
	.required label > span::after {
		content: "*";
		padding-left: 0.125em;
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
	:host {
		font-family: var(--font-family);
	}
	:host > div {
		display: block;
		width: 100%;
	}
	:host kol-button-group-wc {
		display: inline-block;
		border-radius: 0.25rem 0.25rem 0 0;
		background-color: var(--kolibri-color-normal);
	}
	:host kol-button-group-wc > div {
		display: inline-flex;
	}
	:host kol-button-group-wc > div + div {
		margin-left: 0.25em;
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
	kol-button-wc[aria-selected="true"] button {
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
		line-height: 1.5;
		font-family: var(--font-family);
		cursor: not-allowed;
		font-weight: 700;
		padding: 10px 12px;
		border-radius: 1.5em;
		border: none;
		font-size: 16px;
		font-style: normal;
		text-align: center;
		text-transform: uppercase;
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
	:host kol-select label {
		padding: 0;
	}`,
	'KOL-INPUT-RANGE': `/* https://www.cssportal.com/style-input-range/ */
	kol-input {
		display: grid;
	}
	kol-input label {
		order: 2;
		margin-bottom: 0.4em;
	}
	kol-input div.input {
		box-sizing: border-box;
		order: 3;
		background-color: white;
		border-radius: 0.3125rem;
	}
	kol-input kol-alert.error {
		margin-bottom: 0.4em;
		order: 1;
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
		border-color: var(--color-grey);
		border-width: 2px;
		border-style: solid;
		padding: 0.625em 0.875em;
		border-radius: 0.3125rem;
		overflow: hidden;
		width: calc(100% - 4em);
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
	.required #label::after {
		content: "*";
		padding-left: 0.125em;
	}
	.icons {
		display: flex;
		justify-content: space-between;
		height: 0;
	}
	.icons > * {
		margin: 0.725em 0.875em;
		box-sizing: border-box;
		border-color: transparent;
		border-width: 2px;
		border-style: solid;
	}
	.icon-left input,
	.icon-left select {
		padding-left: calc(0.875em + 1em + 0.5em);
	}
	.icon-right input,
	.icon-right select {
		padding-right: calc(0.875em + 1em + 0.5em);
	}
	kol-input.error {
		border-left: 3px solid var(--color-red);
		padding-left: 1em;
	}
	kol-input.error input:focus,
	kol-input.error select:focus,
	kol-input.error textarea:focus {
		outline-color: var(--color-red) !important;
	}
	kol-input.error kol-alert.error {
		color: var(--color-red);
		font-weight: 700;
	}
	kol-button-wc {
		position: relative;
		float: right;
		z-index: 1000;
		margin-top: -33px;
	}
	kol-button-wc button {
		border: 1px solid var(--color-grey);
		border-radius: 0.25rem;
		box-sizing: border-box;
		background-color: transparent;
		cursor: pointer;
	}
	.icon-right kol-button-wc {
		margin-right: 2.5em;
	}
	.disabled {
		opacity: 0.33;
	}
	.icon-left input,
	.icon-left select {
		margin-left: 2em;
	}
	.icon-right input,
	.icon-right select {
		margin-right: 2em;
	}
	input[type="range"] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	input[type="range"] {
		overflow: visible;
		background-color: var(--color-ice);
		border: 0;
		height: 0.5rem;
		padding: 0;
		padding-bottom: 0;
		margin-bottom: 0;
	}
	input[type="range"]::-webkit-slider-thumb {
		box-sizing: border-box;
		background-color: var(--color-midnight);
		height: 20px;
		width: 20px;
		border-radius: 20px;
		cursor: pointer;
		-webkit-appearance: none;
	}`,
	'KOL-LINK-BUTTON': `:host {
		display: inline-block;
	} /*-----------*/
	a {
		border-width: 1px;
		border-style: solid;
		min-width: 44px;
		min-height: 44px;
		display: grid;
		gap: 0.25em;
		line-height: 1.5rem;
		font-family: var(--font-family);
		font-weight: 700;
		cursor: pointer;
		font-size: var(--font-size);
		align-items: center;
		padding: 8px 14px;
		justify-content: center;
		font-style: normal;
		text-align: center;
		text-transform: uppercase;
		width: inherit;
		transition-duration: 0.5s;
		transition-property: background-color, color, border-color;
	}
	a:hover:enabled {
		text-decoration: underline;
	}
	.primary a,
	.primary a:active,
	.primary a:hover {
		background-color: var(--color-gruen-dunkel);
		border-color: var(--color-gruen-dunkel);
		color: var(--color-weiss);
	}
	.secondary a,
	.danger a,
	.normal a,
	.ghost a {
		background-color: var(--color-weiss);
		border-color: var(--color-gruen-hell);
		color: var(--color-grau-dunkel);
	}
	.secondary a:active,
	.secondary a:hover {
		background-color: var(--color-gruen-dunkel);
		border-color: var(--color-gruen-dunkel);
		border-width: 1px;
		color: var(--color-weiss);
	}
	a:disabled,
	a:disabled:hover {
		background-color: var(--color-weiss);
		border-color: var(--color-grau-hell);
		color: var(--color-graublau);
		cursor: not-allowed;
	}
	a > span {
		display: flex;
		gap: 0.5em;
		margin: auto;
		align-items: center;
		justify-content: center;
	}
	a.icon-only {
		padding: 8px;
	}
	a.icon-only kol-icon {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
	}
	a.loading kol-icon {
		animation: spin 5s infinite linear;
	}`,
	'KOL-BUTTON-LINK': `button {
		background-color: transparent;
		border: 0;
		cursor: pointer;
	}
	kol-link-button-wc {
		display: inline-block;
	}
	button {
		color: var(--color-blau);
		font-style: normal;
		font-weight: 400;
		display: inline-flex;
		line-height: 1.5em;
		text-decoration-line: none !important;
		outline: none !important;
	}
	button:focus-within,
	button:hover {
		box-shadow: inset 0 -1px 0 0 var(--color-blau);
	}
	kol-icon {
		padding: 0 0.25em;
		display: inline-block;
	}`,
	'KOL-ABBR': `abbr {
		text-decoration: none;
		border-bottom: dotted var(--color-metal) 1px;
	}`,
});
