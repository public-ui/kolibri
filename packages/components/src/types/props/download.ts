import { Generic } from '@a11y-ui/core';
import { watchBoolean, watchString } from '../../utils/prop.validators';

/* types */
/** de
 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
 */
/** en
 * Tells the browser that the link contains a file. Optionally sets the filename.
 */
export type PropDownload = {
	download?: boolean | string;
};

/* validator */
export const validateDownload = (component: Generic.Element.Component, value?: boolean | string): void => {
	if (typeof value === 'boolean') watchBoolean(component, '_download', value);
	else watchString(component, '_download', value);
};
