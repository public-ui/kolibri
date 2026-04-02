import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { translate } from '../../../i18n';
import type { KoliBriIconsProp } from '../../../schema';
import { showExpertSlot } from '../../../schema';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import { SpanFC } from '../span/component';
import { TooltipFC } from '../tooltip/component';
import type { LinkApi } from './api';

type LinkFCOverrideProps = {
	accessKey?: string;
	ariaControls?: string;
	ariaDescription?: string;
	ariaExpanded?: string;
	ariaOwns?: string;
	customClass?: string;
	download?: string;
	handleClick: (event: Event) => void;
	role?: string;
	setTooltipRef: (el?: HTMLElement) => void;
	shortKey?: string;
	tabIndex?: number;
	target?: string;
	tooltipAlign?: string;
	tooltipId: string;
	variant?: string;
};

type LinkFCOmitKeys = keyof Omit<LinkFCOverrideProps, 'tooltipId' | 'setTooltipRef' | 'handleClick'>;

export type LinkFCProps = Omit<FunctionalComponentProps<LinkApi>, LinkFCOmitKeys> & LinkFCOverrideProps;

export const LinkFC: FC<LinkFCProps> = (props) => {
	const {
		accessKey,
		ariaCurrent,
		ariaControls,
		ariaDescription,
		ariaExpanded,
		ariaOwns,
		customClass,
		disabled,
		download,
		handleClick,
		hideLabel,
		href,
		icons,
		inline,
		label,
		refAnchor,
		role,
		shortKey,
		tabIndex,
		target,
		tooltipId,
		setTooltipRef,
		variant,
	} = props;

	const translateOpenLinkInTab = translate('kol-open-link-in-tab');
	const isExternal = typeof target === 'string' && target.length > 0 && target !== '_self';

	const anchorHref = typeof href === 'string' && href.length > 0 ? href : 'javascript:void(0);';
	const anchorTarget = typeof target === 'string' && target.length > 0 ? target : undefined;
	const anchorRel = isExternal ? 'noopener' : undefined;
	const anchorDownload = typeof download === 'string' && download.length > 0 ? download : undefined;

	const hasExpertSlot = showExpertSlot(label);

	const ariaLabel = hideLabel && typeof label === 'string' ? `${label}${isExternal ? ` (${translateOpenLinkInTab})` : ''}` : undefined;

	const anchorClass = clsx('kol-link', {
		'kol-link--disabled': disabled,
		'kol-link--external-link': isExternal,
		'kol-link--hide-label': hideLabel,
		[`kol-link--${variant as string}`]: typeof variant === 'string' && variant.length > 0,
		'kol-link--inline': inline === true,
		'kol-link--standalone': inline === false,
		[customClass as string]: variant === 'custom' && typeof customClass === 'string' && customClass.length > 0,
	});

	return (
		<Fragment>
			<a
				ref={refAnchor}
				href={anchorHref}
				target={anchorTarget}
				rel={anchorRel}
				download={anchorDownload}
				accessKey={accessKey || undefined}
				aria-current={ariaCurrent || undefined}
				aria-controls={ariaControls || undefined}
				aria-description={ariaDescription?.trim() || undefined}
				aria-disabled={disabled ? 'true' : undefined}
				aria-expanded={ariaExpanded || undefined}
				aria-owns={ariaOwns || undefined}
				aria-label={ariaLabel}
				aria-keyshortcuts={shortKey || undefined}
				class={anchorClass}
				onClick={handleClick}
				onKeyPress={handleClick}
				role={(role as never) || undefined}
				tabIndex={disabled ? -1 : tabIndex || undefined}
			>
				<SpanFC
					class="kol-link__text"
					badgeText={accessKey || shortKey || undefined}
					icons={icons as KoliBriIconsProp}
					hideLabel={hideLabel}
					label={hasExpertSlot ? '' : label || href}
				>
					<slot name="expert" slot="expert"></slot>
				</SpanFC>
				{isExternal && (
					<IconFC class="kol-link__icon" label={hideLabel ? '' : translateOpenLinkInTab} icons={'kolicon-link-external'} aria-hidden={hideLabel} />
				)}
			</a>
			{hideLabel && !hasExpertSlot && (
				<div class="kol-link__tooltip">
					<TooltipFC
						badgeText={accessKey || shortKey || ''}
						label={typeof label === 'string' ? label : typeof href === 'string' ? href : ''}
						id={tooltipId || undefined}
						refFloating={setTooltipRef as (el?: HTMLDivElement) => void}
					/>
				</div>
			)}
		</Fragment>
	);
};
