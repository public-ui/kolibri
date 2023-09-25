import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputTextVariants } from './partials/variants';

export const InputTextBasic: FC = () => <FocusInput RefInput={InputTextVariants} />;
