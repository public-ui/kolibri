import type { Generic } from 'adopted-style-sheets';

import type { PropAlt, PropImageSizes, PropImageSource, PropImageSrcset, PropLoading } from '../props';

type RequiredProps = PropAlt & PropImageSource;
type OptionalProps = PropLoading & PropImageSizes & PropImageSrcset;

type RequiredStates = RequiredProps & PropLoading;
type OptionalStates = PropImageSizes & PropImageSrcset;

export type ImageProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ImageStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ImageAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
