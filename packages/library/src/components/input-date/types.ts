import { Generic } from '@public-ui/core';
import { InputDateType, OptionalInputProps } from '../../types/input/control/number';
import { IsoDate } from '../../types/input/iso8601';
import { InputRequiredProps } from '../input-text/types';

/**
 * API
 */
type RequiredProps = InputRequiredProps;
type OptionalProps = OptionalInputProps<IsoDate | Date> & { type: InputDateType };

type RequiredStates = unknown;

type OptionalStates = {
	max: string;
	min: string;
	value: string;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalInputProps<IsoDate>>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type ComponentApi = Generic.Element.Members<RequiredProps, OptionalProps>;
