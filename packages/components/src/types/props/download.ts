import { Generic } from '@a11y-ui/core';

import { watchBoolean, watchString } from '../../utils/prop.validators';

/* types */

export type DownloadPropType = true | string;

/**
 * Tells the browser that the link contains a file. Optionally sets the filename.
 */
export type PropDownload = {
	download?: DownloadPropType;
};

/* validator */
export const validateDownload = (component: Generic.Element.Component, value?: DownloadPropType): void => {
	if (typeof value === 'boolean') watchBoolean(component, '_download', value);
	else watchString(component, '_download', value);
};
