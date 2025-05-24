import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { type InternalAlertProps } from '../../schema';
import { translate } from '../../i18n';
import { KolButtonWcTag } from '../../core/component-names';

import AlertIcon from '../AlertIcon';
import KolHeadingFc from '../Heading';
import * as typedBem from 'typed-bem';

/**
 * Define the BEM class names for the alert component.
 */
type AlertBem = {
	'kol-alert': {
		elements: {
			container: {
				modifiers: never;
			};
			'container-content': {
				modifiers: never;
			};
			'container-heading': {
				modifiers: never;
			};
			'close-button': {
				modifiers: never;
			};
			content: {
				modifiers: never;
			};
			heading: {
				modifiers: never;
			};
		};
		modifiers: Set<'msg' | 'card' | 'hasCloser' | 'default' | 'error' | 'info' | 'warning' | 'success'>;
	};
};

const bem = typedBem<AlertBem>();

export type KolAlertFcProps = JSXBase.HTMLAttributes<HTMLDivElement> &
	Partial<Omit<InternalAlertProps, 'on'>> & {
		onCloserClick?: () => void;
		onAlertTimeout?: () => void;
	};

/**
 * Define the static BEM class names for the alert component.
 */
const bemContainer = bem('kol-alert', 'container'); // kol-alert__container
const bemContainerContent = bem('kol-alert', 'container-content'); // kol-alert__container-content
const bemCloseButton = bem('kol-alert', 'close-button'); // kol-alert__close-button
const bemContent = bem('kol-alert', 'content'); // kol-alert__content
const bemHeading = bem('kol-alert', 'heading'); // kol-alert__heading

const KolAlertFc: FC<KolAlertFcProps> = (props, children) => {
	const { class: classNames = {}, type = 'default', variant = 'msg', label, hasCloser, alert, onAlertTimeout, onCloserClick, level, ...other } = props;

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
	const bemRoot = bem('kol-alert', {
		hasCloser: !!hasCloser,
		[type]: true,
		[variant]: true,
	});

	const rootProps: Partial<JSXBase.HTMLAttributes<HTMLDivElement>> = {
		class: clsx(bemRoot, classNames),
		role: alert ? 'alert' : undefined,
		...other,
	};

	return (
		<div {...rootProps}>
			<div class={bemContainer}>
				<AlertIcon type={type} />
				<div class={bemContainerContent}>
					{label ? (
						<KolHeadingFc class={bemHeading} level={level}>
							{label}
						</KolHeadingFc>
					) : null}
					{variant === 'msg' && <div class={bemContent}>{children}</div>}
				</div>
				{hasCloser && (
					<KolButtonWcTag
						class={`${bemCloseButton} close`}
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
					></KolButtonWcTag>
				)}
			</div>
			{variant === 'card' && <div class={bemContent}>{children}</div>}
		</div>
	);
};

export default KolAlertFc;
