import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { showExpertSlot } from '../../../schema';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { LinkApi } from './api';

type LinkFCProps = FunctionalComponentProps<LinkApi> & {
	onAnchorClick: (event: MouseEvent | KeyboardEvent) => void;
	tooltipId: string;
	refTooltipFloating: (el?: HTMLElement) => void;
};

export const LinkFC: FC<LinkFCProps> = (props, children) => {
	const {
		accessKey,
		ariaControls,
		ariaCurrent,
		ariaDescription,
		ariaExpanded,
		ariaOwns,
		customClass,
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
	} = props;

	const isExternal = typeof target === 'string' && target.length > 0 && target !== '_self';
	const hasExpertSlot = showExpertSlot(label);
	const resolvedHref = typeof href === 'string' && href.length > 0 ? href : 'javascript:void(0);';
	const translateOpenLinkInTab = translate('kol-open-link-in-tab');

	const ariaLabel = hideLabel && typeof label === 'string' ? `${label}${isExternal ? ` (${translateOpenLinkInTab})` : ''}` : undefined;

	const tooltipLabel = typeof label === 'string' && label.length > 0 ? label : typeof href === 'string' ? href : '';
	const tooltipBadgeText = accessKey || shortKey || '';

	return [
		<a
			ref={refAnchor}
			href={resolvedHref}
			target={target || undefined}
			rel={isExternal ? 'noopener' : undefined}
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
			class={clsx('kol-link', {
				'kol-link--disabled': disabled,
				'kol-link--external-link': isExternal,
				'kol-link--hide-label': hideLabel,
				[`kol-link--${variant}`]: variant !== '',
				'kol-link--inline': inline,
				'kol-link--standalone': !inline,
				[customClass]: variant === 'custom' && customClass !== '',
				[hostClass as string]: !!hostClass,
			})}
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
		</a>,
		hideLabel && !hasExpertSlot && (
			<div class="kol-link__tooltip">
				<TooltipFC badgeText={tooltipBadgeText} label={tooltipLabel} id={tooltipId} refFloating={refTooltipFloating} />
			</div>
		),
	];
};
