import { KoliBri } from '@public-ui/components';

// Presse- und Informationsamt der Bundesregierung
export const BPA = KoliBri.createTheme('bpa', {
	GLOBAL:
		':host {--kolibri-border-color: unset;--kolibri-border-radius: unset;--kolibri-border-width: unset;--kolibri-color-error: unset;--kolibri-color-info: unset;--kolibri-color-success: unset;--kolibri-color-warning: unset;--kolibri-color-primary: unset;--kolibri-color-secondary: unset;--kolibri-color-normal: unset;--kolibri-color-danger: unset;--kolibri-color-ghost: unset;--kolibri-color-disabled: unset;--kolibri-color-text: unset;--kolibri-color-visited: unset;--kolibri-font-family: unset;--kolibri-font-size: unset;--kolibri-spacing: unset;}:host {--font-family-sans: "BundesSans Web, Arial, Helvetica, sans-serif";--font-family-serif: "BundesSerif Web, var(--kolibri-font-family-sans)";--font-family: "var(--kolibri-font-family-sans), Helvetica, sans-serif";--font-weight: 400;--font-weight-bold: bold;--color-white: #fff;--color-black: #111314;--color-blue: #0077b6;--color-darkblue: #004b76;--color-darkgray: #576164;--color-red: #c0003c;--color-lightorange: #f7bb3d;--color-orange: #e19688;--color-green: #00854a;--color-cyan: #00818b;}@keyframes blinker {50% {opacity: 0.25;}}:host {color: var(--color-black);}p {font-size: 1.5rem;}',
	'KOL-BUTTON':
		'button > kol-span-wc {padding: 0.625rem 1.125rem;font-family: var(--font);font-size: 1rem;line-height: 1.125rem;border: 1px solid var(--color-darkgray);border-radius: 0.125rem;transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;}button.ghost > kol-span-wc {border: none;}button > kol-span-wc > span {gap: 0.625rem;}button > kol-span-wc {background-color: var(--color-white);color: var(--color-black);}button > kol-span-wc kol-icon {color: var(--color-blue);}button:is(:hover, :focus) > kol-span-wc kol-icon {color: var(--color-white);}button:is(:hover, :focus) > kol-span-wc {cursor: pointer;background-color: var(--color-blue);color: var(--color-white);}button:focus > kol-span-wc {outline: 1px dotted var(--color-black);border: none;}button:focus {outline: none;}',
	'KOL-INPUT-TEXT': '',
	'KOL-INPUT-PASSWORD': '',
	'KOL-INPUT-NUMBER': '',
	'KOL-INPUT-EMAIL': '',
	'KOL-INPUT-FILE': '',
	'KOL-TEXTAREA': '',
	'KOL-ALERT':
		':host .success {color: var(--color-green);}:host .warning {color: var(--color-orange);}:host .error {color: var(--color-red);}:host .info {color: var(--color-cyan);}:host > div {border: none;}@media only screen and (min-width: 600px) {:host > div {font-size: 1.125rem;line-height: 1.125em;}}.heading .heading-icon {height: 100%;width: 2em;}.success .heading-icon {color: var(--color-green);}.warning .heading-icon {color: var(--color-orange);}.error .heading-icon {color: var(--color-red);}.info .heading-icon {color: var(--color-cyan);}.default .heading-icon {color: var(--color-black);}',
	'KOL-HEADING':
		'/* https://styleguide.bundesregierung.de/sg-de/medien/digitale-medien/webanwendungen/komponenten/atome/heading */h1,h2,h3,h4,h5,h6 {font-family: var(--font-family-heading);}h1 {margin-bottom: 1.5rem;font-size: 2rem;font-weight: 400;line-height: 2.5rem;}@media (min-width: 64rem) {h1 {font-size: 2.875rem;line-height: 3.125rem;}}@media (min-width: 85.375rem) {h1 {font-size: 3.5rem;line-height: 4.5rem;}}h2 {margin-bottom: 1.5rem;font-size: 1.75rem;font-weight: 400;line-height: 2rem;color: var(--color-blue);}@media (min-width: 64rem) {h2 {font-size: 2.5rem;line-height: 3rem;}}@media (min-width: 85.375rem) {h2 {font-size: 2.875rem;line-height: 3.125rem;}}h3 {margin-bottom: 1.5rem;font-size: 1.625rem;font-weight: 400;line-height: 2rem;}@media (min-width: 64rem) {h3 {font-size: 1.75rem;line-height: 2.25rem;}}@media (min-width: 85.375rem) {h3 {font-size: 2rem;line-height: 2.625rem;}}h4 {margin-bottom: 1.5rem;font-size: 1.5rem;font-weight: 700;line-height: 1.75rem;}@media (min-width: 64rem) {h4 {font-size: 1.625rem;line-height: 1.875rem;}}@media (min-width: 85.375rem) {h4 {font-size: 1.75rem;line-height: 2.25rem;}}h5 {margin-bottom: 1.5rem;font-size: 1.1875rem;font-weight: 700;line-height: 1.75rem;}@media (min-width: 64rem) {h5 {font-size: 1.375rem;line-height: 1.875rem;}}@media (min-width: 85.375rem) {h5 {font-size: 1.5rem;line-height: 2.125rem;}}h6 {color: #f0f;animation: blinker 0.25s linear infinite;}',
	'KOL-BADGE':
		':host > span {border-radius: 0.35rem;}:host > span > kol-span-wc {font: normal normal var(--font-weight-bold) 2em var(--font-family);letter-spacing: 0.15rem;padding: 0.75rem 1.25rem;text-transform: uppercase;}:host > span > kol-span-wc > span {gap: 0.5rem;}',
	'KOL-BUTTON-GROUP': '',
	'KOL-INDENTED-TEXT': ':host > div {border-left: none;box-shadow: -4px 0px 0px var(--color-blue);padding: 0.25em 0.5em;width: 100%;}',
	'KOL-LINK': '',
	'KOL-BREADCRUMB': '',
	'KOL-DETAILS': '',
	'KOL-SPIN': '',
	'KOL-PROGRESS': '',
	'KOL-SELECT': '',
	'KOL-INPUT-COLOR': '',
	'KOL-ACCORDION': '',
	'KOL-TABLE': '',
	'KOL-NAV': '',
	'KOL-CARD':
		':host {color: var(--color-white);background-color: var(--color-darkblue);padding: 4.5454545455%;}:host .header {font-size: 1.375rem;line-height: 1.5rem;margin: 1rem 0;}@media only screen and (min-width: 600px) and (max-width: 1023px) {:host .header {font-size: 1.5rem;line-height: 1.75rem;}}@media only screen and (min-width: 1024px) {:host .header {font-size: 2rem;line-height: 2.25rem;}}:host .content {font-size: 1.1875rem;line-height: 1.6875rem;}@media only screen and (min-width: 600px) and (max-width: 1023px) {:host .content {font-size: 1.375rem;line-height: 2rem;}}@media only screen and (min-width: 1024px) {:host.content {font-size: 1.5rem;line-height: 2.125rem;}}:host .footer {margin: 1rem 0;}:is(h1, h2, h3, h4, h5, h6) {font-weight: 400;}',
	'KOL-INPUT-CHECKBOX':
		'kol-input {gap: 0.1rem 0.75rem;font-size: 1.375rem;}input[type="checkbox"]:focus {outline: var(--color-black) dotted 1px;outline-offset: 0.15rem;}.hint {font-size: 1.125rem;line-height: 1.125em;}.checkbox input[type="checkbox"] {border-width: 1px;padding: 0.125rem;width: 1.375rem;height: 1.375rem;}.checkbox input[type="checkbox"]:checked {background-color: var(--color-blue);border-color: var(--color-blue);padding: 0;}.checkbox input[type="checkbox"]:checked:before {left: 0.35rem;top: 45%;height: 0.6rem;width: 0.25rem;transform: rotate(45deg) translate(-50%, -50%);border-width: 0px 2px 2px 0px;}.checkbox input[type="checkbox"]:indeterminate:before {background-color: var(--color-blue);top: 0;left: 0;width: 100%;height: 100%;}kol-input > kol-alert {order: 3;}.switch input[type="checkbox"] {border-width: 1px;}.switch input[type="checkbox"]:before {background-color: var(--color-blue);height: 1.3em;width: 1.3em;}',
	'KOL-INPUT-RADIO': '',
	'KOL-LINK-GROUP': '',
	'KOL-TOAST': '',
	'KOL-ICON': '/* https: //styleguide.bundesregierung.de/sg-de/medien/digitale-medien/webanwendungen/komponenten/atome/icon */',
	'KOL-ABBR': ':host abbr {text-decoration: none;border-bottom: 1px dotted currentColor;}',
	'KOL-LINK-BUTTON':
		'.button kol-span-wc {font-family: var(----font-family);font-size: 1rem;line-height: 1.125rem;padding: 0.625rem 1.125rem;border: 1px solid var(--color-darkgray);border-radius: 0.125rem;transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;}.icon-only > kol-span-wc {padding: 0.625rem;}.button.ghost kol-span-wc {border: none;}.button kol-span-wc > span {gap: 0.625rem;}.button kol-span-wc {background-color: var(--color-white);color: var(--color-black);}.button kol-span-wc kol-icon {color: var(--color-blue);}a:is(:hover, :focus) kol-span-wc kol-icon {color: var(--color-white);}a:is(:hover, :focus) kol-span-wc {cursor: pointer;background-color: var(--color-blue);color: var(--color-white);}a:is(:hover, :focus) kol-span-wc {outline: 1px dotted var(--color-black);border: 1px solid var(--color-blue);}a:is(:hover, :focus) {outline: none;}',
});
