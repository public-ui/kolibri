import { KoliBri } from '@public-ui/schema';
import { KOL_ICON } from './defaults/icon';

// Design System Zoll
export const ZOLL = KoliBri.createTheme('zoll', {
	'KOL-BADGE':
		':host {display: inline-block;}span {align-items: center;border-radius: 0.3125rem;display: flex;line-height: 1.25rem;gap: 0.5rem;padding: 0.25rem 0.75rem;}',
	'KOL-ICON': KOL_ICON,
});
