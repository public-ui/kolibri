import type { FunctionalComponent } from '@stencil/core';
import { newSpecPage, type SpecPage } from '@stencil/core/testing';
import { TestComponent } from './test.component';

export function renderFunctionalComponentToSpecPage<T extends object>(componentConstructor: () => FunctionalComponent<T>): Promise<SpecPage> {
	return newSpecPage({
		components: [TestComponent],
		template: componentConstructor,
	});
}
