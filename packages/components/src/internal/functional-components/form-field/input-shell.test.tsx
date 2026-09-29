import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { IconButtonFC } from './icon-button';
import { InputFC } from './input';
import { InputContainerFC } from './input-container';
import { SuggestionsFC } from './suggestions';

const error = { _type: 'error' as const, _description: 'Error' };

describe('InputContainerFC', () => {
	it.each([
		['the default', {}],
		['a start adornment', { startAdornment: h('i', { class: { start: true } }) }],
		['an end adornment', { endAdornment: [h('i', { class: { end: true } })] }],
		['disabled with a touched error', { disabled: true, msg: error, touched: true }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<InputContainerFC {...props}>
				<input aria-disabled={undefined} />
			</InputContainerFC>
		));
		expect(page.root).toMatchSnapshot();
	});
});

describe('InputFC', () => {
	it.each([
		['the default', {}],
		['states and a touched error', { disabled: true, required: true, readonly: true, touched: true, msg: error }],
		['a hidden label and descriptions', { hideLabel: true, label: 'Label', ariaDescribedBy: ['field-hint-nonce'] }],
		['suggestions', { suggestions: h(SuggestionsFC, { id: 'field-nonce', suggestions: ['a', 1] }) }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<div>
				<InputFC id="field-nonce" {...props} />
			</div>
		));
		expect(page.root).toMatchSnapshot();
	});
});

describe('IconButtonFC', () => {
	it('renders a button', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<div>
				<IconButtonFC componentName="button" label="Clear" icon="kolicon-cross" class="kol-input-container__smart-button" />
			</div>
		));
		expect(page.root).toMatchSnapshot();
	});

	it('renders an icon', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<div>
				<IconButtonFC componentName="icon" label="Info" icon="kolicon-info" />
			</div>
		));
		expect(page.root).toMatchSnapshot();
	});
});
