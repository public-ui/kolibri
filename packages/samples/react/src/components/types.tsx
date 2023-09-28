import { FormWrap } from './FormWrap';
import { ButtonVariants } from './button/partials/variants';
import { InputCheckboxVariants } from './input-checkbox/partials/variants';
import { InputColorVariants } from './input-color/partials/variants';
import { InputDateVariants } from './input-date/partials/variants';
import { InputEmailVariants } from './input-email/partials/variants';
import { InputFileVariants } from './input-file/partials/variants';
import { InputNumberVariants } from './input-number/partials/variants';
import { InputPasswordVariants } from './input-password/partials/variants';
import { InputRadioVariants } from './input-radio/partials/variants';
import { InputRangeVariants } from './input-range/partials/variants';
import { InputTextVariants } from './input-text/partials/variants';
import { SelectVariants } from './select/partials/variants';
import { TextareaVariants } from './textarea/partials/variants';

export type RefFormComponent =
	| typeof InputCheckboxVariants
	| typeof InputColorVariants
	| typeof InputDateVariants
	| typeof InputEmailVariants
	| typeof InputFileVariants
	| typeof InputNumberVariants
	| typeof InputPasswordVariants
	| typeof InputRadioVariants
	| typeof InputRangeVariants
	| typeof InputTextVariants
	| typeof SelectVariants
	| typeof TextareaVariants;

export type RefComponent =
	// | typeof AbbrVariants
	// | typeof AccordionVariants
	// | typeof AlertVariants
	| typeof ButtonVariants
	// | typeof ButtonLinkVariants
	// | typeof CardVariants
	// | typeof LinkVariants
	// | typeof LinkButtonVariants
	// | typeof PopoverVariants
	// | typeof SplitButtonVariants
	// | typeof TabsVariants
	| RefFormComponent;
