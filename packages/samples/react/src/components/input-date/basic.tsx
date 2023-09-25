import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputDateVariants } from './partials/variants';

export const InputDateBasic: FC = () => <FocusInput RefInput={InputDateVariants} />;
