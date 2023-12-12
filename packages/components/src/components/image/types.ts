import type { Generic } from 'adopted-style-sheets';

import { PropImageSource } from '../../types/props/image-source';
import { Loading } from '../../utils/validators/loading';

type RequiredProps = {
	alt: string;
} & PropImageSource;
type OptionalProps = {
	loading: Loading;
	sizes: string;
	srcset: string;
};

type RequiredStates = RequiredProps & {
	loading: Loading;
};
type OptionalStates = {
	sizes: string;
	srcset: string;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
