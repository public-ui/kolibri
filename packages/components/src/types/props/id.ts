import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

export type IdPropType = string;

export type PropId = {
	id: IdPropType;
};

export const validateId = (component: Generic.Element.Component, value?: IdPropType): void => {
	watchString(component, '_id', value);
};
