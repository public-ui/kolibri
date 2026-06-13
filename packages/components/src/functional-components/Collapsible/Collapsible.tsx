import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { ButtonController } from '../../internal/functional-components/button/controller';
import { renderButtonFC } from '../../internal/functional-components/button/render';
import type { EventValueOrEventCallback, HeadingLevel, IconsPropType, StencilUnknown } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId } from '../../utils/dev.utils';
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
		ref?: ((elm?: HTMLButtonElement | undefined) => void) | undefined;
		class?: ClassType;
		_icons?: IconsPropType;
	};

	/** Controller owned by the host component that drives the heading button. */
	buttonCtrl: ButtonController;

	ContentProps?: {
		class?: ClassType;
		animationClass?: ClassType;
		wrapperClass?: ClassType;
	};
};

const KolCollapsibleFc: FC<CollapsibleProps> = (props, children) => {
	const {
		id,
		class: classNames,
		label,
		level = 1,
		disabled,
		open,
		onClick,
		buttonCtrl,
		HeadingProps = {},
		HeadingButtonProps = {},
		ContentProps = {},
		...other
	} = props;
	const icon = open ? 'kolicon-chevron-down' : 'kolicon-chevron-right';

	const headingId = createRelatedUniqueId(id, 'heading');
	const controlId = createRelatedUniqueId(id, 'control');

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
				{(() => {
					buttonCtrl.applyProps({
						id: headingId,
						ariaControls: controlId,
						ariaExpanded: open,
						disabled: disabled,
						icons: HeadingButtonProps?._icons || `${icon}`,
						label: label,
						on: { onClick },
					});
					return renderButtonFC(buttonCtrl, {
						class: clsx('collapsible__heading-button', HeadingButtonProps?.class),
						refButton: HeadingButtonProps?.ref,
					});
				})()}
			</KolHeadingFc>
			<div class={clsx('collapsible__wrapper', ContentProps?.wrapperClass)}>
				<div class={clsx('collapsible__wrapper-animation', ContentProps?.animationClass)}>
					<div
						aria-hidden={open === false ? 'true' : undefined}
						aria-labelledby={headingId}
						role="region"
						class={clsx('collapsible__content', ContentProps?.class)}
						id={controlId}
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default KolCollapsibleFc;
