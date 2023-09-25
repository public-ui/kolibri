import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputPasswordVariants } from './partials/variants';

export const InputPasswordBasic: FC = () => <FocusInput RefInput={InputPasswordVariants} />;
