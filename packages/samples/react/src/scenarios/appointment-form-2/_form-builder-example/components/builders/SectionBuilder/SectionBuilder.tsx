import * as React from 'react';
import type { FieldDefinition } from '../../../types';
import FieldContainer from '../../containers/FieldContainer';
import FieldBuilder from '../FieldBuilder';

type SectionBuilderProps = {
	fields: FieldDefinition[];
};

function SectionBuilder({ fields }: SectionBuilderProps) {
	if (!Array.isArray(fields)) {
		return null;
	}

	return fields.map((field, index) => (
		<FieldContainer key={index}>
			<FieldBuilder {...field} />
		</FieldContainer>
	));
}

export default SectionBuilder;
