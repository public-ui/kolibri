import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { W3CInputValue } from '../../schema';

export type CustomSuggestionsProps = JSXBase.HTMLAttributes<HTMLLIElement> & {
	index: number;
	option: W3CInputValue;
	selected: boolean;
	ref?: ((elm?: HTMLLIElement | undefined) => void) | undefined;
};

const CustomSuggestionsOptionFc: FC<CustomSuggestionsProps> = ({ index, ref, selected, onClick, onMouseOver, onFocus, onKeyDown, option }) => {
	return (
		<li
			id={`option-${index}`}
			key={`-${index}`}
			ref={ref}
			data-index={index}
			tabIndex={-1}
			role="option"
			aria-selected={selected ? 'true' : undefined}
			onClick={onClick}
			onMouseOver={onMouseOver}
			onFocus={onFocus}
			class="kol-custom-suggestions-option"
			onKeyDown={onKeyDown}
		>
			{option}
		</li>
	);
};
export default CustomSuggestionsOptionFc;
