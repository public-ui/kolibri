import clsx from 'clsx';
import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { Log } from '../../../schema';
import type { JSXBase } from '@stencil/core/internal';
import { AlertIcon, CloserButton, Content, HeadingContent } from './components';
import { DEFAULT_PROPS, type KolAlertFcProps } from './_types';

const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const {
		class: classNames = {},
		_type = DEFAULT_PROPS._type,
		_variant = DEFAULT_PROPS._variant,
		_label,
		_hasCloser,
		_alert,
		onVibrationTimeout,
		onCloserClick,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_on,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_level,
		...other
	} = props;

	if (_alert && navigator.vibrate) {
		/**
		 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
		 * - https://googlechrome.github.io/samples/vibration/
		 */
		try {
			Log.debug(['Navigator should vibrate ...', navigator.vibrate([100, 75, 100, 75, 100])]);
		} catch (e) {
			Log.debug('Navigator does not support vibration.');
		}

		setTimeout(() => {
			onVibrationTimeout?.();
		}, 10000);
	}

	const rootClasses = {
		'kol-alert-wc': true,
		alert: true,
		[_type as string]: true,
		[_variant as string]: true,
		hasCloser: !!_hasCloser,
	};

	const rootProps = {
		class: clsx(rootClasses, classNames),
		role: _alert ? 'alert' : undefined,
		...other,
	} as Partial<JSXBase.HTMLAttributes<HTMLDivElement>>;

	return (
		<div {...rootProps}>
			<div class="heading">
				<AlertIcon label={_label} type={_type} />
				<HeadingContent {...props}>{children}</HeadingContent>
				{_hasCloser && <CloserButton label={props._label} onClick={onCloserClick} />}
			</div>
			{_variant === 'card' && <Content>{children}</Content>}
		</div>
	);
};

export default KolAlertFc;
