import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { AlignPropType, AriaCurrentValuePropType, IconsPropType, LabelWithExpertSlotPropType, showExpertSlot } from '../../../schema';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import { IconFC } from '../icon/component';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';

export type LinkFCProps = {
	href: string;
	accessKey?: string;
	ariaControls?: string;
	ariaCurrent?: AriaCurrentValuePropType;
	ariaDescription?: string;
	ariaExpanded?: boolean | string;
	ariaOwns?: string;
	class?: string;
	disabled?: boolean;
	download?: string;
	hideLabel?: boolean;
	icons?: IconsPropType;
	inline?: boolean;
	label?: LabelWithExpertSlotPropType | boolean;
	role?: string;
	shortKey?: string;
	tabIndex?: number;
	target?: string;
	variant?: string;
	refAnchor?: (elm?: HTMLAnchorElement) => void;
	onAnchorClick?: (event: MouseEvent | KeyboardEvent) => void;
	tooltipId?: string;
	tooltipAlign?: AlignPropType;
	refTooltipFloating: (el?: HTMLDivElement) => void;
};

export const LinkFC: FC<LinkFCProps> = (props, children) => {
	const {
		accessKey,
		ariaControls,
		ariaCurrent,
		// NOTE: ariaCurrentValue is intentionally not destructured here — it is only used by the Controller to compute ariaCurrent
		ariaDescription,
		ariaExpanded,
		ariaOwns,
		disabled,
		download,
		hideLabel,
		href,
		icons,
		inline,
		label,
		role,
		shortKey,
		tabIndex,
		target,
		variant,
		onAnchorClick,
		tooltipId,
		refTooltipFloating,
		refAnchor,
		class: hostClass,
		//tooltipAlign,
	} = props;

	const isExternal = typeof target === 'string' && target.length > 0 && target !== '_self';
	const hasExpertSlot = showExpertSlot(label);
	const resolvedHref = typeof href === 'string' && href.length > 0 ? href : 'javascript:void(0);';
	const translateOpenLinkInTab = translate('kol-open-link-in-tab');

	const ariaLabel = hideLabel && typeof label === 'string' ? `${label}${isExternal ? ` (${translateOpenLinkInTab})` : ''}` : undefined;

	const tooltipLabel = typeof label === 'string' && label.length > 0 ? label : typeof href === 'string' ? href : '';
	const tooltipBadgeText = accessKey || shortKey || '';

	return (
		<BemRootNodeFC
			block="kol-link"
			class={clsx(hostClass, {
				[`kol-link--${variant}`]: variant !== '',
			})}
			modifiers={{
				disabled,
				'external-link': isExternal,
				'hide-label': hideLabel,
				inline,
				standalone: !inline,
			}}
		>
			<a
				ref={refAnchor}
				href={resolvedHref}
				target={target || undefined}
				rel={isExternal ? 'noopener noreferrer' : undefined}
				download={download || undefined}
				accessKey={accessKey || undefined}
				aria-current={ariaCurrent || undefined}
				aria-controls={ariaControls || undefined}
				aria-description={ariaDescription?.trim() || undefined}
				aria-disabled={disabled ? 'true' : undefined}
				aria-expanded={ariaExpanded || undefined}
				aria-owns={ariaOwns || undefined}
				aria-label={ariaLabel}
				aria-keyshortcuts={shortKey || undefined}
				class="kol-link__anchor"
				onClick={onAnchorClick}
				role={role || undefined}
				tabIndex={disabled ? -1 : tabIndex === 0 ? undefined : tabIndex}
			>
				<SpanFC
					class="kol-link__text"
					badgeText={accessKey || shortKey}
					icons={icons}
					hideLabel={hideLabel}
					label={hasExpertSlot ? '' : (typeof label === 'string' ? label : '') || href}
				>
					<slot name="expert" slot="expert">
						{children}
					</slot>
				</SpanFC>
				{isExternal && <IconFC class="kol-link__icon" label={hideLabel ? '' : translateOpenLinkInTab} icons="kolicon-link-external" aria-hidden={hideLabel} />}
			</a>
			{hideLabel && !hasExpertSlot && <TooltipFC badgeText={tooltipBadgeText} label={tooltipLabel} id={tooltipId} refFloating={refTooltipFloating} />}
		</BemRootNodeFC>
	);
};
