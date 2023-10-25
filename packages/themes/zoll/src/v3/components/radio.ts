import { css } from '../../cssTag';

export default css`
	/* ALL INPUT, SELECT, TEXTAREA */
	:host {
		--spacing: 0.25rem;
	}
	legend {
		font-weight: var(--font-weight-bold);
		margin-bottom: 0.5rem;
	}
	input {
		border-color: var(--color-neutral-dark);
		border-width: 2px;
		border-style: solid;
	}
	kol-input:has(input:disabled) input,
	kol-input:has(input:disabled) label {
		cursor: not-allowed !important;
		opacity: 0.5;
	}
	kol-input:hover:has(input:not(:disabled)) label,
	kol-input:focus-within {
		text-decoration: underline;
	}
	.required legend > span::after {
		content: '*';
		padding-left: 0.125em;
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
		border: 0;
		margin: 0;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
	}
	fieldset div.input {
		display: flex;
	}
	fieldset div.input > div {
		margin: auto 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
	}
	fieldset div input[type='radio'] {
		appearance: none;
		transition: 0.5s;
		border-radius: 100% !important; /* important to enforce during shared :focus style */
		height: calc(6 * var(--spacing));
		min-width: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
		border-color: var(--color-grau-30);
	}
	kol-input:not(.disabled):hover input[type='radio'],
	kol-input:focus-within input[type='radio'] {
		border-color: var(--color-neutral-dark-correct);
	}
	.error input[type='radio'] {
		border-color: var(--color-rot);
	}
	fieldset div input[type='radio']:checked:before {
		box-shadow: 0 0 0.1rem black;
		background-color: var(--color-blau);
	}
	fieldset legend {
		order: 1;
		display: contents;
	}
	fieldset #error {
		margin: 0.4em 0;
		order: 2;
	}
	fieldset kol-input {
		order: 3;
	}
	.radio-input-wrapper {
		display: flex;
		align-items: center;
	}
	.radio-label {
		padding-left: 0.75rem;
	}
	fieldset.horizontal {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
	}
	fieldset.horizontal legend {
		display: inline-block;
		margin-bottom: 0.25em;
	}
`;
