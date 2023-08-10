import { Generic } from '@a11y-ui/core';
import { PropLabel } from '../../types/props/label';
import { PropOpen } from '../../types/props/open';
import { PropHasChildren } from '../../types/props/has-children';
import { PropHref } from '../../types/props/href';

type RequiredProps = PropLabel & PropHref;
type OptionalProps = PropOpen & PropHasChildren;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
