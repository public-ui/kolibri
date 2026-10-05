import { translate } from '../../../i18n';
import type { ResolvedButtonProps } from '../button/resolve-props';
import { resolveButtonProps } from '../button/resolve-props';

/**
 * Normalizes the card's close button into the render props `ButtonFC` expects.
 *
 * The configuration is fixed — an icon-only button whose label lives in its tooltip — so every
 * component rendering `CardFC` resolves it the same way. It is a function rather than a constant
 * because `translate` must run after the i18n bundle is in place.
 *
 * Props only: the tooltip behavior, the click handler and the button ref belong to the composing
 * web component.
 *
 * @param host - The host element, used for the per-theme `buttonVariantDefault` feature flag.
 */
export function resolveCardCloseButtonProps(host?: HTMLElement): ResolvedButtonProps {
	return resolveButtonProps(
		{
			_hideLabel: true,
			_icons: { left: { icon: 'kolicon-cross' } },
			_label: translate('kol-close'),
			_tooltipAlign: 'left',
		},
		host,
	);
}
