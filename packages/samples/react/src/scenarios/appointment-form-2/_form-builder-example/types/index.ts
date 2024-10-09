import type * as FieldTypes from '../components/fields';
import type * as ArrayFieldTypes from '../components/array-fields';
import type * as ContainerTypes from '../components/containers';
import type { CustomFieldRegistration } from '../providers/CustomFieldProvider';
import type { SchemaRegistration } from '../providers/SchemaValidationProvider';
import type { QueryRegistration } from '../providers/DataQueryProvider';
import type { Iso8601 } from '@public-ui/components';

type FieldsetProps = { fieldType: 'fieldset' } & ContainerTypes.FieldsetSectionProps;
type WizardProps = { fieldType: 'wizard' } & ContainerTypes.WizardSectionProps;
type FormProps = { fieldType: 'form' } & ContainerTypes.FormSectionProps;
type AccordionProps = { fieldType: 'accordion' } & ContainerTypes.AccordionSectionProps;
type TabsProps = { fieldType: 'tabs' } & ContainerTypes.TabsSectionProps;
type StackProps = { fieldType: 'stack' } & ContainerTypes.StackSectionProps;
type DateProps = { fieldType: 'input-date' } & FieldTypes.InputDateFormFieldProps<Iso8601 | Date>;
type EmailProps = { fieldType: 'input-email' } & FieldTypes.InputEmailFormFieldProps;
type NumberProps = { fieldType: 'input-number' } & FieldTypes.InputNumberFormFieldProps<number>;
type PasswordProps = { fieldType: 'input-password' } & FieldTypes.InputPasswordFormFieldProps;
type TextProps = { fieldType: 'input-text' | 'input-phone' } & FieldTypes.InputTextFormFieldProps;
type TextareaProps = { fieldType: 'textarea' } & FieldTypes.TextareaFormFieldProps;
type FileProps = { fieldType: 'input-file' } & FieldTypes.InputFileFormFieldProps;
type ColorProps = { fieldType: 'input-color' } & FieldTypes.InputColorFormFieldProps;
type RangeProps = { fieldType: 'input-range' } & FieldTypes.InputRangeFormFieldProps<number>;
type ComboboxProps = { fieldType: 'combobox' } & FieldTypes.ComboboxFormFieldProps;
type CheckboxProps = { fieldType: 'checkbox' } & FieldTypes.InputCheckboxFormFieldProps;
type SelectProps = { fieldType: 'select' } & FieldTypes.SelectFormFieldProps<string>;
type NativeSelectProps = { fieldType: 'native-select' } & FieldTypes.NativeSelectFormFieldProps<string | number>;
type RadioSelectProps = { fieldType: 'radio-select' } & FieldTypes.RadioSelectFormFieldProps<string | number>;
type ConditionalProps = { fieldType: 'conditional' } & ContainerTypes.ConditionalSectionProps;

type ArraySectionProps = { fieldType: 'array-section' } & ContainerTypes.ArraySectionProps;
type RepeatSectionProps = { fieldType: 'repeat-section' } & ContainerTypes.RepeatSectionProps;
type CheckboxArrayProps = { fieldType: 'input-checkbox-array' } & ArrayFieldTypes.CheckboxArrayFormFieldProps;

type ButtonNewItemProps = { fieldType: 'button'; action: 'formik-array-new-item' };
type ButtonRemoveItemProps = { fieldType: 'button'; action: 'formik-array-remove-item' };

type CustomFieldProps = { fieldType: string } & Record<string, unknown>;

export type FieldDefinition =
	| StackProps
	| FieldsetProps
	| ConditionalProps
	| FormProps
	| TabsProps
	| ButtonNewItemProps
	| ButtonRemoveItemProps
	| CheckboxProps
	| DateProps
	| EmailProps
	| NumberProps
	| PasswordProps
	| TextProps
	| TextareaProps
	| ColorProps
	| RangeProps
	| FileProps
	| ComboboxProps
	| SelectProps
	| NativeSelectProps
	| RadioSelectProps
	| CheckboxArrayProps
	| AccordionProps
	| ArraySectionProps
	| RepeatSectionProps
	| CustomFieldProps;
export type FormDefinition = FormProps;
export type WizardDefinition = WizardProps;

export type FormBuilderSettingsType<T extends object> = {
	initialValues: T;
	fieldDefinitions: WizardDefinition | FormDefinition;
	customFieldRegistrations?: CustomFieldRegistration;
	schemaRegistrations?: SchemaRegistration;
	queryDefinitions?: QueryRegistration;
};
