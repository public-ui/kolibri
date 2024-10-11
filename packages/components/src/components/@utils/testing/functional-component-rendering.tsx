import type { FunctionalComponent } from '@stencil/core';
import { Component } from '@stencil/core';
import { newSpecPage, type SpecPage } from '@stencil/core/testing';

export function renderFunctionalComponentToSpecPage<T extends object>(componentConstructor: () => FunctionalComponent<T>): Promise<SpecPage> {
	@Component({ tag: 'test-component' })
	class TestComponent {}

	return newSpecPage({
		components: [TestComponent],
		template: componentConstructor,
	});
}
