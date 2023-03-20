import { KoliBri } from '@public-ui/components';

// Presse- und Informationsamt der Bundesregierung
export const BPA = KoliBri.createTheme('bpa', {
	GLOBAL:
		':host {--kolibri-border-color: unset;--kolibri-border-radius: unset;--kolibri-border-width: unset;--kolibri-color-error: unset;--kolibri-color-info: unset;--kolibri-color-success: unset;--kolibri-color-warning: unset;--kolibri-color-primary: unset;--kolibri-color-secondary: unset;--kolibri-color-normal: unset;--kolibri-color-danger: unset;--kolibri-color-ghost: unset;--kolibri-color-disabled: unset;--kolibri-color-text: unset;--kolibri-color-visited: unset;--kolibri-font-family: BundesSansWeb-Regular, Arial, Helvetica, sans-serif;--kolibri-font-family-heading: BundesSerifWeb-Regular, BundesSansWeb-Regular,Arial, Helvetica, sans-serif;--kolibri-font-size: unset;--kolibri-spacing: unset;}:host {--color-blue: #0077b6;--color-blue-80: #3392c5;--color-blue-60: #66add3;--color-blue-40: #99c9e2;--color-blue-20: #cce4f0;--color-darkblue: #004b76;--color-darkblue-80: #336f91;--color-darkblue-60: #6693ad;--color-darkblue-40: #99b7c8;--color-darkblue-20: #ccdbe4;}@keyframes blinker {50% {opacity: 0.25;}}',
	'KOL-BUTTON': '',
	'KOL-INPUT-TEXT': '',
	'KOL-INPUT-PASSWORD': '',
	'KOL-INPUT-NUMBER': '',
	'KOL-INPUT-EMAIL': '',
	'KOL-INPUT-FILE': '',
	'KOL-TEXTAREA': '',
	'KOL-ALERT': '',
	'KOL-HEADING':
		'h1,h2,h3,h4,h5,h6 {font-family: var(--kolibri-font-family-heading);}h1 {margin-bottom: 1.5rem;font-size: 2rem;font-weight: 400;line-height: 2.5rem;}@media (min-width: 64rem) {h1 {font-size: 2.875rem;line-height: 3.125rem;}}@media (min-width: 85.375rem) {h1 {font-size: 3.5rem;line-height: 4.5rem;}}h2 {margin-bottom: 1.5rem;font-size: 1.75rem;font-weight: 400;line-height: 2rem;color: var(--color-blue);}@media (min-width: 64rem) {h2 {font-size: 2.5rem;line-height: 3rem;}}@media (min-width: 85.375rem) {h2 {font-size: 2.875rem;line-height: 3.125rem;}}h3 {margin-bottom: 1.5rem;font-size: 1.625rem;font-weight: 400;line-height: 2rem;color: var(--color-blue);/*color: #111314;*/}@media (min-width: 64rem) {h3 {font-size: 1.75rem;line-height: 2.25rem;}}@media (min-width: 85.375rem) {h3 {font-size: 2rem;line-height: 2.625rem;}}h4 {margin-bottom: 1.5rem;font-size: 1.5rem;font-weight: 400;line-height: 1.75rem;color: var(--color-blue);}@media (min-width: 64rem) {h4 {font-size: 1.625rem;line-height: 1.875rem;}}@media (min-width: 85.375rem) {h4 {font-size: 1.75rem;line-height: 2.25rem;}}h5 {margin-bottom: 1.5rem;font-size: 1.1875rem;font-weight: 400;line-height: 1.75rem;color: var(--color-darkblue);}@media (min-width: 64rem) {h5 {font-size: 1.375rem;line-height: 1.875rem;}}@media (min-width: 85.375rem) {h5 {font-size: 1.5rem;line-height: 2.125rem;}}h6 {color: #f0f;animation: blinker 0.25s linear infinite;}',
	'KOL-BADGE':
		':host {--kolibri-spacing: 0.25rem;}:host > span > kol-span-wc {font: normal normal var(--font-weight) 0.875rem/1rem var(--font-family);padding: calc(0.5rem - 1px) calc(0.75rem - 1px);text-transform: uppercase;}',
	'KOL-BUTTON-GROUP': '',
	'KOL-INDENTED-TEXT': '',
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
	'KOL-CARD': '',
	'KOL-INPUT-CHECKBOX': '',
	'KOL-INPUT-RADIO': '',
	'KOL-LINK-GROUP': '',
	'KOL-TOAST': '',
});
