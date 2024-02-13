import { KoliBri } from '@public-ui/schema';
import { css } from './cssTag';

// Europa Component Library - European Union | https://ec.europa.eu/component-library/eu/
export const ECL_EU = KoliBri.createTheme('ecl-eu', {
	GLOBAL: css`
		kol-tooltip-wc .tooltip-area {
			background-color: #f2f2f2;
		}
		kol-tooltip-wc .tooltip-arrow {
			background-color: #626262;
		}
		kol-tooltip-wc .tooltip-content {
			padding: 0.25rem 0.5rem;
			font-size: 0.875rem;
			line-height: 1.25rem;
			border-radius: 2px;
			border: 1px solid #626262;
		}
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
			--color-grey-75: #515560;
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
		}
		:host {
			background-color: transparent; /* Reset global background-color defined by components */
			display: inline-block;
		}
		a,
		button {
			font-size: var(--font-size);
			outline: none;
		}
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-heading);
			margin: 0;
			padding: 0;
		}
		p {
			font-weight: var(--font-weight);
		}
		kol-span-wc,
		kol-span-wc > span {
			gap: 0.5em;
		}
		.required label span::after,
		.required legend span::after {
			color: var(--color-red);
			padding-left: 0.25em;
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
		}
	`,
	'KOL-HEADING': css`
		:host {
			font-family: var(--font-family);
		}
		.headline-h1,
		.headline-h2,
		.headline-h3,
		.headline-h4,
		.headline-h5,
		.headline-h6 {
			font-weight: var(--font-weight-bold);
		}
		.headline-h1 {
			font-size: 2.625rem;
			line-height: 3.25rem;
		}
		.headline-h2 {
			font-size: 2.25rem;
			line-height: 2.75rem;
		}
		.headline-h3 {
			font-size: 2rem;
			line-height: 2.5rem;
		}
		.headline-h4 {
			font-size: 1.75rem;
			line-height: 2rem;
		}
		.headline-h5 {
			font-size: 1.5rem;
			line-height: 1.75rem;
		}
		.headline-h6 {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
	`,
	'KOL-ACCORDION': css`
		:host {
			font-family: var(--font-family);
		}
		.accordion,
		div[part*='accordion'] {
			border-radius: 8px;
			box-shadow:
				0 2px 4px rgb(9 49 142 / 8%),
				0 0 10px rgb(9 49 142 / 4%),
				0 4px 5px rgb(9 49 142 / 4%),
				0 -4px 4px rgb(9 49 142 / 4%);
			margin: 0;
			overflow: hidden;
		}
		.headline {
			font-size: 2em;
		}
		div[part*='close'] .headline button {
			border-radius: 8px;
		}
		div[part*='open'] .headline button {
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
			font:
				normal normal 400 1.125rem/1.75rem arial,
				sans-serif;
			padding: 1.5rem;
			text-align: start;
			width: 100%;
		}
		.headline button::before {
			background-color: #fc0;
			border-end-end-radius: 2px;
			border-end-start-radius: 2px;
			content: '';
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
			font-weight: 900;
			font-family: 'Font Awesome 6 Free';
		}
		.open .headline button kol-icon::part(icon)::before {
			content: '\\f077';
		}
		:not(.open) .headline button kol-icon::part(icon)::before {
			content: '\\f078';
		}
		.content,
		div[part='content'] {
			-webkit-border-start: 4px solid #0e47cb;
			-webkit-margin-start: 0;
			border-bottom: 2px solid #cfdaf5;
			border-inline-start: 4px solid #0e47cb;
			color: #515560;
			font:
				normal normal 400 1rem/1.5rem arial,
				sans-serif;
			margin-inline-start: 0;
			padding: 1.5rem;
		}
		kol-span-wc > span {
			align-items: baseline;
		}
	`,
	'KOL-INDENTED-TEXT': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			-webkit-border-start: 8px solid #0e47cb;
			-webkit-padding-start: 1.5rem;
			border-end-start-radius: 4px;
			border-inline-start: 8px solid #0e47cb;
			border-start-start-radius: 4px;
			display: inline-block;
			padding-bottom: 1rem;
			padding-inline-start: 1.5rem;
			padding-top: 1rem;
		}
	`,
	'KOL-BUTTON': css`
		:host {
			--kolibri-spacing: 0.25rem;
			font-family: var(--font-family);
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
			font:
				normal normal 400 1rem/1.25rem arial,
				sans-serif;
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
			box-shadow:
				0 2px 4px rgb(9 49 142 / 8%),
				0 0 10px rgb(9 49 142 / 4%),
				0 4px 5px rgb(9 49 142 / 4%),
				0 -4px 4px rgb(9 49 142 / 4%);
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
		}
	`,
	'KOL-LINK-BUTTON': css`
		:host {
			--kolibri-spacing: 0.25rem;
			font-family: var(--font-family);
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
			font:
				normal normal 400 1rem/1.25rem arial,
				sans-serif;
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
			box-shadow:
				0 2px 4px rgb(9 49 142 / 8%),
				0 0 10px rgb(9 49 142 / 4%),
				0 4px 5px rgb(9 49 142 / 4%),
				0 -4px 4px rgb(9 49 142 / 4%);
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
		}
	`,
	'KOL-BUTTON-GROUP': css`
		:host > kol-button-group-wc {
			gap: var(--spacing-2xs);
		}
	`,
	'KOL-PAGINATION': css`
		:host {
			display: grid;
			font-family: var(--font-family);
		}
		.button {
			--kolibri-spacing: 0.25rem;
			border-radius: 4px;
			&:focus {
				outline: none;
			}
		}
		.button-inner {
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			border-radius: 4px;
			font:
				normal normal 400 1rem/1.25rem Arial,
				sans-serif;
			padding: 0.75rem;
			background-color: #fc0;
			color: #171a22;
		}
		.button:focus-visible .button-inner {
			outline-offset: -4px;
			outline: 2px solid var(--color-black);
		}
		button:not(:disabled):active .button-inner,
		button:not(:disabled):hover .button-inner {
			background-color: #fc0;
			border-color: #fc0;
			box-shadow:
				0 2px 4px rgb(9 49 142 / 8%),
				0 0 10px rgb(9 49 142 / 4%),
				0 4px 5px rgb(9 49 142 / 4%),
				0 -4px 4px rgb(9 49 142 / 4%);
		}
		.button:disabled .button-inner {
			opacity: 0.5;
			cursor: not-allowed;
		}
		.selected .button-inner {
			background-color: var(--color-blue);
			border-color: var(--color-blue);
			color: var(--color-white);
			font-weight: bold;
			text-decoration: underline;
			opacity: 1 !important;
		}
	`,
	'KOL-PROGRESS': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-NAV': css`
		:host {
			font-family: var(--font-family);
		}
		.list {
			display: flex;
			list-style: none;
			margin: 0px;
			padding: 0px;
		}
		.list.vertical {
			flex-direction: column;
		}
		.entry {
			display: flex;
		}
		.entry kol-button-wc:first-child,
		.entry kol-link-wc,
		.entry kol-span-wc {
			flex-grow: 1;
		} /* custom. */
		nav {
			background-color: var(--color-blue);
		}
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.expand-button button {
			background-color: var(--color-blue-130);
			margin: auto;
			height: 100%;
		}
		kol-span-wc {
			border-color: transparent;
			border-style: solid;
			border-width: 2px;
			color: var(--color-white);
			font-size: 18px;
			justify-items: start;
			padding: 1rem;
			height: 100%;
		}
		li > ul,
		li + li {
			border-color: var(--color-blue-75);
			border-style: solid;
			border-width: 0;
			border-top-width: 2px;
		}
		a {
			text-decoration: none;
		}
		:is(kol-button-wc, kol-link-wc):focus-within kol-span-wc {
			border-color: var(--color-white);
		}
		:is(kol-button-wc, kol-link-wc):focus-within kol-span-wc,
		:is(kol-button-wc, kol-link-wc):hover kol-span-wc {
			text-decoration: underline;
		}
		div > .expand-button kol-icon::part(icon)::before {
			content: '\\eab6';
		}
		.expanded > div > .expand-button kol-icon::part(icon)::before {
			content: '\\eab4';
		}
	`,
	'KOL-BADGE': css`
		:host {
			font-family: var(--font-family);
		}
		:host > span {
			font: normal normal var(--font-weight) 0.875rem/1em var(--font-family);
			padding: calc(0.5rem - 1px) calc(0.75rem - 1px);
			text-transform: uppercase;
		}
	`,
	'KOL-ALERT': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			background-color: var(--color-white);
		}
		:host > div.card {
			border-style: solid;
			border-width: 2px;
		}
		:host > div.msg {
			border: none;
		}
		:host .msg .heading kol-icon {
			font-size: 1.5em;
			margin: var(--spacing-2xs);
		}
		:host .msg .heading > div {
			padding: var(--spacing-2xs);
		}
		:host .card {
			padding-bottom: 1.5rem;
			padding-inline-end: 0.5rem;
			padding-inline-start: 1.5rem;
			padding-top: 1.5rem;
		}
		:host .card .heading {
			gap: 0.5rem;
		}
		:host .card .content {
			margin-left: 2.5rem;
		}
		:host .card .heading kol-icon {
			font-size: 2rem;
		}
		:host .default {
			border-color: var(--color-grey);
		}
		:host .default .heading kol-icon {
			color: var(--color-grey);
		}
		:host .error {
			border-color: var(--color-red);
		}
		:host .error .heading kol-icon {
			color: var(--color-red);
		}
		:host .info {
			border-color: var(--color-blue);
		}
		:host .info .heading kol-icon {
			color: var(--color-blue);
		}
		:host .success {
			border-color: var(--color-green);
		}
		:host .success .heading kol-icon {
			color: var(--color-green);
		}
		:host .warning {
			border-color: var(--color-orange);
		}
		:host .warning .heading kol-icon {
			color: var(--color-orange);
		}
	`,
	'KOL-CARD': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			display: grid;
			width: 100%;
			height: 100%;
			background-color: white;
			grid-template-rows: min-content 2fr min-content;
			box-shadow: 0 0 calc(var(--spacing-2xs) / 2) var(--color-black);
		}
		:host kol-heading-wc {
			display: inline-flex;
			font-style: normal;
			font-weight: 700;
			font-size: 1.25em;
			line-height: 1.75em;
		}
		:host div.header {
			padding: var(--spacing-m) var(--spacing-m) var(--spacing-xs) var(--spacing-m);
		}
		:host div.content {
			padding: var(--spacing-xs) var(--spacing-m) var(--spacing-m);
			overflow: hidden;
		}
		:host div.footer {
			padding: var(--spacing-xs) var(--spacing-m);
		}
		:host > div > div.content + div.footer {
			border-top: 2px solid var(--color-blue);
		}
	`,
	'KOL-INPUT-CHECKBOX': css`
		:host {
			font-family: var(--font-family);
		}
		.checkbox-container {
			justify-content: flex-start;
		}
		input[type='checkbox'] {
			background-color: var(--color-white);
			border-width: 2px;
			border-style: solid;
			color: var(--color-grey);
			line-height: 1.5em;
			font-size: 1rem;
		}
		input[type='checkbox']:focus {
			outline-color: var(--color-blue);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 2px;
		}
		input[type='checkbox'] {
			border-color: var(--color-grey-75);
		}
		input[type='checkbox']:checked {
			background-color: var(--color-blue);
			border-color: var(--color-blue);
		}
		input[type='checkbox']:hover {
			border-color: var(--color-blue);
		}
		input[type='checkbox']:checked:hover {
			background-color: var(--color-blue-130);
			border-color: var(--color-blue-130);
		}
		.error input[type='checkbox'] {
			border-color: var(--color-red);
		}
		.error input[type='checkbox']:checked {
			background-color: var(--color-red);
			border-color: var(--color-red);
		}
		.error input[type='checkbox']:hover {
			border-color: var(--color-red);
		}
		.error input[type='checkbox']:checked:hover {
			background-color: var(--color-red-1xx);
			border-color: var(--color-red-1xx);
		}
		.error.required label > span::after {
			color: var(--color-red);
		}
		.default .icon {
			margin-left: 0.2rem;
		}
		.default.checked .icon {
			color: var(--color-white);
		}

		.switch input[type='checkbox'] {
			display: block;
		}
		.switch input[type='checkbox']::before,
		.switch input[type='checkbox']:indeterminate::before {
			background-color: var(--color-grey-75);
		}
		.switch input[type='checkbox']:hover::before,
		.switch input[type='checkbox']:indeterminate:hover::before {
			background-color: var(--color-blue);
		}
		.switch input[type='checkbox']:checked::before,
		.switch input[type='checkbox']:checked:hover::before {
			background-color: var(--color-white);
		}
		.switch.error input[type='checkbox']::before {
			background-color: var(--color-red);
		}
		.switch.error input[type='checkbox']:checked::before {
			background-color: var(--color-white);
		}
		.switch.error input[type='checkbox']:indeterminate:hover::before {
			background-color: var(--color-red-1xx);
		}
		kol-input {
			gap: var(--spacing-xs);
		}
		.button {
			gap: var(--spacing-xs) 0;
			grid-template-areas:
				'input label'
				'hint hint'
				'error error';
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
		}
		.hint {
			font-size: 0.875rem;
		}
		.button:focus-within {
			outline-color: var(--color-blue-130);
			outline-style: solid;
			outline-width: 2px;
		}
	`,
	'KOL-INPUT-COLOR': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 44px !important;
			min-height: 44px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-FILE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			margin: 1px;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 44px !important;
			min-height: 44px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-EMAIL': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-NUMBER': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-DATE': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-PASSWORD': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 44px !important;
			min-height: 44px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-INPUT-TEXT': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 44px !important;
			min-height: 44px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-KOLIBRI': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-SELECT': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-TEXTAREA': css`
		:host {
			font-family: var(--font-family);
		}
		kol-input {
			color: var(--color-grey);
			gap: var(--spacing-xs);
		}
		input,
		select,
		textarea {
			border: none;
			outline: none;
		}
		input,
		select:not([multiple]) {
			height: 40px !important;
			min-height: 40px !important;
		}
		label {
			font-weight: var(--font-weight-bold);
			order: 1;
		}
		.hint {
			font-size: 0.875rem;
			order: 2;
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-2xs));
			order: 3;
		}
		.input {
			min-height: 44px !important;
			border: 1px solid var(--color-grey-75);
			color: var(--color-grey);
			order: 4;
			align-items: center;
			padding: 1px 0.5em;
		}
		kol-input .counter {
			order: 5;
		}
		input::placeholder,
		textarea::placeholder {
			color: var(--color-grey-50);
		}
		.input:focus-within {
			box-shadow:
				inset 1px 1px var(--color-blue),
				inset -1px -1px var(--color-blue);
			outline: none;
		}
		.input:focus-within,
		.input:hover {
			border-color: var(--color-blue) !important;
		}
		.error .input {
			border-color: var(--color-red);
		}
	`,
	'KOL-TABLE': css`
		:host {
			font-family: var(--font-family);
		}
		:host > div {
			overflow-x: auto;
			overflow-y: hidden;
		}
		caption {
			padding: 0.5em;
		}
		th {
			font-weight: normal;
			color: var(--color-midnight);
		}
		:host table thead tr:first-child th,
		:host table thead tr:first-child td {
			border-width: 0;
			border-top-width: 2px;
			border-style: solid;
			border-color: var(--color-ice);
		}
		.table {
			padding: 0.5em;
		}
		.table:has(caption:focus) {
			outline-color: var(--color-blue);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: 2px;
		}
		table {
			width: 100%;
			border-spacing: 0;
		}
		table,
		:host table thead tr:last-child th,
		:host table thead tr:last-child td {
			border-width: 0;
			border-bottom-width: 2px;
			border-style: solid;
			border-color: var(--color-ice);
		}
		th {
			background-color: var(--color-white);
		}
		th div {
			width: 100%;
			display: flex;
			gap: 0.5em;
			grid-template-columns: 1fr auto;
			align-items: center;
		}
		tbody tr:nth-child(odd) {
			background-color: var(--color-grey-10);
		}
		th,
		td {
			padding: 0.5em;
		}
		th[aria-sort='ascending'],
		th[aria-sort='descending'] {
			font-weight: 700;
		}
		@media (min-width: 1024px) {
			:host > div:last-child,
			:host > div:last-child > div:last-child {
				grid-auto-flow: column;
			}
			:host > div:last-child kol-pagination {
				display: flex;
				gap: 1rem;
			}
		}
	`,
	'KOL-AVATAR': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-TABS': css`
		:host {
			font-family: var(--font-family);
			--kolibri-spacing: 0.25rem;
		}
		kol-button-group-wc {
			border-bottom: 1px solid var(--color-grey-25);
			margin-bottom: -1px;
		}
		kol-button-group-wc button {
			border: none;
			margin-bottom: -1px;
		}
		kol-button-group-wc button kol-span-wc {
			padding: 0.5rem;
			min-height: 44px;
			min-width: 44px;
		}
		kol-button-group-wc button.selected kol-span-wc {
			border-color: var(--color-grey-25);
			border-style: solid;
			border-width: 1px;
			border-bottom-color: white;
			border-top-color: var(--color-blue);
			box-shadow: 0 -3px var(--color-blue);
			font-weight: var(--font-weight-bold);
			color: var(--color-blue);
		}
		kol-button-group-wc button:hover:not(:disabled) kol-span-wc {
			color: var(--color-blue-130);
		}
		kol-button-group-wc button:focus kol-span-wc {
			outline-color: var(--color-blue-130);
			outline-style: solid;
			outline-width: 2px;
		}
	`,
	'KOL-LINK': css`
		a,
		button {
			appearance: none;
			color: var(--color-blue);
			text-decoration: underline;
		}
		a:hover,
		button:hover {
			color: var(--color-blue-130);
		}
	`,
	'KOL-BUTTON-LINK': css`
		a,
		button {
			appearance: none;
			color: var(--color-blue);
			text-decoration: underline;
		}
		a:hover,
		button:hover {
			color: var(--color-blue-130);
		}
	`,
	'KOL-BREADCRUMB': css`
		:host,
		kol-link {
			font-family: var(--font-family);
		}
	`,
	'KOL-DETAILS': css`
		:host {
			font-family: var(--font-family);
		}
	`,
	'KOL-SPIN': css`
		.cycle {
			padding: 0.125rem;
			& span {
				background-color: var(--color-blue-80);
			}
		}
	`,
	'KOL-INPUT-RADIO': css`
		:host {
			font-family: var(--font-family);
		}
		fieldset {
			border: 0;
			gap: 0.5rem;
			flex-wrap: wrap;
		}
		fieldset kol-alert {
			order: 1;
		}
		fieldset .hint {
			order: 2;
		}
		fieldset kol-alert {
			order: 3;
		}
		fieldset kol-input {
			order: 4;
		}
		.radio-input-wrapper {
			display: flex;
			align-items: center;
		}
		.radio-label {
			padding-left: 0.5rem;
		}
		input[type='radio'] {
			outline: 2px solid var(--color-grey-75);
			outline-offset: 2px;
		}
		input[type='radio']:before {
			display: none;
		}
		input[type='radio']:checked {
			border-color: var(--color-blue);
			border-width: 7px;
		}
		input[type='radio']:focus {
			outline-color: var(--color-blue);
		}
		input[type='radio']:not(:disabled):hover {
			border-color: var(--color-blue);
		}
		label,
		legend {
			color: var(--color-grey);
		}
		legend {
			font-weight: var(--font-weight-bold);
		}
		.error input[type='radio'] {
			border: 2px solid var(--color-red);
		}
		.error input[type='radio']:before {
			display: none;
		}
		.error input[type='radio']:checked {
			border-color: var(--color-red);
			border-width: 7px;
		}
		.error input[type='radio']:not(:disabled):hover {
			border-color: var(--color-red-1xx);
		}
		kol-alert {
			color: var(--color-red);
			font-size: 0.875em;
			margin-left: calc(-1 * var(--spacing-xs));
			order: 1;
			width: 100%;
		}
		.hint {
			font-size: 0.875rem;
			order: 4;
		}
	`,
	'KOL-INPUT-RANGE': css`
		:host {
			font-family: var(--font-family);
		}
		.inputs-wrapper {
			gap: 1rem;
		}
	`,
	'KOL-SKIP-NAV': css`
		:host {
			font-family: var(--font-family);
		}
		kol-link-wc > a > kol-span-wc {
			border-radius: 4px;
			gap: 0.5rem;
			line-height: 1rem;
			padding: 0.75rem;
			background-color: #0e47cb;
			color: #fff;
			cursor: pointer;
		}
	`,
	'KOL-SPLIT-BUTTON': css`
		:host {
			font-family: var(--font-family);
		}
		.popover {
			background: #fff;
		}
	`,
	'KOL-TOAST-CONTAINER': css`
		:host {
			top: 1rem;
			right: 1rem;
			width: 440px;
			max-width: 100%;
		}
		.toast {
			display: block;
			background: #fff;
			margin-top: 1rem;
		}
		.alert {
			display: block;
		}
	`,
});
