import { css } from '../../cssTag';

export default css`
	kol-button-group-wc {
		width: fit-content;
		border-bottom: 1px solid var(--color-grau-20);
	}
	kol-button-group-wc button {
		border-bottom: 3px solid transparent;
		color: var(--color-neutral-dark-correct);
		padding: 0 1.5rem;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		&:not(:disabled):hover,
		&:focus {
			color: var(--color-blau-dark);
			outline: 2px solid var(--color-blau-dark);
			outline-offset: -2px;
		}
	}
	kol-button-wc button.selected,
	kol-button-wc[aria-selected='true'] button {
		border-bottom-color: var(--color-blau);
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;
