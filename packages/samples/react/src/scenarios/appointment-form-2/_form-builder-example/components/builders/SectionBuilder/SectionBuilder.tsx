import * as React from 'react';
import type { FieldDefinition } from '../../../types';
import FieldContainer from '../../containers/FieldContainer/FieldContainer';
import FieldBuilder from '../FieldBuilder';

export type SectionBuilderProps = {
	fields: FieldDefinition[];
};

function SectionBuilder({ fields }: SectionBuilderProps) {
	return fields.map((field, index) => (
		<FieldContainer key={index}>
			<FieldBuilder {...field} />
		</FieldContainer>
	));
}

export default SectionBuilder;
