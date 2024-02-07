import { KoliBri } from '@public-ui/schema';
import { css } from './cssTag';

// Europa Component Library - European Commission | https://ec.europa.eu/component-library/ec/
export const ECL_EC = KoliBri.createTheme('ecl-ec', {
	GLOBAL: css``,
	'KOL-HEADING': css``,
	'KOL-ACCORDION': css``,
	'KOL-INDENTED-TEXT': css``,
	'KOL-BUTTON': css``,
	'KOL-LINK-BUTTON': css``,
	'KOL-BADGE': css``,
	'KOL-ALERT': css``,
	'KOL-AVATAR': css``,
	'KOL-TABS': css``,
	'KOL-LINK': css``,
	'KOL-BUTTON-LINK': css``,
	'KOL-BREADCRUMB': css``,
	'KOL-DETAILS': css``,
	'KOL-PROGRESS': css``,
	'KOL-SPIN': css`
		.cycle {
			padding: 0.125rem;
			& span {
				background-color: var(--color-blue-75);
			}
		}
	`,
	'KOL-PAGINATION': css``,
	'KOL-INPUT-CHECKBOX': css``,
	'KOL-INPUT-COLOR': css``,
	'KOL-CARD': css``,
	'KOL-BUTTON-GROUP': ``,
	'KOL-INPUT-RADIO': css``,
	'KOL-INPUT-RANGE': css``,
	'KOL-INPUT-TEXT': css``,
	'KOL-KOLIBRI': css``,
	'KOL-INPUT-PASSWORD': css``,
	'KOL-INPUT-NUMBER': css``,
	'KOL-INPUT-DATE': css``,
	'KOL-INPUT-EMAIL': css``,
	'KOL-INPUT-FILE': css``,
	'KOL-SELECT': css``,
	'KOL-TEXTAREA': css``,
	'KOL-ICON': ``,
	'KOL-TABLE': css``,
	'KOL-NAV': css``,
	'KOL-SKIP-NAV': css``,
	'KOL-SPLIT-BUTTON': css``,
	'KOL-TOAST-CONTAINER': ``,
});
