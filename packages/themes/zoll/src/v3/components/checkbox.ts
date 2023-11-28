import { css } from '../../cssTag';

export default css`
	:host {
		--spacing: 0.25rem;
	}
	/* BASE */
	kol-input {
		display: grid;
		align-items: center;
		justify-items: left;
		width: 100%;

		&.disabled {
			opacity: 0.5;
		}
	}
	kol-input > label {
		padding-left: 0.75rem;
	}
	kol-input:not(.disabled):hover label,
	kol-input:not(.disabled):focus-within label {
		text-decoration: underline;
	}
	kol-input.error label {
		color: var(--color-rot);
	}
	kol-input.required label > span::after {
		content: '*';
		padding-left: 0.125em;
	}
	.input {
		display: inline-flex;
	}
	.input input {
		appearance: none;
		background-color: white;
		margin: 0;
		&:before {
			content: '';
		}
	}
	kol-input.error input[type='checkbox'] {
		border: 2px solid var(--color-rot);
	}
	kol-input:not(.disabled) :is(.input, label) {
		cursor: pointer;
	}
	kol-input.disabled :is(.input, label) {
		cursor: not-allowed;
	}
	kol-input > .error {
		padding-top: 0.25em;
		grid-column: span 2 / auto;
	}

	/* Grid order: */
	kol-input {
		& > .input {
			order: 1;
		}
		& > label {
			order: 2;
		}
		& > .error {
			order: 3;
		}
		& > .hint {
			order: 4;
		}
	}

	/* DEFAULT */
	kol-input.default {
		grid-template-columns: calc(6 * var(--spacing)) auto;
	}
	.default input[type='checkbox'] {
		border-radius: 0.25em;
		border: 2px solid var(--color-neutral-dark);
		height: calc(6 * var(--spacing));
		width: calc(6 * var(--spacing));
		&::before {
			display: block;
			height: calc(6 * var(--spacing));
			width: calc(6 * var(--spacing));
		}
		&:checked::before {
			left: calc(1.5 * var(--spacing) - 2px);
			top: calc(2.85 * var(--spacing) - 2px);
			transform: rotate(40deg) translate(-50%, -50%);
			border-width: 0 3px 3px 0;
			border-color: var(--color-blau);
			border-radius: 1px;
			border-style: solid;
			height: calc(3 * var(--spacing));
			width: calc(1.5 * var(--spacing));
		}
		&:indeterminate::before {
			background-color: var(--color-blau);
			height: 0.6rem;
			left: 0.325rem;
			top: 0.325rem;
			width: 0.6rem;
		}
	}
	kol-input.default:not(.disabled):hover input,
	kol-input.default:focus-within input {
		border-color: var(--color-neutral-dark-correct);
	}

	/* SWITCH */
	kol-input.switch {
		grid-template-columns: calc(13 * var(--spacing)) auto;
	}
	.switch input[type='checkbox'] {
		background: var(--color-grau-50);
		border-color: transparent;
		border-radius: var(--a11y-min-size);
		display: inline-block;
		height: 1.7em;
		position: relative;
		transition: outline-offset 0.25s linear;
		width: 3.2em;
	}
	.switch input[type='checkbox']::before {
		background-color: white;
		border-radius: 50%;
		height: 1.2em;
		left: calc(0.25em - 2px);
		position: absolute;
		top: calc(0.25em - 2px);
		width: 1.2em;
	}
	.switch:not(.disabled):hover input[type='checkbox'],
	.switch:not(.disabled):focus-within input[type='checkbox'] {
		outline: 0.125rem solid var(--color-blau-dark);
		outline-offset: 0.125rem;
	}
	.switch input[type='checkbox']:checked {
		background: var(--color-blau);
	}
	.switch input[type='checkbox']:checked::before {
		transform: translateX(1.5em);
	}
	.switch input[type='checkbox']:indeterminate:before {
		transform: translateX(0.75em);
	}
	.switch .icon {
		color: var(--color-blau);
		transition: transform 0.5s; /* Override default transition which transitions all properties. We only want transform (not opacity). */

		&::part(icon) {
			font-weight: 700;
		}
	}
	.switch:has(input[type='checkbox']:not(:checked, :indeterminate)) .icon {
		opacity: 0; /* Avoid display: none because it breaks the transform-animation */
	}

	/* BUTTON */
	kol-input.button {
		grid-template-areas: 'input label' 'error error' 'hint hint';
	}

	.button:focus-within {
		outline: 0.125rem solid var(--color-blau);
		outline-offset: 0.125rem;
	}
`;
