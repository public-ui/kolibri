import * as React from 'react';
import * as Fields from '../../fields';
import * as ArrayFields from '../../array-fields';
import * as Containers from '../../containers';
import type * as FieldTypes from '../../fields';
import type * as ArrayFieldTypes from '../../array-fields';
import type * as ContainerTypes from '../../containers';
import type { FieldDefinition } from '../../../types';
import { useCustomField } from '../../../providers/CustomFieldProvider';
import type { Iso8601 } from '@public-ui/components';
import ButtonBuilder from '../ButtonBuilder';

type FieldBuilderProps = FieldDefinition;

function FieldBuilder(props: FieldBuilderProps, ref: React.ForwardedRef<any>) {
	const { fieldType, ...other } = props;

	const customField = useCustomField(fieldType);

	if (customField?.Component) {
		const { Component, ComponentProps = {} } = customField;
		ComponentProps.ref = ref;

		return <Component {...ComponentProps} />;
	}

	switch (fieldType) {
		case 'button':
			return <ButtonBuilder ref={ref} action={(other as { action: string }).action} />;
		case 'tabs':
			return <Containers.TabsSection ref={ref} {...(other as ContainerTypes.TabsSectionProps)} />;
		case 'accordion':
			return <Containers.AccordionSection ref={ref} {...(other as ContainerTypes.AccordionSectionProps)} />;
		case 'form':
			return <Containers.FormSection ref={ref} {...(other as ContainerTypes.FormSectionProps)} />;
		case 'fieldset':
			return <Containers.FieldsetSection ref={ref} {...(other as ContainerTypes.FieldsetSectionProps)} />;
		case 'stack':
			return <Containers.StackSection ref={ref} {...(other as ContainerTypes.StackSectionProps)} />;
		case 'conditional':
			return <Containers.ConditionalSection ref={ref} {...(other as ContainerTypes.ConditionalSectionProps)} />;
		case 'input-checkbox':
			return <Fields.InputCheckboxFormField ref={ref} {...(other as FieldTypes.InputCheckboxFormFieldProps)} />;
		case 'input-color':
			return <Fields.InputColorFormField ref={ref} {...(other as FieldTypes.InputColorFormFieldProps)} />;
		case 'input-range':
			return <Fields.InputRangeFormField ref={ref} {...(other as FieldTypes.InputRangeFormFieldProps<number>)} />;
		case 'input-date':
			return <Fields.InputDateFormField ref={ref} {...(other as FieldTypes.InputDateFormFieldProps<Iso8601 | Date>)} />;
		case 'input-email':
			return <Fields.InputEmailFormField ref={ref} {...(other as FieldTypes.InputEmailFormFieldProps)} />;
		case 'input-number':
			return <Fields.InputNumberFormField ref={ref} {...(other as FieldTypes.InputNumberFormFieldProps<number>)} />;
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
			return <Fields.SelectFormField ref={ref} {...(other as FieldTypes.SelectFormFieldProps<string>)} />;
		case 'native-select':
			return <Fields.NativeSelectFormField ref={ref} {...(other as FieldTypes.NativeSelectFormFieldProps<string | number>)} />;
		case 'radio-select':
			return <Fields.RadioSelectFormField ref={ref} {...(other as FieldTypes.RadioSelectFormFieldProps<string | number>)} />;
		case 'input-checkbox-array':
			return <ArrayFields.CheckboxArrayField ref={ref} {...(other as ArrayFieldTypes.CheckboxArrayFormFieldProps)} />;
		case 'array-section':
			console.log('ARRAY SECTION');
			return <Containers.ArraySection ref={ref} {...(other as ContainerTypes.ArraySectionProps)} />;
		case 'repeat-section':
			return <Containers.RepeatSection ref={ref} {...(other as ContainerTypes.RepeatSectionProps)} />;
		default:
			break;
	}

	return null;
}

export default React.forwardRef(FieldBuilder);
