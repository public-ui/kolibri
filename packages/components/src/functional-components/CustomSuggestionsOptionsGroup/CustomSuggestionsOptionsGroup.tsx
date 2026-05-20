import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../utils/clsx';

export type CustomSuggestionsOptionsGroupProps = JSXBase.HTMLAttributes<HTMLUListElement> & {
	blockSuggestionMouseOver: boolean;
};

const CustomSuggestionsOptionsGroupFc: FC<CustomSuggestionsOptionsGroupProps> = ({ blockSuggestionMouseOver, onKeyDown, style, hidden, id }, children) => {
	return (
		<ul
			id={id}
			role="listbox"
			style={style}
			class={clsx('kol-custom-suggestions-options-group', {
				'kol-custom-suggestions-options-group--cursor-hidden': blockSuggestionMouseOver,
				'kol-custom-suggestions-options-group--open': !hidden,
			})}
			hidden={hidden}
			onKeyDown={onKeyDown}
		>
			{children}
		</ul>
	);
};
export default CustomSuggestionsOptionsGroupFc;
