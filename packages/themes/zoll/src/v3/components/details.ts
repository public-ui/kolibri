import { css } from "../cssTag";

export default css`
	details > summary {
		border-radius: var(--border-radius);
		border: 0.125rem solid transparent; /* Use border instead of outline because detail component uses overflow: hidden */
		color: var(--color-blau);
		font-weight: 700;
		padding: 0.75rem 1rem;
		width: fit-content;
		&:hover,
		&:focus {
			border-color: var(--color-blau-dark);
			color: var(--color-blau-dark);
			outline: 0;
		}
	}
	details > summary > kol-icon {
		display: block;
		font-size: 1.125rem;
		transform: rotate(90deg);

		&::part(icon) {
			font-weight: 700;
		}
	}
	details[open] > summary > kol-icon {
		transform: rotate(180deg);
	}
	details > summary > span {
		border-bottom: 0;
		margin-left: 0.75rem;
	}
	.content kol-indented-text {
		padding-left: 1.6rem;
		padding-top: 1rem;
	}
`;
