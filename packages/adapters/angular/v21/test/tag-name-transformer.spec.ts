import 'reflect-metadata';

import { CUSTOM_ELEMENTS_SCHEMA, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { defineCustomElements } from '@public-ui/components/loader';
import { setTagNameTransformer } from '../src/angular-component-lib/tagNameTransformer.ts';
import { KolButton } from '../src/components.ts';

@Component({
	standalone: true,
	imports: [KolButton],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	template: `<kol-button _label="Save"></kol-button>`,
})
class HostComponent {}

describe('KolButton under a tag name transformer', () => {
	beforeAll(() => {
		TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserDynamicTesting());
	});

	beforeAll(async () => {
		setTagNameTransformer((tagName: string) => `${tagName}-sample`);
		await defineCustomElements();
	});

	it('rehosts the button under the transformed tag inside the kol-button host', async () => {
		const fixture = TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [provideZonelessChangeDetection()],
		}).createComponent(HostComponent);
		fixture.detectChanges();
		await fixture.whenStable();

		const host = fixture.nativeElement as HTMLElement;
		const transformed = host.querySelector('kol-button-sample') as (HTMLElement & { _label?: string }) | null;
		expect(transformed).not.toBeNull();
		expect(customElements.get('kol-button-sample')).toBeDefined();
		expect(transformed?._label).toBe('Save');
	});
});
