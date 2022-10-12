import { KoliBriDevHelper } from '@public-ui/components';

KoliBriDevHelper.patchTheme('vkb', {
	GLOBAL: ':host {--primary: #b4cf35;--primary-hover: #c3d95e;--secondary: #024589;--font-family: "Ubuntu", "Trebuchet MS", Helvetica, Arial, sans-serif;}',
	'KOL-BUTTON':
		'button {border: 0;margin: 0;color: var(--secondary);font-family: var(--font-family);padding: 0.4375rem 0.9375rem;font-weight: 600 !important;font-size: 1rem;line-height: 1.5625rem;vertical-align: middle;text-align: center;min-width: 30px;-webkit-font-smoothing: antialiased;transition: all 0.2s ease-in-out;cursor: pointer;}button.primary {background-color: var(--primary);}button.primary:hover {background-color: var(--primary-hover);}button:disabled {opacity: 0.5;cursor: not-allowed;}',
});
