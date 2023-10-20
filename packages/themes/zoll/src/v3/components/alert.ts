import { css } from "../cssTag";

export default css`
	kol-alert-wc {
		border-width: 2px;
		border-style: solid;
		border-radius: 0.25rem;
		color: var(--color-grau-60);
	}

	kol-alert-wc .content {
		font-size: 0.8rem;
	}

	.card {
		display: grid;
		gap: 1rem;
		padding: 1.5rem 1.5rem 2rem 1.5rem;
	}

	.card .heading .heading-icon {
		align-items: center;
		display: inline-flex;
		font-size: 2rem;
		margin-right: 1.5rem;
		padding: 0;
	}

	.default {
		border-color: var(--color-grau-60);
	}

	.card.default .heading {
		color: var(--color-grau-60);
	}

	.info {
		border-color: var(--color-blau-light);
	}

	.card.info .heading {
		color: var(--color-blau-light);
	}

	.warning {
		background-color: var(--color-gelb);
		border-color: var(--color-gelb);
		color: var(--color-neutral-dark-correct);
	}

	.card.warning .heading {
	}

	.error {
		border-color: var(--color-rot);
	}

	.card.error .heading {
		color: var(--color-rot);
	}

	.success {
		border-color: var(--color-gruen);
	}

	.card.success .heading {
		color: var(--color-gruen);
	}

	.card .content {
		line-height: 1.5rem;
		padding-left: 3.5rem;
	}

	.msg {
		border-width: 0;
		display: flex;
		gap: calc(2 * var(--gap));
		padding: var(--gap);
	}

	.msg .heading {
		display: flex;
		gap: var(--spacing);
		flex-grow: 1;
		align-items: center;
	}

	.msg .heading > div {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.info .heading kol-icon.heading-icon {
		display: grid;
		place-items: center;
		background-color: var(--color-blau-light);
		border-radius: 100%;
		min-width: 2em;
		min-height: 2em;
	}

	.card.info .heading kol-icon.heading-icon {
		font-size: 1em;
	}

	.msg.info .heading kol-icon.heading-icon {
		font-size: 0.5em;
	}

	.info .heading kol-icon.heading-icon::part(icon) {
		color: white;
	}

	.msg.default {
		color: var(--color-grau-60);
	}

	.msg.error {
		color: var(--color-rot);
	}

	.msg.info {
		color: var(--color-blau-light);
	}

	.msg.warning {
		color: var(--color-neutral-dark-correct);
	}

	.msg.success {
		color: var(--color-gruen);
	}

	div > div > kol-heading-wc {
		grid-column: 1 / span 3;
	}

	.close button {
		border-radius: var(--border-radius);
		min-height: 44px;
		min-width: 44px;
		background-color: var(--color-neutral);
		padding: 0.75rem;
		color: var(--color-blau-light);
	}

	.card .close button {
		transform: translateX(1.5rem) translateY(-1.5rem);
	}

	kol-icon::part(icon) {
		font-family: "Font Awesome 6 Free";
		font-weight: 900;
	}

	.default kol-icon::part(icon)::before {
		content: "\\f05a";
	}

	.error kol-icon::part(icon)::before {
		content: "\\f06a";
	}

	.info kol-icon::part(icon)::before {
		content: "\\f0eb";
	}

	.success kol-icon::part(icon)::before {
		content: "\\f058";
	}

	.warning kol-icon::part(icon)::before {
		content: "\\f071";
	}

	.close button kol-icon::part(icon)::before {
		content: "\\f00d";
	}
`;
