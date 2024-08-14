import type { FunctionalComponent } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSX } from '@stencil/core/internal';
import type { Option } from '../../schema';
import clsx from 'clsx';

type KolMenuProps = {
	options: Option<number>[];
	focusedOptionIndex: number;
	onItemClick: (event: Event, option: unknown) => void;
	renderOption?: (option: Option<number>) => JSX.Element;
	selectedValue?: number | string;
};
export const KolMenu: FunctionalComponent<KolMenuProps> = ({ options, onItemClick, renderOption, selectedValue }) => {
	const listItems: (HTMLElement | undefined)[] = [];

	function handleKeyDown(event: KeyboardEvent, index: number, option: unknown): void {
		if (event.key === 'ArrowDown') {
			const nextIndex = index + 1 < listItems.length ? index + 1 : 0;
			listItems[nextIndex]?.focus();
			event.preventDefault();
		} else if (event.key === 'ArrowUp') {
			const prevIndex = index - 1 >= 0 ? index - 1 : listItems.length - 1;
			listItems[prevIndex]?.focus();
			event.preventDefault();
		} else if (event.key === 'Enter' || event.key === ' ') {
			onItemClick(event, option);
			event.preventDefault();
		}
	}

	return (
		<ul role="listbox" class={clsx('menu__listbox')}>
			{options.length > 0 &&
				options.map((option, index) => (
					<li
						ref={(el) => (listItems[index] = el)}
						id={`option-${index}`}
						key={index}
						tabIndex={-1}
						role="option"
						class="menu__item"
						aria-selected={selectedValue === option.value}
						onKeyDown={(event) => handleKeyDown(event, index, option)}
						onClick={(event) => onItemClick(event, option)}
					>
						{renderOption && renderOption(option)}
					</li>
				))}
		</ul>
	);
};
