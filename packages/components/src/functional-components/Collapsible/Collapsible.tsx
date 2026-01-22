import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { KolButtonWcTag } from '../../core/component-names';
import type { EventValueOrEventCallback, HeadingLevel, IconsPropType, StencilUnknown } from '../../schema';
import clsx from '../../utils/clsx';
import KolHeadingFc from '../Heading';

type ClassType =
	| string
	| {
			[className: string]: boolean;
	  };

export type CollapsibleProps = Omit<JSXBase.HTMLAttributes<HTMLElement>, 'id' | 'onClick'> & {
	id: string;
	open?: boolean;
	disabled?: boolean;
	level?: HeadingLevel;
	label: string;
	onClick?: EventValueOrEventCallback<MouseEvent, StencilUnknown>;

	HeadingProps?: {
		ref?: ((elm?: HTMLElement | undefined) => void) | undefined;
		class?: ClassType;
	};

	HeadingButtonProps?: {
		ref?: ((elm?: HTMLKolButtonWcElement | undefined) => void) | undefined;
		class?: ClassType;
		_icons?: IconsPropType;
	};

	ContentProps?: {
		class?: ClassType;
		animationClass?: ClassType;
		wrapperClass?: ClassType;
	};
};

const KolCollapsibleFc: FC<CollapsibleProps> = (props, children) => {
	const { id, class: classNames, label, level = 1, disabled, open, onClick, HeadingProps = {}, HeadingButtonProps = {}, ContentProps = {}, ...other } = props;
	const icon = open ? 'kolicon-chevron-down' : 'kolicon-chevron-right';

	return (
		<div
			id={id}
			class={clsx(
				'collapsible',
				{
					'collapsible--disabled': disabled === true,
					'collapsible--open': open === true,
				},
				classNames,
			)}
			{...other}
		>
			<KolHeadingFc ref={HeadingProps?.ref} level={level} class={clsx('collapsible__heading', HeadingProps?.class)}>
				<KolButtonWcTag
					class={clsx('collapsible__heading-button', HeadingButtonProps?.class)}
					ref={HeadingButtonProps?.ref}
					slot="expert"
					_ariaControls={`${id}-control`}
					_ariaExpanded={open}
					_disabled={disabled}
					_icons={HeadingButtonProps?._icons || `${icon}`}
					_label={label}
					_on={{ onClick }}
				></KolButtonWcTag>
			</KolHeadingFc>
			<div class={clsx('collapsible__wrapper', ContentProps?.wrapperClass)}>
				<div class={clsx('collapsible__wrapper-animation', ContentProps?.animationClass)}>
					<div aria-hidden={open === false ? 'true' : undefined} class={clsx('collapsible__content', ContentProps?.class)} id={`${id}-control`}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default KolCollapsibleFc;
