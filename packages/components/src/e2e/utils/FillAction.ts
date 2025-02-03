import type { Page } from '@playwright/test';
import type { E2EPage } from '@stencil/playwright';

type FillAction = (page: Page & E2EPage) => Promise<void>;

export { FillAction };
