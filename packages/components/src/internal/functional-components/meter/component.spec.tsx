import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { MeterFC } from './component';

const getText = (root: HTMLElement): string => root.querySelector('.kol-meter__value')?.textContent ?? '';
const getValueText = (root: HTMLElement): string | null => root.querySelector('meter')?.getAttribute('aria-valuetext') ?? null;
const getValueAttribute = (root: HTMLElement): string | null => root.querySelector('meter')?.getAttribute('value') ?? null;

describe('MeterFC', () => {
	it('renders no value and no value text when the value is null', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<MeterFC
				high={undefined}
				label="Label"
				low={undefined}
				max={100}
				min={0}
				optimum={undefined}
				orientation="horizontal"
				unit="%"
				value={null as unknown as number}
			/>
		));

		expect(getValueAttribute(page.root!)).toBeNull();
		expect(getText(page.root!)).toBe('');
		expect(getValueText(page.root!)).toBeNull();
		expect(page.root!.outerHTML).not.toContain('NaN');
	});

	it('renders 0 % for a degenerate range with min equal to max', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<MeterFC high={undefined} label="Label" low={undefined} max={5} min={5} optimum={undefined} orientation="horizontal" unit="%" value={5} />
		));

		expect(getText(page.root!)).toBe('0');
		expect(getValueText(page.root!)).not.toBeNull();
		expect(page.root!.outerHTML).not.toContain('NaN');
		expect(page.root!.outerHTML).not.toContain('Infinity');
	});

	it('renders the percentage for a regular range', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<MeterFC high={undefined} label="Label" low={undefined} max={200} min={0} optimum={undefined} orientation="horizontal" unit="%" value={50} />
		));

		expect(getText(page.root!)).toBe('25');
	});
});
