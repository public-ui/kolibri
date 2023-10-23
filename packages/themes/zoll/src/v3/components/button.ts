import { css } from '../cssTag';

export default css`
	/* BASE */
	kol-link-wc > a,
	kol-button-wc > button {
		border-radius: var(--border-radius);
		font-size: var(--font-size-buttons);
		font-weight: 700;
		transition: outline-offset 0.2s linear;

		&:not(:disabled):hover,
		&:focus {
			outline: 0.125rem solid var(--color-blau-dark);
			outline-offset: 0.125rem;
		}
	}
	kol-button-wc > button > kol-span-wc,
	kol-link-wc > a > kol-span-wc {
		border-radius: var(--border-radius);
		border-style: solid;
		border-width: 2px;
		line-height: 1rem;

		&:not(.hide-label) {
			padding: 0.75rem 1rem;
		}

		&.hide-label {
			padding: 0.75rem;
		}
	}

	kol-button-wc > button > kol-span-wc span,
	kol-link-wc > a > kol-span-wc span {
		gap: 0.5rem; /* Gap between icon and text-label */
	}

	/* PRIMARY */
	kol-link-wc.primary > a,
	kol-button-wc.primary > button {
		& > kol-span-wc {
			background-color: var(--color-akzent);
			border-color: var(--color-akzent);
			color: var(--color-neutral-dark-correct);
		}
	}

	/* SECONDARY */
	kol-link-wc.secondary > a,
	kol-button-wc.secondary > button {
		& > kol-span-wc {
			background: white;
			border-color: var(--color-blau);
			color: var(--color-blau);
		}
		&:not(:disabled):hover,
		&:focus {
			outline-color: var(--color-blau);
		}
	}

	/* NORMAL */
	kol-link-wc.normal > a,
	kol-button-wc.normal > button {
		& > kol-span-wc {
			background-color: var(--color-blau);
			border-color: var(--color-blau);
			color: white;
		}

		&:not(:disabled):hover > kol-span-wc,
		&:focus > kol-span-wc {
			background-color: var(--color-blau-dark);
			border-color: var(--color-blau-dark);
		}
	}

	/* DANGER */
	kol-link-wc.danger > a,
	kol-button-wc.danger > button {
		& > kol-span-wc {
			background-color: var(--color-rot);
			border-color: var(--color-rot);
			color: white;
		}

		&:not(:disabled):hover,
		&:focus {
			outline-color: var(--color-rot);
		}
	}

	/* GHOST */
	kol-link-wc.ghost > a,
	kol-button-wc.ghost > button {
		& > kol-span-wc {
			background-color: transparent;
			border-color: transparent;
			color: var(--color-blau);
		}

		&:not(:disabled):hover,
		&:focus {
			outline-color: var(--color-blau);
		}
	}
`;
