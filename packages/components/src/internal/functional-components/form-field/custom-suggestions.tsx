import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { W3CInputValue } from '../../../schema';
import { getBlockBem } from '../bem-root-node/block-bem';

const optionsGroupBem = getBlockBem('kol-custom-suggestions-options-group');
const optionBem = getBlockBem('kol-custom-suggestions-option');

export type CustomSuggestionsOptionsGroupFCProps = JSXBase.HTMLAttributes<HTMLUListElement> & {
	/** Hides the mouse cursor while the keyboard moves through the options. */
	blockSuggestionMouseOver: boolean;
};

export type CustomSuggestionsOptionFCProps = JSXBase.HTMLAttributes<HTMLLIElement> & {
	disabled: boolean;
	index: number;
	option: W3CInputValue;
	selected: boolean;
	/** Marked in the option text, case-insensitive. */
	searchTerm?: string;
	ref?: ((elm?: HTMLLIElement | undefined) => void) | undefined;
};

/** Listbox of the custom suggestions of `kol-combobox` and `kol-single-select`; `hidden` closes it. */
export const CustomSuggestionsOptionsGroupFC: FC<CustomSuggestionsOptionsGroupFCProps> = (
	{ blockSuggestionMouseOver, onKeyDown, style, hidden, id },
	children,
) => (
	<ul
		id={id}
		role="listbox"
		style={style}
		class={optionsGroupBem({ 'cursor-hidden': blockSuggestionMouseOver, open: !hidden })}
		hidden={hidden}
		onKeyDown={onKeyDown}
	>
		{children}
	</ul>
);

const highlightSearchTerm = (text: string, searchTerm: string) => {
	if (!searchTerm?.trim()) return text;

	const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
	const parts = text.split(regex);

	return parts.map((part, partIndex) => (partIndex % 2 === 1 ? <mark>{part}</mark> : part));
};

/**
 * One option of the custom suggestions. It is focusable (`tabIndex=-1`), so the keyboard moves the
 * real focus into the list. Its ID `option-<index>` is not unique per field (#11124).
 */
export const CustomSuggestionsOptionFC: FC<CustomSuggestionsOptionFCProps> = ({
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
}) => (
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
		class={optionBem({ disabled: Boolean(disabled) })}
		onKeyDown={onKeyDown}
	>
		<span>{highlightSearchTerm(String(option), searchTerm || '')}</span>
	</li>
);
