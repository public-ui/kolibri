import { KolButton, KolForm } from '@public-ui/react';
import React, { FC, useLayoutEffect, useRef } from 'react';
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

type Props = {
	RefInput:
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
	props?: Record<string, unknown>;
};

export const FocusInput: FC<Props> = ({ RefInput, props }) => {
	const ref = useRef(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			if (ref.current) {
				(ref.current as unknown as HTMLElement).focus();
			}
		}, 500);
	}, [ref]);

	return (
		<KolForm>
			<div className="grid gap-4">
				<RefInput ref={ref} {...props} />
				<div className="flex gap-4">
					<KolButton _label="Submit" _icon="codicon codicon-arrow-right" _type="submit" _variant="primary" />
					<KolButton _label="Reset" _type="reset" _variant="tertiary" />
					<KolButton _label="Help" _type="button" _variant="ghost" />
				</div>
			</div>
		</KolForm>
	);
};
