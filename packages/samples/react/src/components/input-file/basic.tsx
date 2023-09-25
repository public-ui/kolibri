import React, { FC } from 'react';
import { FocusInput } from '../FocusInput';
import { InputFileVariants } from './partials/variants';

export const InputFileBasic: FC = () => <FocusInput RefInput={InputFileVariants} />;
