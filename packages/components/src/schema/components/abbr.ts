import type { Generic } from 'adopted-style-sheets';

import type { LabelLangSegmentsPropType } from '../props';

type RequiredAbbrProps = NonNullable<unknown>;
type OptionalAbbrProps = {
	label: LabelLangSegmentsPropType;
};

export type AbbrProps = Generic.Element.Members<RequiredAbbrProps, OptionalAbbrProps>;
