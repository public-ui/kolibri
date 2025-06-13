import { NgForOf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NUMBER_OF_INPUTS } from '../../shares/constants';

class CustomInput extends HTMLElement {
	protected host: HTMLElement | ShadowRoot = this.attachShadow({ mode: 'open' });
	protected readonly labelElement: HTMLLabelElement = document.createElement('label');
	protected readonly inputElement: HTMLInputElement = document.createElement('input');

	connectedCallback(): void {
		this.classList.add('flex', 'flex-row', 'gap-2', 'items-center');
		this.labelElement.setAttribute('for', 'input-id');
		this.labelElement.textContent = 'Label text';
		this.labelElement.setAttribute('class', 'text-sm font-medium');
		this.inputElement.setAttribute('id', 'input-id');
		this.inputElement.setAttribute(
			'class',
			'bg-transparent h-8 min-w-8 text-sm border-2 border-indigo-500 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow',
		);
		this.render();
	}

	protected render(): void {}

	get label(): string {
		return this.labelElement?.textContent || '';
	}

	set label(value: string) {
		if (this.labelElement) {
			this.labelElement.textContent = value;
		}
	}
}
class CustomInputText extends CustomInput {
	protected override render(): void {
		this.inputElement.setAttribute('type', 'text');
		this.host.append(this.labelElement, this.inputElement);
	}
}
class CustomInputNumber extends CustomInput {
	protected override render(): void {
		this.inputElement.setAttribute('type', 'number');
		this.host.append(this.labelElement, this.inputElement);
	}
}
class CustomCheckbox extends CustomInput {
	protected override render(): void {
		this.inputElement.setAttribute('type', 'checkbox');
		this.host.append(this.labelElement, this.inputElement);
	}
}

customElements.define('shadow-input-text', CustomInputText);
customElements.define('shadow-input-number', CustomInputNumber);
customElements.define('shadow-checkbox', CustomCheckbox);

@Component({
	selector: 'app-shadow-element-view',
	standalone: true,
	imports: [NgForOf],
	templateUrl: './shadow-element-view.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShadowElementViewComponent {
	numberOfInputs = NUMBER_OF_INPUTS;

	readonly onValueChange = {
		onChange: (event: Event, value: any): void => {
			console.log(value);
		},
	};
}
