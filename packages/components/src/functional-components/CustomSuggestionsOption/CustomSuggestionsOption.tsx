import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import type { W3CInputValue } from '../../schema';

export type CustomSuggestionsProps = JSXBase.HTMLAttributes<HTMLLIElement> & {
	disabled: boolean;
	index: number;
	option: W3CInputValue;
	selected: boolean;
	searchTerm?: string;
	ref?: ((elm?: HTMLLIElement | undefined) => void) | undefined;
};

const CustomSuggestionsOptionFc: FC<CustomSuggestionsProps> = ({
	disabled,
	index,
	ref,
	selected,
	onClick,
	onMouseOver,
	onFocus,
	onKeyDown,
	option,
	searchTerm,
}) => {
	const highlightSearchTerm = (text: string, searchTerm: string) => {
		if (!searchTerm?.trim()) return text;

		const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		const parts = text.split(regex);

		return parts.map((part, partIndex) => (regex.test(part) ? <mark key={partIndex}>{part}</mark> : part));
	};

	return (
		<li
			id={`option-${index}`}
			key={`-${index}`}
			ref={ref}
			data-index={index}
			tabIndex={-1}
			role="option"
			aria-selected={selected ? 'true' : undefined}
			aria-disabled={disabled ? 'true' : undefined}
			onClick={onClick}
			onMouseOver={onMouseOver}
			onFocus={onFocus}
			class={clsx('kol-custom-suggestions-option', { 'kol-custom-suggestions-option--disabled': disabled })}
			onKeyDown={onKeyDown}
		>
			{highlightSearchTerm(String(option), searchTerm || '')}
		</li>
	);
};
export default CustomSuggestionsOptionFc;
