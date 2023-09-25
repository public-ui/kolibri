import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputRadioVariants } from './partials/variants';

export const InputRadioBasic: FC = () => <FocusInput RefInput={InputRadioVariants} />;
