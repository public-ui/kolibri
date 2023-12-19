import { test, expect } from '@playwright/experimental-ct-react';
import { StatusBadgeWithoutKol } from './StatusBadgeWithoutKol';

test('should mount', async ({ mount }) => {
	const component = await mount(<StatusBadgeWithoutKol />);
	await expect(component).toBeVisible();
});
