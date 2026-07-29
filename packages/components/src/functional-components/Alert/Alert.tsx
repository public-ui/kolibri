import { h, type FunctionalComponent as FC } from '@stencil/core';
import { type JSXBase } from '@stencil/core/internal';
import clsx from '../../utils/clsx';

import { KolButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { type InternalAlertProps } from '../../schema';
import { bem } from '../../schema/bem-registry';
import AlertIcon from '../AlertIcon';
import KolHeadingFc from '../Heading';

const alertBem = bem.forBlock('kol-alert');
const BEM_CLASS_ALERT__CLOSER = alertBem('closer');
const BEM_CLASS_ALERT__CONTENT = alertBem('content');

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	Partial<Omit<InternalAlertProps, 'on'>> & {
		onCloserClick?: () => void;
		onAlertTimeout?: () => void;
	};

/**
 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
 * - https://googlechrome.github.io/samples/vibration/
 * - Ongoing discussion: https://github.com/public-ui/kolibri/issues/7191
 * @todo Move side-effect out of render-function to avoid multiple incarnations.
 */
const vibrateOnError = (): void => {
	if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
		return;
	}
	const ua = navigator.userActivation;
	const hasGesture = ua?.isActive || ua?.hasBeenActive;
	if (!hasGesture) {
		return;
	}
	if (!matchMedia('(any-pointer: coarse)').matches) {
		return;
	}
	try {
		navigator.vibrate([100, 75, 100, 75, 100]);
	} catch {
		/* no-op */
	}
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

	const translateCloseAlert = translate('kol-close-alert');

	if (alert) {
		vibrateOnError();

		setTimeout(() => {
			onAlertTimeout?.();
		}, 10000);
	}

	/**
	 * Define the dynamic BEM class names for the alert component.
	 */
	const BEM_CLASS_ROOT = alertBem({
		hasCloser: !!hasCloser,
		[`type-${type}`]: true,
		[`variant-${variant}`]: true,
	});
	const BEM_CLASS__HEADING = alertBem('heading', {
		[`h${level}`]: true,
	});

	const rootProps: Partial<JSXBase.HTMLAttributes<HTMLDivElement>> = {
		class: clsx(classNames, BEM_CLASS_ROOT),
		...other,
	};

	return (
		<div role={alert ? 'alert' : undefined} {...rootProps} data-testid="alert">
			<AlertIcon label={label} type={type} />

			<KolHeadingFc class={BEM_CLASS__HEADING} level={level} id="heading">
				{label}
			</KolHeadingFc>

			{hasCloser && (
				<KolButtonWcTag
					class={BEM_CLASS_ALERT__CLOSER + ' kol-close-button'}
					data-testid="alert-close-button"
					_ariaDescription={label?.trim() || ''}
					_hideLabel
					_icons={{
						left: {
							icon: 'kolicon-cross',
						},
					}}
					_label={translateCloseAlert}
					_on={{ onClick: onCloserClick }}
					_tooltipAlign="left"
				/>
			)}

			<div class={BEM_CLASS_ALERT__CONTENT} aria-describedby={label ? 'heading' : undefined}>
				{children}
			</div>
		</div>
	);
};

export default KolAlertFc;
