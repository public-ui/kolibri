import type { HeadingLevel } from '../../schema';
import { validateLevel } from '../../schema';

import type { Generic } from 'adopted-style-sheets';

export const watchHeadingLevel = (component: Generic.Element.Component, value?: HeadingLevel): void => {
	validateLevel(component, value);
};
