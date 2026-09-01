import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { devHint } from '../../../schema';
import { classNameFromVariant } from '../../../schema/props/variant-class-name';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { LinkApi } from './api';

/**
 * Renders the link, its floating tooltip and its visually-hidden description.
 *
 * Unlike {@link ButtonFC}, the tooltip and the description live *inside* the `BemRootNodeFC`
 * wrapper here. That is a deliberate divergence, not an oversight: for the button the extra
 * ancestor above the `position: fixed` tooltip subtree makes Firefox rasterise its compositing
 * layer ~2px differently (visible on `kern`'s dialog close-button tooltip), so `ButtonFC` keeps
 * them as siblings of the wrapper, which is also where the pre-skeleton DOM had them. The same
 * has not been measured for the link. Issue #10745 decides whether both converge — until then,
 * changing the placement in one file means checking the other.
 */
export const LinkFC: FC<FunctionalComponentProps<LinkApi>> = (props) => {
	const {
		accessKey,
		ariaControls,
		ariaCurrent,
		ariaDescription,
		ariaDescriptionId,
		ariaExpanded,
		ariaOwns,
		customClass,
		disabled,
		download,
		handleAnchorClick,
		hideLabel,
		href,
		icons,
		inline,
		label,
		on,
		refAnchor,
		refTooltip,
		role,
		shortKey,
		tabIndex,
		target,
		variant,
		expertSlot,
	} = props;

	const translateOpenLinkInTab = translate('kol-open-link-in-tab');

	const isExternal = typeof target === 'string' && target.length > 0 && target !== '_self';

	const tagAttrs = {
		href: typeof href === 'string' && href.length > 0 ? href : 'javascript:void(0);',
		target: typeof target === 'string' && target.length > 0 ? target : undefined,
		rel: isExternal ? 'noopener' : undefined,
		download: typeof download === 'string' && download.length > 0 ? download : undefined,
	};

	if (hideLabel === true && !label) {
		devHint(`[KolLink] An aria-label must be set when _hide-label is set.`);
	}

	const trimmedAriaDescription = ariaDescription?.trim();
	const roleValue = role || undefined;
	return (
		<BemRootNodeFC
			block="kol-link"
			class={clsx({
				[customClass]: variant.includes('custom') && customClass.length > 0,
				[classNameFromVariant(variant, 'link')]: variant.length > 0,
			})}
			modifiers={{
				disabled: disabled === true,
				'external-link': isExternal,
				'hide-label': hideLabel === true,
				inline: inline === true,
				standalone: inline === false,
			}}
		>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events -- <a href> is natively keyboard-accessible (Enter triggers click); onKeyPress would cause a double-dispatch bug. */}
			<a
				ref={refAnchor}
				{...tagAttrs}
				accessKey={accessKey || undefined}
				aria-current={ariaCurrent || undefined}
				aria-controls={ariaControls || undefined}
				aria-describedby={trimmedAriaDescription ? ariaDescriptionId : undefined}
				aria-disabled={disabled ? 'true' : undefined}
				aria-expanded={ariaExpanded === '' ? undefined : ariaExpanded}
				aria-owns={ariaOwns || undefined}
				aria-label={hideLabel && typeof label === 'string' ? `${label}${isExternal ? ` (${translateOpenLinkInTab})` : ''}` : undefined}
				aria-keyshortcuts={shortKey || undefined}
				class="kol-link__anchor"
				{...on}
				onClick={handleAnchorClick}
				role={roleValue}
				tabIndex={disabled ? -1 : tabIndex}
			>
				<SpanFC class="kol-link__text" badgeText={accessKey || shortKey} icons={icons} hideLabel={hideLabel} label={expertSlot ? '' : label || href}>
					<slot name="expert" slot="expert"></slot>
				</SpanFC>
				{isExternal && (
					<IconFC class="kol-link__icon" label={hideLabel ? '' : translateOpenLinkInTab} icons={'kolicon-link-external'} aria-hidden={hideLabel} />
				)}
			</a>
			{hideLabel === true && !expertSlot && (
				<div class="kol-link__tooltip">
					<TooltipFC
						badgeText={accessKey || shortKey || ''}
						label={typeof label === 'string' ? label : typeof href === 'string' ? href : ''}
						refFloating={refTooltip}
					/>
				</div>
			)}
			{trimmedAriaDescription && (
				<span class="visually-hidden" id={ariaDescriptionId}>
					{trimmedAriaDescription}
				</span>
			)}
		</BemRootNodeFC>
	);
};
