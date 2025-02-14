import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

export type CustomSuggestionsOptionsGroupProps = JSXBase.HTMLAttributes<HTMLUListElement> & {
	blockSuggestionMouseOver: boolean;
};

const CustomSuggestionsOptionsGroupFc: FC<CustomSuggestionsOptionsGroupProps> = ({ blockSuggestionMouseOver, onKeyDown }, children) => {
	return (
		<ul
			role="listbox"
			class={clsx('kol-custom-suggestions-options-group', {
				'kol-custom-suggestions-options-group--cursor-hidden': blockSuggestionMouseOver,
			})}
			onKeyDown={onKeyDown}
		>
			{children}
		</ul>
	);
};
export default CustomSuggestionsOptionsGroupFc;
