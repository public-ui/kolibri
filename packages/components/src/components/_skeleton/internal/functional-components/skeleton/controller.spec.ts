import { describe, expect, it, jest } from '@jest/globals';
import type { WebComponentInterface } from '../generic-types';
import type { SkeletonRenderStates } from './component';
import type { ClickButtonController } from '../click-button/controller';
import { SkeletonController } from './controller';

describe('SkeletonController', () => {
	it('delegates focusPrimaryButton to injected ClickButtonController', () => {
		const component = { eCount: 0, show: true } as WebComponentInterface<Record<never, never>, SkeletonRenderStates>;
		const primaryClickButtonController = {
			focusButton: jest.fn(),
			setButtonRef: jest.fn(),
			componentWillLoad: jest.fn(),
			onKeydown: jest.fn(),
		} as unknown as ClickButtonController;
		const secondaryClickButtonController = {
			focusButton: jest.fn(),
			setButtonRef: jest.fn(),
			componentWillLoad: jest.fn(),
			onKeydown: jest.fn(),
		} as unknown as ClickButtonController;
		const controller = new SkeletonController(component, primaryClickButtonController, secondaryClickButtonController);

		controller.focusPrimaryButton();

		expect(primaryClickButtonController.focusButton).toHaveBeenCalled();
	});
});
