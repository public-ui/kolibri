import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputNumberVariants } from './partials/variants';

export const InputNumberBasic: FC = () => <FocusInput RefInput={InputNumberVariants} />;
