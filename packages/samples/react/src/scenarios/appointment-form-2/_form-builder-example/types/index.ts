import type * as FieldTypes from '../components/fields';
import type * as ArrayFieldTypes from '../components/array-fields';
import type * as ContainerTypes from '../components/containers';
import type { CustomFieldRegistration } from '../providers/CustomFieldProvider';
import type { SchemaRegistration } from '../providers/SchemaValidationProvider';
import type { QueryRegistration } from '../providers/DataQueryProvider';

type WizardProps = { fieldType: 'wizard' } & ContainerTypes.WizardSectionProps;
type FormProps = { fieldType: 'form' } & ContainerTypes.FormSectionProps;
type AccordionProps = { fieldType: 'accordion' } & ContainerTypes.AccordionSectionProps;
type TabsProps = { fieldType: 'tabs' } & ContainerTypes.TabsSectionProps;
type StackProps = { fieldType: 'stack' } & ContainerTypes.StackSectionProps;
type DateProps = { fieldType: 'input-date' } & FieldTypes.InputDateFormFieldProps;
type EmailProps = { fieldType: 'input-email' } & FieldTypes.InputEmailFormFieldProps;
type NumberProps = { fieldType: 'input-number' } & FieldTypes.InputNumberFormFieldProps;
type PasswordProps = { fieldType: 'input-password' } & FieldTypes.InputPasswordFormFieldProps;
type TextProps = { fieldType: 'input-text' | 'input-phone' } & FieldTypes.InputTextFormFieldProps;
type TextareaProps = { fieldType: 'textarea' } & FieldTypes.TextareaFormFieldProps;
type FileProps = { fieldType: 'input-file' } & FieldTypes.InputFileFormFieldProps;
type ColorProps = { fieldType: 'input-color' } & FieldTypes.InputColorFormFieldProps;
type RangeProps = { fieldType: 'input-range' } & FieldTypes.InputRangeFormFieldProps;
type ComboboxProps = { fieldType: 'combobox' } & FieldTypes.ComboboxFormFieldProps;
type CheckboxProps = { fieldType: 'checkbox' } & FieldTypes.InputCheckboxFormFieldProps;
type SelectProps = { fieldType: 'select' } & FieldTypes.SelectFormFieldProps;
type NativeSelectProps = { fieldType: 'native-select' } & FieldTypes.NativeSelectFormFieldProps;
type RadioSelectProps = { fieldType: 'radio-select' } & FieldTypes.RadioSelectFormFieldProps;
type ConditionalProps = { fieldType: 'conditional' } & ContainerTypes.ConditionalSectionProps;

type CheckboxArrayProps = { fieldType: 'input-checkbox-array' } & ArrayFieldTypes.CheckboxArrayFormFieldProps;

type CustomFieldProps = { fieldType: string } & Record<string, unknown>;

export type FieldDefinition =
	| StackProps
	| ConditionalProps
	| FormProps
	| TabsProps
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
