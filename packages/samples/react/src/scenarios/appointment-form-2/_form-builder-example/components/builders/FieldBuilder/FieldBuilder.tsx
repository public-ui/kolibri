import * as React from 'react';
import * as Fields from '../../fields';
import * as ArrayFields from '../../array-fields';
import * as Containers from '../../containers';
import type * as FieldTypes from '../../fields';
import type * as ArrayFieldTypes from '../../array-fields';
import type * as ContainerTypes from '../../containers';
import type { FieldDefinition } from '../../../types';
import { useCustomField } from '../../../providers/CustomFieldProvider';

export type FieldBuilderProps = FieldDefinition;

function FieldBuilder(props: FieldBuilderProps, ref: React.ForwardedRef<any>) {
	const { fieldType, ...other } = props;

	const customField = useCustomField(fieldType);

	if (customField?.Component) {
		const { Component, ComponentProps = {} } = customField;
		ComponentProps.ref = ref;

		return <Component {...ComponentProps} />;
	}

	switch (fieldType) {
		case 'tabs':
			return <Containers.TabsSection ref={ref} {...(other as ContainerTypes.TabsSectionProps)} />;
		case 'accordion':
			return <Containers.AccordionSection ref={ref} {...(other as ContainerTypes.AccordionSectionProps)} />;
		case 'form':
			return <Containers.FormSection ref={ref} {...(other as ContainerTypes.FormSectionProps)} />;
		case 'stack':
			return <Containers.StackSection ref={ref} {...(other as ContainerTypes.StackSectionProps)} />;
		case 'conditional':
			return <Containers.ConditionalSection ref={ref} {...(other as ContainerTypes.ConditionalSectionProps)} />;
		case 'input-checkbox':
			return <Fields.InputCheckboxFormField ref={ref} {...(other as FieldTypes.InputCheckboxFormFieldProps)} />;
		case 'input-color':
			return <Fields.InputColorFormField ref={ref} {...(other as FieldTypes.InputColorFormFieldProps)} />;
		case 'input-range':
			return <Fields.InputRangeFormField ref={ref} {...(other as FieldTypes.InputRangeFormFieldProps)} />;
		case 'input-date':
			return <Fields.InputDateFormField ref={ref} {...(other as FieldTypes.InputDateFormFieldProps)} />;
		case 'input-email':
			return <Fields.InputEmailFormField ref={ref} {...(other as FieldTypes.InputEmailFormFieldProps)} />;
		case 'input-number':
			return <Fields.InputNumberFormField ref={ref} {...(other as FieldTypes.InputNumberFormFieldProps)} />;
		case 'input-password':
			return <Fields.InputPasswordFormField ref={ref} {...(other as FieldTypes.InputPasswordFormFieldProps)} />;
		case 'input-file':
			return <Fields.InputFileFormField ref={ref} {...(other as FieldTypes.InputFileFormFieldProps)} />;
		case 'input-phone':
		case 'input-text':
			return <Fields.InputTextFormField ref={ref} {...(other as FieldTypes.InputTextFormFieldProps)} />;
		case 'textarea':
			return <Fields.TextareaFormField ref={ref} {...(other as FieldTypes.TextareaFormFieldProps)} />;
		case 'combobox':
			return <Fields.ComboboxFormField ref={ref} {...(other as FieldTypes.ComboboxFormFieldProps)} />;
		case 'select':
			return <Fields.SelectFormField ref={ref} {...(other as FieldTypes.SelectFormFieldProps)} />;
		case 'native-select':
			return <Fields.NativeSelectFormField ref={ref} {...(other as FieldTypes.NativeSelectFormFieldProps)} />;
		case 'radio-select':
			return <Fields.RadioSelectFormField ref={ref} {...(other as FieldTypes.RadioSelectFormFieldProps)} />;
		case 'input-checkbox-array':
			return <ArrayFields.CheckboxArrayField ref={ref} {...(other as ArrayFieldTypes.CheckboxArrayFormFieldProps)} />;
		default:
			break;
	}

	return null;
}

export default React.forwardRef(FieldBuilder);
