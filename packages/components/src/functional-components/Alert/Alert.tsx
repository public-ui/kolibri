import { type FunctionalComponent as FC, h } from '@stencil/core';
import { type JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { KolButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { type InternalAlertProps } from '../../schema';
import AlertIcon from '../AlertIcon';
import KolHeadingFc from '../Heading';
import { bemAlert as bem, BEM_ALERT__CLOSER, BEM_ALERT__CONTENT } from './bem';

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	Partial<Omit<InternalAlertProps, 'on'>> & {
		onCloserClick?: () => void;
		onAlertTimeout?: () => void;
	};

const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const {
		class: classNames = {},
		alert = false,
		hasCloser = false,
		label,
		level = 0,
		type = 'default',
		variant = 'msg',
		onAlertTimeout,
		onCloserClick,
		...other
	} = props;

	if (alert) {
		/**
		 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
		 * - https://googlechrome.github.io/samples/vibration/
		 * - Ongoing discussion: https://github.com/public-ui/kolibri/issues/7191
		 * @todo Move side-effect out of render-function to avoid multiple incarnations.
		 */
		if (navigator.userActivation?.hasBeenActive) {
			navigator?.vibrate?.([100, 75, 100, 75, 100]);
		}

		setTimeout(() => {
			onAlertTimeout?.();
		}, 10000);
	}

	/**
	 * Define the dynamic BEM class names for the alert component.
	 */
	const BEM_ROOT = bem('kol-alert', {
		hasCloser: !!hasCloser,
		[`type-${type}`]: true,
		[`variant-${variant}`]: true,
	});
	const BEM__HEADING = bem('kol-alert', 'heading', {
		[`h${level}`]: true,
	});

	const rootProps: Partial<JSXBase.HTMLAttributes<HTMLDivElement>> = {
		class: clsx(classNames, BEM_ROOT),
		role: alert ? (type === 'error' ? 'alert' : 'status') : undefined,
		...other,
	};

	return (
		<div {...rootProps}>
			<div class="kol-alert__container">
				<AlertIcon label={label} type={type} />
				<div class="kol-alert__container-content">
					{label && (
						<KolHeadingFc class={BEM__HEADING} level={level} id="heading">
							{label}
						</KolHeadingFc>
					)}
					{variant === 'msg' && (
						<span class={BEM_ALERT__CONTENT} aria-describedby={label ? 'heading' : undefined}>
							{children}
						</span>
					)}
				</div>
				{hasCloser && (
					<KolButtonWcTag
						class={BEM_ALERT__CLOSER}
						data-testid="alert-close-button"
						_ariaDescription={label?.trim() || ''}
						_hideLabel
						_icons={{
							left: {
								icon: 'codicon codicon-close',
							},
						}}
						_label={translate('kol-close-alert')}
						_on={{ onClick: onCloserClick }}
						_tooltipAlign="left"
					/>
				)}
			</div>
			{variant === 'card' && (
				<div class={BEM_ALERT__CONTENT} aria-describedby={label ? 'heading' : undefined}>
					{children}
				</div>
			)}
		</div>
	);
};

export default KolAlertFc;
