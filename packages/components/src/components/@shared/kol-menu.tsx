import { FunctionalComponent, h } from '@stencil/core';
import { JSX } from '@stencil/core/internal';
import { Option } from '../../schema';
import clsx from 'clsx';

type KolMenuProps = {
	options: Option<number>[];
	focusedOptionIndex: number;
	onClick: (event: Event, option: unknown) => void;
	renderOption?: (option: Option<number>) => JSX.Element;
	selectedValue?: number | string;
};
export const KolMenu: FunctionalComponent<KolMenuProps> = ({ options, onClick, renderOption, selectedValue }) => {
	let listItems: HTMLElement | undefined = undefined;
	// const index: number = 0;
	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'ArrowDown') {
			console.log(event.target);
			console.log(listItems);
		}
		// if (event.key === 'ArrowDown') {
		// 	const nextIndex = index + 1 < listItems.length ? index + 1 : 0;
		// 	listItems[nextIndex].focus();
		// 	event.preventDefault();
		// } else if (event.key === 'ArrowUp') {
		// 	const prevIndex = index - 1 >= 0 ? index - 1 : listItems.length - 1;
		// 	listItems[prevIndex].focus();
		// 	event.preventDefault();
		// } else if (event.key === 'Enter' || event.key === ' ') {
		// 	onClick(event, option);
		// 	event.preventDefault();
		// }
	}
	return (
		<ul role="listbox" class={clsx('menu__listbox')} onKeyDown={(event) => handleKeyDown(event)} ref={(el) => (listItems = el)}>
			{options.length > 0 &&
				options.map((option, index) => (
					<li
						id={`option-${index}`}
						key={index}
						tabIndex={-1}
						role="option"
						aria-selected={selectedValue === option.value}
						onClick={(event) => onClick(event, option)}
						class="menu__item"
					>
						{renderOption && renderOption(option)}
					</li>
				))}
		</ul>
	);
};
