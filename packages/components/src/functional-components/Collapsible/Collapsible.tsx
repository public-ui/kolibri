import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import type { HeadingLevel } from '../../schema';
import KolHeadingFc from '../Heading';
import KolIconFc from '../Icon';

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
	onClick?: (event: MouseEvent) => void;

	HeadingProps?: {
		ref?: ((elm?: HTMLElement | undefined) => void) | undefined;
		class?: ClassType;
	};

	HeadingButtonProps?: {
		ref?: ((elm?: HTMLElement | undefined) => void) | undefined;
		class?: ClassType;
		icon?: string;
		iconClass?: ClassType;
		labelClass?: ClassType;
	};

	ContentProps?: {
		class?: ClassType;
		animationClass?: ClassType;
		wrapperClass?: ClassType;
	};
};

const KolCollapsibleFc: FC<CollapsibleProps> = (props, children) => {
	const { id, class: classNames, label, level = 1, disabled, open, onClick, HeadingProps = {}, HeadingButtonProps = {}, ContentProps = {}, ...other } = props;
	const iconFromProps = HeadingButtonProps?.icon;
	const iconClass = typeof iconFromProps === 'string' && iconFromProps.length > 0 ? iconFromProps : `codicon codicon-${open ? 'remove' : 'add'}`;
	const headingButtonClass = clsx('collapsible__heading-button', HeadingButtonProps?.class);
	const headingClass = clsx('collapsible__heading', HeadingProps?.class);
	const iconClasses = clsx('collapsible__icon', HeadingButtonProps?.iconClass);
	const labelClasses = clsx('collapsible__label', HeadingButtonProps?.labelClass);

	const handleSummaryClick = (event: MouseEvent) => {
		if (disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		onClick?.(event);
	};

	const summaryRef = (element?: HTMLElement) => {
		HeadingButtonProps?.ref?.(element);
	};

	return (
		<details
			id={id}
			open={open === true ? true : undefined}
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
			<summary
				class={headingButtonClass}
				ref={summaryRef}
				aria-controls={`${id}-control`}
				aria-expanded={open === true ? 'true' : 'false'}
				aria-disabled={disabled ? 'true' : undefined}
				role="button"
				tabIndex={disabled ? -1 : undefined}
				onClick={handleSummaryClick}
			>
				<KolHeadingFc ref={HeadingProps?.ref} level={level} class={headingClass}>
					<span class="collapsible__heading-content">
						<KolIconFc class={iconClasses} icons={iconClass} label="" />
						<span class={labelClasses}>{label}</span>
					</span>
				</KolHeadingFc>
			</summary>
			<div class={clsx('collapsible__wrapper', ContentProps?.wrapperClass)}>
				<div class={clsx('collapsible__wrapper-animation', ContentProps?.animationClass)}>
					<div aria-hidden={open === false ? 'true' : undefined} class={clsx('collapsible__content', ContentProps?.class)} id={`${id}-control`}>
						{children}
					</div>
				</div>
			</div>
		</details>
	);
};

export default KolCollapsibleFc;
