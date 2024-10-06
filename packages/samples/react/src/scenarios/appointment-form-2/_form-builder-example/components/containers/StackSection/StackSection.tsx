import * as React from 'react';
import type { FieldDefinition } from '../../../types';
import { SectionBuilder } from '../../builders';

export type StackSectionProps = {
	orientation?: 'vertical' | 'horizontal';
	fields: FieldDefinition[];
};

function StackSection(props: StackSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	if (props.orientation === 'horizontal') {
		return (
			<div className="flex flex-row gap-4" ref={ref}>
				<SectionBuilder fields={props.fields} />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4" ref={ref}>
			<SectionBuilder fields={props.fields} />
		</div>
	);
}

export default React.forwardRef(StackSection);
