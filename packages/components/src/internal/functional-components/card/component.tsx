import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import KolHeadingFc from '../../../functional-components/Heading/Heading';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { ResolvedButtonProps } from '../button/resolve-props';
import type { FunctionalComponentProps } from '../generic-types';
import { resolveFcProps } from '../props-from-config';
import { renderLabelWithLang } from '../span/component';
import { cardPropsConfig, type CardApi } from './api';

const cardBem = bem.forBlock('kol-card');
const BEM_CLASS_CARD__CLOSE_BUTTON = cardBem('close-button');
const BEM_CLASS_CARD__CONTENT = cardBem('content');
const BEM_CLASS_CARD__HEADER = cardBem('header');
const BEM_CLASS_CARD__LINK = cardBem('link');

/**
 * The close button reports only its click. `ButtonFC` requires a handler per callback, and the
 * card's `_on` callbacks describe its heading link, not this button.
 */
const NOOP = (): void => {};

/** The heading renders either on its own or wrapped in the link, so it lives in its own FC. */
const CardHeadingFC: FC<Pick<FunctionalComponentProps<CardApi>, 'headingId' | 'label' | 'level'>> = ({ headingId, label, level }) => (
	<KolHeadingFc class={BEM_CLASS_CARD__HEADER} id={headingId} level={level}>
		{renderLabelWithLang(label)}
	</KolHeadingFc>
);

/**
 * The FC-facing view of `CardApi`. The API itself stays the strict contract the web component
 * implements; only the link observers (`blur`, `focus`, `cta`) become optional here, because a
 * composer that renders the card without a link has no anchor to observe — dialog, modal and
 * drawer omit them together with `href`.
 */
export type CardFCProps = Omit<FunctionalComponentProps<CardApi>, 'handleBlur' | 'handleFocus' | 'refCta'> & {
	handleBlur?: FunctionalComponentProps<CardApi>['handleBlur'];
	handleFocus?: FunctionalComponentProps<CardApi>['handleFocus'];
	refCta?: FunctionalComponentProps<CardApi>['refCta'];
	/** The close button's normalized `ButtonFC` render props, resolved once by the web component. */
	closeButtonProps: ResolvedButtonProps;
};

/**
 * The content area renders `children`, not a `<slot />` of its own: Stencil derives its light-DOM
 * slot relocation from the JSX in the element file, so the `<slot />` has to be written there.
 *
 * `.kol-close-button` is a theme hook shared with the alert, and every theme addresses it as an
 * ancestor of `.kol-button`. It therefore stays on a wrapper around `ButtonFC` rather than merging
 * into the button's own root — drop the wrapper once the hook itself moves onto the button root.
 *
 * A forwarded `class` lands on the root, so a consumer that wants its own hook on the card itself
 * can add one. A hook that themes address as an *ancestor* of `.kol-card` must not go here — it
 * belongs on a wrapper around `CardFC`, the way the drawer keeps `.kol-drawer__wrapper`.
 */
export const CardFC: FC<CardFCProps> = (props, children) => {
	const {
		ariaDescriptionId,
		class: hostClass,
		closeButtonProps,
		handleBlur,
		handleClose,
		handleFocus,
		hasCloser,
		headingId,
		href,
		label,
		level,
		refCloseButton,
		refCta,
		refTooltip,
		target,
	} = resolveFcProps(cardPropsConfig, props);

	return (
		<BemRootNodeFC component="article" aria-labelledby={headingId} block="kol-card" class={hostClass}>
			{href.length > 0 ? (
				<a class={BEM_CLASS_CARD__LINK} href={href} target={target || undefined} onBlur={handleBlur} onFocus={handleFocus} ref={refCta}>
					<CardHeadingFC headingId={headingId} label={label} level={level} />
				</a>
			) : (
				<CardHeadingFC headingId={headingId} label={label} level={level} />
			)}
			<div class={BEM_CLASS_CARD__CONTENT}>{children}</div>
			{hasCloser && (
				<div class={clsx(BEM_CLASS_CARD__CLOSE_BUTTON, 'kol-close-button')}>
					<ButtonFC
						{...closeButtonProps}
						ariaDescriptionId={ariaDescriptionId}
						handleBlur={NOOP}
						handleClick={handleClose}
						handleFocus={NOOP}
						handleMouseDown={NOOP}
						refButton={refCloseButton}
						refTooltip={refTooltip}
					/>
				</div>
			)}
		</BemRootNodeFC>
	);
};
