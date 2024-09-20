import type { FunctionalComponent } from '@stencil/core';
import { h } from '@stencil/core';
import { koliBriQuerySelector, type Option } from '../../schema';
import clsx from 'clsx';
import { KolButtonWcTag } from '../../core/component-names';

type InternalMenuProps = {
	options: Option<number>[];
	focusedOptionIndex: number;
	onItemClick: (event: Event, option: unknown) => void;
	renderOption?: (option: Option<number>) => string;
	selectedValue?: number | string;
};
export const InternalMenu: FunctionalComponent<InternalMenuProps> = ({ options, onItemClick, renderOption, selectedValue }) => {
	let InternalMenuElement: HTMLElement;
	let currentFocusIndex: number | undefined;

	const focusById = (index: number) => {
		const button: HTMLElement | null = koliBriQuerySelector(`button#option-${index}`, InternalMenuElement);
		button?.focus();
	};

	const nextPossibleMenuIndex = (items: Option<number>[], currentIndex: number): number => {
		let nextIndex = currentIndex + 1;
		if (nextIndex >= items.length) {
			nextIndex = 0;
		}
		return nextIndex;
	};

	const prevPossibleMenuIndex = (items: Option<number>[], currentIndex: number): number => {
		let prevIndex = currentIndex - 1;
		if (prevIndex < 0) {
			prevIndex = items.length - 1;
		}
		return prevIndex;
	};
	const goToNextOption = (event: KeyboardEvent) => {
		const nextFocusIndex = nextPossibleMenuIndex(options, currentFocusIndex!);
		focusById(nextFocusIndex);
		event.preventDefault();
	};
	const goToPreviousOption = (event: KeyboardEvent) => {
		const prevFocusIndex = prevPossibleMenuIndex(options, currentFocusIndex!);
		focusById(prevFocusIndex);
		event.preventDefault();
	};
	const activateFocusedOption = (event: KeyboardEvent) => {
		if (typeof currentFocusIndex === 'number') {
			onItemClick(event, options[currentFocusIndex]);
		}
		event.preventDefault();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowRight':
				goToNextOption(event);
				break;
			case 'ArrowUp':
			case 'ArrowLeft':
				goToPreviousOption(event);
				break;
			case 'Enter':
			case 'Space':
				activateFocusedOption(event);
				break;
		}
	};
	const onBlur = () => {
		currentFocusIndex = undefined;
	};
	return (
		<div
			class="menu"
			ref={(el) => {
				InternalMenuElement = el as HTMLElement;
			}}
		>
			<ul role="listbox" class={clsx('menu__listbox')} onKeyDown={handleKeyDown} onBlur={onBlur}>
				{options.length > 0 &&
					options.map((option, index) => (
						<li
							key={index}
							role="option"
							class="menu__item"
							aria-selected={selectedValue === option.value}
							onMouseOver={() => {
								focusById(index);
							}}
							onFocus={() => {
								focusById(index);
							}}
						>
							<KolButtonWcTag
								_on={{
									onClick: (event: Event): void => {
										currentFocusIndex = index;
										onItemClick(event, option);
									},
								}}
								_customClass={selectedValue === option.value ? 'selected' : undefined}
								_tabIndex={index === currentFocusIndex ? 0 : -1}
								_ariaSelected={selectedValue === option.value}
								_label={renderOption ? (renderOption(option) as string) : ''}
								_id={`option-${index}`}
							></KolButtonWcTag>
						</li>
					))}
			</ul>
		</div>
	);
};
