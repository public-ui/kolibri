import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import type { LinkApi } from './api';

export const LinkFC: FC<FunctionalComponentProps<LinkApi>> = (props) => {
	const {
		accessKey,
		customClass,
		disabled,
		download,
		hideLabel,
		href,
		inline,
		label,
		target,
		shortKey,
		tabIndex,
		variant,
		ariaCurrent,
		handleClick,
		refAnchor,
	} = props;

	const isExternal = target && target !== '_self';
	const displayLabel = !hideLabel && (label || href);

	const tagAttrs = {
		href: href && href.length > 0 ? href : 'javascript:void(0);',
		target: target && target.length > 0 ? target : undefined,
		rel: isExternal ? 'noopener' : undefined,
		download: download && download.length > 0 ? download : undefined,
	};

	return (
		<a
			ref={refAnchor}
			{...tagAttrs}
			accessKey={accessKey || undefined}
			aria-current={ariaCurrent}
			aria-disabled={disabled ? 'true' : undefined}
			aria-label={hideLabel && label ? `${label}${isExternal ? ' (Open link in new tab)' : ''}` : undefined}
			aria-keyshortcuts={shortKey || undefined}
			class={clsx('kol-link', {
				'kol-link--disabled': disabled,
				'kol-link--external-link': isExternal,
				'kol-link--hide-label': hideLabel,
				[`kol-link--${variant}`]: variant,
				'kol-link--inline': inline,
				'kol-link--standalone': !inline,
				[customClass]: variant === 'custom' && customClass,
			})}
			onClick={handleClick}
			onKeyPress={handleClick}
			tabIndex={disabled ? -1 : tabIndex}
		>
			{displayLabel && <span class="kol-link__text">{displayLabel}</span>}
			{isExternal && (
				<span class="kol-link__icon" aria-hidden="true">
					🔗
				</span>
			)}
		</a>
	);
};
