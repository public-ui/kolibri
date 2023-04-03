import { KoliBri } from '@public-ui/components';

// Europa Component Library - European Union | https://ec.europa.eu/component-library/eu/
export const ECL_EU = KoliBri.createTheme('ecl-eu', {
	GLOBAL: `/* kolibri unset */
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
	} /* properties */
	:host {
		--color-blue: #0e47cb;
		--color-blue-140: #082b7a;
		--color-blue-130: #082b7a;
		--color-blue-120: #0b39a2;
		--color-blue-110: #0d40b7;
		--color-blue-100: #0e47cb;
		--color-blue-80: #3e6cd5;
		--color-blue-60: #6e91e0;
		--color-blue-40: #9fb5ea;
		--color-blue-20: #cfdaf5;
		--color-blue-10: #e7edfa;
		--color-blue-5: #f3f6fc;
		--color-yellow: #ffcc00;
		--color-yellow-140: #997a00;
		--color-yellow-130: #b38f00;
		--color-yellow-120: #cca300;
		--color-yellow-110: #e6b800;
		--color-yellow-100: #ffcc00;
		--color-yellow-80: #ffd633;
		--color-yellow-60: #ffe066;
		--color-yellow-40: #ffeb99;
		--color-yellow-20: #fff5cc;
		--color-yellow-10: #fffae6;
		--color-yellow-5: #fffcf2;
		--color-grey: #262b38;
		--color-grey-140: #171a22;
		--color-grey-130: #1b1e27;
		--color-grey-120: #1e222d;
		--color-grey-110: #222732;
		--color-grey-100: #262b38;
		--color-grey-80: #515560;
		--color-grey-60: #7d8088;
		--color-grey-40: #a8aaaf;
		--color-grey-20: #d4d5d7;
		--color-grey-10: #e9eaeb;
		--color-grey-5: #f4f5f5;
		--color-grey-3: #f9f9f9;
		--color-orange: #ff6200;
		--color-orange-140: #993b00;
		--color-orange-130: #b34500;
		--color-orange-120: #cc4e00;
		--color-orange-110: #e65800;
		--color-orange-100: #e65800;
		--color-orange-80: #ff8133;
		--color-orange-60: #ff914d;
		--color-orange-40: #ffb180;
		--color-orange-20: #ffd0b3;
		--color-orange-10: #ffefe6;
		--color-orange-5: #fff7f2;
		--color-green: #00c991;
		--color-green-140: #007957;
		--color-green-130: #008d66;
		--color-green-120: #008d66;
		--color-green-110: #00b583;
		--color-green-100: #00c991;
		--color-green-80: #00c991;
		--color-green-60: #66dfbd;
		--color-green-40: #99e9d3;
		--color-green-20: #ccf4e9;
		--color-green-10: #e6faf4;
		--color-green-5: #f2fcf9;
		--color-red: #ef0044;
		--color-red-140: #8f0029;
		--color-red-130: #a70030;
		--color-red-120: #bf0036;
		--color-red-110: #d7003d;
		--color-red-100: #ef0044;
		--color-red-80: #f23369;
		--color-red-60: #f5668f;
		--color-red-40: #f999b4;
		--color-red-20: #fcccda;
		--color-red-10: #fde6ec;
		--color-red-5: #fef2f5;
		--color-accent-blue-100: #00e9ff;
		--color-accent-blue-30: #b3f8ff;
		--color-purple: #510dcd;
		--color-purple-140: #31087b;
		--color-purple-130: #390990;
		--color-purple-120: #410aa4;
		--color-purple-110: #490cb9;
		--color-purple-100: #510dcd;
		--color-purple-80: #743dd7;
		--color-purple-60: #976ee1;
		--color-purple-40: #bf9af1;
		--color-purple-20: #dccff5;
		--color-purple-10: #eee7fa;
		--color-purple-5: #eee7fa;
		--color-white: #fff;
		--color-black: #000;
		--font-family: Arial, sans-serif;
		--font-size: 16px;
		--font-weight-regular: 400;
		--font-weight-bold: 700;
		--line-height-regular: 1.5em;
		--line-height-heading: 1.2em;
		--spacing-4xl: 64px;
		--spacing-3xl: 48px;
		--spacing-2xl: 40px;
		--spacing-xl: 32px;
		--spacing-l: 24px;
		--spacing-m: 16px;
		--spacing-s: 12px;
		--spacing-xs: 8px;
		--spacing-2xs: 4px; /* ?! */
	} /* preset */
	:host {
		font-family: var(--font-family);
		font-size: var(--font-size);
		font-weight: var(--font-weight-regular);
	}
	p.l,
	p.lead {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	p,
	p.m,
	p.medium {
		font-size: 1rem;
		line-height: 1.5rem;
	}
	p.s,
	p.small {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	p.xs,
	p.extra-small {
		font-size: 0.75rem;
		line-height: 1.25rem;
	}`,
	'KOL-HEADING': `h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: var(--font-weight-bold);
	}
	h1 {
		font-size: 2.625rem;
		line-height: 3.25rem;
	}
	h2 {
		font-size: 2.25rem;
		line-height: 2.75rem;
	}
	h3 {
		font-size: 2rem;
		line-height: 2.5rem;
	}
	h4 {
		font-size: 1.75rem;
		line-height: 2rem;
	}
	h5 {
		font-size: 1.5rem;
		line-height: 1.75rem;
	}
	h6 {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}`,
	'KOL-ACCORDION': `.accordion,
	div[part*="accordion"] {
		border-radius: 8px;
		box-shadow: 0 2px 4px rgb(9 49 142 / 8%), 0 0 10px rgb(9 49 142 / 4%),
			0 4px 5px rgb(9 49 142 / 4%), 0 -4px 4px rgb(9 49 142 / 4%);
		margin: 0;
		overflow: hidden;
	}
	.headline {
		font-size: 2em;
	}
	div[part*="close"] .headline button {
		border-radius: 8px;
	}
	div[part*="open"] .headline button {
		border-start-end-radius: 8px;
		border-start-start-radius: 8px;
	}
	.headline button {
		outline-offset: -1px;
		border: 0;
		border-bottom-color: #cfdaf5;
		border-bottom-style: solid;
		border-bottom-width: 2px;
		color: #171a22;
		position: relative;
		display: block;
		font: normal normal 400 1.125rem/1.75rem arial, sans-serif;
		padding: 1.5rem;
		text-align: start;
		width: 100%;
	}
	.headline button::before {
		background-color: #fc0;
		border-end-end-radius: 2px;
		border-end-start-radius: 2px;
		content: "";
		height: 4px;
		position: absolute;
		left: 1.5rem;
		top: 0;
		width: 32px;
	}
	.headline button kol-icon {
		margin-right: 0.75rem;
	}
	.headline button kol-icon::part(icon)::before {
		color: #0e47cb;
		font-family: "Font Awesome 6 Free";
	}
	.headline button kol-icon::part(close)::before {
		content: "\f077";
	}
	.headline button kol-icon::part(open)::before {
		content: "\f078";
	}
	.content,
	div[part="content"] {
		-webkit-border-start: 4px solid #0e47cb;
		-webkit-margin-start: 0;
		border-bottom: 2px solid #cfdaf5;
		border-inline-start: 4px solid #0e47cb;
		color: #515560;
		font: normal normal 400 1rem/1.5rem arial, sans-serif;
		margin-inline-start: 0;
		padding: 1.5rem;
	}`,
	'KOL-INDENTED-TEXT': `:host > div {
		-webkit-border-start: 8px solid #0e47cb;
		-webkit-padding-start: 1.5rem;
		border-end-start-radius: 4px;
		border-inline-start: 8px solid #0e47cb;
		border-start-start-radius: 4px;
		display: inline-block;
		padding-bottom: 1rem;
		padding-inline-start: 1.5rem;
		padding-top: 1rem;
	}`,
	'KOL-BUTTON': `:host {
		--kolibri-spacing: 0.25rem;
	}
	a,
	button {
		appearance: none;
		border-radius: 4px;
		text-decoration: none;
	}
	a:focus,
	button:focus {
		outline: none;
	}
	a > kol-span-wc,
	button > kol-span-wc {
		min-height: 44px;
		min-width: 44px;
		border-radius: 4px;
		font: normal normal 400 1rem/1.25rem arial, sans-serif;
		font-weight: 400;
		margin: 0;
		padding: 0.75rem;
	}
	a:focus-visible > kol-span-wc,
	button:focus-visible > kol-span-wc {
		outline-offset: -4px;
		outline-style: solid;
		outline-width: 2px;
	}
	a:active > kol-span-wc,
	button:active > kol-span-wc,
	a:hover > kol-span-wc,
	button:hover > kol-span-wc {
		box-shadow: 0 2px 4px rgb(9 49 142 / 8%), 0 0 10px rgb(9 49 142 / 4%),
			0 4px 5px rgb(9 49 142 / 4%), 0 -4px 4px rgb(9 49 142 / 4%);
	}
	.primary a > kol-span-wc,
	.primary button > kol-span-wc {
		background-color: #0e47cb;
		color: #fff;
	}
	.primary a:focus-visible > kol-span-wc,
	.primary button:focus-visible > kol-span-wc {
		outline-color: #fff;
	}
	.primary a:hover > kol-span-wc,
	.primary button:hover > kol-span-wc {
		background-color: #3e6cd5;
	}
	.secondary a > kol-span-wc,
	.secondary button > kol-span-wc {
		background-color: #fff;
		border: 2px solid #0e47cb;
		color: #0e47cb;
		padding: calc(0.75rem - 2px) calc(1rem - 2px);
	}
	.secondary a:focus-visible > kol-span-wc,
	.secondary button:focus-visible > kol-span-wc {
		box-shadow: inset 0 0 0 4px #0e47cb;
		outline-color: #fff;
	}
	.secondary a:hover > kol-span-wc,
	.secondary button:hover > kol-span-wc {
		border-color: #0e47cb;
		color: #0e47cb;
	}
	.normal a > kol-span-wc,
	.normal button > kol-span-wc {
		background-color: #fc0;
		color: #171a22;
	}
	.normal a:focus-visible > kol-span-wc,
	.normal button:focus-visible > kol-span-wc {
		outline-color: #000;
	}
	.normal a:hover > kol-span-wc,
	.normal button:hover > kol-span-wc {
		background-color: #fc0;
		border-color: #fc0;
	}
	.danger a kol-span-wc,
	.danger button kol-span-wc {
		background-color: var(--color-red);
		border-color: var(--color-red);
		color: var(--color-white);
	}
	.danger a:hover kol-span-wc,
	.danger button:hover kol-span-wc {
		background-color: var(--color-red);
		border-color: var(--color-red);
	}
	.ghost a > kol-span-wc,
	.ghost button > kol-span-wc {
		color: #0e47cb;
	}
	.ghost a:focus-visible > kol-span-wc,
	.ghost button:focus-visible > kol-span-wc {
		outline-color: #0e47cb;
	}
	.ghost a:hover > kol-span-wc,
	.ghost button:hover > kol-span-wc {
		color: #0e47cb;
	}`,
	'KOL-LINK-BUTTON': `:host {
		--kolibri-spacing: 0.25rem;
	}
	a,
	button {
		appearance: none;
		border-radius: 4px;
		text-decoration: none;
	}
	a:focus,
	button:focus {
		outline: none;
	}
	a > kol-span-wc,
	button > kol-span-wc {
		min-height: 44px;
		min-width: 44px;
		border-radius: 4px;
		font: normal normal 400 1rem/1.25rem arial, sans-serif;
		font-weight: 400;
		margin: 0;
		padding: 0.75rem;
	}
	a:focus-visible > kol-span-wc,
	button:focus-visible > kol-span-wc {
		outline-offset: -4px;
		outline-style: solid;
		outline-width: 2px;
	}
	a:active > kol-span-wc,
	button:active > kol-span-wc,
	a:hover > kol-span-wc,
	button:hover > kol-span-wc {
		box-shadow: 0 2px 4px rgb(9 49 142 / 8%), 0 0 10px rgb(9 49 142 / 4%),
			0 4px 5px rgb(9 49 142 / 4%), 0 -4px 4px rgb(9 49 142 / 4%);
	}
	.primary a > kol-span-wc,
	.primary button > kol-span-wc {
		background-color: #0e47cb;
		color: #fff;
	}
	.primary a:focus-visible > kol-span-wc,
	.primary button:focus-visible > kol-span-wc {
		outline-color: #fff;
	}
	.primary a:hover > kol-span-wc,
	.primary button:hover > kol-span-wc {
		background-color: #3e6cd5;
	}
	.secondary a > kol-span-wc,
	.secondary button > kol-span-wc {
		background-color: #fff;
		border: 2px solid #0e47cb;
		color: #0e47cb;
		padding: calc(0.75rem - 2px) calc(1rem - 2px);
	}
	.secondary a:focus-visible > kol-span-wc,
	.secondary button:focus-visible > kol-span-wc {
		box-shadow: inset 0 0 0 4px #0e47cb;
		outline-color: #fff;
	}
	.secondary a:hover > kol-span-wc,
	.secondary button:hover > kol-span-wc {
		border-color: #0e47cb;
		color: #0e47cb;
	}
	.normal a > kol-span-wc,
	.normal button > kol-span-wc {
		background-color: #fc0;
		color: #171a22;
	}
	.normal a:focus-visible > kol-span-wc,
	.normal button:focus-visible > kol-span-wc {
		outline-color: #000;
	}
	.normal a:hover > kol-span-wc,
	.normal button:hover > kol-span-wc {
		background-color: #fc0;
		border-color: #fc0;
	}
	.danger a kol-span-wc,
	.danger button kol-span-wc {
		background-color: var(--color-red);
		border-color: var(--color-red);
		color: var(--color-white);
	}
	.danger a:hover kol-span-wc,
	.danger button:hover kol-span-wc {
		background-color: var(--color-red);
		border-color: var(--color-red);
	}
	.ghost a > kol-span-wc,
	.ghost button > kol-span-wc {
		color: #0e47cb;
	}
	.ghost a:focus-visible > kol-span-wc,
	.ghost button:focus-visible > kol-span-wc {
		outline-color: #0e47cb;
	}
	.ghost a:hover > kol-span-wc,
	.ghost button:hover > kol-span-wc {
		color: #0e47cb;
	}`,
	'KOL-BUTTON-GROUP': `:host > kol-button-group-wc {
		gap: var(--spacing-2xs);
	}`,
	'KOL-PAGINATION': `:host > div {
		display: flex;
		gap: 0.25rem;
	}`,
});
