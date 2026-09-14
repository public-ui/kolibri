import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag } from '../../../core/component-names';
import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import clsx from '../../../utils/clsx';
import { getBlockBem } from '../bem-root-node/block-bem';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { CollapsibleApi, CollapsibleVariant } from './api';

/**
 * Renders a collapsible — `kol-accordion` and `kol-details` — as a single BEM root.
 *
 * Both components render the exact same markup: a heading holding the toggle button, and a content
 * region wrapped in the two animation containers. They differ only in their BEM block, the chevron
 * icon and the extra content class, all of which arrive as {@link CollapsibleVariant}. Everything
 * else — including the legacy `collapsible*` classes that the shared
 * `components/@shared/_collapsible.mixin.scss` styles — is identical, which is why one functional
 * component serves both.
 *
 * The heading button is intentionally still rendered as the transitional `kol-button-wc` element:
 * dropping its host node would move the `kol-<block>__heading-button` class onto the same element
 * as `kol-button` and break theme selectors that target the host as an ancestor (e.g. default
 * `.kol-accordion__heading-button .kol-button`, ecl `.kol-details__heading-button .kol-button`).
 */
export const CollapsibleFC: FC<FunctionalComponentProps<CollapsibleApi> & CollapsibleVariant> = (
	{ block, contentClass, controlId, disabled, handleToggle, headingId, icons, label, level, open, refHeadingButton },
	children,
) => {
	const HeadlineTag = getHeadlineTag(level);
	const blockBem = getBlockBem(block);

	return (
		<BemRootNodeFC
			block={block}
			class={clsx('collapsible', {
				'collapsible--disabled': disabled === true,
				'collapsible--open': open === true,
			})}
		>
			<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'collapsible__heading', blockBem('heading'), 'kol-headline--single')}>
				<KolButtonWcTag
					class={clsx('collapsible__heading-button', blockBem('heading-button'))}
					id={headingId}
					ref={refHeadingButton}
					slot="expert"
					_ariaControls={controlId}
					_ariaExpanded={open}
					_disabled={disabled}
					_icons={icons}
					_label={label}
					_on={{ onClick: handleToggle }}
				></KolButtonWcTag>
			</HeadlineTag>
			<div class={clsx('collapsible__wrapper', blockBem('wrapper'))}>
				<div class={clsx('collapsible__wrapper-animation', blockBem('wrapper-animation'))}>
					<div
						aria-hidden={open === false ? 'true' : undefined}
						aria-labelledby={headingId}
						class={clsx('collapsible__content', blockBem('content'), contentClass)}
						id={controlId}
						role="region"
					>
						{children}
					</div>
				</div>
			</div>
		</BemRootNodeFC>
	);
};
