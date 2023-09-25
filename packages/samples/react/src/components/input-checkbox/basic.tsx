import React, { FC } from 'react';
import { InputCheckboxVariants } from './partials/variants';
import { FocusInput } from '../FocusInput';

export const InputCheckboxBasic: FC = () => <FocusInput RefInput={InputCheckboxVariants} />;
