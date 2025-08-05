import { describe, expect, it, jest } from '@jest/globals';
import type { WebComponentInterface } from '../generic-types';
import type { SkeletonRenderStates } from './component';
import type { ClickButtonController } from '../click-button/controller';
import { SkeletonController } from './controller';

describe('SkeletonController', () => {
	it('delegates focusButton to injected ClickButtonController', () => {
		const component = { show: true } as WebComponentInterface<Record<never, never>, SkeletonRenderStates>;
		const clickButtonController = {
			focusButton: jest.fn(),
			setButtonRef: jest.fn(),
			componentWillLoad: jest.fn(),
		} as unknown as ClickButtonController;
		const controller = new SkeletonController(component, clickButtonController);

		controller.focusButton();

		expect(clickButtonController.focusButton).toHaveBeenCalled();
	});
});
