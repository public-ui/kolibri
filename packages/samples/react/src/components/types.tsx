import type { ButtonVariants } from './button/partials/variants';
import type { InputCheckboxVariants } from './input-checkbox/partials/variants';
import type { InputColorVariants } from './input-color/partials/variants';
import type { InputDateVariants } from './input-date/partials/variants';
import type { InputEmailVariants } from './input-email/partials/variants';
import type { InputFileVariants } from './input-file/partials/variants';
import type { InputNumberVariants } from './input-number/partials/variants';
import type { InputPasswordVariants } from './input-password/partials/variants';
import type { InputRadioVariants } from './input-radio/partials/variants';
import type { InputRangeVariants } from './input-range/partials/variants';
import type { InputTextVariants } from './input-text/partials/variants';
import type { SelectVariants } from './select/partials/variants';
import type { TextareaVariants } from './textarea/partials/variants';

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
