import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

export type CustomSuggestionsOptionsGroupProps = JSXBase.HTMLAttributes<HTMLUListElement> & {
	blockSuggestionMouseOver: boolean;
};

const CustomSuggestionsOptionsGroupFc: FC<CustomSuggestionsOptionsGroupProps> = (
	{ blockSuggestionMouseOver, class: className, onKeyDown, style, ...rest },
	children,
) => {
	return (
		<ul
			role="listbox"
			style={style}
			class={clsx('kol-custom-suggestions-options-group', className, {
				'kol-custom-suggestions-options-group--cursor-hidden': blockSuggestionMouseOver,
			})}
			onKeyDown={onKeyDown}
			{...rest}
		>
			{children}
		</ul>
	);
};
export default CustomSuggestionsOptionsGroupFc;
